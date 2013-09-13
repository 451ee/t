// JavaScript Document

$(document).ready(function() { 
	
	//what time is it?
	var d = new Date();
	var n = d.getHours();
	var m = d.getMinutes();
	var time = n+':'+m;
    
    function getTime() {
        var d = new Date();
        var n = d.getHours();
        var m = d.getMinutes();
        var time = n+':'+m;
        return time;
    }
    
    //console.log(getTime());
	
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

	// do stuff when people send text
	$('#send').ajaxForm(function() { 
	  
		var input = $('#input');
				
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
			return false;
			break;
			
			default: 
			/*$("#jetzt").before('<div class="message"><img src="images/ms.jpg" id="avatar" /><div id="time">'+time+'</div><p id="name">'+name+'</p><p>'+input.val()+' <a href="#" class="tag">#Trappeto</a></p></div>'); */
            socket.on('news', function (data) {
                console.log(data);
                $("#jetzt").before('<div class="message"><img src="images/drm.jpg" id="avatar" /><div id="time">'+data.time+'</div><p id="name">'+data.name+'</p><p>'+data.message+' <a href="#" class="tag">#Trappeto</a></p></div>');
    
            });
            
            $('#send').ajaxForm(function() { // conflicts with 75
                var input = $('#input');
                socket.emit('news', { text: input.val(), name: name, time: getTime() });
                input.val('');
                //socket.emit('second', { my: 'Tere Maailm' });
            }); 

                
			if(Math.floor((Math.random()*3)+1) == 3) $("#jetzt").before('<div class="message"><img src="images/be.png" id="avatar" /><div id="time">'+time+'</div><p id="name">Bender</p><p>Ahaaa.. Interesting.  <a href="#" class="tag">#Trappeto</a></p></div>');

			if(Math.floor((Math.random()*10)+1) == 3) $("#jetzt").before('<div class="message"><img src="images/be.png" id="avatar" /><div id="time">'+time+'</div><p id="name">Bender</p><p>Sieht nix, hört nix, sagt nix. <a href="#" class="tag">#Trappeto</a></p></div>');
			break;
			
		}
		
		input.val('');
		$(window).scrollTop($(document).height());        
        
	}); 
});
