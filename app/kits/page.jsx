import Configurator from "@/components/kits/Configurator";
import Navbar from "@/components/Navbar";
import Scene from "@/components/kits/Scene";

const Page = () => {
  return (
    <main className="flex flex-col h-screen bg-gray-300 bg-gradient-to-tl from-[#71a32f] via-green-200 to-transparent">
      {/* <Navbar /> */}
      <Configurator/>
      <Scene/>
    </main>
  )
}

export default Page
