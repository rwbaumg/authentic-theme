!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";function t(e){for(var t={},n=e.split(","),r=0;r<n.length;++r){var i=n[r].toUpperCase(),o=n[r].charAt(0).toUpperCase()+n[r].slice(1);t[n[r]]=!0,t[i]=!0,t[o]=!0}return t}function n(e){return e.eatWhile(/[\w\$_]/),"meta"}e.defineMode("vhdl",function(e,r){function i(e,t){var n=e.next();if(p[n]){var r=p[n](e,t);if(r!==!1)return r}if('"'==n)return t.tokenize=a(n),t.tokenize(e,t);if("'"==n)return t.tokenize=o(n),t.tokenize(e,t);if(/[\[\]{}\(\),;\:\.]/.test(n))return c=n,null;if(/[\d']/.test(n))return e.eatWhile(/[\w\.']/),"number";if("-"==n&&e.eat("-"))return e.skipToEnd(),"comment";if(g.test(n))return e.eatWhile(g),"operator";e.eatWhile(/[\w\$_]/);var i=e.current();return y.propertyIsEnumerable(i.toLowerCase())?(b.propertyIsEnumerable(i)&&(c="newstatement"),"keyword"):d.propertyIsEnumerable(i)?"atom":"variable"}function o(e){return function(t,n){for(var r,o=!1,a=!1;null!=(r=t.next());){if(r==e&&!o){a=!0;break}o=!o&&"--"==r}return(a||!o&&!m)&&(n.tokenize=i),"string"}}function a(e){return function(t,n){for(var r,o=!1,a=!1;null!=(r=t.next());){if(r==e&&!o){a=!0;break}o=!o&&"--"==r}return(a||!o&&!m)&&(n.tokenize=i),"string-2"}}function l(e,t,n,r,i){this.indented=e,this.column=t,this.type=n,this.align=r,this.prev=i}function u(e,t,n){return e.context=new l(e.indented,t,n,null,e.context)}function s(e){var t=e.context.type;return")"!=t&&"]"!=t&&"}"!=t||(e.indented=e.context.indented),e.context=e.context.prev}var c,f=e.indentUnit,d=r.atoms||t("null"),p=r.hooks||{"`":n,$:n},m=r.multiLineStrings,y=t("abs,access,after,alias,all,and,architecture,array,assert,attribute,begin,block,body,buffer,bus,case,component,configuration,constant,disconnect,downto,else,elsif,end,end block,end case,end component,end for,end generate,end if,end loop,end process,end record,end units,entity,exit,file,for,function,generate,generic,generic map,group,guarded,if,impure,in,inertial,inout,is,label,library,linkage,literal,loop,map,mod,nand,new,next,nor,null,of,on,open,or,others,out,package,package body,port,port map,postponed,procedure,process,pure,range,record,register,reject,rem,report,return,rol,ror,select,severity,signal,sla,sll,sra,srl,subtype,then,to,transport,type,unaffected,units,until,use,variable,wait,when,while,with,xnor,xor"),b=t("architecture,entity,begin,case,port,else,elsif,end,for,function,if"),g=/[&|~><!\)\(*#%@+\/=?\:;}{,\.\^\-\[\]]/;return{startState:function(e){return{tokenize:null,context:new l((e||0)-f,0,"top",!1),indented:0,startOfLine:!0}},token:function(e,t){var n=t.context;if(e.sol()&&(null==n.align&&(n.align=!1),t.indented=e.indentation(),t.startOfLine=!0),e.eatSpace())return null;c=null;var r=(t.tokenize||i)(e,t);if("comment"==r||"meta"==r)return r;if(null==n.align&&(n.align=!0),";"!=c&&":"!=c||"statement"!=n.type)if("{"==c)u(t,e.column(),"}");else if("["==c)u(t,e.column(),"]");else if("("==c)u(t,e.column(),")");else if("}"==c){for(;"statement"==n.type;)n=s(t);for("}"==n.type&&(n=s(t));"statement"==n.type;)n=s(t)}else c==n.type?s(t):("}"==n.type||"top"==n.type||"statement"==n.type&&"newstatement"==c)&&u(t,e.column(),"statement");else s(t);return t.startOfLine=!1,r},indent:function(e,t){if(e.tokenize!=i&&null!=e.tokenize)return 0;var n=t&&t.charAt(0),r=e.context,o=n==r.type;return"statement"==r.type?r.indented+("{"==n?0:f):r.align?r.column+(o?0:1):r.indented+(o?0:f)},electricChars:"{}"}}),e.defineMIME("text/x-vhdl","vhdl")});