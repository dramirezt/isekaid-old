(window.webpackJsonp=window.webpackJsonp||[]).push([[9,6,18],{328:function(e,t,n){var content=n(335);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(79).default)("d52ae0fc",content,!0,{sourceMap:!1})},329:function(e,t,n){"use strict";var r=n(13),c=n(6),o=n(4),l=n(99),f=n(21),d=n(14),m=n(157),v=n(58),x=n(98),h=n(217),y=n(3),O=n(82).f,w=n(53).f,j=n(19).f,E=n(331),N=n(332).trim,I="Number",_=c.Number,C=_.prototype,S=c.TypeError,P=o("".slice),T=o("".charCodeAt),A=function(e){var t=h(e,"number");return"bigint"==typeof t?t:M(t)},M=function(e){var t,n,r,c,o,l,f,code,d=h(e,"number");if(x(d))throw S("Cannot convert a Symbol value to a number");if("string"==typeof d&&d.length>2)if(d=N(d),43===(t=T(d,0))||45===t){if(88===(n=T(d,2))||120===n)return NaN}else if(48===t){switch(T(d,1)){case 66:case 98:r=2,c=49;break;case 79:case 111:r=8,c=55;break;default:return+d}for(l=(o=P(d,2)).length,f=0;f<l;f++)if((code=T(o,f))<48||code>c)return NaN;return parseInt(o,r)}return+d};if(l(I,!_(" 0o1")||!_("0b1")||_("+0x1"))){for(var R,k=function(e){var t=arguments.length<1?0:_(A(e)),n=this;return v(C,n)&&y((function(){E(n)}))?m(Object(t),n,k):t},D=r?O(_):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),F=0;D.length>F;F++)d(_,R=D[F])&&!d(k,R)&&j(k,R,w(_,R));k.prototype=C,C.constructor=k,f(c,I,k,{constructor:!0})}},330:function(e,t,n){"use strict";n.r(t);var r={props:{element:{type:Object,default:null}}},c=(n(334),n(63)),component=Object(c.a)(r,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"flex-inline flex-align-center flex-justify-center element"},[t("div",{staticClass:"flex flex-justify-end w-50"},[t("img",{staticClass:"card-icon",attrs:{src:"icons/"+e.element.icon}})]),e._v(" "),t("div",{staticClass:"flex flex-column w-100 card-data"},[e.element.text?t("div",{staticClass:"flex flex-align-center text-uppercase text-outline card-text",domProps:{innerHTML:e._s(e.element.text)}}):e._e(),e._v(" "),t("div",{staticClass:"flex flex-align-center text-outline card-value",domProps:{innerHTML:e._s(e.element.value)}})])])}),[],!1,null,"07c71276",null);t.default=component.exports},331:function(e,t,n){var r=n(4);e.exports=r(1..valueOf)},332:function(e,t,n){var r=n(4),c=n(37),o=n(15),l=n(333),f=r("".replace),d="["+l+"]",m=RegExp("^"+d+d+"*"),v=RegExp(d+d+"*$"),x=function(e){return function(t){var n=o(c(t));return 1&e&&(n=f(n,m,"")),2&e&&(n=f(n,v,"")),n}};e.exports={start:x(1),end:x(2),trim:x(3)}},333:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},334:function(e,t,n){"use strict";n(328)},335:function(e,t,n){var r=n(78)(!1);r.push([e.i,".element[data-v-07c71276]{min-width:180px;min-height:50px;margin:10px 0;letter-spacing:1.3px}.element .card-icon[data-v-07c71276]{width:50px;height:auto}.element .card-data[data-v-07c71276]{padding-left:15px;font-size:24px;font-weight:700}.element .card-data .card-text[data-v-07c71276]{font-size:10px;letter-spacing:1.3px}.element .card-data .card-text[data-v-07c71276] .icon{width:20px;margin:0 10px}.element .card-data .card-value[data-v-07c71276] span{font-size:16px;margin-left:10px}",""]),e.exports=r},387:function(e,t,n){"use strict";n.r(t);n(36),n(28),n(31),n(12),n(51),n(35),n(52);var r=n(17),c=(n(329),n(80));function o(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function l(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?o(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):o(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var f={props:{active:{type:Boolean,default:!0},character:{type:Object,default:null},maxRowElements:{type:Number,default:3}},computed:l(l({},Object(c.b)(["getCharacterInitiative","getCharacterDefense","getCharacterSpeed","getSavingRollByType"])),{},{elements:function(){return[{text:this.$t("combat.defense"),icon:"combat/defense.png",value:this.getCharacterDefense(this.character)},{text:this.$t("combat.initiative"),icon:"combat/initiative.png",value:this.getCharacterInitiative(this.character)},{text:this.$t("combat.speed"),icon:"combat/speed.png",value:this.getCharacterSpeed(this.character)}]}}),mounted:function(){this.$el.style.maxWidth=180*this.maxRowElements+40+"px"}},d=n(63),component=Object(d.a)(f,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"flex flex-justify-center view-container view-combat",class:[{active:e.active}]},e._l(e.elements,(function(element,e){return t("CharacterSheetElement",{key:"element-"+e,attrs:{element:element}})})),1)}),[],!1,null,"46c5d09c",null);t.default=component.exports;installComponents(component,{CharacterSheetElement:n(330).default})}}]);