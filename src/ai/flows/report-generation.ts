// The 'use server' directive is crucial for using Next.js server-side features.
'use server';

/**
 * @fileOverview Generates a structured educational report based on research and user interaction.
 *
 * - generateReport - A function that triggers the report generation process.
 * - ReportGenerationInput - The input type for the generateReport function.
 * - ReportGenerationOutput - The return type for the generateReport function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

// Define the input schema for the report generation flow.
const ReportGenerationInputSchema = z.object({
  topic: z.string().describe('The topic of the educational report.'),
  learningObjectives: z.string().describe('The learning objectives for the report.'),
  researchContent: z.string().describe('The researched content on the topic.'),
  userInterests: z.string().describe('The user\u0027s specific interests within the topic.'),
  priorKnowledge: z.string().describe('The user\u0027s prior knowledge level.'),
  preferredLearningFormats: z.string().describe('The user\u0027s preferred learning formats.'),
});
export type ReportGenerationInput = z.infer<typeof ReportGenerationInputSchema>;

// Define the output schema for the report generation flow.
const ReportGenerationOutputSchema = z.object({
  report: z.string().describe('The generated educational report in markdown format.'),
});
export type ReportGenerationOutput = z.infer<typeof ReportGenerationOutputSchema>;

// Wrapper function to call the report generation flow
export async function generateReport(input: ReportGenerationInput): Promise<ReportGenerationOutput> {
  return reportGenerationFlow(input);
}

// Define the prompt for report generation.
const reportGenerationPrompt = ai.definePrompt({
  name: 'reportGenerationPrompt',
  input: {
    schema: z.object({
      topic: z.string().describe('The topic of the educational report.'),
      learningObjectives: z.string().describe('The learning objectives for the report.'),
      researchContent: z.string().describe('The researched content on the topic.'),
      userInterests: z.string().describe('The user\u0027s specific interests within the topic.'),
      priorKnowledge: z.string().describe('The user\u0027s prior knowledge level.'),
      preferredLearningFormats: z.string().describe('The user\u0027s preferred learning formats.'),
    }),
  },
  output: {
    schema: z.object({
      report: z.string().describe('The generated educational report in markdown format.'),
    }),
  },
  prompt: `You are an AI assistant designed to generate comprehensive educational reports.

  Based on the topic, learning objectives, researched content, user interests, prior knowledge,
  and preferred learning formats, create a well-structured educational report with clear organization,
  visual aids (using placeholder images), citations, references, and recommended resources.

  Topic: {{{topic}}}
  Learning Objectives: {{{learningObjectives}}}
  Researched Content: {{{researchContent}}}
  User Interests: {{{userInterests}}}
  Prior Knowledge: {{{priorKnowledge}}}
  Preferred Learning Formats: {{{preferredLearningFormats}}}

  Generate a comprehensive educational report in markdown format:
  `,
});

// Define the report generation flow.
const reportGenerationFlow = ai.defineFlow<
  typeof ReportGenerationInputSchema,
  typeof ReportGenerationOutputSchema
>({
  name: 'reportGenerationFlow',
  inputSchema: ReportGenerationInputSchema,
  outputSchema: ReportGenerationOutputSchema,
}, async input => {
  const {output} = await reportGenerationPrompt(input);
  return output!;
});
