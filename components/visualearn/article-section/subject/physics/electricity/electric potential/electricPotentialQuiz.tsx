"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckCircle, XCircle, Award } from "lucide-react"

export default function ElectricPotentialQuiz() {
  const [lang, setLang] = useState<"en" | "bn">("en")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([])
  const [showExplanation, setShowExplanation] = useState(false)

  const questions = lang === "bn" ? [
    {
      question: "বৈদ্যুতিক বিভবের সংজ্ঞা কী?",
      options: [
        "একক চার্জের উপর প্রযুক্ত বল",
        "একক ধনাত্মক চার্জকে অসীম থেকে কোনো বিন্দুতে আনতে কৃত কাজ",
        "চার্জের পরিমাণ",
        "বৈদ্যুতিক ক্ষেত্রের তীব্রতা",
      ],
      answer: 1,
      explanation: "বৈদ্যুতিক বিভব হল একক ধনাত্মক চার্জকে অসীম দূরত্ব থেকে কোনো নির্দিষ্ট বিন্দুতে আনতে যে কাজ করতে হয়।"
    },
    {
      question: "বৈদ্যুতিক বিভবের একক কী?",
      options: ["নিউটন (N)", "কুলম্ব (C)", "ভোল্ট (V)", "জুল (J)"],
      answer: 2,
      explanation: "বৈদ্যুতিক বিভবের একক ভোল্ট (V), যা জুল/কুলম্ব (J/C) এর সমান।"
    },
    {
      question: "একটি বিন্দু চার্জ Q থেকে r দূরত্বে বৈদ্যুতিক বিভব কত?",
      options: [
        "V = kQ/r²",
        "V = kQ/r",
        "V = kQr",
        "V = Q/kr",
      ],
      answer: 1,
      explanation: "বিন্দু চার্জের জন্য বৈদ্যুতিক বিভব V = kQ/r, যেখানে k = 9×10⁹ N⋅m²/C²।"
    },
    {
      question: "সমবিভব তলের বৈশিষ্ট্য কী?",
      options: [
        "সব বিন্দুতে বৈদ্যুতিক ক্ষেত্র সমান",
        "সব বিন্দুতে বৈদ্যুতিক বিভব সমান",
        "সব বিন্দুতে চার্জ সমান",
        "সব বিন্দুতে তাপমাত্রা সমান",
      ],
      answer: 1,
      explanation: "সমবিভব তলের সব বিন্দুতে বৈদ্যুতিক বিভব সমান থাকে এবং বৈদ্যুতিক ক্ষেত্রের রেখা এই তলের সাথে লম্ব।"
    },
    {
      question: "বৈদ্যুতিক ক্ষেত্র এবং বিভবের মধ্যে সম্পর্ক কী?",
      options: [
        "E = V/r",
        "E = -dV/dr",
        "E = dV/dr",
        "E = V²/r",
      ],
      answer: 1,
      explanation: "বৈদ্যুতিক ক্ষেত্র হল বিভব গ্রেডিয়েন্টের ঋণাত্মক মান: E = -dV/dr। এটি নির্দেশ করে যে ক্ষেত্র উচ্চ বিভব থেকে নিম্ন বিভবের দিকে।"
    }
  ] : [
    {
      question: "What is the definition of electric potential?",
      options: [
        "Force per unit charge",
        "Work done in bringing unit positive charge from infinity to a point",
        "Amount of charge",
        "Electric field intensity",
      ],
      answer: 1,
      explanation: "Electric potential is the work done per unit positive charge in bringing it from infinity to a specific point in an electric field."
    },
    {
      question: "What is the unit of electric potential?",
      options: ["Newton (N)", "Coulomb (C)", "Volt (V)", "Joule (J)"],
      answer: 2,
      explanation: "The unit of electric potential is Volt (V), which is equivalent to Joule per Coulomb (J/C)."
    },
    {
      question: "What is the electric potential at distance r from a point charge Q?",
      options: [
        "V = kQ/r²",
        "V = kQ/r",
        "V = kQr",
        "V = Q/kr",
      ],
      answer: 1,
      explanation: "For a point charge, the electric potential is V = kQ/r, where k = 9×10⁹ N⋅m²/C²."
    },
    {
      question: "What is the characteristic of an equipotential surface?",
      options: [
        "Electric field is same at all points",
        "Electric potential is same at all points",
        "Charge is same at all points",
        "Temperature is same at all points",
      ],
      answer: 1,
      explanation: "An equipotential surface has the same electric potential at all points, and electric field lines are perpendicular to it."
    },
    {
      question: "What is the relationship between electric field and potential?",
      options: [
        "E = V/r",
        "E = -dV/dr",
        "E = dV/dr",
        "E = V²/r",
      ],
      answer: 1,
      explanation: "Electric field is the negative gradient of potential: E = -dV/dr. This indicates that field points from higher to lower potential."
    }
  ]

  const handleSubmit = () => {
    const isCorrect = selected === questions[currentQuestion].answer
    if (isCorrect) {
      setScore(score + 1)
    }
    
    setAnsweredQuestions(prev => {
      const newAnswered = [...prev]
      newAnswered[currentQuestion] = isCorrect
      return newAnswered
    })
    
    setShowExplanation(true)
  }

  const handleNext = () => {
    setSelected(null)
    setShowExplanation(false)
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelected(null)
    setScore(0)
    setShowResult(false)
    setAnsweredQuestions([])
    setShowExplanation(false)
  }

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100
    if (lang === "bn") {
      if (percentage >= 80) return "চমৎকার! আপনি বৈদ্যুতিক বিভব সম্পর্কে খুবই ভালো ধারণা রাখেন।"
      if (percentage >= 60) return "ভালো! আরো একটু অনুশীলন করলে আরও ভালো হবে।"
      return "আরো অধ্যয়ন প্রয়োজন। বিষয়টি আবার পড়ে দেখুন।"
    } else {
      if (percentage >= 80) return "Excellent! You have a great understanding of electric potential."
      if (percentage >= 60) return "Good! A little more practice will help you improve."
      return "More study needed. Review the topic again."
    }
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        {showResult ? (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <Award className={`h-16 w-16 ${getScoreColor()}`} />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {lang === "bn" ? "কুইজ সম্পন্ন!" : "Quiz Completed!"}
              </h2>
              <p className={`text-xl font-semibold ${getScoreColor()}`}>
                {lang === "bn"
                  ? `আপনার স্কোর: ${score}/${questions.length}`
                  : `Your Score: ${score}/${questions.length}`}
              </p>
              <p className="text-lg mt-2">
                {((score / questions.length) * 100).toFixed(0)}%
              </p>
            </div>

            <p className="text-muted-foreground max-w-md mx-auto">
              {getScoreMessage()}
            </p>

            <div className="grid grid-cols-5 gap-2 max-w-xs mx-auto">
              {answeredQuestions.map((isCorrect, index) => (
                <div key={index} className="flex justify-center">
                  {isCorrect ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-500" />
                  )}
                </div>
              ))}
            </div>

            <Button onClick={handleRestart} size="lg">
              {lang === "bn" ? "পুনরায় শুরু করুন" : "Restart Quiz"}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {lang === "bn" 
                  ? `প্রশ্ন ${currentQuestion + 1} এর ${questions.length}` 
                  : `Question ${currentQuestion + 1} of ${questions.length}`}
              </div>
              <div className="text-sm text-muted-foreground">
                {lang === "bn" ? `স্কোর: ${score}` : `Score: ${score}`}
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
              ></div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold">
                {questions[currentQuestion].question}
              </h2>
              
              <RadioGroup
                value={selected?.toString()}
                onValueChange={(val) => setSelected(parseInt(val))}
                disabled={showExplanation}
              >
                {questions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={index.toString()} 
                      id={`option-${index}`}
                      className={showExplanation ? (
                        index === questions[currentQuestion].answer 
                          ? "border-green-500" 
                          : index === selected 
                            ? "border-red-500" 
                            : ""
                      ) : ""}
                    />
                    <Label 
                      htmlFor={`option-${index}`}
                      className={`flex-1 cursor-pointer ${
                        showExplanation ? (
                          index === questions[currentQuestion].answer 
                            ? "text-green-600 font-medium" 
                            : index === selected 
                              ? "text-red-600" 
                              : ""
                        ) : ""
                      }`}
                    >
                      {option}
                      {showExplanation && index === questions[currentQuestion].answer && (
                        <CheckCircle className="inline h-4 w-4 ml-2 text-green-500" />
                      )}
                      {showExplanation && index === selected && index !== questions[currentQuestion].answer && (
                        <XCircle className="inline h-4 w-4 ml-2 text-red-500" />
                      )}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {showExplanation && (
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border-l-4 border-blue-400">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                    {lang === "bn" ? "ব্যাখ্যা:" : "Explanation:"}
                  </h4>
                  <p className="text-blue-700 dark:text-blue-300">
                    {questions[currentQuestion].explanation}
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                {!showExplanation ? (
                  <Button 
                    onClick={handleSubmit} 
                    disabled={selected === null}
                    className="flex-1"
                  >
                    {lang === "bn" ? "জমা দিন" : "Submit"}
                  </Button>
                ) : (
                  <Button onClick={handleNext} className="flex-1">
                    {currentQuestion + 1 < questions.length 
                      ? (lang === "bn" ? "পরবর্তী প্রশ্ন" : "Next Question")
                      : (lang === "bn" ? "ফলাফল দেখুন" : "See Results")
                    }
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 border-t pt-4">
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