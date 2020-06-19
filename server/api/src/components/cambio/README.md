# Cambio / Currency

This represent the diferents currencies and his rate of change to the principal

## Model
| Field | Description | Type | Priority |
| ----- | ----------- | ---- | -------- |
| **id** | Numerical identifier | *Number* | Optional |
| **tasa** | The referential rate of change | *Number* | Optional |
| **moneda** | The name of the currency | *String* | Optional |
| **principal** | The flag to indicate if its the principal currency | *Boolean* | Optional |

## Routes

- **GET: /api/cambio** : Get an array of currencies

        {
            "totalCount": 3,
            "count": 3,
            "data": [
                {
                    "id": 1,
                    "tasa": "15000.00",
                    "moneda": "USD",
                    "principal": 0
                },
                {
                    "id": 2,
                    "tasa": "70000.00",
                    "moneda": "EUR",
                    "principal": 0
                },
                {
                    "id": 3,
                    "tasa": "1.00",
                    "moneda": "Bs",
                    "principal": 1
                }
            ],
            "sig": "Last page",
            "prev": "First Page"
        }
---
- **GET: /api/cambio/:id** : Get an object corresponding to a currency

        {
            "data": {
                "id": 2,
                "tasa": "70000.00",
                "moneda": "EUR",
                "principal": 0
            },
            "sig": "http://localhost:81/api/cambio/3",
            "prev": "http://localhost:81/api/cambio/1"
        }
---
- **POST: /api/cambio** : Create a new currency

    Request:

        {
            
            "data":
                    {
                        "tasa": "30000.00",
                        "moneda": "CO",
                        "principal": 0
                    }
                
        }

    Response:

        {
            "message": "Record created",
            "link": "http://localhost:81/api/cambio/4"
        }
---
- **POST: /api/cambio/:id** : Edit the data of one currency

    Request:

        {   
            
            "data":
                    {
                        "tasa": "450000.00",
                    }
        }

    Response:

        {
            "message": "Record updated",
            "link": "http://localhost:81/api/cambio/4"
        }
---
- **DELETE: /api/cambio/:id** : Remove a currency

        {
            "message" : "Record deleted"
        }