// Load tensorflow module
require('@tensorflow/tfjs');
const use = require('@tensorflow-models/universal-sentence-encoder');
let model;

// Function to load the Universal Sentence Encoder model
async function loadModel() {
    model = await use.load();
}

// Function to calculate the similarity between two sentences
async function calculateSimilarity(sentence1, sentence2) {
    try {
      // Check if the model is already loaded, load if not
        if (!model) {
            console.log("Model not loaded. Loading model...");
            await loadModel();
        }

      // Generate embeddings for the sentences using the model
      // Embeddings are numerical representations of sentences
        const embeddings = await model.embed([sentence1, sentence2]);
        const [embedding1, embedding2] = await embeddings.array();

      // Calculate cosine similarity between the two embeddings
        const cosineSimilarity = calculateCosineSimilarity(embedding1, embedding2);

      // Adjust similarity interpretation to be within the range of 0 to 100%
        const similarityPercentage = (cosineSimilarity + 1) / 2 * 100;

      // Log the similarity percentage to the console
        console.log(`Similarity Percentage: ${similarityPercentage.toFixed(2)}%`);
    } catch (error) {
      // Log any errors that occur during processing
        console.error("Error in calculateSimilarity:", error);
    }
}
// Function to calculate cosine similarity between two vectors
function calculateCosineSimilarity(vector1, vector2) {
  // Calculate the dot product of the two vectors
    const dotProduct = vector1.reduce((acc, val, i) => acc + val * vector2[i], 0);
  // Calculate the magnitude of each vector
    const magnitude1 = Math.sqrt(vector1.reduce((acc, val) => acc + val ** 2, 0));
    const magnitude2 = Math.sqrt(vector2.reduce((acc, val) => acc + val ** 2, 0));
  // Return the cosine similarity as the dot product divided by the product of magnitudes
    return dotProduct / (magnitude1 * magnitude2);
}

// Example usage of the similarity calculation function
// Define two sentences to compare
const sentence1 = "The sky color depends on the location and geography.";
const sentence2 = "The sky is blue and it is because of the light reflected from the ocean.";

// Load the model and then calculate the similarity between the sentences
loadModel().then(() => calculateSimilarity(sentence1, sentence2));




/* // Load tensorflow module
require('@tensorflow/tfjs');
const use = require('@tensorflow-models/universal-sentence-encoder');

async function calculateSimilarity(sentence1, sentence2) {
  // Load the Universal Sentence Encoder
  const model = await use.load();

  // Generate embeddings for the sentences
  const embeddings = await model.embed([sentence1, sentence2]);
  const embedding1 = await embeddings.arraySync()[0];
  const embedding2 = await embeddings.arraySync()[1];

  // Calculate cosine similarity
  const cosineSimilarity = calculateCosineSimilarity(embedding1, embedding2);

  // Convert cosine similarity to a percentage
  const similarityPercentage = (1 - cosineSimilarity) * 100;

  console.log(`Similarity Percentage: ${similarityPercentage.toFixed(2)}%`);
}

function calculateCosineSimilarity(vector1, vector2) {
  const dotProduct = vector1.reduce((acc, val, i) => acc + val * vector2[i], 0);
  const magnitude1 = Math.sqrt(vector1.reduce((acc, val) => acc + val ** 2, 0));
  const magnitude2 = Math.sqrt(vector2.reduce((acc, val) => acc + val ** 2, 0));

  return dotProduct / (magnitude1 * magnitude2);
}

// Example usage
const sentence1 = "The sky color depends on the location and geography.";
const sentence2 = "The sky is blue and it is because of the light reflected from the ocean.";

calculateSimilarity(sentence1, sentence2); */