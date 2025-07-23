"use client"
import { use } from "react" // Add this import
import Link from "next/link"
import { ChevronLeft, ExternalLink, Star, Share2, Clock } from "lucide-react"
import { ProgressBar } from "@/components/progress-bar"

// Tutorial data
const tutorialsData = {
  rainmakr: {
    name: "RainMakr",
    x: "https://x.com/rainmakr",
    badge: "Testnet",
    badgeColor: "purple",
    raised: "$11M raised",
    title: "Make it rain! ⛈️",
    estimatedTime: "15 min",
    image: "https://pbs.twimg.com/profile_images/1819638283133243394/vQq0fW9F_400x400.jpg",
    content: [
      {
        text: "Complete socials tasks, make volume on testnet and claim your Discord roles to earn rewards!",
      },
      {
        type: "🚀",
        text: "Complete Zealy tasks",
        subItems: [
          {
            type: "link",
            text: "Visit:",
            link: "https://zealy.io/cw/rainmakr/invite/O1msJS9W6ylgWI8eyX6bH",
            linkText: "https://zealy.io/cw/rainmakr/invite/",
          },
          {
            type: "text",
            text: "Complete all socials tasks",
          },
          {
            type: "text",
            text: "Claim your roles",
          },
        ],
      },
      {
        type: "🤑",
        text: "Have a minimum of 2ETH of volume",
        subItems: [
          {
            type: "link",
            text: "Get some faucet on MegaEth:",
            link: "testnet.megaeth.com/#4",
            linkText: "testnet.megaeth.com",
          },
          {
            type: "link",
            text: "Visit RainAI:",
            link: "https://rainmakr.xyz/en/rainai",
            linkText: "https://rainmakr.xyz/en/rainai",
          },
          {
            type: "link",
            text: "or RainPump:",
            link: "https://rainmakr.xyz/en/rainpump",
            linkText: "https://rainmakr.xyz/en/rainpump",
          },
          {
            type: "text",
            text: "Buy & Sell tokens to get a total volume of 2ETH on your account",
          },
          {
            type: "text",
            text: "Claim your rewards",
          },
        ],
      },
    ],
    backers: ["Robot Ventures", "1k(x)", "GSR", "Maven 11"],
    platformPreview: true,
  },
  nodepay: {
    name: "NodePay",
    x: "https://x.com/NodePay",
    badge: "Season 4",
    badgeColor: "blue",
    raised: "$11M raised",
    title: "Decentralized trading platform",
    estimatedTime: "15 min",
    image:
      "https://play-lh.googleusercontent.com/x7F1sCseMpHlWuBYYh3vUaXvEASveBMCO6bejozZ7_FGQODAEKOYlcnNB-91xLXGrg=w240-h480-rw",
    content: [
      {
        type: "text",
        text: "Raised $11M from GSR, Robot Ventures, Maven 11, etc.",
      },
      {
        type: "text",
        text: "Activity:",
        subItems: [
          {
            type: "link",
            text: "Create a token and perform swaps:",
            link: "https://testnet.gte.xyz/dash",
            linkText: "testnet.gte.xyz/dash",
          },
        ],
      },
    ],
    backers: ["Robot Ventures", "1k(x)", "GSR", "Maven 11"],
    platformPreview: true,
  },
  Kaisar: {
    name: "@KaisarNetwork",
    x: "https://x.com/KaisarNetwork",
    image: "https://pbs.twimg.com/profile_images/1776202066282926080/5ppDFq9k_400x400.jpg",
    badge: "Gros Potentiel",
    badgeColor: "blue",
    raised: "$54M raised",
    title: "🚀 Guide rapide",
    estimatedTime: "10 minutes",
    content: [
      {
        type: "",
        text: "🔹 Étape 1 – CRÉATION DE COMPTE",
        subItems: [
          {
            type: "link",
            text: "Visit:",
            link: "https://galxe.com/campaigns",
            linkText: "galxe.com/campaigns",
          },
          {
            type: "text",
            text: "Crée un compte sur la plateforme: 👉 Renseigne une adresse mail, connecte ton compte X (Twitter), Discord, etc.",
          },
        ],
      },
      {
        type: "",
        text: "🔹 Étape 2 – INSTALLATION DE L'APP",
        subItems: [
          {
            type: "text",
            text: "Télécharge et installe l'extension nécessaire au fonctionnement du programme.",
          },
          {
            type: "link",
            text: "Lien :",
            link: "https://chromeextensions.com/KaisarNetwork",
            linkText: "chrome-extensions.com/Kaisar",
          },
        ],
      },
      {
        type: "",
        text: "🔹 Étape 3 – CONNECTE TON WALLET",
        subItems: [
          {
            type: "text",
            text: "Connecte ton portefeuille crypto (MetaMask, etc.) à l'extension.",
          },
          {
            type: "text",
            text: "✅ Effectue la vérification (souvent sur le réseau Peaq) pour être pleinement éligible.",
          },
          {
            type: "link",
            text: "Lien :",
            link: "https://chromeextensions.com/KaisarNetwork",
            linkText: "chrome-extensions.com/Kaisar",
          },
        ],
      },
      {
        type: "",
        text: "🔹 Étape 4 – CLAIM LES POINTS",
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
        type: "",
        text: "🔹 Étape 5 – SOIS ACTIF",
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
          <div className="flex items-center gap-0.5 mb-2">
            <img className="h-14 w-14 rounded-full" src="https://cdn-icons-png.flaticon.com/512/9011/9011549.png" />
            <h1 className="text-3xl font-bold">Claimit</h1>
          </div>
          <Link href="/" className="text-blue-400 hover:underline flex items-center gap-2 mb-6">
            <ChevronLeft className="h-4 w-4" />
            Back to tutorials
          </Link>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <img className="h-10 w-10 rounded-full" src={tutorial.image || "/placeholder.svg"} />
              <a href={tutorial.x}>{tutorial.name}</a>
              <span className={`px-2 py-0.5 text-xs rounded-full border ${getBadgeStyles(tutorial.badgeColor)}`}>
                {tutorial.badge}
              </span>
            </h2>
            <span className="text-sm text-green-400">{tutorial.raised}</span>
          </div>
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-2xl font-medium text-pink-400">{tutorial.title}</h3>
            <div className="flex items-center gap-3">
              <button
                className="flex items-center gap-1 px-3 py-1.5 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                aria-label="Remove from favorites"
              >
                <Star className="h-4 w-4" fill="#FBBF24" color="#FBBF24" />
                <span className="text-sm">Favorited</span>
              </button>
              <div className="p-0">
                <div className="relative inline-block">
                  <button
                    className="flex items-center gap-1 px-3 py-1.5 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                    aria-label="Share tutorial"
                  >
                    <Share2 className="h-4 w-4" />
                    <span className="text-sm">Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <a className="text-gray-300">
            KaiSar @KaisarNetwork is a decentralized AI infrastructure where your compute is your currency.
          </a>
          <strong className="text-300">
            <h3>💰 Coût : &lt;1$ </h3>
            <h3>💸 Airdrop Potentiel : 1000$+</h3>
            <h3>⏳ Temps par jour : {tutorial.estimatedTime}</h3>
          </strong>
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock className="h-4 w-4" />
              <span>Estimated time: {tutorial.estimatedTime}</span>
            </div>
            <span className="text-sm font-medium">32% complete</span>
          </div>
          <ProgressBar progress={32} />
        </header>
        <main className="space-y-3 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
          <div className="space-y-4">
            {tutorial.content.map((item, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="min-w-5 pt-1">
                    <span className="text-red-500">{item.type}</span>
                  </div>
                  <div>
                    <h1 className="font-medium">
                      <strong>{item.text}</strong>
                    </h1>
                  </div>
                </div>
                {item.subItems && (
                  <div className="ml-7 space-y-2 text-gray-300">
                    {item.subItems.map((subItem, subIndex) => (
                      <div key={subIndex} className="flex items-start gap-2">
                        <div className="min-w-5">-</div>
                        <div className="flex items-center gap-2">
                          <span>{subItem.text}</span>
                          {subItem.type === "link" && (
                            <a
                              href={subItem.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:underline flex items-center gap-1"
                            >
                              {subItem.linkText}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                    <br></br>
                  </div>
                )}
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
