(function(a){if(typeof exports=="object"&&typeof module=="object"){a(require("../../lib/codemirror"),require("../clike/clike"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror","../clike/clike"],a)}else{a(CodeMirror)}}})(function(c){var d=("this super static final const abstract class extends external factory implements get native operator set typedef with enum throw rethrow assert break case continue default in return new deferred async await try catch finally do else for if switch while import library export part of show hide is").split(" ");var a="try catch finally do else for if switch while".split(" ");var b="true false null".split(" ");var f="void bool num int double dynamic var String".split(" ");function e(j){var h={};for(var g=0;g<j.length;++g){h[j[g]]=true}return h}c.defineMIME("application/dart",{name:"clike",keywords:e(d),multiLineStrings:true,blockKeywords:e(a),builtin:e(f),atoms:e(b),hooks:{"@":function(g){g.eatWhile(/[\w\$_]/);return"meta"}}});c.registerHelper("hintWords","application/dart",d.concat(b).concat(f));c.defineMode("dart",function(g){return c.getMode(g,"application/dart")},"clike")});