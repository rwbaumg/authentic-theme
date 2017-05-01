(function(a){if(typeof exports=="object"&&typeof module=="object"){a(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],a)}else{a(CodeMirror)}}})(function(a){a.defineMode("haskell",function(k,r){function l(t,u,s){u(s);return s(t,u)}var e=/[a-z_]/;var p=/[A-Z]/;var m=/\d/;var d=/[0-9A-Fa-f]/;var q=/[0-7]/;var o=/[a-z_A-Z0-9'\xa1-\uffff]/;var n=/[-!#$%&*+.\/<=>?@\\^|~:]/;var f=/[(),;[\]`{}]/;var h=/[ \t\v\f]/;function i(v,w){if(v.eatWhile(h)){return null}var u=v.next();if(f.test(u)){if(u=="{"&&v.eat("-")){var s="comment";if(v.eat("#")){s="meta"}return l(v,w,j(s,1))}return null}if(u=="'"){if(v.eat("\\")){v.next()}else{v.next()}if(v.eat("'")){return"string"}return"string error"}if(u=='"'){return l(v,w,g)}if(p.test(u)){v.eatWhile(o);if(v.eat(".")){return"qualifier"}return"variable-2"}if(e.test(u)){v.eatWhile(o);return"variable"}if(m.test(u)){if(u=="0"){if(v.eat(/[xX]/)){v.eatWhile(d);return"integer"}if(v.eat(/[oO]/)){v.eatWhile(q);return"number"}}v.eatWhile(m);var s="number";if(v.match(/^\.\d+/)){s="number"}if(v.eat(/[eE]/)){s="number";v.eat(/[-+]/);v.eatWhile(m)}return s}if(u=="."&&v.eat(".")){return"keyword"}if(n.test(u)){if(u=="-"&&v.eat(/-/)){v.eatWhile(/-/);if(!v.eat(n)){v.skipToEnd();return"comment"}}var s="variable";if(u==":"){s="variable-2"}v.eatWhile(n);return s}return"error"}function j(s,t){if(t==0){return i}return function(w,x){var u=t;while(!w.eol()){var v=w.next();if(v=="{"&&w.eat("-")){++u}else{if(v=="-"&&w.eat("}")){--u;if(u==0){x(i);return s}}}}x(j(s,u));return s}}function g(t,u){while(!t.eol()){var s=t.next();if(s=='"'){u(i);return"string"}if(s=="\\"){if(t.eol()||t.eat(h)){u(c);return"string"}if(t.eat("&")){}else{t.next()}}}u(i);return"string error"}function c(s,t){if(s.eat("\\")){return l(s,t,g)}s.next();t(i);return"error"}var b=(function(){var s={};function v(w){return function(){for(var x=0;x<arguments.length;x++){s[arguments[x]]=w}}}v("keyword")("case","class","data","default","deriving","do","else","foreign","if","import","in","infix","infixl","infixr","instance","let","module","newtype","of","then","type","where","_");v("keyword")("..",":","::","=","\\","<-","->","@","~","=>");v("builtin")("!!","$!","$","&&","+","++","-",".","/","/=","<","<=","=<<","==",">",">=",">>",">>=","^","^^","||","*","**");v("builtin")("Bool","Bounded","Char","Double","EQ","Either","Enum","Eq","False","FilePath","Float","Floating","Fractional","Functor","GT","IO","IOError","Int","Integer","Integral","Just","LT","Left","Maybe","Monad","Nothing","Num","Ord","Ordering","Rational","Read","ReadS","Real","RealFloat","RealFrac","Right","Show","ShowS","String","True");v("builtin")("abs","acos","acosh","all","and","any","appendFile","asTypeOf","asin","asinh","atan","atan2","atanh","break","catch","ceiling","compare","concat","concatMap","const","cos","cosh","curry","cycle","decodeFloat","div","divMod","drop","dropWhile","either","elem","encodeFloat","enumFrom","enumFromThen","enumFromThenTo","enumFromTo","error","even","exp","exponent","fail","filter","flip","floatDigits","floatRadix","floatRange","floor","fmap","foldl","foldl1","foldr","foldr1","fromEnum","fromInteger","fromIntegral","fromRational","fst","gcd","getChar","getContents","getLine","head","id","init","interact","ioError","isDenormalized","isIEEE","isInfinite","isNaN","isNegativeZero","iterate","last","lcm","length","lex","lines","log","logBase","lookup","map","mapM","mapM_","max","maxBound","maximum","maybe","min","minBound","minimum","mod","negate","not","notElem","null","odd","or","otherwise","pi","pred","print","product","properFraction","putChar","putStr","putStrLn","quot","quotRem","read","readFile","readIO","readList","readLn","readParen","reads","readsPrec","realToFrac","recip","rem","repeat","replicate","return","reverse","round","scaleFloat","scanl","scanl1","scanr","scanr1","seq","sequence","sequence_","show","showChar","showList","showParen","showString","shows","showsPrec","significand","signum","sin","sinh","snd","span","splitAt","sqrt","subtract","succ","sum","tail","take","takeWhile","tan","tanh","toEnum","toInteger","toRational","truncate","uncurry","undefined","unlines","until","unwords","unzip","unzip3","userError","words","writeFile","zip","zip3","zipWith","zipWith3");var t=r.overrideKeywords;if(t){for(var u in t){if(t.hasOwnProperty(u)){s[u]=t[u]}}}return s})();return{startState:function(){return{f:i}},copyState:function(t){return{f:t.f}},token:function(x,v){var u=v.f(x,function(t){v.f=t});var s=x.current();return b.hasOwnProperty(s)?b[s]:u},blockCommentStart:"{-",blockCommentEnd:"-}",lineComment:"--"}});a.defineMIME("text/x-haskell","haskell")});