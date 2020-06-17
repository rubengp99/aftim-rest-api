import { Request, Response, NextFunction } from 'express';
import { authURL } from '../keys';
import axios from 'axios';

export async function validar(req: Request, res: Response, next: NextFunction) {
    console.log(`[DATE] ${new Date()}`);
    try {
        let head: string = req.headers['x-access-control'] as string;
        let tenantId: string = req.headers['tenantId'] as string;
        let { data } = await axios.post(`${authURL}/validate`, { token: head });
        if (!data.validado) return res.status(401).json({ message: 'Invalid token' });
        if (tenantId === "") return res.status(502).json({ message: 'A tenant ID must be specified' })
        req.userId = data.id;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
    
}

export async function encriptar(token:any){
    try {
        let { data } = await axios.post(`${authURL}/validate`, { password: token });
        return data.password;
    } catch (error) {
        throw new Error(`Error en conexion connection la BD, error: ${error.response.status}`);
    }
}
