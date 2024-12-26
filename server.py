import os
from flask import Flask, request, send_from_directory, stream_with_context, Response
from api.openai_api import ask
from prompt.prompt_manager import generatePrompt, PromptType

# Initialize the server library
app = Flask(__name__, static_folder="frontend/dist")
@app.route('/icon.png')
def icon():
    if not app.static_folder:
        raise Exception("Static folder not found!")

    return send_from_directory(app.static_folder, 'icon.png', mimetype='image/png')

# Handles showing the website's main page
@app.route('/')
def index():
    if not app.static_folder:
        raise Exception("Static folder not found!")
    return send_from_directory(app.static_folder, "index.html")


@app.route("/assets/<path:path>")
def serve_assets(path):
    if not app.static_folder:
        raise Exception("Static folder not found!")
    return send_from_directory(app.static_folder + os.sep + "assets", path)

# Handles clicking the "Ask" button
@app.route('/question/', methods=['POST'])
def question():

    if request.method == 'POST':

        # If the question the student asks is more than a certain number of characters, reject the question
        # Each character/word of the question contributes to the cost of the API call
        # Disabled since a conversation after one message is already longer than this value
        # TODO: add more protection/incentive against long conversation

        # if len(request.data) > 2500:
            # return "Message too long!"

        # Get course type
        course = request.headers["Course"]

        # Get brevity level
        brevity = request.headers["Brevity"]

        # Get question type
        question = request.headers["Type"]
        prompt_type = PromptType[question.upper()]

        # Get the question that the user asked from the HTTP request
        message = request.get_json()

        # Generate the prompt based on the course
        course_info, prompt = generatePrompt(prompt_type, course, brevity)

        # Ask the question with the context of the selected course
        stream = ask(message, course_info, prompt, dummy_response=False) 

        return Response(stream_with_context(stream), content_type="text/plain")

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

