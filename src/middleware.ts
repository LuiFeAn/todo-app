import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import verifyJwtToken from './utils/verify-jwt-token';
 
export async function middleware(request: NextRequest) {

  const jwtToken = request.cookies.get("JWT");

  const requestParams = request.nextUrl.pathname.split("/").slice(1,3);

  const [ path, param ] = requestParams;

  if( path.includes("redefine-password") && param ){

    if( !verifyJwtToken(param) ){

      return NextResponse.redirect(new URL("/",request.url));

    }
    

  }

  if(request.nextUrl.pathname.startsWith("/todos")){

    if( !jwtToken ){

      return NextResponse.redirect(new URL("/",request.url));

    }

    if( verifyJwtToken(jwtToken.value) ){

      return NextResponse.redirect(new URL("/",request.url));

    }

  }
    
}
 
export const config = {
  matcher: [
    "/",
    "/todos",
    "/redefine-password/:path*"
  ],
}