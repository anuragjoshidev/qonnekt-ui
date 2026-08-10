interface FormFieldErrorProps {
  errors?: Record<string, string[]>;
  fieldName: string;
  className?: string;
}

export function FormFieldError({
  errors,
  fieldName,
  className = "",
}: FormFieldErrorProps) {
  const fieldErrors = errors?.[fieldName];

  if (!fieldErrors || fieldErrors.length === 0) {
    return null;
  }

  return (
    <p className={`text-sm text-red-600 dark:text-red-400 ${className}`}>
      {fieldErrors.join(", ")}
    </p>
  );
}

