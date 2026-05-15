"use client";
import { FcGoogle } from "react-icons/fc";
import { Card, Separator } from "@heroui/react";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import toast, { Toaster } from "react-hot-toast"; 

const SignUpPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    console.log(user);

    const toastId = toast.loading("Creating your account...");

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.image,
    });

    console.log({ data, error });
    
    if (data) {
      toast.success("Account created successfully!", { id: toastId });
      router.push("/"); 
    }

    if (error) {
      toast.error(error.message || "Something went wrong. Please try again.", { id: toastId });
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google"
      });
    } catch (err) {
      toast.error("Google sign in failed!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto min-h-[80vh] flex flex-col justify-center items-center px-4">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="text-center my-5">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create Account</h1>
        <p className="text-gray-500 text-sm mt-1">Start your adventure with Wanderlust</p>
      </div>

      <Card className="border border-gray-100 rounded-xl p-8 bg-white shadow-[0_4px_25px_rgba(0,0,0,0.03)] flex flex-col gap-6">
        <Form onSubmit={onSubmit} className="flex w-96 flex-col gap-4">
          <TextField isRequired name="name" type="text">
            <Label className="text-sm font-semibold text-gray-700">Name</Label>
            <Input className="mt-1" placeholder="Enter your name" />
            <FieldError className="text-xs text-rose-500 mt-1" />
          </TextField>

          <TextField name="image" type="url">
            <Label className="text-sm font-semibold text-gray-700">Image URL</Label>
            <Input className="mt-1" placeholder="Image url" />
            <FieldError className="text-xs text-rose-500 mt-1" />
          </TextField>

          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-sm font-semibold text-gray-700">Email</Label>
            <Input className="mt-1" placeholder="john@example.com" />
            <FieldError className="text-xs text-rose-500 mt-1" />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label className="text-sm font-semibold text-gray-700">Password</Label>
            <Input className="mt-1" placeholder="Enter your password" />
            <Description className="text-xs text-gray-400 mt-1.5 block leading-normal">
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError className="text-xs text-rose-500 mt-1" />
          </TextField>

          <div className="flex justify-center mt-2">
            <Button className="w-full bg-[#119ab5] hover:bg-[#0e839a] text-white font-semibold h-11 rounded-lg transition-colors duration-150" type="submit">
              Create Account
            </Button>
          </div>
        </Form>

        <div className="flex justify-center items-center gap-3 py-1">
          <Separator className="flex-grow" />
          <div className="whitespace-nowrap text-xs text-gray-400 font-medium tracking-wide uppercase"> Or sign up with </div>
          <Separator className="flex-grow" />
        </div>

        <div>
          <Button 
            onClick={handleGoogleSignin} 
            variant="outline" 
            className="w-full h-11 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium flex items-center justify-center gap-2.5 transition-colors duration-150"
          >
            <FcGoogle className="text-xl" /> Sign in with Google
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SignUpPage;