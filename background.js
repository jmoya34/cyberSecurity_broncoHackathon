// Listen for messages from the popup or content scripts
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.extractedText) {
    console.log('Text received in background:', request.extractedText);

    // Optionally, you can store or process the extracted text here

    // Send a response back to the sender (popup script)
    sendResponse({ message: 'Text received successfully in background.' });
  }
});