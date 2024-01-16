import { InternalAxiosRequestConfig } from "axios";
import userToken from "@/utils/get-user-token";

export default async function todoApiRequestInterceptor(config: InternalAxiosRequestConfig<any>){

    try {
        
        const token = userToken();

        if( token ){
    
            config.headers.Authorization = `Bearer ${token}`;
    
        }
    
        return config;

    }catch(err){

        return Promise.reject(err);

    }

}