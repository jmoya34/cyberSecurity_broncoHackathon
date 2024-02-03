function handleTextExtraction(result) {
  var extractedText = result[0];
  console.log("Extracted Text:", extractedText);

  // Split the extracted text into an array of sentences
  var sentences = extractedText.split(/[.!?]/);

  // Remove any empty strings from the array
  sentences = sentences.filter(function (sentence) {
    return sentence.trim() !== "";
  });

  // Now 'sentences' is an array where each element represents a separate sentence
  console.log("Sentences:", sentences);
}

function extractText() {
  // query the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // get the tab object from the result
    var activeTab = tabs[0];

    // execute a content script to extract text from the page
    chrome.tabs.executeScript(
      activeTab.id,
      { code: "document.body.innerText" },
      handleTextExtraction,
    );
  });
}

// attach the event listener to the button
document.getElementById("detect").addEventListener("click", extractText);
