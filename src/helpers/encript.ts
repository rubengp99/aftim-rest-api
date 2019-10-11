import bcrypt from 'bcryptjs';


export async function encriptar (password:string){
    try {
        
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password,salt);
        return hash;
    } catch (error) {
        console.log(error);
    }
}


export async function validar (password:string,hash:string){
    let valido = await bcrypt.compare(password,hash);
    return valido;
}
