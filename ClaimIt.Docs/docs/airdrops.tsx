import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function Home() {
  const tutorials = [
    {
      id: "Kaisar",
      name: "Kaisar Network",
      badge: "AI Compute Layer",
      badgeColor: "blue",
      raised: "$11M raised",
    },
    {
      id: "rainmakr",
      name: "RainMakr",
      badge: "Testnet V1",
      badgeColor: "purple",
      raised: "$11M raised",
    },
    // {
    //   id: "nodepay",
    //   name: "NodePay",
    //   badge: "Season 4",
    //   badgeColor: "green",
    //   raised: "$88M raised",
    // }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white font-sans">
      <div className="max-w-4xl mx-auto p-6">
        <header className="mb-10">
          <div className="flex items-center gap-0.5 mb-2">
            <img className="h-14 w-14 rounded-full" src="https://cdn-icons-png.flaticon.com/512/9011/9011549.png"/>
            <h1 className="text-3xl font-bold">Claimit</h1>
          </div>
          <h2 className="text-4xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Airdrop Tutorials
          </h2>
          <p className="text-gray-400">
            Complete step-by-step guides to claim your tokens from the hottest crypto projects
          </p>
        </header>

        <main className="space-y-6">
          {tutorials.map((tutorial) => (
            <Link
              key={tutorial.id}
              href={`/tutorials/${tutorial.id}`}
              className="border border-gray-800 rounded-xl overflow-hidden bg-gray-900/50 backdrop-blur-sm block hover:bg-gray-800/30 transition-colors"
            >
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{tutorial.name}</span>
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full bg-${tutorial.badgeColor}-500/20 text-${tutorial.badgeColor}-300 border border-${tutorial.badgeColor}-500/30`}
                    >
                      {tutorial.badge}
                    </span>
                  </div>
                </div>
                <span className="text-sm text-green-400">{tutorial.raised}</span>
              </div>
            </Link>
          ))}
        </main>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2025 Claimit. All rights reserved.</p>
          <p className="mt-1">Disclaimer: Completing tasks does not guarantee airdrops. DYOR.</p>
        </footer>
      </div>
    </div>
  )
}
