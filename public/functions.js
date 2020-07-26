function getHashParams() {
	var hashParams = {};
	var e,
		r = /([^&;=]+)=?([^&;]*)/g,
		q = window.location.hash.substring(1);
	while ((e = r.exec(q))) {
		hashParams[e[1]] = decodeURIComponent(e[2]);
	}
	return hashParams;
};


async function userID() {
	var myHeaders = new Headers();
	myHeaders.append("Authorization", "Bearer " + access_token);

	var requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow'
	};

	const response = await fetch("https://api.spotify.com/v1/me", requestOptions);
	const data = await response.json();
	return data.id;
};


async function createPlaylist(id) {
	var myHeaders = new Headers();
	myHeaders.append("Accept", "application/json");
	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("Authorization", "Bearer " + access_token);

	var raw = JSON.stringify({ "name": "Top Tracks", "description": "Powered by Spotter 🎯", "public": false })

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	};

	const response = await fetch(`https://api.spotify.com/v1/users/${id}/playlists`, requestOptions);
	const result = await response.json();
	return result.id;
};



async function fetchTracks() {
	let apiRes = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=50&offset=5', {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + access_token
		}
	});

	let data = await apiRes.json();
	return data;
};

function trackList(tracks, userNum) {
	let trackLst = [];
	for (var i = 0; i < userNum; i++) {
		trackLst.push(tracks['items'][i]['uri']);
	};
	return trackLst;
};


function formStr (uriArr, userNum) {
	let uriStr = "";

	for(var i = 0; i < userNum; i++){
		console.log(uriStr);
		if((userNum - 1) === i){
			uriStr += encodeURIComponent(uriArr[i]);
		} else{
			uriStr += encodeURIComponent(uriArr[i] + ",");
		}
	}
	return uriStr;
};

async function addTracks(trackURIS, playlistURI) {
	var myHeaders = new Headers();
	myHeaders.append("Accept", "application/json");
	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("Authorization", "Bearer " + access_token);

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		redirect: 'follow'
	};

	const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistURI}/tracks?uris=${trackURIS}`, requestOptions);
	return response;
};