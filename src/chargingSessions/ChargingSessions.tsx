import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx"
import { Button } from "@/components/ui/button.tsx"
import { RotateCw } from "lucide-react"
import { ReactElement, useEffect, useState } from "react"
import DemoPage from "@/chargingSessions/page.tsx"
import { Skeleton } from "@/components/ui/skeleton.tsx"

export default function ChargingSessions() {
  const [chargingSessions, setChargingSessions] = useState<ReactElement | null>(
    null,
  )
  const [isFetching, setIsFetching] = useState<boolean>(false)
  useEffect(() => {
    fetchData()
  }, [])

  function fetchData() {
    setIsFetching(true)
    DemoPage()
      .then((result) => setChargingSessions(result))
      .catch((error) => console.log(error))
      .finally(() => setIsFetching(false))
  }

  function handleRefresh() {
    fetchData()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Charging Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        {chargingSessions ? (
          chargingSessions
        ) : (
          <div className="mx-auto rounded-md border">
            <div className="flex justify-around h-12 px-4 border-b">
              <Skeleton className="h-4 w-[100px] align-middle my-auto" />
              <Skeleton className="h-4 w-[100px] align-middle my-auto" />
              <Skeleton className="h-4 w-[100px] align-middle my-auto" />
              <Skeleton className="h-4 w-[100px] align-middle my-auto" />
            </div>
            <div className="flex h-12 px-4 border-b">
              <Skeleton className="h-4 w-[350px] align-middle my-auto" />
            </div>
            <div className="flex h-12 px-4 border-b">
              <Skeleton className="h-4 w-[250px] align-middle my-auto" />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="justify-end">
        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          disabled={isFetching}
        >
          <RotateCw className={isFetching ? "animate-spin" : ""} />
        </Button>
      </CardFooter>
    </Card>
  )
}
