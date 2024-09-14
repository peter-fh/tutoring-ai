
// Function to make request to server for specific question asked
async function sendQuestion() {

	// Get the user's question from the textbox and their course selection
	const text = document.getElementById("userInput").value;
	const course = document.getElementById("course-select").value;

	// Find the response element to paste the error, loading message and/or response
	const response_block = document.getElementById("output");

	// Display error if course wasn't selected
	if (course === "None") {
		response_block.innerHTML = "<p>Please select the course you are taking.</p>"
		return;
	}

	// Display temporary loading message
	response_block.innerHTML = "<p>Loading. This might take a few seconds.</p>"

	// Make the request
	const request = new Request('/question', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Course': course
		},
		body: JSON.stringify({text: text})
	})

	// Log the question asked to the console
	console.log(text);


	// Asynchronously fetch the request
	fetch(request)
		// Convert response to text
		.then((response) => response.text())

		// Format and display the response
		.then((data) => {
			console.log('Received prompt from gpt api:\n', data);
			response_block.innerHTML = data;
			MathJax.typeset([response_block]);
			response_block.innerHTML = marked.parse(response_block.innerHTML);


		})
		.catch((error) => {
			console.error('Error:', error);
	});

}
