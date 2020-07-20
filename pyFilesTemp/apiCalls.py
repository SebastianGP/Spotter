import json, requests

token = 'Bearer ' + token

''' * Top Tracks *
------------------------------------------------------------------
'''
headers_tracks = {
    'Authorization': token,
}

response_tracks = requests.get(
    'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=5&offset=5', headers=headers_tracks)

''' 
||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
'''


''' * UserID *
------------------------------------------------------------------
'''
headers_user = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': token,
}

response_user = requests.get('https://api.spotify.com/v1/me', headers=headers_user)
user_str = response_user.text
user_json = json.loads(user_str)
user_id = user_json['id']
''' 
||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
'''