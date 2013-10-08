// JavaScript Document

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
       
        switch(input.val()) {
            case '': // blank entry
                return false;
            break;

            case 'h': // print help screen - does not require broadcasting
                $("#jetzt").before('<div class="message announce"><p><strong>w</strong> - who - who is here<br><strong>h</strong> - help - show this helpscreen here<br><strong>c</strong> - che cazzo - curse in Italian <!--<br><strong>y</strong> - yes - success baby --><br><strong>m</strong> - meme - create a meme <br>');
			break;
                
            case 'm': // print help screen for memeing       
            $("#jetzt").before('<div class="message announce"><img src="images/drm.jpg" id="avatar" /><p id="name"><strong>Server</strong></p><p>Meme it, bitch!<br><strong>usage: <br /></strong>m fwp<br>m fwp text to top / text to bottom<br>m fwp text to top<br>m fwp / text to bottom<br><br><strong>Available memes:</strong><br /><strong>m fwp</strong> - First World Problem<br><strong>m impossibru</strong> - IMPOSSIBRU!!<br /><strong>m successbaby</strong> - SuccessBaby<br /><strong>m yuno</strong> - Y U No?<br /><strong>m goodguy</strong> - Good Guy Greg<br /><strong>m mostinteresting</strong> - Most interesting guy on earth<br /><strong>m onedoesnot</strong> - One does not simply<br /><strong>m morpheus</strong> - What if I told you?<br /><strong>m steve</strong> - Scumbag Steve<br /><strong>m stacy</strong> - Scumbag Stacy<br /><strong>m overly</strong> - Overly attached girlfriend<br /><strong>m fuckme</strong> - Fuck me, right? <br /><strong>m nobody</strong> - Ain&quot;t nobody got time for that <br /></p></div>');        
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
                if(findMeme.test(message) || message === "m") { // it's a meme 
                    memeIt(message, data);
                }
                else {
                    message = imageToPrint(message);
                    $("#jetzt").before('<div class="message"><img src="images/drm.jpg" id="avatar" /><div id="time">'+data.time+'</div><p id="name"><strong>'+data.name+'</strong></p><p>'+message+'</p></div>');
                    //document.getElementById('ping1').play();
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
    
    
    //Memeing goes here
    function memeIt(message, data) { //cl(sessionStorage.username);
                
        message = message.slice(2); // remove "m " from beginning
        if(message.indexOf(" ") != -1) var memeName = message.slice(0, message.indexOf(" ")); // get the meme name (if the text fields are not empty)
        
        message = message.slice(message.indexOf(" ")+1); // remove the meme name
        if(memeName === undefined) var memeName = message; // that's in case "m fwp", but messes up "m fwp tere".
                                    
        var split = message.indexOf("/"); // find the position of "/" mark
        
        var message1 = '';
        var message2 = '';
                                        
        if (split === -1) { // not a 2 lined meme
            if(message === memeName) { // not even a 1 lined meme
            } else {
                 message1 = message.trim(); // it's a 1 lined meme
            }
        } else { // 2 lined meme
            message1 = message.slice(0, split).trim();
            message2 = message.slice(split+1).trim();
        }

        switch (memeName) {
        
            case 'fwp':
                var memeWidth = 510;
                var memeHeight = 338;
                var memeImg = "images/meme/1stwp.jpg";
                var memeFont = '40px Impact';
            break;

            case 'successbaby':    
                var memeWidth = 570;
                var memeHeight = 379;
                var memeImg = "images/meme/successbaby.jpg";
                var memeFont = '40px Impact';
            break;

            case 'impossibru':    
                var memeWidth = 640;
                var memeHeight = 480;
                var memeImg = "images/meme/impossibru.jpg";
                var memeFont = '60px Impact';
                if (message2 === '') message2 = "IMPOSSIBRU!";
            break;

            case 'yuno':    
                var memeWidth = 600;
                var memeHeight = 450;
                var memeImg = "images/meme/yuno.gif";
                var memeFont = '40px Impact';
                if (message1 === '') message1 = "Y U No";
            break;

            case 'goodguy':    
                var memeWidth = 530;
                var memeHeight = 525;
                var memeImg = "images/meme/goodguy.jpg";
                var memeFont = '40px Impact';
            break;

            case 'mostinteresting':    
                var memeWidth = 430;
                var memeHeight = 539;
                var memeImg = "images/meme/mostinteresting.jpg";
                var memeFont = '40px Impact';
            break;

            case 'onedoesnot':    
                var memeWidth = 568;
                var memeHeight = 335;
                var memeImg = "images/meme/onedoesnotsimply.jpg";
                var memeFont = '40px Impact';
                if (message1 === '') message1 = "One does not simply";
            break;

            case 'morpheus':    
                var memeWidth = 400;
                var memeHeight = 400;
                var memeImg = "images/meme/morpheus.jpg";
                var memeFont = '40px Impact';
                if (message1 === '') message1 = "What if I told you";
            break;

            case 'stacy':    
                var memeWidth = 555;
                var memeHeight = 666;
                var memeImg = "images/meme/stacy.jpg";
                var memeFont = '40px Impact';
            break;

            case 'steve':    
                var memeWidth = 600;
                var memeHeight = 604;
                var memeImg = "images/meme/steve.jpg";
                var memeFont = '40px Impact';
            break;

            case 'overly':    
                var memeWidth = 636;
                var memeHeight = 480;
                var memeImg = "images/meme/overly_attached.jpg";
                var memeFont = '40px Impact';
            break;

            case '451':    
                var memeWidth = 564;
                var memeHeight = 258;
                var memeImg = "images/meme/451.jpg";
                var memeFont = '40px Impact';
            break;

            case 'fuckme':    
                var memeWidth = 500;
                var memeHeight = 321;
                var memeImg = "images/meme/fuckme.jpg";
                var memeFont = '40px Impact';
                console.log (message2);
                if (message2 === '') message2 = "fuck me, right?";
            break;

            case 'nobody':    
                var memeWidth = 500;
                var memeHeight = 321;
                var memeImg = "images/meme/aintnobody.jpg";
                var memeFont = '35px Impact';
                console.log (message2);
                if (message2 === '') message2 = "Ain't nobody got time for that";
            break;
                
            default:
                var memeWidth = 570;
                var memeHeight = 200;
                var memeImg = "images/meme/noSuchMeme.gif";
                var memeFont = '40px Impact';
                message1 = memeName + " ?";
        
        }        
        $("#jetzt").before("<div class='message'><p><canvas id='meme' class='full'></canvas></p></div>");        
        
        var canvas = document.getElementById('meme');
        var context = canvas.getContext('2d');
        
        canvas.width  = memeWidth;
        canvas.height = memeHeight;
        
        var imageObj = new Image();
        
        imageObj.onload = function() {
            context.drawImage(imageObj, 0, 0, memeWidth, memeHeight);
            drawText(message1, message2, data.name); // <---- 
            var img    = canvas.toDataURL("image/png");
            $("#jetzt").before('<div class="message"><img src="images/drm.jpg" id="avatar" /><div id="time">'+data.time+'</div><p id="name"><strong>'+data.name+'</strong></p><p><img class="full" src="'+img+'" /></p></div>');
            scroll();
        };
        imageObj.src = memeImg;
        
        function drawText( message1, message2, username ){
            
            message1 = message1.toUpperCase();
            message2 = message2.toUpperCase();
            context.font = memeFont;
            context.textAlign = 'center';
            context.fillStyle = 'rgba(255, 255, 255, 1)';
            context.lineWidth = 2;
            context.strokeStyle = '#000000';
            //context.fillText(text, canvas.width/2, canvas.height/2);    
            context.fillText(message1, canvas.width/2, 55);            
            context.strokeText(message1, canvas.width/2, 55);            
            context.fillText(message2, canvas.width/2, memeHeight-25);            
            context.strokeText(message2, canvas.width/2, memeHeight-25);  
            if (name != username) document.getElementById('ping1').play();
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
