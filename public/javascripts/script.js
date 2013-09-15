// JavaScript Document

$(document).ready(function() { 
	    
    function getTime() {
        var d = new Date();
        var n = d.getHours();
        var m = d.getMinutes();
        var time = n+':'+m;
        return time;
    }
    	
	// hold focus on the text input, unless it's the log in screen.
	if ($("#username").is(":visible")) {
		$("#username").focus();			
	}
	else {
		$("#input").focus();			
	}
	
	// special stuff for log in screen.
/*	$('#login').ajaxForm(function() { 
		var username = $('#username');
		username = username.val();
		name = String(username);
				
		if (username) { 
			$('.message').show();
			$("#input").focus();	
			$('#message1').hide();
		}
	}); */

    // Catches user submitted content from form
    $('#send').on('submit', function(e) { 
       
        e.preventDefault(); 
        var input = $('#input'); 
       
        switch(input.val()) {
            case '': // blank entry
                return false;
            break;

            case 'h': // print help screen - does not require broadcasting
                $("#jetzt").before('<div class="message announce"><p><!--<strong>w</strong> - who - who is here<br>--><strong>h</strong> - help - show this helpscreen here<br><strong>c</strong> - che cazzo - curse in Italian <br>');
			break;
                
            default: // regular text entry - pass this on
                socket.emit('news', { text: input.val(), name: name, time: getTime() });
                //console.log(input.val());
            break;
        }
 
        input.val(''); // clear the text input. Or should it be - reset form?
        //$(window).scrollTop($(document).height()); // autoscroll to bottom of page        
        
    });

    // catches responses from server and prints them to user.
    socket.on('news', function (data) { 

        switch(data.message) {
            case 'c':
				$("#jetzt").before('<div class="message center"><div id="time">'+data.time+'</div><p id="name">'+data. name+' <img src="images/che.png" /></p></div>');
            break;
                
            default: 
                $("#jetzt").before('<div class="message"><img src="images/drm.jpg" id="avatar" /><div id="time">'+data.time+'</div><p id="name">'+data.name+'</p><p>'+data.message+' <!--<a href="#" class="tag">#Trappeto</a></p></div>-->');
            break;
        }

        $(window).scrollTop($(document).height()); // autoscroll to bottom of page        

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

        //socket.emit('adduser', username);
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
				$('#rooms').append('<div><a href="#" onclick="switchRoom(\''+value+'\')">' + value + '</a></div>');
			}
		});
	});

});
