import json



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
