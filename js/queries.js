export const populationQuery = {
    query: [
        {
            code: "Vuosi",
            selection: {
                filter: "item",
                values: [
                    "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009",
                    "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019",
                    "2020", "2021"
                ]
            }
        },
        {
            code: "Alue",
            selection: {
                filter: "item",
                values: ["SSS"]
            }
        },
        {
            code: "Tiedot",
            selection: {
                filter: "item",
                values: ["vaesto"]
            }
        }
    ],
    response: {
        format: "json-stat2"
    }
}

export const birthQuery = {
    query: [
        {
            code: "Vuosi",
            selection: {
                filter: "item",
                values: [
                    "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009",
                    "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019",
                    "2020", "2021", "2022", "2023"
                ]
            }
        },
        {
            code: "Tiedot",
            selection: {
                filter: "item",
                values: ["vm01"]
            }
        }
    ],
    response: {
        format: "json-stat2"
    }
}

export const deathQuery = {
    "query": [
        {
          "code": "Vuosi",
          "selection": {
            "filter": "item",
            "values": [
              "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009",
              "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019",
              "2020", "2021", "2022", "2023"
            ]
          }
        },
        {
          "code": "Tiedot",
          "selection": {
            "filter": "item",
            "values": ["vm11"]
          }
        }
      ],
      "response": {
        "format": "json-stat2"
      }
}

export const populationForecastQuery = {
    "query": [
      {
        "code": "Vuosi",
        "selection": {
          "filter": "item",
          "values": [
            "2025",
            "2026",
            "2027",
            "2028",
            "2029",
            "2030",
            "2031",
            "2032",
            "2033",
            "2034",
            "2035",
            "2036",
            "2037",
            "2038",
            "2039",
            "2040"
          ]
        }
      },
      {
        "code": "Tiedot",
        "selection": {
          "filter": "item",
          "values": [
            "vaesto"
          ]
        }
      },
      {
        "code": "Sukupuoli",
        "selection": {
          "filter": "item",
          "values": [
            "SSS"
          ]
        }
      },
      {
        "code": "Väestöennuste",
        "selection": {
          "filter": "item",
          "values": [
            "ennuste2024"
          ]
        }
      }
    ],
    "response": {
      "format": "json-stat2"
    }
}

export const population2023Query = {
    "query": [
        {
            "code": "Vuosi",
            "selection": {
                "filter": "item",
                "values": ["2023"]
            }
        },
        {
            "code": "Alue",
            "selection": {
                "filter": "all",
                "values": ["*"]
            }
        },
        {
            "code": "Tiedot",
            "selection": {
                "filter": "item",
                "values": ["vaesto"]
            }
        }
    ],
    "response": {
        "format": "json-stat2"
    }
}

export const employmentRateQuery = {
    "query": [
    {
      "code": "Vuosi",
      "selection": {
        "filter": "item",
        "values": [
          "2022"
        ]
      }
    },
    {
      "code": "Tiedot",
      "selection": {
        "filter": "item",
        "values": [
          "tyollisyysaste"
        ]
      }
    }
  ],
  "response": {
    "format": "json-stat2"
  }
}
