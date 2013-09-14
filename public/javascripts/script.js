// JavaScript Document

$(document).ready(function() { 
	
/*	//what time is it?
	var d = new Date();
	var n = d.getHours();
	var m = d.getMinutes();
	var time = n+':'+m; */
    
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
	$('#login').ajaxForm(function() { 
		var username = $('#username');
		username = username.val();
		name = String(username);
				
		if (username) { 
			$('.message').show();
			$("#input").focus();	
			$('#message1').hide();
		}
	}); 

    // Catches user submitted content from form
    $('#send').on('submit', function(e) { 
       
        // if info comes here, do the following:
        // 1. it's a blank info - it should return false then.
        // 2. it will display some information just for the user - helpscreen etc
        // 3. default: it's going to be broadcasted for all - chat, emote etc

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
        // if info comes here, do the following:
        // 1. it's a emoticon - create the emoticon and send it to everyone
        // 2. default: it's a text - send it as a text
        //console.log(data.message);
        
        switch(data.message) {
            case 'c':
				$("#jetzt").before('<div class="message center"><div id="time">'+data.time+'</div><p id="name">'+name+' <img src="images/che.png" /></p></div>');
            break;
                
            default: 
                $("#jetzt").before('<div class="message"><img src="images/drm.jpg" id="avatar" /><div id="time">'+data.time+'</div><p id="name">'+data.name+'</p><p>'+data.message+' <!--<a href="#" class="tag">#Trappeto</a></p></div>-->');
            break;
        }

        $(window).scrollTop($(document).height()); // autoscroll to bottom of page        

    });
    
    
    /*
	// do stuff when people send text
	$('#send').ajaxForm(function() { 
        
        // if info comes here, there are following possibilities:
        // 1. it's going to be broadcasted for all - chat, emote etc
        // 2. it will display some information just for the user - helpscreen etc
        // 3. it's a blank info - it should return false then.
	  
		var input = $('#input'); console.log(input.val());
				
		switch(input.val()) {
			case '.w':
			$("#jetzt").before('<div class="message announce"><div id="time">'+time+'</div><p id="name">Online users:</p><p>Vassili Koslakov, Silver Meikar, Marko Ausma, Sven Tiirusson, Martin Sookael, Bender, '+name+'</p></div>');
			break;
			
			case '.h':
			$("#jetzt").before('<div class="message announce"><div id="time">'+time+'</div><p><strong>.w</strong> - who - who is here<br><strong>.h</strong> - help - show this helpscreen here<br><strong>.c</strong> - che cazzo - curse in Italian <br>');
			break;

			case '.c':
				$("#jetzt").before('<div class="message center"><div id="time">'+time+'</div><p id="name">'+name+' <img src="images/che.png" /></p></div>');
			break;

			case '':
            console.log("tyhi");
			return false;
			break;
			
			default: 
			//$("#jetzt").before('<div class="message"><img src="images/ms.jpg" id="avatar" /><div id="time">'+time+'</div><p id="name">'+name+'</p><p>'+input.val()+' <a href="#" class="tag">#Trappeto</a></p></div>'); 
            socket.on('news', function (data) {
                //console.log(data);
                $("#jetzt").before('<div class="message"><img src="images/drm.jpg" id="avatar" /><div id="time">'+data.time+'</div><p id="name">'+data.name+'</p><p>'+data.message+' <!--<a href="#" class="tag">#Trappeto</a></p></div>-->');
    
            });
            
            $('#send').ajaxForm(function() { // conflicts with 75
                var input = $('#input');
                socket.emit('news', { text: input.val(), name: name, time: getTime() });
                input.val('');
                //socket.emit('second', { my: 'Tere Maailm' });
            }); 
                
            $(window).scrollTop($(document).height());        
                    
			if(Math.floor((Math.random()*3)+1) == 3) $("#jetzt").before('<div class="message"><img src="images/be.png" id="avatar" /><div id="time">'+time+'</div><p id="name">Bender</p><p>Ahaaa.. Interesting.  <a href="#" class="tag">#Trappeto</a></p></div>');

			if(Math.floor((Math.random()*10)+1) == 3) $("#jetzt").before('<div class="message"><img src="images/be.png" id="avatar" /><div id="time">'+time+'</div><p id="name">Bender</p><p>Sieht nix, hört nix, sagt nix. <a href="#" class="tag">#Trappeto</a></p></div>');
			break; 
			
		}
		
		//input.val('');
		//$(window).scrollTop($(document).height());        
       
	});  */
});
