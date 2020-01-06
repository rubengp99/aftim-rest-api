/*
*Libreria que permite armar consultas sql
*dependiendo de los querys pasados por la URL
*/

/**
 * Generic consult data from a table
 * @param query modifier of the consult
 * @param tabla model of the table
 */
export function selectSQL(query:any={},tabla:string): string{
    var sql = "";
    let {fields} = query;
    if(fields){
        fields = fields.replace(',presentaciones','');
        fields = fields.replace(',presentaciones,','');
        fields = fields.replace('presentaciones,','');
        fields = fields.replace('presentaciones','');
    }
    let field = fields || "*";
    sql+= "SELECT "+field+" FROM "+tabla+" ";
    var where = "";
    var index = 0;
    
    for(const prop in query){
        if(prop !== 'fields' && prop !=='limit' && prop !== 'order' && prop !=='orderField' && prop !=='offset'){
            if(prop.includes('after') || prop.includes('before')){
                if(prop.split('-').length > 1){
                    where += (index==0) ? " WHERE " : " AND ";
                    where += `${prop.split('-')[1]} ${prop.split('-')[0] ==='before' ? '<=' : '>='} '${query[prop]}'`;
                    index++;
                }
            }else{
                where += (index==0) ? " WHERE " : " AND ";
                where += `${prop} like '%${query[prop]}%'`;
                index++;
            }
        }
        
    }
    sql += where;
    var meta = "";
    
    let limit = query.limit || "50";
    let order = query.order || "asc";
    let orderField = query.orderField || "id";
    let offset = query.offset || "0";
    meta = "  order by "+orderField+" "+order+" limit "+limit+" offset "+offset;
    sql += meta;
    console.log(`[CONSULT] ${sql}`);
    return sql;
}

/**
 * Generic consult to get one register
 * @param id id of the register
 * @param query modifier of the consult
 * @param tabla model of the table
 */
export function selectSQLOne(id:string | number,query:any,tabla:string):string {
    var sql = "";
    let {fields} = query;
    if(fields){
        fields = fields.replace(',presentaciones','');
        fields = fields.replace(',presentaciones,','');
        fields = fields.replace('presentaciones,','');
        fields = fields.replace('presentaciones','');
    }
    let field = fields || "*";
    sql= `SELECT ${field} FROM ${tabla} WHERE id = '${id}'`;
    console.log(`[CONSULT] ${sql}`);
    return sql;
}

/**
 * Generic consult to get register of a table using a key
 * @param query modifier of the consult
 * @param tabla the model  table
 * @param filter the model of the key
 * @param id the key to filter
 */
export function selectByFilter(query:any,tabla:string,filter:string,id:string | number):string{
    var sql = "";
    let {fields} = query;
    if(fields){
        fields = fields.replace(',presentaciones','');
        fields = fields.replace(',presentaciones,','');
        fields = fields.replace('presentaciones,','');
        fields = fields.replace('presentaciones','');
    }
    let field =  fields || "*";
    sql += `SELECT ${field} FROM ${tabla} WHERE ${filter}_id = ${id}`;
    var where = "";
    var index = 0;
    
    for(const prop in query){
        if(prop !== 'fields' && prop !=='limit' && prop !== 'order' && prop !=='orderField' && prop !=='offset'){
            if(prop.includes('after') || prop.includes('before')){
                if(prop.split('_').length > 1){
                    where += " AND";
                    where += `${prop.split('-')[1]} ${prop.split('-')[0] ==='before' ? '<=' : '>='} '${query[prop]}'`;
                    index++;
                }
            }else{
                where += " AND";
                where += `${prop} like '%${query[prop]}%'`;
                index++;
            }
        }
        
    }
    sql += where;
    var meta = "";
    
    let limit = query.limit || "50";
    let order = query.order || "asc";
    let orderField = query.orderField || "id";
    let offset = query.offset || "0";
    meta = ` order by ${orderField} ${order} limit ${limit} offset ${offset}`;
    sql += meta;
    console.log(`[CONSULT] ${sql}`);
    return sql;
}