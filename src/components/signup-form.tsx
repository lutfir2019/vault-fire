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
import { InputPassword } from "./ui/input-password";
import { NavLink } from "react-router-dom";
import CustomAlert from "./global/custom-alert";

type TForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

export function SignupForm({
  control,
  loading,
  isError,
  errorMessage,
  ...props
}: React.ComponentProps<typeof Card> & {
  control: Control<TForm> | undefined;
  loading?: boolean;
  isError?: boolean;
  errorMessage?: string;
}) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>

        {isError && (
          <CustomAlert
            size="sm"
            variant="destructive"
            description={errorMessage}
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
              <Field>
                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                />
                <FieldDescription>
                  We&apos;ll use this to contact you. We will not share your
                  email with anyone else.
                </FieldDescription>
              </Field>
            )}
          />
          <CustomField
            name="password"
            label="Password"
            control={control}
            render={({ field }) => (
              <Field>
                <InputPassword
                  {...field}
                  id="password"
                  autoComplete="new-password"
                />
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
                <FieldDescription className="text-muted-foreground italic">
                  ⚠️ This password will be used as your <b>master key</b> to
                  encrypt and unlock your Vault data. Please choose a strong and
                  memorable password — if you lose it, your encrypted data
                  cannot be recovered.
                </FieldDescription>
              </Field>
            )}
          />
          <CustomField
            name="confirmPassword"
            label="Confirm Password"
            control={control}
            render={({ field }) => (
              <Field>
                <InputPassword
                  {...field}
                  id="confirm-password"
                  autoComplete="new-password"
                />
                <FieldDescription>
                  Please confirm your password.
                </FieldDescription>
              </Field>
            )}
          />

          <FieldGroup>
            <Field>
              <Button type="submit" disabled={loading}>
                {loading ? "Create Account..." : "Create Account"}
              </Button>
              <FieldDescription className="px-6 text-center">
                Already have an account?{" "}
                <NavLink to="/auth/login">Sign in</NavLink>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
