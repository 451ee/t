
// This here is shit.
// to be continued

//var shortcuts = require('./shortcuts2.js');

function findShortcut(data) { 
 window.cl(shortcuts);   
}

/*
function findShortcut(data) { 
    input = data.message;
    cuts = new Array();
    var i = 0;
    $.each(shortcuts, function(key, value) {
        cuts[i][name] = value.name;
        cuts[i][name] = value.name;
        i++;
    });
    var shortCutIndex = $.inArray(input, cuts);
    cl(cuts);
    
    $("#jetzt").before('<div class="message"><div id="time">'+data.time+'</div><p id="name"><strong>'+data.name+'</strong></p> <img src="/shortcuts/'+cuts[shortCutIndex]+'" class="full" /></p></div>');

    return shortCutIndex;
}


function printShortcut(data, scIndex) { 
    cuts = new Array();
    var i = 0;
    $.each(shortcuts, function(key, value) {
        cuts[i] = value.name;
        i++;
    });
    cl(cuts[scIndex]['img']);
    $("#jetzt").before('<div class="message"><div id="time">'+data.time+'</div><p id="name"><strong>'+data.name+'</strong></p> <img src="/shortcuts/'+cuts[scIndex]+'" class="full" /></p></div>');
}

*/