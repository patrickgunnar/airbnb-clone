'use client'

import Image from 'next/image'


interface AvatarProps {
    src: string | null | undefined
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
    // render user avatar element
    // uses account avatar or avatar placeholder
    return ( 
        <Image className='rounded-full'
            src={src || '/images/placeholder.jpg'}
            alt='avatar'
            height='30'
            width='30'
        />
     );
}
 
export default Avatar;
