let testText = "The quick brown fox jumps over the lazy dog.";
let startTime, endTime;

function startTest() {
    document.getElementById("inputText").value = testText;
    let userInput = document.getElementById("userInput");
    userInput.value = "";
    userInput.readOnly = false; // corrected from ariaReadOnly
    userInput.focus();

    document.getElementById("output").innerHTML = "";
    startTime = new Date().getTime();
}

function endTest() {
    endTime = new Date().getTime(); // fixed 'newDate()' to 'new Date()'

    document.getElementById("userInput").readOnly = true;
    let timeElapsed = (endTime - startTime) / 1000;
    let userTypedText = document.getElementById("userInput").value;

    // fixed syntax errors
    let typedWords = userTypedText.split(/\s+/).filter(function (word) {
        return word !== "";
    }).length;

    let wpm = 0;

    if (timeElapsed !== 0 && !isNaN(typedWords)) {
        wpm = Math.round((typedWords / timeElapsed) * 60);
    }

    let outputDiv = document.getElementById("output");
    outputDiv.innerHTML =
        "<h2>Typing Test Results:</h2>" +
        "<p>Words Typed: " + typedWords + "</p>" +
        "<p>Time Elapsed: " + timeElapsed.toFixed(2) + " seconds</p>" +
        "<p>Words Per Minute (WPM): " + wpm + "</p>";
}
