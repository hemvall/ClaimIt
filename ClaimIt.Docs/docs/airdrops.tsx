import Link from "next/link"
import { ChevronRight, ChevronLeft, BookOpen, Chrome, Badge, Coins, DollarSign, Users, Clock, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"


export default function Home() {
  const tutorials = [
    {
      id: "Kaisar",
      name: "Kaisar Network",
      description: "Kaisar is a decentralized AI compute network that allows anyone to contribute their computing power and earn rewards.",
      badge: "AI Compute Layer",
      badgeColor: "blue",
      raised: "$11M raised",
      participants: "10,000+",
      timeLeft: "2 months",
      estimatedReward: "$1000+",
      image: "https://avatars.githubusercontent.com/u/167415995?s=200&v=4"
    },
    {
      id: "rainmakr",
      name: "RainMakr",
      description: "RainMakr is a decentralized platform that allows users to create and manage their own AI models.",
      badge: "Testnet V1",
      badgeColor: "purple",
      raised: "$11M raised",
      participants: "2,000+",
      timeLeft: "10 days",
      estimatedReward: "~$400",
      image: "https://pbs.twimg.com/profile_images/1819638283133243394/vQq0fW9F_400x400.jpg"
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
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="relative">
              <img
                className="h-16 w-16 rounded-full ring-2 ring-purple-500/50"
                src="https://cdn-icons-png.flaticon.com/512/9011/9011549.png"
                alt="Claimit Logo"
              />
              <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-gray-900"></div>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Claimit
              </h1>
              <p className="text-sm text-gray-400">Airdrop Tutorial Platform</p>
            </div>
          </div>
        </header>
        <section className="text-center space-y-6 py-2">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
              Never Miss Another
              <br />
              Free Token Again
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mt-4 mx-auto">
              ClaimIt helps crypto users track and farm airdrops automatically. Stop hunting for opportunities—we handle
              it all for you!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
            {/* <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90">
              <BookOpen className="w-4 h-4 mr-2" />
              Start Learning
            </Button> */}
            <Button size="lg" variant="outline" className="border-gray-700 bg-transparent">
              <Chrome className="w-8 h-8 mr-0.2" />
              Get Extension (Soon)
            </Button>
          </div>
        </section>
        <main className="space-y-4 mb-12">
          {tutorials.map((tutorial) => (
            <Card
              key={tutorial.id} href={`/tutorials/${tutorial.id}`} className="border border-gray-800 rounded-xl gap-2 py-2 overflow-hidden bg-gray-900/50 backdrop-blur-sm block hover:bg-gray-800/30 transition-colors">
              <div className="p-4">
                <div className="flex items-center gap-3">
                  {/* <ChevronRight className="h-5 w-5 text-gray-400" /> */}
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 mr-1 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <img src={tutorial.image} className="rounded-full text-white" />
                    </div>
                    <span className="font-semibold text-base">{tutorial.name}</span>
                    <span className={`px-2 py-1 text-xs rounded-full bg-${tutorial.badgeColor}-500/20 text-${tutorial.badgeColor}-300 border border-${tutorial.badgeColor}-500/30`}>
                      {tutorial.badge}
                    </span>
                  </div>
                </div>
                <p className="text-gray-300 mt-2 mb-3">{tutorial.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-400" />
                    <div>
                      <div className="text-sm text-gray-400">Participants</div>
                      <div className="text-white font-semibold">{tutorial.participants}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-yellow-400" />
                    <div>
                      <div className="text-sm text-gray-400">Time Left</div>
                      <div className="text-white font-semibold">{tutorial.timeLeft}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-purple-400" />
                    <div>
                      <div className="text-sm text-gray-400">Est. Reward</div>
                      <div className="text-white font-semibold">{tutorial.estimatedReward}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href={`/tutorials/${tutorial.id}`} >
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90">
                        Start Farming
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                  </div>

                </div>
              </div>
            </Card>

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
