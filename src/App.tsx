import { ThemeProvider } from "@/components/theme-provider.tsx"
import { ModeToggle } from "@/components/mode-toggle.tsx"
import ChargingSessions from "@/chargingSessions/ChargingSessions.tsx"
import NewChargingSession from "@/newChargingSession/NewChargingSession.tsx"

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <ModeToggle></ModeToggle>
      <div className="mx-2 lg:mx-auto lg:max-w-screen-md xl:max-w-screen-lg 2xl: max-w-screen-xl">
        <ChargingSessions />
        <NewChargingSession className="my-2" />
      </div>
    </ThemeProvider>
  )
}

export default App
