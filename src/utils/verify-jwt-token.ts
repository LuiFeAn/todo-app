import JWT from 'jsonwebtoken';

export default function verifyJwtToken(jwt: string){

    try{

         JWT.verify(jwt,process.env.JWT_API_SECRET as string);

         return true

    }catch(err){

        return false;

    }

}