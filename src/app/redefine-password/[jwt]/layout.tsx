
import { Metadata } from "next";
import verifyJwtToken from "@/utils/verify-jwt-token";
import Page from "./page"; 
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Password restore',
  description:
    "Atualização de senha",
};

interface RedefinePasswordProps {

    params:{
        jwt: string
    }

}

export default function RedefinePasswordLayer({ params }: RedefinePasswordProps){

    const { jwt } = params;

    if( !verifyJwtToken(jwt) ){

        return redirect('/');

    }

    return <Page payload={{
        payload:{
            jwt
        }
    }}/>

}