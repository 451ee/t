/*
// to be continued
var memes2 = Array();
memes2 = {
    "fwp":{
        "img" : "images/meme/1stwp.jpg",
    },
    "baby":{ 
        "img" : "images/meme/successbaby.jpg",
    },
    "bru":{ 
        "img" : "images/meme/impossibru.jpg",
        "message2" : "IMPOSSIBRU!",
    },
    "yuno":{ 
        "img" : "images/meme/yuno.gif",
    },
    "goodguy":{ 
        "img" : "images/meme/goodguy.jpg",
    },
    "man":{ 
        "img" : "images/meme/mostinteresting.jpg",
    },
    "simply":{ 
        "img" : "images/meme/onedoesnotsimply.jpg",
        "message1" : "One does not simply",
    },
    "whatif":{ 
        "img" : "images/meme/morpheus.jpg",
        "message1" : "What if I told you",
    },
    "scumg":{ 
        "img" : "images/meme/stacy.jpg",
    },
    "scumb":{ 
        "img" : "images/meme/steve.jpg",
    },
    "gf":{ 
        "img" : "images/meme/overly_attached.jpg",
    },
    "451":{ 
        "img" : "images/meme/451.jpg",
    },
    "fuckme":{ 
        "img" : "images/meme/fuckme.jpg",
        "message2" : "fuck me, right?",
    },
    "fa":{ 
        "img" : "images/meme/fa.jpg",
    },
    "nobody":{ 
        "img" : "images/meme/aintnobody.jpg",
        "message2" : "Ain't nobody got time for that", 
    },
    "boat":{ 
        "img" : "images/meme/boat.jpg",
    },
    "ac":{ 
        "img" : "images/meme/challengeaccepted.gif",
        "message1" : "challenge accepted", 
    },
}
*/



var memes = [ 
    {
        "name": "fwp",
        "img" : "images/meme/1stwp.jpg",
    },{
        "name": "baby",
        "img" : "images/meme/successbaby.jpg",
    },{
        "name": "bru",
        "img" : "images/meme/impossibru.jpg",
        "message2" : "IMPOSSIBRU!",
    },{
        "name": "yuno",
        "img" : "images/meme/yuno.gif",
    },{
        "name": "goodguy",
        "img" : "images/meme/goodguy.jpg",
    },{
        "name": "man",
        "img" : "images/meme/mostinteresting.jpg",
    },{
        "name": "simply",
        "img" : "images/meme/onedoesnotsimply.jpg",
        "message1" : "One does not simply",
    },{
        "name": "whatif",
        "img" : "images/meme/morpheus.jpg",
        "message1" : "What if I told you",
    },{
        "name": "scumg",
        "img" : "images/meme/stacy.jpg",
    },{
        "name": "scumb",
        "img" : "images/meme/steve.jpg",
    },{
        "name": "gf",
        "img" : "images/meme/overly_attached.jpg",
    },{
        "name": "451",
        "img" : "images/meme/451.jpg",
    },{
        "name": "fuckme",
        "img" : "images/meme/fuckme.jpg",
        "message2" : "fuck me, right?",
    },{
        "name": "fa",
        "img" : "images/meme/fa.jpg",
    },{
        "name": "nobody",
        "img" : "images/meme/aintnobody.jpg",
        "message2" : "Ain't nobody got time for that", 
    },{
        "name": "boat",
        "img" : "images/meme/boat.jpg",
    },{
        "name": "acc",
        "img" : "images/meme/challengeaccepted.gif",
        "message1" : "challenge accepted", 
    },{
        "name": "default",
        "img" : "images/meme/noSuchMeme.gif",
    }
]

function findMemeError(input) { 
    var findMeme = /^m /;
    if(findMeme.test(input)) { // it's a meme
        processMessage = getMemeName(input);
        var memeName = processMessage['memeName']; //cl(processMessage);
        var localMemes = new Array();
        var i = 0;
        $.each(window.memes, function(key, value) {
            localMemes[i] = value.name;
            i++;
        });
        var memeIndex = $.inArray(memeName, localMemes);
        if (memeIndex === -1) { // it's a meme with a typo
            justInput = "error";
            return justInput;
        }
    }
    else { // it ain't no meme
        return "noMeme";
    }
}


// takes meme message and slices & returns meme name
function getMemeName(message) {
    message = message.slice(2); // remove "m " from beginning
    
    if(message.indexOf(" ") != -1) var memeName = message.slice(0, message.indexOf(" ")); // get the meme name (if the text fields are not empty)
    
    message = message.slice(message.indexOf(" ")+1); // remove the meme name
    if(memeName === undefined) var memeName = message; // that's in case "m fwp", but messes up "m fwp tere".

    var processedMessage = new Array();
    processedMessage['memeName'] = memeName; 
    processedMessage['message'] = message;
    return processedMessage;
}

