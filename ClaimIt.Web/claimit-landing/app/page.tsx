"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Bell,
  ChevronRight,
  Coins,
  Compass,
  Database,
  Gift,
  Layers,
  Rocket,
  Wallet,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useInView } from "react-intersection-observer"

// Particle component for background effects
const Particles = ({ className = "", quantity = 50 }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {Array.from({ length: quantity }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white opacity-20"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            animation: `floatParticle ${Math.random() * 10 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  )
}

// Animated section component
const AnimatedSection = ({ children, className = "" }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  )
}

// Animated text typing effect
const TypedText = ({ text, className = "" }) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (!inView) return

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 50) // Adjust speed as needed

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, inView, text])

  return (
    <span ref={ref} className={className}>
      {displayText}
      {currentIndex < text.length && <span className="inline-block w-1 h-5 bg-[#57b3fe] animate-pulse ml-1"></span>}
    </span>
  )
}

// Floating element animation
const FloatingElement = ({ children, className = "", delay = 0 }) => {
  return (
    <div className={`animate-float ${className}`} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  )
}

// Network lines animation
const NetworkLines = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const points = []
    const numPoints = 50
    const connectionDistance = 100
    const width = canvas.width
    const height = canvas.height

    // Create points
    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Update and draw points
      for (let i = 0; i < numPoints; i++) {
        const point = points[i]

        // Move point
        point.x += point.vx
        point.y += point.vy

        // Bounce off edges
        if (point.x < 0 || point.x > width) point.vx *= -1
        if (point.y < 0 || point.y > height) point.vy *= -1

        // Draw point
        ctx.beginPath()
        ctx.arc(point.x, point.y, 1, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(87, 179, 254, 0.3)"
        ctx.fill()

        // Connect to nearby points
        for (let j = i + 1; j < numPoints; j++) {
          const otherPoint = points[j]
          const dx = point.x - otherPoint.x
          const dy = point.y - otherPoint.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            ctx.beginPath()
            ctx.moveTo(point.x, point.y)
            ctx.lineTo(otherPoint.x, otherPoint.y)
            ctx.strokeStyle = `rgba(87, 179, 254, ${0.2 * (1 - distance / connectionDistance)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      // Cleanup if needed
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" width={1000} height={1000} />
}

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div
      className={`flex min-h-screen flex-col bg-[#0a0b14] text-white transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      <header className="sticky top-0 z-50 w-full border-b border-[#2a2d3a]/50 bg-[#0a0b14]/90 backdrop-blur supports-[backdrop-filter]:bg-[#0a0b14]/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Coins className="h-6 w-6 text-[#57b3fe] animate-pulse" />
              <div className="absolute -inset-1 rounded-full blur-sm bg-[#57b3fe]/30 -z-10 animate-pulse"></div>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#57b3fe] to-[#c157fe] animate-gradient">
              ClaimIt
            </span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#features"
              className="text-sm font-medium text-gray-300 hover:text-[#57b3fe] transition-colors hover:scale-105 transform duration-200"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-gray-300 hover:text-[#57b3fe] transition-colors hover:scale-105 transform duration-200"
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-gray-300 hover:text-[#57b3fe] transition-colors hover:scale-105 transform duration-200"
            >
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button
              asChild
              variant="outline"
              className="hidden sm:flex border-[#57b3fe] text-[#57b3fe] hover:bg-[#57b3fe]/10 hover:text-white transition-all duration-300 hover:scale-105"
            >
              <Link href="#download">Log In</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-[#57b3fe] to-[#c157fe] hover:opacity-90 text-white shadow-lg shadow-[#57b3fe]/20 border-0 transition-all duration-300 hover:scale-105 hover:shadow-[#57b3fe]/40"
            >
              <Link href="#download" className="group">
                Install Extension{" "}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
          {/* Animated background with hexagon grid */}
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] opacity-5 bg-repeat"></div>

          {/* Network animation */}
          <NetworkLines />

          {/* Glowing orbs with animation */}
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-[#57b3fe] rounded-full opacity-10 blur-[100px] animate-pulse"></div>
          <div
            className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#c157fe] rounded-full opacity-10 blur-[100px] animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>

          {/* Floating particles */}
          <Particles quantity={100} />

          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <AnimatedSection className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-[#2a2d3a] text-[#57b3fe] mb-4 animate-fadeIn">
                    <span className="relative flex h-2 w-2 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#57b3fe] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#57b3fe]"></span>
                    </span>
                    AIRDROP TRACKER
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Never Miss Another{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#57b3fe] to-[#c157fe] animate-gradient">
                      Airdrop
                    </span>{" "}
                    Again
                  </h1>
                  <p className="max-w-[600px] text-gray-400 md:text-xl">
                    <TypedText text="ClaimIt automatically tracks and farms crypto airdrops so you can stay ahead of the game and never miss free token opportunities." />
                  </p>
                </div>
                <div
                  className="flex flex-col gap-2 min-[400px]:flex-row animate-fadeIn"
                  style={{ animationDelay: "0.5s" }}
                >
                  <Button
                    size="lg"
                    asChild
                    className="px-8 bg-gradient-to-r from-[#57b3fe] to-[#c157fe] hover:opacity-90 text-white shadow-lg shadow-[#57b3fe]/20 border-0 relative overflow-hidden group"
                  >
                    <Link href="#download">
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#57b3fe] to-[#c157fe] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      <span className="relative z-10 flex items-center">
                        Install Free Extension{" "}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="border-[#57b3fe] text-[#57b3fe] hover:bg-[#57b3fe]/10 hover:text-white transition-all duration-300"
                  >
                    <Link href="#how-it-works">See How It Works</Link>
                  </Button>
                </div>
                <div
                  className="flex items-center gap-2 text-sm text-gray-400 animate-fadeIn"
                  style={{ animationDelay: "0.8s" }}
                >
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="inline-block h-8 w-8 rounded-full bg-[#2a2d3a] ring-2 ring-[#0a0b14]" />
                    ))}
                  </div>
                  <span>Join 10,000+ crypto enthusiasts already using ClaimIt</span>
                </div>
              </AnimatedSection>
              <AnimatedSection className="flex items-center justify-center" style={{ animationDelay: "0.3s" }}>
                <FloatingElement className="relative w-full max-w-[500px] aspect-[4/3] overflow-hidden rounded-xl border border-[#2a2d3a] bg-[#151725] shadow-2xl">
                  <div className="absolute inset-0 bg-[url('/placeholder.svg?height=20&width=20')] opacity-5 bg-repeat"></div>
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    width={800}
                    height={600}
                    alt="ClaimIt Dashboard Preview"
                    className="object-cover opacity-90 mix-blend-luminosity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b14] via-transparent to-transparent flex items-end p-6">
                    <div className="space-y-2 text-white">
                      <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#57b3fe] to-[#c157fe] animate-gradient">
                        Airdrop Dashboard
                      </h3>
                      <p className="text-sm text-gray-400">Track all your potential airdrops in one place</p>
                    </div>
                  </div>
                  {/* UI Elements overlay with animation */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                    <div
                      className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    <div
                      className="w-3 h-3 rounded-full bg-green-500 animate-pulse"
                      style={{ animationDelay: "1s" }}
                    ></div>
                  </div>
                  {/* Animated data points */}
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#57b3fe] rounded-full animate-ping"></div>
                  <div
                    className="absolute top-1/3 right-1/3 w-2 h-2 bg-[#c157fe] rounded-full animate-ping"
                    style={{ animationDelay: "0.7s" }}
                  ></div>
                  <div
                    className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-[#57b3fe] rounded-full animate-ping"
                    style={{ animationDelay: "1.4s" }}
                  ></div>
                  {/* Glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#57b3fe] to-[#c157fe] opacity-20 blur-sm rounded-xl animate-pulse"></div>
                </FloatingElement>
              </AnimatedSection>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 relative">
          {/* Hexagon pattern background */}
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=60&width=60')] opacity-5 bg-repeat"></div>

          <div className="container px-4 md:px-6 relative z-10">
            <AnimatedSection className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#2a2d3a] px-3 py-1 text-sm text-[#57b3fe] font-medium animate-fadeIn">
                  Powerful Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-transparent bg-clip-text bg-gradient-to-r from-[#57b3fe] to-[#c157fe] animate-gradient">
                  Everything You Need to Maximize Your Airdrops
                </h2>
                <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Stop spending time hunting for airdrop opportunities and tracking details across multiple
                  sources—ClaimIt handles it all for you.
                </p>
              </div>
            </AnimatedSection>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: <Database className="h-6 w-6 text-[#57b3fe] mb-2" />,
                  title: "Airdrop Dashboard",
                  description: "View past, active, and upcoming airdrops all in one place",
                },
                {
                  icon: <Rocket className="h-6 w-6 text-[#57b3fe] mb-2" />,
                  title: "Live Quests",
                  description: "Engaging missions designed to enhance participation and optimize your farming",
                },
                {
                  icon: <Bell className="h-6 w-6 text-[#57b3fe] mb-2" />,
                  title: "Real-time Alerts",
                  description: "Get notified immediately when you qualify for an airdrop",
                },
                {
                  icon: <Layers className="h-6 w-6 text-[#57b3fe] mb-2" />,
                  title: "Suggested Projects",
                  description: "Discover projects you might be interested in farming",
                },
                {
                  icon: <Wallet className="h-6 w-6 text-[#57b3fe] mb-2" />,
                  title: "Wallet Integration",
                  description: "Connect your wallets (MetaMask, WalletConnect) seamlessly",
                },
                {
                  icon: <Compass className="h-6 w-6 text-[#57b3fe] mb-2" />,
                  title: "Airdrop Finder",
                  description: "Automatically scrape new airdrop opportunities and get notified",
                },
              ].map((feature, i) => (
                <AnimatedSection key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                  <Card className="overflow-hidden border border-[#2a2d3a] bg-[#151725] hover:shadow-lg hover:shadow-[#57b3fe]/5 transition-all duration-300 group relative hover:-translate-y-1">
                    {/* Glow effect on hover */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#57b3fe] to-[#c157fe] opacity-0 group-hover:opacity-20 blur-sm rounded-lg transition-opacity"></div>
                    <CardHeader className="pb-2 relative">
                      <div className="relative">
                        <div className="animate-spin-slow">{feature.icon}</div>
                        <div className="absolute -inset-1 rounded-full blur-sm bg-[#57b3fe]/10 -z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <CardTitle className="text-[#57b3fe]">{feature.title}</CardTitle>
                      <CardDescription className="text-gray-400">{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#0d0e18] relative overflow-hidden">
          {/* Circuit board pattern */}
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] opacity-5"></div>

          {/* Glowing orb with animation */}
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#57b3fe] rounded-full opacity-5 blur-[100px] transform -translate-y-1/2 animate-pulse"></div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <AnimatedSection className="space-y-4">
                <div className="inline-block rounded-lg bg-[#2a2d3a] px-3 py-1 text-sm text-[#57b3fe] font-medium animate-fadeIn">
                  Why ClaimIt?
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-transparent bg-clip-text bg-gradient-to-r from-[#57b3fe] to-[#c157fe] animate-gradient">
                  Stop Missing Out on Free Tokens
                </h2>
                <p className="text-gray-400 md:text-xl">
                  The crypto airdrop landscape is constantly changing. Without the right tools, you're likely missing
                  valuable opportunities every day.
                </p>
                <ul className="grid gap-4">
                  {[
                    "Automatically track eligibility across multiple projects",
                    "Complete farming tasks with a single click",
                    "Get notified the moment you qualify for an airdrop",
                    "Save hours of research and manual tracking",
                    "Never miss a token claim deadline again",
                  ].map((item, i) => (
                    <AnimatedSection key={i} style={{ animationDelay: `${i * 0.1 + 0.3}s` }}>
                      <li className="flex items-center gap-2 hover:translate-x-1 transition-transform duration-300">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2a2d3a] relative">
                          <ChevronRight className="h-4 w-4 text-[#57b3fe]" />
                          <div className="absolute -inset-0.5 rounded-full blur-sm bg-[#57b3fe]/20 -z-10 animate-pulse"></div>
                        </div>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    </AnimatedSection>
                  ))}
                </ul>
                <div
                  className="flex flex-col gap-2 min-[400px]:flex-row pt-4 animate-fadeIn"
                  style={{ animationDelay: "0.8s" }}
                >
                  <Button
                    size="lg"
                    asChild
                    className="bg-gradient-to-r from-[#57b3fe] to-[#c157fe] hover:opacity-90 text-white shadow-lg shadow-[#57b3fe]/20 border-0 group hover:scale-105 transition-transform duration-300"
                  >
                    <Link href="#download">
                      Get ClaimIt Now{" "}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </div>
              </AnimatedSection>
              <AnimatedSection className="flex items-center justify-center" style={{ animationDelay: "0.4s" }}>
                <FloatingElement className="relative w-full max-w-[500px] aspect-square overflow-hidden rounded-xl border border-[#2a2d3a] bg-[#151725] shadow-2xl">
                  <div className="absolute inset-0 bg-[url('/placeholder.svg?height=20&width=20')] opacity-5 bg-repeat"></div>
                  <Image
                    src="/placeholder.svg?height=800&width=800"
                    width={800}
                    height={800}
                    alt="ClaimIt Features Preview"
                    className="object-cover opacity-90 mix-blend-luminosity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#57b3fe]/10 to-transparent"></div>

                  {/* Animated data visualization elements */}
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#57b3fe] rounded-full animate-ping"></div>
                  <div
                    className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#c157fe] rounded-full animate-ping"
                    style={{ animationDelay: "0.7s" }}
                  ></div>
                  <div
                    className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-[#57b3fe] rounded-full animate-ping"
                    style={{ animationDelay: "1.4s" }}
                  ></div>

                  {/* Glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#57b3fe] to-[#c157fe] opacity-20 blur-sm rounded-xl animate-pulse"></div>
                </FloatingElement>
              </AnimatedSection>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 relative">
          {/* Hexagon pattern background */}
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=60&width=60')] opacity-5 bg-repeat"></div>

          <div className="container px-4 md:px-6 relative z-10">
            <AnimatedSection className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#2a2d3a] px-3 py-1 text-sm text-[#57b3fe] font-medium animate-fadeIn">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-transparent bg-clip-text bg-gradient-to-r from-[#57b3fe] to-[#c157fe] animate-gradient">
                  Simple Setup, Powerful Results
                </h2>
                <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get started in minutes and let ClaimIt do the heavy lifting for you.
                </p>
              </div>
            </AnimatedSection>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Install Extension",
                  description: "Add ClaimIt to your browser with just one click",
                  icon: <Zap className="h-10 w-10 text-white" />,
                },
                {
                  step: "02",
                  title: "Connect Wallets",
                  description: "Securely link your crypto wallets to track eligibility",
                  icon: <Wallet className="h-10 w-10 text-white" />,
                },
                {
                  step: "03",
                  title: "Claim Rewards",
                  description: "Sit back and collect your airdrops as they become available",
                  icon: <Gift className="h-10 w-10 text-white" />,
                },
              ].map((item, i) => (
                <AnimatedSection key={i} style={{ animationDelay: `${i * 0.2}s` }}>
                  <Card className="relative overflow-hidden border-0 bg-transparent hover:scale-105 transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#151725] to-[#0d0e18] rounded-lg"></div>
                    <div className="absolute inset-0 border border-[#2a2d3a] rounded-lg"></div>
                    {/* Glow effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#57b3fe] to-[#c157fe] opacity-20 blur-sm rounded-lg animate-pulse"></div>
                    <CardHeader className="pb-2 relative z-10">
                      <span
                        className="absolute right-4 top-4 text-3xl font-bold text-white/10 animate-fadeIn"
                        style={{ animationDelay: "0.5s" }}
                      >
                        {item.step}
                      </span>
                      <div className="mb-2 bg-[#2a2d3a] p-3 rounded-full w-fit relative group">
                        <div className="animate-bounce-slow">{item.icon}</div>
                        <div className="absolute -inset-1 rounded-full blur-sm bg-[#57b3fe]/20 -z-10 animate-pulse"></div>
                      </div>
                      <CardTitle className="text-white">{item.title}</CardTitle>
                      <CardDescription className="text-gray-400">{item.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <AnimatedSection style={{ animationDelay: "0.8s" }}>
                <Button
                  size="lg"
                  asChild
                  className="px-8 bg-gradient-to-r from-[#57b3fe] to-[#c157fe] hover:opacity-90 text-white shadow-lg shadow-[#57b3fe]/20 border-0 group hover:scale-105 transition-transform duration-300"
                >
                  <Link href="#download">
                    Start Claiming Airdrops{" "}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </AnimatedSection>
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-[#0d0e18] relative">
          {/* Circuit board pattern */}
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] opacity-5"></div>

          <div className="container px-4 md:px-6 relative z-10">
            <AnimatedSection className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#2a2d3a] px-3 py-1 text-sm text-[#57b3fe] animate-fadeIn">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-transparent bg-clip-text bg-gradient-to-r from-[#57b3fe] to-[#c157fe] animate-gradient">
                  What Our Users Say
                </h2>
                <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of crypto enthusiasts who have transformed their airdrop strategy with ClaimIt.
                </p>
              </div>
            </AnimatedSection>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  quote:
                    "ClaimIt has completely changed how I approach airdrops. I've claimed over $5,000 in tokens that I would have missed otherwise.",
                  author: "Alex K.",
                  title: "Crypto Investor",
                },
                {
                  quote:
                    "The real-time alerts are a game-changer. I no longer have to constantly check Twitter or Discord for announcements.",
                  author: "Sarah M.",
                  title: "DeFi Enthusiast",
                },
                {
                  quote:
                    "As someone new to crypto, ClaimIt made it easy to understand which projects to interact with for potential airdrops.",
                  author: "Michael T.",
                  title: "Crypto Beginner",
                },
              ].map((item, i) => (
                <AnimatedSection key={i} style={{ animationDelay: `${i * 0.2}s` }}>
                  <Card className="text-left border border-[#2a2d3a] bg-[#151725] relative group hover:scale-105 transition-transform duration-300">
                    {/* Glow effect on hover */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#57b3fe] to-[#c157fe] opacity-0 group-hover:opacity-20 blur-sm rounded-lg transition-opacity"></div>
                    <CardContent className="pt-6">
                      <div className="flex flex-col gap-4">
                        <div className="flex gap-1 animate-fadeIn" style={{ animationDelay: `${i * 0.1 + 0.3}s` }}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-5 w-5 text-[#57b3fe] animate-pulse"
                              style={{ animationDelay: `${star * 0.1}s` }}
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-gray-400">"{item.quote}"</p>
                        <div className="animate-fadeIn" style={{ animationDelay: `${i * 0.1 + 0.6}s` }}>
                          <p className="font-medium text-white">{item.author}</p>
                          <p className="text-sm text-gray-500">{item.title}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section id="download" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d0e18] to-[#151725]"></div>

          {/* Glowing orbs with animation */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#57b3fe] rounded-full opacity-10 blur-[100px] animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#c157fe] rounded-full opacity-10 blur-[100px] animate-pulse"
            style={{ animationDelay: "1.5s" }}
          ></div>

          {/* Network lines */}
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=400')] opacity-5"></div>

          {/* Floating particles */}
          <Particles quantity={70} />

          <div className="container px-4 md:px-6 relative z-10">
            <AnimatedSection className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#57b3fe] to-[#c157fe] animate-gradient">
                  Start Claiming Your Airdrops Today
                </h2>
                <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of crypto enthusiasts who never miss an airdrop opportunity.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <div
                  className="flex flex-col gap-2 min-[400px]:flex-row justify-center pt-4 animate-fadeIn"
                  style={{ animationDelay: "0.5s" }}
                >
                  <Button
                    size="lg"
                    variant="secondary"
                    asChild
                    className="px-8 bg-[#2a2d3a] text-white hover:bg-[#3a3d4a] border-0 relative group overflow-hidden hover:scale-105 transition-transform duration-300"
                  >
                    <Link href="#chrome" className="flex items-center">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#57b3fe] to-[#c157fe] opacity-0 group-hover:opacity-20 transition-opacity"></div>
                      <div className="relative z-10 flex items-center">
                        <Image
                          src="/placeholder.svg?height=24&width=24"
                          width={24}
                          height={24}
                          alt="Chrome"
                          className="mr-2 h-5 w-5 animate-spin-slow"
                        />
                        Add to Chrome
                      </div>
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="secondary"
                    asChild
                    className="px-8 bg-[#2a2d3a] text-white hover:bg-[#3a3d4a] border-0 relative group overflow-hidden hover:scale-105 transition-transform duration-300"
                  >
                    <Link href="#firefox" className="flex items-center">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#57b3fe] to-[#c157fe] opacity-0 group-hover:opacity-20 transition-opacity"></div>
                      <div className="relative z-10 flex items-center">
                        <Image
                          src="/placeholder.svg?height=24&width=24"
                          width={24}
                          height={24}
                          alt="Firefox"
                          className="mr-2 h-5 w-5 animate-spin-slow"
                        />
                        Add to Firefox
                      </div>
                    </Link>
                  </Button>
                </div>
                <p className="text-sm text-gray-500 animate-fadeIn" style={{ animationDelay: "0.8s" }}>
                  Available for all major browsers. 100% free to use.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#0a0b14] border-t border-[#2a2d3a] relative">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=60&width=60')] opacity-5 bg-repeat"></div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">
              <AnimatedSection className="space-y-4">
                <div className="inline-block rounded-lg bg-[#2a2d3a] px-3 py-1 text-sm text-[#57b3fe] animate-fadeIn">
                  Limited Time Offer
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#57b3fe] to-[#c157fe] animate-gradient">
                  Early Adopter Bonus
                </h2>
                <p className="max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Install ClaimIt now and get access to exclusive airdrop opportunities only available to our first
                  10,000 users.
                </p>
                <Button
                  size="lg"
                  asChild
                  className="px-8 bg-gradient-to-r from-[#57b3fe] to-[#c157fe] hover:opacity-90 text-white shadow-lg shadow-[#57b3fe]/20 border-0 group hover:scale-105 transition-transform duration-300"
                >
                  <Link href="#download">
                    Claim Your Bonus{" "}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </AnimatedSection>
              <AnimatedSection className="flex flex-col items-start space-y-4" style={{ animationDelay: "0.3s" }}>
                <div className="inline-block rounded-lg bg-[#2a2d3a] px-3 py-1 text-sm text-[#57b3fe] animate-fadeIn">
                  Coming Soon
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#57b3fe] to-[#c157fe] animate-gradient">
                  Pro Features
                </h2>
                <p className="max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Advanced analytics, priority notifications, and custom farming strategies. Join the waitlist to be the
                  first to know.
                </p>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="border-[#57b3fe] text-[#57b3fe] hover:bg-[#57b3fe]/10 hover:text-white group hover:scale-105 transition-transform duration-300"
                >
                  <Link href="#waitlist">
                    Join Waitlist{" "}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t border-[#2a2d3a] bg-[#0a0b14] py-6 md:py-12">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Coins className="h-6 w-6 text-[#57b3fe] animate-pulse" />
              <div className="absolute -inset-1 rounded-full blur-sm bg-[#57b3fe]/30 -z-10 animate-pulse"></div>
            </div>
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#57b3fe] to-[#c157fe] animate-gradient">
              ClaimIt
            </span>
          </div>
          <p className="text-center text-sm text-gray-500 md:text-left">
            &copy; {new Date().getFullYear()} ClaimIt. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-sm text-gray-500 hover:text-[#57b3fe] transition-colors hover:scale-105 transform duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-500 hover:text-[#57b3fe] transition-colors hover:scale-105 transform duration-200"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-500 hover:text-[#57b3fe] transition-colors hover:scale-105 transform duration-200"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}