import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn:'/' //initial page localhost:3000
    }
})

export const config = {
    matcher: [
        "/users/:path*",
        "/conversations/:path*" //protect all routes inside the user route
    ]
}