function memeIt(data) { //cl(sessionStorage.username);
    
    //console.log(data);
    var message = data.message;
            
    var processedMessage = getMemeName(message);
    message = processedMessage['message'];
    memeName = processedMessage['memeName'];
                                
    var split = message.indexOf("/"); // find the position of "/" mark
    
    var message1 = ''; 
    var message2 = '';
                                    
    if (split === -1) { // not a 2 lined meme
        if(message === memeName) { // not even a 1 lined meme
        } else {
             message1 = message.trim(); // it's a 1 lined meme
        }
    } else { // 2 lined meme
        message1 = message.slice(0, split).trim();
        message2 = message.slice(split+1).trim();
    }
    
    var memeImg = "images/meme/noSuchMeme.gif";
    
    $.each(memes, function(key, value) {
        if(memeName === value.name) {
            memeImg = value.img;
            if(value.message1) message1 = value.message1;
            if(value.message2) message2 = value.message2;
        }
    });

    $("#jetzt").before("<div class='message'><p><canvas id='meme' class='full'></canvas></p></div>");        
    
    var canvas = document.getElementById('meme');
    var context = canvas.getContext('2d');
    
    var imageObj = new Image();
    
    imageObj.onload = function() { 
        var memeWidth = this.width; 
        var memeHeight = this.height;
        canvas.width  = memeWidth;
        canvas.height = memeHeight;
        //context.drawImage(imageObj, 0, 0, memeWidth, memeHeight);
        context.drawImage(imageObj, 0, 0);
        drawText(message1, message2, data.name); // <---- 
        var img    = canvas.toDataURL("image/png");
        $("#jetzt").before('<div class="message"><img src="images/drm.jpg" class="avatar" /><div class="time">'+data.time+'</div><p class="name"><strong>'+data.name+'</strong></p><p><img class="full" src="'+img+'" /></p></div>'); 
        //window.scroll();
    };
    imageObj.src = memeImg;
    
    function drawText( message1, message2, username ){
        message1 = message1.toUpperCase();
        message2 = message2.toUpperCase();
        
        //window.cl(message1.length);
        
        context.font = '40px Impact';
        context.textAlign = 'center';
        context.fillStyle = 'rgba(255, 255, 255, 1)';
        context.lineWidth = 2;
        context.strokeStyle = '#000000';
        
        // cut message1 to multiple lines if it's too long
        if(message1.length < 20) {
            context.fillText(message1, canvas.width/2, 55);            
            context.strokeText(message1, canvas.width/2, 55);
        }
        else if(message1.length > 20 && message1.length < 40) {
            var m1cut1= message1.lastIndexOf(' ',20);
            var m1line1 = message1.substring(0, m1cut1);
            var m1line2 = message1.substring(m1cut1);
            context.fillText(m1line1, canvas.width/2, 55);            
            context.strokeText(m1line1, canvas.width/2, 55);
            context.fillText(m1line2, canvas.width/2, 105);            
            context.strokeText(m1line2, canvas.width/2, 105);
        }
        else {
            var m1cut1= message1.lastIndexOf(' ',20);
            var m1cut2= message1.lastIndexOf(' ',40);
            var m1line1 = message1.substring(0, m1cut1);
            var m1line2 = message1.substring(m1cut1, m1cut2);
            var m1line3 = message1.substring(m1cut2);
            context.fillText(m1line1, canvas.width/2, 55);            
            context.strokeText(m1line1, canvas.width/2, 55);
            context.fillText(m1line2, canvas.width/2, 105);            
            context.strokeText(m1line2, canvas.width/2, 105);
            context.fillText(m1line3, canvas.width/2, 155);            
            context.strokeText(m1line3, canvas.width/2, 155);
        }

        // cut message 2 to multiple lines if it's too long
        if(message2.length < 20) {
            context.fillText(message2, canvas.width/2, canvas.height-25);            
            context.strokeText(message2, canvas.width/2, canvas.height-25);
        }
        else if(message2.length > 20 && message2.length < 40) {
            var m2cut1= message2.lastIndexOf(' ',20);
            var m2line1 = message2.substring(0, m2cut1);
            var m2line2 = message2.substring(m2cut1);
            context.fillText(m2line1, canvas.width/2, canvas.height-75);            
            context.strokeText(m2line1, canvas.width/2, canvas.height-75);
            context.fillText(m2line2, canvas.width/2, canvas.height-25);            
            context.strokeText(m2line2, canvas.width/2, canvas.height-25);
        }
        else {
            var m2cut1= message2.lastIndexOf(' ',20);
            var m2cut2= message2.lastIndexOf(' ',40);
            var m2line1 = message2.substring(0, m2cut1);
            var m2line2 = message2.substring(m2cut1, m2cut2);
            var m2line3 = message2.substring(m2cut2);
            context.fillText(m2line1, canvas.width/2, canvas.height-125);            
            context.strokeText(m2line1, canvas.width/2, canvas.height-125);
            context.fillText(m2line2, canvas.width/2, canvas.height-75);            
            context.strokeText(m2line2, canvas.width/2, canvas.height-75);
            context.fillText(m2line3, canvas.width/2, canvas.height-25);            
            context.strokeText(m2line3, canvas.width/2, canvas.height-25);
        }
        
        //window.scroll();
    }    
}    


