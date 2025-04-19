
'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {researchTopic} from '@/ai/flows/research-engine';
import {interactiveQuestioning} from '@/ai/flows/interactive-questioning';
import {generateReport} from '@/ai/flows/report-generation';
import {toast} from '@/hooks/use-toast';

export default function Dashboard() {
  const [topic, setTopic] = useState('');
  const [question, setQuestion] = useState('');
  const [researchSummary, setResearchSummary] = useState('');
  const [clarifyingQuestions, setClarifyingQuestions] = useState<string[]>([]);
  const [userInterests, setUserInterests] = useState('');
  const [priorKnowledge, setPriorKnowledge] = useState('');
  const [preferredLearningFormats, setPreferredLearningFormats] = useState('');
  const [report, setReport] = useState('');

  const handleResearch = async () => {
    if (!topic) {
      toast({
        title: 'Error',
        description: 'Please enter a topic.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const researchResult = await researchTopic({
        topic: topic,
        userQuestion: question,
      });
      setResearchSummary(researchResult.summary);
      toast({
        title: 'Success',
        description: 'Research completed!',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to research topic. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleInteractiveQuestioning = async () => {
    if (!topic) {
      toast({
        title: 'Error',
        description: 'Please enter a topic.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const questionsResult = await interactiveQuestioning({topic: topic});
      setClarifyingQuestions(questionsResult.questions);
      toast({
        title: 'Success',
        description: 'Clarifying questions generated!',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to generate questions. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleReportGeneration = async () => {
    if (!topic || !researchSummary || !userInterests || !priorKnowledge || !preferredLearningFormats) {
      toast({
        title: 'Error',
        description: 'Please fill in all the required information.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const reportResult = await generateReport({
        topic: topic,
        learningObjectives: 'Understand the topic',
        researchContent: researchSummary,
        userInterests: userInterests,
        priorKnowledge: priorKnowledge,
        preferredLearningFormats: preferredLearningFormats,
      });
      setReport(reportResult.report);
      toast({
        title: 'Success',
        description: 'Report generated!',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to generate report. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-background p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>ScholarAI Dashboard</CardTitle>
          <CardDescription>Enter a topic and related information to generate a personalized educational report.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="topic">Topic</Label>
            <Input
              id="topic"
              placeholder="Enter the topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="question">Question</Label>
            <Input
              id="question"
              placeholder="Enter your question about the topic"
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          <Button onClick={handleResearch}>Research Topic</Button>
          {researchSummary && (
            <div className="grid gap-2">
              <Label>Research Summary</Label>
              <Textarea value={researchSummary} readOnly className="min-h-[100px]" />
            </div>
          )}

          <Button onClick={handleInteractiveQuestioning}>Ask Clarifying Questions</Button>
          {clarifyingQuestions.length > 0 && (
            <div className="grid gap-2">
              <Label>Clarifying Questions</Label>
              {clarifyingQuestions.map((q, index) => (
                <Textarea key={index} value={q} readOnly className="min-h-[50px]" />
              ))}
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="userInterests">Your Interests</Label>
            <Input
              id="userInterests"
              placeholder="Enter your specific interests within the topic"
              type="text"
              value={userInterests}
              onChange={(e) => setUserInterests(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="priorKnowledge">Prior Knowledge</Label>
            <Input
              id="priorKnowledge"
              placeholder="Enter your prior knowledge level"
              type="text"
              value={priorKnowledge}
              onChange={(e) => setPriorKnowledge(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="preferredLearningFormats">Preferred Learning Formats</Label>
            <Input
              id="preferredLearningFormats"
              placeholder="Enter your preferred learning formats"
              type="text"
              value={preferredLearningFormats}
              onChange={(e) => setPreferredLearningFormats(e.target.value)}
            />
          </div>

          <Button onClick={handleReportGeneration}>Generate Report</Button>
          {report && (
            <div className="grid gap-2">
              <Label>Generated Report</Label>
              <Textarea value={report} readOnly className="min-h-[200px]" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
