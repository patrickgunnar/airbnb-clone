'use client'

import { IconType } from "react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import qs from 'query-string'


interface CategoryBoxProps {
    icon: IconType
    label: string
    selected?: boolean
}

// category box
const CategoryBox: React.FC<CategoryBoxProps> = ({ icon: Icon, label, selected }) => {
    // router
    const router = useRouter()
    // params
    const params = useSearchParams()

    // on click function
    const handleClick = useCallback(() => {
        // empty query
        let currentQuery = {}

        // look for the current params
        if(params) {
            // parse the params to turn it into an object
            // by default is a string
            currentQuery = qs.parse(params.toString())
        }

        // unpack updatedQuery
        // assign the current label to category, add new category
        const updatedQuery: any = {
            ...currentQuery,
            category: label
        }

        // if category is selected, remove it
        // reset it, delete category - works like a toggle
        if(params?.get('category') === label) {
            delete updatedQuery.category
        }

        // create category url string
        // cleaning the empty categories
        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true })

        // push url
        router.push(url)
    }, [params, label, router])

    // render category elements
    return ( 
        <div onClick={handleClick}
            className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer
                        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
                        ${selected ? 'text-neutral-800' : 'text-neutral-500'}`}
        >
            <Icon size={26} />
            <div className="font-medium text-sm">
                {label}
            </div>
        </div>
     );
}
 
export default CategoryBox;
