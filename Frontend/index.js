
"use strict";

// --- Configuration ---

const API_URL =
  "https://ai-travel-guide-w7ll.onrender.com/generate-audio-guide";

const VOICES = {
  English: { Male: "Matthew", Female: "Alicia" },
  Hindi: { Male: "Aman", Female: "Namrita" },
  Tamil: { Male: "Murali", Female: "Iniya" },
  Telugu: { Male: "Zion", Female: "Josie" }
};

const LOCALES = {
  English: "en-US",
  Hindi: "hi-IN",
  Tamil: "ta-IN",
  Telugu: "te-IN"
};

// --- State ---

const state = {
  place: "",
  image: "",
  length: "Summary",
  voice: "Male"
};

// --- DOM Elements ---

const cardsContainer = document.querySelector(".cards");
const experiencePanel = document.getElementById("experience");
const previewTitle = document.getElementById("previewTitle");
const audioSection = document.getElementById("audioSection");
const audioPlayer = document.getElementById("audioPlayer");
const transcriptText = document.getElementById("scriptText");
const generateButton = document.getElementById("generateBtn");
const languageSelect = document.getElementById("selectLanguage");
const closeButton = document.getElementById("closeExperience");
const searchPreviewCard = document.getElementById("searchPreviewCard");
const searchPreviewImage = document.getElementById("searchPreviewImage");
const searchPreviewTitle = document.getElementById("searchPreviewTitle");
const transcriptToggle = document.getElementById("transcriptToggle");
const transcriptContent = document.getElementById("transcriptContent");
const transcriptArrow = document.getElementById("transcriptArrow");

// --- Destination Selection ---

function selectDestination(place, image, clickedCard = null) {
  state.place = place;
  state.image = image;

  previewTitle.textContent = place;
  cardsContainer.classList.add("faded");

  document.querySelectorAll(".place-card").forEach(card => {
    card.classList.remove("active");
  });

  searchPreviewCard.classList.add("hidden");

  if (clickedCard) {
    clickedCard.classList.add("active");
  } else {
    searchPreviewImage.src = image;
    searchPreviewTitle.textContent = place;
    searchPreviewCard.classList.remove("hidden");
    searchPreviewCard.classList.add("active");
  }

  // Reset previous results.
  audioSection.classList.add("hidden");
  audioPlayer.pause();
  audioPlayer.removeAttribute("src");
  audioPlayer.load();
  transcriptText.textContent = "";

  generateButton.textContent = "Generate Audio Guide";
  generateButton.disabled = false;

  experiencePanel.classList.remove("hidden");

  setTimeout(() => {
    experiencePanel.classList.add("visible");
  }, 10);
}

function deselectDestination() {
  experiencePanel.classList.remove("visible");

  setTimeout(() => {
    experiencePanel.classList.add("hidden");
    cardsContainer.classList.remove("faded");
    searchPreviewCard.classList.add("hidden");

    document.querySelectorAll(".place-card").forEach(card => {
      card.classList.remove("active");
    });
  }, 300);
}

// --- Event Listeners ---

closeButton.addEventListener("click", deselectDestination);

document
  .querySelectorAll(".place-card:not(.search-preview-card)")
  .forEach(card => {
    card.addEventListener("click", () => {
      selectDestination(
        card.dataset.place,
        card.dataset.image,
        card
      );
    });
  });

// Description length selection.
const lengthButtons = document.querySelectorAll(
  '[data-group="length"] button'
);

lengthButtons.forEach(button => {
  button.addEventListener("click", () => {
    lengthButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    state.length = button.dataset.value;
  });
});

// Voice gender selection.
const voiceButtons = document.querySelectorAll(
  '[data-group="voice"] button'
);

voiceButtons.forEach(button => {
  button.addEventListener("click", () => {
    voiceButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    state.voice = button.dataset.value;
  });
});

// --- Generate Audio Guide ---

generateButton.addEventListener("click", async () => {
  if (!state.place) {
    alert("Please select a destination first.");
    return;
  }

  const selectedLanguage = languageSelect.value;
  const selectedVoice = state.voice;

  if (!VOICES[selectedLanguage] || !LOCALES[selectedLanguage]) {
    alert("The selected language is not supported.");
    return;
  }

  generateButton.disabled = true;
  generateButton.textContent = "⏳ Generating Audio...";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        place: state.place,
        answerType: state.length,
        language: selectedLanguage,
        voiceId: VOICES[selectedLanguage][selectedVoice],
        locale: LOCALES[selectedLanguage]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Server returned ${response.status}: ${errorText.slice(0, 300)}`
      );
    }

    const data = await response.json();

    if (!data.description) {
      throw new Error("The server returned no description.");
    }

    transcriptText.textContent = data.description;
    audioSection.classList.remove("hidden");

    if (data.audioBase64) {
      audioPlayer.src =
        `data:audio/mpeg;base64,${data.audioBase64}`;

      audioPlayer.load();
      audioPlayer.classList.remove("hidden");
      generateButton.textContent = "Generate Again";
    } else {
      audioPlayer.classList.add("hidden");
      generateButton.textContent = "Audio Not Available";
    }

  } catch (error) {
    console.error("Audio guide generation failed:", error);

    if (error instanceof TypeError) {
      alert(
        "Could not connect to the backend. Check your internet connection, " +
        "the Render service status, and its CORS configuration."
      );
    } else {
      alert(
        "Could not generate the audio guide. " +
        "Check the browser console for details."
      );
    }

    generateButton.textContent = "Try Again";

  } finally {
    generateButton.disabled = false;
  }
});

// --- Transcript Toggle ---

transcriptToggle.addEventListener("click", () => {
  transcriptContent.classList.toggle("hidden");
  transcriptArrow.classList.toggle("rotate-180");
});
