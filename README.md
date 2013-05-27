WAS IST DAS?
-------------

An idea to combine:
+ command line (telnet talker) interface
+ Node.js
+ HTML5

The code that you are seeing is just a mockup of the real thing.

CURRENT STATUS
-------------

This mockup can pretend to work with these commands:
+ .w - who - who is in the chatroom
+ .h - help - help
+ .c - che cazzo - curse in italian

Try it out www.451.ee/t

With very little HTML+CSS it's already usable on mobile + bigger screens.


FIRST VERSION
-------------

In case we should build it then the first version ought to be very basic, 
but doing those basic things very good.

Users:
Ability to log in and out. 
Twitter+FB+??? connect.
Name, profile pic. 
Perhaps some profile info, just text is fine.
Administration+moderation are out of scope for the first version.

Rooms:
Room has a name (& perhaps a topic).
Ability to create private & public rooms for everyone. 
Public room can be accessed by everyone. 
First creator of a private room can decide, which users can access the room.

Communication: 
3 basic ways for communication:
Just chatting = everyone in the same room gets your messages.
.t = .tell <user> <message> - send a private message.
.e = .emote would also be nice.

WHY? 
----
+ I think the text based user interface deserves another go.
+ "Rooms" could be used for group chatting.
+ I started talking with two friends from a telnet talker I used to visit more than 10 years ago and it felt good to talk with them.

FURTHER READING:
--------------
The closest thing to a Node.js talker I could find was this: 
https://github.com/anm/Node-Talker
