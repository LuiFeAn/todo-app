
export interface UserTokenPayload {

    username: string
    email: string

}

export default function userToken(){

    const token = localStorage.getItem("@AUTH_TOKEN");

    const json: UserTokenPayload = JSON.parse(token!);

    return json;

}