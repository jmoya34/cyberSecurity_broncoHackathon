// Load tensorflow module
require('@tensorflow/tfjs');
const use = require('@tensorflow-models/universal-sentence-encoder');
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
    const similarityPercentages = cosineSimilarities.map((similarity) => (similarity + 1) / 2 * 100);

    // Find average similarity percentage
    const similartyAmount = similarityPercentages.length;
    accuracy = 0.0;

    // Loop through all similarity values
    similarityPercentages.forEach((similarity) => {
      accuracy += similarity;
    });
    accuracy = accuracy / similartyAmount;
    console.log("Accuracy: ", accuracy);

    
  }  catch (error) {
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
      const dotProduct = vector1.reduce((acc, val, idx) => acc + val * vector2[idx], 0);

      // Calculate the magnitude of each vector
      const magnitude1 = Math.sqrt(vector1.reduce((acc, val) => acc + val ** 2, 0));
      const magnitude2 = Math.sqrt(vector2.reduce((acc, val) => acc + val ** 2, 0));

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
  "The sky is green"
];

// Load the model and then calculate the similarity between the sentences
loadModel().then(() => calculateSimilarity(sentence));
