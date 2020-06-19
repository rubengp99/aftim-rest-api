# Facturas / Invoices

The invoices are the legal documents that allow a transaction

## Models

### Header

| Field | Description | Type | Priority |
| ----- | ----------- | ---- | -------- |
| **id** | Numeral identifier | *Number* | Optional |
| **numero_factura** | Reference number | *String* | Required |
| **numero_fiscal** | Fiscal number | *String* | Required |
| **fecha_at** | Date of creation | *Date* | Optional |
| **fecha_in** | Date of the last update | *Date* | Optional |
| **vendedor_id** | Vendor identifier | *Number* | Optional |
| **clientes_id** | Client identifier | *Number* | Optional |
| **subtotal** | Subtotal price | *Number* | Required |
| **subtotal_dolar** | Subtotal price in secundary currency | *Number* | Required |
| **iva** | Price of the iva calc | *Number* | Optional |
| **facturado** | Flag that indicate if the invoice is fiscal | *Boolean* | Optional |
| **estatus_pago** | Estatus of the payment | *String* | Optional |
| **abono** | Installment to the invoice | *Number* | Optional |
| **abono_dolar** | Installment to the invoice in the secundary currency | *Number* | Optional |
| **tipos_facturas_id** | Type of document | *Number* | Optional |
| **usuarios_id** | User identifier | *Number* | Required |
| **caja_id** | Take identifier | *Number* | Required |
| **observacion** | Observation | *String* | Optional |
| **enc_presupuesto_id** | Estimate identifer | *Number* | Optional |
| **anulada** | Null Flag | *Boolean* | Optional |
| **usuario_modificador** | --- | *Number* | Optional |
| **devuelto** | Refund total | *Number* | Optional | 
| **motivoreimpresion** | --- | *String* | Optional |
| **afecta_factura** | --- | *String* | Optional |
| **rest_pedidos_id** | Order identifier | *Number* | Optional |
| **fecha_hora** | --- | *String* | Optional |
| **coo** | Bematech data important | *String* | Optional | 
| **estatus_entrega** | --- | *Number* | Optional |
| **fecha_entrega** | --- | *Date* | Optional |
| **detalles** | Datails of the document | *Array* | Required |

### Details

| Field | Description | Type | Priority |
| ----- | ----------- | ---- | -------- |
| **id** | Numerical identifier | *Number* | Optional |
| **enc_facturas_id** | Header invoice identifier | *Number* | Required |
| **conceptos_id** | Concept identifier | *Number* | Required |
| **vendedor_id** | Vendor identifier | *Number* | Optional |
| **costo** | Cost of the concept | *Number* | Required |
| **costo_dolar** | Cost of the concept on the secundary currency | *Number* | Optional |
| **descuentopro** | Discount | *Number* | Optional | 
| **fecha_at** | Creation Date | *Date* | Optional |
| **cantidad** | Cantity | *Number* | Required |
| **despachado** | --- | *Number* | Optional |
| **devuelto** | Refund flag | *Boolean* | Optional | 
| **seriales_id** | Serials identifier | *Number* | Optional |
| **monto_descuento** | Amount of the discount | *Number* | Optional |
| **lotes_id** | Set identifier | *Number* | Optional | 


## Routes

