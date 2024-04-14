"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { 
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormField,
  FormMessage
} from "@/components/ui/form";
import { useFormState } from "react-dom";
import { FormState } from "@/app/actions/index";

export const PhysioForm = ({
  onFormAction,
}: {
  onFormAction: (prevState: FormState, data: FormData) => Promise<FormState>;
}) => {
  const [state, formAction] = useFormState(onFormAction, {
    error: null,
    success: null, 
    loading: null,
  })
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm({
    defaultValues: {
      exerciseName: "",
      frequency: "", 
      days:""
    }
  })
  return (<>
  <div>Physio Form to go here</div>
  <Form {...form}>
    <form 
    ref={formRef}
    action={formAction}
    >
    <div>
    <FormField
    control={form.control}
    name='exerciseName'
    render={({ field }) => (
    <FormItem>
      <FormLabel>Exercise Name</FormLabel>
      <FormControl>
        <Input placeholder="" {...field} />
      </FormControl>
      <FormDescription>Exercise Name</FormDescription>
      <FormMessage/>
      </FormItem>
        )}
      />
    </div>
    </form>
  </Form>
    </>)
}