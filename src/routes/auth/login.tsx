import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { LoginForm } from "@/components/login-form";
import { useLogin } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string().nonempty("Email is required field"),
  password: z.string().nonempty("Password is required field"),
});

type TForm = z.infer<typeof formSchema>;

function Login() {
  const form = useForm<TForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const { mutate: login, isPending, isError } = useLogin();

  const onSubmit = async (values: TForm) => {
    login(values, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <LoginForm
          control={form.control}
          loading={isPending}
          isError={isError}
        />
      </form>
    </Form>
  );
}

export default Login;
