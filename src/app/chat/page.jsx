"use client"

import { useSession } from "next-auth/react";

export default function Chat() {
    const {data: session} = useSession()
    console.log(session)
    return(
        <p>Chat</p>
    )
} 