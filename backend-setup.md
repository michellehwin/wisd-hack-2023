# Backend Setup
## Setting up virtual environment (venv)
This venv setup is written for mac, but the process is very similar on Windows. If you just pip install the packages and don't use venv, it'll work and that's fine. Otherwise, follow these steps:
- create and activate a virtual environment per these instructions https://realpython.com/python-virtual-environments-a-primer/
  - create: `python3 -m venv venv`
  - activate: `source ./venv/bin/activate`
- install the required packages: `python -m pip install -r requirements.txt`
- when you open jupyter notebooks, there should be an option to select your kernel in the top right. Select the option with (venv) in it.
- you should be able to run jupyter notebooks and regular python files now :)

## Downloading/generating necessary files
- export AWS keys
```
export AWS_ACCESS_KEY_ID=KEY
export AWS_SECRET_ACCESS_KEY=KEY
```
## Running the server
To spin up the server locally, run `make run`. This will generate all necessary backend files that we use. This will also start the backend flask server. You only need to run `make run` once. After, you can just run `flask run`.