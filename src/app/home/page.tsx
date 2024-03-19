'use client'

import { useEffect } from "react";
import { useRouter } from 'next/navigation'

type Props = {
}

const Page = (props: Props) => {
    const { push } = useRouter();
    useEffect(() => {
        push('/')
    }, [])

    return (
        <div>
        </div>
    );
}
export default Page
