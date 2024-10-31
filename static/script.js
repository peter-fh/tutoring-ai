function constructMessage(role, message_string) {
	const content = [{ type: 'text', text: message_string }];
	const message = { role: role, content: content };
	return message;
}

let conversation = [];


// Function to make request to server for specific question asked
async function sendQuestion() {

	// Get the user's question from the textbox and their course selection
	const text = document.getElementById("userInput").value;
	const course = document.getElementById("course-select").value;
	const brevity = document.getElementById("brevity-select").value;
	if (text == ""){
		return;
	}

	const output_block = document.getElementById("chat");
	const question_block = document.createElement("span");
	const response_block = document.createElement("span");


	response_block.classList.add("output")

	if (course === "None") {
		question_block.classList.add("question");
		question_block.innerHTML = "<p>" + text + "</p>";
		question_block.innerHTML = marked.parse(question_block.innerHTML);
		output_block.appendChild(question_block);
		response_block.innerHTML = "<p>Sorry, I can't help you without knowing which course you are taking. Please select the course you are asking about in the dropdown on the left and try again.</p>"
		output_block.appendChild(response_block);
		return;
	}
	question_block.classList.add("question");
	question_block.classList.add("message");
	question_block.innerHTML = "<p>" + text + "</p>";
	question_block.innerHTML = marked.parse(question_block.innerHTML);
	output_block.appendChild(question_block);


	conversation.push(constructMessage('user', text))
	// Display error if course wasn't selected

	// Display temporary loading message
	response_block.innerHTML = "<p>Loading. This might take a few seconds.</p>"

	// Make the request
	const request = new Request('/question', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Course': course,
			'Brevity': brevity
		},
		body: JSON.stringify(conversation)
	})

	// Log the question asked to the console
	//console.log(text);

	// Asynchronously fetch the request
	fetch(request)
		// Convert response to text
		.then((response) => response.text())

		// Format and display the response
		.then((data) => {
			//console.log('Received prompt from gpt api:\n', data);
			response_block.innerHTML = data;
			MathJax.typeset([response_block]);
			response_block.innerHTML = marked.parse(response_block.innerHTML);
			conversation.push(constructMessage('assistant', text))
			console.log("Conversation:")
			console.log(conversation)


		})
		.catch((error) => {
			console.error('Error:', error);
	});
	response_block.classList.add("message");
	output_block.appendChild(response_block);

}
