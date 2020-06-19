# Cargo / Charges

This entity represents a charge on the inventory

## Model
| Field | Description | Type | Priority |
| ----- | ----------- | ---- | -------- |
| **id** | Numerical identifier | *Number* | Optional |
| **fecha_at** | Date of the charge | *Date* | Optional |
| **fecha_in** | Date of reference | *Date* | Optional |
| **conceptos_id** | Id of the concept | *Number* | Required |
| **depositos_id** | Id of the deposit of the charge | *Number* | Required |
| **usuario_id** | Id of the user that make the charge | *Number* | Required |

## Routes

- **GET: /api/cargos** : Get an array of the charges

        {
            "totalCount": 4,
            "count": 4,
            "data": [
                {
                    "id": 1,
                    "fecha_at": "2020-01-07T17:56:21.000Z",
                    "fecha_in": "2020-01-07T17:56:22.000Z",
                    "conceptos_id": 2,
                    "depositos_id": 1,
                    "cantidad": "50.00",
                    "usuario_id": 3
                },
                {
                    "id": 2,
                    "fecha_at": "2020-01-07T17:56:21.000Z",
                    "fecha_in": "2020-01-07T17:56:22.000Z",
                    "conceptos_id": 3,
                    "depositos_id": 1,
                    "cantidad": "1000.00",
                    "usuario_id": 3
                },
                {
                    "id": 3,
                    "fecha_at": "2020-01-07T17:56:21.000Z",
                    "fecha_in": "2020-01-07T17:56:22.000Z",
                    "conceptos_id": 1,
                    "depositos_id": 1,
                    "cantidad": "100.00",
                    "usuario_id": 3
                },
                {
                    "id": 4,
                    "fecha_at": "2020-01-07T17:56:21.000Z",
                    "fecha_in": "2020-01-07T17:56:22.000Z",
                    "conceptos_id": 6,
                    "depositos_id": 1,
                    "cantidad": "3.00",
                    "usuario_id": 3
                }
            ],
            "sig": "Last page",
            "prev": "First Page"
        }
---
- **GET: /api/cargos/:id** : Get one record

        {
            "data": {
                "id": 2,
                "fecha_at": "2020-01-07T17:56:21.000Z",
                "fecha_in": "2020-01-07T17:56:22.000Z",
                "conceptos_id": 3,
                "depositos_id": 1,
                "cantidad": "1000.00",
                "usuario_id": 3
            },
            "sig": "http://localhost:81/api/cargos/3",
            "prev": "http://localhost:81/api/cargos/1"
        }
---
- **POST: /api/cargos** : Create a new charge on the inventory

    Request:

        {
            
            "data":{
                "fecha_at": "2020-01-07T17:56:21.000Z",
                "fecha_in": "2020-01-07T17:56:22.000Z",
                "conceptos_id": 4,
                "depositos_id": 1,
                "cantidad": "150.00",
                "usuario_id": 3
            }  	
        }

    Response:

        {
            "message": "Record created",
            "link": "http://localhost:81/api/cargos/7"
        }