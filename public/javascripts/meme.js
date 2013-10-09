
//Memeing goes here
function memeIt(message, data) { //cl(sessionStorage.username);
            
    message = message.slice(2); // remove "m " from beginning
    if(message.indexOf(" ") != -1) var memeName = message.slice(0, message.indexOf(" ")); // get the meme name (if the text fields are not empty)
    
    message = message.slice(message.indexOf(" ")+1); // remove the meme name
    if(memeName === undefined) var memeName = message; // that's in case "m fwp", but messes up "m fwp tere".
                                
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

    switch (memeName) {
    
        case 'fwp':
            var memeWidth = 510;
            var memeHeight = 338;
            var memeImg = "images/meme/1stwp.jpg";
            var memeFont = '40px Impact';
        break;

        case 'baby':    
            var memeWidth = 570;
            var memeHeight = 379;
            var memeImg = "images/meme/successbaby.jpg";
            var memeFont = '40px Impact';
        break;

        case 'bru':    
            var memeWidth = 640;
            var memeHeight = 480;
            var memeImg = "images/meme/impossibru.jpg";
            var memeFont = '60px Impact';
            if (message2 === '') message2 = "IMPOSSIBRU!";
        break;

        case 'yuno':    
            var memeWidth = 600;
            var memeHeight = 450;
            var memeImg = "images/meme/yuno.gif";
            var memeFont = '40px Impact';
            //if (message1 === '') message1 = "Y U No";
        break;

        case 'goodguy':    
            var memeWidth = 530;
            var memeHeight = 525;
            var memeImg = "images/meme/goodguy.jpg";
            var memeFont = '40px Impact';
        break;

        case 'man':    
            var memeWidth = 430;
            var memeHeight = 539;
            var memeImg = "images/meme/mostinteresting.jpg";
            var memeFont = '40px Impact';
        break;

        case 'simply':    
            var memeWidth = 568;
            var memeHeight = 335;
            var memeImg = "images/meme/onedoesnotsimply.jpg";
            var memeFont = '40px Impact';
            if (message1 === '') message1 = "One does not simply";
        break;

        case 'whatif':    
            var memeWidth = 400;
            var memeHeight = 400;
            var memeImg = "images/meme/morpheus.jpg";
            var memeFont = '40px Impact';
            if (message1 === '') message1 = "What if I told you";
        break;

        case 'stacy':    
            var memeWidth = 555;
            var memeHeight = 666;
            var memeImg = "images/meme/stacy.jpg";
            var memeFont = '40px Impact';
        break;

        case 'steve':    
            var memeWidth = 600;
            var memeHeight = 604;
            var memeImg = "images/meme/steve.jpg";
            var memeFont = '40px Impact';
        break;

        case 'gf':    
            var memeWidth = 636;
            var memeHeight = 480;
            var memeImg = "images/meme/overly_attached.jpg";
            var memeFont = '40px Impact';
        break;

        case '451':    
            var memeWidth = 564;
            var memeHeight = 258;
            var memeImg = "images/meme/451.jpg";
            var memeFont = '40px Impact';
        break;

        case 'fuckme':    
            var memeWidth = 500;
            var memeHeight = 321;
            var memeImg = "images/meme/fuckme.jpg";
            var memeFont = '40px Impact';
            if (message2 === '') message2 = "fuck me, right?";
        break;

        case 'fa':    
            var memeWidth = 500;
            var memeHeight = 500;
            var memeImg = "images/meme/fa.jpg";
            var memeFont = '40px Impact';
        break;
            
        case 'nobody':    
            var memeWidth = 500;
            var memeHeight = 321;
            var memeImg = "images/meme/aintnobody.jpg";
            var memeFont = '35px Impact';
            if (message2 === '') message2 = "Ain't nobody got time for that";
        break;
            
        default:
            var memeWidth = 570;
            var memeHeight = 200;
            var memeImg = "images/meme/noSuchMeme.gif";
            var memeFont = '40px Impact';
            message1 = memeName + " ?";
    
    }        
    $("#jetzt").before("<div class='message'><p><canvas id='meme' class='full'></canvas></p></div>");        
    
    var canvas = document.getElementById('meme');
    var context = canvas.getContext('2d');
    
    canvas.width  = memeWidth;
    canvas.height = memeHeight;
    
    var imageObj = new Image();
    
    imageObj.onload = function() {
        context.drawImage(imageObj, 0, 0, memeWidth, memeHeight);
        drawText(message1, message2, data.name); // <---- 
        var img    = canvas.toDataURL("image/png");
        $("#jetzt").before('<div class="message"><img src="images/drm.jpg" id="avatar" /><div id="time">'+data.time+'</div><p id="name"><strong>'+data.name+'</strong></p><p><img class="full" src="'+img+'" /></p></div>');
        scroll();
    };
    imageObj.src = memeImg;
    
    function drawText( message1, message2, username ){
        
        message1 = message1.toUpperCase();
        message2 = message2.toUpperCase();
        context.font = memeFont;
        context.textAlign = 'center';
        context.fillStyle = 'rgba(255, 255, 255, 1)';
        context.lineWidth = 2;
        context.strokeStyle = '#000000';
        //context.fillText(text, canvas.width/2, canvas.height/2);    
        context.fillText(message1, canvas.width/2, 55);            
        context.strokeText(message1, canvas.width/2, 55);            
        context.fillText(message2, canvas.width/2, memeHeight-25);            
        context.strokeText(message2, canvas.width/2, memeHeight-25);  
        if (name != username) document.getElementById('ping1').play();
    }    
}    


