"use client"
import React from 'react';
import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ExternalLink, Copy, Check } from "lucide-react"

// Tutorial data
const tutorialsData = {
  rainmakr: {
    name: "RainMakr",
    badge: "Testnet",
    badgeColor: "purple",
    raised: "$11M raised",
    title: "Make it rain! ⛈️",
    image: "https://pbs.twimg.com/profile_images/1819638283133243394/vQq0fW9F_400x400.jpg",
    content: [
      {
        type: "text",
        text: "Complete socials tasks, complete Quiz and claim your OG role",
      },
      {
        type: "rocket",
        text: "Complete Galxe tasks",
        subItems: [
          {
            type: "link",
            text: "Visit:",
            link: "https://app.galxe.com/quest/EV7vtWNy",
            linkText: "app.galxe.com/quest/EV7vtWNy",
          },
          {
            type: "text",
            text: "Complete all socials tasks",
          },
          {
            type: "copy",
            text: "Quiz Answer:",
            copyText: "D, A, B, C, E, A, A, D, A",
          },
          {
            type: "text",
            text: "Claim your roles",
          },
        ],
      },
    ],
    backers: ["Robot Ventures", "1k(x)", "GSR", "Maven 11"],
  },
  nodepay: {
    name: "NodePay",
    badge: "Season 4",
    badgeColor: "blue",
    raised: "$11M raised",
    title: "Decentralized trading platform",
    image: "https://play-lh.googleusercontent.com/x7F1sCseMpHlWuBYYh3vUaXvEASveBMCO6bejozZ7_FGQODAEKOYlcnNB-91xLXGrg=w240-h480-rw",
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
    platformPreview: true,
  },
  galxe: {
    name: "@Galxe_Official",
    badge: "Credentials",
    badgeColor: "green",
    raised: "$8M raised",
    title: "Web3 credential network",
    content: [
      {
        type: "text",
        text: "Complete campaign tasks to earn points",
        subItems: [
          {
            type: "link",
            text: "Visit:",
            link: "https://galxe.com/campaigns",
            linkText: "galxe.com/campaigns",
          },
          {
            type: "text",
            text: "Connect wallet and social accounts",
          },
          {
            type: "text",
            text: "Complete at least 5 campaigns",
          },
        ],
      },
    ],
  },
}

export default function TutorialPage({ params }: { params: { slug: string } }) {
  const { slug } = React.use(params);
  const tutorial = tutorialsData[slug as keyof typeof tutorialsData]
  const [copiedText, setCopiedText] = useState<string | null>(null)

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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(text)
    setTimeout(() => setCopiedText(null), 2000)
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
          <Link href="/" className="text-blue-400 hover:underline flex items-center gap-2 mb-6">
            <ChevronLeft className="h-4 w-4" />
            Back to tutorials
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <h1 className="text-3xl font-bold">Claimit</h1>
          </div>

          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <img className="h-10 w-10 rounded-full" src={tutorial.image} />
              {tutorial.name}
              <span className={`px-2 py-0.5 text-xs rounded-full border ${getBadgeStyles(tutorial.badgeColor)}`}>
                {tutorial.badge}
              </span>
            </h2>
            <span className="text-sm text-green-400">{tutorial.raised}</span>
          </div>

          <h3 className="text-xl font-semibold text-pink-400 mb-6 ml-12">{tutorial.title}</h3>
        </header>

        <main className="space-y-3 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
          <div className="space-y-4">
            {tutorial.content.map((item, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="min-w-5 pt-1">
                    {item.type === "rocket" ? <span className="text-red-500">🚀</span> : "•"}
                  </div>
                  <div>
                    <span className="font-medium">{item.text}</span>
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

                          {subItem.type === "copy" && (
                            <div
                              className="bg-gray-800 px-2 py-1 rounded flex items-center gap-2 cursor-pointer"
                              onClick={() => copyToClipboard(subItem.copyText)}
                            >
                              <span>{subItem.copyText}</span>
                              {copiedText === subItem.copyText ? (
                                <Check className="h-4 w-4 text-green-400" />
                              ) : (
                                <Copy className="h-4 w-4 text-gray-400" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
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
