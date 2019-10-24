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

### Grupos

The groups/grupos are a entity dedicated to clasify the concepts by general types, for example the <strong>milk</strong> belong to the <strong>drinks</strong> group

#### Estructure:
<strong>id</strong>: Unique identificator of the entity on the database </br>
<strong>nombre</strong>: Name of the group to differentiate it </br>
<strong>imagen</strong>: Url of the image avatar of the group </br>
<strong>visualizar</strong>: Flag responsible for indicating if the group is seen in the system </br>
<strong>posicion</strong>: Posicion of the group on the lists of the system </br>

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
<strong>id</strong>: Unique identificator of the entity on the database </br>
<strong>grupos_id</strong>: Identificator of the group that the subgroup belong to </br>
<strong>nombre</strong>: Name of the subgroup to differentiate it </br>
<strong>imagen</strong>: Url of the image avatar of the group </br>
<strong>visualizar</strong>: Flag responsible for indicating if the subgroup is seen in the system </br>
<strong>posicion</strong>: Posicion of the group on the lists of the system </br>

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
<strong>id</strong>: Unique identificator of the entity on the database </br>
<strong>nombre</strong>: Name of the subgroup to differentiate it </br>

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
<strong>id</strong>: Unique identificator of the entity on the database </br>
<strong>nombre</strong>: Name of the unit to differentiate it </br>

#### End-points
<code>GET: api/unidades/</code> Get the units</br>
<code>GET: api/unidades/:id</code> Get one unit</br>
<code>POST: api/unidades/</code> Create a new unit</br>
<code>POST: api/unidades/:id</code> Edit a unit</br>
<code>DELETE: api/unidades/:id</code> Delete a unit</br>

### Depositos

The sotre are the diferentes places on the concepst can be on the inventory.

#### Estructure:
<strong>id</strong>: Unique identificator of the entity on the database </br>
<strong>nombre</strong>: Name of the store to differentiate it </br>
<strong>usuario_id</strong>: ID of the user responsible for the store </br>

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
<strong>id</strong>: Unique identificator of the entity on the database </br>
<strong>codigo</strong>: ID of the user responsible for the store </br>
<strong>referencia</strong>: ID of the user responsible for the store </br>
<strong>nombre</strong>: Name of the store to differentiate it </br>
<strong>descripcion</strong>: ID of the user responsible for the store </br>
<strong>talla</strong>: Name of the store to differentiate it </br>
<strong>color</strong>: Name of the store to differentiate it </br>
<strong>descuento</strong>: Name of the store to differentiate it </br>
<strong>serial_statico</strong>: Name of the store to differentiate it </br>
<strong>serial_dinamico</strong>: Name of the store to differentiate it </br>
<strong>existencia_minima</strong>: Name of the store to differentiate it </br>
<strong>existencia_maxima</strong>: Name of the store to differentiate it </br>
<strong>tipos_conceptos_id</strong>: Name of the store to differentiate it </br>
<strong>ubicacion_id</strong>: Name of the store to differentiate it </br>
<strong>costo</strong>: Name of the store to differentiate it </br>
<strong>ultimo_costo</strong>: Name of the store to differentiate it </br>
<strong>costo_mayor</strong>: Name of the store to differentiate it </br>
<strong>costo_promedio</strong>: Name of the store to differentiate it </br>
<strong>fecha_at</strong>: Name of the store to differentiate it </br>
<strong>fecha_in</strong>: Name of the store to differentiate it </br>
<strong>fecha_uc</strong>: Name of the store to differentiate it </br>
<strong>grupos_id</strong>: Name of the store to differentiate it </br>
<strong>subgrupos_id</strong>: Name of the store to differentiate it </br>
<strong>fecha_hora</strong>: Name of the store to differentiate it </br>
<strong>marcas_id</strong>: Name of the store to differentiate it </br>
<strong>estado</strong>: Name of the store to differentiate it </br>
<strong>pvp</strong>: Name of the store to differentiate it </br>
<strong>precio_a</strong>: Name of the store to differentiate it </br>
<strong>precio_b</strong>: Name of the store to differentiate it </br>
<strong>precio_c</strong>: Name of the store to differentiate it </br>
<strong>precio_dolar</strong>: Name of the store to differentiate it </br>
<strong>costo_dolar</strong>: Name of the store to differentiate it </br>
<strong>predcio_variante</strong>: Name of the store to differentiate it </br>
<strong>retiene</strong>: Name of the store to differentiate it </br>
<strong>farm_principio_activo_id</strong>: Name of the store to differentiate it </br>
<strong>imagen</strong>: Name of the store to differentiate it </br>
<strong>costo_adicional</strong>: Name of the store to differentiate it </br>
<strong>costo_adicional2</strong>: Name of the store to differentiate it </br>
<strong>cant_ensamblado</strong>: Name of the store to differentiate it </br>
<strong>licor</strong>: Name of the store to differentiate it </br>
<strong>porcentaje</strong>: Name of the store to differentiate it </br>
<strong>visible_pv</strong>: Name of the store to differentiate it </br>
<strong>visible_web</strong>: Name of the store to differentiate it </br>
<strong>rest_areas_id</strong>: Name of the store to differentiate it </br>
<strong>set_cortesia</strong>: Name of the store to differentiate it </br>
<strong>exento</strong>: Name of the store to differentiate it </br>
<strong>merma</strong>: Name of the store to differentiate it </br>
<strong>existencia_c</strong>: Name of the store to differentiate it </br>
<strong>obviar_ajusto</strong>: Name of the store to differentiate it </br>
<strong>iva</strong>: Name of the store to differentiate it </br>
<strong>presentaciones</strong>: Name of the store to differentiate it </br>

#### End-points
<code>GET: api/conceptos/</code> Get the concepts</br>
<code>GET: api/conceptos/:id</code> Get one concept</br>
<code>POST: api/conceptos/</code> Create a new concept</br>
<code>POST: api/conceptos/:id</code> Edit a concept</br>
<code>DELETE: api/conceptos/:id</code> Delete a concept</br>
