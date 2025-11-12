import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CustomField } from "./ui/form-field";
import type { Control } from "react-hook-form";
import CustomAlert from "./global/custom-alert";
import { NavLink } from "react-router-dom";
import { InputPassword } from "./ui/input-password";

type TForm = {
  email: string;
  password: string;
};

export function LoginForm({
  className,
  control,
  loading,
  isError,
  errorMessage: _,
  ...props
}: React.ComponentProps<"div"> & {
  control: Control<TForm> | undefined;
  loading?: boolean;
  isError?: boolean;
  errorMessage?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>

          {isError && (
            <CustomAlert
              size="sm"
              variant="destructive"
              description="Your email or password is not valid"
            />
          )}
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <CustomField
              name="email"
              label="Email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                />
              )}
            />
            <CustomField
              name="password"
              label="Password"
              control={control}
              render={({ field }) => <InputPassword {...field} id="password" />}
            />

            <Field>
              <Button type="submit" disabled={loading}>
                {loading ? "Login..." : "Login"}
              </Button>

              <FieldDescription className="text-center">
                Don&apos;t have an account?{" "}
                <NavLink to="/auth/sign-up">Sign up</NavLink>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  );
}
