import time
from openai import OpenAI
import os
from dotenv import load_dotenv
import textwrap

from prompt.prompt_manager import PromptType

api_dir = "api"
example_response_file = api_dir + os.sep + "example_response.txt"

load_dotenv(override=True)
def wrap(text, indent=0):
    scentences = text.split("\n")
    wrapped_paragraphs = [textwrap.fill(scentence) for scentence in scentences]
    lines = []
    for paragraph in wrapped_paragraphs:
        for line in paragraph.split("\n"):
            lines.append(("    " * indent) + line)

    return lines

def displayConversation(conversation):
    print("\n\n")
    print("Sending the following query to ChatGPT:")
    print("=" * 74)
    for message in conversation:
        print(f'{message["role"]}: ')
        for line in wrap(message["content"][0]["text"], indent=1):
            print(line)
    print("=" * 74)

def introductionGenerator():
    intro_message = "Hello! I'm an AI chatbot powered by Chat-GPT. I use context specific to Concordia to provide better explanations. AI makes mistakes, so please double check any answers you are given."
    split_message = intro_message.split(" ")
    for word in split_message:
        time.sleep(0.03)
        yield word + " "


def readImage(image, dummy_response=False):

    if dummy_response:
        time.sleep(2)
        return "x^2*e^x (example response)"
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    transcription_request = "Please reply with only a transcription of this image."

    # Send the request to OpenAI API
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": transcription_request},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": image,
                        }
                    },
                ],
            }
        ],
        temperature=0,
        max_tokens=300
    )   

    print(response.choices[0].message.content)
    return str(response.choices[0].message.content)


def ask(conversation, prompt, prompt_type, dummy_response=False):
    # Retreive the OpenAI API Key
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    conversation.insert(0, {
        "role": "system",
        "content": [{
            "type": "text",
            "text": prompt
        }
                    ]
    })
    displayConversation(conversation)

    if dummy_response:
        with open(example_response_file) as f:
            for line in f:
                for word in line.split(" "):
                    time.sleep(0.02)
                    yield word + " "
        return


    temperature = 0.7
    if prompt_type == PromptType.PROBLEM:
        temperature = 0

    # Send the request to OpenAI API
    stream = client.chat.completions.create(
        model="gpt-4o",
        messages=conversation,
        temperature=temperature,
        stream=True,
    )

    # Extract the content of the returned message
    for chunk in stream:
        content = chunk.choices[0].delta.content 
        if content is not None:
            yield content



