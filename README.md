# Enhanced Interactive Learning Assistant – Vahan.ai

An AI-powered learning platform that personalizes research and generates structured, interactive educational reports based on user input. Built using Next.js and Django, integrated with LLMs, and designed to enhance self-directed learning through intelligent automation and user engagement.

---

## 🚀 Features

- 🧠 Accepts user input on learning topics, goals, and preferences
- 🔍 Conducts deep research using web content, academic sources, and video transcripts (via APIs or simulated)
- 🤖 Uses LLMs to ask clarifying questions and assess user knowledge
- 📘 Generates structured educational reports with:
  - Clear learning flow
  - Diagrams and visuals
  - Citations and references
  - Follow-up customization
- 🔄 Supports iterative refinement of content based on user feedback

---

## 🛠️ Technologies Used

| Stack | Tech |
|-------|------|
| Frontend | Next.js, TailwindCSS, TypeScript |
| Backend | Django REST Framework |
| LLM | OpenAI / LangChain |
| Research APIs | Wikipedia, YouTube Transcript API, Semantic Scholar (simulated) |
| Deployment | Docker |

---

🧠 Personalization Approach

Clarifying Questions: Based on the topic, the system asks the user about their current understanding, preferred format, and specific areas of interest.

Knowledge Level: Determines beginner, intermediate, or expert content structuring.

Learning Style: Allows user to pick between diagrams, textual explanations, or videos.


🔍 Research Methodology

Web Content: Wikipedia API, Google Snippets (simulated)

Videos: YouTube transcript parser (or mock API)

Academic Papers: Semantic Scholar/CrossRef (mocked for prototype)

LLM Curation: Extracts and filters relevant content into sections


📘 Report Generation

The final report includes:

Title and Summary

Step-by-step topic breakdown

Visuals (via Mermaid.js or generated images)

Cited references and recommended resources

Follow-up questions and response integration

📝 Sample Input / Output
![image](https://github.com/user-attachments/assets/83659282-bc1c-46dd-a433-3e0510463c82)
![image](https://github.com/user-attachments/assets/d07701c8-5fb2-4bc5-9a32-3a79a1d42a97)

![image](https://github.com/user-attachments/assets/9cb30a79-af3d-46c2-b177-d5ec0838c5ce)
![image](https://github.com/user-attachments/assets/08895595-155a-4662-8c5e-2f8f5e12ff83)
![image](https://github.com/user-attachments/assets/fc82be39-7319-4d50-89de-15614b22a5db)





❗ Limitations
Live research via APIs is simulated in prototype mode

LLM token limits may truncate long content

Visual generation is basic (planned upgrade to dynamic charts)

Follow-up response tuning is rule-based

🔮 Future Improvements

Integrate live academic databases (arXiv, JSTOR)

Add multilingual support

Enable voice-based interaction

Export reports to PDF/Docx


👨‍💻 Authors
Mohammed Ameer Roshan – @AmeerRoshan25



### 🔧 Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AmeerRoshan25/Vahan.ai.git
   cd Vahan.ai
