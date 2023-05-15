'use client'

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


// enum to the modal steps
enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

// rent modal box
const RentModal = () => {
    // router
    const router = useRouter()
    // use rent modal hook
    const rentModal = useRentModal()
    // use state to the modal steps
    const [step, setStep] = useState(STEPS.CATEGORY)
    // use state to the modal loading
    const [isLoading, setIsLoading] = useState(false)

    // rent modal form
    const { 
        register, handleSubmit, setValue, 
        watch, formState: {
            errors,
        }, reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        }
    })

    // watch form register category
    const category = watch('category')
    // watch from register location
    const location = watch('location')
    // watch from register guestCount
    const guestCount = watch('guestCount')
    // watch from register roomCount
    const roomCount = watch('roomCount')
    // watch from register bathroomCount
    const bathroomCount = watch('bathroomCount')
    // watch from register imageSrc
    const imageSrc = watch('imageSrc')

    // trick to load the map
    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location])

    // set user values
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }

    // function to handle on back state
    const onBack = () => setStep(value => value - 1)
    // function to handle on next state
    const onNext = () => setStep(value => value + 1)
    // on submit function
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        // if not on the last step
        // return the call of onNext function
        if(step !== STEPS.PRICE) return onNext()

        // set is loading to true
        setIsLoading(true)
        // pass data to the listings on api
        axios.post('/api/listings', data)
            .then(() => {
                toast.success('Listing Created!')
                router.refresh()
                reset()
                setStep(STEPS.CATEGORY)
                rentModal.onClose()
            })
            .catch(() => {
                toast.error('Something went wrong!')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    // current action label
    const actionLabel = useMemo(() => {
        if(step === STEPS.PRICE) return 'Create'

        return 'Next'
    }, [step])

    // current secondary action label
    const secondaryActionLabel = useMemo(() => {
        if(step === STEPS.CATEGORY) return undefined

        return 'Back'
    }, [step])

    // body content
    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                title="Which of these best describes your place?"
                subtitle="Pick a category"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {
                    categories.map(item => (
                        <div className="col-span-1"
                            key={item.label}
                        >
                            <CategoryInput
                                onClick={(category) => setCustomValue('category', category)}
                                selected={category === item.label}
                                label={item.label}
                                icon={item.icon}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )

    // body content if step is location
    if(step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where is your place located?"
                    subtitle="Help guests find you!"
                />
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue('location', value)}
                />
                <Map center={location?.latlng} />
            </div>
        )
    }

    // body content if step is info
    if(step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Share some basics about your place"
                    subtitle="What amenities do you have?"
                />
                <Counter
                    title="Guests"
                    subtitle="How many guests do you allow?"
                    value={guestCount}
                    onChange={(value) => setCustomValue('guestCount', value)}
                />
                <hr />
                <Counter
                    title="Rooms"
                    subtitle="How many rooms do you have?"
                    value={roomCount}
                    onChange={(value) => setCustomValue('roomCount', value)}
                />
                <hr />
                <Counter
                    title="Bathrooms"
                    subtitle="How many bathrooms do you have?"
                    value={bathroomCount}
                    onChange={(value) => setCustomValue('bathroomCount', value)}
                />
            </div>
        )
    }

    // body content if step is image
    if(step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Add a photo of your place"
                    subtitle="Show guests what your place looks like!"
                />
                <ImageUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValue('imageSrc', value)}
                />
            </div>
        )
    }

    // body content if step is description
    if(step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="How would you describe your place?"
                    subtitle="Short and sweet works best!"
                />
                <Input
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    // body content if step is price
    if(step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Now, set your price"
                    subtitle="How much do you charge per night?"
                />
                <Input
                    id="price"
                    label="Price"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    // render rent modal elements
    return ( 
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            title="Airbnb your home"
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            body={bodyContent}
        />
     );
}
 
export default RentModal;
