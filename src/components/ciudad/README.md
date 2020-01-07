# Ciudad / City

The referenc of the cities

## Model

- **id:** Numerical identifier **(Optional field) Number**
- **estado_id:** The estate of the city **Number**
- **nombre:** Name of the city **String**

>`GET: /api/ciudad` : Get an array of cities

    {
        "totalCount": 498,
        "count": 10,
        "data": [
            {
                "id": 1,
                "estado_id": 1,
                "nombre": "Maroa"
            },
            {
                "id": 2,
                "estado_id": 1,
                "nombre": "Puerto Ayacucho"
            },
            {
                "id": 3,
                "estado_id": 1,
                "nombre": "San Fernando de Atabapo"
            },
            {
                "id": 4,
                "estado_id": 2,
                "nombre": "Anaco"
            },
            {
                "id": 5,
                "estado_id": 2,
                "nombre": "Aragua de Barcelona"
            },
            {
                "id": 6,
                "estado_id": 2,
                "nombre": "Barcelona"
            },
            {
                "id": 7,
                "estado_id": 2,
                "nombre": "Boca de Uchire"
            },
            {
                "id": 8,
                "estado_id": 2,
                "nombre": "Cantaura"
            },
            {
                "id": 9,
                "estado_id": 2,
                "nombre": "Clarines"
            },
            {
                "id": 10,
                "estado_id": 2,
                "nombre": "El Chaparro"
            }
        ],
        "sig": "http://localhost:81/api/ciudad/?offset=10&limit=10",
        "prev": "First Page"
    }

>`GET: /api/ciudad` : Get one specified city

    {
        "data": {
            "id": 2,
            "estado_id": 1,
            "nombre": "Puerto Ayacucho"
        },
        "sig": "http://localhost:81/api/ciudad/3",
        "prev": "http://localhost:81/api/ciudad/1"
    }

>`POST: /api/ciudad` : Creat a new city

    {
        "data":{
            "estado_id": 3,
            "nombre": "Illinois"
        } 	
    }

----

    {
        "message": "Record created",
        "link": "http://localhost:81/api/ciudad/523"
    }

>`POST: /api/ciudad/:id` : Edit a city

    {
        "data":{
            "nombre": "Bogota"
        } 	
    }

---

    {
        "message": "Record updated",
        "link": "http://localhost:81/api/ciudad/523"
    }

>`DELETE: /api/ciudad/:id` Delete a city

    {
        "message": "Record deleted"
    }