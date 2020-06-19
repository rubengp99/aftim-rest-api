# Empresa / Company
The company is related with the users of the API, this represents the comercial partner, and is the entity father of the other

## Model

| Field | Description | Type | Priority |
| ----- | ----------- | ---- | -------- |
| **id** | Numerical identifier | *Number* | Optional |
| **rif** | Legal regist | *String* | Optional |
| **razon_social** | Legal name | *String* | Required | 
| **fecha_registro** | Date of the legal regist | *Date* | Optinal |
| **direccion** | Adress | *String* | Required |
| **telefono1** | First phone number | *String* | Optional |
| **telefono2** | Second phone number | *String* | Optional |
| **telefono3** | Third phone number | *String* | Optional |
| **pag_web** | Website | *String* | Optional |
| **correo_electronico** | Email | *String* | Optional |
| **correo_electronico2** | Second email | *String* | Optional |
| **twitter** | Twitter account | *String* | Optional |
| **facebook** | Facebook account | *String* | Optional |
| **instagram** | Instagram account | *String* | Optional |
| **logo** | Image of the brand | *String* | Optional |
| **firma_digital** | Image of the digital sign | *String* | Optional |
| **tipo_imagen** | ---- | *String* | Optional |
| **licencia_locores** | Licence of licors | *Boolean* | Optional |
| **nota** | ---- | *String* | Optional |
| **marca_agua** | Watermark | *String* | Optional |
| **tipo_calculo** | Type of the utilities calc | *Number* | Optional |
| **contribuyente_especial** | ---- | *Boolean* | Optional |
| **nota2** | ---- | *String* | Optional |
| **color_presupuesto** | Color of the documents | *String* | Optional | 
| **img_barcode** | Connect to the price verifier  | *String* | Optional |
| **modelo** | Model of the company Restaurant/Pharmacy/Market | *Number* | Required |
| **serial_disk** | Field to validate the POS | *String* | Optional |

- **GET /api/empresa** Get all companies subscribed

        {
            "totalCount": 1,
            "count": 1,
            "data": [
                {
                    "id": 1,
                    "rif": "J0000",
                    "razon_social": "EMPRESA DEMO",
                    "nombre": "EMPRESA DEMO",
                    "fecha_registro": "2019-02-22T03:00:00.000Z",
                    "direccion": "PORLAMAR",
                    "telefono1": "04265969440",
                    "telefono2": "",
                    "telefono3": null,
                    "pag_web": "",
                    "correo_electronico": "",
                    "correo_electronico2": null,
                    "twitter": null,
                    "facebook": null,
                    "instagram": null,
                    "logo": "logo.jpg",
                    "firma_digital": null,
                    "tipo_imagen": null,
                    "licencia_licores": 0,
                    "nota": "",
                    "marca_agua": null,
                    "tipo_calculo": 1,
                    "contribuyente_especial": 0,
                    "nota2": "",
                    "color_presupuesto": "#229954",
                    "img_barcode": null,
                    "modelo": 4,
                    "serial_disk": "      E2034233CRLE6S"
                },
                {
                    "id": 2,
                    "rif": "J1111",
                    "razon_social": "EMPRESA DEMO 2",
                    "nombre": "EMPRESA DEMO 2",
                    "fecha_registro": "2019-02-22T03:00:00.000Z",
                    "direccion": "PORLAMAR",
                    "telefono1": "04265969440",
                    "telefono2": "",
                    "telefono3": null,
                    "pag_web": "",
                    "correo_electronico": "",
                    "correo_electronico2": null,
                    "twitter": null,
                    "facebook": null,
                    "instagram": null,
                    "logo": "logo.jpg",
                    "firma_digital": null,
                    "tipo_imagen": null,
                    "licencia_licores": 0,
                    "nota": "",
                    "marca_agua": null,
                    "tipo_calculo": 1,
                    "contribuyente_especial": 0,
                    "nota2": "",
                    "color_presupuesto": "#229954",
                    "img_barcode": null,
                    "modelo": 4,
                    "serial_disk": "      E2034233CRLE6S"
                }
            ],
            "sig": "Last page",
            "prev": "First Page"
        }
