"use client"
import { use } from "react" // Add this import
import Link from "next/link"
import { ChevronLeft, ExternalLink, Star, Share2, Clock } from "lucide-react"
import { ProgressBar } from "@/components/progress-bar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Rocket, DollarSign, Target, Users } from "lucide-react"

// Tutorial data
const tutorialsData = {
  Kaisar: {
    name: "@KaisarNetwork",
    x: "https://x.com/KaisarNetwork",
    image: "https://pbs.twimg.com/profile_images/1776202066282926080/5ppDFq9k_400x400.jpg",
    badge: "Gros Potentiel",
    badgeColor: "blue",
    raised: "$54M (VCs)",
    title: "Guide rapide",
    cost: "<1$",
    estimatedReward: "+1000$",
    estimatedTime: "10 minutes",
    content: [
      {
        step: 1,
        type: "",
        text: "CRÉATION DE COMPTE",
        subItems: [
          {
            type: "text",
            text: "Crée un compte sur la plateforme: 👉 Renseigne une adresse mail, connecte ton compte X (Twitter), Discord, etc.",
          },
          {
            type: "image",
            link: {
              url: "https://lh3.googleusercontent.com/nIKVFi79FAnod_6crvWI4Iu3-8dvm75wXy1iZr9slp2kC_FbgzY3UXz-6a_GNR2WbJW6w9xOdz0cSXyge7PLBLSNRQ=s1280-w1280-h800",
              text: "Kaisar Dashboard",
            },
          },
        ],
      },
      {
        step: 2,
        type: "",
        text: "INSTALLATION DE L'APP",
        subItems: [
          {
            type: "link",
            text: "Télécharge et installe l'extension nécessaire au fonctionnement du programme.",
            link: {
              url: "chrome://extensions/KaisarNetwork",
              text: "Télécharger",
            },
          },
          {
            type: "image",
            link: {
              url: "https://upload.wikimedia.org/wikipedia/fr/thumb/7/7d/FC_Kaisar_logo.svg/278px-FC_Kaisar_logo.svg.png",
              text: "Logojsp",
            },
          },
        ],
      },
      {
        step: 3,
        type: "",
        text: "CONNECTE TON WALLET",
        subItems: [
          {
            type: "text",
            text: "🦊 Connecte ton portefeuille crypto (MetaMask, etc.) à l'extension.",
            link: {
              url: "",
              label: "",
            }
          },
          {
            type: "link",
            text: "✅ Effectue la vérification (souvent sur le réseau Peaq) pour être pleinement éligible.",
            link: {
              url: "https://peaq.network/verify",
              label: "Me vérifier",
            }
          },
        ],
      },
      {
        step: 4,
        type: "",
        text: "CLAIM LES POINTS",
        subItems: [
          {
            type: "text",
            text: "🎯 Effectue les missions proposées dans la section Tasks. Tu vas gagner des points en accomplissant diverses tâches.",
          },
          {
            type: "text",
            text: "📆 Pense à check-in chaque jour pour gratter un max de points facilement.",
          },
        ],
      },
      {
        step: 5,
        type: "",
        text: "SOIS ACTIF",
        subItems: [
          {
            type: "text",
            text: "Quand tu as suffisamment de points :",
          },
          {
            type: "text",
            text: "➡️ Réalise des roues de fortune pour gagner des récompenses.",
          },
          {
            type: "text",
            text: "➡️ Continue à interagir pour maximiser tes rewards",
          },
          {
            type: "text",
            text: "➡️ Fais vivre ton compte (activité = visibilité = gains 💸)",
          },
        ],
      },
      {
        step: 0,
        type: "",
        text: "✅ Astuce de pro ",
        subItems: [
          {
            type: "text",
            text: "Active les notifications de missions pour ne rien rater !",
          },
          {
            type: "text",
            text: "Utilise plusieurs wallets en restant discret si tu multiplier tes gains.",
          },
          {
            type: "text",
            text: "N'oublie jamais le check-in journalier (c'est littéralement des points gratuits).",
          },
        ],
      },
    ],
    backers: ["Robot Ventures", "1k(x)", "GSR", "Maven 11"],
    platformPreview: true,
  },
}

