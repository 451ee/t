// JavaScript Document
/*
window.onload = function() {
  document.getElementById("input").focus();
}
*/

$(document).ready(function() {
	$("#input").focus();

	$('#send').ajaxForm(function() { 
	  var input = $('#input');
		$("#jetzt").before('<div class="message"><img src="img/ma.jpg" id="avatar" /><div id="time">'+jQuery.timeago(new Date())+'</div><p id="name">Marko Ausma</p><p>'+input.val()+'</p></div>')
		
		input.val('');
$(window).scrollTop($(document).height());
	}); 
});
