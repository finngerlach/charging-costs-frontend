import { FieldValues, UseControllerProps } from "react-hook-form"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx"
import { Input } from "@/components/ui/input.tsx"

interface DurationFieldProps<T extends FieldValues>
  extends UseControllerProps<T> {
  label: string
  description: string
}

export default function DurationField<T extends FieldValues>({
  control,
  name,
  label,
  description,
}: DurationFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type="time" step="1" {...field} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
