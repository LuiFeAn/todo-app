"use client"

export interface UserTokenPayload {

    acessToken: string
    user:{
        username:string,
        email: string
    }

}

export default function userToken(){
    
    if (typeof window === 'undefined') {
        return null;
    }

    const token = localStorage.getItem("@AUTH_TOKEN");

    if (!token) {
        return null;
    }

    const json: UserTokenPayload = JSON.parse(token);

    return json;

}