- **GET /api/factura/** Get all invoices

       {
            "totalCount": 16,
            "count": 3,
            "data": [
                {
                    "id": 1,
                    "numero_factura": "00000001",
                    "numero_fiscal": "0",
                    "serial_impresora": null,
                    "fecha_at": "2019-07-18T04:00:00.000Z",
                    "fecha_in": null,
                    "vendedor_id": 1,
                    "clientes_id": 1,
                    "subtotal": "106955.00",
                    "subtotal_dolar": null,
                    "descuento": "0.00",
                    "iva": "0.00",
                    "facturado": 1,
                    "estatus_pago": 1,
                    "abono": "0.00",
                    "abono_dolar": "0.00",
                    "tipos_facturas_id": 1,
                    "usuarios_id": 1,
                    "caja_id": 1,
                    "observacion": "",
                    "enc_presupuesto_id": 0,
                    "anulada": 0,
                    "usuario_modificador": null,
                    "devuelto": "0.00",
                    "motivoreimpresion": null,
                    "afecta_factura": null,
                    "rest_pedidos_id": null,
                    "fecha_hora": null,
                    "coo": null,
                    "estatus_entrega": null,
                    "fecha_entrega": null,
                    "detalles": [
                        {
                            "id": 1,
                            "enc_facturas_id": 1,
                            "conceptos_id": 4,
                            "depositos_id": 1,
                            "vendedor_id": 2,
                            "costo": "25000.00",
                            "costo_dolar": "0.00",
                            "precio": "37000.00",
                            "precio_dolar": "0.00",
                            "descuentopro": "0.00",
                            "fecha_at": "2019-07-18T04:00:00.000Z",
                            "cantidad": "1.000",
                            "despachado": null,
                            "devuelto": 0,
                            "seriales_id": 0,
                            "monto_documento": "0.00",
                            "lotes_id": null
                        },
                        {
                            "id": 2,
                            "enc_facturas_id": 1,
                            "conceptos_id": 8,
                            "depositos_id": 1,
                            "vendedor_id": 1,
                            "costo": "62475.00",
                            "costo_dolar": "0.00",
                            "precio": "69955.00",
                            "precio_dolar": "0.00",
                            "descuentopro": "0.00",
                            "fecha_at": "2019-07-18T04:00:00.000Z",
                            "cantidad": "1.000",
                            "despachado": null,
                            "devuelto": 0,
                            "seriales_id": 0,
                            "monto_documento": "0.00",
                            "lotes_id": null
                        }
                    ]
                },
                {
                    "id": 2,
                    "numero_factura": "00000001",
                    "numero_fiscal": "45546541654",
                    "serial_impresora": "0",
                    "fecha_at": "2019-07-25T04:00:00.000Z",
                    "fecha_in": "2019-07-25T04:00:00.000Z",
                    "vendedor_id": 2,
                    "clientes_id": 1,
                    "subtotal": "37000.00",
                    "subtotal_dolar": "4.00",
                    "descuento": "0.00",
                    "iva": "0.00",
                    "facturado": 1,
                    "estatus_pago": 0,
                    "abono": "0.00",
                    "abono_dolar": "0.00",
                    "tipos_facturas_id": 5,
                    "usuarios_id": 2,
                    "caja_id": 1,
                    "observacion": null,
                    "enc_presupuesto_id": null,
                    "anulada": 0,
                    "usuario_modificador": null,
                    "devuelto": "0.00",
                    "motivoreimpresion": null,
                    "afecta_factura": null,
                    "rest_pedidos_id": null,
                    "fecha_hora": null,
                    "coo": null,
                    "estatus_entrega": null,
                    "fecha_entrega": null,
                    "detalles": [
                        {
                            "id": 3,
                            "enc_facturas_id": 2,
                            "conceptos_id": 2,
                            "depositos_id": 1,
                            "vendedor_id": 1,
                            "costo": "25000.00",
                            "costo_dolar": "4.24",
                            "precio": "37000.00",
                            "precio_dolar": "4.00",
                            "descuentopro": "0.00",
                            "fecha_at": "2019-07-25T04:00:00.000Z",
                            "cantidad": "1.000",
                            "despachado": null,
                            "devuelto": null,
                            "seriales_id": null,
                            "monto_documento": "0.00",
                            "lotes_id": null
                        }
                    ]
                },
                {
                    "id": 3,
                    "numero_factura": "00000002",
                    "numero_fiscal": "0",
                    "serial_impresora": null,
                    "fecha_at": "2019-07-30T04:00:00.000Z",
                    "fecha_in": null,
                    "vendedor_id": 1,
                    "clientes_id": 1,
                    "subtotal": "58155.00",
                    "subtotal_dolar": null,
                    "descuento": "0.00",
                    "iva": "0.00",
                    "facturado": 1,
                    "estatus_pago": 1,
                    "abono": "0.00",
                    "abono_dolar": "0.00",
                    "tipos_facturas_id": 1,
                    "usuarios_id": 1,
                    "caja_id": 1,
                    "observacion": "",
                    "enc_presupuesto_id": 0,
                    "anulada": 0,
                    "usuario_modificador": null,
                    "devuelto": "0.00",
                    "motivoreimpresion": null,
                    "afecta_factura": null,
                    "rest_pedidos_id": null,
                    "fecha_hora": null,
                    "coo": null,
                    "estatus_entrega": null,
                    "fecha_entrega": null,
                    "detalles": [
                        {
                            "id": 4,
                            "enc_facturas_id": 3,
                            "conceptos_id": 1,
                            "depositos_id": 1,
                            "vendedor_id": 1,
                            "costo": "36000.00",
                            "costo_dolar": "0.00",
                            "precio": "41400.00",
                            "precio_dolar": "0.00",
                            "descuentopro": "0.00",
                            "fecha_at": "2019-07-30T04:00:00.000Z",
                            "cantidad": "1.000",
                            "despachado": 1,
                            "devuelto": 0,
                            "seriales_id": 0,
                            "monto_documento": "0.00",
                            "lotes_id": null
                        },
                        {
                            "id": 5,
                            "enc_facturas_id": 3,
                            "conceptos_id": 3,
                            "depositos_id": 1,
                            "vendedor_id": 1,
                            "costo": "14960.00",
                            "costo_dolar": "0.00",
                            "precio": "16755.00",
                            "precio_dolar": "0.00",
                            "descuentopro": "0.00",
                            "fecha_at": "2019-07-30T04:00:00.000Z",
                            "cantidad": "1.000",
                            "despachado": 1,
                            "devuelto": 0,
                            "seriales_id": 0,
                            "monto_documento": "0.00",
                            "lotes_id": null
                        }
                    ]
                }
            ],
            "sig": "http://localhost:81/api/factura/?offset=3&limit=3",
            "prev": "First Page"
        }

---
- **GET /api/factura/:id** Get one invoice

        {
            "data": {
                "id": 1,
                "numero_factura": "00000001",
                "numero_fiscal": "0",
                "serial_impresora": null,
                "fecha_at": "2019-07-18T04:00:00.000Z",
                "fecha_in": null,
                "vendedor_id": 1,
                "clientes_id": 1,
                "subtotal": "106955.00",
                "subtotal_dolar": null,
                "descuento": "0.00",
                "iva": "0.00",
                "facturado": 1,
                "estatus_pago": 1,
                "abono": "0.00",
                "abono_dolar": "0.00",
                "tipos_facturas_id": 1,
                "usuarios_id": 1,
                "caja_id": 1,
                "observacion": "",
                "enc_presupuesto_id": 0,
                "anulada": 0,
                "usuario_modificador": null,
                "devuelto": "0.00",
                "motivoreimpresion": null,
                "afecta_factura": null,
                "rest_pedidos_id": null,
                "fecha_hora": null,
                "coo": null,
                "estatus_entrega": null,
                "fecha_entrega": null,
                "detalles": [
                    {
                        "id": 1,
                        "enc_facturas_id": 1,
                        "conceptos_id": 4,
                        "depositos_id": 1,
                        "vendedor_id": 2,
                        "costo": "25000.00",
                        "costo_dolar": "0.00",
                        "precio": "37000.00",
                        "precio_dolar": "0.00",
                        "descuentopro": "0.00",
                        "fecha_at": "2019-07-18T04:00:00.000Z",
                        "cantidad": "1.000",
                        "despachado": null,
                        "devuelto": 0,
                        "seriales_id": 0,
                        "monto_documento": "0.00",
                        "lotes_id": null
                    },
                    {
                        "id": 2,
                        "enc_facturas_id": 1,
                        "conceptos_id": 8,
                        "depositos_id": 1,
                        "vendedor_id": 1,
                        "costo": "62475.00",
                        "costo_dolar": "0.00",
                        "precio": "69955.00",
                        "precio_dolar": "0.00",
                        "descuentopro": "0.00",
                        "fecha_at": "2019-07-18T04:00:00.000Z",
                        "cantidad": "1.000",
                        "despachado": null,
                        "devuelto": 0,
                        "seriales_id": 0,
                        "monto_documento": "0.00",
                        "lotes_id": null
                    }
                ]
            },
            "sig": "http://localhost:81/api/factura/2",
            "prev": "First Record"
        }

---
- **POST /api/factura** Create a new invoice

    Request:

        {
            "data" : {
                "numero_factura" : "00000017",
                "numero_fiscal": "0",
                "vendedor_id": 1,
                "clientes_id": 1,
                "subtotal": "37000.00",
                "facturado": 1,
                "estatus_pago": 1,
                "tipos_facturas_id": 1,
                "usuarios_id": 1,
                "caja_id": 1
            },
            "data1":[
                {
                    "conceptos_id": 4,
                    "depositos_id": 1,
                    "vendedor_id": 2,
                    "costo": "25000.00",
                    "precio": "37000.00",
                    "cantidad": "1.000"
                }
            ]
        }

    Response:

        {
            "message": "Record created",
            "link": "http://localhost:81/api/facturas/19"
        }

---

- **POST /api/factura/:id** Update an invoice

    Request:

        {
            "data" : {
                "estatus_pago":0,
                "observacion" : "No pagado"
            }
        }

    Response:

        {
            "message": "Record updated",
            "link": "http://localhost:81/api/factura/19"
        }

- **DELETE /api/factura/** Remove an invoice

        {
            "message": "Record deleted"
        }

- **POST /api/factura/:id/detalles/** Add a detail to the invoice

        Request:

            {
                "data":{
                    "conceptos_id": 4,
                    "depositos_id": 1,
                    "vendedor_id": 2,
                    "costo": "25000.00",
                    "precio": "37000.00",
                    "cantidad": "1.000"
                }
            }
        
        Response:

            {
                "data":{
                    "conceptos_id": 4,
                    "depositos_id": 1,
                    "vendedor_id": 2,
                    "costo": "25000.00",
                    "precio": "37000.00",
                    "cantidad": "1.000"
                },
                "message" : "Record created"
            }

---
- **POST /api/factura/:id/detalles/:id/** Modify one detail

    Request:

        {
            "data":{
                "cantidad":2
            }
        }
    
    Response:

        {
            "message": "Record updated"
        }

- **DELETE /api/factura/:id/detalles/:id/** Delete one detail

        {
            "message":"Record deleted"
        }

- **GET /api/factura/total** Get the total of sells on invoices on range of time

    {
        "data":{
            "subtotal": 1264296589.23,
            "subtotal_decundaria":10000.00 
        }
    }