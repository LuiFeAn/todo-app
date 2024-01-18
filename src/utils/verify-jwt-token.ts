import { jwtVerify  } from "jose";

export default async function verifyJwtToken(jwt: string){
  
    try{

        await jwtVerify(jwt,new TextEncoder().encode(process.env.JWT_API_SECRET));

        return true

    }catch(err){
        
        console.log(err);

        return false

    }

}
