"use client"

import { useSession } from "next-auth/react";

export default function Matches() {
    const {data: session} = useSession()
    console.log(session)
    return(
        <p>Matches</p>
    )
} 