'use client'

interface HeadingProps {
    title: string;
    subtitle?: string;
    center?: boolean
}

// Header component
// receives a title, sbtitle and if its centered
const Heading: React.FC<HeadingProps> = ({
    title, subtitle, center
}) => {
    // render head element
    return ( 
        <div className={center ? 'text-center' : 'text-start'}>
            <div className="text-2xl font-bold">
                {title}
            </div>
            <div className="font-light text-neutral-500 mt-2">
                {subtitle}
            </div>
        </div>
     );
}
 
export default Heading;
