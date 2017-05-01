(function(a){if(typeof exports=="object"&&typeof module=="object"){a(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],a)}else{a(CodeMirror)}}})(function(m){m.defineMode("stylus",function(T){var J=T.indentUnit,z=f(k),ae=/^(a|b|i|s|col|em)$/i,y=f(d),ad=f(l),ai=f(g),N=f(c),K=f(h),H=j(h),F=f(p),G=f(b),L=f(o),R=/^\s*([.]{2,3}|&&|\|\||\*\*|[?!=:]?=|[-+*\/%<>]=?|\?:|\~)/,w=j(n),t=f(a),X=new RegExp(/^\-(moz|ms|o|webkit)-/i),O=f(r),E="",Z={},Q,aa,aj,ab;function S(al,ak){E=al.string.match(/(^[\w-]+\s*=\s*$)|(^\s*[\w-]+\s*=\s*[\w-])|(^\s*(\.|#|@|\$|\&|\[|\d|\+|::?|\{|\>|~|\/)?\s*[\w-]*([a-z0-9-]|\*|\/\*)(\(|,)?)/);ak.context.line.firstWord=E?E[0].replace(/^\s*/,""):"";ak.context.line.indent=al.indentation();Q=al.peek();if(al.match("//")){al.skipToEnd();return["comment","comment"]}if(al.match("/*")){ak.tokenize=M;return M(al,ak)}if(Q=='"'||Q=="'"){al.next();ak.tokenize=B(Q);return ak.tokenize(al,ak)}if(Q=="@"){al.next();al.eatWhile(/[\w\\-]/);return["def",al.current()]}if(Q=="#"){al.next();if(al.match(/^[0-9a-f]{6}|[0-9a-f]{3}/i)){return["atom","atom"]}if(al.match(/^[a-z][\w-]*/i)){return["builtin","hash"]}}if(al.match(X)){return["meta","vendor-prefixes"]}if(al.match(/^-?[0-9]?\.?[0-9]/)){al.eatWhile(/[a-z%]/i);return["number","unit"]}if(Q=="!"){al.next();return[al.match(/^(important|optional)/i)?"keyword":"operator","important"]}if(Q=="."&&al.match(/^\.[a-z][\w-]*/i)){return["qualifier","qualifier"]}if(al.match(H)){if(al.peek()=="("){ak.tokenize=u}return["property","word"]}if(al.match(/^[a-z][\w-]*\(/i)){al.backUp(1);return["keyword","mixin"]}if(al.match(/^(\+|-)[a-z][\w-]*\(/i)){al.backUp(1);return["keyword","block-mixin"]}if(al.string.match(/^\s*&/)&&al.match(/^[-_]+[a-z][\w-]*/)){return["qualifier","qualifier"]}if(al.match(/^(\/|&)(-|_|:|\.|#|[a-z])/)){al.backUp(1);return["variable-3","reference"]}if(al.match(/^&{1}\s*$/)){return["variable-3","reference"]}if(al.match(w)){return["operator","operator"]}if(al.match(/^\$?[-_]*[a-z0-9]+[\w-]*/i)){if(al.match(/^(\.|\[)[\w-\'\"\]]+/i,false)){if(!v(al.current())){al.match(/\./);return["variable-2","variable-name"]}}return["variable-2","word"]}if(al.match(R)){return["operator",al.current()]}if(/[:;,{}\[\]\(\)]/.test(Q)){al.next();return[null,Q]}al.next();return[null,null]}function M(an,am){var ak=false,al;while((al=an.next())!=null){if(ak&&al=="/"){am.tokenize=null;break}ak=(al=="*")}return["comment","comment"]}function B(ak){return function(ao,am){var an=false,al;while((al=ao.next())!=null){if(al==ak&&!an){if(ak==")"){ao.backUp(1)}break}an=!an&&al=="\\"}if(al==ak||!an&&ak!=")"){am.tokenize=null}return["string","string"]}}function u(al,ak){al.next();if(!al.match(/\s*[\"\')]/,false)){ak.tokenize=B(")")}else{ak.tokenize=null}return[null,"("]}function ac(am,ak,an,al){this.type=am;this.indent=ak;this.prev=an;this.line=al||{firstWord:"",indent:0}}function C(am,an,al,ak){ak=ak>=0?ak:J;am.context=new ac(al,an.indentation()+ak,am.context);return al}function A(al,am){var ak=al.context.indent-J;am=am||false;al.context=al.context.prev;if(am){al.context.indent=ak}return al.context.type}function s(ak,am,al){return Z[al.context.type](ak,am,al)}function U(al,an,am,ao){for(var ak=ao||1;ak>0;ak--){am.context=am.context.prev}return s(al,an,am)}function v(ak){return ak.toLowerCase() in z}function x(ak){ak=ak.toLowerCase();return ak in y||ak in L}function ag(ak){return ak.toLowerCase() in t}function D(ak){return ak.toLowerCase().match(X)}function I(am){var ak=am.toLowerCase();var al="variable-2";if(v(am)){al="tag"}else{if(ag(am)){al="block-keyword"}else{if(x(am)){al="property"}else{if(ak in ai||ak in O){al="atom"}else{if(ak=="return"||ak in N){al="keyword"}else{if(am.match(/^[A-Z]/)){al="string"}}}}}}return al}function af(ak,al){return((Y(al)&&(ak=="{"||ak=="]"||ak=="hash"||ak=="qualifier"))||ak=="block-mixin")}function V(ak,al){return ak=="{"&&al.match(/^\s*\$?[\w-]+/i,false)}function P(ak,al){return ak==":"&&al.match(/^[a-z-]+/,false)}function W(ak){return ak.sol()||ak.string.match(new RegExp("^\\s*"+e(ak.current())))}function Y(ak){return ak.eol()||ak.match(/^\s*$/,false)}function ah(al){var am=/^\s*[-_]*[a-z0-9]+[\w-]*/i;var ak=typeof al=="string"?al.match(am):al.string.match(am);return ak?ak[0].replace(/^\s*/,""):""}Z.block=function(ak,an,al){if((ak=="comment"&&W(an))||(ak==","&&Y(an))||ak=="mixin"){return C(al,an,"block",0)}if(V(ak,an)){return C(al,an,"interpolation")}if(Y(an)&&ak=="]"){if(!/^\s*(\.|#|:|\[|\*|&)/.test(an.string)&&!v(ah(an))){return C(al,an,"block",0)}}if(af(ak,an,al)){return C(al,an,"block")}if(ak=="}"&&Y(an)){return C(al,an,"block",0)}if(ak=="variable-name"){if(an.string.match(/^\s?\$[\w-\.\[\]\'\"]+$/)||ag(ah(an))){return C(al,an,"variableName")}else{return C(al,an,"variableName",0)}}if(ak=="="){if(!Y(an)&&!ag(ah(an))){return C(al,an,"block",0)}return C(al,an,"block")}if(ak=="*"){if(Y(an)||an.match(/\s*(,|\.|#|\[|:|{)/,false)){ab="tag";return C(al,an,"block")}}if(P(ak,an)){return C(al,an,"pseudo")}if(/@(font-face|media|supports|(-moz-)?document)/.test(ak)){return C(al,an,Y(an)?"block":"atBlock")}if(/@(-(moz|ms|o|webkit)-)?keyframes$/.test(ak)){return C(al,an,"keyframes")}if(/@extends?/.test(ak)){return C(al,an,"extend",0)}if(ak&&ak.charAt(0)=="@"){if(an.indentation()>0&&x(an.current().slice(1))){ab="variable-2";return"block"}if(/(@import|@require|@charset)/.test(ak)){return C(al,an,"block",0)}return C(al,an,"block")}if(ak=="reference"&&Y(an)){return C(al,an,"block")}if(ak=="("){return C(al,an,"parens")}if(ak=="vendor-prefixes"){return C(al,an,"vendorPrefixes")}if(ak=="word"){var am=an.current();ab=I(am);if(ab=="property"){if(W(an)){return C(al,an,"block",0)}else{ab="atom";return"block"}}if(ab=="tag"){if(/embed|menu|pre|progress|sub|table/.test(am)){if(x(ah(an))){ab="atom";return"block"}}if(an.string.match(new RegExp("\\[\\s*"+am+"|"+am+"\\s*\\]"))){ab="atom";return"block"}if(ae.test(am)){if((W(an)&&an.string.match(/=/))||(!W(an)&&!an.string.match(/^(\s*\.|#|\&|\[|\/|>|\*)/)&&!v(ah(an)))){ab="variable-2";if(ag(ah(an))){return"block"}return C(al,an,"block",0)}}if(Y(an)){return C(al,an,"block")}}if(ab=="block-keyword"){ab="keyword";if(an.current(/(if|unless)/)&&!W(an)){return"block"}return C(al,an,"block")}if(am=="return"){return C(al,an,"block",0)}if(ab=="variable-2"&&an.string.match(/^\s?\$[\w-\.\[\]\'\"]+$/)){return C(al,an,"block")}}return al.context.type};Z.parens=function(ak,an,al){if(ak=="("){return C(al,an,"parens")}if(ak==")"){if(al.context.prev.type=="parens"){return A(al)}if((an.string.match(/^[a-z][\w-]*\(/i)&&Y(an))||ag(ah(an))||/(\.|#|:|\[|\*|&|>|~|\+|\/)/.test(ah(an))||(!an.string.match(/^-?[a-z][\w-\.\[\]\'\"]*\s*=/)&&v(ah(an)))){return C(al,an,"block")}if(an.string.match(/^[\$-]?[a-z][\w-\.\[\]\'\"]*\s*=/)||an.string.match(/^\s*(\(|\)|[0-9])/)||an.string.match(/^\s+[a-z][\w-]*\(/i)||an.string.match(/^\s+[\$-]?[a-z]/i)){return C(al,an,"block",0)}if(Y(an)){return C(al,an,"block")}else{return C(al,an,"block",0)}}if(ak&&ak.charAt(0)=="@"&&x(an.current().slice(1))){ab="variable-2"}if(ak=="word"){var am=an.current();ab=I(am);if(ab=="tag"&&ae.test(am)){ab="variable-2"}if(ab=="property"||am=="to"){ab="atom"}}if(ak=="variable-name"){return C(al,an,"variableName")}if(P(ak,an)){return C(al,an,"pseudo")}return al.context.type};Z.vendorPrefixes=function(ak,am,al){if(ak=="word"){ab="property";return C(al,am,"block",0)}return A(al)};Z.pseudo=function(ak,am,al){if(!x(ah(am.string))){am.match(/^[a-z-]+/);ab="variable-3";if(Y(am)){return C(al,am,"block")}return A(al)}return U(ak,am,al)};Z.atBlock=function(ak,an,al){if(ak=="("){return C(al,an,"atBlock_parens")}if(af(ak,an,al)){return C(al,an,"block")}if(V(ak,an)){return C(al,an,"interpolation")}if(ak=="word"){var am=an.current().toLowerCase();if(/^(only|not|and|or)$/.test(am)){ab="keyword"}else{if(K.hasOwnProperty(am)){ab="tag"}else{if(G.hasOwnProperty(am)){ab="attribute"}else{if(F.hasOwnProperty(am)){ab="property"}else{if(ad.hasOwnProperty(am)){ab="string-2"}else{ab=I(an.current())}}}}}if(ab=="tag"&&Y(an)){return C(al,an,"block")}}if(ak=="operator"&&/^(not|and|or)$/.test(an.current())){ab="keyword"}return al.context.type};Z.atBlock_parens=function(ak,an,al){if(ak=="{"||ak=="}"){return al.context.type}if(ak==")"){if(Y(an)){return C(al,an,"block")}else{return C(al,an,"atBlock")}}if(ak=="word"){var am=an.current().toLowerCase();ab=I(am);if(/^(max|min)/.test(am)){ab="property"}if(ab=="tag"){ae.test(am)?ab="variable-2":ab="atom"}return al.context.type}return Z.atBlock(ak,an,al)};Z.keyframes=function(ak,am,al){if(am.indentation()=="0"&&((ak=="}"&&W(am))||ak=="]"||ak=="hash"||ak=="qualifier"||v(am.current()))){return U(ak,am,al)}if(ak=="{"){return C(al,am,"keyframes")}if(ak=="}"){if(W(am)){return A(al,true)}else{return C(al,am,"keyframes")}}if(ak=="unit"&&/^[0-9]+\%$/.test(am.current())){return C(al,am,"keyframes")}if(ak=="word"){ab=I(am.current());if(ab=="block-keyword"){ab="keyword";return C(al,am,"keyframes")}}if(/@(font-face|media|supports|(-moz-)?document)/.test(ak)){return C(al,am,Y(am)?"block":"atBlock")}if(ak=="mixin"){return C(al,am,"block",0)}return al.context.type};Z.interpolation=function(ak,am,al){if(ak=="{"){A(al)&&C(al,am,"block")}if(ak=="}"){if(am.string.match(/^\s*(\.|#|:|\[|\*|&|>|~|\+|\/)/i)||(am.string.match(/^\s*[a-z]/i)&&v(ah(am)))){return C(al,am,"block")}if(!am.string.match(/^(\{|\s*\&)/)||am.match(/\s*[\w-]/,false)){return C(al,am,"block",0)}return C(al,am,"block")}if(ak=="variable-name"){return C(al,am,"variableName",0)}if(ak=="word"){ab=I(am.current());if(ab=="tag"){ab="atom"}}return al.context.type};Z.extend=function(ak,am,al){if(ak=="["||ak=="="){return"extend"}if(ak=="]"){return A(al)}if(ak=="word"){ab=I(am.current());return"extend"}return A(al)};Z.variableName=function(ak,am,al){if(ak=="string"||ak=="["||ak=="]"||am.current().match(/^(\.|\$)/)){if(am.current().match(/^\.[\w-]+/i)){ab="variable-2"}return"variableName"}return U(ak,am,al)};return{startState:function(ak){return{tokenize:null,state:"block",context:new ac("block",ak||0,null)}},token:function(al,ak){if(!ak.tokenize&&al.eatSpace()){return null}aa=(ak.tokenize||S)(al,ak);if(aa&&typeof aa=="object"){aj=aa[1];aa=aa[0]}ab=aa;ak.state=Z[ak.state](aj,al,ak);return ab},indent:function(al,aq,au){var ao=al.context,ak=aq&&aq.charAt(0),an=ao.indent,ap=ah(aq),am=au.length-au.replace(/^\s*/,"").length,ar=al.context.prev?al.context.prev.line.firstWord:"",at=al.context.prev?al.context.prev.line.indent:am;if(ao.prev&&(ak=="}"&&(ao.type=="block"||ao.type=="atBlock"||ao.type=="keyframes")||ak==")"&&(ao.type=="parens"||ao.type=="atBlock_parens")||ak=="{"&&(ao.type=="at"))){an=ao.indent-J;ao=ao.prev}else{if(!(/(\})/.test(ak))){if(/@|\$|\d/.test(ak)||/^\{/.test(aq)||/^\s*\/(\/|\*)/.test(aq)||/^\s*\/\*/.test(ar)||/^\s*[\w-\.\[\]\'\"]+\s*(\?|:|\+)?=/i.test(aq)||/^(\+|-)?[a-z][\w-]*\(/i.test(aq)||/^return/.test(aq)||ag(ap)){an=am}else{if(/(\.|#|:|\[|\*|&|>|~|\+|\/)/.test(ak)||v(ap)){if(/\,\s*$/.test(ar)){an=at}else{if(/^\s+/.test(au)&&(/(\.|#|:|\[|\*|&|>|~|\+|\/)/.test(ar)||v(ar))){an=am<=at?at:at+J}else{an=am}}}else{if(!/,\s*$/.test(au)&&(D(ap)||x(ap))){if(ag(ar)){an=am<=at?at:at+J}else{if(/^\{/.test(ar)){an=am<=at?am:at+J}else{if(D(ar)||x(ar)){an=am>=at?at:am}else{if(/^(\.|#|:|\[|\*|&|@|\+|\-|>|~|\/)/.test(ar)||/=\s*$/.test(ar)||v(ar)||/^\$[\w-\.\[\]\'\"]/.test(ar)){an=at+J}else{an=am}}}}}}}}}return an},electricChars:"}",lineComment:"//",fold:"indent"}});var k=["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","bgsound","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","nobr","noframes","noscript","object","ol","optgroup","option","output","p","param","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","var","video"];var h=["domain","regexp","url","url-prefix"];var b=["all","aural","braille","handheld","print","projection","screen","tty","tv","embossed"];var p=["width","min-width","max-width","height","min-height","max-height","device-width","min-device-width","max-device-width","device-height","min-device-height","max-device-height","aspect-ratio","min-aspect-ratio","max-aspect-ratio","device-aspect-ratio","min-device-aspect-ratio","max-device-aspect-ratio","color","min-color","max-color","color-index","min-color-index","max-color-index","monochrome","min-monochrome","max-monochrome","resolution","min-resolution","max-resolution","scan","grid"];var d=["align-content","align-items","align-self","alignment-adjust","alignment-baseline","anchor-point","animation","animation-delay","animation-direction","animation-duration","animation-fill-mode","animation-iteration-count","animation-name","animation-play-state","animation-timing-function","appearance","azimuth","backface-visibility","background","background-attachment","background-clip","background-color","background-image","background-origin","background-position","background-repeat","background-size","baseline-shift","binding","bleed","bookmark-label","bookmark-level","bookmark-state","bookmark-target","border","border-bottom","border-bottom-color","border-bottom-left-radius","border-bottom-right-radius","border-bottom-style","border-bottom-width","border-collapse","border-color","border-image","border-image-outset","border-image-repeat","border-image-slice","border-image-source","border-image-width","border-left","border-left-color","border-left-style","border-left-width","border-radius","border-right","border-right-color","border-right-style","border-right-width","border-spacing","border-style","border-top","border-top-color","border-top-left-radius","border-top-right-radius","border-top-style","border-top-width","border-width","bottom","box-decoration-break","box-shadow","box-sizing","break-after","break-before","break-inside","caption-side","clear","clip","color","color-profile","column-count","column-fill","column-gap","column-rule","column-rule-color","column-rule-style","column-rule-width","column-span","column-width","columns","content","counter-increment","counter-reset","crop","cue","cue-after","cue-before","cursor","direction","display","dominant-baseline","drop-initial-after-adjust","drop-initial-after-align","drop-initial-before-adjust","drop-initial-before-align","drop-initial-size","drop-initial-value","elevation","empty-cells","fit","fit-position","flex","flex-basis","flex-direction","flex-flow","flex-grow","flex-shrink","flex-wrap","float","float-offset","flow-from","flow-into","font","font-feature-settings","font-family","font-kerning","font-language-override","font-size","font-size-adjust","font-stretch","font-style","font-synthesis","font-variant","font-variant-alternates","font-variant-caps","font-variant-east-asian","font-variant-ligatures","font-variant-numeric","font-variant-position","font-weight","grid","grid-area","grid-auto-columns","grid-auto-flow","grid-auto-position","grid-auto-rows","grid-column","grid-column-end","grid-column-start","grid-row","grid-row-end","grid-row-start","grid-template","grid-template-areas","grid-template-columns","grid-template-rows","hanging-punctuation","height","hyphens","icon","image-orientation","image-rendering","image-resolution","inline-box-align","justify-content","left","letter-spacing","line-break","line-height","line-stacking","line-stacking-ruby","line-stacking-shift","line-stacking-strategy","list-style","list-style-image","list-style-position","list-style-type","margin","margin-bottom","margin-left","margin-right","margin-top","marker-offset","marks","marquee-direction","marquee-loop","marquee-play-count","marquee-speed","marquee-style","max-height","max-width","min-height","min-width","move-to","nav-down","nav-index","nav-left","nav-right","nav-up","object-fit","object-position","opacity","order","orphans","outline","outline-color","outline-offset","outline-style","outline-width","overflow","overflow-style","overflow-wrap","overflow-x","overflow-y","padding","padding-bottom","padding-left","padding-right","padding-top","page","page-break-after","page-break-before","page-break-inside","page-policy","pause","pause-after","pause-before","perspective","perspective-origin","pitch","pitch-range","play-during","position","presentation-level","punctuation-trim","quotes","region-break-after","region-break-before","region-break-inside","region-fragment","rendering-intent","resize","rest","rest-after","rest-before","richness","right","rotation","rotation-point","ruby-align","ruby-overhang","ruby-position","ruby-span","shape-image-threshold","shape-inside","shape-margin","shape-outside","size","speak","speak-as","speak-header","speak-numeral","speak-punctuation","speech-rate","stress","string-set","tab-size","table-layout","target","target-name","target-new","target-position","text-align","text-align-last","text-decoration","text-decoration-color","text-decoration-line","text-decoration-skip","text-decoration-style","text-emphasis","text-emphasis-color","text-emphasis-position","text-emphasis-style","text-height","text-indent","text-justify","text-outline","text-overflow","text-shadow","text-size-adjust","text-space-collapse","text-transform","text-underline-position","text-wrap","top","transform","transform-origin","transform-style","transition","transition-delay","transition-duration","transition-property","transition-timing-function","unicode-bidi","vertical-align","visibility","voice-balance","voice-duration","voice-family","voice-pitch","voice-range","voice-rate","voice-stress","voice-volume","volume","white-space","widows","width","will-change","word-break","word-spacing","word-wrap","z-index","clip-path","clip-rule","mask","enable-background","filter","flood-color","flood-opacity","lighting-color","stop-color","stop-opacity","pointer-events","color-interpolation","color-interpolation-filters","color-rendering","fill","fill-opacity","fill-rule","image-rendering","marker","marker-end","marker-mid","marker-start","shape-rendering","stroke","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","text-rendering","baseline-shift","dominant-baseline","glyph-orientation-horizontal","glyph-orientation-vertical","text-anchor","writing-mode","font-smoothing","osx-font-smoothing"];var l=["scrollbar-arrow-color","scrollbar-base-color","scrollbar-dark-shadow-color","scrollbar-face-color","scrollbar-highlight-color","scrollbar-shadow-color","scrollbar-3d-light-color","scrollbar-track-color","shape-inside","searchfield-cancel-button","searchfield-decoration","searchfield-results-button","searchfield-results-decoration","zoom"];var o=["font-family","src","unicode-range","font-variant","font-feature-settings","font-stretch","font-weight","font-style"];var c=["aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","grey","green","greenyellow","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgreen","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","rebeccapurple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"];var g=["above","absolute","activeborder","additive","activecaption","afar","after-white-space","ahead","alias","all","all-scroll","alphabetic","alternate","always","amharic","amharic-abegede","antialiased","appworkspace","arabic-indic","armenian","asterisks","attr","auto","avoid","avoid-column","avoid-page","avoid-region","background","backwards","baseline","below","bidi-override","binary","bengali","blink","block","block-axis","bold","bolder","border","border-box","both","bottom","break","break-all","break-word","bullets","button","button-bevel","buttonface","buttonhighlight","buttonshadow","buttontext","calc","cambodian","capitalize","caps-lock-indicator","caption","captiontext","caret","cell","center","checkbox","circle","cjk-decimal","cjk-earthly-branch","cjk-heavenly-stem","cjk-ideographic","clear","clip","close-quote","col-resize","collapse","column","compact","condensed","contain","content","contents","content-box","context-menu","continuous","copy","counter","counters","cover","crop","cross","crosshair","currentcolor","cursive","cyclic","dashed","decimal","decimal-leading-zero","default","default-button","destination-atop","destination-in","destination-out","destination-over","devanagari","disc","discard","disclosure-closed","disclosure-open","document","dot-dash","dot-dot-dash","dotted","double","down","e-resize","ease","ease-in","ease-in-out","ease-out","element","ellipse","ellipsis","embed","end","ethiopic","ethiopic-abegede","ethiopic-abegede-am-et","ethiopic-abegede-gez","ethiopic-abegede-ti-er","ethiopic-abegede-ti-et","ethiopic-halehame-aa-er","ethiopic-halehame-aa-et","ethiopic-halehame-am-et","ethiopic-halehame-gez","ethiopic-halehame-om-et","ethiopic-halehame-sid-et","ethiopic-halehame-so-et","ethiopic-halehame-ti-er","ethiopic-halehame-ti-et","ethiopic-halehame-tig","ethiopic-numeric","ew-resize","expanded","extends","extra-condensed","extra-expanded","fantasy","fast","fill","fixed","flat","flex","footnotes","forwards","from","geometricPrecision","georgian","graytext","groove","gujarati","gurmukhi","hand","hangul","hangul-consonant","hebrew","help","hidden","hide","higher","highlight","highlighttext","hiragana","hiragana-iroha","horizontal","hsl","hsla","icon","ignore","inactiveborder","inactivecaption","inactivecaptiontext","infinite","infobackground","infotext","inherit","initial","inline","inline-axis","inline-block","inline-flex","inline-table","inset","inside","intrinsic","invert","italic","japanese-formal","japanese-informal","justify","kannada","katakana","katakana-iroha","keep-all","khmer","korean-hangul-formal","korean-hanja-formal","korean-hanja-informal","landscape","lao","large","larger","left","level","lighter","line-through","linear","linear-gradient","lines","list-item","listbox","listitem","local","logical","loud","lower","lower-alpha","lower-armenian","lower-greek","lower-hexadecimal","lower-latin","lower-norwegian","lower-roman","lowercase","ltr","malayalam","match","matrix","matrix3d","media-controls-background","media-current-time-display","media-fullscreen-button","media-mute-button","media-play-button","media-return-to-realtime-button","media-rewind-button","media-seek-back-button","media-seek-forward-button","media-slider","media-sliderthumb","media-time-remaining-display","media-volume-slider","media-volume-slider-container","media-volume-sliderthumb","medium","menu","menulist","menulist-button","menulist-text","menulist-textfield","menutext","message-box","middle","min-intrinsic","mix","mongolian","monospace","move","multiple","myanmar","n-resize","narrower","ne-resize","nesw-resize","no-close-quote","no-drop","no-open-quote","no-repeat","none","normal","not-allowed","nowrap","ns-resize","numbers","numeric","nw-resize","nwse-resize","oblique","octal","open-quote","optimizeLegibility","optimizeSpeed","oriya","oromo","outset","outside","outside-shape","overlay","overline","padding","padding-box","painted","page","paused","persian","perspective","plus-darker","plus-lighter","pointer","polygon","portrait","pre","pre-line","pre-wrap","preserve-3d","progress","push-button","radial-gradient","radio","read-only","read-write","read-write-plaintext-only","rectangle","region","relative","repeat","repeating-linear-gradient","repeating-radial-gradient","repeat-x","repeat-y","reset","reverse","rgb","rgba","ridge","right","rotate","rotate3d","rotateX","rotateY","rotateZ","round","row-resize","rtl","run-in","running","s-resize","sans-serif","scale","scale3d","scaleX","scaleY","scaleZ","scroll","scrollbar","scroll-position","se-resize","searchfield","searchfield-cancel-button","searchfield-decoration","searchfield-results-button","searchfield-results-decoration","semi-condensed","semi-expanded","separate","serif","show","sidama","simp-chinese-formal","simp-chinese-informal","single","skew","skewX","skewY","skip-white-space","slide","slider-horizontal","slider-vertical","sliderthumb-horizontal","sliderthumb-vertical","slow","small","small-caps","small-caption","smaller","solid","somali","source-atop","source-in","source-out","source-over","space","spell-out","square","square-button","start","static","status-bar","stretch","stroke","sub","subpixel-antialiased","super","sw-resize","symbolic","symbols","table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row","table-row-group","tamil","telugu","text","text-bottom","text-top","textarea","textfield","thai","thick","thin","threeddarkshadow","threedface","threedhighlight","threedlightshadow","threedshadow","tibetan","tigre","tigrinya-er","tigrinya-er-abegede","tigrinya-et","tigrinya-et-abegede","to","top","trad-chinese-formal","trad-chinese-informal","translate","translate3d","translateX","translateY","translateZ","transparent","ultra-condensed","ultra-expanded","underline","up","upper-alpha","upper-armenian","upper-greek","upper-hexadecimal","upper-latin","upper-norwegian","upper-roman","uppercase","urdu","url","var","vertical","vertical-text","visible","visibleFill","visiblePainted","visibleStroke","visual","w-resize","wait","wave","wider","window","windowframe","windowtext","words","x-large","x-small","xor","xx-large","xx-small","bicubic","optimizespeed","grayscale","row","row-reverse","wrap","wrap-reverse","column-reverse","flex-start","flex-end","space-between","space-around","unset"];var n=["in","and","or","not","is not","is a","is","isnt","defined","if unless"],a=["for","if","else","unless","from","to"],r=["null","true","false","href","title","type","not-allowed","readonly","disabled"],q=["@font-face","@keyframes","@media","@viewport","@page","@host","@supports","@block","@css"];var i=k.concat(h,b,p,d,l,c,g,o,n,a,r,q);function j(s){s=s.sort(function(u,t){return t>u});return new RegExp("^(("+s.join(")|(")+"))\\b")}function f(u){var t={};for(var s=0;s<u.length;++s){t[u[s]]=true}return t}function e(s){return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")}m.registerHelper("hintWords","stylus",i);m.defineMIME("text/x-styl","stylus")});