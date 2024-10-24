from flask import Flask, request, render_template
from api.openai_api import ask
from prompt.prompt_manager import generatePrompt

# TODO: Add a dropdown that controls how detailed or consise the response is
# TODO: Prevent spamming the ask button to ensure malicious users don't abuse the system

# Initialize the server library
app = Flask(__name__)

# Handles showing the website's main page
@app.route('/')
def index():
    return render_template("index.html")


# Handles clicking the "Ask" button
@app.route('/question/', methods=['POST'])
def question():

    if request.method == 'POST':

        # If the question the student asks is more than a certain number of characters, reject the question
        # Each character/word of the question contributes to the cost of the API call
        if len(request.data) > 2500:
            return "Message too long!"

        # Get course type
        course = request.headers["Course"]

        # Get the question that the user asked from the HTTP request
        data = request.get_json()
        message = data["text"]

        # Generate the prompt based on the course
        prompt = generatePrompt(course)

        # Ask the question with the context of the selected course
        gpt_response = ask(message, prompt) 

        return gpt_response

    # Reject non-POST requests (flask should handle this regardless)
    return "Invalid request type", 400


# Run the server if this file is run
port = 8070
if __name__ == '__main__':
    print("\n\n\n")
    print("=" * 70)
    print(f'{"=    Enter the following url into the browser:":<69}=')
    print(f'{"=    http://127.0.0.1:" + str(port):<69}=')
    print("=" * 70)
    app.run(port=8070, debug=True)

