
"use client"

import { useEffect, useRef, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Calculator } from "lucide-react"

export default function EnthalpySimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [reactionProgress, setReactionProgress] = useState(0) // 0 (reactants) to 1 (products)
  const [showLabels, setShowLabels] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [animationTime, setAnimationTime] = useState(0)

  const canvasWidth = 800
  const canvasHeight = 500

  const drawSimulation = (ctx: CanvasRenderingContext2D) => {
    const t = animationTime * 0.05 * animationSpeed
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Simulate CH4 + 2O2 -> CO2 + 2H2O (exothermic)
    const progress = Math.min(reactionProgress + (isPlaying ? t / 20 : 0), 1)

    // Draw reactants (CH4 + 2O2)
    if (progress < 0.5) {
      const fade = 1 - progress * 2
      ctx.fillStyle = `rgba(255, 0, 0, ${fade})` // CH4
      ctx.beginPath()
      ctx.arc(canvasWidth / 4, canvasHeight / 2, 20, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = `rgba(0, 0, 255, ${fade})` // O2
      ctx.beginPath()
      ctx.arc(canvasWidth / 4 + 50, canvasHeight / 2 - 30, 15, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(canvasWidth / 4 + 50, canvasHeight / 2 + 30, 15, 0, Math.PI * 2)
      ctx.fill()
    }

    // Draw products (CO2 + 2H2O)
    if (progress > 0.5) {
      const fade = (progress - 0.5) * 2
      ctx.fillStyle = `rgba(0, 255, 0, ${fade})` // CO2
      ctx.beginPath()
      ctx.arc(canvasWidth * 3 / 4, canvasHeight / 2, 20, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = `rgba(0, 200, 255, ${fade})` // H2O
      ctx.beginPath()
      ctx.arc(canvasWidth * 3 / 4 - 30, canvasHeight / 2 - 30, 15, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(canvasWidth * 3 / 4 - 30, canvasHeight / 2 + 30, 15, 0, Math.PI * 2)
      ctx.fill()
    }

    // Draw energy diagram
    ctx.beginPath()
    ctx.moveTo(canvasWidth / 4, canvasHeight - 50)
    ctx.lineTo(canvasWidth / 2, canvasHeight - 100) // Activation energy
    ctx.lineTo(canvasWidth * 3 / 4, canvasHeight - 75) // Products lower energy
    ctx.strokeStyle = "#000"
    ctx.stroke()

    // Draw ΔH arrow
    if (progress > 0.9) {
      ctx.beginPath()
      ctx.moveTo(canvasWidth * 3 / 4 - 10, canvasHeight - 50)
      ctx.lineTo(canvasWidth * 3 / 4 - 10, canvasHeight - 75)
      ctx.strokeStyle = "#ff0000"
      ctx.stroke()
      ctx.fillStyle = "#ff0000"
      ctx.fillText(lang === "bn" ? "ΔH" : "ΔH", canvasWidth * 3 / 4 - 20, canvasHeight - 60)
    }

    // Draw info
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(10, 10, 300, 80)
    ctx.fillStyle = "#fff"
    ctx.font = "14px Arial"
    ctx.textAlign = "left"
    ctx.fillText(
      lang === "bn" ? `বিক্রিয়ার অগ্রগতি: ${(progress * 100).toFixed(0)}%` : `Reaction Progress: ${(progress * 100).toFixed(0)}%`,
      20,
      35
    )

    // Draw labels
    if (showLabels) {
      ctx.fillStyle = "#000"
      ctx.textAlign = "center"
      ctx.fillText(
        lang === "bn" ? "এনথালপি পরিবর্তন সিমুলেশন" : "Enthalpy Change Simulation",
        canvasWidth / 2,
        canvasHeight - 20
      )
    }
  }

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    drawSimulation(ctx)

    if (isPlaying) {
      setAnimationTime(prev => prev + 1)
    }

    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [isPlaying, reactionProgress, showLabels, animationSpeed, animationTime, lang])

  const reset = () => {
    setAnimationTime(0)
    setIsPlaying(false)
    setReactionProgress(0)
    setAnimationSpeed(1)
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="aspect-video bg-slate-100 dark:bg-gray-900 rounded-lg overflow-hidden">
          <canvas 
            ref={canvasRef} 
            width={canvasWidth} 
            height={canvasHeight} 
            className="w-full h-full"
          />
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          <Button onClick={() => setIsPlaying(!isPlaying)} variant="outline">
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4 mr-2" /> {lang === "bn" ? "বিরতি" : "Pause"}
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" /> {lang === "bn" ? "চালান" : "Play"}
              </>
            )}
          </Button>
          <Button onClick={reset} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" /> {lang === "bn" ? "পুনরায় সেট" : "Reset"}
          </Button>
          <Button 
            onClick={() => setShowLabels(!showLabels)} 
            variant={showLabels ? "default" : "outline"}
          >
            <Calculator className="h-4 w-4 mr-2" /> 
            {lang === "bn" ? "লেবেল দেখান" : "Labels"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "বিক্রিয়ার অগ্রগতি" : "Reaction Progress"}</Label>
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={[reactionProgress]}
                onValueChange={(v) => setReactionProgress(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{(reactionProgress * 100).toFixed(0)}%</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <Label className="text-sm">{lang === "bn" ? "অ্যানিমেশন গতি" : "Animation Speed"}</Label>
              <Slider
                min={0.1}
                max={3}
                step={0.1}
                value={[animationSpeed]}
                onValueChange={(v) => setAnimationSpeed(v[0])}
                className="mt-2"
              />
              <p className="text-right mt-1 text-sm">{animationSpeed.toFixed(1)}x</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 border-t pt-4">
          <p className="text-sm font-medium">
            {lang === "bn" ? "ভাষা নির্বাচন করুন:" : "Content Language:"}
          </p>
          <div className="flex gap-2 mt-2">
            <Button
              variant={lang === "en" ? "default" : "outline"}
              size="sm"
              onClick={() => setLang("en")}
            >
              English
            </Button>
            <Button
              variant={lang === "bn" ? "default" : "outline"}
              size="sm"
              onClick={() => setLang("bn")}
            >
              বাংলা
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
