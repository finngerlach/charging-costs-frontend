import { columns } from "./columns"
import { DataTable } from "./data-table"
import { getChargingSessionList } from "@/API.ts"

export default async function DemoPage() {
  const data = await getChargingSessionList()

  return (
    <div className="mx-auto">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
