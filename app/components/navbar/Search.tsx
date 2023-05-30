'use client'

import useCountries from '@/app/hooks/useCountries';
import useSearchModal from '@/app/hooks/useSearchModal';
import { differenceInBusinessDays } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi'


const Search = () => {
    // get search modal
    const searchModal = useSearchModal()
    // get search params hook
    const params = useSearchParams()
    // get by value from coutries hook
    const { getByValue } = useCountries()

    // get values from params
    // location value, startDate, endDate and guestCount
    const locationValue = params?.get('locationValue')
    const startDate = params?.get('startDate')
    const endDate = params?.get('endDate')
    const guestCount = params?.get('guestCount')

    // location label
    const locationLabel = useMemo(() => {
        // if location value
        if(locationValue) return getByValue(locationValue as string)?.label

        return 'Anywhere'
    }, [getByValue, locationValue])

    // duration label
    const durationLabel = useMemo(() => {
        // if startDate and endDate
        if(startDate && endDate) {
            // start date
            const start = new Date(startDate as string)
            // end date
            const end = new Date(endDate as string)
            // difference in days
            let diff = differenceInBusinessDays(end, start)

            // if diff is 0
            if(diff === 0) diff = 1

            return `${diff} Days`
        }

        return 'Any Week'
    }, [startDate, endDate])

    // guest label
    const guestLabel = useMemo(() => {
        // if guestCount 
        if(guestCount) return `${guestCount} Guests`

        return 'Add Guests'
    }, [guestCount])
    
    // render search bar elements
    // anywhere button
    // any week button
    // add guest button
    // search button
    return ( 
        <div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
            onClick={searchModal.onOpen}
        >
            <div className="flex flex-row items-center justify-between">
                <div className="text-sm font-semibold px-6">
                    {locationLabel}
                </div>
                <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
                    {durationLabel}
                </div>
                <div className="text-sm pl-6 pr-2 text-grey-600 flex flex-row items-center gap-3">
                    <div className="hidden sm:block">{guestLabel}</div>
                    <div className="p-2 bg-rose-500 rounded-full text-white">
                        <BiSearch size={18} />
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Search;
