import json
import os
from enum import Enum

class PromptType(Enum):
    PROBLEM = 1
    CONCEPT = 2


prompt_dir = "prompt" + os.sep + "prompts"
course_json_file = prompt_dir + os.sep + "courses.json"
course_prompt_file = prompt_dir + os.sep + "course_prompt.txt"
concept_prompt_file = prompt_dir + os.sep + "concept_prompt.txt"
problem_prompt_file = prompt_dir + os.sep + "problem_prompt.txt"

def generateCoursePrompt(course_code: str):
    # Open the coures json file and extract the course specific information
    course_file = open(course_json_file)
    courses = json.load(course_file)
    course = courses[course_code]

    # Open and read the prompt txt file
    prompt = open(course_prompt_file).read()

    # Replace the placeholder variables with the course information
    return_prompt = (prompt
        .replace("{$name}", course["name"])
        .replace("{$concepts}", course["content"])
        .replace("{$prerequisite-concepts}", course["prerequisite"])
        .replace("{$notes}", "\n- ".join(course["notes"])))

    # Return the final constructed prompt

    return return_prompt

def generateConceptPrompt(brevity: str):
    prompt = open(concept_prompt_file).read()

    return_prompt = (prompt
        .replace("{$brevity}", brevity))

    return return_prompt

def generateProblemPrompt(brevity: str):
    prompt = open(problem_prompt_file).read()

    return_prompt = (prompt
        .replace("{$brevity}", brevity))

    return return_prompt


def generatePrompt(prompt_type: PromptType, course_code: str, brevity: str):
    if prompt_type == PromptType.PROBLEM:
        return generateCoursePrompt(course_code), generateProblemPrompt(brevity)
    elif prompt_type == PromptType.CONCEPT:
        return generateCoursePrompt(course_code), generateConceptPrompt(brevity)



# [Debug] Get example prompt and display it on the terminal
if __name__ == "__main__":
    print(generateCoursePrompt("MATH 203"))
