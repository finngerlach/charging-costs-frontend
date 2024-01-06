import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { add, Duration, format, startOfToday } from "date-fns"
import { postChargingSession } from "@/API.ts"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx"
import { Button } from "@/components/ui/button.tsx"
import { cn } from "@/lib/utils.ts"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Textarea } from "@/components/ui/textarea.tsx"
import React from "react"
import DurationField from "@/newChargingSession/DurationField.tsx"

const formSchema = z
  .object({
    startDate: z.date({
      required_error: "Start Date is required.",
      invalid_type_error: "Format invalid.",
    }),
    startTime: z
      .string({
        required_error: "Start Time is required.",
        invalid_type_error: "Format invalid.",
      })
      .min(1, "Start Time is required.")
      .regex(/\d{2}:\d{2}:\d{2}/)
      .transform((val) => convertTimeString(val)),
    duration: z
      .string({
        required_error: "Start Time is required.",
        invalid_type_error: "Format invalid.",
      })
      .min(1, "Start Time is required.")
      .regex(/\d{2}:\d{2}:\d{2}/)
      .transform((val) => convertTimeString(val)),
    energyAdded: z.coerce.number(),
    comment: z.string(),
  })
  .transform(({ startDate, startTime, duration, ...rest }) => {
    const newStartTime = add(startDate, startTime)
    return {
      startTime: newStartTime,
      endTime: add(newStartTime, duration),
      ...rest,
    }
  })

function convertTimeString(time: string): Duration {
  const splitString = time.split(":").map((value) => Number(value))
  return {
    hours: splitString[0],
    minutes: splitString[1],
    seconds: splitString[2],
  }
}

export default function NewChargingSession({
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const form = useForm<
    z.input<typeof formSchema>,
    unknown,
    z.output<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: startOfToday(),
      startTime: "",
      duration: "",
      energyAdded: 0,
      comment: "",
    },
  })

  async function onSubmit(values: z.output<typeof formSchema>) {
    console.log(values)
    await postChargingSession(values)
  }

  return (
    <Card {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Add new Charging Session</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Start Date of the charging session.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DurationField
              control={form.control}
              name="startTime"
              label="Start Time"
              description="Start time of the charging session."
            />
            <DurationField
              control={form.control}
              name="duration"
              label="Duration"
              description="Duration of the charging session."
            />
            <FormField
              control={form.control}
              name="energyAdded"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Energy Added</FormLabel>
                  <FormControl>
                    <Input type="number" inputMode="decimal" {...field} />
                  </FormControl>
                  <FormDescription>
                    Energy added during the charging session.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="justify-end">
            <Button variant="default" size="default" type="submit">
              Submit
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
