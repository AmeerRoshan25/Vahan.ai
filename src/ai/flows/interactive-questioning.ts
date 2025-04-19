'use server';
/**
 * @fileOverview Asks the user clarifying questions to understand their specific interests,
 * prior knowledge, and preferred learning formats related to a given topic.
 *
 * - interactiveQuestioning - A function that asks clarifying question to the user.
 * - InteractiveQuestioningInput - The input type for the interactiveQuestioning function.
 * - InteractiveQuestioningOutput - The return type for the interactiveQuestioning function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const InteractiveQuestioningInputSchema = z.object({
  topic: z.string().describe('The topic the user wants to learn about.'),
});
export type InteractiveQuestioningInput = z.infer<typeof InteractiveQuestioningInputSchema>;

const InteractiveQuestioningOutputSchema = z.object({
  questions: z.array(z.string()).describe('An array of clarifying questions to ask the user.'),
});
export type InteractiveQuestioningOutput = z.infer<typeof InteractiveQuestioningOutputSchema>;

export async function interactiveQuestioning(input: InteractiveQuestioningInput): Promise<InteractiveQuestioningOutput> {
  return interactiveQuestioningFlow(input);
}

const prompt = ai.definePrompt({
  name: 'interactiveQuestioningPrompt',
  input: {
    schema: z.object({
      topic: z.string().describe('The topic the user wants to learn about.'),
    }),
  },
  output: {
    schema: z.object({
      questions: z.array(z.string()).describe('An array of clarifying questions to ask the user about their interests, prior knowledge, and preferred learning formats related to the topic.'),
    }),
  },
  prompt: `You are an AI assistant designed to ask clarifying questions to users about a specific topic.

  Your goal is to understand their interests, prior knowledge, and preferred learning formats so that a personalized learning report can be generated.

  Given the topic: {{{topic}}}, generate a list of questions that will help to personalize the report.
  The questions should be open-ended and encourage the user to provide detailed answers.
  The questions should cover the following aspects:
  *   Specific interests within the topic
  *   Prior knowledge level
  *   Preferred learning formats

  Return the questions as a JSON array of strings.
  `,
});

const interactiveQuestioningFlow = ai.defineFlow<
  typeof InteractiveQuestioningInputSchema,
  typeof InteractiveQuestioningOutputSchema
>(
  {
    name: 'interactiveQuestioningFlow',
    inputSchema: InteractiveQuestioningInputSchema,
    outputSchema: InteractiveQuestioningOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
