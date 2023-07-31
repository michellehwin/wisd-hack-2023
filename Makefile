# must have virtual environment activated and requirements installed
# requirements found in requirements.txt
run:
	python download_aws.py
	python get_pyball.py
	python metadata_to_csv.py
	python generate_plays.py
	flask run
