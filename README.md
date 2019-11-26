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


## Docs

### Authentication

Every call to the api require a header with a token with the developer authorization user and password of the partner </br>
the token have the next estructure: <code>{"password" : "123456", "user" : "admin"}</code> and the header's name is <code>x-access-control</code>

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

## Entities

### Grupos

The groups/grupos are a entity dedicated to clasify the concepts by general types, for example the <strong>milk</strong> belong to the <strong>drinks</strong> group

#### Estructure:
<strong>id</strong>: Type: number (12). Unique identificator of the entity on the database </br>
<strong>nombre</strong>: Type: string (255). Name of the group to differentiate it </br>
<strong>imagen</strong>: Type: string(255). Url of the image avatar of the group </br>
<strong>visualizar</strong>: Type: boolean. Flag responsible for indicating if the group is seen in the system </br>
<strong>posicion</strong>: Type: number(12) Posicion of the group on the lists of the system </br>

#### End-points
<code>GET: api/grupos/</code> Get the groups</br>
<code>GET: api/grupos/:id</code> Get one group</br>
<code>GET: api/grupos/:id/subgrupos</code> Get the subgroups attached to a especified group</br>
<code>GET: api/grupos/:id/conceptos</code> Get the concepts attached to a especified group</br>
<code>POST: api/grupos/</code> Create a new group</br>
<code>POST: api/grupos/:id</code> Edit a group</br>
<code>DELETE: api/grupos/:id</code> Delete a group</br>

### Subgrupos

The subgroups like the groups are entities that handle the clasification of the concepts, for example the <strong>milk</strong> belong to the <strong>dairy</strong> subgroup which in turn belongs to the <strong>drinks</strong> group

#### Estructure:
<strong>id</strong>: Type: number(12). Unique identificator of the entity on the database </br>
<strong>grupos_id</strong>: Type: number(12). Identificator of the group that the subgroup belong to </br>
<strong>nombre</strong>: Type: string(255). Name of the subgroup to differentiate it </br>
<strong>imagen</strong>: Typè: string(255). Url of the image avatar of the group </br>
<strong>visualizar</strong>: Type: boolean. Flag responsible for indicating if the subgroup is seen in the system </br>
<strong>posicion</strong>: Type: boolean. Posicion of the group on the lists of the system </br>

#### End-points
<code>GET: api/subgrupos/</code> Get the subgroups</br>
<code>GET: api/subgrupos/:id</code> Get one subgroup</br>
<code>GET: api/subgrupos/:id/conceptos</code> Get the concepts attached to a especified subgroup</br>
<code>POST: api/subgrupos/</code> Create a new subgroup</br>
<code>POST: api/subgrupos/:id</code> Edit a subgroup</br>
<code>DELETE: api/subgrupos/:id</code> Delete a subgroup</br>

### Marcas

The brands/marcas  are identificators of the concepts, for example the <strong>milk</strong> is from <strong>Andes</strong> brand

#### Estructure:
<strong>id</strong>: Type: number(12). Unique identificator of the entity on the database </br>
<strong>nombre</strong>: Type: string(255). Name of the brand to differentiate it </br>

#### End-points
<code>GET: api/marcas/</code> Get the brands</br>
<code>GET: api/marcas/:id</code> Get one brand</br>
<code>GET: api/marcas/:id/conceptos</code> Get the concepts attached to a especified brand</br>
<code>POST: api/marcas/</code> Create a new brand</br>
<code>POST: api/marcas/:id</code> Edit a brand</br>
<code>DELETE: api/marcas/:id</code> Delete a brand</br>

### Unidades

The units are measures of cantity to the concepts, for example the <strong>milk</strong> is measured in  <strong>Liters</strong>

#### Estructure:
<strong>id</strong>: Type: number(12). Unique identificator of the entity on the database </br>
<strong>nombre</strong>: Type: string(255). Name of the unit to differentiate it </br>

#### End-points
<code>GET: api/unidades/</code> Get the units</br>
<code>GET: api/unidades/:id</code> Get one unit</br>
<code>POST: api/unidades/</code> Create a new unit</br>
<code>POST: api/unidades/:id</code> Edit a unit</br>
<code>DELETE: api/unidades/:id</code> Delete a unit</br>

### Depositos

The sotre are the diferentes places on the concepst can be on the inventory.

#### Estructure:
<strong>id</strong>: Type: number(12). Unique identificator of the entity on the database </br>
<strong>nombre</strong>: Type: string(255). Name of the store to differentiate it </br>
<strong>usuario_id</strong>: Type: number(12). ID of the user responsible for the store </br>

#### End-points
<code>GET: api/depositos/</code> Get the stores</br>
<code>GET: api/depositos/:id</code> Get one store</br>
<code>GET: api/depositos/:id/conceptos</code> Get the concepts attached to a especified store</br>
<code>POST: api/depositos/</code> Create a new store</br>
<code>POST: api/depositos/:id</code> Edit a store</br>
<code>DELETE: api/depositos/:id</code> Delete a store</br>

