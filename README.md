# Let Me "Ai" That For You (LMAITFY) 💡

[![GitHub Pages Status](https://github.com/YourUsername/YourRepoName/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/YourUsername/YourRepoName/actions/workflows/pages/pages-build-deployment)

You really couldn't ask the AI yourself?

LMAITFY is a minimalist static website designed to solve the simple dilemma of **which AI to use** or how to **easily share a prompt** with a friend.

It generates a single, shareable URL that encodes a specific question for a specific AI (Gemini, ChatGPT, or Copilot). The recipient opens the link and is guided through the process of pasting the question into the AI's interface, making the sharing of complex prompts seamless.

---

## 🚀 Live Demo

See the project live and try it out:
> **https://[Your-GitHub-Username].github.io/[Your-Repo-Name]/**

*(Remember to replace `[Your-GitHub-Username]` and `[Your-Repo-Name]` with your actual information.)*

---

## ✨ Features

* **AI Selector Modal:** Enter a prompt and choose which AI (Gemini, ChatGPT, or Copilot) you want to use.
* **Shareable Links:** Generates a custom URL (`?ai=Gemini&q=Your%20Question`) that you can send to anyone.
* **Automated Clipboard (for shared links):** When a user opens a shared link, the question is automatically copied to their clipboard, eliminating the need for manual copy/paste.
* **Custom Animation:** A fun "typing" animation prepares the user for the handoff, increasing engagement.
* **Zero Dependencies (excluding Tailwind CSS CDN):** Pure HTML, CSS, and JavaScript.

---

## 🛠️ Technology Stack

This project is a classic example of a **Static Site** built with core web technologies:

* **HTML5:** Structure
* **CSS3 (via Tailwind CSS CDN):** Modern, utility-first styling.
* **JavaScript (Vanilla):** All core logic, modal handling, URL parsing, and clipboard actions.

---

## 💻 How to Use (For Users)

1.  **Type Your Question:** Enter any query into the text box on the homepage.
2.  **Choose Assistant:** Select the AI you want to open the question in (e.g., **Gemini**).
3.  **Follow the Instructions:** The animation page will appear, telling you the question has been copied to your clipboard (or encoded in the URL, depending on the AI).
4.  **Click to Open:** Click the final button, and the AI's website will open in a new tab, ready for you to paste and send the question.

### Example Share Link

If you enter the question "What is the capital of Peru?" and choose **Gemini**, the **Copy Share Link** button will give you a URL that looks something like this:

`https://.../index.html?ai=Gemini&q=What%20is%20the%20capital%20of%20Peru?&copy=true`

When a friend opens this link, the site skips the main page, automatically copies your question to their clipboard, and guides them directly to the Gemini chat page!

---

## ⚙️ Project Setup and Deployment

This is a static site and does not require a build step or local server.

### Local Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/](https://github.com/)[Your-GitHub-Username]/[Your-Repo-Name].git
    ```
2.  **Open the files:**
    Open `index.html` directly in your web browser.

### GitHub Pages Deployment

1.  Push your code to your GitHub repository's **main** branch.
2.  Go to **Settings** $\rightarrow$ **Pages** in your repository.
3.  Set the **Source** to **Deploy from a branch**.
4.  Set the **Branch** to `main` (or `master`) and the **Folder** to `/ (root)`.
5.  Click **Save**. Your site will be live in a few minutes!
