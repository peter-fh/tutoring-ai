import json
import os

prompt_dir = "prompt/dynamic"
example_response_file = prompt_dir + os.sep + "example_response.txt"
prompt_text_file = prompt_dir + os.sep + "prompt.txt"
course_json_file = prompt_dir + os.sep + "courses.json"

def generatePrompt(course_code: str, example_response=False):
    # Ensure that the student selected the course they are taking
    if course_code == "None":
        return "Please select the course you are asking about."

    # [Debug] Example response used for testing the website
    if example_response:
        with open(example_response_file) as f:
            return f.read()

    # Open the coures json file and extract the course specific information
    course_file = open(course_json_file)
    courses = json.load(course_file)
    course = courses[course_code]

    # Open and read the prompt txt file
    prompt = open(prompt_text_file).read()

    # Replace the placeholder variables with the course information
    return_prompt = (prompt
        .replace("{$name}", course["name"])
        .replace("{$concepts}", course["content"])
        .replace("{$prerequisite-concepts}", course["prerequisite"]))

    # Return the final constructed prompt

    return return_prompt

def getPrompt(course_code: str):
    # Open the coures json file and extract the course specific information
    course_file = open("courses.json")
    courses = json.load(course_file)
    course = courses[course_code]

    # Open and read the prompt txt file
    prompt = open("prompt.txt").read()

    # Replace the placeholder variables with the course information
    return_prompt = (prompt
        .replace("{$name}", course["name"])
        .replace("{$concepts}", course["content"])
        .replace("{$prerequisite-concepts}", course["prerequisite"]))

    # Return the final constructed prompt
    return return_prompt

# [Debug] Get example prompt and display it on the terminal
if __name__ == "__main__":
    print(getPrompt("MATH 209"))
