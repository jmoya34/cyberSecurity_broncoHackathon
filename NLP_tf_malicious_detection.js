// Load tensorflow module
require("@tensorflow/tfjs");
const use = require("@tensorflow-models/universal-sentence-encoder");
let model;

// Function to load the Universal Sentence Encoder model
async function loadModel() {
  model = await use.load();
}

// Function to calculate cosine similarity between two vectors
function calculateCosineSimilarity(vector1, vector2) {
  // Calculate the dot product of the two vectors
  const dotProduct = vector1.reduce((acc, val, idx) => acc + val * vector2[idx], 0);

  // Calculate the magnitude of each vector
  const magnitude1 = Math.sqrt(vector1.reduce((acc, val) => acc + val ** 2, 0));
  const magnitude2 = Math.sqrt(vector2.reduce((acc, val) => acc + val ** 2, 0));

  // Return the cosine similarity as the dot product divided by the product of magnitudes
  return dotProduct / (magnitude1 * magnitude2);
}

// Function to calculate similarity for multiple sentences
async function calculateSimilarity(sentences) {
  try {
    if (!model) {
      console.log("Model not loaded. Loading model...");
      await loadModel();
    }

    const embeddings = await model.embed(sentences);
    const embeddingsArray = await embeddings.array();
    let totalSimilarity = 0;

    // Calculate cosine similarities between all pairs of embeddings
    for (let i = 0; i < embeddingsArray.length; i++) {
      for (let j = i + 1; j < embeddingsArray.length; j++) {
        const cosineSimilarity = calculateCosineSimilarity(embeddingsArray[i], embeddingsArray[j]);
        totalSimilarity += (cosineSimilarity + 1) / 2 * 100;
      }
    }

    // Calculate average similarity
    const numComparisons = embeddingsArray.length * (embeddingsArray.length - 1) / 2;
    const averageSimilarity = totalSimilarity / numComparisons;
    console.log(`Average Similarity: ${averageSimilarity.toFixed(2)}%`);
    return averageSimilarity;
  } catch (error) {
    console.error("Error in calculateSimilarity:", error);
  }
}

// Function to analyze email content for phishing indicators
function analyzeForPhishingIndicators(emailContent) {
  const phishingIndicators = [
    "urgent", "confidential", "verify your account", "sensitive information", "immediate action required",
    "account suspended", "security alert", "update your account", "validate your account",
    "account verification", "confirm password", "confirm identity", "account deactivated",
    "security notice", "account compromised", "unusual activity", "log in immediately",
    "payment declined", "account locked", "security breach", "account has been locked",
    "reset your password", "billing information", "final warning", "account cancellation",
    "immediate attention required", "unauthorized login attempt", "secure your account",
    "account will be terminated", "suspicious activity", "reactivate your account",
    "claim your reward", "prize winner", "free gift", "special offer",
    "limited time offer", "confidential financial information", "wire transfer",
    "bank details", "tax refund", "credit limit exceeded", "payment overdue",
    "order confirmation", "transaction alert", "money transfer", "account update required",
    "policy update", "legal action", "government notice", "court notice",
    "failure to comply", "mandatory update", "security update required", "official notification"
  ];
  const phishingKeywords = phishingIndicators.map(indicator => indicator.toLowerCase());
  for (let indicator of phishingIndicators) {
    if (emailContent.toLowerCase().includes(indicator)) {
      return true;
    }
  }
  return false;
}

// Main function to analyze email
async function analyzeEmail(emailContent, aiGeneratedSentences) {
  const isPhishing = analyzeForPhishingIndicators(emailContent);
  console.log(`Phishing content detected: ${isPhishing}`);

  const sentencesEmail = emailContent.split(".").filter(sentence => sentence.trim() !== "");
  const combinedSentences = sentencesEmail.concat(aiGeneratedSentences);
  const averageSimilarity = await calculateSimilarity(combinedSentences);
  console.log(`Combined Average Similarity: ${averageSimilarity.toFixed(2)}%`);
}

// Example usage
const emailContent = "Urgent: Verify your account information immediately to avoid suspension.";
const aiGeneratedSentences = ["Your account has been compromised.", "Please confirm your password."];

// Load the model and analyze the email
loadModel().then(() => analyzeEmail(emailContent, aiGeneratedSentences));
//------New--------








