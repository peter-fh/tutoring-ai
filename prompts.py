import json

course_file = open("courses.json")
courses = json.load(course_file)
prompt = open("prompt.txt").read()


def getPrompt(course_code: str):
    course = courses[course_code]
    return_prompt = (prompt
        .replace("{$name}", course["name"])
        .replace("{$concepts}", course["content"])
        .replace("{$prerequisite-concepts}", course["prerequisite"]))

    return return_prompt

if __name__ == "__main__":
    print(getPrompt("MATH 209"))
