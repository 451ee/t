WAS IST DAS?
-------------

An idea to combine:
+ command line (telnet talker) interface
+ Node.js
+ HTML5

The code that you are seeing is a mockup of the idea.

CURRENT STATUS
-------------

This mockup can pretend to work with these commands:
+ .w - who - who is in the chatroom
+ .h - help - help
+ .c - che cazzo - curse in italian

Try it out www.451.ee/t

Usable on all screen sizes.
Little HTML+CSS.

UPDATES
--------

1st of June 2013 - added express. Node.js now used to display statical page. It's something :).

FIRST VERSION
-------------

In case we should build it then the first version ought to be very basic, 
but doing those basic things very good.

Users:
+ Ability to log in and out. 
+ Twitter+FB+??? connect.
+ Name, profile pic. 
+ Perhaps some profile info, just text is fine.
+ Users can change names of other users for their view.
Administration+moderation are out of scope for the first version.

Rooms:
+ Room has a name (& perhaps a topic).
+ Every user can create public rooms.
+ Public room can be accessed by everyone. 
+ Every user can create private rooms for only these people they allow.

Communication: 
+ 3 basic ways for communication:
+ Just chatting = everyone in the same room gets your messages.
+ .t = .tell <user> <message> - send a private message.
+ .e = .emote would also be nice.
+ Hubot http://hubot.github.com

WHY? 
----
+ I think the text based user interface deserves another go.
+ "Rooms" could be used for group chatting.
+ I started talking with two friends from a telnet talker I used to visit more than 10 years ago and it felt good to talk with them.

FURTHER READING:
--------------
The closest thing to a Node.js talker I could find was this: 
https://github.com/anm/Node-Talker
