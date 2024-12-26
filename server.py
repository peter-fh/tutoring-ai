from flask import Flask, request, render_template, send_from_directory, stream_with_context, Response
from api.openai_api import ask
from prompt.prompt_manager import generatePrompt, PromptType
import json

# TODO: Prevent spamming the ask button to ensure malicious users don't abuse the system

# Initialize the server library
app = Flask(__name__)
@app.route('/favicon.ico')
def favicon():
    return send_from_directory('./images', 'icon.png', mimetype='image/png')

# Handles showing the website's main page
@app.route('/')
def index():
    return render_template("index.html")




# Run the server if this file is run
port = 8070
if __name__ == '__main__':
    print("\n\n\n")
    print("=" * 70)
    print(f'{"=    Enter the following url into the browser:":<69}=')
    print(f'{"=    http://127.0.0.1:" + str(port):<69}=')
    print("=" * 70)
    app.run(port=8070, debug=True)