---
- **GET /api/empresa/** Get one company

        {
            "data": {
                "id": 1,
                "rif": "J0000",
                "razon_social": "EMPRESA DEMO",
                "nombre": "EMPRESA DEMO",
                "fecha_registro": "2019-02-22T03:00:00.000Z",
                "direccion": "PORLAMAR",
                "telefono1": "04265969440",
                "telefono2": "",
                "telefono3": null,
                "pag_web": "",
                "correo_electronico": "",
                "correo_electronico2": null,
                "twitter": null,
                "facebook": null,
                "instagram": null,
                "logo": "logo.jpg",
                "firma_digital": null,
                "tipo_imagen": null,
                "licencia_licores": 0,
                "nota": "",
                "marca_agua": null,
                "tipo_calculo": 1,
                "contribuyente_especial": 0,
                "nota2": "",
                "color_presupuesto": "#229954",
                "img_barcode": null,
                "modelo": 4,
                "serial_disk": "      E2034233CRLE6S"
            },
            "sig": "Last record",
            "prev": "First Record"
        }

---
- **GET /api/empresa/:id/conceptos** Get all the concepts of one company

        {
            "totalCount": 6,
            "count": 6,
            "data": [
                {
                    "id": 1,
                    "empresa_id": 1,
                    "nombre": "Jamon de pavo premiere",
                    "codigo": "NC001",
                    "referencia": "NC001",
                    "precio_a": "79925.00"
                },
                {
                    "id": 3,
                    "empresa_id": 1,
                    "nombre": "PESCADO FRESCO",
                    "codigo": "27323221122",
                    "referencia": "C003",
                    "precio_a": "29550.00"
                },
                {
                    "id": 4,
                    "empresa_id": 1,
                    "nombre": "CARNE MOLIDA",
                    "codigo": "355214235135",
                    "referencia": "C004",
                    "precio_a": "75450.00"
                },
                {
                    "id": 5,
                    "empresa_id": 1,
                    "nombre": "CHORIZO POR BULTO",
                    "codigo": "3573676423",
                    "referencia": "E001",
                    "precio_a": "123450.00"
                },
                {
                    "id": 6,
                    "empresa_id": 1,
                    "nombre": "ENSAMBLADO PRUEBA",
                    "codigo": "FGHFH",
                    "referencia": "dsgeth",
                    "precio_a": "190050.00"
                },
                {
                    "id": 9,
                    "empresa_id": 1,
                    "nombre": "Jamon de pavo premiere",
                    "codigo": "NC002",
                    "referencia": "NC002",
                    "precio_a": "200000.00"
                }
            ],
            "sig": "Last page",
            "prev": "First Page"
        }

---
- **GET /api/empresa/:id/depositos** Get all deposits when the company have concepts

        {
            "totalCount": 5,
            "count": 5,
            "data": [
                {
                    "id": 1,
                    "empresa_id": 1,
                    "nombre": "DEPOSITO PRIMERO",
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
                },
                {
                    "id": 5,
                    "empresa_id": 1,
                    "nombre": "DEPOSITO 4",
                    "usuario_id": 0
                }
            ],
            "sig": "Last page",
            "prev": "First Page"
        }

---
- **GET /api/empresa/:id/grupos** Get all groups of the concepts of the  company

        {
            "totalCount": 14,
            "count": 2,
            "data": [
                    {
                    "id": 1,
                    "nombre": "LACTEOS",
                    "imagen": "default.png",
                    "visualizar": 0,
                    "posicion": 1
                },
                {
                    "id": 3,
                    "nombre": "CARNES",
                    "imagen": "default.png",
                    "visualizar": 1,
                    "posicion": 1
                }
            ],
            "sig": "http://localhost:81/api/empresa/1/grupos/?offset=3&limit=2",
            "prev": "First Page"
        }

---
- **GET /api/empresa/:id/subgrupos** Get all subgroups of one company

        {
            "totalCount": 15,
            "count": 2,
            "data": [
                {
                    "id": 5,
                    "grupos_id": 3,
                    "nombre": "BOVINA",
                    "imagen": "default.png",
                    "visualizar": 1,
                    "posicion": 1
                },
                {
                    "id": 6,
                    "grupos_id": 3,
                    "nombre": "PESCADO",
                    "imagen": "default.png",
                    "visualizar": 1,
                    "posicion": 1
                }
            ],
            "sig": "http://localhost:81/api/empresa/1/subgrupos/?offset=6&limit=2",
            "prev": "http://localhost:81/api/empresa/1/subgrupos/?offset=NaN&limit=2"
        }

---
- **GET /api/empresa/:id/pedidos/** Get all orders of one company

        {
            "totalCount": 1,
            "count": 1,
            "data": [
                {
                    "id": 1,
                    "empresa_id": 1,
                    "rest_mesas_id": 1,
                    "rest_estatus_id": 3,
                    "estado": "ACTIVO",
                    "cant_personas": 5,
                    "fecha_at": "2019-07-18T19:42:43.000Z",
                    "fecha_in": "2019-07-18T19:44:11.000Z",
                    "usuario_id": 2,
                    "autorizo": null,
                    "motivo": null,
                    "observacion": null,
                    "clientes_id": 1,
                    "enc_facturas_id": null,
                    "detalles": [
                        {
                            "id": 1,
                            "rest_pedidos_id": 1,
                            "conceptos_id": 1,
                            "cantidad": "1.000",
                            "precio": "41400.000",
                            "fecha_at": "2019-07-18T19:42:43.000Z",
                            "fecha_in": "2019-07-18T19:43:20.000Z",
                            "rest_estatus_id": 7,
                            "estado": "ACTIVO",
                            "observacion": null,
                            "rest_areas_id": null,
                            "motivo": null,
                            "autorizo": null,
                            "impreso": 0,
                            "entrada": 0,
                            "usuario_id": 2,
                            "cortesia": null,
                            "rest_motivo_anul_id": null
                        },
                        {
                            "id": 2,
                            "rest_pedidos_id": 1,
                            "conceptos_id": 3,
                            "cantidad": "1.000",
                            "precio": "16755.200",
                            "fecha_at": "2019-07-18T19:42:46.000Z",
                            "fecha_in": "2019-07-18T19:43:23.000Z",
                            "rest_estatus_id": 7,
                            "estado": "ACTIVO",
                            "observacion": null,
                            "rest_areas_id": 1,
                            "motivo": null,
                            "autorizo": null,
                            "impreso": 0,
                            "entrada": 0,
                            "usuario_id": 2,
                            "cortesia": null,
                            "rest_motivo_anul_id": null
                        },
                        {
                            "id": 7,
                            "rest_pedidos_id": 1,
                            "conceptos_id": 3,
                            "cantidad": "1.000",
                            "precio": "1000.000",
                            "fecha_at": "2020-01-07T13:57:44.000Z",
                            "fecha_in": "2020-01-07T13:57:44.000Z",
                            "rest_estatus_id": 7,
                            "estado": "ACTIVO",
                            "observacion": null,
                            "rest_areas_id": 1,
                            "motivo": null,
                            "autorizo": null,
                            "impreso": 0,
                            "entrada": 0,
                            "usuario_id": null,
                            "cortesia": 0,
                            "rest_motivo_anul_id": null
                        },
                        {
                            "id": 8,
                            "rest_pedidos_id": 1,
                            "conceptos_id": 3,
                            "cantidad": "1.000",
                            "precio": "1000.000",
                            "fecha_at": "2020-01-07T13:58:24.000Z",
                            "fecha_in": "2020-01-07T13:58:24.000Z",
                            "rest_estatus_id": 7,
                            "estado": "ACTIVO",
                            "observacion": null,
                            "rest_areas_id": 1,
                            "motivo": null,
                            "autorizo": null,
                            "impreso": 0,
                            "entrada": 0,
                            "usuario_id": null,
                            "cortesia": 0,
                            "rest_motivo_anul_id": null
                        }
                    ]
                }
            ],
            "sig": "Last page",
            "prev": "First Page"
        }


---
- **POST /api/empresa** Create a new company

    Request:

        {
            "data": {
                "rif" : "J-21542154",
                "razon_social" : "EMPRESA DEMO 3",
                "nombre" : "WAME",
                "direccion" : "PORLAMAR",
                "telefono1" : "04120000000",
                "correo_electronico" : "correo@correo.com",
            }
        }
    
    Response:

        {
            "message": "Record created",
            "link": "http://localhost:81/api/empresa/2"
        }

---
- **POST /api/empresa/:id**

    Request:

        {
            "data": {
                "rif" : "J-21542154",
                "direccion" : "PORLAMAR",
                "telefono1" : "04121212312",
                "correo_electronico" : "correoedited@correo.com",
            }
        }
    
    Response:

        {
            "message": "Record updated",
            "link": "http://localhost:81/api/empresa/2"
        }

---
- **DELETE /api/empresa/:id** Delete a company

        {
            "message" : "Record deleted"
        }
