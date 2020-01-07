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
- **saldo_actual:** current balance according to the system
