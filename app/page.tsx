"use client"

import { useState } from "react"
import { Shield, BookOpen, Eye, Brain, Trophy, ArrowRight, CheckCircle, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function PhishingAwarenessTraining() {
  const [currentSection, setCurrentSection] = useState<"home" | "training" | "gallery" | "quiz" | "report">("home")
  const [quizProgress, setQuizProgress] = useState(0)
  const [quizScore, setQuizScore] = useState(0)
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<boolean[]>([])
  const [showQuizResult, setShowQuizResult] = useState(false)

  const trainingContent = [
    {
      title: "Secure URL Structure",
      description: "Learn to identify legitimate website URLs",
      points: [
        "Always starts with https:// (not http://)",
        "Correct spelling of domain name",
        "No suspicious subdomains or extra characters",
        "Green padlock icon in browser address bar",
      ],
      example: "https://www.amazon.com/account/signin",
    },
    {
      title: "Visual Design Indicators",
      description: "Recognize professional website design",
      points: [
        "High-quality graphics and consistent branding",
        "Professional typography and layout",
        "No spelling or grammar errors",
        "Proper contact information and support links",
      ],
      example: "Official company logos, consistent color schemes",
    },
    {
      title: "Security Features",
      description: "Identify security elements on legitimate sites",
      points: [
        "SSL certificate (padlock icon)",
        "Two-factor authentication options",
        "Security badges from trusted providers",
        "Clear privacy policy and terms of service",
      ],
      example: "Verified security certificates and trust seals",
    },
  ]

  const phishingExamples = [
    {
      title: "Fake Banking Site",
      url: "http://bank-0f-america.com/login",
      issues: [
        "Uses HTTP instead of HTTPS",
        "Misspelled domain (0 instead of o)",
        "Suspicious subdomain structure",
        "No security certificates",
      ],
      riskLevel: "High",
    },
    {
      title: "Phishing Email Link",
      url: "https://paypal-security-update.net/verify",
      issues: [
        "Not the official PayPal domain",
        "Suspicious subdomain pattern",
        "Urgency-based URL structure",
        "No official branding consistency",
      ],
      riskLevel: "High",
    },
    {
      title: "Social Media Scam",
      url: "http://facebook-security.co/account-suspended",
      issues: [
        "Wrong domain extension (.co instead of .com)",
        "Fear-inducing URL path",
        "No HTTPS encryption",
        "Unofficial domain structure",
      ],
      riskLevel: "Medium",
    },
  ]

  const quizQuestions = [
    {
      url: "https://www.amazon.com/gp/signin.html",
      isLegitimate: true,
      explanation:
        "This is a legitimate Amazon URL with proper HTTPS, correct domain spelling, and official structure.",
    },
    {
      url: "http://paypaI-security.com/verify-account",
      isLegitimate: false,
      explanation:
        "This is phishing! Notice the capital 'I' instead of 'l' in PayPal, wrong domain, and HTTP instead of HTTPS.",
    },
    {
      url: "https://login.microsoftonline.com/common/oauth2",
      isLegitimate: true,
      explanation: "This is Microsoft's legitimate OAuth login URL used for authentication services.",
    },
    {
      url: "https://gmail-security-alert.net/suspended",
      isLegitimate: false,
      explanation: "Phishing attempt! Gmail uses google.com domain, not gmail-security-alert.net.",
    },
    {
      url: "https://www.apple.com/support/contact/",
      isLegitimate: true,
      explanation: "This is Apple's official support contact page with proper HTTPS and domain.",
    },
  ]

  const handleQuizAnswer = (answer: boolean) => {
    const correct = answer === quizQuestions[currentQuizIndex].isLegitimate
    const newAnswers = [...quizAnswers, correct]
    setQuizAnswers(newAnswers)

    if (correct) {
      setQuizScore(quizScore + 1)
    }

    setShowQuizResult(true)

    setTimeout(() => {
      if (currentQuizIndex < quizQuestions.length - 1) {
        setCurrentQuizIndex(currentQuizIndex + 1)
        setQuizProgress(((currentQuizIndex + 1) / quizQuestions.length) * 100)
        setShowQuizResult(false)
      } else {
        setCurrentSection("report")
      }
    }, 2000)
  }

  const getAwarenessLevel = (score: number, total: number) => {
    const percentage = (score / total) * 100
    if (percentage >= 80)
      return {
        level: "Phishing Pro",
        color: "bg-green-500",
        description: "Excellent! You can spot phishing attempts like a pro.",
      }
    if (percentage >= 60)
      return {
        level: "Cautious User",
        color: "bg-yellow-500",
        description: "Good awareness! Keep practicing to improve your skills.",
      }
    return {
      level: "Beginner",
      color: "bg-red-500",
      description: "You need more practice. Review the training materials.",
    }
  }

  const resetQuiz = () => {
    setCurrentQuizIndex(0)
    setQuizScore(0)
    setQuizAnswers([])
    setQuizProgress(0)
    setShowQuizResult(false)
  }

  if (currentSection === "training") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" onClick={() => setCurrentSection("home")}>
              ← Back to Home
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Security Training Module</h1>
          </div>

          <div className="grid gap-6">
            {trainingContent.map((content, index) => (
              <Card key={index} className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    {content.title}
                  </CardTitle>
                  <CardDescription>{content.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Key Indicators:</h4>
                      <ul className="space-y-2">
                        {content.points.map((point, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Example:</h4>
                      <code className="text-sm bg-white p-2 rounded border block">{content.example}</code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button onClick={() => setCurrentSection("gallery")} className="bg-blue-600 hover:bg-blue-700">
              Continue to Phishing Gallery <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (currentSection === "gallery") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" onClick={() => setCurrentSection("home")}>
              ← Back to Home
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Phishing Gallery</h1>
          </div>

          <div className="grid gap-6">
            {phishingExamples.map((example, index) => (
              <Card key={index} className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    {example.title}
                    <Badge variant="destructive" className="ml-auto">
                      {example.riskLevel} Risk
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-red-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-2 text-red-800">Suspicious URL:</h4>
                    <code className="text-sm bg-white p-2 rounded border block text-red-600">{example.url}</code>
                  </div>

                  <h4 className="font-semibold mb-3 text-red-800">Red Flags Identified:</h4>
                  <ul className="space-y-2">
                    {example.issues.map((issue, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{issue}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button onClick={() => setCurrentSection("quiz")} className="bg-purple-600 hover:bg-purple-700">
              Test Your Knowledge <Brain className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (currentSection === "quiz") {
    const currentQuestion = quizQuestions[currentQuizIndex]

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" onClick={() => setCurrentSection("home")}>
              ← Back to Home
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Quiz Zone</h1>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>
                  Question {currentQuizIndex + 1} of {quizQuestions.length}
                </CardTitle>
                <Badge variant="outline">
                  Score: {quizScore}/{currentQuizIndex}
                </Badge>
              </div>
              <Progress value={quizProgress} className="w-full" />
            </CardHeader>
          </Card>

          {!showQuizResult ? (
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Is this website legitimate or phishing?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                  <code className="text-lg font-mono break-all">{currentQuestion.url}</code>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button onClick={() => handleQuizAnswer(true)} className="bg-green-600 hover:bg-green-700 h-16">
                    <CheckCircle className="w-6 h-6 mr-2" />
                    Legitimate
                  </Button>
                  <Button onClick={() => handleQuizAnswer(false)} className="bg-red-600 hover:bg-red-700 h-16">
                    <AlertTriangle className="w-6 h-6 mr-2" />
                    Phishing
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="p-6">
              <CardContent>
                <div className="text-center">
                  {quizAnswers[quizAnswers.length - 1] ? (
                    <div className="text-green-600">
                      <CheckCircle className="w-16 h-16 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Correct!</h3>
                    </div>
                  ) : (
                    <div className="text-red-600">
                      <AlertTriangle className="w-16 h-16 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Incorrect</h3>
                    </div>
                  )}
                  <p className="text-gray-700">{currentQuestion.explanation}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    )
  }

  if (currentSection === "report") {
    const awarenessLevel = getAwarenessLevel(quizScore, quizQuestions.length)
    const percentage = Math.round((quizScore / quizQuestions.length) * 100)

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 text-center">
            <CardHeader>
              <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
              <CardTitle className="text-3xl mb-2">Awareness Report</CardTitle>
              <CardDescription>Your phishing detection results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <div className="text-6xl font-bold text-gray-800 mb-2">{percentage}%</div>
                <div className="text-lg text-gray-600">
                  {quizScore} out of {quizQuestions.length} correct
                </div>
              </div>

              <div className="mb-8">
                <Badge className={`${awarenessLevel.color} text-white text-lg px-4 py-2`}>{awarenessLevel.level}</Badge>
                <p className="mt-4 text-gray-700">{awarenessLevel.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <Button
                  onClick={() => {
                    resetQuiz()
                    setCurrentSection("quiz")
                  }}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Retake Quiz
                </Button>
                <Button onClick={() => setCurrentSection("training")} variant="outline">
                  Review Training
                </Button>
              </div>

              <Button onClick={() => setCurrentSection("home")} variant="outline" className="w-full">
                Back to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Shield className="w-16 h-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Phishing Awareness Training</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn to identify and avoid phishing attacks through interactive training, real examples, and hands-on
            testing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setCurrentSection("training")}
          >
            <CardHeader className="text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <CardTitle>Training Module</CardTitle>
              <CardDescription>Learn what legitimate websites look like and key security indicators</CardDescription>
            </CardHeader>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setCurrentSection("gallery")}
          >
            <CardHeader className="text-center">
              <Eye className="w-12 h-12 mx-auto mb-4 text-red-600" />
              <CardTitle>Phishing Gallery</CardTitle>
              <CardDescription>See real phishing examples with detailed explanations of red flags</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentSection("quiz")}>
            <CardHeader className="text-center">
              <Brain className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <CardTitle>Quiz Zone</CardTitle>
              <CardDescription>Test your skills with interactive challenges and get instant feedback</CardDescription>
            </CardHeader>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setCurrentSection("report")}
          >
            <CardHeader className="text-center">
              <Trophy className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
              <CardTitle>Progress Report</CardTitle>
              <CardDescription>Track your awareness level and see detailed performance analytics</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="text-center">
          <Button
            onClick={() => setCurrentSection("training")}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
          >
            Start Training <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        <div className="mt-16 bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-center mb-8">Why Phishing Awareness Matters</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-semibold mb-2">90% of Breaches</h3>
              <p className="text-gray-600 text-sm">Start with phishing attacks targeting unsuspecting users</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Your First Defense</h3>
              <p className="text-gray-600 text-sm">Human awareness is the most effective security measure</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Prevention Works</h3>
              <p className="text-gray-600 text-sm">Trained users can reduce phishing success by 70%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
