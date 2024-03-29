import { jwtVerify  } from "jose";

export default async function verifyJwtToken(jwt: string){
  
    console.log(jwt);

    try{

        await jwtVerify(jwt,new TextEncoder().encode(process.env.JWT_API_SECRET));

        return true

    }catch(err){

        return false

    }

}
