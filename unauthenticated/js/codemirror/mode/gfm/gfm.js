(function(a){if(typeof exports=="object"&&typeof module=="object"){a(require("../../lib/codemirror"),require("../markdown/markdown"),require("../../addon/mode/overlay"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror","../markdown/markdown","../../addon/mode/overlay"],a)}else{a(CodeMirror)}}})(function(b){var a=/^((?:(?:aaas?|about|acap|adiumxtra|af[ps]|aim|apt|attachment|aw|beshare|bitcoin|bolo|callto|cap|chrome(?:-extension)?|cid|coap|com-eventbrite-attendee|content|crid|cvs|data|dav|dict|dlna-(?:playcontainer|playsingle)|dns|doi|dtn|dvb|ed2k|facetime|feed|file|finger|fish|ftp|geo|gg|git|gizmoproject|go|gopher|gtalk|h323|hcp|https?|iax|icap|icon|im|imap|info|ipn|ipp|irc[6s]?|iris(?:\.beep|\.lwz|\.xpc|\.xpcs)?|itms|jar|javascript|jms|keyparc|lastfm|ldaps?|magnet|mailto|maps|market|message|mid|mms|ms-help|msnim|msrps?|mtqp|mumble|mupdate|mvn|news|nfs|nih?|nntp|notes|oid|opaquelocktoken|palm|paparazzi|platform|pop|pres|proxy|psyc|query|res(?:ource)?|rmi|rsync|rtmp|rtsp|secondlife|service|session|sftp|sgn|shttp|sieve|sips?|skype|sm[bs]|snmp|soap\.beeps?|soldat|spotify|ssh|steam|svn|tag|teamspeak|tel(?:net)?|tftp|things|thismessage|tip|tn3270|tv|udp|unreal|urn|ut2004|vemmi|ventrilo|view-source|webcal|wss?|wtai|wyciwyg|xcon(?:-userid)?|xfire|xmlrpc\.beeps?|xmpp|xri|ymsgr|z39\.50[rs]?):(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]|\([^\s()<>]*\))+(?:\([^\s()<>]*\)|[^\s`*!()\[\]{};:'".,<>?«»“”‘’]))/i;b.defineMode("gfm",function(e,i){var d=0;function g(j){j.code=false;return null}var h={startState:function(){return{code:false,codeBlock:false,ateSpace:false}},copyState:function(j){return{code:j.code,codeBlock:j.codeBlock,ateSpace:j.ateSpace}},token:function(l,k){k.combineTokens=null;if(k.codeBlock){if(l.match(/^```+/)){k.codeBlock=false;return null}l.skipToEnd();return null}if(l.sol()){k.code=false}if(l.sol()&&l.match(/^```+/)){l.skipToEnd();k.codeBlock=true;return null}if(l.peek()==="`"){l.next();var j=l.pos;l.eatWhile("`");var m=1+l.pos-j;if(!k.code){d=m;k.code=true}else{if(m===d){k.code=false}}return null}else{if(k.code){l.next();return null}}if(l.eatSpace()){k.ateSpace=true;return null}if(l.sol()||k.ateSpace){k.ateSpace=false;if(i.gitHubSpice!==false){if(l.match(/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+@)?(?:[a-f0-9]{7,40}\b)/)){k.combineTokens=true;return"link"}else{if(l.match(/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+)?#[0-9]+\b/)){k.combineTokens=true;return"link"}}}}if(l.match(a)&&l.string.slice(l.start-2,l.start)!="]("&&(l.start==0||/\W/.test(l.string.charAt(l.start-1)))){k.combineTokens=true;return"link"}l.next();return null},blankLine:g};var f={taskLists:true,fencedCodeBlocks:"```",strikethrough:true};for(var c in i){f[c]=i[c]}f.name="markdown";return b.overlayMode(b.getMode(e,f),h)},"markdown");b.defineMIME("text/x-gfm","gfm")});