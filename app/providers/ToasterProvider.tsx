'use client'

import { Toaster } from "react-hot-toast"


const ToasterProvider = () => {
    // wrap toaster inside an use client component
    return (
        <Toaster />
    )
}

export default ToasterProvider
