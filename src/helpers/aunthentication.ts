import { Request, Response, NextFunction } from 'express';
import { authURL } from '../keys';
import axios from 'axios';

export async function validar(req: Request, res: Response, next: NextFunction) {
    console.log(`[DATE] ${new Date()}`);
    try {
        let head: string = req.headers['x-access-control'] as string;
        let { data } = await axios.post(`${authURL}/validate`, { token: head });
        if (!data.validado) return res.status(401).json({ message: 'Invalid token' });
        req.userId = data.id;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
    
}
