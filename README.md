# 🌍 AI Travel Guide

An AI-powered travel guide that generates informative descriptions of tourist destinations and converts them into spoken audio using Google Gemini and Murf AI.

## ✨ Features

- **AI-generated descriptions:** Generate summaries and detailed travel guides for destinations.
- **Multilingual support:** Generate descriptions in supported languages.
- **Text-to-speech:** Convert travel descriptions into narrated audio using Murf AI.
- **Audio playback:** Listen to generated guides through the web interface.

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Python, Flask
- **AI text generation:** Google Gemini API
- **Text-to-speech:** Murf AI
- **Cross-origin requests:** Flask-CORS

## 📁 Project Structure

```text
levelx/
├── Backend/
│   ├── app.py
│   ├── requirements.txt
│   └── .env  # Local only, not committed
├── Frontend/
│   ├── index.html
│   └── index.js
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Python 3.10 or later
- A Google Gemini API key
- A Murf AI API key

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/ai-travel-guide.git
cd ai-travel-guide
```

Replace `YOUR_USERNAME` with your GitHub username.

### 2. Install dependencies

```bash
cd Backend
python -m venv .venv
```

Activate the environment.

**Linux/macOS:**

```bash
source .venv/bin/activate
```

**Windows PowerShell:**

```powershell
.venv\Scripts\Activate.ps1
```

Install the required packages:

```bash
python -m pip install -r requirements.txt
```

### 3. Configure API keys

Create a `.env` file inside `Backend/`:

```dotenv
GEMINI_API_KEY=your_gemini_api_key
MURF_API_KEY=your_murf_api_key
```

Use your own API keys. Never commit this file to GitHub.

### 4. Run the backend

From the `Backend/` directory:

```bash
python app.py
```

The local backend should run at:

`http://127.0.0.1:5000`

### 5. Run the frontend

Open `Frontend/index.html` using a local development server, such as the Live Server extension in Visual Studio Code.

Ensure the frontend sends requests to the running Flask backend.

## 🔌 API Endpoint

### Generate an audio guide

**Method:** `POST`

**Endpoint:** `/generate-audio-guide`

**Example request:**

```json
{
  "place": "Taj Mahal, India",
  "answerType": "Summary",
  "language": "English",
  "voiceId": "YOUR_MURF_VOICE_ID",
  "locale": "en-US"
}
```

A successful response contains:

- `description`: The generated travel guide.
- `audioBase64`: Base64-encoded audio data.

## ☁️ Deployment

The application can be deployed using separate frontend and backend hosting services.

- **Backend:** Render or another Python web hosting service.
- **Frontend:** Netlify or another static hosting service.
- **Environment variables:** Configure API keys through the backend hosting dashboard.
- **Frontend API URL:** Update the frontend to use the deployed backend URL.
- **CORS:** Allow requests from the deployed frontend domain.

Production deployment should use a WSGI server such as Gunicorn rather than Flask's development server.

## 🔐 Security

- Never commit `.env` files.
- Keep API keys out of frontend JavaScript.
- Rotate any API credentials accidentally exposed.
- Restrict production CORS to trusted frontend origins.

## 🗺️ Future Improvements

- Interactive maps and route recommendations.
- Nearby attractions and restaurant recommendations.
- Budget-based travel itineraries.
- Additional narration languages and voices.
- Video-based destination guides.

## 📄 License

No license has been specified yet. All rights remain with the project owner unless a license is added to the repository.
