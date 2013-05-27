// JavaScript Document

$(document).ready(function() {

	if ($("#username").is(":visible")) {
		$("#username").focus();			
	}
	else {
		$("#input").focus();			
	}
	
	$('#login').ajaxForm(function() { 

		var username = $('#username');
		username = username.val();
		name = String(username);
				
		if (username) { 
			$('.message').show();
			$("#input").focus();	
			$('#message1').hide();
		}
		//console.log(username.val());

	}); 

	$('#send').ajaxForm(function() { 
	  
		var input = $('#input');
				
		switch(input.val()) {
			case '.w':
			$("#jetzt").before('<div class="message announce"><div id="time">'+jQuery.timeago(new Date())+'</div><p id="name">Online kasutajad</p><p>Vassili Koslakov, Silver Meikar, Marko Ausma, Sven Tiruson, Martin Sookael, Bender, '+name+'</p></div>');
			break;
			
			case '.h':
			$("#jetzt").before('<div class="message announce"><div id="time">'+jQuery.timeago(new Date())+'</div><p><strong>.w</strong> - who - kes on kohal<br><strong>.h</strong> - help - näita seda ekraani siin <br>');
			break;

			case '.c':
				$("#jetzt").before('<div class="message center"><div id="time">'+jQuery.timeago(new Date())+'</div><p id="name">'+name+' <img src="img/che.png" /></p></div>');
			break;

			case '':
			return false;
			break;
			
			default: 
			$("#jetzt").before('<div class="message"><img src="img/ma.jpg" id="avatar" /><div id="time">'+jQuery.timeago(new Date())+'</div><p id="name">'+name+'</p><p>'+input.val()+'</p></div>')
			break;
		}
		
		input.val('');
		$(window).scrollTop($(document).height());

	}); 
});
