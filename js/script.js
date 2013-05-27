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
		$("#jetzt").before('<div class="message"><img src="img/ms.jpg" id="avatar" /><div id="time">'+jQuery.timeago(new Date())+'</div><p id="name">Martin Sookael</p><p>'+input.val()+'</p></div>')
		
		input.val('');
$(window).scrollTop($(document).height());
	}); 
});
