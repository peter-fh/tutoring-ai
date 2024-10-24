from openai import OpenAI
import os
from dotenv import load_dotenv
import textwrap

load_dotenv()
def wrap(text):
    scentences = text.split("\n")
    wrapped_paragraphs = [textwrap.fill(scentence) for scentence in scentences]
    return wrapped_paragraphs

def ask(question, prompt):
    # Retreive the OpenAI API Key
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


    # Display the query that is about to be sent in the terinal
    print("\n\n")
    print("Sending the following query to ChatGPT:")
    print()
    print(f"{'SYSTEM INSTRUCTIONS':^70}")
    print("=" * 70)
    print(*wrap(prompt), sep="\n")
    print(f"{'USER QUESTION':^70}")
    print("=" * 70)
    print()
    print(*wrap(question), sep="\n")
    print("\n\n")

    # # Send the request to OpenAI API
    # completion = client.chat.completions.create(
    #
    #   # Model of GPT
    #   model="gpt-4o",
    #   messages=[
    #     {
    #             # Give the instructions on how to respond from the role of the AI chatbot's system administrator
    #             "role": "system", 
    #             "content": prompt
    #         },
    #
    #     {
    #             # Give the student question from the role of the AI chatbot's user
    #             "role": "user", 
    #             "content": question
    #         }
    #   ]
    # )
    #
    # # Extract the content of the returned message
    # return str(completion.choices[0].message.content)
    return "hi"

