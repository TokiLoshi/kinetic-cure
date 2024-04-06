"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpSchema } from "@/app/signup/signUpSchema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef } from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { useFormState } from  "react-dom";

// Method adopted from ProNext.js by Jack Herrington https://www.pronextjs.dev/tutorials/forms-management-with-next-js-app-router
export const SignUpForm = ({
  onFormAction
}: {
  onFormAction: (
    prevState: {
      message: string;
      user?: z.infer<typeof signUpSchema>;
      issues?: string[];
    },
    data: FormData
  ) => Promise<{
    message: string;
    user?: z.infer<typeof signUpSchema>;
    issues?: string[];
  }>;
}) => {
  const [ state, formAction ] = useFormState(onFormAction, {
    message: "",
  });
    const form = useForm<z.infer<typeof signUpSchema>>({
      resolver: zodResolver(signUpSchema),
      defaultValues: {
        email: "",
        password: "",
        passwordConfirmation: ""
      }
  })
  const formRef = useRef<HTMLFormElement>(null);
  const onSubmit = async(data: z.infer<typeof signUpSchema>) => {}
  return (
    <>
    <Form {...form}>
      <div>{state?.message}</div>
      <form ref={formRef} onSubmit={form.handleSubmit(() => formRef.current?.submit())} 
      className="space-y-8">
        <div className="space-y-8">
          <FormField control={form.control} name="email" render={({field}) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>Your Email</FormDescription>
              <FormMessage />
            </FormItem>
          )} />
          <FormField 
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>Enter your super secret Password</FormDescription>
              <FormMessage />
            </FormItem>
          )}
          />
          <FormField 
          control={form.control}
          name="passwordConfirmation"
          render={({ field}) => (
            <FormItem>
              <FormLabel>Password Confirmation</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
                <FormDescription>Please Confirm your password</FormDescription>
                <FormMessage />
              </FormControl>
            </FormItem>
          )}/>
        </div>
        <Button type="submit">Sign up</Button>
      </form>

    </Form>
    </>
  )
}