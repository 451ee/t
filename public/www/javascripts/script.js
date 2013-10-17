// JavaScript Document

$(document).ready(function() { 

    /* PRINT TEMPLATES */
    // print news
    function writer(data) { 
        message = data.message || ''; name = data.name || ''; time = data.time || '';
        message = findLinksAndImages(message); // find links and images
        var avatar = getAvatar(name);
        $("#jetzt").before('<div class="message"><img src="images/'+avatar+'" class="avatar" /><div class="time">'+time+'</div><p class="name"><strong>'+name+'</strong></p><p>'+message+'</p></div>');
        //makeBeep();
        //vibrate();
        scrollAndBeep(data);
    }
    
    // print announcements
    function announcer(message) {
        message = message || '';
        $("#jetzt").before('<div class="message announce"><p>'+message+'</p>');    
    }

    function painter(data) { 
        message = data.message || ''; name = data.name || ''; time = data.time || '';
        $("#jetzt").before('<div class="message center"><div class="time">'+time+'</div><p class="name"><strong>'+name+'</strong></p><img src="images/shortcuts/'+shortcuts[data.message].img+'" /></div>');
        scrollAndBeep(data);
    }
    
    function printWho(data){
        var allUsers = []; 
        $.each(data, function(key, value) {
            if(allUsers != 'undefined'){
                allUsers = key + ', ' + allUsers;
            }
        });
        $("#jetzt").before('<div class="message announce"><div class="time">'+getTime()+'</div><p class="name"><strong>Online users:</strong></p>'+allUsers+'<p></p></div>');
    }

    function printHelp() { 
        announcer('<strong>w</strong> - who - who is here<br><strong>h</strong> - help - show this helpscreen here<br><strong>c</strong> - che cazzo - curse in Italian <!--<br><strong>y</strong> - yes - success baby --><br><strong>m</strong> - meme - create a meme <br>');
        scroll();
    }




    
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
        var message = input.val();
        
        // get the first word
        if (message === '') return false;
        message = message.trim(); 
        if(message.indexOf(" ") != -1) var firstWord = message.slice(0, message.indexOf(" "));
        else var firstWord = message;
        
        // is it a shortcut?
        if(firstWord in shortcuts) { 
            
            // is it a meme?
            // is it a meme with a typo?
            if(findMemeError(message) === "error") { 
                var data = new Array; 
                data.message = '<strong>'+input.val()+'</strong> - no such meme here :(';
                data.name = "Server";
                data.time = getTime();
                writer(data);
            } // it's no meme, pass it on
            else if(findMemeError(message) === "noMeme"){ 
                var channel = shortcuts[firstWord].channel;
                socket.emit(channel, { text: message, name: sessionStorage.username, time: getTime() });
            } // it's a meme!
            else {  
                var data = new Array; 
                data.message = input.val();
                data.name = "Server";
                data.time = getTime();
                memeIt(data);
                                
            }
        }
        
        else { // if no shortcut, send it to the wire
            //console.log("läheb");
            socket.emit('news', { text: message, name: sessionStorage.username, time: getTime() });
        }
     
        input.val(''); // clear the text input. Or should it be - reset form?
        
    });





    socket.on('paint', function (data) { 
        painter(data);
    });

    
    socket.on('who', function (data) { 
        printWho(data);
    });

    socket.on('help', function (data) { 
        printHelp();
    });

    socket.on('news', function (data) { 
        writer(data);
    });
    
    




    
    
    // catches responses from server and prints them to user.
    /*
    socket.on('news', function (data) { 
        
        writer(data.message, data.name, data.time);
    
        /*
        var message = data.message;
        
        var findMeme = /^m /;
        if(findMeme.test(message)) { // it's a meme 
            memeIt(data);
        }
        else { // it's a normal message
            writer(message, data.name, data.time);
        } 
        
        
        if (sessionStorage.username != data.name) {
            document.getElementById('ping1').play();
            if(deviceActive === false) {
                makeBeep();
                vibrate();
            }

        }
        scroll();
    });
    */
    
    // catches getUsers response from the server
    /*socket.on('getUsers', function (data) { 
        var allUsers = []; 
        $.each(data, function(key, value) {
            if(allUsers != 'undefined'){
                allUsers = key + ', ' + allUsers;
            }
        });
        $("#jetzt").before('<div class="message announce"><div id="time">'+getTime()+'</div><p class="name"><strong>Online users:</strong></p>'+allUsers+'<p></p></div>');
    }); */

    
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
            //pastMemes();
            sessionStorage.username = username; // this can be achieved just with using "name"
		}
    });

    
    // automagic link creation from URLs 
    function urlsToLinks(text) {
        var exp = /(\b(https?|ftp|file|http):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;        
        var match =  text.match(exp); // address
        
        if(match !== null){ // is link
            match = encodeURI(match); 
            return "<a href='#' target='blank' onclick='window.open(&quot;"+match+"&quot;, &quot;_blank&quot;, &quot;location=yes&quot;); return false;' style='color: #0066cc; text-decoration: underline; cursor: pointer;' >"+match+"</a>";
        } 
        else return text;

    }

    // automagic image creation from URLs
    function findLinksAndImages(text) {
        var exp = /(\b(https?|ftp|file|http):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]+(\.jpg|\.jpeg|\.png|\.gif|\.bmp))/ig;
        var match =  text.match(exp);
        if(match !== null){ // is image
            //return text.replace(exp,"<a href='$1' target='_blank'><img class='full' src='$1' /></a>"); 
            match = encodeURI(match); 
            return "<a href='#'  target='blank' onclick='window.open(&quot;"+match+"&quot;, &quot;_blank&quot;, &quot;location=yes&quot;); return false;' ><img class='full' src='"+match+"' /></a>";

        } 
        else { // is some other kind of link
            return urlsToLinks(text);
        }
    }

    // autoscroll to bottom of page
    function scroll() { 
        //if (name != username) document.getElementById('ping1').play();
        var height = $(document).height();
        //console.log(height);
        $(window).scrollTop(height); 
    }  
    
    // scroll and beep on command
    function scrollAndBeep(data) {
        if (sessionStorage.username != data.name) {
            document.getElementById('ping1').play();
            if(deviceActive === false) {
                makeBeep();
                vibrate();
            }
        }
        scroll();
    }
});

// get local time
function getTime() {
    var d = new Date();
    var n = d.getHours();
    var m = (d.getMinutes()<10?'0':'') + d.getMinutes();
    var time = n+':'+m;
    return time;
}

/*
function printTime(time) {
    var d = time;
    var n = d.getHours();
    var m = (d.getMinutes()<10?'0':'') + d.getMinutes();
    var time = n+':'+m;
    return time;
}
*/

// shortcut for console.log
function cl(data) {
    console.log(data);
}


function getAvatar(name){
    switch(name) {
        case "4m4t3ur":
        var avatar = "4m4t3ur.jpeg";
        break;
            
        case "muusa":
        var avatar = "muusa.jpg";
        break;

        case "Server":
        var avatar = "be.png";
        break;
            
        default:
        var avatar = "drm.jpg";
        break;
    }
    return avatar;
}
    


/*    // create the memes from the past
    function pastMemes(){ 
        $(".past").each(function(){
            var data = new Array();            
            data.name = $(this).find("strong").html();
            data.time = $(this).find(".time").html();
            data.message = $(this).find(".content").html();
            
            var findMeme = /^m /;
            if(findMeme.test(data.message)) { // it's a meme 
                memeIt(data);
            }
            else writer(data.message, data.name, data.time);
        });    
    }
*/