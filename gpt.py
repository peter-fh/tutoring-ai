from openai import OpenAI
import os
import prompts

def ask(question, course, example_response=False):

    # Ensure that the student selected the course they are taking
    if course == "None":
        return "Please select the course you are asking about."

    # [Debug] Example response used for testing the website
    if example_response:
        with open("example_response.txt") as f:
            return f.read()

    # Retreive the OpenAI API Key
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


    # Get the prompt for a specific course
    prompt = prompts.getPrompt(course)

    # Display the query that is about to be sent in the terinal
    print("Sending the following query:")
    print(prompt)
    print(question)

    # Send the request to OpenAI API
    completion = client.chat.completions.create(

      # Model of GPT
      model="gpt-4o",
      messages=[
        {
                # Give the instructions on how to respond from the role of the AI chatbot's system administrator
                "role": "system", 
                "content": prompt
            },

        {
                # Give the student question from the role of the AI chatbot's user
                "role": "user", 
                "content": question
            }
      ]
    )

    # Extract the content of the returned message
    return str(completion.choices[0].message.content)


# [Debug] Test an example prompt from the terminal
if __name__ == "__main__":
    inp = input()
    print(ask(inp, "MATH 203"))
