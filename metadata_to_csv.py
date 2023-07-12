import json
import pandas as pd

"""Generate a CSV file with games metadata and team"""

games_file = open('metadata/games.json')
games_json = json.load(games_file)
data=[]

for game in games_json['games']:
    data.append(game)

games_df=pd.DataFrame(data)
games_file.close()

teams_file = open('metadata/teams.json')
teams_json = json.load(teams_file)
data=[]
for game in teams_json['teams']:
    data.append(game)

teams_df=pd.DataFrame(data)
teams_file.close()

games_df.merge(teams_df, left_on='homeTeamId', right_on='id')
games_df.to_csv('games_w_teams.csv')