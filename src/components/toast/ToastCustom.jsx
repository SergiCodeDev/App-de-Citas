"use client"

import { Toaster } from "react-hot-toast"

export default function ToastCustom() {
    return (
        <Toaster
            position="bottom-right"
            reverseOrder={false}
        />
    )
}