import json
import os
from enum import Enum

class PromptType(Enum):
    PROBLEM = 1
    CONCEPT = 2


prompt_dir = "prompt"
course_prompt_dir = prompt_dir + os.sep + "course"
instructions_dir = prompt_dir + os.sep + "instructions"
concept_prompt_file = instructions_dir + os.sep + "concept_prompt.md"
problem_prompt_file = instructions_dir + os.sep + "problem_prompt.md"

def generateCoursePrompt(course_code: str):
    # Open the coures json file and extract the course specific information
    course_filename = course_prompt_dir + os.sep + course_code.replace(" ", "_") + ".md"
    course_file = open(course_filename)

    # Open and read the prompt txt file
    prompt = course_file.read()

    return prompt 

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