### Concepts

The concepts are the different types of assets that the business owns

#### Estructure:
<strong>id</strong>: Type: number(12). Unique identificator of the entity on the database </br>
<strong>codigo</strong>: Type: string(255). ID or code unique for the product, generaly is the barcode </br>
<strong>referencia</strong>: Type: string(255). Intern reference of the concept may be barcode to</br>
<strong>nombre</strong>: Type: string(255). Name of the product / service</br>
<strong>descripcion</strong>: Type: string(500). Description of the concept </br>
<strong>talla</strong>: Type: string(255). Size indentificator</br>
<strong>color</strong>: Type: string(255). Color identificator</br>
<strong>descuento</strong>: Type: number(12,2). Percent of discount at the sell</br>
<strong>serial_statico</strong>: Type: string(255).</br>
<strong>serial_dinamico</strong>: Type: string(255).</br>
<strong>existencia_minima</strong>: Type: number(12,2). Minimal store of the concept</br>
<strong>existencia_maxima</strong>: Type: number(12,2). Maximal sotre of the concepts</br>
<strong>tipos_conceptos_id</strong>: Type: number(12). Type of the concepts 1. Service / 2. Article / 3. Compound / 4. Spend / 5. Assembled</br>
<strong>ubicacion_id</strong>: Type: number(12). Especified ubication of the concepts on the fisic store</br>
<strong>costo</strong>: Type: number(12,2). Initial cost of adquisition.</br>
<strong>ultimo_costo</strong>: Type: number(12,2). Last cost of adquisition</br>
<strong>costo_mayor</strong>: Type: number(12,2). Higher cost of adquisition </br>
<strong>costo_promedio</strong>: Type: number(12,2). Average cost of adquisition </br>
<strong>fecha_at</strong>: Type: date. Date of creation of the resource </br>
<strong>fecha_in</strong>: Type: date. Date of the last modification </br>
<strong>fecha_uc</strong>: Type: date. Date of the last buy. </br>
<strong>grupos_id</strong>: Type: number(12). Identificator of the group tou which it belongs </br>
<strong>subgrupos_id</strong>: Type: number(12). Identificator of the subgroup tou which it belongs </br>
<strong>fecha_hora</strong>: Type: date. </br>
<strong>marcas_id</strong>: Type: number(12). Identificator of the brand </br>
<strong>estado</strong>: Type: number(12). state of the concept 1. Active / 2. Disabled </br>
<strong>pvp</strong>: Type: number(12,2).  </br>
<strong>precio_a</strong>: Type: number(12,2). Price of sell </br>
<strong>precio_b</strong>: Type: number(12,2). Price of sell secundary </br>
<strong>precio_c</strong>: Type: number(12,2). Price of sell secundary </br>
<strong>precio_dolar</strong>: Type: number(12,2). Price of sell on dollars </br>
<strong>costo_dolar</strong>: Type: number(12,2). Cost on dollars </br>
<strong>predcio_variante</strong>: Type: number(12,2) </br>
<strong>retiene</strong>: Type: boolean. </br>
<strong>farm_principio_activo_id</strong>: Type: number(12). Active ingredient of the product </br>
<strong>imagen</strong>: Type: string(255). URLs of the image avatar</br>
<strong>costo_adicional</strong>: Type: number(12,2).</br>
<strong>costo_adicional2</strong>: Type: number(12,2). </br>
<strong>cant_ensamblado</strong>: Type: number(12,2). Cant of the assambled template </br>
<strong>licor</strong>: Type: boolean. </br>
<strong>porcentaje</strong>: Type: number(12,2). Percentage of asignation to the seller </br>
<strong>visible_pv</strong>: Type: boolean. Active on the POS </br>
<strong>visible_web</strong>: Type: boolean. Active on the WEB </br>
<strong>rest_areas_id</strong>: Type: number(12). Area of sell </br>
<strong>set_cortesia</strong>: Type: boolean.</br>
<strong>exento</strong>: Type: boolean. No taxes </br>
<strong>merma</strong>: Type: boolean. Have waste </br>
<strong>existencia_c</strong>: Type: number(12,2) </br>
<strong>obviar_ajuste</strong>: Type: boolean. Adjust of price evade </br>
<strong>iva</strong>: Type: boolean. IVA aplicable </br>
<strong>presentaciones</strong>: Type: array. Collection of presentation of the concept </br>

#### End-points
<code>GET: api/conceptos/</code> Get the concepts</br>
<code>GET: api/conceptos/:id</code> Get one concept</br>
<code>POST: api/conceptos/</code> Create a new concept</br>
<code>POST: api/conceptos/:id</code> Edit a concept</br>
<code>DELETE: api/conceptos/:id</code> Delete a concept</br>
