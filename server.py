from flask import Flask, request, send_from_directory, stream_with_context, Response
from api.openai_api import ask, readImage, introductionGenerator, summarize
from prompt.prompt_manager import prompt, PromptType
from dotenv import load_dotenv
from flask_cors import CORS
import os
import sys

use_example_responses = False
load_dotenv(override=True)
dev = os.getenv("FLASK_ENV") == "development"

# Initialize the server library
app = Flask(__name__, static_folder="frontend/dist")
if dev:
    CORS(app)

@app.route('/icon.png')
def icon():
    if not app.static_folder:
        raise Exception("Static folder not found!")

    return send_from_directory(app.static_folder, 'icon.png', mimetype='image/png')

@app.route('/font')
def font():
    if not app.static_folder:
        raise Exception("Static folder not found!")

    return send_from_directory(app.static_folder, 'proximanova.ttf')

# Handles showing the website's main page
@app.route('/')
def index():
    if not app.static_folder:
        raise Exception("Static folder not found!")
    return send_from_directory(app.static_folder, "index.html")

@app.route('/summary', methods=['POST'])
def summary():
    if request.method != 'POST':
        return "Invalid request type", 400

    conversation = request.get_json()
    return summarize(conversation, dummyResponse=use_example_responses)

@app.route("/assets/<path:path>")
def serve_assets(path):
    if not app.static_folder:
        raise Exception("Static folder not found!")
    return send_from_directory(app.static_folder + os.sep + "assets", path)

@app.route('/introduction')
def introduction():
    stream = introductionGenerator()
    return Response(stream_with_context(stream), content_type="text/plain")


@app.route('/image', methods=['POST'])
def image():
    if request.method != 'POST':
        return "Invalid request type", 400

    image = request.get_data(as_text=True)
    return readImage(image, dummy_response=use_example_responses)

# Handles clicking the "Ask" button
@app.route('/question', methods=['POST'])
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

        conversation = request.get_json()
        # Get the question that the user asked from the HTTP request

        # Generate the prompt based on the course
        instructions = prompt(prompt_type, course, brevity)

        # Ask the question with the context of the selected course
        stream = ask(conversation, instructions, prompt_type, dummy_response=use_example_responses) 

        return Response(stream_with_context(stream), content_type="text/plain")

    # Reject non-POST requests (flask should handle this regardless)
    return "Invalid request type", 400


# Run the server if this file is run
port = 8080
if __name__ == '__main__':
    print("\n\n\n")
    print("=" * 70)
    print(f'{"=    Enter the following url into the browser:":<69}=')
    print(f'{"=    http://127.0.0.1:" + str(port):<69}=')
    print("=" * 70)
    if len(sys.argv) > 1 and sys.argv[1] == "--debug":
        use_example_responses=True
    app.run(port=port, debug=True)

