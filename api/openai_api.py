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


def ask(conversation, prompt, prompt_type, dummy_response=False):
    # Retreive the OpenAI API Key
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))



    # Display the query that is about to be sent in the terinabecause something is wrong."l
    '''
    print(f"{'SYSTEM INSTRUCTIONS':^70}")
    print(*wrap(prompt), sep="\n")
    print(f"{'USER QUESTION':^70}")
    print()
    print(*wrap(conversation[-1]["content"][0]["text"]), sep="\n")
    print("\n\n")
    '''
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

        #   # Model of GPT
        model="gpt-4o",
        messages=conversation,
        temperature=temperature,
        stream=True,
    )

    # # Extract the content of the returned message
    for chunk in stream:
        content = chunk.choices[0].delta.content 
        if content is not None:
            yield content

