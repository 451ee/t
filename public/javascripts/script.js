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
				$("#jetzt").before('<div class="message center"><div id="time">'+data.time+'</div><p id="name"><strong>'+data.name+'</strong> <img src="images/che.png" /></p></div>');
            break;

            case 'mybody':
				$("#jetzt").before('<div class="message"><div id="time">'+data.time+'</div><p id="name"><strong>'+data.name+'</strong></p> <img src="images/mybody.gif" class="full" /></p></div>');
            break;
                
            case 'mybody2':
				$("#jetzt").before('<div class="message"><div id="time">'+data.time+'</div><p id="name"><strong>'+data.name+'</strong></p> <img src="images/mybody2.gif" class="full" /></p></div>');
            break;

            case 'lol':
				$("#jetzt").before('<div class="message"><div id="time">'+data.time+'</div><p id="name"><strong>'+data.name+'</strong></p> <img src="images/lol.gif" class="full" /></p></div>');
            break;

            case 'dance':
				$("#jetzt").before('<div class="message center"><div id="time">'+data.time+'</div><p id="name"><strong>'+data.name+'</strong></p> <img src="images/dance.gif" /></p></div>');
            break;
                
            case 'y':
                $("#jetzt").before('<div class="message"><img src="images/drm.jpg" id="avatar" /><div id="time">'+data.time+'</div><p id="name"><strong>'+data.name+'</strong></p><p><img class="full" src="images/yes.jpg" /></p></div>');
            break;

            default: 
                var message = data.message;
                
                var findMeme = /^m /;
                if(findMeme.test(message) || message === "m") { // it's a meme 
                    memeIt(message, data);
                }
                else {
                    message = imageToPrint(message);
                    $("#jetzt").before('<div class="message"><img src="images/drm.jpg" id="avatar" /><div id="time">'+data.time+'</div><p id="name"><strong>'+data.name+'</strong></p><p>'+message+'</p></div>');
                    document.getElementById('ping1').play();
                }
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
    
    
    //Memeing goes here
    function memeIt(message, data) {
        
        /*
        m
        m fwp
        m fuckme
        m fwp Teretere
        m fwp teretere / teretere
        */
        
        if(message === "m") {
            $("#jetzt").before('<div class="message"><img src="images/drm.jpg" id="avatar" /><div id="time">'+data.time+'</div><p id="name"><strong>Server</strong></p><p>Meme it, bitch!<br><strong>usage: <br /></strong>m fwp text to top / text to bottom<br><br><strong>Available memes:</strong><br /><strong>m fwp</strong> - First World Problem<br><strong>m fuckme</strong> - Fuck me, right?</p></div>');        
        }  else {
            
            message = message.slice(2); // remove "m " from beginning
            if(message.indexOf(" ") != -1) var memeName = message.slice(0, message.indexOf(" ")); // get the meme name (if the text fields are not empty)
            
            message = message.slice(message.indexOf(" ")+1); // remove the meme name
            cl(memeName);
            if(memeName === undefined) var memeName = message; // that's in case "m fwp", but messes up "m fwp tere".
            console.log(message+" //// " + memeName);
                                        
            var split = message.indexOf("/"); // find the position of "/" mark
            
            //var message1 = '';
            //var message2 = '';
                                            

            if (split === -1) { // not a 2 lined meme
                if(message === memeName) { // not even a 1 lined meme
                    var message1 = '';
                    var message2 = ''; 
                } else {
                    var message1 = message.trim(); // it's a 1 lined meme
                    var message2 = '';    
                    
                }
            } else { // 2 lined meme
                var message1 = message.slice(0, split).trim();
                var message2 = message.slice(split+1).trim();
            
            }

            /*
            var message1 = message.slice(0, split);
            var message2 = '';
            message1 = message1.trim();
            if (split !== -1) {
                message2 = message.slice(split+1);
                message2 = message2.trim();
            }
            */
            //console.log(message1+" //// " + message2);

            
            switch (memeName) {
            
                case 'fwp':
                    
                    
                    
                break;
            
            
            
            
            
            }
        }

        
        
        
        //message = message.slice(2);
        /*
        var split = message.indexOf("/"); //console.log(split);        
        
        var message1 = message.slice(0, split);
        var message2 = '';
        message1 = message1.trim();
        if (split !== -1) {
           message2 = message.slice(split+1);
            message2 = message2.trim();
        }
        */
        var printMemeDiv = "<div class='message'><p><canvas id='meme' class='full'></canvas></p></div>"
        $("#jetzt").before(printMemeDiv);        
        
        var canvas = document.getElementById('meme');
        var context = canvas.getContext('2d');
        
        canvas.width  = 510;
        canvas.height = 338;
        
        var imageObj = new Image();
        
        imageObj.onload = function() {
            context.drawImage(imageObj, 0, 0, 510, 338);
            drawText(message1, message2);
            var img    = canvas.toDataURL("image/png");
            //document.write('<img src="'+img+'"/>');
            $("#jetzt").before('<div class="message"><img src="images/drm.jpg" id="avatar" /><div id="time">'+data.time+'</div><p id="name"><strong>'+data.name+'</strong></p><p><img class="full" src="'+img+'" /></p></div>');
        };
        imageObj.src = 'images/meme/1stwp.jpg';
        
        function drawText( text ){
            context.font = '40px Impact';
            context.textAlign = 'center';
            context.fillStyle = 'rgba(255, 255, 255, 1)';
            context.lineWidth = 2;
            context.strokeStyle = '#000000';
            //context.fillText(text, canvas.width/2, canvas.height/2);    
            context.fillText(message1, canvas.width/2, 50);            
            context.strokeText(message1, canvas.width/2, 50);            
            context.fillText(message2, canvas.width/2, 315);            
            context.strokeText(message2, canvas.width/2, 315);            
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

function cl(data) {
    console.log(data);
}
