# Areas de atencion

This entity correspond to the areas where the order are printed, for example a hamburguer order should be printed on the printer of the kitchen and a coctel should be printed on the printer of the bar.

## Model

| Field | Description | Type | Priority |
| ----- | ----------- | ---- | -------- |
| **id** | The identifier of the record | *Number* | Optional |
| **nombre** | Name of the area | *String* | Required |
| **impresora** | Printer of the area | *String* | Optional |

## Routes:

- **GET: /api/areas_atencion** : Get an array of objects corresponding to "areas de atencion"

        {
            "totalCount": 4,
            "count": 4,
            "data": [
                {
                    "id": 1,
                    "nombre": "COCINA",
                    "impresora": "CUSTOM Q3"
                },
                {
                    "id": 2,
                    "nombre": "BAR",
                    "impresora": "CUSTOM Q3"
                },
                {
                    "id": 3,
                    "nombre": "PIZZERIA",
                    "impresora": "CUSTOM Q3"
                },
                {
                    "id": 4,
                    "nombre": "BAR TERRAZA",
                    "impresora": "CUSTOM Q3"
                
            ],
            "sig": "Last page",
            "prev": "First Page"
        }
---
- **GET: /api/areas_atencion/:id** : Get a object corresponding to one "area de atencion"

        {
            "data": {
                "id": 1,
                "nombre": "COCINA",
                "impresora": "CUSTOM Q3"
            },
            "sig": "http://localhost:81/api/areas_atencion/2",
            "prev": "First Record"
        }
---
- **POST: /api/areas_atencion/** : Create a new "area de atencion"

    Request:

        {
            "data":{
                "nombre":"PANADERIA",
                "impresora": "SKY POS"
            }
        }
    Response:

        {
            "message": "Record created",
            "link": "http://localhost:81/api/areas_atencion/5"
        }
---
- **POST: /api/areas_atencion/:id** : Update the data of an "area de atencion"

    Request:

        {
            "data":{
                "impresora": "CUSTOM Q3"
            }
        }

    Response:

        {
            "message": "Record updated",
            "link": "http://localhost:81/api/areas_atencion/5"
        }
---
- **DELETE: /api/areas_atencion/:id** : Remove an "area de atencion"

        {
            "message": "Record deleted"
        }
