import axios, {AxiosInstance} from "axios";
import { Request } from 'express';

export const createAxios = function (tenantId: string):AxiosInstance{
    return axios.create({
        withCredentials: false,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'tenantId': tenantId
        }
    })
}

export const getTenantId = function(req: Request): string {
    return req.headers['tenant-id'] as string;
}