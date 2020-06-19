# Descargos / Unloads

This entity reference the action to unload units of the inventory

## Model

### Header

| Field | Description | Type | Priority |
| ----- | ----------- | ---- | -------- |
| **id** | Numeral identifier | *Number* | Optional |
| **fecha_at** | Date of created | *Dates* | Optional |
| **descripcion** | Description of the document | *String* | Required |
| **tipo_pago_id** | Identifier of the payment type | *Number* | Rerquired |
| **responsable** | User that make the unload | *Number* | Required |
| **autorizador** | User that authorized the unload | *Number* | Required |
| **detalles** | Details of the unload | *Array* | Required |

### Details

| Field | Description | Type | Priority |
| ----- | ----------- | ---- | -------- |
| **id** | Numeral identifier | *Number* | Optional |
| **enc_descargos_id** | Identifier of the head of the document | *Number* | Required |
| **conceptos_id** | Identifier of the concept | *Number* | Required |
| **depositos_id** | Identifier of the deposit | *Number* | Required |
| **existencia** | Existence of the concept | *Number* | Required |
| **descargo** | Units unloaded | *Number* | Required |

## Routes

- **GET /api/descargos** Get all unloads

        {
            "totalCount": 3,
            "count": 3,
            "data": [
                {
                    "id":1,
                    "fecha_at" : "2019-01-29",
                    "descripcion": null,
                    "tipo_descargo_id": 1,
                    "responsable": 3,
                    "autorizador": 2,
                    "detalles": [
                        {
                            "id":1,
                            "enc_descargos_id": 1,
                            "conceptos_id": 1,
                            "depositos_id": 1,
                            "existencia": 200,
                            "descargo": 3
                        },
                        {
                            "id":2,
                            "enc_descargos_id": 1,
                            "conceptos_id": 2,
                            "depositos_id": 1,
                            "existencia": 587,
                            "descargo": 16
                        },
                        {
                            "id":3,
                            "enc_descargos_id": 1,
                            "conceptos_id": 3,
                            "depositos_id": 1,
                            "existencia": 146,
                            "descargo": 6
                        }
                    ]
                },
                {
                    "id":2,
                    "fecha_at" : "2019-01-31",
                    "descripcion": null,
                    "tipo_descargo_id": 1,
                    "responsable": 3,
                    "autorizador": 2,
                    "detalles": [
                        {
                            "id":4,
                            "enc_descargos_id": 2,
                            "conceptos_id": 2,
                            "depositos_id": 1,
                            "existencia": 577,
                            "descargo": 7
                        },
                        {
                            "id":5,
                            "enc_descargos_id": 2,
                            "conceptos_id": 3,
                            "depositos_id": 1,
                            "existencia": 140,
                            "descargo": 12
                        }
                    ]
                }
            ],
            "sig": "Last page",
            "prev": "First Page"
        }

---
- **GET /api/descargos/:id** Get one unload

        {
            "data": {
                "id":1,
                "fecha_at" : "2019-01-29",
                "descripcion": null,
                "tipo_descargo_id": 1,
                "responsable": 3,
                "autorizador": 2,
                "detalles": [
                    {
                        "id":1,
                        "enc_descargos_id": 1,
                        "conceptos_id": 1,
                        "depositos_id": 1,
                        "existencia": 200,
                        "descargo": 3
                    },
                    {
                        "id":2,
                        "enc_descargos_id": 1,
                        "conceptos_id": 2,
                        "depositos_id": 1,
                        "existencia": 587,
                        "descargo": 16
                    },
                    {
                        "id":3,
                        "enc_descargos_id": 1,
                        "conceptos_id": 3,
                        "depositos_id": 1,
                        "existencia": 146,
                        "descargo": 6
                    }
                ]
            }
            "prev" : "First page",
            "sig" : "http://localhost:81/api/descargos/2"
        }

- **POST /api/descargos** Create a new unload

    Request:

        {
            "data":{
                "tipo_descargo_id": 1,
                "responsable": 3,
                "autorizador": 2
            },
            "data1":[
                {
                    "conceptos_id": 2,
                    "depositos_id": 1,
                    "existencia": 570,
                    "descargo": 25
                },
                {
                    "conceptos_id": 3,
                    "depositos_id": 1,
                    "existencia": 128,
                    "descargo": 8
                }
            ]
        }
    
    Response:

        {
            "message" : "Record created",
            "link": "http://localhost:81/api/descargos/3"
        }