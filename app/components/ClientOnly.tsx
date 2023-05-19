'use client'

import React, { useState, useEffect } from 'react'


interface ClientOnlyProps {
    children: React.ReactNode
}

// render client only
const ClientOnly: React.FC<ClientOnlyProps> = ({
    children
}) => {
    // use state
    const [hasMounted, setHasMounted] = useState(false)

    // set has mounted to true
    useEffect(() => {
        setHasMounted(true)
    }, [])

    // if not has mounted 
    if(!hasMounted) return null

    // render elements
    return (
        <>
            {children}
        </>
    );
}
 
export default ClientOnly;
