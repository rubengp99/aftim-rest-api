# Banks

This entity represent the banks accounts of the company to track the contability of it

## Model
- **id:** identifier of the record **(Optional field)** **Number**
- **cuenta:** the number of the account **Number**
- **fecha_at:** the date at the record was created **(Optional field)** **Date**
- **entidad_id:** the id of the oficcial bank **Number**
- **fecha_apertura:** date of the aperture of the account **Date**
- **direccion:** address of the nearest sucursal **String**
- **telefono:** phone number of the sucursal **String**
- **tipo_cuenta_id:** the id of the type of account **Number**
- **agencia:** name of the sucursal **String**
- **contacto:** name of the contact on the sucursal **String**
- **telefono_contacto:** phone of the contact **String**
- **email_contacto:** email of the contact **String**
- **dias_diferidos:** daysof the transaction diferation **Number**
- **ult_saldo_conciliado:** last balance reconciled in the bank account **Number**
- **saldo_actual:** current balance according to the system **Number**
- **fecha_ult_conciliacion:** Date of the last reconcile **Date**
- **pto_venta:** system POS binding **Number**
- **comision** comission for the transaction **Number**

## Routes:

>`GET: /api/banco/` : Gets an array of objects corresponding to "banco"

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

>`GET: /api/banco/1` : Get an object corresponding to "banco"

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

>`POST: /api/banco/` : Create a new bank account record on the api

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

------------------------------

        {
            "message": "Record created",
            "link": "http://localhost:81/api/banco/3"
        }

>`POST: /api/banco/:id` : Update a record on the banco entity

        {
	
            "data":
                    {
                        "ult_saldo_conciliado":50000,
                        "saldo_actual":50000
                    }
        }

-------

        {
            "message": "Record updated",
            "link": "http://localhost:81/api/banco/3"
        }

>`DELETE: /api/banco/` : Remove a record from the entity
        
        {
            "message": "Record deleted"
        }