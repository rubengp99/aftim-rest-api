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

| 