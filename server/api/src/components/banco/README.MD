# Banks

This entity represent the banks accounts of the company to track the contability of it

## Model
| Field | Description | Type | Priority |
| ----- | ----------- | ---- | -------- |
| **id** | Identifier of the record | *Number* | Optional |
| **cuenta** | The number of the account | *Number* | Required |
| **fecha_at** | The date at the record was created | *Date* | Optional |
| **entidad_id** | The id of the oficcial bank | *Number* | Required | 
| **fecha_apertura** | Date of the aperture of the account | *Date* | Required |
| **direccion** | Address of the nearest sucursal | *String* | Required |
| **telefono** | Phone number of the sucursal | *String* | Optional |
| **tipo_cuenta_id** | The id of the type of account | *Number* | Required | 
| **agencia** | Name of the sucursal | *String* | Optional |
| **contacto** | Name of the contact on the sucursal | *String* | Optional |
| **telefono_contacto** | Phone of the contact | *String* | Optional |
| **email_contacto** | Email of the contact | *String* | Optional |
| **dias_diferidos** | Days of the transaction diferation | *Number* | Required |
| **ult_saldo_conciliado** | Last balance reconciled in the bank account | *Number* | Optional |
| **saldo_actual** | Current balance according to the system | *Number* | Optional |
| **fecha_ult_conciliacion** | Date of the last reconcile | *Date* | Optional |
| **pto_venta** | System POS binding | *Number* | Optional |
| **comision** | Comission for the transaction | *Number* | Required |

## Routes:

- **GET: /api/banco/** : Gets an array of objects corresponding to "banco"

        {
            "totalCount": 2,
            "count": 2,
            "data": [
                {
                    "id": 1,
                    "cuenta": "4156454564654654654654",
                    "fecha_at": "2020-01-07T14:33:30.000Z",
                    "entidad_id": 20,
                    "fecha_apertura": "2020-01-07T03:00:00.000Z",
                    "direccion": "La Asuncion",
                    "telefono": "02951123503",
                    "tipo_cuenta_id": 1,
                    "agencia": "La Asuncion",
                    "contacto": "Pedro",
                    "telefono_contacto": "04121802961",
                    "email_contacto": "pedro@gmail.com",
                    "dias_diferidos": 1,
                    "ult_saldo_conciliado": "500000.00",
                    "saldo_actual": "500000.00",
                    "fecha_ult_conciliacion": "2020-01-07T03:00:00.000Z",
                    "pto_venta": 0
                },
                {
                    "id": 2,
                    "cuenta": "545646545",
                    "fecha_at": "2020-01-07T14:33:30.000Z",
                    "entidad_id": 20,
                    "fecha_apertura": "2020-01-07T03:00:00.000Z",
                    "direccion": "Porlamar",
                    "telefono": "02951123503",
                    "tipo_cuenta_id": 1,
                    "agencia": "Porlamar",
                    "contacto": "Claudia",
                    "telefono_contacto": "04121802961",
                    "email_contacto": "pedro@gmail.com",
                    "dias_diferidos": 1,
                    "ult_saldo_conciliado": "500000.00",
                    "saldo_actual": "500000.00",
                    "fecha_ult_conciliacion": "2020-01-07T03:00:00.000Z",
                    "pto_venta": 0
                }
            ],
            "sig": "Last page",
            "prev": "First Page"
        }
---
- **GET: /api/banco/1** : Get an object corresponding to "banco"

        {
            "data": {
                "id": 1,
                "cuenta": "4156454564654654654654",
                "fecha_at": "2020-01-07T14:33:30.000Z",
                "entidad_id": 20,
                "fecha_apertura": "2020-01-07T03:00:00.000Z",
                "direccion": "La Asuncion",
                "telefono": "02951123503",
                "tipo_cuenta_id": 1,
                "agencia": "La Asuncion",
                "contacto": "Pedro",
                "telefono_contacto": "04121802961",
                "email_contacto": "pedro@gmail.com",
                "dias_diferidos": 1,
                "ult_saldo_conciliado": "500000.00",
                "saldo_actual": "500000.00",
                "fecha_ult_conciliacion": "2020-01-07T03:00:00.000Z",
                "pto_venta": 0
            },
            "sig": "http://localhost:81/api/banco/2",
            "prev": "First Record"
        }
---
- **POST: /api/banco/** : Create a new bank account record on the api

    Request: 

        {
	
            "data":
                    {
                        "cuenta":56454154544,
                        "entidad_id":20,
                        "fecha_apertura":"2019-12-12 05:05:05",
                        "tipo_cuenta_id":1,
                        "dias_diferidos": 1,
                        "ult_saldo_conciliado":20000,
                        "saldo_actual":20000
                    }
        }

    Response:

        {
            "message": "Record created",
            "link": "http://localhost:81/api/banco/3"
        }

- **POST: /api/banco/:id** : Update a record on the banco entity

    Request: 

        {
	
            "data":
                    {
                        "ult_saldo_conciliado":50000,
                        "saldo_actual":50000
                    }
        }

    Response:

        {
            "message": "Record updated",
            "link": "http://localhost:81/api/banco/3"
        }
---
- **DELETE: /api/banco/** : Remove a record from the entity
        
        {
            "message": "Record deleted"
        }