'use server';
/**
 * @fileOverview A research engine AI agent.
 *
 * - researchTopic - A function that handles the research process.
 * - ResearchTopicInput - The input type for the researchTopic function.
 * - ResearchTopicOutput - The return type for the researchTopic function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {getSearchResults} from '@/services/web-search';
import {getAcademicSource} from '@/services/academic-source';
import {getVideoTranscript} from '@/services/video-transcript';

const ResearchTopicInputSchema = z.object({
  topic: z.string().describe('The topic to research.'),
  userQuestion: z.string().optional().describe('The user question about the topic.'),
});
export type ResearchTopicInput = z.infer<typeof ResearchTopicInputSchema>;

const ResearchTopicOutputSchema = z.object({
  summary: z.string().describe('A summary of the research findings.'),
  webResults: z.array(z.object({
    title: z.string(),
    link: z.string(),
    snippet: z.string(),
  })).describe('Search results from the web.'),
  academicSource: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    abstract: z.string(),
    url: z.string(),
  }).describe('Information from academic sources.'),
  videoTranscript: z.string().describe('Transcript from a related video.'),
});
export type ResearchTopicOutput = z.infer<typeof ResearchTopicOutputSchema>;

export async function researchTopic(input: ResearchTopicInput): Promise<ResearchTopicOutput> {
  return researchTopicFlow(input);
}

const prompt = ai.definePrompt({
  name: 'researchTopicPrompt',
  input: {
    schema: z.object({
      topic: z.string().describe('The topic to research.'),
      userQuestion: z.string().optional().describe('The user question about the topic.'),
      webResults: z.array(z.object({
        title: z.string(),
        link: z.string(),
        snippet: z.string(),
      })).describe('Search results from the web.'),
      academicSource: z.object({
        title: z.string(),
        authors: z.array(z.string()),
        abstract: z.string(),
        url: z.string(),
      }).describe('Information from academic sources.'),
      videoTranscript: z.string().describe('Transcript from a related video.'),
    }),
  },
  output: {
    schema: z.object({
      summary: z.string().describe('A summary of the research findings.'),
    }),
  },
  prompt: `You are an expert research assistant. Your goal is to provide a comprehensive overview of a given topic.

  Topic: {{{topic}}}
  User Question: {{{userQuestion}}}

  Web Results:
  {{#each webResults}}
  Title: {{{title}}}
  Link: {{{link}}}
  Snippet: {{{snippet}}}
  {{/each}}

  Academic Source:
  Title: {{{academicSource.title}}}
  Authors: {{#each academicSource.authors}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  Abstract: {{{academicSource.abstract}}}
  URL: {{{academicSource.url}}}

  Video Transcript:
  {{{videoTranscript}}}

  Please provide a detailed summary of the topic, incorporating information from all available sources.
`,
});

const researchTopicFlow = ai.defineFlow<
  typeof ResearchTopicInputSchema,
  typeof ResearchTopicOutputSchema
>({
  name: 'researchTopicFlow',
  inputSchema: ResearchTopicInputSchema,
  outputSchema: ResearchTopicOutputSchema,
}, async input => {
  const webResults = await getSearchResults(input.topic);
  const academicSource = await getAcademicSource(input.topic);
  const videoTranscript = await getVideoTranscript(input.topic);

  const {output} = await prompt({
    ...input,
    webResults,
    academicSource,
    videoTranscript: videoTranscript.text,
  });

  return {
    ...output!,
    webResults,
    academicSource,
    videoTranscript: videoTranscript.text,
  };
});
