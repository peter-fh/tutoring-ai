# tutoring-ai

## API key

Each prompt requested from OpenAI costs money. You can expect each testing session, depending on how many questions are asked and how long the responses from GPT are, to cost between 5-25 cents. A minimum pre-payment of $5 is required to start using the API. This unfortunately means that unless funded by the MAT Tutoring center, testing this project requires a $5 payment for each new user.

API keys can be obtained through the [OpenAI API site](platform.openai.com). This project requires your OPENAI_API_KEY environment variable to be set, as explained on the first two paragraphs of the [OpenAI Quickstart Guide](https://platform.openai.com/docs/quickstart).



## Installation

### Prerequisites

- [Python](https://www.python.org/downloads/)

### Installing the project

Install the release zip file from the releases tab on the Github page.

Unzip the file and drag the server folder somewhere on your system. 

Rename example.env to .env and replace the placeholder with your API key.


## Using the site
Double click the run.bat (windows) or run.command (macos) file. The server should now be open and the site can be reached.

Make sure this terminal window stays open or running in the background while using the project. Close the terminal or press Control-C when done. After running this command, enter the following link into your browser:

http://localhost:8070

## Editing the prompt
### Prompt.txt
To edit the prompt, open prompt.txt in any text editor. The content of the file will be sent to OpenAI's GPT-4o API as instructions prior to the question that is asked. Experimentation with changes to prompt.txt and how they affect responses is welcome. A student must select the course they are taking before asking a question. The following (optional) placeholder variables concerning this selected course will be dynamically replaced before getting sent to the API:

**{$name}**: The current course name (e.g. Differential Calculus)  
**{$concepts}**: The content of the course the student is asking about (e.g. Limits, Derivatives, etc.)  
**{$prerequisite-concepts}**: The content of the prerequisite courses (e.g. Algebra)  

## Editing the course info
The contents of courses.json are used to replace the placeholder variables in prompt.txt. To edit these variables, open courses.json and edit the values for each course. The course codes, as well as "name", "content" and "prerequisite" are required for the functionality of the system and are not included in the prompt, however anything else will be sent to GPT-4o and is worth experimenting with to attempt to improve the quality of responses.


