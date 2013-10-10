// JavaScript Document

//console.log("script" + window.memes);


$(document).ready(function() { 
    
    function scroll() { $(window).scrollTop($(document).height()); } // autoscroll to bottom of page }     

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
        
        // this here is way to long - anyway it looks for errors in meme input
        var justInput = input.val();
        var findMeme = /^m /;
        if(findMeme.test(input.val())) { // it's a meme
            processMessage = getMemeName(input.val());
            var memeName = processMessage['memeName'];
            var localMemes = new Array();
            var i = 0;
            $.each(window.memes, function(key, value) {
                localMemes[i] = value.name;
                i++;
            });
            var memeIndex = $.inArray(memeName, localMemes);
            if (memeIndex === -1) { 
                justInput = "memeError";
            }
        }


        switch(justInput) {
            case '': // blank entry
                return false;
            break;

            case 'h': // print help screen - does not require broadcasting
                $("#jetzt").before('<div class="message announce"><p><strong>w</strong> - who - who is here<br><strong>h</strong> - help - show this helpscreen here<br><strong>c</strong> - che cazzo - curse in Italian <!--<br><strong>y</strong> - yes - success baby --><br><strong>m</strong> - meme - create a meme <br>');
			break;
                
            case 'm': // print help screen for memeing       
            $("#jetzt").before('<div class="message announce"><img src="images/drm.jpg" id="avatar" /><p id="name"><strong>Server</strong></p><p>Meme it, bitch!<br><strong>usage: <br /></strong>m fwp<br>m fwp text to top / text to bottom<br>m fwp text to top<br>m fwp / text to bottom<br><br><strong>Available memes:</strong><br /><strong>m fwp</strong> - First World Problem<br><strong>m bru</strong> - bottom text: "IMPOSSIBRU!!"<br /><strong>m baby</strong> - SuccessBaby<br /><strong>m yuno</strong> - Y U No?<br /><strong>m goodguy</strong> - Good Guy Greg<br /><strong>m man</strong> - Most interesting guy on earth<br /><strong>m simply</strong> - top text: "One does not simply"<br /><strong>m whatif</strong> - top text: "What if I told you?"<br /><strong>m scumb</strong> - Scumbag Steve<br /><strong>m scumg</strong> - Scumbag Stacy<br /><strong>m gf</strong> - Overly attached girlfriend<br /><strong>m fuckme</strong> - bottom text: "Fuck me, right?" <br /><strong>m nobody</strong> - Bottom text: "Ain&quot;t nobody got time for that"<br /><strong>m fa</strong> - Forever alone <br /></p></div>');        
            break;
                
			case 'w': // print online users
                socket.emit('getUsers');
            break;

            case 'memeError': // print online users
                $("#jetzt").before('<div class="message"><img src="images/drm.jpg" id="avatar" /><div id="time"></div><p id="name"><strong>Error</strong></p><p>"'+input.val()+'" - no such meme here :(</p></div>');
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

            case 'selffive':
				$("#jetzt").before('<div class="message center"><div id="time">'+data.time+'</div><p id="name"><strong>'+data.name+'</strong></p> <img class="full" src="images/selffive.gif" /></p></div>');
            break;

            case 'i':
				$("#jetzt").before('<div class="message center"><div id="time">'+data.time+'</div><p id="name"><strong>'+data.name+'</strong></p> <img src="images/idea.jpeg" /></p></div>');
            break;

            case '8':
				$("#jetzt").before('<div class="message center"><div id="time">'+data.time+'</div><p id="name"><strong>'+data.name+'</strong></p> <img src="images/note.gif" id="bubu" /></p></div>');
            break;
                
            case 'y':
                $("#jetzt").before('<div class="message"><img src="images/drm.jpg" id="avatar" /><div id="time">'+data.time+'</div><p id="name"><strong>'+data.name+'</strong></p><p><img class="full" src="images/yes.jpg" /></p></div>');
            break;

            default: 
                var message = data.message;
                
                var findMeme = /^m /;
                if(findMeme.test(message)) { // it's a meme 
                    memeIt(message, data);
                }
                else { // it's a normal message
                    message = imageToPrint(message);
                    $("#jetzt").before('<div class="message"><img src="images/drm.jpg" id="avatar" /><div id="time">'+data.time+'</div><p id="name"><strong>'+data.name+'</strong></p><p>'+message+'</p></div>');
                }
            break;
        }
        if (name != data.name) document.getElementById('ping1').play();
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
		name = String(username); //cl (username);
				
		if (username) { 
			$('.message').show();
			$("#input").focus();	
			$('#message1').hide();
            socket.emit('adduser', { username: username, time: getTime() });
            // sessionStorage.username = username; // this can be achieved just with using "name"
		}
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

function cl(data) {
    console.log(data);
}




