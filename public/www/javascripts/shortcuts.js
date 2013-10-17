
// This here is shit.
// to be continued

var shortcuts = Array();

shortcuts = {
    "c":{
        "img" : "c.png",
        "sample":"sample" 
    },
    "mybody":{ 
        "img" : "mybody.gif" 
    },
    "mybody2":{ 
        "img" : "mybody2.gif" 
    },
    "lol":{ 
        "img" : "lol.gif" 
    },
    "dance":{ 
        "img" : "dance.gif" 
    },
    "selffive":{ 
        "img" : "selffive.gif" 
    },
    "i":{ 
        "img" : "idea.jpeg" 
    },
    "8":{ 
        "img" : "note.gif" 
    },
    "y":{ 
        "img" : "yes.jpg" 
    },
    "m":{ 
        "function":"meme" 
    },
}

//console.log(shortcuts.dance.img);


function findPatterns(message) {
    if (message === '') return false;
    message = message.trim(); 
    if(message.indexOf(" ") != -1) var firstWord = message.slice(0, message.indexOf(" "));
    else var firstWord = message;
    console.log(firstWord);
}

function findShortcut(data) { 
    //console.log(data.message);
    return data;
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