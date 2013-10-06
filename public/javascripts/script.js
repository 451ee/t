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
                $("#jetzt").before('<div class="message announce"><p><strong>w</strong> - who - who is here<br><strong>h</strong> - help - show this helpscreen here<br><strong>c</strong> - che cazzo - curse in Italian <br><strong>y</strong> - yes - success baby <br>');
			break;

			case 'w': // print online users
                socket.emit('getUsers');
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

            case 'mybody':
				$("#jetzt").before('<div class="message"><div id="time">'+data.time+'</div><p id="name"><strong>'+data. name+'</strong></p> <img src="images/mybody.gif" class="full" /></p></div>');
            break;
                
            case 'mybody2':
				$("#jetzt").before('<div class="message"><div id="time">'+data.time+'</div><p id="name"><strong>'+data. name+'</strong></p> <img src="images/mybody2.gif" class="full" /></p></div>');
            break;

            case 'lol':
				$("#jetzt").before('<div class="message"><div id="time">'+data.time+'</div><p id="name"><strong>'+data. name+'</strong></p> <img src="images/lol.gif" class="full" /></p></div>');
            break;
                
            case 'dance':
				$("#jetzt").before('<div class="message center"><div id="time">'+data.time+'</div><p id="name"><strong>'+data. name+'</strong></p> <img src="images/dance.gif" /></p></div>');
            break;
                
            case 'y':
                $("#jetzt").before('<div class="message"><img src="images/drm.jpg" id="avatar" /><div id="time">'+data.time+'</div><p id="name"><strong>'+data.name+'</strong></p><p><img class="full" src="images/yes.jpg" /></p></div>');
            break;

            default: 
                var message = data.message;
                //message = urlsToLinks(message);
                message = imageToPrint(message);
                $("#jetzt").before('<div class="message"><img src="images/drm.jpg" id="avatar" /><div id="time">'+data.time+'</div><p id="name"><strong>'+data.name+'</strong></p><p>'+message+'</p></div>');
                document.getElementById('ping1').play();
            break;
        }

        $(window).scrollTop($(document).height()); // autoscroll to bottom of page     

    });
    
    // catches getUsers response from the server
    socket.on('getUsers', function (data) { 
        var allUsers = []; 
        $.each(data, function(key, value) {
            if(allUsers != 'undefined'){
                allUsers = key + ', ' + allUsers;
            }
        });
        $("#jetzt").before('<div class="message announce"><div id="time">'+getTime()+'</div><p id="name"><strong>Online users:</strong></p>'+allUsers+'<p></p></div>');
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

    // automagic link creation from URLs 
    function urlsToLinks(text) {
        var exp = /(\b(https?|ftp|file|http):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;        
        return text.replace(exp,"<a href='$1' target='_blank'>$1</a>"); 
    }

    // automagic image creation from URLs
    function imageToPrint(text) {
        var exp = /(\b(https?|ftp|file|http):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]+(\.jpg|\.jpeg|\.png|\.gif|\.bmp))/ig;
        var match =  text.match(exp);
        if(match !== null){ // is image
            return text.replace(exp,"<a href='$1' target='_blank'><img class='full' src='$1' /></a>"); 
        } 
        else { // is some other kind of link
            return urlsToLinks(text);
        }
    }
        
});

function getTime() {
    var d = new Date();
    var n = d.getHours();
    var m = (d.getMinutes()<10?'0':'') + d.getMinutes();
    var time = n+':'+m;
    return time;
}

