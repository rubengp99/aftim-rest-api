import { Request, Response, NextFunction } from 'express';
import { authURL } from '../keys';
import { getTenantId, createAxios } from './axios';
import axios from 'axios';

export async function validar(req: Request, res: Response, next: NextFunction) {
    console.log(`[DATE] ${new Date()}`);
    try {

        let head: string = req.headers['x-access-control'] as string;
        let tenantId: string = getTenantId(req);
        console.log(tenantId)
        let connection = createAxios(authURL as string, tenantId);
        
        if (!tenantId) return res.status(502).json({ message: 'A tenant ID must be specified' })
        let { data } = await connection.post(`/validate`, { token: head });
        if (!data.validado) return res.status(401).json({ message: 'Invalid token' });
        
        console.log('[LOG] Token validated.')
        
        req.userId = data.id;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
    
}

export async function encriptar(tenantId: string, token:any){
    try {
        let connection = createAxios(authURL as string, tenantId);
        let { data } = await connection.post(`/validate`, { password: token });
        return data.password;
    } catch (error) {
        throw new Error(`Error en conexion connection la BD, error: ${error.response.status}`);
    }
}
