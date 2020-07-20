import json, apiDecs


def getLst():
    trackLst = []
    checkSum = []
    for i in range(apiDecs.trackList_len):
        trackLst.append(apiDecs.trackList[i]['uri'])
        checkSum.append(apiDecs.trackList[i]['name'])
    print(checkSum)
    return trackLst

uriContainer = getLst()
