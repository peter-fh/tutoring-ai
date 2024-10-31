from openai import OpenAI
import os
from dotenv import load_dotenv
import textwrap

prompt_dir = "prompt"
example_response_file = prompt_dir + os.sep + "example_response.txt"

load_dotenv()
def wrap(text):
    scentences = text.split("\n")
    wrapped_paragraphs = [textwrap.fill(scentence) for scentence in scentences]
    return wrapped_paragraphs

def ask(conversation, prompt, dummy_response=False):
    # Retreive the OpenAI API Key
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


    if dummy_response:
        with open(example_response_file) as f:
            return f.read()

    # Display the query that is about to be sent in the terinabecause something is wrong."l
    print("\n\n")
    print("Sending the following query to ChatGPT:")
    print()
    print(f"{'SYSTEM INSTRUCTIONS':^70}")
    print("=" * 70)
    print(*wrap(prompt), sep="\n")
    print(f"{'USER QUESTION':^70}")
    print("=" * 70)
    print()
    print(*wrap(conversation[-1]["content"][0]["text"]), sep="\n")
    print("\n\n")
    print(conversation)
    conversation.insert(0, {
        "role": "system",
        "content": [{
            "type": "text",
            "text": prompt
        }
                    ]
    })
    print(conversation)

    # Send the request to OpenAI API
    completion = client.chat.completions.create(

        #   # Model of GPT
        model="gpt-4o",
        messages=conversation
    )

    # # Extract the content of the returned message
    return str(completion.choices[0].message.content)
    #return "hi"

