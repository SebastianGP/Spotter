function main() {
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


	console.log(params.access_token);
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

		// window.addEventListener("load", request(requestOptions, callback()));

		// Refresh timer on token
		document.getElementById("obtain-new-token").addEventListener(
			"click",
			function () {
				$.ajax({
					url: "/refresh_token",
					data: {
						refresh_token: refresh_token,
					},
				}).done(function (data) {
					access_token = data.access_token;
				});
			},
			false
		);


		// * userID still needs to be found via GET call
		document
			.getElementById("create")
			.addEventListener("click", function () {
				fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						Authorization: "Bearer " + access_token,
					},
					body: JSON.stringify({
						name: "Top Tracks",
						description: "Powered by Spotter 🎯",
						public: false,
					}),
				});
			});
	}
};

main();