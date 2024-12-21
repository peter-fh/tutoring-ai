let conversation = [];
let loading_lock = false;

// Only disable modals if testing changes to the User Interface
enable_modals = true
var course_modal = document.getElementById("CourseSelectModal");
if (enable_modals){
	course_modal.style.display = "block";
}

var type_modal = document.getElementById("TypeSelectModal");
type_modal.style.display = "none";

function closeCourseModal(){
	document.getElementById("course-select").value = document.getElementById("modal-course-select").value
	course_modal.style.display = "none";
	type_modal.style.display = "block"
}

function selectProblem() {
	document.getElementById("type-select").value = "Problem"
	type_modal.style.display = "none"
	document.getElementById("userInput").focus();
}

function selectConcept() {
	document.getElementById("type-select").value = "Concept"
	type_modal.style.display = "none"
	document.getElementById("userInput").focus();
}

function newConversation() {
	location.reload();
}


function constructMessage(role, message_string) {
	const content = [{ type: 'text', text: message_string }];
	const message = { role: role, content: content };
	return message;
}


document.getElementById("userInput").value = "";

document.getElementById("userInput").addEventListener("keydown", function(event) {
	if (event.key === "Enter" && !event.shiftKey) {
		event.preventDefault();
		if (loading_lock) {
			return;
		}
		sendQuestion();
		document.getElementById("userInput").value = "";
	}
})

// Function to make request to server for specific question asked
async function sendQuestion() {

	// Get the user's question from the textbox and their course selection
	const text = document.getElementById("userInput").value;
	const course = document.getElementById("course-select").value;
	const brevity = document.getElementById("brevity-select").value;
	const type = document.getElementById("type-select").value;
	if (text == ""){
		return;
	}

	const output_block = document.getElementById("chat");
	const question_block = document.createElement("span");
	const response_block = document.createElement("span");


	response_block.classList.add("output")

	// Handle case with no course selected
	if (course === "None") {
		// Display error message
		question_block.classList.add("question");
		question_block.innerHTML = "<p>" + text + "</p>";
		question_block.innerHTML = marked.parse(question_block.innerHTML);
		output_block.appendChild(question_block);
		response_block.innerHTML = "<p>Sorry, I can't help you without knowing which course you are taking. Please select the course you are asking about in the dropdown on the left and try again.</p>"
		output_block.appendChild(response_block);

		// Exit so that no ChatGPT query is sent
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
	container = document.getElementById("chat")
	response_block.innerHTML = "<p>Loading. This might take a few seconds.</p>"
	loading_lock = true;

	// Make the request
	const request = new Request('/question', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Course': course,
			'Brevity': brevity,
			'Type': type
		},
		body: JSON.stringify(conversation)
	})

	// Log the question asked to the console
	//console.log(text);

	// Asynchronously fetch the request
	const start_time = performance.now()
	const response = await fetch(request)
	const reader = response.body.getReader()
	const decoder = new TextDecoder('utf-8')
	answer = ""

	while (true) {
		const {value, done} = await reader.read()
		if (done) {
			break
		}
		
		const chunk = decoder.decode(value, { stream: true})
		answer += chunk
		response_block.innerHTML = answer;
		MathJax.typeset([response_block]);
		response_block.innerHTML = marked.parse(response_block.innerHTML);
		response_block.classList.add("message");
		output_block.appendChild(response_block);
	}
	conversation.push(constructMessage('assistant', answer))
	loading_lock = false;

	const end_time = performance.now()
	console.log(`Response took ${(end_time - start_time) / 1000}`)



}
