import { NextRequest, NextResponse } from "next/server";
import { analytics } from "@/utils/analytics";

export default async function middleware(req: NextRequest) {

    if (req.nextUrl.pathname.startsWith('/view/menu/')) {
        // track analytics event
        try {
            console.log('analytics event')

            const menuId = req.nextUrl.pathname.split('/')[3]

            analytics.track("menuview",{
                page: `${req.nextUrl.pathname}`,
                menuId: menuId
            })
            console.log(req.nextUrl.pathname.split('/')[3])
            
        } catch (error) {
            // fail silently
            console.error(error)
        }
    }

    return NextResponse.next()
}

export const matcher = {
    matcher: ['/view/menu/:menuId*']
}