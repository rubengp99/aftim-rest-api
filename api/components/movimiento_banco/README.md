# Banks Transactions
Every bank action commited to make the trace of the money

## Model


| Field | Description | Type | Priority |
| ----- | ----------- | ---- | -------- |
| **id** | Numerical identifier | *Number* | Optional |
| **adm_banco_id** | Identifier of the bank of the transaction | *Number* | Required |
| **adm_tipo_movimiento_id** | Identifier of the type of transaction (Transfer, Debit, Credit) | *Number* | Required |
| **adm_caja_id** | Identifier of the register  | *Number* | Optional |
| **fecha_at** | Date of the transaction | *Date* | Optional |
| **adm_tipo_pago_id** | Identifier of the type of pay (Cash, Tranfer, Check) | *Number* | Required |
| **referencia** | Reference of the bank transaction, in case of be a Tranfer | *String* | Optional |
| **credito** | Amount of money entering | *Number* | Optional |
| **credito_dolar** | Amont of money entering on dollars | *Number* | Optional |
| **debito** | Amount of money commig out | *Number* | Optional |
| **descripcion** | Short observation | *String* | Optional |
| **benificiario** | -------- | *Number* | Optional |
| **adm_entidad_id** | Bank entity identifier | *Number* | Optional |
| **orgigen** | Type of document of origin | *String* | Required |
| **documento** | Identifier of the origin document | *Number* | Required |
| **efectivo** | ------ | *Number* | Optional |
| **cheque_mismo_banco** | ------ | *Number* | Optional |
| **cheque_otro_banco** | ------ | *Number* | Optional |
| **islr** | Taxes | *Number* | Optional |
| **comision** | Bank transaction comision | *Number* | Optional |
| **fecha_cheque_mismo_banco** | ------ | *Date* | Optional |
| **fecha_cheque_otro_banco** | ------ | *Date* | Optional |
| **concliado** | Flag to indicate if the movement has be concilied to the bank | *Boolean* | Optional |
| **fecha_conciliado** | Date of conciliation | *Date* | Optional |
| **islrnc** | ------ | *Number* | Optional |
| **riva** | ------ | *Number* | Optional |
| **estatus** | ------ | *Number* | Optional |
| **fecha_transaction** | ------ |  *Date* | Optional | 
| **imagen** | voucher | *String* | Optional |