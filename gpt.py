from openai import OpenAI
import os
import prompts

def ask(question, course, example_response=False):
    if course == "None":
        return "Please select the course you are asking about."

    if example_response:
        with open("example_response.txt") as f:
            return f.read()

    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


    prompt = prompts.getPrompt(course)
    print("Sending the following query:")
    print(prompt)
    print(question)
    completion = client.chat.completions.create(
      model="gpt-4o",
      messages=[
        {
                "role": "system", 
                "content": prompt
            },

        {
                "role": "user", 
                "content": question
            }
      ]
    )

    return str(completion.choices[0].message.content)

if __name__ == "__main__":
    inp = input()
    print(ask(inp, "MATH 203"))
