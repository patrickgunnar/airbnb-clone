'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'


const Logo = () => {
    // next router
    const router = useRouter()

    // render airbnb logo
    return ( 
        <Image className="hidden md:block cursor-pointer"
            onClick={() => router.push('/')}
            src={'/images/logo.png'}
            alt='logo'
            height='100'
            width='100'
        />
     );
}
 
export default Logo;
