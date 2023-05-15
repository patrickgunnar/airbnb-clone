'use client'

import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import { toast } from 'react-hot-toast'
import Button from '../Button'
import { signIn } from 'next-auth/react'
import useLoginModal from '@/app/hooks/useLoginModal'


// register user modal
const RegisterModal = () => {
    // use register modal hook
    const registerModal = useRegisterModal()
    // use login modal hook
    const loginModal = useLoginModal()
    // use state to check if element is loading
    const [isLoading, setIsLoading] = useState(false)
    // register form hook
    const {
        register, handleSubmit,
        formState: { errors, }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    // on submit function to handle the registration of user
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        axios.post('/api/register', data)
            .then(() => registerModal.onClose())
            .catch((error) => toast.error('Something went wrong!'))
            .finally(() => setIsLoading(false))
    }

    // function to open register an account
    // on user create an account click
    const toggle = useCallback(() => {
        registerModal.onClose()
        loginModal.onOpen()
    }, [loginModal, registerModal])

    // body of the user sign up form
    // a Head and inputs for name, email and password
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title='Welcome to Airbnb'
                subtitle='Create an account!'
            />
            <Input
                id='name'
                label='Name'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id='email'
                label='E-mail'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id='password'
                type='password'
                label='Password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    // footer of the user registration form
    // google and github registration or login modal
    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button
                outline
                label='Continue with Github'
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>
                        Already have an account
                    </div>
                    <div onClick={toggle}
                        className="text-neutral-800 cursor-pointer hover:underline">
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )

    // render user registration modal
    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title='Register'
            actionLabel='Continue'
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}
 
export default RegisterModal;
