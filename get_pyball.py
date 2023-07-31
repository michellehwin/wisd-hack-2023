# ids of games in games/ folder
from py_ball import playbyplay
import pandas as pd
from pathlib import Path
import json
game_ids = ['0042100301', '0042100304', '0042100307', '0042100313', '0042100401', '0042100404', '0042100302', '0042100305', '0042100311',
            '0042100314', '0042100402', '0042100405', '0042100303', '0042100306', '0042100312', '0042100315', '0042100403', '0042100406']


#### Pull PBP ####
# Header information to pass along to the stats.nba.com API to make it play nicely
HEADERS = {'Connection': 'keep-alive',
           'Host': 'stats.nba.com',
           'Origin': 'http://stats.nba.com',
           'Upgrade-Insecure-Requests': '1',
           'Referer': 'stats.nba.com',
           'x-nba-stats-origin': 'stats',
           'x-nba-stats-token': 'true',
           'Accept-Language': 'en-US,en;q=0.9',
           "X-NewRelic-ID": "VQECWF5UChAHUlNTBwgBVw==",
           'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6)' +
                         ' AppleWebKit/537.36 (KHTML, like Gecko)' +
                         ' Chrome/81.0.4044.129 Safari/537.36'}

for game_id in game_ids:
    final_file = f'./games/{game_id}/{game_id}_pyball.csv'
    if Path(final_file).is_file:
        continue
    plays = playbyplay.PlayByPlay(headers=HEADERS,
                                  endpoint='playbyplayv2',
                                  game_id=game_id)

    play_df = pd.DataFrame(plays.data['PlayByPlay'])

    #### Load in event data ####
    # Assuming the event files are stored in a "tracking_data" subdirectory
    file_path = f"./games/{game_id}/{game_id}_events.jsonl"

    # Open .jsonl
    with open(file_path, 'r') as f:
        json_list = list(f)

    # Unpack .jsonl file
    event_list = []
    for json_str in json_list:
        result = json.loads(json_str)
        event_list.append(result)

    # Create an event DataFrame
    event_df = pd.DataFrame(event_list)

    # Join events to play-by-play
    # Some events occur in between discrete play-by-play, so we'll do a left join here
    joint_df = event_df.merge(play_df, left_on="pbpId",
                              right_on="EVENTNUM", how="left")
    joint_df.to_csv(final_file)
