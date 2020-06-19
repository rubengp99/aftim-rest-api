# Depositos / Storage

This entity represent the diferents physical deposits where the diferents articles are storaged

## Model

| Field | Description | Type | Priority |
| ----- | ----------- | ---- | -------- |
| **id** | Numeral identifier | *Number* | Optional |
| **nombre** | Name of the deposit | *String* | Required |
| **usuario_id** | User in charge | *Number* | Optional |

## Routes

- **GET: /api/depositos/** Get all deposits

        {
            "totalCount": 4,
            "count": 4,
            "data": [
                {
                    "id": 1,
                    "empresa_id": 1,
                    "nombre": "DEPOSITO 1",
                    "usuario_id": 0
                },
                {
                    "id": 2,
                    "empresa_id": 1,
                    "nombre": "DEPOSITO TRANSITO",
                    "usuario_id": 0
                },
                {
                    "id": 3,
                    "empresa_id": 1,
                    "nombre": "DEPOSITO 2",
                    "usuario_id": 0
                },
                {
                    "id": 4,
                    "empresa_id": 1,
                    "nombre": "Deposito 3",
                    "usuario_id": 0
                }
            ],
            "sig": "Last page",
            "prev": "First Page"
        }
---

- **GET: /api/depositos/:id** Get one deposit

        {
            "data": {
                "id": 3,
                "empresa_id": 1,
                "nombre": "DEPOSITO 2",
                "usuario_id": 0
            },
            "sig": "http://localhost:81/api/depositos/4",
            "prev": "http://localhost:81/api/depositos/2"
        }
---
- **GET: /api/depositos/:id/conceptos** Get all the concepts that exists on one storage

        {
            "totalCount": 6,
            "count": 6,
            "data": [
                {
                    "id": 1,
                    "nombre": "Jamon de pavo premiere",
                    "codigo": "NC001",
                    "precio_a": "79925.00"
                },
                {
                    "id": 3,
                    "nombre": "PESCADO FRESCO",
                    "codigo": "27323221122",
                    "precio_a": "29550.00"
                },
                {
                    "id": 4,
                    "nombre": "CARNE MOLIDA",
                    "codigo": "355214235135",
                    "precio_a": "75450.00"
                },
                {
                    "id": 5,
                    "nombre": "CHORIZO POR BULTO",
                    "codigo": "3573676423",
                    "precio_a": "123450.00"
                },
                {
                    "id": 6,
                    "nombre": "ENSAMBLADO PRUEBA",
                    "codigo": "FGHFH",
                    "precio_a": "190050.00"
                },
                null
            ],
            "sig": "Last page",
            "prev": "First Page"
        }
---

- **POST: /api/depositos/** Create new deposit

    Request:

        {
            "data":{
                "nombre" : "DEPOSITO 4",
                "usuario_id" : 0
            }
        }

    Response

        {
            "message": "Record created",
            "link": "http://localhost:81/api/depositos/5"
        }

---

- **POST: /api/depositos/:id** Update the data of one deposit

    Request:

        {
            "data":{
                "nombre":"DEPOSITO PRIMERO"
            }
        }
    
    Response:

        {
            "message": "Record updated",
            "link": "http://localhost:81/api/depositos/1"
        }

---
- **DELETE: http://localhost:81/api/depositos/6** Delete a deposit

        {
            "message":"Record deleted"
        }