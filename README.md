# AI Travel Guide 🌍

An AI-powered travel guide that generates informative descriptions of tourist destinations and converts them into spoken audio. Built with Flask, Google's Gemini API, Murf AI, and HTML, CSS, and JavaScript.

## Features

- **AI-generated travel guides:** Generate summaries or detailed descriptions of destinations.
- **Multilingual support:** Request descriptions in supported languages.
- **Text-to-speech narration:** Convert generated descriptions into audio using Murf AI.
- **Audio playback:** Listen to the generated travel guide directly through the frontend.

## Tech Stack

| Component | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Python, Flask |
| AI text generation | Google Gemini API |
| Text-to-speech | Murf AI |
| Cross-origin requests | Flask-CORS |

## Project Structure

```text
AI-Travel-Guide/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── .env
├── fe/
│   ├── index.html
│   └── index.js
├── .gitignore
└── README.md
```

The `.env` file contains private credentials and must not be committed to Git.

## Getting Started

### Prerequisites

- Python 3
- A Google Gemini API key
- A Murf AI API key

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git
cd YOUR_REPOSITORY_NAME
```

### 2. Install backend dependencies

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
```

On Windows, activate the environment with:

```powershell
.venv\Scripts\Activate.ps1
```

### 3. Configure environment variables

Create a `.env` file inside `backend/`:

```dotenv
GEMINI_API_KEY=your_gemini_api_key
MURF_API_KEY=your_murf_api_key
```

Use your own credentials. Never publish API keys in source code or commit them to Git.

### 4. Run the backend

From the `backend/` directory:

```bash
python app.py
```

The local API runs at `http://127.0.0.1:5000`.

### 5. Run the frontend

Open `fe/index.html` using a local development server, such as the Live Server extension in Visual Studio Code.

The frontend must be configured to send requests to the backend URL.

## API Endpoint

### Generate an audio guide

`POST /generate-audio-guide`

Example request:

```json
{
  "place": "Taj Mahal, India",
  "answerType": "Summary",
  "language": "English",
  "voiceId": "YOUR_MURF_VOICE_ID",
  "locale": "en-US"
}
```

Successful responses contain:

- `description`: The AI-generated travel guide.
- `audioBase64`: The generated audio encoded as Base64.

## Deployment

The backend can be deployed as a Python web service, and the frontend can be hosted as a static website.

Before deployment:
1. Configure API keys as environment variables on the hosting platform.
2. Update the frontend API URL to use the deployed backend.
3. Configure CORS to allow requests from the deployed frontend.
4. Test both text generation and audio playback on the live site.

## Security

- Keep `.env` files out of version control.
- Never expose API keys in frontend JavaScript.
- Rotate any API keys accidentally exposed in source code.

## License

This project is available under the license specified by the repository owner.
