'use client'

import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/button'
import { Label } from '@/components/label'
import { Input } from '@/components/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/card'

const personalInfoSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
})

const contactInfoSchema = z.object({
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
})

const accountSetupSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

const formSchema = z.object({
    ...personalInfoSchema.shape,
    ...contactInfoSchema.shape,
    ...accountSetupSchema.shape,
})

type FormData = z.infer<typeof formSchema>

export default function Stepper() {
    const [currentStep, setCurrentStep] = useState(1)
    const totalSteps = 4

    const { register, handleSubmit, formState: { errors }, trigger, getValues } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
    })

    const steps = [
        {
            title: "Personal Information",
            schema: personalInfoSchema,
            content: (
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                            id="firstName"
                            {...register("firstName")}
                        />
                        {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                            id="lastName"
                            {...register("lastName")}
                        />
                        {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
                    </div>
                </div>
            )
        },
        {
            title: "Contact Information",
            schema: contactInfoSchema,
            content: (
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            {...register("email")}
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            type="tel"
                            {...register("phone")}
                        />
                        {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
                    </div>
                </div>
            )
        },
        {
            title: "Account Setup",
            schema: accountSetupSchema,
            content: (
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            {...register("username")}
                        />
                        {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            {...register("password")}
                        />
                        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                    </div>
                </div>
            )
        },
        {
            title: "Confirmation",
            content: (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Summary</h3>
                    <p>First Name: {getValues("firstName")}</p>
                    <p>Last Name: {getValues("lastName")}</p>
                    <p>Email: {getValues("email")}</p>
                    <p>Phone: {getValues("phone")}</p>
                    <p>Username: {getValues("username")}</p>
                    <p>Password: ********</p>
                </div>
            )
        },
    ]

    const handleNext = async () => {
        const fields = Object.keys(steps[currentStep - 1].schema?.shape || {})
        const isValid = await trigger(fields as any)
        if (isValid) {
            setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
        }
    }

    const handlePrevious = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1))
    }

    const onSubmit = (data: FormData) => {
        console.log("Form submitted:", data)
        // Here you would typically send the data to your server
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Step {currentStep} of {totalSteps}: {steps[currentStep - 1].title}</CardTitle>
            </CardHeader>
            <CardContent>
                {/* <Progress value={(currentStep / totalSteps) * 100} className="mb-4" /> */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    {steps[currentStep - 1].content}
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    variant="outline"
                >
                    Previous
                </Button>
                {currentStep === totalSteps ? (
                    <Button onClick={handleSubmit(onSubmit)}>
                        Finish
                    </Button>
                ) : (
                    <Button onClick={handleNext}>
                        Next
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}