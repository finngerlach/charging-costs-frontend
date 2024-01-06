"use client"

import { CellContext, ColumnDef } from "@tanstack/react-table"
import { ChargingSession, deleteChargingSession } from "@/API.ts"
import { interval, intervalToDuration } from "date-fns"
import { formatPaddedDateTime, formatPaddedDuration } from "@/lib/utils.ts"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx"
import { Button } from "@/components/ui/button.tsx"
import { MoreVertical } from "lucide-react"

const dateTimeFormatter = ({
  row,
}: CellContext<ChargingSession, unknown>): string => {
  const startTime = new Date(row.getValue("startTime"))
  return formatPaddedDateTime(startTime)
}

export const columns: ColumnDef<ChargingSession>[] = [
  {
    accessorKey: "startTime",
    header: "Start Time",
    cell: dateTimeFormatter,
  },
  {
    accessorFn: (row) => {
      const startTime = new Date(row.startTime)
      const endTime = new Date(row.endTime)
      const duration = intervalToDuration(interval(startTime, endTime))

      return formatPaddedDuration(duration)
    },
    header: "Duration",
  },
  {
    accessorKey: "energyAdded",
    header: "kWh Added",
  },
  {
    accessorKey: "comment",
    header: "Comment",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const chargingSession = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/*<DropdownMenuLabel>Actions</DropdownMenuLabel>*/}
            <DropdownMenuItem
              className="bg-destructive text-destructive-foreground focus:bg-destructive/90 focus:text-destructive-foreground cursor-pointer"
              onClick={async () =>
                await deleteChargingSession(chargingSession.id)
              }
            >
              Delete Charging Session
            </DropdownMenuItem>
            {/*<DropdownMenuSeparator/>*/}
            {/*<DropdownMenuItem>View customer</DropdownMenuItem>*/}
            {/*<DropdownMenuItem>View payment details</DropdownMenuItem>*/}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
