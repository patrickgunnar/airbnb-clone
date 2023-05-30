'use client'

import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { Range } from 'react-date-range';
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect';
import qs from "query-string"
import { formatISO } from 'date-fns';
import Heading from '../Heading';
import Calender from "../inputs/Calender";
import Counter from "../inputs/Counter";


enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}

// search modal
const SearchModal = () => {
    // get search modal hook
    const searchModal = useSearchModal()
    // get router
    const router = useRouter()
    // get search params
    const params = useSearchParams()

    // location state
    const [location, setLocation] = useState<CountrySelectValue>()
    // step use state
    const [step, setStep] = useState(STEPS.LOCATION)
    // guest count state
    const [guestCount, setGuestCount] = useState(1)
    // room count state
    const [roomCount, setRoomCount] = useState(1)
    // bathroom count state
    const [bathroomCount, setBathroomCount] = useState(1)
    // date range state
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    })

    // import map
    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location])

    // on back function
    const onBack = useCallback(() => {
        // step value minus 1
        setStep(value => value - 1)
    }, [])

    // on next function
    const onNext = useCallback(() => {
        // step value plus 1
        setStep(value => value + 1)
    }, [])

    // on submit handler
    const onSubmit = useCallback(async () => {
        // if not last step
        // return on next
        if(step !== STEPS.INFO) return onNext()

        // current query
        let currentQuery = {}

        // if any params
        // parse params to string
        if(params) currentQuery = qs.parse(params.toString())

        // update query
        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount
        }

        // if dateRage startDate
        if(dateRange.startDate) updatedQuery.startDate = formatISO(dateRange.startDate)
        // if dateRage endDate
        if(dateRange.endDate) updatedQuery.endDate = formatISO(dateRange.endDate)

        // final url
        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true })

        // reset steps
        setStep(STEPS.LOCATION)
        // close modal
        searchModal.onClose()
        
        // push router
        router.push(url)
    }, [step, onNext, params, location, guestCount, roomCount, bathroomCount, dateRange, searchModal, router])

    // action label
    const actionLabel = useMemo(() => {
        // if step is on last step
        if(step === STEPS.INFO) return 'Search'

        // else return next
        return 'Next'
    }, [step])

    // secondary action label
    const secondaryActionLabel = useMemo(() => {
        // if on the first step
        if(step === STEPS.LOCATION) return undefined

        // else return back
        return 'Back'
    }, [step])

    // body content
    let bodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading
                title='Where do you wanna go?'
                subtitle='Find the perfect location!'
            />
            <CountrySelect
                value={location}
                onChange={(value) => setLocation(value as CountrySelectValue)}
            />
            <hr />
            <Map center={location?.latlng} />
        </div>
    )

    // if step is date
    if(step === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="When do you plan to go?"
                    subtitle="Make sure everyone is free!"
                />
                <Calender
                    value={dateRange}
                    disabledDates={[]}
                    onChange={(value) => setDateRange(value.selection)}
                />
            </div>
        )
    }

    // if step is info 
    if(step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="More information"
                    subtitle="Find your perfect place!"
                />
                <Counter
                    title="Guests"
                    subtitle="How many guests are comming?"
                    value={guestCount}
                    onChange={(value) => setGuestCount(value)}
                />
                <Counter
                    title="Rooms"
                    subtitle="How many rooms do you need?"
                    value={roomCount}
                    onChange={(value) => setRoomCount(value)}
                />
                <Counter
                    title="Bathrooms"
                    subtitle="How many bathrooms do you need?"
                    value={bathroomCount}
                    onChange={(value) => setBathroomCount(value)}
                />
            </div>
        )
    }

    // render elements
    return (
        <Modal
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="Filters"
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            body={bodyContent}
        />
    );
}
 
export default SearchModal;
