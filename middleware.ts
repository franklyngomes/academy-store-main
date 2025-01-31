import {NextResponse} from "next/server"

export const middleware = (request: any) => {
    const token = request.cookies.get("token")

    if(!token){
        return NextResponse.redirect(new URL("/auth/login", request.url))
    }
    console.log("Token found, proceeding to next response")
    return NextResponse.next()
}
export const config ={
    matcher: [
        "/cms/create",
        "/cms/list",
        "/cms/profile"
    ]
}