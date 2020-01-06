# aftim-rest-api
API REST of Aftim software, to connection with the suite of aftim apps

## Usage

<code>npm install --save</code>

## Scripts

### Clean
<code>npm run clean</code> </br></br>
run this script to delete the dist folder

### Build
<code>npm run build</code> </br></br>
run this script to compile the source code and create the dist folder

### Start
<code>npm start</code>  </br></br>
run this script to start the server on production

### Dev
<code>npm run dev</code> </br></br>
run this script to generate a development server that watch the changes on the code

### Deploy
<code>npm run deploy</code> </br></br>
run this script to do the clean build and start at the same time

### Helper
<code>npm run helper</code> </br></br>
with this command you can make a helper script</br>
Example:</br>
<code>npm run helper -- authentication.js</code>

### Component
<code>npm run component --<component-name> </code> </br></br>
This command make a new component of the api whit the respective model, controller and rout files</br>
Example:</br>
<code>npm run component -- usuarios</code>

### seed
<code>npm run seed</code> </br></br>
This command mount the database on the MySQL server

### Git
<code>npm run git</code> </br></br>
with this script you can make a commit on git repository</br>
Example:</br>
<code>npm run git -- Fix on authntication</code>






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
<strong>${field}</strong>: Indicates a key to filter the array</br>
<strong>before</strong>: it gets concatenated before the filter key field to indicate that the records are less than or equal to the value</br>
<strong>after</strong>: it gets concatenated before the filter key field to indicate that the records are greater than or equal to the value</br>

## Examples

In this case we'll make a request to the endpoin conceptos, requesting all last 50 concepts and we just want 
the fields: id, nombre, codigo and  precio_dolar </br>
Route: <code>http://localhost:81/api/conceptos/?fields=id,nombre,codigo,precio_dolar</code><br>

Code:</br>
<code>
    var myHeaders = new Headers({
        'x-access-control' : '{"password" : "123456", "user" : "admin"}' 
    });

    fetch('http://localhost:81/api/conceptos/?fields=id,nombre,codigo,precio_dolar',
    {
        method: 'POST',
        headers: myHeaders
    })
        .then( (response) =>{
            var respuesta = JSON.parse(response);
            console.log(response.data);
        });
</code></br>

Response:</br>

<code>
    {
        "totalCount": 6,
        "count": 6,
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
            },
            {
                "id": 6,
                "nombre": "JAMON AHUMADO",
                "codigo": "FGHFH",
                "precio_dolar": "12.67"
            },
            {
                "id": 7,
                "nombre": "QUESO GOUDA",
                "codigo": "45484548754121",
                "precio_dolar": "1.00"
            }
        ],
        "sig": "Last page",
        "prev": "First Page"
    }
</code>