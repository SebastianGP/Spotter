function script() {

	document.getElementById("create").addEventListener("click", function () {
		// Get UserID > Use UserID for creation of playlist > Get the playlistID > Get top tracks > Compile the top tracks (returned)>
		// > Use playlistID 
		let pID = '';
		userID()
			.then(userID => createPlaylist(userID))
			// ** CREATE FUNCTION TO STORE THIS ID!!!!! **
			.then(function (playlistID) {
				fetchTracks()
					.then(trackArr => addTracks(formStr(trackList(trackArr, 50), 50), playlistID));
			})

	});


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

};


