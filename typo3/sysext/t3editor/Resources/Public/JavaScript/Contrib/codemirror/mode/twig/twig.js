!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror"),require("../../addon/mode/multiplex")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../../addon/mode/multiplex"],e):e(CodeMirror)}((function(e){"use strict";e.defineMode("twig:inner",(function(){var e=["and","as","autoescape","endautoescape","block","do","endblock","else","elseif","extends","for","endfor","embed","endembed","filter","endfilter","flush","from","if","endif","in","is","include","import","not","or","set","spaceless","endspaceless","with","endwith","trans","endtrans","blocktrans","endblocktrans","macro","endmacro","use","verbatim","endverbatim"],t=/^[+\-*&%=<>!?|~^]/,n=/^[:\[\(\{]/,i=["true","false","null","empty","defined","divisibleby","divisible by","even","odd","iterable","sameas","same as"],r=/^(\d[+\-\*\/])?\d+(\.\d+)?/;return e=new RegExp("(("+e.join(")|(")+"))\\b"),i=new RegExp("(("+i.join(")|(")+"))\\b"),{startState:function(){return{}},token:function(o,a){return function(o,a){var d=o.peek();if(a.incomment)return o.skipTo("#}")?(o.eatWhile(/\#|}/),a.incomment=!1):o.skipToEnd(),"comment";if(a.intag){if(a.operator){if(a.operator=!1,o.match(i))return"atom";if(o.match(r))return"number"}if(a.sign){if(a.sign=!1,o.match(i))return"atom";if(o.match(r))return"number"}if(a.instring)return d==a.instring&&(a.instring=!1),o.next(),"string";if("'"==d||'"'==d)return a.instring=d,o.next(),"string";if(o.match(a.intag+"}")||o.eat("-")&&o.match(a.intag+"}"))return a.intag=!1,"tag";if(o.match(t))return a.operator=!0,"operator";if(o.match(n))a.sign=!0;else if(o.eat(" ")||o.sol()){if(o.match(e))return"keyword";if(o.match(i))return"atom";if(o.match(r))return"number";o.sol()&&o.next()}else o.next();return"variable"}if(o.eat("{")){if(o.eat("#"))return a.incomment=!0,o.skipTo("#}")?(o.eatWhile(/\#|}/),a.incomment=!1):o.skipToEnd(),"comment";if(d=o.eat(/\{|%/))return a.intag=d,"{"==d&&(a.intag="}"),o.eat("-"),"tag"}o.next()}(o,a)}}})),e.defineMode("twig",(function(t,n){var i=e.getMode(t,"twig:inner");return n&&n.base?e.multiplexingMode(e.getMode(t,n.base),{open:/\{[{#%]/,close:/[}#%]\}/,mode:i,parseDelimiters:!0}):i})),e.defineMIME("text/x-twig","twig")}));