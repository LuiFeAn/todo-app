import { InternalAxiosRequestConfig } from "axios";
import userToken from "@/utils/get-user-token";

export default async function todoApiRequestInterceptor(config: InternalAxiosRequestConfig<any>){

    try {
        
        const user = userToken();

        if( user ){
    
            config.headers.Authorization = `Bearer ${user.acessToken}`;
    
        }
    
        return config;

    }catch(err){

        return Promise.reject(err);

    }

}