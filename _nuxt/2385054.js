(window.webpackJsonp=window.webpackJsonp||[]).push([[11,18],{328:function(e,t,n){var content=n(335);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(79).default)("d52ae0fc",content,!0,{sourceMap:!1})},330:function(e,t,n){"use strict";n.r(t);var c={props:{element:{type:Object,default:null}}},r=(n(334),n(63)),component=Object(r.a)(c,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"flex-inline flex-align-center flex-justify-center element"},[t("div",{staticClass:"flex flex-justify-end w-50"},[t("img",{staticClass:"card-icon",attrs:{src:"icons/"+e.element.icon}})]),e._v(" "),t("div",{staticClass:"flex flex-column w-100 card-data"},[e.element.text?t("div",{staticClass:"flex flex-align-center text-uppercase text-outline card-text",domProps:{innerHTML:e._s(e.element.text)}}):e._e(),e._v(" "),t("div",{staticClass:"flex flex-align-center text-outline card-value",domProps:{innerHTML:e._s(e.element.value)}})])])}),[],!1,null,"07c71276",null);t.default=component.exports},334:function(e,t,n){"use strict";n(328)},335:function(e,t,n){var c=n(78)(!1);c.push([e.i,".element[data-v-07c71276]{min-width:180px;min-height:50px;margin:10px 0;letter-spacing:1.3px}.element .card-icon[data-v-07c71276]{width:50px;height:auto}.element .card-data[data-v-07c71276]{padding-left:15px;font-size:24px;font-weight:700}.element .card-data .card-text[data-v-07c71276]{font-size:10px;letter-spacing:1.3px}.element .card-data .card-text[data-v-07c71276] .icon{width:20px;margin:0 10px}.element .card-data .card-value[data-v-07c71276] span{font-size:16px;margin-left:10px}",""]),e.exports=c},416:function(e,t,n){"use strict";n.r(t);n(36),n(28),n(31),n(12),n(51),n(35),n(52);var c=n(17),r=n(80);function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function o(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(c.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var d={props:{active:{type:Boolean,default:!0},character:{type:Object,default:null}},computed:o(o({},Object(r.b)(["getResistanceByType"])),{},{elements:function(){return[{text:this.$t("damage_types.water"),icon:"damage_types/water.png",value:this.getResistanceByType(this.character,"water")},{text:this.$t("damage_types.fire"),icon:"damage_types/fire.png",value:this.getResistanceByType(this.character,"fire")},{text:this.$t("damage_types.ice"),icon:"damage_types/ice.png",value:this.getResistanceByType(this.character,"ice")},{text:this.$t("damage_types.lightning"),icon:"damage_types/lightning.png",value:this.getResistanceByType(this.character,"lightning")},{text:this.$t("damage_types.earth"),icon:"damage_types/earth.png",value:this.getResistanceByType(this.character,"earth")},{text:this.$t("damage_types.wind"),icon:"damage_types/wind.png",value:this.getResistanceByType(this.character,"wind")},{text:this.$t("damage_types.demonic"),icon:"damage_types/demonic.png",value:this.getResistanceByType(this.character,"demonic")},{text:this.$t("damage_types.magical"),icon:"damage_types/magical.png",value:this.getResistanceByType(this.character,"magical")},{text:this.$t("damage_types.holy"),icon:"damage_types/holy.png",value:this.getResistanceByType(this.character,"holy")}]}})},h=n(63),component=Object(h.a)(d,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"flex flex-justify-center view-container view-combat",class:[{active:e.active}]},e._l(e.elements,(function(element,e){return t("CharacterSheetElement",{key:"element-"+e,attrs:{element:element}})})),1)}),[],!1,null,"a6185b2e",null);t.default=component.exports;installComponents(component,{CharacterSheetElement:n(330).default})}}]);