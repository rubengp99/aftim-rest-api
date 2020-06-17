import axios, {AxiosInstance} from "axios";
import { Request } from 'express';

export const createAxios = function (baseURL: string, tenantId: string):AxiosInstance{
    return axios.create({
        baseURL: baseURL,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'tenant-id': tenantId
        }
    })
}

export const getTenantId = function(req: Request): string {
    return req.headers['tenant-id'] as string;
}