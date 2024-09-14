# tutoring-ai

## Installation

### Prerequisites

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Python](https://www.python.org/downloads/)

### Installing the project
Open a terminal in the directory you wish to copy the project to, and run the following commands:
``` bash
git clone https://github.com/peter-fh/tutoring-ai.git
cd tutoring-ai
python3 -m venv env
source env/bin/activate
python3 -m pip install --upgrade pip
pip install -r requirements.txt
```

## Using the site
```python3 server.py```  

http://localhost:8070

## Editing the prompt
### Prompt.txt
To edit the prompt, open prompt.txt in any text editor. The content of the file will be sent to OpenAI's GPT-4o API as instructions prior to the question that is asked. Experimentation with changes to prompt.txt and how they affect responses is welcome. A student must select the course they are taking before asking a question. The following (optional) placeholder variables concerning this selected course will be dynamically replaced before getting sent to the API:

**{$name}**: The current course name (e.g. Differential Calculus)  
**{$concepts}**: The content of the course the student is asking about (e.g. Limits, Derivatives, etc.)  
**{$prerequisite-concepts}**: The content of the prerequisite courses (e.g. Algebra)  

## Editing the course info
The contents of courses.json are used to replace the placeholder variables in prompt.txt. To edit these variables, open courses.json and edit the values for each course. The course codes, as well as "name", "content" and "prerequisite" are required for the functionality of the system and are not included in the prompt, however anything else will be sent to GPT-4o and is worth experimenting with to attempt to improve the quality of responses.


