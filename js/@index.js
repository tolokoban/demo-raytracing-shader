function addListener(e,n){window.addEventListener?window.addEventListener(e,n,!1):window.attachEvent("on"+e,n)}var require=function(){var e={};return function(n,t){var r;if(t=window["#"+n],"undefined"==typeof t){var o=new Error("Required module is missing: "+n);throw console.error(o.stack),o}if(r=e[n],"undefined"==typeof r){r={exports:{}};var i=r.exports;t(i,r),e[n]=r.exports,r=r.exports}return r}}();addListener("DOMContentLoaded",function(){document.body.parentNode.$data={},APP=require("raygl.main"),setTimeout(function(){"function"==typeof APP.start&&APP.start()})});
window["#$"]=function(n,a){n.config={name:"demo-raytracing-shader",description:"How to fly among hundreds of 3d spheres drawn on a 3D single face with shader.",author:"Tolokoban",version:"0.0.341",major:0,minor:0,revision:341,date:new Date(2016,0,14,15,42,44)};var r=null;n.lang=function(n){return void 0===n&&(n=window.localStorage.getItem("Language"),n||(n=window.navigator.language,n||(n=window.navigator.browserLanguage,n||(n="fr"))),n=n.substr(0,2).toLowerCase()),r=n,window.localStorage.setItem("Language",n),n},n.intl=function(a,r){var o,e,t,i,g,s,l=a[n.lang()],u=r[0];if(!l)return console.error('Missing internationalization for language : "'+n.lang()+'"!'),u;if(o=l[u],!o)return console.error("Missing internationalization ["+n.lang()+']: "'+u+'"!'),u;if(r.length>1){for(e="",g=0,t=0;t<o.length;t++)i=o.charAt(t),"$"===i?(e+=o.substring(g,t),t++,s=o.charCodeAt(t)-48,e+=0>s||s>=r.length?"$"+o.charAt(t):r[s],g=t+1):"\\"===i&&(e+=o.substring(g,t),t++,e+=o.charAt(t),g=t+1);e+=o.substr(g),o=e}return o}};
window["#raygl.main"]=function(t,e){var o=require("webgl.plane"),r={colors:{data:[],width:2048}};window.res=function(t){window.localStorage.setItem("res",t),window.location.reload()};var a=window.localStorage.getItem("res");null==a&&(a=1),a=parseInt(a),isNaN(a)&&(a=1),document.getElementById("res1").removeAttribute("disabled"),document.getElementById("res2").removeAttribute("disabled"),document.getElementById("res4").removeAttribute("disabled"),document.getElementById("res"+a).setAttribute("disabled","true");for(var d=0;d<r.colors.width;d++){var l=Math.floor(256*Math.random()),n=Math.floor(256*Math.random()),s=Math.floor(256*Math.random());r.colors.data.push(l),r.colors.data.push(n),r.colors.data.push(s),r.colors.data.push(127*(1+Math.cos(2*Math.PI*d/r.colors.width)))}var i=new o({texture:r,render:function(t,e){e.X=.013*t,e.Y=.019*t,e.Z=.07*t,e.time=t},resolution:a});i.start()};
window["#webgl.plane"]=function(e,t){"use strict";function r(e,t){var r=e.createShader(e.FRAGMENT_SHADER);if(e.shaderSource(r,t),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS))throw Error("An error occurred compiling the fragment shaders:\n"+e.getShaderInfoLog(r));var i=e.createShader(e.VERTEX_SHADER);if(e.shaderSource(i,"attribute vec3 aVertexPosition;\nvarying lowp vec3 vPoint;\nvoid main(void) {\n  float x = aVertexPosition[0];\n  float y = aVertexPosition[1];\n  if (x > 0.0) {\n    if (y > 0.0) {\n      gl_Position = vec4(1.0, 1.0, 0.0, 1.0);\n    } else {\n      gl_Position = vec4(1.0, -1.0, 0.0, 1.0);\n    }\n  } else {\n    if (y > 0.0) {\n      gl_Position = vec4(-1.0, 1.0, 0.0, 1.0);\n    } else {\n      gl_Position = vec4(-1.0, -1.0, 0.0, 1.0);\n    }\n  }\n  vPoint = aVertexPosition;\n}\n"),e.compileShader(i),!e.getShaderParameter(i,e.COMPILE_STATUS))throw Error("An error occurred compiling the vertex shaders:\n"+e.getShaderInfoLog(i));var a=e.createProgram();if(e.attachShader(a,i),e.attachShader(a,r),e.linkProgram(a),!e.getProgramParameter(a,e.LINK_STATUS))throw Error("Unable to initialize the shader program.");e.useProgram(a);var n=e.getAttribLocation(a,"aVertexPosition");e.enableVertexAttribArray(n),this._shaderProgram=a,this._vertexPositionAttribute=n}function i(e,t,r){var i=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,i);var a=[t/2,-r/2,0,-t/2,-r/2,0,t/2,r/2,0,-t/2,r/2,0];return e.bufferData(e.ARRAY_BUFFER,new Float32Array(a),e.STATIC_DRAW),i}var a=(require("wdg"),function(e){"undefined"==typeof e&&(e={}),"undefined"==typeof e.canvasId&&(e.canvasId="glcanvas"),"undefined"==typeof e.fragmentShaderId&&(e.fragmentShaderId="fragment-shader"),"undefined"==typeof e.uniform&&(e.uniform={}),"undefined"==typeof e.texture&&(e.texture={}),"undefined"==typeof e.resolution&&(e.resolution=2),this._args=e;var t=e.canvasId,a=document.getElementById(t);if(!a)throw Error("Canvas not found with this id: "+t);var n=e.fragmentShaderId,o=document.getElementById(n);if(!o)throw Error("Fragment shader not found with this id: "+t);var d=o.textContent.trim(),s=a.getBoundingClientRect(),f=s.width,u=s.height;a.setAttribute("width",f/e.resolution),a.setAttribute("height",u/e.resolution);var h=a.getContext("webgl")||a.getContext("experimental-webgl");r.call(this,h,d),this._squareVerticesBuffer=i(h,f/e.resolution,u/e.resolution);var g,E,c=0;for(g in e.texture){if(E=e.texture[g],"undefined"==typeof E.data)throw Error('Missing texture attribute "data" for "'+g+'"!');if("undefined"==typeof E.width)throw Error('Missing texture attribute "width" for "'+g+'"!');if(!Array.isArray(E.data))throw Error('Textures must be arrays of Uint8! It is not the case of "'+g+'"!');E.data=new Uint8Array(E.data);var m=h.createTexture();h.bindTexture(h.TEXTURE_2D,m);var _=E.width,l=Math.floor((E.data.length>>2)/_);h.texImage2D(h.TEXTURE_2D,0,h.RGBA,_,l,0,h.RGBA,h.UNSIGNED_BYTE,E.data),h.texParameteri(h.TEXTURE_2D,h.TEXTURE_MAG_FILTER,h.LINEAR),h.texParameteri(h.TEXTURE_2D,h.TEXTURE_MIN_FILTER,h.LINEAR_MIPMAP_NEAREST),h.generateMipmap(h.TEXTURE_2D);var A=h.getUniformLocation(this._shaderProgram,g);h.activeTexture(h.TEXTURE0+c),h.bindTexture(h.TEXTURE_2D,m),h.uniform1i(A,c),c++}this._gl=h,this._started=!1});a.prototype.start=function(){function e(a){r.bindBuffer(r.ARRAY_BUFFER,t._squareVerticesBuffer),r.vertexAttribPointer(t._vertexPositionAttribute,3,r.FLOAT,!1,0,0);var n=t._args.render;"function"==typeof n&&n(a,i);var o,d;for(o in i)d=i[o],r.uniform1f(r.getUniformLocation(t._shaderProgram,o),d);r.drawArrays(r.TRIANGLE_STRIP,0,4),t._started&&window.requestAnimationFrame(e)}var t=this,r=this._gl,i=this._args.uniform;this._started=!0,window.requestAnimationFrame(e)},t.exports=a};
window["#wdg"]=function(t,e){"use strict";function n(t){this.__data={};try{var e;if("undefined"==typeof t&&(t={}),"undefined"!=typeof t.innerHTML&&"undefined"!=typeof t.childNodes&&(t={element:t}),"undefined"==typeof t.tag&&(t.tag="div"),t.element)this.element(t.element);else if("undefined"!=typeof t.id){if(e=window.document.getElementById(t.id),!e)throw Error("Can't find element with id: \""+t.id+'"!');this.element(e)}else this.element(window.document.createElement(t.tag)),this.addClass("wdg","custom")}catch(n){throw console.error("[widget] ",n),console.error("[Widget] ",JSON.stringify(t)),Error(n)}}n.prototype={element:function(t){return void 0===t?this._element:("string"==typeof t&&(t=window.document.querySelector(t)),this._element=t,this)},data:function(t,e){return"undefined"==typeof e?this.__data[t]:(this.__data[t]=e,this)},detach:function(){var t=this._element;if(t){var e=t.parentNode;e&&e.removeChild(t)}return this},addEvent:function(t,e,n){if("string"==typeof e){var i=e;"undefined"==typeof n&&(n=this),e=function(t){var r=n[i];if("function"!=typeof r)throw Error('"'+e+'" is not a function of: '+n);r.call(n,t)}}var r=this.element();return"tap"==t?(r.addEventListener("mousedown",function(t){t.preventDefault(),t.stopPropagation()},!1),r.addEventListener("mouseup",function(t){t.preventDefault(),t.stopPropagation(),e(t)},!1),r.addEventListener("touchend",e,!1)):r.addEventListener(t,e,!1),this},removeAttr:function(){if(this._element){var t,e;for(t=0;t<arguments.length;t++)e=arguments[t],this._element.removeAttribute(e)}return this},hasAttribute:function(t){return this._element?this._element.hasAttribute(t):!1},attr:function(t,e,n){var i;if(!this._element||!this._element.getAttribute)return null;if("string"==typeof t)return void 0!==e?"class"==t?(this._element.className=e,this):(n&&this._element.setAttributeNS?this._element.setAttributeNS(n,t,e):this._element.setAttribute(t,e),this):this._element.getAttribute(t);if("object"==typeof t)for(i in t)"class"==i?this._element.className=t[i]:"$"==i?this.text(t[i]):this._element.setAttribute(i,t[i]);return this},css:function(t,e){var n,i=this._element;if(!i)return null;if("object"!=typeof i.style&&(console.error("[wdg.css] This element does not support styles!",i),i.style={}),"string"==typeof t)return e?(i.style[t]=e,this):i.style[t];if("object"==typeof t)for(n in t)try{i.style[n]=t[n]}catch(r){console.error("[wdg.css] Bad CSS attribute "+n+": "+t[n])}return this},insertAfter:function(t){return"function"==typeof t.element&&(t=t.element()),t.parentNode.insertBefore(this.element(),t.nextSibling),this},insertBefore:function(t){return"function"==typeof t.element&&(t=t.element()),t.parentNode.insertBefore(this.element(),t),this},append:function(){var t,e;for(t=0;t<arguments.length;t++)if(e=arguments[t],"number"==typeof e&&(e=""+e),"undefined"==typeof e||"object"!=typeof e&&"string"!=typeof e)console.error("[Widget.append] Argument #"+t+" is invalid!",arguments),console.error("[Widget.append] Is type is: "+typeof e);else{if("string"==typeof e&&(e.length<1&&(e=" "),e=window.document.createTextNode(e),!e))throw console.error("[Widget.append] Unable to create a text node with this text: ",e),console.error("[wdg] arguments=...",arguments),Error("[Widget.append] Unable to create a text node with this text: "+JSON.stringify(e));if(Array.isArray(e))e.forEach(function(t){this.append(t)},this);else{var n="function"==typeof e.element?e.element():e;this._element.appendChild(n)}}return this},appendTo:function(t){return t?("function"==typeof t.append?t.append(this):"function"==typeof t.appendChild&&(t.appendChild(this._element),this.onAppend()),this):this},appendToBody:function(){return window.document.body.appendChild(this._element),this},hasClass:function(){var t,e,n=this._element.classList;for(t=0;t<arguments.length;t++)if(e=arguments[t],!n.contains(e))return!1;return!0},addClass:function(){var t,e,n=this._element.classList;for(t=0;t<arguments.length;t++)e=arguments[t],"string"==typeof e?(e=e.trim(),e.length>0&&n.add(e)):console.error("[wdg.addClass] Arguments with bad type!",arguments);return this},removeClass:function(){var t,e,n=this._element.classList;for(t=0;t<arguments.length;t++)e=arguments[t],n.remove(e);return this},toggleClass:function(){var t,e,n=this._element.classList;for(t=0;t<arguments.length;t++)e=arguments[t],n.toggle(e);return this},clear:function(){for(var t=this.element();t.firstChild;)t.removeChild(t.firstChild);var e,n;for(e=0;e<arguments.length;e++)n=arguments[e],this.append(n);return this},text:function(t){var e,n,i,r;if("string"==typeof t||"number"==typeof t)return this.clear(),this._element.appendChild(window.document.createTextNode(t)),this;if(e=this._element,void 0!==t&&(e=t),n="",e.childNodes)for(i=0;i<e.childNodes.length;i++)r=e.childNodes[i],3==r.nodeType?r.nodeValue&&(n+=r.nodeValue):n+=this.text(r);return n},html:function(t){return"undefined"==typeof t?this._element.innerHTML:(this._element&&(this._element.innerHTML=t),this)},focus:function(){var t=this._element;return t?("function"==typeof t.focus&&t.focus(),this):this},rect:function(){var t=this._element;return t?t.getBoundingClientRect():null},Tap:function(t,e){if("undefined"==typeof t)return this._Tap;var n=this;return"undefined"==typeof e&&(e=n),"string"==typeof t&&(t=e[t]),this._Tap||this.activatePointerEvents(),this._Tap=[t,e],this}},n.prototype.activatePointerEvents=function(){if(this._pointerEvents)return this;this._pointerEvents={start:0};var t=this._pointerEvents,e=this;return this.addEvent("touchstart",function(e){console.log("touchestart"),e.preventDefault(),e.stopPropagation(),t.touch=1,t.start=Date.now()}),this.addEvent("touchend",function(n){console.log("touchend"),n.preventDefault(),n.stopPropagation();var i=e._Tap;if(i){t.touch=0;var r=Date.now()-t.start;r>50&&i[0].call(i[1],n)}}),this.addEvent("mousedown",function(e){e.preventDefault(),e.stopPropagation(),t.touch||(console.log("mousedown"),t.start=Date.now())}),this.addEvent("mouseup",function(n){n.preventDefault(),n.stopPropagation(),console.log("mouseup");var i=e._Tap;if(i){var r=Date.now()-t.start;r>50&&i[0].call(i[1],n)}}),this},n.prototype.div=function(){for(var t=new n,e=0;e<arguments.length;e++)t.addClass(arguments[e]);return t},n.prototype.tag=function(t){"undefined"==typeof t&&(t="div");for(var e=new n({tag:t}),i=1;i<arguments.length;i++)e.addClass(arguments[i]);return e},n.prototype.isInDOM=function(){return n.isInDOM(this.element())},n.prototype.onAppend=function(){},n.create=function(t){return new n(t)},n.find=function(t){return new n({element:window.document.querySelector(t)})},n.svg=function(t,e){var i="http://www.w3.org/2000/svg";"object"==typeof t&&(e=t,t="svg"),"string"!=typeof t&&(t="svg");var r=window.document.createElementNS(i,t),o=new n({element:r});return"undefined"==typeof e&&(e={}),"svg"==t&&("undefined"==typeof e.version&&(e.version="1.1"),"undefined"==typeof e["xmlns:svg"]&&(e["xmlns:svg"]="http://www.w3.org/2000/svg"),"undefined"==typeof e.xmlns&&(e.xmlns="http://www.w3.org/2000/svg"),"undefined"==typeof e["xmlns:xlink"]&&(e["xmlns:xlink"]="http://www.w3.org/1999/xlink"),"undefined"==typeof e.viewBox&&"number"==typeof e.width&&"number"==typeof e.height&&(e.viewBox="0 0 "+e.width+" "+e.height)),"object"==typeof e&&o.attr(e),o},n.isInDOM=function(t){return t?("function"==typeof t.element&&(t=t.element()),t===window.document?!0:n.isInDOM(t.parentNode)):!1},n.div=function(){for(var t=new n({tag:"div"}),e=0;e<arguments.length;e++)t.addClass(arguments[e]);return t},n.span=function(){for(var t=new n({tag:"span"}),e=0;e<arguments.length;e++)t.addClass(arguments[e]);return t},n.tag=function(t){"undefined"==typeof t&&(t="div");for(var e=new n({tag:t}),i=1;i<arguments.length;i++)e.addClass(arguments[i]);return e},n.id=function(t){return new n({element:window.document.getElementById(t)})},n.body=new n(window.document.body),e.exports=n,"classList"in window.document.createElement("_")?!function(){var t=window.document.createElement("_");if(t.classList.add("c1","c2"),!t.classList.contains("c2")){var e=function(t){var e=DOMTokenList.prototype[t];DOMTokenList.prototype[t]=function(t){var n,i=arguments.length;for(n=0;i>n;n++)t=arguments[n],e.call(this,t)}};e("add"),e("remove")}if(t.classList.toggle("c3",!1),t.classList.contains("c3")){var n=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(t,e){return 1 in arguments&&!this.contains(t)==!e?e:n.call(this,t)}}t=null}():!function(){if("Element"in window){var t="classList",e="prototype",n=window.Element[e],i=Object,r=String.prototype.trim||function(){var t=new RegExp("^\\s+|\\s+$","g");return this.replace(t,"")},o=Array[e].indexOf||function(t){for(var e=0,n=this.length;n>e;e++)if(e in this&&this[e]===t)return e;return-1},s=function(t,e){this.name=t,this.code=DOMException[t],this.message=e},a=function(t,e){if(""===e)throw new s("SYNTAX_ERR","An invalid or illegal string was specified");if(new RegExp("\\s").test(e))throw new s("INVALID_CHARACTER_ERR","String contains an invalid character");return o.call(t,e)},u=function(t){for(var e=r.call(t.getAttribute("class")||""),n=e?e.split(new RegExp("\\s+")):[],i=0,o=n.length;o>i;i++)this.push(n[i]);this._updateClassName=function(){t.setAttribute("class",this.toString())}},l=u[e]=[],d=function(){return new u(this)};if(s[e]=Error[e],l.item=function(t){return this[t]||null},l.contains=function(t){return t+="",-1!==a(this,t)},l.add=function(){var t,e=arguments,n=0,i=e.length,r=!1;do t=e[n]+"",-1===a(this,t)&&(this.push(t),r=!0);while(++n<i);r&&this._updateClassName()},l.remove=function(){var t,e,n=arguments,i=0,r=n.length,o=!1;do for(t=n[i]+"",e=a(this,t);-1!==e;)this.splice(e,1),o=!0,e=a(this,t);while(++i<r);o&&this._updateClassName()},l.toggle=function(t,e){t+="";var n=this.contains(t),i=n?e!==!0&&"remove":e!==!1&&"add";return i&&this[i](t),e===!0||e===!1?e:!n},l.toString=function(){return this.join(" ")},i.defineProperty){var f={get:d,enumerable:!0,configurable:!0};try{i.defineProperty(n,t,f)}catch(h){-2146823252===h.number&&(f.enumerable=!1,i.defineProperty(n,t,f))}}else i[e].__defineGetter__&&n.__defineGetter__(t,d)}}()};
//# sourceMappingURL=map/@index.js.map