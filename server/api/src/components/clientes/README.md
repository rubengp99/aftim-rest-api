# Clientes / Clients

The clientes of the company, used to the POS, ERP actions and CRM stats.

## Model: 

| Field | Description | Type | Priority |
| ----- | ----------- | ---- | -------- |
| **id** | Numerical identifier | *Number* | Optional |
| **nombre** | Real name | String | *Required* |
| **nombre_comercial** | comercial name in case that be a company | *String* | Optional|
| **cedula** |  DNI in case that be natural person and RIF in case that be company | *String* | Required |
| **fecha_at** | Date that was created the client | *Date* | Optional |
| **fecha_in** | Date of the last update of the record | *Date* | Optional |
| **fecha_nac**| Birthdate of the client (company o natural person) | *Date* | Required |
| **sexo** | In case of be a natural person set the sex | *String* | Optional | 
| **tipo_estatus_id** | Status of the client | *Number* | Required |
| **telefono1** | main phone number | *String* | Optional |
| **telefono2** | optional phone number | *String* | Optional |
| **telefono3** | optional phone number | *String* | Optional | 
| **direccion_fisica** | Address | *String* | Required |
| **Horario** | Schedule of attention | *String* | Optional | 
| **decuento** | Special discount aplicated to this specified client | *Number* | Optional |
| **grupo_cliente_id** | Client group, to stats | *Number* | Optional |
| **limite_credito** | Limit of the credit | *Number* | Optional |
| **tarifa** | feet | *String* | Optional |
| **contribuyente** | Special fiscal contribuyent | *Boolean* | Optional | 
| **cobrador_id** | Individual deb collector | *Number* | Optional |
| **vendedor_id** | Individual vendor | *Number* | Optional |
| **zonas_id** | Zone of work | *Number* | Optional | 
| **correo_electronico** | email | *String* | Required | 
| **correo_electronico2** | Optional email | *String* | Optional |
| **pag_web** | Website | *String* | Optional |
| **dias_credito** | Days of limit of credit | *Number* | Optional |
| **creditos** | Number of credits given | *Number* | Optional |
| **contacto** | Name of the contact | *String* | Optional | 
| **telefono_contacto** | Phone number of the contact | *String* | Optional |
| **observacion** | Some observation | *String* | Optional |
| **estado_id** | State address | *Number* | Optional |
| **ciudad_id** | City | *Number* | Optional |
| **empleado** | Reference of some employee | *String* | Optional | 

## Routes 

- **GET: /api/clientes** : Get an array of clients 

        {
            "totalCount": 2,
            "count": 2,
            "data": [
                {
                    "id": 1,
                    "nombre": "CONTADO",
                    "nombre_comercial": "CONTADO",
                    "cedula": "V-00000000",
                    "fecha_at": "2019-07-03T14:24:28.000Z",
                    "fecha_in": "2019-07-18T18:44:56.000Z",
                    "fecha_nac": "2000-01-01T03:00:00.000Z",
                    "sexo": "M",
                    "tipo_estatus_id": 1,
                    "telefono1": "00000000000000000000",
                    "telefono2": null,
                    "telefono3": null,
                    "direccion": "LA ASUNCIO",
                    "direccion_fisica": null,
                    "horario": null,
                    "descuento": "0.00",
                    "grupo_cliente_id": 1,
                    "limite_credito": null,
                    "tarifa": "A",
                    "contribuyente": "SI",
                    "cobrador_id": null,
                    "vendedor_id": null,
                    "zonas_id": null,
                    "correo_electronico": "contado@contado.com",
                    "correo_electronico2": null,
                    "pag_web": null,
                    "dias_credito": null,
                    "creditos": null,
                    "contacto": "CONTACTO",
                    "telefono_contacto": "00000000000",
                    "observacion": null,
                    "estado_id": 16,
                    "ciudad_id": 331,
                    "empleado": 1
                },
                {
                    "id": 2,
                    "nombre": "Jose Veliz",
                    "nombre_comercial": null,
                    "cedula": "V-26778376",
                    "fecha_at": null,
                    "fecha_in": null,
                    "fecha_nac": "1998-07-29T04:00:00.000Z",
                    "sexo": "M",
                    "tipo_estatus_id": 1,
                    "telefono1": "04121802961",
                    "telefono2": null,
                    "telefono3": null,
                    "direccion": "LA ASUNCION",
                    "direccion_fisica": null,
                    "horario": null,
                    "descuento": "0.00",
                    "grupo_cliente_id": 1,
                    "limite_credito": null,
                    "tarifa": null,
                    "contribuyente": null,
                    "cobrador_id": null,
                    "vendedor_id": null,
                    "zonas_id": null,
                    "correo_electronico": "ducen29@gmail.com",
                    "correo_electronico2": null,
                    "pag_web": null,
                    "dias_credito": null,
                    "creditos": null,
                    "contacto": null,
                    "telefono_contacto": null,
                    "observacion": null,
                    "estado_id": 16,
                    "ciudad_id": 331,
                    "empleado": null
                }
            ],
            "sig": "Last page",
            "prev": "First Page"
        }
---
- **GET: /api/clientes/:id** : Get one client

        {
            "data": {
                "id": 2,
                "nombre": "Jose Veliz",
                "nombre_comercial": null,
                "cedula": "V-26778376",
                "fecha_at": null,
                "fecha_in": null,
                "fecha_nac": "1998-07-29T04:00:00.000Z",
                "sexo": "M",
                "tipo_estatus_id": 1,
                "telefono1": "04121802961",
                "telefono2": null,
                "telefono3": null,
                "direccion": "LA ASUNCION",
                "direccion_fisica": null,
                "horario": null,
                "descuento": "0.00",
                "grupo_cliente_id": 1,
                "limite_credito": null,
                "tarifa": null,
                "contribuyente": null,
                "cobrador_id": null,
                "vendedor_id": null,
                "zonas_id": null,
                "correo_electronico": "ducen29@gmail.com",
                "correo_electronico2": null,
                "pag_web": null,
                "dias_credito": null,
                "creditos": null,
                "contacto": null,
                "telefono_contacto": null,
                "observacion": null,
                "estado_id": 16,
                "ciudad_id": 331,
                "empleado": null
            },
            "sig": "Last record",
            "prev": "http://localhost:81/api/clientes/1"
        }
---
- **POST: /api/clientes** : Create a new client 

    Request: 

        {
            "data":{
                "nombre": "Jhonatan Brito",
                "cedula": "V-27100787",
                "fecha_nac": "1998-04-14",
                "sexo": "M",
                "tipo_estatus_id": 1,
                "telefono1": "0414259876",
                "direccion": "LA ASUNCION",
                "grupo_cliente_id": 1,
                "correo_electronico": "limoctan@gmail.com",
                "estado_id": 16,
                "ciudad_id": 331
            }
        }
    
    Response:

        {
            "message": "Record created",
            "link": "http://localhost:81/api/clientes/3"
        }
---
- **POST: /api/clientes/:id** : Modify the data of one cliente

    Request:

        {
            "data":{
                    "nombre": "Jhonatan Brito Campos",
                    "telefono1": "04266862529",
                    "direccion": "LA ASUNCION",
                    "tarifa": "A",
                    "correo_electronico": "jhoni@gmail.com"
            } 
        }

    Response: 

        {
            "message": "Record updated",
            "link": "http://localhost:81/api/clientes/3"
        }
---
- **DELETE: /api/clientes/:id** : Remmove a client from the API

        {
            "message" : "Record deleted"
        }