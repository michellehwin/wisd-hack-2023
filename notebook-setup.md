## Setting up virtual environment (venv) to run with jupyter notebooks in VSCode
Note: If you just pip install the packages and don't use venv, it'll work and that's fine. Otherwise, follow these steps:
- create and activate a virtual environment per these instructions https://realpython.com/python-virtual-environments-a-primer/
  - source ./venv/bin/activate
- install the required packages: `python -m pip install -r requirements.txt`
- when you open the jupyter notebook file, there should be an option to select your kernel in the top right. Select the option with (venv) in it.
- you should be able to run jupyter notebooks and regular python files now :)