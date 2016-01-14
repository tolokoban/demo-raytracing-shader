"use strict";
var Widget = require("wdg");

/**
 * @example
 * var Plane = require("webgl.plane");
 * var instance = new Plane();
 * @class Plane
 */
var Plane = function(args) {
  if (typeof args === 'undefined') args = {};
  if (typeof args.canvasId === 'undefined') args.canvasId = "glcanvas";
  if (typeof args.fragmentShaderId === 'undefined') args.fragmentShaderId = "fragment-shader";
  if (typeof args.uniform === 'undefined') args.uniform = {};
  if (typeof args.texture === 'undefined') args.texture = {};
  if (typeof args.resolution === 'undefined') args.resolution = 2;

  this._args = args;

  var canvasId = args.canvasId;
  var canvas = document.getElementById(canvasId);
  if (!canvas) {
    throw Error("Canvas not found with this id: " + canvasId);
  }
  var fragmentShaderId = args.fragmentShaderId;
  var fragmentShaderElement = document.getElementById(fragmentShaderId);
  if (!fragmentShaderElement) {
    throw Error("Fragment shader not found with this id: " + canvasId);
  }
  var fragmentShader = fragmentShaderElement.textContent.trim();
  var rect = canvas.getBoundingClientRect();
  var W = rect.width;
  var H = rect.height;
  canvas.setAttribute("width", W / args.resolution);
  canvas.setAttribute("height", H / args.resolution);
  var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

  initShaders.call(this, gl, fragmentShader);
  this._squareVerticesBuffer = initBuffers(gl, W / args.resolution, H / args.resolution);

  var key, val, texture, textureIndex = 0;
  for (key in args.texture) {
    val = args.texture[key];
    if (typeof val.data === 'undefined') {
      throw Error("Missing texture attribute \"data\" for \"" + key + "\"!");
    }
    if (typeof val.width === 'undefined') {
      throw Error("Missing texture attribute \"width\" for \"" + key + "\"!");
    }

    if (!Array.isArray(val.data)) {
      throw Error("Textures must be arrays of Uint8! It is not the case of \"" + key + "\"!");
    }
    // Make sur data is an array of UNSIGNED_BYTE.
    val.data = new Uint8Array(val.data);
    var tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    var width = val.width;
    var height = Math.floor((val.data.length >> 2) / width);
    gl.texImage2D(
      gl.TEXTURE_2D,     // target
      0,                 // level
      gl.RGBA,           // internal format
      width, height,     // width, height
      0,                 // border
      gl.RGBA,           // format
      gl.UNSIGNED_BYTE,  // type
      val.data           // data
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);
    var location = gl.getUniformLocation(this._shaderProgram, key);
    gl.activeTexture(gl.TEXTURE0 + textureIndex);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.uniform1i(location, textureIndex);
    textureIndex++;
  }

  this._gl = gl;
  this._started = false;
};


/**
 * @return void
 */
Plane.prototype.start = function() {
  var that = this;
  var gl = this._gl;
  var uniform = this._args.uniform;
  this._started = true;

  function render(time) {
    //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.bindBuffer(gl.ARRAY_BUFFER, that._squareVerticesBuffer);
    gl.vertexAttribPointer(that._vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

    var f = that._args.render;
    if (typeof f === 'function') {
      f(time, uniform);
    }

    var key, val;
    for (key in uniform) {
      val = uniform[key];
      gl.uniform1f(gl.getUniformLocation(that._shaderProgram, key), val);
    }
    // Draw the square.
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    if (that._started) {
      window.requestAnimationFrame(render);
    }
  }

  window.requestAnimationFrame(render);
};


function initShaders(gl, code) {
  //  var fragmentShader = getShader(gl, code);
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, code);
  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    throw Error(
      "An error occurred compiling the fragment shaders:\n"
        + gl.getShaderInfoLog(fragmentShader));
  }

  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, "attribute vec3 aVertexPosition;\nvarying lowp vec3 vPoint;\nvoid main(void) {\n  float x = aVertexPosition[0];\n  float y = aVertexPosition[1];\n  if (x > 0.0) {\n    if (y > 0.0) {\n      gl_Position = vec4(1.0, 1.0, 0.0, 1.0);\n    } else {\n      gl_Position = vec4(1.0, -1.0, 0.0, 1.0);\n    }\n  } else {\n    if (y > 0.0) {\n      gl_Position = vec4(-1.0, 1.0, 0.0, 1.0);\n    } else {\n      gl_Position = vec4(-1.0, -1.0, 0.0, 1.0);\n    }\n  }\n  vPoint = aVertexPosition;\n}\n");
  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    throw Error(
      "An error occurred compiling the vertex shaders:\n"
        + gl.getShaderInfoLog(vertexShader));
  }

  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    throw Error("Unable to initialize the shader program.");
  }

  gl.useProgram(shaderProgram);

  var vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
  gl.enableVertexAttribArray(vertexPositionAttribute);

  this._shaderProgram = shaderProgram;
  this._vertexPositionAttribute = vertexPositionAttribute;
}

function initBuffers(gl, W, H) {
  var squareVerticesBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
  var vertices = [
    W/2,  -H/2,  0.0,
      -W/2, -H/2,  0.0,
    W/2,  H/2, 0.0,
      -W/2, H/2, 0.0
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  return squareVerticesBuffer;
}

module.exports = Plane;
