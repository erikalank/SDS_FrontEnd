import {
    populationQuery,
    birthQuery,
    deathQuery,
    populationForecastQuery,
    population2023Query,
    employmentRateQuery
} from './queries.js'

const getData = async(url, query) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(query)
    })
    if(!res.ok) {
        return;
    }
    const data = await res.json()

    return data;
}

const getMultipleData = async (url, queries) => {
    const promises = queries.map(query => fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(query)
    }).then(res => res.json()))
    
    const results = await Promise.all(promises)
    return results;
}

const buildChart = async (url, query, chartTitle, chartType) => {
    const data = await getData(url, query)

    const years = Object.values(data.dimension.Vuosi.category.label);
    const values = data.value;

    const chartData = {
        labels: years,
        datasets: [
            {
                name: "Data",
                values: values
            }
        ]
    }

    const chart = new frappe.Chart("#chart", {
            title: chartTitle,
            data: chartData,
            type: chartType,
            height: 450,
            colors: ["#eb5146"]
    })
}

const buildMultiDatasetChart = async (url, queries, chartTitle, chartType) => {
    const [birthData, deathData] = await getMultipleData(url, queries)

    const years = Object.values(birthData.dimension.Vuosi.category.label)
    const birthValues = birthData.value
    const deathValues = deathData.value

    const chartData = {
        labels: years,
        datasets: [
            {
                name: "Birth Rate",
                values: birthValues
            },
            {
                name: "Death Rate",
                values: deathValues
            }
        ]
    };

    const chart = new frappe.Chart("#chart", {
        title: chartTitle,
        data: chartData,
        type: chartType,
        height: 450,
        colors: ["#eb5146", "#46a3eb"]
    });
}

const fetchData = async (url, query) => {
    const res = await fetch(url, {
        method:"POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(query)
    })
    
    if (!res.ok) {
        return;
    }

    const data = await res.json()
    const results = {}

    const areas = data.dimension.Alue.category.label;
    const values = data.value;

    for (let i = 0; i < Object.keys(areas).length; i++) {
        const areaCode = Object.keys(areas)[i]
        const areaName = areas[areaCode]
        results[areaName] = values[i]
    }

    return results;
}

const buildMap = async (url, query, mapElement, mapTitle) => {
    console.log("Building map with:", url, query);
    const mapContainer = document.getElementById(mapElement);

    const mapTitleElement = document.getElementById("map-title")
    mapTitleElement.textContent = mapTitle

    const existingMap = mapContainer.map;
    if (existingMap) {
        existingMap.remove();
        mapContainer.map = null;
    }

    const map = L.map(mapElement, {
        minZoom: 4
    })

    let osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap"
    }).addTo(map);

    let google = L.tileLayer("https://{s}.google.com/vt/lyrs=s@221097413,traffic&x={x}&y={y}&z={z}", {
        maxZoom: 20,
        minZooom: 2,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }).addTo(map)

    mapContainer.map = map;

    const geoJsonResponse = await fetch("https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326")
    const geoJsonData = await geoJsonResponse.json()
    const data = await fetchData(url, query)

    const geoJsonLayer = L.geoJSON(geoJsonData, {
        style: {
            weight: 2
        },
        onEachFeature: function (feature, layer) {
            if (feature.properties && feature.properties.name) {
                const municipalityName = feature.properties.name
                const value = data[municipalityName]
                layer.bindTooltip(`${municipalityName}: ${value}`, {
                    permanent: false,
                    direction: 'auto'
                })
            }
        }
    }).addTo(map);

    let baseMaps = {
        "OpenStreetMap": osm,
        "Google Maps": google
    }

    let layerControl = L.control.layers(baseMaps).addTo(map)

    map.fitBounds(geoJsonLayer.getBounds())
}

document.addEventListener('DOMContentLoaded', () => {
    function setupToggle(buttonId, contentId) {
        const button = document.getElementById(buttonId);
        const content = document.getElementById(contentId);
        const icon = button.querySelector('i');

        button.addEventListener('click', () => {
            content.classList.toggle('hidden');
            icon.classList.toggle('fa-plus');
            icon.classList.toggle('fa-minus');
        });
    }

    setupToggle("toggle-chart", "chart-container");
    setupToggle("toggle-map", "map-container");

});


document.getElementById("birthAndDeath").addEventListener('click', () => {
    const url = "https://statfin.stat.fi:443/PxWeb/api/v1/en/StatFin/muutl/statfin_muutl_pxt_11ad.px"
    const chartTitle = "Birth and death rate in Finland"
    const chartType = "bar"
    buildMultiDatasetChart(url, [birthQuery, deathQuery], chartTitle, chartType)
})

document.getElementById("populationForecast").addEventListener('click',() => {
    const url = "https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/vaenn/statfin_vaenn_pxt_139e.px"
    const chartTitle = "Population forecast in Finland"
    const chartType = "line"
    buildChart(url, populationForecastQuery, chartTitle, chartType)
})

document.getElementById("populationGrowth").addEventListener('click', () => {
    const url = "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px"
    const chartType = "line"
    const chartTitle = "Population growth in Finland"
    buildChart(url, populationQuery, chartTitle, chartType)
})

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("municipalityData").addEventListener('click', () => {
        const url = "https://statfin.stat.fi:443/PxWeb/api/v1/en/StatFin/kuol/statfin_kuol_pxt_12au.px"
        const mapTitle = "Population data 2023"
        buildMap(url, population2023Query, 'map', mapTitle)
    })

    document.getElementById("employmentRate").addEventListener('click', () => {
        const url = "https://statfin.stat.fi:443/PxWeb/api/v1/en/StatFin/tyokay/statfin_tyokay_pxt_115x.px"
        const mapTitle = "Employment rate 2023 (%)"
        buildMap(url, employmentRateQuery, 'map', mapTitle)
    })
})

// Mobile Menu
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.querySelector('.hamburger-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    hamburgerButton.addEventListener('click', () => mobileMenu.classList.toggle('active'));
});
