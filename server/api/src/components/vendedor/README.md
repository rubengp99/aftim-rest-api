# Seller

The information of the sellers

## Model

| Field | Description | Type | Priority |
| ----- | ----------- | ---- | -------- |
| **id** | Numerical identifier | *Number* | Optional |
| **nombre** | Name of the seller | *String* | Required | 
| **porcentaje** | Sales profit percentage | *Number* | Optional |

## Routes

- **GET: api/vendedor** Get all sellers

    Response:

    ```js

    {
        "totalCount": 3,
        "count": 3,
        "data": [
            {
                "id": 1,
                "nombre": "GENERAL",
                "porcentaje": "0.00"
            },
            {
                "id": 2,
                "nombre": "Jose",
                "porcentaje": "10.00"
            },
            {
                "id": 3,
                "nombre": "Irio",
                "porcentaje": "5.00"
            }
        ],
        "sig": "Last page",
        "prev": "First Page"
    }

    ```

- **GET: api/vendedor/:id** Get one seller

    Response:

    ```js
    
    {
        "data": {
            "id": 2,
            "nombre": "Jose",
            "porcentaje": "10.00"
        },
        "sig": "http://localhost:81/api/adm_vendedor/3",
        "prev": "http://localhost:81/api/adm_vendedor/1"
    }

    ```

- **GET: api/vendedor/:id/sell** Get the sells of a seller

    Response:

    ```js
    {
        "data": {
            "id": 2,
            "nombre": "Jose",
            "porcentaje": "10.00"
        },
        "ventas": 50,
        "total_ventas": "670339037.73",
        "total_ventas_dolar": "49958.00"
    }
    ```

- **GET: api/vendedor/mostsellers** Get the top of the sellers by sells

    Response:

    ```js

    {
        "data": [
            {
                "ventas": 49972,
                "venta_total": "4673026548.74",
                "venta_total_dolar": "49972.00",
                "id": 1,
                "nombre": "GENERAL",
                "porcentaje": "0.00"
            },
            {
                "ventas": 29827,
                "venta_total": "766316510.00",
                "venta_total_dolar": "29827.00",
                "id": 3,
                "nombre": "Irio",
                "porcentaje": "5.00"
            },
            {
                "ventas": 49958,
                "venta_total": "670339037.73",
                "venta_total_dolar": "49958.00",
                "id": 2,
                "nombre": "Jose",
                "porcentaje": "10.00"
            }
        ]
    }

    ```

- **POST: api/vendedor/** Create a new seller

    Request:

    ```js
        {
            "data":{
                "nombre":"Eduardo",
                "porcentaje":3
            }
        }
    ```
    Response:
    
    ```js

    {
        "message": "Record created",
        "data": {
            "nombre": "Eduardo",
            "porcentaje": 3,
            "id": 5
        },
        "link": "http://localhost:81/api/banco/5"
    }

    ```

- **POST: api/vendedor/:id** Update the data of a seller

    Request:

    ```js
        {
            "data":{
                "porcentaje":15
            }
        }
    ```
    Response:
    
    ```js

    {
        "message": "Record update",
        "link": "http://localhost:81/api/banco/5"
    }

    ```

- **DELETE: api/vendedor/:id** Delete a seller

    Response:
    
    ```js

    {
        "message": "Record deleted"
    }

    ```