// JavaScript Document

//console.log("script" + window.memes);


$(document).ready(function() { 
    
    // autoscroll to bottom of page
    function scroll() { 
        if (name != username) document.getElementById('ping1').play();
        var height = $(document).height();
        console.log(height);
        $(window).scrollTop(height); 
    }  

    // create the memes from the past
    function pastMemes(){ 
        $(".past").each(function(){
            var data = new Array();            
            data.name = $(this).find("strong").html();
            data.time = $(this).find(".time").html();
            data.message = $(this).find(".content").html();
            memeIt(data);
        });    
    }
    
    // print news
    function writer(message, name, time) {
        message = message || ''; name = name || ''; time = time || '';
        message = findLinksAndImages(message); // find links and images
        $("#jetzt").before('<div class="message"><img src="images/drm.jpg" class="avatar" /><div class="time">'+time+'</div><p class="name"><strong>'+name+'</strong></p><p>'+message+'</p></div>');
    }
    
    // print announcements
    function announcer(message) {
        message = message || '';
        $("#jetzt").before('<div class="message announce"><p>'+message+'</p>');    
    }
    
    // print images to center
    function centerWriter(message, name, time) {
        message = message || ''; name = name || ''; time = time || '';
        $("#jetzt").before('<div class="message center"><div class="time">'+time+'</div><p class="name"><strong>'+name+'</strong> '+message+'</p></div>');
    }
    
	// hold focus on the text input, unless it's the log in screen.
	if ($("#username").is(":visible")) {
		$("#username").focus();			
	}
	else {
		$("#input").focus();			
	}
	
    // Catches user submitted content from form
	//$('#send').ajaxForm(function() { 
    $('#send').on('submit', function(e) { 
       
        e.preventDefault(); 
        var input = $('#input'); 
        
        var justInput = input.val();
        
        // check for errors
        if(findMemeError(input.val())==='error') justInput = "memeError";

        switch(justInput) {
            case '': // blank entry
                return false;
            break;

            case 'h': // print help screen 
                announcer('<strong>w</strong> - who - who is here<br><strong>h</strong> - help - show this helpscreen here<br><strong>c</strong> - che cazzo - curse in Italian <!--<br><strong>y</strong> - yes - success baby --><br><strong>m</strong> - meme - create a meme <br>');
			break;
                
            case 'm': // print help screen for memeing   
                announcer('<strong>Meme it, bitch!</strong><br /><br /><strong>usage: <br /></strong>m fwp<br>m fwp text to top / text to bottom<br>m fwp text to top<br>m fwp / text to bottom<br><br><strong>Available memes:</strong><br /><strong>m fwp</strong> - First World Problem<br><strong>m bru</strong> - bottom text: "IMPOSSIBRU!!"<br /><strong>m baby</strong> - SuccessBaby<br /><strong>m yuno</strong> - Y U No?<br /><strong>m goodguy</strong> - Good Guy Greg<br /><strong>m man</strong> - Most interesting guy on earth<br /><strong>m simply</strong> - top text: "One does not simply"<br /><strong>m whatif</strong> - top text: "What if I told you?"<br /><strong>m scumb</strong> - Scumbag Steve<br /><strong>m scumg</strong> - Scumbag Stacy<br /><strong>m gf</strong> - Overly attached girlfriend<br /><strong>m fuckme</strong> - bottom text: "Fuck me, right?" <br /><strong>m nobody</strong> - Bottom text: "Ain&quot;t nobody got time for that"<br /><strong>m fa</strong> - Forever alone <br /><strong>m boat</strong> - I should buy a boat cat <br /><strong>m acc</strong> - top text: "challegne accepted" <br />');
            break;
                
			case 'w': // print online users
                socket.emit('getUsers');
            break;

            case 'memeError': // if such meme doesn't exist
                writer(input.val()+' - no such meme here :(', 'Error');
            break;
                
            default: // regular text entry - pass this on
                socket.emit('news', { text: input.val(), name: name, time: getTime() });
            break;
        }
 
        input.val(''); // clear the text input. Or should it be - reset form?
    });

    // catches responses from server and prints them to user.
    socket.on('news', function (data) { 
        
        // following 3 lines are to be continued. look for shortcuts.js        
        //var scIndex = findShortcut(data)
        //if(scIndex != -1) cl('ping');
        //else {} // as comes after switch
        
        //cl(data.time);
        
        switch(data.message) {
            case 'c':
                centerWriter('<img src="images/shortcuts/che.png" />', data.name, data.time);
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
        if (name != data.name) document.getElementById('ping1').play();
        //$(window).scrollTop($(document).height()); // autoscroll to bottom of page     
        //console.log($(document).height());
        scroll();

    });
    
    // catches getUsers response from the server
    socket.on('getUsers', function (data) { 
        var allUsers = []; 
        $.each(data, function(key, value) {
            if(allUsers != 'undefined'){
                allUsers = key + ', ' + allUsers;
            }
        });
        $("#jetzt").before('<div class="message announce"><div id="time">'+getTime()+'</div><p class="name"><strong>Online users:</strong></p>'+allUsers+'<p></p></div>');
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
            //pastMemes();
            // sessionStorage.username = username; // this can be achieved just with using "name"
		}
    });

    // automagic link creation from URLs 
    function urlsToLinks(text) {
        var exp = /(\b(https?|ftp|file|http):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;        
        return text.replace(exp,"<a href='$1' target='_blank'>$1</a>"); 
    }

    // automagic image creation from URLs
    function findLinksAndImages(text) {
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