import { z } from "zod"

export async function getChargingSessionList(): Promise<ChargingSession[]> {
  return fetch("/api/chargingSession").then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.json() as Promise<ChargingSession[]>
  })
}

export type ChargingSession = {
  id: string
  startTime: string
  endTime: string
  energyAdded: number
  comment: string
}

const newChargingSession = z.object({
  startTime: z.date(),
  endTime: z.date(),
  energyAdded: z.number(),
  comment: z.string(),
})

export type NewChargingSession = z.infer<typeof newChargingSession>

export async function postChargingSession(
  newChargingSession: NewChargingSession,
) {
  return fetch("/api/chargingSession", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newChargingSession),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
  })
}

export async function deleteChargingSession(chargingSessionId: string) {
  return fetch(`/api/chargingSession/${chargingSessionId}`, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
  })
}
