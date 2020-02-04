# Grupos / Groups

The groups are some collections of concepts, or the tags refereds to a concept

## Model

| Field | Description | Type | Priority |
| ----- | ----------- | ---- | -------- |
| **id** | Numerical identifer | *Number* | Optional |
| **nombre** | Name of the group | *String* | Required |
| **imagen** | Name of the image | *String* | Optional |
| **visualizar** | Flag to the POS and web | *Boolean* | Optional |
| **posicion** | ---- | *Number* | Optional |

## Routes 

- **GET /api/grupos** Get all groups

        {
            "totalCount": 14,
            "count": 14,
            "data": [
                {
                    "id": 1,
                    "nombre": "LACTEOS",
                    "imagen": "default.png",
                    "visualizar": 0,
                    "posicion": 1
                },
                {
                    "id": 2,
                    "nombre": "BEBIDAS",
                    "imagen": "default.png",
                    "visualizar": 1,
                    "posicion": 1
                },
                {
                    "id": 3,
                    "nombre": "CARNES",
                    "imagen": "default.png",
                    "visualizar": 1,
                    "posicion": 1
                },
                {
                    "id": 4,
                    "nombre": "EMBUTIDOS",
                    "imagen": "default.png",
                    "visualizar": 0,
                    "posicion": 1
                },
                {
                    "id": 5,
                    "nombre": "FRUTAS",
                    "imagen": "default.png",
                    "visualizar": 0,
                    "posicion": 1
                },
                {
                    "id": 6,
                    "nombre": "HORTALIZAS",
                    "imagen": "default.png",
                    "visualizar": 0,
                    "posicion": 1
                },
                {
                    "id": 7,
                    "nombre": "CEREALES",
                    "imagen": "default.png",
                    "visualizar": 0,
                    "posicion": 1
                },
                {
                    "id": 8,
                    "nombre": "ESPECIAS",
                    "imagen": "default.png",
                    "visualizar": 0,
                    "posicion": 1
                },
                {
                    "id": 9,
                    "nombre": "POSTRES",
                    "imagen": "default.png",
                    "visualizar": 1,
                    "posicion": 1
                },
                {
                    "id": 10,
                    "nombre": "ENTRADAS",
                    "imagen": "default.png",
                    "visualizar": 1,
                    "posicion": 1
                },
                {
                    "id": 11,
                    "nombre": "PLATOS",
                    "imagen": "default.png",
                    "visualizar": 1,
                    "posicion": 1
                },
                {
                    "id": 12,
                    "nombre": "PRUEBA CREATE API NODEJS",
                    "imagen": "default.png",
                    "visualizar": 0,
                    "posicion": 1
                },
                {
                    "id": 13,
                    "nombre": "PRUEBA 2 CREATE API NODEJS",
                    "imagen": "default.png",
                    "visualizar": 0,
                    "posicion": 1
                },
                {
                    "id": 14,
                    "nombre": "Verduras",
                    "imagen": "default.png",
                    "visualizar": 0,
                    "posicion": 0
                }
            ],
            "sig": "Last page",
            "prev": "First Page"
        }

---
- **GET /api/grupos/:id** Get one group

        {
            "data": {
                "id": 2,
                "nombre": "BEBIDAS",
                "imagen": "default.png",
                "visualizar": 1,
                "posicion": 1
            },
            "sig": "http://localhost:81/api/grupos/3",
            "prev": "http://localhost:81/api/grupos/1"
        }

---
- **GET /api/grupos/:id/subgrupos** Get all subgrupos attached to a group

        {
            "totalCount": 3,
            "count": 3,
            "data": [
                {
                    "id": 1,
                    "grupos_id": 2,
                    "nombre": "SIN ALCOHOL",
                    "imagen": "default.png",
                    "visualizar": 1,
                    "posicion": 1
                },
                {
                    "id": 2,
                    "grupos_id": 2,
                    "nombre": "CON ALCOHOL",
                    "imagen": "default.png",
                    "visualizar": 1,
                    "posicion": 1
                },
                {
                    "id": 3,
                    "grupos_id": 2,
                    "nombre": "JUGOS",
                    "imagen": "default.png",
                    "visualizar": 1,
                    "posicion": 1
                }
            ],
            "sig": "Last page",
            "prev": "First Page"
        }

---
- **GET /api/grupos/:id/conceptos** Get all the concepts attached to a group

        {
            "totalCount": 2,
            "count": 2,
            "data": [
                {
                    "id": 4,
                    "nombre": "CARNE MOLIDA",
                    "empresa_id": 1,
                    "grupos_id": 1
                },
                {
                    "id": 9,
                    "nombre": "Jamon de pavo premiere",
                    "empresa_id": 1,
                    "grupos_id": 1
                }
            ],
            "sig": "Last page",
            "prev": "First Page"
        }

---
- **POST /api/grupos/** Create a new group

    Request:
        {
            "data":{
                "nombre" : "GRUPO DE PRUEBA"
            }
        }

    Response:

        {
            "message": "Record created",
            "data": {
                "nombre": "GRUPO DE PRUEBA",
                "id": 15
            },
            "link": "http://localhost:81/api/grupos/15"
        }

---
- **POST /api/grupos/:id** Update a group

    Request:

        {
            "data":{
                "nombre" : "GRUPO DE PRUEBA EDITADO"
            }
        }
    
    Response:

        {
            "message": "Record updated",
            "link": "http://localhost:81/api/grupos/15"
        }

- **DELETE /api/grupos/** Delete a group

        {
            "message": "Record deleted"
        }