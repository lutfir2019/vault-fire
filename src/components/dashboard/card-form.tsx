import type { Control } from "react-hook-form";
import { CustomField } from "../ui/form-field";
import { z } from "zod";
import { Input } from "../ui/input";
import { InputPassword } from "../ui/input-password";
import { Button } from "../ui/button";
import { ExternalLink } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";

interface CardFormProps {
  control: Control<z.infer<any>> | undefined;
  loading: boolean;
}

export function CardForm({ control }: Readonly<CardFormProps>) {
  return (
    <div className="space-y-3">
      <CustomField
        name="url"
        label="URL"
        control={control}
        render={({ field }) => {
          const validUrl =
            field.value && field.value.startsWith("http") ? field.value : null;

          return (
            <div className="flex items-center gap-2">
              <Input
                {...field}
                id="url"
                placeholder="https://example.com"
                className="flex-1"
              />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                disabled={!validUrl}
                onClick={() =>
                  validUrl &&
                  window.open(validUrl, "_blank", "noopener,noreferrer")
                }
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          );
        }}
      />
      <CustomField
        name="username"
        label="Username"
        control={control}
        render={({ field }) => (
          <Input {...field} id="username" placeholder="John_Doe" />
        )}
      />
      <CustomField
        name="password"
        label="Password"
        control={control}
        render={({ field }) => <InputPassword {...field} id="password" />}
      />
      <CustomField
        name="description"
        label="Description"
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            placeholder="Type your message here."
            className="max-h-[120px] overflow-y-auto resize-none"
          />
        )}
      />
      <CustomField
        name="type"
        label="Private"
        className="w-fit"
        control={control}
        render={({ field }) => (
          <Switch
            {...field}
            checked={field.value == "private"}
            onCheckedChange={(e) => {
              field.onChange(e === true ? "private" : "public");
            }}
          />
        )}
      />
    </div>
  );
}
