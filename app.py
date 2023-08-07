from flask import Flask, request
from flask_cors import CORS
import pandas as pd

import json

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# to run:
# create venv if you havent already
# source ./venv/bin/activate (activate venv)
# pip install -r requirements.txt
# flask run

@app.route("/coords")
def get_player_coords():
    game_id = request.args.get('game_id')

    # play_rank can be 1-10, 1 being best play
    play_rank = request.args.get('play_rank')

    if (game_id is None and play_rank is None):
        return "Please supply game_id and play_rank"

    coord_file = open(f"./play_coords/{game_id}_coords_by_player.json")
    coord_json = json.load(coord_file)
    return coord_json[str(play_rank)]


game_info_df = pd.read_csv("games_with_team_names.csv")


@app.route("/game")
def get_game_info():
    game_id = request.args.get('game_id')
    if (game_id is None):
        return "Please supply game_id"

    game_info_row = game_info_df[game_info_df['nbaId'] == int(game_id)].iloc[0]
    return game_info_row.to_json()
