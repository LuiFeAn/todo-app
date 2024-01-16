

export default function userToken(){

    const token = localStorage.getItem("@AUTH_TOKEN");

    return token;

}