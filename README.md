# tutoring-ai

## Installation
```git clone https://github.com/peter-fh/tutoring-ai.git
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
Open prompt.txt in any text editor. The content of the file will be sent to OpenAI's GPT-4o API as instructions prior to the question that is asked. Experimentation with changes to prompt.txt and how they affect responses is welcome. The following (optional) placeholder variables will be dynamically replaced before getting sent to the API:

**{$name}**: The current course name (e.g. Differential Calculus)  
**{$concepts}**: The content of the course the student is asking about (e.g. Limits, Derivatives, etc.)  
**{$prerequisite-concepts}**: The content of the prerequisite courses (e.g. Algebra)  
