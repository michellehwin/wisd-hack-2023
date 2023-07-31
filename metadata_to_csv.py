# %%
import json
import pandas as pd

# %%
games_file = open('./metadata/games.json')

games_json = json.load(games_file)
data = []

for game in games_json['games']:
    data.append(game)

# create df from games metadata
games_df = pd.DataFrame(data)

games_file.close()

teams_file = open('metadata/teams.json')
teams_json = json.load(teams_file)
data = []
for game in teams_json['teams']:
    data.append(game)

# create df from teams metadata
teams_df = pd.DataFrame(data)

teams_file.close()


# %%
games_df = games_df.merge(
    teams_df, left_on='homeTeamId', right_on='id', how='left')
games_df.drop(columns=['id_y', 'abbrev', 'nbaId_y'], inplace=True)
games_df.rename(columns={'id_x': 'id', 'nbaId_x': 'nbaId',
                "name": "homeTeamName"}, inplace=True)
games_df.head()


# %%
games_df = games_df.merge(
    teams_df, left_on='awayTeamId', right_on='id', how='left')
games_df.drop(columns=['id_y', 'abbrev', 'nbaId_y'], inplace=True)
games_df.rename(columns={'id_x': 'id', 'nbaId_x': 'nbaId',
                "name": "awayTeamName"}, inplace=True)
games_df.head()


# %%
def get_final_score(row):
    game_nba_id = row['nbaId']
    try:
        events_tracking_df = pd.read_csv(
            f"./games/{game_nba_id}/{game_nba_id}_e_t.csv")
        final_score = events_tracking_df['SCORE'].last_valid_index()
        final_score = events_tracking_df.at[final_score, "SCORE"]
        row['final_score'] = final_score
    except Exception as e:
        pass
    return row


games_df = games_df.apply(get_final_score, axis=1)


# %%
games_df.to_csv('games_with_team_names.csv')
