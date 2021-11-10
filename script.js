        var api = '907903928f935c20ac8686766c2839ff'; // API key for last.fm
        var username = 'mr_mop'; // last.fm username
        var time = 2; // in seconds

        // First, we set variables for the 'current' and 'previous' tracks
        var previous = null;
        var current = null;

        // Next, we call the last.fm API and pull a JSON response with our latest 1 track 
        setInterval(function() {
            $.getJSON('https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=' + username + '&api_key=' + api + '&format=json&limit=1', function(json) {

                // We need to isolate the track from the response for ease of use
                track = json.recenttracks.track[0];

                // Converting the 'current' track to a string allows us to use it as a comparative value
                current = JSON.stringify(json);            

                // IF the 'previous' track and the 'current' track are different, let's change our data (Album Cover, Name, and Artist)
                if (previous && current && previous !== current) {

                    $('#album').html('<img src="' + track.image[2]['#text'] + '" />');
                    $('#track').html('<h2>' + track.name + '</h2>');
                    $('#artist').html('<h4>' + track.artist['#text'] + '</h4>');
                }
                // This allows us to check the values upon subsequent track changes.
                previous = current;
            });                       
        }, time * 1000);   
