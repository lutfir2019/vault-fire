import { SignupForm } from "@/components/signup-form";
import { Form } from "@/components/ui/form";
import { useSignup } from "@/hooks/useAuth";
import { getError } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod"; // ✅ gunakan * as z agar auto-import benar

// 🔒 Schema Sign-up
const formSchema = z
  .object({
    email: z.email("Invalid email address").nonempty("Email is required"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().nonempty("Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type TForm = z.infer<typeof formSchema>;

function Signup() {
  const form = useForm<TForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: signup, isPending, isError, error } = useSignup();

  const onSubmit = async (values: TForm) => {
    signup({ ...values });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-center items-center min-h-screen max-sm:p-2"
      >
        <SignupForm
          control={form.control}
          loading={isPending}
          isError={isError}
          errorMessage={getError(error)}
          className="w-full max-w-md justify-center"
        />
      </form>
    </Form>
  );
}

export default Signup;
