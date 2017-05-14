"use strict";

var Plane = require( "webgl.plane" );

var texture = {
  colors: {
    data: [],
    width: 2048
  }
};

window.res = function ( res ) {
  window.localStorage.setItem( "res", res );
  window.location.reload();
};

// Deal with resolution.
var res = window.localStorage.getItem( "res" );
if ( res === null ) res = 1;
res = parseInt( res );
if ( isNaN( res ) ) res = 1;
document.getElementById( "res1" ).removeAttribute( "disabled" );
document.getElementById( "res2" ).removeAttribute( "disabled" );
document.getElementById( "res4" ).removeAttribute( "disabled" );
document.getElementById( "res" + res ).setAttribute( "disabled", "true" );


for ( var j = 0; j < texture.colors.width; j++ ) {
  var rr = Math.floor( 256 * Math.random() );
  var gg = Math.floor( 256 * Math.random() );
  var bb = Math.floor( 256 * Math.random() );
  //rr = gg = bb = 60;
  texture.colors.data.push( rr );
  texture.colors.data.push( gg );
  texture.colors.data.push( bb );
  texture.colors.data.push( 127 * ( 1 + Math.cos( Math.PI * 2 * j / texture.colors.width ) ) );
}

var plane = new Plane( {
  texture: texture,
  render: function ( time, uniform ) {
    uniform.X = time * .013;
    uniform.Y = time * .019;
    uniform.Z = time * .070;
    uniform.time = time;
  },
  resolution: res
} );
plane.start();