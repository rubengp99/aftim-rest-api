# Galeria / Galery

The gallery is responsible for the handling of the images of concepts

## Model

| Field | Description | Type | Priority |
| ----- | ----------- | ---- | -------- |
| **id** | Numerical identifer | *Number* | Optional |
| **conceptos_id** | Concept identifier | *Number* | Required |
| **imagen** | Name of the image | *String* | Required |

## Routes

- **GET /api/galeria/** Get all images

        {
            "totalCount" : 36,
            "count": 4,
            "data":[
                {
                    "id" : 1,
                    "concepto_id":1,
                    "imagen" : 12354874.jpg
                },
                {
                    "id" : 2,
                    "concepto_id":1,
                    "imagen" : 45786935.jpg
                },
                {
                    "id" : 3,
                    "concepto_id":2,
                    "imagen" : 87493218.jpg
                },
                {
                    "id" : 4,
                    "concepto_id":2,
                    "imagen" : 12476987.jpg
                }
            ],
            "sig": "http://localhost:81/api/galeria/?offset=5&limit=4",
            "prev": "First Page"
        }

---
- **GET /api/galeria/:id** Get one photo data

        {
            "data":{
                "id" : 1,
                "concepto_id":1,
                "imagen" : 12354874.jpg
            },
            "sig": "http://localhost:81/api/galeria/2",
            "prev": "First record"
        }

---
- **POST /api/galeria/** Create a new record referencing to a photo

    Request:

        {
            "data":{
                "concepto_id":1,
                "imagen" : 4787544.jpg
            }
        }

    Response:

        {
            "message" : "Record created",
            "link" : "http://localhost:81/galeria/37" 
        }

---
- **POST /api/galeria/:id** Update a record referencing to a photo

    Request:

        {
            "data":{
                "imagen" : 54854554.jpg
            }
        }

    Response:

        {
            "message" : "Record updated",
            "link" : "http://localhost:81/galeria/37" 
        }

---
- **DELETE /api/galeria/:id** Delete a record referencing to a photo

        {
            "message" : "Record deleted" 
        }