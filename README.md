
# Chatbot Widget Implementation

This project implements a simple **chatbot widget** consisting of a front-end widget and a backend API. The widget allows users to chat with an AI assistant (James) powered by OpenAI's GPT-3.5 model. The backend is built with Node.js/Express and communicates with the OpenAI API using an environment-provided API key.

## Files in the ZIP

The ZIP archive contains the following files:

- **index.html** – The main page with a "Chat with us" button that toggles the chat widget (embedded via an `<iframe>`).
- **widget.html** – The chatbot interface loaded in the iframe. It handles the chat UI, shows "James is typing..." while awaiting a response, and displays bot replies prefixed with "James says:".
- **server.js** – The Express backend server. It defines a POST `/chat` endpoint that calls the OpenAI API (model gpt-3.5-turbo) using the `OPENAI_API_KEY` environment variable. It also serves the static files for the widget.
- **package.json** – Node.js project file listing dependencies (express, openai, cors, body-parser) and a start script.

## How to Run

To test and use this chatbot widget:

1. **Unzip the archive** into a directory.
2. **Install dependencies** by running `npm install` in that directory.
3. **Set up API Key:** Ensure you have an environment variable `OPENAI_API_KEY` set to your OpenAI API key before starting the server.
4. **Start the server** with `npm start`. The Express server will listen on port 3000 (or the port defined by the `PORT` env variable).
5. **Open the widget page:** In a web browser, go to `http://localhost:3000`. You should see the main page with a "Chat with us" button. Click the button to open the chat interface. You can then send messages and receive replies from the chatbot.
6. **Observe the chatbot behavior:** When you send a message, the widget will display "James is typing..." until the server responds. Once a reply is received, it will show up as "James says: ...". If any error occurs (e.g., network issue or API error), an error message is displayed instead of an undefined response.
