"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, BarChart, HelpCircle } from "lucide-react"
import { motion } from "framer-motion"
import EnzymesContent from "./enzymesContent"
import EnzymesSimulation from "./enzymesSimulation"
import EnzymesQuiz from "./enzymesQuiz"

const topic = {
  title: "Enzymes",
  description: "Study of biological catalysts that speed up chemical reactions in living organisms without being consumed in the process.",
  hasSimulation: true,
  hasQuiz: true
}

export default function EnzymesIndex() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="description" className="space-y-4">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="description" className="flex items-center">
            <BookOpen className="h-4 w-4 mr-2" />
            Description
          </TabsTrigger>
          <TabsTrigger value="visualization" className="flex items-center">
            <BarChart className="h-4 w-4 mr-2" />
            Visualization
          </TabsTrigger>
          <TabsTrigger value="quiz" className="flex items-center">
            <HelpCircle className="h-4 w-4 mr-2" />
            Quiz
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="space-y-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardContent className="pt-6">
                <EnzymesContent />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="visualization" className="space-y-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardContent className="pt-6">
                <EnzymesSimulation />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="quiz" className="space-y-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardContent className="pt-6">
                <EnzymesQuiz />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
