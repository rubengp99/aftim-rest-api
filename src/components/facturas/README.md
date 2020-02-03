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