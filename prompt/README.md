# Prompts

All of the prompts are stored in the <project root>/prompt/prompts/ directory. Functions for interacting and generating prompts are defined in prompt/prompt_manager.py.

## Instructions

When questions about a problem are asked, the instructions defined in problem_prompt.txt are included in the API request. When questions about a concept are asked, the contents of concept_prompt.txt. There is always only one set of instructions set, meaning there is never a case where none or both of these prompts are included.

## Course information

After instructions for a specific type of question is sent, the information for the course the student selected is also included in the API request.

Course information is stored in prompt/prompts/courses.json. When a specific course is chosen, placeholders in course_prompt.txt are replaced with the information from that course defined in this json file. 

Changes for a specific course should be done in prompt/prompts/courses.json. To change the prompt given for all courses, changes should be made in courses_prompt.txt.

The structure of the prompts for course information is subject to change. In the future, course specific prompts may be created, removing the need for courses.json and a general prompt with placeholders. 


