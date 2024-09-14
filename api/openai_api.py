from openai import OpenAI
import os

def ask(question, prompt):
    # Retreive the OpenAI API Key
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


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