/* // Load tensorflow module
require("@tensorflow/tfjs");
const use = require("@tensorflow-models/universal-sentence-encoder");
let model;

// Function to load the Universal Sentence Encoder model
async function loadModel() {
  model = await use.load();
}

async function calculateSimilarity(sentences) {
  try {
    // Check if the model is already loaded, load if not
    if (!model) {
      console.log("Model not loaded. Loading model...");
      await loadModel();
    }

    // Generate embeddings for the sentences using the model
    // Embeddings are numerical representations of sentences
    const embeddings = await model.embed(sentences);
    const embeddingsArray = await embeddings.array();

    // Calculate cosine similarities between all pairs of embeddings
    const cosineSimilarities = calculateCosineSimilarity(embeddingsArray);

    // Log the cosine similarities to the console
    console.log("Cosine Similarities:", cosineSimilarities);

    // Adjust similarity interpretation to be within the range of 0 to 100%
    const similarityPercentages = cosineSimilarities.map(
      (similarity) => ((similarity + 1) / 2) * 100,
    );

    // Find average similarity percentage
    const similartyAmount = similarityPercentages.length;
    accuracy = 0.0;

    // Loop through all similarity values
    similarityPercentages.forEach((similarity) => {
      accuracy += similarity;
    });
    accuracy = accuracy / similartyAmount;
    console.log("Accuracy: ", accuracy);
  } catch (error) {
    // Log any errors that occur during processing
    console.error("Error in calculateSimilarity:", error);
  }
}

function calculateCosineSimilarity(vectors) {
  const numVectors = vectors.length;

  // Initialize a matrix to store cosine similarities between each pair of vectors
  const cosineSimilarities = [];

  // Calculate cosine similarity for each pair of vectors
  for (let i = 0; i < numVectors; i++) {
    const vector1 = vectors[i];
    for (let j = i + 1; j < numVectors; j++) {
      const vector2 = vectors[j];

      // Calculate the dot product of the two vectors
      const dotProduct = vector1.reduce(
        (acc, val, idx) => acc + val * vector2[idx],
        0,
      );

      // Calculate the magnitude of each vector
      const magnitude1 = Math.sqrt(
        vector1.reduce((acc, val) => acc + val ** 2, 0),
      );
      const magnitude2 = Math.sqrt(
        vector2.reduce((acc, val) => acc + val ** 2, 0),
      );

      // Calculate cosine similarity and store it in the matrix
      const similarity = dotProduct / (magnitude1 * magnitude2);
      cosineSimilarities.push(similarity);
    }
  }

  return cosineSimilarities;
}

// Example usage of the similarity calculation function
const sentence = [
  "The sky color depends on the location and geography.",
  "The sky is blue and it is because of the light reflected from the ocean.",
  "The sky is green",
];

// Load the model and then calculate the similarity between the sentences
loadModel().then(() => calculateSimilarity(sentence));

//------New--------
// Function to analyze email content for phishing indicators
function analyzeForPhishingIndicators(emailContent) {
  // Define common phishing indicators
  const phishingIndicators = [
    "urgent",
    "confidential",
    "verify your account",
    "sensitive information",
    "immediate action required",
  ];

  // Check if any phishing indicators are present in the email content
  for (let indicator of phishingIndicators) {
    if (emailContent.toLowerCase().includes(indicator)) {
      return true; // Phishing indicator found
    }
  }
  return false; // No phishing indicators found
}

// Function to calculate similarity for multiple sentences
async function calculateSimilarityMultiple(
  sentencesEmail,
  aiGeneratedSentences,
) {
  let totalSimilarity = 0;

  for (let i = 0; i < sentencesEmail.length; i++) {
    for (let j = 0; j < aiGeneratedSentences.length; j++) {
      const similarity = await calculateSimilarity(
        sentencesEmail[i],
        aiGeneratedSentences[j],
      );
      totalSimilarity += similarity;
    }
  }

  // Calculate average similarity
  const averageSimilarity =
    totalSimilarity / (sentencesEmail.length * aiGeneratedSentences.length);
  return averageSimilarity;
}

// Example usage
const emailContent =
  "Urgent: Verify your account information immediately to avoid suspension.";
const aiGeneratedSentences = [
  "Your account has been compromised.",
  "Please confirm your password.",
];

// Check for phishing indicators
const isPhishing = analyzeForPhishingIndicators(emailContent);
console.log(`Phishing content detected: ${isPhishing}`);

// Split the email content into sentences (simple split by period in this example)
const sentencesEmail = emailContent
  .split(".")
  .filter((sentence) => sentence.trim() !== "");

// Calculate similarity with AI-generated sentences
loadModel().then(() =>
  calculateSimilarityMultiple(sentencesEmail, aiGeneratedSentences).then(
    (averageSimilarity) =>
      console.log(`Average Similarity: ${averageSimilarity.toFixed(2)}%`),
  ),
);

//--examples
 */