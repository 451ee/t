// JavaScript Document

$(document).ready(function() {
	
	//what time is it?
	var d = new Date();
	var n = d.getHours();
	var m = d.getMinutes();
	var time = n+':'+m;
	
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
			$("#jetzt").before('<div class="message"><img src="images/ma.jpg" id="avatar" /><div id="time">'+time+'</div><p id="name">'+name+'</p><p>'+input.val()+'</p></div>');
			if(Math.floor((Math.random()*3)+1) == 3) $("#jetzt").before('<div class="message"><img src="images/be.png" id="avatar" /><div id="time">'+time+'</div><p id="name">Bender</p><p>Ahaaa.. Interesting</p></div>');
			break;
		}
		
		input.val('');
		$(window).scrollTop($(document).height());

	}); 
});
