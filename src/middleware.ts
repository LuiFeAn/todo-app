import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import verifyJwtToken from './utils/verify-jwt-token';
 
export async function middleware(request: NextRequest) {

  const jwtToken = request.cookies.get("JWT");

  const validJwt = await verifyJwtToken(jwtToken?.value!);

  console.log(validJwt);

  const urlRedirect = (path: string) => (
    NextResponse.redirect(new URL(path,request.url))
  )

  if( request.nextUrl.pathname === "/" && validJwt ){

    return urlRedirect('/todos');

  }

  if(request.nextUrl.pathname.startsWith("/todos")){

    if( !validJwt){

      return urlRedirect('/');

    }

  }
    
}
 
export const config = {
  matcher: [
    "/",
    "/todos",
  ],
}