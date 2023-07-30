from flask import Flask, request
import pandas as pd
import json

app = Flask(__name__)

# to run:
# create venv if you havent already
# source ./venv/bin/activate (activate venv)
# pip install -r requirements.txt
# flask run

@app.route("/coords")
def hello_world():
    game_id = request.args.get('game_id')

    # play_rank can be 1-10, 1 being best play
    play_rank = request.args.get('play_rank')

    if (game_id is None and play_rank is None):
        return "Please supply game_id and play_rank"
    
    coord_file = open(f"./play_coords/{game_id}_coords_by_player.json")
    coord_json = json.load(coord_file)
    return coord_json[str(play_rank)]
