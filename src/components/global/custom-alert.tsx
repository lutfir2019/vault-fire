import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface CustomAlertProps {
  variant?: "default" | "destructive";
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
}

function CustomAlert({
  variant = "default",
  size = "md",
  title,
  description,
  ...props
}: Readonly<React.ComponentProps<"div"> & CustomAlertProps>) {
  return (
    <Alert size={size} {...props} variant={variant}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  );
}

export default CustomAlert;
