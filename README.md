# Frontend Setup
To run the frontend, you must either have the VSCode Live Server extension installed or the NPM CLI tool installed.
- cd into /frontend folder
- run `index.html` through VSCode's Live Server extension or by running `npx live-server --cors` in the terminal.
- Either the extension or npx should automatically open the page in your browser. If it does not open, copy the link in the console into a browser. The link should look like `http://127.0.0.1:8080`

# Backend Setup
The backend for this project is on the backend branch. Switch to that branch before doing anything.
## Setting up virtual environment (venv)
This venv setup is written for mac, but the process is very similar on Windows. If you just pip install the packages and don't use venv, it'll work and that's fine. Otherwise, follow these steps:
- create and activate a virtual environment per these instructions https://realpython.com/python-virtual-environments-a-primer/
  - create: `python3 -m venv venv`
  - activate: `source ./venv/bin/activate`
- install the required packages: `python -m pip install -r requirements.txt`
- When you open jupyter notebooks, there should be an option to select your kernel in the top right. Select the option with (venv) in it. This is not needed to run the flask server.
- you should be able to run jupyter notebooks and regular python files now :)

## Running the server
- export AWS keys
```
export AWS_ACCESS_KEY_ID=KEY
export AWS_SECRET_ACCESS_KEY=KEY
```

To spin up the server locally, run `make run`. This will generate all necessary backend files that we use. This will also start the backend flask server. You only need to run `make run` once. After, you can just run `flask run`.