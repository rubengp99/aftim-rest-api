# aftim-rest-api
API REST of Aftim software, to connection with the suite of aftim apps

## Usage

><code>npm install --save</code>

## Scripts

- ### Clean
><code>npm run clean</code>

run this script to delete the dist folder

- ### Build
><code>npm run build</code>

run this script to compile the source code and create the dist folder

- ### Start
><code>npm start</code>

run this script to start the server on production

- ### Dev
><code>npm run dev</code>

run this script to generate a development server that watch the changes on the code

- ### Deploy
><code>npm run deploy</code>

run this script to do the clean build and start at the same time

- ### Helper
><code>npm run helper</code>

with this command you can make a helper script  
Example: <code>npm run helper -- authentication.js</code>

- ### Component
><code>npm run component  </code>  

This command make a new component of the api whit the respective model, controller and rout files

Example:<code>npm run component -- usuarios</code>

- ### seed
><code>npm run seed</code>

This command mount the database on the MySQL server

- ### Git
><code>npm run git</code>

with this script you can make a commit on git repository

Example: <code>npm run git -- Fix on authntication</code>






## Docs

### Authentication

Every call to the api require a header with a token with the developer authorization user and password of the partner </br>
the token have the next estructure: <code>{"password" : "123456", "user" : "admin"}</code> and the header's name is <code>x-access-control</code> this user and pasword will be given to you by de company you work for.

### Requests

Requests to the server must be made through the URLs: <code>http://localhost:81/api/${endpint}/?${query}</code>, each endpoint will be given for the resource they wish to obtain or mutate, for example: <code>http://localhost:81/api/conceptos/?limit=20&fields=id,nombre</code>

#### Query
<strong>fields</strong>: This paramater indicate which of the attributes of the entity are required by the user, separated by comma</br>
<strong>offset</strong>: This parameter indicates the index where the data path begins</br>
<strong>limit</strong>: This parameter indicates the lenght of the array of data</br>
<strong>order</strong>: This parameter indicates the order of the array ascendent/descendent</br>
<strong>orderField</strong>: This parameter indicates the key or fiedl by which the array will be ordered</br>
<strong>before</strong>: it gets concatenated before the filter key field to indicate that the records are less than or equal to the value</br>
<strong>after</strong>: it gets concatenated before the filter key field to indicate that the records are greater than or equal to the value</br>

## Examples

In this case we'll make a request to the endpoin conceptos, requesting all last 50 concepts and we just want 
the fields: id, nombre, codigo and  precio_dolar. With a price greater than $1.5 and less than $10. We can do this because the api identifies the entity's fields and can filter through them, prefixes such as 'before' or 'after' can be used so that the filtering is less than or greater than a value, as many filters can be concatenated as desired.

Route: <code>GET: http://localhost:81/api/conceptos/?fields=id,nombre,codigo,precio_dolar&after-precio_dolar=1.5&before-precio_dolar=10</code><br>

Code:

        //Request
        fetch('http://localhost:81/api/conceptos/?fields=id,nombre,codigo,precio_dolar&after-precio_dolar=1.5&before-precio_dolar=10',
        {
            method: 'GET',
            headers: {
                'x-access-control' : '{"password" : "123456", "user" : "admin"}'
            }
        })
            .then( (response) =>{
                var respuesta = JSON.parse(response);
                console.log(response.data);
            });


Response:


        {
            "totalCount": 6,
            "count": 4,
            "data": [
                {
                    "id": 1,
                    "nombre": "CARNE DE RES DE PRIMERA",
                    "codigo": "04010150541",
                    "precio_dolar": "5.75"
                },
                {
                    "id": 3,
                    "nombre": "PESCADO FRESCO",
                    "codigo": "27323221122",
                    "precio_dolar": "1.97"
                },
                {
                    "id": 4,
                    "nombre": "CARNE MOLIDA",
                    "codigo": "355214235135",
                    "precio_dolar": "5.03"
                },
                {
                    "id": 5,
                    "nombre": "CHORIZO POR BULTO",
                    "codigo": "3573676423",
                    "precio_dolar": "8.23"
                }
            ],
            "sig": "http://localhost:81/api/conceptos/?offset=5&limit=4",
            "prev": "First Page"
        }

On the other hand we can also do a request to create data, in this case we'll make a group

Route: <code>POST: http://localhost:81/api/conceptos</code>

Code: 

        // we make de object with the data
        var data = {
            nombre: 'Lacteos',
            imagen: 'default.png',
            visualizar: 0,
            posicion: 0
        }

        //and make the request
        fetch('http://localhost:81/api/conceptos/?fields=id,nombre,codigo,precio_dolar',
        {
            method: 'POST',
            headers: {
                'x-access-control' : '{"password" : "123456", "user" : "admin"}'
            },
            body:data
        })
            .then( (response) =>{
                var respuesta = JSON.parse(response);
                console.log(response.data);
            });

Response:

        {
            "message": "Record created",
            "link": "http://localhost:81/api/grupos/14"
        }


## Responses and errors

- ### Ok
Everything was good and the response is expected as desired
**Code:** 200 / **Message:** "Ok"

- ### Created 
The data its saved and the record created successfully
**Code:** 201 / **Message:** "Record created"

- ### Updated
The record was perfectly updated and midificated
**Code:** 201 / **Message:** "Record updated"

- ### Deleted
The record was deleted of the api
**Code:** 200 / **Message:** "Record deleted"

- ### Empty
The request was good but the endpoint is empty
**Code:** 200 / **Message:** "The entity is empty"

- ### Invalid ID
The given ID doesn't have the correct numeric format
**Code:** 400 / **Message:** "The given ID is not valid"

- ### Bad Request
The route or the data have invalid format or dosen't exist
**Code:** 400 / **Message:** "Bad Request"

- ### Unauthorized
The credentials are missing or are invalids
**Code:** 401 / **Message:** "The credentials are invalids"

- ### Forbidden
The user doesn't have permissions to use the route
**Code:** 403 / **Message:** "You are not allowed to use this route"

- ### Element Not Found
The elemente requested doesn't exist
**Code:** 404 / **Message:** "The elemente not exist"

- ### Route Not Found
The route requested not exist
**Code:** 404 / **Message:** "The route not exist"

- ### Bad Format
The format of the data is invalid
**Code:** 406 / **Message:** "Format incorrect"

- ### Internal Server Error
An error has ocurred on the server and the request was rejected
**Code:** 500 / **Message:** "Internal server error"


## Endpoints

- **[Areas de atencion]()**
- **[Banco]()**
- **[Cambio]()**
- **[Cargo]()**
- **[Ciudad]()**
- **[Clientes]()**
- **[Conceptos]()**
- **[Depositos]()**
- **[Descargos]()**
- **[Empresa]()**
- **[Entidad]()**
- **[Galeria]()**
- **[Grupos]()**
- **[Marcas]()**
- **[Movimientos de deposito]()**
- **[Pedidos]()**
- **[Subgrupos]()**
- **[Tipos]()**
- **[Unidades]()**
- **[Usuario]()**