// Update the type to reflect that params is now a Promise
type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export default function TutorialPage({ params }: PageProps) {
  // Use React's `use` function to read the promise in a Client Component
  const { slug } = use(params)
  const tutorial = tutorialsData[slug as keyof typeof tutorialsData]

  if (!tutorial) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white font-sans flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Tutorial not found</h1>
          <Link href="/" className="text-blue-400 hover:underline flex items-center justify-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back to tutorials
          </Link>
        </div>
      </div>
    )
  }

  const getBadgeStyles = (color: string) => {
    switch (color) {
      case "purple":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30"
      case "blue":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "green":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white font-sans">
      <div className="max-w-4xl mx-auto p-6">
        <header className="mb-10">
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
            <Link href="/" className="ml-100 text-blue-400 hover:underline flex items-center gap-2 mb-6">
              <ChevronLeft className="h-4 w-4" />
              Back to tutorials
            </Link>
          </div>

          <div className="flex items-center justify-between mb-2 mt-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <img className="h-10 w-10 rounded-full" src={tutorial.image || "/placeholder.svg"} />
              <a href={tutorial.x}>{tutorial.name}</a>
              <span className={`px-2 py-0.5 text-xs rounded-full border ${getBadgeStyles(tutorial.badgeColor)}`}>
                {tutorial.badge}
              </span>
            </h2>
            <div className="flex gap-2">
              <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                <Star className="w-4 h-4 mr-1" />
                Favorited
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
              >
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between mb-2.5">

          </div>
          <a className="text-gray-300">
            KaiSar @KaisarNetwork is a decentralized AI infrastructure where your compute is your currency.
          </a>

          {/* Quick Guide */}
          <Card className="mt-6 mb-6 bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Rocket className="w-5 h-5 text-emerald-400" />
                {tutorial.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-yellow-400" />
                    <span className="text-slate-300 text-sm">Coût</span>
                  </div>
                  <span className="text-white-500">{tutorial.cost}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-emerald-400" />
                    <span className="text-slate-300 text-sm">Airdrop Potentiel</span>
                  </div>
                  <span className="text-white-400">{tutorial.estimatedReward}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="text-slate-300 text-sm">Temps estimé</span>
                  </div>
                  <span className="text-white">{tutorial.estimatedTime}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-400" />
                    <span className="text-slate-300 text-sm">Fonds levés</span>
                  </div>
                  <span className="text-white">{tutorial.raised}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          {/*Progress Bar
           <Card className="mt-6 mb-6 bg-slate-900 border-slate-800">
            <ProgressBar progress={32} />
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-sm font-medium ml-1">32% complete</span>
            </div>
          </Card> 
          */}
        </header>
        <main className="">
          <div className="space-y-4">
            {tutorial.content.map((item, index) => (
              <div key={index} className="space-y-3">

                <Card className="mt-6 mb-6 bg-slate-900 border-slate-800">
                  <div className="flex items-start gap-2">
                    <div className="min-w-5 pt-1">
                      <span className="text-red-500">{item.type}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        {item.step != 0 && (
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">{item.step}</span>
                          </div>
                        )}
                        <h1 className="font-medium">
                          <strong>{item.text}</strong>
                        </h1>
                      </div>
                    </div>
                  </div>

                  {item.subItems && (
                    <div className="ml-7 space-y-2 text-gray-300">
                      {item.subItems.map((subItem, subIndex) => (

                        <div key={subIndex} className="flex items-start gap-2">
                          <div className="flex items-center gap-2">

                            <div className="mb-2 bg-slate-800 rounded-lg p-4 border-l-4 border-purple-500">
                              <a className="text-slate-200 leading-relaxed ">
                                <span>{subItem.text}</span> <br />
                                {subItem.type === "link" && (

                                  <p className="flex justify-start mt-2" href={subItem.link.url} target="_blank">
                                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                                      {subItem.link.label || "Visit"}
                                    </Button>
                                  </p>
                                )}
                              </a>
                              {subItem.type === "image" && (
                                <img
                                  src={subItem.link.url}
                                  className="text-blue-400 hover:underline flex items-center gap-1"
                                />
                              )}
                            </div>

                          </div>
                        </div>
                      ))}
                      <div className="flex justify-end">
                        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition duration-300 ease-in-out text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-colors duration-300 ease-in-out cursor-pointer mr-10">
                          Marquer comme terminé
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            ))}
          </div>
          {tutorial.backers && (
            <div className="mt-4 bg-gray-800/50 p-3 rounded-lg border border-gray-700">
              <div className="text-sm font-medium mb-2">Backed by</div>
              <div className="flex flex-wrap gap-3">
                {tutorial.backers.map((backer, index) => (
                  <div key={index} className="bg-white/10 px-3 py-1 rounded-full text-xs">
                    {backer}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex items-center justify-center">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/_Cqklhy4Dac"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>

          {tutorial.platformPreview && (
            <div className="mt-4 bg-gray-800/50 p-3 rounded-lg border border-gray-700">
              <div className="text-sm font-medium mb-2">Platform Preview</div>
              <div className="rounded-lg overflow-hidden border border-gray-700">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-24 flex items-center justify-center">
                  <div className="text-white font-bold text-xl">GTE Trading Platform</div>
                </div>
                <div className="bg-gray-800 p-3">
                  <div className="flex justify-between items-center">
                    <div className="text-sm">Markets</div>
                    <button className="bg-orange-500 text-white px-3 py-1 rounded-md text-sm">Connect Wallet</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2025 Claimit. All rights reserved.</p>
          <p className="mt-1">Disclaimer: Completing tasks does not guarantee airdrops. DYOR.</p>
        </footer>
      </div>
    </div>
  )
}
