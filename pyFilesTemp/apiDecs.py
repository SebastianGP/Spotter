import json, apiCalls

''' * UserID *
------------------------------------------------------------------
'''
#GETs JSON file
user_str = apiCalls.response_user.text
#Loads file as Python Dictionary instead of JSON
user_json = json.loads(user_str)
#Grabs userID
user_id = user_json['id']
''' 
------------------------------------------------------------------
'''


''' * Top Tracks *
------------------------------------------------------------------
'''
# GETs JSON file
tracks_str = apiCalls.response_tracks.text
#Loads file as Python Dictionary instead of JSON
tracks_json = json.loads(tracks_str)
#Get API data: tracks_json[key][index][key]
trackList = tracks_json['items']
trackList_len = len(trackList)
''' 
------------------------------------------------------------------
'''

