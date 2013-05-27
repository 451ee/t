// JavaScript Document

$(document).ready(function() {
	$("#input").focus();

	$('#send').ajaxForm(function() { 
	  var input = $('#input');
		
		var emote = input.val().match(/.e/);
		if (emote) { 
			emote = input.val().substr(3);
			if (emote.length > 0) {
				$("#jetzt").before('<div class="message center"><div id="time">'+jQuery.timeago(new Date())+'</div><p id="name">User Name '+emote+'</p></div>');
			} 
			input.val('');
		}
		
		switch(input.val()) {
			case '.w':
			$("#jetzt").before('<div class="message announce"><div id="time">'+jQuery.timeago(new Date())+'</div><p id="name">Online kasutajad</p><p>Vassili Koslakov, Silver Meikar, Marko Ausma, Sven Tiruson, Martin Sookael</p></div>');
			break;

			case '.who':
			$("#jetzt").before('<div class="message announce"><div id="time">'+jQuery.timeago(new Date())+'</div><p id="name">Online kasutajad</p><p>Vassili Koslakov, Silver Meikar, Marko Ausma, Sven Tiruson, Martin Sookael</p></div>');
			break;

			case '.h':
			$("#jetzt").before('<div class="message announce"><div id="time">'+jQuery.timeago(new Date())+'</div><p><strong>.w</strong> - who - kes on kohal<br><strong>.h</strong> - help - näita seda ekraani siin <br><strong>.e</strong> - tegevus - proovi näiteks ".e tantsib"<br></p></div>');
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
