// JavaScript Document

$(document).ready(function() { 
	        
	// hold focus on the text input, unless it's the log in screen.
	if ($("#username").is(":visible")) {
		$("#username").focus();			
	}
	else {
		$("#input").focus();			
	}
	
    // Catches user submitted content from form
    $('#send').on('submit', function(e) { 
       
        e.preventDefault(); 
        var input = $('#input'); 
       
        switch(input.val()) {
            case '': // blank entry
                return false;
            break;

            case 'h': // print help screen - does not require broadcasting
                $("#jetzt").before('<div class="message announce"><p><strong>w</strong> - who - who is here<br><strong>h</strong> - help - show this helpscreen here<br><strong>c</strong> - che cazzo - curse in Italian <br>');
			break;

			case 'w': // print online users
                socket.emit('getUsers');
            break;

            case 'm': // move to another room
                switchRoom('#Kristiine');
            break;
                
            default: // regular text entry - pass this on
                socket.emit('news', { text: input.val(), name: name, time: getTime() });
            break;
        }
 
        input.val(''); // clear the text input. Or should it be - reset form?
        
    });

    // catches responses from server and prints them to user.
    socket.on('news', function (data) { 

        switch(data.message) {
            case 'c':
				$("#jetzt").before('<div class="message center"><div id="time">'+data.time+'</div><p id="name"><strong>'+data. name+'</strong> <img src="images/che.png" /></p></div>');
            break;
                
            default: 
                $("#jetzt").before('<div class="message"><img src="images/drm.jpg" id="avatar" /><div id="time">'+data.time+'</div><p id="name"><strong>'+data.name+'</strong></p><p>'+data.message+'</p></div>');
                document.getElementById('ping1').play();
            break;
        }

        $(window).scrollTop($(document).height()); // autoscroll to bottom of page        

    });


    //$(".allRooms").click(function(){socket.emit('switchRoom', { newroom: event.target.id, time: getTime() })});
    //$(".allRooms").click(function(){console.log("tere");});
    
    
    // catches getUsers response from the server
    socket.on('getUsers', function (data) { 
        var allUsers = []; 
        $.each(data, function(key, value) {
            if(allUsers != 'undefined'){
                allUsers = key + ', ' + allUsers;
            }
        });
        $("#jetzt").before('<div class="message announce"><div id="time">'+getTime()+'</div><p id="name">Online users:</p>'+allUsers+'<p></p></div>');
    });

    
    //Catches info from user login box
    $('#login').on('submit', function(e) { 

        e.preventDefault();         
        var username = $('#username');
		username = username.val();
		name = String(username);
				
		if (username) { 
			$('.message').show();
			$("#input").focus();	
			$('#message1').hide();
		}
        socket.emit('adduser', { username: username, time: getTime() });
    });
    
	// listener, whenever the server emits 'updaterooms', this updates the room the client is in
	socket.on('updaterooms', function(rooms, current_room) {
		$('#rooms').empty();
		$.each(rooms, function(key, value) {
			if(value == current_room){
				$('#rooms').append('<div>' + value + '</div>');
			}
			else {
				//$('#rooms').append('<div><a href="#" class="allRooms" id="'+key+'">' + value + '</a></div>');
                $('#rooms').append('<div><a href="#" class="allRooms" id="'+key+'" onclick="switchRoom(\''+key+'\'); return false;">' + value + '</a></div>');
				//$('#rooms').append('<div><a href="#" onclick="console.log(getTime())">' + value + '</a></div>');
			}
		});
	});

});

function getTime() {
    var d = new Date();
    var n = d.getHours();
    var m = d.getMinutes();
    var time = n+':'+m;
    return time;
}

function switchRoom(room){ 
    //socket.emit('switchRoom', room);
    socket.emit('switchRoom', { newroom: room, time: getTime() });
}
