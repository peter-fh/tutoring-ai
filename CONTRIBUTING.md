# Contributing

Thank you for considering contributing to this project! Any contribution is welcome. 

Issues with the "help wanted" label are those that would be the most appreciated.

## Getting Started

### Prerequisites

There are a few things that are needed to get started with this project:

- Python: Any version 3.x should work but only 3.12+ have been tested
- Git
- npm (tested with 11.0.0)

### Cloning and setting up the repository

- Clone the repository:

```bash
git clone https://github.com/peter-fh/tutoring-ai.git
```

- Install dependencies and build react project:
```bash
./install.sh
```

## Interacting with ChatGPT (OpenAI API)

### Pull requests

Once a pull request is created, a preview deployment is made after every commit. This will allow you to preview your changes using the same OpenAI API key as the main website.

### Locally (optional)

If you want to interact with the OpenAI API locally, you must obtain an api key from [platform.openai.com/api-keys](https://platform.openai.com/api-keys/) and make a minimum payment of 5 USD. To use this key, rename example.env to .env and replace secret_chatgpt_api_key with your key.

## Developing

### Full stack

If you need to interact with the API, i.e. send and receive example or real messages, the project must be built by running the python server (note that the python virtual environment must be active):

```bash
python server.py
```

Debug mode will send the same example response from ChatGPT every time regardless of the input. Use this if you did not get an OpenAI API key or do not need to interact directly with their API:

```bash
python server.py --debug
```

For any changes made to the UI to be represented in this mode, the react project must be rebuilt:
```bash
cd frontend
npm run build
```

### UI Only

If you are only making changes to the UI, run these commands and keep the terminal window open:

```bash
cd frontend
npm run dev
```

Note that API requests will not work in this mode. 


