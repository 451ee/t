// JavaScript Document

//console.log("script" + window.memes);

                //console.log(phonegapStuff.js);
                //var kala = head;
                //cl(kala);


$(document).ready(function() { 
    
    // autoscroll to bottom of page
    function scroll() { 
        //if (name != username) document.getElementById('ping1').play();
        var height = $(document).height();
        //console.log(height);
        $(window).scrollTop(height); 
    }  

    // create the memes from the past
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
    
    // print news
    function writer(message, name, time) {
        message = message || ''; name = name || ''; time = time || '';
        message = findLinksAndImages(message); // find links and images
        var avatar = '';
        switch(name) {
            case "4m4t3ur":
            avatar = "4m4t3ur.jpeg";
            break;
                
            case "muusa":
            avatar = "muusa.jpg";
            break;
            
            default:
            avatar = "drm.jpg";
            break;
        }
        $("#jetzt").before('<div class="message"><img src="images/'+avatar+'" class="avatar" /><div class="time">'+time+'</div><p class="name"><strong>'+name+'</strong></p><p>'+message+'</p></div>');
        //makeBeep();
        //vibrate();
    }
    
    // print announcements
    function announcer(message) {
        message = message || '';
        $("#jetzt").before('<div class="message announce"><p>'+message+'</p>');    
    }

    function painter(data) { 
        message = data.message || ''; name = data.name || ''; time = data.time || '';
        $("#jetzt").before('<div class="message center"><div class="time">'+time+'</div><p class="name"><strong>'+name+'</strong></p><img src="images/shortcuts/'+shortcuts[data.message].img+'" /></div>');
    }
    
    function printWho(data){
        var allUsers = []; 
        $.each(data, function(key, value) {
            if(allUsers != 'undefined'){
                allUsers = key + ', ' + allUsers;
            }
        });
        $("#jetzt").before('<div class="message announce"><div id="time">'+getTime()+'</div><p class="name"><strong>Online users:</strong></p>'+allUsers+'<p></p></div>');
    }

    function printHelp() { 
        announcer('<strong>w</strong> - who - who is here<br><strong>h</strong> - help - show this helpscreen here<br><strong>c</strong> - che cazzo - curse in Italian <!--<br><strong>y</strong> - yes - success baby --><br><strong>m</strong> - meme - create a meme <br>');
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
            // send the data to corresponding channel: paint, meme, who, help, last.
            var channel = shortcuts[firstWord].channel;
            socket.emit(channel, { text: message, name: sessionStorage.username, time: getTime() });
        }
        
        else { // if no shortcut, send it to the wire
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
    




    
    
    // catches responses from server and prints them to user.
    socket.on('news', function (data) { 
        
        // following 3 lines are to be continued. look for shortcuts.js        
        //var scIndex = findShortcut(data)
        //if(scIndex != -1) cl('ping');
        //else {} // as comes after switch
        findShortcut(data);
        
        //cl(data.time);
        
        switch(data.message) {
            case 'c':
                //painter('che.png', data.name, data.time);
            break;

            case 'mybody':
				$("#jetzt").before('<div class="message"><div class="time">'+data.time+'</div><p class="name"><strong>'+data.name+'</strong></p> <img src="images/shortcuts/mybody.gif" class="full" /></p></div>');
            break;
                
            case 'mybody2':
				$("#jetzt").before('<div class="message"><div class="time">'+data.time+'</div><p class="name"><strong>'+data.name+'</strong></p> <img src="images/shortcuts/mybody2.gif" class="full" /></p></div>');
            break;

            case 'lol':
				$("#jetzt").before('<div class="message"><div class="time">'+data.time+'</div><p class="name"><strong>'+data.name+'</strong></p> <img src="images/shortcuts/lol.gif" class="full" /></p></div>');
            break;

            case 'dance':
				$("#jetzt").before('<div class="message center"><div class="time">'+data.time+'</div><p class="name"><strong>'+data.name+'</strong></p> <img src="images/shortcuts/dance.gif" /></p></div>');
            break;

            case 'selffive':
				$("#jetzt").before('<div class="message center"><div class="time">'+data.time+'</div><p class="name"><strong>'+data.name+'</strong></p> <img class="full" src="images/shortcuts/selffive.gif" /></p></div>');
            break;

            case 'i':
				$("#jetzt").before('<div class="message center"><div class="time">'+data.time+'</div><p class="name"><strong>'+data.name+'</strong></p> <img src="images/shortcuts/idea.jpeg" /></p></div>');
            break;

            case '8':
				$("#jetzt").before('<div class="message center"><div class="time">'+data.time+'</div><p class="name"><strong>'+data.name+'</strong></p> <img src="images/shortcuts/note.gif" id="bubu" /></p></div>');
            break;
                
            case 'y':
                $("#jetzt").before('<div class="message"><img src="images/drm.jpg" class="avatar" /><div class="time">'+data.time+'</div><p class="name"><strong>'+data.name+'</strong></p><p><img class="full" src="images/shortcuts/yes.jpg" /></p></div>');
            break;

            default: 
                var message = data.message;
                
                var findMeme = /^m /;
                if(findMeme.test(message)) { // it's a meme 
                    memeIt(data);
                }
                else { // it's a normal message
                    writer(message, data.name, data.time);
                }
            break;
        }
        
        if (sessionStorage.username != data.name) {
            document.getElementById('ping1').play();
            if(deviceActive === false) {
                makeBeep();
                vibrate();
            }

        }
        //$(window).scrollTop($(document).height()); // autoscroll to bottom of page     
        //console.log($(document).height());
        scroll();

    });
    
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