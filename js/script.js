// JavaScript Document

$(document).ready(function() {
	$("#input").focus();

	$('#send').ajaxForm(function() { 
	  var input = $('#input');
				
		switch(input.val()) {
			case '.w':
			$("#jetzt").before('<div class="message announce"><div id="time">'+jQuery.timeago(new Date())+'</div><p id="name">Online kasutajad</p><p>Vassili Koslakov, Silver Meikar, Marko Ausma, Sven Tiruson, Martin Sookael</p></div>');
			break;

			case '.who':
			$("#jetzt").before('<div class="message announce"><div id="time">'+jQuery.timeago(new Date())+'</div><p id="name">Online kasutajad</p><p>Vassili Koslakov, Silver Meikar, Marko Ausma, Sven Tiruson, Martin Sookael</p></div>');
			break;

			case '.h':
			$("#jetzt").before('<div class="message announce"><div id="time">'+jQuery.timeago(new Date())+'</div><p><strong>.w</strong> - who - kes on kohal<br><strong>.h</strong> - help - näita seda ekraani siin <br>');
			break;

			case '.c':
				$("#jetzt").before('<div class="message center"><div id="time">'+jQuery.timeago(new Date())+'</div><p id="name">User Name <img src="img/che.png" /></p></div>');
			break;

			case '':
			return false;
			break;
			
			default: 
			$("#jetzt").before('<div class="message"><img src="img/ma.jpg" id="avatar" /><div id="time">'+jQuery.timeago(new Date())+'</div><p id="name">Marko Ausma</p><p>'+input.val()+'</p></div>')
			break;
		}
		
		input.val('');
		$(window).scrollTop($(document).height());

	}); 
});
