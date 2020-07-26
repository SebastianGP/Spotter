var params = getHashParams();

var access_token = params.access_token,
	refresh_token = params.refresh_token,
	error = params.error;

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

		script();
	}
};

main();