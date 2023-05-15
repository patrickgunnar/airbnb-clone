'use client'

import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import { toast } from 'react-hot-toast'
import Button from '../Button'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'


// login user modal
const LoginModal = () => {
    // router
    const router = useRouter()
    // use register modal hook
    const registerModal = useRegisterModal()
    // use login modal hook
    const loginModal = useLoginModal()
    // use state to check if element is loading
    const [isLoading, setIsLoading] = useState(false)
    // login form hook
    const {
        register, handleSubmit,
        formState: { errors, }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    // on submit function to handle the login of user
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        signIn('credentials', {
            ...data,
            redirect: false
        }).then(callback => {
            setIsLoading(false)

            if(callback?.ok) {
                toast.success('Logged in')
                router.refresh()
                loginModal.onClose()
            }

            if(callback?.error) {
                toast.error(callback.error)
            }
        })
    }

    // function to open register an account
    // on user create an account click
    const toggle = useCallback(() => {
        loginModal.onClose()
        registerModal.onOpen()
    }, [loginModal, registerModal])

    // body of the user sign up form
    // a Head and inputs for name, email and password
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title='Welcome back'
                subtitle='Login to your account!'
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

    // footer of the user login form
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
                        First time using Airbnb?
                    </div>
                    <div onClick={toggle}
                        className="text-neutral-800 cursor-pointer hover:underline">
                        Create an account
                    </div>
                </div>
            </div>
        </div>
    )

    // render user login modal
    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title='Login'
            actionLabel='Continue'
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}
 
export default LoginModal;
