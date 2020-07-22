function getHashParams() {
	var hashParams = {};
	var e,
		r = /([^&;=]+)=?([^&;]*)/g,
		q = window.location.hash.substring(1);
	while ((e = r.exec(q))) {
		hashParams[e[1]] = decodeURIComponent(e[2]);
	}
	return hashParams;
}

var params = getHashParams();

var access_token = params.access_token,
	refresh_token = params.refresh_token,
	error = params.error;

function userID() {
	var myHeaders = new Headers();
	myHeaders.append("Authorization", "Bearer " + access_token);

	var requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow'
	};

	return (fetch("https://api.spotify.com/v1/me", requestOptions)
		.then(response => response.json())
		.then(result => result.id));
};



function createPlaylist(id) {
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


	return fetch(`https://api.spotify.com/v1/users/${id}/playlists`, requestOptions)
		.then(response => response.json())
		.then(result => result.id);
}


function main() {
	// * No authorization
	if (error) {
		alert("There was an error during the authentication");
	}
	// * Authorized
	else {
		if (access_token) {
			$.ajax({
				url: "https://api.spotify.com/v1/me",
				headers: {
					Authorization: "Bearer " + access_token,
				},
				// Show past initial login screen
				success: function () {
					$("#login").hide();
					$("#loggedin").show();
				},
			});
		} else {
			// render initial login screen
			$("#login").show();
			$("#loggedin").hide();
		}
		document.getElementById("create").addEventListener("click", function () {
			userID()
				.then(userID => createPlaylist(userID))
				.then(playlistID => console.log(playlistID));

		});

		// // Refresh timer on token
		// document.getElementById("obtain-new-token").addEventListener(
		// 	"click",
		// 	function () {
		// 		$.ajax({
		// 			url: "/refresh_token",
		// 			data: {
		// 				refresh_token: refresh_token,
		// 			},
		// 		}).done(function (data) {
		// 			access_token = data.access_token;
		// 		});
		// 	},
		// 	false
		// );


	}
};

main();