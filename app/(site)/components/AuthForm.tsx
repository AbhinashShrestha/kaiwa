'use client';

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import {FcGoogle} from "react-icons/fc"
import { IconBaseProps } from "react-icons";

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
    const [variant,setVariant] = useState<Variant>('LOGIN');
    const [isLoading,setIsLoading] = useState(false);

    const toggleVariant = useCallback(()=>{
        if(variant === 'LOGIN'){
            setVariant('REGISTER')
        } else {
            setVariant('LOGIN')        
        }
    },[variant])
    
    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    }= useForm<FieldValues>({
        defaultValues:{
            name:'',
            email:'',
            password:''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true) //cuz we are submitting 
        if(variant === 'REGISTER'){
            //axios.register
        }
        if(variant === 'LOGIN'){
            //nextauth signin
        }
    }

    const socialAction = (action: string)=> {
        setIsLoading(true);
        //social sign in
    }
    return (
        <div
            className="
                mt-8
                sm:mx-auto
                sm:w-full
                sm:max-w-md
            "
        >
            <div
                className="
                    bg-teal-100
                    px-4
                    py-8
                    shadow-2xl
                    sm:rounded-lg
                    sm:px-10
                    
                "
            >   
                <form
                    className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {variant === 'REGISTER' && (
                        <Input 
                            id="name" 
                            label="Name" 
                            register={register}
                            errors={errors}
                            disabled={isLoading}
                            />
                    )}
                    <Input 
                        id="email" 
                        label="Email address" 
                        type="email"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                    <Input 
                        id="password" 
                        label="Password" 
                        type="password"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                    <div>
                        <Button
                            disabled={isLoading}
                            fullWidth
                            type="submit" //this will trigger onSubmit instead of us writing one
                        >
                            {variant === 'LOGIN' ? 'Sign in':'Register'}
                        </Button>
                    </div>
                </form>
                <div className="mt-6">
                    <div className="relative">
                        <div
                            className="
                                absolute 
                                inset-0
                                flex
                                items-center
                            "
                        > 
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-teal-100 px-2 text-gray-500"> 
                                or continue with
                            </span>
                        </div>
                    </div>

                        <div className="mt-6 flex gap-2">
                            <AuthSocialButton 
                            icon={FcGoogle} 
                            onClick={()=>socialAction('google')}
                            />
                        </div>

                </div>
                <div className="
                    flex
                    gap-2
                    justify-center
                    text-sm
                    mt-6
                    px-2
                    text-gray-500
                ">
                    <div>{variant === 'LOGIN' ? "New to Kaiwa?" :"Already have an account?"}</div>
                    <div
                        onClick={toggleVariant}
                        className="underline cursor-pointer"
                    >
                        {variant === 'LOGIN' ? "Create an new account!" :"Login"}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AuthForm;