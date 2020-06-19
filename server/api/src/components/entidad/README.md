# Entidad / Entity
Bancary entity

# Model

| Field | Description | Type | Priority |
| ----- | ----------- | ---- | -------- |
| **id** | Numerical identifier | *String* | Optional |
| **nombre** | Name of the entity | *String* | Required |

# Routes

- **GET /api/entidad** Get all entities

        {
            "totalCount": 20,
            "count": 20,
            "data": [
                {
                    "id": 1,
                    "nombre": "100% BANCO"
                },
                {
                    "id": 2,
                    "nombre": "ACTIVO"
                },
                {
                    "id": 3,
                    "nombre": "BANCARIBE"
                },
                {
                    "id": 4,
                    "nombre": "BANCRECER"
                },
                {
                    "id": 5,
                    "nombre": "BANESCO"
                },
                {
                    "id": 6,
                    "nombre": "BANFANB"
                },
                {
                    "id": 7,
                    "nombre": "BANPLUS"
                },
                {
                    "id": 8,
                    "nombre": "BICENTENARIO"
                },
                {
                    "id": 9,
                    "nombre": "BFC"
                },
                {
                    "id": 10,
                    "nombre": "BNC"
                },
                {
                    "id": 11,
                    "nombre": "BOD"
                },
                {
                    "id": 12,
                    "nombre": "CARONI"
                },
                {
                    "id": 13,
                    "nombre": "CORP BANCA"
                },
                {
                    "id": 14,
                    "nombre": "DEL TESORO"
                },
                {
                    "id": 15,
                    "nombre": "DELSUR"
                },
                {
                    "id": 16,
                    "nombre": "EXTERIOR"
                },
                {
                    "id": 17,
                    "nombre": "MERCANTIL"
                },
                {
                    "id": 18,
                    "nombre": "PLAZA"
                },
                {
                    "id": 19,
                    "nombre": "PROVINCIAL"
                },
                {
                    "id": 20,
                    "nombre": "VENEZUELA"
                }
            ],
            "sig": "Last page",
            "prev": "First Page"
        }

---
- **GET /api/entidad/:id** Get one entity

        {
            "data": {
                "id": 13,
                "nombre": "CORP BANCA"
            },
            "sig": "http://localhost:81/api/entidad/14",
            "prev": "http://localhost:81/api/entidad/12"
        }

---
- **POST /api/entidad** Create a new entity

    Request:

        {
            "data" : {
                "nombre" : "NUEVA ENTIDAD"
            }
        }
    
    Response:

        {
            "message": "Record created",
            "link": "http://localhost:81/api/entidad/21"
        }

---
- **POST /api/endtidad/:id** Update a entity

    Request:

        {
            "data" : {
                "nombre" : "ENTIDAD MODIFICADA"
            }
        }
    
    Response:

        {
            "message": "Record updated",
            "link": "http://localhost:81/api/entidad/21"
        }
    
---
- **DELETE /api/entidad** Delete a entity

        {
            "message" : "Record deleted"
        }
