var threejs51 = "/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 */\n\
\n\
var THREE = THREE || { REVISION: '51' };\n\
\n\
if ( self.console === undefined ) {\n\
\n\
\tself.console = {\n\
\n\
\t\tinfo: function () {},\n\
\t\tlog: function () {},\n\
\t\tdebug: function () {},\n\
\t\twarn: function () {},\n\
\t\terror: function () {}\n\
\n\
\t};\n\
\n\
}\n\
\n\
if ( self.Int32Array === undefined ) {\n\
\n\
\tself.Int32Array = Array;\n\
\tself.Float32Array = Array;\n\
\n\
}\n\
\n\
// Shims for \"startsWith\", \"endsWith\", and \"trim\" for browsers where this is not yet implemented\n\
// not sure we should have this, or at least not have it here\n\
\n\
// http://stackoverflow.com/questions/646628/javascript-startswith\n\
// http://stackoverflow.com/questions/498970/how-do-i-trim-a-string-in-javascript\n\
// http://wiki.ecmascript.org/doku.php?id=harmony%3astring_extras\n\
\n\
if ( String.prototype.startsWith === undefined ) {\n\
\n\
\tString.prototype.startsWith = function ( str ) {\n\
\n\
\t\treturn this.slice( 0, str.length ) === str;\n\
\n\
\t};\n\
\n\
}\n\
\n\
if ( String.prototype.endsWith === undefined ) {\n\
\n\
\tString.prototype.endsWith = function ( str ) {\n\
\n\
\t\tvar t = String( str );\n\
\t\tvar index = this.lastIndexOf( t );\n\
\t\treturn index >= 0 && index === this.length - t.length;\n\
\n\
\t};\n\
\n\
}\n\
\n\
if ( ! String.prototype.trim === undefined ) {\n\
\n\
\tString.prototype.trim = function () {\n\
\n\
\t\treturn this.replace( /^\\s+|\\s+$/g, '' );\n\
\n\
\t};\n\
\n\
}\n\
\n\
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/\n\
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating\n\
\n\
// requestAnimationFrame polyfill by Erik Möller\n\
// fixes from Paul Irish and Tino Zijdel\n\
\n\
( function () {\n\
\n\
\tvar lastTime = 0;\n\
\tvar vendors = [ 'ms', 'moz', 'webkit', 'o' ];\n\
\n\
\tfor ( var x = 0; x < vendors.length && !window.requestAnimationFrame; ++ x ) {\n\
\n\
\t\twindow.requestAnimationFrame = window[ vendors[ x ] + 'RequestAnimationFrame' ];\n\
\t\twindow.cancelAnimationFrame = window[ vendors[ x ] + 'CancelAnimationFrame' ] || window[ vendors[ x ] + 'CancelRequestAnimationFrame' ];\n\
\n\
\t}\n\
\n\
\tif ( window.requestAnimationFrame === undefined ) {\n\
\n\
\t\twindow.requestAnimationFrame = function ( callback, element ) {\n\
\n\
\t\t\tvar currTime = Date.now(), timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );\n\
\t\t\tvar id = window.setTimeout( function() { callback( currTime + timeToCall ); }, timeToCall );\n\
\t\t\tlastTime = currTime + timeToCall;\n\
\t\t\treturn id;\n\
\n\
\t\t};\n\
\n\
\t}\n\
\n\
\n\
\tif ( window.cancelAnimationFrame === undefined ) {\n\
\n\
\t\twindow.cancelAnimationFrame = function ( id ) { clearTimeout( id ); };\n\
\n\
\t}\n\
\n\
}() );\n\
\n\
\n\
// MATERIAL CONSTANTS\n\
\n\
// side\n\
\n\
THREE.FrontSide = 0;\n\
THREE.BackSide = 1;\n\
THREE.DoubleSide = 2;\n\
\n\
// shading\n\
\n\
THREE.NoShading = 0;\n\
THREE.FlatShading = 1;\n\
THREE.SmoothShading = 2;\n\
\n\
// colors\n\
\n\
THREE.NoColors = 0;\n\
THREE.FaceColors = 1;\n\
THREE.VertexColors = 2;\n\
\n\
// blending modes\n\
\n\
THREE.NoBlending = 0;\n\
THREE.NormalBlending = 1;\n\
THREE.AdditiveBlending = 2;\n\
THREE.SubtractiveBlending = 3;\n\
THREE.MultiplyBlending = 4;\n\
THREE.CustomBlending = 5;\n\
\n\
// custom blending equations\n\
// (numbers start from 100 not to clash with other\n\
//  mappings to OpenGL constants defined in Texture.js)\n\
\n\
THREE.AddEquation = 100;\n\
THREE.SubtractEquation = 101;\n\
THREE.ReverseSubtractEquation = 102;\n\
\n\
// custom blending destination factors\n\
\n\
THREE.ZeroFactor = 200;\n\
THREE.OneFactor = 201;\n\
THREE.SrcColorFactor = 202;\n\
THREE.OneMinusSrcColorFactor = 203;\n\
THREE.SrcAlphaFactor = 204;\n\
THREE.OneMinusSrcAlphaFactor = 205;\n\
THREE.DstAlphaFactor = 206;\n\
THREE.OneMinusDstAlphaFactor = 207;\n\
\n\
// custom blending source factors\n\
\n\
//THREE.ZeroFactor = 200;\n\
//THREE.OneFactor = 201;\n\
//THREE.SrcAlphaFactor = 204;\n\
//THREE.OneMinusSrcAlphaFactor = 205;\n\
//THREE.DstAlphaFactor = 206;\n\
//THREE.OneMinusDstAlphaFactor = 207;\n\
THREE.DstColorFactor = 208;\n\
THREE.OneMinusDstColorFactor = 209;\n\
THREE.SrcAlphaSaturateFactor = 210;\n\
\n\
\n\
// TEXTURE CONSTANTS\n\
\n\
THREE.MultiplyOperation = 0;\n\
THREE.MixOperation = 1;\n\
\n\
// Mapping modes\n\
\n\
THREE.UVMapping = function () {};\n\
\n\
THREE.CubeReflectionMapping = function () {};\n\
THREE.CubeRefractionMapping = function () {};\n\
\n\
THREE.SphericalReflectionMapping = function () {};\n\
THREE.SphericalRefractionMapping = function () {};\n\
\n\
// Wrapping modes\n\
\n\
THREE.RepeatWrapping = 1000;\n\
THREE.ClampToEdgeWrapping = 1001;\n\
THREE.MirroredRepeatWrapping = 1002;\n\
\n\
// Filters\n\
\n\
THREE.NearestFilter = 1003;\n\
THREE.NearestMipMapNearestFilter = 1004;\n\
THREE.NearestMipMapLinearFilter = 1005;\n\
THREE.LinearFilter = 1006;\n\
THREE.LinearMipMapNearestFilter = 1007;\n\
THREE.LinearMipMapLinearFilter = 1008;\n\
\n\
// Data types\n\
\n\
THREE.UnsignedByteType = 1009;\n\
THREE.ByteType = 1010;\n\
THREE.ShortType = 1011;\n\
THREE.UnsignedShortType = 1012;\n\
THREE.IntType = 1013;\n\
THREE.UnsignedIntType = 1014;\n\
THREE.FloatType = 1015;\n\
\n\
// Pixel types\n\
\n\
//THREE.UnsignedByteType = 1009;\n\
THREE.UnsignedShort4444Type = 1016;\n\
THREE.UnsignedShort5551Type = 1017;\n\
THREE.UnsignedShort565Type = 1018;\n\
\n\
// Pixel formats\n\
\n\
THREE.AlphaFormat = 1019;\n\
THREE.RGBFormat = 1020;\n\
THREE.RGBAFormat = 1021;\n\
THREE.LuminanceFormat = 1022;\n\
THREE.LuminanceAlphaFormat = 1023;\n\
\n\
// Compressed texture formats\n\
\n\
THREE.RGB_S3TC_DXT1_Format = 2001;\n\
THREE.RGBA_S3TC_DXT1_Format = 2002;\n\
THREE.RGBA_S3TC_DXT3_Format = 2003;\n\
THREE.RGBA_S3TC_DXT5_Format = 2004;\n\
\n\
/*\n\
// Potential future PVRTC compressed texture formats\n\
THREE.RGB_PVRTC_4BPPV1_Format = 2100;\n\
THREE.RGB_PVRTC_2BPPV1_Format = 2101;\n\
THREE.RGBA_PVRTC_4BPPV1_Format = 2102;\n\
THREE.RGBA_PVRTC_2BPPV1_Format = 2103;\n\
*/\n\
/**\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.Clock = function ( autoStart ) {\n\
\n\
\tthis.autoStart = ( autoStart !== undefined ) ? autoStart : true;\n\
\n\
\tthis.startTime = 0;\n\
\tthis.oldTime = 0;\n\
\tthis.elapsedTime = 0;\n\
\n\
\tthis.running = false;\n\
\n\
};\n\
\n\
THREE.Clock.prototype.start = function () {\n\
\n\
\tthis.startTime = Date.now();\n\
\tthis.oldTime = this.startTime;\n\
\n\
\tthis.running = true;\n\
\n\
};\n\
\n\
THREE.Clock.prototype.stop = function () {\n\
\n\
\tthis.getElapsedTime();\n\
\n\
\tthis.running = false;\n\
\n\
};\n\
\n\
THREE.Clock.prototype.getElapsedTime = function () {\n\
\n\
\tthis.elapsedTime += this.getDelta();\n\
\n\
\treturn this.elapsedTime;\n\
\n\
};\n\
\n\
\n\
THREE.Clock.prototype.getDelta = function () {\n\
\n\
\tvar diff = 0;\n\
\n\
\tif ( this.autoStart && ! this.running ) {\n\
\n\
\t\tthis.start();\n\
\n\
\t}\n\
\n\
\tif ( this.running ) {\n\
\n\
\t\tvar newTime = Date.now();\n\
\t\tdiff = 0.001 * ( newTime - this.oldTime );\n\
\t\tthis.oldTime = newTime;\n\
\n\
\t\tthis.elapsedTime += diff;\n\
\n\
\t}\n\
\n\
\treturn diff;\n\
\n\
};/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 */\n\
\n\
THREE.Color = function ( hex ) {\n\
\n\
\tif ( hex !== undefined ) this.setHex( hex );\n\
\n\
\treturn this;\n\
\n\
};\n\
\n\
THREE.Color.prototype = {\n\
\n\
\tconstructor: THREE.Color,\n\
\n\
\tr: 1, g: 1, b: 1,\n\
\n\
\tcopy: function ( color ) {\n\
\n\
\t\tthis.r = color.r;\n\
\t\tthis.g = color.g;\n\
\t\tthis.b = color.b;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tcopyGammaToLinear: function ( color ) {\n\
\n\
\t\tthis.r = color.r * color.r;\n\
\t\tthis.g = color.g * color.g;\n\
\t\tthis.b = color.b * color.b;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tcopyLinearToGamma: function ( color ) {\n\
\n\
\t\tthis.r = Math.sqrt( color.r );\n\
\t\tthis.g = Math.sqrt( color.g );\n\
\t\tthis.b = Math.sqrt( color.b );\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tconvertGammaToLinear: function () {\n\
\n\
\t\tvar r = this.r, g = this.g, b = this.b;\n\
\n\
\t\tthis.r = r * r;\n\
\t\tthis.g = g * g;\n\
\t\tthis.b = b * b;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tconvertLinearToGamma: function () {\n\
\n\
\t\tthis.r = Math.sqrt( this.r );\n\
\t\tthis.g = Math.sqrt( this.g );\n\
\t\tthis.b = Math.sqrt( this.b );\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tsetRGB: function ( r, g, b ) {\n\
\n\
\t\tthis.r = r;\n\
\t\tthis.g = g;\n\
\t\tthis.b = b;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tsetHSV: function ( h, s, v ) {\n\
\n\
\t\t// based on MochiKit implementation by Bob Ippolito\n\
\t\t// h,s,v ranges are < 0.0 - 1.0 >\n\
\n\
\t\tvar i, f, p, q, t;\n\
\n\
\t\tif ( v === 0 ) {\n\
\n\
\t\t\tthis.r = this.g = this.b = 0;\n\
\n\
\t\t} else {\n\
\n\
\t\t\ti = Math.floor( h * 6 );\n\
\t\t\tf = ( h * 6 ) - i;\n\
\t\t\tp = v * ( 1 - s );\n\
\t\t\tq = v * ( 1 - ( s * f ) );\n\
\t\t\tt = v * ( 1 - ( s * ( 1 - f ) ) );\n\
\n\
\t\t\tif ( i === 0 ) {\n\
\n\
\t\t\t\tthis.r = v;\n\
\t\t\t\tthis.g = t;\n\
\t\t\t\tthis.b = p;\n\
\n\
\t\t\t} else if ( i === 1 ) {\n\
\n\
\t\t\t\tthis.r = q;\n\
\t\t\t\tthis.g = v;\n\
\t\t\t\tthis.b = p;\n\
\n\
\t\t\t} else if ( i === 2 ) {\n\
\n\
\t\t\t\tthis.r = p;\n\
\t\t\t\tthis.g = v;\n\
\t\t\t\tthis.b = t;\n\
\n\
\t\t\t} else if ( i === 3 ) {\n\
\n\
\t\t\t\tthis.r = p;\n\
\t\t\t\tthis.g = q;\n\
\t\t\t\tthis.b = v;\n\
\n\
\t\t\t} else if ( i === 4 ) {\n\
\n\
\t\t\t\tthis.r = t;\n\
\t\t\t\tthis.g = p;\n\
\t\t\t\tthis.b = v;\n\
\n\
\t\t\t} else if ( i === 5 ) {\n\
\n\
\t\t\t\tthis.r = v;\n\
\t\t\t\tthis.g = p;\n\
\t\t\t\tthis.b = q;\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tsetHex: function ( hex ) {\n\
\n\
\t\thex = Math.floor( hex );\n\
\n\
\t\tthis.r = ( hex >> 16 & 255 ) / 255;\n\
\t\tthis.g = ( hex >> 8 & 255 ) / 255;\n\
\t\tthis.b = ( hex & 255 ) / 255;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tlerpSelf: function ( color, alpha ) {\n\
\n\
\t\tthis.r += ( color.r - this.r ) * alpha;\n\
\t\tthis.g += ( color.g - this.g ) * alpha;\n\
\t\tthis.b += ( color.b - this.b ) * alpha;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tgetHex: function () {\n\
\n\
\t\treturn ( this.r * 255 ) << 16 ^ ( this.g * 255 ) << 8 ^ ( this.b * 255 ) << 0;\n\
\n\
\t},\n\
\n\
\tgetContextStyle: function () {\n\
\n\
\t\treturn 'rgb(' + ( ( this.r * 255 ) | 0 )  + ',' + ( ( this.g * 255 ) | 0 ) + ',' + ( ( this.b * 255 ) | 0 ) + ')';\n\
\n\
\t},\n\
\n\
\tclone: function () {\n\
\n\
\t\treturn new THREE.Color().setRGB( this.r, this.g, this.b );\n\
\n\
\t}\n\
\n\
};\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 * @author philogb / http://blog.thejit.org/\n\
 * @author egraether / http://egraether.com/\n\
 * @author zz85 / http://www.lab4games.net/zz85/blog\n\
 */\n\
\n\
THREE.Vector2 = function ( x, y ) {\n\
\n\
\tthis.x = x || 0;\n\
\tthis.y = y || 0;\n\
\n\
};\n\
\n\
THREE.Vector2.prototype = {\n\
\n\
\tconstructor: THREE.Vector2,\n\
\n\
\tset: function ( x, y ) {\n\
\n\
\t\tthis.x = x;\n\
\t\tthis.y = y;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tcopy: function ( v ) {\n\
\n\
\t\tthis.x = v.x;\n\
\t\tthis.y = v.y;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tadd: function ( a, b ) {\n\
\n\
\t\tthis.x = a.x + b.x;\n\
\t\tthis.y = a.y + b.y;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\taddSelf: function ( v ) {\n\
\n\
\t\tthis.x += v.x;\n\
\t\tthis.y += v.y;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tsub: function ( a, b ) {\n\
\n\
\t\tthis.x = a.x - b.x;\n\
\t\tthis.y = a.y - b.y;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tsubSelf: function ( v ) {\n\
\n\
\t\tthis.x -= v.x;\n\
\t\tthis.y -= v.y;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tmultiplyScalar: function ( s ) {\n\
\n\
\t\tthis.x *= s;\n\
\t\tthis.y *= s;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tdivideScalar: function ( s ) {\n\
\n\
\t\tif ( s ) {\n\
\n\
\t\t\tthis.x /= s;\n\
\t\t\tthis.y /= s;\n\
\n\
\t\t} else {\n\
\n\
\t\t\tthis.set( 0, 0 );\n\
\n\
\t\t}\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tnegate: function() {\n\
\n\
\t\treturn this.multiplyScalar( - 1 );\n\
\n\
\t},\n\
\n\
\tdot: function ( v ) {\n\
\n\
\t\treturn this.x * v.x + this.y * v.y;\n\
\n\
\t},\n\
\n\
\tlengthSq: function () {\n\
\n\
\t\treturn this.x * this.x + this.y * this.y;\n\
\n\
\t},\n\
\n\
\tlength: function () {\n\
\n\
\t\treturn Math.sqrt( this.lengthSq() );\n\
\n\
\t},\n\
\n\
\tnormalize: function () {\n\
\n\
\t\treturn this.divideScalar( this.length() );\n\
\n\
\t},\n\
\n\
\tdistanceTo: function ( v ) {\n\
\n\
\t\treturn Math.sqrt( this.distanceToSquared( v ) );\n\
\n\
\t},\n\
\n\
\tdistanceToSquared: function ( v ) {\n\
\n\
\t\tvar dx = this.x - v.x, dy = this.y - v.y;\n\
\t\treturn dx * dx + dy * dy;\n\
\n\
\t},\n\
\n\
\tsetLength: function ( l ) {\n\
\n\
\t\treturn this.normalize().multiplyScalar( l );\n\
\n\
\t},\n\
\n\
\tlerpSelf: function ( v, alpha ) {\n\
\n\
\t\tthis.x += ( v.x - this.x ) * alpha;\n\
\t\tthis.y += ( v.y - this.y ) * alpha;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tequals: function( v ) {\n\
\n\
\t\treturn ( ( v.x === this.x ) && ( v.y === this.y ) );\n\
\n\
\t},\n\
\n\
\tisZero: function () {\n\
\n\
\t\treturn ( this.lengthSq() < 0.0001 /* almostZero */ );\n\
\n\
\t},\n\
\n\
\tclone: function () {\n\
\n\
\t\treturn new THREE.Vector2( this.x, this.y );\n\
\n\
\t}\n\
\n\
};\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 * @author kile / http://kile.stravaganza.org/\n\
 * @author philogb / http://blog.thejit.org/\n\
 * @author mikael emtinger / http://gomo.se/\n\
 * @author egraether / http://egraether.com/\n\
 * @author WestLangley / http://github.com/WestLangley\n\
 */\n\
\n\
THREE.Vector3 = function ( x, y, z ) {\n\
\n\
\tthis.x = x || 0;\n\
\tthis.y = y || 0;\n\
\tthis.z = z || 0;\n\
\n\
};\n\
\n\
\n\
THREE.Vector3.prototype = {\n\
\n\
\tconstructor: THREE.Vector3,\n\
\n\
\tset: function ( x, y, z ) {\n\
\n\
\t\tthis.x = x;\n\
\t\tthis.y = y;\n\
\t\tthis.z = z;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tsetX: function ( x ) {\n\
\n\
\t\tthis.x = x;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tsetY: function ( y ) {\n\
\n\
\t\tthis.y = y;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tsetZ: function ( z ) {\n\
\n\
\t\tthis.z = z;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tcopy: function ( v ) {\n\
\n\
\t\tthis.x = v.x;\n\
\t\tthis.y = v.y;\n\
\t\tthis.z = v.z;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tadd: function ( a, b ) {\n\
\n\
\t\tthis.x = a.x + b.x;\n\
\t\tthis.y = a.y + b.y;\n\
\t\tthis.z = a.z + b.z;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\taddSelf: function ( v ) {\n\
\n\
\t\tthis.x += v.x;\n\
\t\tthis.y += v.y;\n\
\t\tthis.z += v.z;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\taddScalar: function ( s ) {\n\
\n\
\t\tthis.x += s;\n\
\t\tthis.y += s;\n\
\t\tthis.z += s;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tsub: function ( a, b ) {\n\
\n\
\t\tthis.x = a.x - b.x;\n\
\t\tthis.y = a.y - b.y;\n\
\t\tthis.z = a.z - b.z;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tsubSelf: function ( v ) {\n\
\n\
\t\tthis.x -= v.x;\n\
\t\tthis.y -= v.y;\n\
\t\tthis.z -= v.z;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tmultiply: function ( a, b ) {\n\
\n\
\t\tthis.x = a.x * b.x;\n\
\t\tthis.y = a.y * b.y;\n\
\t\tthis.z = a.z * b.z;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tmultiplySelf: function ( v ) {\n\
\n\
\t\tthis.x *= v.x;\n\
\t\tthis.y *= v.y;\n\
\t\tthis.z *= v.z;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tmultiplyScalar: function ( s ) {\n\
\n\
\t\tthis.x *= s;\n\
\t\tthis.y *= s;\n\
\t\tthis.z *= s;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tdivideSelf: function ( v ) {\n\
\n\
\t\tthis.x /= v.x;\n\
\t\tthis.y /= v.y;\n\
\t\tthis.z /= v.z;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tdivideScalar: function ( s ) {\n\
\n\
\t\tif ( s ) {\n\
\n\
\t\t\tthis.x /= s;\n\
\t\t\tthis.y /= s;\n\
\t\t\tthis.z /= s;\n\
\n\
\t\t} else {\n\
\n\
\t\t\tthis.x = 0;\n\
\t\t\tthis.y = 0;\n\
\t\t\tthis.z = 0;\n\
\n\
\t\t}\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\n\
\tnegate: function() {\n\
\n\
\t\treturn this.multiplyScalar( - 1 );\n\
\n\
\t},\n\
\n\
\tdot: function ( v ) {\n\
\n\
\t\treturn this.x * v.x + this.y * v.y + this.z * v.z;\n\
\n\
\t},\n\
\n\
\tlengthSq: function () {\n\
\n\
\t\treturn this.x * this.x + this.y * this.y + this.z * this.z;\n\
\n\
\t},\n\
\n\
\tlength: function () {\n\
\n\
\t\treturn Math.sqrt( this.lengthSq() );\n\
\n\
\t},\n\
\n\
\tlengthManhattan: function () {\n\
\n\
\t\treturn Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z );\n\
\n\
\t},\n\
\n\
\tnormalize: function () {\n\
\n\
\t\treturn this.divideScalar( this.length() );\n\
\n\
\t},\n\
\n\
\tsetLength: function ( l ) {\n\
\n\
\t\treturn this.normalize().multiplyScalar( l );\n\
\n\
\t},\n\
\n\
\tlerpSelf: function ( v, alpha ) {\n\
\n\
\t\tthis.x += ( v.x - this.x ) * alpha;\n\
\t\tthis.y += ( v.y - this.y ) * alpha;\n\
\t\tthis.z += ( v.z - this.z ) * alpha;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tcross: function ( a, b ) {\n\
\n\
\t\tthis.x = a.y * b.z - a.z * b.y;\n\
\t\tthis.y = a.z * b.x - a.x * b.z;\n\
\t\tthis.z = a.x * b.y - a.y * b.x;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tcrossSelf: function ( v ) {\n\
\n\
\t\tvar x = this.x, y = this.y, z = this.z;\n\
\n\
\t\tthis.x = y * v.z - z * v.y;\n\
\t\tthis.y = z * v.x - x * v.z;\n\
\t\tthis.z = x * v.y - y * v.x;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tdistanceTo: function ( v ) {\n\
\n\
\t\treturn Math.sqrt( this.distanceToSquared( v ) );\n\
\n\
\t},\n\
\n\
\tdistanceToSquared: function ( v ) {\n\
\n\
\t\treturn new THREE.Vector3().sub( this, v ).lengthSq();\n\
\n\
\t},\n\
\n\
\tgetPositionFromMatrix: function ( m ) {\n\
\n\
\t\tthis.x = m.elements[12];\n\
\t\tthis.y = m.elements[13];\n\
\t\tthis.z = m.elements[14];\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tsetEulerFromRotationMatrix: function ( m, order ) {\n\
\n\
\t\t// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)\n\
\n\
\t\t// clamp, to handle numerical problems\n\
\n\
\t\tfunction clamp( x ) {\n\
\n\
\t\t\treturn Math.min( Math.max( x, -1 ), 1 );\n\
\n\
\t\t}\n\
\n\
\t\tvar te = m.elements;\n\
\t\tvar m11 = te[0], m12 = te[4], m13 = te[8];\n\
\t\tvar m21 = te[1], m22 = te[5], m23 = te[9];\n\
\t\tvar m31 = te[2], m32 = te[6], m33 = te[10];\n\
\n\
\t\tif ( order === undefined || order === 'XYZ' ) {\n\
\n\
\t\t\tthis.y = Math.asin( clamp( m13 ) );\n\
\n\
\t\t\tif ( Math.abs( m13 ) < 0.99999 ) {\n\
\n\
\t\t\t\tthis.x = Math.atan2( - m23, m33 );\n\
\t\t\t\tthis.z = Math.atan2( - m12, m11 );\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tthis.x = Math.atan2( m32, m22 );\n\
\t\t\t\tthis.z = 0;\n\
\n\
\t\t\t}\n\
\n\
\t\t} else if ( order === 'YXZ' ) {\n\
\n\
\t\t\tthis.x = Math.asin( - clamp( m23 ) );\n\
\n\
\t\t\tif ( Math.abs( m23 ) < 0.99999 ) {\n\
\n\
\t\t\t\tthis.y = Math.atan2( m13, m33 );\n\
\t\t\t\tthis.z = Math.atan2( m21, m22 );\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tthis.y = Math.atan2( - m31, m11 );\n\
\t\t\t\tthis.z = 0;\n\
\n\
\t\t\t}\n\
\n\
\t\t} else if ( order === 'ZXY' ) {\n\
\n\
\t\t\tthis.x = Math.asin( clamp( m32 ) );\n\
\n\
\t\t\tif ( Math.abs( m32 ) < 0.99999 ) {\n\
\n\
\t\t\t\tthis.y = Math.atan2( - m31, m33 );\n\
\t\t\t\tthis.z = Math.atan2( - m12, m22 );\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tthis.y = 0;\n\
\t\t\t\tthis.z = Math.atan2( m21, m11 );\n\
\n\
\t\t\t}\n\
\n\
\t\t} else if ( order === 'ZYX' ) {\n\
\n\
\t\t\tthis.y = Math.asin( - clamp( m31 ) );\n\
\n\
\t\t\tif ( Math.abs( m31 ) < 0.99999 ) {\n\
\n\
\t\t\t\tthis.x = Math.atan2( m32, m33 );\n\
\t\t\t\tthis.z = Math.atan2( m21, m11 );\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tthis.x = 0;\n\
\t\t\t\tthis.z = Math.atan2( - m12, m22 );\n\
\n\
\t\t\t}\n\
\n\
\t\t} else if ( order === 'YZX' ) {\n\
\n\
\t\t\tthis.z = Math.asin( clamp( m21 ) );\n\
\n\
\t\t\tif ( Math.abs( m21 ) < 0.99999 ) {\n\
\n\
\t\t\t\tthis.x = Math.atan2( - m23, m22 );\n\
\t\t\t\tthis.y = Math.atan2( - m31, m11 );\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tthis.x = 0;\n\
\t\t\t\tthis.y = Math.atan2( m13, m33 );\n\
\n\
\t\t\t}\n\
\n\
\t\t} else if ( order === 'XZY' ) {\n\
\n\
\t\t\tthis.z = Math.asin( - clamp( m12 ) );\n\
\n\
\t\t\tif ( Math.abs( m12 ) < 0.99999 ) {\n\
\n\
\t\t\t\tthis.x = Math.atan2( m32, m22 );\n\
\t\t\t\tthis.y = Math.atan2( m13, m11 );\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tthis.x = Math.atan2( - m23, m33 );\n\
\t\t\t\tthis.y = 0;\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tsetEulerFromQuaternion: function ( q, order ) {\n\
\n\
\t\t// q is assumed to be normalized\n\
\n\
\t\t// clamp, to handle numerical problems\n\
\n\
\t\tfunction clamp( x ) {\n\
\n\
\t\t\treturn Math.min( Math.max( x, -1 ), 1 );\n\
\n\
\t\t}\n\
\n\
\t\t// http://www.mathworks.com/matlabcentral/fileexchange/20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/content/SpinCalc.m\n\
\n\
\t\tvar sqx = q.x * q.x;\n\
\t\tvar sqy = q.y * q.y;\n\
\t\tvar sqz = q.z * q.z;\n\
\t\tvar sqw = q.w * q.w;\n\
\n\
\t\tif ( order === undefined || order === 'XYZ' ) {\n\
\n\
\t\t\tthis.x = Math.atan2( 2 * ( q.x * q.w - q.y * q.z ), ( sqw - sqx - sqy + sqz ) );\n\
\t\t\tthis.y = Math.asin(  clamp( 2 * ( q.x * q.z + q.y * q.w ) ) );\n\
\t\t\tthis.z = Math.atan2( 2 * ( q.z * q.w - q.x * q.y ), ( sqw + sqx - sqy - sqz ) );\n\
\n\
\t\t} else if ( order ===  'YXZ' ) {\n\
\n\
\t\t\tthis.x = Math.asin(  clamp( 2 * ( q.x * q.w - q.y * q.z ) ) );\n\
\t\t\tthis.y = Math.atan2( 2 * ( q.x * q.z + q.y * q.w ), ( sqw - sqx - sqy + sqz ) );\n\
\t\t\tthis.z = Math.atan2( 2 * ( q.x * q.y + q.z * q.w ), ( sqw - sqx + sqy - sqz ) );\n\
\n\
\t\t} else if ( order === 'ZXY' ) {\n\
\n\
\t\t\tthis.x = Math.asin(  clamp( 2 * ( q.x * q.w + q.y * q.z ) ) );\n\
\t\t\tthis.y = Math.atan2( 2 * ( q.y * q.w - q.z * q.x ), ( sqw - sqx - sqy + sqz ) );\n\
\t\t\tthis.z = Math.atan2( 2 * ( q.z * q.w - q.x * q.y ), ( sqw - sqx + sqy - sqz ) );\n\
\n\
\t\t} else if ( order === 'ZYX' ) {\n\
\n\
\t\t\tthis.x = Math.atan2( 2 * ( q.x * q.w + q.z * q.y ), ( sqw - sqx - sqy + sqz ) );\n\
\t\t\tthis.y = Math.asin(  clamp( 2 * ( q.y * q.w - q.x * q.z ) ) );\n\
\t\t\tthis.z = Math.atan2( 2 * ( q.x * q.y + q.z * q.w ), ( sqw + sqx - sqy - sqz ) );\n\
\n\
\t\t} else if ( order === 'YZX' ) {\n\
\n\
\t\t\tthis.x = Math.atan2( 2 * ( q.x * q.w - q.z * q.y ), ( sqw - sqx + sqy - sqz ) );\n\
\t\t\tthis.y = Math.atan2( 2 * ( q.y * q.w - q.x * q.z ), ( sqw + sqx - sqy - sqz ) );\n\
\t\t\tthis.z = Math.asin(  clamp( 2 * ( q.x * q.y + q.z * q.w ) ) );\n\
\n\
\t\t} else if ( order === 'XZY' ) {\n\
\n\
\t\t\tthis.x = Math.atan2( 2 * ( q.x * q.w + q.y * q.z ), ( sqw - sqx + sqy - sqz ) );\n\
\t\t\tthis.y = Math.atan2( 2 * ( q.x * q.z + q.y * q.w ), ( sqw + sqx - sqy - sqz ) );\n\
\t\t\tthis.z = Math.asin(  clamp( 2 * ( q.z * q.w - q.x * q.y ) ) );\n\
\n\
\t\t}\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tgetScaleFromMatrix: function ( m ) {\n\
\n\
\t\tvar sx = this.set( m.elements[0], m.elements[1], m.elements[2] ).length();\n\
\t\tvar sy = this.set( m.elements[4], m.elements[5], m.elements[6] ).length();\n\
\t\tvar sz = this.set( m.elements[8], m.elements[9], m.elements[10] ).length();\n\
\n\
\t\tthis.x = sx;\n\
\t\tthis.y = sy;\n\
\t\tthis.z = sz;\n\
\n\
\t\treturn this;\n\
\t},\n\
\n\
\tequals: function ( v ) {\n\
\n\
\t\treturn ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) );\n\
\n\
\t},\n\
\n\
\tisZero: function () {\n\
\n\
\t\treturn ( this.lengthSq() < 0.0001 /* almostZero */ );\n\
\n\
\t},\n\
\n\
\tclone: function () {\n\
\n\
\t\treturn new THREE.Vector3( this.x, this.y, this.z );\n\
\n\
\t}\n\
\n\
};\n\
\n\
/**\n\
 * @author supereggbert / http://www.paulbrunt.co.uk/\n\
 * @author philogb / http://blog.thejit.org/\n\
 * @author mikael emtinger / http://gomo.se/\n\
 * @author egraether / http://egraether.com/\n\
 * @author WestLangley / http://github.com/WestLangley\n\
 */\n\
\n\
THREE.Vector4 = function ( x, y, z, w ) {\n\
\n\
\tthis.x = x || 0;\n\
\tthis.y = y || 0;\n\
\tthis.z = z || 0;\n\
\tthis.w = ( w !== undefined ) ? w : 1;\n\
\n\
};\n\
\n\
THREE.Vector4.prototype = {\n\
\n\
\tconstructor: THREE.Vector4,\n\
\n\
\tset: function ( x, y, z, w ) {\n\
\n\
\t\tthis.x = x;\n\
\t\tthis.y = y;\n\
\t\tthis.z = z;\n\
\t\tthis.w = w;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tcopy: function ( v ) {\n\
\n\
\t\tthis.x = v.x;\n\
\t\tthis.y = v.y;\n\
\t\tthis.z = v.z;\n\
\t\tthis.w = ( v.w !== undefined ) ? v.w : 1;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tadd: function ( a, b ) {\n\
\n\
\t\tthis.x = a.x + b.x;\n\
\t\tthis.y = a.y + b.y;\n\
\t\tthis.z = a.z + b.z;\n\
\t\tthis.w = a.w + b.w;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\taddSelf: function ( v ) {\n\
\n\
\t\tthis.x += v.x;\n\
\t\tthis.y += v.y;\n\
\t\tthis.z += v.z;\n\
\t\tthis.w += v.w;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tsub: function ( a, b ) {\n\
\n\
\t\tthis.x = a.x - b.x;\n\
\t\tthis.y = a.y - b.y;\n\
\t\tthis.z = a.z - b.z;\n\
\t\tthis.w = a.w - b.w;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tsubSelf: function ( v ) {\n\
\n\
\t\tthis.x -= v.x;\n\
\t\tthis.y -= v.y;\n\
\t\tthis.z -= v.z;\n\
\t\tthis.w -= v.w;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tmultiplyScalar: function ( s ) {\n\
\n\
\t\tthis.x *= s;\n\
\t\tthis.y *= s;\n\
\t\tthis.z *= s;\n\
\t\tthis.w *= s;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tdivideScalar: function ( s ) {\n\
\n\
\t\tif ( s ) {\n\
\n\
\t\t\tthis.x /= s;\n\
\t\t\tthis.y /= s;\n\
\t\t\tthis.z /= s;\n\
\t\t\tthis.w /= s;\n\
\n\
\t\t} else {\n\
\n\
\t\t\tthis.x = 0;\n\
\t\t\tthis.y = 0;\n\
\t\t\tthis.z = 0;\n\
\t\t\tthis.w = 1;\n\
\n\
\t\t}\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\n\
\tnegate: function() {\n\
\n\
\t\treturn this.multiplyScalar( -1 );\n\
\n\
\t},\n\
\n\
\tdot: function ( v ) {\n\
\n\
\t\treturn this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;\n\
\n\
\t},\n\
\n\
\tlengthSq: function () {\n\
\n\
\t\treturn this.dot( this );\n\
\n\
\t},\n\
\n\
\tlength: function () {\n\
\n\
\t\treturn Math.sqrt( this.lengthSq() );\n\
\n\
\t},\n\
\n\
\tlengthManhattan: function () {\n\
\n\
\t\treturn Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z ) + Math.abs( this.w );\n\
\n\
\t},\n\
\n\
\tnormalize: function () {\n\
\n\
\t\treturn this.divideScalar( this.length() );\n\
\n\
\t},\n\
\n\
\tsetLength: function ( l ) {\n\
\n\
\t\treturn this.normalize().multiplyScalar( l );\n\
\n\
\t},\n\
\n\
\tlerpSelf: function ( v, alpha ) {\n\
\n\
\t\tthis.x += ( v.x - this.x ) * alpha;\n\
\t\tthis.y += ( v.y - this.y ) * alpha;\n\
\t\tthis.z += ( v.z - this.z ) * alpha;\n\
\t\tthis.w += ( v.w - this.w ) * alpha;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tclone: function () {\n\
\n\
\t\treturn new THREE.Vector4( this.x, this.y, this.z, this.w );\n\
\n\
\t},\n\
\n\
\tsetAxisAngleFromQuaternion: function ( q ) {\n\
\n\
\t\t// http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm\n\
\n\
\t\t// q is assumed to be normalized\n\
\n\
\t\tthis.w = 2 * Math.acos( q.w );\n\
\n\
\t\tvar s = Math.sqrt( 1 - q.w * q.w );\n\
\n\
\t\tif ( s < 0.0001 ) {\n\
\n\
\t\t\t this.x = 1;\n\
\t\t\t this.y = 0;\n\
\t\t\t this.z = 0;\n\
\n\
\t\t} else {\n\
\n\
\t\t\t this.x = q.x / s;\n\
\t\t\t this.y = q.y / s;\n\
\t\t\t this.z = q.z / s;\n\
\n\
\t\t}\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tsetAxisAngleFromRotationMatrix: function ( m ) {\n\
\n\
\t\t// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm\n\
\n\
\t\t// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)\n\
\n\
\t\tvar angle, x, y, z,\t\t// variables for result\n\
\t\t\tepsilon = 0.01,\t\t// margin to allow for rounding errors\n\
\t\t\tepsilon2 = 0.1,\t\t// margin to distinguish between 0 and 180 degrees\n\
\n\
\t\t\tte = m.elements,\n\
\n\
\t\t\tm11 = te[0], m12 = te[4], m13 = te[8],\n\
\t\t\tm21 = te[1], m22 = te[5], m23 = te[9],\n\
\t\t\tm31 = te[2], m32 = te[6], m33 = te[10];\n\
\n\
\t\tif ( ( Math.abs( m12 - m21 ) < epsilon )\n\
\t\t  && ( Math.abs( m13 - m31 ) < epsilon )\n\
\t\t  && ( Math.abs( m23 - m32 ) < epsilon ) ) {\n\
\n\
\t\t\t// singularity found\n\
\t\t\t// first check for identity matrix which must have +1 for all terms\n\
\t\t\t// in leading diagonal and zero in other terms\n\
\n\
\t\t\tif ( ( Math.abs( m12 + m21 ) < epsilon2 )\n\
\t\t\t  && ( Math.abs( m13 + m31 ) < epsilon2 )\n\
\t\t\t  && ( Math.abs( m23 + m32 ) < epsilon2 )\n\
\t\t\t  && ( Math.abs( m11 + m22 + m33 - 3 ) < epsilon2 ) ) {\n\
\n\
\t\t\t\t// this singularity is identity matrix so angle = 0\n\
\n\
\t\t\t\tthis.set( 1, 0, 0, 0 );\n\
\n\
\t\t\t\treturn this; // zero angle, arbitrary axis\n\
\n\
\t\t\t}\n\
\n\
\t\t\t// otherwise this singularity is angle = 180\n\
\n\
\t\t\tangle = Math.PI;\n\
\n\
\t\t\tvar xx = ( m11 + 1 ) / 2;\n\
\t\t\tvar yy = ( m22 + 1 ) / 2;\n\
\t\t\tvar zz = ( m33 + 1 ) / 2;\n\
\t\t\tvar xy = ( m12 + m21 ) / 4;\n\
\t\t\tvar xz = ( m13 + m31 ) / 4;\n\
\t\t\tvar yz = ( m23 + m32 ) / 4;\n\
\n\
\t\t\tif ( ( xx > yy ) && ( xx > zz ) ) { // m11 is the largest diagonal term\n\
\n\
\t\t\t\tif ( xx < epsilon ) {\n\
\n\
\t\t\t\t\tx = 0;\n\
\t\t\t\t\ty = 0.707106781;\n\
\t\t\t\t\tz = 0.707106781;\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\tx = Math.sqrt( xx );\n\
\t\t\t\t\ty = xy / x;\n\
\t\t\t\t\tz = xz / x;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t} else if ( yy > zz ) { // m22 is the largest diagonal term\n\
\n\
\t\t\t\tif ( yy < epsilon ) {\n\
\n\
\t\t\t\t\tx = 0.707106781;\n\
\t\t\t\t\ty = 0;\n\
\t\t\t\t\tz = 0.707106781;\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\ty = Math.sqrt( yy );\n\
\t\t\t\t\tx = xy / y;\n\
\t\t\t\t\tz = yz / y;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t} else { // m33 is the largest diagonal term so base result on this\n\
\n\
\t\t\t\tif ( zz < epsilon ) {\n\
\n\
\t\t\t\t\tx = 0.707106781;\n\
\t\t\t\t\ty = 0.707106781;\n\
\t\t\t\t\tz = 0;\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\tz = Math.sqrt( zz );\n\
\t\t\t\t\tx = xz / z;\n\
\t\t\t\t\ty = yz / z;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t\tthis.set( x, y, z, angle );\n\
\n\
\t\t\treturn this; // return 180 deg rotation\n\
\n\
\t\t}\n\
\n\
\t\t// as we have reached here there are no singularities so we can handle normally\n\
\n\
\t\tvar s = Math.sqrt( ( m32 - m23 ) * ( m32 - m23 )\n\
\t\t\t\t\t\t + ( m13 - m31 ) * ( m13 - m31 )\n\
\t\t\t\t\t\t + ( m21 - m12 ) * ( m21 - m12 ) ); // used to normalize\n\
\n\
\t\tif ( Math.abs( s ) < 0.001 ) s = 1;\n\
\n\
\t\t// prevent divide by zero, should not happen if matrix is orthogonal and should be\n\
\t\t// caught by singularity test above, but I've left it in just in case\n\
\n\
\t\tthis.x = ( m32 - m23 ) / s;\n\
\t\tthis.y = ( m13 - m31 ) / s;\n\
\t\tthis.z = ( m21 - m12 ) / s;\n\
\t\tthis.w = Math.acos( ( m11 + m22 + m33 - 1 ) / 2 );\n\
\n\
\t\treturn this;\n\
\n\
\t}\n\
\n\
};\n\
/**\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.Matrix3 = function () {\n\
\n\
\tthis.elements = new Float32Array(9);\n\
\n\
};\n\
\n\
THREE.Matrix3.prototype = {\n\
\n\
\tconstructor: THREE.Matrix3,\n\
\n\
\tgetInverse: function ( matrix ) {\n\
\n\
\t\t// input: THREE.Matrix4\n\
\t\t// ( based on http://code.google.com/p/webgl-mjs/ )\n\
\n\
        var me = matrix.elements;\n\
\n\
\t\tvar a11 =   me[10] * me[5] - me[6] * me[9];\n\
\t\tvar a21 = - me[10] * me[1] + me[2] * me[9];\n\
\t\tvar a31 =   me[6] * me[1] - me[2] * me[5];\n\
\t\tvar a12 = - me[10] * me[4] + me[6] * me[8];\n\
\t\tvar a22 =   me[10] * me[0] - me[2] * me[8];\n\
\t\tvar a32 = - me[6] * me[0] + me[2] * me[4];\n\
\t\tvar a13 =   me[9] * me[4] - me[5] * me[8];\n\
\t\tvar a23 = - me[9] * me[0] + me[1] * me[8];\n\
\t\tvar a33 =   me[5] * me[0] - me[1] * me[4];\n\
\n\
\t\tvar det = me[0] * a11 + me[1] * a12 + me[2] * a13;\n\
\n\
\t\t// no inverse\n\
\n\
\t\tif ( det === 0 ) {\n\
\n\
\t\t\tconsole.warn( \"Matrix3.getInverse(): determinant == 0\" );\n\
\n\
\t\t}\n\
\n\
\t\tvar idet = 1.0 / det;\n\
\n\
\t\tvar m = this.elements;\n\
\n\
\t\tm[ 0 ] = idet * a11; m[ 1 ] = idet * a21; m[ 2 ] = idet * a31;\n\
\t\tm[ 3 ] = idet * a12; m[ 4 ] = idet * a22; m[ 5 ] = idet * a32;\n\
\t\tm[ 6 ] = idet * a13; m[ 7 ] = idet * a23; m[ 8 ] = idet * a33;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\t\n\
\ttranspose: function () {\n\
\n\
\t\tvar tmp, m = this.elements;\n\
\n\
\t\ttmp = m[1]; m[1] = m[3]; m[3] = tmp;\n\
\t\ttmp = m[2]; m[2] = m[6]; m[6] = tmp;\n\
\t\ttmp = m[5]; m[5] = m[7]; m[7] = tmp;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\t\n\
\n\
\ttransposeIntoArray: function ( r ) {\n\
\n\
\t\tvar m = this.m;\n\
\n\
\t\tr[ 0 ] = m[ 0 ];\n\
\t\tr[ 1 ] = m[ 3 ];\n\
\t\tr[ 2 ] = m[ 6 ];\n\
\t\tr[ 3 ] = m[ 1 ];\n\
\t\tr[ 4 ] = m[ 4 ];\n\
\t\tr[ 5 ] = m[ 7 ];\n\
\t\tr[ 6 ] = m[ 2 ];\n\
\t\tr[ 7 ] = m[ 5 ];\n\
\t\tr[ 8 ] = m[ 8 ];\n\
\n\
\t\treturn this;\n\
\n\
\t}\n\
\n\
};\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 * @author supereggbert / http://www.paulbrunt.co.uk/\n\
 * @author philogb / http://blog.thejit.org/\n\
 * @author jordi_ros / http://plattsoft.com\n\
 * @author D1plo1d / http://github.com/D1plo1d\n\
 * @author alteredq / http://alteredqualia.com/\n\
 * @author mikael emtinger / http://gomo.se/\n\
 * @author timknip / http://www.floorplanner.com/\n\
 */\n\
\n\
\n\
THREE.Matrix4 = function ( n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44 ) {\n\
\n\
\tthis.elements = new Float32Array( 16 );\n\
\n\
\tthis.set(\n\
\n\
\t\t( n11 !== undefined ) ? n11 : 1, n12 || 0, n13 || 0, n14 || 0,\n\
\t\tn21 || 0, ( n22 !== undefined ) ? n22 : 1, n23 || 0, n24 || 0,\n\
\t\tn31 || 0, n32 || 0, ( n33 !== undefined ) ? n33 : 1, n34 || 0,\n\
\t\tn41 || 0, n42 || 0, n43 || 0, ( n44 !== undefined ) ? n44 : 1\n\
\n\
\t);\n\
\n\
};\n\
\n\
THREE.Matrix4.prototype = {\n\
\n\
\tconstructor: THREE.Matrix4,\n\
\n\
\tset: function ( n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44 ) {\n\
\n\
\t\tvar te = this.elements;\n\
\n\
\t\tte[0] = n11; te[4] = n12; te[8] = n13; te[12] = n14;\n\
\t\tte[1] = n21; te[5] = n22; te[9] = n23; te[13] = n24;\n\
\t\tte[2] = n31; te[6] = n32; te[10] = n33; te[14] = n34;\n\
\t\tte[3] = n41; te[7] = n42; te[11] = n43; te[15] = n44;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tidentity: function () {\n\
\n\
\t\tthis.set(\n\
\n\
\t\t\t1, 0, 0, 0,\n\
\t\t\t0, 1, 0, 0,\n\
\t\t\t0, 0, 1, 0,\n\
\t\t\t0, 0, 0, 1\n\
\n\
\t\t);\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tcopy: function ( m ) {\n\
\n\
\t\tvar me = m.elements;\n\
\n\
\t\tthis.set(\n\
\n\
\t\t\tme[0], me[4], me[8], me[12],\n\
\t\t\tme[1], me[5], me[9], me[13],\n\
\t\t\tme[2], me[6], me[10], me[14],\n\
\t\t\tme[3], me[7], me[11], me[15]\n\
\n\
\t\t);\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tlookAt: function ( eye, target, up ) {\n\
\n\
\t\tvar te = this.elements;\n\
\n\
\t\tvar x = THREE.Matrix4.__v1;\n\
\t\tvar y = THREE.Matrix4.__v2;\n\
\t\tvar z = THREE.Matrix4.__v3;\n\
\n\
\t\tz.sub( eye, target ).normalize();\n\
\n\
\t\tif ( z.length() === 0 ) {\n\
\n\
\t\t\tz.z = 1;\n\
\n\
\t\t}\n\
\n\
\t\tx.cross( up, z ).normalize();\n\
\n\
\t\tif ( x.length() === 0 ) {\n\
\n\
\t\t\tz.x += 0.0001;\n\
\t\t\tx.cross( up, z ).normalize();\n\
\n\
\t\t}\n\
\n\
\t\ty.cross( z, x );\n\
\n\
\n\
\t\tte[0] = x.x; te[4] = y.x; te[8] = z.x;\n\
\t\tte[1] = x.y; te[5] = y.y; te[9] = z.y;\n\
\t\tte[2] = x.z; te[6] = y.z; te[10] = z.z;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tmultiply: function ( a, b ) {\n\
\n\
\t\tvar ae = a.elements;\n\
\t\tvar be = b.elements;\n\
\t\tvar te = this.elements;\n\
\n\
\t\tvar a11 = ae[0], a12 = ae[4], a13 = ae[8], a14 = ae[12];\n\
\t\tvar a21 = ae[1], a22 = ae[5], a23 = ae[9], a24 = ae[13];\n\
\t\tvar a31 = ae[2], a32 = ae[6], a33 = ae[10], a34 = ae[14];\n\
\t\tvar a41 = ae[3], a42 = ae[7], a43 = ae[11], a44 = ae[15];\n\
\n\
\t\tvar b11 = be[0], b12 = be[4], b13 = be[8], b14 = be[12];\n\
\t\tvar b21 = be[1], b22 = be[5], b23 = be[9], b24 = be[13];\n\
\t\tvar b31 = be[2], b32 = be[6], b33 = be[10], b34 = be[14];\n\
\t\tvar b41 = be[3], b42 = be[7], b43 = be[11], b44 = be[15];\n\
\n\
\t\tte[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;\n\
\t\tte[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;\n\
\t\tte[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;\n\
\t\tte[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;\n\
\n\
\t\tte[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;\n\
\t\tte[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;\n\
\t\tte[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;\n\
\t\tte[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;\n\
\n\
\t\tte[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;\n\
\t\tte[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;\n\
\t\tte[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;\n\
\t\tte[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;\n\
\n\
\t\tte[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;\n\
\t\tte[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;\n\
\t\tte[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;\n\
\t\tte[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tmultiplySelf: function ( m ) {\n\
\n\
\t\treturn this.multiply( this, m );\n\
\n\
\t},\n\
\n\
\tmultiplyToArray: function ( a, b, r ) {\n\
\n\
\t\tvar te = this.elements;\n\
\n\
\t\tthis.multiply( a, b );\n\
\n\
\t\tr[ 0 ] = te[0]; r[ 1 ] = te[1]; r[ 2 ] = te[2]; r[ 3 ] = te[3];\n\
\t\tr[ 4 ] = te[4]; r[ 5 ] = te[5]; r[ 6 ] = te[6]; r[ 7 ] = te[7];\n\
\t\tr[ 8 ]  = te[8]; r[ 9 ]  = te[9]; r[ 10 ] = te[10]; r[ 11 ] = te[11];\n\
\t\tr[ 12 ] = te[12]; r[ 13 ] = te[13]; r[ 14 ] = te[14]; r[ 15 ] = te[15];\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tmultiplyScalar: function ( s ) {\n\
\n\
\t\tvar te = this.elements;\n\
\n\
\t\tte[0] *= s; te[4] *= s; te[8] *= s; te[12] *= s;\n\
\t\tte[1] *= s; te[5] *= s; te[9] *= s; te[13] *= s;\n\
\t\tte[2] *= s; te[6] *= s; te[10] *= s; te[14] *= s;\n\
\t\tte[3] *= s; te[7] *= s; te[11] *= s; te[15] *= s;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tmultiplyVector3: function ( v ) {\n\
\n\
\t\tvar te = this.elements;\n\
\n\
\t\tvar vx = v.x, vy = v.y, vz = v.z;\n\
\t\tvar d = 1 / ( te[3] * vx + te[7] * vy + te[11] * vz + te[15] );\n\
\n\
\t\tv.x = ( te[0] * vx + te[4] * vy + te[8] * vz + te[12] ) * d;\n\
\t\tv.y = ( te[1] * vx + te[5] * vy + te[9] * vz + te[13] ) * d;\n\
\t\tv.z = ( te[2] * vx + te[6] * vy + te[10] * vz + te[14] ) * d;\n\
\n\
\t\treturn v;\n\
\n\
\t},\n\
\n\
\tmultiplyVector4: function ( v ) {\n\
\n\
\t\tvar te = this.elements;\n\
\t\tvar vx = v.x, vy = v.y, vz = v.z, vw = v.w;\n\
\n\
\t\tv.x = te[0] * vx + te[4] * vy + te[8] * vz + te[12] * vw;\n\
\t\tv.y = te[1] * vx + te[5] * vy + te[9] * vz + te[13] * vw;\n\
\t\tv.z = te[2] * vx + te[6] * vy + te[10] * vz + te[14] * vw;\n\
\t\tv.w = te[3] * vx + te[7] * vy + te[11] * vz + te[15] * vw;\n\
\n\
\t\treturn v;\n\
\n\
\t},\n\
\n\
\tmultiplyVector3Array: function ( a ) {\n\
\n\
\t\tvar tmp = THREE.Matrix4.__v1;\n\
\n\
\t\tfor ( var i = 0, il = a.length; i < il; i += 3 ) {\n\
\n\
\t\t\ttmp.x = a[ i ];\n\
\t\t\ttmp.y = a[ i + 1 ];\n\
\t\t\ttmp.z = a[ i + 2 ];\n\
\n\
\t\t\tthis.multiplyVector3( tmp );\n\
\n\
\t\t\ta[ i ]     = tmp.x;\n\
\t\t\ta[ i + 1 ] = tmp.y;\n\
\t\t\ta[ i + 2 ] = tmp.z;\n\
\n\
\t\t}\n\
\n\
\t\treturn a;\n\
\n\
\t},\n\
\n\
\trotateAxis: function ( v ) {\n\
\n\
\t\tvar te = this.elements;\n\
\t\tvar vx = v.x, vy = v.y, vz = v.z;\n\
\n\
\t\tv.x = vx * te[0] + vy * te[4] + vz * te[8];\n\
\t\tv.y = vx * te[1] + vy * te[5] + vz * te[9];\n\
\t\tv.z = vx * te[2] + vy * te[6] + vz * te[10];\n\
\n\
\t\tv.normalize();\n\
\n\
\t\treturn v;\n\
\n\
\t},\n\
\n\
\tcrossVector: function ( a ) {\n\
\n\
\t\tvar te = this.elements;\n\
\t\tvar v = new THREE.Vector4();\n\
\n\
\t\tv.x = te[0] * a.x + te[4] * a.y + te[8] * a.z + te[12] * a.w;\n\
\t\tv.y = te[1] * a.x + te[5] * a.y + te[9] * a.z + te[13] * a.w;\n\
\t\tv.z = te[2] * a.x + te[6] * a.y + te[10] * a.z + te[14] * a.w;\n\
\n\
\t\tv.w = ( a.w ) ? te[3] * a.x + te[7] * a.y + te[11] * a.z + te[15] * a.w : 1;\n\
\n\
\t\treturn v;\n\
\n\
\t},\n\
\n\
\tdeterminant: function () {\n\
\n\
\t\tvar te = this.elements;\n\
\n\
\t\tvar n11 = te[0], n12 = te[4], n13 = te[8], n14 = te[12];\n\
\t\tvar n21 = te[1], n22 = te[5], n23 = te[9], n24 = te[13];\n\
\t\tvar n31 = te[2], n32 = te[6], n33 = te[10], n34 = te[14];\n\
\t\tvar n41 = te[3], n42 = te[7], n43 = te[11], n44 = te[15];\n\
\n\
\t\t//TODO: make this more efficient\n\
\t\t//( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )\n\
\n\
\t\treturn (\n\
\t\t\tn14 * n23 * n32 * n41-\n\
\t\t\tn13 * n24 * n32 * n41-\n\
\t\t\tn14 * n22 * n33 * n41+\n\
\t\t\tn12 * n24 * n33 * n41+\n\
\n\
\t\t\tn13 * n22 * n34 * n41-\n\
\t\t\tn12 * n23 * n34 * n41-\n\
\t\t\tn14 * n23 * n31 * n42+\n\
\t\t\tn13 * n24 * n31 * n42+\n\
\n\
\t\t\tn14 * n21 * n33 * n42-\n\
\t\t\tn11 * n24 * n33 * n42-\n\
\t\t\tn13 * n21 * n34 * n42+\n\
\t\t\tn11 * n23 * n34 * n42+\n\
\n\
\t\t\tn14 * n22 * n31 * n43-\n\
\t\t\tn12 * n24 * n31 * n43-\n\
\t\t\tn14 * n21 * n32 * n43+\n\
\t\t\tn11 * n24 * n32 * n43+\n\
\n\
\t\t\tn12 * n21 * n34 * n43-\n\
\t\t\tn11 * n22 * n34 * n43-\n\
\t\t\tn13 * n22 * n31 * n44+\n\
\t\t\tn12 * n23 * n31 * n44+\n\
\n\
\t\t\tn13 * n21 * n32 * n44-\n\
\t\t\tn11 * n23 * n32 * n44-\n\
\t\t\tn12 * n21 * n33 * n44+\n\
\t\t\tn11 * n22 * n33 * n44\n\
\t\t);\n\
\n\
\t},\n\
\n\
\ttranspose: function () {\n\
\n\
\t\tvar te = this.elements;\n\
\t\tvar tmp;\n\
\n\
\t\ttmp = te[1]; te[1] = te[4]; te[4] = tmp;\n\
\t\ttmp = te[2]; te[2] = te[8]; te[8] = tmp;\n\
\t\ttmp = te[6]; te[6] = te[9]; te[9] = tmp;\n\
\n\
\t\ttmp = te[3]; te[3] = te[12]; te[12] = tmp;\n\
\t\ttmp = te[7]; te[7] = te[13]; te[13] = tmp;\n\
\t\ttmp = te[11]; te[11] = te[14]; te[14] = tmp;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tflattenToArray: function ( flat ) {\n\
\n\
\t\tvar te = this.elements;\n\
\t\tflat[ 0 ] = te[0]; flat[ 1 ] = te[1]; flat[ 2 ] = te[2]; flat[ 3 ] = te[3];\n\
\t\tflat[ 4 ] = te[4]; flat[ 5 ] = te[5]; flat[ 6 ] = te[6]; flat[ 7 ] = te[7];\n\
\t\tflat[ 8 ]  = te[8]; flat[ 9 ]  = te[9]; flat[ 10 ] = te[10]; flat[ 11 ] = te[11];\n\
\t\tflat[ 12 ] = te[12]; flat[ 13 ] = te[13]; flat[ 14 ] = te[14]; flat[ 15 ] = te[15];\n\
\n\
\t\treturn flat;\n\
\n\
\t},\n\
\n\
\tflattenToArrayOffset: function( flat, offset ) {\n\
\n\
\t\tvar te = this.elements;\n\
\t\tflat[ offset ] = te[0];\n\
\t\tflat[ offset + 1 ] = te[1];\n\
\t\tflat[ offset + 2 ] = te[2];\n\
\t\tflat[ offset + 3 ] = te[3];\n\
\n\
\t\tflat[ offset + 4 ] = te[4];\n\
\t\tflat[ offset + 5 ] = te[5];\n\
\t\tflat[ offset + 6 ] = te[6];\n\
\t\tflat[ offset + 7 ] = te[7];\n\
\n\
\t\tflat[ offset + 8 ]  = te[8];\n\
\t\tflat[ offset + 9 ]  = te[9];\n\
\t\tflat[ offset + 10 ] = te[10];\n\
\t\tflat[ offset + 11 ] = te[11];\n\
\n\
\t\tflat[ offset + 12 ] = te[12];\n\
\t\tflat[ offset + 13 ] = te[13];\n\
\t\tflat[ offset + 14 ] = te[14];\n\
\t\tflat[ offset + 15 ] = te[15];\n\
\n\
\t\treturn flat;\n\
\n\
\t},\n\
\n\
\tgetPosition: function () {\n\
\n\
\t\tvar te = this.elements;\n\
\t\treturn THREE.Matrix4.__v1.set( te[12], te[13], te[14] );\n\
\n\
\t},\n\
\n\
\tsetPosition: function ( v ) {\n\
\n\
\t\tvar te = this.elements;\n\
\n\
\t\tte[12] = v.x;\n\
\t\tte[13] = v.y;\n\
\t\tte[14] = v.z;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tgetColumnX: function () {\n\
\n\
\t\tvar te = this.elements;\n\
\t\treturn THREE.Matrix4.__v1.set( te[0], te[1], te[2] );\n\
\n\
\t},\n\
\n\
\tgetColumnY: function () {\n\
\n\
\t\tvar te = this.elements;\n\
\t\treturn THREE.Matrix4.__v1.set( te[4], te[5], te[6] );\n\
\n\
\t},\n\
\n\
\tgetColumnZ: function() {\n\
\n\
\t\tvar te = this.elements;\n\
\t\treturn THREE.Matrix4.__v1.set( te[8], te[9], te[10] );\n\
\n\
\t},\n\
\n\
\tgetInverse: function ( m ) {\n\
\n\
\t\t// based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm\n\
\t\tvar te = this.elements;\n\
\t\tvar me = m.elements;\n\
\n\
\t\tvar n11 = me[0], n12 = me[4], n13 = me[8], n14 = me[12];\n\
\t\tvar n21 = me[1], n22 = me[5], n23 = me[9], n24 = me[13];\n\
\t\tvar n31 = me[2], n32 = me[6], n33 = me[10], n34 = me[14];\n\
\t\tvar n41 = me[3], n42 = me[7], n43 = me[11], n44 = me[15];\n\
\n\
\t\tte[0] = n23*n34*n42 - n24*n33*n42 + n24*n32*n43 - n22*n34*n43 - n23*n32*n44 + n22*n33*n44;\n\
\t\tte[4] = n14*n33*n42 - n13*n34*n42 - n14*n32*n43 + n12*n34*n43 + n13*n32*n44 - n12*n33*n44;\n\
\t\tte[8] = n13*n24*n42 - n14*n23*n42 + n14*n22*n43 - n12*n24*n43 - n13*n22*n44 + n12*n23*n44;\n\
\t\tte[12] = n14*n23*n32 - n13*n24*n32 - n14*n22*n33 + n12*n24*n33 + n13*n22*n34 - n12*n23*n34;\n\
\t\tte[1] = n24*n33*n41 - n23*n34*n41 - n24*n31*n43 + n21*n34*n43 + n23*n31*n44 - n21*n33*n44;\n\
\t\tte[5] = n13*n34*n41 - n14*n33*n41 + n14*n31*n43 - n11*n34*n43 - n13*n31*n44 + n11*n33*n44;\n\
\t\tte[9] = n14*n23*n41 - n13*n24*n41 - n14*n21*n43 + n11*n24*n43 + n13*n21*n44 - n11*n23*n44;\n\
\t\tte[13] = n13*n24*n31 - n14*n23*n31 + n14*n21*n33 - n11*n24*n33 - n13*n21*n34 + n11*n23*n34;\n\
\t\tte[2] = n22*n34*n41 - n24*n32*n41 + n24*n31*n42 - n21*n34*n42 - n22*n31*n44 + n21*n32*n44;\n\
\t\tte[6] = n14*n32*n41 - n12*n34*n41 - n14*n31*n42 + n11*n34*n42 + n12*n31*n44 - n11*n32*n44;\n\
\t\tte[10] = n12*n24*n41 - n14*n22*n41 + n14*n21*n42 - n11*n24*n42 - n12*n21*n44 + n11*n22*n44;\n\
\t\tte[14] = n14*n22*n31 - n12*n24*n31 - n14*n21*n32 + n11*n24*n32 + n12*n21*n34 - n11*n22*n34;\n\
\t\tte[3] = n23*n32*n41 - n22*n33*n41 - n23*n31*n42 + n21*n33*n42 + n22*n31*n43 - n21*n32*n43;\n\
\t\tte[7] = n12*n33*n41 - n13*n32*n41 + n13*n31*n42 - n11*n33*n42 - n12*n31*n43 + n11*n32*n43;\n\
\t\tte[11] = n13*n22*n41 - n12*n23*n41 - n13*n21*n42 + n11*n23*n42 + n12*n21*n43 - n11*n22*n43;\n\
\t\tte[15] = n12*n23*n31 - n13*n22*n31 + n13*n21*n32 - n11*n23*n32 - n12*n21*n33 + n11*n22*n33;\n\
\t\tthis.multiplyScalar( 1 / m.determinant() );\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tsetRotationFromEuler: function ( v, order ) {\n\
\n\
\t\tvar te = this.elements;\n\
\n\
\t\tvar x = v.x, y = v.y, z = v.z;\n\
\t\tvar a = Math.cos( x ), b = Math.sin( x );\n\
\t\tvar c = Math.cos( y ), d = Math.sin( y );\n\
\t\tvar e = Math.cos( z ), f = Math.sin( z );\n\
\n\
\t\tif ( order === undefined || order === 'XYZ' ) {\n\
\n\
\t\t\tvar ae = a * e, af = a * f, be = b * e, bf = b * f;\n\
\n\
\t\t\tte[0] = c * e;\n\
\t\t\tte[4] = - c * f;\n\
\t\t\tte[8] = d;\n\
\n\
\t\t\tte[1] = af + be * d;\n\
\t\t\tte[5] = ae - bf * d;\n\
\t\t\tte[9] = - b * c;\n\
\n\
\t\t\tte[2] = bf - ae * d;\n\
\t\t\tte[6] = be + af * d;\n\
\t\t\tte[10] = a * c;\n\
\n\
\t\t} else if ( order === 'YXZ' ) {\n\
\n\
\t\t\tvar ce = c * e, cf = c * f, de = d * e, df = d * f;\n\
\n\
\t\t\tte[0] = ce + df * b;\n\
\t\t\tte[4] = de * b - cf;\n\
\t\t\tte[8] = a * d;\n\
\n\
\t\t\tte[1] = a * f;\n\
\t\t\tte[5] = a * e;\n\
\t\t\tte[9] = - b;\n\
\n\
\t\t\tte[2] = cf * b - de;\n\
\t\t\tte[6] = df + ce * b;\n\
\t\t\tte[10] = a * c;\n\
\n\
\t\t} else if ( order === 'ZXY' ) {\n\
\n\
\t\t\tvar ce = c * e, cf = c * f, de = d * e, df = d * f;\n\
\n\
\t\t\tte[0] = ce - df * b;\n\
\t\t\tte[4] = - a * f;\n\
\t\t\tte[8] = de + cf * b;\n\
\n\
\t\t\tte[1] = cf + de * b;\n\
\t\t\tte[5] = a * e;\n\
\t\t\tte[9] = df - ce * b;\n\
\n\
\t\t\tte[2] = - a * d;\n\
\t\t\tte[6] = b;\n\
\t\t\tte[10] = a * c;\n\
\n\
\t\t} else if ( order === 'ZYX' ) {\n\
\n\
\t\t\tvar ae = a * e, af = a * f, be = b * e, bf = b * f;\n\
\n\
\t\t\tte[0] = c * e;\n\
\t\t\tte[4] = be * d - af;\n\
\t\t\tte[8] = ae * d + bf;\n\
\n\
\t\t\tte[1] = c * f;\n\
\t\t\tte[5] = bf * d + ae;\n\
\t\t\tte[9] = af * d - be;\n\
\n\
\t\t\tte[2] = - d;\n\
\t\t\tte[6] = b * c;\n\
\t\t\tte[10] = a * c;\n\
\n\
\t\t} else if ( order === 'YZX' ) {\n\
\n\
\t\t\tvar ac = a * c, ad = a * d, bc = b * c, bd = b * d;\n\
\n\
\t\t\tte[0] = c * e;\n\
\t\t\tte[4] = bd - ac * f;\n\
\t\t\tte[8] = bc * f + ad;\n\
\n\
\t\t\tte[1] = f;\n\
\t\t\tte[5] = a * e;\n\
\t\t\tte[9] = - b * e;\n\
\n\
\t\t\tte[2] = - d * e;\n\
\t\t\tte[6] = ad * f + bc;\n\
\t\t\tte[10] = ac - bd * f;\n\
\n\
\t\t} else if ( order === 'XZY' ) {\n\
\n\
\t\t\tvar ac = a * c, ad = a * d, bc = b * c, bd = b * d;\n\
\n\
\t\t\tte[0] = c * e;\n\
\t\t\tte[4] = - f;\n\
\t\t\tte[8] = d * e;\n\
\n\
\t\t\tte[1] = ac * f + bd;\n\
\t\t\tte[5] = a * e;\n\
\t\t\tte[9] = ad * f - bc;\n\
\n\
\t\t\tte[2] = bc * f - ad;\n\
\t\t\tte[6] = b * e;\n\
\t\t\tte[10] = bd * f + ac;\n\
\n\
\t\t}\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\n\
\tsetRotationFromQuaternion: function ( q ) {\n\
\n\
\t\tvar te = this.elements;\n\
\n\
\t\tvar x = q.x, y = q.y, z = q.z, w = q.w;\n\
\t\tvar x2 = x + x, y2 = y + y, z2 = z + z;\n\
\t\tvar xx = x * x2, xy = x * y2, xz = x * z2;\n\
\t\tvar yy = y * y2, yz = y * z2, zz = z * z2;\n\
\t\tvar wx = w * x2, wy = w * y2, wz = w * z2;\n\
\n\
\t\tte[0] = 1 - ( yy + zz );\n\
\t\tte[4] = xy - wz;\n\
\t\tte[8] = xz + wy;\n\
\n\
\t\tte[1] = xy + wz;\n\
\t\tte[5] = 1 - ( xx + zz );\n\
\t\tte[9] = yz - wx;\n\
\n\
\t\tte[2] = xz - wy;\n\
\t\tte[6] = yz + wx;\n\
\t\tte[10] = 1 - ( xx + yy );\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tcompose: function ( translation, rotation, scale ) {\n\
\n\
\t\tvar te = this.elements;\n\
\t\tvar mRotation = THREE.Matrix4.__m1;\n\
\t\tvar mScale = THREE.Matrix4.__m2;\n\
\n\
\t\tmRotation.identity();\n\
\t\tmRotation.setRotationFromQuaternion( rotation );\n\
\n\
\t\tmScale.makeScale( scale.x, scale.y, scale.z );\n\
\n\
\t\tthis.multiply( mRotation, mScale );\n\
\n\
\t\tte[12] = translation.x;\n\
\t\tte[13] = translation.y;\n\
\t\tte[14] = translation.z;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tdecompose: function ( translation, rotation, scale ) {\n\
\n\
\t\tvar te = this.elements;\n\
\n\
\t\t// grab the axis vectors\n\
\t\tvar x = THREE.Matrix4.__v1;\n\
\t\tvar y = THREE.Matrix4.__v2;\n\
\t\tvar z = THREE.Matrix4.__v3;\n\
\n\
\t\tx.set( te[0], te[1], te[2] );\n\
\t\ty.set( te[4], te[5], te[6] );\n\
\t\tz.set( te[8], te[9], te[10] );\n\
\n\
\t\ttranslation = ( translation instanceof THREE.Vector3 ) ? translation : new THREE.Vector3();\n\
\t\trotation = ( rotation instanceof THREE.Quaternion ) ? rotation : new THREE.Quaternion();\n\
\t\tscale = ( scale instanceof THREE.Vector3 ) ? scale : new THREE.Vector3();\n\
\n\
\t\tscale.x = x.length();\n\
\t\tscale.y = y.length();\n\
\t\tscale.z = z.length();\n\
\n\
\t\ttranslation.x = te[12];\n\
\t\ttranslation.y = te[13];\n\
\t\ttranslation.z = te[14];\n\
\n\
\t\t// scale the rotation part\n\
\n\
\t\tvar matrix = THREE.Matrix4.__m1;\n\
\n\
\t\tmatrix.copy( this );\n\
\n\
\t\tmatrix.elements[0] /= scale.x;\n\
\t\tmatrix.elements[1] /= scale.x;\n\
\t\tmatrix.elements[2] /= scale.x;\n\
\n\
\t\tmatrix.elements[4] /= scale.y;\n\
\t\tmatrix.elements[5] /= scale.y;\n\
\t\tmatrix.elements[6] /= scale.y;\n\
\n\
\t\tmatrix.elements[8] /= scale.z;\n\
\t\tmatrix.elements[9] /= scale.z;\n\
\t\tmatrix.elements[10] /= scale.z;\n\
\n\
\t\trotation.setFromRotationMatrix( matrix );\n\
\n\
\t\treturn [ translation, rotation, scale ];\n\
\n\
\t},\n\
\n\
\textractPosition: function ( m ) {\n\
\n\
\t\tvar te = this.elements;\n\
\t\tvar me = m.elements;\n\
\n\
\t\tte[12] = me[12];\n\
\t\tte[13] = me[13];\n\
\t\tte[14] = me[14];\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\textractRotation: function ( m ) {\n\
\n\
\t\tvar te = this.elements;\n\
\t\tvar me = m.elements;\n\
\n\
\t\tvar vector = THREE.Matrix4.__v1;\n\
\n\
\t\tvar scaleX = 1 / vector.set( me[0], me[1], me[2] ).length();\n\
\t\tvar scaleY = 1 / vector.set( me[4], me[5], me[6] ).length();\n\
\t\tvar scaleZ = 1 / vector.set( me[8], me[9], me[10] ).length();\n\
\n\
\t\tte[0] = me[0] * scaleX;\n\
\t\tte[1] = me[1] * scaleX;\n\
\t\tte[2] = me[2] * scaleX;\n\
\n\
\t\tte[4] = me[4] * scaleY;\n\
\t\tte[5] = me[5] * scaleY;\n\
\t\tte[6] = me[6] * scaleY;\n\
\n\
\t\tte[8] = me[8] * scaleZ;\n\
\t\tte[9] = me[9] * scaleZ;\n\
\t\tte[10] = me[10] * scaleZ;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\t//\n\
\n\
\ttranslate: function ( v ) {\n\
\n\
\t\tvar te = this.elements;\n\
\t\tvar x = v.x, y = v.y, z = v.z;\n\
\n\
\t\tte[12] = te[0] * x + te[4] * y + te[8] * z + te[12];\n\
\t\tte[13] = te[1] * x + te[5] * y + te[9] * z + te[13];\n\
\t\tte[14] = te[2] * x + te[6] * y + te[10] * z + te[14];\n\
\t\tte[15] = te[3] * x + te[7] * y + te[11] * z + te[15];\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\trotateX: function ( angle ) {\n\
\n\
\t\tvar te = this.elements;\n\
\t\tvar m12 = te[4];\n\
\t\tvar m22 = te[5];\n\
\t\tvar m32 = te[6];\n\
\t\tvar m42 = te[7];\n\
\t\tvar m13 = te[8];\n\
\t\tvar m23 = te[9];\n\
\t\tvar m33 = te[10];\n\
\t\tvar m43 = te[11];\n\
\t\tvar c = Math.cos( angle );\n\
\t\tvar s = Math.sin( angle );\n\
\n\
\t\tte[4] = c * m12 + s * m13;\n\
\t\tte[5] = c * m22 + s * m23;\n\
\t\tte[6] = c * m32 + s * m33;\n\
\t\tte[7] = c * m42 + s * m43;\n\
\n\
\t\tte[8] = c * m13 - s * m12;\n\
\t\tte[9] = c * m23 - s * m22;\n\
\t\tte[10] = c * m33 - s * m32;\n\
\t\tte[11] = c * m43 - s * m42;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\trotateY: function ( angle ) {\n\
\n\
\t\tvar te = this.elements;\n\
\t\tvar m11 = te[0];\n\
\t\tvar m21 = te[1];\n\
\t\tvar m31 = te[2];\n\
\t\tvar m41 = te[3];\n\
\t\tvar m13 = te[8];\n\
\t\tvar m23 = te[9];\n\
\t\tvar m33 = te[10];\n\
\t\tvar m43 = te[11];\n\
\t\tvar c = Math.cos( angle );\n\
\t\tvar s = Math.sin( angle );\n\
\n\
\t\tte[0] = c * m11 - s * m13;\n\
\t\tte[1] = c * m21 - s * m23;\n\
\t\tte[2] = c * m31 - s * m33;\n\
\t\tte[3] = c * m41 - s * m43;\n\
\n\
\t\tte[8] = c * m13 + s * m11;\n\
\t\tte[9] = c * m23 + s * m21;\n\
\t\tte[10] = c * m33 + s * m31;\n\
\t\tte[11] = c * m43 + s * m41;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\trotateZ: function ( angle ) {\n\
\n\
\t\tvar te = this.elements;\n\
\t\tvar m11 = te[0];\n\
\t\tvar m21 = te[1];\n\
\t\tvar m31 = te[2];\n\
\t\tvar m41 = te[3];\n\
\t\tvar m12 = te[4];\n\
\t\tvar m22 = te[5];\n\
\t\tvar m32 = te[6];\n\
\t\tvar m42 = te[7];\n\
\t\tvar c = Math.cos( angle );\n\
\t\tvar s = Math.sin( angle );\n\
\n\
\t\tte[0] = c * m11 + s * m12;\n\
\t\tte[1] = c * m21 + s * m22;\n\
\t\tte[2] = c * m31 + s * m32;\n\
\t\tte[3] = c * m41 + s * m42;\n\
\n\
\t\tte[4] = c * m12 - s * m11;\n\
\t\tte[5] = c * m22 - s * m21;\n\
\t\tte[6] = c * m32 - s * m31;\n\
\t\tte[7] = c * m42 - s * m41;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\trotateByAxis: function ( axis, angle ) {\n\
\n\
\t\tvar te = this.elements;\n\
\n\
\t\t// optimize by checking axis\n\
\n\
\t\tif ( axis.x === 1 && axis.y === 0 && axis.z === 0 ) {\n\
\n\
\t\t\treturn this.rotateX( angle );\n\
\n\
\t\t} else if ( axis.x === 0 && axis.y === 1 && axis.z === 0 ) {\n\
\n\
\t\t\treturn this.rotateY( angle );\n\
\n\
\t\t} else if ( axis.x === 0 && axis.y === 0 && axis.z === 1 ) {\n\
\n\
\t\t\treturn this.rotateZ( angle );\n\
\n\
\t\t}\n\
\n\
\t\tvar x = axis.x, y = axis.y, z = axis.z;\n\
\t\tvar n = Math.sqrt(x * x + y * y + z * z);\n\
\n\
\t\tx /= n;\n\
\t\ty /= n;\n\
\t\tz /= n;\n\
\n\
\t\tvar xx = x * x, yy = y * y, zz = z * z;\n\
\t\tvar c = Math.cos( angle );\n\
\t\tvar s = Math.sin( angle );\n\
\t\tvar oneMinusCosine = 1 - c;\n\
\t\tvar xy = x * y * oneMinusCosine;\n\
\t\tvar xz = x * z * oneMinusCosine;\n\
\t\tvar yz = y * z * oneMinusCosine;\n\
\t\tvar xs = x * s;\n\
\t\tvar ys = y * s;\n\
\t\tvar zs = z * s;\n\
\n\
\t\tvar r11 = xx + (1 - xx) * c;\n\
\t\tvar r21 = xy + zs;\n\
\t\tvar r31 = xz - ys;\n\
\t\tvar r12 = xy - zs;\n\
\t\tvar r22 = yy + (1 - yy) * c;\n\
\t\tvar r32 = yz + xs;\n\
\t\tvar r13 = xz + ys;\n\
\t\tvar r23 = yz - xs;\n\
\t\tvar r33 = zz + (1 - zz) * c;\n\
\n\
\t\tvar m11 = te[0], m21 = te[1], m31 = te[2], m41 = te[3];\n\
\t\tvar m12 = te[4], m22 = te[5], m32 = te[6], m42 = te[7];\n\
\t\tvar m13 = te[8], m23 = te[9], m33 = te[10], m43 = te[11];\n\
\t\tvar m14 = te[12], m24 = te[13], m34 = te[14], m44 = te[15];\n\
\n\
\t\tte[0] = r11 * m11 + r21 * m12 + r31 * m13;\n\
\t\tte[1] = r11 * m21 + r21 * m22 + r31 * m23;\n\
\t\tte[2] = r11 * m31 + r21 * m32 + r31 * m33;\n\
\t\tte[3] = r11 * m41 + r21 * m42 + r31 * m43;\n\
\n\
\t\tte[4] = r12 * m11 + r22 * m12 + r32 * m13;\n\
\t\tte[5] = r12 * m21 + r22 * m22 + r32 * m23;\n\
\t\tte[6] = r12 * m31 + r22 * m32 + r32 * m33;\n\
\t\tte[7] = r12 * m41 + r22 * m42 + r32 * m43;\n\
\n\
\t\tte[8] = r13 * m11 + r23 * m12 + r33 * m13;\n\
\t\tte[9] = r13 * m21 + r23 * m22 + r33 * m23;\n\
\t\tte[10] = r13 * m31 + r23 * m32 + r33 * m33;\n\
\t\tte[11] = r13 * m41 + r23 * m42 + r33 * m43;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tscale: function ( v ) {\n\
\n\
\t\tvar te = this.elements;\n\
\t\tvar x = v.x, y = v.y, z = v.z;\n\
\n\
\t\tte[0] *= x; te[4] *= y; te[8] *= z;\n\
\t\tte[1] *= x; te[5] *= y; te[9] *= z;\n\
\t\tte[2] *= x; te[6] *= y; te[10] *= z;\n\
\t\tte[3] *= x; te[7] *= y; te[11] *= z;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tgetMaxScaleOnAxis: function () {\n\
\n\
\t\tvar te = this.elements;\n\
\n\
\t\tvar scaleXSq =  te[0] * te[0] + te[1] * te[1] + te[2] * te[2];\n\
\t\tvar scaleYSq =  te[4] * te[4] + te[5] * te[5] + te[6] * te[6];\n\
\t\tvar scaleZSq =  te[8] * te[8] + te[9] * te[9] + te[10] * te[10];\n\
\n\
\t\treturn Math.sqrt( Math.max( scaleXSq, Math.max( scaleYSq, scaleZSq ) ) );\n\
\n\
\t},\n\
\n\
\t//\n\
\n\
\tmakeTranslation: function ( x, y, z ) {\n\
\n\
\t\tthis.set(\n\
\n\
\t\t\t1, 0, 0, x,\n\
\t\t\t0, 1, 0, y,\n\
\t\t\t0, 0, 1, z,\n\
\t\t\t0, 0, 0, 1\n\
\n\
\t\t);\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tmakeRotationX: function ( theta ) {\n\
\n\
\t\tvar c = Math.cos( theta ), s = Math.sin( theta );\n\
\n\
\t\tthis.set(\n\
\n\
\t\t\t1, 0,  0, 0,\n\
\t\t\t0, c, -s, 0,\n\
\t\t\t0, s,  c, 0,\n\
\t\t\t0, 0,  0, 1\n\
\n\
\t\t);\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tmakeRotationY: function ( theta ) {\n\
\n\
\t\tvar c = Math.cos( theta ), s = Math.sin( theta );\n\
\n\
\t\tthis.set(\n\
\n\
\t\t\t c, 0, s, 0,\n\
\t\t\t 0, 1, 0, 0,\n\
\t\t\t-s, 0, c, 0,\n\
\t\t\t 0, 0, 0, 1\n\
\n\
\t\t);\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tmakeRotationZ: function ( theta ) {\n\
\n\
\t\tvar c = Math.cos( theta ), s = Math.sin( theta );\n\
\n\
\t\tthis.set(\n\
\n\
\t\t\tc, -s, 0, 0,\n\
\t\t\ts,  c, 0, 0,\n\
\t\t\t0,  0, 1, 0,\n\
\t\t\t0,  0, 0, 1\n\
\n\
\t\t);\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tmakeRotationAxis: function ( axis, angle ) {\n\
\n\
\t\t// Based on http://www.gamedev.net/reference/articles/article1199.asp\n\
\n\
\t\tvar c = Math.cos( angle );\n\
\t\tvar s = Math.sin( angle );\n\
\t\tvar t = 1 - c;\n\
\t\tvar x = axis.x, y = axis.y, z = axis.z;\n\
\t\tvar tx = t * x, ty = t * y;\n\
\n\
\t\tthis.set(\n\
\n\
\t\t\ttx * x + c, tx * y - s * z, tx * z + s * y, 0,\n\
\t\t\ttx * y + s * z, ty * y + c, ty * z - s * x, 0,\n\
\t\t\ttx * z - s * y, ty * z + s * x, t * z * z + c, 0,\n\
\t\t\t0, 0, 0, 1\n\
\n\
\t\t);\n\
\n\
\t\t return this;\n\
\n\
\t},\n\
\n\
\tmakeScale: function ( x, y, z ) {\n\
\n\
\t\tthis.set(\n\
\n\
\t\t\tx, 0, 0, 0,\n\
\t\t\t0, y, 0, 0,\n\
\t\t\t0, 0, z, 0,\n\
\t\t\t0, 0, 0, 1\n\
\n\
\t\t);\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tmakeFrustum: function ( left, right, bottom, top, near, far ) {\n\
\n\
\t\tvar te = this.elements;\n\
\t\tvar x = 2 * near / ( right - left );\n\
\t\tvar y = 2 * near / ( top - bottom );\n\
\n\
\t\tvar a = ( right + left ) / ( right - left );\n\
\t\tvar b = ( top + bottom ) / ( top - bottom );\n\
\t\tvar c = - ( far + near ) / ( far - near );\n\
\t\tvar d = - 2 * far * near / ( far - near );\n\
\n\
\t\tte[0] = x;  te[4] = 0;  te[8] = a;   te[12] = 0;\n\
\t\tte[1] = 0;  te[5] = y;  te[9] = b;   te[13] = 0;\n\
\t\tte[2] = 0;  te[6] = 0;  te[10] = c;   te[14] = d;\n\
\t\tte[3] = 0;  te[7] = 0;  te[11] = - 1; te[15] = 0;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tmakePerspective: function ( fov, aspect, near, far ) {\n\
\n\
\t\tvar ymax = near * Math.tan( fov * Math.PI / 360 );\n\
\t\tvar ymin = - ymax;\n\
\t\tvar xmin = ymin * aspect;\n\
\t\tvar xmax = ymax * aspect;\n\
\n\
\t\treturn this.makeFrustum( xmin, xmax, ymin, ymax, near, far );\n\
\n\
\t},\n\
\n\
\tmakeOrthographic: function ( left, right, top, bottom, near, far ) {\n\
\n\
\t\tvar te = this.elements;\n\
\t\tvar w = right - left;\n\
\t\tvar h = top - bottom;\n\
\t\tvar p = far - near;\n\
\n\
\t\tvar x = ( right + left ) / w;\n\
\t\tvar y = ( top + bottom ) / h;\n\
\t\tvar z = ( far + near ) / p;\n\
\n\
\t\tte[0] = 2 / w; te[4] = 0;     te[8] = 0;      te[12] = -x;\n\
\t\tte[1] = 0;     te[5] = 2 / h; te[9] = 0;      te[13] = -y;\n\
\t\tte[2] = 0;     te[6] = 0;     te[10] = -2 / p; te[14] = -z;\n\
\t\tte[3] = 0;     te[7] = 0;     te[11] = 0;      te[15] = 1;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\n\
\tclone: function () {\n\
\n\
\t\tvar te = this.elements;\n\
\n\
\t\treturn new THREE.Matrix4(\n\
\n\
\t\t\tte[0], te[4], te[8], te[12],\n\
\t\t\tte[1], te[5], te[9], te[13],\n\
\t\t\tte[2], te[6], te[10], te[14],\n\
\t\t\tte[3], te[7], te[11], te[15]\n\
\n\
\t\t);\n\
\n\
\t}\n\
\n\
};\n\
\n\
THREE.Matrix4.__v1 = new THREE.Vector3();\n\
THREE.Matrix4.__v2 = new THREE.Vector3();\n\
THREE.Matrix4.__v3 = new THREE.Vector3();\n\
\n\
THREE.Matrix4.__m1 = new THREE.Matrix4();\n\
THREE.Matrix4.__m2 = new THREE.Matrix4();\n\
/**\n\
 * https://github.com/mrdoob/eventtarget.js/\n\
 */\n\
\n\
THREE.EventTarget = function () {\n\
\n\
\tvar listeners = {};\n\
\n\
\tthis.addEventListener = function ( type, listener ) {\n\
\n\
\t\tif ( listeners[ type ] === undefined ) {\n\
\n\
\t\t\tlisteners[ type ] = [];\n\
\n\
\t\t}\n\
\n\
\t\tif ( listeners[ type ].indexOf( listener ) === - 1 ) {\n\
\n\
\t\t\tlisteners[ type ].push( listener );\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tthis.dispatchEvent = function ( event ) {\n\
\n\
\t\tfor ( var listener in listeners[ event.type ] ) {\n\
\n\
\t\t\tlisteners[ event.type ][ listener ]( event );\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tthis.removeEventListener = function ( type, listener ) {\n\
\n\
\t\tvar index = listeners[ type ].indexOf( listener );\n\
\n\
\t\tif ( index !== - 1 ) {\n\
\n\
\t\t\tlisteners[ type ].splice( index, 1 );\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
};\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.Frustum = function ( ) {\n\
\n\
\tthis.planes = [\n\
\n\
\t\tnew THREE.Vector4(),\n\
\t\tnew THREE.Vector4(),\n\
\t\tnew THREE.Vector4(),\n\
\t\tnew THREE.Vector4(),\n\
\t\tnew THREE.Vector4(),\n\
\t\tnew THREE.Vector4()\n\
\n\
\t];\n\
\n\
};\n\
\n\
THREE.Frustum.prototype.setFromMatrix = function ( m ) {\n\
\n\
\tvar plane;\n\
\tvar planes = this.planes;\n\
\n\
\tvar me = m.elements;\n\
\tvar me0 = me[0], me1 = me[1], me2 = me[2], me3 = me[3];\n\
\tvar me4 = me[4], me5 = me[5], me6 = me[6], me7 = me[7];\n\
\tvar me8 = me[8], me9 = me[9], me10 = me[10], me11 = me[11];\n\
\tvar me12 = me[12], me13 = me[13], me14 = me[14], me15 = me[15];\n\
\n\
\tplanes[ 0 ].set( me3 - me0, me7 - me4, me11 - me8, me15 - me12 );\n\
\tplanes[ 1 ].set( me3 + me0, me7 + me4, me11 + me8, me15 + me12 );\n\
\tplanes[ 2 ].set( me3 + me1, me7 + me5, me11 + me9, me15 + me13 );\n\
\tplanes[ 3 ].set( me3 - me1, me7 - me5, me11 - me9, me15 - me13 );\n\
\tplanes[ 4 ].set( me3 - me2, me7 - me6, me11 - me10, me15 - me14 );\n\
\tplanes[ 5 ].set( me3 + me2, me7 + me6, me11 + me10, me15 + me14 );\n\
\n\
\tfor ( var i = 0; i < 6; i ++ ) {\n\
\n\
\t\tplane = planes[ i ];\n\
\t\tplane.divideScalar( Math.sqrt( plane.x * plane.x + plane.y * plane.y + plane.z * plane.z ) );\n\
\n\
\t}\n\
\n\
};\n\
\n\
THREE.Frustum.prototype.contains = function ( object ) {\n\
\n\
\tvar distance = 0.0;\n\
\tvar planes = this.planes;\n\
\tvar matrix = object.matrixWorld;\n\
\tvar me = matrix.elements;\n\
\tvar radius = - object.geometry.boundingSphere.radius * matrix.getMaxScaleOnAxis();\n\
\n\
\tfor ( var i = 0; i < 6; i ++ ) {\n\
\n\
\t\tdistance = planes[ i ].x * me[12] + planes[ i ].y * me[13] + planes[ i ].z * me[14] + planes[ i ].w;\n\
\t\tif ( distance <= radius ) return false;\n\
\n\
\t}\n\
\n\
\treturn true;\n\
\n\
};\n\
\n\
THREE.Frustum.__v1 = new THREE.Vector3();\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 */\n\
\n\
( function ( THREE ) {\n\
\n\
\tTHREE.Ray = function ( origin, direction, near, far ) {\n\
\n\
\t\tthis.origin = origin || new THREE.Vector3();\n\
\t\tthis.direction = direction || new THREE.Vector3();\n\
\t\tthis.near = near || 0;\n\
\t\tthis.far = far || Infinity;\n\
\n\
\t};\n\
\n\
\tvar originCopy = new THREE.Vector3();\n\
\n\
\tvar localOriginCopy = new THREE.Vector3();\n\
\tvar localDirectionCopy = new THREE.Vector3();\n\
\n\
\tvar vector = new THREE.Vector3();\n\
\tvar normal = new THREE.Vector3();\n\
\tvar intersectPoint = new THREE.Vector3();\n\
\n\
\tvar inverseMatrix = new THREE.Matrix4();\n\
\n\
\tvar descSort = function ( a, b ) {\n\
\n\
\t\treturn a.distance - b.distance;\n\
\n\
\t};\n\
\n\
\tvar v0 = new THREE.Vector3(), v1 = new THREE.Vector3(), v2 = new THREE.Vector3();\n\
\n\
\tvar distanceFromIntersection = function ( origin, direction, position ) {\n\
\n\
\t\tv0.sub( position, origin );\n\
\n\
\t\tvar dot = v0.dot( direction );\n\
\n\
\t\tvar intersect = v1.add( origin, v2.copy( direction ).multiplyScalar( dot ) );\n\
\t\tvar distance = position.distanceTo( intersect );\n\
\n\
\t\treturn distance;\n\
\n\
\t};\n\
\n\
\t// http://www.blackpawn.com/texts/pointinpoly/default.html\n\
\n\
\tvar pointInFace3 = function ( p, a, b, c ) {\n\
\n\
\t\tv0.sub( c, a );\n\
\t\tv1.sub( b, a );\n\
\t\tv2.sub( p, a );\n\
\n\
\t\tvar dot00 = v0.dot( v0 );\n\
\t\tvar dot01 = v0.dot( v1 );\n\
\t\tvar dot02 = v0.dot( v2 );\n\
\t\tvar dot11 = v1.dot( v1 );\n\
\t\tvar dot12 = v1.dot( v2 );\n\
\n\
\t\tvar invDenom = 1 / ( dot00 * dot11 - dot01 * dot01 );\n\
\t\tvar u = ( dot11 * dot02 - dot01 * dot12 ) * invDenom;\n\
\t\tvar v = ( dot00 * dot12 - dot01 * dot02 ) * invDenom;\n\
\n\
\t\treturn ( u >= 0 ) && ( v >= 0 ) && ( u + v < 1 );\n\
\n\
\t};\n\
\n\
\tvar intersectObject = function ( object, ray, intersects ) {\n\
\n\
\t\tvar distance,intersect;\n\
\n\
\t\tif ( object instanceof THREE.Particle ) {\n\
\n\
\t\t\tdistance = distanceFromIntersection( ray.origin, ray.direction, object.matrixWorld.getPosition() );\n\
\n\
\t\t\tif ( distance > object.scale.x ) {\n\
\n\
\t\t\t\treturn intersects;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tintersect = {\n\
\n\
\t\t\t\tdistance: distance,\n\
\t\t\t\tpoint: object.position,\n\
\t\t\t\tface: null,\n\
\t\t\t\tobject: object\n\
\n\
\t\t\t};\n\
\n\
\t\t\tintersects.push( intersect );\n\
\n\
\t\t} else if ( object instanceof THREE.Mesh ) {\n\
\n\
\t\t\t// Checking boundingSphere\n\
\n\
\t\t\tvar scaledRadius = object.geometry.boundingSphere.radius * object.matrixWorld.getMaxScaleOnAxis();\n\
\n\
\t\t\t// Checking distance to ray\n\
\n\
\t\t\tdistance = distanceFromIntersection( ray.origin, ray.direction, object.matrixWorld.getPosition() );\n\
\n\
\t\t\tif ( distance > scaledRadius) {\n\
\n\
\t\t\t\treturn intersects;\n\
\n\
\t\t\t}\n\
\n\
\t\t\t// Checking faces\n\
\n\
\t\t\tvar f, fl, face, dot, scalar,\n\
\t\t\tgeometry = object.geometry,\n\
\t\t\tvertices = geometry.vertices,\n\
\t\t\tobjMatrix, geometryMaterials,\n\
\t\t\tisFaceMaterial, material, side, point;\n\
\n\
\t\t\tgeometryMaterials = object.geometry.materials;\n\
\t\t\tisFaceMaterial = object.material instanceof THREE.MeshFaceMaterial;\n\
\t\t\tside = object.material.side;\n\
\n\
\t\t\tvar a, b, c, d;\n\
\t\t\tvar precision = ray.precision;\n\
\n\
\t\t\tobject.matrixRotationWorld.extractRotation( object.matrixWorld );\n\
\n\
\t\t\toriginCopy.copy( ray.origin );\n\
\n\
\t\t\tobjMatrix = object.matrixWorld;\n\
\t\t\tinverseMatrix.getInverse( objMatrix );\n\
\n\
\t\t\tlocalOriginCopy.copy( originCopy );\n\
\t\t\tinverseMatrix.multiplyVector3( localOriginCopy );\n\
\n\
\t\t\tlocalDirectionCopy.copy( ray.direction );\n\
\t\t\tinverseMatrix.rotateAxis( localDirectionCopy ).normalize();\n\
\n\
\t\t\tfor ( f = 0, fl = geometry.faces.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\tface = geometry.faces[ f ];\n\
\n\
\t\t\t\tmaterial = isFaceMaterial === true ? geometryMaterials[ face.materialIndex ] : object.material;\n\
\t\t\t\tif ( material === undefined ) continue;\n\
\t\t\t\tside = material.side;\n\
\n\
\t\t\t\tvector.sub( face.centroid, localOriginCopy );\n\
\t\t\t\tnormal = face.normal;\n\
\t\t\t\tdot = localDirectionCopy.dot( normal );\n\
\n\
\t\t\t\t// bail if ray and plane are parallel\n\
\n\
\t\t\t\tif ( Math.abs( dot ) < precision ) continue;\n\
\n\
\t\t\t\t// calc distance to plane\n\
\n\
\t\t\t\tscalar = normal.dot( vector ) / dot;\n\
\n\
\t\t\t\t// if negative distance, then plane is behind ray\n\
\n\
\t\t\t\tif ( scalar < 0 ) continue;\n\
\n\
\t\t\t\tif ( side === THREE.DoubleSide || ( side === THREE.FrontSide ? dot < 0 : dot > 0 ) ) {\n\
\n\
\t\t\t\t\tintersectPoint.add( localOriginCopy, localDirectionCopy.multiplyScalar( scalar ) );\n\
\n\
\t\t\t\t\tif ( face instanceof THREE.Face3 ) {\n\
\n\
\t\t\t\t\t\ta = vertices[ face.a ];\n\
\t\t\t\t\t\tb = vertices[ face.b ];\n\
\t\t\t\t\t\tc = vertices[ face.c ];\n\
\n\
\t\t\t\t\t\tif ( pointInFace3( intersectPoint, a, b, c ) ) {\n\
\n\
\t\t\t\t\t\t\tpoint = object.matrixWorld.multiplyVector3( intersectPoint.clone() );\n\
\t\t\t\t\t\t\tdistance = originCopy.distanceTo( point );\n\
\n\
\t\t\t\t\t\t\tif ( distance < ray.near || distance > ray.far ) continue;\n\
\n\
\t\t\t\t\t\t\tintersect = {\n\
\n\
\t\t\t\t\t\t\t\tdistance: distance,\n\
\t\t\t\t\t\t\t\tpoint: point,\n\
\t\t\t\t\t\t\t\tface: face,\n\
\t\t\t\t\t\t\t\tfaceIndex: f,\n\
\t\t\t\t\t\t\t\tobject: object\n\
\n\
\t\t\t\t\t\t\t};\n\
\n\
\t\t\t\t\t\t\tintersects.push( intersect );\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t} else if ( face instanceof THREE.Face4 ) {\n\
\n\
\t\t\t\t\t\ta = vertices[ face.a ];\n\
\t\t\t\t\t\tb = vertices[ face.b ];\n\
\t\t\t\t\t\tc = vertices[ face.c ];\n\
\t\t\t\t\t\td = vertices[ face.d ];\n\
\n\
\t\t\t\t\t\tif ( pointInFace3( intersectPoint, a, b, d ) || pointInFace3( intersectPoint, b, c, d ) ) {\n\
\n\
\t\t\t\t\t\t\tpoint = object.matrixWorld.multiplyVector3( intersectPoint.clone() );\n\
\t\t\t\t\t\t\tdistance = originCopy.distanceTo( point );\n\
\n\
\t\t\t\t\t\t\tif ( distance < ray.near || distance > ray.far ) continue;\n\
\n\
\t\t\t\t\t\t\tintersect = {\n\
\n\
\t\t\t\t\t\t\t\tdistance: distance,\n\
\t\t\t\t\t\t\t\tpoint: point,\n\
\t\t\t\t\t\t\t\tface: face,\n\
\t\t\t\t\t\t\t\tfaceIndex: f,\n\
\t\t\t\t\t\t\t\tobject: object\n\
\n\
\t\t\t\t\t\t\t};\n\
\n\
\t\t\t\t\t\t\tintersects.push( intersect );\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tvar intersectDescendants = function ( object, ray, intersects ) {\n\
\n\
\t\tvar descendants = object.getDescendants();\n\
\n\
\t\tfor ( var i = 0, l = descendants.length; i < l; i ++ ) {\n\
\n\
\t\t\tintersectObject( descendants[ i ], ray, intersects );\n\
\n\
\t\t}\n\
\t};\n\
\n\
\t//\n\
\n\
\tTHREE.Ray.prototype.precision = 0.0001;\n\
\n\
\tTHREE.Ray.prototype.set = function ( origin, direction ) {\n\
\n\
\t\tthis.origin = origin;\n\
\t\tthis.direction = direction;\n\
\n\
\t};\n\
\n\
\tTHREE.Ray.prototype.intersectObject = function ( object, recursive ) {\n\
\n\
\t\tvar intersects = [];\n\
\n\
\t\tif ( recursive === true ) {\n\
\n\
\t\t\tintersectDescendants( object, this, intersects );\n\
\n\
\t\t}\n\
\n\
\t\tintersectObject( object, this, intersects );\n\
\n\
\t\tintersects.sort( descSort );\n\
\n\
\t\treturn intersects;\n\
\n\
\t};\n\
\n\
\tTHREE.Ray.prototype.intersectObjects = function ( objects, recursive ) {\n\
\n\
\t\tvar intersects = [];\n\
\n\
\t\tfor ( var i = 0, l = objects.length; i < l; i ++ ) {\n\
\n\
\t\t\tintersectObject( objects[ i ], this, intersects );\n\
\n\
\t\t\tif ( recursive === true ) {\n\
\n\
\t\t\t\tintersectDescendants( objects[ i ], this, intersects );\n\
\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t\tintersects.sort( descSort );\n\
\n\
\t\treturn intersects;\n\
\n\
\t};\n\
\n\
}( THREE ) );\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 */\n\
\n\
THREE.Rectangle = function () {\n\
\n\
\tvar _left = 0;\n\
\tvar _top = 0;\n\
\tvar _right = 0;\n\
\tvar _bottom = 0;\n\
\tvar _width = 0;\n\
\tvar _height = 0;\n\
\tvar _isEmpty = true;\n\
\n\
\tfunction resize() {\n\
\n\
\t\t_width = _right - _left;\n\
\t\t_height = _bottom - _top;\n\
\n\
\t}\n\
\n\
\tthis.getX = function () {\n\
\n\
\t\treturn _left;\n\
\n\
\t};\n\
\n\
\tthis.getY = function () {\n\
\n\
\t\treturn _top;\n\
\n\
\t};\n\
\n\
\tthis.getWidth = function () {\n\
\n\
\t\treturn _width;\n\
\n\
\t};\n\
\n\
\tthis.getHeight = function () {\n\
\n\
\t\treturn _height;\n\
\n\
\t};\n\
\n\
\tthis.getLeft = function() {\n\
\n\
\t\treturn _left;\n\
\n\
\t};\n\
\n\
\tthis.getTop = function() {\n\
\n\
\t\treturn _top;\n\
\n\
\t};\n\
\n\
\tthis.getRight = function() {\n\
\n\
\t\treturn _right;\n\
\n\
\t};\n\
\n\
\tthis.getBottom = function() {\n\
\n\
\t\treturn _bottom;\n\
\n\
\t};\n\
\n\
\tthis.set = function ( left, top, right, bottom ) {\n\
\n\
\t\t_isEmpty = false;\n\
\n\
\t\t_left = left; _top = top;\n\
\t\t_right = right; _bottom = bottom;\n\
\n\
\t\tresize();\n\
\n\
\t};\n\
\n\
\tthis.addPoint = function ( x, y ) {\n\
\n\
\t\tif ( _isEmpty === true ) {\n\
\n\
\t\t\t_isEmpty = false;\n\
\t\t\t_left = x; _top = y;\n\
\t\t\t_right = x; _bottom = y;\n\
\n\
\t\t\tresize();\n\
\n\
\t\t} else {\n\
\n\
\t\t\t_left = _left < x ? _left : x; // Math.min( _left, x );\n\
\t\t\t_top = _top < y ? _top : y; // Math.min( _top, y );\n\
\t\t\t_right = _right > x ? _right : x; // Math.max( _right, x );\n\
\t\t\t_bottom = _bottom > y ? _bottom : y; // Math.max( _bottom, y );\n\
\n\
\t\t\tresize();\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tthis.add3Points = function ( x1, y1, x2, y2, x3, y3 ) {\n\
\n\
\t\tif ( _isEmpty === true ) {\n\
\n\
\t\t\t_isEmpty = false;\n\
\t\t\t_left = x1 < x2 ? ( x1 < x3 ? x1 : x3 ) : ( x2 < x3 ? x2 : x3 );\n\
\t\t\t_top = y1 < y2 ? ( y1 < y3 ? y1 : y3 ) : ( y2 < y3 ? y2 : y3 );\n\
\t\t\t_right = x1 > x2 ? ( x1 > x3 ? x1 : x3 ) : ( x2 > x3 ? x2 : x3 );\n\
\t\t\t_bottom = y1 > y2 ? ( y1 > y3 ? y1 : y3 ) : ( y2 > y3 ? y2 : y3 );\n\
\n\
\t\t\tresize();\n\
\n\
\t\t} else {\n\
\n\
\t\t\t_left = x1 < x2 ? ( x1 < x3 ? ( x1 < _left ? x1 : _left ) : ( x3 < _left ? x3 : _left ) ) : ( x2 < x3 ? ( x2 < _left ? x2 : _left ) : ( x3 < _left ? x3 : _left ) );\n\
\t\t\t_top = y1 < y2 ? ( y1 < y3 ? ( y1 < _top ? y1 : _top ) : ( y3 < _top ? y3 : _top ) ) : ( y2 < y3 ? ( y2 < _top ? y2 : _top ) : ( y3 < _top ? y3 : _top ) );\n\
\t\t\t_right = x1 > x2 ? ( x1 > x3 ? ( x1 > _right ? x1 : _right ) : ( x3 > _right ? x3 : _right ) ) : ( x2 > x3 ? ( x2 > _right ? x2 : _right ) : ( x3 > _right ? x3 : _right ) );\n\
\t\t\t_bottom = y1 > y2 ? ( y1 > y3 ? ( y1 > _bottom ? y1 : _bottom ) : ( y3 > _bottom ? y3 : _bottom ) ) : ( y2 > y3 ? ( y2 > _bottom ? y2 : _bottom ) : ( y3 > _bottom ? y3 : _bottom ) );\n\
\n\
\t\t\tresize();\n\
\n\
\t\t};\n\
\n\
\t};\n\
\n\
\tthis.addRectangle = function ( r ) {\n\
\n\
\t\tif ( _isEmpty === true ) {\n\
\n\
\t\t\t_isEmpty = false;\n\
\t\t\t_left = r.getLeft(); _top = r.getTop();\n\
\t\t\t_right = r.getRight(); _bottom = r.getBottom();\n\
\n\
\t\t\tresize();\n\
\n\
\t\t} else {\n\
\n\
\t\t\t_left = _left < r.getLeft() ? _left : r.getLeft(); // Math.min(_left, r.getLeft() );\n\
\t\t\t_top = _top < r.getTop() ? _top : r.getTop(); // Math.min(_top, r.getTop() );\n\
\t\t\t_right = _right > r.getRight() ? _right : r.getRight(); // Math.max(_right, r.getRight() );\n\
\t\t\t_bottom = _bottom > r.getBottom() ? _bottom : r.getBottom(); // Math.max(_bottom, r.getBottom() );\n\
\n\
\t\t\tresize();\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tthis.inflate = function ( v ) {\n\
\n\
\t\t_left -= v; _top -= v;\n\
\t\t_right += v; _bottom += v;\n\
\n\
\t\tresize();\n\
\n\
\t};\n\
\n\
\tthis.minSelf = function ( r ) {\n\
\n\
\t\t_left = _left > r.getLeft() ? _left : r.getLeft(); // Math.max( _left, r.getLeft() );\n\
\t\t_top = _top > r.getTop() ? _top : r.getTop(); // Math.max( _top, r.getTop() );\n\
\t\t_right = _right < r.getRight() ? _right : r.getRight(); // Math.min( _right, r.getRight() );\n\
\t\t_bottom = _bottom < r.getBottom() ? _bottom : r.getBottom(); // Math.min( _bottom, r.getBottom() );\n\
\n\
\t\tresize();\n\
\n\
\t};\n\
\n\
\tthis.intersects = function ( r ) {\n\
\n\
\t\t// http://gamemath.com/2011/09/detecting-whether-two-boxes-overlap/\n\
\n\
\t\tif ( _right < r.getLeft() ) return false;\n\
\t\tif ( _left > r.getRight() ) return false;\n\
\t\tif ( _bottom < r.getTop() ) return false;\n\
\t\tif ( _top > r.getBottom() ) return false;\n\
\n\
\t\treturn true;\n\
\n\
\t};\n\
\n\
\tthis.empty = function () {\n\
\n\
\t\t_isEmpty = true;\n\
\n\
\t\t_left = 0; _top = 0;\n\
\t\t_right = 0; _bottom = 0;\n\
\n\
\t\tresize();\n\
\n\
\t};\n\
\n\
\tthis.isEmpty = function () {\n\
\n\
\t\treturn _isEmpty;\n\
\n\
\t};\n\
\n\
};\n\
/**\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.Math = {\n\
\n\
\t// Clamp value to range <a, b>\n\
\n\
\tclamp: function ( x, a, b ) {\n\
\n\
\t\treturn ( x < a ) ? a : ( ( x > b ) ? b : x );\n\
\n\
\t},\n\
\n\
\t// Clamp value to range <a, inf)\n\
\n\
\tclampBottom: function ( x, a ) {\n\
\n\
\t\treturn x < a ? a : x;\n\
\n\
\t},\n\
\n\
\t// Linear mapping from range <a1, a2> to range <b1, b2>\n\
\n\
\tmapLinear: function ( x, a1, a2, b1, b2 ) {\n\
\n\
\t\treturn b1 + ( x - a1 ) * ( b2 - b1 ) / ( a2 - a1 );\n\
\n\
\t},\n\
\n\
\t// Random float from <0, 1> with 16 bits of randomness\n\
\t// (standard Math.random() creates repetitive patterns when applied over larger space)\n\
\n\
\trandom16: function () {\n\
\n\
\t\treturn ( 65280 * Math.random() + 255 * Math.random() ) / 65535;\n\
\n\
\t},\n\
\n\
\t// Random integer from <low, high> interval\n\
\n\
\trandInt: function ( low, high ) {\n\
\n\
\t\treturn low + Math.floor( Math.random() * ( high - low + 1 ) );\n\
\n\
\t},\n\
\n\
\t// Random float from <low, high> interval\n\
\n\
\trandFloat: function ( low, high ) {\n\
\n\
\t\treturn low + Math.random() * ( high - low );\n\
\n\
\t},\n\
\n\
\t// Random float from <-range/2, range/2> interval\n\
\n\
\trandFloatSpread: function ( range ) {\n\
\n\
\t\treturn range * ( 0.5 - Math.random() );\n\
\n\
\t},\n\
\n\
\tsign: function ( x ) {\n\
\n\
\t\treturn ( x < 0 ) ? -1 : ( ( x > 0 ) ? 1 : 0 );\n\
\n\
\t}\n\
\n\
};\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 * @author mikael emtinger / http://gomo.se/\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.Object3D = function () {\n\
\n\
\tthis.id = THREE.Object3DCount ++;\n\
\n\
\tthis.name = '';\n\
\tthis.properties = {};\n\
\n\
\tthis.parent = undefined;\n\
\tthis.children = [];\n\
\n\
\tthis.up = new THREE.Vector3( 0, 1, 0 );\n\
\n\
\tthis.position = new THREE.Vector3();\n\
\tthis.rotation = new THREE.Vector3();\n\
\tthis.eulerOrder = 'XYZ';\n\
\tthis.scale = new THREE.Vector3( 1, 1, 1 );\n\
\n\
\tthis.renderDepth = null;\n\
\n\
\tthis.rotationAutoUpdate = true;\n\
\n\
\tthis.matrix = new THREE.Matrix4();\n\
\tthis.matrixWorld = new THREE.Matrix4();\n\
\tthis.matrixRotationWorld = new THREE.Matrix4();\n\
\n\
\tthis.matrixAutoUpdate = true;\n\
\tthis.matrixWorldNeedsUpdate = true;\n\
\n\
\tthis.quaternion = new THREE.Quaternion();\n\
\tthis.useQuaternion = false;\n\
\n\
\tthis.boundRadius = 0.0;\n\
\tthis.boundRadiusScale = 1.0;\n\
\n\
\tthis.visible = true;\n\
\n\
\tthis.castShadow = false;\n\
\tthis.receiveShadow = false;\n\
\n\
\tthis.frustumCulled = true;\n\
\n\
\tthis._vector = new THREE.Vector3();\n\
\n\
};\n\
\n\
\n\
THREE.Object3D.prototype = {\n\
\n\
\tconstructor: THREE.Object3D,\n\
\n\
\tapplyMatrix: function ( matrix ) {\n\
\n\
\t\tthis.matrix.multiply( matrix, this.matrix );\n\
\n\
\t\tthis.scale.getScaleFromMatrix( this.matrix );\n\
\n\
\t\tvar mat = new THREE.Matrix4().extractRotation( this.matrix );\n\
\t\tthis.rotation.setEulerFromRotationMatrix( mat, this.eulerOrder );\n\
\n\
\t\tthis.position.getPositionFromMatrix( this.matrix );\n\
\n\
\t},\n\
\n\
\ttranslate: function ( distance, axis ) {\n\
\n\
\t\tthis.matrix.rotateAxis( axis );\n\
\t\tthis.position.addSelf( axis.multiplyScalar( distance ) );\n\
\n\
\t},\n\
\n\
\ttranslateX: function ( distance ) {\n\
\n\
\t\tthis.translate( distance, this._vector.set( 1, 0, 0 ) );\n\
\n\
\t},\n\
\n\
\ttranslateY: function ( distance ) {\n\
\n\
\t\tthis.translate( distance, this._vector.set( 0, 1, 0 ) );\n\
\n\
\t},\n\
\n\
\ttranslateZ: function ( distance ) {\n\
\n\
\t\tthis.translate( distance, this._vector.set( 0, 0, 1 ) );\n\
\n\
\t},\n\
\n\
\tlocalToWorld: function ( vector ) {\n\
\n\
\t\treturn this.matrixWorld.multiplyVector3( vector );\n\
\n\
\t},\n\
\n\
\tworldToLocal: function ( vector ) {\n\
\n\
\t\treturn THREE.Object3D.__m1.getInverse( this.matrixWorld ).multiplyVector3( vector );\n\
\n\
\t},\n\
\n\
\tlookAt: function ( vector ) {\n\
\n\
\t\t// TODO: Add hierarchy support.\n\
\n\
\t\tthis.matrix.lookAt( vector, this.position, this.up );\n\
\n\
\t\tif ( this.rotationAutoUpdate ) {\n\
\n\
\t\t\tthis.rotation.setEulerFromRotationMatrix( this.matrix, this.eulerOrder );\n\
\n\
\t\t}\n\
\n\
\t},\n\
\n\
\tadd: function ( object ) {\n\
\n\
\t\tif ( object === this ) {\n\
\n\
\t\t\tconsole.warn( 'THREE.Object3D.add: An object can\\'t be added as a child of itself.' );\n\
\t\t\treturn;\n\
\n\
\t\t}\n\
\n\
\t\tif ( object instanceof THREE.Object3D ) {\n\
\n\
\t\t\tif ( object.parent !== undefined ) {\n\
\n\
\t\t\t\tobject.parent.remove( object );\n\
\n\
\t\t\t}\n\
\n\
\t\t\tobject.parent = this;\n\
\t\t\tthis.children.push( object );\n\
\n\
\t\t\t// add to scene\n\
\n\
\t\t\tvar scene = this;\n\
\n\
\t\t\twhile ( scene.parent !== undefined ) {\n\
\n\
\t\t\t\tscene = scene.parent;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( scene !== undefined && scene instanceof THREE.Scene )  {\n\
\n\
\t\t\t\tscene.__addObject( object );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t},\n\
\n\
\tremove: function ( object ) {\n\
\n\
\t\tvar index = this.children.indexOf( object );\n\
\n\
\t\tif ( index !== - 1 ) {\n\
\n\
\t\t\tobject.parent = undefined;\n\
\t\t\tthis.children.splice( index, 1 );\n\
\n\
\t\t\t// remove from scene\n\
\n\
\t\t\tvar scene = this;\n\
\n\
\t\t\twhile ( scene.parent !== undefined ) {\n\
\n\
\t\t\t\tscene = scene.parent;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( scene !== undefined && scene instanceof THREE.Scene ) {\n\
\n\
\t\t\t\tscene.__removeObject( object );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t},\n\
\n\
\tgetChildByName: function ( name, recursive ) {\n\
\n\
\t\tvar c, cl, child;\n\
\n\
\t\tfor ( c = 0, cl = this.children.length; c < cl; c ++ ) {\n\
\n\
\t\t\tchild = this.children[ c ];\n\
\n\
\t\t\tif ( child.name === name ) {\n\
\n\
\t\t\t\treturn child;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( recursive ) {\n\
\n\
\t\t\t\tchild = child.getChildByName( name, recursive );\n\
\n\
\t\t\t\tif ( child !== undefined ) {\n\
\n\
\t\t\t\t\treturn child;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\treturn undefined;\n\
\n\
\t},\n\
\n\
\tgetDescendants: function ( array ) {\n\
\n\
\t\tif ( array === undefined ) array = [];\n\
\n\
\t\tArray.prototype.push.apply( array, this.children );\n\
\n\
\t\tfor ( var i = 0, l = this.children.length; i < l; i ++ ) {\n\
\n\
\t\t\tthis.children[ i ].getDescendants( array );\n\
\n\
\t\t};\n\
\n\
\t\treturn array;\n\
\n\
\t},\n\
\n\
\tupdateMatrix: function () {\n\
\n\
\t\tthis.matrix.setPosition( this.position );\n\
\n\
\t\tif ( this.useQuaternion === false )  {\n\
\n\
\t\t\tthis.matrix.setRotationFromEuler( this.rotation, this.eulerOrder );\n\
\n\
\t\t} else {\n\
\n\
\t\t\tthis.matrix.setRotationFromQuaternion( this.quaternion );\n\
\n\
\t\t}\n\
\n\
\t\tif ( this.scale.x !== 1 || this.scale.y !== 1 || this.scale.z !== 1 ) {\n\
\n\
\t\t\tthis.matrix.scale( this.scale );\n\
\t\t\tthis.boundRadiusScale = Math.max( this.scale.x, Math.max( this.scale.y, this.scale.z ) );\n\
\n\
\t\t}\n\
\n\
\t\tthis.matrixWorldNeedsUpdate = true;\n\
\n\
\t},\n\
\n\
\tupdateMatrixWorld: function ( force ) {\n\
\n\
\t\tif ( this.matrixAutoUpdate === true ) this.updateMatrix();\n\
\n\
\t\tif ( this.matrixWorldNeedsUpdate === true || force === true ) {\n\
\n\
\t\t\tif ( this.parent === undefined ) {\n\
\n\
\t\t\t\tthis.matrixWorld.copy( this.matrix );\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tthis.matrixWorld.multiply( this.parent.matrixWorld, this.matrix );\n\
\n\
\t\t\t}\n\
\n\
\t\t\tthis.matrixWorldNeedsUpdate = false;\n\
\n\
\t\t\tforce = true;\n\
\n\
\t\t}\n\
\n\
\t\t// update children\n\
\n\
\t\tfor ( var i = 0, l = this.children.length; i < l; i ++ ) {\n\
\n\
\t\t\tthis.children[ i ].updateMatrixWorld( force );\n\
\n\
\t\t}\n\
\n\
\t},\n\
\n\
\tclone: function () {\n\
\n\
\t\t// TODO\n\
\n\
\t}\n\
\n\
};\n\
\n\
THREE.Object3D.__m1 = new THREE.Matrix4();\n\
\n\
THREE.Object3DCount = 0;\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 * @author supereggbert / http://www.paulbrunt.co.uk/\n\
 * @author julianwa / https://github.com/julianwa\n\
 */\n\
\n\
THREE.Projector = function() {\n\
\n\
\tvar _object, _objectCount, _objectPool = [], _objectPoolLength = 0,\n\
\t_vertex, _vertexCount, _vertexPool = [], _vertexPoolLength = 0,\n\
\t_face, _face3Count, _face3Pool = [], _face3PoolLength = 0,\n\
\t_face4Count, _face4Pool = [], _face4PoolLength = 0,\n\
\t_line, _lineCount, _linePool = [], _linePoolLength = 0,\n\
\t_particle, _particleCount, _particlePool = [], _particlePoolLength = 0,\n\
\n\
\t_renderData = { objects: [], sprites: [], lights: [], elements: [] },\n\
\n\
\t_vector3 = new THREE.Vector3(),\n\
\t_vector4 = new THREE.Vector4(),\n\
\n\
\t_viewProjectionMatrix = new THREE.Matrix4(),\n\
\t_modelViewProjectionMatrix = new THREE.Matrix4(),\n\
\n\
\t_frustum = new THREE.Frustum(),\n\
\n\
\t_clippedVertex1PositionScreen = new THREE.Vector4(),\n\
\t_clippedVertex2PositionScreen = new THREE.Vector4(),\n\
\n\
\t_face3VertexNormals;\n\
\n\
\tthis.projectVector = function ( vector, camera ) {\n\
\n\
\t\tcamera.matrixWorldInverse.getInverse( camera.matrixWorld );\n\
\n\
\t\t_viewProjectionMatrix.multiply( camera.projectionMatrix, camera.matrixWorldInverse );\n\
\t\t_viewProjectionMatrix.multiplyVector3( vector );\n\
\n\
\t\treturn vector;\n\
\n\
\t};\n\
\n\
\tthis.unprojectVector = function ( vector, camera ) {\n\
\n\
\t\tcamera.projectionMatrixInverse.getInverse( camera.projectionMatrix );\n\
\n\
\t\t_viewProjectionMatrix.multiply( camera.matrixWorld, camera.projectionMatrixInverse );\n\
\t\t_viewProjectionMatrix.multiplyVector3( vector );\n\
\n\
\t\treturn vector;\n\
\n\
\t};\n\
\n\
\tthis.pickingRay = function ( vector, camera ) {\n\
\n\
\t\tvar end, ray, t;\n\
\n\
\t\t// set two vectors with opposing z values\n\
\t\tvector.z = -1.0;\n\
\t\tend = new THREE.Vector3( vector.x, vector.y, 1.0 );\n\
\n\
\t\tthis.unprojectVector( vector, camera );\n\
\t\tthis.unprojectVector( end, camera );\n\
\n\
\t\t// find direction from vector to end\n\
\t\tend.subSelf( vector ).normalize();\n\
\n\
\t\treturn new THREE.Ray( vector, end );\n\
\n\
\t};\n\
\n\
\tvar projectGraph = function ( root, sortObjects ) {\n\
\n\
\t\t_objectCount = 0;\n\
\n\
\t\t_renderData.objects.length = 0;\n\
\t\t_renderData.sprites.length = 0;\n\
\t\t_renderData.lights.length = 0;\n\
\n\
\t\tvar projectObject = function ( parent ) {\n\
\n\
\t\t\tfor ( var c = 0, cl = parent.children.length; c < cl; c ++ ) {\n\
\n\
\t\t\t\tvar object = parent.children[ c ];\n\
\n\
\t\t\t\tif ( object.visible === false ) continue;\n\
\n\
\t\t\t\tif ( object instanceof THREE.Light ) {\n\
\n\
\t\t\t\t\t_renderData.lights.push( object );\n\
\n\
\t\t\t\t} else if ( object instanceof THREE.Mesh || object instanceof THREE.Line ) {\n\
\n\
\t\t\t\t\tif ( object.frustumCulled === false || _frustum.contains( object ) === true ) {\n\
\n\
\t\t\t\t\t\t_object = getNextObjectInPool();\n\
\t\t\t\t\t\t_object.object = object;\n\
\n\
\t\t\t\t\t\tif ( object.renderDepth !== null ) {\n\
\n\
\t\t\t\t\t\t\t_object.z = object.renderDepth;\n\
\n\
\t\t\t\t\t\t} else {\n\
\n\
\t\t\t\t\t\t\t_vector3.copy( object.matrixWorld.getPosition() );\n\
\t\t\t\t\t\t\t_viewProjectionMatrix.multiplyVector3( _vector3 );\n\
\t\t\t\t\t\t\t_object.z = _vector3.z;\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\t_renderData.objects.push( _object );\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t} else if ( object instanceof THREE.Sprite || object instanceof THREE.Particle ) {\n\
\n\
\t\t\t\t\t_object = getNextObjectInPool();\n\
\t\t\t\t\t_object.object = object;\n\
\n\
\t\t\t\t\t// TODO: Find an elegant and performant solution and remove this dupe code.\n\
\n\
\t\t\t\t\tif ( object.renderDepth !== null ) {\n\
\n\
\t\t\t\t\t\t_object.z = object.renderDepth;\n\
\n\
\t\t\t\t\t} else {\n\
\n\
\t\t\t\t\t\t_vector3.copy( object.matrixWorld.getPosition() );\n\
\t\t\t\t\t\t_viewProjectionMatrix.multiplyVector3( _vector3 );\n\
\t\t\t\t\t\t_object.z = _vector3.z;\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\t_renderData.sprites.push( _object );\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\t_object = getNextObjectInPool();\n\
\t\t\t\t\t_object.object = object;\n\
\n\
\t\t\t\t\tif ( object.renderDepth !== null ) {\n\
\n\
\t\t\t\t\t\t_object.z = object.renderDepth;\n\
\n\
\t\t\t\t\t} else {\n\
\n\
\t\t\t\t\t\t_vector3.copy( object.matrixWorld.getPosition() );\n\
\t\t\t\t\t\t_viewProjectionMatrix.multiplyVector3( _vector3 );\n\
\t\t\t\t\t\t_object.z = _vector3.z;\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\t_renderData.objects.push( _object );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tprojectObject( object );\n\
\n\
\t\t\t}\n\
\n\
\t\t};\n\
\n\
\t\tprojectObject( root );\n\
\n\
\t\tif ( sortObjects === true ) _renderData.objects.sort( painterSort );\n\
\n\
\t\treturn _renderData;\n\
\n\
\t};\n\
\n\
\tthis.projectScene = function ( scene, camera, sortObjects, sortElements ) {\n\
\n\
\t\tvar near = camera.near, far = camera.far, visible = false,\n\
\t\to, ol, v, vl, f, fl, n, nl, c, cl, u, ul, object,\n\
\t\tmodelMatrix, rotationMatrix,\n\
\t\tgeometry, geometryMaterials, vertices, vertex, vertexPositionScreen,\n\
\t\tfaces, face, faceVertexNormals, normal, faceVertexUvs, uvs,\n\
\t\tv1, v2, v3, v4, isFaceMaterial, material, side;\n\
\n\
\t\t_face3Count = 0;\n\
\t\t_face4Count = 0;\n\
\t\t_lineCount = 0;\n\
\t\t_particleCount = 0;\n\
\n\
\t\t_renderData.elements.length = 0;\n\
\n\
\t\tscene.updateMatrixWorld();\n\
\n\
\t\tif ( camera.parent === undefined ) camera.updateMatrixWorld();\n\
\n\
\t\tcamera.matrixWorldInverse.getInverse( camera.matrixWorld );\n\
\n\
\t\t_viewProjectionMatrix.multiply( camera.projectionMatrix, camera.matrixWorldInverse );\n\
\n\
\t\t_frustum.setFromMatrix( _viewProjectionMatrix );\n\
\n\
\t\t_renderData = projectGraph( scene, sortObjects );\n\
\n\
\t\tfor ( o = 0, ol = _renderData.objects.length; o < ol; o++ ) {\n\
\n\
\t\t\tobject = _renderData.objects[ o ].object;\n\
\n\
\t\t\tmodelMatrix = object.matrixWorld;\n\
\n\
\t\t\t_vertexCount = 0;\n\
\n\
\t\t\tif ( object instanceof THREE.Mesh ) {\n\
\n\
\t\t\t\tgeometry = object.geometry;\n\
\t\t\t\tgeometryMaterials = object.geometry.materials;\n\
\t\t\t\tvertices = geometry.vertices;\n\
\t\t\t\tfaces = geometry.faces;\n\
\t\t\t\tfaceVertexUvs = geometry.faceVertexUvs;\n\
\n\
\t\t\t\trotationMatrix = object.matrixRotationWorld.extractRotation( modelMatrix );\n\
\n\
\t\t\t\tisFaceMaterial = object.material instanceof THREE.MeshFaceMaterial;\n\
\t\t\t\tside = object.material.side;\n\
\n\
\t\t\t\tfor ( v = 0, vl = vertices.length; v < vl; v ++ ) {\n\
\n\
\t\t\t\t\t_vertex = getNextVertexInPool();\n\
\t\t\t\t\t_vertex.positionWorld.copy( vertices[ v ] );\n\
\n\
\t\t\t\t\tmodelMatrix.multiplyVector3( _vertex.positionWorld );\n\
\n\
\t\t\t\t\t_vertex.positionScreen.copy( _vertex.positionWorld );\n\
\t\t\t\t\t_viewProjectionMatrix.multiplyVector4( _vertex.positionScreen );\n\
\n\
\t\t\t\t\t_vertex.positionScreen.x /= _vertex.positionScreen.w;\n\
\t\t\t\t\t_vertex.positionScreen.y /= _vertex.positionScreen.w;\n\
\n\
\t\t\t\t\t_vertex.visible = _vertex.positionScreen.z > near && _vertex.positionScreen.z < far;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tfor ( f = 0, fl = faces.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\t\tface = faces[ f ];\n\
\n\
\t\t\t\t\tmaterial = isFaceMaterial === true ? geometryMaterials[ face.materialIndex ] : object.material;\n\
\n\
\t\t\t\t\tif ( material === undefined ) continue;\n\
\n\
\t\t\t\t\tside = material.side;\n\
\n\
\t\t\t\t\tif ( face instanceof THREE.Face3 ) {\n\
\n\
\t\t\t\t\t\tv1 = _vertexPool[ face.a ];\n\
\t\t\t\t\t\tv2 = _vertexPool[ face.b ];\n\
\t\t\t\t\t\tv3 = _vertexPool[ face.c ];\n\
\n\
\t\t\t\t\t\tif ( v1.visible === true && v2.visible === true && v3.visible === true ) {\n\
\n\
\t\t\t\t\t\t\tvisible = ( ( v3.positionScreen.x - v1.positionScreen.x ) * ( v2.positionScreen.y - v1.positionScreen.y ) -\n\
\t\t\t\t\t\t\t\t( v3.positionScreen.y - v1.positionScreen.y ) * ( v2.positionScreen.x - v1.positionScreen.x ) ) < 0;\n\
\n\
\t\t\t\t\t\t\tif ( side === THREE.DoubleSide || visible === ( side === THREE.FrontSide ) ) {\n\
\n\
\t\t\t\t\t\t\t\t_face = getNextFace3InPool();\n\
\n\
\t\t\t\t\t\t\t\t_face.v1.copy( v1 );\n\
\t\t\t\t\t\t\t\t_face.v2.copy( v2 );\n\
\t\t\t\t\t\t\t\t_face.v3.copy( v3 );\n\
\n\
\t\t\t\t\t\t\t} else {\n\
\n\
\t\t\t\t\t\t\t\tcontinue;\n\
\n\
\t\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\t} else {\n\
\n\
\t\t\t\t\t\t\tcontinue;\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t} else if ( face instanceof THREE.Face4 ) {\n\
\n\
\t\t\t\t\t\tv1 = _vertexPool[ face.a ];\n\
\t\t\t\t\t\tv2 = _vertexPool[ face.b ];\n\
\t\t\t\t\t\tv3 = _vertexPool[ face.c ];\n\
\t\t\t\t\t\tv4 = _vertexPool[ face.d ];\n\
\n\
\t\t\t\t\t\tif ( v1.visible === true && v2.visible === true && v3.visible === true && v4.visible === true ) {\n\
\n\
\t\t\t\t\t\t\tvisible = ( v4.positionScreen.x - v1.positionScreen.x ) * ( v2.positionScreen.y - v1.positionScreen.y ) -\n\
\t\t\t\t\t\t\t\t( v4.positionScreen.y - v1.positionScreen.y ) * ( v2.positionScreen.x - v1.positionScreen.x ) < 0 ||\n\
\t\t\t\t\t\t\t\t( v2.positionScreen.x - v3.positionScreen.x ) * ( v4.positionScreen.y - v3.positionScreen.y ) -\n\
\t\t\t\t\t\t\t\t( v2.positionScreen.y - v3.positionScreen.y ) * ( v4.positionScreen.x - v3.positionScreen.x ) < 0;\n\
\n\
\n\
\t\t\t\t\t\t\tif ( side === THREE.DoubleSide || visible === ( side === THREE.FrontSide ) ) {\n\
\n\
\t\t\t\t\t\t\t\t_face = getNextFace4InPool();\n\
\n\
\t\t\t\t\t\t\t\t_face.v1.copy( v1 );\n\
\t\t\t\t\t\t\t\t_face.v2.copy( v2 );\n\
\t\t\t\t\t\t\t\t_face.v3.copy( v3 );\n\
\t\t\t\t\t\t\t\t_face.v4.copy( v4 );\n\
\n\
\t\t\t\t\t\t\t} else {\n\
\n\
\t\t\t\t\t\t\t\tcontinue;\n\
\n\
\t\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\t} else {\n\
\n\
\t\t\t\t\t\t\tcontinue;\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\t_face.normalWorld.copy( face.normal );\n\
\n\
\t\t\t\t\tif ( visible === false && ( side === THREE.BackSide || side === THREE.DoubleSide ) ) _face.normalWorld.negate();\n\
\t\t\t\t\trotationMatrix.multiplyVector3( _face.normalWorld );\n\
\n\
\t\t\t\t\t_face.centroidWorld.copy( face.centroid );\n\
\t\t\t\t\tmodelMatrix.multiplyVector3( _face.centroidWorld );\n\
\n\
\t\t\t\t\t_face.centroidScreen.copy( _face.centroidWorld );\n\
\t\t\t\t\t_viewProjectionMatrix.multiplyVector3( _face.centroidScreen );\n\
\n\
\t\t\t\t\tfaceVertexNormals = face.vertexNormals;\n\
\n\
\t\t\t\t\tfor ( n = 0, nl = faceVertexNormals.length; n < nl; n ++ ) {\n\
\n\
\t\t\t\t\t\tnormal = _face.vertexNormalsWorld[ n ];\n\
\t\t\t\t\t\tnormal.copy( faceVertexNormals[ n ] );\n\
\n\
\t\t\t\t\t\tif ( visible === false && ( side === THREE.BackSide || side === THREE.DoubleSide ) ) normal.negate();\n\
\n\
\t\t\t\t\t\trotationMatrix.multiplyVector3( normal );\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\t_face.vertexNormalsLength = faceVertexNormals.length;\n\
\n\
\t\t\t\t\tfor ( c = 0, cl = faceVertexUvs.length; c < cl; c ++ ) {\n\
\n\
\t\t\t\t\t\tuvs = faceVertexUvs[ c ][ f ];\n\
\n\
\t\t\t\t\t\tif ( uvs === undefined ) continue;\n\
\n\
\t\t\t\t\t\tfor ( u = 0, ul = uvs.length; u < ul; u ++ ) {\n\
\n\
\t\t\t\t\t\t\t_face.uvs[ c ][ u ] = uvs[ u ];\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\t_face.material = material;\n\
\n\
\t\t\t\t\t_face.z = _face.centroidScreen.z;\n\
\n\
\t\t\t\t\t_renderData.elements.push( _face );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t} else if ( object instanceof THREE.Line ) {\n\
\n\
\t\t\t\t_modelViewProjectionMatrix.multiply( _viewProjectionMatrix, modelMatrix );\n\
\n\
\t\t\t\tvertices = object.geometry.vertices;\n\
\n\
\t\t\t\tv1 = getNextVertexInPool();\n\
\t\t\t\tv1.positionScreen.copy( vertices[ 0 ] );\n\
\t\t\t\t_modelViewProjectionMatrix.multiplyVector4( v1.positionScreen );\n\
\n\
\t\t\t\t// Handle LineStrip and LinePieces\n\
\t\t\t\tvar step = object.type === THREE.LinePieces ? 2 : 1;\n\
\n\
\t\t\t\tfor ( v = 1, vl = vertices.length; v < vl; v ++ ) {\n\
\n\
\t\t\t\t\tv1 = getNextVertexInPool();\n\
\t\t\t\t\tv1.positionScreen.copy( vertices[ v ] );\n\
\t\t\t\t\t_modelViewProjectionMatrix.multiplyVector4( v1.positionScreen );\n\
\n\
\t\t\t\t\tif ( ( v + 1 ) % step > 0 ) continue;\n\
\n\
\t\t\t\t\tv2 = _vertexPool[ _vertexCount - 2 ];\n\
\n\
\t\t\t\t\t_clippedVertex1PositionScreen.copy( v1.positionScreen );\n\
\t\t\t\t\t_clippedVertex2PositionScreen.copy( v2.positionScreen );\n\
\n\
\t\t\t\t\tif ( clipLine( _clippedVertex1PositionScreen, _clippedVertex2PositionScreen ) === true ) {\n\
\n\
\t\t\t\t\t\t// Perform the perspective divide\n\
\t\t\t\t\t\t_clippedVertex1PositionScreen.multiplyScalar( 1 / _clippedVertex1PositionScreen.w );\n\
\t\t\t\t\t\t_clippedVertex2PositionScreen.multiplyScalar( 1 / _clippedVertex2PositionScreen.w );\n\
\n\
\t\t\t\t\t\t_line = getNextLineInPool();\n\
\t\t\t\t\t\t_line.v1.positionScreen.copy( _clippedVertex1PositionScreen );\n\
\t\t\t\t\t\t_line.v2.positionScreen.copy( _clippedVertex2PositionScreen );\n\
\n\
\t\t\t\t\t\t_line.z = Math.max( _clippedVertex1PositionScreen.z, _clippedVertex2PositionScreen.z );\n\
\n\
\t\t\t\t\t\t_line.material = object.material;\n\
\n\
\t\t\t\t\t\t_renderData.elements.push( _line );\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tfor ( o = 0, ol = _renderData.sprites.length; o < ol; o++ ) {\n\
\n\
\t\t\tobject = _renderData.sprites[ o ].object;\n\
\n\
\t\t\tmodelMatrix = object.matrixWorld;\n\
\n\
\t\t\tif ( object instanceof THREE.Particle ) {\n\
\n\
\t\t\t\t_vector4.set( modelMatrix.elements[12], modelMatrix.elements[13], modelMatrix.elements[14], 1 );\n\
\t\t\t\t_viewProjectionMatrix.multiplyVector4( _vector4 );\n\
\n\
\t\t\t\t_vector4.z /= _vector4.w;\n\
\n\
\t\t\t\tif ( _vector4.z > 0 && _vector4.z < 1 ) {\n\
\n\
\t\t\t\t\t_particle = getNextParticleInPool();\n\
\t\t\t\t\t_particle.object = object;\n\
\t\t\t\t\t_particle.x = _vector4.x / _vector4.w;\n\
\t\t\t\t\t_particle.y = _vector4.y / _vector4.w;\n\
\t\t\t\t\t_particle.z = _vector4.z;\n\
\n\
\t\t\t\t\t_particle.rotation = object.rotation.z;\n\
\n\
\t\t\t\t\t_particle.scale.x = object.scale.x * Math.abs( _particle.x - ( _vector4.x + camera.projectionMatrix.elements[0] ) / ( _vector4.w + camera.projectionMatrix.elements[12] ) );\n\
\t\t\t\t\t_particle.scale.y = object.scale.y * Math.abs( _particle.y - ( _vector4.y + camera.projectionMatrix.elements[5] ) / ( _vector4.w + camera.projectionMatrix.elements[13] ) );\n\
\n\
\t\t\t\t\t_particle.material = object.material;\n\
\n\
\t\t\t\t\t_renderData.elements.push( _particle );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tif ( sortElements === true ) _renderData.elements.sort( painterSort );\n\
\n\
\t\treturn _renderData;\n\
\n\
\t};\n\
\n\
\t// Pools\n\
\n\
\tfunction getNextObjectInPool() {\n\
\n\
\t\tif ( _objectCount === _objectPoolLength ) {\n\
\n\
\t\t\tvar object = new THREE.RenderableObject();\n\
\t\t\t_objectPool.push( object );\n\
\t\t\t_objectPoolLength ++;\n\
\t\t\t_objectCount ++;\n\
\t\t\treturn object;\n\
\n\
\t\t}\n\
\n\
\t\treturn _objectPool[ _objectCount ++ ];\n\
\n\
\t}\n\
\n\
\tfunction getNextVertexInPool() {\n\
\n\
\t\tif ( _vertexCount === _vertexPoolLength ) {\n\
\n\
\t\t\tvar vertex = new THREE.RenderableVertex();\n\
\t\t\t_vertexPool.push( vertex );\n\
\t\t\t_vertexPoolLength ++;\n\
\t\t\t_vertexCount ++;\n\
\t\t\treturn vertex;\n\
\n\
\t\t}\n\
\n\
\t\treturn _vertexPool[ _vertexCount ++ ];\n\
\n\
\t}\n\
\n\
\tfunction getNextFace3InPool() {\n\
\n\
\t\tif ( _face3Count === _face3PoolLength ) {\n\
\n\
\t\t\tvar face = new THREE.RenderableFace3();\n\
\t\t\t_face3Pool.push( face );\n\
\t\t\t_face3PoolLength ++;\n\
\t\t\t_face3Count ++;\n\
\t\t\treturn face;\n\
\n\
\t\t}\n\
\n\
\t\treturn _face3Pool[ _face3Count ++ ];\n\
\n\
\n\
\t}\n\
\n\
\tfunction getNextFace4InPool() {\n\
\n\
\t\tif ( _face4Count === _face4PoolLength ) {\n\
\n\
\t\t\tvar face = new THREE.RenderableFace4();\n\
\t\t\t_face4Pool.push( face );\n\
\t\t\t_face4PoolLength ++;\n\
\t\t\t_face4Count ++;\n\
\t\t\treturn face;\n\
\n\
\t\t}\n\
\n\
\t\treturn _face4Pool[ _face4Count ++ ];\n\
\n\
\t}\n\
\n\
\tfunction getNextLineInPool() {\n\
\n\
\t\tif ( _lineCount === _linePoolLength ) {\n\
\n\
\t\t\tvar line = new THREE.RenderableLine();\n\
\t\t\t_linePool.push( line );\n\
\t\t\t_linePoolLength ++;\n\
\t\t\t_lineCount ++\n\
\t\t\treturn line;\n\
\n\
\t\t}\n\
\n\
\t\treturn _linePool[ _lineCount ++ ];\n\
\n\
\t}\n\
\n\
\tfunction getNextParticleInPool() {\n\
\n\
\t\tif ( _particleCount === _particlePoolLength ) {\n\
\n\
\t\t\tvar particle = new THREE.RenderableParticle();\n\
\t\t\t_particlePool.push( particle );\n\
\t\t\t_particlePoolLength ++;\n\
\t\t\t_particleCount ++\n\
\t\t\treturn particle;\n\
\n\
\t\t}\n\
\n\
\t\treturn _particlePool[ _particleCount ++ ];\n\
\n\
\t}\n\
\n\
\t//\n\
\n\
\tfunction painterSort( a, b ) {\n\
\n\
\t\treturn b.z - a.z;\n\
\n\
\t}\n\
\n\
\tfunction clipLine( s1, s2 ) {\n\
\n\
\t\tvar alpha1 = 0, alpha2 = 1,\n\
\n\
\t\t// Calculate the boundary coordinate of each vertex for the near and far clip planes,\n\
\t\t// Z = -1 and Z = +1, respectively.\n\
\t\tbc1near =  s1.z + s1.w,\n\
\t\tbc2near =  s2.z + s2.w,\n\
\t\tbc1far =  - s1.z + s1.w,\n\
\t\tbc2far =  - s2.z + s2.w;\n\
\n\
\t\tif ( bc1near >= 0 && bc2near >= 0 && bc1far >= 0 && bc2far >= 0 ) {\n\
\n\
\t\t\t// Both vertices lie entirely within all clip planes.\n\
\t\t\treturn true;\n\
\n\
\t\t} else if ( ( bc1near < 0 && bc2near < 0) || (bc1far < 0 && bc2far < 0 ) ) {\n\
\n\
\t\t\t// Both vertices lie entirely outside one of the clip planes.\n\
\t\t\treturn false;\n\
\n\
\t\t} else {\n\
\n\
\t\t\t// The line segment spans at least one clip plane.\n\
\n\
\t\t\tif ( bc1near < 0 ) {\n\
\n\
\t\t\t\t// v1 lies outside the near plane, v2 inside\n\
\t\t\t\talpha1 = Math.max( alpha1, bc1near / ( bc1near - bc2near ) );\n\
\n\
\t\t\t} else if ( bc2near < 0 ) {\n\
\n\
\t\t\t\t// v2 lies outside the near plane, v1 inside\n\
\t\t\t\talpha2 = Math.min( alpha2, bc1near / ( bc1near - bc2near ) );\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( bc1far < 0 ) {\n\
\n\
\t\t\t\t// v1 lies outside the far plane, v2 inside\n\
\t\t\t\talpha1 = Math.max( alpha1, bc1far / ( bc1far - bc2far ) );\n\
\n\
\t\t\t} else if ( bc2far < 0 ) {\n\
\n\
\t\t\t\t// v2 lies outside the far plane, v2 inside\n\
\t\t\t\talpha2 = Math.min( alpha2, bc1far / ( bc1far - bc2far ) );\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( alpha2 < alpha1 ) {\n\
\n\
\t\t\t\t// The line segment spans two boundaries, but is outside both of them.\n\
\t\t\t\t// (This can't happen when we're only clipping against just near/far but good\n\
\t\t\t\t//  to leave the check here for future usage if other clip planes are added.)\n\
\t\t\t\treturn false;\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\t// Update the s1 and s2 vertices to match the clipped line segment.\n\
\t\t\t\ts1.lerpSelf( s2, alpha1 );\n\
\t\t\t\ts2.lerpSelf( s1, 1 - alpha2 );\n\
\n\
\t\t\t\treturn true;\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
};\n\
/**\n\
 * @author mikael emtinger / http://gomo.se/\n\
 * @author alteredq / http://alteredqualia.com/\n\
 * @author WestLangley / http://github.com/WestLangley\n\
 */\n\
\n\
THREE.Quaternion = function( x, y, z, w ) {\n\
\n\
\tthis.x = x || 0;\n\
\tthis.y = y || 0;\n\
\tthis.z = z || 0;\n\
\tthis.w = ( w !== undefined ) ? w : 1;\n\
\n\
};\n\
\n\
THREE.Quaternion.prototype = {\n\
\n\
\tconstructor: THREE.Quaternion,\n\
\n\
\tset: function ( x, y, z, w ) {\n\
\n\
\t\tthis.x = x;\n\
\t\tthis.y = y;\n\
\t\tthis.z = z;\n\
\t\tthis.w = w;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tcopy: function ( q ) {\n\
\n\
\t\tthis.x = q.x;\n\
\t\tthis.y = q.y;\n\
\t\tthis.z = q.z;\n\
\t\tthis.w = q.w;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tsetFromEuler: function ( v, order ) {\n\
\n\
\t\t// http://www.mathworks.com/matlabcentral/fileexchange/\n\
\t\t// \t20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/\n\
\t\t//\tcontent/SpinCalc.m\n\
\t\n\
\t\tvar c1 = Math.cos( v.x / 2 );\n\
\t\tvar c2 = Math.cos( v.y / 2 );\n\
\t\tvar c3 = Math.cos( v.z / 2 );\n\
\t\tvar s1 = Math.sin( v.x / 2 );\n\
\t\tvar s2 = Math.sin( v.y / 2 );\n\
\t\tvar s3 = Math.sin( v.z / 2 );\n\
\n\
\t\tif ( order === undefined || order === 'XYZ' ) {\n\
\n\
\t\t\tthis.x = s1 * c2 * c3 + c1 * s2 * s3;\n\
\t\t\tthis.y = c1 * s2 * c3 - s1 * c2 * s3;\n\
\t\t\tthis.z = c1 * c2 * s3 + s1 * s2 * c3;\n\
\t\t\tthis.w = c1 * c2 * c3 - s1 * s2 * s3;\n\
\n\
\t\t} else if ( order === 'YXZ' ) {\n\
\t\n\
\t\t\tthis.x = s1 * c2 * c3 + c1 * s2 * s3;\n\
\t\t\tthis.y = c1 * s2 * c3 - s1 * c2 * s3;\n\
\t\t\tthis.z = c1 * c2 * s3 - s1 * s2 * c3;\n\
\t\t\tthis.w = c1 * c2 * c3 + s1 * s2 * s3;\n\
\t\t\t\t\n\
\t\t} else if ( order === 'ZXY' ) {\n\
\t\n\
\t\t\tthis.x = s1 * c2 * c3 - c1 * s2 * s3;\n\
\t\t\tthis.y = c1 * s2 * c3 + s1 * c2 * s3;\n\
\t\t\tthis.z = c1 * c2 * s3 + s1 * s2 * c3;\n\
\t\t\tthis.w = c1 * c2 * c3 - s1 * s2 * s3;\n\
\t\t\t\t\n\
\t\t} else if ( order === 'ZYX' ) {\n\
\t\n\
\t\t\tthis.x = s1 * c2 * c3 - c1 * s2 * s3;\n\
\t\t\tthis.y = c1 * s2 * c3 + s1 * c2 * s3;\n\
\t\t\tthis.z = c1 * c2 * s3 - s1 * s2 * c3;\n\
\t\t\tthis.w = c1 * c2 * c3 + s1 * s2 * s3;\n\
\t\t\t\t\n\
\t\t} else if ( order === 'YZX' ) {\n\
\t\t\t\n\
\t\t\tthis.x = s1 * c2 * c3 + c1 * s2 * s3;\n\
\t\t\tthis.y = c1 * s2 * c3 + s1 * c2 * s3;\n\
\t\t\tthis.z = c1 * c2 * s3 - s1 * s2 * c3;\n\
\t\t\tthis.w = c1 * c2 * c3 - s1 * s2 * s3;\n\
\t\t\t\t\n\
\t\t} else if ( order === 'XZY' ) {\n\
\t\t\t\n\
\t\t\tthis.x = s1 * c2 * c3 - c1 * s2 * s3;\n\
\t\t\tthis.y = c1 * s2 * c3 - s1 * c2 * s3;\n\
\t\t\tthis.z = c1 * c2 * s3 + s1 * s2 * c3;\n\
\t\t\tthis.w = c1 * c2 * c3 + s1 * s2 * s3;\n\
\t\t\t\t\n\
\t\t}\n\
\t\t\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tsetFromAxisAngle: function ( axis, angle ) {\n\
\n\
\t\t// from http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm\n\
\t\t// axis have to be normalized\n\
\n\
\t\tvar halfAngle = angle / 2,\n\
\t\t\ts = Math.sin( halfAngle );\n\
\n\
\t\tthis.x = axis.x * s;\n\
\t\tthis.y = axis.y * s;\n\
\t\tthis.z = axis.z * s;\n\
\t\tthis.w = Math.cos( halfAngle );\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tsetFromRotationMatrix: function ( m ) {\n\
\n\
\t\t// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm\n\
\t\t\n\
\t\t// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)\n\
\t\t\n\
\t\tvar te = m.elements,\n\
\t\t\t\n\
\t\t\tm11 = te[0], m12 = te[4], m13 = te[8],\n\
\t\t\tm21 = te[1], m22 = te[5], m23 = te[9],\n\
\t\t\tm31 = te[2], m32 = te[6], m33 = te[10],\n\
\t\t\t\n\
\t\t\ttrace = m11 + m22 + m33,\n\
\t\t\ts;\n\
\t\t\n\
\t\tif( trace > 0 ) {\n\
\t\t\n\
\t\t\ts = 0.5 / Math.sqrt( trace + 1.0 );\n\
\t\t\t\n\
\t\t\tthis.w = 0.25 / s;\n\
\t\t\tthis.x = ( m32 - m23 ) * s;\n\
\t\t\tthis.y = ( m13 - m31 ) * s;\n\
\t\t\tthis.z = ( m21 - m12 ) * s;\n\
\t\t\n\
\t\t} else if ( m11 > m22 && m11 > m33 ) {\n\
\t\t\n\
\t\t\ts = 2.0 * Math.sqrt( 1.0 + m11 - m22 - m33 );\n\
\t\t\t\n\
\t\t\tthis.w = (m32 - m23 ) / s;\n\
\t\t\tthis.x = 0.25 * s;\n\
\t\t\tthis.y = (m12 + m21 ) / s;\n\
\t\t\tthis.z = (m13 + m31 ) / s;\n\
\t\t\n\
\t\t} else if (m22 > m33) {\n\
\t\t\n\
\t\t\ts = 2.0 * Math.sqrt( 1.0 + m22 - m11 - m33 );\n\
\t\t\t\n\
\t\t\tthis.w = (m13 - m31 ) / s;\n\
\t\t\tthis.x = (m12 + m21 ) / s;\n\
\t\t\tthis.y = 0.25 * s;\n\
\t\t\tthis.z = (m23 + m32 ) / s;\n\
\t\t\n\
\t\t} else {\n\
\t\t\n\
\t\t\ts = 2.0 * Math.sqrt( 1.0 + m33 - m11 - m22 );\n\
\t\t\t\n\
\t\t\tthis.w = ( m21 - m12 ) / s;\n\
\t\t\tthis.x = ( m13 + m31 ) / s;\n\
\t\t\tthis.y = ( m23 + m32 ) / s;\n\
\t\t\tthis.z = 0.25 * s;\n\
\t\t\n\
\t\t}\n\
\t\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tcalculateW : function () {\n\
\n\
\t\tthis.w = - Math.sqrt( Math.abs( 1.0 - this.x * this.x - this.y * this.y - this.z * this.z ) );\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tinverse: function () {\n\
\n\
\t\tthis.x *= -1;\n\
\t\tthis.y *= -1;\n\
\t\tthis.z *= -1;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tlength: function () {\n\
\n\
\t\treturn Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w );\n\
\n\
\t},\n\
\n\
\tnormalize: function () {\n\
\n\
\t\tvar l = Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w );\n\
\n\
\t\tif ( l === 0 ) {\n\
\n\
\t\t\tthis.x = 0;\n\
\t\t\tthis.y = 0;\n\
\t\t\tthis.z = 0;\n\
\t\t\tthis.w = 0;\n\
\n\
\t\t} else {\n\
\n\
\t\t\tl = 1 / l;\n\
\n\
\t\t\tthis.x = this.x * l;\n\
\t\t\tthis.y = this.y * l;\n\
\t\t\tthis.z = this.z * l;\n\
\t\t\tthis.w = this.w * l;\n\
\n\
\t\t}\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tmultiply: function ( a, b ) {\n\
\n\
\t\t// from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm\n\
\t\tvar qax = a.x, qay = a.y, qaz = a.z, qaw = a.w,\n\
\t\tqbx = b.x, qby = b.y, qbz = b.z, qbw = b.w;\n\
\n\
\t\tthis.x =  qax * qbw + qay * qbz - qaz * qby + qaw * qbx;\n\
\t\tthis.y = -qax * qbz + qay * qbw + qaz * qbx + qaw * qby;\n\
\t\tthis.z =  qax * qby - qay * qbx + qaz * qbw + qaw * qbz;\n\
\t\tthis.w = -qax * qbx - qay * qby - qaz * qbz + qaw * qbw;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tmultiplySelf: function ( b ) {\n\
\n\
\t\tvar qax = this.x, qay = this.y, qaz = this.z, qaw = this.w,\n\
\t\tqbx = b.x, qby = b.y, qbz = b.z, qbw = b.w;\n\
\n\
\t\tthis.x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;\n\
\t\tthis.y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;\n\
\t\tthis.z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;\n\
\t\tthis.w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tmultiplyVector3: function ( vector, dest ) {\n\
\n\
\t\tif ( !dest ) { dest = vector; }\n\
\n\
\t\tvar x    = vector.x,  y  = vector.y,  z  = vector.z,\n\
\t\t\tqx   = this.x, qy = this.y, qz = this.z, qw = this.w;\n\
\n\
\t\t// calculate quat * vector\n\
\n\
\t\tvar ix =  qw * x + qy * z - qz * y,\n\
\t\t\tiy =  qw * y + qz * x - qx * z,\n\
\t\t\tiz =  qw * z + qx * y - qy * x,\n\
\t\t\tiw = -qx * x - qy * y - qz * z;\n\
\n\
\t\t// calculate result * inverse quat\n\
\n\
\t\tdest.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;\n\
\t\tdest.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;\n\
\t\tdest.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;\n\
\n\
\t\treturn dest;\n\
\n\
\t},\n\
\n\
\tslerpSelf: function ( qb, t ) {\n\
\n\
\t\tvar x = this.x, y = this.y, z = this.z, w = this.w;\n\
\n\
\t\t// http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/\n\
\n\
\t\tvar cosHalfTheta = w * qb.w + x * qb.x + y * qb.y + z * qb.z;\n\
\n\
\t\tif ( cosHalfTheta < 0 ) {\n\
\n\
\t\t\tthis.w = -qb.w;\n\
\t\t\tthis.x = -qb.x;\n\
\t\t\tthis.y = -qb.y;\n\
\t\t\tthis.z = -qb.z;\n\
\n\
\t\t\tcosHalfTheta = -cosHalfTheta;\n\
\n\
\t\t} else {\n\
\n\
\t\t\tthis.copy( qb );\n\
\n\
\t\t}\n\
\n\
\t\tif ( cosHalfTheta >= 1.0 ) {\n\
\n\
\t\t\tthis.w = w;\n\
\t\t\tthis.x = x;\n\
\t\t\tthis.y = y;\n\
\t\t\tthis.z = z;\n\
\n\
\t\t\treturn this;\n\
\n\
\t\t}\n\
\n\
\t\tvar halfTheta = Math.acos( cosHalfTheta );\n\
\t\tvar sinHalfTheta = Math.sqrt( 1.0 - cosHalfTheta * cosHalfTheta );\n\
\n\
\t\tif ( Math.abs( sinHalfTheta ) < 0.001 ) {\n\
\n\
\t\t\tthis.w = 0.5 * ( w + this.w );\n\
\t\t\tthis.x = 0.5 * ( x + this.x );\n\
\t\t\tthis.y = 0.5 * ( y + this.y );\n\
\t\t\tthis.z = 0.5 * ( z + this.z );\n\
\n\
\t\t\treturn this;\n\
\n\
\t\t}\n\
\n\
\t\tvar ratioA = Math.sin( ( 1 - t ) * halfTheta ) / sinHalfTheta,\n\
\t\tratioB = Math.sin( t * halfTheta ) / sinHalfTheta;\n\
\n\
\t\tthis.w = ( w * ratioA + this.w * ratioB );\n\
\t\tthis.x = ( x * ratioA + this.x * ratioB );\n\
\t\tthis.y = ( y * ratioA + this.y * ratioB );\n\
\t\tthis.z = ( z * ratioA + this.z * ratioB );\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tclone: function () {\n\
\n\
\t\treturn new THREE.Quaternion( this.x, this.y, this.z, this.w );\n\
\n\
\t}\n\
\n\
}\n\
\n\
THREE.Quaternion.slerp = function ( qa, qb, qm, t ) {\n\
\n\
\t// http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/\n\
\n\
\tvar cosHalfTheta = qa.w * qb.w + qa.x * qb.x + qa.y * qb.y + qa.z * qb.z;\n\
\n\
\tif ( cosHalfTheta < 0 ) {\n\
\n\
\t\tqm.w = -qb.w;\n\
\t\tqm.x = -qb.x;\n\
\t\tqm.y = -qb.y;\n\
\t\tqm.z = -qb.z;\n\
\n\
\t\tcosHalfTheta = -cosHalfTheta;\n\
\n\
\t} else {\n\
\n\
\t\tqm.copy( qb );\n\
\n\
\t}\n\
\n\
\tif ( Math.abs( cosHalfTheta ) >= 1.0 ) {\n\
\n\
\t\tqm.w = qa.w;\n\
\t\tqm.x = qa.x;\n\
\t\tqm.y = qa.y;\n\
\t\tqm.z = qa.z;\n\
\n\
\t\treturn qm;\n\
\n\
\t}\n\
\n\
\tvar halfTheta = Math.acos( cosHalfTheta );\n\
\tvar sinHalfTheta = Math.sqrt( 1.0 - cosHalfTheta * cosHalfTheta );\n\
\n\
\tif ( Math.abs( sinHalfTheta ) < 0.001 ) {\n\
\n\
\t\tqm.w = 0.5 * ( qa.w + qm.w );\n\
\t\tqm.x = 0.5 * ( qa.x + qm.x );\n\
\t\tqm.y = 0.5 * ( qa.y + qm.y );\n\
\t\tqm.z = 0.5 * ( qa.z + qm.z );\n\
\n\
\t\treturn qm;\n\
\n\
\t}\n\
\n\
\tvar ratioA = Math.sin( ( 1 - t ) * halfTheta ) / sinHalfTheta;\n\
\tvar ratioB = Math.sin( t * halfTheta ) / sinHalfTheta;\n\
\n\
\tqm.w = ( qa.w * ratioA + qm.w * ratioB );\n\
\tqm.x = ( qa.x * ratioA + qm.x * ratioB );\n\
\tqm.y = ( qa.y * ratioA + qm.y * ratioB );\n\
\tqm.z = ( qa.z * ratioA + qm.z * ratioB );\n\
\n\
\treturn qm;\n\
\n\
}\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 */\n\
\n\
THREE.Vertex = function ( v ) {\n\
\n\
\tconsole.warn( 'THREE.Vertex has been DEPRECATED. Use THREE.Vector3 instead.')\n\
\treturn v;\n\
\n\
};\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.Face3 = function ( a, b, c, normal, color, materialIndex ) {\n\
\n\
\tthis.a = a;\n\
\tthis.b = b;\n\
\tthis.c = c;\n\
\n\
\tthis.normal = normal instanceof THREE.Vector3 ? normal : new THREE.Vector3();\n\
\tthis.vertexNormals = normal instanceof Array ? normal : [ ];\n\
\n\
\tthis.color = color instanceof THREE.Color ? color : new THREE.Color();\n\
\tthis.vertexColors = color instanceof Array ? color : [];\n\
\n\
\tthis.vertexTangents = [];\n\
\n\
\tthis.materialIndex = materialIndex;\n\
\n\
\tthis.centroid = new THREE.Vector3();\n\
\n\
};\n\
\n\
THREE.Face3.prototype = {\n\
\n\
\tconstructor: THREE.Face3,\n\
\n\
\tclone: function () {\n\
\n\
\t\tvar face = new THREE.Face3( this.a, this.b, this.c );\n\
\n\
\t\tface.normal.copy( this.normal );\n\
\t\tface.color.copy( this.color );\n\
\t\tface.centroid.copy( this.centroid );\n\
\n\
\t\tface.materialIndex = this.materialIndex;\n\
\n\
\t\tvar i, il;\n\
\t\tfor ( i = 0, il = this.vertexNormals.length; i < il; i ++ ) face.vertexNormals[ i ] = this.vertexNormals[ i ].clone();\n\
\t\tfor ( i = 0, il = this.vertexColors.length; i < il; i ++ ) face.vertexColors[ i ] = this.vertexColors[ i ].clone();\n\
\t\tfor ( i = 0, il = this.vertexTangents.length; i < il; i ++ ) face.vertexTangents[ i ] = this.vertexTangents[ i ].clone();\n\
\n\
\t\treturn face;\n\
\n\
\t}\n\
\n\
};\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.Face4 = function ( a, b, c, d, normal, color, materialIndex ) {\n\
\n\
\tthis.a = a;\n\
\tthis.b = b;\n\
\tthis.c = c;\n\
\tthis.d = d;\n\
\n\
\tthis.normal = normal instanceof THREE.Vector3 ? normal : new THREE.Vector3();\n\
\tthis.vertexNormals = normal instanceof Array ? normal : [ ];\n\
\n\
\tthis.color = color instanceof THREE.Color ? color : new THREE.Color();\n\
\tthis.vertexColors = color instanceof Array ? color : [];\n\
\n\
\tthis.vertexTangents = [];\n\
\n\
\tthis.materialIndex = materialIndex;\n\
\n\
\tthis.centroid = new THREE.Vector3();\n\
\n\
};\n\
\n\
THREE.Face4.prototype = {\n\
\n\
\tconstructor: THREE.Face4,\n\
\n\
\tclone: function () {\n\
\n\
\t\tvar face = new THREE.Face4( this.a, this.b, this.c, this.d );\n\
\n\
\t\tface.normal.copy( this.normal );\n\
\t\tface.color.copy( this.color );\n\
\t\tface.centroid.copy( this.centroid );\n\
\n\
\t\tface.materialIndex = this.materialIndex;\n\
\n\
\t\tvar i, il;\n\
\t\tfor ( i = 0, il = this.vertexNormals.length; i < il; i ++ ) face.vertexNormals[ i ] = this.vertexNormals[ i ].clone();\n\
\t\tfor ( i = 0, il = this.vertexColors.length; i < il; i ++ ) face.vertexColors[ i ] = this.vertexColors[ i ].clone();\n\
\t\tfor ( i = 0, il = this.vertexTangents.length; i < il; i ++ ) face.vertexTangents[ i ] = this.vertexTangents[ i ].clone();\n\
\n\
\t\treturn face;\n\
\n\
\t}\n\
\n\
};\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 */\n\
\n\
THREE.UV = function ( u, v ) {\n\
\n\
\tthis.u = u || 0;\n\
\tthis.v = v || 0;\n\
\n\
};\n\
\n\
THREE.UV.prototype = {\n\
\n\
\tconstructor: THREE.UV,\n\
\n\
\tset: function ( u, v ) {\n\
\n\
\t\tthis.u = u;\n\
\t\tthis.v = v;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tcopy: function ( uv ) {\n\
\n\
\t\tthis.u = uv.u;\n\
\t\tthis.v = uv.v;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tlerpSelf: function ( uv, alpha ) {\n\
\n\
\t\tthis.u += ( uv.u - this.u ) * alpha;\n\
\t\tthis.v += ( uv.v - this.v ) * alpha;\n\
\n\
\t\treturn this;\n\
\n\
\t},\n\
\n\
\tclone: function () {\n\
\n\
\t\treturn new THREE.UV( this.u, this.v );\n\
\n\
\t}\n\
\n\
};\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 * @author kile / http://kile.stravaganza.org/\n\
 * @author alteredq / http://alteredqualia.com/\n\
 * @author mikael emtinger / http://gomo.se/\n\
 * @author zz85 / http://www.lab4games.net/zz85/blog\n\
 */\n\
\n\
THREE.Geometry = function () {\n\
\n\
\tthis.id = THREE.GeometryCount ++;\n\
\n\
\tthis.name = '';\n\
\n\
\tthis.vertices = [];\n\
\tthis.colors = []; // one-to-one vertex colors, used in ParticleSystem, Line and Ribbon\n\
\n\
\tthis.materials = [];\n\
\n\
\tthis.faces = [];\n\
\n\
\tthis.faceUvs = [[]];\n\
\tthis.faceVertexUvs = [[]];\n\
\n\
\tthis.morphTargets = [];\n\
\tthis.morphColors = [];\n\
\tthis.morphNormals = [];\n\
\n\
\tthis.skinWeights = [];\n\
\tthis.skinIndices = [];\n\
\n\
\tthis.boundingBox = null;\n\
\tthis.boundingSphere = null;\n\
\n\
\tthis.hasTangents = false;\n\
\n\
\tthis.dynamic = true; // the intermediate typearrays will be deleted when set to false\n\
\n\
};\n\
\n\
THREE.Geometry.prototype = {\n\
\n\
\tconstructor : THREE.Geometry,\n\
\n\
\tapplyMatrix: function ( matrix ) {\n\
\n\
\t\tvar matrixRotation = new THREE.Matrix4();\n\
\t\tmatrixRotation.extractRotation( matrix );\n\
\n\
\t\tfor ( var i = 0, il = this.vertices.length; i < il; i ++ ) {\n\
\n\
\t\t\tvar vertex = this.vertices[ i ];\n\
\n\
\t\t\tmatrix.multiplyVector3( vertex );\n\
\n\
\t\t}\n\
\n\
\t\tfor ( var i = 0, il = this.faces.length; i < il; i ++ ) {\n\
\n\
\t\t\tvar face = this.faces[ i ];\n\
\n\
\t\t\tmatrixRotation.multiplyVector3( face.normal );\n\
\n\
\t\t\tfor ( var j = 0, jl = face.vertexNormals.length; j < jl; j ++ ) {\n\
\n\
\t\t\t\tmatrixRotation.multiplyVector3( face.vertexNormals[ j ] );\n\
\n\
\t\t\t}\n\
\n\
\t\t\tmatrix.multiplyVector3( face.centroid );\n\
\n\
\t\t}\n\
\n\
\t},\n\
\n\
\tcomputeCentroids: function () {\n\
\n\
\t\tvar f, fl, face;\n\
\n\
\t\tfor ( f = 0, fl = this.faces.length; f < fl; f ++ ) {\n\
\n\
\t\t\tface = this.faces[ f ];\n\
\t\t\tface.centroid.set( 0, 0, 0 );\n\
\n\
\t\t\tif ( face instanceof THREE.Face3 ) {\n\
\n\
\t\t\t\tface.centroid.addSelf( this.vertices[ face.a ] );\n\
\t\t\t\tface.centroid.addSelf( this.vertices[ face.b ] );\n\
\t\t\t\tface.centroid.addSelf( this.vertices[ face.c ] );\n\
\t\t\t\tface.centroid.divideScalar( 3 );\n\
\n\
\t\t\t} else if ( face instanceof THREE.Face4 ) {\n\
\n\
\t\t\t\tface.centroid.addSelf( this.vertices[ face.a ] );\n\
\t\t\t\tface.centroid.addSelf( this.vertices[ face.b ] );\n\
\t\t\t\tface.centroid.addSelf( this.vertices[ face.c ] );\n\
\t\t\t\tface.centroid.addSelf( this.vertices[ face.d ] );\n\
\t\t\t\tface.centroid.divideScalar( 4 );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t},\n\
\n\
\tcomputeFaceNormals: function () {\n\
\n\
\t\tvar n, nl, v, vl, vertex, f, fl, face, vA, vB, vC,\n\
\t\tcb = new THREE.Vector3(), ab = new THREE.Vector3();\n\
\n\
\t\tfor ( f = 0, fl = this.faces.length; f < fl; f ++ ) {\n\
\n\
\t\t\tface = this.faces[ f ];\n\
\n\
\t\t\tvA = this.vertices[ face.a ];\n\
\t\t\tvB = this.vertices[ face.b ];\n\
\t\t\tvC = this.vertices[ face.c ];\n\
\n\
\t\t\tcb.sub( vC, vB );\n\
\t\t\tab.sub( vA, vB );\n\
\t\t\tcb.crossSelf( ab );\n\
\n\
\t\t\tif ( !cb.isZero() ) {\n\
\n\
\t\t\t\tcb.normalize();\n\
\n\
\t\t\t}\n\
\n\
\t\t\tface.normal.copy( cb );\n\
\n\
\t\t}\n\
\n\
\t},\n\
\n\
\tcomputeVertexNormals: function () {\n\
\n\
\t\tvar v, vl, f, fl, face, vertices;\n\
\n\
\t\t// create internal buffers for reuse when calling this method repeatedly\n\
\t\t// (otherwise memory allocation / deallocation every frame is big resource hog)\n\
\n\
\t\tif ( this.__tmpVertices === undefined ) {\n\
\n\
\t\t\tthis.__tmpVertices = new Array( this.vertices.length );\n\
\t\t\tvertices = this.__tmpVertices;\n\
\n\
\t\t\tfor ( v = 0, vl = this.vertices.length; v < vl; v ++ ) {\n\
\n\
\t\t\t\tvertices[ v ] = new THREE.Vector3();\n\
\n\
\t\t\t}\n\
\n\
\t\t\tfor ( f = 0, fl = this.faces.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\tface = this.faces[ f ];\n\
\n\
\t\t\t\tif ( face instanceof THREE.Face3 ) {\n\
\n\
\t\t\t\t\tface.vertexNormals = [ new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3() ];\n\
\n\
\t\t\t\t} else if ( face instanceof THREE.Face4 ) {\n\
\n\
\t\t\t\t\tface.vertexNormals = [ new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3() ];\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t} else {\n\
\n\
\t\t\tvertices = this.__tmpVertices;\n\
\n\
\t\t\tfor ( v = 0, vl = this.vertices.length; v < vl; v ++ ) {\n\
\n\
\t\t\t\tvertices[ v ].set( 0, 0, 0 );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tfor ( f = 0, fl = this.faces.length; f < fl; f ++ ) {\n\
\n\
\t\t\tface = this.faces[ f ];\n\
\n\
\t\t\tif ( face instanceof THREE.Face3 ) {\n\
\n\
\t\t\t\tvertices[ face.a ].addSelf( face.normal );\n\
\t\t\t\tvertices[ face.b ].addSelf( face.normal );\n\
\t\t\t\tvertices[ face.c ].addSelf( face.normal );\n\
\n\
\t\t\t} else if ( face instanceof THREE.Face4 ) {\n\
\n\
\t\t\t\tvertices[ face.a ].addSelf( face.normal );\n\
\t\t\t\tvertices[ face.b ].addSelf( face.normal );\n\
\t\t\t\tvertices[ face.c ].addSelf( face.normal );\n\
\t\t\t\tvertices[ face.d ].addSelf( face.normal );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tfor ( v = 0, vl = this.vertices.length; v < vl; v ++ ) {\n\
\n\
\t\t\tvertices[ v ].normalize();\n\
\n\
\t\t}\n\
\n\
\t\tfor ( f = 0, fl = this.faces.length; f < fl; f ++ ) {\n\
\n\
\t\t\tface = this.faces[ f ];\n\
\n\
\t\t\tif ( face instanceof THREE.Face3 ) {\n\
\n\
\t\t\t\tface.vertexNormals[ 0 ].copy( vertices[ face.a ] );\n\
\t\t\t\tface.vertexNormals[ 1 ].copy( vertices[ face.b ] );\n\
\t\t\t\tface.vertexNormals[ 2 ].copy( vertices[ face.c ] );\n\
\n\
\t\t\t} else if ( face instanceof THREE.Face4 ) {\n\
\n\
\t\t\t\tface.vertexNormals[ 0 ].copy( vertices[ face.a ] );\n\
\t\t\t\tface.vertexNormals[ 1 ].copy( vertices[ face.b ] );\n\
\t\t\t\tface.vertexNormals[ 2 ].copy( vertices[ face.c ] );\n\
\t\t\t\tface.vertexNormals[ 3 ].copy( vertices[ face.d ] );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t},\n\
\n\
\tcomputeMorphNormals: function () {\n\
\n\
\t\tvar i, il, f, fl, face;\n\
\n\
\t\t// save original normals\n\
\t\t// - create temp variables on first access\n\
\t\t//   otherwise just copy (for faster repeated calls)\n\
\n\
\t\tfor ( f = 0, fl = this.faces.length; f < fl; f ++ ) {\n\
\n\
\t\t\tface = this.faces[ f ];\n\
\n\
\t\t\tif ( ! face.__originalFaceNormal ) {\n\
\n\
\t\t\t\tface.__originalFaceNormal = face.normal.clone();\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tface.__originalFaceNormal.copy( face.normal );\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( ! face.__originalVertexNormals ) face.__originalVertexNormals = [];\n\
\n\
\t\t\tfor ( i = 0, il = face.vertexNormals.length; i < il; i ++ ) {\n\
\n\
\t\t\t\tif ( ! face.__originalVertexNormals[ i ] ) {\n\
\n\
\t\t\t\t\tface.__originalVertexNormals[ i ] = face.vertexNormals[ i ].clone();\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\tface.__originalVertexNormals[ i ].copy( face.vertexNormals[ i ] );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\t// use temp geometry to compute face and vertex normals for each morph\n\
\n\
\t\tvar tmpGeo = new THREE.Geometry();\n\
\t\ttmpGeo.faces = this.faces;\n\
\n\
\t\tfor ( i = 0, il = this.morphTargets.length; i < il; i ++ ) {\n\
\n\
\t\t\t// create on first access\n\
\n\
\t\t\tif ( ! this.morphNormals[ i ] ) {\n\
\n\
\t\t\t\tthis.morphNormals[ i ] = {};\n\
\t\t\t\tthis.morphNormals[ i ].faceNormals = [];\n\
\t\t\t\tthis.morphNormals[ i ].vertexNormals = [];\n\
\n\
\t\t\t\tvar dstNormalsFace = this.morphNormals[ i ].faceNormals;\n\
\t\t\t\tvar dstNormalsVertex = this.morphNormals[ i ].vertexNormals;\n\
\n\
\t\t\t\tvar faceNormal, vertexNormals;\n\
\n\
\t\t\t\tfor ( f = 0, fl = this.faces.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\t\tface = this.faces[ f ];\n\
\n\
\t\t\t\t\tfaceNormal = new THREE.Vector3();\n\
\n\
\t\t\t\t\tif ( face instanceof THREE.Face3 ) {\n\
\n\
\t\t\t\t\t\tvertexNormals = { a: new THREE.Vector3(), b: new THREE.Vector3(), c: new THREE.Vector3() };\n\
\n\
\t\t\t\t\t} else {\n\
\n\
\t\t\t\t\t\tvertexNormals = { a: new THREE.Vector3(), b: new THREE.Vector3(), c: new THREE.Vector3(), d: new THREE.Vector3() };\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\tdstNormalsFace.push( faceNormal );\n\
\t\t\t\t\tdstNormalsVertex.push( vertexNormals );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t\tvar morphNormals = this.morphNormals[ i ];\n\
\n\
\t\t\t// set vertices to morph target\n\
\n\
\t\t\ttmpGeo.vertices = this.morphTargets[ i ].vertices;\n\
\n\
\t\t\t// compute morph normals\n\
\n\
\t\t\ttmpGeo.computeFaceNormals();\n\
\t\t\ttmpGeo.computeVertexNormals();\n\
\n\
\t\t\t// store morph normals\n\
\n\
\t\t\tvar faceNormal, vertexNormals;\n\
\n\
\t\t\tfor ( f = 0, fl = this.faces.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\tface = this.faces[ f ];\n\
\n\
\t\t\t\tfaceNormal = morphNormals.faceNormals[ f ];\n\
\t\t\t\tvertexNormals = morphNormals.vertexNormals[ f ];\n\
\n\
\t\t\t\tfaceNormal.copy( face.normal );\n\
\n\
\t\t\t\tif ( face instanceof THREE.Face3 ) {\n\
\n\
\t\t\t\t\tvertexNormals.a.copy( face.vertexNormals[ 0 ] );\n\
\t\t\t\t\tvertexNormals.b.copy( face.vertexNormals[ 1 ] );\n\
\t\t\t\t\tvertexNormals.c.copy( face.vertexNormals[ 2 ] );\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\tvertexNormals.a.copy( face.vertexNormals[ 0 ] );\n\
\t\t\t\t\tvertexNormals.b.copy( face.vertexNormals[ 1 ] );\n\
\t\t\t\t\tvertexNormals.c.copy( face.vertexNormals[ 2 ] );\n\
\t\t\t\t\tvertexNormals.d.copy( face.vertexNormals[ 3 ] );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\t// restore original normals\n\
\n\
\t\tfor ( f = 0, fl = this.faces.length; f < fl; f ++ ) {\n\
\n\
\t\t\tface = this.faces[ f ];\n\
\n\
\t\t\tface.normal = face.__originalFaceNormal;\n\
\t\t\tface.vertexNormals = face.__originalVertexNormals;\n\
\n\
\t\t}\n\
\n\
\t},\n\
\n\
\tcomputeTangents: function () {\n\
\n\
\t\t// based on http://www.terathon.com/code/tangent.html\n\
\t\t// tangents go to vertices\n\
\n\
\t\tvar f, fl, v, vl, i, il, vertexIndex,\n\
\t\t\tface, uv, vA, vB, vC, uvA, uvB, uvC,\n\
\t\t\tx1, x2, y1, y2, z1, z2,\n\
\t\t\ts1, s2, t1, t2, r, t, test,\n\
\t\t\ttan1 = [], tan2 = [],\n\
\t\t\tsdir = new THREE.Vector3(), tdir = new THREE.Vector3(),\n\
\t\t\ttmp = new THREE.Vector3(), tmp2 = new THREE.Vector3(),\n\
\t\t\tn = new THREE.Vector3(), w;\n\
\n\
\t\tfor ( v = 0, vl = this.vertices.length; v < vl; v ++ ) {\n\
\n\
\t\t\ttan1[ v ] = new THREE.Vector3();\n\
\t\t\ttan2[ v ] = new THREE.Vector3();\n\
\n\
\t\t}\n\
\n\
\t\tfunction handleTriangle( context, a, b, c, ua, ub, uc ) {\n\
\n\
\t\t\tvA = context.vertices[ a ];\n\
\t\t\tvB = context.vertices[ b ];\n\
\t\t\tvC = context.vertices[ c ];\n\
\n\
\t\t\tuvA = uv[ ua ];\n\
\t\t\tuvB = uv[ ub ];\n\
\t\t\tuvC = uv[ uc ];\n\
\n\
\t\t\tx1 = vB.x - vA.x;\n\
\t\t\tx2 = vC.x - vA.x;\n\
\t\t\ty1 = vB.y - vA.y;\n\
\t\t\ty2 = vC.y - vA.y;\n\
\t\t\tz1 = vB.z - vA.z;\n\
\t\t\tz2 = vC.z - vA.z;\n\
\n\
\t\t\ts1 = uvB.u - uvA.u;\n\
\t\t\ts2 = uvC.u - uvA.u;\n\
\t\t\tt1 = uvB.v - uvA.v;\n\
\t\t\tt2 = uvC.v - uvA.v;\n\
\n\
\t\t\tr = 1.0 / ( s1 * t2 - s2 * t1 );\n\
\t\t\tsdir.set( ( t2 * x1 - t1 * x2 ) * r,\n\
\t\t\t\t\t  ( t2 * y1 - t1 * y2 ) * r,\n\
\t\t\t\t\t  ( t2 * z1 - t1 * z2 ) * r );\n\
\t\t\ttdir.set( ( s1 * x2 - s2 * x1 ) * r,\n\
\t\t\t\t\t  ( s1 * y2 - s2 * y1 ) * r,\n\
\t\t\t\t\t  ( s1 * z2 - s2 * z1 ) * r );\n\
\n\
\t\t\ttan1[ a ].addSelf( sdir );\n\
\t\t\ttan1[ b ].addSelf( sdir );\n\
\t\t\ttan1[ c ].addSelf( sdir );\n\
\n\
\t\t\ttan2[ a ].addSelf( tdir );\n\
\t\t\ttan2[ b ].addSelf( tdir );\n\
\t\t\ttan2[ c ].addSelf( tdir );\n\
\n\
\t\t}\n\
\n\
\t\tfor ( f = 0, fl = this.faces.length; f < fl; f ++ ) {\n\
\n\
\t\t\tface = this.faces[ f ];\n\
\t\t\tuv = this.faceVertexUvs[ 0 ][ f ]; // use UV layer 0 for tangents\n\
\n\
\t\t\tif ( face instanceof THREE.Face3 ) {\n\
\n\
\t\t\t\thandleTriangle( this, face.a, face.b, face.c, 0, 1, 2 );\n\
\n\
\t\t\t} else if ( face instanceof THREE.Face4 ) {\n\
\n\
\t\t\t\thandleTriangle( this, face.a, face.b, face.d, 0, 1, 3 );\n\
\t\t\t\thandleTriangle( this, face.b, face.c, face.d, 1, 2, 3 );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tvar faceIndex = [ 'a', 'b', 'c', 'd' ];\n\
\n\
\t\tfor ( f = 0, fl = this.faces.length; f < fl; f ++ ) {\n\
\n\
\t\t\tface = this.faces[ f ];\n\
\n\
\t\t\tfor ( i = 0; i < face.vertexNormals.length; i++ ) {\n\
\n\
\t\t\t\tn.copy( face.vertexNormals[ i ] );\n\
\n\
\t\t\t\tvertexIndex = face[ faceIndex[ i ] ];\n\
\n\
\t\t\t\tt = tan1[ vertexIndex ];\n\
\n\
\t\t\t\t// Gram-Schmidt orthogonalize\n\
\n\
\t\t\t\ttmp.copy( t );\n\
\t\t\t\ttmp.subSelf( n.multiplyScalar( n.dot( t ) ) ).normalize();\n\
\n\
\t\t\t\t// Calculate handedness\n\
\n\
\t\t\t\ttmp2.cross( face.vertexNormals[ i ], t );\n\
\t\t\t\ttest = tmp2.dot( tan2[ vertexIndex ] );\n\
\t\t\t\tw = (test < 0.0) ? -1.0 : 1.0;\n\
\n\
\t\t\t\tface.vertexTangents[ i ] = new THREE.Vector4( tmp.x, tmp.y, tmp.z, w );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tthis.hasTangents = true;\n\
\n\
\t},\n\
\n\
\tcomputeBoundingBox: function () {\n\
\n\
\t\tif ( ! this.boundingBox ) {\n\
\n\
\t\t\tthis.boundingBox = { min: new THREE.Vector3(), max: new THREE.Vector3() };\n\
\n\
\t\t}\n\
\n\
\t\tif ( this.vertices.length > 0 ) {\n\
\n\
\t\t\tvar position, firstPosition = this.vertices[ 0 ];\n\
\n\
\t\t\tthis.boundingBox.min.copy( firstPosition );\n\
\t\t\tthis.boundingBox.max.copy( firstPosition );\n\
\n\
\t\t\tvar min = this.boundingBox.min,\n\
\t\t\t\tmax = this.boundingBox.max;\n\
\n\
\t\t\tfor ( var v = 1, vl = this.vertices.length; v < vl; v ++ ) {\n\
\n\
\t\t\t\tposition = this.vertices[ v ];\n\
\n\
\t\t\t\tif ( position.x < min.x ) {\n\
\n\
\t\t\t\t\tmin.x = position.x;\n\
\n\
\t\t\t\t} else if ( position.x > max.x ) {\n\
\n\
\t\t\t\t\tmax.x = position.x;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tif ( position.y < min.y ) {\n\
\n\
\t\t\t\t\tmin.y = position.y;\n\
\n\
\t\t\t\t} else if ( position.y > max.y ) {\n\
\n\
\t\t\t\t\tmax.y = position.y;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tif ( position.z < min.z ) {\n\
\n\
\t\t\t\t\tmin.z = position.z;\n\
\n\
\t\t\t\t} else if ( position.z > max.z ) {\n\
\n\
\t\t\t\t\tmax.z = position.z;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t} else {\n\
\n\
\t\t\tthis.boundingBox.min.set( 0, 0, 0 );\n\
\t\t\tthis.boundingBox.max.set( 0, 0, 0 );\n\
\n\
\t\t}\n\
\n\
\t},\n\
\n\
\tcomputeBoundingSphere: function () {\n\
\n\
\t\tvar maxRadiusSq = 0;\n\
\n\
\t\tif ( this.boundingSphere === null ) this.boundingSphere = { radius: 0 };\n\
\n\
\t\tfor ( var i = 0, l = this.vertices.length; i < l; i ++ ) {\n\
\n\
\t\t\tvar radiusSq = this.vertices[ i ].lengthSq();\n\
\t\t\tif ( radiusSq > maxRadiusSq ) maxRadiusSq = radiusSq;\n\
\n\
\t\t}\n\
\n\
\t\tthis.boundingSphere.radius = Math.sqrt( maxRadiusSq );\n\
\n\
\t},\n\
\n\
\t/*\n\
\t * Checks for duplicate vertices with hashmap.\n\
\t * Duplicated vertices are removed\n\
\t * and faces' vertices are updated.\n\
\t */\n\
\n\
\tmergeVertices: function () {\n\
\n\
\t\tvar verticesMap = {}; // Hashmap for looking up vertice by position coordinates (and making sure they are unique)\n\
\t\tvar unique = [], changes = [];\n\
\n\
\t\tvar v, key;\n\
\t\tvar precisionPoints = 4; // number of decimal points, eg. 4 for epsilon of 0.0001\n\
\t\tvar precision = Math.pow( 10, precisionPoints );\n\
\t\tvar i,il, face;\n\
\t\tvar abcd = 'abcd', o, k, j, jl, u;\n\
\n\
\t\tfor ( i = 0, il = this.vertices.length; i < il; i ++ ) {\n\
\n\
\t\t\tv = this.vertices[ i ];\n\
\t\t\tkey = [ Math.round( v.x * precision ), Math.round( v.y * precision ), Math.round( v.z * precision ) ].join( '_' );\n\
\n\
\t\t\tif ( verticesMap[ key ] === undefined ) {\n\
\n\
\t\t\t\tverticesMap[ key ] = i;\n\
\t\t\t\tunique.push( this.vertices[ i ] );\n\
\t\t\t\tchanges[ i ] = unique.length - 1;\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\t//console.log('Duplicate vertex found. ', i, ' could be using ', verticesMap[key]);\n\
\t\t\t\tchanges[ i ] = changes[ verticesMap[ key ] ];\n\
\n\
\t\t\t}\n\
\n\
\t\t};\n\
\n\
\n\
\t\t// Start to patch face indices\n\
\n\
\t\tfor( i = 0, il = this.faces.length; i < il; i ++ ) {\n\
\n\
\t\t\tface = this.faces[ i ];\n\
\n\
\t\t\tif ( face instanceof THREE.Face3 ) {\n\
\n\
\t\t\t\tface.a = changes[ face.a ];\n\
\t\t\t\tface.b = changes[ face.b ];\n\
\t\t\t\tface.c = changes[ face.c ];\n\
\n\
\t\t\t} else if ( face instanceof THREE.Face4 ) {\n\
\n\
\t\t\t\tface.a = changes[ face.a ];\n\
\t\t\t\tface.b = changes[ face.b ];\n\
\t\t\t\tface.c = changes[ face.c ];\n\
\t\t\t\tface.d = changes[ face.d ];\n\
\n\
\t\t\t\t// check dups in (a, b, c, d) and convert to -> face3\n\
\n\
\t\t\t\to = [ face.a, face.b, face.c, face.d ];\n\
\n\
\t\t\t\tfor ( k = 3; k > 0; k -- ) {\n\
\n\
\t\t\t\t\tif ( o.indexOf( face[ abcd[ k ] ] ) !== k ) {\n\
\n\
\t\t\t\t\t\t// console.log('faces', face.a, face.b, face.c, face.d, 'dup at', k);\n\
\n\
\t\t\t\t\t\to.splice( k, 1 );\n\
\n\
\t\t\t\t\t\tthis.faces[ i ] = new THREE.Face3( o[0], o[1], o[2], face.normal, face.color, face.materialIndex );\n\
\n\
\t\t\t\t\t\tfor ( j = 0, jl = this.faceVertexUvs.length; j < jl; j ++ ) {\n\
\n\
\t\t\t\t\t\t\tu = this.faceVertexUvs[ j ][ i ];\n\
\t\t\t\t\t\t\tif ( u ) u.splice( k, 1 );\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\tthis.faces[ i ].vertexColors = face.vertexColors;\n\
\n\
\t\t\t\t\t\tbreak;\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\t// Use unique set of vertices\n\
\n\
\t\tvar diff = this.vertices.length - unique.length;\n\
\t\tthis.vertices = unique;\n\
\t\treturn diff;\n\
\n\
\t},\n\
\n\
\tclone: function () {\n\
\n\
\t\t// TODO\n\
\n\
\t}\n\
\n\
};\n\
\n\
THREE.GeometryCount = 0;\n\
/**\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.BufferGeometry = function () {\n\
\n\
\tthis.id = THREE.GeometryCount ++;\n\
\n\
\t// attributes\n\
\n\
\tthis.attributes = {};\n\
\n\
\t// attributes typed arrays are kept only if dynamic flag is set\n\
\n\
\tthis.dynamic = false;\n\
\n\
\t// boundings\n\
\n\
\tthis.boundingBox = null;\n\
\tthis.boundingSphere = null;\n\
\n\
\tthis.hasTangents = false;\n\
\n\
\t// for compatibility\n\
\n\
\tthis.morphTargets = [];\n\
\n\
};\n\
\n\
THREE.BufferGeometry.prototype = {\n\
\n\
\tconstructor : THREE.BufferGeometry,\n\
\n\
\tapplyMatrix: function ( matrix ) {\n\
\n\
\t\tvar positionArray;\n\
\t\tvar normalArray;\n\
\n\
\t\tif ( this.attributes[ \"position\" ] ) positionArray = this.attributes[ \"position\" ].array;\n\
\t\tif ( this.attributes[ \"normal\" ] ) normalArray = this.attributes[ \"normal\" ].array;\n\
\n\
\t\tif ( positionArray !== undefined ) {\n\
\n\
\t\t\tmatrix.multiplyVector3Array( positionArray );\n\
\t\t\tthis.verticesNeedUpdate = true;\n\
\n\
\t\t}\n\
\n\
\t\tif ( normalArray !== undefined ) {\n\
\n\
\t\t\tvar matrixRotation = new THREE.Matrix4();\n\
\t\t\tmatrixRotation.extractRotation( matrix );\n\
\n\
\t\t\tmatrixRotation.multiplyVector3Array( normalArray );\n\
\t\t\tthis.normalsNeedUpdate = true;\n\
\n\
\t\t}\n\
\n\
\t},\n\
\n\
\tcomputeBoundingBox: function () {\n\
\n\
\t\tif ( ! this.boundingBox ) {\n\
\n\
\t\t\tthis.boundingBox = {\n\
\n\
\t\t\t\tmin: new THREE.Vector3( Infinity, Infinity, Infinity ),\n\
\t\t\t\tmax: new THREE.Vector3( -Infinity, -Infinity, -Infinity )\n\
\n\
\t\t\t};\n\
\n\
\t\t}\n\
\n\
\t\tvar positions = this.attributes[ \"position\" ].array;\n\
\n\
\t\tif ( positions ) {\n\
\n\
\t\t\tvar bb = this.boundingBox;\n\
\t\t\tvar x, y, z;\n\
\n\
\t\t\tfor ( var i = 0, il = positions.length; i < il; i += 3 ) {\n\
\n\
\t\t\t\tx = positions[ i ];\n\
\t\t\t\ty = positions[ i + 1 ];\n\
\t\t\t\tz = positions[ i + 2 ];\n\
\n\
\t\t\t\t// bounding box\n\
\n\
\t\t\t\tif ( x < bb.min.x ) {\n\
\n\
\t\t\t\t\tbb.min.x = x;\n\
\n\
\t\t\t\t} else if ( x > bb.max.x ) {\n\
\n\
\t\t\t\t\tbb.max.x = x;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tif ( y < bb.min.y ) {\n\
\n\
\t\t\t\t\tbb.min.y = y;\n\
\n\
\t\t\t\t} else if ( y > bb.max.y ) {\n\
\n\
\t\t\t\t\tbb.max.y = y;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tif ( z < bb.min.z ) {\n\
\n\
\t\t\t\t\tbb.min.z = z;\n\
\n\
\t\t\t\t} else if ( z > bb.max.z ) {\n\
\n\
\t\t\t\t\tbb.max.z = z;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tif ( positions === undefined || positions.length === 0 ) {\n\
\n\
\t\t\tthis.boundingBox.min.set( 0, 0, 0 );\n\
\t\t\tthis.boundingBox.max.set( 0, 0, 0 );\n\
\n\
\t\t}\n\
\n\
\t},\n\
\n\
\tcomputeBoundingSphere: function () {\n\
\n\
\t\tif ( ! this.boundingSphere ) this.boundingSphere = { radius: 0 };\n\
\n\
\t\tvar positions = this.attributes[ \"position\" ].array;\n\
\n\
\t\tif ( positions ) {\n\
\n\
\t\t\tvar radiusSq, maxRadiusSq = 0;\n\
\t\t\tvar x, y, z;\n\
\n\
\t\t\tfor ( var i = 0, il = positions.length; i < il; i += 3 ) {\n\
\n\
\t\t\t\tx = positions[ i ];\n\
\t\t\t\ty = positions[ i + 1 ];\n\
\t\t\t\tz = positions[ i + 2 ];\n\
\n\
\t\t\t\tradiusSq =  x * x + y * y + z * z;\n\
\t\t\t\tif ( radiusSq > maxRadiusSq ) maxRadiusSq = radiusSq;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tthis.boundingSphere.radius = Math.sqrt( maxRadiusSq );\n\
\n\
\t\t}\n\
\n\
\t},\n\
\n\
\tcomputeVertexNormals: function () {\n\
\n\
\t\tif ( this.attributes[ \"position\" ] && this.attributes[ \"index\" ] ) {\n\
\n\
\t\t\tvar i, il;\n\
\t\t\tvar j, jl;\n\
\n\
\t\t\tvar nVertexElements = this.attributes[ \"position\" ].array.length;\n\
\n\
\t\t\tif ( this.attributes[ \"normal\" ] === undefined ) {\n\
\n\
\t\t\t\tthis.attributes[ \"normal\" ] = {\n\
\n\
\t\t\t\t\titemSize: 3,\n\
\t\t\t\t\tarray: new Float32Array( nVertexElements ),\n\
\t\t\t\t\tnumItems: nVertexElements\n\
\n\
\t\t\t\t};\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\t// reset existing normals to zero\n\
\n\
\t\t\t\tfor ( i = 0, il = this.attributes[ \"normal\" ].array.length; i < il; i ++ ) {\n\
\n\
\t\t\t\t\tthis.attributes[ \"normal\" ].array[ i ] = 0;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t\tvar offsets = this.offsets;\n\
\n\
\t\t\tvar indices = this.attributes[ \"index\" ].array;\n\
\t\t\tvar positions = this.attributes[ \"position\" ].array;\n\
\t\t\tvar normals = this.attributes[ \"normal\" ].array;\n\
\n\
\t\t\tvar vA, vB, vC, x, y, z,\n\
\n\
\t\t\tpA = new THREE.Vector3(),\n\
\t\t\tpB = new THREE.Vector3(),\n\
\t\t\tpC = new THREE.Vector3(),\n\
\n\
\t\t\tcb = new THREE.Vector3(),\n\
\t\t\tab = new THREE.Vector3();\n\
\n\
\t\t\tfor ( j = 0, jl = offsets.length; j < jl; ++ j ) {\n\
\n\
\t\t\t\tvar start = offsets[ j ].start;\n\
\t\t\t\tvar count = offsets[ j ].count;\n\
\t\t\t\tvar index = offsets[ j ].index;\n\
\n\
\t\t\t\tfor ( i = start, il = start + count; i < il; i += 3 ) {\n\
\n\
\t\t\t\t\tvA = index + indices[ i ];\n\
\t\t\t\t\tvB = index + indices[ i + 1 ];\n\
\t\t\t\t\tvC = index + indices[ i + 2 ];\n\
\n\
\t\t\t\t\tx = positions[ vA * 3 ];\n\
\t\t\t\t\ty = positions[ vA * 3 + 1 ];\n\
\t\t\t\t\tz = positions[ vA * 3 + 2 ];\n\
\t\t\t\t\tpA.set( x, y, z );\n\
\n\
\t\t\t\t\tx = positions[ vB * 3 ];\n\
\t\t\t\t\ty = positions[ vB * 3 + 1 ];\n\
\t\t\t\t\tz = positions[ vB * 3 + 2 ];\n\
\t\t\t\t\tpB.set( x, y, z );\n\
\n\
\t\t\t\t\tx = positions[ vC * 3 ];\n\
\t\t\t\t\ty = positions[ vC * 3 + 1 ];\n\
\t\t\t\t\tz = positions[ vC * 3 + 2 ];\n\
\t\t\t\t\tpC.set( x, y, z );\n\
\n\
\t\t\t\t\tcb.sub( pC, pB );\n\
\t\t\t\t\tab.sub( pA, pB );\n\
\t\t\t\t\tcb.crossSelf( ab );\n\
\n\
\t\t\t\t\tnormals[ vA * 3 ] += cb.x;\n\
\t\t\t\t\tnormals[ vA * 3 + 1 ] += cb.y;\n\
\t\t\t\t\tnormals[ vA * 3 + 2 ] += cb.z;\n\
\n\
\t\t\t\t\tnormals[ vB * 3 ] += cb.x;\n\
\t\t\t\t\tnormals[ vB * 3 + 1 ] += cb.y;\n\
\t\t\t\t\tnormals[ vB * 3 + 2 ] += cb.z;\n\
\n\
\t\t\t\t\tnormals[ vC * 3 ] += cb.x;\n\
\t\t\t\t\tnormals[ vC * 3 + 1 ] += cb.y;\n\
\t\t\t\t\tnormals[ vC * 3 + 2 ] += cb.z;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t\t// normalize normals\n\
\n\
\t\t\tfor ( i = 0, il = normals.length; i < il; i += 3 ) {\n\
\n\
\t\t\t\tx = normals[ i ];\n\
\t\t\t\ty = normals[ i + 1 ];\n\
\t\t\t\tz = normals[ i + 2 ];\n\
\n\
\t\t\t\tvar n = 1.0 / Math.sqrt( x * x + y * y + z * z );\n\
\n\
\t\t\t\tnormals[ i ] *= n;\n\
\t\t\t\tnormals[ i + 1 ] *= n;\n\
\t\t\t\tnormals[ i + 2 ] *= n;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tthis.normalsNeedUpdate = true;\n\
\n\
\t\t}\n\
\n\
\t},\n\
\n\
\tcomputeTangents: function () {\n\
\n\
\t\t// based on http://www.terathon.com/code/tangent.html\n\
\t\t// (per vertex tangents)\n\
\n\
\t\tif ( this.attributes[ \"index\" ] === undefined ||\n\
\t\t\t this.attributes[ \"position\" ] === undefined ||\n\
\t\t\t this.attributes[ \"normal\" ] === undefined ||\n\
\t\t\t this.attributes[ \"uv\" ] === undefined ) {\n\
\n\
\t\t\tconsole.warn( \"Missing required attributes (index, position, normal or uv) in BufferGeometry.computeTangents()\" );\n\
\t\t\treturn;\n\
\n\
\t\t}\n\
\n\
\t\tvar indices = this.attributes[ \"index\" ].array;\n\
\t\tvar positions = this.attributes[ \"position\" ].array;\n\
\t\tvar normals = this.attributes[ \"normal\" ].array;\n\
\t\tvar uvs = this.attributes[ \"uv\" ].array;\n\
\n\
\t\tvar nVertices = positions.length / 3;\n\
\n\
\t\tif ( this.attributes[ \"tangent\" ] === undefined ) {\n\
\n\
\t\t\tvar nTangentElements = 4 * nVertices;\n\
\n\
\t\t\tthis.attributes[ \"tangent\" ] = {\n\
\n\
\t\t\t\titemSize: 4,\n\
\t\t\t\tarray: new Float32Array( nTangentElements ),\n\
\t\t\t\tnumItems: nTangentElements\n\
\n\
\t\t\t};\n\
\n\
\t\t}\n\
\n\
\t\tvar tangents = this.attributes[ \"tangent\" ].array;\n\
\n\
\t\tvar tan1 = [], tan2 = [];\n\
\n\
\t\tfor ( var k = 0; k < nVertices; k ++ ) {\n\
\n\
\t\t\ttan1[ k ] = new THREE.Vector3();\n\
\t\t\ttan2[ k ] = new THREE.Vector3();\n\
\n\
\t\t}\n\
\n\
\t\tvar xA, yA, zA,\n\
\t\t\txB, yB, zB,\n\
\t\t\txC, yC, zC,\n\
\n\
\t\t\tuA, vA,\n\
\t\t\tuB, vB,\n\
\t\t\tuC, vC,\n\
\n\
\t\t\tx1, x2, y1, y2, z1, z2,\n\
\t\t\ts1, s2, t1, t2, r;\n\
\n\
\t\tvar sdir = new THREE.Vector3(), tdir = new THREE.Vector3();\n\
\n\
\t\tfunction handleTriangle( a, b, c ) {\n\
\n\
\t\t\txA = positions[ a * 3 ];\n\
\t\t\tyA = positions[ a * 3 + 1 ];\n\
\t\t\tzA = positions[ a * 3 + 2 ];\n\
\n\
\t\t\txB = positions[ b * 3 ];\n\
\t\t\tyB = positions[ b * 3 + 1 ];\n\
\t\t\tzB = positions[ b * 3 + 2 ];\n\
\n\
\t\t\txC = positions[ c * 3 ];\n\
\t\t\tyC = positions[ c * 3 + 1 ];\n\
\t\t\tzC = positions[ c * 3 + 2 ];\n\
\n\
\t\t\tuA = uvs[ a * 2 ];\n\
\t\t\tvA = uvs[ a * 2 + 1 ];\n\
\n\
\t\t\tuB = uvs[ b * 2 ];\n\
\t\t\tvB = uvs[ b * 2 + 1 ];\n\
\n\
\t\t\tuC = uvs[ c * 2 ];\n\
\t\t\tvC = uvs[ c * 2 + 1 ];\n\
\n\
\t\t\tx1 = xB - xA;\n\
\t\t\tx2 = xC - xA;\n\
\n\
\t\t\ty1 = yB - yA;\n\
\t\t\ty2 = yC - yA;\n\
\n\
\t\t\tz1 = zB - zA;\n\
\t\t\tz2 = zC - zA;\n\
\n\
\t\t\ts1 = uB - uA;\n\
\t\t\ts2 = uC - uA;\n\
\n\
\t\t\tt1 = vB - vA;\n\
\t\t\tt2 = vC - vA;\n\
\n\
\t\t\tr = 1.0 / ( s1 * t2 - s2 * t1 );\n\
\n\
\t\t\tsdir.set(\n\
\t\t\t\t( t2 * x1 - t1 * x2 ) * r,\n\
\t\t\t\t( t2 * y1 - t1 * y2 ) * r,\n\
\t\t\t\t( t2 * z1 - t1 * z2 ) * r\n\
\t\t\t);\n\
\n\
\t\t\ttdir.set(\n\
\t\t\t\t( s1 * x2 - s2 * x1 ) * r,\n\
\t\t\t\t( s1 * y2 - s2 * y1 ) * r,\n\
\t\t\t\t( s1 * z2 - s2 * z1 ) * r\n\
\t\t\t);\n\
\n\
\t\t\ttan1[ a ].addSelf( sdir );\n\
\t\t\ttan1[ b ].addSelf( sdir );\n\
\t\t\ttan1[ c ].addSelf( sdir );\n\
\n\
\t\t\ttan2[ a ].addSelf( tdir );\n\
\t\t\ttan2[ b ].addSelf( tdir );\n\
\t\t\ttan2[ c ].addSelf( tdir );\n\
\n\
\t\t}\n\
\n\
\t\tvar i, il;\n\
\t\tvar j, jl;\n\
\t\tvar iA, iB, iC;\n\
\n\
\t\tvar offsets = this.offsets;\n\
\n\
\t\tfor ( j = 0, jl = offsets.length; j < jl; ++ j ) {\n\
\n\
\t\t\tvar start = offsets[ j ].start;\n\
\t\t\tvar count = offsets[ j ].count;\n\
\t\t\tvar index = offsets[ j ].index;\n\
\n\
\t\t\tfor ( i = start, il = start + count; i < il; i += 3 ) {\n\
\n\
\t\t\t\tiA = index + indices[ i ];\n\
\t\t\t\tiB = index + indices[ i + 1 ];\n\
\t\t\t\tiC = index + indices[ i + 2 ];\n\
\n\
\t\t\t\thandleTriangle( iA, iB, iC );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tvar tmp = new THREE.Vector3(), tmp2 = new THREE.Vector3();\n\
\t\tvar n = new THREE.Vector3(), n2 = new THREE.Vector3();\n\
\t\tvar w, t, test;\n\
\t\tvar nx, ny, nz;\n\
\n\
\t\tfunction handleVertex( v ) {\n\
\n\
\t\t\tn.x = normals[ v * 3 ];\n\
\t\t\tn.y = normals[ v * 3 + 1 ];\n\
\t\t\tn.z = normals[ v * 3 + 2 ];\n\
\n\
\t\t\tn2.copy( n );\n\
\n\
\t\t\tt = tan1[ v ];\n\
\n\
\t\t\t// Gram-Schmidt orthogonalize\n\
\n\
\t\t\ttmp.copy( t );\n\
\t\t\ttmp.subSelf( n.multiplyScalar( n.dot( t ) ) ).normalize();\n\
\n\
\t\t\t// Calculate handedness\n\
\n\
\t\t\ttmp2.cross( n2, t );\n\
\t\t\ttest = tmp2.dot( tan2[ v ] );\n\
\t\t\tw = ( test < 0.0 ) ? -1.0 : 1.0;\n\
\n\
\t\t\ttangents[ v * 4 ] \t  = tmp.x;\n\
\t\t\ttangents[ v * 4 + 1 ] = tmp.y;\n\
\t\t\ttangents[ v * 4 + 2 ] = tmp.z;\n\
\t\t\ttangents[ v * 4 + 3 ] = w;\n\
\n\
\t\t}\n\
\n\
\t\tfor ( j = 0, jl = offsets.length; j < jl; ++ j ) {\n\
\n\
\t\t\tvar start = offsets[ j ].start;\n\
\t\t\tvar count = offsets[ j ].count;\n\
\t\t\tvar index = offsets[ j ].index;\n\
\n\
\t\t\tfor ( i = start, il = start + count; i < il; i += 3 ) {\n\
\n\
\t\t\t\tiA = index + indices[ i ];\n\
\t\t\t\tiB = index + indices[ i + 1 ];\n\
\t\t\t\tiC = index + indices[ i + 2 ];\n\
\n\
\t\t\t\thandleVertex( iA );\n\
\t\t\t\thandleVertex( iB );\n\
\t\t\t\thandleVertex( iC );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tthis.hasTangents = true;\n\
\t\tthis.tangentsNeedUpdate = true;\n\
\n\
\t}\n\
\n\
};\n\
\n\
/**\n\
 * Spline from Tween.js, slightly optimized (and trashed)\n\
 * http://sole.github.com/tween.js/examples/05_spline.html\n\
 *\n\
 * @author mrdoob / http://mrdoob.com/\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.Spline = function ( points ) {\n\
\n\
\tthis.points = points;\n\
\n\
\tvar c = [], v3 = { x: 0, y: 0, z: 0 },\n\
\tpoint, intPoint, weight, w2, w3,\n\
\tpa, pb, pc, pd;\n\
\n\
\tthis.initFromArray = function( a ) {\n\
\n\
\t\tthis.points = [];\n\
\n\
\t\tfor ( var i = 0; i < a.length; i++ ) {\n\
\n\
\t\t\tthis.points[ i ] = { x: a[ i ][ 0 ], y: a[ i ][ 1 ], z: a[ i ][ 2 ] };\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tthis.getPoint = function ( k ) {\n\
\n\
\t\tpoint = ( this.points.length - 1 ) * k;\n\
\t\tintPoint = Math.floor( point );\n\
\t\tweight = point - intPoint;\n\
\n\
\t\tc[ 0 ] = intPoint === 0 ? intPoint : intPoint - 1;\n\
\t\tc[ 1 ] = intPoint;\n\
\t\tc[ 2 ] = intPoint  > this.points.length - 2 ? this.points.length - 1 : intPoint + 1;\n\
\t\tc[ 3 ] = intPoint  > this.points.length - 3 ? this.points.length - 1 : intPoint + 2;\n\
\n\
\t\tpa = this.points[ c[ 0 ] ];\n\
\t\tpb = this.points[ c[ 1 ] ];\n\
\t\tpc = this.points[ c[ 2 ] ];\n\
\t\tpd = this.points[ c[ 3 ] ];\n\
\n\
\t\tw2 = weight * weight;\n\
\t\tw3 = weight * w2;\n\
\n\
\t\tv3.x = interpolate( pa.x, pb.x, pc.x, pd.x, weight, w2, w3 );\n\
\t\tv3.y = interpolate( pa.y, pb.y, pc.y, pd.y, weight, w2, w3 );\n\
\t\tv3.z = interpolate( pa.z, pb.z, pc.z, pd.z, weight, w2, w3 );\n\
\n\
\t\treturn v3;\n\
\n\
\t};\n\
\n\
\tthis.getControlPointsArray = function () {\n\
\n\
\t\tvar i, p, l = this.points.length,\n\
\t\t\tcoords = [];\n\
\n\
\t\tfor ( i = 0; i < l; i ++ ) {\n\
\n\
\t\t\tp = this.points[ i ];\n\
\t\t\tcoords[ i ] = [ p.x, p.y, p.z ];\n\
\n\
\t\t}\n\
\n\
\t\treturn coords;\n\
\n\
\t};\n\
\n\
\t// approximate length by summing linear segments\n\
\n\
\tthis.getLength = function ( nSubDivisions ) {\n\
\n\
\t\tvar i, index, nSamples, position,\n\
\t\t\tpoint = 0, intPoint = 0, oldIntPoint = 0,\n\
\t\t\toldPosition = new THREE.Vector3(),\n\
\t\t\ttmpVec = new THREE.Vector3(),\n\
\t\t\tchunkLengths = [],\n\
\t\t\ttotalLength = 0;\n\
\n\
\t\t// first point has 0 length\n\
\n\
\t\tchunkLengths[ 0 ] = 0;\n\
\n\
\t\tif ( !nSubDivisions ) nSubDivisions = 100;\n\
\n\
\t\tnSamples = this.points.length * nSubDivisions;\n\
\n\
\t\toldPosition.copy( this.points[ 0 ] );\n\
\n\
\t\tfor ( i = 1; i < nSamples; i ++ ) {\n\
\n\
\t\t\tindex = i / nSamples;\n\
\n\
\t\t\tposition = this.getPoint( index );\n\
\t\t\ttmpVec.copy( position );\n\
\n\
\t\t\ttotalLength += tmpVec.distanceTo( oldPosition );\n\
\n\
\t\t\toldPosition.copy( position );\n\
\n\
\t\t\tpoint = ( this.points.length - 1 ) * index;\n\
\t\t\tintPoint = Math.floor( point );\n\
\n\
\t\t\tif ( intPoint != oldIntPoint ) {\n\
\n\
\t\t\t\tchunkLengths[ intPoint ] = totalLength;\n\
\t\t\t\toldIntPoint = intPoint;\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\t// last point ends with total length\n\
\n\
\t\tchunkLengths[ chunkLengths.length ] = totalLength;\n\
\n\
\t\treturn { chunks: chunkLengths, total: totalLength };\n\
\n\
\t};\n\
\n\
\tthis.reparametrizeByArcLength = function ( samplingCoef ) {\n\
\n\
\t\tvar i, j,\n\
\t\t\tindex, indexCurrent, indexNext,\n\
\t\t\tlinearDistance, realDistance,\n\
\t\t\tsampling, position,\n\
\t\t\tnewpoints = [],\n\
\t\t\ttmpVec = new THREE.Vector3(),\n\
\t\t\tsl = this.getLength();\n\
\n\
\t\tnewpoints.push( tmpVec.copy( this.points[ 0 ] ).clone() );\n\
\n\
\t\tfor ( i = 1; i < this.points.length; i++ ) {\n\
\n\
\t\t\t//tmpVec.copy( this.points[ i - 1 ] );\n\
\t\t\t//linearDistance = tmpVec.distanceTo( this.points[ i ] );\n\
\n\
\t\t\trealDistance = sl.chunks[ i ] - sl.chunks[ i - 1 ];\n\
\n\
\t\t\tsampling = Math.ceil( samplingCoef * realDistance / sl.total );\n\
\n\
\t\t\tindexCurrent = ( i - 1 ) / ( this.points.length - 1 );\n\
\t\t\tindexNext = i / ( this.points.length - 1 );\n\
\n\
\t\t\tfor ( j = 1; j < sampling - 1; j++ ) {\n\
\n\
\t\t\t\tindex = indexCurrent + j * ( 1 / sampling ) * ( indexNext - indexCurrent );\n\
\n\
\t\t\t\tposition = this.getPoint( index );\n\
\t\t\t\tnewpoints.push( tmpVec.copy( position ).clone() );\n\
\n\
\t\t\t}\n\
\n\
\t\t\tnewpoints.push( tmpVec.copy( this.points[ i ] ).clone() );\n\
\n\
\t\t}\n\
\n\
\t\tthis.points = newpoints;\n\
\n\
\t};\n\
\n\
\t// Catmull-Rom\n\
\n\
\tfunction interpolate( p0, p1, p2, p3, t, t2, t3 ) {\n\
\n\
\t\tvar v0 = ( p2 - p0 ) * 0.5,\n\
\t\t\tv1 = ( p3 - p1 ) * 0.5;\n\
\n\
\t\treturn ( 2 * ( p1 - p2 ) + v0 + v1 ) * t3 + ( - 3 * ( p1 - p2 ) - 2 * v0 - v1 ) * t2 + v0 * t + p1;\n\
\n\
\t};\n\
\n\
};\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 * @author mikael emtinger / http://gomo.se/\n\
 */\n\
\n\
THREE.Camera = function () {\n\
\n\
\tTHREE.Object3D.call( this );\n\
\n\
\tthis.matrixWorldInverse = new THREE.Matrix4();\n\
\n\
\tthis.projectionMatrix = new THREE.Matrix4();\n\
\tthis.projectionMatrixInverse = new THREE.Matrix4();\n\
\n\
};\n\
\n\
THREE.Camera.prototype = Object.create( THREE.Object3D.prototype );\n\
\n\
THREE.Camera.prototype.lookAt = function ( vector ) {\n\
\n\
\t// TODO: Add hierarchy support.\n\
\n\
\tthis.matrix.lookAt( this.position, vector, this.up );\n\
\n\
\tif ( this.rotationAutoUpdate === true ) {\n\
\n\
\t\tthis.rotation.setEulerFromRotationMatrix( this.matrix, this.eulerOrder );\n\
\n\
\t}\n\
\n\
};\n\
/**\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.OrthographicCamera = function ( left, right, top, bottom, near, far ) {\n\
\n\
\tTHREE.Camera.call( this );\n\
\n\
\tthis.left = left;\n\
\tthis.right = right;\n\
\tthis.top = top;\n\
\tthis.bottom = bottom;\n\
\n\
\tthis.near = ( near !== undefined ) ? near : 0.1;\n\
\tthis.far = ( far !== undefined ) ? far : 2000;\n\
\n\
\tthis.updateProjectionMatrix();\n\
\n\
};\n\
\n\
THREE.OrthographicCamera.prototype = Object.create( THREE.Camera.prototype );\n\
\n\
THREE.OrthographicCamera.prototype.updateProjectionMatrix = function () {\n\
\n\
\tthis.projectionMatrix.makeOrthographic( this.left, this.right, this.top, this.bottom, this.near, this.far );\n\
\n\
};\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 * @author greggman / http://games.greggman.com/\n\
 * @author zz85 / http://www.lab4games.net/zz85/blog\n\
 */\n\
\n\
THREE.PerspectiveCamera = function ( fov, aspect, near, far ) {\n\
\n\
\tTHREE.Camera.call( this );\n\
\n\
\tthis.fov = fov !== undefined ? fov : 50;\n\
\tthis.aspect = aspect !== undefined ? aspect : 1;\n\
\tthis.near = near !== undefined ? near : 0.1;\n\
\tthis.far = far !== undefined ? far : 2000;\n\
\n\
\tthis.updateProjectionMatrix();\n\
\n\
};\n\
\n\
THREE.PerspectiveCamera.prototype = Object.create( THREE.Camera.prototype );\n\
\n\
\n\
/**\n\
 * Uses Focal Length (in mm) to estimate and set FOV\n\
 * 35mm (fullframe) camera is used if frame size is not specified;\n\
 * Formula based on http://www.bobatkins.com/photography/technical/field_of_view.html\n\
 */\n\
\n\
THREE.PerspectiveCamera.prototype.setLens = function ( focalLength, frameHeight ) {\n\
\n\
\tif ( frameHeight === undefined ) frameHeight = 24;\n\
\n\
\tthis.fov = 2 * Math.atan( frameHeight / ( focalLength * 2 ) ) * ( 180 / Math.PI );\n\
\tthis.updateProjectionMatrix();\n\
\n\
}\n\
\n\
\n\
/**\n\
 * Sets an offset in a larger frustum. This is useful for multi-window or\n\
 * multi-monitor/multi-machine setups.\n\
 *\n\
 * For example, if you have 3x2 monitors and each monitor is 1920x1080 and\n\
 * the monitors are in grid like this\n\
 *\n\
 *   +---+---+---+\n\
 *   | A | B | C |\n\
 *   +---+---+---+\n\
 *   | D | E | F |\n\
 *   +---+---+---+\n\
 *\n\
 * then for each monitor you would call it like this\n\
 *\n\
 *   var w = 1920;\n\
 *   var h = 1080;\n\
 *   var fullWidth = w * 3;\n\
 *   var fullHeight = h * 2;\n\
 *\n\
 *   --A--\n\
 *   camera.setOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );\n\
 *   --B--\n\
 *   camera.setOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );\n\
 *   --C--\n\
 *   camera.setOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );\n\
 *   --D--\n\
 *   camera.setOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );\n\
 *   --E--\n\
 *   camera.setOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );\n\
 *   --F--\n\
 *   camera.setOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );\n\
 *\n\
 *   Note there is no reason monitors have to be the same size or in a grid.\n\
 */\n\
\n\
THREE.PerspectiveCamera.prototype.setViewOffset = function ( fullWidth, fullHeight, x, y, width, height ) {\n\
\n\
\tthis.fullWidth = fullWidth;\n\
\tthis.fullHeight = fullHeight;\n\
\tthis.x = x;\n\
\tthis.y = y;\n\
\tthis.width = width;\n\
\tthis.height = height;\n\
\n\
\tthis.updateProjectionMatrix();\n\
\n\
};\n\
\n\
\n\
THREE.PerspectiveCamera.prototype.updateProjectionMatrix = function () {\n\
\n\
\tif ( this.fullWidth ) {\n\
\n\
\t\tvar aspect = this.fullWidth / this.fullHeight;\n\
\t\tvar top = Math.tan( this.fov * Math.PI / 360 ) * this.near;\n\
\t\tvar bottom = -top;\n\
\t\tvar left = aspect * bottom;\n\
\t\tvar right = aspect * top;\n\
\t\tvar width = Math.abs( right - left );\n\
\t\tvar height = Math.abs( top - bottom );\n\
\n\
\t\tthis.projectionMatrix.makeFrustum(\n\
\t\t\tleft + this.x * width / this.fullWidth,\n\
\t\t\tleft + ( this.x + this.width ) * width / this.fullWidth,\n\
\t\t\ttop - ( this.y + this.height ) * height / this.fullHeight,\n\
\t\t\ttop - this.y * height / this.fullHeight,\n\
\t\t\tthis.near,\n\
\t\t\tthis.far\n\
\t\t);\n\
\n\
\t} else {\n\
\n\
\t\tthis.projectionMatrix.makePerspective( this.fov, this.aspect, this.near, this.far );\n\
\n\
\t}\n\
\n\
};\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.Light = function ( hex ) {\n\
\n\
\tTHREE.Object3D.call( this );\n\
\n\
\tthis.color = new THREE.Color( hex );\n\
\n\
};\n\
\n\
THREE.Light.prototype = Object.create( THREE.Object3D.prototype );\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 */\n\
\n\
THREE.AmbientLight = function ( hex ) {\n\
\n\
\tTHREE.Light.call( this, hex );\n\
\n\
};\n\
\n\
THREE.AmbientLight.prototype = Object.create( THREE.Light.prototype );\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.DirectionalLight = function ( hex, intensity, distance ) {\n\
\n\
\tTHREE.Light.call( this, hex );\n\
\n\
\tthis.position = new THREE.Vector3( 0, 1, 0 );\n\
\tthis.target = new THREE.Object3D();\n\
\n\
\tthis.intensity = ( intensity !== undefined ) ? intensity : 1;\n\
\tthis.distance = ( distance !== undefined ) ? distance : 0;\n\
\n\
\tthis.castShadow = false;\n\
\tthis.onlyShadow = false;\n\
\n\
\t//\n\
\n\
\tthis.shadowCameraNear = 50;\n\
\tthis.shadowCameraFar = 5000;\n\
\n\
\tthis.shadowCameraLeft = -500;\n\
\tthis.shadowCameraRight = 500;\n\
\tthis.shadowCameraTop = 500;\n\
\tthis.shadowCameraBottom = -500;\n\
\n\
\tthis.shadowCameraVisible = false;\n\
\n\
\tthis.shadowBias = 0;\n\
\tthis.shadowDarkness = 0.5;\n\
\n\
\tthis.shadowMapWidth = 512;\n\
\tthis.shadowMapHeight = 512;\n\
\n\
\t//\n\
\n\
\tthis.shadowCascade = false;\n\
\n\
\tthis.shadowCascadeOffset = new THREE.Vector3( 0, 0, -1000 );\n\
\tthis.shadowCascadeCount = 2;\n\
\n\
\tthis.shadowCascadeBias = [ 0, 0, 0 ];\n\
\tthis.shadowCascadeWidth = [ 512, 512, 512 ];\n\
\tthis.shadowCascadeHeight = [ 512, 512, 512 ];\n\
\n\
\tthis.shadowCascadeNearZ = [ -1.000, 0.990, 0.998 ];\n\
\tthis.shadowCascadeFarZ  = [  0.990, 0.998, 1.000 ];\n\
\n\
\tthis.shadowCascadeArray = [];\n\
\n\
\t//\n\
\n\
\tthis.shadowMap = null;\n\
\tthis.shadowMapSize = null;\n\
\tthis.shadowCamera = null;\n\
\tthis.shadowMatrix = null;\n\
\n\
};\n\
\n\
THREE.DirectionalLight.prototype = Object.create( THREE.Light.prototype );\n\
/**\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.HemisphereLight = function ( skyColorHex, groundColorHex, intensity ) {\n\
\n\
\tTHREE.Light.call( this, skyColorHex );\n\
\n\
\tthis.groundColor = new THREE.Color( groundColorHex );\n\
\n\
\tthis.position = new THREE.Vector3( 0, 100, 0 );\n\
\n\
\tthis.intensity = ( intensity !== undefined ) ? intensity : 1;\n\
\n\
};\n\
\n\
THREE.HemisphereLight.prototype = Object.create( THREE.Light.prototype );\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 */\n\
\n\
THREE.PointLight = function ( hex, intensity, distance ) {\n\
\n\
\tTHREE.Light.call( this, hex );\n\
\n\
\tthis.position = new THREE.Vector3( 0, 0, 0 );\n\
\tthis.intensity = ( intensity !== undefined ) ? intensity : 1;\n\
\tthis.distance = ( distance !== undefined ) ? distance : 0;\n\
\n\
};\n\
\n\
THREE.PointLight.prototype = Object.create( THREE.Light.prototype );\n\
/**\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.SpotLight = function ( hex, intensity, distance, angle, exponent ) {\n\
\n\
\tTHREE.Light.call( this, hex );\n\
\n\
\tthis.position = new THREE.Vector3( 0, 1, 0 );\n\
\tthis.target = new THREE.Object3D();\n\
\n\
\tthis.intensity = ( intensity !== undefined ) ? intensity : 1;\n\
\tthis.distance = ( distance !== undefined ) ? distance : 0;\n\
\tthis.angle = ( angle !== undefined ) ? angle : Math.PI / 2;\n\
\tthis.exponent = ( exponent !== undefined ) ? exponent : 10;\n\
\n\
\tthis.castShadow = false;\n\
\tthis.onlyShadow = false;\n\
\n\
\t//\n\
\n\
\tthis.shadowCameraNear = 50;\n\
\tthis.shadowCameraFar = 5000;\n\
\tthis.shadowCameraFov = 50;\n\
\n\
\tthis.shadowCameraVisible = false;\n\
\n\
\tthis.shadowBias = 0;\n\
\tthis.shadowDarkness = 0.5;\n\
\n\
\tthis.shadowMapWidth = 512;\n\
\tthis.shadowMapHeight = 512;\n\
\n\
\t//\n\
\n\
\tthis.shadowMap = null;\n\
\tthis.shadowMapSize = null;\n\
\tthis.shadowCamera = null;\n\
\tthis.shadowMatrix = null;\n\
\n\
};\n\
\n\
THREE.SpotLight.prototype = Object.create( THREE.Light.prototype );\n\
/**\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.Loader = function ( showStatus ) {\n\
\n\
\tthis.showStatus = showStatus;\n\
\tthis.statusDomElement = showStatus ? THREE.Loader.prototype.addStatusElement() : null;\n\
\n\
\tthis.onLoadStart = function () {};\n\
\tthis.onLoadProgress = function () {};\n\
\tthis.onLoadComplete = function () {};\n\
\n\
};\n\
\n\
THREE.Loader.prototype = {\n\
\n\
\tconstructor: THREE.Loader,\n\
\n\
\tcrossOrigin: 'anonymous',\n\
\n\
\taddStatusElement: function () {\n\
\n\
\t\tvar e = document.createElement( \"div\" );\n\
\n\
\t\te.style.position = \"absolute\";\n\
\t\te.style.right = \"0px\";\n\
\t\te.style.top = \"0px\";\n\
\t\te.style.fontSize = \"0.8em\";\n\
\t\te.style.textAlign = \"left\";\n\
\t\te.style.background = \"rgba(0,0,0,0.25)\";\n\
\t\te.style.color = \"#fff\";\n\
\t\te.style.width = \"120px\";\n\
\t\te.style.padding = \"0.5em 0.5em 0.5em 0.5em\";\n\
\t\te.style.zIndex = 1000;\n\
\n\
\t\te.innerHTML = \"Loading ...\";\n\
\n\
\t\treturn e;\n\
\n\
\t},\n\
\n\
\tupdateProgress: function ( progress ) {\n\
\n\
\t\tvar message = \"Loaded \";\n\
\n\
\t\tif ( progress.total ) {\n\
\n\
\t\t\tmessage += ( 100 * progress.loaded / progress.total ).toFixed(0) + \"%\";\n\
\n\
\n\
\t\t} else {\n\
\n\
\t\t\tmessage += ( progress.loaded / 1000 ).toFixed(2) + \" KB\";\n\
\n\
\t\t}\n\
\n\
\t\tthis.statusDomElement.innerHTML = message;\n\
\n\
\t},\n\
\n\
\textractUrlBase: function ( url ) {\n\
\n\
\t\tvar parts = url.split( '/' );\n\
\t\tparts.pop();\n\
\t\treturn ( parts.length < 1 ? '.' : parts.join( '/' ) ) + '/';\n\
\n\
\t},\n\
\n\
\tinitMaterials: function ( scope, materials, texturePath ) {\n\
\n\
\t\tscope.materials = [];\n\
\n\
\t\tfor ( var i = 0; i < materials.length; ++ i ) {\n\
\n\
\t\t\tscope.materials[ i ] = THREE.Loader.prototype.createMaterial( materials[ i ], texturePath );\n\
\n\
\t\t}\n\
\n\
\t},\n\
\n\
\thasNormals: function ( scope ) {\n\
\n\
\t\tvar m, i, il = scope.materials.length;\n\
\n\
\t\tfor( i = 0; i < il; i ++ ) {\n\
\n\
\t\t\tm = scope.materials[ i ];\n\
\n\
\t\t\tif ( m instanceof THREE.ShaderMaterial ) return true;\n\
\n\
\t\t}\n\
\n\
\t\treturn false;\n\
\n\
\t},\n\
\n\
\tcreateMaterial: function ( m, texturePath ) {\n\
\n\
\t\tvar _this = this;\n\
\n\
\t\tfunction is_pow2( n ) {\n\
\n\
\t\t\tvar l = Math.log( n ) / Math.LN2;\n\
\t\t\treturn Math.floor( l ) == l;\n\
\n\
\t\t}\n\
\n\
\t\tfunction nearest_pow2( n ) {\n\
\n\
\t\t\tvar l = Math.log( n ) / Math.LN2;\n\
\t\t\treturn Math.pow( 2, Math.round(  l ) );\n\
\n\
\t\t}\n\
\n\
\t\tfunction load_image( where, url ) {\n\
\n\
\t\t\tvar image = new Image();\n\
\n\
\t\t\timage.onload = function () {\n\
\n\
\t\t\t\tif ( !is_pow2( this.width ) || !is_pow2( this.height ) ) {\n\
\n\
\t\t\t\t\tvar width = nearest_pow2( this.width );\n\
\t\t\t\t\tvar height = nearest_pow2( this.height );\n\
\n\
\t\t\t\t\twhere.image.width = width;\n\
\t\t\t\t\twhere.image.height = height;\n\
\t\t\t\t\twhere.image.getContext( '2d' ).drawImage( this, 0, 0, width, height );\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\twhere.image = this;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\twhere.needsUpdate = true;\n\
\n\
\t\t\t};\n\
\n\
\t\t\timage.crossOrigin = _this.crossOrigin;\n\
\t\t\timage.src = url;\n\
\n\
\t\t}\n\
\n\
\t\tfunction create_texture( where, name, sourceFile, repeat, offset, wrap, anisotropy ) {\n\
\n\
\t\t\tvar isCompressed = sourceFile.toLowerCase().endsWith( \".dds\" );\n\
\t\t\tvar fullPath = texturePath + \"/\" + sourceFile;\n\
\n\
\t\t\tif ( isCompressed ) {\n\
\n\
\t\t\t\tvar texture = THREE.ImageUtils.loadCompressedTexture( fullPath );\n\
\n\
\t\t\t\twhere[ name ] = texture;\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tvar texture = document.createElement( 'canvas' );\n\
\n\
\t\t\t\twhere[ name ] = new THREE.Texture( texture );\n\
\n\
\t\t\t}\n\
\n\
\t\t\twhere[ name ].sourceFile = sourceFile;\n\
\n\
\t\t\tif( repeat ) {\n\
\n\
\t\t\t\twhere[ name ].repeat.set( repeat[ 0 ], repeat[ 1 ] );\n\
\n\
\t\t\t\tif ( repeat[ 0 ] !== 1 ) where[ name ].wrapS = THREE.RepeatWrapping;\n\
\t\t\t\tif ( repeat[ 1 ] !== 1 ) where[ name ].wrapT = THREE.RepeatWrapping;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( offset ) {\n\
\n\
\t\t\t\twhere[ name ].offset.set( offset[ 0 ], offset[ 1 ] );\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( wrap ) {\n\
\n\
\t\t\t\tvar wrapMap = {\n\
\t\t\t\t\t\"repeat\": THREE.RepeatWrapping,\n\
\t\t\t\t\t\"mirror\": THREE.MirroredRepeatWrapping\n\
\t\t\t\t}\n\
\n\
\t\t\t\tif ( wrapMap[ wrap[ 0 ] ] !== undefined ) where[ name ].wrapS = wrapMap[ wrap[ 0 ] ];\n\
\t\t\t\tif ( wrapMap[ wrap[ 1 ] ] !== undefined ) where[ name ].wrapT = wrapMap[ wrap[ 1 ] ];\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( anisotropy ) {\n\
\n\
\t\t\t\twhere[ name ].anisotropy = anisotropy;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( ! isCompressed ) {\n\
\n\
\t\t\t\tload_image( where[ name ], fullPath );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tfunction rgb2hex( rgb ) {\n\
\n\
\t\t\treturn ( rgb[ 0 ] * 255 << 16 ) + ( rgb[ 1 ] * 255 << 8 ) + rgb[ 2 ] * 255;\n\
\n\
\t\t}\n\
\n\
\t\t// defaults\n\
\n\
\t\tvar mtype = \"MeshLambertMaterial\";\n\
\t\tvar mpars = { color: 0xeeeeee, opacity: 1.0, map: null, lightMap: null, normalMap: null, bumpMap: null, wireframe: false };\n\
\n\
\t\t// parameters from model file\n\
\n\
\t\tif ( m.shading ) {\n\
\n\
\t\t\tvar shading = m.shading.toLowerCase();\n\
\n\
\t\t\tif ( shading === \"phong\" ) mtype = \"MeshPhongMaterial\";\n\
\t\t\telse if ( shading === \"basic\" ) mtype = \"MeshBasicMaterial\";\n\
\n\
\t\t}\n\
\n\
\t\tif ( m.blending !== undefined && THREE[ m.blending ] !== undefined ) {\n\
\n\
\t\t\tmpars.blending = THREE[ m.blending ];\n\
\n\
\t\t}\n\
\n\
\t\tif ( m.transparent !== undefined || m.opacity < 1.0 ) {\n\
\n\
\t\t\tmpars.transparent = m.transparent;\n\
\n\
\t\t}\n\
\n\
\t\tif ( m.depthTest !== undefined ) {\n\
\n\
\t\t\tmpars.depthTest = m.depthTest;\n\
\n\
\t\t}\n\
\n\
\t\tif ( m.depthWrite !== undefined ) {\n\
\n\
\t\t\tmpars.depthWrite = m.depthWrite;\n\
\n\
\t\t}\n\
\n\
\t\tif ( m.visible !== undefined ) {\n\
\n\
\t\t\tmpars.visible = m.visible;\n\
\n\
\t\t}\n\
\n\
\t\tif ( m.flipSided !== undefined ) {\n\
\n\
\t\t\tmpars.side = THREE.BackSide;\n\
\n\
\t\t}\n\
\n\
\t\tif ( m.doubleSided !== undefined ) {\n\
\n\
\t\t\tmpars.side = THREE.DoubleSide;\n\
\n\
\t\t}\n\
\n\
\t\tif ( m.wireframe !== undefined ) {\n\
\n\
\t\t\tmpars.wireframe = m.wireframe;\n\
\n\
\t\t}\n\
\n\
\t\tif ( m.vertexColors !== undefined ) {\n\
\n\
\t\t\tif ( m.vertexColors === \"face\" ) {\n\
\n\
\t\t\t\tmpars.vertexColors = THREE.FaceColors;\n\
\n\
\t\t\t} else if ( m.vertexColors ) {\n\
\n\
\t\t\t\tmpars.vertexColors = THREE.VertexColors;\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\t// colors\n\
\n\
\t\tif ( m.colorDiffuse ) {\n\
\n\
\t\t\tmpars.color = rgb2hex( m.colorDiffuse );\n\
\n\
\t\t} else if ( m.DbgColor ) {\n\
\n\
\t\t\tmpars.color = m.DbgColor;\n\
\n\
\t\t}\n\
\n\
\t\tif ( m.colorSpecular ) {\n\
\n\
\t\t\tmpars.specular = rgb2hex( m.colorSpecular );\n\
\n\
\t\t}\n\
\n\
\t\tif ( m.colorAmbient ) {\n\
\n\
\t\t\tmpars.ambient = rgb2hex( m.colorAmbient );\n\
\n\
\t\t}\n\
\n\
\t\t// modifiers\n\
\n\
\t\tif ( m.transparency ) {\n\
\n\
\t\t\tmpars.opacity = m.transparency;\n\
\n\
\t\t}\n\
\n\
\t\tif ( m.specularCoef ) {\n\
\n\
\t\t\tmpars.shininess = m.specularCoef;\n\
\n\
\t\t}\n\
\n\
\t\t// textures\n\
\n\
\t\tif ( m.mapDiffuse && texturePath ) {\n\
\n\
\t\t\tcreate_texture( mpars, \"map\", m.mapDiffuse, m.mapDiffuseRepeat, m.mapDiffuseOffset, m.mapDiffuseWrap, m.mapDiffuseAnisotropy );\n\
\n\
\t\t}\n\
\n\
\t\tif ( m.mapLight && texturePath ) {\n\
\n\
\t\t\tcreate_texture( mpars, \"lightMap\", m.mapLight, m.mapLightRepeat, m.mapLightOffset, m.mapLightWrap, m.mapLightAnisotropy );\n\
\n\
\t\t}\n\
\n\
\t\tif ( m.mapBump && texturePath ) {\n\
\n\
\t\t\tcreate_texture( mpars, \"bumpMap\", m.mapBump, m.mapBumpRepeat, m.mapBumpOffset, m.mapBumpWrap, m.mapBumpAnisotropy );\n\
\n\
\t\t}\n\
\n\
\t\tif ( m.mapNormal && texturePath ) {\n\
\n\
\t\t\tcreate_texture( mpars, \"normalMap\", m.mapNormal, m.mapNormalRepeat, m.mapNormalOffset, m.mapNormalWrap, m.mapNormalAnisotropy );\n\
\n\
\t\t}\n\
\n\
\t\tif ( m.mapSpecular && texturePath ) {\n\
\n\
\t\t\tcreate_texture( mpars, \"specularMap\", m.mapSpecular, m.mapSpecularRepeat, m.mapSpecularOffset, m.mapSpecularWrap, m.mapSpecularAnisotropy );\n\
\n\
\t\t}\n\
\n\
\t\t//\n\
\n\
\t\tif ( m.mapBumpScale ) {\n\
\n\
\t\t\tmpars.bumpScale = m.mapBumpScale;\n\
\n\
\t\t}\n\
\n\
\t\t// special case for normal mapped material\n\
\n\
\t\tif ( m.mapNormal ) {\n\
\n\
\t\t\tvar shader = THREE.ShaderUtils.lib[ \"normal\" ];\n\
\t\t\tvar uniforms = THREE.UniformsUtils.clone( shader.uniforms );\n\
\n\
\t\t\tuniforms[ \"tNormal\" ].value = mpars.normalMap;\n\
\n\
\t\t\tif ( m.mapNormalFactor ) {\n\
\n\
\t\t\t\tuniforms[ \"uNormalScale\" ].value.set( m.mapNormalFactor, m.mapNormalFactor );\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( mpars.map ) {\n\
\n\
\t\t\t\tuniforms[ \"tDiffuse\" ].value = mpars.map;\n\
\t\t\t\tuniforms[ \"enableDiffuse\" ].value = true;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( mpars.specularMap ) {\n\
\n\
\t\t\t\tuniforms[ \"tSpecular\" ].value = mpars.specularMap;\n\
\t\t\t\tuniforms[ \"enableSpecular\" ].value = true;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( mpars.lightMap ) {\n\
\n\
\t\t\t\tuniforms[ \"tAO\" ].value = mpars.lightMap;\n\
\t\t\t\tuniforms[ \"enableAO\" ].value = true;\n\
\n\
\t\t\t}\n\
\n\
\t\t\t// for the moment don't handle displacement texture\n\
\n\
\t\t\tuniforms[ \"uDiffuseColor\" ].value.setHex( mpars.color );\n\
\t\t\tuniforms[ \"uSpecularColor\" ].value.setHex( mpars.specular );\n\
\t\t\tuniforms[ \"uAmbientColor\" ].value.setHex( mpars.ambient );\n\
\n\
\t\t\tuniforms[ \"uShininess\" ].value = mpars.shininess;\n\
\n\
\t\t\tif ( mpars.opacity !== undefined ) {\n\
\n\
\t\t\t\tuniforms[ \"uOpacity\" ].value = mpars.opacity;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tvar parameters = { fragmentShader: shader.fragmentShader, vertexShader: shader.vertexShader, uniforms: uniforms, lights: true, fog: true };\n\
\t\t\tvar material = new THREE.ShaderMaterial( parameters );\n\
\n\
\t\t} else {\n\
\n\
\t\t\tvar material = new THREE[ mtype ]( mpars );\n\
\n\
\t\t}\n\
\n\
\t\tif ( m.DbgName !== undefined ) material.name = m.DbgName;\n\
\n\
\t\treturn material;\n\
\n\
\t}\n\
\n\
};\n\
/**\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.BinaryLoader = function ( showStatus ) {\n\
\n\
\tTHREE.Loader.call( this, showStatus );\n\
\n\
};\n\
\n\
THREE.BinaryLoader.prototype = Object.create( THREE.Loader.prototype );\n\
\n\
// Load models generated by slim OBJ converter with BINARY option (converter_obj_three_slim.py -t binary)\n\
//  - binary models consist of two files: JS and BIN\n\
//  - parameters\n\
//\t\t- url (required)\n\
//\t\t- callback (required)\n\
//\t\t- texturePath (optional: if not specified, textures will be assumed to be in the same folder as JS model file)\n\
//\t\t- binaryPath (optional: if not specified, binary file will be assumed to be in the same folder as JS model file)\n\
\n\
THREE.BinaryLoader.prototype.load = function( url, callback, texturePath, binaryPath ) {\n\
\n\
\ttexturePath = texturePath ? texturePath : this.extractUrlBase( url );\n\
\tbinaryPath = binaryPath ? binaryPath : this.extractUrlBase( url );\n\
\n\
\tvar callbackProgress = this.showProgress ? THREE.Loader.prototype.updateProgress : null;\n\
\n\
\tthis.onLoadStart();\n\
\n\
\t// #1 load JS part via web worker\n\
\n\
\tthis.loadAjaxJSON( this, url, callback, texturePath, binaryPath, callbackProgress );\n\
\n\
};\n\
\n\
THREE.BinaryLoader.prototype.loadAjaxJSON = function ( context, url, callback, texturePath, binaryPath, callbackProgress ) {\n\
\n\
\tvar xhr = new XMLHttpRequest();\n\
\n\
\txhr.onreadystatechange = function () {\n\
\n\
\t\tif ( xhr.readyState == 4 ) {\n\
\n\
\t\t\tif ( xhr.status == 200 || xhr.status == 0 ) {\n\
\n\
\t\t\t\tvar json = JSON.parse( xhr.responseText );\n\
\t\t\t\tcontext.loadAjaxBuffers( json, callback, binaryPath, texturePath, callbackProgress );\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tconsole.error( \"THREE.BinaryLoader: Couldn't load [\" + url + \"] [\" + xhr.status + \"]\" );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\txhr.open( \"GET\", url, true );\n\
\txhr.send( null );\n\
\n\
};\n\
\n\
THREE.BinaryLoader.prototype.loadAjaxBuffers = function ( json, callback, binaryPath, texturePath, callbackProgress ) {\n\
\n\
\tvar xhr = new XMLHttpRequest(),\n\
\t\turl = binaryPath + \"/\" + json.buffers;\n\
\n\
\tvar length = 0;\n\
\n\
\txhr.onreadystatechange = function () {\n\
\n\
\t\tif ( xhr.readyState == 4 ) {\n\
\n\
\t\t\tif ( xhr.status == 200 || xhr.status == 0 ) {\n\
\n\
\t\t\t\tvar buffer = xhr.response;\n\
\t\t\t\tif ( buffer === undefined ) buffer = ( new Uint8Array( xhr.responseBody ) ).buffer; // IEWEBGL needs this\n\
\t\t\t\tTHREE.BinaryLoader.prototype.createBinModel( buffer, callback, texturePath, json.materials );\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tconsole.error( \"THREE.BinaryLoader: Couldn't load [\" + url + \"] [\" + xhr.status + \"]\" );\n\
\n\
\t\t\t}\n\
\n\
\t\t} else if ( xhr.readyState == 3 ) {\n\
\n\
\t\t\tif ( callbackProgress ) {\n\
\n\
\t\t\t\tif ( length == 0 ) {\n\
\n\
\t\t\t\t\tlength = xhr.getResponseHeader( \"Content-Length\" );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tcallbackProgress( { total: length, loaded: xhr.responseText.length } );\n\
\n\
\t\t\t}\n\
\n\
\t\t} else if ( xhr.readyState == 2 ) {\n\
\n\
\t\t\tlength = xhr.getResponseHeader( \"Content-Length\" );\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\txhr.open( \"GET\", url, true );\n\
\txhr.responseType = \"arraybuffer\";\n\
\txhr.send( null );\n\
\n\
};\n\
\n\
// Binary AJAX parser\n\
\n\
THREE.BinaryLoader.prototype.createBinModel = function ( data, callback, texturePath, materials ) {\n\
\n\
\tvar Model = function ( texturePath ) {\n\
\n\
\t\tvar scope = this,\n\
\t\t\tcurrentOffset = 0,\n\
\t\t\tmd,\n\
\t\t\tnormals = [],\n\
\t\t\tuvs = [],\n\
\t\t\tstart_tri_flat, start_tri_smooth, start_tri_flat_uv, start_tri_smooth_uv,\n\
\t\t\tstart_quad_flat, start_quad_smooth, start_quad_flat_uv, start_quad_smooth_uv,\n\
\t\t\ttri_size, quad_size,\n\
\t\t\tlen_tri_flat, len_tri_smooth, len_tri_flat_uv, len_tri_smooth_uv,\n\
\t\t\tlen_quad_flat, len_quad_smooth, len_quad_flat_uv, len_quad_smooth_uv;\n\
\n\
\n\
\t\tTHREE.Geometry.call( this );\n\
\n\
\t\tTHREE.Loader.prototype.initMaterials( scope, materials, texturePath );\n\
\n\
\t\tmd = parseMetaData( data, currentOffset );\n\
\n\
\t\tcurrentOffset += md.header_bytes;\n\
/*\n\
\t\tmd.vertex_index_bytes = Uint32Array.BYTES_PER_ELEMENT;\n\
\t\tmd.material_index_bytes = Uint16Array.BYTES_PER_ELEMENT;\n\
\t\tmd.normal_index_bytes = Uint32Array.BYTES_PER_ELEMENT;\n\
\t\tmd.uv_index_bytes = Uint32Array.BYTES_PER_ELEMENT;\n\
*/\n\
\t\t// buffers sizes\n\
\n\
\t\ttri_size =  md.vertex_index_bytes * 3 + md.material_index_bytes;\n\
\t\tquad_size = md.vertex_index_bytes * 4 + md.material_index_bytes;\n\
\n\
\t\tlen_tri_flat      = md.ntri_flat      * ( tri_size );\n\
\t\tlen_tri_smooth    = md.ntri_smooth    * ( tri_size + md.normal_index_bytes * 3 );\n\
\t\tlen_tri_flat_uv   = md.ntri_flat_uv   * ( tri_size + md.uv_index_bytes * 3 );\n\
\t\tlen_tri_smooth_uv = md.ntri_smooth_uv * ( tri_size + md.normal_index_bytes * 3 + md.uv_index_bytes * 3 );\n\
\n\
\t\tlen_quad_flat      = md.nquad_flat      * ( quad_size );\n\
\t\tlen_quad_smooth    = md.nquad_smooth    * ( quad_size + md.normal_index_bytes * 4 );\n\
\t\tlen_quad_flat_uv   = md.nquad_flat_uv   * ( quad_size + md.uv_index_bytes * 4 );\n\
\t\tlen_quad_smooth_uv = md.nquad_smooth_uv * ( quad_size + md.normal_index_bytes * 4 + md.uv_index_bytes * 4 );\n\
\n\
\t\t// read buffers\n\
\n\
\t\tcurrentOffset += init_vertices( currentOffset );\n\
\n\
\t\tcurrentOffset += init_normals( currentOffset );\n\
\t\tcurrentOffset += handlePadding( md.nnormals * 3 );\n\
\n\
\t\tcurrentOffset += init_uvs( currentOffset );\n\
\n\
\t\tstart_tri_flat \t\t= currentOffset;\n\
\t\tstart_tri_smooth    = start_tri_flat    + len_tri_flat    + handlePadding( md.ntri_flat * 2 );\n\
\t\tstart_tri_flat_uv   = start_tri_smooth  + len_tri_smooth  + handlePadding( md.ntri_smooth * 2 );\n\
\t\tstart_tri_smooth_uv = start_tri_flat_uv + len_tri_flat_uv + handlePadding( md.ntri_flat_uv * 2 );\n\
\n\
\t\tstart_quad_flat     = start_tri_smooth_uv + len_tri_smooth_uv  + handlePadding( md.ntri_smooth_uv * 2 );\n\
\t\tstart_quad_smooth   = start_quad_flat     + len_quad_flat\t   + handlePadding( md.nquad_flat * 2 );\n\
\t\tstart_quad_flat_uv  = start_quad_smooth   + len_quad_smooth    + handlePadding( md.nquad_smooth * 2 );\n\
\t\tstart_quad_smooth_uv= start_quad_flat_uv  + len_quad_flat_uv   + handlePadding( md.nquad_flat_uv * 2 );\n\
\n\
\t\t// have to first process faces with uvs\n\
\t\t// so that face and uv indices match\n\
\n\
\t\tinit_triangles_flat_uv( start_tri_flat_uv );\n\
\t\tinit_triangles_smooth_uv( start_tri_smooth_uv );\n\
\n\
\t\tinit_quads_flat_uv( start_quad_flat_uv );\n\
\t\tinit_quads_smooth_uv( start_quad_smooth_uv );\n\
\n\
\t\t// now we can process untextured faces\n\
\n\
\t\tinit_triangles_flat( start_tri_flat );\n\
\t\tinit_triangles_smooth( start_tri_smooth );\n\
\n\
\t\tinit_quads_flat( start_quad_flat );\n\
\t\tinit_quads_smooth( start_quad_smooth );\n\
\n\
\t\tthis.computeCentroids();\n\
\t\tthis.computeFaceNormals();\n\
\n\
\t\tif ( THREE.Loader.prototype.hasNormals( this ) ) this.computeTangents();\n\
\n\
\t\tfunction handlePadding( n ) {\n\
\n\
\t\t\treturn ( n % 4 ) ? ( 4 - n % 4 ) : 0;\n\
\n\
\t\t};\n\
\n\
\t\tfunction parseMetaData( data, offset ) {\n\
\n\
\t\t\tvar metaData = {\n\
\n\
\t\t\t\t'signature'               :parseString( data, offset,  12 ),\n\
\t\t\t\t'header_bytes'            :parseUChar8( data, offset + 12 ),\n\
\n\
\t\t\t\t'vertex_coordinate_bytes' :parseUChar8( data, offset + 13 ),\n\
\t\t\t\t'normal_coordinate_bytes' :parseUChar8( data, offset + 14 ),\n\
\t\t\t\t'uv_coordinate_bytes'     :parseUChar8( data, offset + 15 ),\n\
\n\
\t\t\t\t'vertex_index_bytes'      :parseUChar8( data, offset + 16 ),\n\
\t\t\t\t'normal_index_bytes'      :parseUChar8( data, offset + 17 ),\n\
\t\t\t\t'uv_index_bytes'          :parseUChar8( data, offset + 18 ),\n\
\t\t\t\t'material_index_bytes'    :parseUChar8( data, offset + 19 ),\n\
\n\
\t\t\t\t'nvertices'    :parseUInt32( data, offset + 20 ),\n\
\t\t\t\t'nnormals'     :parseUInt32( data, offset + 20 + 4*1 ),\n\
\t\t\t\t'nuvs'         :parseUInt32( data, offset + 20 + 4*2 ),\n\
\n\
\t\t\t\t'ntri_flat'      :parseUInt32( data, offset + 20 + 4*3 ),\n\
\t\t\t\t'ntri_smooth'    :parseUInt32( data, offset + 20 + 4*4 ),\n\
\t\t\t\t'ntri_flat_uv'   :parseUInt32( data, offset + 20 + 4*5 ),\n\
\t\t\t\t'ntri_smooth_uv' :parseUInt32( data, offset + 20 + 4*6 ),\n\
\n\
\t\t\t\t'nquad_flat'      :parseUInt32( data, offset + 20 + 4*7 ),\n\
\t\t\t\t'nquad_smooth'    :parseUInt32( data, offset + 20 + 4*8 ),\n\
\t\t\t\t'nquad_flat_uv'   :parseUInt32( data, offset + 20 + 4*9 ),\n\
\t\t\t\t'nquad_smooth_uv' :parseUInt32( data, offset + 20 + 4*10 )\n\
\n\
\t\t\t};\n\
/*\n\
\t\t\tconsole.log( \"signature: \" + metaData.signature );\n\
\n\
\t\t\tconsole.log( \"header_bytes: \" + metaData.header_bytes );\n\
\t\t\tconsole.log( \"vertex_coordinate_bytes: \" + metaData.vertex_coordinate_bytes );\n\
\t\t\tconsole.log( \"normal_coordinate_bytes: \" + metaData.normal_coordinate_bytes );\n\
\t\t\tconsole.log( \"uv_coordinate_bytes: \" + metaData.uv_coordinate_bytes );\n\
\n\
\t\t\tconsole.log( \"vertex_index_bytes: \" + metaData.vertex_index_bytes );\n\
\t\t\tconsole.log( \"normal_index_bytes: \" + metaData.normal_index_bytes );\n\
\t\t\tconsole.log( \"uv_index_bytes: \" + metaData.uv_index_bytes );\n\
\t\t\tconsole.log( \"material_index_bytes: \" + metaData.material_index_bytes );\n\
\n\
\t\t\tconsole.log( \"nvertices: \" + metaData.nvertices );\n\
\t\t\tconsole.log( \"nnormals: \" + metaData.nnormals );\n\
\t\t\tconsole.log( \"nuvs: \" + metaData.nuvs );\n\
\n\
\t\t\tconsole.log( \"ntri_flat: \" + metaData.ntri_flat );\n\
\t\t\tconsole.log( \"ntri_smooth: \" + metaData.ntri_smooth );\n\
\t\t\tconsole.log( \"ntri_flat_uv: \" + metaData.ntri_flat_uv );\n\
\t\t\tconsole.log( \"ntri_smooth_uv: \" + metaData.ntri_smooth_uv );\n\
\n\
\t\t\tconsole.log( \"nquad_flat: \" + metaData.nquad_flat );\n\
\t\t\tconsole.log( \"nquad_smooth: \" + metaData.nquad_smooth );\n\
\t\t\tconsole.log( \"nquad_flat_uv: \" + metaData.nquad_flat_uv );\n\
\t\t\tconsole.log( \"nquad_smooth_uv: \" + metaData.nquad_smooth_uv );\n\
\n\
\t\t\tvar total = metaData.header_bytes\n\
\t\t\t\t\t  + metaData.nvertices * metaData.vertex_coordinate_bytes * 3\n\
\t\t\t\t\t  + metaData.nnormals * metaData.normal_coordinate_bytes * 3\n\
\t\t\t\t\t  + metaData.nuvs * metaData.uv_coordinate_bytes * 2\n\
\t\t\t\t\t  + metaData.ntri_flat * ( metaData.vertex_index_bytes*3 + metaData.material_index_bytes )\n\
\t\t\t\t\t  + metaData.ntri_smooth * ( metaData.vertex_index_bytes*3 + metaData.material_index_bytes + metaData.normal_index_bytes*3 )\n\
\t\t\t\t\t  + metaData.ntri_flat_uv * ( metaData.vertex_index_bytes*3 + metaData.material_index_bytes + metaData.uv_index_bytes*3 )\n\
\t\t\t\t\t  + metaData.ntri_smooth_uv * ( metaData.vertex_index_bytes*3 + metaData.material_index_bytes + metaData.normal_index_bytes*3 + metaData.uv_index_bytes*3 )\n\
\t\t\t\t\t  + metaData.nquad_flat * ( metaData.vertex_index_bytes*4 + metaData.material_index_bytes )\n\
\t\t\t\t\t  + metaData.nquad_smooth * ( metaData.vertex_index_bytes*4 + metaData.material_index_bytes + metaData.normal_index_bytes*4 )\n\
\t\t\t\t\t  + metaData.nquad_flat_uv * ( metaData.vertex_index_bytes*4 + metaData.material_index_bytes + metaData.uv_index_bytes*4 )\n\
\t\t\t\t\t  + metaData.nquad_smooth_uv * ( metaData.vertex_index_bytes*4 + metaData.material_index_bytes + metaData.normal_index_bytes*4 + metaData.uv_index_bytes*4 );\n\
\t\t\tconsole.log( \"total bytes: \" + total );\n\
*/\n\
\n\
\t\t\treturn metaData;\n\
\n\
\t\t};\n\
\n\
\t\tfunction parseString( data, offset, length ) {\n\
\n\
\t\t\tvar charArray = new Uint8Array( data, offset, length );\n\
\n\
\t\t\tvar text = \"\";\n\
\n\
\t\t\tfor ( var i = 0; i < length; i ++ ) {\n\
\n\
\t\t\t\ttext += String.fromCharCode( charArray[ offset + i ] );\n\
\n\
\t\t\t}\n\
\n\
\t\t\treturn text;\n\
\n\
\t\t};\n\
\n\
\t\tfunction parseUChar8( data, offset ) {\n\
\n\
\t\t\tvar charArray = new Uint8Array( data, offset, 1 );\n\
\n\
\t\t\treturn charArray[ 0 ];\n\
\n\
\t\t};\n\
\n\
\t\tfunction parseUInt32( data, offset ) {\n\
\n\
\t\t\tvar intArray = new Uint32Array( data, offset, 1 );\n\
\n\
\t\t\treturn intArray[ 0 ];\n\
\n\
\t\t};\n\
\n\
\t\tfunction init_vertices( start ) {\n\
\n\
\t\t\tvar nElements = md.nvertices;\n\
\n\
\t\t\tvar coordArray = new Float32Array( data, start, nElements * 3 );\n\
\n\
\t\t\tvar i, x, y, z;\n\
\n\
\t\t\tfor( i = 0; i < nElements; i ++ ) {\n\
\n\
\t\t\t\tx = coordArray[ i * 3 ];\n\
\t\t\t\ty = coordArray[ i * 3 + 1 ];\n\
\t\t\t\tz = coordArray[ i * 3 + 2 ];\n\
\n\
\t\t\t\tvertex( scope, x, y, z );\n\
\n\
\t\t\t}\n\
\n\
\t\t\treturn nElements * 3 * Float32Array.BYTES_PER_ELEMENT;\n\
\n\
\t\t};\n\
\n\
\t\tfunction init_normals( start ) {\n\
\n\
\t\t\tvar nElements = md.nnormals;\n\
\n\
\t\t\tif ( nElements ) {\n\
\n\
\t\t\t\tvar normalArray = new Int8Array( data, start, nElements * 3 );\n\
\n\
\t\t\t\tvar i, x, y, z;\n\
\n\
\t\t\t\tfor( i = 0; i < nElements; i ++ ) {\n\
\n\
\t\t\t\t\tx = normalArray[ i * 3 ];\n\
\t\t\t\t\ty = normalArray[ i * 3 + 1 ];\n\
\t\t\t\t\tz = normalArray[ i * 3 + 2 ];\n\
\n\
\t\t\t\t\tnormals.push( x/127, y/127, z/127 );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t\treturn nElements * 3 * Int8Array.BYTES_PER_ELEMENT;\n\
\n\
\t\t};\n\
\n\
\t\tfunction init_uvs( start ) {\n\
\n\
\t\t\tvar nElements = md.nuvs;\n\
\n\
\t\t\tif ( nElements ) {\n\
\n\
\t\t\t\tvar uvArray = new Float32Array( data, start, nElements * 2 );\n\
\n\
\t\t\t\tvar i, u, v;\n\
\n\
\t\t\t\tfor( i = 0; i < nElements; i ++ ) {\n\
\n\
\t\t\t\t\tu = uvArray[ i * 2 ];\n\
\t\t\t\t\tv = uvArray[ i * 2 + 1 ];\n\
\n\
\t\t\t\t\tuvs.push( u, v );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t\treturn nElements * 2 * Float32Array.BYTES_PER_ELEMENT;\n\
\n\
\t\t};\n\
\n\
\t\tfunction init_uvs3( nElements, offset ) {\n\
\n\
\t\t\tvar i, uva, uvb, uvc, u1, u2, u3, v1, v2, v3;\n\
\n\
\t\t\tvar uvIndexBuffer = new Uint32Array( data, offset, 3 * nElements );\n\
\n\
\t\t\tfor( i = 0; i < nElements; i ++ ) {\n\
\n\
\t\t\t\tuva = uvIndexBuffer[ i * 3 ];\n\
\t\t\t\tuvb = uvIndexBuffer[ i * 3 + 1 ];\n\
\t\t\t\tuvc = uvIndexBuffer[ i * 3 + 2 ];\n\
\n\
\t\t\t\tu1 = uvs[ uva*2 ];\n\
\t\t\t\tv1 = uvs[ uva*2 + 1 ];\n\
\n\
\t\t\t\tu2 = uvs[ uvb*2 ];\n\
\t\t\t\tv2 = uvs[ uvb*2 + 1 ];\n\
\n\
\t\t\t\tu3 = uvs[ uvc*2 ];\n\
\t\t\t\tv3 = uvs[ uvc*2 + 1 ];\n\
\n\
\t\t\t\tuv3( scope.faceVertexUvs[ 0 ], u1, v1, u2, v2, u3, v3 );\n\
\n\
\t\t\t}\n\
\n\
\t\t};\n\
\n\
\t\tfunction init_uvs4( nElements, offset ) {\n\
\n\
\t\t\tvar i, uva, uvb, uvc, uvd, u1, u2, u3, u4, v1, v2, v3, v4;\n\
\n\
\t\t\tvar uvIndexBuffer = new Uint32Array( data, offset, 4 * nElements );\n\
\n\
\t\t\tfor( i = 0; i < nElements; i ++ ) {\n\
\n\
\t\t\t\tuva = uvIndexBuffer[ i * 4 ];\n\
\t\t\t\tuvb = uvIndexBuffer[ i * 4 + 1 ];\n\
\t\t\t\tuvc = uvIndexBuffer[ i * 4 + 2 ];\n\
\t\t\t\tuvd = uvIndexBuffer[ i * 4 + 3 ];\n\
\n\
\t\t\t\tu1 = uvs[ uva*2 ];\n\
\t\t\t\tv1 = uvs[ uva*2 + 1 ];\n\
\n\
\t\t\t\tu2 = uvs[ uvb*2 ];\n\
\t\t\t\tv2 = uvs[ uvb*2 + 1 ];\n\
\n\
\t\t\t\tu3 = uvs[ uvc*2 ];\n\
\t\t\t\tv3 = uvs[ uvc*2 + 1 ];\n\
\n\
\t\t\t\tu4 = uvs[ uvd*2 ];\n\
\t\t\t\tv4 = uvs[ uvd*2 + 1 ];\n\
\n\
\t\t\t\tuv4( scope.faceVertexUvs[ 0 ], u1, v1, u2, v2, u3, v3, u4, v4 );\n\
\n\
\t\t\t}\n\
\n\
\t\t};\n\
\n\
\t\tfunction init_faces3_flat( nElements, offsetVertices, offsetMaterials ) {\n\
\n\
\t\t\tvar i, a, b, c, m;\n\
\n\
\t\t\tvar vertexIndexBuffer = new Uint32Array( data, offsetVertices, 3 * nElements );\n\
\t\t\tvar materialIndexBuffer = new Uint16Array( data, offsetMaterials, nElements );\n\
\n\
\t\t\tfor( i = 0; i < nElements; i ++ ) {\n\
\n\
\t\t\t\ta = vertexIndexBuffer[ i * 3 ];\n\
\t\t\t\tb = vertexIndexBuffer[ i * 3 + 1 ];\n\
\t\t\t\tc = vertexIndexBuffer[ i * 3 + 2 ];\n\
\n\
\t\t\t\tm = materialIndexBuffer[ i ];\n\
\n\
\t\t\t\tf3( scope, a, b, c, m );\n\
\n\
\t\t\t}\n\
\n\
\t\t};\n\
\n\
\t\tfunction init_faces4_flat( nElements, offsetVertices, offsetMaterials ) {\n\
\n\
\t\t\tvar i, a, b, c, d, m;\n\
\n\
\t\t\tvar vertexIndexBuffer = new Uint32Array( data, offsetVertices, 4 * nElements );\n\
\t\t\tvar materialIndexBuffer = new Uint16Array( data, offsetMaterials, nElements );\n\
\n\
\t\t\tfor( i = 0; i < nElements; i ++ ) {\n\
\n\
\t\t\t\ta = vertexIndexBuffer[ i * 4 ];\n\
\t\t\t\tb = vertexIndexBuffer[ i * 4 + 1 ];\n\
\t\t\t\tc = vertexIndexBuffer[ i * 4 + 2 ];\n\
\t\t\t\td = vertexIndexBuffer[ i * 4 + 3 ];\n\
\n\
\t\t\t\tm = materialIndexBuffer[ i ];\n\
\n\
\t\t\t\tf4( scope, a, b, c, d, m );\n\
\n\
\t\t\t}\n\
\n\
\t\t};\n\
\n\
\t\tfunction init_faces3_smooth( nElements, offsetVertices, offsetNormals, offsetMaterials ) {\n\
\n\
\t\t\tvar i, a, b, c, m;\n\
\t\t\tvar na, nb, nc;\n\
\n\
\t\t\tvar vertexIndexBuffer = new Uint32Array( data, offsetVertices, 3 * nElements );\n\
\t\t\tvar normalIndexBuffer = new Uint32Array( data, offsetNormals, 3 * nElements );\n\
\t\t\tvar materialIndexBuffer = new Uint16Array( data, offsetMaterials, nElements );\n\
\n\
\t\t\tfor( i = 0; i < nElements; i ++ ) {\n\
\n\
\t\t\t\ta = vertexIndexBuffer[ i * 3 ];\n\
\t\t\t\tb = vertexIndexBuffer[ i * 3 + 1 ];\n\
\t\t\t\tc = vertexIndexBuffer[ i * 3 + 2 ];\n\
\n\
\t\t\t\tna = normalIndexBuffer[ i * 3 ];\n\
\t\t\t\tnb = normalIndexBuffer[ i * 3 + 1 ];\n\
\t\t\t\tnc = normalIndexBuffer[ i * 3 + 2 ];\n\
\n\
\t\t\t\tm = materialIndexBuffer[ i ];\n\
\n\
\t\t\t\tf3n( scope, normals, a, b, c, m, na, nb, nc );\n\
\n\
\t\t\t}\n\
\n\
\t\t};\n\
\n\
\t\tfunction init_faces4_smooth( nElements, offsetVertices, offsetNormals, offsetMaterials ) {\n\
\n\
\t\t\tvar i, a, b, c, d, m;\n\
\t\t\tvar na, nb, nc, nd;\n\
\n\
\t\t\tvar vertexIndexBuffer = new Uint32Array( data, offsetVertices, 4 * nElements );\n\
\t\t\tvar normalIndexBuffer = new Uint32Array( data, offsetNormals, 4 * nElements );\n\
\t\t\tvar materialIndexBuffer = new Uint16Array( data, offsetMaterials, nElements );\n\
\n\
\t\t\tfor( i = 0; i < nElements; i ++ ) {\n\
\n\
\t\t\t\ta = vertexIndexBuffer[ i * 4 ];\n\
\t\t\t\tb = vertexIndexBuffer[ i * 4 + 1 ];\n\
\t\t\t\tc = vertexIndexBuffer[ i * 4 + 2 ];\n\
\t\t\t\td = vertexIndexBuffer[ i * 4 + 3 ];\n\
\n\
\t\t\t\tna = normalIndexBuffer[ i * 4 ];\n\
\t\t\t\tnb = normalIndexBuffer[ i * 4 + 1 ];\n\
\t\t\t\tnc = normalIndexBuffer[ i * 4 + 2 ];\n\
\t\t\t\tnd = normalIndexBuffer[ i * 4 + 3 ];\n\
\n\
\t\t\t\tm = materialIndexBuffer[ i ];\n\
\n\
\t\t\t\tf4n( scope, normals, a, b, c, d, m, na, nb, nc, nd );\n\
\n\
\t\t\t}\n\
\n\
\t\t};\n\
\n\
\t\tfunction init_triangles_flat( start ) {\n\
\n\
\t\t\tvar nElements = md.ntri_flat;\n\
\n\
\t\t\tif ( nElements ) {\n\
\n\
\t\t\t\tvar offsetMaterials = start + nElements * Uint32Array.BYTES_PER_ELEMENT * 3;\n\
\t\t\t\tinit_faces3_flat( nElements, start, offsetMaterials );\n\
\n\
\t\t\t}\n\
\n\
\t\t};\n\
\n\
\t\tfunction init_triangles_flat_uv( start ) {\n\
\n\
\t\t\tvar nElements = md.ntri_flat_uv;\n\
\n\
\t\t\tif ( nElements ) {\n\
\n\
\t\t\t\tvar offsetUvs = start + nElements * Uint32Array.BYTES_PER_ELEMENT * 3;\n\
\t\t\t\tvar offsetMaterials = offsetUvs + nElements * Uint32Array.BYTES_PER_ELEMENT * 3;\n\
\n\
\t\t\t\tinit_faces3_flat( nElements, start, offsetMaterials );\n\
\t\t\t\tinit_uvs3( nElements, offsetUvs );\n\
\n\
\t\t\t}\n\
\n\
\t\t};\n\
\n\
\t\tfunction init_triangles_smooth( start ) {\n\
\n\
\t\t\tvar nElements = md.ntri_smooth;\n\
\n\
\t\t\tif ( nElements ) {\n\
\n\
\t\t\t\tvar offsetNormals = start + nElements * Uint32Array.BYTES_PER_ELEMENT * 3;\n\
\t\t\t\tvar offsetMaterials = offsetNormals + nElements * Uint32Array.BYTES_PER_ELEMENT * 3;\n\
\n\
\t\t\t\tinit_faces3_smooth( nElements, start, offsetNormals, offsetMaterials );\n\
\n\
\t\t\t}\n\
\n\
\t\t};\n\
\n\
\t\tfunction init_triangles_smooth_uv( start ) {\n\
\n\
\t\t\tvar nElements = md.ntri_smooth_uv;\n\
\n\
\t\t\tif ( nElements ) {\n\
\n\
\t\t\t\tvar offsetNormals = start + nElements * Uint32Array.BYTES_PER_ELEMENT * 3;\n\
\t\t\t\tvar offsetUvs = offsetNormals + nElements * Uint32Array.BYTES_PER_ELEMENT * 3;\n\
\t\t\t\tvar offsetMaterials = offsetUvs + nElements * Uint32Array.BYTES_PER_ELEMENT * 3;\n\
\n\
\t\t\t\tinit_faces3_smooth( nElements, start, offsetNormals, offsetMaterials );\n\
\t\t\t\tinit_uvs3( nElements, offsetUvs );\n\
\n\
\t\t\t}\n\
\n\
\t\t};\n\
\n\
\t\tfunction init_quads_flat( start ) {\n\
\n\
\t\t\tvar nElements = md.nquad_flat;\n\
\n\
\t\t\tif ( nElements ) {\n\
\n\
\t\t\t\tvar offsetMaterials = start + nElements * Uint32Array.BYTES_PER_ELEMENT * 4;\n\
\t\t\t\tinit_faces4_flat( nElements, start, offsetMaterials );\n\
\n\
\t\t\t}\n\
\n\
\t\t};\n\
\n\
\t\tfunction init_quads_flat_uv( start ) {\n\
\n\
\t\t\tvar nElements = md.nquad_flat_uv;\n\
\n\
\t\t\tif ( nElements ) {\n\
\n\
\t\t\t\tvar offsetUvs = start + nElements * Uint32Array.BYTES_PER_ELEMENT * 4;\n\
\t\t\t\tvar offsetMaterials = offsetUvs + nElements * Uint32Array.BYTES_PER_ELEMENT * 4;\n\
\n\
\t\t\t\tinit_faces4_flat( nElements, start, offsetMaterials );\n\
\t\t\t\tinit_uvs4( nElements, offsetUvs );\n\
\n\
\t\t\t}\n\
\n\
\t\t};\n\
\n\
\t\tfunction init_quads_smooth( start ) {\n\
\n\
\t\t\tvar nElements = md.nquad_smooth;\n\
\n\
\t\t\tif ( nElements ) {\n\
\n\
\t\t\t\tvar offsetNormals = start + nElements * Uint32Array.BYTES_PER_ELEMENT * 4;\n\
\t\t\t\tvar offsetMaterials = offsetNormals + nElements * Uint32Array.BYTES_PER_ELEMENT * 4;\n\
\n\
\t\t\t\tinit_faces4_smooth( nElements, start, offsetNormals, offsetMaterials );\n\
\n\
\t\t\t}\n\
\n\
\t\t};\n\
\n\
\t\tfunction init_quads_smooth_uv( start ) {\n\
\n\
\t\t\tvar nElements = md.nquad_smooth_uv;\n\
\n\
\t\t\tif ( nElements ) {\n\
\n\
\t\t\t\tvar offsetNormals = start + nElements * Uint32Array.BYTES_PER_ELEMENT * 4;\n\
\t\t\t\tvar offsetUvs = offsetNormals + nElements * Uint32Array.BYTES_PER_ELEMENT * 4;\n\
\t\t\t\tvar offsetMaterials = offsetUvs + nElements * Uint32Array.BYTES_PER_ELEMENT * 4;\n\
\n\
\t\t\t\tinit_faces4_smooth( nElements, start, offsetNormals, offsetMaterials );\n\
\t\t\t\tinit_uvs4( nElements, offsetUvs );\n\
\n\
\t\t\t}\n\
\n\
\t\t};\n\
\n\
\t};\n\
\n\
\tfunction vertex ( scope, x, y, z ) {\n\
\n\
\t\tscope.vertices.push( new THREE.Vector3( x, y, z ) );\n\
\n\
\t};\n\
\n\
\tfunction f3 ( scope, a, b, c, mi ) {\n\
\n\
\t\tscope.faces.push( new THREE.Face3( a, b, c, null, null, mi ) );\n\
\n\
\t};\n\
\n\
\tfunction f4 ( scope, a, b, c, d, mi ) {\n\
\n\
\t\tscope.faces.push( new THREE.Face4( a, b, c, d, null, null, mi ) );\n\
\n\
\t};\n\
\n\
\tfunction f3n ( scope, normals, a, b, c, mi, na, nb, nc ) {\n\
\n\
\t\tvar nax = normals[ na*3     ],\n\
\t\t\tnay = normals[ na*3 + 1 ],\n\
\t\t\tnaz = normals[ na*3 + 2 ],\n\
\n\
\t\t\tnbx = normals[ nb*3     ],\n\
\t\t\tnby = normals[ nb*3 + 1 ],\n\
\t\t\tnbz = normals[ nb*3 + 2 ],\n\
\n\
\t\t\tncx = normals[ nc*3     ],\n\
\t\t\tncy = normals[ nc*3 + 1 ],\n\
\t\t\tncz = normals[ nc*3 + 2 ];\n\
\n\
\t\tscope.faces.push( new THREE.Face3( a, b, c,\n\
\t\t\t\t\t\t  [new THREE.Vector3( nax, nay, naz ),\n\
\t\t\t\t\t\t   new THREE.Vector3( nbx, nby, nbz ),\n\
\t\t\t\t\t\t   new THREE.Vector3( ncx, ncy, ncz )],\n\
\t\t\t\t\t\t  null,\n\
\t\t\t\t\t\t  mi ) );\n\
\n\
\t};\n\
\n\
\tfunction f4n ( scope, normals, a, b, c, d, mi, na, nb, nc, nd ) {\n\
\n\
\t\tvar nax = normals[ na*3     ],\n\
\t\t\tnay = normals[ na*3 + 1 ],\n\
\t\t\tnaz = normals[ na*3 + 2 ],\n\
\n\
\t\t\tnbx = normals[ nb*3     ],\n\
\t\t\tnby = normals[ nb*3 + 1 ],\n\
\t\t\tnbz = normals[ nb*3 + 2 ],\n\
\n\
\t\t\tncx = normals[ nc*3     ],\n\
\t\t\tncy = normals[ nc*3 + 1 ],\n\
\t\t\tncz = normals[ nc*3 + 2 ],\n\
\n\
\t\t\tndx = normals[ nd*3     ],\n\
\t\t\tndy = normals[ nd*3 + 1 ],\n\
\t\t\tndz = normals[ nd*3 + 2 ];\n\
\n\
\t\tscope.faces.push( new THREE.Face4( a, b, c, d,\n\
\t\t\t\t\t\t  [new THREE.Vector3( nax, nay, naz ),\n\
\t\t\t\t\t\t   new THREE.Vector3( nbx, nby, nbz ),\n\
\t\t\t\t\t\t   new THREE.Vector3( ncx, ncy, ncz ),\n\
\t\t\t\t\t\t   new THREE.Vector3( ndx, ndy, ndz )],\n\
\t\t\t\t\t\t  null,\n\
\t\t\t\t\t\t  mi ) );\n\
\n\
\t};\n\
\n\
\tfunction uv3 ( where, u1, v1, u2, v2, u3, v3 ) {\n\
\n\
\t\tvar uv = [];\n\
\t\tuv.push( new THREE.UV( u1, v1 ) );\n\
\t\tuv.push( new THREE.UV( u2, v2 ) );\n\
\t\tuv.push( new THREE.UV( u3, v3 ) );\n\
\t\twhere.push( uv );\n\
\n\
\t};\n\
\n\
\tfunction uv4 ( where, u1, v1, u2, v2, u3, v3, u4, v4 ) {\n\
\n\
\t\tvar uv = [];\n\
\t\tuv.push( new THREE.UV( u1, v1 ) );\n\
\t\tuv.push( new THREE.UV( u2, v2 ) );\n\
\t\tuv.push( new THREE.UV( u3, v3 ) );\n\
\t\tuv.push( new THREE.UV( u4, v4 ) );\n\
\t\twhere.push( uv );\n\
\n\
\t};\n\
\n\
\tModel.prototype = Object.create( THREE.Geometry.prototype );\n\
\n\
\tcallback( new Model( texturePath ) );\n\
\n\
};\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 */\n\
\n\
THREE.ImageLoader = function () {\n\
\n\
\tTHREE.EventTarget.call( this );\n\
\n\
\tthis.crossOrigin = null;\n\
\n\
};\n\
\n\
THREE.ImageLoader.prototype = {\n\
\n\
\tconstructor: THREE.ImageLoader,\n\
\n\
\tload: function ( url, image ) {\n\
\n\
\t\tvar scope = this;\n\
\n\
\t\tif ( image === undefined ) image = new Image();\n\
\n\
\t\timage.addEventListener( 'load', function () {\n\
\n\
\t\t\tscope.dispatchEvent( { type: 'load', content: image } );\n\
\n\
\t\t}, false );\n\
\n\
\t\timage.addEventListener( 'error', function () {\n\
\n\
\t\t\tscope.dispatchEvent( { type: 'error', message: 'Couldn\\'t load URL [' + url + ']' } );\n\
\n\
\t\t}, false );\n\
\n\
\t\tif ( scope.crossOrigin ) image.crossOrigin = scope.crossOrigin;\n\
\n\
\t\timage.src = url;\n\
\n\
\t}\n\
\n\
}\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.JSONLoader = function ( showStatus ) {\n\
\n\
\tTHREE.Loader.call( this, showStatus );\n\
\n\
};\n\
\n\
THREE.JSONLoader.prototype = Object.create( THREE.Loader.prototype );\n\
\n\
THREE.JSONLoader.prototype.load = function ( url, callback, texturePath ) {\n\
\n\
\tvar scope = this;\n\
\n\
\ttexturePath = texturePath ? texturePath : this.extractUrlBase( url );\n\
\n\
\tthis.onLoadStart();\n\
\tthis.loadAjaxJSON( this, url, callback, texturePath );\n\
\n\
};\n\
\n\
THREE.JSONLoader.prototype.loadAjaxJSON = function ( context, url, callback, texturePath, callbackProgress ) {\n\
\n\
\tvar xhr = new XMLHttpRequest();\n\
\n\
\tvar length = 0;\n\
\n\
\txhr.onreadystatechange = function () {\n\
\n\
\t\tif ( xhr.readyState === xhr.DONE ) {\n\
\n\
\t\t\tif ( xhr.status === 200 || xhr.status === 0 ) {\n\
\n\
\t\t\t\tif ( xhr.responseText ) {\n\
\n\
\t\t\t\t\tvar json = JSON.parse( xhr.responseText );\n\
\t\t\t\t\tcontext.createModel( json, callback, texturePath );\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\tconsole.warn( \"THREE.JSONLoader: [\" + url + \"] seems to be unreachable or file there is empty\" );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\t// in context of more complex asset initialization\n\
\t\t\t\t// do not block on single failed file\n\
\t\t\t\t// maybe should go even one more level up\n\
\n\
\t\t\t\tcontext.onLoadComplete();\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tconsole.error( \"THREE.JSONLoader: Couldn't load [\" + url + \"] [\" + xhr.status + \"]\" );\n\
\n\
\t\t\t}\n\
\n\
\t\t} else if ( xhr.readyState === xhr.LOADING ) {\n\
\n\
\t\t\tif ( callbackProgress ) {\n\
\n\
\t\t\t\tif ( length === 0 ) {\n\
\n\
\t\t\t\t\tlength = xhr.getResponseHeader( \"Content-Length\" );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tcallbackProgress( { total: length, loaded: xhr.responseText.length } );\n\
\n\
\t\t\t}\n\
\n\
\t\t} else if ( xhr.readyState === xhr.HEADERS_RECEIVED ) {\n\
\n\
\t\t\tlength = xhr.getResponseHeader( \"Content-Length\" );\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\txhr.open( \"GET\", url, true );\n\
\txhr.send( null );\n\
\n\
};\n\
\n\
THREE.JSONLoader.prototype.createModel = function ( json, callback, texturePath ) {\n\
\n\
\tvar scope = this,\n\
\tgeometry = new THREE.Geometry(),\n\
\tscale = ( json.scale !== undefined ) ? 1.0 / json.scale : 1.0;\n\
\n\
\tthis.initMaterials( geometry, json.materials, texturePath );\n\
\n\
\tparseModel( scale );\n\
\n\
\tparseSkin();\n\
\tparseMorphing( scale );\n\
\n\
\tgeometry.computeCentroids();\n\
\tgeometry.computeFaceNormals();\n\
\n\
\tif ( this.hasNormals( geometry ) ) geometry.computeTangents();\n\
\n\
\n\
\tfunction parseModel( scale ) {\n\
\n\
\t\tfunction isBitSet( value, position ) {\n\
\n\
\t\t\treturn value & ( 1 << position );\n\
\n\
\t\t}\n\
\n\
\t\tvar i, j, fi,\n\
\n\
\t\toffset, zLength, nVertices,\n\
\n\
\t\tcolorIndex, normalIndex, uvIndex, materialIndex,\n\
\n\
\t\ttype,\n\
\t\tisQuad,\n\
\t\thasMaterial,\n\
\t\thasFaceUv, hasFaceVertexUv,\n\
\t\thasFaceNormal, hasFaceVertexNormal,\n\
\t\thasFaceColor, hasFaceVertexColor,\n\
\n\
\t\tvertex, face, color, normal,\n\
\n\
\t\tuvLayer, uvs, u, v,\n\
\n\
\t\tfaces = json.faces,\n\
\t\tvertices = json.vertices,\n\
\t\tnormals = json.normals,\n\
\t\tcolors = json.colors,\n\
\n\
\t\tnUvLayers = 0;\n\
\n\
\t\t// disregard empty arrays\n\
\n\
\t\tfor ( i = 0; i < json.uvs.length; i++ ) {\n\
\n\
\t\t\tif ( json.uvs[ i ].length ) nUvLayers ++;\n\
\n\
\t\t}\n\
\n\
\t\tfor ( i = 0; i < nUvLayers; i++ ) {\n\
\n\
\t\t\tgeometry.faceUvs[ i ] = [];\n\
\t\t\tgeometry.faceVertexUvs[ i ] = [];\n\
\n\
\t\t}\n\
\n\
\t\toffset = 0;\n\
\t\tzLength = vertices.length;\n\
\n\
\t\twhile ( offset < zLength ) {\n\
\n\
\t\t\tvertex = new THREE.Vector3();\n\
\n\
\t\t\tvertex.x = vertices[ offset ++ ] * scale;\n\
\t\t\tvertex.y = vertices[ offset ++ ] * scale;\n\
\t\t\tvertex.z = vertices[ offset ++ ] * scale;\n\
\n\
\t\t\tgeometry.vertices.push( vertex );\n\
\n\
\t\t}\n\
\n\
\t\toffset = 0;\n\
\t\tzLength = faces.length;\n\
\n\
\t\twhile ( offset < zLength ) {\n\
\n\
\t\t\ttype = faces[ offset ++ ];\n\
\n\
\n\
\t\t\tisQuad          \t= isBitSet( type, 0 );\n\
\t\t\thasMaterial         = isBitSet( type, 1 );\n\
\t\t\thasFaceUv           = isBitSet( type, 2 );\n\
\t\t\thasFaceVertexUv     = isBitSet( type, 3 );\n\
\t\t\thasFaceNormal       = isBitSet( type, 4 );\n\
\t\t\thasFaceVertexNormal = isBitSet( type, 5 );\n\
\t\t\thasFaceColor\t    = isBitSet( type, 6 );\n\
\t\t\thasFaceVertexColor  = isBitSet( type, 7 );\n\
\n\
\t\t\t//console.log(\"type\", type, \"bits\", isQuad, hasMaterial, hasFaceUv, hasFaceVertexUv, hasFaceNormal, hasFaceVertexNormal, hasFaceColor, hasFaceVertexColor);\n\
\n\
\t\t\tif ( isQuad ) {\n\
\n\
\t\t\t\tface = new THREE.Face4();\n\
\n\
\t\t\t\tface.a = faces[ offset ++ ];\n\
\t\t\t\tface.b = faces[ offset ++ ];\n\
\t\t\t\tface.c = faces[ offset ++ ];\n\
\t\t\t\tface.d = faces[ offset ++ ];\n\
\n\
\t\t\t\tnVertices = 4;\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tface = new THREE.Face3();\n\
\n\
\t\t\t\tface.a = faces[ offset ++ ];\n\
\t\t\t\tface.b = faces[ offset ++ ];\n\
\t\t\t\tface.c = faces[ offset ++ ];\n\
\n\
\t\t\t\tnVertices = 3;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( hasMaterial ) {\n\
\n\
\t\t\t\tmaterialIndex = faces[ offset ++ ];\n\
\t\t\t\tface.materialIndex = materialIndex;\n\
\n\
\t\t\t}\n\
\n\
\t\t\t// to get face <=> uv index correspondence\n\
\n\
\t\t\tfi = geometry.faces.length;\n\
\n\
\t\t\tif ( hasFaceUv ) {\n\
\n\
\t\t\t\tfor ( i = 0; i < nUvLayers; i++ ) {\n\
\n\
\t\t\t\t\tuvLayer = json.uvs[ i ];\n\
\n\
\t\t\t\t\tuvIndex = faces[ offset ++ ];\n\
\n\
\t\t\t\t\tu = uvLayer[ uvIndex * 2 ];\n\
\t\t\t\t\tv = uvLayer[ uvIndex * 2 + 1 ];\n\
\n\
\t\t\t\t\tgeometry.faceUvs[ i ][ fi ] = new THREE.UV( u, v );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( hasFaceVertexUv ) {\n\
\n\
\t\t\t\tfor ( i = 0; i < nUvLayers; i++ ) {\n\
\n\
\t\t\t\t\tuvLayer = json.uvs[ i ];\n\
\n\
\t\t\t\t\tuvs = [];\n\
\n\
\t\t\t\t\tfor ( j = 0; j < nVertices; j ++ ) {\n\
\n\
\t\t\t\t\t\tuvIndex = faces[ offset ++ ];\n\
\n\
\t\t\t\t\t\tu = uvLayer[ uvIndex * 2 ];\n\
\t\t\t\t\t\tv = uvLayer[ uvIndex * 2 + 1 ];\n\
\n\
\t\t\t\t\t\tuvs[ j ] = new THREE.UV( u, v );\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\tgeometry.faceVertexUvs[ i ][ fi ] = uvs;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( hasFaceNormal ) {\n\
\n\
\t\t\t\tnormalIndex = faces[ offset ++ ] * 3;\n\
\n\
\t\t\t\tnormal = new THREE.Vector3();\n\
\n\
\t\t\t\tnormal.x = normals[ normalIndex ++ ];\n\
\t\t\t\tnormal.y = normals[ normalIndex ++ ];\n\
\t\t\t\tnormal.z = normals[ normalIndex ];\n\
\n\
\t\t\t\tface.normal = normal;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( hasFaceVertexNormal ) {\n\
\n\
\t\t\t\tfor ( i = 0; i < nVertices; i++ ) {\n\
\n\
\t\t\t\t\tnormalIndex = faces[ offset ++ ] * 3;\n\
\n\
\t\t\t\t\tnormal = new THREE.Vector3();\n\
\n\
\t\t\t\t\tnormal.x = normals[ normalIndex ++ ];\n\
\t\t\t\t\tnormal.y = normals[ normalIndex ++ ];\n\
\t\t\t\t\tnormal.z = normals[ normalIndex ];\n\
\n\
\t\t\t\t\tface.vertexNormals.push( normal );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\n\
\t\t\tif ( hasFaceColor ) {\n\
\n\
\t\t\t\tcolorIndex = faces[ offset ++ ];\n\
\n\
\t\t\t\tcolor = new THREE.Color( colors[ colorIndex ] );\n\
\t\t\t\tface.color = color;\n\
\n\
\t\t\t}\n\
\n\
\n\
\t\t\tif ( hasFaceVertexColor ) {\n\
\n\
\t\t\t\tfor ( i = 0; i < nVertices; i++ ) {\n\
\n\
\t\t\t\t\tcolorIndex = faces[ offset ++ ];\n\
\n\
\t\t\t\t\tcolor = new THREE.Color( colors[ colorIndex ] );\n\
\t\t\t\t\tface.vertexColors.push( color );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t\tgeometry.faces.push( face );\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tfunction parseSkin() {\n\
\n\
\t\tvar i, l, x, y, z, w, a, b, c, d;\n\
\n\
\t\tif ( json.skinWeights ) {\n\
\n\
\t\t\tfor ( i = 0, l = json.skinWeights.length; i < l; i += 2 ) {\n\
\n\
\t\t\t\tx = json.skinWeights[ i     ];\n\
\t\t\t\ty = json.skinWeights[ i + 1 ];\n\
\t\t\t\tz = 0;\n\
\t\t\t\tw = 0;\n\
\n\
\t\t\t\tgeometry.skinWeights.push( new THREE.Vector4( x, y, z, w ) );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tif ( json.skinIndices ) {\n\
\n\
\t\t\tfor ( i = 0, l = json.skinIndices.length; i < l; i += 2 ) {\n\
\n\
\t\t\t\ta = json.skinIndices[ i     ];\n\
\t\t\t\tb = json.skinIndices[ i + 1 ];\n\
\t\t\t\tc = 0;\n\
\t\t\t\td = 0;\n\
\n\
\t\t\t\tgeometry.skinIndices.push( new THREE.Vector4( a, b, c, d ) );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tgeometry.bones = json.bones;\n\
\t\tgeometry.animation = json.animation;\n\
\n\
\t};\n\
\n\
\tfunction parseMorphing( scale ) {\n\
\n\
\t\tif ( json.morphTargets !== undefined ) {\n\
\n\
\t\t\tvar i, l, v, vl, dstVertices, srcVertices;\n\
\n\
\t\t\tfor ( i = 0, l = json.morphTargets.length; i < l; i ++ ) {\n\
\n\
\t\t\t\tgeometry.morphTargets[ i ] = {};\n\
\t\t\t\tgeometry.morphTargets[ i ].name = json.morphTargets[ i ].name;\n\
\t\t\t\tgeometry.morphTargets[ i ].vertices = [];\n\
\n\
\t\t\t\tdstVertices = geometry.morphTargets[ i ].vertices;\n\
\t\t\t\tsrcVertices = json.morphTargets [ i ].vertices;\n\
\n\
\t\t\t\tfor( v = 0, vl = srcVertices.length; v < vl; v += 3 ) {\n\
\n\
\t\t\t\t\tvar vertex = new THREE.Vector3();\n\
\t\t\t\t\tvertex.x = srcVertices[ v ] * scale;\n\
\t\t\t\t\tvertex.y = srcVertices[ v + 1 ] * scale;\n\
\t\t\t\t\tvertex.z = srcVertices[ v + 2 ] * scale;\n\
\n\
\t\t\t\t\tdstVertices.push( vertex );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tif ( json.morphColors !== undefined ) {\n\
\n\
\t\t\tvar i, l, c, cl, dstColors, srcColors, color;\n\
\n\
\t\t\tfor ( i = 0, l = json.morphColors.length; i < l; i++ ) {\n\
\n\
\t\t\t\tgeometry.morphColors[ i ] = {};\n\
\t\t\t\tgeometry.morphColors[ i ].name = json.morphColors[ i ].name;\n\
\t\t\t\tgeometry.morphColors[ i ].colors = [];\n\
\n\
\t\t\t\tdstColors = geometry.morphColors[ i ].colors;\n\
\t\t\t\tsrcColors = json.morphColors [ i ].colors;\n\
\n\
\t\t\t\tfor ( c = 0, cl = srcColors.length; c < cl; c += 3 ) {\n\
\n\
\t\t\t\t\tcolor = new THREE.Color( 0xffaa00 );\n\
\t\t\t\t\tcolor.setRGB( srcColors[ c ], srcColors[ c + 1 ], srcColors[ c + 2 ] );\n\
\t\t\t\t\tdstColors.push( color );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tcallback( geometry );\n\
\n\
};\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.GeometryLoader = function () {\n\
\n\
\tTHREE.EventTarget.call( this );\n\
\n\
\tthis.crossOrigin = null;\n\
\tthis.path = null;\n\
\n\
\n\
};\n\
\n\
THREE.GeometryLoader.prototype = {\n\
\n\
\tconstructor: THREE.GeometryLoader,\n\
\n\
\tload: function ( url ) {\n\
\n\
\t\tvar scope = this;\n\
\t\tvar geometry = null;\n\
\n\
\t\tif ( scope.path === null ) {\n\
\n\
\t\t\tvar parts = url.split( '/' ); parts.pop();\n\
\t\t\tscope.path = ( parts.length < 1 ? '.' : parts.join( '/' ) );\n\
\n\
\t\t}\n\
\n\
\t\t//\n\
\n\
\t\tvar xhr = new XMLHttpRequest();\n\
\n\
\t\txhr.addEventListener( 'load', function ( event ) {\n\
\n\
\t\t\tif ( event.target.responseText ) {\n\
\n\
\t\t\t\tgeometry = scope.parse( JSON.parse( event.target.responseText ), monitor );\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tscope.dispatchEvent( { type: 'error', message: 'Invalid file [' + url + ']' } );\n\
\n\
\t\t\t}\n\
\n\
\t\t}, false );\n\
\n\
\t\txhr.addEventListener( 'error', function () {\n\
\n\
\t\t\tscope.dispatchEvent( { type: 'error', message: 'Couldn\\'t load URL [' + url + ']' } );\n\
\n\
\t\t}, false );\n\
\n\
\t\txhr.open( 'GET', url, true );\n\
\t\txhr.send( null );\n\
\n\
\t\t//\n\
\n\
\t\tvar monitor = new THREE.LoadingMonitor();\n\
\n\
\t\tmonitor.addEventListener( 'load', function ( event ) {\n\
\n\
\t\t\tscope.dispatchEvent( { type: 'load', content: geometry } );\n\
\n\
\t\t} );\n\
\n\
\t\tmonitor.add( xhr );\n\
\n\
\t},\n\
\n\
\tparse: function ( data, monitor ) {\n\
\n\
\t\tvar scope = this;\n\
\t\tvar geometry = new THREE.Geometry();\n\
\n\
\t\tvar scale = ( data.scale !== undefined ) ? 1 / data.scale : 1;\n\
\n\
\t\t// materials\n\
\n\
\t\tif ( data.materials ) {\n\
\n\
\t\t\tgeometry.materials = [];\n\
\n\
\t\t\tfor ( var i = 0; i < data.materials.length; ++ i ) {\n\
\n\
\t\t\t\tvar m = data.materials[ i ];\n\
\n\
\t\t\t\tfunction isPow2( n ) {\n\
\n\
\t\t\t\t\tvar l = Math.log( n ) / Math.LN2;\n\
\t\t\t\t\treturn Math.floor( l ) == l;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tfunction nearestPow2( n ) {\n\
\n\
\t\t\t\t\tvar l = Math.log( n ) / Math.LN2;\n\
\t\t\t\t\treturn Math.pow( 2, Math.round(  l ) );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tfunction createTexture( where, name, sourceFile, repeat, offset, wrap ) {\n\
\n\
\t\t\t\t\twhere[ name ] = new THREE.Texture();\n\
\t\t\t\t\twhere[ name ].sourceFile = sourceFile;\n\
\n\
\t\t\t\t\tif ( repeat ) {\n\
\n\
\t\t\t\t\t\twhere[ name ].repeat.set( repeat[ 0 ], repeat[ 1 ] );\n\
\n\
\t\t\t\t\t\tif ( repeat[ 0 ] !== 1 ) where[ name ].wrapS = THREE.RepeatWrapping;\n\
\t\t\t\t\t\tif ( repeat[ 1 ] !== 1 ) where[ name ].wrapT = THREE.RepeatWrapping;\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\tif ( offset ) {\n\
\n\
\t\t\t\t\t\twhere[ name ].offset.set( offset[ 0 ], offset[ 1 ] );\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\tif ( wrap ) {\n\
\n\
\t\t\t\t\t\tvar wrapMap = {\n\
\n\
\t\t\t\t\t\t\t\"repeat\": THREE.RepeatWrapping,\n\
\t\t\t\t\t\t\t\"mirror\": THREE.MirroredRepeatWrapping\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\tif ( wrapMap[ wrap[ 0 ] ] !== undefined ) where[ name ].wrapS = wrapMap[ wrap[ 0 ] ];\n\
\t\t\t\t\t\tif ( wrapMap[ wrap[ 1 ] ] !== undefined ) where[ name ].wrapT = wrapMap[ wrap[ 1 ] ];\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\t// load image\n\
\n\
\t\t\t\t\tvar texture = where[ name ];\n\
\n\
\t\t\t\t\tvar loader = new THREE.ImageLoader();\n\
\t\t\t\t\tloader.addEventListener( 'load', function ( event ) {\n\
\n\
\t\t\t\t\t\tvar image = event.content;\n\
\n\
\t\t\t\t\t\tif ( !isPow2( image.width ) || !isPow2( image.height ) ) {\n\
\n\
\t\t\t\t\t\t\tvar width = nearestPow2( image.width );\n\
\t\t\t\t\t\t\tvar height = nearestPow2( image.height );\n\
\n\
\t\t\t\t\t\t\ttexture.image = document.createElement( 'canvas' );\n\
\t\t\t\t\t\t\ttexture.image.width = width;\n\
\t\t\t\t\t\t\ttexture.image.height = height;\n\
\t\t\t\t\t\t\ttexture.image.getContext( '2d' ).drawImage( image, 0, 0, width, height );\n\
\n\
\t\t\t\t\t\t} else {\n\
\n\
\t\t\t\t\t\t\ttexture.image = image;\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\ttexture.needsUpdate = true;\n\
\n\
\t\t\t\t\t} );\n\
\t\t\t\t\tloader.crossOrigin = scope.crossOrigin;\n\
\t\t\t\t\tloader.load( scope.path + '/' + sourceFile );\n\
\n\
\t\t\t\t\tif ( monitor ) monitor.add( loader );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tfunction rgb2hex( rgb ) {\n\
\n\
\t\t\t\t\treturn ( rgb[ 0 ] * 255 << 16 ) + ( rgb[ 1 ] * 255 << 8 ) + rgb[ 2 ] * 255;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\t// defaults\n\
\n\
\t\t\t\tvar mtype = \"MeshLambertMaterial\";\n\
\t\t\t\tvar mpars = { color: 0xeeeeee, opacity: 1.0, map: null, lightMap: null, normalMap: null, bumpMap: null, wireframe: false };\n\
\n\
\t\t\t\t// parameters from model file\n\
\n\
\t\t\t\tif ( m.shading ) {\n\
\n\
\t\t\t\t\tvar shading = m.shading.toLowerCase();\n\
\n\
\t\t\t\t\tif ( shading === \"phong\" ) mtype = \"MeshPhongMaterial\";\n\
\t\t\t\t\telse if ( shading === \"basic\" ) mtype = \"MeshBasicMaterial\";\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tif ( m.blending !== undefined && THREE[ m.blending ] !== undefined ) {\n\
\n\
\t\t\t\t\tmpars.blending = THREE[ m.blending ];\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tif ( m.transparent !== undefined || m.opacity < 1.0 ) {\n\
\n\
\t\t\t\t\tmpars.transparent = m.transparent;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tif ( m.depthTest !== undefined ) {\n\
\n\
\t\t\t\t\tmpars.depthTest = m.depthTest;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tif ( m.depthWrite !== undefined ) {\n\
\n\
\t\t\t\t\tmpars.depthWrite = m.depthWrite;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tif ( m.vertexColors !== undefined ) {\n\
\n\
\t\t\t\t\tif ( m.vertexColors == \"face\" ) {\n\
\n\
\t\t\t\t\t\tmpars.vertexColors = THREE.FaceColors;\n\
\n\
\t\t\t\t\t} else if ( m.vertexColors ) {\n\
\n\
\t\t\t\t\t\tmpars.vertexColors = THREE.VertexColors;\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\t// colors\n\
\n\
\t\t\t\tif ( m.colorDiffuse ) {\n\
\n\
\t\t\t\t\tmpars.color = rgb2hex( m.colorDiffuse );\n\
\n\
\t\t\t\t} else if ( m.DbgColor ) {\n\
\n\
\t\t\t\t\tmpars.color = m.DbgColor;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tif ( m.colorSpecular ) {\n\
\n\
\t\t\t\t\tmpars.specular = rgb2hex( m.colorSpecular );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tif ( m.colorAmbient ) {\n\
\n\
\t\t\t\t\tmpars.ambient = rgb2hex( m.colorAmbient );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\t// modifiers\n\
\n\
\t\t\t\tif ( m.transparency ) {\n\
\n\
\t\t\t\t\tmpars.opacity = m.transparency;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tif ( m.specularCoef ) {\n\
\n\
\t\t\t\t\tmpars.shininess = m.specularCoef;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tif ( m.visible !== undefined ) {\n\
\n\
\t\t\t\t\tmpars.visible = m.visible;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tif ( m.flipSided !== undefined ) {\n\
\n\
\t\t\t\t\tmpars.side = THREE.BackSide;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tif ( m.doubleSided !== undefined ) {\n\
\n\
\t\t\t\t\tmpars.side = THREE.DoubleSide;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tif ( m.wireframe !== undefined ) {\n\
\n\
\t\t\t\t\tmpars.wireframe = m.wireframe;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\t// textures\n\
\n\
\t\t\t\tif ( m.mapDiffuse ) {\n\
\n\
\t\t\t\t\tcreateTexture( mpars, \"map\", m.mapDiffuse, m.mapDiffuseRepeat, m.mapDiffuseOffset, m.mapDiffuseWrap );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tif ( m.mapLight ) {\n\
\n\
\t\t\t\t\tcreateTexture( mpars, \"lightMap\", m.mapLight, m.mapLightRepeat, m.mapLightOffset, m.mapLightWrap );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tif ( m.mapBump ) {\n\
\n\
\t\t\t\t\tcreateTexture( mpars, \"bumpMap\", m.mapBump, m.mapBumpRepeat, m.mapBumpOffset, m.mapBumpWrap );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tif ( m.mapNormal ) {\n\
\n\
\t\t\t\t\tcreateTexture( mpars, \"normalMap\", m.mapNormal, m.mapNormalRepeat, m.mapNormalOffset, m.mapNormalWrap );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tif ( m.mapSpecular ) {\n\
\n\
\t\t\t\t\tcreateTexture( mpars, \"specularMap\", m.mapSpecular, m.mapSpecularRepeat, m.mapSpecularOffset, m.mapSpecularWrap );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\t// special case for normal mapped material\n\
\n\
\t\t\t\tif ( m.mapNormal ) {\n\
\n\
\t\t\t\t\tvar shader = THREE.ShaderUtils.lib[ \"normal\" ];\n\
\t\t\t\t\tvar uniforms = THREE.UniformsUtils.clone( shader.uniforms );\n\
\n\
\t\t\t\t\tuniforms[ \"tNormal\" ].value = mpars.normalMap;\n\
\n\
\t\t\t\t\tif ( m.mapNormalFactor ) {\n\
\n\
\t\t\t\t\t\tuniforms[ \"uNormalScale\" ].value.set( m.mapNormalFactor, m.mapNormalFactor );\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\tif ( mpars.map ) {\n\
\n\
\t\t\t\t\t\tuniforms[ \"tDiffuse\" ].value = mpars.map;\n\
\t\t\t\t\t\tuniforms[ \"enableDiffuse\" ].value = true;\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\tif ( mpars.specularMap ) {\n\
\n\
\t\t\t\t\t\tuniforms[ \"tSpecular\" ].value = mpars.specularMap;\n\
\t\t\t\t\t\tuniforms[ \"enableSpecular\" ].value = true;\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\tif ( mpars.lightMap ) {\n\
\n\
\t\t\t\t\t\tuniforms[ \"tAO\" ].value = mpars.lightMap;\n\
\t\t\t\t\t\tuniforms[ \"enableAO\" ].value = true;\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\t// for the moment don't handle displacement texture\n\
\n\
\t\t\t\t\tuniforms[ \"uDiffuseColor\" ].value.setHex( mpars.color );\n\
\t\t\t\t\tuniforms[ \"uSpecularColor\" ].value.setHex( mpars.specular );\n\
\t\t\t\t\tuniforms[ \"uAmbientColor\" ].value.setHex( mpars.ambient );\n\
\n\
\t\t\t\t\tuniforms[ \"uShininess\" ].value = mpars.shininess;\n\
\n\
\t\t\t\t\tif ( mpars.opacity !== undefined ) {\n\
\n\
\t\t\t\t\t\tuniforms[ \"uOpacity\" ].value = mpars.opacity;\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\tvar parameters = { fragmentShader: shader.fragmentShader, vertexShader: shader.vertexShader, uniforms: uniforms, lights: true, fog: true };\n\
\t\t\t\t\tvar material = new THREE.ShaderMaterial( parameters );\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\tvar material = new THREE[ mtype ]( mpars );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tif ( m.DbgName !== undefined ) material.name = m.DbgName;\n\
\n\
\t\t\t\tgeometry.materials[ i ] = material;\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\t// geometry\n\
\n\
\t\tfunction isBitSet( value, position ) {\n\
\n\
\t\t\treturn value & ( 1 << position );\n\
\n\
\t\t}\n\
\n\
\t\tvar faces = data.faces;\n\
\t\tvar vertices = data.vertices;\n\
\t\tvar normals = data.normals;\n\
\t\tvar colors = data.colors;\n\
\t\tvar nUvLayers = 0;\n\
\n\
\t\t// disregard empty arrays\n\
\n\
\t\tif ( data.uvs ) {\n\
\n\
\t\t\tfor ( var i = 0; i < data.uvs.length; i ++ ) {\n\
\n\
\t\t\t\tif ( data.uvs[ i ].length ) nUvLayers ++;\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tfor ( var i = 0; i < nUvLayers; i ++ ) {\n\
\n\
\t\t\tgeometry.faceUvs[ i ] = [];\n\
\t\t\tgeometry.faceVertexUvs[ i ] = [];\n\
\n\
\t\t}\n\
\n\
\t\tvar offset = 0;\n\
\t\tvar zLength = vertices.length;\n\
\n\
\t\twhile ( offset < zLength ) {\n\
\n\
\t\t\tvar vertex = new THREE.Vector3();\n\
\n\
\t\t\tvertex.x = vertices[ offset ++ ] * scale;\n\
\t\t\tvertex.y = vertices[ offset ++ ] * scale;\n\
\t\t\tvertex.z = vertices[ offset ++ ] * scale;\n\
\n\
\t\t\tgeometry.vertices.push( vertex );\n\
\n\
\t\t}\n\
\n\
\t\toffset = 0;\n\
\t\tzLength = faces.length;\n\
\n\
\t\twhile ( offset < zLength ) {\n\
\n\
\t\t\tvar type = faces[ offset ++ ];\n\
\n\
\t\t\tvar isQuad = isBitSet( type, 0 );\n\
\n\
\t\t\tvar hasMaterial = isBitSet( type, 1 );\n\
\t\t\tvar hasFaceUv = isBitSet( type, 2 );\n\
\t\t\tvar hasFaceVertexUv = isBitSet( type, 3 );\n\
\t\t\tvar hasFaceNormal = isBitSet( type, 4 );\n\
\t\t\tvar hasFaceVertexNormal = isBitSet( type, 5 );\n\
\t\t\tvar hasFaceColor = isBitSet( type, 6 );\n\
\t\t\tvar hasFaceVertexColor = isBitSet( type, 7 );\n\
\n\
\t\t\t// console.log(\"type\", type, \"bits\", isQuad, hasMaterial, hasFaceUv, hasFaceVertexUv, hasFaceNormal, hasFaceVertexNormal, hasFaceColor, hasFaceVertexColor);\n\
\n\
\t\t\tif ( isQuad ) {\n\
\n\
\t\t\t\tvar face = new THREE.Face4();\n\
\n\
\t\t\t\tface.a = faces[ offset ++ ];\n\
\t\t\t\tface.b = faces[ offset ++ ];\n\
\t\t\t\tface.c = faces[ offset ++ ];\n\
\t\t\t\tface.d = faces[ offset ++ ];\n\
\n\
\t\t\t\tvar nVertices = 4;\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tvar face = new THREE.Face3();\n\
\n\
\t\t\t\tface.a = faces[ offset ++ ];\n\
\t\t\t\tface.b = faces[ offset ++ ];\n\
\t\t\t\tface.c = faces[ offset ++ ];\n\
\n\
\t\t\t\tvar nVertices = 3;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( hasMaterial ) {\n\
\n\
\t\t\t\tvar materialIndex = faces[ offset ++ ];\n\
\t\t\t\tface.materialIndex = materialIndex;\n\
\n\
\t\t\t}\n\
\n\
\t\t\t// to get face <=> uv index correspondence\n\
\n\
\t\t\tvar fi = geometry.faces.length;\n\
\n\
\t\t\tif ( hasFaceUv ) {\n\
\n\
\t\t\t\tfor ( var i = 0; i < nUvLayers; i ++ ) {\n\
\n\
\t\t\t\t\tvar uvLayer = data.uvs[ i ];\n\
\n\
\t\t\t\t\tvar uvIndex = faces[ offset ++ ];\n\
\n\
\t\t\t\t\tvar u = uvLayer[ uvIndex * 2 ];\n\
\t\t\t\t\tvar v = uvLayer[ uvIndex * 2 + 1 ];\n\
\n\
\t\t\t\t\tgeometry.faceUvs[ i ][ fi ] = new THREE.UV( u, v );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( hasFaceVertexUv ) {\n\
\n\
\t\t\t\tfor ( var i = 0; i < nUvLayers; i ++ ) {\n\
\n\
\t\t\t\t\tvar uvLayer = data.uvs[ i ];\n\
\n\
\t\t\t\t\tvar uvs = [];\n\
\n\
\t\t\t\t\tfor ( var j = 0; j < nVertices; j ++ ) {\n\
\n\
\t\t\t\t\t\tvar uvIndex = faces[ offset ++ ];\n\
\n\
\t\t\t\t\t\tvar u = uvLayer[ uvIndex * 2 ];\n\
\t\t\t\t\t\tvar v = uvLayer[ uvIndex * 2 + 1 ];\n\
\n\
\t\t\t\t\t\tuvs[ j ] = new THREE.UV( u, v );\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\tgeometry.faceVertexUvs[ i ][ fi ] = uvs;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( hasFaceNormal ) {\n\
\n\
\t\t\t\tvar normalIndex = faces[ offset ++ ] * 3;\n\
\n\
\t\t\t\tvar normal = new THREE.Vector3();\n\
\n\
\t\t\t\tnormal.x = normals[ normalIndex ++ ];\n\
\t\t\t\tnormal.y = normals[ normalIndex ++ ];\n\
\t\t\t\tnormal.z = normals[ normalIndex ];\n\
\n\
\t\t\t\tface.normal = normal;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( hasFaceVertexNormal ) {\n\
\n\
\t\t\t\tfor ( i = 0; i < nVertices; i ++ ) {\n\
\n\
\t\t\t\t\tvar normalIndex = faces[ offset ++ ] * 3;\n\
\n\
\t\t\t\t\tvar normal = new THREE.Vector3();\n\
\n\
\t\t\t\t\tnormal.x = normals[ normalIndex ++ ];\n\
\t\t\t\t\tnormal.y = normals[ normalIndex ++ ];\n\
\t\t\t\t\tnormal.z = normals[ normalIndex ];\n\
\n\
\t\t\t\t\tface.vertexNormals.push( normal );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\n\
\t\t\tif ( hasFaceColor ) {\n\
\n\
\t\t\t\tvar colorIndex = faces[ offset ++ ];\n\
\n\
\t\t\t\tface.color = new THREE.Color( colors[ colorIndex ] );\n\
\n\
\t\t\t}\n\
\n\
\n\
\t\t\tif ( hasFaceVertexColor ) {\n\
\n\
\t\t\t\tfor ( var i = 0; i < nVertices; i ++ ) {\n\
\n\
\t\t\t\t\tvar colorIndex = faces[ offset ++ ];\n\
\n\
\t\t\t\t\tface.vertexColors.push( new THREE.Color( colors[ colorIndex ] ) );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t\tgeometry.faces.push( face );\n\
\n\
\t\t}\n\
\n\
\n\
\t\t// skin\n\
\n\
\t\tif ( data.skinWeights ) {\n\
\n\
\t\t\tfor ( var i = 0, l = data.skinWeights.length; i < l; i += 2 ) {\n\
\n\
\t\t\t\tvar x = data.skinWeights[ i ];\n\
\t\t\t\tvar y = data.skinWeights[ i + 1 ];\n\
\t\t\t\tvar z = 0;\n\
\t\t\t\tvar w = 0;\n\
\n\
\t\t\t\tgeometry.skinWeights.push( new THREE.Vector4( x, y, z, w ) );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tif ( data.skinIndices ) {\n\
\n\
\t\t\tfor ( var i = 0, l = data.skinIndices.length; i < l; i += 2 ) {\n\
\n\
\t\t\t\tvar a = data.skinIndices[ i ];\n\
\t\t\t\tvar b = data.skinIndices[ i + 1 ];\n\
\t\t\t\tvar c = 0;\n\
\t\t\t\tvar d = 0;\n\
\n\
\t\t\t\tgeometry.skinIndices.push( new THREE.Vector4( a, b, c, d ) );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tgeometry.bones = data.bones;\n\
\t\tgeometry.animation = data.animation;\n\
\n\
\n\
\t\t// morphing\n\
\n\
\t\tif ( data.morphTargets ) {\n\
\n\
\t\t\tfor ( var i = 0, l = data.morphTargets.length; i < l; i ++ ) {\n\
\n\
\t\t\t\tgeometry.morphTargets[ i ] = {};\n\
\t\t\t\tgeometry.morphTargets[ i ].name = data.morphTargets[ i ].name;\n\
\t\t\t\tgeometry.morphTargets[ i ].vertices = [];\n\
\n\
\t\t\t\tvar dstVertices = geometry.morphTargets[ i ].vertices;\n\
\t\t\t\tvar srcVertices = data.morphTargets [ i ].vertices;\n\
\n\
\t\t\t\tfor( var v = 0, vl = srcVertices.length; v < vl; v += 3 ) {\n\
\n\
\t\t\t\t\tvar vertex = new THREE.Vector3();\n\
\t\t\t\t\tvertex.x = srcVertices[ v ] * scale;\n\
\t\t\t\t\tvertex.y = srcVertices[ v + 1 ] * scale;\n\
\t\t\t\t\tvertex.z = srcVertices[ v + 2 ] * scale;\n\
\n\
\t\t\t\t\tdstVertices.push( vertex );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tif ( data.morphColors ) {\n\
\n\
\t\t\tfor ( var i = 0, l = data.morphColors.length; i < l; i++ ) {\n\
\n\
\t\t\t\tgeometry.morphColors[ i ] = {};\n\
\t\t\t\tgeometry.morphColors[ i ].name = data.morphColors[ i ].name;\n\
\t\t\t\tgeometry.morphColors[ i ].colors = [];\n\
\n\
\t\t\t\tvar dstColors = geometry.morphColors[ i ].colors;\n\
\t\t\t\tvar srcColors = data.morphColors [ i ].colors;\n\
\n\
\t\t\t\tfor ( var c = 0, cl = srcColors.length; c < cl; c += 3 ) {\n\
\n\
\t\t\t\t\tvar color = new THREE.Color( 0xffaa00 );\n\
\t\t\t\t\tcolor.setRGB( srcColors[ c ], srcColors[ c + 1 ], srcColors[ c + 2 ] );\n\
\n\
\t\t\t\t\tdstColors.push( color );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tgeometry.computeCentroids();\n\
\t\tgeometry.computeFaceNormals();\n\
\n\
\t\treturn geometry;\n\
\n\
\t}\n\
\n\
};\n\
/**\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.SceneLoader = function () {\n\
\n\
\tthis.onLoadStart = function () {};\n\
\tthis.onLoadProgress = function() {};\n\
\tthis.onLoadComplete = function () {};\n\
\n\
\tthis.callbackSync = function () {};\n\
\tthis.callbackProgress = function () {};\n\
\n\
\tthis.geometryHandlerMap = {};\n\
\n\
\tthis.addGeometryHandler( \"ascii\", THREE.JSONLoader );\n\
\tthis.addGeometryHandler( \"binary\", THREE.BinaryLoader );\n\
\n\
};\n\
\n\
THREE.SceneLoader.prototype.constructor = THREE.SceneLoader;\n\
\n\
THREE.SceneLoader.prototype.load = function ( url, callbackFinished ) {\n\
\n\
\tvar scope = this;\n\
\n\
\tvar xhr = new XMLHttpRequest();\n\
\n\
\txhr.onreadystatechange = function () {\n\
\n\
\t\tif ( xhr.readyState === 4 ) {\n\
\n\
\t\t\tif ( xhr.status === 200 || xhr.status === 0 ) {\n\
\n\
\t\t\t\tvar json = JSON.parse( xhr.responseText );\n\
\t\t\t\tscope.parse( json, callbackFinished, url );\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tconsole.error( \"THREE.SceneLoader: Couldn't load [\" + url + \"] [\" + xhr.status + \"]\" );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\txhr.open( \"GET\", url, true );\n\
\txhr.send( null );\n\
\n\
};\n\
\n\
THREE.SceneLoader.prototype.addGeometryHandler = function ( typeID, loaderClass ) {\n\
\n\
\tthis.geometryHandlerMap[ typeID ] = { \"loaderClass\": loaderClass };\n\
\n\
};\n\
\n\
THREE.SceneLoader.prototype.parse = function ( json, callbackFinished, url ) {\n\
\n\
\tvar scope = this;\n\
\n\
\tvar urlBase = THREE.Loader.prototype.extractUrlBase( url );\n\
\n\
\tvar dg, dm, dl, dc, df, dt,\n\
\t\tg, m, l, d, p, r, q, s, c, t, f, tt, pp, u,\n\
\t\tgeometry, material, camera, fog,\n\
\t\ttexture, images,\n\
\t\tlight,\n\
\t\tcounter_models, counter_textures,\n\
\t\ttotal_models, total_textures,\n\
\t\tresult;\n\
\n\
\tvar data = json;\n\
\n\
\t// async geometry loaders\n\
\n\
\tfor ( var typeID in this.geometryHandlerMap ) {\n\
\n\
\t\tvar loaderClass = this.geometryHandlerMap[ typeID ][ \"loaderClass\" ];\n\
\t\tthis.geometryHandlerMap[ typeID ][ \"loaderObject\" ] = new loaderClass();\n\
\n\
\t}\n\
\n\
\tcounter_models = 0;\n\
\tcounter_textures = 0;\n\
\n\
\tresult = {\n\
\n\
\t\tscene: new THREE.Scene(),\n\
\t\tgeometries: {},\n\
\t\tmaterials: {},\n\
\t\ttextures: {},\n\
\t\tobjects: {},\n\
\t\tcameras: {},\n\
\t\tlights: {},\n\
\t\tfogs: {},\n\
\t\tempties: {}\n\
\n\
\t};\n\
\n\
\tif ( data.transform ) {\n\
\n\
\t\tvar position = data.transform.position,\n\
\t\t\trotation = data.transform.rotation,\n\
\t\t\tscale = data.transform.scale;\n\
\n\
\t\tif ( position )\n\
\t\t\tresult.scene.position.set( position[ 0 ], position[ 1 ], position [ 2 ] );\n\
\n\
\t\tif ( rotation )\n\
\t\t\tresult.scene.rotation.set( rotation[ 0 ], rotation[ 1 ], rotation [ 2 ] );\n\
\n\
\t\tif ( scale )\n\
\t\t\tresult.scene.scale.set( scale[ 0 ], scale[ 1 ], scale [ 2 ] );\n\
\n\
\t\tif ( position || rotation || scale ) {\n\
\n\
\t\t\tresult.scene.updateMatrix();\n\
\t\t\tresult.scene.updateMatrixWorld();\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\tfunction get_url( source_url, url_type ) {\n\
\n\
\t\tif ( url_type == \"relativeToHTML\" ) {\n\
\n\
\t\t\treturn source_url;\n\
\n\
\t\t} else {\n\
\n\
\t\t\treturn urlBase + \"/\" + source_url;\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\t// toplevel loader function, delegates to handle_children\n\
\n\
\tfunction handle_objects() {\n\
\n\
\t\thandle_children( result.scene, data.objects );\n\
\n\
\t}\n\
\n\
\t// handle all the children from the loaded json and attach them to given parent\n\
\n\
\tfunction handle_children( parent, children ) {\n\
\n\
\t\tfor ( var dd in children ) {\n\
\n\
\t\t\t// check by id if child has already been handled,\n\
\t\t\t// if not, create new object\n\
\n\
\t\t\tif ( result.objects[ dd ] === undefined ) {\n\
\n\
\t\t\t\tvar o = children[ dd ];\n\
\n\
\t\t\t\tvar object = null;\n\
\n\
\t\t\t\tif ( o.geometry !== undefined ) {\n\
\n\
\t\t\t\t\tgeometry = result.geometries[ o.geometry ];\n\
\n\
\t\t\t\t\t// geometry already loaded\n\
\n\
\t\t\t\t\tif ( geometry ) {\n\
\n\
\t\t\t\t\t\tvar hasNormals = false;\n\
\n\
\t\t\t\t\t\t// not anymore support for multiple materials\n\
\t\t\t\t\t\t// shouldn't really be array\n\
\n\
\t\t\t\t\t\tmaterial = result.materials[ o.materials[ 0 ] ];\n\
\t\t\t\t\t\thasNormals = material instanceof THREE.ShaderMaterial;\n\
\n\
\t\t\t\t\t\tif ( hasNormals ) {\n\
\n\
\t\t\t\t\t\t\tgeometry.computeTangents();\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\tp = o.position;\n\
\t\t\t\t\t\tr = o.rotation;\n\
\t\t\t\t\t\tq = o.quaternion;\n\
\t\t\t\t\t\ts = o.scale;\n\
\t\t\t\t\t\tm = o.matrix;\n\
\n\
\t\t\t\t\t\t// turn off quaternions, for the moment\n\
\n\
\t\t\t\t\t\tq = 0;\n\
\n\
\t\t\t\t\t\tif ( o.materials.length === 0 ) {\n\
\n\
\t\t\t\t\t\t\tmaterial = new THREE.MeshFaceMaterial();\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\t// dirty hack to handle meshes with multiple materials\n\
\t\t\t\t\t\t// just use face materials defined in model\n\
\n\
\t\t\t\t\t\tif ( o.materials.length > 1 ) {\n\
\n\
\t\t\t\t\t\t\tmaterial = new THREE.MeshFaceMaterial();\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\tif ( o.morph ) {\n\
\n\
\t\t\t\t\t\t\tobject = new THREE.MorphAnimMesh( geometry, material );\n\
\n\
\t\t\t\t\t\t\tif ( o.duration !== undefined ) {\n\
\n\
\t\t\t\t\t\t\t\tobject.duration = o.duration;\n\
\n\
\t\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\t\tif ( o.time !== undefined ) {\n\
\n\
\t\t\t\t\t\t\t\tobject.time = o.time;\n\
\n\
\t\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\t\tif ( o.mirroredLoop !== undefined ) {\n\
\n\
\t\t\t\t\t\t\t\tobject.mirroredLoop = o.mirroredLoop;\n\
\n\
\t\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\t\tif ( material.morphNormals ) {\n\
\n\
\t\t\t\t\t\t\t\tgeometry.computeMorphNormals();\n\
\n\
\t\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\t} else {\n\
\n\
\t\t\t\t\t\t\tobject = new THREE.Mesh( geometry, material );\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\tobject.name = dd;\n\
\n\
\t\t\t\t\t\tif ( m ) {\n\
\n\
\t\t\t\t\t\t\tobject.matrixAutoUpdate = false;\n\
\t\t\t\t\t\t\tobject.matrix.set(\n\
\t\t\t\t\t\t\t\tm[0], m[1], m[2], m[3],\n\
\t\t\t\t\t\t\t\tm[4], m[5], m[6], m[7],\n\
\t\t\t\t\t\t\t\tm[8], m[9], m[10], m[11],\n\
\t\t\t\t\t\t\t\tm[12], m[13], m[14], m[15]\n\
\t\t\t\t\t\t\t);\n\
\n\
\t\t\t\t\t\t} else {\n\
\n\
\t\t\t\t\t\t\tobject.position.set( p[0], p[1], p[2] );\n\
\n\
\t\t\t\t\t\t\tif ( q ) {\n\
\n\
\t\t\t\t\t\t\t\tobject.quaternion.set( q[0], q[1], q[2], q[3] );\n\
\t\t\t\t\t\t\t\tobject.useQuaternion = true;\n\
\n\
\t\t\t\t\t\t\t} else {\n\
\n\
\t\t\t\t\t\t\t\tobject.rotation.set( r[0], r[1], r[2] );\n\
\n\
\t\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\t\tobject.scale.set( s[0], s[1], s[2] );\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\tobject.visible = o.visible;\n\
\t\t\t\t\t\tobject.castShadow = o.castShadow;\n\
\t\t\t\t\t\tobject.receiveShadow = o.receiveShadow;\n\
\n\
\t\t\t\t\t\tparent.add( object );\n\
\n\
\t\t\t\t\t\tresult.objects[ dd ] = object;\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t// pure Object3D\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\tp = o.position;\n\
\t\t\t\t\tr = o.rotation;\n\
\t\t\t\t\tq = o.quaternion;\n\
\t\t\t\t\ts = o.scale;\n\
\n\
\t\t\t\t\t// turn off quaternions, for the moment\n\
\n\
\t\t\t\t\tq = 0;\n\
\n\
\t\t\t\t\tobject = new THREE.Object3D();\n\
\t\t\t\t\tobject.name = dd;\n\
\t\t\t\t\tobject.position.set( p[0], p[1], p[2] );\n\
\n\
\t\t\t\t\tif ( q ) {\n\
\n\
\t\t\t\t\t\tobject.quaternion.set( q[0], q[1], q[2], q[3] );\n\
\t\t\t\t\t\tobject.useQuaternion = true;\n\
\n\
\t\t\t\t\t} else {\n\
\n\
\t\t\t\t\t\tobject.rotation.set( r[0], r[1], r[2] );\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\tobject.scale.set( s[0], s[1], s[2] );\n\
\t\t\t\t\tobject.visible = ( o.visible !== undefined ) ? o.visible : false;\n\
\n\
\t\t\t\t\tparent.add( object );\n\
\n\
\t\t\t\t\tresult.objects[ dd ] = object;\n\
\t\t\t\t\tresult.empties[ dd ] = object;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tif ( object ) {\n\
\n\
\t\t\t\t\tif ( o.properties !== undefined )  {\n\
\n\
\t\t\t\t\t\tfor ( var key in o.properties ) {\n\
\n\
\t\t\t\t\t\t\tvar value = o.properties[ key ];\n\
\t\t\t\t\t\t\tobject.properties[ key ] = value;\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\tif ( o.children !== undefined ) {\n\
\n\
\t\t\t\t\t\thandle_children( object, o.children );\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tfunction handle_mesh( geo, id ) {\n\
\n\
\t\tresult.geometries[ id ] = geo;\n\
\t\thandle_objects();\n\
\n\
\t};\n\
\n\
\tfunction create_callback( id ) {\n\
\n\
\t\treturn function( geo ) {\n\
\n\
\t\t\thandle_mesh( geo, id );\n\
\n\
\t\t\tcounter_models -= 1;\n\
\n\
\t\t\tscope.onLoadComplete();\n\
\n\
\t\t\tasync_callback_gate();\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tfunction create_callback_embed( id ) {\n\
\n\
\t\treturn function( geo ) {\n\
\n\
\t\t\tresult.geometries[ id ] = geo;\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tfunction async_callback_gate() {\n\
\n\
\t\tvar progress = {\n\
\n\
\t\t\ttotalModels : total_models,\n\
\t\t\ttotalTextures : total_textures,\n\
\t\t\tloadedModels : total_models - counter_models,\n\
\t\t\tloadedTextures : total_textures - counter_textures\n\
\n\
\t\t};\n\
\n\
\t\tscope.callbackProgress( progress, result );\n\
\n\
\t\tscope.onLoadProgress();\n\
\n\
\t\tif ( counter_models === 0 && counter_textures === 0 ) {\n\
\n\
\t\t\tcallbackFinished( result );\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tvar callbackTexture = function ( count ) {\n\
\n\
\t\tcounter_textures -= count;\n\
\t\tasync_callback_gate();\n\
\n\
\t\tscope.onLoadComplete();\n\
\n\
\t};\n\
\n\
\t// must use this instead of just directly calling callbackTexture\n\
\t// because of closure in the calling context loop\n\
\n\
\tvar generateTextureCallback = function ( count ) {\n\
\n\
\t\treturn function() {\n\
\n\
\t\t\tcallbackTexture( count );\n\
\n\
\t\t};\n\
\n\
\t};\n\
\n\
\t// first go synchronous elements\n\
\n\
\t// cameras\n\
\n\
\tfor( dc in data.cameras ) {\n\
\n\
\t\tc = data.cameras[ dc ];\n\
\n\
\t\tif ( c.type === \"perspective\" ) {\n\
\n\
\t\t\tcamera = new THREE.PerspectiveCamera( c.fov, c.aspect, c.near, c.far );\n\
\n\
\t\t} else if ( c.type === \"ortho\" ) {\n\
\n\
\t\t\tcamera = new THREE.OrthographicCamera( c.left, c.right, c.top, c.bottom, c.near, c.far );\n\
\n\
\t\t}\n\
\n\
\t\tp = c.position;\n\
\t\tt = c.target;\n\
\t\tu = c.up;\n\
\n\
\t\tcamera.position.set( p[0], p[1], p[2] );\n\
\t\tcamera.target = new THREE.Vector3( t[0], t[1], t[2] );\n\
\t\tif ( u ) camera.up.set( u[0], u[1], u[2] );\n\
\n\
\t\tresult.cameras[ dc ] = camera;\n\
\n\
\t}\n\
\n\
\t// lights\n\
\n\
\tvar hex, intensity;\n\
\n\
\tfor ( dl in data.lights ) {\n\
\n\
\t\tl = data.lights[ dl ];\n\
\n\
\t\thex = ( l.color !== undefined ) ? l.color : 0xffffff;\n\
\t\tintensity = ( l.intensity !== undefined ) ? l.intensity : 1;\n\
\n\
\t\tif ( l.type === \"directional\" ) {\n\
\n\
\t\t\tp = l.direction;\n\
\n\
\t\t\tlight = new THREE.DirectionalLight( hex, intensity );\n\
\t\t\tlight.position.set( p[0], p[1], p[2] );\n\
\t\t\tlight.position.normalize();\n\
\n\
\t\t} else if ( l.type === \"point\" ) {\n\
\n\
\t\t\tp = l.position;\n\
\t\t\td = l.distance;\n\
\n\
\t\t\tlight = new THREE.PointLight( hex, intensity, d );\n\
\t\t\tlight.position.set( p[0], p[1], p[2] );\n\
\n\
\t\t} else if ( l.type === \"ambient\" ) {\n\
\n\
\t\t\tlight = new THREE.AmbientLight( hex );\n\
\n\
\t\t}\n\
\n\
\t\tresult.scene.add( light );\n\
\n\
\t\tresult.lights[ dl ] = light;\n\
\n\
\t}\n\
\n\
\t// fogs\n\
\n\
\tfor( df in data.fogs ) {\n\
\n\
\t\tf = data.fogs[ df ];\n\
\n\
\t\tif ( f.type === \"linear\" ) {\n\
\n\
\t\t\tfog = new THREE.Fog( 0x000000, f.near, f.far );\n\
\n\
\t\t} else if ( f.type === \"exp2\" ) {\n\
\n\
\t\t\tfog = new THREE.FogExp2( 0x000000, f.density );\n\
\n\
\t\t}\n\
\n\
\t\tc = f.color;\n\
\t\tfog.color.setRGB( c[0], c[1], c[2] );\n\
\n\
\t\tresult.fogs[ df ] = fog;\n\
\n\
\t}\n\
\n\
\t// defaults\n\
\n\
\tif ( result.cameras && data.defaults.camera ) {\n\
\n\
\t\tresult.currentCamera = result.cameras[ data.defaults.camera ];\n\
\n\
\t}\n\
\n\
\tif ( result.fogs && data.defaults.fog ) {\n\
\n\
\t\tresult.scene.fog = result.fogs[ data.defaults.fog ];\n\
\n\
\t}\n\
\n\
\tc = data.defaults.bgcolor;\n\
\tresult.bgColor = new THREE.Color();\n\
\tresult.bgColor.setRGB( c[0], c[1], c[2] );\n\
\n\
\tresult.bgColorAlpha = data.defaults.bgalpha;\n\
\n\
\t// now come potentially asynchronous elements\n\
\n\
\t// geometries\n\
\n\
\t// count how many models will be loaded asynchronously\n\
\n\
\tfor( dg in data.geometries ) {\n\
\n\
\t\tg = data.geometries[ dg ];\n\
\n\
\t\tif ( g.type in this.geometryHandlerMap ) {\n\
\n\
\t\t\tcounter_models += 1;\n\
\n\
\t\t\tscope.onLoadStart();\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\ttotal_models = counter_models;\n\
\n\
\tfor ( dg in data.geometries ) {\n\
\n\
\t\tg = data.geometries[ dg ];\n\
\n\
\t\tif ( g.type === \"cube\" ) {\n\
\n\
\t\t\tgeometry = new THREE.CubeGeometry( g.width, g.height, g.depth, g.segmentsWidth, g.segmentsHeight, g.segmentsDepth, null, g.flipped, g.sides );\n\
\t\t\tresult.geometries[ dg ] = geometry;\n\
\n\
\t\t} else if ( g.type === \"plane\" ) {\n\
\n\
\t\t\tgeometry = new THREE.PlaneGeometry( g.width, g.height, g.segmentsWidth, g.segmentsHeight );\n\
\t\t\tresult.geometries[ dg ] = geometry;\n\
\n\
\t\t} else if ( g.type === \"sphere\" ) {\n\
\n\
\t\t\tgeometry = new THREE.SphereGeometry( g.radius, g.segmentsWidth, g.segmentsHeight );\n\
\t\t\tresult.geometries[ dg ] = geometry;\n\
\n\
\t\t} else if ( g.type === \"cylinder\" ) {\n\
\n\
\t\t\tgeometry = new THREE.CylinderGeometry( g.topRad, g.botRad, g.height, g.radSegs, g.heightSegs );\n\
\t\t\tresult.geometries[ dg ] = geometry;\n\
\n\
\t\t} else if ( g.type === \"torus\" ) {\n\
\n\
\t\t\tgeometry = new THREE.TorusGeometry( g.radius, g.tube, g.segmentsR, g.segmentsT );\n\
\t\t\tresult.geometries[ dg ] = geometry;\n\
\n\
\t\t} else if ( g.type === \"icosahedron\" ) {\n\
\n\
\t\t\tgeometry = new THREE.IcosahedronGeometry( g.radius, g.subdivisions );\n\
\t\t\tresult.geometries[ dg ] = geometry;\n\
\n\
\t\t} else if ( g.type in this.geometryHandlerMap ) {\n\
\n\
\t\t\tvar loaderParameters = {};\n\
\t\t\tfor ( var parType in g ) {\n\
\n\
\t\t\t\tif ( parType !== \"type\" && parType !== \"url\" ) {\n\
\n\
\t\t\t\t\tloaderParameters[ parType ] = g[ parType ];\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t\tvar loader = this.geometryHandlerMap[ g.type ][ \"loaderObject\" ];\n\
\t\t\tloader.load( get_url( g.url, data.urlBaseType ), create_callback( dg ), loaderParameters );\n\
\n\
\t\t} else if ( g.type === \"embedded\" ) {\n\
\n\
\t\t\tvar modelJson = data.embeds[ g.id ],\n\
\t\t\t\ttexture_path = \"\";\n\
\n\
\t\t\t// pass metadata along to jsonLoader so it knows the format version\n\
\n\
\t\t\tmodelJson.metadata = data.metadata;\n\
\n\
\t\t\tif ( modelJson ) {\n\
\n\
\t\t\t\tvar jsonLoader = this.geometryHandlerMap[ \"ascii\" ][ \"loaderObject\" ];\n\
\t\t\t\tjsonLoader.createModel( modelJson, create_callback_embed( dg ), texture_path );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\t// textures\n\
\n\
\t// count how many textures will be loaded asynchronously\n\
\n\
\tfor( dt in data.textures ) {\n\
\n\
\t\ttt = data.textures[ dt ];\n\
\n\
\t\tif( tt.url instanceof Array ) {\n\
\n\
\t\t\tcounter_textures += tt.url.length;\n\
\n\
\t\t\tfor( var n = 0; n < tt.url.length; n ++ ) {\n\
\n\
\t\t\t\tscope.onLoadStart();\n\
\n\
\t\t\t}\n\
\n\
\t\t} else {\n\
\n\
\t\t\tcounter_textures += 1;\n\
\n\
\t\t\tscope.onLoadStart();\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\ttotal_textures = counter_textures;\n\
\n\
\tfor ( dt in data.textures ) {\n\
\n\
\t\ttt = data.textures[ dt ];\n\
\n\
\t\tif ( tt.mapping !== undefined && THREE[ tt.mapping ] !== undefined  ) {\n\
\n\
\t\t\ttt.mapping = new THREE[ tt.mapping ]();\n\
\n\
\t\t}\n\
\n\
\t\tif ( tt.url instanceof Array ) {\n\
\n\
\t\t\tvar count = tt.url.length;\n\
\t\t\tvar url_array = [];\n\
\n\
\t\t\tfor( var i = 0; i < count; i ++ ) {\n\
\n\
\t\t\t\turl_array[ i ] = get_url( tt.url[ i ], data.urlBaseType );\n\
\n\
\t\t\t}\n\
\n\
\t\t\tvar isCompressed = url_array[ 0 ].endsWith( \".dds\" );\n\
\n\
\t\t\tif ( isCompressed ) {\n\
\n\
\t\t\t\ttexture = THREE.ImageUtils.loadCompressedTextureCube( url_array, tt.mapping, generateTextureCallback( count ) );\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\ttexture = THREE.ImageUtils.loadTextureCube( url_array, tt.mapping, generateTextureCallback( count ) );\n\
\n\
\t\t\t}\n\
\n\
\t\t} else {\n\
\n\
\t\t\tvar isCompressed = tt.url.toLowerCase().endsWith( \".dds\" );\n\
\t\t\tvar fullUrl = get_url( tt.url, data.urlBaseType );\n\
\t\t\tvar textureCallback = generateTextureCallback( 1 );\n\
\n\
\t\t\tif ( isCompressed ) {\n\
\n\
\t\t\t\ttexture = THREE.ImageUtils.loadCompressedTexture( fullUrl, tt.mapping, textureCallback );\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\ttexture = THREE.ImageUtils.loadTexture( fullUrl, tt.mapping, textureCallback );\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( THREE[ tt.minFilter ] !== undefined )\n\
\t\t\t\ttexture.minFilter = THREE[ tt.minFilter ];\n\
\n\
\t\t\tif ( THREE[ tt.magFilter ] !== undefined )\n\
\t\t\t\ttexture.magFilter = THREE[ tt.magFilter ];\n\
\n\
\t\t\tif ( tt.anisotropy ) texture.anisotropy = tt.anisotropy;\n\
\n\
\t\t\tif ( tt.repeat ) {\n\
\n\
\t\t\t\ttexture.repeat.set( tt.repeat[ 0 ], tt.repeat[ 1 ] );\n\
\n\
\t\t\t\tif ( tt.repeat[ 0 ] !== 1 ) texture.wrapS = THREE.RepeatWrapping;\n\
\t\t\t\tif ( tt.repeat[ 1 ] !== 1 ) texture.wrapT = THREE.RepeatWrapping;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( tt.offset ) {\n\
\n\
\t\t\t\ttexture.offset.set( tt.offset[ 0 ], tt.offset[ 1 ] );\n\
\n\
\t\t\t}\n\
\n\
\t\t\t// handle wrap after repeat so that default repeat can be overriden\n\
\n\
\t\t\tif ( tt.wrap ) {\n\
\n\
\t\t\t\tvar wrapMap = {\n\
\t\t\t\t\"repeat\" \t: THREE.RepeatWrapping,\n\
\t\t\t\t\"mirror\"\t: THREE.MirroredRepeatWrapping\n\
\t\t\t\t}\n\
\n\
\t\t\t\tif ( wrapMap[ tt.wrap[ 0 ] ] !== undefined ) texture.wrapS = wrapMap[ tt.wrap[ 0 ] ];\n\
\t\t\t\tif ( wrapMap[ tt.wrap[ 1 ] ] !== undefined ) texture.wrapT = wrapMap[ tt.wrap[ 1 ] ];\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tresult.textures[ dt ] = texture;\n\
\n\
\t}\n\
\n\
\t// materials\n\
\n\
\tfor ( dm in data.materials ) {\n\
\n\
\t\tm = data.materials[ dm ];\n\
\n\
\t\tfor ( pp in m.parameters ) {\n\
\n\
\t\t\tif ( pp === \"envMap\" || pp === \"map\" || pp === \"lightMap\" || pp === \"bumpMap\" ) {\n\
\n\
\t\t\t\tm.parameters[ pp ] = result.textures[ m.parameters[ pp ] ];\n\
\n\
\t\t\t} else if ( pp === \"shading\" ) {\n\
\n\
\t\t\t\tm.parameters[ pp ] = ( m.parameters[ pp ] === \"flat\" ) ? THREE.FlatShading : THREE.SmoothShading;\n\
\n\
\t\t\t} else if ( pp === \"side\" ) {\n\
\n\
\t\t\t\tif (  m.parameters[ pp ] == \"double\" ) {\n\
\n\
\t\t\t\t\tm.parameters[ pp ] = THREE.DoubleSide;\n\
\n\
\t\t\t\t} else if ( m.parameters[ pp ] == \"back\" ) {\n\
\n\
\t\t\t\t\tm.parameters[ pp ] = THREE.BackSide;\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\tm.parameters[ pp ] = THREE.FrontSide;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t} else if ( pp === \"blending\" ) {\n\
\n\
\t\t\t\tm.parameters[ pp ] = m.parameters[ pp ] in THREE ? THREE[ m.parameters[ pp ] ] : THREE.NormalBlending;\n\
\n\
\t\t\t} else if ( pp === \"combine\" ) {\n\
\n\
\t\t\t\tm.parameters[ pp ] = ( m.parameters[ pp ] == \"MixOperation\" ) ? THREE.MixOperation : THREE.MultiplyOperation;\n\
\n\
\t\t\t} else if ( pp === \"vertexColors\" ) {\n\
\n\
\t\t\t\tif ( m.parameters[ pp ] == \"face\" ) {\n\
\n\
\t\t\t\t\tm.parameters[ pp ] = THREE.FaceColors;\n\
\n\
\t\t\t\t// default to vertex colors if \"vertexColors\" is anything else face colors or 0 / null / false\n\
\n\
\t\t\t\t} else if ( m.parameters[ pp ] )   {\n\
\n\
\t\t\t\t\tm.parameters[ pp ] = THREE.VertexColors;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t} else if ( pp === \"wrapRGB\" ) {\n\
\n\
\t\t\t\tvar v3 = m.parameters[ pp ];\n\
\t\t\t\tm.parameters[ pp ] = new THREE.Vector3( v3[ 0 ], v3[ 1 ], v3[ 2 ] );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tif ( m.parameters.opacity !== undefined && m.parameters.opacity < 1.0 ) {\n\
\n\
\t\t\tm.parameters.transparent = true;\n\
\n\
\t\t}\n\
\n\
\t\tif ( m.parameters.normalMap ) {\n\
\n\
\t\t\tvar shader = THREE.ShaderUtils.lib[ \"normal\" ];\n\
\t\t\tvar uniforms = THREE.UniformsUtils.clone( shader.uniforms );\n\
\n\
\t\t\tvar diffuse = m.parameters.color;\n\
\t\t\tvar specular = m.parameters.specular;\n\
\t\t\tvar ambient = m.parameters.ambient;\n\
\t\t\tvar shininess = m.parameters.shininess;\n\
\n\
\t\t\tuniforms[ \"tNormal\" ].value = result.textures[ m.parameters.normalMap ];\n\
\n\
\t\t\tif ( m.parameters.normalScale ) {\n\
\n\
\t\t\t\tuniforms[ \"uNormalScale\" ].value.set( m.parameters.normalScale[ 0 ], m.parameters.normalScale[ 1 ] );\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( m.parameters.map ) {\n\
\n\
\t\t\t\tuniforms[ \"tDiffuse\" ].value = m.parameters.map;\n\
\t\t\t\tuniforms[ \"enableDiffuse\" ].value = true;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( m.parameters.envMap ) {\n\
\n\
\t\t\t\tuniforms[ \"tCube\" ].value = m.parameters.envMap;\n\
\t\t\t\tuniforms[ \"enableReflection\" ].value = true;\n\
\t\t\t\tuniforms[ \"uReflectivity\" ].value = m.parameters.reflectivity;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( m.parameters.lightMap ) {\n\
\n\
\t\t\t\tuniforms[ \"tAO\" ].value = m.parameters.lightMap;\n\
\t\t\t\tuniforms[ \"enableAO\" ].value = true;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( m.parameters.specularMap ) {\n\
\n\
\t\t\t\tuniforms[ \"tSpecular\" ].value = result.textures[ m.parameters.specularMap ];\n\
\t\t\t\tuniforms[ \"enableSpecular\" ].value = true;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( m.parameters.displacementMap ) {\n\
\n\
\t\t\t\tuniforms[ \"tDisplacement\" ].value = result.textures[ m.parameters.displacementMap ];\n\
\t\t\t\tuniforms[ \"enableDisplacement\" ].value = true;\n\
\n\
\t\t\t\tuniforms[ \"uDisplacementBias\" ].value = m.parameters.displacementBias;\n\
\t\t\t\tuniforms[ \"uDisplacementScale\" ].value = m.parameters.displacementScale;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tuniforms[ \"uDiffuseColor\" ].value.setHex( diffuse );\n\
\t\t\tuniforms[ \"uSpecularColor\" ].value.setHex( specular );\n\
\t\t\tuniforms[ \"uAmbientColor\" ].value.setHex( ambient );\n\
\n\
\t\t\tuniforms[ \"uShininess\" ].value = shininess;\n\
\n\
\t\t\tif ( m.parameters.opacity ) {\n\
\n\
\t\t\t\tuniforms[ \"uOpacity\" ].value = m.parameters.opacity;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tvar parameters = { fragmentShader: shader.fragmentShader, vertexShader: shader.vertexShader, uniforms: uniforms, lights: true, fog: true };\n\
\n\
\t\t\tmaterial = new THREE.ShaderMaterial( parameters );\n\
\n\
\t\t} else {\n\
\n\
\t\t\tmaterial = new THREE[ m.type ]( m.parameters );\n\
\n\
\t\t}\n\
\n\
\t\tresult.materials[ dm ] = material;\n\
\n\
\t}\n\
\n\
\t// objects ( synchronous init of procedural primitives )\n\
\n\
\thandle_objects();\n\
\n\
\t// synchronous callback\n\
\n\
\tscope.callbackSync( result );\n\
\n\
\t// just in case there are no async elements\n\
\n\
\tasync_callback_gate();\n\
\n\
};\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 */\n\
\n\
THREE.TextureLoader = function () {\n\
\n\
\tTHREE.EventTarget.call( this );\n\
\n\
\tthis.crossOrigin = null;\n\
\n\
};\n\
\n\
THREE.TextureLoader.prototype = {\n\
\n\
\tconstructor: THREE.TextureLoader,\n\
\n\
\tload: function ( url ) {\n\
\n\
\t\tvar scope = this;\n\
\n\
\t\tvar image = new Image();\n\
\n\
\t\timage.addEventListener( 'load', function () {\n\
\n\
\t\t\tvar texture = new THREE.Texture( image );\n\
\t\t\ttexture.needsUpdate = true;\n\
\n\
\t\t\tscope.dispatchEvent( { type: 'load', content: texture } );\n\
\n\
\t\t}, false );\n\
\n\
\t\timage.addEventListener( 'error', function () {\n\
\n\
\t\t\tscope.dispatchEvent( { type: 'error', message: 'Couldn\\'t load URL [' + url + ']' } );\n\
\n\
\t\t}, false );\n\
\n\
\t\tif ( scope.crossOrigin ) image.crossOrigin = scope.crossOrigin;\n\
\n\
\t\timage.src = url;\n\
\n\
\t}\n\
\n\
}\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.Material = function () {\n\
\n\
\tthis.id = THREE.MaterialCount ++;\n\
\n\
\tthis.name = '';\n\
\n\
\tthis.side = THREE.FrontSide;\n\
\n\
\tthis.opacity = 1;\n\
\tthis.transparent = false;\n\
\n\
\tthis.blending = THREE.NormalBlending;\n\
\n\
\tthis.blendSrc = THREE.SrcAlphaFactor;\n\
\tthis.blendDst = THREE.OneMinusSrcAlphaFactor;\n\
\tthis.blendEquation = THREE.AddEquation;\n\
\n\
\tthis.depthTest = true;\n\
\tthis.depthWrite = true;\n\
\n\
\tthis.polygonOffset = false;\n\
\tthis.polygonOffsetFactor = 0;\n\
\tthis.polygonOffsetUnits = 0;\n\
\n\
\tthis.alphaTest = 0;\n\
\n\
\tthis.overdraw = false; // Boolean for fixing antialiasing gaps in CanvasRenderer\n\
\n\
\tthis.visible = true;\n\
\n\
\tthis.needsUpdate = true;\n\
\n\
};\n\
\n\
THREE.Material.prototype.setValues = function ( values ) {\n\
\n\
\tif ( values === undefined ) return;\n\
\n\
\tfor ( var key in values ) {\n\
\n\
\t\tvar newValue = values[ key ];\n\
\n\
\t\tif ( newValue === undefined ) {\n\
\n\
\t\t\tconsole.warn( 'THREE.Material: \\'' + key + '\\' parameter is undefined.' );\n\
\t\t\tcontinue;\n\
\n\
\t\t}\n\
\n\
\t\tif ( key in this ) {\n\
\n\
\t\t\tvar currentValue = this[ key ];\n\
\n\
\t\t\tif ( currentValue instanceof THREE.Color && newValue instanceof THREE.Color ) {\n\
\n\
\t\t\t\tcurrentValue.copy( newValue );\n\
\n\
\t\t\t} else if ( currentValue instanceof THREE.Color && typeof( newValue ) === \"number\" ) {\n\
\n\
\t\t\t\tcurrentValue.setHex( newValue );\n\
\n\
\t\t\t} else if ( currentValue instanceof THREE.Vector3 && newValue instanceof THREE.Vector3 ) {\n\
\n\
\t\t\t\tcurrentValue.copy( newValue );\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tthis[ key ] = newValue;\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
};\n\
\n\
THREE.Material.prototype.clone = function ( material ) {\n\
\n\
\tif ( material === undefined ) material = new THREE.Material();\n\
\n\
\tmaterial.name = this.name;\n\
\n\
\tmaterial.side = this.side;\n\
\n\
\tmaterial.opacity = this.opacity;\n\
\tmaterial.transparent = this.transparent;\n\
\n\
\tmaterial.blending = this.blending;\n\
\n\
\tmaterial.blendSrc = this.blendSrc;\n\
\tmaterial.blendDst = this.blendDst;\n\
\tmaterial.blendEquation = this.blendEquation;\n\
\n\
\tmaterial.depthTest = this.depthTest;\n\
\tmaterial.depthWrite = this.depthWrite;\n\
\n\
\tmaterial.polygonOffset = this.polygonOffset;\n\
\tmaterial.polygonOffsetFactor = this.polygonOffsetFactor;\n\
\tmaterial.polygonOffsetUnits = this.polygonOffsetUnits;\n\
\n\
\tmaterial.alphaTest = this.alphaTest;\n\
\n\
\tmaterial.overdraw = this.overdraw;\n\
\n\
\tmaterial.visible = this.visible;\n\
\n\
\treturn material;\n\
\n\
};\n\
\n\
THREE.MaterialCount = 0;\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 * @author alteredq / http://alteredqualia.com/\n\
 *\n\
 * parameters = {\n\
 *  color: <hex>,\n\
 *  opacity: <float>,\n\
 *\n\
 *  blending: THREE.NormalBlending,\n\
 *  depthTest: <bool>,\n\
 *\n\
 *  linewidth: <float>,\n\
 *  linecap: \"round\",\n\
 *  linejoin: \"round\",\n\
 *\n\
 *  vertexColors: <bool>\n\
 *\n\
 *  fog: <bool>\n\
 * }\n\
 */\n\
\n\
THREE.LineBasicMaterial = function ( parameters ) {\n\
\n\
\tTHREE.Material.call( this );\n\
\n\
\tthis.color = new THREE.Color( 0xffffff );\n\
\n\
\tthis.linewidth = 1;\n\
\tthis.linecap = 'round';\n\
\tthis.linejoin = 'round';\n\
\n\
\tthis.vertexColors = false;\n\
\n\
\tthis.fog = true;\n\
\n\
\tthis.setValues( parameters );\n\
\n\
};\n\
\n\
THREE.LineBasicMaterial.prototype = Object.create( THREE.Material.prototype );\n\
\n\
THREE.LineBasicMaterial.prototype.clone = function () {\n\
\n\
\tvar material = new THREE.LineBasicMaterial();\n\
\n\
\tTHREE.Material.prototype.clone.call( this, material );\n\
\n\
\tmaterial.color.copy( this.color );\n\
\n\
\tmaterial.linewidth = this.linewidth;\n\
\tmaterial.linecap = this.linecap;\n\
\tmaterial.linejoin = this.linejoin;\n\
\n\
\tmaterial.vertexColors = this.vertexColors;\n\
\n\
\tmaterial.fog = this.fog;\n\
\n\
\treturn material;\n\
\n\
};\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 * @author alteredq / http://alteredqualia.com/\n\
 *\n\
 * parameters = {\n\
 *  color: <hex>,\n\
 *  opacity: <float>,\n\
 *  map: new THREE.Texture( <Image> ),\n\
 *\n\
 *  lightMap: new THREE.Texture( <Image> ),\n\
 *\n\
 *  specularMap: new THREE.Texture( <Image> ),\n\
 *\n\
 *  envMap: new THREE.TextureCube( [posx, negx, posy, negy, posz, negz] ),\n\
 *  combine: THREE.Multiply,\n\
 *  reflectivity: <float>,\n\
 *  refractionRatio: <float>,\n\
 *\n\
 *  shading: THREE.SmoothShading,\n\
 *  blending: THREE.NormalBlending,\n\
 *  depthTest: <bool>,\n\
 *\n\
 *  wireframe: <boolean>,\n\
 *  wireframeLinewidth: <float>,\n\
 *\n\
 *  vertexColors: THREE.NoColors / THREE.VertexColors / THREE.FaceColors,\n\
 *\n\
 *  skinning: <bool>,\n\
 *  morphTargets: <bool>,\n\
 *\n\
 *  fog: <bool>\n\
 * }\n\
 */\n\
\n\
THREE.MeshBasicMaterial = function ( parameters ) {\n\
\n\
\tTHREE.Material.call( this );\n\
\n\
\tthis.color = new THREE.Color( 0xffffff ); // emissive\n\
\n\
\tthis.map = null;\n\
\n\
\tthis.lightMap = null;\n\
\n\
\tthis.specularMap = null;\n\
\n\
\tthis.envMap = null;\n\
\tthis.combine = THREE.MultiplyOperation;\n\
\tthis.reflectivity = 1;\n\
\tthis.refractionRatio = 0.98;\n\
\n\
\tthis.fog = true;\n\
\n\
\tthis.shading = THREE.SmoothShading;\n\
\n\
\tthis.wireframe = false;\n\
\tthis.wireframeLinewidth = 1;\n\
\tthis.wireframeLinecap = 'round';\n\
\tthis.wireframeLinejoin = 'round';\n\
\n\
\tthis.vertexColors = THREE.NoColors;\n\
\n\
\tthis.skinning = false;\n\
\tthis.morphTargets = false;\n\
\n\
\tthis.setValues( parameters );\n\
\n\
};\n\
\n\
THREE.MeshBasicMaterial.prototype = Object.create( THREE.Material.prototype );\n\
\n\
THREE.MeshBasicMaterial.prototype.clone = function () {\n\
\n\
\tvar material = new THREE.MeshBasicMaterial();\n\
\n\
\tTHREE.Material.prototype.clone.call( this, material );\n\
\n\
\tmaterial.color.copy( this.color );\n\
\n\
\tmaterial.map = this.map;\n\
\n\
\tmaterial.lightMap = this.lightMap;\n\
\n\
\tmaterial.specularMap = this.specularMap;\n\
\n\
\tmaterial.envMap = this.envMap;\n\
\tmaterial.combine = this.combine;\n\
\tmaterial.reflectivity = this.reflectivity;\n\
\tmaterial.refractionRatio = this.refractionRatio;\n\
\n\
\tmaterial.fog = this.fog;\n\
\n\
\tmaterial.shading = this.shading;\n\
\n\
\tmaterial.wireframe = this.wireframe;\n\
\tmaterial.wireframeLinewidth = this.wireframeLinewidth;\n\
\tmaterial.wireframeLinecap = this.wireframeLinecap;\n\
\tmaterial.wireframeLinejoin = this.wireframeLinejoin;\n\
\n\
\tmaterial.vertexColors = this.vertexColors;\n\
\n\
\tmaterial.skinning = this.skinning;\n\
\tmaterial.morphTargets = this.morphTargets;\n\
\n\
\treturn material;\n\
\n\
};\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 * @author alteredq / http://alteredqualia.com/\n\
 *\n\
 * parameters = {\n\
 *  color: <hex>,\n\
 *  ambient: <hex>,\n\
 *  emissive: <hex>,\n\
 *  opacity: <float>,\n\
 *\n\
 *  map: new THREE.Texture( <Image> ),\n\
 *\n\
 *  lightMap: new THREE.Texture( <Image> ),\n\
 *\n\
 *  specularMap: new THREE.Texture( <Image> ),\n\
 *\n\
 *  envMap: new THREE.TextureCube( [posx, negx, posy, negy, posz, negz] ),\n\
 *  combine: THREE.Multiply,\n\
 *  reflectivity: <float>,\n\
 *  refractionRatio: <float>,\n\
 *\n\
 *  shading: THREE.SmoothShading,\n\
 *  blending: THREE.NormalBlending,\n\
 *  depthTest: <bool>,\n\
 *\n\
 *  wireframe: <boolean>,\n\
 *  wireframeLinewidth: <float>,\n\
 *\n\
 *  vertexColors: THREE.NoColors / THREE.VertexColors / THREE.FaceColors,\n\
 *\n\
 *  skinning: <bool>,\n\
 *  morphTargets: <bool>,\n\
 *  morphNormals: <bool>,\n\
 *\n\
 *\tfog: <bool>\n\
 * }\n\
 */\n\
\n\
THREE.MeshLambertMaterial = function ( parameters ) {\n\
\n\
\tTHREE.Material.call( this );\n\
\n\
\tthis.color = new THREE.Color( 0xffffff ); // diffuse\n\
\tthis.ambient = new THREE.Color( 0xffffff );\n\
\tthis.emissive = new THREE.Color( 0x000000 );\n\
\n\
\tthis.wrapAround = false;\n\
\tthis.wrapRGB = new THREE.Vector3( 1, 1, 1 );\n\
\n\
\tthis.map = null;\n\
\n\
\tthis.lightMap = null;\n\
\n\
\tthis.specularMap = null;\n\
\n\
\tthis.envMap = null;\n\
\tthis.combine = THREE.MultiplyOperation;\n\
\tthis.reflectivity = 1;\n\
\tthis.refractionRatio = 0.98;\n\
\n\
\tthis.fog = true;\n\
\n\
\tthis.shading = THREE.SmoothShading;\n\
\n\
\tthis.wireframe = false;\n\
\tthis.wireframeLinewidth = 1;\n\
\tthis.wireframeLinecap = 'round';\n\
\tthis.wireframeLinejoin = 'round';\n\
\n\
\tthis.vertexColors = THREE.NoColors;\n\
\n\
\tthis.skinning = false;\n\
\tthis.morphTargets = false;\n\
\tthis.morphNormals = false;\n\
\n\
\tthis.setValues( parameters );\n\
\n\
};\n\
\n\
THREE.MeshLambertMaterial.prototype = Object.create( THREE.Material.prototype );\n\
\n\
THREE.MeshLambertMaterial.prototype.clone = function () {\n\
\n\
\tvar material = new THREE.MeshLambertMaterial();\n\
\n\
\tTHREE.Material.prototype.clone.call( this, material );\n\
\n\
\tmaterial.color.copy( this.color );\n\
\tmaterial.ambient.copy( this.ambient );\n\
\tmaterial.emissive.copy( this.emissive );\n\
\n\
\tmaterial.wrapAround = this.wrapAround;\n\
\tmaterial.wrapRGB.copy( this.wrapRGB );\n\
\n\
\tmaterial.map = this.map;\n\
\n\
\tmaterial.lightMap = this.lightMap;\n\
\n\
\tmaterial.specularMap = this.specularMap;\n\
\n\
\tmaterial.envMap = this.envMap;\n\
\tmaterial.combine = this.combine;\n\
\tmaterial.reflectivity = this.reflectivity;\n\
\tmaterial.refractionRatio = this.refractionRatio;\n\
\n\
\tmaterial.fog = this.fog;\n\
\n\
\tmaterial.shading = this.shading;\n\
\n\
\tmaterial.wireframe = this.wireframe;\n\
\tmaterial.wireframeLinewidth = this.wireframeLinewidth;\n\
\tmaterial.wireframeLinecap = this.wireframeLinecap;\n\
\tmaterial.wireframeLinejoin = this.wireframeLinejoin;\n\
\n\
\tmaterial.vertexColors = this.vertexColors;\n\
\n\
\tmaterial.skinning = this.skinning;\n\
\tmaterial.morphTargets = this.morphTargets;\n\
\tmaterial.morphNormals = this.morphNormals;\n\
\n\
\treturn material;\n\
\n\
};\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 * @author alteredq / http://alteredqualia.com/\n\
 *\n\
 * parameters = {\n\
 *  color: <hex>,\n\
 *  ambient: <hex>,\n\
 *  emissive: <hex>,\n\
 *  specular: <hex>,\n\
 *  shininess: <float>,\n\
 *  opacity: <float>,\n\
 *\n\
 *  map: new THREE.Texture( <Image> ),\n\
 *\n\
 *  lightMap: new THREE.Texture( <Image> ),\n\
 *\n\
 *  bumpMap: new THREE.Texture( <Image> ),\n\
 *  bumpScale: <float>,\n\
 *\n\
 *  normalMap: new THREE.Texture( <Image> ),\n\
 *  normalScale: <Vector2>,\n\
 *\n\
 *  specularMap: new THREE.Texture( <Image> ),\n\
 *\n\
 *  envMap: new THREE.TextureCube( [posx, negx, posy, negy, posz, negz] ),\n\
 *  combine: THREE.Multiply,\n\
 *  reflectivity: <float>,\n\
 *  refractionRatio: <float>,\n\
 *\n\
 *  shading: THREE.SmoothShading,\n\
 *  blending: THREE.NormalBlending,\n\
 *  depthTest: <bool>,\n\
 *\n\
 *  wireframe: <boolean>,\n\
 *  wireframeLinewidth: <float>,\n\
 *\n\
 *  vertexColors: THREE.NoColors / THREE.VertexColors / THREE.FaceColors,\n\
 *\n\
 *  skinning: <bool>,\n\
 *  morphTargets: <bool>,\n\
 *  morphNormals: <bool>,\n\
 *\n\
 *\tfog: <bool>\n\
 * }\n\
 */\n\
\n\
THREE.MeshPhongMaterial = function ( parameters ) {\n\
\n\
\tTHREE.Material.call( this );\n\
\n\
\tthis.color = new THREE.Color( 0xffffff ); // diffuse\n\
\tthis.ambient = new THREE.Color( 0xffffff );\n\
\tthis.emissive = new THREE.Color( 0x000000 );\n\
\tthis.specular = new THREE.Color( 0x111111 );\n\
\tthis.shininess = 30;\n\
\n\
\tthis.metal = false;\n\
\tthis.perPixel = false;\n\
\n\
\tthis.wrapAround = false;\n\
\tthis.wrapRGB = new THREE.Vector3( 1, 1, 1 );\n\
\n\
\tthis.map = null;\n\
\n\
\tthis.lightMap = null;\n\
\n\
\tthis.bumpMap = null;\n\
\tthis.bumpScale = 1;\n\
\n\
\tthis.normalMap = null;\n\
\tthis.normalScale = new THREE.Vector2( 1, 1 );\n\
\n\
\tthis.specularMap = null;\n\
\n\
\tthis.envMap = null;\n\
\tthis.combine = THREE.MultiplyOperation;\n\
\tthis.reflectivity = 1;\n\
\tthis.refractionRatio = 0.98;\n\
\n\
\tthis.fog = true;\n\
\n\
\tthis.shading = THREE.SmoothShading;\n\
\n\
\tthis.wireframe = false;\n\
\tthis.wireframeLinewidth = 1;\n\
\tthis.wireframeLinecap = 'round';\n\
\tthis.wireframeLinejoin = 'round';\n\
\n\
\tthis.vertexColors = THREE.NoColors;\n\
\n\
\tthis.skinning = false;\n\
\tthis.morphTargets = false;\n\
\tthis.morphNormals = false;\n\
\n\
\tthis.setValues( parameters );\n\
\n\
};\n\
\n\
THREE.MeshPhongMaterial.prototype = Object.create( THREE.Material.prototype );\n\
\n\
THREE.MeshPhongMaterial.prototype.clone = function () {\n\
\n\
\tvar material = new THREE.MeshPhongMaterial();\n\
\n\
\tTHREE.Material.prototype.clone.call( this, material );\n\
\n\
\tmaterial.color.copy( this.color );\n\
\tmaterial.ambient.copy( this.ambient );\n\
\tmaterial.emissive.copy( this.emissive );\n\
\tmaterial.specular.copy( this.specular );\n\
\tmaterial.shininess = this.shininess;\n\
\n\
\tmaterial.metal = this.metal;\n\
\tmaterial.perPixel = this.perPixel;\n\
\n\
\tmaterial.wrapAround = this.wrapAround;\n\
\tmaterial.wrapRGB.copy( this.wrapRGB );\n\
\n\
\tmaterial.map = this.map;\n\
\n\
\tmaterial.lightMap = this.lightMap;\n\
\n\
\tmaterial.bumpMap = this.bumpMap;\n\
\tmaterial.bumpScale = this.bumpScale;\n\
\n\
\tmaterial.normalMap = this.normalMap;\n\
\tmaterial.normalScale.copy( this.normalScale );\n\
\n\
\tmaterial.specularMap = this.specularMap;\n\
\n\
\tmaterial.envMap = this.envMap;\n\
\tmaterial.combine = this.combine;\n\
\tmaterial.reflectivity = this.reflectivity;\n\
\tmaterial.refractionRatio = this.refractionRatio;\n\
\n\
\tmaterial.fog = this.fog;\n\
\n\
\tmaterial.shading = this.shading;\n\
\n\
\tmaterial.wireframe = this.wireframe;\n\
\tmaterial.wireframeLinewidth = this.wireframeLinewidth;\n\
\tmaterial.wireframeLinecap = this.wireframeLinecap;\n\
\tmaterial.wireframeLinejoin = this.wireframeLinejoin;\n\
\n\
\tmaterial.vertexColors = this.vertexColors;\n\
\n\
\tmaterial.skinning = this.skinning;\n\
\tmaterial.morphTargets = this.morphTargets;\n\
\tmaterial.morphNormals = this.morphNormals;\n\
\n\
\treturn material;\n\
\n\
};\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 * @author alteredq / http://alteredqualia.com/\n\
 *\n\
 * parameters = {\n\
 *  opacity: <float>,\n\
\n\
 *  blending: THREE.NormalBlending,\n\
 *  depthTest: <bool>,\n\
\n\
 *  wireframe: <boolean>,\n\
 *  wireframeLinewidth: <float>\n\
 * }\n\
 */\n\
\n\
THREE.MeshDepthMaterial = function ( parameters ) {\n\
\n\
\tTHREE.Material.call( this );\n\
\n\
\tthis.wireframe = false;\n\
\tthis.wireframeLinewidth = 1;\n\
\n\
\tthis.setValues( parameters );\n\
\n\
};\n\
\n\
THREE.MeshDepthMaterial.prototype = Object.create( THREE.Material.prototype );\n\
\n\
THREE.MeshDepthMaterial.prototype.clone = function () {\n\
\n\
\tvar material = new THREE.LineBasicMaterial();\n\
\n\
\tTHREE.Material.prototype.clone.call( this, material );\n\
\n\
\tmaterial.wireframe = this.wireframe;\n\
\tmaterial.wireframeLinewidth = this.wireframeLinewidth;\n\
\n\
\treturn material;\n\
\n\
};\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 *\n\
 * parameters = {\n\
 *  opacity: <float>,\n\
\n\
 *  shading: THREE.FlatShading,\n\
 *  blending: THREE.NormalBlending,\n\
 *  depthTest: <bool>,\n\
\n\
 *  wireframe: <boolean>,\n\
 *  wireframeLinewidth: <float>\n\
 * }\n\
 */\n\
\n\
THREE.MeshNormalMaterial = function ( parameters ) {\n\
\n\
\tTHREE.Material.call( this, parameters );\n\
\n\
\tthis.shading = THREE.FlatShading;\n\
\n\
\tthis.wireframe = false;\n\
\tthis.wireframeLinewidth = 1;\n\
\n\
\tthis.setValues( parameters );\n\
\n\
};\n\
\n\
THREE.MeshNormalMaterial.prototype = Object.create( THREE.Material.prototype );\n\
\n\
THREE.MeshNormalMaterial.prototype.clone = function () {\n\
\n\
\tvar material = new THREE.MeshNormalMaterial();\n\
\n\
\tTHREE.Material.prototype.clone.call( this, material );\n\
\n\
\tmaterial.shading = this.shading;\n\
\n\
\tmaterial.wireframe = this.wireframe;\n\
\tmaterial.wireframeLinewidth = this.wireframeLinewidth;\n\
\n\
\treturn material;\n\
\n\
};\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 */\n\
\n\
THREE.MeshFaceMaterial = function () {};\n\
\n\
THREE.MeshFaceMaterial.prototype.clone = function () {\n\
\n\
\treturn new THREE.MeshFaceMaterial();\n\
\n\
};\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 * @author alteredq / http://alteredqualia.com/\n\
 *\n\
 * parameters = {\n\
 *  color: <hex>,\n\
 *  opacity: <float>,\n\
 *  map: new THREE.Texture( <Image> ),\n\
 *\n\
 *  size: <float>,\n\
 *\n\
 *  blending: THREE.NormalBlending,\n\
 *  depthTest: <bool>,\n\
 *\n\
 *  vertexColors: <bool>,\n\
 *\n\
 *  fog: <bool>\n\
 * }\n\
 */\n\
\n\
THREE.ParticleBasicMaterial = function ( parameters ) {\n\
\n\
\tTHREE.Material.call( this );\n\
\n\
\tthis.color = new THREE.Color( 0xffffff );\n\
\n\
\tthis.map = null;\n\
\n\
\tthis.size = 1;\n\
\tthis.sizeAttenuation = true;\n\
\n\
\tthis.vertexColors = false;\n\
\n\
\tthis.fog = true;\n\
\n\
\tthis.setValues( parameters );\n\
\n\
};\n\
\n\
THREE.ParticleBasicMaterial.prototype = Object.create( THREE.Material.prototype );\n\
\n\
THREE.ParticleBasicMaterial.prototype.clone = function () {\n\
\n\
\tvar material = new THREE.ParticleBasicMaterial();\n\
\n\
\tTHREE.Material.prototype.clone.call( this, material );\n\
\n\
\tmaterial.color.copy( this.color );\n\
\n\
\tmaterial.map = this.map;\n\
\n\
\tmaterial.size = this.size;\n\
\tmaterial.sizeAttenuation = this.sizeAttenuation;\n\
\n\
\tmaterial.vertexColors = this.vertexColors;\n\
\n\
\tmaterial.fog = this.fog;\n\
\n\
\treturn material;\n\
\n\
};\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 *\n\
 * parameters = {\n\
 *  color: <hex>,\n\
 *  program: <function>,\n\
 *  opacity: <float>,\n\
 *  blending: THREE.NormalBlending\n\
 * }\n\
 */\n\
\n\
THREE.ParticleCanvasMaterial = function ( parameters ) {\n\
\n\
\tTHREE.Material.call( this );\n\
\n\
\tthis.color = new THREE.Color( 0xffffff );\n\
\tthis.program = function ( context, color ) {};\n\
\n\
\tthis.setValues( parameters );\n\
\n\
};\n\
\n\
THREE.ParticleCanvasMaterial.prototype = Object.create( THREE.Material.prototype );\n\
\n\
THREE.ParticleCanvasMaterial.prototype.clone = function () {\n\
\n\
\tvar material = new THREE.ParticleCanvasMaterial();\n\
\n\
\tTHREE.Material.prototype.clone.call( this, material );\n\
\n\
\tmaterial.color.copy( this.color );\n\
\tmaterial.program = this.program;\n\
\n\
\treturn material;\n\
\n\
};\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 */\n\
\n\
THREE.ParticleDOMMaterial = function ( element ) {\n\
\n\
\tthis.element = element;\n\
\n\
};\n\
\n\
THREE.ParticleDOMMaterial.prototype.clone = function(){\n\
\n\
\treturn new THREE.ParticleDOMMaterial( this.element );\n\
\n\
};\n\
/**\n\
 * @author alteredq / http://alteredqualia.com/\n\
 *\n\
 * parameters = {\n\
 *  fragmentShader: <string>,\n\
 *  vertexShader: <string>,\n\
 *\n\
 *  uniforms: { \"parameter1\": { type: \"f\", value: 1.0 }, \"parameter2\": { type: \"i\" value2: 2 } },\n\
 *\n\
 *  shading: THREE.SmoothShading,\n\
 *  blending: THREE.NormalBlending,\n\
 *  depthTest: <bool>,\n\
 *\n\
 *  wireframe: <boolean>,\n\
 *  wireframeLinewidth: <float>,\n\
 *\n\
 *  lights: <bool>,\n\
 *\n\
 *  vertexColors: THREE.NoColors / THREE.VertexColors / THREE.FaceColors,\n\
 *\n\
 *  skinning: <bool>,\n\
 *  morphTargets: <bool>,\n\
 *  morphNormals: <bool>,\n\
 *\n\
 *\tfog: <bool>\n\
 * }\n\
 */\n\
\n\
THREE.ShaderMaterial = function ( parameters ) {\n\
\n\
\tTHREE.Material.call( this );\n\
\n\
\tthis.fragmentShader = \"void main() {}\";\n\
\tthis.vertexShader = \"void main() {}\";\n\
\tthis.uniforms = {};\n\
\tthis.attributes = null;\n\
\n\
\tthis.shading = THREE.SmoothShading;\n\
\n\
\tthis.wireframe = false;\n\
\tthis.wireframeLinewidth = 1;\n\
\n\
\tthis.fog = false; // set to use scene fog\n\
\n\
\tthis.lights = false; // set to use scene lights\n\
\n\
\tthis.vertexColors = THREE.NoColors; // set to use \"color\" attribute stream\n\
\n\
\tthis.skinning = false; // set to use skinning attribute streams\n\
\n\
\tthis.morphTargets = false; // set to use morph targets\n\
\tthis.morphNormals = false; // set to use morph normals\n\
\n\
\tthis.setValues( parameters );\n\
\n\
};\n\
\n\
THREE.ShaderMaterial.prototype = Object.create( THREE.Material.prototype );\n\
\n\
THREE.ShaderMaterial.prototype.clone = function () {\n\
\n\
\tvar material = new THREE.ShaderMaterial();\n\
\n\
\tTHREE.Material.prototype.clone.call( this, material );\n\
\n\
\tmaterial.fragmentShader = this.fragmentShader;\n\
\tmaterial.vertexShader = this.vertexShader;\n\
\tmaterial.uniforms = this.uniforms;\n\
\tmaterial.attributes = this.attributes;\n\
\n\
\tmaterial.shading = this.shading;\n\
\n\
\tmaterial.wireframe = this.wireframe;\n\
\tmaterial.wireframeLinewidth = this.wireframeLinewidth;\n\
\n\
\tmaterial.fog = this.fog;\n\
\n\
\tmaterial.lights = this.lights;\n\
\n\
\tmaterial.vertexColors = this.vertexColors;\n\
\n\
\tmaterial.skinning = this.skinning;\n\
\n\
\tmaterial.morphTargets = this.morphTargets;\n\
\tmaterial.morphNormals = this.morphNormals;\n\
\n\
\treturn material;\n\
\n\
};\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 * @author alteredq / http://alteredqualia.com/\n\
 * @author szimek / https://github.com/szimek/\n\
 */\n\
\n\
THREE.Texture = function ( image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy ) {\n\
\n\
\tthis.id = THREE.TextureCount ++;\n\
\n\
\tthis.image = image;\n\
\n\
\tthis.mapping = mapping !== undefined ? mapping : new THREE.UVMapping();\n\
\n\
\tthis.wrapS = wrapS !== undefined ? wrapS : THREE.ClampToEdgeWrapping;\n\
\tthis.wrapT = wrapT !== undefined ? wrapT : THREE.ClampToEdgeWrapping;\n\
\n\
\tthis.magFilter = magFilter !== undefined ? magFilter : THREE.LinearFilter;\n\
\tthis.minFilter = minFilter !== undefined ? minFilter : THREE.LinearMipMapLinearFilter;\n\
\n\
\tthis.anisotropy = anisotropy !== undefined ? anisotropy : 1;\n\
\n\
\tthis.format = format !== undefined ? format : THREE.RGBAFormat;\n\
\tthis.type = type !== undefined ? type : THREE.UnsignedByteType;\n\
\n\
\tthis.offset = new THREE.Vector2( 0, 0 );\n\
\tthis.repeat = new THREE.Vector2( 1, 1 );\n\
\n\
\tthis.generateMipmaps = true;\n\
\tthis.premultiplyAlpha = false;\n\
\tthis.flipY = true;\n\
\n\
\tthis.needsUpdate = false;\n\
\tthis.onUpdate = null;\n\
\n\
};\n\
\n\
THREE.Texture.prototype = {\n\
\n\
\tconstructor: THREE.Texture,\n\
\n\
\tclone: function () {\n\
\n\
\t\tvar texture = new THREE.Texture();\n\
\n\
\t\ttexture.image = this.image;\n\
\n\
\t\ttexture.mapping = this.mapping;\n\
\n\
\t\ttexture.wrapS = this.wrapS;\n\
\t\ttexture.wrapT = this.wrapT;\n\
\n\
\t\ttexture.magFilter = this.magFilter;\n\
\t\ttexture.minFilter = this.minFilter;\n\
\n\
\t\ttexture.anisotropy = this.anisotropy;\n\
\n\
\t\ttexture.format = this.format;\n\
\t\ttexture.type = this.type;\n\
\n\
\t\ttexture.offset.copy( this.offset );\n\
\t\ttexture.repeat.copy( this.repeat );\n\
\n\
\t\ttexture.generateMipmaps = this.generateMipmaps;\n\
\t\ttexture.premultiplyAlpha = this.premultiplyAlpha;\n\
\t\ttexture.flipY = this.flipY;\n\
\n\
\t\treturn texture;\n\
\n\
\t}\n\
\n\
};\n\
\n\
THREE.TextureCount = 0;\n\
/**\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.CompressedTexture = function ( mipmaps, width, height, format, type, mapping, wrapS, wrapT, magFilter, minFilter ) {\n\
\n\
\tTHREE.Texture.call( this, null, mapping, wrapS, wrapT, magFilter, minFilter, format, type );\n\
\n\
\tthis.image = { width: width, height: height };\n\
\tthis.mipmaps = mipmaps;\n\
\n\
};\n\
\n\
THREE.CompressedTexture.prototype = Object.create( THREE.Texture.prototype );\n\
\n\
THREE.CompressedTexture.prototype.clone = function () {\n\
\n\
\tvar texture = new THREE.CompressedTexture();\n\
\n\
\ttexture.image = this.image;\n\
\ttexture.mipmaps = this.mipmaps;\n\
\n\
\ttexture.format = this.format;\n\
\ttexture.type = this.type;\n\
\n\
\ttexture.mapping = this.mapping;\n\
\n\
\ttexture.wrapS = this.wrapS;\n\
\ttexture.wrapT = this.wrapT;\n\
\n\
\ttexture.magFilter = this.magFilter;\n\
\ttexture.minFilter = this.minFilter;\n\
\n\
\ttexture.anisotropy = this.anisotropy;\n\
\n\
\ttexture.offset.copy( this.offset );\n\
\ttexture.repeat.copy( this.repeat );\n\
\n\
\treturn texture;\n\
\n\
};\n\
/**\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.DataTexture = function ( data, width, height, format, type, mapping, wrapS, wrapT, magFilter, minFilter ) {\n\
\n\
\tTHREE.Texture.call( this, null, mapping, wrapS, wrapT, magFilter, minFilter, format, type );\n\
\n\
\tthis.image = { data: data, width: width, height: height };\n\
\n\
};\n\
\n\
THREE.DataTexture.prototype = Object.create( THREE.Texture.prototype );\n\
\n\
THREE.DataTexture.prototype.clone = function () {\n\
\n\
\tvar clonedTexture = new THREE.DataTexture( this.image.data,  this.image.width, this.image.height, this.format, this.type, this.mapping, this.wrapS, this.wrapT, this.magFilter, this.minFilter );\n\
\n\
\tclonedTexture.offset.copy( this.offset );\n\
\tclonedTexture.repeat.copy( this.repeat );\n\
\n\
\treturn clonedTexture;\n\
\n\
};\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 */\n\
\n\
THREE.Particle = function ( material ) {\n\
\n\
\tTHREE.Object3D.call( this );\n\
\n\
\tthis.material = material;\n\
\n\
};\n\
\n\
THREE.Particle.prototype = Object.create( THREE.Object3D.prototype );\n\
/**\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.ParticleSystem = function ( geometry, material ) {\n\
\n\
\tTHREE.Object3D.call( this );\n\
\n\
\tthis.geometry = geometry;\n\
\tthis.material = ( material !== undefined ) ? material : new THREE.ParticleBasicMaterial( { color: Math.random() * 0xffffff } );\n\
\n\
\tthis.sortParticles = false;\n\
\n\
\tif ( this.geometry ) {\n\
\n\
\t\t// calc bound radius\n\
\n\
\t\tif( !this.geometry.boundingSphere ) {\n\
\n\
\t\t\tthis.geometry.computeBoundingSphere();\n\
\n\
\t\t}\n\
\n\
\t\tthis.boundRadius = geometry.boundingSphere.radius;\n\
\n\
\t}\n\
\n\
\tthis.frustumCulled = false;\n\
\n\
};\n\
\n\
THREE.ParticleSystem.prototype = Object.create( THREE.Object3D.prototype );\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 */\n\
\n\
THREE.Line = function ( geometry, material, type ) {\n\
\n\
\tTHREE.Object3D.call( this );\n\
\n\
\tthis.geometry = geometry;\n\
\tthis.material = ( material !== undefined ) ? material : new THREE.LineBasicMaterial( { color: Math.random() * 0xffffff } );\n\
\tthis.type = ( type !== undefined ) ? type : THREE.LineStrip;\n\
\n\
\tif ( this.geometry ) {\n\
\n\
\t\tif ( ! this.geometry.boundingSphere ) {\n\
\n\
\t\t\tthis.geometry.computeBoundingSphere();\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
};\n\
\n\
THREE.LineStrip = 0;\n\
THREE.LinePieces = 1;\n\
\n\
THREE.Line.prototype = Object.create( THREE.Object3D.prototype );\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 * @author alteredq / http://alteredqualia.com/\n\
 * @author mikael emtinger / http://gomo.se/\n\
 */\n\
\n\
THREE.Mesh = function ( geometry, material ) {\n\
\n\
\tTHREE.Object3D.call( this );\n\
\n\
\tthis.geometry = geometry;\n\
\tthis.material = ( material !== undefined ) ? material : new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, wireframe: true } );\n\
\n\
\tif ( this.geometry ) {\n\
\n\
\t\t// calc bound radius\n\
\n\
\t\tif ( ! this.geometry.boundingSphere ) {\n\
\n\
\t\t\tthis.geometry.computeBoundingSphere();\n\
\n\
\t\t}\n\
\n\
\t\tthis.boundRadius = geometry.boundingSphere.radius;\n\
\n\
\n\
\t\t// setup morph targets\n\
\n\
\t\tif( this.geometry.morphTargets.length ) {\n\
\n\
\t\t\tthis.morphTargetBase = -1;\n\
\t\t\tthis.morphTargetForcedOrder = [];\n\
\t\t\tthis.morphTargetInfluences = [];\n\
\t\t\tthis.morphTargetDictionary = {};\n\
\n\
\t\t\tfor( var m = 0; m < this.geometry.morphTargets.length; m ++ ) {\n\
\n\
\t\t\t\tthis.morphTargetInfluences.push( 0 );\n\
\t\t\t\tthis.morphTargetDictionary[ this.geometry.morphTargets[ m ].name ] = m;\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
}\n\
\n\
THREE.Mesh.prototype = Object.create( THREE.Object3D.prototype );\n\
\n\
\n\
/*\n\
 * Get Morph Target Index by Name\n\
 */\n\
\n\
THREE.Mesh.prototype.getMorphTargetIndexByName = function( name ) {\n\
\n\
\tif ( this.morphTargetDictionary[ name ] !== undefined ) {\n\
\n\
\t\treturn this.morphTargetDictionary[ name ];\n\
\t}\n\
\n\
\tconsole.log( \"THREE.Mesh.getMorphTargetIndexByName: morph target \" + name + \" does not exist. Returning 0.\" );\n\
\treturn 0;\n\
\n\
}\n\
/**\n\
 * @author mikael emtinger / http://gomo.se/\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.Bone = function( belongsToSkin ) {\n\
\n\
\tTHREE.Object3D.call( this );\n\
\n\
\tthis.skin = belongsToSkin;\n\
\tthis.skinMatrix = new THREE.Matrix4();\n\
\n\
};\n\
\n\
THREE.Bone.prototype = Object.create( THREE.Object3D.prototype );\n\
\n\
THREE.Bone.prototype.update = function( parentSkinMatrix, forceUpdate ) {\n\
\n\
\t// update local\n\
\n\
\tif ( this.matrixAutoUpdate ) {\n\
\n\
\t\tforceUpdate |= this.updateMatrix();\n\
\n\
\t}\n\
\n\
\t// update skin matrix\n\
\n\
\tif ( forceUpdate || this.matrixWorldNeedsUpdate ) {\n\
\n\
\t\tif( parentSkinMatrix ) {\n\
\n\
\t\t\tthis.skinMatrix.multiply( parentSkinMatrix, this.matrix );\n\
\n\
\t\t} else {\n\
\n\
\t\t\tthis.skinMatrix.copy( this.matrix );\n\
\n\
\t\t}\n\
\n\
\t\tthis.matrixWorldNeedsUpdate = false;\n\
\t\tforceUpdate = true;\n\
\n\
\t}\n\
\n\
\t// update children\n\
\n\
\tvar child, i, l = this.children.length;\n\
\n\
\tfor ( i = 0; i < l; i ++ ) {\n\
\n\
\t\tthis.children[ i ].update( this.skinMatrix, forceUpdate );\n\
\n\
\t}\n\
\n\
};\n\
\n\
/**\n\
 * @author mikael emtinger / http://gomo.se/\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.SkinnedMesh = function ( geometry, material, useVertexTexture ) {\n\
\n\
\tTHREE.Mesh.call( this, geometry, material );\n\
\n\
\t//\n\
\n\
\tthis.useVertexTexture = useVertexTexture !== undefined ? useVertexTexture : true;\n\
\n\
\t// init bones\n\
\n\
\tthis.identityMatrix = new THREE.Matrix4();\n\
\n\
\tthis.bones = [];\n\
\tthis.boneMatrices = [];\n\
\n\
\tvar b, bone, gbone, p, q, s;\n\
\n\
\tif ( this.geometry.bones !== undefined ) {\n\
\n\
\t\tfor ( b = 0; b < this.geometry.bones.length; b ++ ) {\n\
\n\
\t\t\tgbone = this.geometry.bones[ b ];\n\
\n\
\t\t\tp = gbone.pos;\n\
\t\t\tq = gbone.rotq;\n\
\t\t\ts = gbone.scl;\n\
\n\
\t\t\tbone = this.addBone();\n\
\n\
\t\t\tbone.name = gbone.name;\n\
\t\t\tbone.position.set( p[0], p[1], p[2] );\n\
\t\t\tbone.quaternion.set( q[0], q[1], q[2], q[3] );\n\
\t\t\tbone.useQuaternion = true;\n\
\n\
\t\t\tif ( s !== undefined ) {\n\
\n\
\t\t\t\tbone.scale.set( s[0], s[1], s[2] );\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tbone.scale.set( 1, 1, 1 );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tfor ( b = 0; b < this.bones.length; b ++ ) {\n\
\n\
\t\t\tgbone = this.geometry.bones[ b ];\n\
\t\t\tbone = this.bones[ b ];\n\
\n\
\t\t\tif ( gbone.parent === -1 ) {\n\
\n\
\t\t\t\tthis.add( bone );\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tthis.bones[ gbone.parent ].add( bone );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\t//\n\
\n\
\t\tvar nBones = this.bones.length;\n\
\n\
\t\tif ( this.useVertexTexture ) {\n\
\n\
\t\t\t// layout (1 matrix = 4 pixels)\n\
\t\t\t//\tRGBA RGBA RGBA RGBA (=> column1, column2, column3, column4)\n\
\t\t\t//  with  8x8  pixel texture max   16 bones  (8 * 8  / 4)\n\
\t\t\t//  \t 16x16 pixel texture max   64 bones (16 * 16 / 4)\n\
\t\t\t//  \t 32x32 pixel texture max  256 bones (32 * 32 / 4)\n\
\t\t\t//  \t 64x64 pixel texture max 1024 bones (64 * 64 / 4)\n\
\n\
\t\t\tvar size;\n\
\n\
\t\t\tif ( nBones > 256 )\n\
\t\t\t\tsize = 64;\n\
\t\t\telse if ( nBones > 64 )\n\
\t\t\t\tsize = 32;\n\
\t\t\telse if ( nBones > 16 )\n\
\t\t\t\tsize = 16;\n\
\t\t\telse\n\
\t\t\t\tsize = 8;\n\
\n\
\t\t\tthis.boneTextureWidth = size;\n\
\t\t\tthis.boneTextureHeight = size;\n\
\n\
\t\t\tthis.boneMatrices = new Float32Array( this.boneTextureWidth * this.boneTextureHeight * 4 ); // 4 floats per RGBA pixel\n\
\t\t\tthis.boneTexture = new THREE.DataTexture( this.boneMatrices, this.boneTextureWidth, this.boneTextureHeight, THREE.RGBAFormat, THREE.FloatType );\n\
\t\t\tthis.boneTexture.minFilter = THREE.NearestFilter;\n\
\t\t\tthis.boneTexture.magFilter = THREE.NearestFilter;\n\
\t\t\tthis.boneTexture.generateMipmaps = false;\n\
\t\t\tthis.boneTexture.flipY = false;\n\
\n\
\t\t} else {\n\
\n\
\t\t\tthis.boneMatrices = new Float32Array( 16 * nBones );\n\
\n\
\t\t}\n\
\n\
\t\tthis.pose();\n\
\n\
\t}\n\
\n\
};\n\
\n\
THREE.SkinnedMesh.prototype = Object.create( THREE.Mesh.prototype );\n\
\n\
THREE.SkinnedMesh.prototype.addBone = function( bone ) {\n\
\n\
\tif ( bone === undefined ) {\n\
\n\
\t\tbone = new THREE.Bone( this );\n\
\n\
\t}\n\
\n\
\tthis.bones.push( bone );\n\
\n\
\treturn bone;\n\
\n\
};\n\
\n\
THREE.SkinnedMesh.prototype.updateMatrixWorld = function ( force ) {\n\
\n\
\tthis.matrixAutoUpdate && this.updateMatrix();\n\
\n\
\t// update matrixWorld\n\
\n\
\tif ( this.matrixWorldNeedsUpdate || force ) {\n\
\n\
\t\tif ( this.parent ) {\n\
\n\
\t\t\tthis.matrixWorld.multiply( this.parent.matrixWorld, this.matrix );\n\
\n\
\t\t} else {\n\
\n\
\t\t\tthis.matrixWorld.copy( this.matrix );\n\
\n\
\t\t}\n\
\n\
\t\tthis.matrixWorldNeedsUpdate = false;\n\
\n\
\t\tforce = true;\n\
\n\
\t}\n\
\n\
\t// update children\n\
\n\
\tfor ( var i = 0, l = this.children.length; i < l; i ++ ) {\n\
\n\
\t\tvar child = this.children[ i ];\n\
\n\
\t\tif ( child instanceof THREE.Bone ) {\n\
\n\
\t\t\tchild.update( this.identityMatrix, false );\n\
\n\
\t\t} else {\n\
\n\
\t\t\tchild.updateMatrixWorld( true );\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\t// make a snapshot of the bones' rest position\n\
\n\
\tif ( this.boneInverses == undefined ) {\n\
\n\
\t\tthis.boneInverses = [];\n\
\n\
\t\tfor ( var b = 0, bl = this.bones.length; b < bl; b ++ ) {\n\
\n\
\t\t\tvar inverse = new THREE.Matrix4();\n\
\n\
\t\t\tinverse.getInverse( this.bones[ b ].skinMatrix );\n\
\n\
\t\t\tthis.boneInverses.push( inverse );\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\t// flatten bone matrices to array\n\
\n\
\tfor ( var b = 0, bl = this.bones.length; b < bl; b ++ ) {\n\
\n\
\t\t// compute the offset between the current and the original transform;\n\
\n\
\t\t//TODO: we could get rid of this multiplication step if the skinMatrix\n\
\t\t// was already representing the offset; however, this requires some\n\
\t\t// major changes to the animation system\n\
\n\
\t\tTHREE.SkinnedMesh.offsetMatrix.multiply( this.bones[ b ].skinMatrix, this.boneInverses[ b ] );\n\
\n\
\t\tTHREE.SkinnedMesh.offsetMatrix.flattenToArrayOffset( this.boneMatrices, b * 16 );\n\
\n\
\t}\n\
\n\
\tif ( this.useVertexTexture ) {\n\
\n\
\t\tthis.boneTexture.needsUpdate = true;\n\
\n\
\t}\n\
\n\
};\n\
\n\
/*\n\
 * Pose\n\
 */\n\
\n\
THREE.SkinnedMesh.prototype.pose = function() {\n\
\n\
\tthis.updateMatrixWorld( true );\n\
\n\
\tfor ( var i = 0; i < this.geometry.skinIndices.length; i ++ ) {\n\
\n\
\t\t// normalize weights\n\
\n\
\t\tvar sw = this.geometry.skinWeights[ i ];\n\
\n\
\t\tvar scale = 1.0 / sw.lengthManhattan();\n\
\n\
\t\tif ( scale !== Infinity ) {\n\
\n\
\t\t\tsw.multiplyScalar( scale );\n\
\n\
\t\t} else {\n\
\n\
\t\t\tsw.set( 1 ); // this will be normalized by the shader anyway\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
};\n\
\n\
THREE.SkinnedMesh.offsetMatrix = new THREE.Matrix4();\n\
\n\
/**\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.MorphAnimMesh = function ( geometry, material ) {\n\
\n\
\tTHREE.Mesh.call( this, geometry, material );\n\
\n\
\t// API\n\
\n\
\tthis.duration = 1000; // milliseconds\n\
\tthis.mirroredLoop = false;\n\
\tthis.time = 0;\n\
\n\
\t// internals\n\
\n\
\tthis.lastKeyframe = 0;\n\
\tthis.currentKeyframe = 0;\n\
\n\
\tthis.direction = 1;\n\
\tthis.directionBackwards = false;\n\
\n\
\tthis.setFrameRange( 0, this.geometry.morphTargets.length - 1 );\n\
\n\
};\n\
\n\
THREE.MorphAnimMesh.prototype = Object.create( THREE.Mesh.prototype );\n\
\n\
THREE.MorphAnimMesh.prototype.setFrameRange = function ( start, end ) {\n\
\n\
\tthis.startKeyframe = start;\n\
\tthis.endKeyframe = end;\n\
\n\
\tthis.length = this.endKeyframe - this.startKeyframe + 1;\n\
\n\
};\n\
\n\
THREE.MorphAnimMesh.prototype.setDirectionForward = function () {\n\
\n\
\tthis.direction = 1;\n\
\tthis.directionBackwards = false;\n\
\n\
};\n\
\n\
THREE.MorphAnimMesh.prototype.setDirectionBackward = function () {\n\
\n\
\tthis.direction = -1;\n\
\tthis.directionBackwards = true;\n\
\n\
};\n\
\n\
THREE.MorphAnimMesh.prototype.parseAnimations = function () {\n\
\n\
\tvar geometry = this.geometry;\n\
\n\
\tif ( ! geometry.animations ) geometry.animations = {};\n\
\n\
\tvar firstAnimation, animations = geometry.animations;\n\
\n\
\tvar pattern = /([a-z]+)(\\d+)/;\n\
\n\
\tfor ( var i = 0, il = geometry.morphTargets.length; i < il; i ++ ) {\n\
\n\
\t\tvar morph = geometry.morphTargets[ i ];\n\
\t\tvar parts = morph.name.match( pattern );\n\
\n\
\t\tif ( parts && parts.length > 1 ) {\n\
\n\
\t\t\tvar label = parts[ 1 ];\n\
\t\t\tvar num = parts[ 2 ];\n\
\n\
\t\t\tif ( ! animations[ label ] ) animations[ label ] = { start: Infinity, end: -Infinity };\n\
\n\
\t\t\tvar animation = animations[ label ];\n\
\n\
\t\t\tif ( i < animation.start ) animation.start = i;\n\
\t\t\tif ( i > animation.end ) animation.end = i;\n\
\n\
\t\t\tif ( ! firstAnimation ) firstAnimation = label;\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\tgeometry.firstAnimation = firstAnimation;\n\
\n\
};\n\
\n\
THREE.MorphAnimMesh.prototype.setAnimationLabel = function ( label, start, end ) {\n\
\n\
\tif ( ! this.geometry.animations ) this.geometry.animations = {};\n\
\n\
\tthis.geometry.animations[ label ] = { start: start, end: end };\n\
\n\
};\n\
\n\
THREE.MorphAnimMesh.prototype.playAnimation = function ( label, fps ) {\n\
\n\
\tvar animation = this.geometry.animations[ label ];\n\
\n\
\tif ( animation ) {\n\
\n\
\t\tthis.setFrameRange( animation.start, animation.end );\n\
\t\tthis.duration = 1000 * ( ( animation.end - animation.start ) / fps );\n\
\t\tthis.time = 0;\n\
\n\
\t} else {\n\
\n\
\t\tconsole.warn( \"animation[\" + label + \"] undefined\" );\n\
\n\
\t}\n\
\n\
};\n\
\n\
THREE.MorphAnimMesh.prototype.updateAnimation = function ( delta ) {\n\
\n\
\tvar frameTime = this.duration / this.length;\n\
\n\
\tthis.time += this.direction * delta;\n\
\n\
\tif ( this.mirroredLoop ) {\n\
\n\
\t\tif ( this.time > this.duration || this.time < 0 ) {\n\
\n\
\t\t\tthis.direction *= -1;\n\
\n\
\t\t\tif ( this.time > this.duration ) {\n\
\n\
\t\t\t\tthis.time = this.duration;\n\
\t\t\t\tthis.directionBackwards = true;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( this.time < 0 ) {\n\
\n\
\t\t\t\tthis.time = 0;\n\
\t\t\t\tthis.directionBackwards = false;\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t} else {\n\
\n\
\t\tthis.time = this.time % this.duration;\n\
\n\
\t\tif ( this.time < 0 ) this.time += this.duration;\n\
\n\
\t}\n\
\n\
\tvar keyframe = this.startKeyframe + THREE.Math.clamp( Math.floor( this.time / frameTime ), 0, this.length - 1 );\n\
\n\
\tif ( keyframe !== this.currentKeyframe ) {\n\
\n\
\t\tthis.morphTargetInfluences[ this.lastKeyframe ] = 0;\n\
\t\tthis.morphTargetInfluences[ this.currentKeyframe ] = 1;\n\
\n\
\t\tthis.morphTargetInfluences[ keyframe ] = 0;\n\
\n\
\t\tthis.lastKeyframe = this.currentKeyframe;\n\
\t\tthis.currentKeyframe = keyframe;\n\
\n\
\t}\n\
\n\
\tvar mix = ( this.time % frameTime ) / frameTime;\n\
\n\
\tif ( this.directionBackwards ) {\n\
\n\
\t\tmix = 1 - mix;\n\
\n\
\t}\n\
\n\
\tthis.morphTargetInfluences[ this.currentKeyframe ] = mix;\n\
\tthis.morphTargetInfluences[ this.lastKeyframe ] = 1 - mix;\n\
\n\
};\n\
/**\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.Ribbon = function ( geometry, material ) {\n\
\n\
\tTHREE.Object3D.call( this );\n\
\n\
\tthis.geometry = geometry;\n\
\tthis.material = material;\n\
\n\
};\n\
\n\
THREE.Ribbon.prototype = Object.create( THREE.Object3D.prototype );\n\
/**\n\
 * @author mikael emtinger / http://gomo.se/\n\
 * @author alteredq / http://alteredqualia.com/\n\
 * @author mrdoob / http://mrdoob.com/\n\
 */\n\
\n\
THREE.LOD = function () {\n\
\n\
\tTHREE.Object3D.call( this );\n\
\n\
\tthis.LODs = [];\n\
\n\
};\n\
\n\
\n\
THREE.LOD.prototype = Object.create( THREE.Object3D.prototype );\n\
\n\
THREE.LOD.prototype.addLevel = function ( object3D, visibleAtDistance ) {\n\
\n\
\tif ( visibleAtDistance === undefined ) {\n\
\n\
\t\tvisibleAtDistance = 0;\n\
\n\
\t}\n\
\n\
\tvisibleAtDistance = Math.abs( visibleAtDistance );\n\
\n\
\tfor ( var l = 0; l < this.LODs.length; l ++ ) {\n\
\n\
\t\tif ( visibleAtDistance < this.LODs[ l ].visibleAtDistance ) {\n\
\n\
\t\t\tbreak;\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\tthis.LODs.splice( l, 0, { visibleAtDistance: visibleAtDistance, object3D: object3D } );\n\
\tthis.add( object3D );\n\
\n\
};\n\
\n\
THREE.LOD.prototype.update = function ( camera ) {\n\
\n\
\tif ( this.LODs.length > 1 ) {\n\
\n\
\t\tcamera.matrixWorldInverse.getInverse( camera.matrixWorld );\n\
\n\
\t\tvar inverse  = camera.matrixWorldInverse;\n\
\t\tvar distance = -( inverse.elements[2] * this.matrixWorld.elements[12] + inverse.elements[6] * this.matrixWorld.elements[13] + inverse.elements[10] * this.matrixWorld.elements[14] + inverse.elements[14] );\n\
\n\
\t\tthis.LODs[ 0 ].object3D.visible = true;\n\
\n\
\t\tfor ( var l = 1; l < this.LODs.length; l ++ ) {\n\
\n\
\t\t\tif( distance >= this.LODs[ l ].visibleAtDistance ) {\n\
\n\
\t\t\t\tthis.LODs[ l - 1 ].object3D.visible = false;\n\
\t\t\t\tthis.LODs[ l     ].object3D.visible = true;\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tbreak;\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tfor( ; l < this.LODs.length; l ++ ) {\n\
\n\
\t\t\tthis.LODs[ l ].object3D.visible = false;\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
};\n\
/**\n\
 * @author mikael emtinger / http://gomo.se/\n\
 */\n\
\n\
THREE.Sprite = function ( parameters ) {\n\
\n\
\tTHREE.Object3D.call( this );\n\
\n\
\tthis.color = ( parameters.color !== undefined ) ? new THREE.Color( parameters.color ) : new THREE.Color( 0xffffff );\n\
\tthis.map = ( parameters.map !== undefined ) ? parameters.map : new THREE.Texture();\n\
\n\
\tthis.blending = ( parameters.blending !== undefined ) ? parameters.blending : THREE.NormalBlending;\n\
\n\
\tthis.blendSrc = parameters.blendSrc !== undefined ? parameters.blendSrc : THREE.SrcAlphaFactor;\n\
\tthis.blendDst = parameters.blendDst !== undefined ? parameters.blendDst : THREE.OneMinusSrcAlphaFactor;\n\
\tthis.blendEquation = parameters.blendEquation !== undefined ? parameters.blendEquation : THREE.AddEquation;\n\
\n\
\tthis.useScreenCoordinates = ( parameters.useScreenCoordinates !== undefined ) ? parameters.useScreenCoordinates : true;\n\
\tthis.mergeWith3D = ( parameters.mergeWith3D !== undefined ) ? parameters.mergeWith3D : !this.useScreenCoordinates;\n\
\tthis.affectedByDistance = ( parameters.affectedByDistance !== undefined ) ? parameters.affectedByDistance : !this.useScreenCoordinates;\n\
\tthis.scaleByViewport = ( parameters.scaleByViewport !== undefined ) ? parameters.scaleByViewport : !this.affectedByDistance;\n\
\tthis.alignment = ( parameters.alignment instanceof THREE.Vector2 ) ? parameters.alignment : THREE.SpriteAlignment.center;\n\
\n\
\tthis.rotation3d = this.rotation;\n\
\tthis.rotation = 0;\n\
\tthis.opacity = 1;\n\
\n\
\tthis.uvOffset = new THREE.Vector2( 0, 0 );\n\
\tthis.uvScale  = new THREE.Vector2( 1, 1 );\n\
\n\
};\n\
\n\
THREE.Sprite.prototype = Object.create( THREE.Object3D.prototype );\n\
\n\
/*\n\
 * Custom update matrix\n\
 */\n\
\n\
THREE.Sprite.prototype.updateMatrix = function () {\n\
\n\
\tthis.matrix.setPosition( this.position );\n\
\n\
\tthis.rotation3d.set( 0, 0, this.rotation );\n\
\tthis.matrix.setRotationFromEuler( this.rotation3d );\n\
\n\
\tif ( this.scale.x !== 1 || this.scale.y !== 1 ) {\n\
\n\
\t\tthis.matrix.scale( this.scale );\n\
\t\tthis.boundRadiusScale = Math.max( this.scale.x, this.scale.y );\n\
\n\
\t}\n\
\n\
\tthis.matrixWorldNeedsUpdate = true;\n\
\n\
};\n\
\n\
/*\n\
 * Alignment\n\
 */\n\
\n\
THREE.SpriteAlignment = {};\n\
THREE.SpriteAlignment.topLeft = new THREE.Vector2( 1, -1 );\n\
THREE.SpriteAlignment.topCenter = new THREE.Vector2( 0, -1 );\n\
THREE.SpriteAlignment.topRight = new THREE.Vector2( -1, -1 );\n\
THREE.SpriteAlignment.centerLeft = new THREE.Vector2( 1, 0 );\n\
THREE.SpriteAlignment.center = new THREE.Vector2( 0, 0 );\n\
THREE.SpriteAlignment.centerRight = new THREE.Vector2( -1, 0 );\n\
THREE.SpriteAlignment.bottomLeft = new THREE.Vector2( 1, 1 );\n\
THREE.SpriteAlignment.bottomCenter = new THREE.Vector2( 0, 1 );\n\
THREE.SpriteAlignment.bottomRight = new THREE.Vector2( -1, 1 );\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 */\n\
\n\
THREE.Scene = function () {\n\
\n\
\tTHREE.Object3D.call( this );\n\
\n\
\tthis.fog = null;\n\
\tthis.overrideMaterial = null;\n\
\n\
\tthis.matrixAutoUpdate = false;\n\
\n\
\tthis.__objects = [];\n\
\tthis.__lights = [];\n\
\n\
\tthis.__objectsAdded = [];\n\
\tthis.__objectsRemoved = [];\n\
\n\
};\n\
\n\
THREE.Scene.prototype = Object.create( THREE.Object3D.prototype );\n\
\n\
THREE.Scene.prototype.__addObject = function ( object ) {\n\
\n\
\tif ( object instanceof THREE.Light ) {\n\
\n\
\t\tif ( this.__lights.indexOf( object ) === - 1 ) {\n\
\n\
\t\t\tthis.__lights.push( object );\n\
\n\
\t\t}\n\
\n\
\t\tif ( object.target && object.target.parent === undefined ) {\n\
\n\
\t\t\tthis.add( object.target );\n\
\n\
\t\t}\n\
\n\
\t} else if ( !( object instanceof THREE.Camera || object instanceof THREE.Bone ) ) {\n\
\n\
\t\tif ( this.__objects.indexOf( object ) === - 1 ) {\n\
\n\
\t\t\tthis.__objects.push( object );\n\
\t\t\tthis.__objectsAdded.push( object );\n\
\n\
\t\t\t// check if previously removed\n\
\n\
\t\t\tvar i = this.__objectsRemoved.indexOf( object );\n\
\n\
\t\t\tif ( i !== -1 ) {\n\
\n\
\t\t\t\tthis.__objectsRemoved.splice( i, 1 );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\tfor ( var c = 0; c < object.children.length; c ++ ) {\n\
\n\
\t\tthis.__addObject( object.children[ c ] );\n\
\n\
\t}\n\
\n\
};\n\
\n\
THREE.Scene.prototype.__removeObject = function ( object ) {\n\
\n\
\tif ( object instanceof THREE.Light ) {\n\
\n\
\t\tvar i = this.__lights.indexOf( object );\n\
\n\
\t\tif ( i !== -1 ) {\n\
\n\
\t\t\tthis.__lights.splice( i, 1 );\n\
\n\
\t\t}\n\
\n\
\t} else if ( !( object instanceof THREE.Camera ) ) {\n\
\n\
\t\tvar i = this.__objects.indexOf( object );\n\
\n\
\t\tif( i !== -1 ) {\n\
\n\
\t\t\tthis.__objects.splice( i, 1 );\n\
\t\t\tthis.__objectsRemoved.push( object );\n\
\n\
\t\t\t// check if previously added\n\
\n\
\t\t\tvar ai = this.__objectsAdded.indexOf( object );\n\
\n\
\t\t\tif ( ai !== -1 ) {\n\
\n\
\t\t\t\tthis.__objectsAdded.splice( ai, 1 );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\tfor ( var c = 0; c < object.children.length; c ++ ) {\n\
\n\
\t\tthis.__removeObject( object.children[ c ] );\n\
\n\
\t}\n\
\n\
};\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.Fog = function ( hex, near, far ) {\n\
\n\
\tthis.color = new THREE.Color( hex );\n\
\n\
\tthis.near = ( near !== undefined ) ? near : 1;\n\
\tthis.far = ( far !== undefined ) ? far : 1000;\n\
\n\
};\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.FogExp2 = function ( hex, density ) {\n\
\n\
\tthis.color = new THREE.Color( hex );\n\
\tthis.density = ( density !== undefined ) ? density : 0.00025;\n\
\n\
};\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 */\n\
\n\
THREE.CanvasRenderer = function ( parameters ) {\n\
\n\
\tconsole.log( 'THREE.CanvasRenderer', THREE.REVISION );\n\
\n\
\tparameters = parameters || {};\n\
\n\
\tvar _this = this,\n\
\t_renderData, _elements, _lights,\n\
\t_projector = new THREE.Projector(),\n\
\n\
\t_canvas = parameters.canvas !== undefined ? parameters.canvas : document.createElement( 'canvas' ),\n\
\n\
\t_canvasWidth, _canvasHeight, _canvasWidthHalf, _canvasHeightHalf,\n\
\t_context = _canvas.getContext( '2d' ),\n\
\n\
\t_clearColor = new THREE.Color( 0x000000 ),\n\
\t_clearOpacity = 0,\n\
\n\
\t_contextGlobalAlpha = 1,\n\
\t_contextGlobalCompositeOperation = 0,\n\
\t_contextStrokeStyle = null,\n\
\t_contextFillStyle = null,\n\
\t_contextLineWidth = null,\n\
\t_contextLineCap = null,\n\
\t_contextLineJoin = null,\n\
\n\
\t_v1, _v2, _v3, _v4,\n\
\t_v5 = new THREE.RenderableVertex(),\n\
\t_v6 = new THREE.RenderableVertex(),\n\
\n\
\t_v1x, _v1y, _v2x, _v2y, _v3x, _v3y,\n\
\t_v4x, _v4y, _v5x, _v5y, _v6x, _v6y,\n\
\n\
\t_color = new THREE.Color(),\n\
\t_color1 = new THREE.Color(),\n\
\t_color2 = new THREE.Color(),\n\
\t_color3 = new THREE.Color(),\n\
\t_color4 = new THREE.Color(),\n\
\n\
\t_patterns = {}, _imagedatas = {},\n\
\n\
\t_near, _far,\n\
\n\
\t_image, _uvs,\n\
\t_uv1x, _uv1y, _uv2x, _uv2y, _uv3x, _uv3y,\n\
\n\
\t_clipRect = new THREE.Rectangle(),\n\
\t_clearRect = new THREE.Rectangle(),\n\
\t_bboxRect = new THREE.Rectangle(),\n\
\n\
\t_enableLighting = false,\n\
\t_ambientLight = new THREE.Color(),\n\
\t_directionalLights = new THREE.Color(),\n\
\t_pointLights = new THREE.Color(),\n\
\n\
\t_pi2 = Math.PI * 2,\n\
\t_vector3 = new THREE.Vector3(), // Needed for PointLight\n\
\n\
\t_pixelMap, _pixelMapContext, _pixelMapImage, _pixelMapData,\n\
\t_gradientMap, _gradientMapContext, _gradientMapQuality = 16;\n\
\n\
\t_pixelMap = document.createElement( 'canvas' );\n\
\t_pixelMap.width = _pixelMap.height = 2;\n\
\n\
\t_pixelMapContext = _pixelMap.getContext( '2d' );\n\
\t_pixelMapContext.fillStyle = 'rgba(0,0,0,1)';\n\
\t_pixelMapContext.fillRect( 0, 0, 2, 2 );\n\
\n\
\t_pixelMapImage = _pixelMapContext.getImageData( 0, 0, 2, 2 );\n\
\t_pixelMapData = _pixelMapImage.data;\n\
\n\
\t_gradientMap = document.createElement( 'canvas' );\n\
\t_gradientMap.width = _gradientMap.height = _gradientMapQuality;\n\
\n\
\t_gradientMapContext = _gradientMap.getContext( '2d' );\n\
\t_gradientMapContext.translate( - _gradientMapQuality / 2, - _gradientMapQuality / 2 );\n\
\t_gradientMapContext.scale( _gradientMapQuality, _gradientMapQuality );\n\
\n\
\t_gradientMapQuality --; // Fix UVs\n\
\n\
\tthis.domElement = _canvas;\n\
\n\
\tthis.autoClear = true;\n\
\tthis.sortObjects = true;\n\
\tthis.sortElements = true;\n\
\n\
\tthis.info = {\n\
\n\
\t\trender: {\n\
\n\
\t\t\tvertices: 0,\n\
\t\t\tfaces: 0\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\tthis.setSize = function ( width, height ) {\n\
\n\
\t\t_canvasWidth = width;\n\
\t\t_canvasHeight = height;\n\
\t\t_canvasWidthHalf = Math.floor( _canvasWidth / 2 );\n\
\t\t_canvasHeightHalf = Math.floor( _canvasHeight / 2 );\n\
\n\
\t\t_canvas.width = _canvasWidth;\n\
\t\t_canvas.height = _canvasHeight;\n\
\n\
\t\t_clipRect.set( - _canvasWidthHalf, - _canvasHeightHalf, _canvasWidthHalf, _canvasHeightHalf );\n\
\t\t_clearRect.set( - _canvasWidthHalf, - _canvasHeightHalf, _canvasWidthHalf, _canvasHeightHalf );\n\
\n\
\t\t_contextGlobalAlpha = 1;\n\
\t\t_contextGlobalCompositeOperation = 0;\n\
\t\t_contextStrokeStyle = null;\n\
\t\t_contextFillStyle = null;\n\
\t\t_contextLineWidth = null;\n\
\t\t_contextLineCap = null;\n\
\t\t_contextLineJoin = null;\n\
\n\
\t};\n\
\n\
\tthis.setClearColor = function ( color, opacity ) {\n\
\n\
\t\t_clearColor.copy( color );\n\
\t\t_clearOpacity = opacity !== undefined ? opacity : 1;\n\
\n\
\t\t_clearRect.set( - _canvasWidthHalf, - _canvasHeightHalf, _canvasWidthHalf, _canvasHeightHalf );\n\
\n\
\t};\n\
\n\
\tthis.setClearColorHex = function ( hex, opacity ) {\n\
\n\
\t\t_clearColor.setHex( hex );\n\
\t\t_clearOpacity = opacity !== undefined ? opacity : 1;\n\
\n\
\t\t_clearRect.set( - _canvasWidthHalf, - _canvasHeightHalf, _canvasWidthHalf, _canvasHeightHalf );\n\
\n\
\t};\n\
\n\
\tthis.getMaxAnisotropy  = function () {\n\
\n\
\t\treturn 0;\n\
\n\
\t};\n\
\n\
\tthis.clear = function () {\n\
\n\
\t\t_context.setTransform( 1, 0, 0, - 1, _canvasWidthHalf, _canvasHeightHalf );\n\
\n\
\t\tif ( _clearRect.isEmpty() === false ) {\n\
\n\
\t\t\t_clearRect.minSelf( _clipRect );\n\
\t\t\t_clearRect.inflate( 2 );\n\
\n\
\t\t\tif ( _clearOpacity < 1 ) {\n\
\n\
\t\t\t\t_context.clearRect( Math.floor( _clearRect.getX() ), Math.floor( _clearRect.getY() ), Math.floor( _clearRect.getWidth() ), Math.floor( _clearRect.getHeight() ) );\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( _clearOpacity > 0 ) {\n\
\n\
\t\t\t\tsetBlending( THREE.NormalBlending );\n\
\t\t\t\tsetOpacity( 1 );\n\
\n\
\t\t\t\tsetFillStyle( 'rgba(' + Math.floor( _clearColor.r * 255 ) + ',' + Math.floor( _clearColor.g * 255 ) + ',' + Math.floor( _clearColor.b * 255 ) + ',' + _clearOpacity + ')' );\n\
\n\
\t\t\t\t_context.fillRect( Math.floor( _clearRect.getX() ), Math.floor( _clearRect.getY() ), Math.floor( _clearRect.getWidth() ), Math.floor( _clearRect.getHeight() ) );\n\
\n\
\t\t\t}\n\
\n\
\t\t\t_clearRect.empty();\n\
\n\
\t\t}\n\
\n\
\n\
\t};\n\
\n\
\tthis.render = function ( scene, camera ) {\n\
\n\
\t\tif ( camera instanceof THREE.Camera === false ) {\n\
\n\
\t\t\tconsole.error( 'THREE.CanvasRenderer.render: camera is not an instance of THREE.Camera.' );\n\
\t\t\treturn;\n\
\n\
\t\t}\n\
\n\
\t\tvar e, el, element, material;\n\
\n\
\t\tthis.autoClear === true ? this.clear() : _context.setTransform( 1, 0, 0, - 1, _canvasWidthHalf, _canvasHeightHalf );\n\
\n\
\t\t_this.info.render.vertices = 0;\n\
\t\t_this.info.render.faces = 0;\n\
\n\
\t\t_renderData = _projector.projectScene( scene, camera, this.sortObjects, this.sortElements );\n\
\t\t_elements = _renderData.elements;\n\
\t\t_lights = _renderData.lights;\n\
\n\
\t\t/* DEBUG\n\
\t\t_context.fillStyle = 'rgba( 0, 255, 255, 0.5 )';\n\
\t\t_context.fillRect( _clipRect.getX(), _clipRect.getY(), _clipRect.getWidth(), _clipRect.getHeight() );\n\
\t\t*/\n\
\n\
\t\t_enableLighting = _lights.length > 0;\n\
\n\
\t\tif ( _enableLighting === true ) {\n\
\n\
\t\t\t calculateLights();\n\
\n\
\t\t}\n\
\n\
\t\tfor ( e = 0, el = _elements.length; e < el; e++ ) {\n\
\n\
\t\t\telement = _elements[ e ];\n\
\n\
\t\t\tmaterial = element.material;\n\
\n\
\t\t\tif ( material === undefined || material.visible === false ) continue;\n\
\n\
\t\t\t_bboxRect.empty();\n\
\n\
\t\t\tif ( element instanceof THREE.RenderableParticle ) {\n\
\n\
\t\t\t\t_v1 = element;\n\
\t\t\t\t_v1.x *= _canvasWidthHalf; _v1.y *= _canvasHeightHalf;\n\
\n\
\t\t\t\trenderParticle( _v1, element, material, scene );\n\
\n\
\t\t\t} else if ( element instanceof THREE.RenderableLine ) {\n\
\n\
\t\t\t\t_v1 = element.v1; _v2 = element.v2;\n\
\n\
\t\t\t\t_v1.positionScreen.x *= _canvasWidthHalf; _v1.positionScreen.y *= _canvasHeightHalf;\n\
\t\t\t\t_v2.positionScreen.x *= _canvasWidthHalf; _v2.positionScreen.y *= _canvasHeightHalf;\n\
\n\
\t\t\t\t_bboxRect.addPoint( _v1.positionScreen.x, _v1.positionScreen.y );\n\
\t\t\t\t_bboxRect.addPoint( _v2.positionScreen.x, _v2.positionScreen.y );\n\
\n\
\t\t\t\tif ( _clipRect.intersects( _bboxRect ) === true ) {\n\
\n\
\t\t\t\t\trenderLine( _v1, _v2, element, material, scene );\n\
\n\
\t\t\t\t}\n\
\n\
\n\
\t\t\t} else if ( element instanceof THREE.RenderableFace3 ) {\n\
\n\
\t\t\t\t_v1 = element.v1; _v2 = element.v2; _v3 = element.v3;\n\
\n\
\t\t\t\t_v1.positionScreen.x *= _canvasWidthHalf; _v1.positionScreen.y *= _canvasHeightHalf;\n\
\t\t\t\t_v2.positionScreen.x *= _canvasWidthHalf; _v2.positionScreen.y *= _canvasHeightHalf;\n\
\t\t\t\t_v3.positionScreen.x *= _canvasWidthHalf; _v3.positionScreen.y *= _canvasHeightHalf;\n\
\n\
\t\t\t\tif ( material.overdraw === true ) {\n\
\n\
\t\t\t\t\texpand( _v1.positionScreen, _v2.positionScreen );\n\
\t\t\t\t\texpand( _v2.positionScreen, _v3.positionScreen );\n\
\t\t\t\t\texpand( _v3.positionScreen, _v1.positionScreen );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\t_bboxRect.add3Points( _v1.positionScreen.x, _v1.positionScreen.y,\n\
\t\t\t\t\t\t      _v2.positionScreen.x, _v2.positionScreen.y,\n\
\t\t\t\t\t\t      _v3.positionScreen.x, _v3.positionScreen.y );\n\
\n\
\t\t\t\tif ( _clipRect.intersects( _bboxRect ) === true ) {\n\
\n\
\t\t\t\t\trenderFace3( _v1, _v2, _v3, 0, 1, 2, element, material, scene );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t} else if ( element instanceof THREE.RenderableFace4 ) {\n\
\n\
\t\t\t\t_v1 = element.v1; _v2 = element.v2; _v3 = element.v3; _v4 = element.v4;\n\
\n\
\t\t\t\t_v1.positionScreen.x *= _canvasWidthHalf; _v1.positionScreen.y *= _canvasHeightHalf;\n\
\t\t\t\t_v2.positionScreen.x *= _canvasWidthHalf; _v2.positionScreen.y *= _canvasHeightHalf;\n\
\t\t\t\t_v3.positionScreen.x *= _canvasWidthHalf; _v3.positionScreen.y *= _canvasHeightHalf;\n\
\t\t\t\t_v4.positionScreen.x *= _canvasWidthHalf; _v4.positionScreen.y *= _canvasHeightHalf;\n\
\n\
\t\t\t\t_v5.positionScreen.copy( _v2.positionScreen );\n\
\t\t\t\t_v6.positionScreen.copy( _v4.positionScreen );\n\
\n\
\t\t\t\tif ( material.overdraw === true ) {\n\
\n\
\t\t\t\t\texpand( _v1.positionScreen, _v2.positionScreen );\n\
\t\t\t\t\texpand( _v2.positionScreen, _v4.positionScreen );\n\
\t\t\t\t\texpand( _v4.positionScreen, _v1.positionScreen );\n\
\n\
\t\t\t\t\texpand( _v3.positionScreen, _v5.positionScreen );\n\
\t\t\t\t\texpand( _v3.positionScreen, _v6.positionScreen );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\t_bboxRect.addPoint( _v1.positionScreen.x, _v1.positionScreen.y );\n\
\t\t\t\t_bboxRect.addPoint( _v2.positionScreen.x, _v2.positionScreen.y );\n\
\t\t\t\t_bboxRect.addPoint( _v3.positionScreen.x, _v3.positionScreen.y );\n\
\t\t\t\t_bboxRect.addPoint( _v4.positionScreen.x, _v4.positionScreen.y );\n\
\n\
\t\t\t\tif ( _clipRect.intersects( _bboxRect ) === true ) {\n\
\n\
\t\t\t\t\trenderFace4( _v1, _v2, _v3, _v4, _v5, _v6, element, material, scene );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t\t/* DEBUG\n\
\t\t\t_context.lineWidth = 1;\n\
\t\t\t_context.strokeStyle = 'rgba( 0, 255, 0, 0.5 )';\n\
\t\t\t_context.strokeRect( _bboxRect.getX(), _bboxRect.getY(), _bboxRect.getWidth(), _bboxRect.getHeight() );\n\
\t\t\t*/\n\
\n\
\t\t\t_clearRect.addRectangle( _bboxRect );\n\
\n\
\n\
\t\t}\n\
\n\
\t\t/* DEBUG\n\
\t\t_context.lineWidth = 1;\n\
\t\t_context.strokeStyle = 'rgba( 255, 0, 0, 0.5 )';\n\
\t\t_context.strokeRect( _clearRect.getX(), _clearRect.getY(), _clearRect.getWidth(), _clearRect.getHeight() );\n\
\t\t*/\n\
\n\
\t\t_context.setTransform( 1, 0, 0, 1, 0, 0 );\n\
\n\
\t\t//\n\
\n\
\t\tfunction calculateLights() {\n\
\n\
\t\t\t_ambientLight.setRGB( 0, 0, 0 );\n\
\t\t\t_directionalLights.setRGB( 0, 0, 0 );\n\
\t\t\t_pointLights.setRGB( 0, 0, 0 );\n\
\n\
\t\t\tfor ( var l = 0, ll = _lights.length; l < ll; l ++ ) {\n\
\n\
\t\t\t\tvar light = _lights[ l ];\n\
\t\t\t\tvar lightColor = light.color;\n\
\n\
\t\t\t\tif ( light instanceof THREE.AmbientLight ) {\n\
\n\
\t\t\t\t\t_ambientLight.r += lightColor.r;\n\
\t\t\t\t\t_ambientLight.g += lightColor.g;\n\
\t\t\t\t\t_ambientLight.b += lightColor.b;\n\
\n\
\t\t\t\t} else if ( light instanceof THREE.DirectionalLight ) {\n\
\n\
\t\t\t\t\t// for particles\n\
\n\
\t\t\t\t\t_directionalLights.r += lightColor.r;\n\
\t\t\t\t\t_directionalLights.g += lightColor.g;\n\
\t\t\t\t\t_directionalLights.b += lightColor.b;\n\
\n\
\t\t\t\t} else if ( light instanceof THREE.PointLight ) {\n\
\n\
\t\t\t\t\t// for particles\n\
\n\
\t\t\t\t\t_pointLights.r += lightColor.r;\n\
\t\t\t\t\t_pointLights.g += lightColor.g;\n\
\t\t\t\t\t_pointLights.b += lightColor.b;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tfunction calculateLight( position, normal, color ) {\n\
\n\
\t\t\tfor ( var l = 0, ll = _lights.length; l < ll; l ++ ) {\n\
\n\
\t\t\t\tvar light = _lights[ l ];\n\
\t\t\t\tvar lightColor = light.color;\n\
\n\
\t\t\t\tif ( light instanceof THREE.DirectionalLight ) {\n\
\n\
\t\t\t\t\tvar lightPosition = light.matrixWorld.getPosition().normalize();\n\
\n\
\t\t\t\t\tvar amount = normal.dot( lightPosition );\n\
\n\
\t\t\t\t\tif ( amount <= 0 ) continue;\n\
\n\
\t\t\t\t\tamount *= light.intensity;\n\
\n\
\t\t\t\t\tcolor.r += lightColor.r * amount;\n\
\t\t\t\t\tcolor.g += lightColor.g * amount;\n\
\t\t\t\t\tcolor.b += lightColor.b * amount;\n\
\n\
\t\t\t\t} else if ( light instanceof THREE.PointLight ) {\n\
\n\
\t\t\t\t\tvar lightPosition = light.matrixWorld.getPosition();\n\
\n\
\t\t\t\t\tvar amount = normal.dot( _vector3.sub( lightPosition, position ).normalize() );\n\
\n\
\t\t\t\t\tif ( amount <= 0 ) continue;\n\
\n\
\t\t\t\t\tamount *= light.distance == 0 ? 1 : 1 - Math.min( position.distanceTo( lightPosition ) / light.distance, 1 );\n\
\n\
\t\t\t\t\tif ( amount == 0 ) continue;\n\
\n\
\t\t\t\t\tamount *= light.intensity;\n\
\n\
\t\t\t\t\tcolor.r += lightColor.r * amount;\n\
\t\t\t\t\tcolor.g += lightColor.g * amount;\n\
\t\t\t\t\tcolor.b += lightColor.b * amount;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tfunction renderParticle( v1, element, material, scene ) {\n\
\n\
\t\t\tsetOpacity( material.opacity );\n\
\t\t\tsetBlending( material.blending );\n\
\n\
\t\t\tvar width, height, scaleX, scaleY,\n\
\t\t\tbitmap, bitmapWidth, bitmapHeight;\n\
\n\
\t\t\tif ( material instanceof THREE.ParticleBasicMaterial ) {\n\
\n\
\t\t\t\tif ( material.map === null ) {\n\
\n\
\t\t\t\t\tscaleX = element.object.scale.x;\n\
\t\t\t\t\tscaleY = element.object.scale.y;\n\
\n\
\t\t\t\t\t// TODO: Be able to disable this\n\
\n\
\t\t\t\t\tscaleX *= element.scale.x * _canvasWidthHalf;\n\
\t\t\t\t\tscaleY *= element.scale.y * _canvasHeightHalf;\n\
\n\
\t\t\t\t\t_bboxRect.set( v1.x - scaleX, v1.y - scaleY, v1.x  + scaleX, v1.y + scaleY );\n\
\n\
\t\t\t\t\tif ( _clipRect.intersects( _bboxRect ) === false ) {\n\
\n\
\t\t\t\t\t\treturn;\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\tsetFillStyle( material.color.getContextStyle() );\n\
\n\
\t\t\t\t\t_context.save();\n\
\t\t\t\t\t_context.translate( v1.x, v1.y );\n\
\t\t\t\t\t_context.rotate( - element.rotation );\n\
\t\t\t\t\t_context.scale( scaleX, scaleY );\n\
\t\t\t\t\t_context.fillRect( -1, -1, 2, 2 );\n\
\t\t\t\t\t_context.restore();\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\tbitmap = material.map.image;\n\
\t\t\t\t\tbitmapWidth = bitmap.width >> 1;\n\
\t\t\t\t\tbitmapHeight = bitmap.height >> 1;\n\
\n\
\t\t\t\t\tscaleX = element.scale.x * _canvasWidthHalf;\n\
\t\t\t\t\tscaleY = element.scale.y * _canvasHeightHalf;\n\
\n\
\t\t\t\t\twidth = scaleX * bitmapWidth;\n\
\t\t\t\t\theight = scaleY * bitmapHeight;\n\
\n\
\t\t\t\t\t// TODO: Rotations break this...\n\
\n\
\t\t\t\t\t_bboxRect.set( v1.x - width, v1.y - height, v1.x  + width, v1.y + height );\n\
\n\
\t\t\t\t\tif ( _clipRect.intersects( _bboxRect ) === false ) {\n\
\n\
\t\t\t\t\t\treturn;\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\t_context.save();\n\
\t\t\t\t\t_context.translate( v1.x, v1.y );\n\
\t\t\t\t\t_context.rotate( - element.rotation );\n\
\t\t\t\t\t_context.scale( scaleX, - scaleY );\n\
\n\
\t\t\t\t\t_context.translate( - bitmapWidth, - bitmapHeight );\n\
\t\t\t\t\t_context.drawImage( bitmap, 0, 0 );\n\
\t\t\t\t\t_context.restore();\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\t/* DEBUG\n\
\t\t\t\tsetStrokeStyle( 'rgb(255,255,0)' );\n\
\t\t\t\t_context.beginPath();\n\
\t\t\t\t_context.moveTo( v1.x - 10, v1.y );\n\
\t\t\t\t_context.lineTo( v1.x + 10, v1.y );\n\
\t\t\t\t_context.moveTo( v1.x, v1.y - 10 );\n\
\t\t\t\t_context.lineTo( v1.x, v1.y + 10 );\n\
\t\t\t\t_context.stroke();\n\
\t\t\t\t*/\n\
\n\
\t\t\t} else if ( material instanceof THREE.ParticleCanvasMaterial ) {\n\
\n\
\t\t\t\twidth = element.scale.x * _canvasWidthHalf;\n\
\t\t\t\theight = element.scale.y * _canvasHeightHalf;\n\
\n\
\t\t\t\t_bboxRect.set( v1.x - width, v1.y - height, v1.x + width, v1.y + height );\n\
\n\
\t\t\t\tif ( _clipRect.intersects( _bboxRect ) === false ) {\n\
\n\
\t\t\t\t\treturn;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tsetStrokeStyle( material.color.getContextStyle() );\n\
\t\t\t\tsetFillStyle( material.color.getContextStyle() );\n\
\n\
\t\t\t\t_context.save();\n\
\t\t\t\t_context.translate( v1.x, v1.y );\n\
\t\t\t\t_context.rotate( - element.rotation );\n\
\t\t\t\t_context.scale( width, height );\n\
\n\
\t\t\t\tmaterial.program( _context );\n\
\n\
\t\t\t\t_context.restore();\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tfunction renderLine( v1, v2, element, material, scene ) {\n\
\n\
\t\t\tsetOpacity( material.opacity );\n\
\t\t\tsetBlending( material.blending );\n\
\n\
\t\t\t_context.beginPath();\n\
\t\t\t_context.moveTo( v1.positionScreen.x, v1.positionScreen.y );\n\
\t\t\t_context.lineTo( v2.positionScreen.x, v2.positionScreen.y );\n\
\n\
\t\t\tif ( material instanceof THREE.LineBasicMaterial ) {\n\
\n\
\t\t\t\tsetLineWidth( material.linewidth );\n\
\t\t\t\tsetLineCap( material.linecap );\n\
\t\t\t\tsetLineJoin( material.linejoin );\n\
\t\t\t\tsetStrokeStyle( material.color.getContextStyle() );\n\
\n\
\t\t\t\t_context.stroke();\n\
\t\t\t\t_bboxRect.inflate( material.linewidth * 2 );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tfunction renderFace3( v1, v2, v3, uv1, uv2, uv3, element, material, scene ) {\n\
\n\
\t\t\t_this.info.render.vertices += 3;\n\
\t\t\t_this.info.render.faces ++;\n\
\n\
\t\t\tsetOpacity( material.opacity );\n\
\t\t\tsetBlending( material.blending );\n\
\n\
\t\t\t_v1x = v1.positionScreen.x; _v1y = v1.positionScreen.y;\n\
\t\t\t_v2x = v2.positionScreen.x; _v2y = v2.positionScreen.y;\n\
\t\t\t_v3x = v3.positionScreen.x; _v3y = v3.positionScreen.y;\n\
\n\
\t\t\tdrawTriangle( _v1x, _v1y, _v2x, _v2y, _v3x, _v3y );\n\
\n\
\t\t\tif ( ( material instanceof THREE.MeshLambertMaterial || material instanceof THREE.MeshPhongMaterial ) && material.map === null && material.map === null ) {\n\
\n\
\t\t\t\tif ( _enableLighting === true ) {\n\
\n\
\t\t\t\t\tvar diffuse = material.color;\n\
\t\t\t\t\tvar emissive = material.emissive;\n\
\n\
\t\t\t\t\tif ( material.wireframe === false && material.shading == THREE.SmoothShading && element.vertexNormalsLength == 3 ) {\n\
\n\
\t\t\t\t\t\t_color1.r = _color2.r = _color3.r = _ambientLight.r;\n\
\t\t\t\t\t\t_color1.g = _color2.g = _color3.g = _ambientLight.g;\n\
\t\t\t\t\t\t_color1.b = _color2.b = _color3.b = _ambientLight.b;\n\
\n\
\t\t\t\t\t\tcalculateLight( element.v1.positionWorld, element.vertexNormalsWorld[ 0 ], _color1 );\n\
\t\t\t\t\t\tcalculateLight( element.v2.positionWorld, element.vertexNormalsWorld[ 1 ], _color2 );\n\
\t\t\t\t\t\tcalculateLight( element.v3.positionWorld, element.vertexNormalsWorld[ 2 ], _color3 );\n\
\n\
\t\t\t\t\t\t_color1.r = diffuse.r * _color1.r + emissive.r;\n\
\t\t\t\t\t\t_color1.g = diffuse.g * _color1.g + emissive.g;\n\
\t\t\t\t\t\t_color1.b = diffuse.b * _color1.b + emissive.b;\n\
\n\
\t\t\t\t\t\t_color2.r = diffuse.r * _color2.r + emissive.r;\n\
\t\t\t\t\t\t_color2.g = diffuse.g * _color2.g + emissive.g;\n\
\t\t\t\t\t\t_color2.b = diffuse.b * _color2.b + emissive.b;\n\
\n\
\t\t\t\t\t\t_color3.r = diffuse.r * _color3.r + emissive.r;\n\
\t\t\t\t\t\t_color3.g = diffuse.g * _color3.g + emissive.g;\n\
\t\t\t\t\t\t_color3.b = diffuse.b * _color3.b + emissive.b;\n\
\n\
\t\t\t\t\t\t_color4.r = ( _color2.r + _color3.r ) * 0.5;\n\
\t\t\t\t\t\t_color4.g = ( _color2.g + _color3.g ) * 0.5;\n\
\t\t\t\t\t\t_color4.b = ( _color2.b + _color3.b ) * 0.5;\n\
\n\
\t\t\t\t\t\t_image = getGradientTexture( _color1, _color2, _color3, _color4 );\n\
\n\
\t\t\t\t\t\tclipImage( _v1x, _v1y, _v2x, _v2y, _v3x, _v3y, 0, 0, 1, 0, 0, 1, _image );\n\
\n\
\t\t\t\t\t} else {\n\
\n\
\t\t\t\t\t\t_color.r = _ambientLight.r;\n\
\t\t\t\t\t\t_color.g = _ambientLight.g;\n\
\t\t\t\t\t\t_color.b = _ambientLight.b;\n\
\n\
\t\t\t\t\t\tcalculateLight( element.centroidWorld, element.normalWorld, _color );\n\
\n\
\t\t\t\t\t\t_color.r = diffuse.r * _color.r + emissive.r;\n\
\t\t\t\t\t\t_color.g = diffuse.g * _color.g + emissive.g;\n\
\t\t\t\t\t\t_color.b = diffuse.b * _color.b + emissive.b;\n\
\n\
\t\t\t\t\t\tmaterial.wireframe === true ? strokePath( _color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin ) : fillPath( _color );\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\tmaterial.wireframe === true ? strokePath( material.color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin ) : fillPath( material.color );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t} else if ( material instanceof THREE.MeshBasicMaterial || material instanceof THREE.MeshLambertMaterial || material instanceof THREE.MeshPhongMaterial ) {\n\
\n\
\t\t\t\tif ( material.map !== null ) {\n\
\n\
\t\t\t\t\tif ( material.map.mapping instanceof THREE.UVMapping ) {\n\
\n\
\t\t\t\t\t\t_uvs = element.uvs[ 0 ];\n\
\t\t\t\t\t\tpatternPath( _v1x, _v1y, _v2x, _v2y, _v3x, _v3y, _uvs[ uv1 ].u, _uvs[ uv1 ].v, _uvs[ uv2 ].u, _uvs[ uv2 ].v, _uvs[ uv3 ].u, _uvs[ uv3 ].v, material.map );\n\
\n\
\t\t\t\t\t}\n\
\n\
\n\
\t\t\t\t} else if ( material.envMap !== null ) {\n\
\n\
\t\t\t\t\tif ( material.envMap.mapping instanceof THREE.SphericalReflectionMapping ) {\n\
\n\
\t\t\t\t\t\tvar cameraMatrix = camera.matrixWorldInverse;\n\
\n\
\t\t\t\t\t\t_vector3.copy( element.vertexNormalsWorld[ uv1 ] );\n\
\t\t\t\t\t\t_uv1x = ( _vector3.x * cameraMatrix.elements[0] + _vector3.y * cameraMatrix.elements[4] + _vector3.z * cameraMatrix.elements[8] ) * 0.5 + 0.5;\n\
\t\t\t\t\t\t_uv1y = ( _vector3.x * cameraMatrix.elements[1] + _vector3.y * cameraMatrix.elements[5] + _vector3.z * cameraMatrix.elements[9] ) * 0.5 + 0.5;\n\
\n\
\t\t\t\t\t\t_vector3.copy( element.vertexNormalsWorld[ uv2 ] );\n\
\t\t\t\t\t\t_uv2x = ( _vector3.x * cameraMatrix.elements[0] + _vector3.y * cameraMatrix.elements[4] + _vector3.z * cameraMatrix.elements[8] ) * 0.5 + 0.5;\n\
\t\t\t\t\t\t_uv2y = ( _vector3.x * cameraMatrix.elements[1] + _vector3.y * cameraMatrix.elements[5] + _vector3.z * cameraMatrix.elements[9] ) * 0.5 + 0.5;\n\
\n\
\t\t\t\t\t\t_vector3.copy( element.vertexNormalsWorld[ uv3 ] );\n\
\t\t\t\t\t\t_uv3x = ( _vector3.x * cameraMatrix.elements[0] + _vector3.y * cameraMatrix.elements[4] + _vector3.z * cameraMatrix.elements[8] ) * 0.5 + 0.5;\n\
\t\t\t\t\t\t_uv3y = ( _vector3.x * cameraMatrix.elements[1] + _vector3.y * cameraMatrix.elements[5] + _vector3.z * cameraMatrix.elements[9] ) * 0.5 + 0.5;\n\
\n\
\t\t\t\t\t\tpatternPath( _v1x, _v1y, _v2x, _v2y, _v3x, _v3y, _uv1x, _uv1y, _uv2x, _uv2y, _uv3x, _uv3y, material.envMap );\n\
\n\
\t\t\t\t\t}/* else if ( material.envMap.mapping == THREE.SphericalRefractionMapping ) {\n\
\n\
\n\
\n\
\t\t\t\t\t}*/\n\
\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\tmaterial.wireframe === true ? strokePath( material.color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin ) : fillPath( material.color );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t} else if ( material instanceof THREE.MeshDepthMaterial ) {\n\
\n\
\t\t\t\t_near = camera.near;\n\
\t\t\t\t_far = camera.far;\n\
\n\
\t\t\t\t_color1.r = _color1.g = _color1.b = 1 - smoothstep( v1.positionScreen.z, _near, _far );\n\
\t\t\t\t_color2.r = _color2.g = _color2.b = 1 - smoothstep( v2.positionScreen.z, _near, _far );\n\
\t\t\t\t_color3.r = _color3.g = _color3.b = 1 - smoothstep( v3.positionScreen.z, _near, _far );\n\
\n\
\t\t\t\t_color4.r = ( _color2.r + _color3.r ) * 0.5;\n\
\t\t\t\t_color4.g = ( _color2.g + _color3.g ) * 0.5;\n\
\t\t\t\t_color4.b = ( _color2.b + _color3.b ) * 0.5;\n\
\n\
\t\t\t\t_image = getGradientTexture( _color1, _color2, _color3, _color4 );\n\
\n\
\t\t\t\tclipImage( _v1x, _v1y, _v2x, _v2y, _v3x, _v3y, 0, 0, 1, 0, 0, 1, _image );\n\
\n\
\t\t\t} else if ( material instanceof THREE.MeshNormalMaterial ) {\n\
\n\
\t\t\t\t_color.r = normalToComponent( element.normalWorld.x );\n\
\t\t\t\t_color.g = normalToComponent( element.normalWorld.y );\n\
\t\t\t\t_color.b = normalToComponent( element.normalWorld.z );\n\
\n\
\t\t\t\tmaterial.wireframe === true ? strokePath( _color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin ) : fillPath( _color );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tfunction renderFace4( v1, v2, v3, v4, v5, v6, element, material, scene ) {\n\
\n\
\t\t\t_this.info.render.vertices += 4;\n\
\t\t\t_this.info.render.faces ++;\n\
\n\
\t\t\tsetOpacity( material.opacity );\n\
\t\t\tsetBlending( material.blending );\n\
\n\
\t\t\tif ( ( material.map !== undefined && material.map !== null ) || ( material.envMap !== undefined && material.envMap !== null ) ) {\n\
\n\
\t\t\t\t// Let renderFace3() handle this\n\
\n\
\t\t\t\trenderFace3( v1, v2, v4, 0, 1, 3, element, material, scene );\n\
\t\t\t\trenderFace3( v5, v3, v6, 1, 2, 3, element, material, scene );\n\
\n\
\t\t\t\treturn;\n\
\n\
\t\t\t}\n\
\n\
\t\t\t_v1x = v1.positionScreen.x; _v1y = v1.positionScreen.y;\n\
\t\t\t_v2x = v2.positionScreen.x; _v2y = v2.positionScreen.y;\n\
\t\t\t_v3x = v3.positionScreen.x; _v3y = v3.positionScreen.y;\n\
\t\t\t_v4x = v4.positionScreen.x; _v4y = v4.positionScreen.y;\n\
\t\t\t_v5x = v5.positionScreen.x; _v5y = v5.positionScreen.y;\n\
\t\t\t_v6x = v6.positionScreen.x; _v6y = v6.positionScreen.y;\n\
\n\
\t\t\tif ( material instanceof THREE.MeshLambertMaterial || material instanceof THREE.MeshPhongMaterial ) {\n\
\n\
\t\t\t\tif ( _enableLighting === true ) {\n\
\n\
\t\t\t\t\tvar diffuse = material.color;\n\
\t\t\t\t\tvar emissive = material.emissive;\n\
\n\
\t\t\t\t\tif ( material.wireframe === false && material.shading == THREE.SmoothShading && element.vertexNormalsLength == 4 ) {\n\
\n\
\t\t\t\t\t\t_color1.r = _color2.r = _color3.r = _color4.r = _ambientLight.r;\n\
\t\t\t\t\t\t_color1.g = _color2.g = _color3.g = _color4.g = _ambientLight.g;\n\
\t\t\t\t\t\t_color1.b = _color2.b = _color3.b = _color4.b = _ambientLight.b;\n\
\n\
\t\t\t\t\t\tcalculateLight( element.v1.positionWorld, element.vertexNormalsWorld[ 0 ], _color1 );\n\
\t\t\t\t\t\tcalculateLight( element.v2.positionWorld, element.vertexNormalsWorld[ 1 ], _color2 );\n\
\t\t\t\t\t\tcalculateLight( element.v4.positionWorld, element.vertexNormalsWorld[ 3 ], _color3 );\n\
\t\t\t\t\t\tcalculateLight( element.v3.positionWorld, element.vertexNormalsWorld[ 2 ], _color4 );\n\
\n\
\t\t\t\t\t\t_color1.r = diffuse.r * _color1.r + emissive.r;\n\
\t\t\t\t\t\t_color1.g = diffuse.g * _color1.g + emissive.g;\n\
\t\t\t\t\t\t_color1.b = diffuse.b * _color1.b + emissive.b;\n\
\n\
\t\t\t\t\t\t_color2.r = diffuse.r * _color2.r + emissive.r;\n\
\t\t\t\t\t\t_color2.g = diffuse.g * _color2.g + emissive.g;\n\
\t\t\t\t\t\t_color2.b = diffuse.b * _color2.b + emissive.b;\n\
\n\
\t\t\t\t\t\t_color3.r = diffuse.r * _color3.r + emissive.r;\n\
\t\t\t\t\t\t_color3.g = diffuse.g * _color3.g + emissive.g;\n\
\t\t\t\t\t\t_color3.b = diffuse.b * _color3.b + emissive.b;\n\
\n\
\t\t\t\t\t\t_color4.r = diffuse.r * _color4.r + emissive.r;\n\
\t\t\t\t\t\t_color4.g = diffuse.g * _color4.g + emissive.g;\n\
\t\t\t\t\t\t_color4.b = diffuse.b * _color4.b + emissive.b;\n\
\n\
\t\t\t\t\t\t_image = getGradientTexture( _color1, _color2, _color3, _color4 );\n\
\n\
\t\t\t\t\t\t// TODO: UVs are incorrect, v4->v3?\n\
\n\
\t\t\t\t\t\tdrawTriangle( _v1x, _v1y, _v2x, _v2y, _v4x, _v4y );\n\
\t\t\t\t\t\tclipImage( _v1x, _v1y, _v2x, _v2y, _v4x, _v4y, 0, 0, 1, 0, 0, 1, _image );\n\
\n\
\t\t\t\t\t\tdrawTriangle( _v5x, _v5y, _v3x, _v3y, _v6x, _v6y );\n\
\t\t\t\t\t\tclipImage( _v5x, _v5y, _v3x, _v3y, _v6x, _v6y, 1, 0, 1, 1, 0, 1, _image );\n\
\n\
\t\t\t\t\t} else {\n\
\n\
\t\t\t\t\t\t_color.r = _ambientLight.r;\n\
\t\t\t\t\t\t_color.g = _ambientLight.g;\n\
\t\t\t\t\t\t_color.b = _ambientLight.b;\n\
\n\
\t\t\t\t\t\tcalculateLight( element.centroidWorld, element.normalWorld, _color );\n\
\n\
\t\t\t\t\t\t_color.r = diffuse.r * _color.r + emissive.r;\n\
\t\t\t\t\t\t_color.g = diffuse.g * _color.g + emissive.g;\n\
\t\t\t\t\t\t_color.b = diffuse.b * _color.b + emissive.b;\n\
\n\
\t\t\t\t\t\tdrawQuad( _v1x, _v1y, _v2x, _v2y, _v3x, _v3y, _v4x, _v4y );\n\
\n\
\t\t\t\t\t\tmaterial.wireframe === true ? strokePath( _color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin ) : fillPath( _color );\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\tdrawQuad( _v1x, _v1y, _v2x, _v2y, _v3x, _v3y, _v4x, _v4y );\n\
\n\
\t\t\t\t\tmaterial.wireframe === true ? strokePath( material.color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin ) : fillPath( material.color );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t} else if ( material instanceof THREE.MeshBasicMaterial ) {\n\
\n\
\t\t\t\tdrawQuad( _v1x, _v1y, _v2x, _v2y, _v3x, _v3y, _v4x, _v4y );\n\
\n\
\t\t\t\tmaterial.wireframe === true ? strokePath( material.color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin ) : fillPath( material.color );\n\
\n\
\t\t\t} else if ( material instanceof THREE.MeshNormalMaterial ) {\n\
\n\
\t\t\t\t_color.r = normalToComponent( element.normalWorld.x );\n\
\t\t\t\t_color.g = normalToComponent( element.normalWorld.y );\n\
\t\t\t\t_color.b = normalToComponent( element.normalWorld.z );\n\
\n\
\t\t\t\tdrawQuad( _v1x, _v1y, _v2x, _v2y, _v3x, _v3y, _v4x, _v4y );\n\
\n\
\t\t\t\tmaterial.wireframe === true ? strokePath( _color, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin ) : fillPath( _color );\n\
\n\
\t\t\t} else if ( material instanceof THREE.MeshDepthMaterial ) {\n\
\n\
\t\t\t\t_near = camera.near;\n\
\t\t\t\t_far = camera.far;\n\
\n\
\t\t\t\t_color1.r = _color1.g = _color1.b = 1 - smoothstep( v1.positionScreen.z, _near, _far );\n\
\t\t\t\t_color2.r = _color2.g = _color2.b = 1 - smoothstep( v2.positionScreen.z, _near, _far );\n\
\t\t\t\t_color3.r = _color3.g = _color3.b = 1 - smoothstep( v4.positionScreen.z, _near, _far );\n\
\t\t\t\t_color4.r = _color4.g = _color4.b = 1 - smoothstep( v3.positionScreen.z, _near, _far );\n\
\n\
\t\t\t\t_image = getGradientTexture( _color1, _color2, _color3, _color4 );\n\
\n\
\t\t\t\t// TODO: UVs are incorrect, v4->v3?\n\
\n\
\t\t\t\tdrawTriangle( _v1x, _v1y, _v2x, _v2y, _v4x, _v4y );\n\
\t\t\t\tclipImage( _v1x, _v1y, _v2x, _v2y, _v4x, _v4y, 0, 0, 1, 0, 0, 1, _image );\n\
\n\
\t\t\t\tdrawTriangle( _v5x, _v5y, _v3x, _v3y, _v6x, _v6y );\n\
\t\t\t\tclipImage( _v5x, _v5y, _v3x, _v3y, _v6x, _v6y, 1, 0, 1, 1, 0, 1, _image );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\t//\n\
\n\
\t\tfunction drawTriangle( x0, y0, x1, y1, x2, y2 ) {\n\
\n\
\t\t\t_context.beginPath();\n\
\t\t\t_context.moveTo( x0, y0 );\n\
\t\t\t_context.lineTo( x1, y1 );\n\
\t\t\t_context.lineTo( x2, y2 );\n\
\t\t\t_context.closePath();\n\
\n\
\t\t}\n\
\n\
\t\tfunction drawQuad( x0, y0, x1, y1, x2, y2, x3, y3 ) {\n\
\n\
\t\t\t_context.beginPath();\n\
\t\t\t_context.moveTo( x0, y0 );\n\
\t\t\t_context.lineTo( x1, y1 );\n\
\t\t\t_context.lineTo( x2, y2 );\n\
\t\t\t_context.lineTo( x3, y3 );\n\
\t\t\t_context.closePath();\n\
\n\
\t\t}\n\
\n\
\t\tfunction strokePath( color, linewidth, linecap, linejoin ) {\n\
\n\
\t\t\tsetLineWidth( linewidth );\n\
\t\t\tsetLineCap( linecap );\n\
\t\t\tsetLineJoin( linejoin );\n\
\t\t\tsetStrokeStyle( color.getContextStyle() );\n\
\n\
\t\t\t_context.stroke();\n\
\n\
\t\t\t_bboxRect.inflate( linewidth * 2 );\n\
\n\
\t\t}\n\
\n\
\t\tfunction fillPath( color ) {\n\
\n\
\t\t\tsetFillStyle( color.getContextStyle() );\n\
\t\t\t_context.fill();\n\
\n\
\t\t}\n\
\n\
\t\tfunction patternPath( x0, y0, x1, y1, x2, y2, u0, v0, u1, v1, u2, v2, texture ) {\n\
\n\
\t\t\tif ( texture instanceof THREE.DataTexture || texture.image === undefined || texture.image.width == 0 ) return;\n\
\n\
\t\t\tif ( texture.needsUpdate === true ) {\n\
\n\
\t\t\t\tvar repeatX = texture.wrapS == THREE.RepeatWrapping;\n\
\t\t\t\tvar repeatY = texture.wrapT == THREE.RepeatWrapping;\n\
\n\
\t\t\t\t_patterns[ texture.id ] = _context.createPattern(\n\
\t\t\t\t\ttexture.image, repeatX === true && repeatY === true\n\
\t\t\t\t\t\t? 'repeat'\n\
\t\t\t\t\t\t: repeatX === true && repeatY === false\n\
\t\t\t\t\t\t\t? 'repeat-x'\n\
\t\t\t\t\t\t\t: repeatX === false && repeatY === true\n\
\t\t\t\t\t\t\t\t? 'repeat-y'\n\
\t\t\t\t\t\t\t\t: 'no-repeat'\n\
\t\t\t\t);\n\
\n\
\t\t\t\ttexture.needsUpdate = false;\n\
\n\
\t\t\t}\n\
\n\
\t\t\t_patterns[ texture.id ] === undefined\n\
\t\t\t\t? setFillStyle( 'rgba(0,0,0,1)' )\n\
\t\t\t\t: setFillStyle( _patterns[ texture.id ] );\n\
\n\
\t\t\t// http://extremelysatisfactorytotalitarianism.com/blog/?p=2120\n\
\n\
\t\t\tvar a, b, c, d, e, f, det, idet,\n\
\t\t\toffsetX = texture.offset.x / texture.repeat.x,\n\
\t\t\toffsetY = texture.offset.y / texture.repeat.y,\n\
\t\t\twidth = texture.image.width * texture.repeat.x,\n\
\t\t\theight = texture.image.height * texture.repeat.y;\n\
\n\
\t\t\tu0 = ( u0 + offsetX ) * width;\n\
\t\t\tv0 = ( 1.0 - v0 + offsetY ) * height;\n\
\n\
\t\t\tu1 = ( u1 + offsetX ) * width;\n\
\t\t\tv1 = ( 1.0 - v1 + offsetY ) * height;\n\
\n\
\t\t\tu2 = ( u2 + offsetX ) * width;\n\
\t\t\tv2 = ( 1.0 - v2 + offsetY ) * height;\n\
\n\
\t\t\tx1 -= x0; y1 -= y0;\n\
\t\t\tx2 -= x0; y2 -= y0;\n\
\n\
\t\t\tu1 -= u0; v1 -= v0;\n\
\t\t\tu2 -= u0; v2 -= v0;\n\
\n\
\t\t\tdet = u1 * v2 - u2 * v1;\n\
\n\
\t\t\tif ( det === 0 ) {\n\
\n\
\t\t\t\tif ( _imagedatas[ texture.id ] === undefined ) {\n\
\n\
\t\t\t\t\tvar canvas = document.createElement( 'canvas' )\n\
\t\t\t\t\tcanvas.width = texture.image.width;\n\
\t\t\t\t\tcanvas.height = texture.image.height;\n\
\n\
\t\t\t\t\tvar context = canvas.getContext( '2d' );\n\
\t\t\t\t\tcontext.drawImage( texture.image, 0, 0 );\n\
\n\
\t\t\t\t\t_imagedatas[ texture.id ] = context.getImageData( 0, 0, texture.image.width, texture.image.height ).data;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tvar data = _imagedatas[ texture.id ];\n\
\t\t\t\tvar index = ( Math.floor( u0 ) + Math.floor( v0 ) * texture.image.width ) * 4;\n\
\n\
\t\t\t\t_color.setRGB( data[ index ] / 255, data[ index + 1 ] / 255, data[ index + 2 ] / 255 );\n\
\t\t\t\tfillPath( _color );\n\
\n\
\t\t\t\treturn;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tidet = 1 / det;\n\
\n\
\t\t\ta = ( v2 * x1 - v1 * x2 ) * idet;\n\
\t\t\tb = ( v2 * y1 - v1 * y2 ) * idet;\n\
\t\t\tc = ( u1 * x2 - u2 * x1 ) * idet;\n\
\t\t\td = ( u1 * y2 - u2 * y1 ) * idet;\n\
\n\
\t\t\te = x0 - a * u0 - c * v0;\n\
\t\t\tf = y0 - b * u0 - d * v0;\n\
\n\
\t\t\t_context.save();\n\
\t\t\t_context.transform( a, b, c, d, e, f );\n\
\t\t\t_context.fill();\n\
\t\t\t_context.restore();\n\
\n\
\t\t}\n\
\n\
\t\tfunction clipImage( x0, y0, x1, y1, x2, y2, u0, v0, u1, v1, u2, v2, image ) {\n\
\n\
\t\t\t// http://extremelysatisfactorytotalitarianism.com/blog/?p=2120\n\
\n\
\t\t\tvar a, b, c, d, e, f, det, idet,\n\
\t\t\twidth = image.width - 1,\n\
\t\t\theight = image.height - 1;\n\
\n\
\t\t\tu0 *= width; v0 *= height;\n\
\t\t\tu1 *= width; v1 *= height;\n\
\t\t\tu2 *= width; v2 *= height;\n\
\n\
\t\t\tx1 -= x0; y1 -= y0;\n\
\t\t\tx2 -= x0; y2 -= y0;\n\
\n\
\t\t\tu1 -= u0; v1 -= v0;\n\
\t\t\tu2 -= u0; v2 -= v0;\n\
\n\
\t\t\tdet = u1 * v2 - u2 * v1;\n\
\n\
\t\t\tidet = 1 / det;\n\
\n\
\t\t\ta = ( v2 * x1 - v1 * x2 ) * idet;\n\
\t\t\tb = ( v2 * y1 - v1 * y2 ) * idet;\n\
\t\t\tc = ( u1 * x2 - u2 * x1 ) * idet;\n\
\t\t\td = ( u1 * y2 - u2 * y1 ) * idet;\n\
\n\
\t\t\te = x0 - a * u0 - c * v0;\n\
\t\t\tf = y0 - b * u0 - d * v0;\n\
\n\
\t\t\t_context.save();\n\
\t\t\t_context.transform( a, b, c, d, e, f );\n\
\t\t\t_context.clip();\n\
\t\t\t_context.drawImage( image, 0, 0 );\n\
\t\t\t_context.restore();\n\
\n\
\t\t}\n\
\n\
\t\tfunction getGradientTexture( color1, color2, color3, color4 ) {\n\
\n\
\t\t\t// http://mrdoob.com/blog/post/710\n\
\n\
\t\t\t_pixelMapData[ 0 ] = ( color1.r * 255 ) | 0;\n\
\t\t\t_pixelMapData[ 1 ] = ( color1.g * 255 ) | 0;\n\
\t\t\t_pixelMapData[ 2 ] = ( color1.b * 255 ) | 0;\n\
\n\
\t\t\t_pixelMapData[ 4 ] = ( color2.r * 255 ) | 0;\n\
\t\t\t_pixelMapData[ 5 ] = ( color2.g * 255 ) | 0;\n\
\t\t\t_pixelMapData[ 6 ] = ( color2.b * 255 ) | 0;\n\
\n\
\t\t\t_pixelMapData[ 8 ] = ( color3.r * 255 ) | 0;\n\
\t\t\t_pixelMapData[ 9 ] = ( color3.g * 255 ) | 0;\n\
\t\t\t_pixelMapData[ 10 ] = ( color3.b * 255 ) | 0;\n\
\n\
\t\t\t_pixelMapData[ 12 ] = ( color4.r * 255 ) | 0;\n\
\t\t\t_pixelMapData[ 13 ] = ( color4.g * 255 ) | 0;\n\
\t\t\t_pixelMapData[ 14 ] = ( color4.b * 255 ) | 0;\n\
\n\
\t\t\t_pixelMapContext.putImageData( _pixelMapImage, 0, 0 );\n\
\t\t\t_gradientMapContext.drawImage( _pixelMap, 0, 0 );\n\
\n\
\t\t\treturn _gradientMap;\n\
\n\
\t\t}\n\
\n\
\t\tfunction smoothstep( value, min, max ) {\n\
\n\
\t\t\tvar x = ( value - min ) / ( max - min );\n\
\t\t\treturn x * x * ( 3 - 2 * x );\n\
\n\
\t\t}\n\
\n\
\t\tfunction normalToComponent( normal ) {\n\
\n\
\t\t\tvar component = ( normal + 1 ) * 0.5;\n\
\t\t\treturn component < 0 ? 0 : ( component > 1 ? 1 : component );\n\
\n\
\t\t}\n\
\n\
\t\t// Hide anti-alias gaps\n\
\n\
\t\tfunction expand( v1, v2 ) {\n\
\n\
\t\t\tvar x = v2.x - v1.x, y =  v2.y - v1.y,\n\
\t\t\tdet = x * x + y * y, idet;\n\
\n\
\t\t\tif ( det === 0 ) return;\n\
\n\
\t\t\tidet = 1 / Math.sqrt( det );\n\
\n\
\t\t\tx *= idet; y *= idet;\n\
\n\
\t\t\tv2.x += x; v2.y += y;\n\
\t\t\tv1.x -= x; v1.y -= y;\n\
\n\
\t\t}\n\
\t};\n\
\n\
\t// Context cached methods.\n\
\n\
\tfunction setOpacity( value ) {\n\
\n\
\t\tif ( _contextGlobalAlpha !== value ) {\n\
\n\
\t\t\t_context.globalAlpha = value;\n\
\t\t\t_contextGlobalAlpha = value;\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\tfunction setBlending( value ) {\n\
\n\
\t\tif ( _contextGlobalCompositeOperation !== value ) {\n\
\n\
\t\t\tif ( value === THREE.NormalBlending ) {\n\
\n\
\t\t\t\t_context.globalCompositeOperation = 'source-over';\n\
\n\
\t\t\t} else if ( value === THREE.AdditiveBlending ) {\n\
\n\
\t\t\t\t_context.globalCompositeOperation = 'lighter';\n\
\n\
\t\t\t} else if ( value === THREE.SubtractiveBlending ) {\n\
\n\
\t\t\t\t_context.globalCompositeOperation = 'darker';\n\
\n\
\t\t\t}\n\
\n\
\t\t\t_contextGlobalCompositeOperation = value;\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\tfunction setLineWidth( value ) {\n\
\n\
\t\tif ( _contextLineWidth !== value ) {\n\
\n\
\t\t\t_context.lineWidth = value;\n\
\t\t\t_contextLineWidth = value;\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\tfunction setLineCap( value ) {\n\
\n\
\t\t// \"butt\", \"round\", \"square\"\n\
\n\
\t\tif ( _contextLineCap !== value ) {\n\
\n\
\t\t\t_context.lineCap = value;\n\
\t\t\t_contextLineCap = value;\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\tfunction setLineJoin( value ) {\n\
\n\
\t\t// \"round\", \"bevel\", \"miter\"\n\
\n\
\t\tif ( _contextLineJoin !== value ) {\n\
\n\
\t\t\t_context.lineJoin = value;\n\
\t\t\t_contextLineJoin = value;\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\tfunction setStrokeStyle( value ) {\n\
\n\
\t\tif ( _contextStrokeStyle !== value ) {\n\
\n\
\t\t\t_context.strokeStyle = value;\n\
\t\t\t_contextStrokeStyle = value;\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\tfunction setFillStyle( value ) {\n\
\n\
\t\tif ( _contextFillStyle !== value ) {\n\
\n\
\t\t\t_context.fillStyle = value;\n\
\t\t\t_contextFillStyle = value;\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
};\n\
/**\n\
 * @author alteredq / http://alteredqualia.com/\n\
 * @author mrdoob / http://mrdoob.com/\n\
 * @author mikael emtinger / http://gomo.se/\n\
 */\n\
\n\
THREE.ShaderChunk = {\n\
\n\
\t// FOG\n\
\n\
\tfog_pars_fragment: [\n\
\n\
\t\t\"#ifdef USE_FOG\",\n\
\n\
\t\t\t\"uniform vec3 fogColor;\",\n\
\n\
\t\t\t\"#ifdef FOG_EXP2\",\n\
\n\
\t\t\t\t\"uniform float fogDensity;\",\n\
\n\
\t\t\t\"#else\",\n\
\n\
\t\t\t\t\"uniform float fogNear;\",\n\
\t\t\t\t\"uniform float fogFar;\",\n\
\n\
\t\t\t\"#endif\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\tfog_fragment: [\n\
\n\
\t\t\"#ifdef USE_FOG\",\n\
\n\
\t\t\t\"float depth = gl_FragCoord.z / gl_FragCoord.w;\",\n\
\n\
\t\t\t\"#ifdef FOG_EXP2\",\n\
\n\
\t\t\t\t\"const float LOG2 = 1.442695;\",\n\
\t\t\t\t\"float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\",\n\
\t\t\t\t\"fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\",\n\
\n\
\t\t\t\"#else\",\n\
\n\
\t\t\t\t\"float fogFactor = smoothstep( fogNear, fogFar, depth );\",\n\
\n\
\t\t\t\"#endif\",\n\
\n\
\t\t\t\"gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\t// ENVIRONMENT MAP\n\
\n\
\tenvmap_pars_fragment: [\n\
\n\
\t\t\"#ifdef USE_ENVMAP\",\n\
\n\
\t\t\t\"uniform float reflectivity;\",\n\
\t\t\t\"uniform samplerCube envMap;\",\n\
\t\t\t\"uniform float flipEnvMap;\",\n\
\t\t\t\"uniform int combine;\",\n\
\n\
\t\t\t\"#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\",\n\
\n\
\t\t\t\t\"uniform bool useRefract;\",\n\
\t\t\t\t\"uniform float refractionRatio;\",\n\
\n\
\t\t\t\"#else\",\n\
\n\
\t\t\t\t\"varying vec3 vReflect;\",\n\
\n\
\t\t\t\"#endif\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\tenvmap_fragment: [\n\
\n\
\t\t\"#ifdef USE_ENVMAP\",\n\
\n\
\t\t\t\"vec3 reflectVec;\",\n\
\n\
\t\t\t\"#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\",\n\
\n\
\t\t\t\t\"vec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\",\n\
\n\
\t\t\t\t\"if ( useRefract ) {\",\n\
\n\
\t\t\t\t\t\"reflectVec = refract( cameraToVertex, normal, refractionRatio );\",\n\
\n\
\t\t\t\t\"} else { \",\n\
\n\
\t\t\t\t\t\"reflectVec = reflect( cameraToVertex, normal );\",\n\
\n\
\t\t\t\t\"}\",\n\
\n\
\t\t\t\"#else\",\n\
\n\
\t\t\t\t\"reflectVec = vReflect;\",\n\
\n\
\t\t\t\"#endif\",\n\
\n\
\t\t\t\"#ifdef DOUBLE_SIDED\",\n\
\n\
\t\t\t\t\"float flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );\",\n\
\t\t\t\t\"vec4 cubeColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\",\n\
\n\
\t\t\t\"#else\",\n\
\n\
\t\t\t\t\"vec4 cubeColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\",\n\
\n\
\t\t\t\"#endif\",\n\
\n\
\t\t\t\"#ifdef GAMMA_INPUT\",\n\
\n\
\t\t\t\t\"cubeColor.xyz *= cubeColor.xyz;\",\n\
\n\
\t\t\t\"#endif\",\n\
\n\
\t\t\t\"if ( combine == 1 ) {\",\n\
\n\
\t\t\t\t\"gl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularStrength * reflectivity );\",\n\
\n\
\t\t\t\"} else {\",\n\
\n\
\t\t\t\t\"gl_FragColor.xyz = mix( gl_FragColor.xyz, gl_FragColor.xyz * cubeColor.xyz, specularStrength * reflectivity );\",\n\
\n\
\t\t\t\"}\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\tenvmap_pars_vertex: [\n\
\n\
\t\t\"#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )\",\n\
\n\
\t\t\t\"varying vec3 vReflect;\",\n\
\n\
\t\t\t\"uniform float refractionRatio;\",\n\
\t\t\t\"uniform bool useRefract;\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\tworldpos_vertex : [\n\
\n\
\t\t\"#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( LAMBERT ) || defined ( USE_SHADOWMAP )\",\n\
\n\
\t\t\t\"#ifdef USE_SKINNING\",\n\
\n\
\t\t\t\t\"vec4 mPosition = modelMatrix * skinned;\",\n\
\n\
\t\t\t\"#endif\",\n\
\n\
\t\t\t\"#if defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )\",\n\
\n\
\t\t\t\t\"vec4 mPosition = modelMatrix * vec4( morphed, 1.0 );\",\n\
\n\
\t\t\t\"#endif\",\n\
\n\
\t\t\t\"#if ! defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )\",\n\
\n\
\t\t\t\t\"vec4 mPosition = modelMatrix * vec4( position, 1.0 );\",\n\
\n\
\t\t\t\"#endif\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\tenvmap_vertex : [\n\
\n\
\t\t\"#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )\",\n\
\n\
\t\t\t\"vec3 nWorld = mat3( modelMatrix[ 0 ].xyz, modelMatrix[ 1 ].xyz, modelMatrix[ 2 ].xyz ) * objectNormal;\",\n\
\n\
\t\t\t\"if ( useRefract ) {\",\n\
\n\
\t\t\t\t\"vReflect = refract( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ), refractionRatio );\",\n\
\n\
\t\t\t\"} else {\",\n\
\n\
\t\t\t\t\"vReflect = reflect( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ) );\",\n\
\n\
\t\t\t\"}\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\t// COLOR MAP (particles)\n\
\n\
\tmap_particle_pars_fragment: [\n\
\n\
\t\t\"#ifdef USE_MAP\",\n\
\n\
\t\t\t\"uniform sampler2D map;\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\n\
\tmap_particle_fragment: [\n\
\n\
\t\t\"#ifdef USE_MAP\",\n\
\n\
\t\t\t\"gl_FragColor = gl_FragColor * texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) );\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\t// COLOR MAP (triangles)\n\
\n\
\tmap_pars_vertex: [\n\
\n\
\t\t\"#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\",\n\
\n\
\t\t\t\"varying vec2 vUv;\",\n\
\t\t\t\"uniform vec4 offsetRepeat;\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\tmap_pars_fragment: [\n\
\n\
\t\t\"#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\",\n\
\n\
\t\t\t\"varying vec2 vUv;\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"#ifdef USE_MAP\",\n\
\n\
\t\t\t\"uniform sampler2D map;\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\tmap_vertex: [\n\
\n\
\t\t\"#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\",\n\
\n\
\t\t\t\"vUv = uv * offsetRepeat.zw + offsetRepeat.xy;\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\tmap_fragment: [\n\
\n\
\t\t\"#ifdef USE_MAP\",\n\
\n\
\t\t\t\"#ifdef GAMMA_INPUT\",\n\
\n\
\t\t\t\t\"vec4 texelColor = texture2D( map, vUv );\",\n\
\t\t\t\t\"texelColor.xyz *= texelColor.xyz;\",\n\
\n\
\t\t\t\t\"gl_FragColor = gl_FragColor * texelColor;\",\n\
\n\
\t\t\t\"#else\",\n\
\n\
\t\t\t\t\"gl_FragColor = gl_FragColor * texture2D( map, vUv );\",\n\
\n\
\t\t\t\"#endif\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\t// LIGHT MAP\n\
\n\
\tlightmap_pars_fragment: [\n\
\n\
\t\t\"#ifdef USE_LIGHTMAP\",\n\
\n\
\t\t\t\"varying vec2 vUv2;\",\n\
\t\t\t\"uniform sampler2D lightMap;\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\tlightmap_pars_vertex: [\n\
\n\
\t\t\"#ifdef USE_LIGHTMAP\",\n\
\n\
\t\t\t\"varying vec2 vUv2;\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\tlightmap_fragment: [\n\
\n\
\t\t\"#ifdef USE_LIGHTMAP\",\n\
\n\
\t\t\t\"gl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\tlightmap_vertex: [\n\
\n\
\t\t\"#ifdef USE_LIGHTMAP\",\n\
\n\
\t\t\t\"vUv2 = uv2;\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\t// BUMP MAP\n\
\n\
\tbumpmap_pars_fragment: [\n\
\n\
\t\t\"#ifdef USE_BUMPMAP\",\n\
\n\
\t\t\t\"uniform sampler2D bumpMap;\",\n\
\t\t\t\"uniform float bumpScale;\",\n\
\n\
\t\t\t// Derivative maps - bump mapping unparametrized surfaces by Morten Mikkelsen\n\
\t\t\t//\thttp://mmikkelsen3d.blogspot.sk/2011/07/derivative-maps.html\n\
\n\
\t\t\t// Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)\n\
\n\
\t\t\t\"vec2 dHdxy_fwd() {\",\n\
\n\
\t\t\t\t\"vec2 dSTdx = dFdx( vUv );\",\n\
\t\t\t\t\"vec2 dSTdy = dFdy( vUv );\",\n\
\n\
\t\t\t\t\"float Hll = bumpScale * texture2D( bumpMap, vUv ).x;\",\n\
\t\t\t\t\"float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\",\n\
\t\t\t\t\"float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\",\n\
\n\
\t\t\t\t\"return vec2( dBx, dBy );\",\n\
\n\
\t\t\t\"}\",\n\
\n\
\t\t\t\"vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\",\n\
\n\
\t\t\t\t\"vec3 vSigmaX = dFdx( surf_pos );\",\n\
\t\t\t\t\"vec3 vSigmaY = dFdy( surf_pos );\",\n\
\t\t\t\t\"vec3 vN = surf_norm;\",\t\t// normalized\n\
\n\
\t\t\t\t\"vec3 R1 = cross( vSigmaY, vN );\",\n\
\t\t\t\t\"vec3 R2 = cross( vN, vSigmaX );\",\n\
\n\
\t\t\t\t\"float fDet = dot( vSigmaX, R1 );\",\n\
\n\
\t\t\t\t\"vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\",\n\
\t\t\t\t\"return normalize( abs( fDet ) * surf_norm - vGrad );\",\n\
\n\
\t\t\t\"}\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\t// NORMAL MAP\n\
\n\
\tnormalmap_pars_fragment: [\n\
\n\
\t\t\"#ifdef USE_NORMALMAP\",\n\
\n\
\t\t\t\"uniform sampler2D normalMap;\",\n\
\t\t\t\"uniform vec2 normalScale;\",\n\
\n\
\t\t\t// Per-Pixel Tangent Space Normal Mapping\n\
\t\t\t// http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html\n\
\n\
\t\t\t\"vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\",\n\
\n\
\t\t\t\t\"vec3 q0 = dFdx( eye_pos.xyz );\",\n\
\t\t\t\t\"vec3 q1 = dFdy( eye_pos.xyz );\",\n\
\t\t\t\t\"vec2 st0 = dFdx( vUv.st );\",\n\
\t\t\t\t\"vec2 st1 = dFdy( vUv.st );\",\n\
\n\
\t\t\t\t\"vec3 S = normalize(  q0 * st1.t - q1 * st0.t );\",\n\
\t\t\t\t\"vec3 T = normalize( -q0 * st1.s + q1 * st0.s );\",\n\
\t\t\t\t\"vec3 N = normalize( surf_norm );\",\n\
\n\
\t\t\t\t\"vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\",\n\
\t\t\t\t\"mapN.xy = normalScale * mapN.xy;\",\n\
\t\t\t\t\"mat3 tsn = mat3( S, T, N );\",\n\
\t\t\t\t\"return normalize( tsn * mapN );\",\n\
\n\
\t\t\t\"}\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\t// SPECULAR MAP\n\
\n\
\tspecularmap_pars_fragment: [\n\
\n\
\t\t\"#ifdef USE_SPECULARMAP\",\n\
\n\
\t\t\t\"uniform sampler2D specularMap;\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\tspecularmap_fragment: [\n\
\n\
\t\t\"float specularStrength;\",\n\
\n\
\t\t\"#ifdef USE_SPECULARMAP\",\n\
\n\
\t\t\t\"vec4 texelSpecular = texture2D( specularMap, vUv );\",\n\
\t\t\t\"specularStrength = texelSpecular.r;\",\n\
\n\
\t\t\"#else\",\n\
\n\
\t\t\t\"specularStrength = 1.0;\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\t// LIGHTS LAMBERT\n\
\n\
\tlights_lambert_pars_vertex: [\n\
\n\
\t\t\"uniform vec3 ambient;\",\n\
\t\t\"uniform vec3 diffuse;\",\n\
\t\t\"uniform vec3 emissive;\",\n\
\n\
\t\t\"uniform vec3 ambientLightColor;\",\n\
\n\
\t\t\"#if MAX_DIR_LIGHTS > 0\",\n\
\n\
\t\t\t\"uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\",\n\
\t\t\t\"uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"#if MAX_HEMI_LIGHTS > 0\",\n\
\n\
\t\t\t\"uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\",\n\
\t\t\t\"uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\",\n\
\t\t\t\"uniform vec3 hemisphereLightPosition[ MAX_HEMI_LIGHTS ];\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"#if MAX_POINT_LIGHTS > 0\",\n\
\n\
\t\t\t\"uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\",\n\
\t\t\t\"uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\",\n\
\t\t\t\"uniform float pointLightDistance[ MAX_POINT_LIGHTS ];\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"#if MAX_SPOT_LIGHTS > 0\",\n\
\n\
\t\t\t\"uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\",\n\
\t\t\t\"uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\",\n\
\t\t\t\"uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\",\n\
\t\t\t\"uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\",\n\
\t\t\t\"uniform float spotLightAngle[ MAX_SPOT_LIGHTS ];\",\n\
\t\t\t\"uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"#ifdef WRAP_AROUND\",\n\
\n\
\t\t\t\"uniform vec3 wrapRGB;\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\tlights_lambert_vertex: [\n\
\n\
\t\t\"vLightFront = vec3( 0.0 );\",\n\
\n\
\t\t\"#ifdef DOUBLE_SIDED\",\n\
\n\
\t\t\t\"vLightBack = vec3( 0.0 );\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"transformedNormal = normalize( transformedNormal );\",\n\
\n\
\t\t\"#if MAX_DIR_LIGHTS > 0\",\n\
\n\
\t\t\"for( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\",\n\
\n\
\t\t\t\"vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\",\n\
\t\t\t\"vec3 dirVector = normalize( lDirection.xyz );\",\n\
\n\
\t\t\t\"float dotProduct = dot( transformedNormal, dirVector );\",\n\
\t\t\t\"vec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );\",\n\
\n\
\t\t\t\"#ifdef DOUBLE_SIDED\",\n\
\n\
\t\t\t\t\"vec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\",\n\
\n\
\t\t\t\t\"#ifdef WRAP_AROUND\",\n\
\n\
\t\t\t\t\t\"vec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\",\n\
\n\
\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\"#endif\",\n\
\n\
\t\t\t\"#ifdef WRAP_AROUND\",\n\
\n\
\t\t\t\t\"vec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\",\n\
\t\t\t\t\"directionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );\",\n\
\n\
\t\t\t\t\"#ifdef DOUBLE_SIDED\",\n\
\n\
\t\t\t\t\t\"directionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );\",\n\
\n\
\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\"#endif\",\n\
\n\
\t\t\t\"vLightFront += directionalLightColor[ i ] * directionalLightWeighting;\",\n\
\n\
\t\t\t\"#ifdef DOUBLE_SIDED\",\n\
\n\
\t\t\t\t\"vLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;\",\n\
\n\
\t\t\t\"#endif\",\n\
\n\
\t\t\"}\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"#if MAX_POINT_LIGHTS > 0\",\n\
\n\
\t\t\t\"for( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\",\n\
\n\
\t\t\t\t\"vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\",\n\
\t\t\t\t\"vec3 lVector = lPosition.xyz - mvPosition.xyz;\",\n\
\n\
\t\t\t\t\"float lDistance = 1.0;\",\n\
\t\t\t\t\"if ( pointLightDistance[ i ] > 0.0 )\",\n\
\t\t\t\t\t\"lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\",\n\
\n\
\t\t\t\t\"lVector = normalize( lVector );\",\n\
\t\t\t\t\"float dotProduct = dot( transformedNormal, lVector );\",\n\
\n\
\t\t\t\t\"vec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );\",\n\
\n\
\t\t\t\t\"#ifdef DOUBLE_SIDED\",\n\
\n\
\t\t\t\t\t\"vec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\",\n\
\n\
\t\t\t\t\t\"#ifdef WRAP_AROUND\",\n\
\n\
\t\t\t\t\t\t\"vec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\",\n\
\n\
\t\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\"#ifdef WRAP_AROUND\",\n\
\n\
\t\t\t\t\t\"vec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\",\n\
\t\t\t\t\t\"pointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );\",\n\
\n\
\t\t\t\t\t\"#ifdef DOUBLE_SIDED\",\n\
\n\
\t\t\t\t\t\t\"pointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );\",\n\
\n\
\t\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\"vLightFront += pointLightColor[ i ] * pointLightWeighting * lDistance;\",\n\
\n\
\t\t\t\t\"#ifdef DOUBLE_SIDED\",\n\
\n\
\t\t\t\t\t\"vLightBack += pointLightColor[ i ] * pointLightWeightingBack * lDistance;\",\n\
\n\
\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\"}\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"#if MAX_SPOT_LIGHTS > 0\",\n\
\n\
\t\t\t\"for( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\",\n\
\n\
\t\t\t\t\"vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\",\n\
\t\t\t\t\"vec3 lVector = lPosition.xyz - mvPosition.xyz;\",\n\
\n\
\t\t\t\t\"lVector = normalize( lVector );\",\n\
\n\
\t\t\t\t\"float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - mPosition.xyz ) );\",\n\
\n\
\t\t\t\t\"if ( spotEffect > spotLightAngle[ i ] ) {\",\n\
\n\
\t\t\t\t\t\"spotEffect = pow( spotEffect, spotLightExponent[ i ] );\",\n\
\n\
\t\t\t\t\t\"float lDistance = 1.0;\",\n\
\t\t\t\t\t\"if ( spotLightDistance[ i ] > 0.0 )\",\n\
\t\t\t\t\t\t\"lDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\",\n\
\n\
\t\t\t\t\t\"float dotProduct = dot( transformedNormal, lVector );\",\n\
\t\t\t\t\t\"vec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );\",\n\
\n\
\t\t\t\t\t\"#ifdef DOUBLE_SIDED\",\n\
\n\
\t\t\t\t\t\t\"vec3 spotLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\",\n\
\n\
\t\t\t\t\t\t\"#ifdef WRAP_AROUND\",\n\
\n\
\t\t\t\t\t\t\t\"vec3 spotLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\",\n\
\n\
\t\t\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\t\"#ifdef WRAP_AROUND\",\n\
\n\
\t\t\t\t\t\t\"vec3 spotLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\",\n\
\t\t\t\t\t\t\"spotLightWeighting = mix( spotLightWeighting, spotLightWeightingHalf, wrapRGB );\",\n\
\n\
\t\t\t\t\t\t\"#ifdef DOUBLE_SIDED\",\n\
\n\
\t\t\t\t\t\t\t\"spotLightWeightingBack = mix( spotLightWeightingBack, spotLightWeightingHalfBack, wrapRGB );\",\n\
\n\
\t\t\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\t\"vLightFront += spotLightColor[ i ] * spotLightWeighting * lDistance * spotEffect;\",\n\
\n\
\t\t\t\t\t\"#ifdef DOUBLE_SIDED\",\n\
\n\
\t\t\t\t\t\t\"vLightBack += spotLightColor[ i ] * spotLightWeightingBack * lDistance * spotEffect;\",\n\
\n\
\t\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\"}\",\n\
\n\
\t\t\t\"}\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"#if MAX_HEMI_LIGHTS > 0\",\n\
\n\
\t\t\t\"for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\",\n\
\n\
\t\t\t\t\"vec4 lPosition = viewMatrix * vec4( hemisphereLightPosition[ i ], 1.0 );\",\n\
\t\t\t\t\"vec3 lVector = lPosition.xyz - mvPosition.xyz;\",\n\
\n\
\t\t\t\t\"lVector = normalize( lVector );\",\n\
\n\
\t\t\t\t\"float dotProduct = dot( transformedNormal, lVector );\",\n\
\n\
\t\t\t\t\"float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\",\n\
\t\t\t\t\"float hemiDiffuseWeightBack = -0.5 * dotProduct + 0.5;\",\n\
\n\
\t\t\t\t\"vLightFront += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\",\n\
\n\
\t\t\t\t\"#ifdef DOUBLE_SIDED\",\n\
\n\
\t\t\t\t\t\"vLightBack += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeightBack );\",\n\
\n\
\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\"}\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"vLightFront = vLightFront * diffuse + ambient * ambientLightColor + emissive;\",\n\
\n\
\t\t\"#ifdef DOUBLE_SIDED\",\n\
\n\
\t\t\t\"vLightBack = vLightBack * diffuse + ambient * ambientLightColor + emissive;\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\t// LIGHTS PHONG\n\
\n\
\tlights_phong_pars_vertex: [\n\
\n\
\t\t\"#ifndef PHONG_PER_PIXEL\",\n\
\n\
\t\t\"#if MAX_POINT_LIGHTS > 0\",\n\
\n\
\t\t\t\"uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\",\n\
\t\t\t\"uniform float pointLightDistance[ MAX_POINT_LIGHTS ];\",\n\
\n\
\t\t\t\"varying vec4 vPointLight[ MAX_POINT_LIGHTS ];\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"#if MAX_SPOT_LIGHTS > 0\",\n\
\n\
\t\t\t\"uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\",\n\
\t\t\t\"uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\",\n\
\n\
\t\t\t\"varying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )\",\n\
\n\
\t\t\t\"varying vec3 vWorldPosition;\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\n\
\tlights_phong_vertex: [\n\
\n\
\t\t\"#ifndef PHONG_PER_PIXEL\",\n\
\n\
\t\t\"#if MAX_POINT_LIGHTS > 0\",\n\
\n\
\t\t\t\"for( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\",\n\
\n\
\t\t\t\t\"vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\",\n\
\t\t\t\t\"vec3 lVector = lPosition.xyz - mvPosition.xyz;\",\n\
\n\
\t\t\t\t\"float lDistance = 1.0;\",\n\
\t\t\t\t\"if ( pointLightDistance[ i ] > 0.0 )\",\n\
\t\t\t\t\t\"lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\",\n\
\n\
\t\t\t\t\"vPointLight[ i ] = vec4( lVector, lDistance );\",\n\
\n\
\t\t\t\"}\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"#if MAX_SPOT_LIGHTS > 0\",\n\
\n\
\t\t\t\"for( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\",\n\
\n\
\t\t\t\t\"vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\",\n\
\t\t\t\t\"vec3 lVector = lPosition.xyz - mvPosition.xyz;\",\n\
\n\
\t\t\t\t\"float lDistance = 1.0;\",\n\
\t\t\t\t\"if ( spotLightDistance[ i ] > 0.0 )\",\n\
\t\t\t\t\t\"lDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\",\n\
\n\
\t\t\t\t\"vSpotLight[ i ] = vec4( lVector, lDistance );\",\n\
\n\
\t\t\t\"}\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )\",\n\
\n\
\t\t\t\"vWorldPosition = mPosition.xyz;\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\tlights_phong_pars_fragment: [\n\
\n\
\t\t\"uniform vec3 ambientLightColor;\",\n\
\n\
\t\t\"#if MAX_DIR_LIGHTS > 0\",\n\
\n\
\t\t\t\"uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\",\n\
\t\t\t\"uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"#if MAX_HEMI_LIGHTS > 0\",\n\
\n\
\t\t\t\"uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\",\n\
\t\t\t\"uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\",\n\
\t\t\t\"uniform vec3 hemisphereLightPosition[ MAX_HEMI_LIGHTS ];\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"#if MAX_POINT_LIGHTS > 0\",\n\
\n\
\t\t\t\"uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\",\n\
\n\
\t\t\t\"#ifdef PHONG_PER_PIXEL\",\n\
\n\
\t\t\t\t\"uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\",\n\
\t\t\t\t\"uniform float pointLightDistance[ MAX_POINT_LIGHTS ];\",\n\
\n\
\t\t\t\"#else\",\n\
\n\
\t\t\t\t\"varying vec4 vPointLight[ MAX_POINT_LIGHTS ];\",\n\
\n\
\t\t\t\"#endif\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"#if MAX_SPOT_LIGHTS > 0\",\n\
\n\
\t\t\t\"uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\",\n\
\t\t\t\"uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\",\n\
\t\t\t\"uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\",\n\
\t\t\t\"uniform float spotLightAngle[ MAX_SPOT_LIGHTS ];\",\n\
\t\t\t\"uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\",\n\
\n\
\t\t\t\"#ifdef PHONG_PER_PIXEL\",\n\
\n\
\t\t\t\t\"uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\",\n\
\n\
\t\t\t\"#else\",\n\
\n\
\t\t\t\t\"varying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];\",\n\
\n\
\t\t\t\"#endif\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )\",\n\
\n\
\t\t\t\"varying vec3 vWorldPosition;\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"#ifdef WRAP_AROUND\",\n\
\n\
\t\t\t\"uniform vec3 wrapRGB;\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"varying vec3 vViewPosition;\",\n\
\t\t\"varying vec3 vNormal;\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\tlights_phong_fragment: [\n\
\n\
\t\t\"vec3 normal = normalize( vNormal );\",\n\
\t\t\"vec3 viewPosition = normalize( vViewPosition );\",\n\
\n\
\t\t\"#ifdef DOUBLE_SIDED\",\n\
\n\
\t\t\t\"normal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"#ifdef USE_NORMALMAP\",\n\
\n\
\t\t\t\"normal = perturbNormal2Arb( -viewPosition, normal );\",\n\
\n\
\t\t\"#elif defined( USE_BUMPMAP )\",\n\
\n\
\t\t\t\"normal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"#if MAX_POINT_LIGHTS > 0\",\n\
\n\
\t\t\t\"vec3 pointDiffuse  = vec3( 0.0 );\",\n\
\t\t\t\"vec3 pointSpecular = vec3( 0.0 );\",\n\
\n\
\t\t\t\"for ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\",\n\
\n\
\t\t\t\t\"#ifdef PHONG_PER_PIXEL\",\n\
\n\
\t\t\t\t\t\"vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\",\n\
\t\t\t\t\t\"vec3 lVector = lPosition.xyz + vViewPosition.xyz;\",\n\
\n\
\t\t\t\t\t\"float lDistance = 1.0;\",\n\
\t\t\t\t\t\"if ( pointLightDistance[ i ] > 0.0 )\",\n\
\t\t\t\t\t\t\"lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\",\n\
\n\
\t\t\t\t\t\"lVector = normalize( lVector );\",\n\
\n\
\t\t\t\t\"#else\",\n\
\n\
\t\t\t\t\t\"vec3 lVector = normalize( vPointLight[ i ].xyz );\",\n\
\t\t\t\t\t\"float lDistance = vPointLight[ i ].w;\",\n\
\n\
\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t// diffuse\n\
\n\
\t\t\t\t\"float dotProduct = dot( normal, lVector );\",\n\
\n\
\t\t\t\t\"#ifdef WRAP_AROUND\",\n\
\n\
\t\t\t\t\t\"float pointDiffuseWeightFull = max( dotProduct, 0.0 );\",\n\
\t\t\t\t\t\"float pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\",\n\
\n\
\t\t\t\t\t\"vec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\",\n\
\n\
\t\t\t\t\"#else\",\n\
\n\
\t\t\t\t\t\"float pointDiffuseWeight = max( dotProduct, 0.0 );\",\n\
\n\
\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\"pointDiffuse  += diffuse * pointLightColor[ i ] * pointDiffuseWeight * lDistance;\",\n\
\n\
\t\t\t\t// specular\n\
\n\
\t\t\t\t\"vec3 pointHalfVector = normalize( lVector + viewPosition );\",\n\
\t\t\t\t\"float pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\",\n\
\t\t\t\t\"float pointSpecularWeight = specularStrength * max( pow( pointDotNormalHalf, shininess ), 0.0 );\",\n\
\n\
\t\t\t\t\"#ifdef PHYSICALLY_BASED_SHADING\",\n\
\n\
\t\t\t\t\t// 2.0 => 2.0001 is hack to work around ANGLE bug\n\
\n\
\t\t\t\t\t\"float specularNormalization = ( shininess + 2.0001 ) / 8.0;\",\n\
\n\
\t\t\t\t\t\"vec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, pointHalfVector ), 5.0 );\",\n\
\t\t\t\t\t\"pointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance * specularNormalization;\",\n\
\n\
\t\t\t\t\"#else\",\n\
\n\
\t\t\t\t\t\"pointSpecular += specular * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance;\",\n\
\n\
\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\"}\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"#if MAX_SPOT_LIGHTS > 0\",\n\
\n\
\t\t\t\"vec3 spotDiffuse  = vec3( 0.0 );\",\n\
\t\t\t\"vec3 spotSpecular = vec3( 0.0 );\",\n\
\n\
\t\t\t\"for ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\",\n\
\n\
\t\t\t\t\"#ifdef PHONG_PER_PIXEL\",\n\
\n\
\t\t\t\t\t\"vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\",\n\
\t\t\t\t\t\"vec3 lVector = lPosition.xyz + vViewPosition.xyz;\",\n\
\n\
\t\t\t\t\t\"float lDistance = 1.0;\",\n\
\t\t\t\t\t\"if ( spotLightDistance[ i ] > 0.0 )\",\n\
\t\t\t\t\t\t\"lDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\",\n\
\n\
\t\t\t\t\t\"lVector = normalize( lVector );\",\n\
\n\
\t\t\t\t\"#else\",\n\
\n\
\t\t\t\t\t\"vec3 lVector = normalize( vSpotLight[ i ].xyz );\",\n\
\t\t\t\t\t\"float lDistance = vSpotLight[ i ].w;\",\n\
\n\
\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\"float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\",\n\
\n\
\t\t\t\t\"if ( spotEffect > spotLightAngle[ i ] ) {\",\n\
\n\
\t\t\t\t\t\"spotEffect = pow( spotEffect, spotLightExponent[ i ] );\",\n\
\n\
\t\t\t\t\t// diffuse\n\
\n\
\t\t\t\t\t\"float dotProduct = dot( normal, lVector );\",\n\
\n\
\t\t\t\t\t\"#ifdef WRAP_AROUND\",\n\
\n\
\t\t\t\t\t\t\"float spotDiffuseWeightFull = max( dotProduct, 0.0 );\",\n\
\t\t\t\t\t\t\"float spotDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\",\n\
\n\
\t\t\t\t\t\t\"vec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\",\n\
\n\
\t\t\t\t\t\"#else\",\n\
\n\
\t\t\t\t\t\t\"float spotDiffuseWeight = max( dotProduct, 0.0 );\",\n\
\n\
\t\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\t\"spotDiffuse += diffuse * spotLightColor[ i ] * spotDiffuseWeight * lDistance * spotEffect;\",\n\
\n\
\t\t\t\t\t// specular\n\
\n\
\t\t\t\t\t\"vec3 spotHalfVector = normalize( lVector + viewPosition );\",\n\
\t\t\t\t\t\"float spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\",\n\
\t\t\t\t\t\"float spotSpecularWeight = specularStrength * max( pow( spotDotNormalHalf, shininess ), 0.0 );\",\n\
\n\
\t\t\t\t\t\"#ifdef PHYSICALLY_BASED_SHADING\",\n\
\n\
\t\t\t\t\t\t// 2.0 => 2.0001 is hack to work around ANGLE bug\n\
\n\
\t\t\t\t\t\t\"float specularNormalization = ( shininess + 2.0001 ) / 8.0;\",\n\
\n\
\t\t\t\t\t\t\"vec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, spotHalfVector ), 5.0 );\",\n\
\t\t\t\t\t\t\"spotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * specularNormalization * spotEffect;\",\n\
\n\
\t\t\t\t\t\"#else\",\n\
\n\
\t\t\t\t\t\t\"spotSpecular += specular * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * spotEffect;\",\n\
\n\
\t\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\"}\",\n\
\n\
\t\t\t\"}\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"#if MAX_DIR_LIGHTS > 0\",\n\
\n\
\t\t\t\"vec3 dirDiffuse  = vec3( 0.0 );\",\n\
\t\t\t\"vec3 dirSpecular = vec3( 0.0 );\" ,\n\
\n\
\t\t\t\"for( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\",\n\
\n\
\t\t\t\t\"vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\",\n\
\t\t\t\t\"vec3 dirVector = normalize( lDirection.xyz );\",\n\
\n\
\t\t\t\t// diffuse\n\
\n\
\t\t\t\t\"float dotProduct = dot( normal, dirVector );\",\n\
\n\
\t\t\t\t\"#ifdef WRAP_AROUND\",\n\
\n\
\t\t\t\t\t\"float dirDiffuseWeightFull = max( dotProduct, 0.0 );\",\n\
\t\t\t\t\t\"float dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\",\n\
\n\
\t\t\t\t\t\"vec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );\",\n\
\n\
\t\t\t\t\"#else\",\n\
\n\
\t\t\t\t\t\"float dirDiffuseWeight = max( dotProduct, 0.0 );\",\n\
\n\
\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\"dirDiffuse  += diffuse * directionalLightColor[ i ] * dirDiffuseWeight;\",\n\
\n\
\t\t\t\t// specular\n\
\n\
\t\t\t\t\"vec3 dirHalfVector = normalize( dirVector + viewPosition );\",\n\
\t\t\t\t\"float dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\",\n\
\t\t\t\t\"float dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, shininess ), 0.0 );\",\n\
\n\
\t\t\t\t\"#ifdef PHYSICALLY_BASED_SHADING\",\n\
\n\
\t\t\t\t\t/*\n\
\t\t\t\t\t// fresnel term from skin shader\n\
\t\t\t\t\t\"const float F0 = 0.128;\",\n\
\n\
\t\t\t\t\t\"float base = 1.0 - dot( viewPosition, dirHalfVector );\",\n\
\t\t\t\t\t\"float exponential = pow( base, 5.0 );\",\n\
\n\
\t\t\t\t\t\"float fresnel = exponential + F0 * ( 1.0 - exponential );\",\n\
\t\t\t\t\t*/\n\
\n\
\t\t\t\t\t/*\n\
\t\t\t\t\t// fresnel term from fresnel shader\n\
\t\t\t\t\t\"const float mFresnelBias = 0.08;\",\n\
\t\t\t\t\t\"const float mFresnelScale = 0.3;\",\n\
\t\t\t\t\t\"const float mFresnelPower = 5.0;\",\n\
\n\
\t\t\t\t\t\"float fresnel = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( -viewPosition ), normal ), mFresnelPower );\",\n\
\t\t\t\t\t*/\n\
\n\
\t\t\t\t\t// 2.0 => 2.0001 is hack to work around ANGLE bug\n\
\n\
\t\t\t\t\t\"float specularNormalization = ( shininess + 2.0001 ) / 8.0;\",\n\
\n\
\t\t\t\t\t//\"dirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization * fresnel;\",\n\
\n\
\t\t\t\t\t\"vec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );\",\n\
\t\t\t\t\t\"dirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\",\n\
\n\
\t\t\t\t\"#else\",\n\
\n\
\t\t\t\t\t\"dirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight;\",\n\
\n\
\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\"}\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"#if MAX_HEMI_LIGHTS > 0\",\n\
\n\
\t\t\t\"vec3 hemiDiffuse  = vec3( 0.0 );\",\n\
\t\t\t\"vec3 hemiSpecular = vec3( 0.0 );\" ,\n\
\n\
\t\t\t\"for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\",\n\
\n\
\t\t\t\t\"vec4 lPosition = viewMatrix * vec4( hemisphereLightPosition[ i ], 1.0 );\",\n\
\t\t\t\t\"vec3 lVector = normalize( lPosition.xyz + vViewPosition.xyz );\",\n\
\n\
\t\t\t\t// diffuse\n\
\n\
\t\t\t\t\"float dotProduct = dot( normal, lVector );\",\n\
\t\t\t\t\"float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\",\n\
\n\
\t\t\t\t\"vec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\",\n\
\n\
\t\t\t\t\"hemiDiffuse += diffuse * hemiColor;\",\n\
\n\
\t\t\t\t// specular (sky light)\n\
\n\
\t\t\t\t\"vec3 hemiHalfVectorSky = normalize( lVector + viewPosition );\",\n\
\t\t\t\t\"float hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;\",\n\
\t\t\t\t\"float hemiSpecularWeightSky = specularStrength * max( pow( hemiDotNormalHalfSky, shininess ), 0.0 );\",\n\
\n\
\t\t\t\t// specular (ground light)\n\
\n\
\t\t\t\t\"vec3 lVectorGround = normalize( -lPosition.xyz + vViewPosition.xyz );\",\n\
\n\
\t\t\t\t\"vec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );\",\n\
\t\t\t\t\"float hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;\",\n\
\t\t\t\t\"float hemiSpecularWeightGround = specularStrength * max( pow( hemiDotNormalHalfGround, shininess ), 0.0 );\",\n\
\n\
\t\t\t\t\"#ifdef PHYSICALLY_BASED_SHADING\",\n\
\n\
\t\t\t\t\t\"float dotProductGround = dot( normal, lVectorGround );\",\n\
\n\
\t\t\t\t\t// 2.0 => 2.0001 is hack to work around ANGLE bug\n\
\n\
\t\t\t\t\t\"float specularNormalization = ( shininess + 2.0001 ) / 8.0;\",\n\
\n\
\t\t\t\t\t\"vec3 schlickSky = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, hemiHalfVectorSky ), 5.0 );\",\n\
\t\t\t\t\t\"vec3 schlickGround = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 5.0 );\",\n\
\t\t\t\t\t\"hemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );\",\n\
\n\
\t\t\t\t\"#else\",\n\
\n\
\t\t\t\t\t\"hemiSpecular += specular * hemiColor * ( hemiSpecularWeightSky + hemiSpecularWeightGround ) * hemiDiffuseWeight;\",\n\
\n\
\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\"}\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"vec3 totalDiffuse = vec3( 0.0 );\",\n\
\t\t\"vec3 totalSpecular = vec3( 0.0 );\",\n\
\n\
\t\t\"#if MAX_DIR_LIGHTS > 0\",\n\
\n\
\t\t\t\"totalDiffuse += dirDiffuse;\",\n\
\t\t\t\"totalSpecular += dirSpecular;\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"#if MAX_HEMI_LIGHTS > 0\",\n\
\n\
\t\t\t\"totalDiffuse += hemiDiffuse;\",\n\
\t\t\t\"totalSpecular += hemiSpecular;\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"#if MAX_POINT_LIGHTS > 0\",\n\
\n\
\t\t\t\"totalDiffuse += pointDiffuse;\",\n\
\t\t\t\"totalSpecular += pointSpecular;\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"#if MAX_SPOT_LIGHTS > 0\",\n\
\n\
\t\t\t\"totalDiffuse += spotDiffuse;\",\n\
\t\t\t\"totalSpecular += spotSpecular;\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"#ifdef METAL\",\n\
\n\
\t\t\t\"gl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient + totalSpecular );\",\n\
\n\
\t\t\"#else\",\n\
\n\
\t\t\t\"gl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient ) + totalSpecular;\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\t// VERTEX COLORS\n\
\n\
\tcolor_pars_fragment: [\n\
\n\
\t\t\"#ifdef USE_COLOR\",\n\
\n\
\t\t\t\"varying vec3 vColor;\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\n\
\tcolor_fragment: [\n\
\n\
\t\t\"#ifdef USE_COLOR\",\n\
\n\
\t\t\t\"gl_FragColor = gl_FragColor * vec4( vColor, opacity );\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\tcolor_pars_vertex: [\n\
\n\
\t\t\"#ifdef USE_COLOR\",\n\
\n\
\t\t\t\"varying vec3 vColor;\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\n\
\tcolor_vertex: [\n\
\n\
\t\t\"#ifdef USE_COLOR\",\n\
\n\
\t\t\t\"#ifdef GAMMA_INPUT\",\n\
\n\
\t\t\t\t\"vColor = color * color;\",\n\
\n\
\t\t\t\"#else\",\n\
\n\
\t\t\t\t\"vColor = color;\",\n\
\n\
\t\t\t\"#endif\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\t// SKINNING\n\
\n\
\tskinning_pars_vertex: [\n\
\n\
\t\t\"#ifdef USE_SKINNING\",\n\
\n\
\t\t\t\"#ifdef BONE_TEXTURE\",\n\
\n\
\t\t\t\t\"uniform sampler2D boneTexture;\",\n\
\n\
\t\t\t\t\"mat4 getBoneMatrix( const in float i ) {\",\n\
\n\
\t\t\t\t\t\"float j = i * 4.0;\",\n\
\t\t\t\t\t\"float x = mod( j, N_BONE_PIXEL_X );\",\n\
\t\t\t\t\t\"float y = floor( j / N_BONE_PIXEL_X );\",\n\
\n\
\t\t\t\t\t\"const float dx = 1.0 / N_BONE_PIXEL_X;\",\n\
\t\t\t\t\t\"const float dy = 1.0 / N_BONE_PIXEL_Y;\",\n\
\n\
\t\t\t\t\t\"y = dy * ( y + 0.5 );\",\n\
\n\
\t\t\t\t\t\"vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\",\n\
\t\t\t\t\t\"vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\",\n\
\t\t\t\t\t\"vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\",\n\
\t\t\t\t\t\"vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\",\n\
\n\
\t\t\t\t\t\"mat4 bone = mat4( v1, v2, v3, v4 );\",\n\
\n\
\t\t\t\t\t\"return bone;\",\n\
\n\
\t\t\t\t\"}\",\n\
\n\
\t\t\t\"#else\",\n\
\n\
\t\t\t\t\"uniform mat4 boneGlobalMatrices[ MAX_BONES ];\",\n\
\n\
\t\t\t\t\"mat4 getBoneMatrix( const in float i ) {\",\n\
\n\
\t\t\t\t\t\"mat4 bone = boneGlobalMatrices[ int(i) ];\",\n\
\t\t\t\t\t\"return bone;\",\n\
\n\
\t\t\t\t\"}\",\n\
\n\
\t\t\t\"#endif\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\tskinbase_vertex: [\n\
\n\
\t\t\"#ifdef USE_SKINNING\",\n\
\n\
\t\t\t\"mat4 boneMatX = getBoneMatrix( skinIndex.x );\",\n\
\t\t\t\"mat4 boneMatY = getBoneMatrix( skinIndex.y );\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\tskinning_vertex: [\n\
\n\
\t\t\"#ifdef USE_SKINNING\",\n\
\n\
\t\t\t\"#ifdef USE_MORPHTARGETS\",\n\
\n\
\t\t\t\"vec4 skinVertex = vec4( morphed, 1.0 );\",\n\
\n\
\t\t\t\"#else\",\n\
\n\
\t\t\t\"vec4 skinVertex = vec4( position, 1.0 );\",\n\
\n\
\t\t\t\"#endif\",\n\
\n\
\t\t\t\"vec4 skinned  = boneMatX * skinVertex * skinWeight.x;\",\n\
\t\t\t\"skinned \t  += boneMatY * skinVertex * skinWeight.y;\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\t// MORPHING\n\
\n\
\tmorphtarget_pars_vertex: [\n\
\n\
\t\t\"#ifdef USE_MORPHTARGETS\",\n\
\n\
\t\t\t\"#ifndef USE_MORPHNORMALS\",\n\
\n\
\t\t\t\"uniform float morphTargetInfluences[ 8 ];\",\n\
\n\
\t\t\t\"#else\",\n\
\n\
\t\t\t\"uniform float morphTargetInfluences[ 4 ];\",\n\
\n\
\t\t\t\"#endif\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\tmorphtarget_vertex: [\n\
\n\
\t\t\"#ifdef USE_MORPHTARGETS\",\n\
\n\
\t\t\t\"vec3 morphed = vec3( 0.0 );\",\n\
\t\t\t\"morphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\",\n\
\t\t\t\"morphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\",\n\
\t\t\t\"morphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\",\n\
\t\t\t\"morphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\",\n\
\n\
\t\t\t\"#ifndef USE_MORPHNORMALS\",\n\
\n\
\t\t\t\"morphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\",\n\
\t\t\t\"morphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\",\n\
\t\t\t\"morphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\",\n\
\t\t\t\"morphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\",\n\
\n\
\t\t\t\"#endif\",\n\
\n\
\t\t\t\"morphed += position;\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\tdefault_vertex : [\n\
\n\
\t\t\"vec4 mvPosition;\",\n\
\n\
\t\t\"#ifdef USE_SKINNING\",\n\
\n\
\t\t\t\"mvPosition = modelViewMatrix * skinned;\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"#if !defined( USE_SKINNING ) && defined( USE_MORPHTARGETS )\",\n\
\n\
\t\t\t\"mvPosition = modelViewMatrix * vec4( morphed, 1.0 );\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"#if !defined( USE_SKINNING ) && ! defined( USE_MORPHTARGETS )\",\n\
\n\
\t\t\t\"mvPosition = modelViewMatrix * vec4( position, 1.0 );\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"gl_Position = projectionMatrix * mvPosition;\",\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\tmorphnormal_vertex: [\n\
\n\
\t\t\"#ifdef USE_MORPHNORMALS\",\n\
\n\
\t\t\t\"vec3 morphedNormal = vec3( 0.0 );\",\n\
\n\
\t\t\t\"morphedNormal +=  ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\",\n\
\t\t\t\"morphedNormal +=  ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\",\n\
\t\t\t\"morphedNormal +=  ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\",\n\
\t\t\t\"morphedNormal +=  ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\",\n\
\n\
\t\t\t\"morphedNormal += normal;\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\tskinnormal_vertex: [\n\
\n\
\t\t\"#ifdef USE_SKINNING\",\n\
\n\
\t\t\t\"mat4 skinMatrix = skinWeight.x * boneMatX;\",\n\
\t\t\t\"skinMatrix \t+= skinWeight.y * boneMatY;\",\n\
\n\
\t\t\t\"#ifdef USE_MORPHNORMALS\",\n\
\n\
\t\t\t\"vec4 skinnedNormal = skinMatrix * vec4( morphedNormal, 0.0 );\",\n\
\n\
\t\t\t\"#else\",\n\
\n\
\t\t\t\"vec4 skinnedNormal = skinMatrix * vec4( normal, 0.0 );\",\n\
\n\
\t\t\t\"#endif\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\tdefaultnormal_vertex: [\n\
\n\
\t\t\"vec3 objectNormal;\",\n\
\n\
\t\t\"#ifdef USE_SKINNING\",\n\
\n\
\t\t\t\"objectNormal = skinnedNormal.xyz;\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"#if !defined( USE_SKINNING ) && defined( USE_MORPHNORMALS )\",\n\
\n\
\t\t\t\"objectNormal = morphedNormal;\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"#if !defined( USE_SKINNING ) && ! defined( USE_MORPHNORMALS )\",\n\
\n\
\t\t\t\"objectNormal = normal;\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"#ifdef FLIP_SIDED\",\n\
\n\
\t\t\t\"objectNormal = -objectNormal;\",\n\
\n\
\t\t\"#endif\",\n\
\n\
\t\t\"vec3 transformedNormal = normalMatrix * objectNormal;\",\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\t// SHADOW MAP\n\
\n\
\t// based on SpiderGL shadow map and Fabien Sanglard's GLSL shadow mapping examples\n\
\t//  http://spidergl.org/example.php?id=6\n\
\t// \thttp://fabiensanglard.net/shadowmapping\n\
\n\
\tshadowmap_pars_fragment: [\n\
\n\
\t\t\"#ifdef USE_SHADOWMAP\",\n\
\n\
\t\t\t\"uniform sampler2D shadowMap[ MAX_SHADOWS ];\",\n\
\t\t\t\"uniform vec2 shadowMapSize[ MAX_SHADOWS ];\",\n\
\n\
\t\t\t\"uniform float shadowDarkness[ MAX_SHADOWS ];\",\n\
\t\t\t\"uniform float shadowBias[ MAX_SHADOWS ];\",\n\
\n\
\t\t\t\"varying vec4 vShadowCoord[ MAX_SHADOWS ];\",\n\
\n\
\t\t\t\"float unpackDepth( const in vec4 rgba_depth ) {\",\n\
\n\
\t\t\t\t\"const vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\",\n\
\t\t\t\t\"float depth = dot( rgba_depth, bit_shift );\",\n\
\t\t\t\t\"return depth;\",\n\
\n\
\t\t\t\"}\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\tshadowmap_fragment: [\n\
\n\
\t\t\"#ifdef USE_SHADOWMAP\",\n\
\n\
\t\t\t\"#ifdef SHADOWMAP_DEBUG\",\n\
\n\
\t\t\t\t\"vec3 frustumColors[3];\",\n\
\t\t\t\t\"frustumColors[0] = vec3( 1.0, 0.5, 0.0 );\",\n\
\t\t\t\t\"frustumColors[1] = vec3( 0.0, 1.0, 0.8 );\",\n\
\t\t\t\t\"frustumColors[2] = vec3( 0.0, 0.5, 1.0 );\",\n\
\n\
\t\t\t\"#endif\",\n\
\n\
\t\t\t\"#ifdef SHADOWMAP_CASCADE\",\n\
\n\
\t\t\t\t\"int inFrustumCount = 0;\",\n\
\n\
\t\t\t\"#endif\",\n\
\n\
\t\t\t\"float fDepth;\",\n\
\t\t\t\"vec3 shadowColor = vec3( 1.0 );\",\n\
\n\
\t\t\t\"for( int i = 0; i < MAX_SHADOWS; i ++ ) {\",\n\
\n\
\t\t\t\t\"vec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;\",\n\
\n\
\t\t\t\t// \"if ( something && something )\" \t\t breaks ATI OpenGL shader compiler\n\
\t\t\t\t// \"if ( all( something, something ) )\"  using this instead\n\
\n\
\t\t\t\t\"bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\",\n\
\t\t\t\t\"bool inFrustum = all( inFrustumVec );\",\n\
\n\
\t\t\t\t// don't shadow pixels outside of light frustum\n\
\t\t\t\t// use just first frustum (for cascades)\n\
\t\t\t\t// don't shadow pixels behind far plane of light frustum\n\
\n\
\t\t\t\t\"#ifdef SHADOWMAP_CASCADE\",\n\
\n\
\t\t\t\t\t\"inFrustumCount += int( inFrustum );\",\n\
\t\t\t\t\t\"bvec3 frustumTestVec = bvec3( inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );\",\n\
\n\
\t\t\t\t\"#else\",\n\
\n\
\t\t\t\t\t\"bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\",\n\
\n\
\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\"bool frustumTest = all( frustumTestVec );\",\n\
\n\
\t\t\t\t\"if ( frustumTest ) {\",\n\
\n\
\t\t\t\t\t\"shadowCoord.z += shadowBias[ i ];\",\n\
\n\
\t\t\t\t\t\"#ifdef SHADOWMAP_SOFT\",\n\
\n\
\t\t\t\t\t\t// Percentage-close filtering\n\
\t\t\t\t\t\t// (9 pixel kernel)\n\
\t\t\t\t\t\t// http://fabiensanglard.net/shadowmappingPCF/\n\
\n\
\t\t\t\t\t\t\"float shadow = 0.0;\",\n\
\n\
\t\t\t\t\t\t/*\n\
\t\t\t\t\t\t// nested loops breaks shader compiler / validator on some ATI cards when using OpenGL\n\
\t\t\t\t\t\t// must enroll loop manually\n\
\n\
\t\t\t\t\t\t\"for ( float y = -1.25; y <= 1.25; y += 1.25 )\",\n\
\t\t\t\t\t\t\t\"for ( float x = -1.25; x <= 1.25; x += 1.25 ) {\",\n\
\n\
\t\t\t\t\t\t\t\t\"vec4 rgbaDepth = texture2D( shadowMap[ i ], vec2( x * xPixelOffset, y * yPixelOffset ) + shadowCoord.xy );\",\n\
\n\
\t\t\t\t\t\t\t\t// doesn't seem to produce any noticeable visual difference compared to simple \"texture2D\" lookup\n\
\t\t\t\t\t\t\t\t//\"vec4 rgbaDepth = texture2DProj( shadowMap[ i ], vec4( vShadowCoord[ i ].w * ( vec2( x * xPixelOffset, y * yPixelOffset ) + shadowCoord.xy ), 0.05, vShadowCoord[ i ].w ) );\",\n\
\n\
\t\t\t\t\t\t\t\t\"float fDepth = unpackDepth( rgbaDepth );\",\n\
\n\
\t\t\t\t\t\t\t\t\"if ( fDepth < shadowCoord.z )\",\n\
\t\t\t\t\t\t\t\t\t\"shadow += 1.0;\",\n\
\n\
\t\t\t\t\t\t\"}\",\n\
\n\
\t\t\t\t\t\t\"shadow /= 9.0;\",\n\
\n\
\t\t\t\t\t\t*/\n\
\n\
\t\t\t\t\t\t\"const float shadowDelta = 1.0 / 9.0;\",\n\
\n\
\t\t\t\t\t\t\"float xPixelOffset = 1.0 / shadowMapSize[ i ].x;\",\n\
\t\t\t\t\t\t\"float yPixelOffset = 1.0 / shadowMapSize[ i ].y;\",\n\
\n\
\t\t\t\t\t\t\"float dx0 = -1.25 * xPixelOffset;\",\n\
\t\t\t\t\t\t\"float dy0 = -1.25 * yPixelOffset;\",\n\
\t\t\t\t\t\t\"float dx1 = 1.25 * xPixelOffset;\",\n\
\t\t\t\t\t\t\"float dy1 = 1.25 * yPixelOffset;\",\n\
\n\
\t\t\t\t\t\t\"fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\",\n\
\t\t\t\t\t\t\"if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\",\n\
\n\
\t\t\t\t\t\t\"fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\",\n\
\t\t\t\t\t\t\"if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\",\n\
\n\
\t\t\t\t\t\t\"fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\",\n\
\t\t\t\t\t\t\"if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\",\n\
\n\
\t\t\t\t\t\t\"fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\",\n\
\t\t\t\t\t\t\"if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\",\n\
\n\
\t\t\t\t\t\t\"fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\",\n\
\t\t\t\t\t\t\"if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\",\n\
\n\
\t\t\t\t\t\t\"fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\",\n\
\t\t\t\t\t\t\"if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\",\n\
\n\
\t\t\t\t\t\t\"fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\",\n\
\t\t\t\t\t\t\"if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\",\n\
\n\
\t\t\t\t\t\t\"fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\",\n\
\t\t\t\t\t\t\"if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\",\n\
\n\
\t\t\t\t\t\t\"fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\",\n\
\t\t\t\t\t\t\"if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\",\n\
\n\
\t\t\t\t\t\t\"shadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\",\n\
\n\
\t\t\t\t\t\"#else\",\n\
\n\
\t\t\t\t\t\t\"vec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );\",\n\
\t\t\t\t\t\t\"float fDepth = unpackDepth( rgbaDepth );\",\n\
\n\
\t\t\t\t\t\t\"if ( fDepth < shadowCoord.z )\",\n\
\n\
\t\t\t\t\t\t\t// spot with multiple shadows is darker\n\
\n\
\t\t\t\t\t\t\t\"shadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );\",\n\
\n\
\t\t\t\t\t\t\t// spot with multiple shadows has the same color as single shadow spot\n\
\n\
\t\t\t\t\t\t\t//\"shadowColor = min( shadowColor, vec3( shadowDarkness[ i ] ) );\",\n\
\n\
\t\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\"}\",\n\
\n\
\n\
\t\t\t\t\"#ifdef SHADOWMAP_DEBUG\",\n\
\n\
\t\t\t\t\t\"#ifdef SHADOWMAP_CASCADE\",\n\
\n\
\t\t\t\t\t\t\"if ( inFrustum && inFrustumCount == 1 ) gl_FragColor.xyz *= frustumColors[ i ];\",\n\
\n\
\t\t\t\t\t\"#else\",\n\
\n\
\t\t\t\t\t\t\"if ( inFrustum ) gl_FragColor.xyz *= frustumColors[ i ];\",\n\
\n\
\t\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\"}\",\n\
\n\
\t\t\t\"#ifdef GAMMA_OUTPUT\",\n\
\n\
\t\t\t\t\"shadowColor *= shadowColor;\",\n\
\n\
\t\t\t\"#endif\",\n\
\n\
\t\t\t\"gl_FragColor.xyz = gl_FragColor.xyz * shadowColor;\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\tshadowmap_pars_vertex: [\n\
\n\
\t\t\"#ifdef USE_SHADOWMAP\",\n\
\n\
\t\t\t\"varying vec4 vShadowCoord[ MAX_SHADOWS ];\",\n\
\t\t\t\"uniform mat4 shadowMatrix[ MAX_SHADOWS ];\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\tshadowmap_vertex: [\n\
\n\
\t\t\"#ifdef USE_SHADOWMAP\",\n\
\n\
\t\t\t\"for( int i = 0; i < MAX_SHADOWS; i ++ ) {\",\n\
\n\
\t\t\t\t\"vShadowCoord[ i ] = shadowMatrix[ i ] * mPosition;\",\n\
\n\
\t\t\t\"}\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\t// ALPHATEST\n\
\n\
\talphatest_fragment: [\n\
\n\
\t\t\"#ifdef ALPHATEST\",\n\
\n\
\t\t\t\"if ( gl_FragColor.a < ALPHATEST ) discard;\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\t// LINEAR SPACE\n\
\n\
\tlinear_to_gamma_fragment: [\n\
\n\
\t\t\"#ifdef GAMMA_OUTPUT\",\n\
\n\
\t\t\t\"gl_FragColor.xyz = sqrt( gl_FragColor.xyz );\",\n\
\n\
\t\t\"#endif\"\n\
\n\
\t].join(\"\\n\"),\n\
\n\
\n\
};\n\
\n\
THREE.UniformsUtils = {\n\
\n\
\tmerge: function ( uniforms ) {\n\
\n\
\t\tvar u, p, tmp, merged = {};\n\
\n\
\t\tfor ( u = 0; u < uniforms.length; u ++ ) {\n\
\n\
\t\t\ttmp = this.clone( uniforms[ u ] );\n\
\n\
\t\t\tfor ( p in tmp ) {\n\
\n\
\t\t\t\tmerged[ p ] = tmp[ p ];\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\treturn merged;\n\
\n\
\t},\n\
\n\
\tclone: function ( uniforms_src ) {\n\
\n\
\t\tvar u, p, parameter, parameter_src, uniforms_dst = {};\n\
\n\
\t\tfor ( u in uniforms_src ) {\n\
\n\
\t\t\tuniforms_dst[ u ] = {};\n\
\n\
\t\t\tfor ( p in uniforms_src[ u ] ) {\n\
\n\
\t\t\t\tparameter_src = uniforms_src[ u ][ p ];\n\
\n\
\t\t\t\tif ( parameter_src instanceof THREE.Color ||\n\
\t\t\t\t\t parameter_src instanceof THREE.Vector2 ||\n\
\t\t\t\t\t parameter_src instanceof THREE.Vector3 ||\n\
\t\t\t\t\t parameter_src instanceof THREE.Vector4 ||\n\
\t\t\t\t\t parameter_src instanceof THREE.Matrix4 ||\n\
\t\t\t\t\t parameter_src instanceof THREE.Texture ) {\n\
\n\
\t\t\t\t\tuniforms_dst[ u ][ p ] = parameter_src.clone();\n\
\n\
\t\t\t\t} else if ( parameter_src instanceof Array ) {\n\
\n\
\t\t\t\t\tuniforms_dst[ u ][ p ] = parameter_src.slice();\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\tuniforms_dst[ u ][ p ] = parameter_src;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\treturn uniforms_dst;\n\
\n\
\t}\n\
\n\
};\n\
\n\
THREE.UniformsLib = {\n\
\n\
\tcommon: {\n\
\n\
\t\t\"diffuse\" : { type: \"c\", value: new THREE.Color( 0xeeeeee ) },\n\
\t\t\"opacity\" : { type: \"f\", value: 1.0 },\n\
\n\
\t\t\"map\" : { type: \"t\", value: null },\n\
\t\t\"offsetRepeat\" : { type: \"v4\", value: new THREE.Vector4( 0, 0, 1, 1 ) },\n\
\n\
\t\t\"lightMap\" : { type: \"t\", value: null },\n\
\t\t\"specularMap\" : { type: \"t\", value: null },\n\
\n\
\t\t\"envMap\" : { type: \"t\", value: null },\n\
\t\t\"flipEnvMap\" : { type: \"f\", value: -1 },\n\
\t\t\"useRefract\" : { type: \"i\", value: 0 },\n\
\t\t\"reflectivity\" : { type: \"f\", value: 1.0 },\n\
\t\t\"refractionRatio\" : { type: \"f\", value: 0.98 },\n\
\t\t\"combine\" : { type: \"i\", value: 0 },\n\
\n\
\t\t\"morphTargetInfluences\" : { type: \"f\", value: 0 }\n\
\n\
\t},\n\
\n\
\tbump: {\n\
\n\
\t\t\"bumpMap\" : { type: \"t\", value: null },\n\
\t\t\"bumpScale\" : { type: \"f\", value: 1 }\n\
\n\
\t},\n\
\n\
\tnormalmap: {\n\
\n\
\t\t\"normalMap\" : { type: \"t\", value: null },\n\
\t\t\"normalScale\" : { type: \"v2\", value: new THREE.Vector2( 1, 1 ) }\n\
\t},\n\
\n\
\tfog : {\n\
\n\
\t\t\"fogDensity\" : { type: \"f\", value: 0.00025 },\n\
\t\t\"fogNear\" : { type: \"f\", value: 1 },\n\
\t\t\"fogFar\" : { type: \"f\", value: 2000 },\n\
\t\t\"fogColor\" : { type: \"c\", value: new THREE.Color( 0xffffff ) }\n\
\n\
\t},\n\
\n\
\tlights: {\n\
\n\
\t\t\"ambientLightColor\" : { type: \"fv\", value: [] },\n\
\n\
\t\t\"directionalLightDirection\" : { type: \"fv\", value: [] },\n\
\t\t\"directionalLightColor\" : { type: \"fv\", value: [] },\n\
\n\
\t\t\"hemisphereLightPosition\" : { type: \"fv\", value: [] },\n\
\t\t\"hemisphereLightSkyColor\" : { type: \"fv\", value: [] },\n\
\t\t\"hemisphereLightGroundColor\" : { type: \"fv\", value: [] },\n\
\n\
\t\t\"pointLightColor\" : { type: \"fv\", value: [] },\n\
\t\t\"pointLightPosition\" : { type: \"fv\", value: [] },\n\
\t\t\"pointLightDistance\" : { type: \"fv1\", value: [] },\n\
\n\
\t\t\"spotLightColor\" : { type: \"fv\", value: [] },\n\
\t\t\"spotLightPosition\" : { type: \"fv\", value: [] },\n\
\t\t\"spotLightDirection\" : { type: \"fv\", value: [] },\n\
\t\t\"spotLightDistance\" : { type: \"fv1\", value: [] },\n\
\t\t\"spotLightAngle\" : { type: \"fv1\", value: [] },\n\
\t\t\"spotLightExponent\" : { type: \"fv1\", value: [] }\n\
\n\
\t},\n\
\n\
\tparticle: {\n\
\n\
\t\t\"psColor\" : { type: \"c\", value: new THREE.Color( 0xeeeeee ) },\n\
\t\t\"opacity\" : { type: \"f\", value: 1.0 },\n\
\t\t\"size\" : { type: \"f\", value: 1.0 },\n\
\t\t\"scale\" : { type: \"f\", value: 1.0 },\n\
\t\t\"map\" : { type: \"t\", value: null },\n\
\n\
\t\t\"fogDensity\" : { type: \"f\", value: 0.00025 },\n\
\t\t\"fogNear\" : { type: \"f\", value: 1 },\n\
\t\t\"fogFar\" : { type: \"f\", value: 2000 },\n\
\t\t\"fogColor\" : { type: \"c\", value: new THREE.Color( 0xffffff ) }\n\
\n\
\t},\n\
\n\
\tshadowmap: {\n\
\n\
\t\t\"shadowMap\": { type: \"tv\", value: [] },\n\
\t\t\"shadowMapSize\": { type: \"v2v\", value: [] },\n\
\n\
\t\t\"shadowBias\" : { type: \"fv1\", value: [] },\n\
\t\t\"shadowDarkness\": { type: \"fv1\", value: [] },\n\
\n\
\t\t\"shadowMatrix\" : { type: \"m4v\", value: [] },\n\
\n\
\t}\n\
\n\
};\n\
\n\
THREE.ShaderLib = {\n\
\n\
\t'depth': {\n\
\n\
\t\tuniforms: {\n\
\n\
\t\t\t\"mNear\": { type: \"f\", value: 1.0 },\n\
\t\t\t\"mFar\" : { type: \"f\", value: 2000.0 },\n\
\t\t\t\"opacity\" : { type: \"f\", value: 1.0 }\n\
\n\
\t\t},\n\
\n\
\t\tvertexShader: [\n\
\n\
\t\t\t\"void main() {\",\n\
\n\
\t\t\t\t\"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\",\n\
\n\
\t\t\t\"}\"\n\
\n\
\t\t].join(\"\\n\"),\n\
\n\
\t\tfragmentShader: [\n\
\n\
\t\t\t\"uniform float mNear;\",\n\
\t\t\t\"uniform float mFar;\",\n\
\t\t\t\"uniform float opacity;\",\n\
\n\
\t\t\t\"void main() {\",\n\
\n\
\t\t\t\t\"float depth = gl_FragCoord.z / gl_FragCoord.w;\",\n\
\t\t\t\t\"float color = 1.0 - smoothstep( mNear, mFar, depth );\",\n\
\t\t\t\t\"gl_FragColor = vec4( vec3( color ), opacity );\",\n\
\n\
\t\t\t\"}\"\n\
\n\
\t\t].join(\"\\n\")\n\
\n\
\t},\n\
\n\
\t'normal': {\n\
\n\
\t\tuniforms: {\n\
\n\
\t\t\t\"opacity\" : { type: \"f\", value: 1.0 }\n\
\n\
\t\t},\n\
\n\
\t\tvertexShader: [\n\
\n\
\t\t\t\"varying vec3 vNormal;\",\n\
\n\
\t\t\t\"void main() {\",\n\
\n\
\t\t\t\t\"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\",\n\
\t\t\t\t\"vNormal = normalMatrix * normal;\",\n\
\n\
\t\t\t\t\"gl_Position = projectionMatrix * mvPosition;\",\n\
\n\
\t\t\t\"}\"\n\
\n\
\t\t].join(\"\\n\"),\n\
\n\
\t\tfragmentShader: [\n\
\n\
\t\t\t\"uniform float opacity;\",\n\
\t\t\t\"varying vec3 vNormal;\",\n\
\n\
\t\t\t\"void main() {\",\n\
\n\
\t\t\t\t\"gl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );\",\n\
\n\
\t\t\t\"}\"\n\
\n\
\t\t].join(\"\\n\")\n\
\n\
\t},\n\
\n\
\t'basic': {\n\
\n\
\t\tuniforms: THREE.UniformsUtils.merge( [\n\
\n\
\t\t\tTHREE.UniformsLib[ \"common\" ],\n\
\t\t\tTHREE.UniformsLib[ \"fog\" ],\n\
\t\t\tTHREE.UniformsLib[ \"shadowmap\" ]\n\
\n\
\t\t] ),\n\
\n\
\t\tvertexShader: [\n\
\n\
\t\t\tTHREE.ShaderChunk[ \"map_pars_vertex\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"lightmap_pars_vertex\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"envmap_pars_vertex\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"color_pars_vertex\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"morphtarget_pars_vertex\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"skinning_pars_vertex\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"shadowmap_pars_vertex\" ],\n\
\n\
\t\t\t\"void main() {\",\n\
\n\
\t\t\t\tTHREE.ShaderChunk[ \"map_vertex\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"lightmap_vertex\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"color_vertex\" ],\n\
\n\
\t\t\t\t\"#ifdef USE_ENVMAP\",\n\
\n\
\t\t\t\tTHREE.ShaderChunk[ \"morphnormal_vertex\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"skinbase_vertex\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"skinnormal_vertex\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"defaultnormal_vertex\" ],\n\
\n\
\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\tTHREE.ShaderChunk[ \"morphtarget_vertex\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"skinning_vertex\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"default_vertex\" ],\n\
\n\
\t\t\t\tTHREE.ShaderChunk[ \"worldpos_vertex\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"envmap_vertex\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"shadowmap_vertex\" ],\n\
\n\
\t\t\t\"}\"\n\
\n\
\t\t].join(\"\\n\"),\n\
\n\
\t\tfragmentShader: [\n\
\n\
\t\t\t\"uniform vec3 diffuse;\",\n\
\t\t\t\"uniform float opacity;\",\n\
\n\
\t\t\tTHREE.ShaderChunk[ \"color_pars_fragment\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"map_pars_fragment\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"lightmap_pars_fragment\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"envmap_pars_fragment\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"fog_pars_fragment\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"shadowmap_pars_fragment\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"specularmap_pars_fragment\" ],\n\
\n\
\t\t\t\"void main() {\",\n\
\n\
\t\t\t\t\"gl_FragColor = vec4( diffuse, opacity );\",\n\
\n\
\t\t\t\tTHREE.ShaderChunk[ \"map_fragment\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"alphatest_fragment\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"specularmap_fragment\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"lightmap_fragment\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"color_fragment\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"envmap_fragment\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"shadowmap_fragment\" ],\n\
\n\
\t\t\t\tTHREE.ShaderChunk[ \"linear_to_gamma_fragment\" ],\n\
\n\
\t\t\t\tTHREE.ShaderChunk[ \"fog_fragment\" ],\n\
\n\
\t\t\t\"}\"\n\
\n\
\t\t].join(\"\\n\")\n\
\n\
\t},\n\
\n\
\t'lambert': {\n\
\n\
\t\tuniforms: THREE.UniformsUtils.merge( [\n\
\n\
\t\t\tTHREE.UniformsLib[ \"common\" ],\n\
\t\t\tTHREE.UniformsLib[ \"fog\" ],\n\
\t\t\tTHREE.UniformsLib[ \"lights\" ],\n\
\t\t\tTHREE.UniformsLib[ \"shadowmap\" ],\n\
\n\
\t\t\t{\n\
\t\t\t\t\"ambient\"  : { type: \"c\", value: new THREE.Color( 0xffffff ) },\n\
\t\t\t\t\"emissive\" : { type: \"c\", value: new THREE.Color( 0x000000 ) },\n\
\t\t\t\t\"wrapRGB\"  : { type: \"v3\", value: new THREE.Vector3( 1, 1, 1 ) }\n\
\t\t\t}\n\
\n\
\t\t] ),\n\
\n\
\t\tvertexShader: [\n\
\n\
\t\t\t\"#define LAMBERT\",\n\
\n\
\t\t\t\"varying vec3 vLightFront;\",\n\
\n\
\t\t\t\"#ifdef DOUBLE_SIDED\",\n\
\n\
\t\t\t\t\"varying vec3 vLightBack;\",\n\
\n\
\t\t\t\"#endif\",\n\
\n\
\t\t\tTHREE.ShaderChunk[ \"map_pars_vertex\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"lightmap_pars_vertex\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"envmap_pars_vertex\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"lights_lambert_pars_vertex\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"color_pars_vertex\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"morphtarget_pars_vertex\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"skinning_pars_vertex\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"shadowmap_pars_vertex\" ],\n\
\n\
\t\t\t\"void main() {\",\n\
\n\
\t\t\t\tTHREE.ShaderChunk[ \"map_vertex\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"lightmap_vertex\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"color_vertex\" ],\n\
\n\
\t\t\t\tTHREE.ShaderChunk[ \"morphnormal_vertex\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"skinbase_vertex\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"skinnormal_vertex\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"defaultnormal_vertex\" ],\n\
\n\
\t\t\t\tTHREE.ShaderChunk[ \"morphtarget_vertex\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"skinning_vertex\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"default_vertex\" ],\n\
\n\
\t\t\t\tTHREE.ShaderChunk[ \"worldpos_vertex\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"envmap_vertex\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"lights_lambert_vertex\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"shadowmap_vertex\" ],\n\
\n\
\t\t\t\"}\"\n\
\n\
\t\t].join(\"\\n\"),\n\
\n\
\t\tfragmentShader: [\n\
\n\
\t\t\t\"uniform float opacity;\",\n\
\n\
\t\t\t\"varying vec3 vLightFront;\",\n\
\n\
\t\t\t\"#ifdef DOUBLE_SIDED\",\n\
\n\
\t\t\t\t\"varying vec3 vLightBack;\",\n\
\n\
\t\t\t\"#endif\",\n\
\n\
\t\t\tTHREE.ShaderChunk[ \"color_pars_fragment\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"map_pars_fragment\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"lightmap_pars_fragment\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"envmap_pars_fragment\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"fog_pars_fragment\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"shadowmap_pars_fragment\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"specularmap_pars_fragment\" ],\n\
\n\
\t\t\t\"void main() {\",\n\
\n\
\t\t\t\t\"gl_FragColor = vec4( vec3 ( 1.0 ), opacity );\",\n\
\n\
\t\t\t\tTHREE.ShaderChunk[ \"map_fragment\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"alphatest_fragment\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"specularmap_fragment\" ],\n\
\n\
\t\t\t\t\"#ifdef DOUBLE_SIDED\",\n\
\n\
\t\t\t\t\t//\"float isFront = float( gl_FrontFacing );\",\n\
\t\t\t\t\t//\"gl_FragColor.xyz *= isFront * vLightFront + ( 1.0 - isFront ) * vLightBack;\",\n\
\n\
\t\t\t\t\t\"if ( gl_FrontFacing )\",\n\
\t\t\t\t\t\t\"gl_FragColor.xyz *= vLightFront;\",\n\
\t\t\t\t\t\"else\",\n\
\t\t\t\t\t\t\"gl_FragColor.xyz *= vLightBack;\",\n\
\n\
\t\t\t\t\"#else\",\n\
\n\
\t\t\t\t\t\"gl_FragColor.xyz *= vLightFront;\",\n\
\n\
\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\tTHREE.ShaderChunk[ \"lightmap_fragment\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"color_fragment\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"envmap_fragment\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"shadowmap_fragment\" ],\n\
\n\
\t\t\t\tTHREE.ShaderChunk[ \"linear_to_gamma_fragment\" ],\n\
\n\
\t\t\t\tTHREE.ShaderChunk[ \"fog_fragment\" ],\n\
\n\
\t\t\t\"}\"\n\
\n\
\t\t].join(\"\\n\")\n\
\n\
\t},\n\
\n\
\t'phong': {\n\
\n\
\t\tuniforms: THREE.UniformsUtils.merge( [\n\
\n\
\t\t\tTHREE.UniformsLib[ \"common\" ],\n\
\t\t\tTHREE.UniformsLib[ \"bump\" ],\n\
\t\t\tTHREE.UniformsLib[ \"normalmap\" ],\n\
\t\t\tTHREE.UniformsLib[ \"fog\" ],\n\
\t\t\tTHREE.UniformsLib[ \"lights\" ],\n\
\t\t\tTHREE.UniformsLib[ \"shadowmap\" ],\n\
\n\
\t\t\t{\n\
\t\t\t\t\"ambient\"  : { type: \"c\", value: new THREE.Color( 0xffffff ) },\n\
\t\t\t\t\"emissive\" : { type: \"c\", value: new THREE.Color( 0x000000 ) },\n\
\t\t\t\t\"specular\" : { type: \"c\", value: new THREE.Color( 0x111111 ) },\n\
\t\t\t\t\"shininess\": { type: \"f\", value: 30 },\n\
\t\t\t\t\"wrapRGB\"  : { type: \"v3\", value: new THREE.Vector3( 1, 1, 1 ) }\n\
\t\t\t}\n\
\n\
\t\t] ),\n\
\n\
\t\tvertexShader: [\n\
\n\
\t\t\t\"#define PHONG\",\n\
\n\
\t\t\t\"varying vec3 vViewPosition;\",\n\
\t\t\t\"varying vec3 vNormal;\",\n\
\n\
\t\t\tTHREE.ShaderChunk[ \"map_pars_vertex\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"lightmap_pars_vertex\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"envmap_pars_vertex\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"lights_phong_pars_vertex\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"color_pars_vertex\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"morphtarget_pars_vertex\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"skinning_pars_vertex\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"shadowmap_pars_vertex\" ],\n\
\n\
\t\t\t\"void main() {\",\n\
\n\
\t\t\t\tTHREE.ShaderChunk[ \"map_vertex\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"lightmap_vertex\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"color_vertex\" ],\n\
\n\
\t\t\t\tTHREE.ShaderChunk[ \"morphnormal_vertex\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"skinbase_vertex\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"skinnormal_vertex\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"defaultnormal_vertex\" ],\n\
\n\
\t\t\t\t\"vNormal = transformedNormal;\",\n\
\n\
\t\t\t\tTHREE.ShaderChunk[ \"morphtarget_vertex\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"skinning_vertex\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"default_vertex\" ],\n\
\n\
\t\t\t\t\"vViewPosition = -mvPosition.xyz;\",\n\
\n\
\t\t\t\tTHREE.ShaderChunk[ \"worldpos_vertex\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"envmap_vertex\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"lights_phong_vertex\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"shadowmap_vertex\" ],\n\
\n\
\t\t\t\"}\"\n\
\n\
\t\t].join(\"\\n\"),\n\
\n\
\t\tfragmentShader: [\n\
\n\
\t\t\t\"uniform vec3 diffuse;\",\n\
\t\t\t\"uniform float opacity;\",\n\
\n\
\t\t\t\"uniform vec3 ambient;\",\n\
\t\t\t\"uniform vec3 emissive;\",\n\
\t\t\t\"uniform vec3 specular;\",\n\
\t\t\t\"uniform float shininess;\",\n\
\n\
\t\t\tTHREE.ShaderChunk[ \"color_pars_fragment\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"map_pars_fragment\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"lightmap_pars_fragment\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"envmap_pars_fragment\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"fog_pars_fragment\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"lights_phong_pars_fragment\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"shadowmap_pars_fragment\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"bumpmap_pars_fragment\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"normalmap_pars_fragment\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"specularmap_pars_fragment\" ],\n\
\n\
\t\t\t\"void main() {\",\n\
\n\
\t\t\t\t\"gl_FragColor = vec4( vec3 ( 1.0 ), opacity );\",\n\
\n\
\t\t\t\tTHREE.ShaderChunk[ \"map_fragment\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"alphatest_fragment\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"specularmap_fragment\" ],\n\
\n\
\t\t\t\tTHREE.ShaderChunk[ \"lights_phong_fragment\" ],\n\
\n\
\t\t\t\tTHREE.ShaderChunk[ \"lightmap_fragment\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"color_fragment\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"envmap_fragment\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"shadowmap_fragment\" ],\n\
\n\
\t\t\t\tTHREE.ShaderChunk[ \"linear_to_gamma_fragment\" ],\n\
\n\
\t\t\t\tTHREE.ShaderChunk[ \"fog_fragment\" ],\n\
\n\
\t\t\t\"}\"\n\
\n\
\t\t].join(\"\\n\")\n\
\n\
\t},\n\
\n\
\t'particle_basic': {\n\
\n\
\t\tuniforms:  THREE.UniformsUtils.merge( [\n\
\n\
\t\t\tTHREE.UniformsLib[ \"particle\" ],\n\
\t\t\tTHREE.UniformsLib[ \"shadowmap\" ]\n\
\n\
\t\t] ),\n\
\n\
\t\tvertexShader: [\n\
\n\
\t\t\t\"uniform float size;\",\n\
\t\t\t\"uniform float scale;\",\n\
\n\
\t\t\tTHREE.ShaderChunk[ \"color_pars_vertex\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"shadowmap_pars_vertex\" ],\n\
\n\
\t\t\t\"void main() {\",\n\
\n\
\t\t\t\tTHREE.ShaderChunk[ \"color_vertex\" ],\n\
\n\
\t\t\t\t\"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\",\n\
\n\
\t\t\t\t\"#ifdef USE_SIZEATTENUATION\",\n\
\t\t\t\t\t\"gl_PointSize = size * ( scale / length( mvPosition.xyz ) );\",\n\
\t\t\t\t\"#else\",\n\
\t\t\t\t\t\"gl_PointSize = size;\",\n\
\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\"gl_Position = projectionMatrix * mvPosition;\",\n\
\n\
\t\t\t\tTHREE.ShaderChunk[ \"worldpos_vertex\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"shadowmap_vertex\" ],\n\
\n\
\t\t\t\"}\"\n\
\n\
\t\t].join(\"\\n\"),\n\
\n\
\t\tfragmentShader: [\n\
\n\
\t\t\t\"uniform vec3 psColor;\",\n\
\t\t\t\"uniform float opacity;\",\n\
\n\
\t\t\tTHREE.ShaderChunk[ \"color_pars_fragment\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"map_particle_pars_fragment\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"fog_pars_fragment\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"shadowmap_pars_fragment\" ],\n\
\n\
\t\t\t\"void main() {\",\n\
\n\
\t\t\t\t\"gl_FragColor = vec4( psColor, opacity );\",\n\
\n\
\t\t\t\tTHREE.ShaderChunk[ \"map_particle_fragment\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"alphatest_fragment\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"color_fragment\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"shadowmap_fragment\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"fog_fragment\" ],\n\
\n\
\t\t\t\"}\"\n\
\n\
\t\t].join(\"\\n\")\n\
\n\
\t},\n\
\n\
\t// Depth encoding into RGBA texture\n\
\t// \tbased on SpiderGL shadow map example\n\
\t// \t\thttp://spidergl.org/example.php?id=6\n\
\t// \toriginally from\n\
\t//\t\thttp://www.gamedev.net/topic/442138-packing-a-float-into-a-a8r8g8b8-texture-shader/page__whichpage__1%25EF%25BF%25BD\n\
\t// \tsee also here:\n\
\t//\t\thttp://aras-p.info/blog/2009/07/30/encoding-floats-to-rgba-the-final/\n\
\n\
\t'depthRGBA': {\n\
\n\
\t\tuniforms: {},\n\
\n\
\t\tvertexShader: [\n\
\n\
\t\t\tTHREE.ShaderChunk[ \"morphtarget_pars_vertex\" ],\n\
\t\t\tTHREE.ShaderChunk[ \"skinning_pars_vertex\" ],\n\
\n\
\t\t\t\"void main() {\",\n\
\n\
\t\t\t\tTHREE.ShaderChunk[ \"skinbase_vertex\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"morphtarget_vertex\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"skinning_vertex\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"default_vertex\" ],\n\
\n\
\t\t\t\"}\"\n\
\n\
\t\t].join(\"\\n\"),\n\
\n\
\t\tfragmentShader: [\n\
\n\
\t\t\t\"vec4 pack_depth( const in float depth ) {\",\n\
\n\
\t\t\t\t\"const vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );\",\n\
\t\t\t\t\"const vec4 bit_mask  = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );\",\n\
\t\t\t\t\"vec4 res = fract( depth * bit_shift );\",\n\
\t\t\t\t\"res -= res.xxyz * bit_mask;\",\n\
\t\t\t\t\"return res;\",\n\
\n\
\t\t\t\"}\",\n\
\n\
\t\t\t\"void main() {\",\n\
\n\
\t\t\t\t\"gl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );\",\n\
\n\
\t\t\t\t//\"gl_FragData[ 0 ] = pack_depth( gl_FragCoord.z / gl_FragCoord.w );\",\n\
\t\t\t\t//\"float z = ( ( gl_FragCoord.z / gl_FragCoord.w ) - 3.0 ) / ( 4000.0 - 3.0 );\",\n\
\t\t\t\t//\"gl_FragData[ 0 ] = pack_depth( z );\",\n\
\t\t\t\t//\"gl_FragData[ 0 ] = vec4( z, z, z, 1.0 );\",\n\
\n\
\t\t\t\"}\"\n\
\n\
\t\t].join(\"\\n\")\n\
\n\
\t}\n\
\n\
};\n\
/**\n\
 * @author supereggbert / http://www.paulbrunt.co.uk/\n\
 * @author mrdoob / http://mrdoob.com/\n\
 * @author alteredq / http://alteredqualia.com/\n\
 * @author szimek / https://github.com/szimek/\n\
 */\n\
\n\
THREE.WebGLRenderer = function ( parameters ) {\n\
\n\
\tconsole.log( 'THREE.WebGLRenderer', THREE.REVISION );\n\
\n\
\tparameters = parameters || {};\n\
\n\
\tvar _canvas = parameters.canvas !== undefined ? parameters.canvas : document.createElement( 'canvas' ),\n\
\n\
\t_precision = parameters.precision !== undefined ? parameters.precision : 'highp',\n\
\n\
\t_alpha = parameters.alpha !== undefined ? parameters.alpha : true,\n\
\t_premultipliedAlpha = parameters.premultipliedAlpha !== undefined ? parameters.premultipliedAlpha : true,\n\
\t_antialias = parameters.antialias !== undefined ? parameters.antialias : false,\n\
\t_stencil = parameters.stencil !== undefined ? parameters.stencil : true,\n\
\t_preserveDrawingBuffer = parameters.preserveDrawingBuffer !== undefined ? parameters.preserveDrawingBuffer : false,\n\
\n\
\t_clearColor = parameters.clearColor !== undefined ? new THREE.Color( parameters.clearColor ) : new THREE.Color( 0x000000 ),\n\
\t_clearAlpha = parameters.clearAlpha !== undefined ? parameters.clearAlpha : 0,\n\
\n\
\t_maxLights = parameters.maxLights !== undefined ? parameters.maxLights : 4;\n\
\n\
\t// public properties\n\
\n\
\tthis.domElement = _canvas;\n\
\tthis.context = null;\n\
\n\
\t// clearing\n\
\n\
\tthis.autoClear = true;\n\
\tthis.autoClearColor = true;\n\
\tthis.autoClearDepth = true;\n\
\tthis.autoClearStencil = true;\n\
\n\
\t// scene graph\n\
\n\
\tthis.sortObjects = true;\n\
\n\
\tthis.autoUpdateObjects = true;\n\
\tthis.autoUpdateScene = true;\n\
\n\
\t// physically based shading\n\
\n\
\tthis.gammaInput = false;\n\
\tthis.gammaOutput = false;\n\
\tthis.physicallyBasedShading = false;\n\
\n\
\t// shadow map\n\
\n\
\tthis.shadowMapEnabled = false;\n\
\tthis.shadowMapAutoUpdate = true;\n\
\tthis.shadowMapSoft = true;\n\
\tthis.shadowMapCullFrontFaces = true;\n\
\tthis.shadowMapDebug = false;\n\
\tthis.shadowMapCascade = false;\n\
\n\
\t// morphs\n\
\n\
\tthis.maxMorphTargets = 8;\n\
\tthis.maxMorphNormals = 4;\n\
\n\
\t// flags\n\
\n\
\tthis.autoScaleCubemaps = true;\n\
\n\
\t// custom render plugins\n\
\n\
\tthis.renderPluginsPre = [];\n\
\tthis.renderPluginsPost = [];\n\
\n\
\t// info\n\
\n\
\tthis.info = {\n\
\n\
\t\tmemory: {\n\
\n\
\t\t\tprograms: 0,\n\
\t\t\tgeometries: 0,\n\
\t\t\ttextures: 0\n\
\n\
\t\t},\n\
\n\
\t\trender: {\n\
\n\
\t\t\tcalls: 0,\n\
\t\t\tvertices: 0,\n\
\t\t\tfaces: 0,\n\
\t\t\tpoints: 0\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\t// internal properties\n\
\n\
\tvar _this = this,\n\
\n\
\t_programs = [],\n\
\t_programs_counter = 0,\n\
\n\
\t// internal state cache\n\
\n\
\t_currentProgram = null,\n\
\t_currentFramebuffer = null,\n\
\t_currentMaterialId = -1,\n\
\t_currentGeometryGroupHash = null,\n\
\t_currentCamera = null,\n\
\t_geometryGroupCounter = 0,\n\
\n\
\t_usedTextureUnits = 0,\n\
\n\
\t// GL state cache\n\
\n\
\t_oldDoubleSided = -1,\n\
\t_oldFlipSided = -1,\n\
\n\
\t_oldBlending = -1,\n\
\n\
\t_oldBlendEquation = -1,\n\
\t_oldBlendSrc = -1,\n\
\t_oldBlendDst = -1,\n\
\n\
\t_oldDepthTest = -1,\n\
\t_oldDepthWrite = -1,\n\
\n\
\t_oldPolygonOffset = null,\n\
\t_oldPolygonOffsetFactor = null,\n\
\t_oldPolygonOffsetUnits = null,\n\
\n\
\t_oldLineWidth = null,\n\
\n\
\t_viewportX = 0,\n\
\t_viewportY = 0,\n\
\t_viewportWidth = 0,\n\
\t_viewportHeight = 0,\n\
\t_currentWidth = 0,\n\
\t_currentHeight = 0,\n\
\n\
\t// frustum\n\
\n\
\t_frustum = new THREE.Frustum(),\n\
\n\
\t // camera matrices cache\n\
\n\
\t_projScreenMatrix = new THREE.Matrix4(),\n\
\t_projScreenMatrixPS = new THREE.Matrix4(),\n\
\n\
\t_vector3 = new THREE.Vector4(),\n\
\n\
\t// light arrays cache\n\
\n\
\t_direction = new THREE.Vector3(),\n\
\n\
\t_lightsNeedUpdate = true,\n\
\n\
\t_lights = {\n\
\n\
\t\tambient: [ 0, 0, 0 ],\n\
\t\tdirectional: { length: 0, colors: new Array(), positions: new Array() },\n\
\t\tpoint: { length: 0, colors: new Array(), positions: new Array(), distances: new Array() },\n\
\t\tspot: { length: 0, colors: new Array(), positions: new Array(), distances: new Array(), directions: new Array(), angles: new Array(), exponents: new Array() },\n\
\t\themi: { length: 0, skyColors: new Array(), groundColors: new Array(), positions: new Array() }\n\
\n\
\t};\n\
\n\
\t// initialize\n\
\n\
\tvar _gl;\n\
\n\
\tvar _glExtensionTextureFloat;\n\
\tvar _glExtensionStandardDerivatives;\n\
\tvar _glExtensionTextureFilterAnisotropic;\n\
\tvar _glExtensionCompressedTextureS3TC;\n\
\n\
\tinitGL();\n\
\n\
\tsetDefaultGLState();\n\
\n\
\tthis.context = _gl;\n\
\n\
\t// GPU capabilities\n\
\n\
\tvar _maxTextures = _gl.getParameter( _gl.MAX_TEXTURE_IMAGE_UNITS );\n\
\tvar _maxVertexTextures = _gl.getParameter( _gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS );\n\
\tvar _maxTextureSize = _gl.getParameter( _gl.MAX_TEXTURE_SIZE );\n\
\tvar _maxCubemapSize = _gl.getParameter( _gl.MAX_CUBE_MAP_TEXTURE_SIZE );\n\
\n\
\tvar _maxAnisotropy = _glExtensionTextureFilterAnisotropic ? _gl.getParameter( _glExtensionTextureFilterAnisotropic.MAX_TEXTURE_MAX_ANISOTROPY_EXT ) : 0;\n\
\n\
\tvar _supportsVertexTextures = ( _maxVertexTextures > 0 );\n\
\tvar _supportsBoneTextures = _supportsVertexTextures && _glExtensionTextureFloat;\n\
\n\
\tvar _compressedTextureFormats = _glExtensionCompressedTextureS3TC ? _gl.getParameter( _gl.COMPRESSED_TEXTURE_FORMATS ) : [];\n\
\n\
\t// API\n\
\n\
\tthis.getContext = function () {\n\
\n\
\t\treturn _gl;\n\
\n\
\t};\n\
\n\
\tthis.supportsVertexTextures = function () {\n\
\n\
\t\treturn _supportsVertexTextures;\n\
\n\
\t};\n\
\n\
\tthis.getMaxAnisotropy  = function () {\n\
\n\
\t\treturn _maxAnisotropy;\n\
\n\
\t};\n\
\n\
\tthis.setSize = function ( width, height ) {\n\
\n\
\t\t_canvas.width = width;\n\
\t\t_canvas.height = height;\n\
\n\
\t\tthis.setViewport( 0, 0, _canvas.width, _canvas.height );\n\
\n\
\t};\n\
\n\
\tthis.setViewport = function ( x, y, width, height ) {\n\
\n\
\t\t_viewportX = x !== undefined ? x : 0;\n\
\t\t_viewportY = y !== undefined ? y : 0;\n\
\n\
\t\t_viewportWidth = width !== undefined ? width : _canvas.width;\n\
\t\t_viewportHeight = height !== undefined ? height : _canvas.height;\n\
\n\
\t\t_gl.viewport( _viewportX, _viewportY, _viewportWidth, _viewportHeight );\n\
\n\
\t};\n\
\n\
\tthis.setScissor = function ( x, y, width, height ) {\n\
\n\
\t\t_gl.scissor( x, y, width, height );\n\
\n\
\t};\n\
\n\
\tthis.enableScissorTest = function ( enable ) {\n\
\n\
\t\tenable ? _gl.enable( _gl.SCISSOR_TEST ) : _gl.disable( _gl.SCISSOR_TEST );\n\
\n\
\t};\n\
\n\
\t// Clearing\n\
\n\
\tthis.setClearColorHex = function ( hex, alpha ) {\n\
\n\
\t\t_clearColor.setHex( hex );\n\
\t\t_clearAlpha = alpha;\n\
\n\
\t\t_gl.clearColor( _clearColor.r, _clearColor.g, _clearColor.b, _clearAlpha );\n\
\n\
\t};\n\
\n\
\tthis.setClearColor = function ( color, alpha ) {\n\
\n\
\t\t_clearColor.copy( color );\n\
\t\t_clearAlpha = alpha;\n\
\n\
\t\t_gl.clearColor( _clearColor.r, _clearColor.g, _clearColor.b, _clearAlpha );\n\
\n\
\t};\n\
\n\
\tthis.getClearColor = function () {\n\
\n\
\t\treturn _clearColor;\n\
\n\
\t};\n\
\n\
\tthis.getClearAlpha = function () {\n\
\n\
\t\treturn _clearAlpha;\n\
\n\
\t};\n\
\n\
\tthis.clear = function ( color, depth, stencil ) {\n\
\n\
\t\tvar bits = 0;\n\
\n\
\t\tif ( color === undefined || color ) bits |= _gl.COLOR_BUFFER_BIT;\n\
\t\tif ( depth === undefined || depth ) bits |= _gl.DEPTH_BUFFER_BIT;\n\
\t\tif ( stencil === undefined || stencil ) bits |= _gl.STENCIL_BUFFER_BIT;\n\
\n\
\t\t_gl.clear( bits );\n\
\n\
\t};\n\
\n\
\tthis.clearTarget = function ( renderTarget, color, depth, stencil ) {\n\
\n\
\t\tthis.setRenderTarget( renderTarget );\n\
\t\tthis.clear( color, depth, stencil );\n\
\n\
\t};\n\
\n\
\t// Plugins\n\
\n\
\tthis.addPostPlugin = function ( plugin ) {\n\
\n\
\t\tplugin.init( this );\n\
\t\tthis.renderPluginsPost.push( plugin );\n\
\n\
\t};\n\
\n\
\tthis.addPrePlugin = function ( plugin ) {\n\
\n\
\t\tplugin.init( this );\n\
\t\tthis.renderPluginsPre.push( plugin );\n\
\n\
\t};\n\
\n\
\t// Deallocation\n\
\n\
\tthis.deallocateObject = function ( object ) {\n\
\n\
\t\tif ( ! object.__webglInit ) return;\n\
\n\
\t\tobject.__webglInit = false;\n\
\n\
\t\tdelete object._modelViewMatrix;\n\
\t\tdelete object._normalMatrix;\n\
\n\
\t\tdelete object._normalMatrixArray;\n\
\t\tdelete object._modelViewMatrixArray;\n\
\t\tdelete object._modelMatrixArray;\n\
\n\
\t\tif ( object instanceof THREE.Mesh ) {\n\
\n\
\t\t\tfor ( var g in object.geometry.geometryGroups ) {\n\
\n\
\t\t\t\tdeleteMeshBuffers( object.geometry.geometryGroups[ g ] );\n\
\n\
\t\t\t}\n\
\n\
\t\t} else if ( object instanceof THREE.Ribbon ) {\n\
\n\
\t\t\tdeleteRibbonBuffers( object.geometry );\n\
\n\
\t\t} else if ( object instanceof THREE.Line ) {\n\
\n\
\t\t\tdeleteLineBuffers( object.geometry );\n\
\n\
\t\t} else if ( object instanceof THREE.ParticleSystem ) {\n\
\n\
\t\t\tdeleteParticleBuffers( object.geometry );\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tthis.deallocateTexture = function ( texture ) {\n\
\n\
\t\tif ( ! texture.__webglInit ) return;\n\
\n\
\t\ttexture.__webglInit = false;\n\
\t\t_gl.deleteTexture( texture.__webglTexture );\n\
\n\
\t\t_this.info.memory.textures --;\n\
\n\
\t};\n\
\n\
\tthis.deallocateRenderTarget = function ( renderTarget ) {\n\
\n\
\t\tif ( !renderTarget || ! renderTarget.__webglTexture ) return;\n\
\n\
\t\t_gl.deleteTexture( renderTarget.__webglTexture );\n\
\n\
\t\tif ( renderTarget instanceof THREE.WebGLRenderTargetCube ) {\n\
\n\
\t\t\tfor ( var i = 0; i < 6; i ++ ) {\n\
\n\
\t\t\t\t_gl.deleteFramebuffer( renderTarget.__webglFramebuffer[ i ] );\n\
\t\t\t\t_gl.deleteRenderbuffer( renderTarget.__webglRenderbuffer[ i ] );\n\
\n\
\t\t\t}\n\
\n\
\t\t} else {\n\
\n\
\t\t\t_gl.deleteFramebuffer( renderTarget.__webglFramebuffer );\n\
\t\t\t_gl.deleteRenderbuffer( renderTarget.__webglRenderbuffer );\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tthis.deallocateMaterial = function ( material ) {\n\
\n\
\t\tvar program = material.program;\n\
\n\
\t\tif ( ! program ) return;\n\
\n\
\t\tmaterial.program = undefined;\n\
\n\
\t\t// only deallocate GL program if this was the last use of shared program\n\
\t\t// assumed there is only single copy of any program in the _programs list\n\
\t\t// (that's how it's constructed)\n\
\n\
\t\tvar i, il, programInfo;\n\
\t\tvar deleteProgram = false;\n\
\n\
\t\tfor ( i = 0, il = _programs.length; i < il; i ++ ) {\n\
\n\
\t\t\tprogramInfo = _programs[ i ];\n\
\n\
\t\t\tif ( programInfo.program === program ) {\n\
\n\
\t\t\t\tprogramInfo.usedTimes --;\n\
\n\
\t\t\t\tif ( programInfo.usedTimes === 0 ) {\n\
\n\
\t\t\t\t\tdeleteProgram = true;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tbreak;\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tif ( deleteProgram ) {\n\
\n\
\t\t\t// avoid using array.splice, this is costlier than creating new array from scratch\n\
\n\
\t\t\tvar newPrograms = [];\n\
\n\
\t\t\tfor ( i = 0, il = _programs.length; i < il; i ++ ) {\n\
\n\
\t\t\t\tprogramInfo = _programs[ i ];\n\
\n\
\t\t\t\tif ( programInfo.program !== program ) {\n\
\n\
\t\t\t\t\tnewPrograms.push( programInfo );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t\t_programs = newPrograms;\n\
\n\
\t\t\t_gl.deleteProgram( program );\n\
\n\
\t\t\t_this.info.memory.programs --;\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\t// Rendering\n\
\n\
\tthis.updateShadowMap = function ( scene, camera ) {\n\
\n\
\t\t_currentProgram = null;\n\
\t\t_oldBlending = -1;\n\
\t\t_oldDepthTest = -1;\n\
\t\t_oldDepthWrite = -1;\n\
\t\t_currentGeometryGroupHash = -1;\n\
\t\t_currentMaterialId = -1;\n\
\t\t_lightsNeedUpdate = true;\n\
\t\t_oldDoubleSided = -1;\n\
\t\t_oldFlipSided = -1;\n\
\n\
\t\tthis.shadowMapPlugin.update( scene, camera );\n\
\n\
\t};\n\
\n\
\t// Internal functions\n\
\n\
\t// Buffer allocation\n\
\n\
\tfunction createParticleBuffers ( geometry ) {\n\
\n\
\t\tgeometry.__webglVertexBuffer = _gl.createBuffer();\n\
\t\tgeometry.__webglColorBuffer = _gl.createBuffer();\n\
\n\
\t\t_this.info.memory.geometries ++;\n\
\n\
\t};\n\
\n\
\tfunction createLineBuffers ( geometry ) {\n\
\n\
\t\tgeometry.__webglVertexBuffer = _gl.createBuffer();\n\
\t\tgeometry.__webglColorBuffer = _gl.createBuffer();\n\
\n\
\t\t_this.info.memory.geometries ++;\n\
\n\
\t};\n\
\n\
\tfunction createRibbonBuffers ( geometry ) {\n\
\n\
\t\tgeometry.__webglVertexBuffer = _gl.createBuffer();\n\
\t\tgeometry.__webglColorBuffer = _gl.createBuffer();\n\
\n\
\t\t_this.info.memory.geometries ++;\n\
\n\
\t};\n\
\n\
\tfunction createMeshBuffers ( geometryGroup ) {\n\
\n\
\t\tgeometryGroup.__webglVertexBuffer = _gl.createBuffer();\n\
\t\tgeometryGroup.__webglNormalBuffer = _gl.createBuffer();\n\
\t\tgeometryGroup.__webglTangentBuffer = _gl.createBuffer();\n\
\t\tgeometryGroup.__webglColorBuffer = _gl.createBuffer();\n\
\t\tgeometryGroup.__webglUVBuffer = _gl.createBuffer();\n\
\t\tgeometryGroup.__webglUV2Buffer = _gl.createBuffer();\n\
\n\
\t\tgeometryGroup.__webglSkinIndicesBuffer = _gl.createBuffer();\n\
\t\tgeometryGroup.__webglSkinWeightsBuffer = _gl.createBuffer();\n\
\n\
\t\tgeometryGroup.__webglFaceBuffer = _gl.createBuffer();\n\
\t\tgeometryGroup.__webglLineBuffer = _gl.createBuffer();\n\
\n\
\t\tvar m, ml;\n\
\n\
\t\tif ( geometryGroup.numMorphTargets ) {\n\
\n\
\t\t\tgeometryGroup.__webglMorphTargetsBuffers = [];\n\
\n\
\t\t\tfor ( m = 0, ml = geometryGroup.numMorphTargets; m < ml; m ++ ) {\n\
\n\
\t\t\t\tgeometryGroup.__webglMorphTargetsBuffers.push( _gl.createBuffer() );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tif ( geometryGroup.numMorphNormals ) {\n\
\n\
\t\t\tgeometryGroup.__webglMorphNormalsBuffers = [];\n\
\n\
\t\t\tfor ( m = 0, ml = geometryGroup.numMorphNormals; m < ml; m ++ ) {\n\
\n\
\t\t\t\tgeometryGroup.__webglMorphNormalsBuffers.push( _gl.createBuffer() );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\t_this.info.memory.geometries ++;\n\
\n\
\t};\n\
\n\
\t// Buffer deallocation\n\
\n\
\tfunction deleteParticleBuffers ( geometry ) {\n\
\n\
\t\t_gl.deleteBuffer( geometry.__webglVertexBuffer );\n\
\t\t_gl.deleteBuffer( geometry.__webglColorBuffer );\n\
\n\
\t\t_this.info.memory.geometries --;\n\
\n\
\t};\n\
\n\
\tfunction deleteLineBuffers ( geometry ) {\n\
\n\
\t\t_gl.deleteBuffer( geometry.__webglVertexBuffer );\n\
\t\t_gl.deleteBuffer( geometry.__webglColorBuffer );\n\
\n\
\t\t_this.info.memory.geometries --;\n\
\n\
\t};\n\
\n\
\tfunction deleteRibbonBuffers ( geometry ) {\n\
\n\
\t\t_gl.deleteBuffer( geometry.__webglVertexBuffer );\n\
\t\t_gl.deleteBuffer( geometry.__webglColorBuffer );\n\
\n\
\t\t_this.info.memory.geometries --;\n\
\n\
\t};\n\
\n\
\tfunction deleteMeshBuffers ( geometryGroup ) {\n\
\n\
\t\t_gl.deleteBuffer( geometryGroup.__webglVertexBuffer );\n\
\t\t_gl.deleteBuffer( geometryGroup.__webglNormalBuffer );\n\
\t\t_gl.deleteBuffer( geometryGroup.__webglTangentBuffer );\n\
\t\t_gl.deleteBuffer( geometryGroup.__webglColorBuffer );\n\
\t\t_gl.deleteBuffer( geometryGroup.__webglUVBuffer );\n\
\t\t_gl.deleteBuffer( geometryGroup.__webglUV2Buffer );\n\
\n\
\t\t_gl.deleteBuffer( geometryGroup.__webglSkinIndicesBuffer );\n\
\t\t_gl.deleteBuffer( geometryGroup.__webglSkinWeightsBuffer );\n\
\n\
\t\t_gl.deleteBuffer( geometryGroup.__webglFaceBuffer );\n\
\t\t_gl.deleteBuffer( geometryGroup.__webglLineBuffer );\n\
\n\
\t\tvar m, ml;\n\
\n\
\t\tif ( geometryGroup.numMorphTargets ) {\n\
\n\
\t\t\tfor ( m = 0, ml = geometryGroup.numMorphTargets; m < ml; m ++ ) {\n\
\n\
\t\t\t\t_gl.deleteBuffer( geometryGroup.__webglMorphTargetsBuffers[ m ] );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tif ( geometryGroup.numMorphNormals ) {\n\
\n\
\t\t\tfor ( m = 0, ml = geometryGroup.numMorphNormals; m < ml; m ++ ) {\n\
\n\
\t\t\t\t_gl.deleteBuffer( geometryGroup.__webglMorphNormalsBuffers[ m ] );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\n\
\t\tif ( geometryGroup.__webglCustomAttributesList ) {\n\
\n\
\t\t\tfor ( var id in geometryGroup.__webglCustomAttributesList ) {\n\
\n\
\t\t\t\t_gl.deleteBuffer( geometryGroup.__webglCustomAttributesList[ id ].buffer );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\t_this.info.memory.geometries --;\n\
\n\
\t};\n\
\n\
\t// Buffer initialization\n\
\n\
\tfunction initCustomAttributes ( geometry, object ) {\n\
\n\
\t\tvar nvertices = geometry.vertices.length;\n\
\n\
\t\tvar material = object.material;\n\
\n\
\t\tif ( material.attributes ) {\n\
\n\
\t\t\tif ( geometry.__webglCustomAttributesList === undefined ) {\n\
\n\
\t\t\t\tgeometry.__webglCustomAttributesList = [];\n\
\n\
\t\t\t}\n\
\n\
\t\t\tfor ( var a in material.attributes ) {\n\
\n\
\t\t\t\tvar attribute = material.attributes[ a ];\n\
\n\
\t\t\t\tif( !attribute.__webglInitialized || attribute.createUniqueBuffers ) {\n\
\n\
\t\t\t\t\tattribute.__webglInitialized = true;\n\
\n\
\t\t\t\t\tvar size = 1;\t\t// \"f\" and \"i\"\n\
\n\
\t\t\t\t\tif ( attribute.type === \"v2\" ) size = 2;\n\
\t\t\t\t\telse if ( attribute.type === \"v3\" ) size = 3;\n\
\t\t\t\t\telse if ( attribute.type === \"v4\" ) size = 4;\n\
\t\t\t\t\telse if ( attribute.type === \"c\"  ) size = 3;\n\
\n\
\t\t\t\t\tattribute.size = size;\n\
\n\
\t\t\t\t\tattribute.array = new Float32Array( nvertices * size );\n\
\n\
\t\t\t\t\tattribute.buffer = _gl.createBuffer();\n\
\t\t\t\t\tattribute.buffer.belongsToAttribute = a;\n\
\n\
\t\t\t\t\tattribute.needsUpdate = true;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tgeometry.__webglCustomAttributesList.push( attribute );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tfunction initParticleBuffers ( geometry, object ) {\n\
\n\
\t\tvar nvertices = geometry.vertices.length;\n\
\n\
\t\tgeometry.__vertexArray = new Float32Array( nvertices * 3 );\n\
\t\tgeometry.__colorArray = new Float32Array( nvertices * 3 );\n\
\n\
\t\tgeometry.__sortArray = [];\n\
\n\
\t\tgeometry.__webglParticleCount = nvertices;\n\
\n\
\t\tinitCustomAttributes ( geometry, object );\n\
\n\
\t};\n\
\n\
\tfunction initLineBuffers ( geometry, object ) {\n\
\n\
\t\tvar nvertices = geometry.vertices.length;\n\
\n\
\t\tgeometry.__vertexArray = new Float32Array( nvertices * 3 );\n\
\t\tgeometry.__colorArray = new Float32Array( nvertices * 3 );\n\
\n\
\t\tgeometry.__webglLineCount = nvertices;\n\
\n\
\t\tinitCustomAttributes ( geometry, object );\n\
\n\
\t};\n\
\n\
\tfunction initRibbonBuffers ( geometry ) {\n\
\n\
\t\tvar nvertices = geometry.vertices.length;\n\
\n\
\t\tgeometry.__vertexArray = new Float32Array( nvertices * 3 );\n\
\t\tgeometry.__colorArray = new Float32Array( nvertices * 3 );\n\
\n\
\t\tgeometry.__webglVertexCount = nvertices;\n\
\n\
\t};\n\
\n\
\tfunction initMeshBuffers ( geometryGroup, object ) {\n\
\n\
\t\tvar geometry = object.geometry,\n\
\t\t\tfaces3 = geometryGroup.faces3,\n\
\t\t\tfaces4 = geometryGroup.faces4,\n\
\n\
\t\t\tnvertices = faces3.length * 3 + faces4.length * 4,\n\
\t\t\tntris     = faces3.length * 1 + faces4.length * 2,\n\
\t\t\tnlines    = faces3.length * 3 + faces4.length * 4,\n\
\n\
\t\t\tmaterial = getBufferMaterial( object, geometryGroup ),\n\
\n\
\t\t\tuvType = bufferGuessUVType( material ),\n\
\t\t\tnormalType = bufferGuessNormalType( material ),\n\
\t\t\tvertexColorType = bufferGuessVertexColorType( material );\n\
\n\
\t\t//console.log( \"uvType\", uvType, \"normalType\", normalType, \"vertexColorType\", vertexColorType, object, geometryGroup, material );\n\
\n\
\t\tgeometryGroup.__vertexArray = new Float32Array( nvertices * 3 );\n\
\n\
\t\tif ( normalType ) {\n\
\n\
\t\t\tgeometryGroup.__normalArray = new Float32Array( nvertices * 3 );\n\
\n\
\t\t}\n\
\n\
\t\tif ( geometry.hasTangents ) {\n\
\n\
\t\t\tgeometryGroup.__tangentArray = new Float32Array( nvertices * 4 );\n\
\n\
\t\t}\n\
\n\
\t\tif ( vertexColorType ) {\n\
\n\
\t\t\tgeometryGroup.__colorArray = new Float32Array( nvertices * 3 );\n\
\n\
\t\t}\n\
\n\
\t\tif ( uvType ) {\n\
\n\
\t\t\tif ( geometry.faceUvs.length > 0 || geometry.faceVertexUvs.length > 0 ) {\n\
\n\
\t\t\t\tgeometryGroup.__uvArray = new Float32Array( nvertices * 2 );\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( geometry.faceUvs.length > 1 || geometry.faceVertexUvs.length > 1 ) {\n\
\n\
\t\t\t\tgeometryGroup.__uv2Array = new Float32Array( nvertices * 2 );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tif ( object.geometry.skinWeights.length && object.geometry.skinIndices.length ) {\n\
\n\
\t\t\tgeometryGroup.__skinIndexArray = new Float32Array( nvertices * 4 );\n\
\t\t\tgeometryGroup.__skinWeightArray = new Float32Array( nvertices * 4 );\n\
\n\
\t\t}\n\
\n\
\t\tgeometryGroup.__faceArray = new Uint16Array( ntris * 3 );\n\
\t\tgeometryGroup.__lineArray = new Uint16Array( nlines * 2 );\n\
\n\
\t\tvar m, ml;\n\
\n\
\t\tif ( geometryGroup.numMorphTargets ) {\n\
\n\
\t\t\tgeometryGroup.__morphTargetsArrays = [];\n\
\n\
\t\t\tfor ( m = 0, ml = geometryGroup.numMorphTargets; m < ml; m ++ ) {\n\
\n\
\t\t\t\tgeometryGroup.__morphTargetsArrays.push( new Float32Array( nvertices * 3 ) );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tif ( geometryGroup.numMorphNormals ) {\n\
\n\
\t\t\tgeometryGroup.__morphNormalsArrays = [];\n\
\n\
\t\t\tfor ( m = 0, ml = geometryGroup.numMorphNormals; m < ml; m ++ ) {\n\
\n\
\t\t\t\tgeometryGroup.__morphNormalsArrays.push( new Float32Array( nvertices * 3 ) );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tgeometryGroup.__webglFaceCount = ntris * 3;\n\
\t\tgeometryGroup.__webglLineCount = nlines * 2;\n\
\n\
\n\
\t\t// custom attributes\n\
\n\
\t\tif ( material.attributes ) {\n\
\n\
\t\t\tif ( geometryGroup.__webglCustomAttributesList === undefined ) {\n\
\n\
\t\t\t\tgeometryGroup.__webglCustomAttributesList = [];\n\
\n\
\t\t\t}\n\
\n\
\t\t\tfor ( var a in material.attributes ) {\n\
\n\
\t\t\t\t// Do a shallow copy of the attribute object so different geometryGroup chunks use different\n\
\t\t\t\t// attribute buffers which are correctly indexed in the setMeshBuffers function\n\
\n\
\t\t\t\tvar originalAttribute = material.attributes[ a ];\n\
\n\
\t\t\t\tvar attribute = {};\n\
\n\
\t\t\t\tfor ( var property in originalAttribute ) {\n\
\n\
\t\t\t\t\tattribute[ property ] = originalAttribute[ property ];\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tif( !attribute.__webglInitialized || attribute.createUniqueBuffers ) {\n\
\n\
\t\t\t\t\tattribute.__webglInitialized = true;\n\
\n\
\t\t\t\t\tvar size = 1;\t\t// \"f\" and \"i\"\n\
\n\
\t\t\t\t\tif( attribute.type === \"v2\" ) size = 2;\n\
\t\t\t\t\telse if( attribute.type === \"v3\" ) size = 3;\n\
\t\t\t\t\telse if( attribute.type === \"v4\" ) size = 4;\n\
\t\t\t\t\telse if( attribute.type === \"c\"  ) size = 3;\n\
\n\
\t\t\t\t\tattribute.size = size;\n\
\n\
\t\t\t\t\tattribute.array = new Float32Array( nvertices * size );\n\
\n\
\t\t\t\t\tattribute.buffer = _gl.createBuffer();\n\
\t\t\t\t\tattribute.buffer.belongsToAttribute = a;\n\
\n\
\t\t\t\t\toriginalAttribute.needsUpdate = true;\n\
\t\t\t\t\tattribute.__original = originalAttribute;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tgeometryGroup.__webglCustomAttributesList.push( attribute );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tgeometryGroup.__inittedArrays = true;\n\
\n\
\t};\n\
\n\
\tfunction getBufferMaterial( object, geometryGroup ) {\n\
\n\
\t\tif ( object.material && ! ( object.material instanceof THREE.MeshFaceMaterial ) ) {\n\
\n\
\t\t\treturn object.material;\n\
\n\
\t\t} else if ( geometryGroup.materialIndex >= 0 ) {\n\
\n\
\t\t\treturn object.geometry.materials[ geometryGroup.materialIndex ];\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tfunction materialNeedsSmoothNormals ( material ) {\n\
\n\
\t\treturn material && material.shading !== undefined && material.shading === THREE.SmoothShading;\n\
\n\
\t};\n\
\n\
\tfunction bufferGuessNormalType ( material ) {\n\
\n\
\t\t// only MeshBasicMaterial and MeshDepthMaterial don't need normals\n\
\n\
\t\tif ( ( material instanceof THREE.MeshBasicMaterial && !material.envMap ) || material instanceof THREE.MeshDepthMaterial ) {\n\
\n\
\t\t\treturn false;\n\
\n\
\t\t}\n\
\n\
\t\tif ( materialNeedsSmoothNormals( material ) ) {\n\
\n\
\t\t\treturn THREE.SmoothShading;\n\
\n\
\t\t} else {\n\
\n\
\t\t\treturn THREE.FlatShading;\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tfunction bufferGuessVertexColorType ( material ) {\n\
\n\
\t\tif ( material.vertexColors ) {\n\
\n\
\t\t\treturn material.vertexColors;\n\
\n\
\t\t}\n\
\n\
\t\treturn false;\n\
\n\
\t};\n\
\n\
\tfunction bufferGuessUVType ( material ) {\n\
\n\
\t\t// material must use some texture to require uvs\n\
\n\
\t\tif ( material.map || material.lightMap || material.bumpMap || material.normalMap || material.specularMap || material instanceof THREE.ShaderMaterial ) {\n\
\n\
\t\t\treturn true;\n\
\n\
\t\t}\n\
\n\
\t\treturn false;\n\
\n\
\t};\n\
\n\
\t//\n\
\n\
\tfunction initDirectBuffers( geometry ) {\n\
\n\
\t\tvar a, attribute, type;\n\
\n\
\t\tfor ( a in geometry.attributes ) {\n\
\n\
\t\t\tif ( a === \"index\" ) {\n\
\n\
\t\t\t\ttype = _gl.ELEMENT_ARRAY_BUFFER;\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\ttype = _gl.ARRAY_BUFFER;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tattribute = geometry.attributes[ a ];\n\
\n\
\t\t\tattribute.buffer = _gl.createBuffer();\n\
\n\
\t\t\t_gl.bindBuffer( type, attribute.buffer );\n\
\t\t\t_gl.bufferData( type, attribute.array, _gl.STATIC_DRAW );\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\t// Buffer setting\n\
\n\
\tfunction setParticleBuffers ( geometry, hint, object ) {\n\
\n\
\t\tvar v, c, vertex, offset, index, color,\n\
\n\
\t\tvertices = geometry.vertices,\n\
\t\tvl = vertices.length,\n\
\n\
\t\tcolors = geometry.colors,\n\
\t\tcl = colors.length,\n\
\n\
\t\tvertexArray = geometry.__vertexArray,\n\
\t\tcolorArray = geometry.__colorArray,\n\
\n\
\t\tsortArray = geometry.__sortArray,\n\
\n\
\t\tdirtyVertices = geometry.verticesNeedUpdate,\n\
\t\tdirtyElements = geometry.elementsNeedUpdate,\n\
\t\tdirtyColors = geometry.colorsNeedUpdate,\n\
\n\
\t\tcustomAttributes = geometry.__webglCustomAttributesList,\n\
\t\ti, il,\n\
\t\ta, ca, cal, value,\n\
\t\tcustomAttribute;\n\
\n\
\t\tif ( object.sortParticles ) {\n\
\n\
\t\t\t_projScreenMatrixPS.copy( _projScreenMatrix );\n\
\t\t\t_projScreenMatrixPS.multiplySelf( object.matrixWorld );\n\
\n\
\t\t\tfor ( v = 0; v < vl; v ++ ) {\n\
\n\
\t\t\t\tvertex = vertices[ v ];\n\
\n\
\t\t\t\t_vector3.copy( vertex );\n\
\t\t\t\t_projScreenMatrixPS.multiplyVector3( _vector3 );\n\
\n\
\t\t\t\tsortArray[ v ] = [ _vector3.z, v ];\n\
\n\
\t\t\t}\n\
\n\
\t\t\tsortArray.sort( function( a, b ) { return b[ 0 ] - a[ 0 ]; } );\n\
\n\
\t\t\tfor ( v = 0; v < vl; v ++ ) {\n\
\n\
\t\t\t\tvertex = vertices[ sortArray[v][1] ];\n\
\n\
\t\t\t\toffset = v * 3;\n\
\n\
\t\t\t\tvertexArray[ offset ]     = vertex.x;\n\
\t\t\t\tvertexArray[ offset + 1 ] = vertex.y;\n\
\t\t\t\tvertexArray[ offset + 2 ] = vertex.z;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tfor ( c = 0; c < cl; c ++ ) {\n\
\n\
\t\t\t\toffset = c * 3;\n\
\n\
\t\t\t\tcolor = colors[ sortArray[c][1] ];\n\
\n\
\t\t\t\tcolorArray[ offset ]     = color.r;\n\
\t\t\t\tcolorArray[ offset + 1 ] = color.g;\n\
\t\t\t\tcolorArray[ offset + 2 ] = color.b;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( customAttributes ) {\n\
\n\
\t\t\t\tfor ( i = 0, il = customAttributes.length; i < il; i ++ ) {\n\
\n\
\t\t\t\t\tcustomAttribute = customAttributes[ i ];\n\
\n\
\t\t\t\t\tif ( ! ( customAttribute.boundTo === undefined || customAttribute.boundTo === \"vertices\" ) ) continue;\n\
\n\
\t\t\t\t\toffset = 0;\n\
\n\
\t\t\t\t\tcal = customAttribute.value.length;\n\
\n\
\t\t\t\t\tif ( customAttribute.size === 1 ) {\n\
\n\
\t\t\t\t\t\tfor ( ca = 0; ca < cal; ca ++ ) {\n\
\n\
\t\t\t\t\t\t\tindex = sortArray[ ca ][ 1 ];\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ ca ] = customAttribute.value[ index ];\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t} else if ( customAttribute.size === 2 ) {\n\
\n\
\t\t\t\t\t\tfor ( ca = 0; ca < cal; ca ++ ) {\n\
\n\
\t\t\t\t\t\t\tindex = sortArray[ ca ][ 1 ];\n\
\n\
\t\t\t\t\t\t\tvalue = customAttribute.value[ index ];\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset ] \t= value.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset + 1 ] = value.y;\n\
\n\
\t\t\t\t\t\t\toffset += 2;\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t} else if ( customAttribute.size === 3 ) {\n\
\n\
\t\t\t\t\t\tif ( customAttribute.type === \"c\" ) {\n\
\n\
\t\t\t\t\t\t\tfor ( ca = 0; ca < cal; ca ++ ) {\n\
\n\
\t\t\t\t\t\t\t\tindex = sortArray[ ca ][ 1 ];\n\
\n\
\t\t\t\t\t\t\t\tvalue = customAttribute.value[ index ];\n\
\n\
\t\t\t\t\t\t\t\tcustomAttribute.array[ offset ]     = value.r;\n\
\t\t\t\t\t\t\t\tcustomAttribute.array[ offset + 1 ] = value.g;\n\
\t\t\t\t\t\t\t\tcustomAttribute.array[ offset + 2 ] = value.b;\n\
\n\
\t\t\t\t\t\t\t\toffset += 3;\n\
\n\
\t\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\t} else {\n\
\n\
\t\t\t\t\t\t\tfor ( ca = 0; ca < cal; ca ++ ) {\n\
\n\
\t\t\t\t\t\t\t\tindex = sortArray[ ca ][ 1 ];\n\
\n\
\t\t\t\t\t\t\t\tvalue = customAttribute.value[ index ];\n\
\n\
\t\t\t\t\t\t\t\tcustomAttribute.array[ offset ] \t= value.x;\n\
\t\t\t\t\t\t\t\tcustomAttribute.array[ offset + 1 ] = value.y;\n\
\t\t\t\t\t\t\t\tcustomAttribute.array[ offset + 2 ] = value.z;\n\
\n\
\t\t\t\t\t\t\t\toffset += 3;\n\
\n\
\t\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t} else if ( customAttribute.size === 4 ) {\n\
\n\
\t\t\t\t\t\tfor ( ca = 0; ca < cal; ca ++ ) {\n\
\n\
\t\t\t\t\t\t\tindex = sortArray[ ca ][ 1 ];\n\
\n\
\t\t\t\t\t\t\tvalue = customAttribute.value[ index ];\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset ]      = value.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset + 1  ] = value.y;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset + 2  ] = value.z;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset + 3  ] = value.w;\n\
\n\
\t\t\t\t\t\t\toffset += 4;\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t} else {\n\
\n\
\t\t\tif ( dirtyVertices ) {\n\
\n\
\t\t\t\tfor ( v = 0; v < vl; v ++ ) {\n\
\n\
\t\t\t\t\tvertex = vertices[ v ];\n\
\n\
\t\t\t\t\toffset = v * 3;\n\
\n\
\t\t\t\t\tvertexArray[ offset ]     = vertex.x;\n\
\t\t\t\t\tvertexArray[ offset + 1 ] = vertex.y;\n\
\t\t\t\t\tvertexArray[ offset + 2 ] = vertex.z;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( dirtyColors ) {\n\
\n\
\t\t\t\tfor ( c = 0; c < cl; c ++ ) {\n\
\n\
\t\t\t\t\tcolor = colors[ c ];\n\
\n\
\t\t\t\t\toffset = c * 3;\n\
\n\
\t\t\t\t\tcolorArray[ offset ]     = color.r;\n\
\t\t\t\t\tcolorArray[ offset + 1 ] = color.g;\n\
\t\t\t\t\tcolorArray[ offset + 2 ] = color.b;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( customAttributes ) {\n\
\n\
\t\t\t\tfor ( i = 0, il = customAttributes.length; i < il; i ++ ) {\n\
\n\
\t\t\t\t\tcustomAttribute = customAttributes[ i ];\n\
\n\
\t\t\t\t\tif ( customAttribute.needsUpdate &&\n\
\t\t\t\t\t\t ( customAttribute.boundTo === undefined ||\n\
\t\t\t\t\t\t   customAttribute.boundTo === \"vertices\") ) {\n\
\n\
\t\t\t\t\t\tcal = customAttribute.value.length;\n\
\n\
\t\t\t\t\t\toffset = 0;\n\
\n\
\t\t\t\t\t\tif ( customAttribute.size === 1 ) {\n\
\n\
\t\t\t\t\t\t\tfor ( ca = 0; ca < cal; ca ++ ) {\n\
\n\
\t\t\t\t\t\t\t\tcustomAttribute.array[ ca ] = customAttribute.value[ ca ];\n\
\n\
\t\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\t} else if ( customAttribute.size === 2 ) {\n\
\n\
\t\t\t\t\t\t\tfor ( ca = 0; ca < cal; ca ++ ) {\n\
\n\
\t\t\t\t\t\t\t\tvalue = customAttribute.value[ ca ];\n\
\n\
\t\t\t\t\t\t\t\tcustomAttribute.array[ offset ] \t= value.x;\n\
\t\t\t\t\t\t\t\tcustomAttribute.array[ offset + 1 ] = value.y;\n\
\n\
\t\t\t\t\t\t\t\toffset += 2;\n\
\n\
\t\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\t} else if ( customAttribute.size === 3 ) {\n\
\n\
\t\t\t\t\t\t\tif ( customAttribute.type === \"c\" ) {\n\
\n\
\t\t\t\t\t\t\t\tfor ( ca = 0; ca < cal; ca ++ ) {\n\
\n\
\t\t\t\t\t\t\t\t\tvalue = customAttribute.value[ ca ];\n\
\n\
\t\t\t\t\t\t\t\t\tcustomAttribute.array[ offset ] \t= value.r;\n\
\t\t\t\t\t\t\t\t\tcustomAttribute.array[ offset + 1 ] = value.g;\n\
\t\t\t\t\t\t\t\t\tcustomAttribute.array[ offset + 2 ] = value.b;\n\
\n\
\t\t\t\t\t\t\t\t\toffset += 3;\n\
\n\
\t\t\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\t\t} else {\n\
\n\
\t\t\t\t\t\t\t\tfor ( ca = 0; ca < cal; ca ++ ) {\n\
\n\
\t\t\t\t\t\t\t\t\tvalue = customAttribute.value[ ca ];\n\
\n\
\t\t\t\t\t\t\t\t\tcustomAttribute.array[ offset ] \t= value.x;\n\
\t\t\t\t\t\t\t\t\tcustomAttribute.array[ offset + 1 ] = value.y;\n\
\t\t\t\t\t\t\t\t\tcustomAttribute.array[ offset + 2 ] = value.z;\n\
\n\
\t\t\t\t\t\t\t\t\toffset += 3;\n\
\n\
\t\t\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\t} else if ( customAttribute.size === 4 ) {\n\
\n\
\t\t\t\t\t\t\tfor ( ca = 0; ca < cal; ca ++ ) {\n\
\n\
\t\t\t\t\t\t\t\tvalue = customAttribute.value[ ca ];\n\
\n\
\t\t\t\t\t\t\t\tcustomAttribute.array[ offset ]      = value.x;\n\
\t\t\t\t\t\t\t\tcustomAttribute.array[ offset + 1  ] = value.y;\n\
\t\t\t\t\t\t\t\tcustomAttribute.array[ offset + 2  ] = value.z;\n\
\t\t\t\t\t\t\t\tcustomAttribute.array[ offset + 3  ] = value.w;\n\
\n\
\t\t\t\t\t\t\t\toffset += 4;\n\
\n\
\t\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tif ( dirtyVertices || object.sortParticles ) {\n\
\n\
\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, geometry.__webglVertexBuffer );\n\
\t\t\t_gl.bufferData( _gl.ARRAY_BUFFER, vertexArray, hint );\n\
\n\
\t\t}\n\
\n\
\t\tif ( dirtyColors || object.sortParticles ) {\n\
\n\
\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, geometry.__webglColorBuffer );\n\
\t\t\t_gl.bufferData( _gl.ARRAY_BUFFER, colorArray, hint );\n\
\n\
\t\t}\n\
\n\
\t\tif ( customAttributes ) {\n\
\n\
\t\t\tfor ( i = 0, il = customAttributes.length; i < il; i ++ ) {\n\
\n\
\t\t\t\tcustomAttribute = customAttributes[ i ];\n\
\n\
\t\t\t\tif ( customAttribute.needsUpdate || object.sortParticles ) {\n\
\n\
\t\t\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, customAttribute.buffer );\n\
\t\t\t\t\t_gl.bufferData( _gl.ARRAY_BUFFER, customAttribute.array, hint );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\n\
\t};\n\
\n\
\tfunction setLineBuffers ( geometry, hint ) {\n\
\n\
\t\tvar v, c, vertex, offset, color,\n\
\n\
\t\tvertices = geometry.vertices,\n\
\t\tcolors = geometry.colors,\n\
\t\tvl = vertices.length,\n\
\t\tcl = colors.length,\n\
\n\
\t\tvertexArray = geometry.__vertexArray,\n\
\t\tcolorArray = geometry.__colorArray,\n\
\n\
\t\tdirtyVertices = geometry.verticesNeedUpdate,\n\
\t\tdirtyColors = geometry.colorsNeedUpdate,\n\
\n\
\t\tcustomAttributes = geometry.__webglCustomAttributesList,\n\
\n\
\t\ti, il,\n\
\t\ta, ca, cal, value,\n\
\t\tcustomAttribute;\n\
\n\
\t\tif ( dirtyVertices ) {\n\
\n\
\t\t\tfor ( v = 0; v < vl; v ++ ) {\n\
\n\
\t\t\t\tvertex = vertices[ v ];\n\
\n\
\t\t\t\toffset = v * 3;\n\
\n\
\t\t\t\tvertexArray[ offset ]     = vertex.x;\n\
\t\t\t\tvertexArray[ offset + 1 ] = vertex.y;\n\
\t\t\t\tvertexArray[ offset + 2 ] = vertex.z;\n\
\n\
\t\t\t}\n\
\n\
\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, geometry.__webglVertexBuffer );\n\
\t\t\t_gl.bufferData( _gl.ARRAY_BUFFER, vertexArray, hint );\n\
\n\
\t\t}\n\
\n\
\t\tif ( dirtyColors ) {\n\
\n\
\t\t\tfor ( c = 0; c < cl; c ++ ) {\n\
\n\
\t\t\t\tcolor = colors[ c ];\n\
\n\
\t\t\t\toffset = c * 3;\n\
\n\
\t\t\t\tcolorArray[ offset ]     = color.r;\n\
\t\t\t\tcolorArray[ offset + 1 ] = color.g;\n\
\t\t\t\tcolorArray[ offset + 2 ] = color.b;\n\
\n\
\t\t\t}\n\
\n\
\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, geometry.__webglColorBuffer );\n\
\t\t\t_gl.bufferData( _gl.ARRAY_BUFFER, colorArray, hint );\n\
\n\
\t\t}\n\
\n\
\t\tif ( customAttributes ) {\n\
\n\
\t\t\tfor ( i = 0, il = customAttributes.length; i < il; i ++ ) {\n\
\n\
\t\t\t\tcustomAttribute = customAttributes[ i ];\n\
\n\
\t\t\t\tif ( customAttribute.needsUpdate &&\n\
\t\t\t\t\t ( customAttribute.boundTo === undefined ||\n\
\t\t\t\t\t   customAttribute.boundTo === \"vertices\" ) ) {\n\
\n\
\t\t\t\t\toffset = 0;\n\
\n\
\t\t\t\t\tcal = customAttribute.value.length;\n\
\n\
\t\t\t\t\tif ( customAttribute.size === 1 ) {\n\
\n\
\t\t\t\t\t\tfor ( ca = 0; ca < cal; ca ++ ) {\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ ca ] = customAttribute.value[ ca ];\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t} else if ( customAttribute.size === 2 ) {\n\
\n\
\t\t\t\t\t\tfor ( ca = 0; ca < cal; ca ++ ) {\n\
\n\
\t\t\t\t\t\t\tvalue = customAttribute.value[ ca ];\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset ] \t= value.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset + 1 ] = value.y;\n\
\n\
\t\t\t\t\t\t\toffset += 2;\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t} else if ( customAttribute.size === 3 ) {\n\
\n\
\t\t\t\t\t\tif ( customAttribute.type === \"c\" ) {\n\
\n\
\t\t\t\t\t\t\tfor ( ca = 0; ca < cal; ca ++ ) {\n\
\n\
\t\t\t\t\t\t\t\tvalue = customAttribute.value[ ca ];\n\
\n\
\t\t\t\t\t\t\t\tcustomAttribute.array[ offset ] \t= value.r;\n\
\t\t\t\t\t\t\t\tcustomAttribute.array[ offset + 1 ] = value.g;\n\
\t\t\t\t\t\t\t\tcustomAttribute.array[ offset + 2 ] = value.b;\n\
\n\
\t\t\t\t\t\t\t\toffset += 3;\n\
\n\
\t\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\t} else {\n\
\n\
\t\t\t\t\t\t\tfor ( ca = 0; ca < cal; ca ++ ) {\n\
\n\
\t\t\t\t\t\t\t\tvalue = customAttribute.value[ ca ];\n\
\n\
\t\t\t\t\t\t\t\tcustomAttribute.array[ offset ] \t= value.x;\n\
\t\t\t\t\t\t\t\tcustomAttribute.array[ offset + 1 ] = value.y;\n\
\t\t\t\t\t\t\t\tcustomAttribute.array[ offset + 2 ] = value.z;\n\
\n\
\t\t\t\t\t\t\t\toffset += 3;\n\
\n\
\t\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t} else if ( customAttribute.size === 4 ) {\n\
\n\
\t\t\t\t\t\tfor ( ca = 0; ca < cal; ca ++ ) {\n\
\n\
\t\t\t\t\t\t\tvalue = customAttribute.value[ ca ];\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset ] \t = value.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset + 1  ] = value.y;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset + 2  ] = value.z;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset + 3  ] = value.w;\n\
\n\
\t\t\t\t\t\t\toffset += 4;\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, customAttribute.buffer );\n\
\t\t\t\t\t_gl.bufferData( _gl.ARRAY_BUFFER, customAttribute.array, hint );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tfunction setRibbonBuffers ( geometry, hint ) {\n\
\n\
\t\tvar v, c, vertex, offset, color,\n\
\n\
\t\tvertices = geometry.vertices,\n\
\t\tcolors = geometry.colors,\n\
\t\tvl = vertices.length,\n\
\t\tcl = colors.length,\n\
\n\
\t\tvertexArray = geometry.__vertexArray,\n\
\t\tcolorArray = geometry.__colorArray,\n\
\n\
\t\tdirtyVertices = geometry.verticesNeedUpdate,\n\
\t\tdirtyColors = geometry.colorsNeedUpdate;\n\
\n\
\t\tif ( dirtyVertices ) {\n\
\n\
\t\t\tfor ( v = 0; v < vl; v ++ ) {\n\
\n\
\t\t\t\tvertex = vertices[ v ];\n\
\n\
\t\t\t\toffset = v * 3;\n\
\n\
\t\t\t\tvertexArray[ offset ]     = vertex.x;\n\
\t\t\t\tvertexArray[ offset + 1 ] = vertex.y;\n\
\t\t\t\tvertexArray[ offset + 2 ] = vertex.z;\n\
\n\
\t\t\t}\n\
\n\
\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, geometry.__webglVertexBuffer );\n\
\t\t\t_gl.bufferData( _gl.ARRAY_BUFFER, vertexArray, hint );\n\
\n\
\t\t}\n\
\n\
\t\tif ( dirtyColors ) {\n\
\n\
\t\t\tfor ( c = 0; c < cl; c ++ ) {\n\
\n\
\t\t\t\tcolor = colors[ c ];\n\
\n\
\t\t\t\toffset = c * 3;\n\
\n\
\t\t\t\tcolorArray[ offset ]     = color.r;\n\
\t\t\t\tcolorArray[ offset + 1 ] = color.g;\n\
\t\t\t\tcolorArray[ offset + 2 ] = color.b;\n\
\n\
\t\t\t}\n\
\n\
\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, geometry.__webglColorBuffer );\n\
\t\t\t_gl.bufferData( _gl.ARRAY_BUFFER, colorArray, hint );\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tfunction setMeshBuffers( geometryGroup, object, hint, dispose, material ) {\n\
\n\
\t\tif ( ! geometryGroup.__inittedArrays ) {\n\
\n\
\t\t\t// console.log( object );\n\
\t\t\treturn;\n\
\n\
\t\t}\n\
\n\
\t\tvar normalType = bufferGuessNormalType( material ),\n\
\t\tvertexColorType = bufferGuessVertexColorType( material ),\n\
\t\tuvType = bufferGuessUVType( material ),\n\
\n\
\t\tneedsSmoothNormals = ( normalType === THREE.SmoothShading );\n\
\n\
\t\tvar f, fl, fi, face,\n\
\t\tvertexNormals, faceNormal, normal,\n\
\t\tvertexColors, faceColor,\n\
\t\tvertexTangents,\n\
\t\tuv, uv2, v1, v2, v3, v4, t1, t2, t3, t4, n1, n2, n3, n4,\n\
\t\tc1, c2, c3, c4,\n\
\t\tsw1, sw2, sw3, sw4,\n\
\t\tsi1, si2, si3, si4,\n\
\t\tsa1, sa2, sa3, sa4,\n\
\t\tsb1, sb2, sb3, sb4,\n\
\t\tm, ml, i, il,\n\
\t\tvn, uvi, uv2i,\n\
\t\tvk, vkl, vka,\n\
\t\tnka, chf, faceVertexNormals,\n\
\t\ta,\n\
\n\
\t\tvertexIndex = 0,\n\
\n\
\t\toffset = 0,\n\
\t\toffset_uv = 0,\n\
\t\toffset_uv2 = 0,\n\
\t\toffset_face = 0,\n\
\t\toffset_normal = 0,\n\
\t\toffset_tangent = 0,\n\
\t\toffset_line = 0,\n\
\t\toffset_color = 0,\n\
\t\toffset_skin = 0,\n\
\t\toffset_morphTarget = 0,\n\
\t\toffset_custom = 0,\n\
\t\toffset_customSrc = 0,\n\
\n\
\t\tvalue,\n\
\n\
\t\tvertexArray = geometryGroup.__vertexArray,\n\
\t\tuvArray = geometryGroup.__uvArray,\n\
\t\tuv2Array = geometryGroup.__uv2Array,\n\
\t\tnormalArray = geometryGroup.__normalArray,\n\
\t\ttangentArray = geometryGroup.__tangentArray,\n\
\t\tcolorArray = geometryGroup.__colorArray,\n\
\n\
\t\tskinIndexArray = geometryGroup.__skinIndexArray,\n\
\t\tskinWeightArray = geometryGroup.__skinWeightArray,\n\
\n\
\t\tmorphTargetsArrays = geometryGroup.__morphTargetsArrays,\n\
\t\tmorphNormalsArrays = geometryGroup.__morphNormalsArrays,\n\
\n\
\t\tcustomAttributes = geometryGroup.__webglCustomAttributesList,\n\
\t\tcustomAttribute,\n\
\n\
\t\tfaceArray = geometryGroup.__faceArray,\n\
\t\tlineArray = geometryGroup.__lineArray,\n\
\n\
\t\tgeometry = object.geometry, // this is shared for all chunks\n\
\n\
\t\tdirtyVertices = geometry.verticesNeedUpdate,\n\
\t\tdirtyElements = geometry.elementsNeedUpdate,\n\
\t\tdirtyUvs = geometry.uvsNeedUpdate,\n\
\t\tdirtyNormals = geometry.normalsNeedUpdate,\n\
\t\tdirtyTangents = geometry.tangentsNeedUpdate,\n\
\t\tdirtyColors = geometry.colorsNeedUpdate,\n\
\t\tdirtyMorphTargets = geometry.morphTargetsNeedUpdate,\n\
\n\
\t\tvertices = geometry.vertices,\n\
\t\tchunk_faces3 = geometryGroup.faces3,\n\
\t\tchunk_faces4 = geometryGroup.faces4,\n\
\t\tobj_faces = geometry.faces,\n\
\n\
\t\tobj_uvs  = geometry.faceVertexUvs[ 0 ],\n\
\t\tobj_uvs2 = geometry.faceVertexUvs[ 1 ],\n\
\n\
\t\tobj_colors = geometry.colors,\n\
\n\
\t\tobj_skinIndices = geometry.skinIndices,\n\
\t\tobj_skinWeights = geometry.skinWeights,\n\
\n\
\t\tmorphTargets = geometry.morphTargets,\n\
\t\tmorphNormals = geometry.morphNormals;\n\
\n\
\t\tif ( dirtyVertices ) {\n\
\n\
\t\t\tfor ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\tface = obj_faces[ chunk_faces3[ f ] ];\n\
\n\
\t\t\t\tv1 = vertices[ face.a ];\n\
\t\t\t\tv2 = vertices[ face.b ];\n\
\t\t\t\tv3 = vertices[ face.c ];\n\
\n\
\t\t\t\tvertexArray[ offset ]     = v1.x;\n\
\t\t\t\tvertexArray[ offset + 1 ] = v1.y;\n\
\t\t\t\tvertexArray[ offset + 2 ] = v1.z;\n\
\n\
\t\t\t\tvertexArray[ offset + 3 ] = v2.x;\n\
\t\t\t\tvertexArray[ offset + 4 ] = v2.y;\n\
\t\t\t\tvertexArray[ offset + 5 ] = v2.z;\n\
\n\
\t\t\t\tvertexArray[ offset + 6 ] = v3.x;\n\
\t\t\t\tvertexArray[ offset + 7 ] = v3.y;\n\
\t\t\t\tvertexArray[ offset + 8 ] = v3.z;\n\
\n\
\t\t\t\toffset += 9;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tfor ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\tface = obj_faces[ chunk_faces4[ f ] ];\n\
\n\
\t\t\t\tv1 = vertices[ face.a ];\n\
\t\t\t\tv2 = vertices[ face.b ];\n\
\t\t\t\tv3 = vertices[ face.c ];\n\
\t\t\t\tv4 = vertices[ face.d ];\n\
\n\
\t\t\t\tvertexArray[ offset ]     = v1.x;\n\
\t\t\t\tvertexArray[ offset + 1 ] = v1.y;\n\
\t\t\t\tvertexArray[ offset + 2 ] = v1.z;\n\
\n\
\t\t\t\tvertexArray[ offset + 3 ] = v2.x;\n\
\t\t\t\tvertexArray[ offset + 4 ] = v2.y;\n\
\t\t\t\tvertexArray[ offset + 5 ] = v2.z;\n\
\n\
\t\t\t\tvertexArray[ offset + 6 ] = v3.x;\n\
\t\t\t\tvertexArray[ offset + 7 ] = v3.y;\n\
\t\t\t\tvertexArray[ offset + 8 ] = v3.z;\n\
\n\
\t\t\t\tvertexArray[ offset + 9 ]  = v4.x;\n\
\t\t\t\tvertexArray[ offset + 10 ] = v4.y;\n\
\t\t\t\tvertexArray[ offset + 11 ] = v4.z;\n\
\n\
\t\t\t\toffset += 12;\n\
\n\
\t\t\t}\n\
\n\
\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglVertexBuffer );\n\
\t\t\t_gl.bufferData( _gl.ARRAY_BUFFER, vertexArray, hint );\n\
\n\
\t\t}\n\
\n\
\t\tif ( dirtyMorphTargets ) {\n\
\n\
\t\t\tfor ( vk = 0, vkl = morphTargets.length; vk < vkl; vk ++ ) {\n\
\n\
\t\t\t\toffset_morphTarget = 0;\n\
\n\
\t\t\t\tfor ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\t\tchf = chunk_faces3[ f ];\n\
\t\t\t\t\tface = obj_faces[ chf ];\n\
\n\
\t\t\t\t\t// morph positions\n\
\n\
\t\t\t\t\tv1 = morphTargets[ vk ].vertices[ face.a ];\n\
\t\t\t\t\tv2 = morphTargets[ vk ].vertices[ face.b ];\n\
\t\t\t\t\tv3 = morphTargets[ vk ].vertices[ face.c ];\n\
\n\
\t\t\t\t\tvka = morphTargetsArrays[ vk ];\n\
\n\
\t\t\t\t\tvka[ offset_morphTarget ] \t  = v1.x;\n\
\t\t\t\t\tvka[ offset_morphTarget + 1 ] = v1.y;\n\
\t\t\t\t\tvka[ offset_morphTarget + 2 ] = v1.z;\n\
\n\
\t\t\t\t\tvka[ offset_morphTarget + 3 ] = v2.x;\n\
\t\t\t\t\tvka[ offset_morphTarget + 4 ] = v2.y;\n\
\t\t\t\t\tvka[ offset_morphTarget + 5 ] = v2.z;\n\
\n\
\t\t\t\t\tvka[ offset_morphTarget + 6 ] = v3.x;\n\
\t\t\t\t\tvka[ offset_morphTarget + 7 ] = v3.y;\n\
\t\t\t\t\tvka[ offset_morphTarget + 8 ] = v3.z;\n\
\n\
\t\t\t\t\t// morph normals\n\
\n\
\t\t\t\t\tif ( material.morphNormals ) {\n\
\n\
\t\t\t\t\t\tif ( needsSmoothNormals ) {\n\
\n\
\t\t\t\t\t\t\tfaceVertexNormals = morphNormals[ vk ].vertexNormals[ chf ];\n\
\n\
\t\t\t\t\t\t\tn1 = faceVertexNormals.a;\n\
\t\t\t\t\t\t\tn2 = faceVertexNormals.b;\n\
\t\t\t\t\t\t\tn3 = faceVertexNormals.c;\n\
\n\
\t\t\t\t\t\t} else {\n\
\n\
\t\t\t\t\t\t\tn1 = morphNormals[ vk ].faceNormals[ chf ];\n\
\t\t\t\t\t\t\tn2 = n1;\n\
\t\t\t\t\t\t\tn3 = n1;\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\tnka = morphNormalsArrays[ vk ];\n\
\n\
\t\t\t\t\t\tnka[ offset_morphTarget ] \t  = n1.x;\n\
\t\t\t\t\t\tnka[ offset_morphTarget + 1 ] = n1.y;\n\
\t\t\t\t\t\tnka[ offset_morphTarget + 2 ] = n1.z;\n\
\n\
\t\t\t\t\t\tnka[ offset_morphTarget + 3 ] = n2.x;\n\
\t\t\t\t\t\tnka[ offset_morphTarget + 4 ] = n2.y;\n\
\t\t\t\t\t\tnka[ offset_morphTarget + 5 ] = n2.z;\n\
\n\
\t\t\t\t\t\tnka[ offset_morphTarget + 6 ] = n3.x;\n\
\t\t\t\t\t\tnka[ offset_morphTarget + 7 ] = n3.y;\n\
\t\t\t\t\t\tnka[ offset_morphTarget + 8 ] = n3.z;\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\t//\n\
\n\
\t\t\t\t\toffset_morphTarget += 9;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tfor ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\t\tchf = chunk_faces4[ f ];\n\
\t\t\t\t\tface = obj_faces[ chf ];\n\
\n\
\t\t\t\t\t// morph positions\n\
\n\
\t\t\t\t\tv1 = morphTargets[ vk ].vertices[ face.a ];\n\
\t\t\t\t\tv2 = morphTargets[ vk ].vertices[ face.b ];\n\
\t\t\t\t\tv3 = morphTargets[ vk ].vertices[ face.c ];\n\
\t\t\t\t\tv4 = morphTargets[ vk ].vertices[ face.d ];\n\
\n\
\t\t\t\t\tvka = morphTargetsArrays[ vk ];\n\
\n\
\t\t\t\t\tvka[ offset_morphTarget ] \t  = v1.x;\n\
\t\t\t\t\tvka[ offset_morphTarget + 1 ] = v1.y;\n\
\t\t\t\t\tvka[ offset_morphTarget + 2 ] = v1.z;\n\
\n\
\t\t\t\t\tvka[ offset_morphTarget + 3 ] = v2.x;\n\
\t\t\t\t\tvka[ offset_morphTarget + 4 ] = v2.y;\n\
\t\t\t\t\tvka[ offset_morphTarget + 5 ] = v2.z;\n\
\n\
\t\t\t\t\tvka[ offset_morphTarget + 6 ] = v3.x;\n\
\t\t\t\t\tvka[ offset_morphTarget + 7 ] = v3.y;\n\
\t\t\t\t\tvka[ offset_morphTarget + 8 ] = v3.z;\n\
\n\
\t\t\t\t\tvka[ offset_morphTarget + 9 ]  = v4.x;\n\
\t\t\t\t\tvka[ offset_morphTarget + 10 ] = v4.y;\n\
\t\t\t\t\tvka[ offset_morphTarget + 11 ] = v4.z;\n\
\n\
\t\t\t\t\t// morph normals\n\
\n\
\t\t\t\t\tif ( material.morphNormals ) {\n\
\n\
\t\t\t\t\t\tif ( needsSmoothNormals ) {\n\
\n\
\t\t\t\t\t\t\tfaceVertexNormals = morphNormals[ vk ].vertexNormals[ chf ];\n\
\n\
\t\t\t\t\t\t\tn1 = faceVertexNormals.a;\n\
\t\t\t\t\t\t\tn2 = faceVertexNormals.b;\n\
\t\t\t\t\t\t\tn3 = faceVertexNormals.c;\n\
\t\t\t\t\t\t\tn4 = faceVertexNormals.d;\n\
\n\
\t\t\t\t\t\t} else {\n\
\n\
\t\t\t\t\t\t\tn1 = morphNormals[ vk ].faceNormals[ chf ];\n\
\t\t\t\t\t\t\tn2 = n1;\n\
\t\t\t\t\t\t\tn3 = n1;\n\
\t\t\t\t\t\t\tn4 = n1;\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\tnka = morphNormalsArrays[ vk ];\n\
\n\
\t\t\t\t\t\tnka[ offset_morphTarget ] \t  = n1.x;\n\
\t\t\t\t\t\tnka[ offset_morphTarget + 1 ] = n1.y;\n\
\t\t\t\t\t\tnka[ offset_morphTarget + 2 ] = n1.z;\n\
\n\
\t\t\t\t\t\tnka[ offset_morphTarget + 3 ] = n2.x;\n\
\t\t\t\t\t\tnka[ offset_morphTarget + 4 ] = n2.y;\n\
\t\t\t\t\t\tnka[ offset_morphTarget + 5 ] = n2.z;\n\
\n\
\t\t\t\t\t\tnka[ offset_morphTarget + 6 ] = n3.x;\n\
\t\t\t\t\t\tnka[ offset_morphTarget + 7 ] = n3.y;\n\
\t\t\t\t\t\tnka[ offset_morphTarget + 8 ] = n3.z;\n\
\n\
\t\t\t\t\t\tnka[ offset_morphTarget + 9 ]  = n4.x;\n\
\t\t\t\t\t\tnka[ offset_morphTarget + 10 ] = n4.y;\n\
\t\t\t\t\t\tnka[ offset_morphTarget + 11 ] = n4.z;\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\t//\n\
\n\
\t\t\t\t\toffset_morphTarget += 12;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphTargetsBuffers[ vk ] );\n\
\t\t\t\t_gl.bufferData( _gl.ARRAY_BUFFER, morphTargetsArrays[ vk ], hint );\n\
\n\
\t\t\t\tif ( material.morphNormals ) {\n\
\n\
\t\t\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphNormalsBuffers[ vk ] );\n\
\t\t\t\t\t_gl.bufferData( _gl.ARRAY_BUFFER, morphNormalsArrays[ vk ], hint );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tif ( obj_skinWeights.length ) {\n\
\n\
\t\t\tfor ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\tface = obj_faces[ chunk_faces3[ f ]\t];\n\
\n\
\t\t\t\t// weights\n\
\n\
\t\t\t\tsw1 = obj_skinWeights[ face.a ];\n\
\t\t\t\tsw2 = obj_skinWeights[ face.b ];\n\
\t\t\t\tsw3 = obj_skinWeights[ face.c ];\n\
\n\
\t\t\t\tskinWeightArray[ offset_skin ]     = sw1.x;\n\
\t\t\t\tskinWeightArray[ offset_skin + 1 ] = sw1.y;\n\
\t\t\t\tskinWeightArray[ offset_skin + 2 ] = sw1.z;\n\
\t\t\t\tskinWeightArray[ offset_skin + 3 ] = sw1.w;\n\
\n\
\t\t\t\tskinWeightArray[ offset_skin + 4 ] = sw2.x;\n\
\t\t\t\tskinWeightArray[ offset_skin + 5 ] = sw2.y;\n\
\t\t\t\tskinWeightArray[ offset_skin + 6 ] = sw2.z;\n\
\t\t\t\tskinWeightArray[ offset_skin + 7 ] = sw2.w;\n\
\n\
\t\t\t\tskinWeightArray[ offset_skin + 8 ]  = sw3.x;\n\
\t\t\t\tskinWeightArray[ offset_skin + 9 ]  = sw3.y;\n\
\t\t\t\tskinWeightArray[ offset_skin + 10 ] = sw3.z;\n\
\t\t\t\tskinWeightArray[ offset_skin + 11 ] = sw3.w;\n\
\n\
\t\t\t\t// indices\n\
\n\
\t\t\t\tsi1 = obj_skinIndices[ face.a ];\n\
\t\t\t\tsi2 = obj_skinIndices[ face.b ];\n\
\t\t\t\tsi3 = obj_skinIndices[ face.c ];\n\
\n\
\t\t\t\tskinIndexArray[ offset_skin ]     = si1.x;\n\
\t\t\t\tskinIndexArray[ offset_skin + 1 ] = si1.y;\n\
\t\t\t\tskinIndexArray[ offset_skin + 2 ] = si1.z;\n\
\t\t\t\tskinIndexArray[ offset_skin + 3 ] = si1.w;\n\
\n\
\t\t\t\tskinIndexArray[ offset_skin + 4 ] = si2.x;\n\
\t\t\t\tskinIndexArray[ offset_skin + 5 ] = si2.y;\n\
\t\t\t\tskinIndexArray[ offset_skin + 6 ] = si2.z;\n\
\t\t\t\tskinIndexArray[ offset_skin + 7 ] = si2.w;\n\
\n\
\t\t\t\tskinIndexArray[ offset_skin + 8 ]  = si3.x;\n\
\t\t\t\tskinIndexArray[ offset_skin + 9 ]  = si3.y;\n\
\t\t\t\tskinIndexArray[ offset_skin + 10 ] = si3.z;\n\
\t\t\t\tskinIndexArray[ offset_skin + 11 ] = si3.w;\n\
\n\
\t\t\t\toffset_skin += 12;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tfor ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\tface = obj_faces[ chunk_faces4[ f ] ];\n\
\n\
\t\t\t\t// weights\n\
\n\
\t\t\t\tsw1 = obj_skinWeights[ face.a ];\n\
\t\t\t\tsw2 = obj_skinWeights[ face.b ];\n\
\t\t\t\tsw3 = obj_skinWeights[ face.c ];\n\
\t\t\t\tsw4 = obj_skinWeights[ face.d ];\n\
\n\
\t\t\t\tskinWeightArray[ offset_skin ]     = sw1.x;\n\
\t\t\t\tskinWeightArray[ offset_skin + 1 ] = sw1.y;\n\
\t\t\t\tskinWeightArray[ offset_skin + 2 ] = sw1.z;\n\
\t\t\t\tskinWeightArray[ offset_skin + 3 ] = sw1.w;\n\
\n\
\t\t\t\tskinWeightArray[ offset_skin + 4 ] = sw2.x;\n\
\t\t\t\tskinWeightArray[ offset_skin + 5 ] = sw2.y;\n\
\t\t\t\tskinWeightArray[ offset_skin + 6 ] = sw2.z;\n\
\t\t\t\tskinWeightArray[ offset_skin + 7 ] = sw2.w;\n\
\n\
\t\t\t\tskinWeightArray[ offset_skin + 8 ]  = sw3.x;\n\
\t\t\t\tskinWeightArray[ offset_skin + 9 ]  = sw3.y;\n\
\t\t\t\tskinWeightArray[ offset_skin + 10 ] = sw3.z;\n\
\t\t\t\tskinWeightArray[ offset_skin + 11 ] = sw3.w;\n\
\n\
\t\t\t\tskinWeightArray[ offset_skin + 12 ] = sw4.x;\n\
\t\t\t\tskinWeightArray[ offset_skin + 13 ] = sw4.y;\n\
\t\t\t\tskinWeightArray[ offset_skin + 14 ] = sw4.z;\n\
\t\t\t\tskinWeightArray[ offset_skin + 15 ] = sw4.w;\n\
\n\
\t\t\t\t// indices\n\
\n\
\t\t\t\tsi1 = obj_skinIndices[ face.a ];\n\
\t\t\t\tsi2 = obj_skinIndices[ face.b ];\n\
\t\t\t\tsi3 = obj_skinIndices[ face.c ];\n\
\t\t\t\tsi4 = obj_skinIndices[ face.d ];\n\
\n\
\t\t\t\tskinIndexArray[ offset_skin ]     = si1.x;\n\
\t\t\t\tskinIndexArray[ offset_skin + 1 ] = si1.y;\n\
\t\t\t\tskinIndexArray[ offset_skin + 2 ] = si1.z;\n\
\t\t\t\tskinIndexArray[ offset_skin + 3 ] = si1.w;\n\
\n\
\t\t\t\tskinIndexArray[ offset_skin + 4 ] = si2.x;\n\
\t\t\t\tskinIndexArray[ offset_skin + 5 ] = si2.y;\n\
\t\t\t\tskinIndexArray[ offset_skin + 6 ] = si2.z;\n\
\t\t\t\tskinIndexArray[ offset_skin + 7 ] = si2.w;\n\
\n\
\t\t\t\tskinIndexArray[ offset_skin + 8 ]  = si3.x;\n\
\t\t\t\tskinIndexArray[ offset_skin + 9 ]  = si3.y;\n\
\t\t\t\tskinIndexArray[ offset_skin + 10 ] = si3.z;\n\
\t\t\t\tskinIndexArray[ offset_skin + 11 ] = si3.w;\n\
\n\
\t\t\t\tskinIndexArray[ offset_skin + 12 ] = si4.x;\n\
\t\t\t\tskinIndexArray[ offset_skin + 13 ] = si4.y;\n\
\t\t\t\tskinIndexArray[ offset_skin + 14 ] = si4.z;\n\
\t\t\t\tskinIndexArray[ offset_skin + 15 ] = si4.w;\n\
\n\
\t\t\t\toffset_skin += 16;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( offset_skin > 0 ) {\n\
\n\
\t\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglSkinIndicesBuffer );\n\
\t\t\t\t_gl.bufferData( _gl.ARRAY_BUFFER, skinIndexArray, hint );\n\
\n\
\t\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglSkinWeightsBuffer );\n\
\t\t\t\t_gl.bufferData( _gl.ARRAY_BUFFER, skinWeightArray, hint );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tif ( dirtyColors && vertexColorType ) {\n\
\n\
\t\t\tfor ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\tface = obj_faces[ chunk_faces3[ f ]\t];\n\
\n\
\t\t\t\tvertexColors = face.vertexColors;\n\
\t\t\t\tfaceColor = face.color;\n\
\n\
\t\t\t\tif ( vertexColors.length === 3 && vertexColorType === THREE.VertexColors ) {\n\
\n\
\t\t\t\t\tc1 = vertexColors[ 0 ];\n\
\t\t\t\t\tc2 = vertexColors[ 1 ];\n\
\t\t\t\t\tc3 = vertexColors[ 2 ];\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\tc1 = faceColor;\n\
\t\t\t\t\tc2 = faceColor;\n\
\t\t\t\t\tc3 = faceColor;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tcolorArray[ offset_color ]     = c1.r;\n\
\t\t\t\tcolorArray[ offset_color + 1 ] = c1.g;\n\
\t\t\t\tcolorArray[ offset_color + 2 ] = c1.b;\n\
\n\
\t\t\t\tcolorArray[ offset_color + 3 ] = c2.r;\n\
\t\t\t\tcolorArray[ offset_color + 4 ] = c2.g;\n\
\t\t\t\tcolorArray[ offset_color + 5 ] = c2.b;\n\
\n\
\t\t\t\tcolorArray[ offset_color + 6 ] = c3.r;\n\
\t\t\t\tcolorArray[ offset_color + 7 ] = c3.g;\n\
\t\t\t\tcolorArray[ offset_color + 8 ] = c3.b;\n\
\n\
\t\t\t\toffset_color += 9;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tfor ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\tface = obj_faces[ chunk_faces4[ f ] ];\n\
\n\
\t\t\t\tvertexColors = face.vertexColors;\n\
\t\t\t\tfaceColor = face.color;\n\
\n\
\t\t\t\tif ( vertexColors.length === 4 && vertexColorType === THREE.VertexColors ) {\n\
\n\
\t\t\t\t\tc1 = vertexColors[ 0 ];\n\
\t\t\t\t\tc2 = vertexColors[ 1 ];\n\
\t\t\t\t\tc3 = vertexColors[ 2 ];\n\
\t\t\t\t\tc4 = vertexColors[ 3 ];\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\tc1 = faceColor;\n\
\t\t\t\t\tc2 = faceColor;\n\
\t\t\t\t\tc3 = faceColor;\n\
\t\t\t\t\tc4 = faceColor;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tcolorArray[ offset_color ]     = c1.r;\n\
\t\t\t\tcolorArray[ offset_color + 1 ] = c1.g;\n\
\t\t\t\tcolorArray[ offset_color + 2 ] = c1.b;\n\
\n\
\t\t\t\tcolorArray[ offset_color + 3 ] = c2.r;\n\
\t\t\t\tcolorArray[ offset_color + 4 ] = c2.g;\n\
\t\t\t\tcolorArray[ offset_color + 5 ] = c2.b;\n\
\n\
\t\t\t\tcolorArray[ offset_color + 6 ] = c3.r;\n\
\t\t\t\tcolorArray[ offset_color + 7 ] = c3.g;\n\
\t\t\t\tcolorArray[ offset_color + 8 ] = c3.b;\n\
\n\
\t\t\t\tcolorArray[ offset_color + 9 ]  = c4.r;\n\
\t\t\t\tcolorArray[ offset_color + 10 ] = c4.g;\n\
\t\t\t\tcolorArray[ offset_color + 11 ] = c4.b;\n\
\n\
\t\t\t\toffset_color += 12;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( offset_color > 0 ) {\n\
\n\
\t\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglColorBuffer );\n\
\t\t\t\t_gl.bufferData( _gl.ARRAY_BUFFER, colorArray, hint );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tif ( dirtyTangents && geometry.hasTangents ) {\n\
\n\
\t\t\tfor ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\tface = obj_faces[ chunk_faces3[ f ]\t];\n\
\n\
\t\t\t\tvertexTangents = face.vertexTangents;\n\
\n\
\t\t\t\tt1 = vertexTangents[ 0 ];\n\
\t\t\t\tt2 = vertexTangents[ 1 ];\n\
\t\t\t\tt3 = vertexTangents[ 2 ];\n\
\n\
\t\t\t\ttangentArray[ offset_tangent ]     = t1.x;\n\
\t\t\t\ttangentArray[ offset_tangent + 1 ] = t1.y;\n\
\t\t\t\ttangentArray[ offset_tangent + 2 ] = t1.z;\n\
\t\t\t\ttangentArray[ offset_tangent + 3 ] = t1.w;\n\
\n\
\t\t\t\ttangentArray[ offset_tangent + 4 ] = t2.x;\n\
\t\t\t\ttangentArray[ offset_tangent + 5 ] = t2.y;\n\
\t\t\t\ttangentArray[ offset_tangent + 6 ] = t2.z;\n\
\t\t\t\ttangentArray[ offset_tangent + 7 ] = t2.w;\n\
\n\
\t\t\t\ttangentArray[ offset_tangent + 8 ]  = t3.x;\n\
\t\t\t\ttangentArray[ offset_tangent + 9 ]  = t3.y;\n\
\t\t\t\ttangentArray[ offset_tangent + 10 ] = t3.z;\n\
\t\t\t\ttangentArray[ offset_tangent + 11 ] = t3.w;\n\
\n\
\t\t\t\toffset_tangent += 12;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tfor ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\tface = obj_faces[ chunk_faces4[ f ] ];\n\
\n\
\t\t\t\tvertexTangents = face.vertexTangents;\n\
\n\
\t\t\t\tt1 = vertexTangents[ 0 ];\n\
\t\t\t\tt2 = vertexTangents[ 1 ];\n\
\t\t\t\tt3 = vertexTangents[ 2 ];\n\
\t\t\t\tt4 = vertexTangents[ 3 ];\n\
\n\
\t\t\t\ttangentArray[ offset_tangent ]     = t1.x;\n\
\t\t\t\ttangentArray[ offset_tangent + 1 ] = t1.y;\n\
\t\t\t\ttangentArray[ offset_tangent + 2 ] = t1.z;\n\
\t\t\t\ttangentArray[ offset_tangent + 3 ] = t1.w;\n\
\n\
\t\t\t\ttangentArray[ offset_tangent + 4 ] = t2.x;\n\
\t\t\t\ttangentArray[ offset_tangent + 5 ] = t2.y;\n\
\t\t\t\ttangentArray[ offset_tangent + 6 ] = t2.z;\n\
\t\t\t\ttangentArray[ offset_tangent + 7 ] = t2.w;\n\
\n\
\t\t\t\ttangentArray[ offset_tangent + 8 ]  = t3.x;\n\
\t\t\t\ttangentArray[ offset_tangent + 9 ]  = t3.y;\n\
\t\t\t\ttangentArray[ offset_tangent + 10 ] = t3.z;\n\
\t\t\t\ttangentArray[ offset_tangent + 11 ] = t3.w;\n\
\n\
\t\t\t\ttangentArray[ offset_tangent + 12 ] = t4.x;\n\
\t\t\t\ttangentArray[ offset_tangent + 13 ] = t4.y;\n\
\t\t\t\ttangentArray[ offset_tangent + 14 ] = t4.z;\n\
\t\t\t\ttangentArray[ offset_tangent + 15 ] = t4.w;\n\
\n\
\t\t\t\toffset_tangent += 16;\n\
\n\
\t\t\t}\n\
\n\
\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglTangentBuffer );\n\
\t\t\t_gl.bufferData( _gl.ARRAY_BUFFER, tangentArray, hint );\n\
\n\
\t\t}\n\
\n\
\t\tif ( dirtyNormals && normalType ) {\n\
\n\
\t\t\tfor ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\tface = obj_faces[ chunk_faces3[ f ]\t];\n\
\n\
\t\t\t\tvertexNormals = face.vertexNormals;\n\
\t\t\t\tfaceNormal = face.normal;\n\
\n\
\t\t\t\tif ( vertexNormals.length === 3 && needsSmoothNormals ) {\n\
\n\
\t\t\t\t\tfor ( i = 0; i < 3; i ++ ) {\n\
\n\
\t\t\t\t\t\tvn = vertexNormals[ i ];\n\
\n\
\t\t\t\t\t\tnormalArray[ offset_normal ]     = vn.x;\n\
\t\t\t\t\t\tnormalArray[ offset_normal + 1 ] = vn.y;\n\
\t\t\t\t\t\tnormalArray[ offset_normal + 2 ] = vn.z;\n\
\n\
\t\t\t\t\t\toffset_normal += 3;\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\tfor ( i = 0; i < 3; i ++ ) {\n\
\n\
\t\t\t\t\t\tnormalArray[ offset_normal ]     = faceNormal.x;\n\
\t\t\t\t\t\tnormalArray[ offset_normal + 1 ] = faceNormal.y;\n\
\t\t\t\t\t\tnormalArray[ offset_normal + 2 ] = faceNormal.z;\n\
\n\
\t\t\t\t\t\toffset_normal += 3;\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t\tfor ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\tface = obj_faces[ chunk_faces4[ f ] ];\n\
\n\
\t\t\t\tvertexNormals = face.vertexNormals;\n\
\t\t\t\tfaceNormal = face.normal;\n\
\n\
\t\t\t\tif ( vertexNormals.length === 4 && needsSmoothNormals ) {\n\
\n\
\t\t\t\t\tfor ( i = 0; i < 4; i ++ ) {\n\
\n\
\t\t\t\t\t\tvn = vertexNormals[ i ];\n\
\n\
\t\t\t\t\t\tnormalArray[ offset_normal ]     = vn.x;\n\
\t\t\t\t\t\tnormalArray[ offset_normal + 1 ] = vn.y;\n\
\t\t\t\t\t\tnormalArray[ offset_normal + 2 ] = vn.z;\n\
\n\
\t\t\t\t\t\toffset_normal += 3;\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\tfor ( i = 0; i < 4; i ++ ) {\n\
\n\
\t\t\t\t\t\tnormalArray[ offset_normal ]     = faceNormal.x;\n\
\t\t\t\t\t\tnormalArray[ offset_normal + 1 ] = faceNormal.y;\n\
\t\t\t\t\t\tnormalArray[ offset_normal + 2 ] = faceNormal.z;\n\
\n\
\t\t\t\t\t\toffset_normal += 3;\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglNormalBuffer );\n\
\t\t\t_gl.bufferData( _gl.ARRAY_BUFFER, normalArray, hint );\n\
\n\
\t\t}\n\
\n\
\t\tif ( dirtyUvs && obj_uvs && uvType ) {\n\
\n\
\t\t\tfor ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\tfi = chunk_faces3[ f ];\n\
\n\
\t\t\t\tface = obj_faces[ fi ];\n\
\t\t\t\tuv = obj_uvs[ fi ];\n\
\n\
\t\t\t\tif ( uv === undefined ) continue;\n\
\n\
\t\t\t\tfor ( i = 0; i < 3; i ++ ) {\n\
\n\
\t\t\t\t\tuvi = uv[ i ];\n\
\n\
\t\t\t\t\tuvArray[ offset_uv ]     = uvi.u;\n\
\t\t\t\t\tuvArray[ offset_uv + 1 ] = uvi.v;\n\
\n\
\t\t\t\t\toffset_uv += 2;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t\tfor ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\tfi = chunk_faces4[ f ];\n\
\n\
\t\t\t\tface = obj_faces[ fi ];\n\
\t\t\t\tuv = obj_uvs[ fi ];\n\
\n\
\t\t\t\tif ( uv === undefined ) continue;\n\
\n\
\t\t\t\tfor ( i = 0; i < 4; i ++ ) {\n\
\n\
\t\t\t\t\tuvi = uv[ i ];\n\
\n\
\t\t\t\t\tuvArray[ offset_uv ]     = uvi.u;\n\
\t\t\t\t\tuvArray[ offset_uv + 1 ] = uvi.v;\n\
\n\
\t\t\t\t\toffset_uv += 2;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( offset_uv > 0 ) {\n\
\n\
\t\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglUVBuffer );\n\
\t\t\t\t_gl.bufferData( _gl.ARRAY_BUFFER, uvArray, hint );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tif ( dirtyUvs && obj_uvs2 && uvType ) {\n\
\n\
\t\t\tfor ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\tfi = chunk_faces3[ f ];\n\
\n\
\t\t\t\tface = obj_faces[ fi ];\n\
\t\t\t\tuv2 = obj_uvs2[ fi ];\n\
\n\
\t\t\t\tif ( uv2 === undefined ) continue;\n\
\n\
\t\t\t\tfor ( i = 0; i < 3; i ++ ) {\n\
\n\
\t\t\t\t\tuv2i = uv2[ i ];\n\
\n\
\t\t\t\t\tuv2Array[ offset_uv2 ]     = uv2i.u;\n\
\t\t\t\t\tuv2Array[ offset_uv2 + 1 ] = uv2i.v;\n\
\n\
\t\t\t\t\toffset_uv2 += 2;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t\tfor ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\tfi = chunk_faces4[ f ];\n\
\n\
\t\t\t\tface = obj_faces[ fi ];\n\
\t\t\t\tuv2 = obj_uvs2[ fi ];\n\
\n\
\t\t\t\tif ( uv2 === undefined ) continue;\n\
\n\
\t\t\t\tfor ( i = 0; i < 4; i ++ ) {\n\
\n\
\t\t\t\t\tuv2i = uv2[ i ];\n\
\n\
\t\t\t\t\tuv2Array[ offset_uv2 ]     = uv2i.u;\n\
\t\t\t\t\tuv2Array[ offset_uv2 + 1 ] = uv2i.v;\n\
\n\
\t\t\t\t\toffset_uv2 += 2;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( offset_uv2 > 0 ) {\n\
\n\
\t\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglUV2Buffer );\n\
\t\t\t\t_gl.bufferData( _gl.ARRAY_BUFFER, uv2Array, hint );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tif ( dirtyElements ) {\n\
\n\
\t\t\tfor ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\tface = obj_faces[ chunk_faces3[ f ]\t];\n\
\n\
\t\t\t\tfaceArray[ offset_face ] \t = vertexIndex;\n\
\t\t\t\tfaceArray[ offset_face + 1 ] = vertexIndex + 1;\n\
\t\t\t\tfaceArray[ offset_face + 2 ] = vertexIndex + 2;\n\
\n\
\t\t\t\toffset_face += 3;\n\
\n\
\t\t\t\tlineArray[ offset_line ]     = vertexIndex;\n\
\t\t\t\tlineArray[ offset_line + 1 ] = vertexIndex + 1;\n\
\n\
\t\t\t\tlineArray[ offset_line + 2 ] = vertexIndex;\n\
\t\t\t\tlineArray[ offset_line + 3 ] = vertexIndex + 2;\n\
\n\
\t\t\t\tlineArray[ offset_line + 4 ] = vertexIndex + 1;\n\
\t\t\t\tlineArray[ offset_line + 5 ] = vertexIndex + 2;\n\
\n\
\t\t\t\toffset_line += 6;\n\
\n\
\t\t\t\tvertexIndex += 3;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tfor ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\tface = obj_faces[ chunk_faces4[ f ] ];\n\
\n\
\t\t\t\tfaceArray[ offset_face ]     = vertexIndex;\n\
\t\t\t\tfaceArray[ offset_face + 1 ] = vertexIndex + 1;\n\
\t\t\t\tfaceArray[ offset_face + 2 ] = vertexIndex + 3;\n\
\n\
\t\t\t\tfaceArray[ offset_face + 3 ] = vertexIndex + 1;\n\
\t\t\t\tfaceArray[ offset_face + 4 ] = vertexIndex + 2;\n\
\t\t\t\tfaceArray[ offset_face + 5 ] = vertexIndex + 3;\n\
\n\
\t\t\t\toffset_face += 6;\n\
\n\
\t\t\t\tlineArray[ offset_line ]     = vertexIndex;\n\
\t\t\t\tlineArray[ offset_line + 1 ] = vertexIndex + 1;\n\
\n\
\t\t\t\tlineArray[ offset_line + 2 ] = vertexIndex;\n\
\t\t\t\tlineArray[ offset_line + 3 ] = vertexIndex + 3;\n\
\n\
\t\t\t\tlineArray[ offset_line + 4 ] = vertexIndex + 1;\n\
\t\t\t\tlineArray[ offset_line + 5 ] = vertexIndex + 2;\n\
\n\
\t\t\t\tlineArray[ offset_line + 6 ] = vertexIndex + 2;\n\
\t\t\t\tlineArray[ offset_line + 7 ] = vertexIndex + 3;\n\
\n\
\t\t\t\toffset_line += 8;\n\
\n\
\t\t\t\tvertexIndex += 4;\n\
\n\
\t\t\t}\n\
\n\
\t\t\t_gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, geometryGroup.__webglFaceBuffer );\n\
\t\t\t_gl.bufferData( _gl.ELEMENT_ARRAY_BUFFER, faceArray, hint );\n\
\n\
\t\t\t_gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, geometryGroup.__webglLineBuffer );\n\
\t\t\t_gl.bufferData( _gl.ELEMENT_ARRAY_BUFFER, lineArray, hint );\n\
\n\
\t\t}\n\
\n\
\t\tif ( customAttributes ) {\n\
\n\
\t\t\tfor ( i = 0, il = customAttributes.length; i < il; i ++ ) {\n\
\n\
\t\t\t\tcustomAttribute = customAttributes[ i ];\n\
\n\
\t\t\t\tif ( ! customAttribute.__original.needsUpdate ) continue;\n\
\n\
\t\t\t\toffset_custom = 0;\n\
\t\t\t\toffset_customSrc = 0;\n\
\n\
\t\t\t\tif ( customAttribute.size === 1 ) {\n\
\n\
\t\t\t\t\tif ( customAttribute.boundTo === undefined || customAttribute.boundTo === \"vertices\" ) {\n\
\n\
\t\t\t\t\t\tfor ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\t\t\t\tface = obj_faces[ chunk_faces3[ f ]\t];\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom ] \t   = customAttribute.value[ face.a ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 1 ] = customAttribute.value[ face.b ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 2 ] = customAttribute.value[ face.c ];\n\
\n\
\t\t\t\t\t\t\toffset_custom += 3;\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\tfor ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\t\t\t\tface = obj_faces[ chunk_faces4[ f ] ];\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom ] \t   = customAttribute.value[ face.a ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 1 ] = customAttribute.value[ face.b ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 2 ] = customAttribute.value[ face.c ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 3 ] = customAttribute.value[ face.d ];\n\
\n\
\t\t\t\t\t\t\toffset_custom += 4;\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t} else if ( customAttribute.boundTo === \"faces\" ) {\n\
\n\
\t\t\t\t\t\tfor ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\t\t\t\tvalue = customAttribute.value[ chunk_faces3[ f ] ];\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom ] \t   = value;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 1 ] = value;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 2 ] = value;\n\
\n\
\t\t\t\t\t\t\toffset_custom += 3;\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\tfor ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\t\t\t\tvalue = customAttribute.value[ chunk_faces4[ f ] ];\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom ] \t   = value;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 1 ] = value;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 2 ] = value;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 3 ] = value;\n\
\n\
\t\t\t\t\t\t\toffset_custom += 4;\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t} else if ( customAttribute.size === 2 ) {\n\
\n\
\t\t\t\t\tif ( customAttribute.boundTo === undefined || customAttribute.boundTo === \"vertices\" ) {\n\
\n\
\t\t\t\t\t\tfor ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\t\t\t\tface = obj_faces[ chunk_faces3[ f ]\t];\n\
\n\
\t\t\t\t\t\t\tv1 = customAttribute.value[ face.a ];\n\
\t\t\t\t\t\t\tv2 = customAttribute.value[ face.b ];\n\
\t\t\t\t\t\t\tv3 = customAttribute.value[ face.c ];\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom ] \t   = v1.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 1 ] = v1.y;\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 2 ] = v2.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 3 ] = v2.y;\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 4 ] = v3.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 5 ] = v3.y;\n\
\n\
\t\t\t\t\t\t\toffset_custom += 6;\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\tfor ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\t\t\t\tface = obj_faces[ chunk_faces4[ f ] ];\n\
\n\
\t\t\t\t\t\t\tv1 = customAttribute.value[ face.a ];\n\
\t\t\t\t\t\t\tv2 = customAttribute.value[ face.b ];\n\
\t\t\t\t\t\t\tv3 = customAttribute.value[ face.c ];\n\
\t\t\t\t\t\t\tv4 = customAttribute.value[ face.d ];\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom ] \t   = v1.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 1 ] = v1.y;\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 2 ] = v2.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 3 ] = v2.y;\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 4 ] = v3.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 5 ] = v3.y;\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 6 ] = v4.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 7 ] = v4.y;\n\
\n\
\t\t\t\t\t\t\toffset_custom += 8;\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t} else if ( customAttribute.boundTo === \"faces\" ) {\n\
\n\
\t\t\t\t\t\tfor ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\t\t\t\tvalue = customAttribute.value[ chunk_faces3[ f ] ];\n\
\n\
\t\t\t\t\t\t\tv1 = value;\n\
\t\t\t\t\t\t\tv2 = value;\n\
\t\t\t\t\t\t\tv3 = value;\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom ] \t   = v1.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 1 ] = v1.y;\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 2 ] = v2.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 3 ] = v2.y;\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 4 ] = v3.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 5 ] = v3.y;\n\
\n\
\t\t\t\t\t\t\toffset_custom += 6;\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\tfor ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\t\t\t\tvalue = customAttribute.value[ chunk_faces4[ f ] ];\n\
\n\
\t\t\t\t\t\t\tv1 = value;\n\
\t\t\t\t\t\t\tv2 = value;\n\
\t\t\t\t\t\t\tv3 = value;\n\
\t\t\t\t\t\t\tv4 = value;\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom ] \t   = v1.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 1 ] = v1.y;\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 2 ] = v2.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 3 ] = v2.y;\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 4 ] = v3.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 5 ] = v3.y;\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 6 ] = v4.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 7 ] = v4.y;\n\
\n\
\t\t\t\t\t\t\toffset_custom += 8;\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t} else if ( customAttribute.size === 3 ) {\n\
\n\
\t\t\t\t\tvar pp;\n\
\n\
\t\t\t\t\tif ( customAttribute.type === \"c\" ) {\n\
\n\
\t\t\t\t\t\tpp = [ \"r\", \"g\", \"b\" ];\n\
\n\
\t\t\t\t\t} else {\n\
\n\
\t\t\t\t\t\tpp = [ \"x\", \"y\", \"z\" ];\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\tif ( customAttribute.boundTo === undefined || customAttribute.boundTo === \"vertices\" ) {\n\
\n\
\t\t\t\t\t\tfor ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\t\t\t\tface = obj_faces[ chunk_faces3[ f ]\t];\n\
\n\
\t\t\t\t\t\t\tv1 = customAttribute.value[ face.a ];\n\
\t\t\t\t\t\t\tv2 = customAttribute.value[ face.b ];\n\
\t\t\t\t\t\t\tv3 = customAttribute.value[ face.c ];\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom ] \t   = v1[ pp[ 0 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 1 ] = v1[ pp[ 1 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 2 ] = v1[ pp[ 2 ] ];\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 3 ] = v2[ pp[ 0 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 4 ] = v2[ pp[ 1 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 5 ] = v2[ pp[ 2 ] ];\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 6 ] = v3[ pp[ 0 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 7 ] = v3[ pp[ 1 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 8 ] = v3[ pp[ 2 ] ];\n\
\n\
\t\t\t\t\t\t\toffset_custom += 9;\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\tfor ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\t\t\t\tface = obj_faces[ chunk_faces4[ f ] ];\n\
\n\
\t\t\t\t\t\t\tv1 = customAttribute.value[ face.a ];\n\
\t\t\t\t\t\t\tv2 = customAttribute.value[ face.b ];\n\
\t\t\t\t\t\t\tv3 = customAttribute.value[ face.c ];\n\
\t\t\t\t\t\t\tv4 = customAttribute.value[ face.d ];\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom  ] \t= v1[ pp[ 0 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 1  ] = v1[ pp[ 1 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 2  ] = v1[ pp[ 2 ] ];\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 3  ] = v2[ pp[ 0 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 4  ] = v2[ pp[ 1 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 5  ] = v2[ pp[ 2 ] ];\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 6  ] = v3[ pp[ 0 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 7  ] = v3[ pp[ 1 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 8  ] = v3[ pp[ 2 ] ];\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 9  ] = v4[ pp[ 0 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 10 ] = v4[ pp[ 1 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 11 ] = v4[ pp[ 2 ] ];\n\
\n\
\t\t\t\t\t\t\toffset_custom += 12;\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t} else if ( customAttribute.boundTo === \"faces\" ) {\n\
\n\
\t\t\t\t\t\tfor ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\t\t\t\tvalue = customAttribute.value[ chunk_faces3[ f ] ];\n\
\n\
\t\t\t\t\t\t\tv1 = value;\n\
\t\t\t\t\t\t\tv2 = value;\n\
\t\t\t\t\t\t\tv3 = value;\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom ] \t   = v1[ pp[ 0 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 1 ] = v1[ pp[ 1 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 2 ] = v1[ pp[ 2 ] ];\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 3 ] = v2[ pp[ 0 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 4 ] = v2[ pp[ 1 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 5 ] = v2[ pp[ 2 ] ];\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 6 ] = v3[ pp[ 0 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 7 ] = v3[ pp[ 1 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 8 ] = v3[ pp[ 2 ] ];\n\
\n\
\t\t\t\t\t\t\toffset_custom += 9;\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\tfor ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\t\t\t\tvalue = customAttribute.value[ chunk_faces4[ f ] ];\n\
\n\
\t\t\t\t\t\t\tv1 = value;\n\
\t\t\t\t\t\t\tv2 = value;\n\
\t\t\t\t\t\t\tv3 = value;\n\
\t\t\t\t\t\t\tv4 = value;\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom  ] \t= v1[ pp[ 0 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 1  ] = v1[ pp[ 1 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 2  ] = v1[ pp[ 2 ] ];\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 3  ] = v2[ pp[ 0 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 4  ] = v2[ pp[ 1 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 5  ] = v2[ pp[ 2 ] ];\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 6  ] = v3[ pp[ 0 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 7  ] = v3[ pp[ 1 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 8  ] = v3[ pp[ 2 ] ];\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 9  ] = v4[ pp[ 0 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 10 ] = v4[ pp[ 1 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 11 ] = v4[ pp[ 2 ] ];\n\
\n\
\t\t\t\t\t\t\toffset_custom += 12;\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t} else if ( customAttribute.boundTo === \"faceVertices\" ) {\n\
\n\
\t\t\t\t\t\tfor ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\t\t\t\tvalue = customAttribute.value[ chunk_faces3[ f ] ];\n\
\n\
\t\t\t\t\t\t\tv1 = value[ 0 ];\n\
\t\t\t\t\t\t\tv2 = value[ 1 ];\n\
\t\t\t\t\t\t\tv3 = value[ 2 ];\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom ] \t   = v1[ pp[ 0 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 1 ] = v1[ pp[ 1 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 2 ] = v1[ pp[ 2 ] ];\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 3 ] = v2[ pp[ 0 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 4 ] = v2[ pp[ 1 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 5 ] = v2[ pp[ 2 ] ];\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 6 ] = v3[ pp[ 0 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 7 ] = v3[ pp[ 1 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 8 ] = v3[ pp[ 2 ] ];\n\
\n\
\t\t\t\t\t\t\toffset_custom += 9;\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\tfor ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\t\t\t\tvalue = customAttribute.value[ chunk_faces4[ f ] ];\n\
\n\
\t\t\t\t\t\t\tv1 = value[ 0 ];\n\
\t\t\t\t\t\t\tv2 = value[ 1 ];\n\
\t\t\t\t\t\t\tv3 = value[ 2 ];\n\
\t\t\t\t\t\t\tv4 = value[ 3 ];\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom  ] \t= v1[ pp[ 0 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 1  ] = v1[ pp[ 1 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 2  ] = v1[ pp[ 2 ] ];\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 3  ] = v2[ pp[ 0 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 4  ] = v2[ pp[ 1 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 5  ] = v2[ pp[ 2 ] ];\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 6  ] = v3[ pp[ 0 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 7  ] = v3[ pp[ 1 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 8  ] = v3[ pp[ 2 ] ];\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 9  ] = v4[ pp[ 0 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 10 ] = v4[ pp[ 1 ] ];\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 11 ] = v4[ pp[ 2 ] ];\n\
\n\
\t\t\t\t\t\t\toffset_custom += 12;\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t} else if ( customAttribute.size === 4 ) {\n\
\n\
\t\t\t\t\tif ( customAttribute.boundTo === undefined || customAttribute.boundTo === \"vertices\" ) {\n\
\n\
\t\t\t\t\t\tfor ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\t\t\t\tface = obj_faces[ chunk_faces3[ f ]\t];\n\
\n\
\t\t\t\t\t\t\tv1 = customAttribute.value[ face.a ];\n\
\t\t\t\t\t\t\tv2 = customAttribute.value[ face.b ];\n\
\t\t\t\t\t\t\tv3 = customAttribute.value[ face.c ];\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom  ] \t= v1.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 1  ] = v1.y;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 2  ] = v1.z;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 3  ] = v1.w;\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 4  ] = v2.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 5  ] = v2.y;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 6  ] = v2.z;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 7  ] = v2.w;\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 8  ] = v3.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 9  ] = v3.y;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 10 ] = v3.z;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 11 ] = v3.w;\n\
\n\
\t\t\t\t\t\t\toffset_custom += 12;\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\tfor ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\t\t\t\tface = obj_faces[ chunk_faces4[ f ] ];\n\
\n\
\t\t\t\t\t\t\tv1 = customAttribute.value[ face.a ];\n\
\t\t\t\t\t\t\tv2 = customAttribute.value[ face.b ];\n\
\t\t\t\t\t\t\tv3 = customAttribute.value[ face.c ];\n\
\t\t\t\t\t\t\tv4 = customAttribute.value[ face.d ];\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom  ] \t= v1.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 1  ] = v1.y;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 2  ] = v1.z;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 3  ] = v1.w;\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 4  ] = v2.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 5  ] = v2.y;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 6  ] = v2.z;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 7  ] = v2.w;\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 8  ] = v3.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 9  ] = v3.y;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 10 ] = v3.z;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 11 ] = v3.w;\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 12 ] = v4.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 13 ] = v4.y;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 14 ] = v4.z;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 15 ] = v4.w;\n\
\n\
\t\t\t\t\t\t\toffset_custom += 16;\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t} else if ( customAttribute.boundTo === \"faces\" ) {\n\
\n\
\t\t\t\t\t\tfor ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\t\t\t\tvalue = customAttribute.value[ chunk_faces3[ f ] ];\n\
\n\
\t\t\t\t\t\t\tv1 = value;\n\
\t\t\t\t\t\t\tv2 = value;\n\
\t\t\t\t\t\t\tv3 = value;\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom  ] \t= v1.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 1  ] = v1.y;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 2  ] = v1.z;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 3  ] = v1.w;\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 4  ] = v2.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 5  ] = v2.y;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 6  ] = v2.z;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 7  ] = v2.w;\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 8  ] = v3.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 9  ] = v3.y;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 10 ] = v3.z;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 11 ] = v3.w;\n\
\n\
\t\t\t\t\t\t\toffset_custom += 12;\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\tfor ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\t\t\t\tvalue = customAttribute.value[ chunk_faces4[ f ] ];\n\
\n\
\t\t\t\t\t\t\tv1 = value;\n\
\t\t\t\t\t\t\tv2 = value;\n\
\t\t\t\t\t\t\tv3 = value;\n\
\t\t\t\t\t\t\tv4 = value;\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom  ] \t= v1.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 1  ] = v1.y;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 2  ] = v1.z;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 3  ] = v1.w;\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 4  ] = v2.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 5  ] = v2.y;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 6  ] = v2.z;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 7  ] = v2.w;\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 8  ] = v3.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 9  ] = v3.y;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 10 ] = v3.z;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 11 ] = v3.w;\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 12 ] = v4.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 13 ] = v4.y;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 14 ] = v4.z;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 15 ] = v4.w;\n\
\n\
\t\t\t\t\t\t\toffset_custom += 16;\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t} else if ( customAttribute.boundTo === \"faceVertices\" ) {\n\
\n\
\t\t\t\t\t\tfor ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\t\t\t\tvalue = customAttribute.value[ chunk_faces3[ f ] ];\n\
\n\
\t\t\t\t\t\t\tv1 = value[ 0 ];\n\
\t\t\t\t\t\t\tv2 = value[ 1 ];\n\
\t\t\t\t\t\t\tv3 = value[ 2 ];\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom  ] \t= v1.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 1  ] = v1.y;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 2  ] = v1.z;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 3  ] = v1.w;\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 4  ] = v2.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 5  ] = v2.y;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 6  ] = v2.z;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 7  ] = v2.w;\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 8  ] = v3.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 9  ] = v3.y;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 10 ] = v3.z;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 11 ] = v3.w;\n\
\n\
\t\t\t\t\t\t\toffset_custom += 12;\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\tfor ( f = 0, fl = chunk_faces4.length; f < fl; f ++ ) {\n\
\n\
\t\t\t\t\t\t\tvalue = customAttribute.value[ chunk_faces4[ f ] ];\n\
\n\
\t\t\t\t\t\t\tv1 = value[ 0 ];\n\
\t\t\t\t\t\t\tv2 = value[ 1 ];\n\
\t\t\t\t\t\t\tv3 = value[ 2 ];\n\
\t\t\t\t\t\t\tv4 = value[ 3 ];\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom  ] \t= v1.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 1  ] = v1.y;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 2  ] = v1.z;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 3  ] = v1.w;\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 4  ] = v2.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 5  ] = v2.y;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 6  ] = v2.z;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 7  ] = v2.w;\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 8  ] = v3.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 9  ] = v3.y;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 10 ] = v3.z;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 11 ] = v3.w;\n\
\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 12 ] = v4.x;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 13 ] = v4.y;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 14 ] = v4.z;\n\
\t\t\t\t\t\t\tcustomAttribute.array[ offset_custom + 15 ] = v4.w;\n\
\n\
\t\t\t\t\t\t\toffset_custom += 16;\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, customAttribute.buffer );\n\
\t\t\t\t_gl.bufferData( _gl.ARRAY_BUFFER, customAttribute.array, hint );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tif ( dispose ) {\n\
\n\
\t\t\tdelete geometryGroup.__inittedArrays;\n\
\t\t\tdelete geometryGroup.__colorArray;\n\
\t\t\tdelete geometryGroup.__normalArray;\n\
\t\t\tdelete geometryGroup.__tangentArray;\n\
\t\t\tdelete geometryGroup.__uvArray;\n\
\t\t\tdelete geometryGroup.__uv2Array;\n\
\t\t\tdelete geometryGroup.__faceArray;\n\
\t\t\tdelete geometryGroup.__vertexArray;\n\
\t\t\tdelete geometryGroup.__lineArray;\n\
\t\t\tdelete geometryGroup.__skinIndexArray;\n\
\t\t\tdelete geometryGroup.__skinWeightArray;\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tfunction setDirectBuffers ( geometry, hint, dispose ) {\n\
\n\
\t\tvar attributes = geometry.attributes;\n\
\n\
\t\tvar index = attributes[ \"index\" ];\n\
\t\tvar position = attributes[ \"position\" ];\n\
\t\tvar normal = attributes[ \"normal\" ];\n\
\t\tvar uv = attributes[ \"uv\" ];\n\
\t\tvar color = attributes[ \"color\" ];\n\
\t\tvar tangent = attributes[ \"tangent\" ];\n\
\n\
\t\tif ( geometry.elementsNeedUpdate && index !== undefined ) {\n\
\n\
\t\t\t_gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, index.buffer );\n\
\t\t\t_gl.bufferData( _gl.ELEMENT_ARRAY_BUFFER, index.array, hint );\n\
\n\
\t\t}\n\
\n\
\t\tif ( geometry.verticesNeedUpdate && position !== undefined ) {\n\
\n\
\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, position.buffer );\n\
\t\t\t_gl.bufferData( _gl.ARRAY_BUFFER, position.array, hint );\n\
\n\
\t\t}\n\
\n\
\t\tif ( geometry.normalsNeedUpdate && normal !== undefined ) {\n\
\n\
\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, normal.buffer );\n\
\t\t\t_gl.bufferData( _gl.ARRAY_BUFFER, normal.array, hint );\n\
\n\
\t\t}\n\
\n\
\t\tif ( geometry.uvsNeedUpdate && uv !== undefined ) {\n\
\n\
\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, uv.buffer );\n\
\t\t\t_gl.bufferData( _gl.ARRAY_BUFFER, uv.array, hint );\n\
\n\
\t\t}\n\
\n\
\t\tif ( geometry.colorsNeedUpdate && color !== undefined ) {\n\
\n\
\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, color.buffer );\n\
\t\t\t_gl.bufferData( _gl.ARRAY_BUFFER, color.array, hint );\n\
\n\
\t\t}\n\
\n\
\t\tif ( geometry.tangentsNeedUpdate && tangent !== undefined ) {\n\
\n\
\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, tangent.buffer );\n\
\t\t\t_gl.bufferData( _gl.ARRAY_BUFFER, tangent.array, hint );\n\
\n\
\t\t}\n\
\n\
\t\tif ( dispose ) {\n\
\n\
\t\t\tfor ( var i in geometry.attributes ) {\n\
\n\
\t\t\t\tdelete geometry.attributes[ i ].array;\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\t// Buffer rendering\n\
\n\
\tthis.renderBufferImmediate = function ( object, program, material ) {\n\
\n\
\t\tif ( object.hasPositions && ! object.__webglVertexBuffer ) object.__webglVertexBuffer = _gl.createBuffer();\n\
\t\tif ( object.hasNormals && ! object.__webglNormalBuffer ) object.__webglNormalBuffer = _gl.createBuffer();\n\
\t\tif ( object.hasUvs && ! object.__webglUvBuffer ) object.__webglUvBuffer = _gl.createBuffer();\n\
\t\tif ( object.hasColors && ! object.__webglColorBuffer ) object.__webglColorBuffer = _gl.createBuffer();\n\
\n\
\t\tif ( object.hasPositions ) {\n\
\n\
\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, object.__webglVertexBuffer );\n\
\t\t\t_gl.bufferData( _gl.ARRAY_BUFFER, object.positionArray, _gl.DYNAMIC_DRAW );\n\
\t\t\t_gl.enableVertexAttribArray( program.attributes.position );\n\
\t\t\t_gl.vertexAttribPointer( program.attributes.position, 3, _gl.FLOAT, false, 0, 0 );\n\
\n\
\t\t}\n\
\n\
\t\tif ( object.hasNormals ) {\n\
\n\
\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, object.__webglNormalBuffer );\n\
\n\
\t\t\tif ( material.shading === THREE.FlatShading ) {\n\
\n\
\t\t\t\tvar nx, ny, nz,\n\
\t\t\t\t\tnax, nbx, ncx, nay, nby, ncy, naz, nbz, ncz,\n\
\t\t\t\t\tnormalArray,\n\
\t\t\t\t\ti, il = object.count * 3;\n\
\n\
\t\t\t\tfor( i = 0; i < il; i += 9 ) {\n\
\n\
\t\t\t\t\tnormalArray = object.normalArray;\n\
\n\
\t\t\t\t\tnax  = normalArray[ i ];\n\
\t\t\t\t\tnay  = normalArray[ i + 1 ];\n\
\t\t\t\t\tnaz  = normalArray[ i + 2 ];\n\
\n\
\t\t\t\t\tnbx  = normalArray[ i + 3 ];\n\
\t\t\t\t\tnby  = normalArray[ i + 4 ];\n\
\t\t\t\t\tnbz  = normalArray[ i + 5 ];\n\
\n\
\t\t\t\t\tncx  = normalArray[ i + 6 ];\n\
\t\t\t\t\tncy  = normalArray[ i + 7 ];\n\
\t\t\t\t\tncz  = normalArray[ i + 8 ];\n\
\n\
\t\t\t\t\tnx = ( nax + nbx + ncx ) / 3;\n\
\t\t\t\t\tny = ( nay + nby + ncy ) / 3;\n\
\t\t\t\t\tnz = ( naz + nbz + ncz ) / 3;\n\
\n\
\t\t\t\t\tnormalArray[ i ] \t = nx;\n\
\t\t\t\t\tnormalArray[ i + 1 ] = ny;\n\
\t\t\t\t\tnormalArray[ i + 2 ] = nz;\n\
\n\
\t\t\t\t\tnormalArray[ i + 3 ] = nx;\n\
\t\t\t\t\tnormalArray[ i + 4 ] = ny;\n\
\t\t\t\t\tnormalArray[ i + 5 ] = nz;\n\
\n\
\t\t\t\t\tnormalArray[ i + 6 ] = nx;\n\
\t\t\t\t\tnormalArray[ i + 7 ] = ny;\n\
\t\t\t\t\tnormalArray[ i + 8 ] = nz;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t\t_gl.bufferData( _gl.ARRAY_BUFFER, object.normalArray, _gl.DYNAMIC_DRAW );\n\
\t\t\t_gl.enableVertexAttribArray( program.attributes.normal );\n\
\t\t\t_gl.vertexAttribPointer( program.attributes.normal, 3, _gl.FLOAT, false, 0, 0 );\n\
\n\
\t\t}\n\
\n\
\t\tif ( object.hasUvs && material.map ) {\n\
\n\
\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, object.__webglUvBuffer );\n\
\t\t\t_gl.bufferData( _gl.ARRAY_BUFFER, object.uvArray, _gl.DYNAMIC_DRAW );\n\
\t\t\t_gl.enableVertexAttribArray( program.attributes.uv );\n\
\t\t\t_gl.vertexAttribPointer( program.attributes.uv, 2, _gl.FLOAT, false, 0, 0 );\n\
\n\
\t\t}\n\
\n\
\t\tif ( object.hasColors && material.vertexColors !== THREE.NoColors ) {\n\
\n\
\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, object.__webglColorBuffer );\n\
\t\t\t_gl.bufferData( _gl.ARRAY_BUFFER, object.colorArray, _gl.DYNAMIC_DRAW );\n\
\t\t\t_gl.enableVertexAttribArray( program.attributes.color );\n\
\t\t\t_gl.vertexAttribPointer( program.attributes.color, 3, _gl.FLOAT, false, 0, 0 );\n\
\n\
\t\t}\n\
\n\
\t\t_gl.drawArrays( _gl.TRIANGLES, 0, object.count );\n\
\n\
\t\tobject.count = 0;\n\
\n\
\t};\n\
\n\
\tthis.renderBufferDirect = function ( camera, lights, fog, material, geometry, object ) {\n\
\n\
\t\tif ( material.visible === false ) return;\n\
\n\
\t\tvar program, attributes, linewidth, primitives, a, attribute;\n\
\n\
\t\tprogram = setProgram( camera, lights, fog, material, object );\n\
\n\
\t\tattributes = program.attributes;\n\
\n\
\t\tvar updateBuffers = false,\n\
\t\t\twireframeBit = material.wireframe ? 1 : 0,\n\
\t\t\tgeometryHash = ( geometry.id * 0xffffff ) + ( program.id * 2 ) + wireframeBit;\n\
\n\
\t\tif ( geometryHash !== _currentGeometryGroupHash ) {\n\
\n\
\t\t\t_currentGeometryGroupHash = geometryHash;\n\
\t\t\tupdateBuffers = true;\n\
\n\
\t\t}\n\
\n\
\t\t// render mesh\n\
\n\
\t\tif ( object instanceof THREE.Mesh ) {\n\
\n\
\t\t\tvar offsets = geometry.offsets;\n\
\n\
\t\t\t// if there is more than 1 chunk\n\
\t\t\t// must set attribute pointers to use new offsets for each chunk\n\
\t\t\t// even if geometry and materials didn't change\n\
\n\
\t\t\tif ( offsets.length > 1 ) updateBuffers = true;\n\
\n\
\t\t\tfor ( var i = 0, il = offsets.length; i < il; ++ i ) {\n\
\n\
\t\t\t\tvar startIndex = offsets[ i ].index;\n\
\n\
\t\t\t\tif ( updateBuffers ) {\n\
\n\
\t\t\t\t\t// vertices\n\
\n\
\t\t\t\t\tvar position = geometry.attributes[ \"position\" ];\n\
\t\t\t\t\tvar positionSize = position.itemSize;\n\
\n\
\t\t\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, position.buffer );\n\
\t\t\t\t\t_gl.vertexAttribPointer( attributes.position, positionSize, _gl.FLOAT, false, 0, startIndex * positionSize * 4 ); // 4 bytes per Float32\n\
\n\
\t\t\t\t\t// normals\n\
\n\
\t\t\t\t\tvar normal = geometry.attributes[ \"normal\" ];\n\
\n\
\t\t\t\t\tif ( attributes.normal >= 0 && normal ) {\n\
\n\
\t\t\t\t\t\tvar normalSize = normal.itemSize;\n\
\n\
\t\t\t\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, normal.buffer );\n\
\t\t\t\t\t\t_gl.vertexAttribPointer( attributes.normal, normalSize, _gl.FLOAT, false, 0, startIndex * normalSize * 4 );\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\t// uvs\n\
\n\
\t\t\t\t\tvar uv = geometry.attributes[ \"uv\" ];\n\
\n\
\t\t\t\t\tif ( attributes.uv >= 0 && uv ) {\n\
\n\
\t\t\t\t\t\tif ( uv.buffer ) {\n\
\n\
\t\t\t\t\t\t\tvar uvSize = uv.itemSize;\n\
\n\
\t\t\t\t\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, uv.buffer );\n\
\t\t\t\t\t\t\t_gl.vertexAttribPointer( attributes.uv, uvSize, _gl.FLOAT, false, 0, startIndex * uvSize * 4 );\n\
\n\
\t\t\t\t\t\t\t_gl.enableVertexAttribArray( attributes.uv );\n\
\n\
\t\t\t\t\t\t} else {\n\
\n\
\t\t\t\t\t\t\t_gl.disableVertexAttribArray( attributes.uv );\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\t// colors\n\
\n\
\t\t\t\t\tvar color = geometry.attributes[ \"color\" ];\n\
\n\
\t\t\t\t\tif ( attributes.color >= 0 && color ) {\n\
\n\
\t\t\t\t\t\tvar colorSize = color.itemSize;\n\
\n\
\t\t\t\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, color.buffer );\n\
\t\t\t\t\t\t_gl.vertexAttribPointer( attributes.color, colorSize, _gl.FLOAT, false, 0, startIndex * colorSize * 4 );\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\t// tangents\n\
\n\
\t\t\t\t\tvar tangent = geometry.attributes[ \"tangent\" ];\n\
\n\
\t\t\t\t\tif ( attributes.tangent >= 0 && tangent ) {\n\
\n\
\t\t\t\t\t\tvar tangentSize = tangent.itemSize;\n\
\n\
\t\t\t\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, tangent.buffer );\n\
\t\t\t\t\t\t_gl.vertexAttribPointer( attributes.tangent, tangentSize, _gl.FLOAT, false, 0, startIndex * tangentSize * 4 );\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\t// indices\n\
\n\
\t\t\t\t\tvar index = geometry.attributes[ \"index\" ];\n\
\n\
\t\t\t\t\t_gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, index.buffer );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\t// render indexed triangles\n\
\n\
\t\t\t\t_gl.drawElements( _gl.TRIANGLES, offsets[ i ].count, _gl.UNSIGNED_SHORT, offsets[ i ].start * 2 ); // 2 bytes per Uint16\n\
\n\
\t\t\t\t_this.info.render.calls ++;\n\
\t\t\t\t_this.info.render.vertices += offsets[ i ].count; // not really true, here vertices can be shared\n\
\t\t\t\t_this.info.render.faces += offsets[ i ].count / 3;\n\
\n\
\t\t\t}\n\
\n\
\t\t// render particles\n\
\n\
\t\t} else if ( object instanceof THREE.ParticleSystem ) {\n\
\n\
\t\t\tif ( updateBuffers ) {\n\
\n\
\t\t\t\t// vertices\n\
\n\
\t\t\t\tvar position = geometry.attributes[ \"position\" ];\n\
\t\t\t\tvar positionSize = position.itemSize;\n\
\n\
\t\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, position.buffer );\n\
\t\t\t\t_gl.vertexAttribPointer( attributes.position, positionSize, _gl.FLOAT, false, 0, 0 );\n\
\n\
\t\t\t\t// colors\n\
\n\
\t\t\t\tvar color = geometry.attributes[ \"color\" ];\n\
\n\
\t\t\t\tif ( attributes.color >= 0 && color ) {\n\
\n\
\t\t\t\t\tvar colorSize = color.itemSize;\n\
\n\
\t\t\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, color.buffer );\n\
\t\t\t\t\t_gl.vertexAttribPointer( attributes.color, colorSize, _gl.FLOAT, false, 0, 0 );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\t// render particles\n\
\n\
\t\t\t\t_gl.drawArrays( _gl.POINTS, 0, position.numItems / 3 );\n\
\n\
\t\t\t\t_this.info.render.calls ++;\n\
\t\t\t\t_this.info.render.points += position.numItems / 3;\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tthis.renderBuffer = function ( camera, lights, fog, material, geometryGroup, object ) {\n\
\n\
\t\tif ( material.visible === false ) return;\n\
\n\
\t\tvar program, attributes, linewidth, primitives, a, attribute, i, il;\n\
\n\
\t\tprogram = setProgram( camera, lights, fog, material, object );\n\
\n\
\t\tattributes = program.attributes;\n\
\n\
\t\tvar updateBuffers = false,\n\
\t\t\twireframeBit = material.wireframe ? 1 : 0,\n\
\t\t\tgeometryGroupHash = ( geometryGroup.id * 0xffffff ) + ( program.id * 2 ) + wireframeBit;\n\
\n\
\t\tif ( geometryGroupHash !== _currentGeometryGroupHash ) {\n\
\n\
\t\t\t_currentGeometryGroupHash = geometryGroupHash;\n\
\t\t\tupdateBuffers = true;\n\
\n\
\t\t}\n\
\n\
\t\t// vertices\n\
\n\
\t\tif ( !material.morphTargets && attributes.position >= 0 ) {\n\
\n\
\t\t\tif ( updateBuffers ) {\n\
\n\
\t\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglVertexBuffer );\n\
\t\t\t\t_gl.vertexAttribPointer( attributes.position, 3, _gl.FLOAT, false, 0, 0 );\n\
\n\
\t\t\t}\n\
\n\
\t\t} else {\n\
\n\
\t\t\tif ( object.morphTargetBase ) {\n\
\n\
\t\t\t\tsetupMorphTargets( material, geometryGroup, object );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\n\
\t\tif ( updateBuffers ) {\n\
\n\
\t\t\t// custom attributes\n\
\n\
\t\t\t// Use the per-geometryGroup custom attribute arrays which are setup in initMeshBuffers\n\
\n\
\t\t\tif ( geometryGroup.__webglCustomAttributesList ) {\n\
\n\
\t\t\t\tfor ( i = 0, il = geometryGroup.__webglCustomAttributesList.length; i < il; i ++ ) {\n\
\n\
\t\t\t\t\tattribute = geometryGroup.__webglCustomAttributesList[ i ];\n\
\n\
\t\t\t\t\tif( attributes[ attribute.buffer.belongsToAttribute ] >= 0 ) {\n\
\n\
\t\t\t\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, attribute.buffer );\n\
\t\t\t\t\t\t_gl.vertexAttribPointer( attributes[ attribute.buffer.belongsToAttribute ], attribute.size, _gl.FLOAT, false, 0, 0 );\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\n\
\t\t\t// colors\n\
\n\
\t\t\tif ( attributes.color >= 0 ) {\n\
\n\
\t\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglColorBuffer );\n\
\t\t\t\t_gl.vertexAttribPointer( attributes.color, 3, _gl.FLOAT, false, 0, 0 );\n\
\n\
\t\t\t}\n\
\n\
\t\t\t// normals\n\
\n\
\t\t\tif ( attributes.normal >= 0 ) {\n\
\n\
\t\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglNormalBuffer );\n\
\t\t\t\t_gl.vertexAttribPointer( attributes.normal, 3, _gl.FLOAT, false, 0, 0 );\n\
\n\
\t\t\t}\n\
\n\
\t\t\t// tangents\n\
\n\
\t\t\tif ( attributes.tangent >= 0 ) {\n\
\n\
\t\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglTangentBuffer );\n\
\t\t\t\t_gl.vertexAttribPointer( attributes.tangent, 4, _gl.FLOAT, false, 0, 0 );\n\
\n\
\t\t\t}\n\
\n\
\t\t\t// uvs\n\
\n\
\t\t\tif ( attributes.uv >= 0 ) {\n\
\n\
\t\t\t\tif ( geometryGroup.__webglUVBuffer ) {\n\
\n\
\t\t\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglUVBuffer );\n\
\t\t\t\t\t_gl.vertexAttribPointer( attributes.uv, 2, _gl.FLOAT, false, 0, 0 );\n\
\n\
\t\t\t\t\t_gl.enableVertexAttribArray( attributes.uv );\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\t_gl.disableVertexAttribArray( attributes.uv );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( attributes.uv2 >= 0 ) {\n\
\n\
\t\t\t\tif ( geometryGroup.__webglUV2Buffer ) {\n\
\n\
\t\t\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglUV2Buffer );\n\
\t\t\t\t\t_gl.vertexAttribPointer( attributes.uv2, 2, _gl.FLOAT, false, 0, 0 );\n\
\n\
\t\t\t\t\t_gl.enableVertexAttribArray( attributes.uv2 );\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\t_gl.disableVertexAttribArray( attributes.uv2 );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( material.skinning &&\n\
\t\t\t\t attributes.skinIndex >= 0 && attributes.skinWeight >= 0 ) {\n\
\n\
\t\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglSkinIndicesBuffer );\n\
\t\t\t\t_gl.vertexAttribPointer( attributes.skinIndex, 4, _gl.FLOAT, false, 0, 0 );\n\
\n\
\t\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglSkinWeightsBuffer );\n\
\t\t\t\t_gl.vertexAttribPointer( attributes.skinWeight, 4, _gl.FLOAT, false, 0, 0 );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\t// render mesh\n\
\n\
\t\tif ( object instanceof THREE.Mesh ) {\n\
\n\
\t\t\t// wireframe\n\
\n\
\t\t\tif ( material.wireframe ) {\n\
\n\
\t\t\t\tsetLineWidth( material.wireframeLinewidth );\n\
\n\
\t\t\t\tif ( updateBuffers ) _gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, geometryGroup.__webglLineBuffer );\n\
\t\t\t\t_gl.drawElements( _gl.LINES, geometryGroup.__webglLineCount, _gl.UNSIGNED_SHORT, 0 );\n\
\n\
\t\t\t// triangles\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tif ( updateBuffers ) _gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, geometryGroup.__webglFaceBuffer );\n\
\t\t\t\t_gl.drawElements( _gl.TRIANGLES, geometryGroup.__webglFaceCount, _gl.UNSIGNED_SHORT, 0 );\n\
\n\
\t\t\t}\n\
\n\
\t\t\t_this.info.render.calls ++;\n\
\t\t\t_this.info.render.vertices += geometryGroup.__webglFaceCount;\n\
\t\t\t_this.info.render.faces += geometryGroup.__webglFaceCount / 3;\n\
\n\
\t\t// render lines\n\
\n\
\t\t} else if ( object instanceof THREE.Line ) {\n\
\n\
\t\t\tprimitives = ( object.type === THREE.LineStrip ) ? _gl.LINE_STRIP : _gl.LINES;\n\
\n\
\t\t\tsetLineWidth( material.linewidth );\n\
\n\
\t\t\t_gl.drawArrays( primitives, 0, geometryGroup.__webglLineCount );\n\
\n\
\t\t\t_this.info.render.calls ++;\n\
\n\
\t\t// render particles\n\
\n\
\t\t} else if ( object instanceof THREE.ParticleSystem ) {\n\
\n\
\t\t\t_gl.drawArrays( _gl.POINTS, 0, geometryGroup.__webglParticleCount );\n\
\n\
\t\t\t_this.info.render.calls ++;\n\
\t\t\t_this.info.render.points += geometryGroup.__webglParticleCount;\n\
\n\
\t\t// render ribbon\n\
\n\
\t\t} else if ( object instanceof THREE.Ribbon ) {\n\
\n\
\t\t\t_gl.drawArrays( _gl.TRIANGLE_STRIP, 0, geometryGroup.__webglVertexCount );\n\
\n\
\t\t\t_this.info.render.calls ++;\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tfunction setupMorphTargets ( material, geometryGroup, object ) {\n\
\n\
\t\t// set base\n\
\n\
\t\tvar attributes = material.program.attributes;\n\
\n\
\t\tif ( object.morphTargetBase !== -1 ) {\n\
\n\
\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphTargetsBuffers[ object.morphTargetBase ] );\n\
\t\t\t_gl.vertexAttribPointer( attributes.position, 3, _gl.FLOAT, false, 0, 0 );\n\
\n\
\t\t} else if ( attributes.position >= 0 ) {\n\
\n\
\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglVertexBuffer );\n\
\t\t\t_gl.vertexAttribPointer( attributes.position, 3, _gl.FLOAT, false, 0, 0 );\n\
\n\
\t\t}\n\
\n\
\t\tif ( object.morphTargetForcedOrder.length ) {\n\
\n\
\t\t\t// set forced order\n\
\n\
\t\t\tvar m = 0;\n\
\t\t\tvar order = object.morphTargetForcedOrder;\n\
\t\t\tvar influences = object.morphTargetInfluences;\n\
\n\
\t\t\twhile ( m < material.numSupportedMorphTargets && m < order.length ) {\n\
\n\
\t\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphTargetsBuffers[ order[ m ] ] );\n\
\t\t\t\t_gl.vertexAttribPointer( attributes[ \"morphTarget\" + m ], 3, _gl.FLOAT, false, 0, 0 );\n\
\n\
\t\t\t\tif ( material.morphNormals ) {\n\
\n\
\t\t\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphNormalsBuffers[ order[ m ] ] );\n\
\t\t\t\t\t_gl.vertexAttribPointer( attributes[ \"morphNormal\" + m ], 3, _gl.FLOAT, false, 0, 0 );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tobject.__webglMorphTargetInfluences[ m ] = influences[ order[ m ] ];\n\
\n\
\t\t\t\tm ++;\n\
\t\t\t}\n\
\n\
\t\t} else {\n\
\n\
\t\t\t// find the most influencing\n\
\n\
\t\t\tvar influence, activeInfluenceIndices = [];\n\
\t\t\tvar influences = object.morphTargetInfluences;\n\
\t\t\tvar i, il = influences.length;\n\
\n\
\t\t\tfor ( i = 0; i < il; i ++ ) {\n\
\n\
\t\t\t\tinfluence = influences[ i ];\n\
\n\
\t\t\t\tif ( influence > 0 ) {\n\
\n\
\t\t\t\t\tactiveInfluenceIndices.push( [ i, influence ] );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( activeInfluenceIndices.length > material.numSupportedMorphTargets ) {\n\
\n\
\t\t\t\tactiveInfluenceIndices.sort( numericalSort );\n\
\t\t\t\tactiveInfluenceIndices.length = material.numSupportedMorphTargets;\n\
\n\
\t\t\t} else if ( activeInfluenceIndices.length > material.numSupportedMorphNormals ) {\n\
\n\
\t\t\t\tactiveInfluenceIndices.sort( numericalSort );\n\
\n\
\t\t\t} else if ( activeInfluenceIndices.length === 0 ) {\n\
\n\
\t\t\t\tactiveInfluenceIndices.push( [ 0, 0 ] );\n\
\n\
\t\t\t};\n\
\n\
\t\t\tvar influenceIndex, m = 0;\n\
\n\
\t\t\twhile ( m < material.numSupportedMorphTargets ) {\n\
\n\
\t\t\t\tif ( activeInfluenceIndices[ m ] ) {\n\
\n\
\t\t\t\t\tinfluenceIndex = activeInfluenceIndices[ m ][ 0 ];\n\
\n\
\t\t\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphTargetsBuffers[ influenceIndex ] );\n\
\n\
\t\t\t\t\t_gl.vertexAttribPointer( attributes[ \"morphTarget\" + m ], 3, _gl.FLOAT, false, 0, 0 );\n\
\n\
\t\t\t\t\tif ( material.morphNormals ) {\n\
\n\
\t\t\t\t\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphNormalsBuffers[ influenceIndex ] );\n\
\t\t\t\t\t\t_gl.vertexAttribPointer( attributes[ \"morphNormal\" + m ], 3, _gl.FLOAT, false, 0, 0 );\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\tobject.__webglMorphTargetInfluences[ m ] = influences[ influenceIndex ];\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\t_gl.vertexAttribPointer( attributes[ \"morphTarget\" + m ], 3, _gl.FLOAT, false, 0, 0 );\n\
\n\
\t\t\t\t\tif ( material.morphNormals ) {\n\
\n\
\t\t\t\t\t\t_gl.vertexAttribPointer( attributes[ \"morphNormal\" + m ], 3, _gl.FLOAT, false, 0, 0 );\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\tobject.__webglMorphTargetInfluences[ m ] = 0;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tm ++;\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\t// load updated influences uniform\n\
\n\
\t\tif ( material.program.uniforms.morphTargetInfluences !== null ) {\n\
\n\
\t\t\t_gl.uniform1fv( material.program.uniforms.morphTargetInfluences, object.__webglMorphTargetInfluences );\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\t// Sorting\n\
\n\
\tfunction painterSort ( a, b ) {\n\
\n\
\t\treturn b.z - a.z;\n\
\n\
\t};\n\
\n\
\tfunction numericalSort ( a, b ) {\n\
\n\
\t\treturn b[ 1 ] - a[ 1 ];\n\
\n\
\t};\n\
\n\
\n\
\t// Rendering\n\
\n\
\tthis.render = function ( scene, camera, renderTarget, forceClear ) {\n\
\n\
\t\tif ( camera instanceof THREE.Camera === false ) {\n\
\n\
\t\t\tconsole.error( 'THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.' );\n\
\t\t\treturn;\n\
\n\
\t\t}\n\
\n\
\t\tvar i, il,\n\
\n\
\t\twebglObject, object,\n\
\t\trenderList,\n\
\n\
\t\tlights = scene.__lights,\n\
\t\tfog = scene.fog;\n\
\n\
\t\t// reset caching for this frame\n\
\n\
\t\t_currentMaterialId = -1;\n\
\t\t_lightsNeedUpdate = true;\n\
\n\
\t\t// update scene graph\n\
\n\
\t\tif ( this.autoUpdateScene ) scene.updateMatrixWorld();\n\
\n\
\t\t// update camera matrices and frustum\n\
\n\
\t\tif ( camera.parent === undefined ) camera.updateMatrixWorld();\n\
\n\
\t\tif ( ! camera._viewMatrixArray ) camera._viewMatrixArray = new Float32Array( 16 );\n\
\t\tif ( ! camera._projectionMatrixArray ) camera._projectionMatrixArray = new Float32Array( 16 );\n\
\n\
\t\tcamera.matrixWorldInverse.getInverse( camera.matrixWorld );\n\
\n\
\t\tcamera.matrixWorldInverse.flattenToArray( camera._viewMatrixArray );\n\
\t\tcamera.projectionMatrix.flattenToArray( camera._projectionMatrixArray );\n\
\n\
\t\t_projScreenMatrix.multiply( camera.projectionMatrix, camera.matrixWorldInverse );\n\
\t\t_frustum.setFromMatrix( _projScreenMatrix );\n\
\n\
\t\t// update WebGL objects\n\
\n\
\t\tif ( this.autoUpdateObjects ) this.initWebGLObjects( scene );\n\
\n\
\t\t// custom render plugins (pre pass)\n\
\n\
\t\trenderPlugins( this.renderPluginsPre, scene, camera );\n\
\n\
\t\t//\n\
\n\
\t\t_this.info.render.calls = 0;\n\
\t\t_this.info.render.vertices = 0;\n\
\t\t_this.info.render.faces = 0;\n\
\t\t_this.info.render.points = 0;\n\
\n\
\t\tthis.setRenderTarget( renderTarget );\n\
\n\
\t\tif ( this.autoClear || forceClear ) {\n\
\n\
\t\t\tthis.clear( this.autoClearColor, this.autoClearDepth, this.autoClearStencil );\n\
\n\
\t\t}\n\
\n\
\t\t// set matrices for regular objects (frustum culled)\n\
\n\
\t\trenderList = scene.__webglObjects;\n\
\n\
\t\tfor ( i = 0, il = renderList.length; i < il; i ++ ) {\n\
\n\
\t\t\twebglObject = renderList[ i ];\n\
\t\t\tobject = webglObject.object;\n\
\n\
\t\t\twebglObject.render = false;\n\
\n\
\t\t\tif ( object.visible ) {\n\
\n\
\t\t\t\tif ( ! ( object instanceof THREE.Mesh || object instanceof THREE.ParticleSystem ) || ! ( object.frustumCulled ) || _frustum.contains( object ) ) {\n\
\n\
\t\t\t\t\t//object.matrixWorld.flattenToArray( object._modelMatrixArray );\n\
\n\
\t\t\t\t\tsetupMatrices( object, camera );\n\
\n\
\t\t\t\t\tunrollBufferMaterial( webglObject );\n\
\n\
\t\t\t\t\twebglObject.render = true;\n\
\n\
\t\t\t\t\tif ( this.sortObjects === true ) {\n\
\n\
\t\t\t\t\t\tif ( object.renderDepth !== null ) {\n\
\n\
\t\t\t\t\t\t\twebglObject.z = object.renderDepth;\n\
\n\
\t\t\t\t\t\t} else {\n\
\n\
\t\t\t\t\t\t\t_vector3.copy( object.matrixWorld.getPosition() );\n\
\t\t\t\t\t\t\t_projScreenMatrix.multiplyVector3( _vector3 );\n\
\n\
\t\t\t\t\t\t\twebglObject.z = _vector3.z;\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tif ( this.sortObjects ) {\n\
\n\
\t\t\trenderList.sort( painterSort );\n\
\n\
\t\t}\n\
\n\
\t\t// set matrices for immediate objects\n\
\n\
\t\trenderList = scene.__webglObjectsImmediate;\n\
\n\
\t\tfor ( i = 0, il = renderList.length; i < il; i ++ ) {\n\
\n\
\t\t\twebglObject = renderList[ i ];\n\
\t\t\tobject = webglObject.object;\n\
\n\
\t\t\tif ( object.visible ) {\n\
\n\
\t\t\t\t/*\n\
\t\t\t\tif ( object.matrixAutoUpdate ) {\n\
\n\
\t\t\t\t\tobject.matrixWorld.flattenToArray( object._modelMatrixArray );\n\
\n\
\t\t\t\t}\n\
\t\t\t\t*/\n\
\n\
\t\t\t\tsetupMatrices( object, camera );\n\
\n\
\t\t\t\tunrollImmediateBufferMaterial( webglObject );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tif ( scene.overrideMaterial ) {\n\
\n\
\t\t\tvar material = scene.overrideMaterial;\n\
\n\
\t\t\tthis.setBlending( material.blending, material.blendEquation, material.blendSrc, material.blendDst );\n\
\t\t\tthis.setDepthTest( material.depthTest );\n\
\t\t\tthis.setDepthWrite( material.depthWrite );\n\
\t\t\tsetPolygonOffset( material.polygonOffset, material.polygonOffsetFactor, material.polygonOffsetUnits );\n\
\n\
\t\t\trenderObjects( scene.__webglObjects, false, \"\", camera, lights, fog, true, material );\n\
\t\t\trenderObjectsImmediate( scene.__webglObjectsImmediate, \"\", camera, lights, fog, false, material );\n\
\n\
\t\t} else {\n\
\n\
\t\t\t// opaque pass (front-to-back order)\n\
\n\
\t\t\tthis.setBlending( THREE.NormalBlending );\n\
\n\
\t\t\trenderObjects( scene.__webglObjects, true, \"opaque\", camera, lights, fog, false );\n\
\t\t\trenderObjectsImmediate( scene.__webglObjectsImmediate, \"opaque\", camera, lights, fog, false );\n\
\n\
\t\t\t// transparent pass (back-to-front order)\n\
\n\
\t\t\trenderObjects( scene.__webglObjects, false, \"transparent\", camera, lights, fog, true );\n\
\t\t\trenderObjectsImmediate( scene.__webglObjectsImmediate, \"transparent\", camera, lights, fog, true );\n\
\n\
\t\t}\n\
\n\
\t\t// custom render plugins (post pass)\n\
\n\
\t\trenderPlugins( this.renderPluginsPost, scene, camera );\n\
\n\
\n\
\t\t// Generate mipmap if we're using any kind of mipmap filtering\n\
\n\
\t\tif ( renderTarget && renderTarget.generateMipmaps && renderTarget.minFilter !== THREE.NearestFilter && renderTarget.minFilter !== THREE.LinearFilter ) {\n\
\n\
\t\t\tupdateRenderTargetMipmap( renderTarget );\n\
\n\
\t\t}\n\
\n\
\t\t// Ensure depth buffer writing is enabled so it can be cleared on next render\n\
\n\
\t\tthis.setDepthTest( true );\n\
\t\tthis.setDepthWrite( true );\n\
\n\
\t\t// _gl.finish();\n\
\n\
\t};\n\
\n\
\tfunction renderPlugins( plugins, scene, camera ) {\n\
\n\
\t\tif ( ! plugins.length ) return;\n\
\n\
\t\tfor ( var i = 0, il = plugins.length; i < il; i ++ ) {\n\
\n\
\t\t\t// reset state for plugin (to start from clean slate)\n\
\n\
\t\t\t_currentProgram = null;\n\
\t\t\t_currentCamera = null;\n\
\n\
\t\t\t_oldBlending = -1;\n\
\t\t\t_oldDepthTest = -1;\n\
\t\t\t_oldDepthWrite = -1;\n\
\t\t\t_oldDoubleSided = -1;\n\
\t\t\t_oldFlipSided = -1;\n\
\t\t\t_currentGeometryGroupHash = -1;\n\
\t\t\t_currentMaterialId = -1;\n\
\n\
\t\t\t_lightsNeedUpdate = true;\n\
\n\
\t\t\tplugins[ i ].render( scene, camera, _currentWidth, _currentHeight );\n\
\n\
\t\t\t// reset state after plugin (anything could have changed)\n\
\n\
\t\t\t_currentProgram = null;\n\
\t\t\t_currentCamera = null;\n\
\n\
\t\t\t_oldBlending = -1;\n\
\t\t\t_oldDepthTest = -1;\n\
\t\t\t_oldDepthWrite = -1;\n\
\t\t\t_oldDoubleSided = -1;\n\
\t\t\t_oldFlipSided = -1;\n\
\t\t\t_currentGeometryGroupHash = -1;\n\
\t\t\t_currentMaterialId = -1;\n\
\n\
\t\t\t_lightsNeedUpdate = true;\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tfunction renderObjects ( renderList, reverse, materialType, camera, lights, fog, useBlending, overrideMaterial ) {\n\
\n\
\t\tvar webglObject, object, buffer, material, start, end, delta;\n\
\n\
\t\tif ( reverse ) {\n\
\n\
\t\t\tstart = renderList.length - 1;\n\
\t\t\tend = -1;\n\
\t\t\tdelta = -1;\n\
\n\
\t\t} else {\n\
\n\
\t\t\tstart = 0;\n\
\t\t\tend = renderList.length;\n\
\t\t\tdelta = 1;\n\
\t\t}\n\
\n\
\t\tfor ( var i = start; i !== end; i += delta ) {\n\
\n\
\t\t\twebglObject = renderList[ i ];\n\
\n\
\t\t\tif ( webglObject.render ) {\n\
\n\
\t\t\t\tobject = webglObject.object;\n\
\t\t\t\tbuffer = webglObject.buffer;\n\
\n\
\t\t\t\tif ( overrideMaterial ) {\n\
\n\
\t\t\t\t\tmaterial = overrideMaterial;\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\tmaterial = webglObject[ materialType ];\n\
\n\
\t\t\t\t\tif ( ! material ) continue;\n\
\n\
\t\t\t\t\tif ( useBlending ) _this.setBlending( material.blending, material.blendEquation, material.blendSrc, material.blendDst );\n\
\n\
\t\t\t\t\t_this.setDepthTest( material.depthTest );\n\
\t\t\t\t\t_this.setDepthWrite( material.depthWrite );\n\
\t\t\t\t\tsetPolygonOffset( material.polygonOffset, material.polygonOffsetFactor, material.polygonOffsetUnits );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\t_this.setMaterialFaces( material );\n\
\n\
\t\t\t\tif ( buffer instanceof THREE.BufferGeometry ) {\n\
\n\
\t\t\t\t\t_this.renderBufferDirect( camera, lights, fog, material, buffer, object );\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\t_this.renderBuffer( camera, lights, fog, material, buffer, object );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tfunction renderObjectsImmediate ( renderList, materialType, camera, lights, fog, useBlending, overrideMaterial ) {\n\
\n\
\t\tvar webglObject, object, material, program;\n\
\n\
\t\tfor ( var i = 0, il = renderList.length; i < il; i ++ ) {\n\
\n\
\t\t\twebglObject = renderList[ i ];\n\
\t\t\tobject = webglObject.object;\n\
\n\
\t\t\tif ( object.visible ) {\n\
\n\
\t\t\t\tif ( overrideMaterial ) {\n\
\n\
\t\t\t\t\tmaterial = overrideMaterial;\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\tmaterial = webglObject[ materialType ];\n\
\n\
\t\t\t\t\tif ( ! material ) continue;\n\
\n\
\t\t\t\t\tif ( useBlending ) _this.setBlending( material.blending, material.blendEquation, material.blendSrc, material.blendDst );\n\
\n\
\t\t\t\t\t_this.setDepthTest( material.depthTest );\n\
\t\t\t\t\t_this.setDepthWrite( material.depthWrite );\n\
\t\t\t\t\tsetPolygonOffset( material.polygonOffset, material.polygonOffsetFactor, material.polygonOffsetUnits );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\t_this.renderImmediateObject( camera, lights, fog, material, object );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tthis.renderImmediateObject = function ( camera, lights, fog, material, object ) {\n\
\n\
\t\tvar program = setProgram( camera, lights, fog, material, object );\n\
\n\
\t\t_currentGeometryGroupHash = -1;\n\
\n\
\t\t_this.setMaterialFaces( material );\n\
\n\
\t\tif ( object.immediateRenderCallback ) {\n\
\n\
\t\t\tobject.immediateRenderCallback( program, _gl, _frustum );\n\
\n\
\t\t} else {\n\
\n\
\t\t\tobject.render( function( object ) { _this.renderBufferImmediate( object, program, material ); } );\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tfunction unrollImmediateBufferMaterial ( globject ) {\n\
\n\
\t\tvar object = globject.object,\n\
\t\t\tmaterial = object.material;\n\
\n\
\t\tif ( material.transparent ) {\n\
\n\
\t\t\tglobject.transparent = material;\n\
\t\t\tglobject.opaque = null;\n\
\n\
\t\t} else {\n\
\n\
\t\t\tglobject.opaque = material;\n\
\t\t\tglobject.transparent = null;\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tfunction unrollBufferMaterial ( globject ) {\n\
\n\
\t\tvar object = globject.object,\n\
\t\t\tbuffer = globject.buffer,\n\
\t\t\tmaterial, materialIndex, meshMaterial;\n\
\n\
\t\tmeshMaterial = object.material;\n\
\n\
\t\tif ( meshMaterial instanceof THREE.MeshFaceMaterial ) {\n\
\n\
\t\t\tmaterialIndex = buffer.materialIndex;\n\
\n\
\t\t\tif ( materialIndex >= 0 ) {\n\
\n\
\t\t\t\tmaterial = object.geometry.materials[ materialIndex ];\n\
\n\
\t\t\t\tif ( material.transparent ) {\n\
\n\
\t\t\t\t\tglobject.transparent = material;\n\
\t\t\t\t\tglobject.opaque = null;\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\tglobject.opaque = material;\n\
\t\t\t\t\tglobject.transparent = null;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t} else {\n\
\n\
\t\t\tmaterial = meshMaterial;\n\
\n\
\t\t\tif ( material ) {\n\
\n\
\t\t\t\tif ( material.transparent ) {\n\
\n\
\t\t\t\t\tglobject.transparent = material;\n\
\t\t\t\t\tglobject.opaque = null;\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\tglobject.opaque = material;\n\
\t\t\t\t\tglobject.transparent = null;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\t// Geometry splitting\n\
\n\
\tfunction sortFacesByMaterial ( geometry ) {\n\
\n\
\t\tvar f, fl, face, materialIndex, vertices,\n\
\t\t\tmaterialHash, groupHash,\n\
\t\t\thash_map = {};\n\
\n\
\t\tvar numMorphTargets = geometry.morphTargets.length;\n\
\t\tvar numMorphNormals = geometry.morphNormals.length;\n\
\n\
\t\tgeometry.geometryGroups = {};\n\
\n\
\t\tfor ( f = 0, fl = geometry.faces.length; f < fl; f ++ ) {\n\
\n\
\t\t\tface = geometry.faces[ f ];\n\
\t\t\tmaterialIndex = face.materialIndex;\n\
\n\
\t\t\tmaterialHash = ( materialIndex !== undefined ) ? materialIndex : -1;\n\
\n\
\t\t\tif ( hash_map[ materialHash ] === undefined ) {\n\
\n\
\t\t\t\thash_map[ materialHash ] = { 'hash': materialHash, 'counter': 0 };\n\
\n\
\t\t\t}\n\
\n\
\t\t\tgroupHash = hash_map[ materialHash ].hash + '_' + hash_map[ materialHash ].counter;\n\
\n\
\t\t\tif ( geometry.geometryGroups[ groupHash ] === undefined ) {\n\
\n\
\t\t\t\tgeometry.geometryGroups[ groupHash ] = { 'faces3': [], 'faces4': [], 'materialIndex': materialIndex, 'vertices': 0, 'numMorphTargets': numMorphTargets, 'numMorphNormals': numMorphNormals };\n\
\n\
\t\t\t}\n\
\n\
\t\t\tvertices = face instanceof THREE.Face3 ? 3 : 4;\n\
\n\
\t\t\tif ( geometry.geometryGroups[ groupHash ].vertices + vertices > 65535 ) {\n\
\n\
\t\t\t\thash_map[ materialHash ].counter += 1;\n\
\t\t\t\tgroupHash = hash_map[ materialHash ].hash + '_' + hash_map[ materialHash ].counter;\n\
\n\
\t\t\t\tif ( geometry.geometryGroups[ groupHash ] === undefined ) {\n\
\n\
\t\t\t\t\tgeometry.geometryGroups[ groupHash ] = { 'faces3': [], 'faces4': [], 'materialIndex': materialIndex, 'vertices': 0, 'numMorphTargets': numMorphTargets, 'numMorphNormals': numMorphNormals };\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( face instanceof THREE.Face3 ) {\n\
\n\
\t\t\t\tgeometry.geometryGroups[ groupHash ].faces3.push( f );\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tgeometry.geometryGroups[ groupHash ].faces4.push( f );\n\
\n\
\t\t\t}\n\
\n\
\t\t\tgeometry.geometryGroups[ groupHash ].vertices += vertices;\n\
\n\
\t\t}\n\
\n\
\t\tgeometry.geometryGroupsList = [];\n\
\n\
\t\tfor ( var g in geometry.geometryGroups ) {\n\
\n\
\t\t\tgeometry.geometryGroups[ g ].id = _geometryGroupCounter ++;\n\
\n\
\t\t\tgeometry.geometryGroupsList.push( geometry.geometryGroups[ g ] );\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\t// Objects refresh\n\
\n\
\tthis.initWebGLObjects = function ( scene ) {\n\
\n\
\t\tif ( !scene.__webglObjects ) {\n\
\n\
\t\t\tscene.__webglObjects = [];\n\
\t\t\tscene.__webglObjectsImmediate = [];\n\
\t\t\tscene.__webglSprites = [];\n\
\t\t\tscene.__webglFlares = [];\n\
\n\
\t\t}\n\
\n\
\t\twhile ( scene.__objectsAdded.length ) {\n\
\n\
\t\t\taddObject( scene.__objectsAdded[ 0 ], scene );\n\
\t\t\tscene.__objectsAdded.splice( 0, 1 );\n\
\n\
\t\t}\n\
\n\
\t\twhile ( scene.__objectsRemoved.length ) {\n\
\n\
\t\t\tremoveObject( scene.__objectsRemoved[ 0 ], scene );\n\
\t\t\tscene.__objectsRemoved.splice( 0, 1 );\n\
\n\
\t\t}\n\
\n\
\t\t// update must be called after objects adding / removal\n\
\n\
\t\tfor ( var o = 0, ol = scene.__webglObjects.length; o < ol; o ++ ) {\n\
\n\
\t\t\tupdateObject( scene.__webglObjects[ o ].object );\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\t// Objects adding\n\
\n\
\tfunction addObject ( object, scene ) {\n\
\n\
\t\tvar g, geometry, geometryGroup;\n\
\n\
\t\tif ( ! object.__webglInit ) {\n\
\n\
\t\t\tobject.__webglInit = true;\n\
\n\
\t\t\tobject._modelViewMatrix = new THREE.Matrix4();\n\
\t\t\tobject._normalMatrix = new THREE.Matrix3();\n\
\n\
\t\t\tif ( object instanceof THREE.Mesh ) {\n\
\n\
\t\t\t\tgeometry = object.geometry;\n\
\n\
\t\t\t\tif ( geometry instanceof THREE.Geometry ) {\n\
\n\
\t\t\t\t\tif ( geometry.geometryGroups === undefined ) {\n\
\n\
\t\t\t\t\t\tsortFacesByMaterial( geometry );\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\t// create separate VBOs per geometry chunk\n\
\n\
\t\t\t\t\tfor ( g in geometry.geometryGroups ) {\n\
\n\
\t\t\t\t\t\tgeometryGroup = geometry.geometryGroups[ g ];\n\
\n\
\t\t\t\t\t\t// initialise VBO on the first access\n\
\n\
\t\t\t\t\t\tif ( ! geometryGroup.__webglVertexBuffer ) {\n\
\n\
\t\t\t\t\t\t\tcreateMeshBuffers( geometryGroup );\n\
\t\t\t\t\t\t\tinitMeshBuffers( geometryGroup, object );\n\
\n\
\t\t\t\t\t\t\tgeometry.verticesNeedUpdate = true;\n\
\t\t\t\t\t\t\tgeometry.morphTargetsNeedUpdate = true;\n\
\t\t\t\t\t\t\tgeometry.elementsNeedUpdate = true;\n\
\t\t\t\t\t\t\tgeometry.uvsNeedUpdate = true;\n\
\t\t\t\t\t\t\tgeometry.normalsNeedUpdate = true;\n\
\t\t\t\t\t\t\tgeometry.tangentsNeedUpdate = true;\n\
\t\t\t\t\t\t\tgeometry.colorsNeedUpdate = true;\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t} else if ( geometry instanceof THREE.BufferGeometry ) {\n\
\n\
\t\t\t\t\tinitDirectBuffers( geometry );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t} else if ( object instanceof THREE.Ribbon ) {\n\
\n\
\t\t\t\tgeometry = object.geometry;\n\
\n\
\t\t\t\tif( ! geometry.__webglVertexBuffer ) {\n\
\n\
\t\t\t\t\tcreateRibbonBuffers( geometry );\n\
\t\t\t\t\tinitRibbonBuffers( geometry );\n\
\n\
\t\t\t\t\tgeometry.verticesNeedUpdate = true;\n\
\t\t\t\t\tgeometry.colorsNeedUpdate = true;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t} else if ( object instanceof THREE.Line ) {\n\
\n\
\t\t\t\tgeometry = object.geometry;\n\
\n\
\t\t\t\tif( ! geometry.__webglVertexBuffer ) {\n\
\n\
\t\t\t\t\tcreateLineBuffers( geometry );\n\
\t\t\t\t\tinitLineBuffers( geometry, object );\n\
\n\
\t\t\t\t\tgeometry.verticesNeedUpdate = true;\n\
\t\t\t\t\tgeometry.colorsNeedUpdate = true;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t} else if ( object instanceof THREE.ParticleSystem ) {\n\
\n\
\t\t\t\tgeometry = object.geometry;\n\
\n\
\t\t\t\tif ( ! geometry.__webglVertexBuffer ) {\n\
\n\
\t\t\t\t\tif ( geometry instanceof THREE.Geometry ) {\n\
\n\
\t\t\t\t\t\tcreateParticleBuffers( geometry );\n\
\t\t\t\t\t\tinitParticleBuffers( geometry, object );\n\
\n\
\t\t\t\t\t\tgeometry.verticesNeedUpdate = true;\n\
\t\t\t\t\t\tgeometry.colorsNeedUpdate = true;\n\
\n\
\t\t\t\t\t} else if ( geometry instanceof THREE.BufferGeometry ) {\n\
\n\
\t\t\t\t\t\tinitDirectBuffers( geometry );\n\
\n\
\t\t\t\t\t}\n\
\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tif ( ! object.__webglActive ) {\n\
\n\
\t\t\tif ( object instanceof THREE.Mesh ) {\n\
\n\
\t\t\t\tgeometry = object.geometry;\n\
\n\
\t\t\t\tif ( geometry instanceof THREE.BufferGeometry ) {\n\
\n\
\t\t\t\t\taddBuffer( scene.__webglObjects, geometry, object );\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\tfor ( g in geometry.geometryGroups ) {\n\
\n\
\t\t\t\t\t\tgeometryGroup = geometry.geometryGroups[ g ];\n\
\n\
\t\t\t\t\t\taddBuffer( scene.__webglObjects, geometryGroup, object );\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t} else if ( object instanceof THREE.Ribbon ||\n\
\t\t\t\t\t\tobject instanceof THREE.Line ||\n\
\t\t\t\t\t\tobject instanceof THREE.ParticleSystem ) {\n\
\n\
\t\t\t\tgeometry = object.geometry;\n\
\t\t\t\taddBuffer( scene.__webglObjects, geometry, object );\n\
\n\
\t\t\t} else if ( object instanceof THREE.ImmediateRenderObject || object.immediateRenderCallback ) {\n\
\n\
\t\t\t\taddBufferImmediate( scene.__webglObjectsImmediate, object );\n\
\n\
\t\t\t} else if ( object instanceof THREE.Sprite ) {\n\
\n\
\t\t\t\tscene.__webglSprites.push( object );\n\
\n\
\t\t\t} else if ( object instanceof THREE.LensFlare ) {\n\
\n\
\t\t\t\tscene.__webglFlares.push( object );\n\
\n\
\t\t\t}\n\
\n\
\t\t\tobject.__webglActive = true;\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tfunction addBuffer ( objlist, buffer, object ) {\n\
\n\
\t\tobjlist.push(\n\
\t\t\t{\n\
\t\t\t\tbuffer: buffer,\n\
\t\t\t\tobject: object,\n\
\t\t\t\topaque: null,\n\
\t\t\t\ttransparent: null\n\
\t\t\t}\n\
\t\t);\n\
\n\
\t};\n\
\n\
\tfunction addBufferImmediate ( objlist, object ) {\n\
\n\
\t\tobjlist.push(\n\
\t\t\t{\n\
\t\t\t\tobject: object,\n\
\t\t\t\topaque: null,\n\
\t\t\t\ttransparent: null\n\
\t\t\t}\n\
\t\t);\n\
\n\
\t};\n\
\n\
\t// Objects updates\n\
\n\
\tfunction updateObject ( object ) {\n\
\n\
\t\tvar geometry = object.geometry,\n\
\t\t\tgeometryGroup, customAttributesDirty, material;\n\
\n\
\t\tif ( object instanceof THREE.Mesh ) {\n\
\n\
\t\t\tif ( geometry instanceof THREE.BufferGeometry ) {\n\
\n\
\t\t\t\tif ( geometry.verticesNeedUpdate || geometry.elementsNeedUpdate ||\n\
\t\t\t\t\t geometry.uvsNeedUpdate || geometry.normalsNeedUpdate ||\n\
\t\t\t\t\t geometry.colorsNeedUpdate || geometry.tangentsNeedUpdate ) {\n\
\n\
\t\t\t\t\tsetDirectBuffers( geometry, _gl.DYNAMIC_DRAW, !geometry.dynamic );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tgeometry.verticesNeedUpdate = false;\n\
\t\t\t\tgeometry.elementsNeedUpdate = false;\n\
\t\t\t\tgeometry.uvsNeedUpdate = false;\n\
\t\t\t\tgeometry.normalsNeedUpdate = false;\n\
\t\t\t\tgeometry.colorsNeedUpdate = false;\n\
\t\t\t\tgeometry.tangentsNeedUpdate = false;\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\t// check all geometry groups\n\
\n\
\t\t\t\tfor( var i = 0, il = geometry.geometryGroupsList.length; i < il; i ++ ) {\n\
\n\
\t\t\t\t\tgeometryGroup = geometry.geometryGroupsList[ i ];\n\
\n\
\t\t\t\t\tmaterial = getBufferMaterial( object, geometryGroup );\n\
\n\
\t\t\t\t\tcustomAttributesDirty = material.attributes && areCustomAttributesDirty( material );\n\
\n\
\t\t\t\t\tif ( geometry.verticesNeedUpdate || geometry.morphTargetsNeedUpdate || geometry.elementsNeedUpdate ||\n\
\t\t\t\t\t\t geometry.uvsNeedUpdate || geometry.normalsNeedUpdate ||\n\
\t\t\t\t\t\t geometry.colorsNeedUpdate || geometry.tangentsNeedUpdate || customAttributesDirty ) {\n\
\n\
\t\t\t\t\t\tsetMeshBuffers( geometryGroup, object, _gl.DYNAMIC_DRAW, !geometry.dynamic, material );\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tgeometry.verticesNeedUpdate = false;\n\
\t\t\t\tgeometry.morphTargetsNeedUpdate = false;\n\
\t\t\t\tgeometry.elementsNeedUpdate = false;\n\
\t\t\t\tgeometry.uvsNeedUpdate = false;\n\
\t\t\t\tgeometry.normalsNeedUpdate = false;\n\
\t\t\t\tgeometry.colorsNeedUpdate = false;\n\
\t\t\t\tgeometry.tangentsNeedUpdate = false;\n\
\n\
\t\t\t\tmaterial.attributes && clearCustomAttributes( material );\n\
\n\
\t\t\t}\n\
\n\
\t\t} else if ( object instanceof THREE.Ribbon ) {\n\
\n\
\t\t\tif ( geometry.verticesNeedUpdate || geometry.colorsNeedUpdate ) {\n\
\n\
\t\t\t\tsetRibbonBuffers( geometry, _gl.DYNAMIC_DRAW );\n\
\n\
\t\t\t}\n\
\n\
\t\t\tgeometry.verticesNeedUpdate = false;\n\
\t\t\tgeometry.colorsNeedUpdate = false;\n\
\n\
\t\t} else if ( object instanceof THREE.Line ) {\n\
\n\
\t\t\tmaterial = getBufferMaterial( object, geometryGroup );\n\
\n\
\t\t\tcustomAttributesDirty = material.attributes && areCustomAttributesDirty( material );\n\
\n\
\t\t\tif ( geometry.verticesNeedUpdate ||  geometry.colorsNeedUpdate || customAttributesDirty ) {\n\
\n\
\t\t\t\tsetLineBuffers( geometry, _gl.DYNAMIC_DRAW );\n\
\n\
\t\t\t}\n\
\n\
\t\t\tgeometry.verticesNeedUpdate = false;\n\
\t\t\tgeometry.colorsNeedUpdate = false;\n\
\n\
\t\t\tmaterial.attributes && clearCustomAttributes( material );\n\
\n\
\t\t} else if ( object instanceof THREE.ParticleSystem ) {\n\
\n\
\t\t\tif ( geometry instanceof THREE.BufferGeometry ) {\n\
\n\
\t\t\t\tif ( geometry.verticesNeedUpdate || geometry.colorsNeedUpdate ) {\n\
\n\
\t\t\t\t\tsetDirectBuffers( geometry, _gl.DYNAMIC_DRAW, !geometry.dynamic );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tgeometry.verticesNeedUpdate = false;\n\
\t\t\t\tgeometry.colorsNeedUpdate = false;\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tmaterial = getBufferMaterial( object, geometryGroup );\n\
\n\
\t\t\t\tcustomAttributesDirty = material.attributes && areCustomAttributesDirty( material );\n\
\n\
\t\t\t\tif ( geometry.verticesNeedUpdate || geometry.colorsNeedUpdate || object.sortParticles || customAttributesDirty ) {\n\
\n\
\t\t\t\t\tsetParticleBuffers( geometry, _gl.DYNAMIC_DRAW, object );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tgeometry.verticesNeedUpdate = false;\n\
\t\t\t\tgeometry.colorsNeedUpdate = false;\n\
\n\
\t\t\t\tmaterial.attributes && clearCustomAttributes( material );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\t// Objects updates - custom attributes check\n\
\n\
\tfunction areCustomAttributesDirty ( material ) {\n\
\n\
\t\tfor ( var a in material.attributes ) {\n\
\n\
\t\t\tif ( material.attributes[ a ].needsUpdate ) return true;\n\
\n\
\t\t}\n\
\n\
\t\treturn false;\n\
\n\
\t};\n\
\n\
\tfunction clearCustomAttributes ( material ) {\n\
\n\
\t\tfor ( var a in material.attributes ) {\n\
\n\
\t\t\tmaterial.attributes[ a ].needsUpdate = false;\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\t// Objects removal\n\
\n\
\tfunction removeObject ( object, scene ) {\n\
\n\
\t\tif ( object instanceof THREE.Mesh  ||\n\
\t\t\t object instanceof THREE.ParticleSystem ||\n\
\t\t\t object instanceof THREE.Ribbon ||\n\
\t\t\t object instanceof THREE.Line ) {\n\
\n\
\t\t\tremoveInstances( scene.__webglObjects, object );\n\
\n\
\t\t} else if ( object instanceof THREE.Sprite ) {\n\
\n\
\t\t\tremoveInstancesDirect( scene.__webglSprites, object );\n\
\n\
\t\t} else if ( object instanceof THREE.LensFlare ) {\n\
\n\
\t\t\tremoveInstancesDirect( scene.__webglFlares, object );\n\
\n\
\t\t} else if ( object instanceof THREE.ImmediateRenderObject || object.immediateRenderCallback ) {\n\
\n\
\t\t\tremoveInstances( scene.__webglObjectsImmediate, object );\n\
\n\
\t\t}\n\
\n\
\t\tobject.__webglActive = false;\n\
\n\
\t};\n\
\n\
\tfunction removeInstances ( objlist, object ) {\n\
\n\
\t\tfor ( var o = objlist.length - 1; o >= 0; o -- ) {\n\
\n\
\t\t\tif ( objlist[ o ].object === object ) {\n\
\n\
\t\t\t\tobjlist.splice( o, 1 );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tfunction removeInstancesDirect ( objlist, object ) {\n\
\n\
\t\tfor ( var o = objlist.length - 1; o >= 0; o -- ) {\n\
\n\
\t\t\tif ( objlist[ o ] === object ) {\n\
\n\
\t\t\t\tobjlist.splice( o, 1 );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\t// Materials\n\
\n\
\tthis.initMaterial = function ( material, lights, fog, object ) {\n\
\n\
\t\tvar u, a, identifiers, i, parameters, maxLightCount, maxBones, maxShadows, shaderID;\n\
\n\
\t\tif ( material instanceof THREE.MeshDepthMaterial ) {\n\
\n\
\t\t\tshaderID = 'depth';\n\
\n\
\t\t} else if ( material instanceof THREE.MeshNormalMaterial ) {\n\
\n\
\t\t\tshaderID = 'normal';\n\
\n\
\t\t} else if ( material instanceof THREE.MeshBasicMaterial ) {\n\
\n\
\t\t\tshaderID = 'basic';\n\
\n\
\t\t} else if ( material instanceof THREE.MeshLambertMaterial ) {\n\
\n\
\t\t\tshaderID = 'lambert';\n\
\n\
\t\t} else if ( material instanceof THREE.MeshPhongMaterial ) {\n\
\n\
\t\t\tshaderID = 'phong';\n\
\n\
\t\t} else if ( material instanceof THREE.LineBasicMaterial ) {\n\
\n\
\t\t\tshaderID = 'basic';\n\
\n\
\t\t} else if ( material instanceof THREE.ParticleBasicMaterial ) {\n\
\n\
\t\t\tshaderID = 'particle_basic';\n\
\n\
\t\t}\n\
\n\
\t\tif ( shaderID ) {\n\
\n\
\t\t\tsetMaterialShaders( material, THREE.ShaderLib[ shaderID ] );\n\
\n\
\t\t}\n\
\n\
\t\t// heuristics to create shader parameters according to lights in the scene\n\
\t\t// (not to blow over maxLights budget)\n\
\n\
\t\tmaxLightCount = allocateLights( lights );\n\
\n\
\t\tmaxShadows = allocateShadows( lights );\n\
\n\
\t\tmaxBones = allocateBones( object );\n\
\n\
\t\tparameters = {\n\
\n\
\t\t\tmap: !!material.map,\n\
\t\t\tenvMap: !!material.envMap,\n\
\t\t\tlightMap: !!material.lightMap,\n\
\t\t\tbumpMap: !!material.bumpMap,\n\
\t\t\tnormalMap: !!material.normalMap,\n\
\t\t\tspecularMap: !!material.specularMap,\n\
\n\
\t\t\tvertexColors: material.vertexColors,\n\
\n\
\t\t\tfog: fog,\n\
\t\t\tuseFog: material.fog,\n\
\n\
\t\t\tsizeAttenuation: material.sizeAttenuation,\n\
\n\
\t\t\tskinning: material.skinning,\n\
\t\t\tmaxBones: maxBones,\n\
\t\t\tuseVertexTexture: _supportsBoneTextures && object && object.useVertexTexture,\n\
\t\t\tboneTextureWidth: object && object.boneTextureWidth,\n\
\t\t\tboneTextureHeight: object && object.boneTextureHeight,\n\
\n\
\t\t\tmorphTargets: material.morphTargets,\n\
\t\t\tmorphNormals: material.morphNormals,\n\
\t\t\tmaxMorphTargets: this.maxMorphTargets,\n\
\t\t\tmaxMorphNormals: this.maxMorphNormals,\n\
\n\
\t\t\tmaxDirLights: maxLightCount.directional,\n\
\t\t\tmaxPointLights: maxLightCount.point,\n\
\t\t\tmaxSpotLights: maxLightCount.spot,\n\
\t\t\tmaxHemiLights: maxLightCount.hemi,\n\
\n\
\t\t\tmaxShadows: maxShadows,\n\
\t\t\tshadowMapEnabled: this.shadowMapEnabled && object.receiveShadow,\n\
\t\t\tshadowMapSoft: this.shadowMapSoft,\n\
\t\t\tshadowMapDebug: this.shadowMapDebug,\n\
\t\t\tshadowMapCascade: this.shadowMapCascade,\n\
\n\
\t\t\talphaTest: material.alphaTest,\n\
\t\t\tmetal: material.metal,\n\
\t\t\tperPixel: material.perPixel,\n\
\t\t\twrapAround: material.wrapAround,\n\
\t\t\tdoubleSided: material.side === THREE.DoubleSide,\n\
\t\t\tflipSided: material.side === THREE.BackSide\n\
\n\
\t\t};\n\
\n\
\t\tmaterial.program = buildProgram( shaderID, material.fragmentShader, material.vertexShader, material.uniforms, material.attributes, parameters );\n\
\n\
\t\tvar attributes = material.program.attributes;\n\
\n\
\t\tif ( attributes.position >= 0 ) _gl.enableVertexAttribArray( attributes.position );\n\
\t\tif ( attributes.color >= 0 ) _gl.enableVertexAttribArray( attributes.color );\n\
\t\tif ( attributes.normal >= 0 ) _gl.enableVertexAttribArray( attributes.normal );\n\
\t\tif ( attributes.tangent >= 0 ) _gl.enableVertexAttribArray( attributes.tangent );\n\
\n\
\t\tif ( material.skinning &&\n\
\t\t\t attributes.skinIndex >= 0 && attributes.skinWeight >= 0 ) {\n\
\n\
\t\t\t_gl.enableVertexAttribArray( attributes.skinIndex );\n\
\t\t\t_gl.enableVertexAttribArray( attributes.skinWeight );\n\
\n\
\t\t}\n\
\n\
\t\tif ( material.attributes ) {\n\
\n\
\t\t\tfor ( a in material.attributes ) {\n\
\n\
\t\t\t\tif( attributes[ a ] !== undefined && attributes[ a ] >= 0 ) _gl.enableVertexAttribArray( attributes[ a ] );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tif ( material.morphTargets ) {\n\
\n\
\t\t\tmaterial.numSupportedMorphTargets = 0;\n\
\n\
\t\t\tvar id, base = \"morphTarget\";\n\
\n\
\t\t\tfor ( i = 0; i < this.maxMorphTargets; i ++ ) {\n\
\n\
\t\t\t\tid = base + i;\n\
\n\
\t\t\t\tif ( attributes[ id ] >= 0 ) {\n\
\n\
\t\t\t\t\t_gl.enableVertexAttribArray( attributes[ id ] );\n\
\t\t\t\t\tmaterial.numSupportedMorphTargets ++;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tif ( material.morphNormals ) {\n\
\n\
\t\t\tmaterial.numSupportedMorphNormals = 0;\n\
\n\
\t\t\tvar id, base = \"morphNormal\";\n\
\n\
\t\t\tfor ( i = 0; i < this.maxMorphNormals; i ++ ) {\n\
\n\
\t\t\t\tid = base + i;\n\
\n\
\t\t\t\tif ( attributes[ id ] >= 0 ) {\n\
\n\
\t\t\t\t\t_gl.enableVertexAttribArray( attributes[ id ] );\n\
\t\t\t\t\tmaterial.numSupportedMorphNormals ++;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tmaterial.uniformsList = [];\n\
\n\
\t\tfor ( u in material.uniforms ) {\n\
\n\
\t\t\tmaterial.uniformsList.push( [ material.uniforms[ u ], u ] );\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tfunction setMaterialShaders( material, shaders ) {\n\
\n\
\t\tmaterial.uniforms = THREE.UniformsUtils.clone( shaders.uniforms );\n\
\t\tmaterial.vertexShader = shaders.vertexShader;\n\
\t\tmaterial.fragmentShader = shaders.fragmentShader;\n\
\n\
\t};\n\
\n\
\tfunction setProgram( camera, lights, fog, material, object ) {\n\
\n\
\t\t_usedTextureUnits = 0;\n\
\n\
\t\tif ( material.needsUpdate ) {\n\
\n\
\t\t\tif ( material.program ) _this.deallocateMaterial( material );\n\
\n\
\t\t\t_this.initMaterial( material, lights, fog, object );\n\
\t\t\tmaterial.needsUpdate = false;\n\
\n\
\t\t}\n\
\n\
\t\tif ( material.morphTargets ) {\n\
\n\
\t\t\tif ( ! object.__webglMorphTargetInfluences ) {\n\
\n\
\t\t\t\tobject.__webglMorphTargetInfluences = new Float32Array( _this.maxMorphTargets );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tvar refreshMaterial = false;\n\
\n\
\t\tvar program = material.program,\n\
\t\t\tp_uniforms = program.uniforms,\n\
\t\t\tm_uniforms = material.uniforms;\n\
\n\
\t\tif ( program !== _currentProgram ) {\n\
\n\
\t\t\t_gl.useProgram( program );\n\
\t\t\t_currentProgram = program;\n\
\n\
\t\t\trefreshMaterial = true;\n\
\n\
\t\t}\n\
\n\
\t\tif ( material.id !== _currentMaterialId ) {\n\
\n\
\t\t\t_currentMaterialId = material.id;\n\
\t\t\trefreshMaterial = true;\n\
\n\
\t\t}\n\
\n\
\t\tif ( refreshMaterial || camera !== _currentCamera ) {\n\
\n\
\t\t\t_gl.uniformMatrix4fv( p_uniforms.projectionMatrix, false, camera._projectionMatrixArray );\n\
\n\
\t\t\tif ( camera !== _currentCamera ) _currentCamera = camera;\n\
\n\
\t\t}\n\
\n\
\t\t// skinning uniforms must be set even if material didn't change\n\
\t\t// auto-setting of texture unit for bone texture must go before other textures\n\
\t\t// not sure why, but otherwise weird things happen\n\
\n\
\t\tif ( material.skinning ) {\n\
\n\
\t\t\tif ( _supportsBoneTextures && object.useVertexTexture ) {\n\
\n\
\t\t\t\tif ( p_uniforms.boneTexture !== null ) {\n\
\n\
\t\t\t\t\tvar textureUnit = getTextureUnit();\n\
\n\
\t\t\t\t\t_gl.uniform1i( p_uniforms.boneTexture, textureUnit );\n\
\t\t\t\t\t_this.setTexture( object.boneTexture, textureUnit );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tif ( p_uniforms.boneGlobalMatrices !== null ) {\n\
\n\
\t\t\t\t\t_gl.uniformMatrix4fv( p_uniforms.boneGlobalMatrices, false, object.boneMatrices );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tif ( refreshMaterial ) {\n\
\n\
\t\t\t// refresh uniforms common to several materials\n\
\n\
\t\t\tif ( fog && material.fog ) {\n\
\n\
\t\t\t\trefreshUniformsFog( m_uniforms, fog );\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( material instanceof THREE.MeshPhongMaterial ||\n\
\t\t\t\t material instanceof THREE.MeshLambertMaterial ||\n\
\t\t\t\t material.lights ) {\n\
\n\
\t\t\t\tif ( _lightsNeedUpdate ) {\n\
\n\
\t\t\t\t\tsetupLights( program, lights );\n\
\t\t\t\t\t_lightsNeedUpdate = false;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\trefreshUniformsLights( m_uniforms, _lights );\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( material instanceof THREE.MeshBasicMaterial ||\n\
\t\t\t\t material instanceof THREE.MeshLambertMaterial ||\n\
\t\t\t\t material instanceof THREE.MeshPhongMaterial ) {\n\
\n\
\t\t\t\trefreshUniformsCommon( m_uniforms, material );\n\
\n\
\t\t\t}\n\
\n\
\t\t\t// refresh single material specific uniforms\n\
\n\
\t\t\tif ( material instanceof THREE.LineBasicMaterial ) {\n\
\n\
\t\t\t\trefreshUniformsLine( m_uniforms, material );\n\
\n\
\t\t\t} else if ( material instanceof THREE.ParticleBasicMaterial ) {\n\
\n\
\t\t\t\trefreshUniformsParticle( m_uniforms, material );\n\
\n\
\t\t\t} else if ( material instanceof THREE.MeshPhongMaterial ) {\n\
\n\
\t\t\t\trefreshUniformsPhong( m_uniforms, material );\n\
\n\
\t\t\t} else if ( material instanceof THREE.MeshLambertMaterial ) {\n\
\n\
\t\t\t\trefreshUniformsLambert( m_uniforms, material );\n\
\n\
\t\t\t} else if ( material instanceof THREE.MeshDepthMaterial ) {\n\
\n\
\t\t\t\tm_uniforms.mNear.value = camera.near;\n\
\t\t\t\tm_uniforms.mFar.value = camera.far;\n\
\t\t\t\tm_uniforms.opacity.value = material.opacity;\n\
\n\
\t\t\t} else if ( material instanceof THREE.MeshNormalMaterial ) {\n\
\n\
\t\t\t\tm_uniforms.opacity.value = material.opacity;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( object.receiveShadow && ! material._shadowPass ) {\n\
\n\
\t\t\t\trefreshUniformsShadow( m_uniforms, lights );\n\
\n\
\t\t\t}\n\
\n\
\t\t\t// load common uniforms\n\
\n\
\t\t\tloadUniformsGeneric( program, material.uniformsList );\n\
\n\
\t\t\t// load material specific uniforms\n\
\t\t\t// (shader material also gets them for the sake of genericity)\n\
\n\
\t\t\tif ( material instanceof THREE.ShaderMaterial ||\n\
\t\t\t\t material instanceof THREE.MeshPhongMaterial ||\n\
\t\t\t\t material.envMap ) {\n\
\n\
\t\t\t\tif ( p_uniforms.cameraPosition !== null ) {\n\
\n\
\t\t\t\t\tvar position = camera.matrixWorld.getPosition();\n\
\t\t\t\t\t_gl.uniform3f( p_uniforms.cameraPosition, position.x, position.y, position.z );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( material instanceof THREE.MeshPhongMaterial ||\n\
\t\t\t\t material instanceof THREE.MeshLambertMaterial ||\n\
\t\t\t\t material instanceof THREE.ShaderMaterial ||\n\
\t\t\t\t material.skinning ) {\n\
\n\
\t\t\t\tif ( p_uniforms.viewMatrix !== null ) {\n\
\n\
\t\t\t\t\t_gl.uniformMatrix4fv( p_uniforms.viewMatrix, false, camera._viewMatrixArray );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tloadUniformsMatrices( p_uniforms, object );\n\
\n\
\t\tif ( p_uniforms.modelMatrix !== null ) {\n\
\n\
\t\t\t_gl.uniformMatrix4fv( p_uniforms.modelMatrix, false, object.matrixWorld.elements );\n\
\n\
\t\t}\n\
\n\
\t\treturn program;\n\
\n\
\t};\n\
\n\
\t// Uniforms (refresh uniforms objects)\n\
\n\
\tfunction refreshUniformsCommon ( uniforms, material ) {\n\
\n\
\t\tuniforms.opacity.value = material.opacity;\n\
\n\
\t\tif ( _this.gammaInput ) {\n\
\n\
\t\t\tuniforms.diffuse.value.copyGammaToLinear( material.color );\n\
\n\
\t\t} else {\n\
\n\
\t\t\tuniforms.diffuse.value = material.color;\n\
\n\
\t\t}\n\
\n\
\t\tuniforms.map.value = material.map;\n\
\t\tuniforms.lightMap.value = material.lightMap;\n\
\t\tuniforms.specularMap.value = material.specularMap;\n\
\n\
\t\tif ( material.bumpMap ) {\n\
\n\
\t\t\tuniforms.bumpMap.value = material.bumpMap;\n\
\t\t\tuniforms.bumpScale.value = material.bumpScale;\n\
\n\
\t\t}\n\
\n\
\t\tif ( material.normalMap ) {\n\
\n\
\t\t\tuniforms.normalMap.value = material.normalMap;\n\
\t\t\tuniforms.normalScale.value.copy( material.normalScale );\n\
\n\
\t\t}\n\
\n\
\t\t// uv repeat and offset setting priorities\n\
\t\t//\t1. color map\n\
\t\t//\t2. specular map\n\
\t\t//\t3. normal map\n\
\t\t//\t4. bump map\n\
\n\
\t\tvar uvScaleMap;\n\
\n\
\t\tif ( material.map ) {\n\
\n\
\t\t\tuvScaleMap = material.map;\n\
\n\
\t\t} else if ( material.specularMap ) {\n\
\n\
\t\t\tuvScaleMap = material.specularMap;\n\
\n\
\t\t} else if ( material.normalMap ) {\n\
\n\
\t\t\tuvScaleMap = material.normalMap;\n\
\n\
\t\t} else if ( material.bumpMap ) {\n\
\n\
\t\t\tuvScaleMap = material.bumpMap;\n\
\n\
\t\t}\n\
\n\
\t\tif ( uvScaleMap !== undefined ) {\n\
\n\
\t\t\tvar offset = uvScaleMap.offset;\n\
\t\t\tvar repeat = uvScaleMap.repeat;\n\
\n\
\t\t\tuniforms.offsetRepeat.value.set( offset.x, offset.y, repeat.x, repeat.y );\n\
\n\
\t\t}\n\
\n\
\t\tuniforms.envMap.value = material.envMap;\n\
\t\tuniforms.flipEnvMap.value = ( material.envMap instanceof THREE.WebGLRenderTargetCube ) ? 1 : -1;\n\
\n\
\t\tif ( _this.gammaInput ) {\n\
\n\
\t\t\t//uniforms.reflectivity.value = material.reflectivity * material.reflectivity;\n\
\t\t\tuniforms.reflectivity.value = material.reflectivity;\n\
\n\
\t\t} else {\n\
\n\
\t\t\tuniforms.reflectivity.value = material.reflectivity;\n\
\n\
\t\t}\n\
\n\
\t\tuniforms.refractionRatio.value = material.refractionRatio;\n\
\t\tuniforms.combine.value = material.combine;\n\
\t\tuniforms.useRefract.value = material.envMap && material.envMap.mapping instanceof THREE.CubeRefractionMapping;\n\
\n\
\t};\n\
\n\
\tfunction refreshUniformsLine ( uniforms, material ) {\n\
\n\
\t\tuniforms.diffuse.value = material.color;\n\
\t\tuniforms.opacity.value = material.opacity;\n\
\n\
\t};\n\
\n\
\tfunction refreshUniformsParticle ( uniforms, material ) {\n\
\n\
\t\tuniforms.psColor.value = material.color;\n\
\t\tuniforms.opacity.value = material.opacity;\n\
\t\tuniforms.size.value = material.size;\n\
\t\tuniforms.scale.value = _canvas.height / 2.0; // TODO: Cache this.\n\
\n\
\t\tuniforms.map.value = material.map;\n\
\n\
\t};\n\
\n\
\tfunction refreshUniformsFog ( uniforms, fog ) {\n\
\n\
\t\tuniforms.fogColor.value = fog.color;\n\
\n\
\t\tif ( fog instanceof THREE.Fog ) {\n\
\n\
\t\t\tuniforms.fogNear.value = fog.near;\n\
\t\t\tuniforms.fogFar.value = fog.far;\n\
\n\
\t\t} else if ( fog instanceof THREE.FogExp2 ) {\n\
\n\
\t\t\tuniforms.fogDensity.value = fog.density;\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tfunction refreshUniformsPhong ( uniforms, material ) {\n\
\n\
\t\tuniforms.shininess.value = material.shininess;\n\
\n\
\t\tif ( _this.gammaInput ) {\n\
\n\
\t\t\tuniforms.ambient.value.copyGammaToLinear( material.ambient );\n\
\t\t\tuniforms.emissive.value.copyGammaToLinear( material.emissive );\n\
\t\t\tuniforms.specular.value.copyGammaToLinear( material.specular );\n\
\n\
\t\t} else {\n\
\n\
\t\t\tuniforms.ambient.value = material.ambient;\n\
\t\t\tuniforms.emissive.value = material.emissive;\n\
\t\t\tuniforms.specular.value = material.specular;\n\
\n\
\t\t}\n\
\n\
\t\tif ( material.wrapAround ) {\n\
\n\
\t\t\tuniforms.wrapRGB.value.copy( material.wrapRGB );\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tfunction refreshUniformsLambert ( uniforms, material ) {\n\
\n\
\t\tif ( _this.gammaInput ) {\n\
\n\
\t\t\tuniforms.ambient.value.copyGammaToLinear( material.ambient );\n\
\t\t\tuniforms.emissive.value.copyGammaToLinear( material.emissive );\n\
\n\
\t\t} else {\n\
\n\
\t\t\tuniforms.ambient.value = material.ambient;\n\
\t\t\tuniforms.emissive.value = material.emissive;\n\
\n\
\t\t}\n\
\n\
\t\tif ( material.wrapAround ) {\n\
\n\
\t\t\tuniforms.wrapRGB.value.copy( material.wrapRGB );\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tfunction refreshUniformsLights ( uniforms, lights ) {\n\
\n\
\t\tuniforms.ambientLightColor.value = lights.ambient;\n\
\n\
\t\tuniforms.directionalLightColor.value = lights.directional.colors;\n\
\t\tuniforms.directionalLightDirection.value = lights.directional.positions;\n\
\n\
\t\tuniforms.pointLightColor.value = lights.point.colors;\n\
\t\tuniforms.pointLightPosition.value = lights.point.positions;\n\
\t\tuniforms.pointLightDistance.value = lights.point.distances;\n\
\n\
\t\tuniforms.spotLightColor.value = lights.spot.colors;\n\
\t\tuniforms.spotLightPosition.value = lights.spot.positions;\n\
\t\tuniforms.spotLightDistance.value = lights.spot.distances;\n\
\t\tuniforms.spotLightDirection.value = lights.spot.directions;\n\
\t\tuniforms.spotLightAngle.value = lights.spot.angles;\n\
\t\tuniforms.spotLightExponent.value = lights.spot.exponents;\n\
\n\
\t\tuniforms.hemisphereLightSkyColor.value = lights.hemi.skyColors;\n\
\t\tuniforms.hemisphereLightGroundColor.value = lights.hemi.groundColors;\n\
\t\tuniforms.hemisphereLightPosition.value = lights.hemi.positions;\n\
\n\
\t};\n\
\n\
\tfunction refreshUniformsShadow ( uniforms, lights ) {\n\
\n\
\t\tif ( uniforms.shadowMatrix ) {\n\
\n\
\t\t\tvar j = 0;\n\
\n\
\t\t\tfor ( var i = 0, il = lights.length; i < il; i ++ ) {\n\
\n\
\t\t\t\tvar light = lights[ i ];\n\
\n\
\t\t\t\tif ( ! light.castShadow ) continue;\n\
\n\
\t\t\t\tif ( light instanceof THREE.SpotLight || ( light instanceof THREE.DirectionalLight && ! light.shadowCascade ) ) {\n\
\n\
\t\t\t\t\tuniforms.shadowMap.value[ j ] = light.shadowMap;\n\
\t\t\t\t\tuniforms.shadowMapSize.value[ j ] = light.shadowMapSize;\n\
\n\
\t\t\t\t\tuniforms.shadowMatrix.value[ j ] = light.shadowMatrix;\n\
\n\
\t\t\t\t\tuniforms.shadowDarkness.value[ j ] = light.shadowDarkness;\n\
\t\t\t\t\tuniforms.shadowBias.value[ j ] = light.shadowBias;\n\
\n\
\t\t\t\t\tj ++;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\t// Uniforms (load to GPU)\n\
\n\
\tfunction loadUniformsMatrices ( uniforms, object ) {\n\
\n\
\t\t_gl.uniformMatrix4fv( uniforms.modelViewMatrix, false, object._modelViewMatrix.elements );\n\
\n\
\t\tif ( uniforms.normalMatrix ) {\n\
\n\
\t\t\t_gl.uniformMatrix3fv( uniforms.normalMatrix, false, object._normalMatrix.elements );\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tfunction getTextureUnit() {\n\
\n\
\t\tvar textureUnit = _usedTextureUnits;\n\
\n\
\t\tif ( textureUnit >= _maxTextures ) {\n\
\n\
\t\t\tconsole.warn( \"Trying to use \" + textureUnit + \" texture units while this GPU supports only \" + _maxTextures );\n\
\n\
\t\t}\n\
\n\
\t\t_usedTextureUnits += 1;\n\
\n\
\t\treturn textureUnit;\n\
\n\
\t};\n\
\n\
\tfunction loadUniformsGeneric ( program, uniforms ) {\n\
\n\
\t\tvar uniform, value, type, location, texture, textureUnit, i, il, j, jl, offset;\n\
\n\
\t\tfor ( j = 0, jl = uniforms.length; j < jl; j ++ ) {\n\
\n\
\t\t\tlocation = program.uniforms[ uniforms[ j ][ 1 ] ];\n\
\t\t\tif ( !location ) continue;\n\
\n\
\t\t\tuniform = uniforms[ j ][ 0 ];\n\
\n\
\t\t\ttype = uniform.type;\n\
\t\t\tvalue = uniform.value;\n\
\n\
\t\t\tif ( type === \"i\" ) { // single integer\n\
\n\
\t\t\t\t_gl.uniform1i( location, value );\n\
\n\
\t\t\t} else if ( type === \"f\" ) { // single float\n\
\n\
\t\t\t\t_gl.uniform1f( location, value );\n\
\n\
\t\t\t} else if ( type === \"v2\" ) { // single THREE.Vector2\n\
\n\
\t\t\t\t_gl.uniform2f( location, value.x, value.y );\n\
\n\
\t\t\t} else if ( type === \"v3\" ) { // single THREE.Vector3\n\
\n\
\t\t\t\t_gl.uniform3f( location, value.x, value.y, value.z );\n\
\n\
\t\t\t} else if ( type === \"v4\" ) { // single THREE.Vector4\n\
\n\
\t\t\t\t_gl.uniform4f( location, value.x, value.y, value.z, value.w );\n\
\n\
\t\t\t} else if ( type === \"c\" ) { // single THREE.Color\n\
\n\
\t\t\t\t_gl.uniform3f( location, value.r, value.g, value.b );\n\
\n\
\t\t\t} else if ( type === \"iv1\" ) { // flat array of integers (JS or typed array)\n\
\n\
\t\t\t\t_gl.uniform1iv( location, value );\n\
\n\
\t\t\t} else if ( type === \"iv\" ) { // flat array of integers with 3 x N size (JS or typed array)\n\
\n\
\t\t\t\t_gl.uniform3iv( location, value );\n\
\n\
\t\t\t} else if ( type === \"fv1\" ) { // flat array of floats (JS or typed array)\n\
\n\
\t\t\t\t_gl.uniform1fv( location, value );\n\
\n\
\t\t\t} else if ( type === \"fv\" ) { // flat array of floats with 3 x N size (JS or typed array)\n\
\n\
\t\t\t\t_gl.uniform3fv( location, value );\n\
\n\
\t\t\t} else if ( type === \"v2v\" ) { // array of THREE.Vector2\n\
\n\
\t\t\t\tif ( uniform._array === undefined ) {\n\
\n\
\t\t\t\t\tuniform._array = new Float32Array( 2 * value.length );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tfor ( i = 0, il = value.length; i < il; i ++ ) {\n\
\n\
\t\t\t\t\toffset = i * 2;\n\
\n\
\t\t\t\t\tuniform._array[ offset ] \t = value[ i ].x;\n\
\t\t\t\t\tuniform._array[ offset + 1 ] = value[ i ].y;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\t_gl.uniform2fv( location, uniform._array );\n\
\n\
\t\t\t} else if ( type === \"v3v\" ) { // array of THREE.Vector3\n\
\n\
\t\t\t\tif ( uniform._array === undefined ) {\n\
\n\
\t\t\t\t\tuniform._array = new Float32Array( 3 * value.length );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tfor ( i = 0, il = value.length; i < il; i ++ ) {\n\
\n\
\t\t\t\t\toffset = i * 3;\n\
\n\
\t\t\t\t\tuniform._array[ offset ] \t = value[ i ].x;\n\
\t\t\t\t\tuniform._array[ offset + 1 ] = value[ i ].y;\n\
\t\t\t\t\tuniform._array[ offset + 2 ] = value[ i ].z;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\t_gl.uniform3fv( location, uniform._array );\n\
\n\
\t\t\t} else if ( type === \"v4v\" ) { // array of THREE.Vector4\n\
\n\
\t\t\t\tif ( uniform._array === undefined ) {\n\
\n\
\t\t\t\t\tuniform._array = new Float32Array( 4 * value.length );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tfor ( i = 0, il = value.length; i < il; i ++ ) {\n\
\n\
\t\t\t\t\toffset = i * 4;\n\
\n\
\t\t\t\t\tuniform._array[ offset ] \t = value[ i ].x;\n\
\t\t\t\t\tuniform._array[ offset + 1 ] = value[ i ].y;\n\
\t\t\t\t\tuniform._array[ offset + 2 ] = value[ i ].z;\n\
\t\t\t\t\tuniform._array[ offset + 3 ] = value[ i ].w;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\t_gl.uniform4fv( location, uniform._array );\n\
\n\
\t\t\t} else if ( type === \"m4\") { // single THREE.Matrix4\n\
\n\
\t\t\t\tif ( uniform._array === undefined ) {\n\
\n\
\t\t\t\t\tuniform._array = new Float32Array( 16 );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tvalue.flattenToArray( uniform._array );\n\
\t\t\t\t_gl.uniformMatrix4fv( location, false, uniform._array );\n\
\n\
\t\t\t} else if ( type === \"m4v\" ) { // array of THREE.Matrix4\n\
\n\
\t\t\t\tif ( uniform._array === undefined ) {\n\
\n\
\t\t\t\t\tuniform._array = new Float32Array( 16 * value.length );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tfor ( i = 0, il = value.length; i < il; i ++ ) {\n\
\n\
\t\t\t\t\tvalue[ i ].flattenToArrayOffset( uniform._array, i * 16 );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\t_gl.uniformMatrix4fv( location, false, uniform._array );\n\
\n\
\t\t\t} else if ( type === \"t\" ) { // single THREE.Texture (2d or cube)\n\
\n\
\t\t\t\ttexture = value;\n\
\t\t\t\ttextureUnit = getTextureUnit();\n\
\n\
\t\t\t\t_gl.uniform1i( location, textureUnit );\n\
\n\
\t\t\t\tif ( !texture ) continue;\n\
\n\
\t\t\t\tif ( texture.image instanceof Array && texture.image.length === 6 ) {\n\
\n\
\t\t\t\t\tsetCubeTexture( texture, textureUnit );\n\
\n\
\t\t\t\t} else if ( texture instanceof THREE.WebGLRenderTargetCube ) {\n\
\n\
\t\t\t\t\tsetCubeTextureDynamic( texture, textureUnit );\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\t_this.setTexture( texture, textureUnit );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t} else if ( type === \"tv\" ) { // array of THREE.Texture (2d)\n\
\n\
\t\t\t\tif ( uniform._array === undefined ) {\n\
\n\
\t\t\t\t\tuniform._array = [];\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tfor( i = 0, il = uniform.value.length; i < il; i ++ ) {\n\
\n\
\t\t\t\t\tuniform._array[ i ] = getTextureUnit();\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\t_gl.uniform1iv( location, uniform._array );\n\
\n\
\t\t\t\tfor( i = 0, il = uniform.value.length; i < il; i ++ ) {\n\
\n\
\t\t\t\t\ttexture = uniform.value[ i ];\n\
\t\t\t\t\ttextureUnit = uniform._array[ i ];\n\
\n\
\t\t\t\t\tif ( !texture ) continue;\n\
\n\
\t\t\t\t\t_this.setTexture( texture, textureUnit );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tfunction setupMatrices ( object, camera ) {\n\
\n\
\t\tobject._modelViewMatrix.multiply( camera.matrixWorldInverse, object.matrixWorld );\n\
\n\
\t\tobject._normalMatrix.getInverse( object._modelViewMatrix );\n\
\t\tobject._normalMatrix.transpose();\n\
\n\
\t};\n\
\n\
\t//\n\
\n\
\tfunction setColorGamma( array, offset, color, intensitySq ) {\n\
\n\
\t\tarray[ offset ]     = color.r * color.r * intensitySq;\n\
\t\tarray[ offset + 1 ] = color.g * color.g * intensitySq;\n\
\t\tarray[ offset + 2 ] = color.b * color.b * intensitySq;\n\
\n\
\t};\n\
\n\
\tfunction setColorLinear( array, offset, color, intensity ) {\n\
\n\
\t\tarray[ offset ]     = color.r * intensity;\n\
\t\tarray[ offset + 1 ] = color.g * intensity;\n\
\t\tarray[ offset + 2 ] = color.b * intensity;\n\
\n\
\t};\n\
\n\
\tfunction setupLights ( program, lights ) {\n\
\n\
\t\tvar l, ll, light, n,\n\
\t\tr = 0, g = 0, b = 0,\n\
\t\tcolor, skyColor, groundColor,\n\
\t\tintensity,  intensitySq,\n\
\t\tposition,\n\
\t\tdistance,\n\
\n\
\t\tzlights = _lights,\n\
\n\
\t\tdirColors = zlights.directional.colors,\n\
\t\tdirPositions = zlights.directional.positions,\n\
\n\
\t\tpointColors = zlights.point.colors,\n\
\t\tpointPositions = zlights.point.positions,\n\
\t\tpointDistances = zlights.point.distances,\n\
\n\
\t\tspotColors = zlights.spot.colors,\n\
\t\tspotPositions = zlights.spot.positions,\n\
\t\tspotDistances = zlights.spot.distances,\n\
\t\tspotDirections = zlights.spot.directions,\n\
\t\tspotAngles = zlights.spot.angles,\n\
\t\tspotExponents = zlights.spot.exponents,\n\
\n\
\t\themiSkyColors = zlights.hemi.skyColors,\n\
\t\themiGroundColors = zlights.hemi.groundColors,\n\
\t\themiPositions = zlights.hemi.positions,\n\
\n\
\t\tdirLength = 0,\n\
\t\tpointLength = 0,\n\
\t\tspotLength = 0,\n\
\t\themiLength = 0,\n\
\n\
\t\tdirOffset = 0,\n\
\t\tpointOffset = 0,\n\
\t\tspotOffset = 0,\n\
\t\themiOffset = 0;\n\
\n\
\t\tfor ( l = 0, ll = lights.length; l < ll; l ++ ) {\n\
\n\
\t\t\tlight = lights[ l ];\n\
\n\
\t\t\tif ( light.onlyShadow || ! light.visible ) continue;\n\
\n\
\t\t\tcolor = light.color;\n\
\t\t\tintensity = light.intensity;\n\
\t\t\tdistance = light.distance;\n\
\n\
\t\t\tif ( light instanceof THREE.AmbientLight ) {\n\
\n\
\t\t\t\tif ( _this.gammaInput ) {\n\
\n\
\t\t\t\t\tr += color.r * color.r;\n\
\t\t\t\t\tg += color.g * color.g;\n\
\t\t\t\t\tb += color.b * color.b;\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\tr += color.r;\n\
\t\t\t\t\tg += color.g;\n\
\t\t\t\t\tb += color.b;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t} else if ( light instanceof THREE.DirectionalLight ) {\n\
\n\
\t\t\t\tdirOffset = dirLength * 3;\n\
\n\
\t\t\t\tif ( _this.gammaInput ) {\n\
\n\
\t\t\t\t\tsetColorGamma( dirColors, dirOffset, color, intensity * intensity );\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\tsetColorLinear( dirColors, dirOffset, color, intensity );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\t_direction.copy( light.matrixWorld.getPosition() );\n\
\t\t\t\t_direction.subSelf( light.target.matrixWorld.getPosition() );\n\
\t\t\t\t_direction.normalize();\n\
\n\
\t\t\t\tdirPositions[ dirOffset ]     = _direction.x;\n\
\t\t\t\tdirPositions[ dirOffset + 1 ] = _direction.y;\n\
\t\t\t\tdirPositions[ dirOffset + 2 ] = _direction.z;\n\
\n\
\t\t\t\tdirLength += 1;\n\
\n\
\t\t\t} else if( light instanceof THREE.PointLight ) {\n\
\n\
\t\t\t\tpointOffset = pointLength * 3;\n\
\n\
\t\t\t\tif ( _this.gammaInput ) {\n\
\n\
\t\t\t\t\tsetColorGamma( pointColors, pointOffset, color, intensity * intensity );\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\tsetColorLinear( pointColors, pointOffset, color, intensity );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tposition = light.matrixWorld.getPosition();\n\
\n\
\t\t\t\tpointPositions[ pointOffset ]     = position.x;\n\
\t\t\t\tpointPositions[ pointOffset + 1 ] = position.y;\n\
\t\t\t\tpointPositions[ pointOffset + 2 ] = position.z;\n\
\n\
\t\t\t\tpointDistances[ pointLength ] = distance;\n\
\n\
\t\t\t\tpointLength += 1;\n\
\n\
\t\t\t} else if( light instanceof THREE.SpotLight ) {\n\
\n\
\t\t\t\tspotOffset = spotLength * 3;\n\
\n\
\t\t\t\tif ( _this.gammaInput ) {\n\
\n\
\t\t\t\t\tsetColorGamma( spotColors, spotOffset, color, intensity * intensity );\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\tsetColorLinear( spotColors, spotOffset, color, intensity );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tposition = light.matrixWorld.getPosition();\n\
\n\
\t\t\t\tspotPositions[ spotOffset ]     = position.x;\n\
\t\t\t\tspotPositions[ spotOffset + 1 ] = position.y;\n\
\t\t\t\tspotPositions[ spotOffset + 2 ] = position.z;\n\
\n\
\t\t\t\tspotDistances[ spotLength ] = distance;\n\
\n\
\t\t\t\t_direction.copy( position );\n\
\t\t\t\t_direction.subSelf( light.target.matrixWorld.getPosition() );\n\
\t\t\t\t_direction.normalize();\n\
\n\
\t\t\t\tspotDirections[ spotOffset ]     = _direction.x;\n\
\t\t\t\tspotDirections[ spotOffset + 1 ] = _direction.y;\n\
\t\t\t\tspotDirections[ spotOffset + 2 ] = _direction.z;\n\
\n\
\t\t\t\tspotAngles[ spotLength ] = Math.cos( light.angle );\n\
\t\t\t\tspotExponents[ spotLength ] = light.exponent;\n\
\n\
\t\t\t\tspotLength += 1;\n\
\n\
\t\t\t} else if ( light instanceof THREE.HemisphereLight ) {\n\
\n\
\t\t\t\tskyColor = light.color;\n\
\t\t\t\tgroundColor = light.groundColor;\n\
\n\
\t\t\t\themiOffset = hemiLength * 3;\n\
\n\
\t\t\t\tif ( _this.gammaInput ) {\n\
\n\
\t\t\t\t\tintensitySq = intensity * intensity;\n\
\n\
\t\t\t\t\tsetColorGamma( hemiSkyColors, hemiOffset, skyColor, intensitySq );\n\
\t\t\t\t\tsetColorGamma( hemiGroundColors, hemiOffset, groundColor, intensitySq );\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\tsetColorLinear( hemiSkyColors, hemiOffset, skyColor, intensity );\n\
\t\t\t\t\tsetColorLinear( hemiGroundColors, hemiOffset, groundColor, intensity );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tposition = light.matrixWorld.getPosition();\n\
\n\
\t\t\t\themiPositions[ hemiOffset ]     = position.x;\n\
\t\t\t\themiPositions[ hemiOffset + 1 ] = position.y;\n\
\t\t\t\themiPositions[ hemiOffset + 2 ] = position.z;\n\
\n\
\t\t\t\themiLength += 1;\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\t// null eventual remains from removed lights\n\
\t\t// (this is to avoid if in shader)\n\
\n\
\t\tfor ( l = dirLength * 3, ll = dirColors.length; l < ll; l ++ ) dirColors[ l ] = 0.0;\n\
\t\tfor ( l = pointLength * 3, ll = pointColors.length; l < ll; l ++ ) pointColors[ l ] = 0.0;\n\
\t\tfor ( l = spotLength * 3, ll = spotColors.length; l < ll; l ++ ) spotColors[ l ] = 0.0;\n\
\t\tfor ( l = hemiLength * 3, ll = hemiSkyColors.length; l < ll; l ++ ) hemiSkyColors[ l ] = 0.0;\n\
\t\tfor ( l = hemiLength * 3, ll = hemiGroundColors.length; l < ll; l ++ ) hemiGroundColors[ l ] = 0.0;\n\
\n\
\t\tzlights.directional.length = dirLength;\n\
\t\tzlights.point.length = pointLength;\n\
\t\tzlights.spot.length = spotLength;\n\
\t\tzlights.hemi.length = hemiLength;\n\
\n\
\t\tzlights.ambient[ 0 ] = r;\n\
\t\tzlights.ambient[ 1 ] = g;\n\
\t\tzlights.ambient[ 2 ] = b;\n\
\n\
\t};\n\
\n\
\t// GL state setting\n\
\n\
\tthis.setFaceCulling = function ( cullFace, frontFace ) {\n\
\n\
\t\tif ( cullFace ) {\n\
\n\
\t\t\tif ( !frontFace || frontFace === \"ccw\" ) {\n\
\n\
\t\t\t\t_gl.frontFace( _gl.CCW );\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\t_gl.frontFace( _gl.CW );\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif( cullFace === \"back\" ) {\n\
\n\
\t\t\t\t_gl.cullFace( _gl.BACK );\n\
\n\
\t\t\t} else if( cullFace === \"front\" ) {\n\
\n\
\t\t\t\t_gl.cullFace( _gl.FRONT );\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\t_gl.cullFace( _gl.FRONT_AND_BACK );\n\
\n\
\t\t\t}\n\
\n\
\t\t\t_gl.enable( _gl.CULL_FACE );\n\
\n\
\t\t} else {\n\
\n\
\t\t\t_gl.disable( _gl.CULL_FACE );\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tthis.setMaterialFaces = function ( material ) {\n\
\n\
\t\tvar doubleSided = material.side === THREE.DoubleSide;\n\
\t\tvar flipSided = material.side === THREE.BackSide;\n\
\n\
\t\tif ( _oldDoubleSided !== doubleSided ) {\n\
\n\
\t\t\tif ( doubleSided ) {\n\
\n\
\t\t\t\t_gl.disable( _gl.CULL_FACE );\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\t_gl.enable( _gl.CULL_FACE );\n\
\n\
\t\t\t}\n\
\n\
\t\t\t_oldDoubleSided = doubleSided;\n\
\n\
\t\t}\n\
\n\
\t\tif ( _oldFlipSided !== flipSided ) {\n\
\n\
\t\t\tif ( flipSided ) {\n\
\n\
\t\t\t\t_gl.frontFace( _gl.CW );\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\t_gl.frontFace( _gl.CCW );\n\
\n\
\t\t\t}\n\
\n\
\t\t\t_oldFlipSided = flipSided;\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tthis.setDepthTest = function ( depthTest ) {\n\
\n\
\t\tif ( _oldDepthTest !== depthTest ) {\n\
\n\
\t\t\tif ( depthTest ) {\n\
\n\
\t\t\t\t_gl.enable( _gl.DEPTH_TEST );\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\t_gl.disable( _gl.DEPTH_TEST );\n\
\n\
\t\t\t}\n\
\n\
\t\t\t_oldDepthTest = depthTest;\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tthis.setDepthWrite = function ( depthWrite ) {\n\
\n\
\t\tif ( _oldDepthWrite !== depthWrite ) {\n\
\n\
\t\t\t_gl.depthMask( depthWrite );\n\
\t\t\t_oldDepthWrite = depthWrite;\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tfunction setLineWidth ( width ) {\n\
\n\
\t\tif ( width !== _oldLineWidth ) {\n\
\n\
\t\t\t_gl.lineWidth( width );\n\
\n\
\t\t\t_oldLineWidth = width;\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tfunction setPolygonOffset ( polygonoffset, factor, units ) {\n\
\n\
\t\tif ( _oldPolygonOffset !== polygonoffset ) {\n\
\n\
\t\t\tif ( polygonoffset ) {\n\
\n\
\t\t\t\t_gl.enable( _gl.POLYGON_OFFSET_FILL );\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\t_gl.disable( _gl.POLYGON_OFFSET_FILL );\n\
\n\
\t\t\t}\n\
\n\
\t\t\t_oldPolygonOffset = polygonoffset;\n\
\n\
\t\t}\n\
\n\
\t\tif ( polygonoffset && ( _oldPolygonOffsetFactor !== factor || _oldPolygonOffsetUnits !== units ) ) {\n\
\n\
\t\t\t_gl.polygonOffset( factor, units );\n\
\n\
\t\t\t_oldPolygonOffsetFactor = factor;\n\
\t\t\t_oldPolygonOffsetUnits = units;\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tthis.setBlending = function ( blending, blendEquation, blendSrc, blendDst ) {\n\
\n\
\t\tif ( blending !== _oldBlending ) {\n\
\n\
\t\t\tif ( blending === THREE.NoBlending ) {\n\
\n\
\t\t\t\t_gl.disable( _gl.BLEND );\n\
\n\
\t\t\t} else if ( blending === THREE.AdditiveBlending ) {\n\
\n\
\t\t\t\t_gl.enable( _gl.BLEND );\n\
\t\t\t\t_gl.blendEquation( _gl.FUNC_ADD );\n\
\t\t\t\t_gl.blendFunc( _gl.SRC_ALPHA, _gl.ONE );\n\
\n\
\t\t\t} else if ( blending === THREE.SubtractiveBlending ) {\n\
\n\
\t\t\t\t// TODO: Find blendFuncSeparate() combination\n\
\t\t\t\t_gl.enable( _gl.BLEND );\n\
\t\t\t\t_gl.blendEquation( _gl.FUNC_ADD );\n\
\t\t\t\t_gl.blendFunc( _gl.ZERO, _gl.ONE_MINUS_SRC_COLOR );\n\
\n\
\t\t\t} else if ( blending === THREE.MultiplyBlending ) {\n\
\n\
\t\t\t\t// TODO: Find blendFuncSeparate() combination\n\
\t\t\t\t_gl.enable( _gl.BLEND );\n\
\t\t\t\t_gl.blendEquation( _gl.FUNC_ADD );\n\
\t\t\t\t_gl.blendFunc( _gl.ZERO, _gl.SRC_COLOR );\n\
\n\
\t\t\t} else if ( blending === THREE.CustomBlending ) {\n\
\n\
\t\t\t\t_gl.enable( _gl.BLEND );\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\t_gl.enable( _gl.BLEND );\n\
\t\t\t\t_gl.blendEquationSeparate( _gl.FUNC_ADD, _gl.FUNC_ADD );\n\
\t\t\t\t_gl.blendFuncSeparate( _gl.SRC_ALPHA, _gl.ONE_MINUS_SRC_ALPHA, _gl.ONE, _gl.ONE_MINUS_SRC_ALPHA );\n\
\n\
\t\t\t}\n\
\n\
\t\t\t_oldBlending = blending;\n\
\n\
\t\t}\n\
\n\
\t\tif ( blending === THREE.CustomBlending ) {\n\
\n\
\t\t\tif ( blendEquation !== _oldBlendEquation ) {\n\
\n\
\t\t\t\t_gl.blendEquation( paramThreeToGL( blendEquation ) );\n\
\n\
\t\t\t\t_oldBlendEquation = blendEquation;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( blendSrc !== _oldBlendSrc || blendDst !== _oldBlendDst ) {\n\
\n\
\t\t\t\t_gl.blendFunc( paramThreeToGL( blendSrc ), paramThreeToGL( blendDst ) );\n\
\n\
\t\t\t\t_oldBlendSrc = blendSrc;\n\
\t\t\t\t_oldBlendDst = blendDst;\n\
\n\
\t\t\t}\n\
\n\
\t\t} else {\n\
\n\
\t\t\t_oldBlendEquation = null;\n\
\t\t\t_oldBlendSrc = null;\n\
\t\t\t_oldBlendDst = null;\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\t// Shaders\n\
\n\
\tfunction buildProgram ( shaderID, fragmentShader, vertexShader, uniforms, attributes, parameters ) {\n\
\n\
\t\tvar p, pl, program, code;\n\
\t\tvar chunks = [];\n\
\n\
\t\t// Generate code\n\
\n\
\t\tif ( shaderID ) {\n\
\n\
\t\t\tchunks.push( shaderID );\n\
\n\
\t\t} else {\n\
\n\
\t\t\tchunks.push( fragmentShader );\n\
\t\t\tchunks.push( vertexShader );\n\
\n\
\t\t}\n\
\n\
\t\tfor ( p in parameters ) {\n\
\n\
\t\t\tchunks.push( p );\n\
\t\t\tchunks.push( parameters[ p ] );\n\
\n\
\t\t}\n\
\n\
\t\tcode = chunks.join();\n\
\n\
\t\t// Check if code has been already compiled\n\
\n\
\t\tfor ( p = 0, pl = _programs.length; p < pl; p ++ ) {\n\
\n\
\t\t\tvar programInfo = _programs[ p ];\n\
\n\
\t\t\tif ( programInfo.code === code ) {\n\
\n\
\t\t\t\t// console.log( \"Code already compiled.\" /*: \\n\\n\" + code*/ );\n\
\n\
\t\t\t\tprogramInfo.usedTimes ++;\n\
\n\
\t\t\t\treturn programInfo.program;\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\t//console.log( \"building new program \" );\n\
\n\
\t\t//\n\
\n\
\t\tprogram = _gl.createProgram();\n\
\n\
\t\tvar prefix_vertex = [\n\
\n\
\t\t\t\"precision \" + _precision + \" float;\",\n\
\n\
\t\t\t_supportsVertexTextures ? \"#define VERTEX_TEXTURES\" : \"\",\n\
\n\
\t\t\t_this.gammaInput ? \"#define GAMMA_INPUT\" : \"\",\n\
\t\t\t_this.gammaOutput ? \"#define GAMMA_OUTPUT\" : \"\",\n\
\t\t\t_this.physicallyBasedShading ? \"#define PHYSICALLY_BASED_SHADING\" : \"\",\n\
\n\
\t\t\t\"#define MAX_DIR_LIGHTS \" + parameters.maxDirLights,\n\
\t\t\t\"#define MAX_POINT_LIGHTS \" + parameters.maxPointLights,\n\
\t\t\t\"#define MAX_SPOT_LIGHTS \" + parameters.maxSpotLights,\n\
\t\t\t\"#define MAX_HEMI_LIGHTS \" + parameters.maxHemiLights,\n\
\n\
\t\t\t\"#define MAX_SHADOWS \" + parameters.maxShadows,\n\
\n\
\t\t\t\"#define MAX_BONES \" + parameters.maxBones,\n\
\n\
\t\t\tparameters.map ? \"#define USE_MAP\" : \"\",\n\
\t\t\tparameters.envMap ? \"#define USE_ENVMAP\" : \"\",\n\
\t\t\tparameters.lightMap ? \"#define USE_LIGHTMAP\" : \"\",\n\
\t\t\tparameters.bumpMap ? \"#define USE_BUMPMAP\" : \"\",\n\
\t\t\tparameters.normalMap ? \"#define USE_NORMALMAP\" : \"\",\n\
\t\t\tparameters.specularMap ? \"#define USE_SPECULARMAP\" : \"\",\n\
\t\t\tparameters.vertexColors ? \"#define USE_COLOR\" : \"\",\n\
\n\
\t\t\tparameters.skinning ? \"#define USE_SKINNING\" : \"\",\n\
\t\t\tparameters.useVertexTexture ? \"#define BONE_TEXTURE\" : \"\",\n\
\t\t\tparameters.boneTextureWidth ? \"#define N_BONE_PIXEL_X \" + parameters.boneTextureWidth.toFixed( 1 ) : \"\",\n\
\t\t\tparameters.boneTextureHeight ? \"#define N_BONE_PIXEL_Y \" + parameters.boneTextureHeight.toFixed( 1 ) : \"\",\n\
\n\
\t\t\tparameters.morphTargets ? \"#define USE_MORPHTARGETS\" : \"\",\n\
\t\t\tparameters.morphNormals ? \"#define USE_MORPHNORMALS\" : \"\",\n\
\t\t\tparameters.perPixel ? \"#define PHONG_PER_PIXEL\" : \"\",\n\
\t\t\tparameters.wrapAround ? \"#define WRAP_AROUND\" : \"\",\n\
\t\t\tparameters.doubleSided ? \"#define DOUBLE_SIDED\" : \"\",\n\
\t\t\tparameters.flipSided ? \"#define FLIP_SIDED\" : \"\",\n\
\n\
\t\t\tparameters.shadowMapEnabled ? \"#define USE_SHADOWMAP\" : \"\",\n\
\t\t\tparameters.shadowMapSoft ? \"#define SHADOWMAP_SOFT\" : \"\",\n\
\t\t\tparameters.shadowMapDebug ? \"#define SHADOWMAP_DEBUG\" : \"\",\n\
\t\t\tparameters.shadowMapCascade ? \"#define SHADOWMAP_CASCADE\" : \"\",\n\
\n\
\t\t\tparameters.sizeAttenuation ? \"#define USE_SIZEATTENUATION\" : \"\",\n\
\n\
\t\t\t\"uniform mat4 modelMatrix;\",\n\
\t\t\t\"uniform mat4 modelViewMatrix;\",\n\
\t\t\t\"uniform mat4 projectionMatrix;\",\n\
\t\t\t\"uniform mat4 viewMatrix;\",\n\
\t\t\t\"uniform mat3 normalMatrix;\",\n\
\t\t\t\"uniform vec3 cameraPosition;\",\n\
\n\
\t\t\t\"attribute vec3 position;\",\n\
\t\t\t\"attribute vec3 normal;\",\n\
\t\t\t\"attribute vec2 uv;\",\n\
\t\t\t\"attribute vec2 uv2;\",\n\
\n\
\t\t\t\"#ifdef USE_COLOR\",\n\
\n\
\t\t\t\t\"attribute vec3 color;\",\n\
\n\
\t\t\t\"#endif\",\n\
\n\
\t\t\t\"#ifdef USE_MORPHTARGETS\",\n\
\n\
\t\t\t\t\"attribute vec3 morphTarget0;\",\n\
\t\t\t\t\"attribute vec3 morphTarget1;\",\n\
\t\t\t\t\"attribute vec3 morphTarget2;\",\n\
\t\t\t\t\"attribute vec3 morphTarget3;\",\n\
\n\
\t\t\t\t\"#ifdef USE_MORPHNORMALS\",\n\
\n\
\t\t\t\t\t\"attribute vec3 morphNormal0;\",\n\
\t\t\t\t\t\"attribute vec3 morphNormal1;\",\n\
\t\t\t\t\t\"attribute vec3 morphNormal2;\",\n\
\t\t\t\t\t\"attribute vec3 morphNormal3;\",\n\
\n\
\t\t\t\t\"#else\",\n\
\n\
\t\t\t\t\t\"attribute vec3 morphTarget4;\",\n\
\t\t\t\t\t\"attribute vec3 morphTarget5;\",\n\
\t\t\t\t\t\"attribute vec3 morphTarget6;\",\n\
\t\t\t\t\t\"attribute vec3 morphTarget7;\",\n\
\n\
\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\"#endif\",\n\
\n\
\t\t\t\"#ifdef USE_SKINNING\",\n\
\n\
\t\t\t\t\"attribute vec4 skinIndex;\",\n\
\t\t\t\t\"attribute vec4 skinWeight;\",\n\
\n\
\t\t\t\"#endif\",\n\
\n\
\t\t\t\"\"\n\
\n\
\t\t].join(\"\\n\");\n\
\n\
\t\tvar prefix_fragment = [\n\
\n\
\t\t\t\"precision \" + _precision + \" float;\",\n\
\n\
\t\t\t( parameters.bumpMap || parameters.normalMap ) ? \"#extension GL_OES_standard_derivatives : enable\" : \"\",\n\
\n\
\t\t\t\"#define MAX_DIR_LIGHTS \" + parameters.maxDirLights,\n\
\t\t\t\"#define MAX_POINT_LIGHTS \" + parameters.maxPointLights,\n\
\t\t\t\"#define MAX_SPOT_LIGHTS \" + parameters.maxSpotLights,\n\
\t\t\t\"#define MAX_HEMI_LIGHTS \" + parameters.maxHemiLights,\n\
\n\
\t\t\t\"#define MAX_SHADOWS \" + parameters.maxShadows,\n\
\n\
\t\t\tparameters.alphaTest ? \"#define ALPHATEST \" + parameters.alphaTest: \"\",\n\
\n\
\t\t\t_this.gammaInput ? \"#define GAMMA_INPUT\" : \"\",\n\
\t\t\t_this.gammaOutput ? \"#define GAMMA_OUTPUT\" : \"\",\n\
\t\t\t_this.physicallyBasedShading ? \"#define PHYSICALLY_BASED_SHADING\" : \"\",\n\
\n\
\t\t\t( parameters.useFog && parameters.fog ) ? \"#define USE_FOG\" : \"\",\n\
\t\t\t( parameters.useFog && parameters.fog instanceof THREE.FogExp2 ) ? \"#define FOG_EXP2\" : \"\",\n\
\n\
\t\t\tparameters.map ? \"#define USE_MAP\" : \"\",\n\
\t\t\tparameters.envMap ? \"#define USE_ENVMAP\" : \"\",\n\
\t\t\tparameters.lightMap ? \"#define USE_LIGHTMAP\" : \"\",\n\
\t\t\tparameters.bumpMap ? \"#define USE_BUMPMAP\" : \"\",\n\
\t\t\tparameters.normalMap ? \"#define USE_NORMALMAP\" : \"\",\n\
\t\t\tparameters.specularMap ? \"#define USE_SPECULARMAP\" : \"\",\n\
\t\t\tparameters.vertexColors ? \"#define USE_COLOR\" : \"\",\n\
\n\
\t\t\tparameters.metal ? \"#define METAL\" : \"\",\n\
\t\t\tparameters.perPixel ? \"#define PHONG_PER_PIXEL\" : \"\",\n\
\t\t\tparameters.wrapAround ? \"#define WRAP_AROUND\" : \"\",\n\
\t\t\tparameters.doubleSided ? \"#define DOUBLE_SIDED\" : \"\",\n\
\t\t\tparameters.flipSided ? \"#define FLIP_SIDED\" : \"\",\n\
\n\
\t\t\tparameters.shadowMapEnabled ? \"#define USE_SHADOWMAP\" : \"\",\n\
\t\t\tparameters.shadowMapSoft ? \"#define SHADOWMAP_SOFT\" : \"\",\n\
\t\t\tparameters.shadowMapDebug ? \"#define SHADOWMAP_DEBUG\" : \"\",\n\
\t\t\tparameters.shadowMapCascade ? \"#define SHADOWMAP_CASCADE\" : \"\",\n\
\n\
\t\t\t\"uniform mat4 viewMatrix;\",\n\
\t\t\t\"uniform vec3 cameraPosition;\",\n\
\t\t\t\"\"\n\
\n\
\t\t].join(\"\\n\");\n\
\n\
\t\tvar glFragmentShader = getShader( \"fragment\", prefix_fragment + fragmentShader );\n\
\t\tvar glVertexShader = getShader( \"vertex\", prefix_vertex + vertexShader );\n\
\n\
\t\t_gl.attachShader( program, glVertexShader );\n\
\t\t_gl.attachShader( program, glFragmentShader );\n\
\n\
\t\t_gl.linkProgram( program );\n\
\n\
\t\tif ( !_gl.getProgramParameter( program, _gl.LINK_STATUS ) ) {\n\
\n\
\t\t\tconsole.error( \"Could not initialise shader\\n\" + \"VALIDATE_STATUS: \" + _gl.getProgramParameter( program, _gl.VALIDATE_STATUS ) + \", gl error [\" + _gl.getError() + \"]\" );\n\
\n\
\t\t}\n\
\n\
\t\t// clean up\n\
\n\
\t\t_gl.deleteShader( glFragmentShader );\n\
\t\t_gl.deleteShader( glVertexShader );\n\
\n\
\t\t//console.log( prefix_fragment + fragmentShader );\n\
\t\t//console.log( prefix_vertex + vertexShader );\n\
\n\
\t\tprogram.uniforms = {};\n\
\t\tprogram.attributes = {};\n\
\n\
\t\tvar identifiers, u, a, i;\n\
\n\
\t\t// cache uniform locations\n\
\n\
\t\tidentifiers = [\n\
\n\
\t\t\t'viewMatrix', 'modelViewMatrix', 'projectionMatrix', 'normalMatrix', 'modelMatrix', 'cameraPosition',\n\
\t\t\t'morphTargetInfluences'\n\
\n\
\t\t];\n\
\n\
\t\tif ( parameters.useVertexTexture ) {\n\
\n\
\t\t\tidentifiers.push( 'boneTexture' );\n\
\n\
\t\t} else {\n\
\n\
\t\t\tidentifiers.push( 'boneGlobalMatrices' );\n\
\n\
\t\t}\n\
\n\
\t\tfor ( u in uniforms ) {\n\
\n\
\t\t\tidentifiers.push( u );\n\
\n\
\t\t}\n\
\n\
\t\tcacheUniformLocations( program, identifiers );\n\
\n\
\t\t// cache attributes locations\n\
\n\
\t\tidentifiers = [\n\
\n\
\t\t\t\"position\", \"normal\", \"uv\", \"uv2\", \"tangent\", \"color\",\n\
\t\t\t\"skinIndex\", \"skinWeight\"\n\
\n\
\t\t];\n\
\n\
\t\tfor ( i = 0; i < parameters.maxMorphTargets; i ++ ) {\n\
\n\
\t\t\tidentifiers.push( \"morphTarget\" + i );\n\
\n\
\t\t}\n\
\n\
\t\tfor ( i = 0; i < parameters.maxMorphNormals; i ++ ) {\n\
\n\
\t\t\tidentifiers.push( \"morphNormal\" + i );\n\
\n\
\t\t}\n\
\n\
\t\tfor ( a in attributes ) {\n\
\n\
\t\t\tidentifiers.push( a );\n\
\n\
\t\t}\n\
\n\
\t\tcacheAttributeLocations( program, identifiers );\n\
\n\
\t\tprogram.id = _programs_counter ++;\n\
\n\
\t\t_programs.push( { program: program, code: code, usedTimes: 1 } );\n\
\n\
\t\t_this.info.memory.programs = _programs.length;\n\
\n\
\t\treturn program;\n\
\n\
\t};\n\
\n\
\t// Shader parameters cache\n\
\n\
\tfunction cacheUniformLocations ( program, identifiers ) {\n\
\n\
\t\tvar i, l, id;\n\
\n\
\t\tfor( i = 0, l = identifiers.length; i < l; i ++ ) {\n\
\n\
\t\t\tid = identifiers[ i ];\n\
\t\t\tprogram.uniforms[ id ] = _gl.getUniformLocation( program, id );\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tfunction cacheAttributeLocations ( program, identifiers ) {\n\
\n\
\t\tvar i, l, id;\n\
\n\
\t\tfor( i = 0, l = identifiers.length; i < l; i ++ ) {\n\
\n\
\t\t\tid = identifiers[ i ];\n\
\t\t\tprogram.attributes[ id ] = _gl.getAttribLocation( program, id );\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tfunction addLineNumbers ( string ) {\n\
\n\
\t\tvar chunks = string.split( \"\\n\" );\n\
\n\
\t\tfor ( var i = 0, il = chunks.length; i < il; i ++ ) {\n\
\n\
\t\t\t// Chrome reports shader errors on lines\n\
\t\t\t// starting counting from 1\n\
\n\
\t\t\tchunks[ i ] = ( i + 1 ) + \": \" + chunks[ i ];\n\
\n\
\t\t}\n\
\n\
\t\treturn chunks.join( \"\\n\" );\n\
\n\
\t};\n\
\n\
\tfunction getShader ( type, string ) {\n\
\n\
\t\tvar shader;\n\
\n\
\t\tif ( type === \"fragment\" ) {\n\
\n\
\t\t\tshader = _gl.createShader( _gl.FRAGMENT_SHADER );\n\
\n\
\t\t} else if ( type === \"vertex\" ) {\n\
\n\
\t\t\tshader = _gl.createShader( _gl.VERTEX_SHADER );\n\
\n\
\t\t}\n\
\n\
\t\t_gl.shaderSource( shader, string );\n\
\t\t_gl.compileShader( shader );\n\
\n\
\t\tif ( !_gl.getShaderParameter( shader, _gl.COMPILE_STATUS ) ) {\n\
\n\
\t\t\tconsole.error( _gl.getShaderInfoLog( shader ) );\n\
\t\t\tconsole.error( addLineNumbers( string ) );\n\
\t\t\treturn null;\n\
\n\
\t\t}\n\
\n\
\t\treturn shader;\n\
\n\
\t};\n\
\n\
\t// Textures\n\
\n\
\n\
\tfunction isPowerOfTwo ( value ) {\n\
\n\
\t\treturn ( value & ( value - 1 ) ) === 0;\n\
\n\
\t};\n\
\n\
\tfunction setTextureParameters ( textureType, texture, isImagePowerOfTwo ) {\n\
\n\
\t\tif ( isImagePowerOfTwo ) {\n\
\n\
\t\t\t_gl.texParameteri( textureType, _gl.TEXTURE_WRAP_S, paramThreeToGL( texture.wrapS ) );\n\
\t\t\t_gl.texParameteri( textureType, _gl.TEXTURE_WRAP_T, paramThreeToGL( texture.wrapT ) );\n\
\n\
\t\t\t_gl.texParameteri( textureType, _gl.TEXTURE_MAG_FILTER, paramThreeToGL( texture.magFilter ) );\n\
\t\t\t_gl.texParameteri( textureType, _gl.TEXTURE_MIN_FILTER, paramThreeToGL( texture.minFilter ) );\n\
\n\
\t\t} else {\n\
\n\
\t\t\t_gl.texParameteri( textureType, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE );\n\
\t\t\t_gl.texParameteri( textureType, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE );\n\
\n\
\t\t\t_gl.texParameteri( textureType, _gl.TEXTURE_MAG_FILTER, filterFallback( texture.magFilter ) );\n\
\t\t\t_gl.texParameteri( textureType, _gl.TEXTURE_MIN_FILTER, filterFallback( texture.minFilter ) );\n\
\n\
\t\t}\n\
\n\
\t\tif ( _glExtensionTextureFilterAnisotropic && texture.type !== THREE.FloatType ) {\n\
\n\
\t\t\tif ( texture.anisotropy > 1 || texture.__oldAnisotropy ) {\n\
\n\
\t\t\t\t_gl.texParameterf( textureType, _glExtensionTextureFilterAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT, Math.min( texture.anisotropy, _maxAnisotropy ) );\n\
\t\t\t\ttexture.__oldAnisotropy = texture.anisotropy;\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tthis.setTexture = function ( texture, slot ) {\n\
\n\
\t\tif ( texture.needsUpdate ) {\n\
\n\
\t\t\tif ( ! texture.__webglInit ) {\n\
\n\
\t\t\t\ttexture.__webglInit = true;\n\
\t\t\t\ttexture.__webglTexture = _gl.createTexture();\n\
\n\
\t\t\t\t_this.info.memory.textures ++;\n\
\n\
\t\t\t}\n\
\n\
\t\t\t_gl.activeTexture( _gl.TEXTURE0 + slot );\n\
\t\t\t_gl.bindTexture( _gl.TEXTURE_2D, texture.__webglTexture );\n\
\n\
\t\t\t_gl.pixelStorei( _gl.UNPACK_FLIP_Y_WEBGL, texture.flipY );\n\
\t\t\t_gl.pixelStorei( _gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, texture.premultiplyAlpha );\n\
\n\
\t\t\tvar image = texture.image,\n\
\t\t\tisImagePowerOfTwo = isPowerOfTwo( image.width ) && isPowerOfTwo( image.height ),\n\
\t\t\tglFormat = paramThreeToGL( texture.format ),\n\
\t\t\tglType = paramThreeToGL( texture.type );\n\
\n\
\t\t\tsetTextureParameters( _gl.TEXTURE_2D, texture, isImagePowerOfTwo );\n\
\n\
\t\t\tif ( texture instanceof THREE.CompressedTexture ) {\n\
\n\
\t\t\t\tvar mipmap, mipmaps = texture.mipmaps;\n\
\n\
\t\t\t\tfor( var i = 0, il = mipmaps.length; i < il; i ++ ) {\n\
\n\
\t\t\t\t\tmipmap = mipmaps[ i ];\n\
\t\t\t\t\t_gl.compressedTexImage2D( _gl.TEXTURE_2D, i, glFormat, mipmap.width, mipmap.height, 0, mipmap.data );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t} else if ( texture instanceof THREE.DataTexture ) {\n\
\n\
\t\t\t\t_gl.texImage2D( _gl.TEXTURE_2D, 0, glFormat, image.width, image.height, 0, glFormat, glType, image.data );\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\t_gl.texImage2D( _gl.TEXTURE_2D, 0, glFormat, glFormat, glType, texture.image );\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( texture.generateMipmaps && isImagePowerOfTwo ) _gl.generateMipmap( _gl.TEXTURE_2D );\n\
\n\
\t\t\ttexture.needsUpdate = false;\n\
\n\
\t\t\tif ( texture.onUpdate ) texture.onUpdate();\n\
\n\
\t\t} else {\n\
\n\
\t\t\t_gl.activeTexture( _gl.TEXTURE0 + slot );\n\
\t\t\t_gl.bindTexture( _gl.TEXTURE_2D, texture.__webglTexture );\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tfunction clampToMaxSize ( image, maxSize ) {\n\
\n\
\t\tif ( image.width <= maxSize && image.height <= maxSize ) {\n\
\n\
\t\t\treturn image;\n\
\n\
\t\t}\n\
\n\
\t\t// Warning: Scaling through the canvas will only work with images that use\n\
\t\t// premultiplied alpha.\n\
\n\
\t\tvar maxDimension = Math.max( image.width, image.height );\n\
\t\tvar newWidth = Math.floor( image.width * maxSize / maxDimension );\n\
\t\tvar newHeight = Math.floor( image.height * maxSize / maxDimension );\n\
\n\
\t\tvar canvas = document.createElement( 'canvas' );\n\
\t\tcanvas.width = newWidth;\n\
\t\tcanvas.height = newHeight;\n\
\n\
\t\tvar ctx = canvas.getContext( \"2d\" );\n\
\t\tctx.drawImage( image, 0, 0, image.width, image.height, 0, 0, newWidth, newHeight );\n\
\n\
\t\treturn canvas;\n\
\n\
\t}\n\
\n\
\tfunction setCubeTexture ( texture, slot ) {\n\
\n\
\t\tif ( texture.image.length === 6 ) {\n\
\n\
\t\t\tif ( texture.needsUpdate ) {\n\
\n\
\t\t\t\tif ( ! texture.image.__webglTextureCube ) {\n\
\n\
\t\t\t\t\ttexture.image.__webglTextureCube = _gl.createTexture();\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\t_gl.activeTexture( _gl.TEXTURE0 + slot );\n\
\t\t\t\t_gl.bindTexture( _gl.TEXTURE_CUBE_MAP, texture.image.__webglTextureCube );\n\
\n\
\t\t\t\t_gl.pixelStorei( _gl.UNPACK_FLIP_Y_WEBGL, texture.flipY );\n\
\n\
\t\t\t\tvar isCompressed = texture instanceof THREE.CompressedTexture;\n\
\n\
\t\t\t\tvar cubeImage = [];\n\
\n\
\t\t\t\tfor ( var i = 0; i < 6; i ++ ) {\n\
\n\
\t\t\t\t\tif ( _this.autoScaleCubemaps && ! isCompressed ) {\n\
\n\
\t\t\t\t\t\tcubeImage[ i ] = clampToMaxSize( texture.image[ i ], _maxCubemapSize );\n\
\n\
\t\t\t\t\t} else {\n\
\n\
\t\t\t\t\t\tcubeImage[ i ] = texture.image[ i ];\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tvar image = cubeImage[ 0 ],\n\
\t\t\t\tisImagePowerOfTwo = isPowerOfTwo( image.width ) && isPowerOfTwo( image.height ),\n\
\t\t\t\tglFormat = paramThreeToGL( texture.format ),\n\
\t\t\t\tglType = paramThreeToGL( texture.type );\n\
\n\
\t\t\t\tsetTextureParameters( _gl.TEXTURE_CUBE_MAP, texture, isImagePowerOfTwo );\n\
\n\
\t\t\t\tfor ( var i = 0; i < 6; i ++ ) {\n\
\n\
\t\t\t\t\tif ( isCompressed ) {\n\
\n\
\t\t\t\t\t\tvar mipmap, mipmaps = cubeImage[ i ].mipmaps;\n\
\n\
\t\t\t\t\t\tfor( var j = 0, jl = mipmaps.length; j < jl; j ++ ) {\n\
\n\
\t\t\t\t\t\t\tmipmap = mipmaps[ j ];\n\
\t\t\t\t\t\t\t_gl.compressedTexImage2D( _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, j, glFormat, mipmap.width, mipmap.height, 0, mipmap.data );\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t} else {\n\
\n\
\t\t\t\t\t\t_gl.texImage2D( _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, glFormat, glFormat, glType, cubeImage[ i ] );\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tif ( texture.generateMipmaps && isImagePowerOfTwo ) {\n\
\n\
\t\t\t\t\t_gl.generateMipmap( _gl.TEXTURE_CUBE_MAP );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\ttexture.needsUpdate = false;\n\
\n\
\t\t\t\tif ( texture.onUpdate ) texture.onUpdate();\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\t_gl.activeTexture( _gl.TEXTURE0 + slot );\n\
\t\t\t\t_gl.bindTexture( _gl.TEXTURE_CUBE_MAP, texture.image.__webglTextureCube );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tfunction setCubeTextureDynamic ( texture, slot ) {\n\
\n\
\t\t_gl.activeTexture( _gl.TEXTURE0 + slot );\n\
\t\t_gl.bindTexture( _gl.TEXTURE_CUBE_MAP, texture.__webglTexture );\n\
\n\
\t};\n\
\n\
\t// Render targets\n\
\n\
\tfunction setupFrameBuffer ( framebuffer, renderTarget, textureTarget ) {\n\
\n\
\t\t_gl.bindFramebuffer( _gl.FRAMEBUFFER, framebuffer );\n\
\t\t_gl.framebufferTexture2D( _gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, textureTarget, renderTarget.__webglTexture, 0 );\n\
\n\
\t};\n\
\n\
\tfunction setupRenderBuffer ( renderbuffer, renderTarget  ) {\n\
\n\
\t\t_gl.bindRenderbuffer( _gl.RENDERBUFFER, renderbuffer );\n\
\n\
\t\tif ( renderTarget.depthBuffer && ! renderTarget.stencilBuffer ) {\n\
\n\
\t\t\t_gl.renderbufferStorage( _gl.RENDERBUFFER, _gl.DEPTH_COMPONENT16, renderTarget.width, renderTarget.height );\n\
\t\t\t_gl.framebufferRenderbuffer( _gl.FRAMEBUFFER, _gl.DEPTH_ATTACHMENT, _gl.RENDERBUFFER, renderbuffer );\n\
\n\
\t\t/* For some reason this is not working. Defaulting to RGBA4.\n\
\t\t} else if( ! renderTarget.depthBuffer && renderTarget.stencilBuffer ) {\n\
\n\
\t\t\t_gl.renderbufferStorage( _gl.RENDERBUFFER, _gl.STENCIL_INDEX8, renderTarget.width, renderTarget.height );\n\
\t\t\t_gl.framebufferRenderbuffer( _gl.FRAMEBUFFER, _gl.STENCIL_ATTACHMENT, _gl.RENDERBUFFER, renderbuffer );\n\
\t\t*/\n\
\t\t} else if( renderTarget.depthBuffer && renderTarget.stencilBuffer ) {\n\
\n\
\t\t\t_gl.renderbufferStorage( _gl.RENDERBUFFER, _gl.DEPTH_STENCIL, renderTarget.width, renderTarget.height );\n\
\t\t\t_gl.framebufferRenderbuffer( _gl.FRAMEBUFFER, _gl.DEPTH_STENCIL_ATTACHMENT, _gl.RENDERBUFFER, renderbuffer );\n\
\n\
\t\t} else {\n\
\n\
\t\t\t_gl.renderbufferStorage( _gl.RENDERBUFFER, _gl.RGBA4, renderTarget.width, renderTarget.height );\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tthis.setRenderTarget = function ( renderTarget ) {\n\
\n\
\t\tvar isCube = ( renderTarget instanceof THREE.WebGLRenderTargetCube );\n\
\n\
\t\tif ( renderTarget && ! renderTarget.__webglFramebuffer ) {\n\
\n\
\t\t\tif ( renderTarget.depthBuffer === undefined ) renderTarget.depthBuffer = true;\n\
\t\t\tif ( renderTarget.stencilBuffer === undefined ) renderTarget.stencilBuffer = true;\n\
\n\
\t\t\trenderTarget.__webglTexture = _gl.createTexture();\n\
\n\
\t\t\t// Setup texture, create render and frame buffers\n\
\n\
\t\t\tvar isTargetPowerOfTwo = isPowerOfTwo( renderTarget.width ) && isPowerOfTwo( renderTarget.height ),\n\
\t\t\t\tglFormat = paramThreeToGL( renderTarget.format ),\n\
\t\t\t\tglType = paramThreeToGL( renderTarget.type );\n\
\n\
\t\t\tif ( isCube ) {\n\
\n\
\t\t\t\trenderTarget.__webglFramebuffer = [];\n\
\t\t\t\trenderTarget.__webglRenderbuffer = [];\n\
\n\
\t\t\t\t_gl.bindTexture( _gl.TEXTURE_CUBE_MAP, renderTarget.__webglTexture );\n\
\t\t\t\tsetTextureParameters( _gl.TEXTURE_CUBE_MAP, renderTarget, isTargetPowerOfTwo );\n\
\n\
\t\t\t\tfor ( var i = 0; i < 6; i ++ ) {\n\
\n\
\t\t\t\t\trenderTarget.__webglFramebuffer[ i ] = _gl.createFramebuffer();\n\
\t\t\t\t\trenderTarget.__webglRenderbuffer[ i ] = _gl.createRenderbuffer();\n\
\n\
\t\t\t\t\t_gl.texImage2D( _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, glFormat, renderTarget.width, renderTarget.height, 0, glFormat, glType, null );\n\
\n\
\t\t\t\t\tsetupFrameBuffer( renderTarget.__webglFramebuffer[ i ], renderTarget, _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i );\n\
\t\t\t\t\tsetupRenderBuffer( renderTarget.__webglRenderbuffer[ i ], renderTarget );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tif ( isTargetPowerOfTwo ) _gl.generateMipmap( _gl.TEXTURE_CUBE_MAP );\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\trenderTarget.__webglFramebuffer = _gl.createFramebuffer();\n\
\t\t\t\trenderTarget.__webglRenderbuffer = _gl.createRenderbuffer();\n\
\n\
\t\t\t\t_gl.bindTexture( _gl.TEXTURE_2D, renderTarget.__webglTexture );\n\
\t\t\t\tsetTextureParameters( _gl.TEXTURE_2D, renderTarget, isTargetPowerOfTwo );\n\
\n\
\t\t\t\t_gl.texImage2D( _gl.TEXTURE_2D, 0, glFormat, renderTarget.width, renderTarget.height, 0, glFormat, glType, null );\n\
\n\
\t\t\t\tsetupFrameBuffer( renderTarget.__webglFramebuffer, renderTarget, _gl.TEXTURE_2D );\n\
\t\t\t\tsetupRenderBuffer( renderTarget.__webglRenderbuffer, renderTarget );\n\
\n\
\t\t\t\tif ( isTargetPowerOfTwo ) _gl.generateMipmap( _gl.TEXTURE_2D );\n\
\n\
\t\t\t}\n\
\n\
\t\t\t// Release everything\n\
\n\
\t\t\tif ( isCube ) {\n\
\n\
\t\t\t\t_gl.bindTexture( _gl.TEXTURE_CUBE_MAP, null );\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\t_gl.bindTexture( _gl.TEXTURE_2D, null );\n\
\n\
\t\t\t}\n\
\n\
\t\t\t_gl.bindRenderbuffer( _gl.RENDERBUFFER, null );\n\
\t\t\t_gl.bindFramebuffer( _gl.FRAMEBUFFER, null);\n\
\n\
\t\t}\n\
\n\
\t\tvar framebuffer, width, height, vx, vy;\n\
\n\
\t\tif ( renderTarget ) {\n\
\n\
\t\t\tif ( isCube ) {\n\
\n\
\t\t\t\tframebuffer = renderTarget.__webglFramebuffer[ renderTarget.activeCubeFace ];\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tframebuffer = renderTarget.__webglFramebuffer;\n\
\n\
\t\t\t}\n\
\n\
\t\t\twidth = renderTarget.width;\n\
\t\t\theight = renderTarget.height;\n\
\n\
\t\t\tvx = 0;\n\
\t\t\tvy = 0;\n\
\n\
\t\t} else {\n\
\n\
\t\t\tframebuffer = null;\n\
\n\
\t\t\twidth = _viewportWidth;\n\
\t\t\theight = _viewportHeight;\n\
\n\
\t\t\tvx = _viewportX;\n\
\t\t\tvy = _viewportY;\n\
\n\
\t\t}\n\
\n\
\t\tif ( framebuffer !== _currentFramebuffer ) {\n\
\n\
\t\t\t_gl.bindFramebuffer( _gl.FRAMEBUFFER, framebuffer );\n\
\t\t\t_gl.viewport( vx, vy, width, height );\n\
\n\
\t\t\t_currentFramebuffer = framebuffer;\n\
\n\
\t\t}\n\
\n\
\t\t_currentWidth = width;\n\
\t\t_currentHeight = height;\n\
\n\
\t};\n\
\n\
\tfunction updateRenderTargetMipmap ( renderTarget ) {\n\
\n\
\t\tif ( renderTarget instanceof THREE.WebGLRenderTargetCube ) {\n\
\n\
\t\t\t_gl.bindTexture( _gl.TEXTURE_CUBE_MAP, renderTarget.__webglTexture );\n\
\t\t\t_gl.generateMipmap( _gl.TEXTURE_CUBE_MAP );\n\
\t\t\t_gl.bindTexture( _gl.TEXTURE_CUBE_MAP, null );\n\
\n\
\t\t} else {\n\
\n\
\t\t\t_gl.bindTexture( _gl.TEXTURE_2D, renderTarget.__webglTexture );\n\
\t\t\t_gl.generateMipmap( _gl.TEXTURE_2D );\n\
\t\t\t_gl.bindTexture( _gl.TEXTURE_2D, null );\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\t// Fallback filters for non-power-of-2 textures\n\
\n\
\tfunction filterFallback ( f ) {\n\
\n\
\t\tif ( f === THREE.NearestFilter || f === THREE.NearestMipMapNearestFilter || f === THREE.NearestMipMapLinearFilter ) {\n\
\n\
\t\t\treturn _gl.NEAREST;\n\
\n\
\t\t}\n\
\n\
\t\treturn _gl.LINEAR;\n\
\n\
\t};\n\
\n\
\t// Map three.js constants to WebGL constants\n\
\n\
\tfunction paramThreeToGL ( p ) {\n\
\n\
\t\tif ( p === THREE.RepeatWrapping ) return _gl.REPEAT;\n\
\t\tif ( p === THREE.ClampToEdgeWrapping ) return _gl.CLAMP_TO_EDGE;\n\
\t\tif ( p === THREE.MirroredRepeatWrapping ) return _gl.MIRRORED_REPEAT;\n\
\n\
\t\tif ( p === THREE.NearestFilter ) return _gl.NEAREST;\n\
\t\tif ( p === THREE.NearestMipMapNearestFilter ) return _gl.NEAREST_MIPMAP_NEAREST;\n\
\t\tif ( p === THREE.NearestMipMapLinearFilter ) return _gl.NEAREST_MIPMAP_LINEAR;\n\
\n\
\t\tif ( p === THREE.LinearFilter ) return _gl.LINEAR;\n\
\t\tif ( p === THREE.LinearMipMapNearestFilter ) return _gl.LINEAR_MIPMAP_NEAREST;\n\
\t\tif ( p === THREE.LinearMipMapLinearFilter ) return _gl.LINEAR_MIPMAP_LINEAR;\n\
\n\
\t\tif ( p === THREE.UnsignedByteType ) return _gl.UNSIGNED_BYTE;\n\
\t\tif ( p === THREE.UnsignedShort4444Type ) return _gl.UNSIGNED_SHORT_4_4_4_4;\n\
\t\tif ( p === THREE.UnsignedShort5551Type ) return _gl.UNSIGNED_SHORT_5_5_5_1;\n\
\t\tif ( p === THREE.UnsignedShort565Type ) return _gl.UNSIGNED_SHORT_5_6_5;\n\
\n\
\t\tif ( p === THREE.ByteType ) return _gl.BYTE;\n\
\t\tif ( p === THREE.ShortType ) return _gl.SHORT;\n\
\t\tif ( p === THREE.UnsignedShortType ) return _gl.UNSIGNED_SHORT;\n\
\t\tif ( p === THREE.IntType ) return _gl.INT;\n\
\t\tif ( p === THREE.UnsignedIntType ) return _gl.UNSIGNED_INT;\n\
\t\tif ( p === THREE.FloatType ) return _gl.FLOAT;\n\
\n\
\t\tif ( p === THREE.AlphaFormat ) return _gl.ALPHA;\n\
\t\tif ( p === THREE.RGBFormat ) return _gl.RGB;\n\
\t\tif ( p === THREE.RGBAFormat ) return _gl.RGBA;\n\
\t\tif ( p === THREE.LuminanceFormat ) return _gl.LUMINANCE;\n\
\t\tif ( p === THREE.LuminanceAlphaFormat ) return _gl.LUMINANCE_ALPHA;\n\
\n\
\t\tif ( p === THREE.AddEquation ) return _gl.FUNC_ADD;\n\
\t\tif ( p === THREE.SubtractEquation ) return _gl.FUNC_SUBTRACT;\n\
\t\tif ( p === THREE.ReverseSubtractEquation ) return _gl.FUNC_REVERSE_SUBTRACT;\n\
\n\
\t\tif ( p === THREE.ZeroFactor ) return _gl.ZERO;\n\
\t\tif ( p === THREE.OneFactor ) return _gl.ONE;\n\
\t\tif ( p === THREE.SrcColorFactor ) return _gl.SRC_COLOR;\n\
\t\tif ( p === THREE.OneMinusSrcColorFactor ) return _gl.ONE_MINUS_SRC_COLOR;\n\
\t\tif ( p === THREE.SrcAlphaFactor ) return _gl.SRC_ALPHA;\n\
\t\tif ( p === THREE.OneMinusSrcAlphaFactor ) return _gl.ONE_MINUS_SRC_ALPHA;\n\
\t\tif ( p === THREE.DstAlphaFactor ) return _gl.DST_ALPHA;\n\
\t\tif ( p === THREE.OneMinusDstAlphaFactor ) return _gl.ONE_MINUS_DST_ALPHA;\n\
\n\
\t\tif ( p === THREE.DstColorFactor ) return _gl.DST_COLOR;\n\
\t\tif ( p === THREE.OneMinusDstColorFactor ) return _gl.ONE_MINUS_DST_COLOR;\n\
\t\tif ( p === THREE.SrcAlphaSaturateFactor ) return _gl.SRC_ALPHA_SATURATE;\n\
\n\
\t\tif ( _glExtensionCompressedTextureS3TC !== undefined ) {\n\
\n\
\t\t\tif ( p === THREE.RGB_S3TC_DXT1_Format ) return _glExtensionCompressedTextureS3TC.COMPRESSED_RGB_S3TC_DXT1_EXT;\n\
\t\t\tif ( p === THREE.RGBA_S3TC_DXT1_Format ) return _glExtensionCompressedTextureS3TC.COMPRESSED_RGBA_S3TC_DXT1_EXT;\n\
\t\t\tif ( p === THREE.RGBA_S3TC_DXT3_Format ) return _glExtensionCompressedTextureS3TC.COMPRESSED_RGBA_S3TC_DXT3_EXT;\n\
\t\t\tif ( p === THREE.RGBA_S3TC_DXT5_Format ) return _glExtensionCompressedTextureS3TC.COMPRESSED_RGBA_S3TC_DXT5_EXT;\n\
\n\
\t\t}\n\
\n\
\t\treturn 0;\n\
\n\
\t};\n\
\n\
\t// Allocations\n\
\n\
\tfunction allocateBones ( object ) {\n\
\n\
\t\tif ( _supportsBoneTextures && object && object.useVertexTexture ) {\n\
\n\
\t\t\treturn 1024;\n\
\n\
\t\t} else {\n\
\n\
\t\t\t// default for when object is not specified\n\
\t\t\t// ( for example when prebuilding shader\n\
\t\t\t//   to be used with multiple objects )\n\
\t\t\t//\n\
\t\t\t// \t- leave some extra space for other uniforms\n\
\t\t\t//  - limit here is ANGLE's 254 max uniform vectors\n\
\t\t\t//    (up to 54 should be safe)\n\
\n\
\t\t\tvar nVertexUniforms = _gl.getParameter( _gl.MAX_VERTEX_UNIFORM_VECTORS );\n\
\t\t\tvar nVertexMatrices = Math.floor( ( nVertexUniforms - 20 ) / 4 );\n\
\n\
\t\t\tvar maxBones = nVertexMatrices;\n\
\n\
\t\t\tif ( object !== undefined && object instanceof THREE.SkinnedMesh ) {\n\
\n\
\t\t\t\tmaxBones = Math.min( object.bones.length, maxBones );\n\
\n\
\t\t\t\tif ( maxBones < object.bones.length ) {\n\
\n\
\t\t\t\t\tconsole.warn( \"WebGLRenderer: too many bones - \" + object.bones.length + \", this GPU supports just \" + maxBones + \" (try OpenGL instead of ANGLE)\" );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t\treturn maxBones;\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tfunction allocateLights ( lights ) {\n\
\n\
\t\tvar l, ll, light, dirLights, pointLights, spotLights, hemiLights, maxDirLights, maxPointLights, maxSpotLights, maxHemiLights;\n\
\n\
\t\tdirLights = pointLights = spotLights = hemiLights = maxDirLights = maxPointLights = maxSpotLights = maxHemiLights = 0;\n\
\n\
\t\tfor ( l = 0, ll = lights.length; l < ll; l ++ ) {\n\
\n\
\t\t\tlight = lights[ l ];\n\
\n\
\t\t\tif ( light.onlyShadow ) continue;\n\
\n\
\t\t\tif ( light instanceof THREE.DirectionalLight ) dirLights ++;\n\
\t\t\tif ( light instanceof THREE.PointLight ) pointLights ++;\n\
\t\t\tif ( light instanceof THREE.SpotLight ) spotLights ++;\n\
\t\t\tif ( light instanceof THREE.HemisphereLight ) hemiLights ++;\n\
\n\
\t\t}\n\
\n\
\t\tif ( ( pointLights + spotLights + dirLights + hemiLights) <= _maxLights ) {\n\
\n\
\t\t\tmaxDirLights = dirLights;\n\
\t\t\tmaxPointLights = pointLights;\n\
\t\t\tmaxSpotLights = spotLights;\n\
\t\t\tmaxHemiLights = hemiLights;\n\
\n\
\t\t} else {\n\
\n\
\t\t\tmaxDirLights = Math.ceil( _maxLights * dirLights / ( pointLights + dirLights ) );\n\
\t\t\tmaxPointLights = _maxLights - maxDirLights;\n\
\n\
\t\t\t// these are not really correct\n\
\n\
\t\t\tmaxSpotLights = maxPointLights;\n\
\t\t\tmaxHemiLights = maxDirLights;\n\
\n\
\t\t}\n\
\n\
\t\treturn { 'directional' : maxDirLights, 'point' : maxPointLights, 'spot': maxSpotLights, 'hemi': maxHemiLights };\n\
\n\
\t};\n\
\n\
\tfunction allocateShadows ( lights ) {\n\
\n\
\t\tvar l, ll, light, maxShadows = 0;\n\
\n\
\t\tfor ( l = 0, ll = lights.length; l < ll; l++ ) {\n\
\n\
\t\t\tlight = lights[ l ];\n\
\n\
\t\t\tif ( ! light.castShadow ) continue;\n\
\n\
\t\t\tif ( light instanceof THREE.SpotLight ) maxShadows ++;\n\
\t\t\tif ( light instanceof THREE.DirectionalLight && ! light.shadowCascade ) maxShadows ++;\n\
\n\
\t\t}\n\
\n\
\t\treturn maxShadows;\n\
\n\
\t};\n\
\n\
\t// Initialization\n\
\n\
\tfunction initGL () {\n\
\n\
\t\ttry {\n\
\n\
\t\t\tif ( ! ( _gl = _canvas.getContext( 'experimental-webgl', { alpha: _alpha, premultipliedAlpha: _premultipliedAlpha, antialias: _antialias, stencil: _stencil, preserveDrawingBuffer: _preserveDrawingBuffer } ) ) ) {\n\
\n\
\t\t\t\tthrow 'Error creating WebGL context.';\n\
\n\
\t\t\t}\n\
\n\
\t\t} catch ( error ) {\n\
\n\
\t\t\tconsole.error( error );\n\
\n\
\t\t}\n\
\n\
\t\t_glExtensionTextureFloat = _gl.getExtension( 'OES_texture_float' );\n\
\t\t_glExtensionStandardDerivatives = _gl.getExtension( 'OES_standard_derivatives' );\n\
\n\
\t\t_glExtensionTextureFilterAnisotropic = _gl.getExtension( 'EXT_texture_filter_anisotropic' ) ||\n\
\t\t\t\t\t\t\t\t\t\t\t   _gl.getExtension( 'MOZ_EXT_texture_filter_anisotropic' ) ||\n\
\t\t\t\t\t\t\t\t\t\t\t   _gl.getExtension( 'WEBKIT_EXT_texture_filter_anisotropic' );\n\
\n\
\n\
\t\t_glExtensionCompressedTextureS3TC = _gl.getExtension( 'WEBGL_compressed_texture_s3tc' ) ||\n\
\t\t\t\t\t\t\t\t\t\t\t_gl.getExtension( 'MOZ_WEBGL_compressed_texture_s3tc' ) ||\n\
\t\t\t\t\t\t\t\t\t\t\t_gl.getExtension( 'WEBKIT_WEBGL_compressed_texture_s3tc' );\n\
\n\
\t\tif ( ! _glExtensionTextureFloat ) {\n\
\n\
\t\t\tconsole.log( 'THREE.WebGLRenderer: Float textures not supported.' );\n\
\n\
\t\t}\n\
\n\
\t\tif ( ! _glExtensionStandardDerivatives ) {\n\
\n\
\t\t\tconsole.log( 'THREE.WebGLRenderer: Standard derivatives not supported.' );\n\
\n\
\t\t}\n\
\n\
\t\tif ( ! _glExtensionTextureFilterAnisotropic ) {\n\
\n\
\t\t\tconsole.log( 'THREE.WebGLRenderer: Anisotropic texture filtering not supported.' );\n\
\n\
\t\t}\n\
\n\
\t\tif ( ! _glExtensionCompressedTextureS3TC ) {\n\
\n\
\t\t\tconsole.log( 'THREE.WebGLRenderer: S3TC compressed textures not supported.' );\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tfunction setDefaultGLState () {\n\
\n\
\t\t_gl.clearColor( 0, 0, 0, 1 );\n\
\t\t_gl.clearDepth( 1 );\n\
\t\t_gl.clearStencil( 0 );\n\
\n\
\t\t_gl.enable( _gl.DEPTH_TEST );\n\
\t\t_gl.depthFunc( _gl.LEQUAL );\n\
\n\
\t\t_gl.frontFace( _gl.CCW );\n\
\t\t_gl.cullFace( _gl.BACK );\n\
\t\t_gl.enable( _gl.CULL_FACE );\n\
\n\
\t\t_gl.enable( _gl.BLEND );\n\
\t\t_gl.blendEquation( _gl.FUNC_ADD );\n\
\t\t_gl.blendFunc( _gl.SRC_ALPHA, _gl.ONE_MINUS_SRC_ALPHA );\n\
\n\
\t\t_gl.clearColor( _clearColor.r, _clearColor.g, _clearColor.b, _clearAlpha );\n\
\n\
\t};\n\
\n\
\t// default plugins (order is important)\n\
\n\
\tthis.shadowMapPlugin = new THREE.ShadowMapPlugin();\n\
\tthis.addPrePlugin( this.shadowMapPlugin );\n\
\n\
\tthis.addPostPlugin( new THREE.SpritePlugin() );\n\
\tthis.addPostPlugin( new THREE.LensFlarePlugin() );\n\
\n\
};\n\
/**\n\
 * @author szimek / https://github.com/szimek/\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.WebGLRenderTarget = function ( width, height, options ) {\n\
\n\
\tthis.width = width;\n\
\tthis.height = height;\n\
\n\
\toptions = options || {};\n\
\n\
\tthis.wrapS = options.wrapS !== undefined ? options.wrapS : THREE.ClampToEdgeWrapping;\n\
\tthis.wrapT = options.wrapT !== undefined ? options.wrapT : THREE.ClampToEdgeWrapping;\n\
\n\
\tthis.magFilter = options.magFilter !== undefined ? options.magFilter : THREE.LinearFilter;\n\
\tthis.minFilter = options.minFilter !== undefined ? options.minFilter : THREE.LinearMipMapLinearFilter;\n\
\n\
\tthis.anisotropy = options.anisotropy !== undefined ? options.anisotropy : 1;\n\
\n\
\tthis.offset = new THREE.Vector2( 0, 0 );\n\
\tthis.repeat = new THREE.Vector2( 1, 1 );\n\
\n\
\tthis.format = options.format !== undefined ? options.format : THREE.RGBAFormat;\n\
\tthis.type = options.type !== undefined ? options.type : THREE.UnsignedByteType;\n\
\n\
\tthis.depthBuffer = options.depthBuffer !== undefined ? options.depthBuffer : true;\n\
\tthis.stencilBuffer = options.stencilBuffer !== undefined ? options.stencilBuffer : true;\n\
\n\
\tthis.generateMipmaps = true;\n\
\n\
};\n\
\n\
THREE.WebGLRenderTarget.prototype.clone = function() {\n\
\n\
\tvar tmp = new THREE.WebGLRenderTarget( this.width, this.height );\n\
\n\
\ttmp.wrapS = this.wrapS;\n\
\ttmp.wrapT = this.wrapT;\n\
\n\
\ttmp.magFilter = this.magFilter;\n\
\ttmp.anisotropy = this.anisotropy;\n\
\n\
\ttmp.minFilter = this.minFilter;\n\
\n\
\ttmp.offset.copy( this.offset );\n\
\ttmp.repeat.copy( this.repeat );\n\
\n\
\ttmp.format = this.format;\n\
\ttmp.type = this.type;\n\
\n\
\ttmp.depthBuffer = this.depthBuffer;\n\
\ttmp.stencilBuffer = this.stencilBuffer;\n\
\n\
\ttmp.generateMipmaps = this.generateMipmaps;\n\
\n\
\treturn tmp;\n\
\n\
};\n\
/**\n\
 * @author alteredq / http://alteredqualia.com\n\
 */\n\
\n\
THREE.WebGLRenderTargetCube = function ( width, height, options ) {\n\
\n\
\tTHREE.WebGLRenderTarget.call( this, width, height, options );\n\
\n\
\tthis.activeCubeFace = 0; // PX 0, NX 1, PY 2, NY 3, PZ 4, NZ 5\n\
\n\
};\n\
\n\
THREE.WebGLRenderTargetCube.prototype = Object.create( THREE.WebGLRenderTarget.prototype );\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 */\n\
\n\
THREE.RenderableVertex = function () {\n\
\n\
\tthis.positionWorld = new THREE.Vector3();\n\
\tthis.positionScreen = new THREE.Vector4();\n\
\n\
\tthis.visible = true;\n\
\n\
};\n\
\n\
THREE.RenderableVertex.prototype.copy = function ( vertex ) {\n\
\n\
\tthis.positionWorld.copy( vertex.positionWorld );\n\
\tthis.positionScreen.copy( vertex.positionScreen );\n\
\n\
}\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 */\n\
\n\
THREE.RenderableFace3 = function () {\n\
\n\
\tthis.v1 = new THREE.RenderableVertex();\n\
\tthis.v2 = new THREE.RenderableVertex();\n\
\tthis.v3 = new THREE.RenderableVertex();\n\
\n\
\tthis.centroidWorld = new THREE.Vector3();\n\
\tthis.centroidScreen = new THREE.Vector3();\n\
\n\
\tthis.normalWorld = new THREE.Vector3();\n\
\tthis.vertexNormalsWorld = [ new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3() ];\n\
\tthis.vertexNormalsLength = 0;\n\
\n\
\tthis.material = null;\n\
\tthis.uvs = [[]];\n\
\n\
\tthis.z = null;\n\
\n\
};\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 */\n\
\n\
THREE.RenderableFace4 = function () {\n\
\n\
\tthis.v1 = new THREE.RenderableVertex();\n\
\tthis.v2 = new THREE.RenderableVertex();\n\
\tthis.v3 = new THREE.RenderableVertex();\n\
\tthis.v4 = new THREE.RenderableVertex();\n\
\n\
\tthis.centroidWorld = new THREE.Vector3();\n\
\tthis.centroidScreen = new THREE.Vector3();\n\
\n\
\tthis.normalWorld = new THREE.Vector3();\n\
\tthis.vertexNormalsWorld = [ new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3() ];\n\
\tthis.vertexNormalsLength = 0;\n\
\n\
\tthis.material = null;\n\
\tthis.uvs = [[]];\n\
\n\
\tthis.z = null;\n\
\n\
};\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 */\n\
\n\
THREE.RenderableObject = function () {\n\
\n\
\tthis.object = null;\n\
\tthis.z = null;\n\
\n\
};\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 */\n\
\n\
THREE.RenderableParticle = function () {\n\
\n\
\tthis.object = null;\n\
\n\
\tthis.x = null;\n\
\tthis.y = null;\n\
\tthis.z = null;\n\
\n\
\tthis.rotation = null;\n\
\tthis.scale = new THREE.Vector2();\n\
\n\
\tthis.material = null;\n\
\n\
};\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 */\n\
\n\
THREE.RenderableLine = function () {\n\
\n\
\tthis.z = null;\n\
\n\
\tthis.v1 = new THREE.RenderableVertex();\n\
\tthis.v2 = new THREE.RenderableVertex();\n\
\n\
\tthis.material = null;\n\
\n\
};\n\
/**\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.ColorUtils = {\n\
\n\
\tadjustHSV : function ( color, h, s, v ) {\n\
\n\
\t\tvar hsv = THREE.ColorUtils.__hsv;\n\
\n\
\t\tTHREE.ColorUtils.rgbToHsv( color, hsv );\n\
\n\
\t\thsv.h = THREE.Math.clamp( hsv.h + h, 0, 1 );\n\
\t\thsv.s = THREE.Math.clamp( hsv.s + s, 0, 1 );\n\
\t\thsv.v = THREE.Math.clamp( hsv.v + v, 0, 1 );\n\
\n\
\t\tcolor.setHSV( hsv.h, hsv.s, hsv.v );\n\
\n\
\t},\n\
\n\
\t// based on MochiKit implementation by Bob Ippolito\n\
\n\
\trgbToHsv : function ( color, hsv ) {\n\
\n\
\t\tvar r = color.r;\n\
\t\tvar g = color.g;\n\
\t\tvar b = color.b;\n\
\n\
\t\tvar max = Math.max( Math.max( r, g ), b );\n\
\t\tvar min = Math.min( Math.min( r, g ), b );\n\
\n\
\t\tvar hue;\n\
\t\tvar saturation;\n\
\t\tvar value = max;\n\
\n\
\t\tif ( min === max )\t{\n\
\n\
\t\t\thue = 0;\n\
\t\t\tsaturation = 0;\n\
\n\
\t\t} else {\n\
\n\
\t\t\tvar delta = ( max - min );\n\
\t\t\tsaturation = delta / max;\n\
\n\
\t\t\tif ( r === max ) {\n\
\n\
\t\t\t\thue = ( g - b ) / delta;\n\
\n\
\t\t\t} else if ( g === max ) {\n\
\n\
\t\t\t\thue = 2 + ( ( b - r ) / delta );\n\
\n\
\t\t\t} else\t{\n\
\n\
\t\t\t\thue = 4 + ( ( r - g ) / delta );\n\
\t\t\t}\n\
\n\
\t\t\thue /= 6;\n\
\n\
\t\t\tif ( hue < 0 ) {\n\
\n\
\t\t\t\thue += 1;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( hue > 1 ) {\n\
\n\
\t\t\t\thue -= 1;\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tif ( hsv === undefined ) {\n\
\n\
\t\t\thsv = { h: 0, s: 0, v: 0 };\n\
\n\
\t\t}\n\
\n\
\t\thsv.h = hue;\n\
\t\thsv.s = saturation;\n\
\t\thsv.v = value;\n\
\n\
\t\treturn hsv;\n\
\n\
\t}\n\
\n\
};\n\
\n\
THREE.ColorUtils.__hsv = { h: 0, s: 0, v: 0 };/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.GeometryUtils = {\n\
\n\
\t// Merge two geometries or geometry and geometry from object (using object's transform)\n\
\n\
\tmerge: function ( geometry1, object2 /* mesh | geometry */ ) {\n\
\n\
\t\tvar matrix, matrixRotation,\n\
\t\tvertexOffset = geometry1.vertices.length,\n\
\t\tuvPosition = geometry1.faceVertexUvs[ 0 ].length,\n\
\t\tgeometry2 = object2 instanceof THREE.Mesh ? object2.geometry : object2,\n\
\t\tvertices1 = geometry1.vertices,\n\
\t\tvertices2 = geometry2.vertices,\n\
\t\tfaces1 = geometry1.faces,\n\
\t\tfaces2 = geometry2.faces,\n\
\t\tuvs1 = geometry1.faceVertexUvs[ 0 ],\n\
\t\tuvs2 = geometry2.faceVertexUvs[ 0 ];\n\
\n\
\t\tvar geo1MaterialsMap = {};\n\
\n\
\t\tfor ( var i = 0; i < geometry1.materials.length; i ++ ) {\n\
\n\
\t\t\tvar id = geometry1.materials[ i ].id;\n\
\n\
\t\t\tgeo1MaterialsMap[ id ] = i;\n\
\n\
\t\t}\n\
\n\
\t\tif ( object2 instanceof THREE.Mesh ) {\n\
\n\
\t\t\tobject2.matrixAutoUpdate && object2.updateMatrix();\n\
\n\
\t\t\tmatrix = object2.matrix;\n\
\t\t\tmatrixRotation = new THREE.Matrix4();\n\
\t\t\tmatrixRotation.extractRotation( matrix, object2.scale );\n\
\n\
\t\t}\n\
\n\
\t\t// vertices\n\
\n\
\t\tfor ( var i = 0, il = vertices2.length; i < il; i ++ ) {\n\
\n\
\t\t\tvar vertex = vertices2[ i ];\n\
\n\
\t\t\tvar vertexCopy = vertex.clone();\n\
\n\
\t\t\tif ( matrix ) matrix.multiplyVector3( vertexCopy );\n\
\n\
\t\t\tvertices1.push( vertexCopy );\n\
\n\
\t\t}\n\
\n\
\t\t// faces\n\
\n\
\t\tfor ( i = 0, il = faces2.length; i < il; i ++ ) {\n\
\n\
\t\t\tvar face = faces2[ i ], faceCopy, normal, color,\n\
\t\t\tfaceVertexNormals = face.vertexNormals,\n\
\t\t\tfaceVertexColors = face.vertexColors;\n\
\n\
\t\t\tif ( face instanceof THREE.Face3 ) {\n\
\n\
\t\t\t\tfaceCopy = new THREE.Face3( face.a + vertexOffset, face.b + vertexOffset, face.c + vertexOffset );\n\
\n\
\t\t\t} else if ( face instanceof THREE.Face4 ) {\n\
\n\
\t\t\t\tfaceCopy = new THREE.Face4( face.a + vertexOffset, face.b + vertexOffset, face.c + vertexOffset, face.d + vertexOffset );\n\
\n\
\t\t\t}\n\
\n\
\t\t\tfaceCopy.normal.copy( face.normal );\n\
\n\
\t\t\tif ( matrixRotation ) matrixRotation.multiplyVector3( faceCopy.normal );\n\
\n\
\t\t\tfor ( var j = 0, jl = faceVertexNormals.length; j < jl; j ++ ) {\n\
\n\
\t\t\t\tnormal = faceVertexNormals[ j ].clone();\n\
\n\
\t\t\t\tif ( matrixRotation ) matrixRotation.multiplyVector3( normal );\n\
\n\
\t\t\t\tfaceCopy.vertexNormals.push( normal );\n\
\n\
\t\t\t}\n\
\n\
\t\t\tfaceCopy.color.copy( face.color );\n\
\n\
\t\t\tfor ( var j = 0, jl = faceVertexColors.length; j < jl; j ++ ) {\n\
\n\
\t\t\t\tcolor = faceVertexColors[ j ];\n\
\t\t\t\tfaceCopy.vertexColors.push( color.clone() );\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( face.materialIndex !== undefined ) {\n\
\n\
\t\t\t\tvar material2 = geometry2.materials[ face.materialIndex ];\n\
\t\t\t\tvar materialId2 = material2.id;\n\
\n\
\t\t\t\tvar materialIndex = geo1MaterialsMap[ materialId2 ];\n\
\n\
\t\t\t\tif ( materialIndex === undefined ) {\n\
\n\
\t\t\t\t\tmaterialIndex = geometry1.materials.length;\n\
\t\t\t\t\tgeo1MaterialsMap[ materialId2 ] = materialIndex;\n\
\n\
\t\t\t\t\tgeometry1.materials.push( material2 );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tfaceCopy.materialIndex = materialIndex;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tfaceCopy.centroid.copy( face.centroid );\n\
\t\t\tif ( matrix ) matrix.multiplyVector3( faceCopy.centroid );\n\
\n\
\t\t\tfaces1.push( faceCopy );\n\
\n\
\t\t}\n\
\n\
\t\t// uvs\n\
\n\
\t\tfor ( i = 0, il = uvs2.length; i < il; i ++ ) {\n\
\n\
\t\t\tvar uv = uvs2[ i ], uvCopy = [];\n\
\n\
\t\t\tfor ( var j = 0, jl = uv.length; j < jl; j ++ ) {\n\
\n\
\t\t\t\tuvCopy.push( new THREE.UV( uv[ j ].u, uv[ j ].v ) );\n\
\n\
\t\t\t}\n\
\n\
\t\t\tuvs1.push( uvCopy );\n\
\n\
\t\t}\n\
\n\
\t},\n\
\n\
\tclone: function ( geometry ) {\n\
\n\
\t\tvar cloneGeo = new THREE.Geometry();\n\
\n\
\t\tvar i, il;\n\
\n\
\t\tvar vertices = geometry.vertices,\n\
\t\t\tfaces = geometry.faces,\n\
\t\t\tuvs = geometry.faceVertexUvs[ 0 ];\n\
\n\
\t\t// materials\n\
\n\
\t\tif ( geometry.materials ) {\n\
\n\
\t\t\tcloneGeo.materials = geometry.materials.slice();\n\
\n\
\t\t}\n\
\n\
\t\t// vertices\n\
\n\
\t\tfor ( i = 0, il = vertices.length; i < il; i ++ ) {\n\
\n\
\t\t\tvar vertex = vertices[ i ];\n\
\n\
\t\t\tcloneGeo.vertices.push( vertex.clone() );\n\
\n\
\t\t}\n\
\n\
\t\t// faces\n\
\n\
\t\tfor ( i = 0, il = faces.length; i < il; i ++ ) {\n\
\n\
\t\t\tvar face = faces[ i ];\n\
\n\
\t\t\tcloneGeo.faces.push( face.clone() );\n\
\n\
\t\t}\n\
\n\
\t\t// uvs\n\
\n\
\t\tfor ( i = 0, il = uvs.length; i < il; i ++ ) {\n\
\n\
\t\t\tvar uv = uvs[ i ], uvCopy = [];\n\
\n\
\t\t\tfor ( var j = 0, jl = uv.length; j < jl; j ++ ) {\n\
\n\
\t\t\t\tuvCopy.push( new THREE.UV( uv[ j ].u, uv[ j ].v ) );\n\
\n\
\t\t\t}\n\
\n\
\t\t\tcloneGeo.faceVertexUvs[ 0 ].push( uvCopy );\n\
\n\
\t\t}\n\
\n\
\t\treturn cloneGeo;\n\
\n\
\t},\n\
\n\
\t// Get random point in triangle (via barycentric coordinates)\n\
\t// \t(uniform distribution)\n\
\t// \thttp://www.cgafaq.info/wiki/Random_Point_In_Triangle\n\
\n\
\trandomPointInTriangle: function ( vectorA, vectorB, vectorC ) {\n\
\n\
\t\tvar a, b, c,\n\
\t\t\tpoint = new THREE.Vector3(),\n\
\t\t\ttmp = THREE.GeometryUtils.__v1;\n\
\n\
\t\ta = THREE.GeometryUtils.random();\n\
\t\tb = THREE.GeometryUtils.random();\n\
\n\
\t\tif ( ( a + b ) > 1 ) {\n\
\n\
\t\t\ta = 1 - a;\n\
\t\t\tb = 1 - b;\n\
\n\
\t\t}\n\
\n\
\t\tc = 1 - a - b;\n\
\n\
\t\tpoint.copy( vectorA );\n\
\t\tpoint.multiplyScalar( a );\n\
\n\
\t\ttmp.copy( vectorB );\n\
\t\ttmp.multiplyScalar( b );\n\
\n\
\t\tpoint.addSelf( tmp );\n\
\n\
\t\ttmp.copy( vectorC );\n\
\t\ttmp.multiplyScalar( c );\n\
\n\
\t\tpoint.addSelf( tmp );\n\
\n\
\t\treturn point;\n\
\n\
\t},\n\
\n\
\t// Get random point in face (triangle / quad)\n\
\t// (uniform distribution)\n\
\n\
\trandomPointInFace: function ( face, geometry, useCachedAreas ) {\n\
\n\
\t\tvar vA, vB, vC, vD;\n\
\n\
\t\tif ( face instanceof THREE.Face3 ) {\n\
\n\
\t\t\tvA = geometry.vertices[ face.a ];\n\
\t\t\tvB = geometry.vertices[ face.b ];\n\
\t\t\tvC = geometry.vertices[ face.c ];\n\
\n\
\t\t\treturn THREE.GeometryUtils.randomPointInTriangle( vA, vB, vC );\n\
\n\
\t\t} else if ( face instanceof THREE.Face4 ) {\n\
\n\
\t\t\tvA = geometry.vertices[ face.a ];\n\
\t\t\tvB = geometry.vertices[ face.b ];\n\
\t\t\tvC = geometry.vertices[ face.c ];\n\
\t\t\tvD = geometry.vertices[ face.d ];\n\
\n\
\t\t\tvar area1, area2;\n\
\n\
\t\t\tif ( useCachedAreas ) {\n\
\n\
\t\t\t\tif ( face._area1 && face._area2 ) {\n\
\n\
\t\t\t\t\tarea1 = face._area1;\n\
\t\t\t\t\tarea2 = face._area2;\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\tarea1 = THREE.GeometryUtils.triangleArea( vA, vB, vD );\n\
\t\t\t\t\tarea2 = THREE.GeometryUtils.triangleArea( vB, vC, vD );\n\
\n\
\t\t\t\t\tface._area1 = area1;\n\
\t\t\t\t\tface._area2 = area2;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tarea1 = THREE.GeometryUtils.triangleArea( vA, vB, vD ),\n\
\t\t\t\tarea2 = THREE.GeometryUtils.triangleArea( vB, vC, vD );\n\
\n\
\t\t\t}\n\
\n\
\t\t\tvar r = THREE.GeometryUtils.random() * ( area1 + area2 );\n\
\n\
\t\t\tif ( r < area1 ) {\n\
\n\
\t\t\t\treturn THREE.GeometryUtils.randomPointInTriangle( vA, vB, vD );\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\treturn THREE.GeometryUtils.randomPointInTriangle( vB, vC, vD );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t},\n\
\n\
\t// Get uniformly distributed random points in mesh\n\
\t// \t- create array with cumulative sums of face areas\n\
\t//  - pick random number from 0 to total area\n\
\t//  - find corresponding place in area array by binary search\n\
\t//\t- get random point in face\n\
\n\
\trandomPointsInGeometry: function ( geometry, n ) {\n\
\n\
\t\tvar face, i,\n\
\t\t\tfaces = geometry.faces,\n\
\t\t\tvertices = geometry.vertices,\n\
\t\t\til = faces.length,\n\
\t\t\ttotalArea = 0,\n\
\t\t\tcumulativeAreas = [],\n\
\t\t\tvA, vB, vC, vD;\n\
\n\
\t\t// precompute face areas\n\
\n\
\t\tfor ( i = 0; i < il; i ++ ) {\n\
\n\
\t\t\tface = faces[ i ];\n\
\n\
\t\t\tif ( face instanceof THREE.Face3 ) {\n\
\n\
\t\t\t\tvA = vertices[ face.a ];\n\
\t\t\t\tvB = vertices[ face.b ];\n\
\t\t\t\tvC = vertices[ face.c ];\n\
\n\
\t\t\t\tface._area = THREE.GeometryUtils.triangleArea( vA, vB, vC );\n\
\n\
\t\t\t} else if ( face instanceof THREE.Face4 ) {\n\
\n\
\t\t\t\tvA = vertices[ face.a ];\n\
\t\t\t\tvB = vertices[ face.b ];\n\
\t\t\t\tvC = vertices[ face.c ];\n\
\t\t\t\tvD = vertices[ face.d ];\n\
\n\
\t\t\t\tface._area1 = THREE.GeometryUtils.triangleArea( vA, vB, vD );\n\
\t\t\t\tface._area2 = THREE.GeometryUtils.triangleArea( vB, vC, vD );\n\
\n\
\t\t\t\tface._area = face._area1 + face._area2;\n\
\n\
\t\t\t}\n\
\n\
\t\t\ttotalArea += face._area;\n\
\n\
\t\t\tcumulativeAreas[ i ] = totalArea;\n\
\n\
\t\t}\n\
\n\
\t\t// binary search cumulative areas array\n\
\n\
\t\tfunction binarySearchIndices( value ) {\n\
\n\
\t\t\tfunction binarySearch( start, end ) {\n\
\n\
\t\t\t\t// return closest larger index\n\
\t\t\t\t// if exact number is not found\n\
\n\
\t\t\t\tif ( end < start )\n\
\t\t\t\t\treturn start;\n\
\n\
\t\t\t\tvar mid = start + Math.floor( ( end - start ) / 2 );\n\
\n\
\t\t\t\tif ( cumulativeAreas[ mid ] > value ) {\n\
\n\
\t\t\t\t\treturn binarySearch( start, mid - 1 );\n\
\n\
\t\t\t\t} else if ( cumulativeAreas[ mid ] < value ) {\n\
\n\
\t\t\t\t\treturn binarySearch( mid + 1, end );\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\treturn mid;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t\tvar result = binarySearch( 0, cumulativeAreas.length - 1 )\n\
\t\t\treturn result;\n\
\n\
\t\t}\n\
\n\
\t\t// pick random face weighted by face area\n\
\n\
\t\tvar r, index,\n\
\t\t\tresult = [];\n\
\n\
\t\tvar stats = {};\n\
\n\
\t\tfor ( i = 0; i < n; i ++ ) {\n\
\n\
\t\t\tr = THREE.GeometryUtils.random() * totalArea;\n\
\n\
\t\t\tindex = binarySearchIndices( r );\n\
\n\
\t\t\tresult[ i ] = THREE.GeometryUtils.randomPointInFace( faces[ index ], geometry, true );\n\
\n\
\t\t\tif ( ! stats[ index ] ) {\n\
\n\
\t\t\t\tstats[ index ] = 1;\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tstats[ index ] += 1;\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\treturn result;\n\
\n\
\t},\n\
\n\
\t// Get triangle area (by Heron's formula)\n\
\t// \thttp://en.wikipedia.org/wiki/Heron%27s_formula\n\
\n\
\ttriangleArea: function ( vectorA, vectorB, vectorC ) {\n\
\n\
\t\tvar s, a, b, c,\n\
\t\t\ttmp = THREE.GeometryUtils.__v1;\n\
\n\
\t\ttmp.sub( vectorA, vectorB );\n\
\t\ta = tmp.length();\n\
\n\
\t\ttmp.sub( vectorA, vectorC );\n\
\t\tb = tmp.length();\n\
\n\
\t\ttmp.sub( vectorB, vectorC );\n\
\t\tc = tmp.length();\n\
\n\
\t\ts = 0.5 * ( a + b + c );\n\
\n\
\t\treturn Math.sqrt( s * ( s - a ) * ( s - b ) * ( s - c ) );\n\
\n\
\t},\n\
\n\
\t// Center geometry so that 0,0,0 is in center of bounding box\n\
\n\
\tcenter: function ( geometry ) {\n\
\n\
\t\tgeometry.computeBoundingBox();\n\
\n\
\t\tvar bb = geometry.boundingBox;\n\
\n\
\t\tvar offset = new THREE.Vector3();\n\
\n\
\t\toffset.add( bb.min, bb.max );\n\
\t\toffset.multiplyScalar( -0.5 );\n\
\n\
\t\tgeometry.applyMatrix( new THREE.Matrix4().makeTranslation( offset.x, offset.y, offset.z ) );\n\
\t\tgeometry.computeBoundingBox();\n\
\n\
\t\treturn offset;\n\
\n\
\t},\n\
\n\
\t// Normalize UVs to be from <0,1>\n\
\t// (for now just the first set of UVs)\n\
\n\
\tnormalizeUVs: function ( geometry ) {\n\
\n\
\t\tvar uvSet = geometry.faceVertexUvs[ 0 ];\n\
\n\
\t\tfor ( var i = 0, il = uvSet.length; i < il; i ++ ) {\n\
\n\
\t\t\tvar uvs = uvSet[ i ];\n\
\n\
\t\t\tfor ( var j = 0, jl = uvs.length; j < jl; j ++ ) {\n\
\n\
\t\t\t\t// texture repeat\n\
\n\
\t\t\t\tif( uvs[ j ].u !== 1.0 ) uvs[ j ].u = uvs[ j ].u - Math.floor( uvs[ j ].u );\n\
\t\t\t\tif( uvs[ j ].v !== 1.0 ) uvs[ j ].v = uvs[ j ].v - Math.floor( uvs[ j ].v );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t},\n\
\n\
\ttriangulateQuads: function ( geometry ) {\n\
\n\
\t\tvar i, il, j, jl;\n\
\n\
\t\tvar faces = [];\n\
\t\tvar faceUvs = [];\n\
\t\tvar faceVertexUvs = [];\n\
\n\
\t\tfor ( i = 0, il = geometry.faceUvs.length; i < il; i ++ ) {\n\
\n\
\t\t\tfaceUvs[ i ] = [];\n\
\n\
\t\t}\n\
\n\
\t\tfor ( i = 0, il = geometry.faceVertexUvs.length; i < il; i ++ ) {\n\
\n\
\t\t\tfaceVertexUvs[ i ] = [];\n\
\n\
\t\t}\n\
\n\
\t\tfor ( i = 0, il = geometry.faces.length; i < il; i ++ ) {\n\
\n\
\t\t\tvar face = geometry.faces[ i ];\n\
\n\
\t\t\tif ( face instanceof THREE.Face4 ) {\n\
\n\
\t\t\t\tvar a = face.a;\n\
\t\t\t\tvar b = face.b;\n\
\t\t\t\tvar c = face.c;\n\
\t\t\t\tvar d = face.d;\n\
\n\
\t\t\t\tvar triA = new THREE.Face3();\n\
\t\t\t\tvar triB = new THREE.Face3();\n\
\n\
\t\t\t\ttriA.color.copy( face.color );\n\
\t\t\t\ttriB.color.copy( face.color );\n\
\n\
\t\t\t\ttriA.materialIndex = face.materialIndex;\n\
\t\t\t\ttriB.materialIndex = face.materialIndex;\n\
\n\
\t\t\t\ttriA.a = a;\n\
\t\t\t\ttriA.b = b;\n\
\t\t\t\ttriA.c = d;\n\
\n\
\t\t\t\ttriB.a = b;\n\
\t\t\t\ttriB.b = c;\n\
\t\t\t\ttriB.c = d;\n\
\n\
\t\t\t\tif ( face.vertexColors.length === 4 ) {\n\
\n\
\t\t\t\t\ttriA.vertexColors[ 0 ] = face.vertexColors[ 0 ].clone();\n\
\t\t\t\t\ttriA.vertexColors[ 1 ] = face.vertexColors[ 1 ].clone();\n\
\t\t\t\t\ttriA.vertexColors[ 2 ] = face.vertexColors[ 3 ].clone();\n\
\n\
\t\t\t\t\ttriB.vertexColors[ 0 ] = face.vertexColors[ 1 ].clone();\n\
\t\t\t\t\ttriB.vertexColors[ 1 ] = face.vertexColors[ 2 ].clone();\n\
\t\t\t\t\ttriB.vertexColors[ 2 ] = face.vertexColors[ 3 ].clone();\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tfaces.push( triA, triB );\n\
\n\
\t\t\t\tfor ( j = 0, jl = geometry.faceVertexUvs.length; j < jl; j ++ ) {\n\
\n\
\t\t\t\t\tif ( geometry.faceVertexUvs[ j ].length ) {\n\
\n\
\t\t\t\t\t\tvar uvs = geometry.faceVertexUvs[ j ][ i ];\n\
\n\
\t\t\t\t\t\tvar uvA = uvs[ 0 ];\n\
\t\t\t\t\t\tvar uvB = uvs[ 1 ];\n\
\t\t\t\t\t\tvar uvC = uvs[ 2 ];\n\
\t\t\t\t\t\tvar uvD = uvs[ 3 ];\n\
\n\
\t\t\t\t\t\tvar uvsTriA = [ uvA.clone(), uvB.clone(), uvD.clone() ];\n\
\t\t\t\t\t\tvar uvsTriB = [ uvB.clone(), uvC.clone(), uvD.clone() ];\n\
\n\
\t\t\t\t\t\tfaceVertexUvs[ j ].push( uvsTriA, uvsTriB );\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tfor ( j = 0, jl = geometry.faceUvs.length; j < jl; j ++ ) {\n\
\n\
\t\t\t\t\tif ( geometry.faceUvs[ j ].length ) {\n\
\n\
\t\t\t\t\t\tvar faceUv = geometry.faceUvs[ j ][ i ];\n\
\n\
\t\t\t\t\t\tfaceUvs[ j ].push( faceUv, faceUv );\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tfaces.push( face );\n\
\n\
\t\t\t\tfor ( j = 0, jl = geometry.faceUvs.length; j < jl; j ++ ) {\n\
\n\
\t\t\t\t\tfaceUvs[ j ].push( geometry.faceUvs[ j ][ i ] );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tfor ( j = 0, jl = geometry.faceVertexUvs.length; j < jl; j ++ ) {\n\
\n\
\t\t\t\t\tfaceVertexUvs[ j ].push( geometry.faceVertexUvs[ j ][ i ] );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tgeometry.faces = faces;\n\
\t\tgeometry.faceUvs = faceUvs;\n\
\t\tgeometry.faceVertexUvs = faceVertexUvs;\n\
\n\
\t\tgeometry.computeCentroids();\n\
\t\tgeometry.computeFaceNormals();\n\
\t\tgeometry.computeVertexNormals();\n\
\n\
\t\tif ( geometry.hasTangents ) geometry.computeTangents();\n\
\n\
\t},\n\
\n\
\t// Make all faces use unique vertices\n\
\t// so that each face can be separated from others\n\
\n\
\texplode: function( geometry ) {\n\
\n\
\t\tvar vertices = [];\n\
\n\
\t\tfor ( var i = 0, il = geometry.faces.length; i < il; i ++ ) {\n\
\n\
\t\t\tvar n = vertices.length;\n\
\n\
\t\t\tvar face = geometry.faces[ i ];\n\
\n\
\t\t\tif ( face instanceof THREE.Face4 ) {\n\
\n\
\t\t\t\tvar a = face.a;\n\
\t\t\t\tvar b = face.b;\n\
\t\t\t\tvar c = face.c;\n\
\t\t\t\tvar d = face.d;\n\
\n\
\t\t\t\tvar va = geometry.vertices[ a ];\n\
\t\t\t\tvar vb = geometry.vertices[ b ];\n\
\t\t\t\tvar vc = geometry.vertices[ c ];\n\
\t\t\t\tvar vd = geometry.vertices[ d ];\n\
\n\
\t\t\t\tvertices.push( va.clone() );\n\
\t\t\t\tvertices.push( vb.clone() );\n\
\t\t\t\tvertices.push( vc.clone() );\n\
\t\t\t\tvertices.push( vd.clone() );\n\
\n\
\t\t\t\tface.a = n;\n\
\t\t\t\tface.b = n + 1;\n\
\t\t\t\tface.c = n + 2;\n\
\t\t\t\tface.d = n + 3;\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tvar a = face.a;\n\
\t\t\t\tvar b = face.b;\n\
\t\t\t\tvar c = face.c;\n\
\n\
\t\t\t\tvar va = geometry.vertices[ a ];\n\
\t\t\t\tvar vb = geometry.vertices[ b ];\n\
\t\t\t\tvar vc = geometry.vertices[ c ];\n\
\n\
\t\t\t\tvertices.push( va.clone() );\n\
\t\t\t\tvertices.push( vb.clone() );\n\
\t\t\t\tvertices.push( vc.clone() );\n\
\n\
\t\t\t\tface.a = n;\n\
\t\t\t\tface.b = n + 1;\n\
\t\t\t\tface.c = n + 2;\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tgeometry.vertices = vertices;\n\
\t\tdelete geometry.__tmpVertices;\n\
\n\
\t},\n\
\n\
\t// Break faces with edges longer than maxEdgeLength\n\
\t// - not recursive\n\
\n\
\ttessellate: function ( geometry, maxEdgeLength ) {\n\
\n\
\t\tvar i, il, face,\n\
\t\ta, b, c, d,\n\
\t\tva, vb, vc, vd,\n\
\t\tdab, dbc, dac, dcd, dad,\n\
\t\tm, m1, m2,\n\
\t\tvm, vm1, vm2,\n\
\t\tvnm, vnm1, vnm2,\n\
\t\tvcm, vcm1, vcm2,\n\
\t\ttriA, triB,\n\
\t\tquadA, quadB,\n\
\t\tedge;\n\
\n\
\t\tvar faces = [];\n\
\t\tvar faceVertexUvs = [];\n\
\n\
\t\tfor ( i = 0, il = geometry.faceVertexUvs.length; i < il; i ++ ) {\n\
\n\
\t\t\tfaceVertexUvs[ i ] = [];\n\
\n\
\t\t}\n\
\n\
\t\tfor ( i = 0, il = geometry.faces.length; i < il; i ++ ) {\n\
\n\
\t\t\tface = geometry.faces[ i ];\n\
\n\
\t\t\tif ( face instanceof THREE.Face3 ) {\n\
\n\
\t\t\t\ta = face.a;\n\
\t\t\t\tb = face.b;\n\
\t\t\t\tc = face.c;\n\
\n\
\t\t\t\tva = geometry.vertices[ a ];\n\
\t\t\t\tvb = geometry.vertices[ b ];\n\
\t\t\t\tvc = geometry.vertices[ c ];\n\
\n\
\t\t\t\tdab = va.distanceTo( vb );\n\
\t\t\t\tdbc = vb.distanceTo( vc );\n\
\t\t\t\tdac = va.distanceTo( vc );\n\
\n\
\t\t\t\tif ( dab > maxEdgeLength || dbc > maxEdgeLength || dac > maxEdgeLength ) {\n\
\n\
\t\t\t\t\tm = geometry.vertices.length;\n\
\n\
\t\t\t\t\ttriA = face.clone();\n\
\t\t\t\t\ttriB = face.clone();\n\
\n\
\t\t\t\t\tif ( dab >= dbc && dab >= dac ) {\n\
\n\
\t\t\t\t\t\tvm = va.clone();\n\
\t\t\t\t\t\tvm.lerpSelf( vb, 0.5 );\n\
\n\
\t\t\t\t\t\ttriA.a = a;\n\
\t\t\t\t\t\ttriA.b = m;\n\
\t\t\t\t\t\ttriA.c = c;\n\
\n\
\t\t\t\t\t\ttriB.a = m;\n\
\t\t\t\t\t\ttriB.b = b;\n\
\t\t\t\t\t\ttriB.c = c;\n\
\n\
\t\t\t\t\t\tif ( face.vertexNormals.length === 3 ) {\n\
\n\
\t\t\t\t\t\t\tvnm = face.vertexNormals[ 0 ].clone();\n\
\t\t\t\t\t\t\tvnm.lerpSelf( face.vertexNormals[ 1 ], 0.5 );\n\
\n\
\t\t\t\t\t\t\ttriA.vertexNormals[ 1 ].copy( vnm );\n\
\t\t\t\t\t\t\ttriB.vertexNormals[ 0 ].copy( vnm );\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\tif ( face.vertexColors.length === 3 ) {\n\
\n\
\t\t\t\t\t\t\tvcm = face.vertexColors[ 0 ].clone();\n\
\t\t\t\t\t\t\tvcm.lerpSelf( face.vertexColors[ 1 ], 0.5 );\n\
\n\
\t\t\t\t\t\t\ttriA.vertexColors[ 1 ].copy( vcm );\n\
\t\t\t\t\t\t\ttriB.vertexColors[ 0 ].copy( vcm );\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\tedge = 0;\n\
\n\
\t\t\t\t\t} else if ( dbc >= dab && dbc >= dac ) {\n\
\n\
\t\t\t\t\t\tvm = vb.clone();\n\
\t\t\t\t\t\tvm.lerpSelf( vc, 0.5 );\n\
\n\
\t\t\t\t\t\ttriA.a = a;\n\
\t\t\t\t\t\ttriA.b = b;\n\
\t\t\t\t\t\ttriA.c = m;\n\
\n\
\t\t\t\t\t\ttriB.a = m;\n\
\t\t\t\t\t\ttriB.b = c;\n\
\t\t\t\t\t\ttriB.c = a;\n\
\n\
\t\t\t\t\t\tif ( face.vertexNormals.length === 3 ) {\n\
\n\
\t\t\t\t\t\t\tvnm = face.vertexNormals[ 1 ].clone();\n\
\t\t\t\t\t\t\tvnm.lerpSelf( face.vertexNormals[ 2 ], 0.5 );\n\
\n\
\t\t\t\t\t\t\ttriA.vertexNormals[ 2 ].copy( vnm );\n\
\n\
\t\t\t\t\t\t\ttriB.vertexNormals[ 0 ].copy( vnm );\n\
\t\t\t\t\t\t\ttriB.vertexNormals[ 1 ].copy( face.vertexNormals[ 2 ] );\n\
\t\t\t\t\t\t\ttriB.vertexNormals[ 2 ].copy( face.vertexNormals[ 0 ] );\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\tif ( face.vertexColors.length === 3 ) {\n\
\n\
\t\t\t\t\t\t\tvcm = face.vertexColors[ 1 ].clone();\n\
\t\t\t\t\t\t\tvcm.lerpSelf( face.vertexColors[ 2 ], 0.5 );\n\
\n\
\t\t\t\t\t\t\ttriA.vertexColors[ 2 ].copy( vcm );\n\
\n\
\t\t\t\t\t\t\ttriB.vertexColors[ 0 ].copy( vcm );\n\
\t\t\t\t\t\t\ttriB.vertexColors[ 1 ].copy( face.vertexColors[ 2 ] );\n\
\t\t\t\t\t\t\ttriB.vertexColors[ 2 ].copy( face.vertexColors[ 0 ] );\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\tedge = 1;\n\
\n\
\t\t\t\t\t} else {\n\
\n\
\t\t\t\t\t\tvm = va.clone();\n\
\t\t\t\t\t\tvm.lerpSelf( vc, 0.5 );\n\
\n\
\t\t\t\t\t\ttriA.a = a;\n\
\t\t\t\t\t\ttriA.b = b;\n\
\t\t\t\t\t\ttriA.c = m;\n\
\n\
\t\t\t\t\t\ttriB.a = m;\n\
\t\t\t\t\t\ttriB.b = b;\n\
\t\t\t\t\t\ttriB.c = c;\n\
\n\
\t\t\t\t\t\tif ( face.vertexNormals.length === 3 ) {\n\
\n\
\t\t\t\t\t\t\tvnm = face.vertexNormals[ 0 ].clone();\n\
\t\t\t\t\t\t\tvnm.lerpSelf( face.vertexNormals[ 2 ], 0.5 );\n\
\n\
\t\t\t\t\t\t\ttriA.vertexNormals[ 2 ].copy( vnm );\n\
\t\t\t\t\t\t\ttriB.vertexNormals[ 0 ].copy( vnm );\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\tif ( face.vertexColors.length === 3 ) {\n\
\n\
\t\t\t\t\t\t\tvcm = face.vertexColors[ 0 ].clone();\n\
\t\t\t\t\t\t\tvcm.lerpSelf( face.vertexColors[ 2 ], 0.5 );\n\
\n\
\t\t\t\t\t\t\ttriA.vertexColors[ 2 ].copy( vcm );\n\
\t\t\t\t\t\t\ttriB.vertexColors[ 0 ].copy( vcm );\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\tedge = 2;\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\tfaces.push( triA, triB );\n\
\t\t\t\t\tgeometry.vertices.push( vm );\n\
\n\
\t\t\t\t\tvar j, jl, uvs, uvA, uvB, uvC, uvM, uvsTriA, uvsTriB;\n\
\n\
\t\t\t\t\tfor ( j = 0, jl = geometry.faceVertexUvs.length; j < jl; j ++ ) {\n\
\n\
\t\t\t\t\t\tif ( geometry.faceVertexUvs[ j ].length ) {\n\
\n\
\t\t\t\t\t\t\tuvs = geometry.faceVertexUvs[ j ][ i ];\n\
\n\
\t\t\t\t\t\t\tuvA = uvs[ 0 ];\n\
\t\t\t\t\t\t\tuvB = uvs[ 1 ];\n\
\t\t\t\t\t\t\tuvC = uvs[ 2 ];\n\
\n\
\t\t\t\t\t\t\t// AB\n\
\n\
\t\t\t\t\t\t\tif ( edge === 0 ) {\n\
\n\
\t\t\t\t\t\t\t\tuvM = uvA.clone();\n\
\t\t\t\t\t\t\t\tuvM.lerpSelf( uvB, 0.5 );\n\
\n\
\t\t\t\t\t\t\t\tuvsTriA = [ uvA.clone(), uvM.clone(), uvC.clone() ];\n\
\t\t\t\t\t\t\t\tuvsTriB = [ uvM.clone(), uvB.clone(), uvC.clone() ];\n\
\n\
\t\t\t\t\t\t\t// BC\n\
\n\
\t\t\t\t\t\t\t} else if ( edge === 1 ) {\n\
\n\
\t\t\t\t\t\t\t\tuvM = uvB.clone();\n\
\t\t\t\t\t\t\t\tuvM.lerpSelf( uvC, 0.5 );\n\
\n\
\t\t\t\t\t\t\t\tuvsTriA = [ uvA.clone(), uvB.clone(), uvM.clone() ];\n\
\t\t\t\t\t\t\t\tuvsTriB = [ uvM.clone(), uvC.clone(), uvA.clone() ];\n\
\n\
\t\t\t\t\t\t\t// AC\n\
\n\
\t\t\t\t\t\t\t} else {\n\
\n\
\t\t\t\t\t\t\t\tuvM = uvA.clone();\n\
\t\t\t\t\t\t\t\tuvM.lerpSelf( uvC, 0.5 );\n\
\n\
\t\t\t\t\t\t\t\tuvsTriA = [ uvA.clone(), uvB.clone(), uvM.clone() ];\n\
\t\t\t\t\t\t\t\tuvsTriB = [ uvM.clone(), uvB.clone(), uvC.clone() ];\n\
\n\
\t\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\t\tfaceVertexUvs[ j ].push( uvsTriA, uvsTriB );\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\tfaces.push( face );\n\
\n\
\t\t\t\t\tfor ( j = 0, jl = geometry.faceVertexUvs.length; j < jl; j ++ ) {\n\
\n\
\t\t\t\t\t\tfaceVertexUvs[ j ].push( geometry.faceVertexUvs[ j ][ i ] );\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\ta = face.a;\n\
\t\t\t\tb = face.b;\n\
\t\t\t\tc = face.c;\n\
\t\t\t\td = face.d;\n\
\n\
\t\t\t\tva = geometry.vertices[ a ];\n\
\t\t\t\tvb = geometry.vertices[ b ];\n\
\t\t\t\tvc = geometry.vertices[ c ];\n\
\t\t\t\tvd = geometry.vertices[ d ];\n\
\n\
\t\t\t\tdab = va.distanceTo( vb );\n\
\t\t\t\tdbc = vb.distanceTo( vc );\n\
\t\t\t\tdcd = vc.distanceTo( vd );\n\
\t\t\t\tdad = va.distanceTo( vd );\n\
\n\
\t\t\t\tif ( dab > maxEdgeLength || dbc > maxEdgeLength || dcd > maxEdgeLength || dad > maxEdgeLength ) {\n\
\n\
\t\t\t\t\tm1 = geometry.vertices.length;\n\
\t\t\t\t\tm2 = geometry.vertices.length + 1;\n\
\n\
\t\t\t\t\tquadA = face.clone();\n\
\t\t\t\t\tquadB = face.clone();\n\
\n\
\t\t\t\t\tif ( ( dab >= dbc && dab >= dcd && dab >= dad ) || ( dcd >= dbc && dcd >= dab && dcd >= dad ) ) {\n\
\n\
\t\t\t\t\t\tvm1 = va.clone();\n\
\t\t\t\t\t\tvm1.lerpSelf( vb, 0.5 );\n\
\n\
\t\t\t\t\t\tvm2 = vc.clone();\n\
\t\t\t\t\t\tvm2.lerpSelf( vd, 0.5 );\n\
\n\
\t\t\t\t\t\tquadA.a = a;\n\
\t\t\t\t\t\tquadA.b = m1;\n\
\t\t\t\t\t\tquadA.c = m2;\n\
\t\t\t\t\t\tquadA.d = d;\n\
\n\
\t\t\t\t\t\tquadB.a = m1;\n\
\t\t\t\t\t\tquadB.b = b;\n\
\t\t\t\t\t\tquadB.c = c;\n\
\t\t\t\t\t\tquadB.d = m2;\n\
\n\
\t\t\t\t\t\tif ( face.vertexNormals.length === 4 ) {\n\
\n\
\t\t\t\t\t\t\tvnm1 = face.vertexNormals[ 0 ].clone();\n\
\t\t\t\t\t\t\tvnm1.lerpSelf( face.vertexNormals[ 1 ], 0.5 );\n\
\n\
\t\t\t\t\t\t\tvnm2 = face.vertexNormals[ 2 ].clone();\n\
\t\t\t\t\t\t\tvnm2.lerpSelf( face.vertexNormals[ 3 ], 0.5 );\n\
\n\
\t\t\t\t\t\t\tquadA.vertexNormals[ 1 ].copy( vnm1 );\n\
\t\t\t\t\t\t\tquadA.vertexNormals[ 2 ].copy( vnm2 );\n\
\n\
\t\t\t\t\t\t\tquadB.vertexNormals[ 0 ].copy( vnm1 );\n\
\t\t\t\t\t\t\tquadB.vertexNormals[ 3 ].copy( vnm2 );\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\tif ( face.vertexColors.length === 4 ) {\n\
\n\
\t\t\t\t\t\t\tvcm1 = face.vertexColors[ 0 ].clone();\n\
\t\t\t\t\t\t\tvcm1.lerpSelf( face.vertexColors[ 1 ], 0.5 );\n\
\n\
\t\t\t\t\t\t\tvcm2 = face.vertexColors[ 2 ].clone();\n\
\t\t\t\t\t\t\tvcm2.lerpSelf( face.vertexColors[ 3 ], 0.5 );\n\
\n\
\t\t\t\t\t\t\tquadA.vertexColors[ 1 ].copy( vcm1 );\n\
\t\t\t\t\t\t\tquadA.vertexColors[ 2 ].copy( vcm2 );\n\
\n\
\t\t\t\t\t\t\tquadB.vertexColors[ 0 ].copy( vcm1 );\n\
\t\t\t\t\t\t\tquadB.vertexColors[ 3 ].copy( vcm2 );\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\tedge = 0;\n\
\n\
\t\t\t\t\t} else {\n\
\n\
\t\t\t\t\t\tvm1 = vb.clone();\n\
\t\t\t\t\t\tvm1.lerpSelf( vc, 0.5 );\n\
\n\
\t\t\t\t\t\tvm2 = vd.clone();\n\
\t\t\t\t\t\tvm2.lerpSelf( va, 0.5 );\n\
\n\
\t\t\t\t\t\tquadA.a = a;\n\
\t\t\t\t\t\tquadA.b = b;\n\
\t\t\t\t\t\tquadA.c = m1;\n\
\t\t\t\t\t\tquadA.d = m2;\n\
\n\
\t\t\t\t\t\tquadB.a = m2;\n\
\t\t\t\t\t\tquadB.b = m1;\n\
\t\t\t\t\t\tquadB.c = c;\n\
\t\t\t\t\t\tquadB.d = d;\n\
\n\
\t\t\t\t\t\tif ( face.vertexNormals.length === 4 ) {\n\
\n\
\t\t\t\t\t\t\tvnm1 = face.vertexNormals[ 1 ].clone();\n\
\t\t\t\t\t\t\tvnm1.lerpSelf( face.vertexNormals[ 2 ], 0.5 );\n\
\n\
\t\t\t\t\t\t\tvnm2 = face.vertexNormals[ 3 ].clone();\n\
\t\t\t\t\t\t\tvnm2.lerpSelf( face.vertexNormals[ 0 ], 0.5 );\n\
\n\
\t\t\t\t\t\t\tquadA.vertexNormals[ 2 ].copy( vnm1 );\n\
\t\t\t\t\t\t\tquadA.vertexNormals[ 3 ].copy( vnm2 );\n\
\n\
\t\t\t\t\t\t\tquadB.vertexNormals[ 0 ].copy( vnm2 );\n\
\t\t\t\t\t\t\tquadB.vertexNormals[ 1 ].copy( vnm1 );\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\tif ( face.vertexColors.length === 4 ) {\n\
\n\
\t\t\t\t\t\t\tvcm1 = face.vertexColors[ 1 ].clone();\n\
\t\t\t\t\t\t\tvcm1.lerpSelf( face.vertexColors[ 2 ], 0.5 );\n\
\n\
\t\t\t\t\t\t\tvcm2 = face.vertexColors[ 3 ].clone();\n\
\t\t\t\t\t\t\tvcm2.lerpSelf( face.vertexColors[ 0 ], 0.5 );\n\
\n\
\t\t\t\t\t\t\tquadA.vertexColors[ 2 ].copy( vcm1 );\n\
\t\t\t\t\t\t\tquadA.vertexColors[ 3 ].copy( vcm2 );\n\
\n\
\t\t\t\t\t\t\tquadB.vertexColors[ 0 ].copy( vcm2 );\n\
\t\t\t\t\t\t\tquadB.vertexColors[ 1 ].copy( vcm1 );\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\tedge = 1;\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\tfaces.push( quadA, quadB );\n\
\t\t\t\t\tgeometry.vertices.push( vm1, vm2 );\n\
\n\
\t\t\t\t\tvar j, jl, uvs, uvA, uvB, uvC, uvD, uvM1, uvM2, uvsQuadA, uvsQuadB;\n\
\n\
\t\t\t\t\tfor ( j = 0, jl = geometry.faceVertexUvs.length; j < jl; j ++ ) {\n\
\n\
\t\t\t\t\t\tif ( geometry.faceVertexUvs[ j ].length ) {\n\
\n\
\t\t\t\t\t\t\tuvs = geometry.faceVertexUvs[ j ][ i ];\n\
\n\
\t\t\t\t\t\t\tuvA = uvs[ 0 ];\n\
\t\t\t\t\t\t\tuvB = uvs[ 1 ];\n\
\t\t\t\t\t\t\tuvC = uvs[ 2 ];\n\
\t\t\t\t\t\t\tuvD = uvs[ 3 ];\n\
\n\
\t\t\t\t\t\t\t// AB + CD\n\
\n\
\t\t\t\t\t\t\tif ( edge === 0 ) {\n\
\n\
\t\t\t\t\t\t\t\tuvM1 = uvA.clone();\n\
\t\t\t\t\t\t\t\tuvM1.lerpSelf( uvB, 0.5 );\n\
\n\
\t\t\t\t\t\t\t\tuvM2 = uvC.clone();\n\
\t\t\t\t\t\t\t\tuvM2.lerpSelf( uvD, 0.5 );\n\
\n\
\t\t\t\t\t\t\t\tuvsQuadA = [ uvA.clone(), uvM1.clone(), uvM2.clone(), uvD.clone() ];\n\
\t\t\t\t\t\t\t\tuvsQuadB = [ uvM1.clone(), uvB.clone(), uvC.clone(), uvM2.clone() ];\n\
\n\
\t\t\t\t\t\t\t// BC + AD\n\
\n\
\t\t\t\t\t\t\t} else {\n\
\n\
\t\t\t\t\t\t\t\tuvM1 = uvB.clone();\n\
\t\t\t\t\t\t\t\tuvM1.lerpSelf( uvC, 0.5 );\n\
\n\
\t\t\t\t\t\t\t\tuvM2 = uvD.clone();\n\
\t\t\t\t\t\t\t\tuvM2.lerpSelf( uvA, 0.5 );\n\
\n\
\t\t\t\t\t\t\t\tuvsQuadA = [ uvA.clone(), uvB.clone(), uvM1.clone(), uvM2.clone() ];\n\
\t\t\t\t\t\t\t\tuvsQuadB = [ uvM2.clone(), uvM1.clone(), uvC.clone(), uvD.clone() ];\n\
\n\
\t\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\t\tfaceVertexUvs[ j ].push( uvsQuadA, uvsQuadB );\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\tfaces.push( face );\n\
\n\
\t\t\t\t\tfor ( j = 0, jl = geometry.faceVertexUvs.length; j < jl; j ++ ) {\n\
\n\
\t\t\t\t\t\tfaceVertexUvs[ j ].push( geometry.faceVertexUvs[ j ][ i ] );\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tgeometry.faces = faces;\n\
\t\tgeometry.faceVertexUvs = faceVertexUvs;\n\
\n\
\t}\n\
\n\
};\n\
\n\
THREE.GeometryUtils.random = THREE.Math.random16;\n\
\n\
THREE.GeometryUtils.__v1 = new THREE.Vector3();\n\
/**\n\
 * @author alteredq / http://alteredqualia.com/\n\
 * @author mrdoob / http://mrdoob.com/\n\
 */\n\
\n\
THREE.ImageUtils = {\n\
\n\
\tcrossOrigin: 'anonymous',\n\
\n\
\tloadTexture: function ( url, mapping, onLoad, onError ) {\n\
\n\
\t\tvar image = new Image();\n\
\t\tvar texture = new THREE.Texture( image, mapping );\n\
\n\
\t\tvar loader = new THREE.ImageLoader();\n\
\n\
\t\tloader.addEventListener( 'load', function ( event ) {\n\
\n\
\t\t\ttexture.image = event.content;\n\
\t\t\ttexture.needsUpdate = true;\n\
\n\
\t\t\tif ( onLoad ) onLoad( texture );\n\
\n\
\t\t} );\n\
\n\
\t\tloader.addEventListener( 'error', function ( event ) {\n\
\n\
\t\t\tif ( onError ) onError( event.message );\n\
\n\
\t\t} );\n\
\n\
\t\tloader.crossOrigin = this.crossOrigin;\n\
\t\tloader.load( url, image );\n\
\n\
\t\treturn texture;\n\
\n\
\t},\n\
\n\
\tloadCompressedTexture: function ( url, mapping, onLoad, onError ) {\n\
\n\
\t\tvar texture = new THREE.CompressedTexture();\n\
\t\ttexture.mapping = mapping;\n\
\n\
\t\tvar request = new XMLHttpRequest();\n\
\n\
\t\trequest.onload = function () {\n\
\n\
\t\t\tvar buffer = request.response;\n\
\t\t\tvar dds = THREE.ImageUtils.parseDDS( buffer, true );\n\
\n\
\t\t\ttexture.format = dds.format;\n\
\n\
\t\t\ttexture.mipmaps = dds.mipmaps;\n\
\t\t\ttexture.image.width = dds.width;\n\
\t\t\ttexture.image.height = dds.height;\n\
\n\
\t\t\t// gl.generateMipmap fails for compressed textures\n\
\t\t\t// mipmaps must be embedded in the DDS file\n\
\t\t\t// or texture filters must not use mipmapping\n\
\n\
\t\t\ttexture.generateMipmaps = false;\n\
\n\
\t\t\ttexture.needsUpdate = true;\n\
\n\
\t\t\tif ( onLoad ) onLoad( texture );\n\
\n\
\t\t}\n\
\n\
\t\trequest.onerror = onError;\n\
\n\
\t\trequest.open( 'GET', url, true );\n\
\t\trequest.responseType = \"arraybuffer\";\n\
\t\trequest.send( null );\n\
\n\
\t\treturn texture;\n\
\n\
\t},\n\
\n\
\tloadTextureCube: function ( array, mapping, onLoad, onError ) {\n\
\n\
\t\tvar images = [];\n\
\t\timages.loadCount = 0;\n\
\n\
\t\tvar texture = new THREE.Texture();\n\
\t\ttexture.image = images;\n\
\t\tif ( mapping !== undefined ) texture.mapping = mapping;\n\
\n\
\t\t// no flipping needed for cube textures\n\
\n\
\t\ttexture.flipY = false;\n\
\n\
\t\tfor ( var i = 0, il = array.length; i < il; ++ i ) {\n\
\n\
\t\t\tvar cubeImage = new Image();\n\
\t\t\timages[ i ] = cubeImage;\n\
\n\
\t\t\tcubeImage.onload = function () {\n\
\n\
\t\t\t\timages.loadCount += 1;\n\
\n\
\t\t\t\tif ( images.loadCount === 6 ) {\n\
\n\
\t\t\t\t\ttexture.needsUpdate = true;\n\
\t\t\t\t\tif ( onLoad ) onLoad();\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t};\n\
\n\
\t\t\tcubeImage.onerror = onError;\n\
\n\
\t\t\tcubeImage.crossOrigin = this.crossOrigin;\n\
\t\t\tcubeImage.src = array[ i ];\n\
\n\
\t\t}\n\
\n\
\t\treturn texture;\n\
\n\
\t},\n\
\n\
\tloadCompressedTextureCube: function ( array, mapping, onLoad, onError ) {\n\
\n\
\t\tvar images = [];\n\
\t\timages.loadCount = 0;\n\
\n\
\t\tvar texture = new THREE.CompressedTexture();\n\
\t\ttexture.image = images;\n\
\t\tif ( mapping !== undefined ) texture.mapping = mapping;\n\
\n\
\t\t// no flipping for cube textures\n\
\t\t// (also flipping doesn't work for compressed textures )\n\
\n\
\t\ttexture.flipY = false;\n\
\n\
\t\t// can't generate mipmaps for compressed textures\n\
\t\t// mips must be embedded in DDS files\n\
\n\
\t\ttexture.generateMipmaps = false;\n\
\n\
\t\tvar generateCubeFaceCallback = function ( rq, img ) {\n\
\n\
\t\t\treturn function () {\n\
\n\
\t\t\t\tvar buffer = rq.response;\n\
\t\t\t\tvar dds = THREE.ImageUtils.parseDDS( buffer, true );\n\
\n\
\t\t\t\timg.format = dds.format;\n\
\n\
\t\t\t\timg.mipmaps = dds.mipmaps;\n\
\t\t\t\timg.width = dds.width;\n\
\t\t\t\timg.height = dds.height;\n\
\n\
\t\t\t\timages.loadCount += 1;\n\
\n\
\t\t\t\tif ( images.loadCount === 6 ) {\n\
\n\
\t\t\t\t\ttexture.format = dds.format;\n\
\t\t\t\t\ttexture.needsUpdate = true;\n\
\t\t\t\t\tif ( onLoad ) onLoad();\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tfor ( var i = 0, il = array.length; i < il; ++ i ) {\n\
\n\
\t\t\tvar cubeImage = {};\n\
\t\t\timages[ i ] = cubeImage;\n\
\n\
\t\t\tvar request = new XMLHttpRequest();\n\
\n\
\t\t\trequest.onload = generateCubeFaceCallback( request, cubeImage );\n\
\t\t\trequest.onerror = onError;\n\
\n\
\t\t\tvar url = array[ i ];\n\
\n\
\t\t\trequest.open( 'GET', url, true );\n\
\t\t\trequest.responseType = \"arraybuffer\";\n\
\t\t\trequest.send( null );\n\
\n\
\t\t}\n\
\n\
\t\treturn texture;\n\
\n\
\t},\n\
\n\
\tparseDDS: function ( buffer, loadMipmaps ) {\n\
\n\
\t\tvar dds = { mipmaps: [], width: 0, height: 0, format: null, mipmapCount: 1 };\n\
\n\
\t\t// Adapted from @toji's DDS utils\n\
\t\t//\thttps://github.com/toji/webgl-texture-utils/blob/master/texture-util/dds.js\n\
\n\
\t\t// All values and structures referenced from:\n\
\t\t// http://msdn.microsoft.com/en-us/library/bb943991.aspx/\n\
\n\
\t\tvar DDS_MAGIC = 0x20534444;\n\
\n\
\t\tvar DDSD_CAPS = 0x1,\n\
\t\t\tDDSD_HEIGHT = 0x2,\n\
\t\t\tDDSD_WIDTH = 0x4,\n\
\t\t\tDDSD_PITCH = 0x8,\n\
\t\t\tDDSD_PIXELFORMAT = 0x1000,\n\
\t\t\tDDSD_MIPMAPCOUNT = 0x20000,\n\
\t\t\tDDSD_LINEARSIZE = 0x80000,\n\
\t\t\tDDSD_DEPTH = 0x800000;\n\
\n\
\t\tvar DDSCAPS_COMPLEX = 0x8,\n\
\t\t\tDDSCAPS_MIPMAP = 0x400000,\n\
\t\t\tDDSCAPS_TEXTURE = 0x1000;\n\
\n\
\t\tvar DDSCAPS2_CUBEMAP = 0x200,\n\
\t\t\tDDSCAPS2_CUBEMAP_POSITIVEX = 0x400,\n\
\t\t\tDDSCAPS2_CUBEMAP_NEGATIVEX = 0x800,\n\
\t\t\tDDSCAPS2_CUBEMAP_POSITIVEY = 0x1000,\n\
\t\t\tDDSCAPS2_CUBEMAP_NEGATIVEY = 0x2000,\n\
\t\t\tDDSCAPS2_CUBEMAP_POSITIVEZ = 0x4000,\n\
\t\t\tDDSCAPS2_CUBEMAP_NEGATIVEZ = 0x8000,\n\
\t\t\tDDSCAPS2_VOLUME = 0x200000;\n\
\n\
\t\tvar DDPF_ALPHAPIXELS = 0x1,\n\
\t\t\tDDPF_ALPHA = 0x2,\n\
\t\t\tDDPF_FOURCC = 0x4,\n\
\t\t\tDDPF_RGB = 0x40,\n\
\t\t\tDDPF_YUV = 0x200,\n\
\t\t\tDDPF_LUMINANCE = 0x20000;\n\
\n\
\t\tfunction fourCCToInt32( value ) {\n\
\n\
\t\t\treturn value.charCodeAt(0) +\n\
\t\t\t\t(value.charCodeAt(1) << 8) +\n\
\t\t\t\t(value.charCodeAt(2) << 16) +\n\
\t\t\t\t(value.charCodeAt(3) << 24);\n\
\n\
\t\t}\n\
\n\
\t\tfunction int32ToFourCC( value ) {\n\
\n\
\t\t\treturn String.fromCharCode(\n\
\t\t\t\tvalue & 0xff,\n\
\t\t\t\t(value >> 8) & 0xff,\n\
\t\t\t\t(value >> 16) & 0xff,\n\
\t\t\t\t(value >> 24) & 0xff\n\
\t\t\t);\n\
\t\t}\n\
\n\
\t\tvar FOURCC_DXT1 = fourCCToInt32(\"DXT1\");\n\
\t\tvar FOURCC_DXT3 = fourCCToInt32(\"DXT3\");\n\
\t\tvar FOURCC_DXT5 = fourCCToInt32(\"DXT5\");\n\
\n\
\t\tvar headerLengthInt = 31; // The header length in 32 bit ints\n\
\n\
\t\t// Offsets into the header array\n\
\n\
\t\tvar off_magic = 0;\n\
\n\
\t\tvar off_size = 1;\n\
\t\tvar off_flags = 2;\n\
\t\tvar off_height = 3;\n\
\t\tvar off_width = 4;\n\
\n\
\t\tvar off_mipmapCount = 7;\n\
\n\
\t\tvar off_pfFlags = 20;\n\
\t\tvar off_pfFourCC = 21;\n\
\n\
\t\t// Parse header\n\
\n\
\t\tvar header = new Int32Array( buffer, 0, headerLengthInt );\n\
\n\
        if ( header[ off_magic ] !== DDS_MAGIC ) {\n\
\n\
            console.error( \"ImageUtils.parseDDS(): Invalid magic number in DDS header\" );\n\
            return dds;\n\
\n\
        }\n\
\n\
        if ( ! header[ off_pfFlags ] & DDPF_FOURCC ) {\n\
\n\
            console.error( \"ImageUtils.parseDDS(): Unsupported format, must contain a FourCC code\" );\n\
            return dds;\n\
\n\
        }\n\
\n\
\t\tvar blockBytes;\n\
\n\
\t\tvar fourCC = header[ off_pfFourCC ];\n\
\n\
        switch ( fourCC ) {\n\
\n\
\t\t\tcase FOURCC_DXT1:\n\
\n\
\t\t\t\tblockBytes = 8;\n\
                dds.format = THREE.RGB_S3TC_DXT1_Format;\n\
                break;\n\
\n\
            case FOURCC_DXT3:\n\
\n\
                blockBytes = 16;\n\
                dds.format = THREE.RGBA_S3TC_DXT3_Format;\n\
                break;\n\
\n\
            case FOURCC_DXT5:\n\
\n\
                blockBytes = 16;\n\
                dds.format = THREE.RGBA_S3TC_DXT5_Format;\n\
                break;\n\
\n\
            default:\n\
\n\
                console.error( \"ImageUtils.parseDDS(): Unsupported FourCC code: \", int32ToFourCC( fourCC ) );\n\
                return dds;\n\
\n\
        }\n\
\n\
\t\tdds.mipmapCount = 1;\n\
\n\
        if ( header[ off_flags ] & DDSD_MIPMAPCOUNT && loadMipmaps !== false ) {\n\
\n\
            dds.mipmapCount = Math.max( 1, header[ off_mipmapCount ] );\n\
\n\
        }\n\
\n\
        dds.width = header[ off_width ];\n\
        dds.height = header[ off_height ];\n\
\n\
        var dataOffset = header[ off_size ] + 4;\n\
\n\
\t\t// Extract mipmaps buffers\n\
\n\
\t\tvar width = dds.width;\n\
\t\tvar height = dds.height;\n\
\n\
\t\tfor ( var i = 0; i < dds.mipmapCount; i ++ ) {\n\
\n\
\t\t\tvar dataLength = Math.max( 4, width ) / 4 * Math.max( 4, height ) / 4 * blockBytes;\n\
\t\t\tvar byteArray = new Uint8Array( buffer, dataOffset, dataLength );\n\
\n\
\t\t\tvar mipmap = { \"data\": byteArray, \"width\": width, \"height\": height };\n\
\t\t\tdds.mipmaps.push( mipmap );\n\
\n\
\t\t\tdataOffset += dataLength;\n\
\n\
\t\t\twidth = Math.max( width * 0.5, 1 );\n\
\t\t\theight = Math.max( height * 0.5, 1 );\n\
\n\
\t\t}\n\
\n\
\t\treturn dds;\n\
\n\
\t},\n\
\n\
\tgetNormalMap: function ( image, depth ) {\n\
\n\
\t\t// Adapted from http://www.paulbrunt.co.uk/lab/heightnormal/\n\
\n\
\t\tvar cross = function ( a, b ) {\n\
\n\
\t\t\treturn [ a[ 1 ] * b[ 2 ] - a[ 2 ] * b[ 1 ], a[ 2 ] * b[ 0 ] - a[ 0 ] * b[ 2 ], a[ 0 ] * b[ 1 ] - a[ 1 ] * b[ 0 ] ];\n\
\n\
\t\t}\n\
\n\
\t\tvar subtract = function ( a, b ) {\n\
\n\
\t\t\treturn [ a[ 0 ] - b[ 0 ], a[ 1 ] - b[ 1 ], a[ 2 ] - b[ 2 ] ];\n\
\n\
\t\t}\n\
\n\
\t\tvar normalize = function ( a ) {\n\
\n\
\t\t\tvar l = Math.sqrt( a[ 0 ] * a[ 0 ] + a[ 1 ] * a[ 1 ] + a[ 2 ] * a[ 2 ] );\n\
\t\t\treturn [ a[ 0 ] / l, a[ 1 ] / l, a[ 2 ] / l ];\n\
\n\
\t\t}\n\
\n\
\t\tdepth = depth | 1;\n\
\n\
\t\tvar width = image.width;\n\
\t\tvar height = image.height;\n\
\n\
\t\tvar canvas = document.createElement( 'canvas' );\n\
\t\tcanvas.width = width;\n\
\t\tcanvas.height = height;\n\
\n\
\t\tvar context = canvas.getContext( '2d' );\n\
\t\tcontext.drawImage( image, 0, 0 );\n\
\n\
\t\tvar data = context.getImageData( 0, 0, width, height ).data;\n\
\t\tvar imageData = context.createImageData( width, height );\n\
\t\tvar output = imageData.data;\n\
\n\
\t\tfor ( var x = 0; x < width; x ++ ) {\n\
\n\
\t\t\tfor ( var y = 0; y < height; y ++ ) {\n\
\n\
\t\t\t\tvar ly = y - 1 < 0 ? 0 : y - 1;\n\
\t\t\t\tvar uy = y + 1 > height - 1 ? height - 1 : y + 1;\n\
\t\t\t\tvar lx = x - 1 < 0 ? 0 : x - 1;\n\
\t\t\t\tvar ux = x + 1 > width - 1 ? width - 1 : x + 1;\n\
\n\
\t\t\t\tvar points = [];\n\
\t\t\t\tvar origin = [ 0, 0, data[ ( y * width + x ) * 4 ] / 255 * depth ];\n\
\t\t\t\tpoints.push( [ - 1, 0, data[ ( y * width + lx ) * 4 ] / 255 * depth ] );\n\
\t\t\t\tpoints.push( [ - 1, - 1, data[ ( ly * width + lx ) * 4 ] / 255 * depth ] );\n\
\t\t\t\tpoints.push( [ 0, - 1, data[ ( ly * width + x ) * 4 ] / 255 * depth ] );\n\
\t\t\t\tpoints.push( [  1, - 1, data[ ( ly * width + ux ) * 4 ] / 255 * depth ] );\n\
\t\t\t\tpoints.push( [ 1, 0, data[ ( y * width + ux ) * 4 ] / 255 * depth ] );\n\
\t\t\t\tpoints.push( [ 1, 1, data[ ( uy * width + ux ) * 4 ] / 255 * depth ] );\n\
\t\t\t\tpoints.push( [ 0, 1, data[ ( uy * width + x ) * 4 ] / 255 * depth ] );\n\
\t\t\t\tpoints.push( [ - 1, 1, data[ ( uy * width + lx ) * 4 ] / 255 * depth ] );\n\
\n\
\t\t\t\tvar normals = [];\n\
\t\t\t\tvar num_points = points.length;\n\
\n\
\t\t\t\tfor ( var i = 0; i < num_points; i ++ ) {\n\
\n\
\t\t\t\t\tvar v1 = points[ i ];\n\
\t\t\t\t\tvar v2 = points[ ( i + 1 ) % num_points ];\n\
\t\t\t\t\tv1 = subtract( v1, origin );\n\
\t\t\t\t\tv2 = subtract( v2, origin );\n\
\t\t\t\t\tnormals.push( normalize( cross( v1, v2 ) ) );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tvar normal = [ 0, 0, 0 ];\n\
\n\
\t\t\t\tfor ( var i = 0; i < normals.length; i ++ ) {\n\
\n\
\t\t\t\t\tnormal[ 0 ] += normals[ i ][ 0 ];\n\
\t\t\t\t\tnormal[ 1 ] += normals[ i ][ 1 ];\n\
\t\t\t\t\tnormal[ 2 ] += normals[ i ][ 2 ];\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tnormal[ 0 ] /= normals.length;\n\
\t\t\t\tnormal[ 1 ] /= normals.length;\n\
\t\t\t\tnormal[ 2 ] /= normals.length;\n\
\n\
\t\t\t\tvar idx = ( y * width + x ) * 4;\n\
\n\
\t\t\t\toutput[ idx ] = ( ( normal[ 0 ] + 1.0 ) / 2.0 * 255 ) | 0;\n\
\t\t\t\toutput[ idx + 1 ] = ( ( normal[ 1 ] + 1.0 ) / 2.0 * 255 ) | 0;\n\
\t\t\t\toutput[ idx + 2 ] = ( normal[ 2 ] * 255 ) | 0;\n\
\t\t\t\toutput[ idx + 3 ] = 255;\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tcontext.putImageData( imageData, 0, 0 );\n\
\n\
\t\treturn canvas;\n\
\n\
\t},\n\
\n\
\tgenerateDataTexture: function ( width, height, color ) {\n\
\n\
\t\tvar size = width * height;\n\
\t\tvar data = new Uint8Array( 3 * size );\n\
\n\
\t\tvar r = Math.floor( color.r * 255 );\n\
\t\tvar g = Math.floor( color.g * 255 );\n\
\t\tvar b = Math.floor( color.b * 255 );\n\
\n\
\t\tfor ( var i = 0; i < size; i ++ ) {\n\
\n\
\t\t\tdata[ i * 3 ] \t  = r;\n\
\t\t\tdata[ i * 3 + 1 ] = g;\n\
\t\t\tdata[ i * 3 + 2 ] = b;\n\
\n\
\t\t}\n\
\n\
\t\tvar texture = new THREE.DataTexture( data, width, height, THREE.RGBFormat );\n\
\t\ttexture.needsUpdate = true;\n\
\n\
\t\treturn texture;\n\
\n\
\t}\n\
\n\
};\n\
/**\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.SceneUtils = {\n\
\n\
\tshowHierarchy : function ( root, visible ) {\n\
\n\
\t\tTHREE.SceneUtils.traverseHierarchy( root, function( node ) { node.visible = visible; } );\n\
\n\
\t},\n\
\n\
\ttraverseHierarchy : function ( root, callback ) {\n\
\n\
\t\tvar n, i, l = root.children.length;\n\
\n\
\t\tfor ( i = 0; i < l; i ++ ) {\n\
\n\
\t\t\tn = root.children[ i ];\n\
\n\
\t\t\tcallback( n );\n\
\n\
\t\t\tTHREE.SceneUtils.traverseHierarchy( n, callback );\n\
\n\
\t\t}\n\
\n\
\t},\n\
\n\
\tcreateMultiMaterialObject : function ( geometry, materials ) {\n\
\n\
\t\tvar i, il = materials.length,\n\
\t\t\tgroup = new THREE.Object3D();\n\
\n\
\t\tfor ( i = 0; i < il; i ++ ) {\n\
\n\
\t\t\tvar object = new THREE.Mesh( geometry, materials[ i ] );\n\
\t\t\tgroup.add( object );\n\
\n\
\t\t}\n\
\n\
\t\treturn group;\n\
\n\
\t},\n\
\n\
\tcloneObject: function ( source ) {\n\
\n\
\t\tvar object;\n\
\n\
\t\t// subclass specific properties\n\
\t\t// (must process in order from more specific subclasses to more abstract classes)\n\
\n\
\t\tif ( source instanceof THREE.MorphAnimMesh ) {\n\
\n\
\t\t\tobject = new THREE.MorphAnimMesh( source.geometry, source.material );\n\
\n\
\t\t\tobject.duration = source.duration;\n\
\t\t\tobject.mirroredLoop = source.mirroredLoop;\n\
\t\t\tobject.time = source.time;\n\
\n\
\t\t\tobject.lastKeyframe = source.lastKeyframe;\n\
\t\t\tobject.currentKeyframe = source.currentKeyframe;\n\
\n\
\t\t\tobject.direction = source.direction;\n\
\t\t\tobject.directionBackwards = source.directionBackwards;\n\
\n\
\t\t} else if ( source instanceof THREE.SkinnedMesh ) {\n\
\n\
\t\t\tobject = new THREE.SkinnedMesh( source.geometry, source.material, source.useVertexTexture );\n\
\n\
\t\t} else if ( source instanceof THREE.Mesh ) {\n\
\n\
\t\t\tobject = new THREE.Mesh( source.geometry, source.material );\n\
\n\
\t\t} else if ( source instanceof THREE.Line ) {\n\
\n\
\t\t\tobject = new THREE.Line( source.geometry, source.material, source.type );\n\
\n\
\t\t} else if ( source instanceof THREE.Ribbon ) {\n\
\n\
\t\t\tobject = new THREE.Ribbon( source.geometry, source.material );\n\
\n\
\t\t} else if ( source instanceof THREE.ParticleSystem ) {\n\
\n\
\t\t\tobject = new THREE.ParticleSystem( source.geometry, source.material );\n\
\t\t\tobject.sortParticles = source.sortParticles;\n\
\n\
\t\t} else if ( source instanceof THREE.Particle ) {\n\
\n\
\t\t\tobject = new THREE.Particle( source.material );\n\
\n\
\t\t} else if ( source instanceof THREE.Sprite ) {\n\
\n\
\t\t\tobject = new THREE.Sprite( {} );\n\
\n\
\t\t\tobject.color.copy( source.color );\n\
\t\t\tobject.map = source.map;\n\
\t\t\tobject.blending = source.blending;\n\
\n\
\t\t\tobject.useScreenCoordinates = source.useScreenCoordinates;\n\
\t\t\tobject.mergeWith3D = source.mergeWith3D;\n\
\t\t\tobject.affectedByDistance = source.affectedByDistance;\n\
\t\t\tobject.scaleByViewport = source.scaleByViewport;\n\
\t\t\tobject.alignment = source.alignment;\n\
\n\
\t\t\tobject.rotation3d.copy( source.rotation3d );\n\
\t\t\tobject.rotation = source.rotation;\n\
\t\t\tobject.opacity = source.opacity;\n\
\n\
\t\t\tobject.uvOffset.copy( source.uvOffset );\n\
\t\t\tobject.uvScale.copy( source.uvScale);\n\
\n\
\t\t} else if ( source instanceof THREE.LOD ) {\n\
\n\
\t\t\tobject = new THREE.LOD();\n\
\n\
\t\t/*\n\
\t\t} else if ( source instanceof THREE.MarchingCubes ) {\n\
\n\
\t\t\tobject = new THREE.MarchingCubes( source.resolution, source.material );\n\
\t\t\tobject.field.set( source.field );\n\
\t\t\tobject.isolation = source.isolation;\n\
\t\t*/\n\
\n\
\t\t} else if ( source instanceof THREE.Object3D ) {\n\
\n\
\t\t\tobject = new THREE.Object3D();\n\
\n\
\t\t}\n\
\n\
\t\t// base class properties\n\
\n\
\t\tobject.name = source.name;\n\
\n\
\t\tobject.parent = source.parent;\n\
\n\
\t\tobject.up.copy( source.up );\n\
\n\
\t\tobject.position.copy( source.position );\n\
\n\
\t\t// because of Sprite madness\n\
\n\
\t\tif ( object.rotation instanceof THREE.Vector3 )\n\
\t\t\tobject.rotation.copy( source.rotation );\n\
\n\
\t\tobject.eulerOrder = source.eulerOrder;\n\
\n\
\t\tobject.scale.copy( source.scale );\n\
\n\
\t\tobject.dynamic = source.dynamic;\n\
\n\
\t\tobject.renderDepth = source.renderDepth;\n\
\n\
\t\tobject.rotationAutoUpdate = source.rotationAutoUpdate;\n\
\n\
\t\tobject.matrix.copy( source.matrix );\n\
\t\tobject.matrixWorld.copy( source.matrixWorld );\n\
\t\tobject.matrixRotationWorld.copy( source.matrixRotationWorld );\n\
\n\
\t\tobject.matrixAutoUpdate = source.matrixAutoUpdate;\n\
\t\tobject.matrixWorldNeedsUpdate = source.matrixWorldNeedsUpdate;\n\
\n\
\t\tobject.quaternion.copy( source.quaternion );\n\
\t\tobject.useQuaternion = source.useQuaternion;\n\
\n\
\t\tobject.boundRadius = source.boundRadius;\n\
\t\tobject.boundRadiusScale = source.boundRadiusScale;\n\
\n\
\t\tobject.visible = source.visible;\n\
\n\
\t\tobject.castShadow = source.castShadow;\n\
\t\tobject.receiveShadow = source.receiveShadow;\n\
\n\
\t\tobject.frustumCulled = source.frustumCulled;\n\
\n\
\t\t// children\n\
\n\
\t\tfor ( var i = 0; i < source.children.length; i ++ ) {\n\
\n\
\t\t\tvar child = THREE.SceneUtils.cloneObject( source.children[ i ] );\n\
\t\t\tobject.children[ i ] = child;\n\
\n\
\t\t\tchild.parent = object;\n\
\n\
\t\t}\n\
\n\
\t\t// LODs need to be patched separately to use cloned children\n\
\n\
\t\tif ( source instanceof THREE.LOD ) {\n\
\n\
\t\t\tfor ( var i = 0; i < source.LODs.length; i ++ ) {\n\
\n\
\t\t\t\tvar lod = source.LODs[ i ];\n\
\t\t\t\tobject.LODs[ i ] = { visibleAtDistance: lod.visibleAtDistance, object3D: object.children[ i ] };\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\treturn object;\n\
\n\
\t},\n\
\n\
\tdetach : function ( child, parent, scene ) {\n\
\n\
\t\tchild.applyMatrix( parent.matrixWorld );\n\
\t\tparent.remove( child );\n\
\t\tscene.add( child );\n\
\n\
\t},\n\
\n\
\tattach: function ( child, scene, parent ) {\n\
\n\
\t\tvar matrixWorldInverse = new THREE.Matrix4();\n\
\t\tmatrixWorldInverse.getInverse( parent.matrixWorld );\n\
\t\tchild.applyMatrix( matrixWorldInverse );\n\
\n\
\t\tscene.remove( child );\n\
\t\tparent.add( child );\n\
\n\
\t}\n\
\n\
};\n\
/**\n\
 * @author alteredq / http://alteredqualia.com/\n\
 * @author mrdoob / http://mrdoob.com/\n\
 *\n\
 * ShaderUtils currently contains:\n\
 *\n\
 *\tfresnel\n\
 *\tnormal\n\
 * \tcube\n\
 *\n\
 */\n\
\n\
if ( THREE.WebGLRenderer ) {\n\
\n\
THREE.ShaderUtils = {\n\
\n\
\tlib: {\n\
\n\
\t\t/* -------------------------------------------------------------------------\n\
\t\t//\tFresnel shader\n\
\t\t//\t- based on Nvidia Cg tutorial\n\
\t\t ------------------------------------------------------------------------- */\n\
\n\
\t\t'fresnel': {\n\
\n\
\t\t\tuniforms: {\n\
\n\
\t\t\t\t\"mRefractionRatio\": { type: \"f\", value: 1.02 },\n\
\t\t\t\t\"mFresnelBias\": { type: \"f\", value: 0.1 },\n\
\t\t\t\t\"mFresnelPower\": { type: \"f\", value: 2.0 },\n\
\t\t\t\t\"mFresnelScale\": { type: \"f\", value: 1.0 },\n\
\t\t\t\t\"tCube\": { type: \"t\", value: null }\n\
\n\
\t\t\t},\n\
\n\
\t\t\tfragmentShader: [\n\
\n\
\t\t\t\t\"uniform samplerCube tCube;\",\n\
\n\
\t\t\t\t\"varying vec3 vReflect;\",\n\
\t\t\t\t\"varying vec3 vRefract[3];\",\n\
\t\t\t\t\"varying float vReflectionFactor;\",\n\
\n\
\t\t\t\t\"void main() {\",\n\
\n\
\t\t\t\t\t\"vec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\",\n\
\t\t\t\t\t\"vec4 refractedColor = vec4( 1.0, 1.0, 1.0, 1.0 );\",\n\
\n\
\t\t\t\t\t\"refractedColor.r = textureCube( tCube, vec3( -vRefract[0].x, vRefract[0].yz ) ).r;\",\n\
\t\t\t\t\t\"refractedColor.g = textureCube( tCube, vec3( -vRefract[1].x, vRefract[1].yz ) ).g;\",\n\
\t\t\t\t\t\"refractedColor.b = textureCube( tCube, vec3( -vRefract[2].x, vRefract[2].yz ) ).b;\",\n\
\t\t\t\t\t\"refractedColor.a = 1.0;\",\n\
\n\
\t\t\t\t\t\"gl_FragColor = mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );\",\n\
\n\
\t\t\t\t\"}\"\n\
\n\
\t\t\t].join(\"\\n\"),\n\
\n\
\t\t\tvertexShader: [\n\
\n\
\t\t\t\t\"uniform float mRefractionRatio;\",\n\
\t\t\t\t\"uniform float mFresnelBias;\",\n\
\t\t\t\t\"uniform float mFresnelScale;\",\n\
\t\t\t\t\"uniform float mFresnelPower;\",\n\
\n\
\t\t\t\t\"varying vec3 vReflect;\",\n\
\t\t\t\t\"varying vec3 vRefract[3];\",\n\
\t\t\t\t\"varying float vReflectionFactor;\",\n\
\n\
\t\t\t\t\"void main() {\",\n\
\n\
\t\t\t\t\t\"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\",\n\
\t\t\t\t\t\"vec4 mPosition = modelMatrix * vec4( position, 1.0 );\",\n\
\n\
\t\t\t\t\t\"vec3 nWorld = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );\",\n\
\n\
\t\t\t\t\t\"vec3 I = mPosition.xyz - cameraPosition;\",\n\
\n\
\t\t\t\t\t\"vReflect = reflect( I, nWorld );\",\n\
\t\t\t\t\t\"vRefract[0] = refract( normalize( I ), nWorld, mRefractionRatio );\",\n\
\t\t\t\t\t\"vRefract[1] = refract( normalize( I ), nWorld, mRefractionRatio * 0.99 );\",\n\
\t\t\t\t\t\"vRefract[2] = refract( normalize( I ), nWorld, mRefractionRatio * 0.98 );\",\n\
\t\t\t\t\t\"vReflectionFactor = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( I ), nWorld ), mFresnelPower );\",\n\
\n\
\t\t\t\t\t\"gl_Position = projectionMatrix * mvPosition;\",\n\
\n\
\t\t\t\t\"}\"\n\
\n\
\t\t\t].join(\"\\n\")\n\
\n\
\t\t},\n\
\n\
\t\t/* -------------------------------------------------------------------------\n\
\t\t//\tNormal map shader\n\
\t\t//\t\t- Blinn-Phong\n\
\t\t//\t\t- normal + diffuse + specular + AO + displacement + reflection + shadow maps\n\
\t\t//\t\t- point and directional lights (use with \"lights: true\" material option)\n\
\t\t ------------------------------------------------------------------------- */\n\
\n\
\t\t'normal' : {\n\
\n\
\t\t\tuniforms: THREE.UniformsUtils.merge( [\n\
\n\
\t\t\t\tTHREE.UniformsLib[ \"fog\" ],\n\
\t\t\t\tTHREE.UniformsLib[ \"lights\" ],\n\
\t\t\t\tTHREE.UniformsLib[ \"shadowmap\" ],\n\
\n\
\t\t\t\t{\n\
\n\
\t\t\t\t\"enableAO\"\t\t  : { type: \"i\", value: 0 },\n\
\t\t\t\t\"enableDiffuse\"\t  : { type: \"i\", value: 0 },\n\
\t\t\t\t\"enableSpecular\"  : { type: \"i\", value: 0 },\n\
\t\t\t\t\"enableReflection\": { type: \"i\", value: 0 },\n\
\t\t\t\t\"enableDisplacement\": { type: \"i\", value: 0 },\n\
\n\
\t\t\t\t\"tDisplacement\": { type: \"t\", value: null }, // must go first as this is vertex texture\n\
\t\t\t\t\"tDiffuse\"\t   : { type: \"t\", value: null },\n\
\t\t\t\t\"tCube\"\t\t   : { type: \"t\", value: null },\n\
\t\t\t\t\"tNormal\"\t   : { type: \"t\", value: null },\n\
\t\t\t\t\"tSpecular\"\t   : { type: \"t\", value: null },\n\
\t\t\t\t\"tAO\"\t\t   : { type: \"t\", value: null },\n\
\n\
\t\t\t\t\"uNormalScale\": { type: \"v2\", value: new THREE.Vector2( 1, 1 ) },\n\
\n\
\t\t\t\t\"uDisplacementBias\": { type: \"f\", value: 0.0 },\n\
\t\t\t\t\"uDisplacementScale\": { type: \"f\", value: 1.0 },\n\
\n\
\t\t\t\t\"uDiffuseColor\": { type: \"c\", value: new THREE.Color( 0xffffff ) },\n\
\t\t\t\t\"uSpecularColor\": { type: \"c\", value: new THREE.Color( 0x111111 ) },\n\
\t\t\t\t\"uAmbientColor\": { type: \"c\", value: new THREE.Color( 0xffffff ) },\n\
\t\t\t\t\"uShininess\": { type: \"f\", value: 30 },\n\
\t\t\t\t\"uOpacity\": { type: \"f\", value: 1 },\n\
\n\
\t\t\t\t\"useRefract\": { type: \"i\", value: 0 },\n\
\t\t\t\t\"uRefractionRatio\": { type: \"f\", value: 0.98 },\n\
\t\t\t\t\"uReflectivity\": { type: \"f\", value: 0.5 },\n\
\n\
\t\t\t\t\"uOffset\" : { type: \"v2\", value: new THREE.Vector2( 0, 0 ) },\n\
\t\t\t\t\"uRepeat\" : { type: \"v2\", value: new THREE.Vector2( 1, 1 ) },\n\
\n\
\t\t\t\t\"wrapRGB\"  : { type: \"v3\", value: new THREE.Vector3( 1, 1, 1 ) }\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t] ),\n\
\n\
\t\t\tfragmentShader: [\n\
\n\
\t\t\t\t\"uniform vec3 uAmbientColor;\",\n\
\t\t\t\t\"uniform vec3 uDiffuseColor;\",\n\
\t\t\t\t\"uniform vec3 uSpecularColor;\",\n\
\t\t\t\t\"uniform float uShininess;\",\n\
\t\t\t\t\"uniform float uOpacity;\",\n\
\n\
\t\t\t\t\"uniform bool enableDiffuse;\",\n\
\t\t\t\t\"uniform bool enableSpecular;\",\n\
\t\t\t\t\"uniform bool enableAO;\",\n\
\t\t\t\t\"uniform bool enableReflection;\",\n\
\n\
\t\t\t\t\"uniform sampler2D tDiffuse;\",\n\
\t\t\t\t\"uniform sampler2D tNormal;\",\n\
\t\t\t\t\"uniform sampler2D tSpecular;\",\n\
\t\t\t\t\"uniform sampler2D tAO;\",\n\
\n\
\t\t\t\t\"uniform samplerCube tCube;\",\n\
\n\
\t\t\t\t\"uniform vec2 uNormalScale;\",\n\
\n\
\t\t\t\t\"uniform bool useRefract;\",\n\
\t\t\t\t\"uniform float uRefractionRatio;\",\n\
\t\t\t\t\"uniform float uReflectivity;\",\n\
\n\
\t\t\t\t\"varying vec3 vTangent;\",\n\
\t\t\t\t\"varying vec3 vBinormal;\",\n\
\t\t\t\t\"varying vec3 vNormal;\",\n\
\t\t\t\t\"varying vec2 vUv;\",\n\
\n\
\t\t\t\t\"uniform vec3 ambientLightColor;\",\n\
\n\
\t\t\t\t\"#if MAX_DIR_LIGHTS > 0\",\n\
\n\
\t\t\t\t\t\"uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\",\n\
\t\t\t\t\t\"uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\",\n\
\n\
\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\"#if MAX_HEMI_LIGHTS > 0\",\n\
\n\
\t\t\t\t\t\"uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\",\n\
\t\t\t\t\t\"uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\",\n\
\t\t\t\t\t\"uniform vec3 hemisphereLightPosition[ MAX_HEMI_LIGHTS ];\",\n\
\n\
\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\"#if MAX_POINT_LIGHTS > 0\",\n\
\n\
\t\t\t\t\t\"uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\",\n\
\t\t\t\t\t\"uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\",\n\
\t\t\t\t\t\"uniform float pointLightDistance[ MAX_POINT_LIGHTS ];\",\n\
\n\
\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\"#if MAX_SPOT_LIGHTS > 0\",\n\
\n\
\t\t\t\t\t\"uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\",\n\
\t\t\t\t\t\"uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\",\n\
\t\t\t\t\t\"uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\",\n\
\t\t\t\t\t\"uniform float spotLightAngle[ MAX_SPOT_LIGHTS ];\",\n\
\t\t\t\t\t\"uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\",\n\
\t\t\t\t\t\"uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\",\n\
\n\
\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\"#ifdef WRAP_AROUND\",\n\
\n\
\t\t\t\t\t\"uniform vec3 wrapRGB;\",\n\
\n\
\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\"varying vec3 vWorldPosition;\",\n\
\t\t\t\t\"varying vec3 vViewPosition;\",\n\
\n\
\t\t\t\tTHREE.ShaderChunk[ \"shadowmap_pars_fragment\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"fog_pars_fragment\" ],\n\
\n\
\t\t\t\t\"void main() {\",\n\
\n\
\t\t\t\t\t\"gl_FragColor = vec4( vec3( 1.0 ), uOpacity );\",\n\
\n\
\t\t\t\t\t\"vec3 specularTex = vec3( 1.0 );\",\n\
\n\
\t\t\t\t\t\"vec3 normalTex = texture2D( tNormal, vUv ).xyz * 2.0 - 1.0;\",\n\
\t\t\t\t\t\"normalTex.xy *= uNormalScale;\",\n\
\t\t\t\t\t\"normalTex = normalize( normalTex );\",\n\
\n\
\t\t\t\t\t\"if( enableDiffuse ) {\",\n\
\n\
\t\t\t\t\t\t\"#ifdef GAMMA_INPUT\",\n\
\n\
\t\t\t\t\t\t\t\"vec4 texelColor = texture2D( tDiffuse, vUv );\",\n\
\t\t\t\t\t\t\t\"texelColor.xyz *= texelColor.xyz;\",\n\
\n\
\t\t\t\t\t\t\t\"gl_FragColor = gl_FragColor * texelColor;\",\n\
\n\
\t\t\t\t\t\t\"#else\",\n\
\n\
\t\t\t\t\t\t\t\"gl_FragColor = gl_FragColor * texture2D( tDiffuse, vUv );\",\n\
\n\
\t\t\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\t\"}\",\n\
\n\
\t\t\t\t\t\"if( enableAO ) {\",\n\
\n\
\t\t\t\t\t\t\"#ifdef GAMMA_INPUT\",\n\
\n\
\t\t\t\t\t\t\t\"vec4 aoColor = texture2D( tAO, vUv );\",\n\
\t\t\t\t\t\t\t\"aoColor.xyz *= aoColor.xyz;\",\n\
\n\
\t\t\t\t\t\t\t\"gl_FragColor.xyz = gl_FragColor.xyz * aoColor.xyz;\",\n\
\n\
\t\t\t\t\t\t\"#else\",\n\
\n\
\t\t\t\t\t\t\t\"gl_FragColor.xyz = gl_FragColor.xyz * texture2D( tAO, vUv ).xyz;\",\n\
\n\
\t\t\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\t\"}\",\n\
\n\
\t\t\t\t\t\"if( enableSpecular )\",\n\
\t\t\t\t\t\t\"specularTex = texture2D( tSpecular, vUv ).xyz;\",\n\
\n\
\t\t\t\t\t\"mat3 tsb = mat3( normalize( vTangent ), normalize( vBinormal ), normalize( vNormal ) );\",\n\
\t\t\t\t\t\"vec3 finalNormal = tsb * normalTex;\",\n\
\n\
\t\t\t\t\t\"#ifdef FLIP_SIDED\",\n\
\n\
\t\t\t\t\t\t\"finalNormal = -finalNormal;\",\n\
\n\
\t\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\t\"vec3 normal = normalize( finalNormal );\",\n\
\t\t\t\t\t\"vec3 viewPosition = normalize( vViewPosition );\",\n\
\n\
\t\t\t\t\t// point lights\n\
\n\
\t\t\t\t\t\"#if MAX_POINT_LIGHTS > 0\",\n\
\n\
\t\t\t\t\t\t\"vec3 pointDiffuse = vec3( 0.0 );\",\n\
\t\t\t\t\t\t\"vec3 pointSpecular = vec3( 0.0 );\",\n\
\n\
\t\t\t\t\t\t\"for ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\",\n\
\n\
\t\t\t\t\t\t\t\"vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\",\n\
\t\t\t\t\t\t\t\"vec3 pointVector = lPosition.xyz + vViewPosition.xyz;\",\n\
\n\
\t\t\t\t\t\t\t\"float pointDistance = 1.0;\",\n\
\t\t\t\t\t\t\t\"if ( pointLightDistance[ i ] > 0.0 )\",\n\
\t\t\t\t\t\t\t\t\"pointDistance = 1.0 - min( ( length( pointVector ) / pointLightDistance[ i ] ), 1.0 );\",\n\
\n\
\t\t\t\t\t\t\t\"pointVector = normalize( pointVector );\",\n\
\n\
\t\t\t\t\t\t\t// diffuse\n\
\n\
\t\t\t\t\t\t\t\"#ifdef WRAP_AROUND\",\n\
\n\
\t\t\t\t\t\t\t\t\"float pointDiffuseWeightFull = max( dot( normal, pointVector ), 0.0 );\",\n\
\t\t\t\t\t\t\t\t\"float pointDiffuseWeightHalf = max( 0.5 * dot( normal, pointVector ) + 0.5, 0.0 );\",\n\
\n\
\t\t\t\t\t\t\t\t\"vec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\",\n\
\n\
\t\t\t\t\t\t\t\"#else\",\n\
\n\
\t\t\t\t\t\t\t\t\"float pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\",\n\
\n\
\t\t\t\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\t\t\t\"pointDiffuse += pointDistance * pointLightColor[ i ] * uDiffuseColor * pointDiffuseWeight;\",\n\
\n\
\t\t\t\t\t\t\t// specular\n\
\n\
\t\t\t\t\t\t\t\"vec3 pointHalfVector = normalize( pointVector + viewPosition );\",\n\
\t\t\t\t\t\t\t\"float pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\",\n\
\t\t\t\t\t\t\t\"float pointSpecularWeight = specularTex.r * max( pow( pointDotNormalHalf, uShininess ), 0.0 );\",\n\
\n\
\t\t\t\t\t\t\t\"#ifdef PHYSICALLY_BASED_SHADING\",\n\
\n\
\t\t\t\t\t\t\t\t// 2.0 => 2.0001 is hack to work around ANGLE bug\n\
\n\
\t\t\t\t\t\t\t\t\"float specularNormalization = ( uShininess + 2.0001 ) / 8.0;\",\n\
\n\
\t\t\t\t\t\t\t\t\"vec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( pointVector, pointHalfVector ), 5.0 );\",\n\
\t\t\t\t\t\t\t\t\"pointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * pointDistance * specularNormalization;\",\n\
\n\
\t\t\t\t\t\t\t\"#else\",\n\
\n\
\t\t\t\t\t\t\t\t\"pointSpecular += pointDistance * pointLightColor[ i ] * uSpecularColor * pointSpecularWeight * pointDiffuseWeight;\",\n\
\n\
\t\t\t\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\t\t\"}\",\n\
\n\
\t\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\t// spot lights\n\
\n\
\t\t\t\t\t\"#if MAX_SPOT_LIGHTS > 0\",\n\
\n\
\t\t\t\t\t\t\"vec3 spotDiffuse = vec3( 0.0 );\",\n\
\t\t\t\t\t\t\"vec3 spotSpecular = vec3( 0.0 );\",\n\
\n\
\t\t\t\t\t\t\"for ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\",\n\
\n\
\t\t\t\t\t\t\t\"vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\",\n\
\t\t\t\t\t\t\t\"vec3 spotVector = lPosition.xyz + vViewPosition.xyz;\",\n\
\n\
\t\t\t\t\t\t\t\"float spotDistance = 1.0;\",\n\
\t\t\t\t\t\t\t\"if ( spotLightDistance[ i ] > 0.0 )\",\n\
\t\t\t\t\t\t\t\t\"spotDistance = 1.0 - min( ( length( spotVector ) / spotLightDistance[ i ] ), 1.0 );\",\n\
\n\
\t\t\t\t\t\t\t\"spotVector = normalize( spotVector );\",\n\
\n\
\t\t\t\t\t\t\t\"float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\",\n\
\n\
\t\t\t\t\t\t\t\"if ( spotEffect > spotLightAngle[ i ] ) {\",\n\
\n\
\t\t\t\t\t\t\t\t\"spotEffect = pow( spotEffect, spotLightExponent[ i ] );\",\n\
\n\
\t\t\t\t\t\t\t\t// diffuse\n\
\n\
\t\t\t\t\t\t\t\t\"#ifdef WRAP_AROUND\",\n\
\n\
\t\t\t\t\t\t\t\t\t\"float spotDiffuseWeightFull = max( dot( normal, spotVector ), 0.0 );\",\n\
\t\t\t\t\t\t\t\t\t\"float spotDiffuseWeightHalf = max( 0.5 * dot( normal, spotVector ) + 0.5, 0.0 );\",\n\
\n\
\t\t\t\t\t\t\t\t\t\"vec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\",\n\
\n\
\t\t\t\t\t\t\t\t\"#else\",\n\
\n\
\t\t\t\t\t\t\t\t\t\"float spotDiffuseWeight = max( dot( normal, spotVector ), 0.0 );\",\n\
\n\
\t\t\t\t\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\t\t\t\t\"spotDiffuse += spotDistance * spotLightColor[ i ] * uDiffuseColor * spotDiffuseWeight * spotEffect;\",\n\
\n\
\t\t\t\t\t\t\t\t// specular\n\
\n\
\t\t\t\t\t\t\t\t\"vec3 spotHalfVector = normalize( spotVector + viewPosition );\",\n\
\t\t\t\t\t\t\t\t\"float spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\",\n\
\t\t\t\t\t\t\t\t\"float spotSpecularWeight = specularTex.r * max( pow( spotDotNormalHalf, uShininess ), 0.0 );\",\n\
\n\
\t\t\t\t\t\t\t\t\"#ifdef PHYSICALLY_BASED_SHADING\",\n\
\n\
\t\t\t\t\t\t\t\t\t// 2.0 => 2.0001 is hack to work around ANGLE bug\n\
\n\
\t\t\t\t\t\t\t\t\t\"float specularNormalization = ( uShininess + 2.0001 ) / 8.0;\",\n\
\n\
\t\t\t\t\t\t\t\t\t\"vec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( spotVector, spotHalfVector ), 5.0 );\",\n\
\t\t\t\t\t\t\t\t\t\"spotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * spotDistance * specularNormalization * spotEffect;\",\n\
\n\
\t\t\t\t\t\t\t\t\"#else\",\n\
\n\
\t\t\t\t\t\t\t\t\t\"spotSpecular += spotDistance * spotLightColor[ i ] * uSpecularColor * spotSpecularWeight * spotDiffuseWeight * spotEffect;\",\n\
\n\
\t\t\t\t\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\t\t\t\"}\",\n\
\n\
\t\t\t\t\t\t\"}\",\n\
\n\
\t\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\t// directional lights\n\
\n\
\t\t\t\t\t\"#if MAX_DIR_LIGHTS > 0\",\n\
\n\
\t\t\t\t\t\t\"vec3 dirDiffuse = vec3( 0.0 );\",\n\
\t\t\t\t\t\t\"vec3 dirSpecular = vec3( 0.0 );\",\n\
\n\
\t\t\t\t\t\t\"for( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\",\n\
\n\
\t\t\t\t\t\t\t\"vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\",\n\
\t\t\t\t\t\t\t\"vec3 dirVector = normalize( lDirection.xyz );\",\n\
\n\
\t\t\t\t\t\t\t// diffuse\n\
\n\
\t\t\t\t\t\t\t\"#ifdef WRAP_AROUND\",\n\
\n\
\t\t\t\t\t\t\t\t\"float directionalLightWeightingFull = max( dot( normal, dirVector ), 0.0 );\",\n\
\t\t\t\t\t\t\t\t\"float directionalLightWeightingHalf = max( 0.5 * dot( normal, dirVector ) + 0.5, 0.0 );\",\n\
\n\
\t\t\t\t\t\t\t\t\"vec3 dirDiffuseWeight = mix( vec3( directionalLightWeightingFull ), vec3( directionalLightWeightingHalf ), wrapRGB );\",\n\
\n\
\t\t\t\t\t\t\t\"#else\",\n\
\n\
\t\t\t\t\t\t\t\t\"float dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\",\n\
\n\
\t\t\t\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\t\t\t\"dirDiffuse += directionalLightColor[ i ] * uDiffuseColor * dirDiffuseWeight;\",\n\
\n\
\t\t\t\t\t\t\t// specular\n\
\n\
\t\t\t\t\t\t\t\"vec3 dirHalfVector = normalize( dirVector + viewPosition );\",\n\
\t\t\t\t\t\t\t\"float dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\",\n\
\t\t\t\t\t\t\t\"float dirSpecularWeight = specularTex.r * max( pow( dirDotNormalHalf, uShininess ), 0.0 );\",\n\
\n\
\t\t\t\t\t\t\t\"#ifdef PHYSICALLY_BASED_SHADING\",\n\
\n\
\t\t\t\t\t\t\t\t// 2.0 => 2.0001 is hack to work around ANGLE bug\n\
\n\
\t\t\t\t\t\t\t\t\"float specularNormalization = ( uShininess + 2.0001 ) / 8.0;\",\n\
\n\
\t\t\t\t\t\t\t\t\"vec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );\",\n\
\t\t\t\t\t\t\t\t\"dirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\",\n\
\n\
\t\t\t\t\t\t\t\"#else\",\n\
\n\
\t\t\t\t\t\t\t\t\"dirSpecular += directionalLightColor[ i ] * uSpecularColor * dirSpecularWeight * dirDiffuseWeight;\",\n\
\n\
\t\t\t\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\t\t\"}\",\n\
\n\
\t\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\t// hemisphere lights\n\
\n\
\t\t\t\t\t\"#if MAX_HEMI_LIGHTS > 0\",\n\
\n\
\t\t\t\t\t\t\"vec3 hemiDiffuse  = vec3( 0.0 );\",\n\
\t\t\t\t\t\t\"vec3 hemiSpecular = vec3( 0.0 );\" ,\n\
\n\
\t\t\t\t\t\t\"for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\",\n\
\n\
\t\t\t\t\t\t\t\"vec4 lPosition = viewMatrix * vec4( hemisphereLightPosition[ i ], 1.0 );\",\n\
\t\t\t\t\t\t\t\"vec3 lVector = normalize( lPosition.xyz + vViewPosition.xyz );\",\n\
\n\
\t\t\t\t\t\t\t// diffuse\n\
\n\
\t\t\t\t\t\t\t\"float dotProduct = dot( normal, lVector );\",\n\
\t\t\t\t\t\t\t\"float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\",\n\
\n\
\t\t\t\t\t\t\t\"vec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\",\n\
\n\
\t\t\t\t\t\t\t\"hemiDiffuse += uDiffuseColor * hemiColor;\",\n\
\n\
\t\t\t\t\t\t\t// specular (sky light)\n\
\n\
\n\
\t\t\t\t\t\t\t\"vec3 hemiHalfVectorSky = normalize( lVector + viewPosition );\",\n\
\t\t\t\t\t\t\t\"float hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;\",\n\
\t\t\t\t\t\t\t\"float hemiSpecularWeightSky = specularTex.r * max( pow( hemiDotNormalHalfSky, uShininess ), 0.0 );\",\n\
\n\
\t\t\t\t\t\t\t// specular (ground light)\n\
\n\
\t\t\t\t\t\t\t\"vec3 lVectorGround = normalize( -lPosition.xyz + vViewPosition.xyz );\",\n\
\n\
\t\t\t\t\t\t\t\"vec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );\",\n\
\t\t\t\t\t\t\t\"float hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;\",\n\
\t\t\t\t\t\t\t\"float hemiSpecularWeightGround = specularTex.r * max( pow( hemiDotNormalHalfGround, uShininess ), 0.0 );\",\n\
\n\
\t\t\t\t\t\t\t\"#ifdef PHYSICALLY_BASED_SHADING\",\n\
\n\
\t\t\t\t\t\t\t\t\"float dotProductGround = dot( normal, lVectorGround );\",\n\
\n\
\t\t\t\t\t\t\t\t// 2.0 => 2.0001 is hack to work around ANGLE bug\n\
\n\
\t\t\t\t\t\t\t\t\"float specularNormalization = ( uShininess + 2.0001 ) / 8.0;\",\n\
\n\
\t\t\t\t\t\t\t\t\"vec3 schlickSky = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( lVector, hemiHalfVectorSky ), 5.0 );\",\n\
\t\t\t\t\t\t\t\t\"vec3 schlickGround = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 5.0 );\",\n\
\t\t\t\t\t\t\t\t\"hemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );\",\n\
\n\
\t\t\t\t\t\t\t\"#else\",\n\
\n\
\t\t\t\t\t\t\t\t\"hemiSpecular += uSpecularColor * hemiColor * ( hemiSpecularWeightSky + hemiSpecularWeightGround ) * hemiDiffuseWeight;\",\n\
\n\
\t\t\t\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\t\t\"}\",\n\
\n\
\t\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\t// all lights contribution summation\n\
\n\
\t\t\t\t\t\"vec3 totalDiffuse = vec3( 0.0 );\",\n\
\t\t\t\t\t\"vec3 totalSpecular = vec3( 0.0 );\",\n\
\n\
\t\t\t\t\t\"#if MAX_DIR_LIGHTS > 0\",\n\
\n\
\t\t\t\t\t\t\"totalDiffuse += dirDiffuse;\",\n\
\t\t\t\t\t\t\"totalSpecular += dirSpecular;\",\n\
\n\
\t\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\t\"#if MAX_HEMI_LIGHTS > 0\",\n\
\n\
\t\t\t\t\t\t\"totalDiffuse += hemiDiffuse;\",\n\
\t\t\t\t\t\t\"totalSpecular += hemiSpecular;\",\n\
\n\
\t\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\t\"#if MAX_POINT_LIGHTS > 0\",\n\
\n\
\t\t\t\t\t\t\"totalDiffuse += pointDiffuse;\",\n\
\t\t\t\t\t\t\"totalSpecular += pointSpecular;\",\n\
\n\
\t\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\t\"#if MAX_SPOT_LIGHTS > 0\",\n\
\n\
\t\t\t\t\t\t\"totalDiffuse += spotDiffuse;\",\n\
\t\t\t\t\t\t\"totalSpecular += spotSpecular;\",\n\
\n\
\t\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\t\"#ifdef METAL\",\n\
\n\
\t\t\t\t\t\t\"gl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * uAmbientColor + totalSpecular );\",\n\
\n\
\t\t\t\t\t\"#else\",\n\
\n\
\t\t\t\t\t\t\"gl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * uAmbientColor ) + totalSpecular;\",\n\
\n\
\t\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\t\"if ( enableReflection ) {\",\n\
\n\
\t\t\t\t\t\t\"vec3 vReflect;\",\n\
\t\t\t\t\t\t\"vec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\",\n\
\n\
\t\t\t\t\t\t\"if ( useRefract ) {\",\n\
\n\
\t\t\t\t\t\t\t\"vReflect = refract( cameraToVertex, normal, uRefractionRatio );\",\n\
\n\
\t\t\t\t\t\t\"} else {\",\n\
\n\
\t\t\t\t\t\t\t\"vReflect = reflect( cameraToVertex, normal );\",\n\
\n\
\t\t\t\t\t\t\"}\",\n\
\n\
\t\t\t\t\t\t\"vec4 cubeColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\",\n\
\n\
\t\t\t\t\t\t\"#ifdef GAMMA_INPUT\",\n\
\n\
\t\t\t\t\t\t\t\"cubeColor.xyz *= cubeColor.xyz;\",\n\
\n\
\t\t\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\t\t\"gl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularTex.r * uReflectivity );\",\n\
\n\
\t\t\t\t\t\"}\",\n\
\n\
\t\t\t\t\tTHREE.ShaderChunk[ \"shadowmap_fragment\" ],\n\
\t\t\t\t\tTHREE.ShaderChunk[ \"linear_to_gamma_fragment\" ],\n\
\t\t\t\t\tTHREE.ShaderChunk[ \"fog_fragment\" ],\n\
\n\
\t\t\t\t\"}\"\n\
\n\
\t\t\t].join(\"\\n\"),\n\
\n\
\t\t\tvertexShader: [\n\
\n\
\t\t\t\t\"attribute vec4 tangent;\",\n\
\n\
\t\t\t\t\"uniform vec2 uOffset;\",\n\
\t\t\t\t\"uniform vec2 uRepeat;\",\n\
\n\
\t\t\t\t\"uniform bool enableDisplacement;\",\n\
\n\
\t\t\t\t\"#ifdef VERTEX_TEXTURES\",\n\
\n\
\t\t\t\t\t\"uniform sampler2D tDisplacement;\",\n\
\t\t\t\t\t\"uniform float uDisplacementScale;\",\n\
\t\t\t\t\t\"uniform float uDisplacementBias;\",\n\
\n\
\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\"varying vec3 vTangent;\",\n\
\t\t\t\t\"varying vec3 vBinormal;\",\n\
\t\t\t\t\"varying vec3 vNormal;\",\n\
\t\t\t\t\"varying vec2 vUv;\",\n\
\n\
\t\t\t\t\"varying vec3 vWorldPosition;\",\n\
\t\t\t\t\"varying vec3 vViewPosition;\",\n\
\n\
\t\t\t\tTHREE.ShaderChunk[ \"skinning_pars_vertex\" ],\n\
\t\t\t\tTHREE.ShaderChunk[ \"shadowmap_pars_vertex\" ],\n\
\n\
\t\t\t\t\"void main() {\",\n\
\n\
\t\t\t\t\tTHREE.ShaderChunk[ \"skinbase_vertex\" ],\n\
\t\t\t\t\tTHREE.ShaderChunk[ \"skinnormal_vertex\" ],\n\
\n\
\t\t\t\t\t// normal, tangent and binormal vectors\n\
\n\
\t\t\t\t\t\"#ifdef USE_SKINNING\",\n\
\n\
\t\t\t\t\t\t\"vNormal = normalMatrix * skinnedNormal.xyz;\",\n\
\n\
\t\t\t\t\t\t\"vec4 skinnedTangent = skinMatrix * vec4( tangent.xyz, 0.0 );\",\n\
\t\t\t\t\t\t\"vTangent = normalMatrix * skinnedTangent.xyz;\",\n\
\n\
\t\t\t\t\t\"#else\",\n\
\n\
\t\t\t\t\t\t\"vNormal = normalMatrix * normal;\",\n\
\t\t\t\t\t\t\"vTangent = normalMatrix * tangent.xyz;\",\n\
\n\
\t\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\t\"vBinormal = cross( vNormal, vTangent ) * tangent.w;\",\n\
\n\
\t\t\t\t\t\"vUv = uv * uRepeat + uOffset;\",\n\
\n\
\t\t\t\t\t// displacement mapping\n\
\n\
\t\t\t\t\t\"vec3 displacedPosition;\",\n\
\n\
\t\t\t\t\t\"#ifdef VERTEX_TEXTURES\",\n\
\n\
\t\t\t\t\t\t\"if ( enableDisplacement ) {\",\n\
\n\
\t\t\t\t\t\t\t\"vec3 dv = texture2D( tDisplacement, uv ).xyz;\",\n\
\t\t\t\t\t\t\t\"float df = uDisplacementScale * dv.x + uDisplacementBias;\",\n\
\t\t\t\t\t\t\t\"displacedPosition = position + normalize( normal ) * df;\",\n\
\n\
\t\t\t\t\t\t\"} else {\",\n\
\n\
\t\t\t\t\t\t\t\"#ifdef USE_SKINNING\",\n\
\n\
\t\t\t\t\t\t\t\t\"vec4 skinVertex = vec4( position, 1.0 );\",\n\
\n\
\t\t\t\t\t\t\t\t\"vec4 skinned  = boneMatX * skinVertex * skinWeight.x;\",\n\
\t\t\t\t\t\t\t\t\"skinned \t  += boneMatY * skinVertex * skinWeight.y;\",\n\
\n\
\t\t\t\t\t\t\t\t\"displacedPosition  = skinned.xyz;\",\n\
\n\
\t\t\t\t\t\t\t\"#else\",\n\
\n\
\t\t\t\t\t\t\t\t\"displacedPosition = position;\",\n\
\n\
\t\t\t\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\t\t\"}\",\n\
\n\
\t\t\t\t\t\"#else\",\n\
\n\
\t\t\t\t\t\t\"#ifdef USE_SKINNING\",\n\
\n\
\t\t\t\t\t\t\t\"vec4 skinVertex = vec4( position, 1.0 );\",\n\
\n\
\t\t\t\t\t\t\t\"vec4 skinned  = boneMatX * skinVertex * skinWeight.x;\",\n\
\t\t\t\t\t\t\t\"skinned \t  += boneMatY * skinVertex * skinWeight.y;\",\n\
\n\
\t\t\t\t\t\t\t\"displacedPosition  = skinned.xyz;\",\n\
\n\
\t\t\t\t\t\t\"#else\",\n\
\n\
\t\t\t\t\t\t\t\"displacedPosition = position;\",\n\
\n\
\t\t\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\t//\n\
\n\
\t\t\t\t\t\"vec4 mvPosition = modelViewMatrix * vec4( displacedPosition, 1.0 );\",\n\
\t\t\t\t\t\"vec4 mPosition = modelMatrix * vec4( displacedPosition, 1.0 );\",\n\
\n\
\t\t\t\t\t\"gl_Position = projectionMatrix * mvPosition;\",\n\
\n\
\t\t\t\t\t//\n\
\n\
\t\t\t\t\t\"vWorldPosition = mPosition.xyz;\",\n\
\t\t\t\t\t\"vViewPosition = -mvPosition.xyz;\",\n\
\n\
\t\t\t\t\t// shadows\n\
\n\
\t\t\t\t\t\"#ifdef USE_SHADOWMAP\",\n\
\n\
\t\t\t\t\t\t\"for( int i = 0; i < MAX_SHADOWS; i ++ ) {\",\n\
\n\
\t\t\t\t\t\t\t\"vShadowCoord[ i ] = shadowMatrix[ i ] * mPosition;\",\n\
\n\
\t\t\t\t\t\t\"}\",\n\
\n\
\t\t\t\t\t\"#endif\",\n\
\n\
\t\t\t\t\"}\"\n\
\n\
\t\t\t].join(\"\\n\")\n\
\n\
\t\t},\n\
\n\
\t\t/* -------------------------------------------------------------------------\n\
\t\t//\tCube map shader\n\
\t\t ------------------------------------------------------------------------- */\n\
\n\
\t\t'cube': {\n\
\n\
\t\t\tuniforms: { \"tCube\": { type: \"t\", value: null },\n\
\t\t\t\t\t\t\"tFlip\": { type: \"f\", value: -1 } },\n\
\n\
\t\t\tvertexShader: [\n\
\n\
\t\t\t\t\"varying vec3 vViewPosition;\",\n\
\n\
\t\t\t\t\"void main() {\",\n\
\n\
\t\t\t\t\t\"vec4 mPosition = modelMatrix * vec4( position, 1.0 );\",\n\
\t\t\t\t\t\"vViewPosition = cameraPosition - mPosition.xyz;\",\n\
\n\
\t\t\t\t\t\"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\",\n\
\n\
\t\t\t\t\"}\"\n\
\n\
\t\t\t].join(\"\\n\"),\n\
\n\
\t\t\tfragmentShader: [\n\
\n\
\t\t\t\t\"uniform samplerCube tCube;\",\n\
\t\t\t\t\"uniform float tFlip;\",\n\
\n\
\t\t\t\t\"varying vec3 vViewPosition;\",\n\
\n\
\t\t\t\t\"void main() {\",\n\
\n\
\t\t\t\t\t\"vec3 wPos = cameraPosition - vViewPosition;\",\n\
\t\t\t\t\t\"gl_FragColor = textureCube( tCube, vec3( tFlip * wPos.x, wPos.yz ) );\",\n\
\n\
\t\t\t\t\"}\"\n\
\n\
\t\t\t].join(\"\\n\")\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
};\n\
\n\
};\n\
/**\n\
 * @author zz85 / http://www.lab4games.net/zz85/blog\n\
 * @author alteredq / http://alteredqualia.com/\n\
 *\n\
 * For Text operations in three.js (See TextGeometry)\n\
 *\n\
 * It uses techniques used in:\n\
 *\n\
 * \ttypeface.js and canvastext\n\
 * \t\tFor converting fonts and rendering with javascript\n\
 *\t\thttp://typeface.neocracy.org\n\
 *\n\
 *\tTriangulation ported from AS3\n\
 *\t\tSimple Polygon Triangulation\n\
 *\t\thttp://actionsnippet.com/?p=1462\n\
 *\n\
 * \tA Method to triangulate shapes with holes\n\
 *\t\thttp://www.sakri.net/blog/2009/06/12/an-approach-to-triangulating-polygons-with-holes/\n\
 *\n\
 */\n\
\n\
THREE.FontUtils = {\n\
\n\
\tfaces : {},\n\
\n\
\t// Just for now. face[weight][style]\n\
\n\
\tface : \"helvetiker\",\n\
\tweight: \"normal\",\n\
\tstyle : \"normal\",\n\
\tsize : 150,\n\
\tdivisions : 10,\n\
\n\
\tgetFace : function() {\n\
\n\
\t\treturn this.faces[ this.face ][ this.weight ][ this.style ];\n\
\n\
\t},\n\
\n\
\tloadFace : function( data ) {\n\
\n\
\t\tvar family = data.familyName.toLowerCase();\n\
\n\
\t\tvar ThreeFont = this;\n\
\n\
\t\tThreeFont.faces[ family ] = ThreeFont.faces[ family ] || {};\n\
\n\
\t\tThreeFont.faces[ family ][ data.cssFontWeight ] = ThreeFont.faces[ family ][ data.cssFontWeight ] || {};\n\
\t\tThreeFont.faces[ family ][ data.cssFontWeight ][ data.cssFontStyle ] = data;\n\
\n\
\t\tvar face = ThreeFont.faces[ family ][ data.cssFontWeight ][ data.cssFontStyle ] = data;\n\
\n\
\t\treturn data;\n\
\n\
\t},\n\
\n\
\tdrawText : function( text ) {\n\
\n\
\t\tvar characterPts = [], allPts = [];\n\
\n\
\t\t// RenderText\n\
\n\
\t\tvar i, p,\n\
\t\t\tface = this.getFace(),\n\
\t\t\tscale = this.size / face.resolution,\n\
\t\t\toffset = 0,\n\
\t\t\tchars = String( text ).split( '' ),\n\
\t\t\tlength = chars.length;\n\
\n\
\t\tvar fontPaths = [];\n\
\n\
\t\tfor ( i = 0; i < length; i ++ ) {\n\
\n\
\t\t\tvar path = new THREE.Path();\n\
\n\
\t\t\tvar ret = this.extractGlyphPoints( chars[ i ], face, scale, offset, path );\n\
\t\t\toffset += ret.offset;\n\
\n\
\t\t\tfontPaths.push( ret.path );\n\
\n\
\t\t}\n\
\n\
\t\t// get the width\n\
\n\
\t\tvar width = offset / 2;\n\
\t\t//\n\
\t\t// for ( p = 0; p < allPts.length; p++ ) {\n\
\t\t//\n\
\t\t// \tallPts[ p ].x -= width;\n\
\t\t//\n\
\t\t// }\n\
\n\
\t\t//var extract = this.extractPoints( allPts, characterPts );\n\
\t\t//extract.contour = allPts;\n\
\n\
\t\t//extract.paths = fontPaths;\n\
\t\t//extract.offset = width;\n\
\n\
\t\treturn { paths : fontPaths, offset : width };\n\
\n\
\t},\n\
\n\
\n\
\n\
\n\
\textractGlyphPoints : function( c, face, scale, offset, path ) {\n\
\n\
\t\tvar pts = [];\n\
\n\
\t\tvar i, i2, divisions,\n\
\t\t\toutline, action, length,\n\
\t\t\tscaleX, scaleY,\n\
\t\t\tx, y, cpx, cpy, cpx0, cpy0, cpx1, cpy1, cpx2, cpy2,\n\
\t\t\tlaste,\n\
\t\t\tglyph = face.glyphs[ c ] || face.glyphs[ '?' ];\n\
\n\
\t\tif ( !glyph ) return;\n\
\n\
\t\tif ( glyph.o ) {\n\
\n\
\t\t\toutline = glyph._cachedOutline || ( glyph._cachedOutline = glyph.o.split( ' ' ) );\n\
\t\t\tlength = outline.length;\n\
\n\
\t\t\tscaleX = scale;\n\
\t\t\tscaleY = scale;\n\
\n\
\t\t\tfor ( i = 0; i < length; ) {\n\
\n\
\t\t\t\taction = outline[ i ++ ];\n\
\n\
\t\t\t\t//console.log( action );\n\
\n\
\t\t\t\tswitch( action ) {\n\
\n\
\t\t\t\tcase 'm':\n\
\n\
\t\t\t\t\t// Move To\n\
\n\
\t\t\t\t\tx = outline[ i++ ] * scaleX + offset;\n\
\t\t\t\t\ty = outline[ i++ ] * scaleY;\n\
\n\
\t\t\t\t\tpath.moveTo( x, y );\n\
\t\t\t\t\tbreak;\n\
\n\
\t\t\t\tcase 'l':\n\
\n\
\t\t\t\t\t// Line To\n\
\n\
\t\t\t\t\tx = outline[ i++ ] * scaleX + offset;\n\
\t\t\t\t\ty = outline[ i++ ] * scaleY;\n\
\t\t\t\t\tpath.lineTo(x,y);\n\
\t\t\t\t\tbreak;\n\
\n\
\t\t\t\tcase 'q':\n\
\n\
\t\t\t\t\t// QuadraticCurveTo\n\
\n\
\t\t\t\t\tcpx  = outline[ i++ ] * scaleX + offset;\n\
\t\t\t\t\tcpy  = outline[ i++ ] * scaleY;\n\
\t\t\t\t\tcpx1 = outline[ i++ ] * scaleX + offset;\n\
\t\t\t\t\tcpy1 = outline[ i++ ] * scaleY;\n\
\n\
\t\t\t\t\tpath.quadraticCurveTo(cpx1, cpy1, cpx, cpy);\n\
\n\
\t\t\t\t\tlaste = pts[ pts.length - 1 ];\n\
\n\
\t\t\t\t\tif ( laste ) {\n\
\n\
\t\t\t\t\t\tcpx0 = laste.x;\n\
\t\t\t\t\t\tcpy0 = laste.y;\n\
\n\
\t\t\t\t\t\tfor ( i2 = 1, divisions = this.divisions; i2 <= divisions; i2 ++ ) {\n\
\n\
\t\t\t\t\t\t\tvar t = i2 / divisions;\n\
\t\t\t\t\t\t\tvar tx = THREE.Shape.Utils.b2( t, cpx0, cpx1, cpx );\n\
\t\t\t\t\t\t\tvar ty = THREE.Shape.Utils.b2( t, cpy0, cpy1, cpy );\n\
\t\t\t\t\t  }\n\
\n\
\t\t\t\t  }\n\
\n\
\t\t\t\t  break;\n\
\n\
\t\t\t\tcase 'b':\n\
\n\
\t\t\t\t\t// Cubic Bezier Curve\n\
\n\
\t\t\t\t\tcpx  = outline[ i++ ] *  scaleX + offset;\n\
\t\t\t\t\tcpy  = outline[ i++ ] *  scaleY;\n\
\t\t\t\t\tcpx1 = outline[ i++ ] *  scaleX + offset;\n\
\t\t\t\t\tcpy1 = outline[ i++ ] * -scaleY;\n\
\t\t\t\t\tcpx2 = outline[ i++ ] *  scaleX + offset;\n\
\t\t\t\t\tcpy2 = outline[ i++ ] * -scaleY;\n\
\n\
\t\t\t\t\tpath.bezierCurveTo( cpx, cpy, cpx1, cpy1, cpx2, cpy2 );\n\
\n\
\t\t\t\t\tlaste = pts[ pts.length - 1 ];\n\
\n\
\t\t\t\t\tif ( laste ) {\n\
\n\
\t\t\t\t\t\tcpx0 = laste.x;\n\
\t\t\t\t\t\tcpy0 = laste.y;\n\
\n\
\t\t\t\t\t\tfor ( i2 = 1, divisions = this.divisions; i2 <= divisions; i2 ++ ) {\n\
\n\
\t\t\t\t\t\t\tvar t = i2 / divisions;\n\
\t\t\t\t\t\t\tvar tx = THREE.Shape.Utils.b3( t, cpx0, cpx1, cpx2, cpx );\n\
\t\t\t\t\t\t\tvar ty = THREE.Shape.Utils.b3( t, cpy0, cpy1, cpy2, cpy );\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\tbreak;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\t\t}\n\
\n\
\n\
\n\
\t\treturn { offset: glyph.ha*scale, path:path};\n\
\t}\n\
\n\
};\n\
\n\
\n\
THREE.FontUtils.generateShapes = function( text, parameters ) {\n\
\n\
\t// Parameters\n\
\n\
\tparameters = parameters || {};\n\
\n\
\tvar size = parameters.size !== undefined ? parameters.size : 100;\n\
\tvar curveSegments = parameters.curveSegments !== undefined ? parameters.curveSegments: 4;\n\
\n\
\tvar font = parameters.font !== undefined ? parameters.font : \"helvetiker\";\n\
\tvar weight = parameters.weight !== undefined ? parameters.weight : \"normal\";\n\
\tvar style = parameters.style !== undefined ? parameters.style : \"normal\";\n\
\n\
\tTHREE.FontUtils.size = size;\n\
\tTHREE.FontUtils.divisions = curveSegments;\n\
\n\
\tTHREE.FontUtils.face = font;\n\
\tTHREE.FontUtils.weight = weight;\n\
\tTHREE.FontUtils.style = style;\n\
\n\
\t// Get a Font data json object\n\
\n\
\tvar data = THREE.FontUtils.drawText( text );\n\
\n\
\tvar paths = data.paths;\n\
\tvar shapes = [];\n\
\n\
\tfor ( var p = 0, pl = paths.length; p < pl; p ++ ) {\n\
\n\
\t\tArray.prototype.push.apply( shapes, paths[ p ].toShapes() );\n\
\n\
\t}\n\
\n\
\treturn shapes;\n\
\n\
};\n\
\n\
\n\
/**\n\
 * This code is a quick port of code written in C++ which was submitted to\n\
 * flipcode.com by John W. Ratcliff  // July 22, 2000\n\
 * See original code and more information here:\n\
 * http://www.flipcode.com/archives/Efficient_Polygon_Triangulation.shtml\n\
 *\n\
 * ported to actionscript by Zevan Rosser\n\
 * www.actionsnippet.com\n\
 *\n\
 * ported to javascript by Joshua Koo\n\
 * http://www.lab4games.net/zz85/blog\n\
 *\n\
 */\n\
\n\
\n\
( function( namespace ) {\n\
\n\
\tvar EPSILON = 0.0000000001;\n\
\n\
\t// takes in an contour array and returns\n\
\n\
\tvar process = function( contour, indices ) {\n\
\n\
\t\tvar n = contour.length;\n\
\n\
\t\tif ( n < 3 ) return null;\n\
\n\
\t\tvar result = [],\n\
\t\t\tverts = [],\n\
\t\t\tvertIndices = [];\n\
\n\
\t\t/* we want a counter-clockwise polygon in verts */\n\
\n\
\t\tvar u, v, w;\n\
\n\
\t\tif ( area( contour ) > 0.0 ) {\n\
\n\
\t\t\tfor ( v = 0; v < n; v++ ) verts[ v ] = v;\n\
\n\
\t\t} else {\n\
\n\
\t\t\tfor ( v = 0; v < n; v++ ) verts[ v ] = ( n - 1 ) - v;\n\
\n\
\t\t}\n\
\n\
\t\tvar nv = n;\n\
\n\
\t\t/*  remove nv - 2 vertices, creating 1 triangle every time */\n\
\n\
\t\tvar count = 2 * nv;   /* error detection */\n\
\n\
\t\tfor( v = nv - 1; nv > 2; ) {\n\
\n\
\t\t\t/* if we loop, it is probably a non-simple polygon */\n\
\n\
\t\t\tif ( ( count-- ) <= 0 ) {\n\
\n\
\t\t\t\t//** Triangulate: ERROR - probable bad polygon!\n\
\n\
\t\t\t\t//throw ( \"Warning, unable to triangulate polygon!\" );\n\
\t\t\t\t//return null;\n\
\t\t\t\t// Sometimes warning is fine, especially polygons are triangulated in reverse.\n\
\t\t\t\tconsole.log( \"Warning, unable to triangulate polygon!\" );\n\
\n\
\t\t\t\tif ( indices ) return vertIndices;\n\
\t\t\t\treturn result;\n\
\n\
\t\t\t}\n\
\n\
\t\t\t/* three consecutive vertices in current polygon, <u,v,w> */\n\
\n\
\t\t\tu = v; \t \tif ( nv <= u ) u = 0;     /* previous */\n\
\t\t\tv = u + 1;  if ( nv <= v ) v = 0;     /* new v    */\n\
\t\t\tw = v + 1;  if ( nv <= w ) w = 0;     /* next     */\n\
\n\
\t\t\tif ( snip( contour, u, v, w, nv, verts ) ) {\n\
\n\
\t\t\t\tvar a, b, c, s, t;\n\
\n\
\t\t\t\t/* true names of the vertices */\n\
\n\
\t\t\t\ta = verts[ u ];\n\
\t\t\t\tb = verts[ v ];\n\
\t\t\t\tc = verts[ w ];\n\
\n\
\t\t\t\t/* output Triangle */\n\
\n\
\t\t\t\t/*\n\
\t\t\t\tresult.push( contour[ a ] );\n\
\t\t\t\tresult.push( contour[ b ] );\n\
\t\t\t\tresult.push( contour[ c ] );\n\
\t\t\t\t*/\n\
\t\t\t\tresult.push( [ contour[ a ],\n\
\t\t\t\t\tcontour[ b ],\n\
\t\t\t\t\tcontour[ c ] ] );\n\
\n\
\n\
\t\t\t\tvertIndices.push( [ verts[ u ], verts[ v ], verts[ w ] ] );\n\
\n\
\t\t\t\t/* remove v from the remaining polygon */\n\
\n\
\t\t\t\tfor( s = v, t = v + 1; t < nv; s++, t++ ) {\n\
\n\
\t\t\t\t\tverts[ s ] = verts[ t ];\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tnv--;\n\
\n\
\t\t\t\t/* reset error detection counter */\n\
\n\
\t\t\t\tcount = 2 * nv;\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tif ( indices ) return vertIndices;\n\
\t\treturn result;\n\
\n\
\t};\n\
\n\
\t// calculate area of the contour polygon\n\
\n\
\tvar area = function ( contour ) {\n\
\n\
\t\tvar n = contour.length;\n\
\t\tvar a = 0.0;\n\
\n\
\t\tfor( var p = n - 1, q = 0; q < n; p = q++ ) {\n\
\n\
\t\t\ta += contour[ p ].x * contour[ q ].y - contour[ q ].x * contour[ p ].y;\n\
\n\
\t\t}\n\
\n\
\t\treturn a * 0.5;\n\
\n\
\t};\n\
\n\
\t// see if p is inside triangle abc\n\
\n\
\tvar insideTriangle = function( ax, ay,\n\
\t\t\t\t\t\t\t\t   bx, by,\n\
\t\t\t\t\t\t\t\t   cx, cy,\n\
\t\t\t\t\t\t\t\t   px, py ) {\n\
\n\
\t\t  var aX, aY, bX, bY;\n\
\t\t  var cX, cY, apx, apy;\n\
\t\t  var bpx, bpy, cpx, cpy;\n\
\t\t  var cCROSSap, bCROSScp, aCROSSbp;\n\
\n\
\t\t  aX = cx - bx;  aY = cy - by;\n\
\t\t  bX = ax - cx;  bY = ay - cy;\n\
\t\t  cX = bx - ax;  cY = by - ay;\n\
\t\t  apx= px  -ax;  apy= py - ay;\n\
\t\t  bpx= px - bx;  bpy= py - by;\n\
\t\t  cpx= px - cx;  cpy= py - cy;\n\
\n\
\t\t  aCROSSbp = aX*bpy - aY*bpx;\n\
\t\t  cCROSSap = cX*apy - cY*apx;\n\
\t\t  bCROSScp = bX*cpy - bY*cpx;\n\
\n\
\t\t  return ( (aCROSSbp >= 0.0) && (bCROSScp >= 0.0) && (cCROSSap >= 0.0) );\n\
\n\
\t};\n\
\n\
\n\
\tvar snip = function ( contour, u, v, w, n, verts ) {\n\
\n\
\t\tvar p;\n\
\t\tvar ax, ay, bx, by;\n\
\t\tvar cx, cy, px, py;\n\
\n\
\t\tax = contour[ verts[ u ] ].x;\n\
\t\tay = contour[ verts[ u ] ].y;\n\
\n\
\t\tbx = contour[ verts[ v ] ].x;\n\
\t\tby = contour[ verts[ v ] ].y;\n\
\n\
\t\tcx = contour[ verts[ w ] ].x;\n\
\t\tcy = contour[ verts[ w ] ].y;\n\
\n\
\t\tif ( EPSILON > (((bx-ax)*(cy-ay)) - ((by-ay)*(cx-ax))) ) return false;\n\
\n\
\t\t\tfor ( p = 0; p < n; p++ ) {\n\
\n\
\t\t\t\tif( (p == u) || (p == v) || (p == w) ) continue;\n\
\n\
\t\t\t\tpx = contour[ verts[ p ] ].x\n\
\t\t\t\tpy = contour[ verts[ p ] ].y\n\
\n\
\t\t\t\tif ( insideTriangle( ax, ay, bx, by, cx, cy, px, py ) ) return false;\n\
\n\
\t\t  }\n\
\n\
\t\t  return true;\n\
\n\
\t};\n\
\n\
\n\
\tnamespace.Triangulate = process;\n\
\tnamespace.Triangulate.area = area;\n\
\n\
\treturn namespace;\n\
\n\
})(THREE.FontUtils);\n\
\n\
// To use the typeface.js face files, hook up the API\n\
self._typeface_js = { faces: THREE.FontUtils.faces, loadFace: THREE.FontUtils.loadFace };/**\n\
 * @author zz85 / http://www.lab4games.net/zz85/blog\n\
 * Extensible curve object\n\
 *\n\
 * Some common of Curve methods\n\
 * .getPoint(t), getTangent(t)\n\
 * .getPointAt(u), getTagentAt(u)\n\
 * .getPoints(), .getSpacedPoints()\n\
 * .getLength()\n\
 * .updateArcLengths()\n\
 *\n\
 * This file contains following classes:\n\
 *\n\
 * -- 2d classes --\n\
 * THREE.Curve\n\
 * THREE.LineCurve\n\
 * THREE.QuadraticBezierCurve\n\
 * THREE.CubicBezierCurve\n\
 * THREE.SplineCurve\n\
 * THREE.ArcCurve\n\
 * THREE.EllipseCurve\n\
 *\n\
 * -- 3d classes --\n\
 * THREE.LineCurve3\n\
 * THREE.QuadraticBezierCurve3\n\
 * THREE.CubicBezierCurve3\n\
 * THREE.SplineCurve3\n\
 * THREE.ClosedSplineCurve3\n\
 *\n\
 * A series of curves can be represented as a THREE.CurvePath\n\
 *\n\
 **/\n\
\n\
/**************************************************************\n\
 *\tAbstract Curve base class\n\
 **************************************************************/\n\
\n\
THREE.Curve = function () {\n\
\n\
};\n\
\n\
// Virtual base class method to overwrite and implement in subclasses\n\
//\t- t [0 .. 1]\n\
\n\
THREE.Curve.prototype.getPoint = function ( t ) {\n\
\n\
\tconsole.log( \"Warning, getPoint() not implemented!\" );\n\
\treturn null;\n\
\n\
};\n\
\n\
// Get point at relative position in curve according to arc length\n\
// - u [0 .. 1]\n\
\n\
THREE.Curve.prototype.getPointAt = function ( u ) {\n\
\n\
\tvar t = this.getUtoTmapping( u );\n\
\treturn this.getPoint( t );\n\
\n\
};\n\
\n\
// Get sequence of points using getPoint( t )\n\
\n\
THREE.Curve.prototype.getPoints = function ( divisions ) {\n\
\n\
\tif ( !divisions ) divisions = 5;\n\
\n\
\tvar d, pts = [];\n\
\n\
\tfor ( d = 0; d <= divisions; d ++ ) {\n\
\n\
\t\tpts.push( this.getPoint( d / divisions ) );\n\
\n\
\t}\n\
\n\
\treturn pts;\n\
\n\
};\n\
\n\
// Get sequence of points using getPointAt( u )\n\
\n\
THREE.Curve.prototype.getSpacedPoints = function ( divisions ) {\n\
\n\
\tif ( !divisions ) divisions = 5;\n\
\n\
\tvar d, pts = [];\n\
\n\
\tfor ( d = 0; d <= divisions; d ++ ) {\n\
\n\
\t\tpts.push( this.getPointAt( d / divisions ) );\n\
\n\
\t}\n\
\n\
\treturn pts;\n\
\n\
};\n\
\n\
// Get total curve arc length\n\
\n\
THREE.Curve.prototype.getLength = function () {\n\
\n\
\tvar lengths = this.getLengths();\n\
\treturn lengths[ lengths.length - 1 ];\n\
\n\
};\n\
\n\
// Get list of cumulative segment lengths\n\
\n\
THREE.Curve.prototype.getLengths = function ( divisions ) {\n\
\n\
\tif ( !divisions ) divisions = (this.__arcLengthDivisions) ? (this.__arcLengthDivisions): 200;\n\
\n\
\tif ( this.cacheArcLengths\n\
\t\t&& ( this.cacheArcLengths.length == divisions + 1 )\n\
\t\t&& !this.needsUpdate) {\n\
\n\
\t\t//console.log( \"cached\", this.cacheArcLengths );\n\
\t\treturn this.cacheArcLengths;\n\
\n\
\t}\n\
\n\
\tthis.needsUpdate = false;\n\
\n\
\tvar cache = [];\n\
\tvar current, last = this.getPoint( 0 );\n\
\tvar p, sum = 0;\n\
\n\
\tcache.push( 0 );\n\
\n\
\tfor ( p = 1; p <= divisions; p ++ ) {\n\
\n\
\t\tcurrent = this.getPoint ( p / divisions );\n\
\t\tsum += current.distanceTo( last );\n\
\t\tcache.push( sum );\n\
\t\tlast = current;\n\
\n\
\t}\n\
\n\
\tthis.cacheArcLengths = cache;\n\
\n\
\treturn cache; // { sums: cache, sum:sum }; Sum is in the last element.\n\
\n\
};\n\
\n\
\n\
THREE.Curve.prototype.updateArcLengths = function() {\n\
\tthis.needsUpdate = true;\n\
\tthis.getLengths();\n\
};\n\
\n\
// Given u ( 0 .. 1 ), get a t to find p. This gives you points which are equi distance\n\
\n\
THREE.Curve.prototype.getUtoTmapping = function ( u, distance ) {\n\
\n\
\tvar arcLengths = this.getLengths();\n\
\n\
\tvar i = 0, il = arcLengths.length;\n\
\n\
\tvar targetArcLength; // The targeted u distance value to get\n\
\n\
\tif ( distance ) {\n\
\n\
\t\ttargetArcLength = distance;\n\
\n\
\t} else {\n\
\n\
\t\ttargetArcLength = u * arcLengths[ il - 1 ];\n\
\n\
\t}\n\
\n\
\t//var time = Date.now();\n\
\n\
\t// binary search for the index with largest value smaller than target u distance\n\
\n\
\tvar low = 0, high = il - 1, comparison;\n\
\n\
\twhile ( low <= high ) {\n\
\n\
\t\ti = Math.floor( low + ( high - low ) / 2 ); // less likely to overflow, though probably not issue here, JS doesn't really have integers, all numbers are floats\n\
\n\
\t\tcomparison = arcLengths[ i ] - targetArcLength;\n\
\n\
\t\tif ( comparison < 0 ) {\n\
\n\
\t\t\tlow = i + 1;\n\
\t\t\tcontinue;\n\
\n\
\t\t} else if ( comparison > 0 ) {\n\
\n\
\t\t\thigh = i - 1;\n\
\t\t\tcontinue;\n\
\n\
\t\t} else {\n\
\n\
\t\t\thigh = i;\n\
\t\t\tbreak;\n\
\n\
\t\t\t// DONE\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\ti = high;\n\
\n\
\t//console.log('b' , i, low, high, Date.now()- time);\n\
\n\
\tif ( arcLengths[ i ] == targetArcLength ) {\n\
\n\
\t\tvar t = i / ( il - 1 );\n\
\t\treturn t;\n\
\n\
\t}\n\
\n\
\t// we could get finer grain at lengths, or use simple interpolatation between two points\n\
\n\
\tvar lengthBefore = arcLengths[ i ];\n\
    var lengthAfter = arcLengths[ i + 1 ];\n\
\n\
    var segmentLength = lengthAfter - lengthBefore;\n\
\n\
    // determine where we are between the 'before' and 'after' points\n\
\n\
    var segmentFraction = ( targetArcLength - lengthBefore ) / segmentLength;\n\
\n\
    // add that fractional amount to t\n\
\n\
    var t = ( i + segmentFraction ) / ( il -1 );\n\
\n\
\treturn t;\n\
\n\
};\n\
\n\
\n\
// In 2D space, there are actually 2 normal vectors,\n\
// and in 3D space, infinte\n\
// TODO this should be depreciated.\n\
THREE.Curve.prototype.getNormalVector = function( t ) {\n\
\n\
\tvar vec = this.getTangent( t );\n\
\n\
\treturn new THREE.Vector2( -vec.y , vec.x );\n\
\n\
};\n\
\n\
// Returns a unit vector tangent at t\n\
// In case any sub curve does not implement its tangent / normal finding,\n\
// we get 2 points with a small delta and find a gradient of the 2 points\n\
// which seems to make a reasonable approximation\n\
\n\
THREE.Curve.prototype.getTangent = function( t ) {\n\
\n\
\tvar delta = 0.0001;\n\
\tvar t1 = t - delta;\n\
\tvar t2 = t + delta;\n\
\n\
\t// Capping in case of danger\n\
\n\
\tif ( t1 < 0 ) t1 = 0;\n\
\tif ( t2 > 1 ) t2 = 1;\n\
\n\
\tvar pt1 = this.getPoint( t1 );\n\
\tvar pt2 = this.getPoint( t2 );\n\
\t\n\
\tvar vec = pt2.clone().subSelf(pt1);\n\
\treturn vec.normalize();\n\
\n\
};\n\
\n\
\n\
THREE.Curve.prototype.getTangentAt = function ( u ) {\n\
\n\
\tvar t = this.getUtoTmapping( u );\n\
\treturn this.getTangent( t );\n\
\n\
};\n\
\n\
/**************************************************************\n\
 *\tLine\n\
 **************************************************************/\n\
\n\
THREE.LineCurve = function ( v1, v2 ) {\n\
\n\
\tthis.v1 = v1;\n\
\tthis.v2 = v2;\n\
\n\
};\n\
\n\
THREE.LineCurve.prototype = Object.create( THREE.Curve.prototype );\n\
\n\
THREE.LineCurve.prototype.getPoint = function ( t ) {\n\
\n\
\tvar point = this.v2.clone().subSelf(this.v1);\n\
\tpoint.multiplyScalar( t ).addSelf( this.v1 );\n\
\n\
\treturn point;\n\
\n\
};\n\
\n\
// Line curve is linear, so we can overwrite default getPointAt\n\
\n\
THREE.LineCurve.prototype.getPointAt = function ( u ) {\n\
\n\
\treturn this.getPoint( u );\n\
\n\
};\n\
\n\
THREE.LineCurve.prototype.getTangent = function( t ) {\n\
\n\
\tvar tangent = this.v2.clone().subSelf(this.v1);\n\
\n\
\treturn tangent.normalize();\n\
\n\
};\n\
\n\
/**************************************************************\n\
 *\tQuadratic Bezier curve\n\
 **************************************************************/\n\
\n\
\n\
THREE.QuadraticBezierCurve = function ( v0, v1, v2 ) {\n\
\n\
\tthis.v0 = v0;\n\
\tthis.v1 = v1;\n\
\tthis.v2 = v2;\n\
\n\
};\n\
\n\
THREE.QuadraticBezierCurve.prototype = Object.create( THREE.Curve.prototype );\n\
\n\
\n\
THREE.QuadraticBezierCurve.prototype.getPoint = function ( t ) {\n\
\n\
\tvar tx, ty;\n\
\n\
\ttx = THREE.Shape.Utils.b2( t, this.v0.x, this.v1.x, this.v2.x );\n\
\tty = THREE.Shape.Utils.b2( t, this.v0.y, this.v1.y, this.v2.y );\n\
\n\
\treturn new THREE.Vector2( tx, ty );\n\
\n\
};\n\
\n\
\n\
THREE.QuadraticBezierCurve.prototype.getTangent = function( t ) {\n\
\n\
\tvar tx, ty;\n\
\n\
\ttx = THREE.Curve.Utils.tangentQuadraticBezier( t, this.v0.x, this.v1.x, this.v2.x );\n\
\tty = THREE.Curve.Utils.tangentQuadraticBezier( t, this.v0.y, this.v1.y, this.v2.y );\n\
\n\
\t// returns unit vector\n\
\n\
\tvar tangent = new THREE.Vector2( tx, ty );\n\
\ttangent.normalize();\n\
\n\
\treturn tangent;\n\
\n\
};\n\
\n\
\n\
/**************************************************************\n\
 *\tCubic Bezier curve\n\
 **************************************************************/\n\
\n\
THREE.CubicBezierCurve = function ( v0, v1, v2, v3 ) {\n\
\n\
\tthis.v0 = v0;\n\
\tthis.v1 = v1;\n\
\tthis.v2 = v2;\n\
\tthis.v3 = v3;\n\
\n\
};\n\
\n\
THREE.CubicBezierCurve.prototype = Object.create( THREE.Curve.prototype );\n\
\n\
THREE.CubicBezierCurve.prototype.getPoint = function ( t ) {\n\
\n\
\tvar tx, ty;\n\
\n\
\ttx = THREE.Shape.Utils.b3( t, this.v0.x, this.v1.x, this.v2.x, this.v3.x );\n\
\tty = THREE.Shape.Utils.b3( t, this.v0.y, this.v1.y, this.v2.y, this.v3.y );\n\
\n\
\treturn new THREE.Vector2( tx, ty );\n\
\n\
};\n\
\n\
THREE.CubicBezierCurve.prototype.getTangent = function( t ) {\n\
\n\
\tvar tx, ty;\n\
\n\
\ttx = THREE.Curve.Utils.tangentCubicBezier( t, this.v0.x, this.v1.x, this.v2.x, this.v3.x );\n\
\tty = THREE.Curve.Utils.tangentCubicBezier( t, this.v0.y, this.v1.y, this.v2.y, this.v3.y );\n\
\n\
\tvar tangent = new THREE.Vector2( tx, ty );\n\
\ttangent.normalize();\n\
\n\
\treturn tangent;\n\
\n\
};\n\
\n\
\n\
/**************************************************************\n\
 *\tSpline curve\n\
 **************************************************************/\n\
\n\
THREE.SplineCurve = function ( points /* array of Vector2 */ ) {\n\
\n\
\tthis.points = (points == undefined) ? [] : points;\n\
\n\
};\n\
\n\
THREE.SplineCurve.prototype = Object.create( THREE.Curve.prototype );\n\
\n\
THREE.SplineCurve.prototype.getPoint = function ( t ) {\n\
\n\
\tvar v = new THREE.Vector2();\n\
\tvar c = [];\n\
\tvar points = this.points, point, intPoint, weight;\n\
\tpoint = ( points.length - 1 ) * t;\n\
\n\
\tintPoint = Math.floor( point );\n\
\tweight = point - intPoint;\n\
\n\
\tc[ 0 ] = intPoint == 0 ? intPoint : intPoint - 1;\n\
\tc[ 1 ] = intPoint;\n\
\tc[ 2 ] = intPoint  > points.length - 2 ? points.length -1 : intPoint + 1;\n\
\tc[ 3 ] = intPoint  > points.length - 3 ? points.length -1 : intPoint + 2;\n\
\n\
\tv.x = THREE.Curve.Utils.interpolate( points[ c[ 0 ] ].x, points[ c[ 1 ] ].x, points[ c[ 2 ] ].x, points[ c[ 3 ] ].x, weight );\n\
\tv.y = THREE.Curve.Utils.interpolate( points[ c[ 0 ] ].y, points[ c[ 1 ] ].y, points[ c[ 2 ] ].y, points[ c[ 3 ] ].y, weight );\n\
\n\
\treturn v;\n\
\n\
};\n\
\n\
/**************************************************************\n\
 *\tEllipse curve\n\
 **************************************************************/\n\
\n\
THREE.EllipseCurve = function ( aX, aY, xRadius, yRadius,\n\
\t\t\t\t\t\t\taStartAngle, aEndAngle,\n\
\t\t\t\t\t\t\taClockwise ) {\n\
\n\
\tthis.aX = aX;\n\
\tthis.aY = aY;\n\
\n\
\tthis.xRadius = xRadius;\n\
\tthis.yRadius = yRadius;\n\
\n\
\tthis.aStartAngle = aStartAngle;\n\
\tthis.aEndAngle = aEndAngle;\n\
\n\
\tthis.aClockwise = aClockwise;\n\
\n\
};\n\
\n\
THREE.EllipseCurve.prototype = Object.create( THREE.Curve.prototype );\n\
\n\
THREE.EllipseCurve.prototype.getPoint = function ( t ) {\n\
\n\
\tvar deltaAngle = this.aEndAngle - this.aStartAngle;\n\
\n\
\tif ( !this.aClockwise ) {\n\
\n\
\t\tt = 1 - t;\n\
\n\
\t}\n\
\n\
\tvar angle = this.aStartAngle + t * deltaAngle;\n\
\n\
\tvar tx = this.aX + this.xRadius * Math.cos( angle );\n\
\tvar ty = this.aY + this.yRadius * Math.sin( angle );\n\
\n\
\treturn new THREE.Vector2( tx, ty );\n\
\n\
};\n\
\n\
/**************************************************************\n\
 *\tArc curve\n\
 **************************************************************/\n\
\n\
THREE.ArcCurve = function ( aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise ) {\n\
\n\
\tTHREE.EllipseCurve.call( this, aX, aY, aRadius, aRadius, aStartAngle, aEndAngle, aClockwise );\n\
};\n\
\n\
THREE.ArcCurve.prototype = Object.create( THREE.EllipseCurve.prototype );\n\
\n\
\n\
/**************************************************************\n\
 *\tUtils\n\
 **************************************************************/\n\
\n\
THREE.Curve.Utils = {\n\
\n\
\ttangentQuadraticBezier: function ( t, p0, p1, p2 ) {\n\
\n\
\t\treturn 2 * ( 1 - t ) * ( p1 - p0 ) + 2 * t * ( p2 - p1 );\n\
\n\
\t},\n\
\n\
\t// Puay Bing, thanks for helping with this derivative!\n\
\n\
\ttangentCubicBezier: function (t, p0, p1, p2, p3 ) {\n\
\n\
\t\treturn -3 * p0 * (1 - t) * (1 - t)  +\n\
\t\t\t3 * p1 * (1 - t) * (1-t) - 6 *t *p1 * (1-t) +\n\
\t\t\t6 * t *  p2 * (1-t) - 3 * t * t * p2 +\n\
\t\t\t3 * t * t * p3;\n\
\t},\n\
\n\
\n\
\ttangentSpline: function ( t, p0, p1, p2, p3 ) {\n\
\n\
\t\t// To check if my formulas are correct\n\
\n\
\t\tvar h00 = 6 * t * t - 6 * t; \t// derived from 2t^3 − 3t^2 + 1\n\
\t\tvar h10 = 3 * t * t - 4 * t + 1; // t^3 − 2t^2 + t\n\
\t\tvar h01 = -6 * t * t + 6 * t; \t// − 2t3 + 3t2\n\
\t\tvar h11 = 3 * t * t - 2 * t;\t// t3 − t2\n\
\n\
\t\treturn h00 + h10 + h01 + h11;\n\
\n\
\t},\n\
\n\
\t// Catmull-Rom\n\
\n\
\tinterpolate: function( p0, p1, p2, p3, t ) {\n\
\n\
\t\tvar v0 = ( p2 - p0 ) * 0.5;\n\
\t\tvar v1 = ( p3 - p1 ) * 0.5;\n\
\t\tvar t2 = t * t;\n\
\t\tvar t3 = t * t2;\n\
\t\treturn ( 2 * p1 - 2 * p2 + v0 + v1 ) * t3 + ( - 3 * p1 + 3 * p2 - 2 * v0 - v1 ) * t2 + v0 * t + p1;\n\
\n\
\t}\n\
\n\
};\n\
\n\
\n\
// TODO: Transformation for Curves?\n\
\n\
/**************************************************************\n\
 *\t3D Curves\n\
 **************************************************************/\n\
\n\
// A Factory method for creating new curve subclasses\n\
\n\
THREE.Curve.create = function ( constructor, getPointFunc ) {\n\
\n\
\tconstructor.prototype = Object.create( THREE.Curve.prototype );\n\
\tconstructor.prototype.getPoint = getPointFunc;\n\
\n\
\treturn constructor;\n\
\n\
};\n\
\n\
\n\
/**************************************************************\n\
 *\tLine3D\n\
 **************************************************************/\n\
\n\
THREE.LineCurve3 = THREE.Curve.create(\n\
\n\
\tfunction ( v1, v2 ) {\n\
\n\
\t\tthis.v1 = v1;\n\
\t\tthis.v2 = v2;\n\
\n\
\t},\n\
\n\
\tfunction ( t ) {\n\
\n\
\t\tvar r = new THREE.Vector3();\n\
\n\
\n\
\t\tr.sub( this.v2, this.v1 ); // diff\n\
\t\tr.multiplyScalar( t );\n\
\t\tr.addSelf( this.v1 );\n\
\n\
\t\treturn r;\n\
\n\
\t}\n\
\n\
);\n\
\n\
\n\
/**************************************************************\n\
 *\tQuadratic Bezier 3D curve\n\
 **************************************************************/\n\
\n\
THREE.QuadraticBezierCurve3 = THREE.Curve.create(\n\
\n\
\tfunction ( v0, v1, v2 ) {\n\
\n\
\t\tthis.v0 = v0;\n\
\t\tthis.v1 = v1;\n\
\t\tthis.v2 = v2;\n\
\n\
\t},\n\
\n\
\tfunction ( t ) {\n\
\n\
\t\tvar tx, ty, tz;\n\
\n\
\t\ttx = THREE.Shape.Utils.b2( t, this.v0.x, this.v1.x, this.v2.x );\n\
\t\tty = THREE.Shape.Utils.b2( t, this.v0.y, this.v1.y, this.v2.y );\n\
\t\ttz = THREE.Shape.Utils.b2( t, this.v0.z, this.v1.z, this.v2.z );\n\
\n\
\t\treturn new THREE.Vector3( tx, ty, tz );\n\
\n\
\t}\n\
\n\
);\n\
\n\
\n\
\n\
/**************************************************************\n\
 *\tCubic Bezier 3D curve\n\
 **************************************************************/\n\
\n\
THREE.CubicBezierCurve3 = THREE.Curve.create(\n\
\n\
\tfunction ( v0, v1, v2, v3 ) {\n\
\n\
\t\tthis.v0 = v0;\n\
\t\tthis.v1 = v1;\n\
\t\tthis.v2 = v2;\n\
\t\tthis.v3 = v3;\n\
\n\
\t},\n\
\n\
\tfunction ( t ) {\n\
\n\
\t\tvar tx, ty, tz;\n\
\n\
\t\ttx = THREE.Shape.Utils.b3( t, this.v0.x, this.v1.x, this.v2.x, this.v3.x );\n\
\t\tty = THREE.Shape.Utils.b3( t, this.v0.y, this.v1.y, this.v2.y, this.v3.y );\n\
\t\ttz = THREE.Shape.Utils.b3( t, this.v0.z, this.v1.z, this.v2.z, this.v3.z );\n\
\n\
\t\treturn new THREE.Vector3( tx, ty, tz );\n\
\n\
\t}\n\
\n\
);\n\
\n\
\n\
\n\
/**************************************************************\n\
 *\tSpline 3D curve\n\
 **************************************************************/\n\
\n\
\n\
THREE.SplineCurve3 = THREE.Curve.create(\n\
\n\
\tfunction ( points /* array of Vector3 */) {\n\
\n\
\t\tthis.points = (points == undefined) ? [] : points;\n\
\n\
\t},\n\
\n\
\tfunction ( t ) {\n\
\n\
\t\tvar v = new THREE.Vector3();\n\
\t\tvar c = [];\n\
\t\tvar points = this.points, point, intPoint, weight;\n\
\t\tpoint = ( points.length - 1 ) * t;\n\
\n\
\t\tintPoint = Math.floor( point );\n\
\t\tweight = point - intPoint;\n\
\n\
\t\tc[ 0 ] = intPoint == 0 ? intPoint : intPoint - 1;\n\
\t\tc[ 1 ] = intPoint;\n\
\t\tc[ 2 ] = intPoint  > points.length - 2 ? points.length - 1 : intPoint + 1;\n\
\t\tc[ 3 ] = intPoint  > points.length - 3 ? points.length - 1 : intPoint + 2;\n\
\n\
\t\tvar pt0 = points[ c[0] ],\n\
\t\t\tpt1 = points[ c[1] ],\n\
\t\t\tpt2 = points[ c[2] ],\n\
\t\t\tpt3 = points[ c[3] ];\n\
\n\
\t\tv.x = THREE.Curve.Utils.interpolate(pt0.x, pt1.x, pt2.x, pt3.x, weight);\n\
\t\tv.y = THREE.Curve.Utils.interpolate(pt0.y, pt1.y, pt2.y, pt3.y, weight);\n\
\t\tv.z = THREE.Curve.Utils.interpolate(pt0.z, pt1.z, pt2.z, pt3.z, weight);\n\
\n\
\t\treturn v;\n\
\n\
\t}\n\
\n\
);\n\
\n\
\n\
// THREE.SplineCurve3.prototype.getTangent = function(t) {\n\
// \t\tvar v = new THREE.Vector3();\n\
// \t\tvar c = [];\n\
// \t\tvar points = this.points, point, intPoint, weight;\n\
// \t\tpoint = ( points.length - 1 ) * t;\n\
\n\
// \t\tintPoint = Math.floor( point );\n\
// \t\tweight = point - intPoint;\n\
\n\
// \t\tc[ 0 ] = intPoint == 0 ? intPoint : intPoint - 1;\n\
// \t\tc[ 1 ] = intPoint;\n\
// \t\tc[ 2 ] = intPoint  > points.length - 2 ? points.length - 1 : intPoint + 1;\n\
// \t\tc[ 3 ] = intPoint  > points.length - 3 ? points.length - 1 : intPoint + 2;\n\
\n\
// \t\tvar pt0 = points[ c[0] ],\n\
// \t\t\tpt1 = points[ c[1] ],\n\
// \t\t\tpt2 = points[ c[2] ],\n\
// \t\t\tpt3 = points[ c[3] ];\n\
\n\
// \t// t = weight;\n\
// \tv.x = THREE.Curve.Utils.tangentSpline( t, pt0.x, pt1.x, pt2.x, pt3.x );\n\
// \tv.y = THREE.Curve.Utils.tangentSpline( t, pt0.y, pt1.y, pt2.y, pt3.y );\n\
// \tv.z = THREE.Curve.Utils.tangentSpline( t, pt0.z, pt1.z, pt2.z, pt3.z );\n\
\n\
// \treturn v;\n\
\t\t\n\
// }\n\
\n\
/**************************************************************\n\
 *\tClosed Spline 3D curve\n\
 **************************************************************/\n\
\n\
\n\
THREE.ClosedSplineCurve3 = THREE.Curve.create(\n\
\n\
\tfunction ( points /* array of Vector3 */) {\n\
\n\
\t\tthis.points = (points == undefined) ? [] : points;\n\
\n\
\t},\n\
\n\
    function ( t ) {\n\
\n\
        var v = new THREE.Vector3();\n\
        var c = [];\n\
        var points = this.points, point, intPoint, weight;\n\
        point = ( points.length - 0 ) * t;\n\
            // This needs to be from 0-length +1\n\
\n\
        intPoint = Math.floor( point );\n\
        weight = point - intPoint;\n\
\n\
        intPoint += intPoint > 0 ? 0 : ( Math.floor( Math.abs( intPoint ) / points.length ) + 1 ) * points.length;\n\
        c[ 0 ] = ( intPoint - 1 ) % points.length;\n\
        c[ 1 ] = ( intPoint ) % points.length;\n\
        c[ 2 ] = ( intPoint + 1 ) % points.length;\n\
        c[ 3 ] = ( intPoint + 2 ) % points.length;\n\
\n\
        v.x = THREE.Curve.Utils.interpolate( points[ c[ 0 ] ].x, points[ c[ 1 ] ].x, points[ c[ 2 ] ].x, points[ c[ 3 ] ].x, weight );\n\
        v.y = THREE.Curve.Utils.interpolate( points[ c[ 0 ] ].y, points[ c[ 1 ] ].y, points[ c[ 2 ] ].y, points[ c[ 3 ] ].y, weight );\n\
        v.z = THREE.Curve.Utils.interpolate( points[ c[ 0 ] ].z, points[ c[ 1 ] ].z, points[ c[ 2 ] ].z, points[ c[ 3 ] ].z, weight );\n\
\n\
        return v;\n\
\n\
    }\n\
\n\
);\n\
/**\n\
 * @author zz85 / http://www.lab4games.net/zz85/blog\n\
 *\n\
 **/\n\
\n\
/**************************************************************\n\
 *\tCurved Path - a curve path is simply a array of connected\n\
 *  curves, but retains the api of a curve\n\
 **************************************************************/\n\
\n\
THREE.CurvePath = function () {\n\
\n\
\tthis.curves = [];\n\
\tthis.bends = [];\n\
\t\n\
\tthis.autoClose = false; // Automatically closes the path\n\
};\n\
\n\
THREE.CurvePath.prototype = Object.create( THREE.Curve.prototype );\n\
\n\
THREE.CurvePath.prototype.add = function ( curve ) {\n\
\n\
\tthis.curves.push( curve );\n\
\n\
};\n\
\n\
THREE.CurvePath.prototype.checkConnection = function() {\n\
\t// TODO\n\
\t// If the ending of curve is not connected to the starting\n\
\t// or the next curve, then, this is not a real path\n\
};\n\
\n\
THREE.CurvePath.prototype.closePath = function() {\n\
\t// TODO Test\n\
\t// and verify for vector3 (needs to implement equals)\n\
\t// Add a line curve if start and end of lines are not connected\n\
\tvar startPoint = this.curves[0].getPoint(0);\n\
\tvar endPoint = this.curves[this.curves.length-1].getPoint(1);\n\
\t\n\
\tif (!startPoint.equals(endPoint)) {\n\
\t\tthis.curves.push( new THREE.LineCurve(endPoint, startPoint) );\n\
\t}\n\
\t\n\
};\n\
\n\
// To get accurate point with reference to\n\
// entire path distance at time t,\n\
// following has to be done:\n\
\n\
// 1. Length of each sub path have to be known\n\
// 2. Locate and identify type of curve\n\
// 3. Get t for the curve\n\
// 4. Return curve.getPointAt(t')\n\
\n\
THREE.CurvePath.prototype.getPoint = function( t ) {\n\
\n\
\tvar d = t * this.getLength();\n\
\tvar curveLengths = this.getCurveLengths();\n\
\tvar i = 0, diff, curve;\n\
\n\
\t// To think about boundaries points.\n\
\n\
\twhile ( i < curveLengths.length ) {\n\
\n\
\t\tif ( curveLengths[ i ] >= d ) {\n\
\n\
\t\t\tdiff = curveLengths[ i ] - d;\n\
\t\t\tcurve = this.curves[ i ];\n\
\n\
\t\t\tvar u = 1 - diff / curve.getLength();\n\
\n\
\t\t\treturn curve.getPointAt( u );\n\
\n\
\t\t\tbreak;\n\
\t\t}\n\
\n\
\t\ti ++;\n\
\n\
\t}\n\
\n\
\treturn null;\n\
\n\
\t// loop where sum != 0, sum > d , sum+1 <d\n\
\n\
};\n\
\n\
/*\n\
THREE.CurvePath.prototype.getTangent = function( t ) {\n\
};*/\n\
\n\
\n\
// We cannot use the default THREE.Curve getPoint() with getLength() because in\n\
// THREE.Curve, getLength() depends on getPoint() but in THREE.CurvePath\n\
// getPoint() depends on getLength\n\
\n\
THREE.CurvePath.prototype.getLength = function() {\n\
\n\
\tvar lens = this.getCurveLengths();\n\
\treturn lens[ lens.length - 1 ];\n\
\n\
};\n\
\n\
// Compute lengths and cache them\n\
// We cannot overwrite getLengths() because UtoT mapping uses it.\n\
\n\
THREE.CurvePath.prototype.getCurveLengths = function() {\n\
\n\
\t// We use cache values if curves and cache array are same length\n\
\n\
\tif ( this.cacheLengths && this.cacheLengths.length == this.curves.length ) {\n\
\n\
\t\treturn this.cacheLengths;\n\
\n\
\t};\n\
\n\
\t// Get length of subsurve\n\
\t// Push sums into cached array\n\
\n\
\tvar lengths = [], sums = 0;\n\
\tvar i, il = this.curves.length;\n\
\n\
\tfor ( i = 0; i < il; i ++ ) {\n\
\n\
\t\tsums += this.curves[ i ].getLength();\n\
\t\tlengths.push( sums );\n\
\n\
\t}\n\
\n\
\tthis.cacheLengths = lengths;\n\
\n\
\treturn lengths;\n\
\n\
};\n\
\n\
\n\
\n\
// Returns min and max coordinates, as well as centroid\n\
\n\
THREE.CurvePath.prototype.getBoundingBox = function () {\n\
\n\
\tvar points = this.getPoints();\n\
\n\
\tvar maxX, maxY, maxZ;\n\
\tvar minX, minY, minZ;\n\
\n\
\tmaxX = maxY = Number.NEGATIVE_INFINITY;\n\
\tminX = minY = Number.POSITIVE_INFINITY;\n\
\n\
\tvar p, i, il, sum;\n\
\n\
\tvar v3 = points[0] instanceof THREE.Vector3;\n\
\n\
\tsum = v3 ? new THREE.Vector3() : new THREE.Vector2();\n\
\n\
\tfor ( i = 0, il = points.length; i < il; i ++ ) {\n\
\n\
\t\tp = points[ i ];\n\
\n\
\t\tif ( p.x > maxX ) maxX = p.x;\n\
\t\telse if ( p.x < minX ) minX = p.x;\n\
\n\
\t\tif ( p.y > maxY ) maxY = p.y;\n\
\t\telse if ( p.y < minY ) minY = p.y;\n\
\n\
\t\tif (v3) {\n\
\n\
\t\t\tif ( p.z > maxZ ) maxZ = p.z;\n\
\t\t\telse if ( p.z < minZ ) minZ = p.z;\n\
\n\
\t\t}\n\
\n\
\t\tsum.addSelf( p );\n\
\n\
\t}\n\
\n\
\tvar ret = {\n\
\n\
\t\tminX: minX,\n\
\t\tminY: minY,\n\
\t\tmaxX: maxX,\n\
\t\tmaxY: maxY,\n\
\t\tcentroid: sum.divideScalar( il )\n\
\t\n\
\t};\n\
\n\
\tif (v3) {\n\
\n\
\t\tret.maxZ = maxZ;\n\
\t\tret.minZ = minZ;\n\
\t\n\
\t}\n\
\n\
\treturn ret;\n\
\n\
};\n\
\n\
/**************************************************************\n\
 *\tCreate Geometries Helpers\n\
 **************************************************************/\n\
\n\
/// Generate geometry from path points (for Line or ParticleSystem objects)\n\
\n\
THREE.CurvePath.prototype.createPointsGeometry = function( divisions ) {\n\
\n\
\tvar pts = this.getPoints( divisions, true );\n\
\treturn this.createGeometry( pts );\n\
\n\
};\n\
\n\
// Generate geometry from equidistance sampling along the path\n\
\n\
THREE.CurvePath.prototype.createSpacedPointsGeometry = function( divisions ) {\n\
\n\
\tvar pts = this.getSpacedPoints( divisions, true );\n\
\treturn this.createGeometry( pts );\n\
\n\
};\n\
\n\
THREE.CurvePath.prototype.createGeometry = function( points ) {\n\
\n\
\tvar geometry = new THREE.Geometry();\n\
\n\
\tfor ( var i = 0; i < points.length; i ++ ) {\n\
\n\
\t\tgeometry.vertices.push( new THREE.Vector3( points[ i ].x, points[ i ].y, points[ i ].z || 0) );\n\
\n\
\t}\n\
\n\
\treturn geometry;\n\
\n\
};\n\
\n\
\n\
/**************************************************************\n\
 *\tBend / Wrap Helper Methods\n\
 **************************************************************/\n\
\n\
// Wrap path / Bend modifiers?\n\
\n\
THREE.CurvePath.prototype.addWrapPath = function ( bendpath ) {\n\
\n\
\tthis.bends.push( bendpath );\n\
\n\
};\n\
\n\
THREE.CurvePath.prototype.getTransformedPoints = function( segments, bends ) {\n\
\n\
\tvar oldPts = this.getPoints( segments ); // getPoints getSpacedPoints\n\
\tvar i, il;\n\
\n\
\tif ( !bends ) {\n\
\n\
\t\tbends = this.bends;\n\
\n\
\t}\n\
\n\
\tfor ( i = 0, il = bends.length; i < il; i ++ ) {\n\
\n\
\t\toldPts = this.getWrapPoints( oldPts, bends[ i ] );\n\
\n\
\t}\n\
\n\
\treturn oldPts;\n\
\n\
};\n\
\n\
THREE.CurvePath.prototype.getTransformedSpacedPoints = function( segments, bends ) {\n\
\n\
\tvar oldPts = this.getSpacedPoints( segments );\n\
\n\
\tvar i, il;\n\
\n\
\tif ( !bends ) {\n\
\n\
\t\tbends = this.bends;\n\
\n\
\t}\n\
\n\
\tfor ( i = 0, il = bends.length; i < il; i ++ ) {\n\
\n\
\t\toldPts = this.getWrapPoints( oldPts, bends[ i ] );\n\
\n\
\t}\n\
\n\
\treturn oldPts;\n\
\n\
};\n\
\n\
// This returns getPoints() bend/wrapped around the contour of a path.\n\
// Read http://www.planetclegg.com/projects/WarpingTextToSplines.html\n\
\n\
THREE.CurvePath.prototype.getWrapPoints = function ( oldPts, path ) {\n\
\n\
\tvar bounds = this.getBoundingBox();\n\
\n\
\tvar i, il, p, oldX, oldY, xNorm;\n\
\n\
\tfor ( i = 0, il = oldPts.length; i < il; i ++ ) {\n\
\n\
\t\tp = oldPts[ i ];\n\
\n\
\t\toldX = p.x;\n\
\t\toldY = p.y;\n\
\n\
\t\txNorm = oldX / bounds.maxX;\n\
\n\
\t\t// If using actual distance, for length > path, requires line extrusions\n\
\t\t//xNorm = path.getUtoTmapping(xNorm, oldX); // 3 styles. 1) wrap stretched. 2) wrap stretch by arc length 3) warp by actual distance\n\
\n\
\t\txNorm = path.getUtoTmapping( xNorm, oldX );\n\
\n\
\t\t// check for out of bounds?\n\
\n\
\t\tvar pathPt = path.getPoint( xNorm );\n\
\t\tvar normal = path.getNormalVector( xNorm ).multiplyScalar( oldY );\n\
\n\
\t\tp.x = pathPt.x + normal.x;\n\
\t\tp.y = pathPt.y + normal.y;\n\
\n\
\t}\n\
\n\
\treturn oldPts;\n\
\n\
};\n\
\n\
/**\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.Gyroscope = function () {\n\
\n\
\tTHREE.Object3D.call( this );\n\
\n\
};\n\
\n\
THREE.Gyroscope.prototype = Object.create( THREE.Object3D.prototype );\n\
\n\
THREE.Gyroscope.prototype.updateMatrixWorld = function ( force ) {\n\
\n\
\tthis.matrixAutoUpdate && this.updateMatrix();\n\
\n\
\t// update matrixWorld\n\
\n\
\tif ( this.matrixWorldNeedsUpdate || force ) {\n\
\n\
\t\tif ( this.parent ) {\n\
\n\
\t\t\tthis.matrixWorld.multiply( this.parent.matrixWorld, this.matrix );\n\
\n\
\t\t\tthis.matrixWorld.decompose( this.translationWorld, this.rotationWorld, this.scaleWorld );\n\
\t\t\tthis.matrix.decompose( this.translationObject, this.rotationObject, this.scaleObject );\n\
\n\
\t\t\tthis.matrixWorld.compose( this.translationWorld, this.rotationObject, this.scaleWorld );\n\
\n\
\n\
\t\t} else {\n\
\n\
\t\t\tthis.matrixWorld.copy( this.matrix );\n\
\n\
\t\t}\n\
\n\
\n\
\t\tthis.matrixWorldNeedsUpdate = false;\n\
\n\
\t\tforce = true;\n\
\n\
\t}\n\
\n\
\t// update children\n\
\n\
\tfor ( var i = 0, l = this.children.length; i < l; i ++ ) {\n\
\n\
\t\tthis.children[ i ].updateMatrixWorld( force );\n\
\n\
\t}\n\
\n\
};\n\
\n\
THREE.Gyroscope.prototype.translationWorld = new THREE.Vector3();\n\
THREE.Gyroscope.prototype.translationObject = new THREE.Vector3();\n\
THREE.Gyroscope.prototype.rotationWorld = new THREE.Quaternion();\n\
THREE.Gyroscope.prototype.rotationObject = new THREE.Quaternion();\n\
THREE.Gyroscope.prototype.scaleWorld = new THREE.Vector3();\n\
THREE.Gyroscope.prototype.scaleObject = new THREE.Vector3();\n\
\n\
/**\n\
 * @author zz85 / http://www.lab4games.net/zz85/blog\n\
 * Creates free form 2d path using series of points, lines or curves.\n\
 *\n\
 **/\n\
\n\
THREE.Path = function ( points ) {\n\
\n\
\tTHREE.CurvePath.call(this);\n\
\n\
\tthis.actions = [];\n\
\n\
\tif ( points ) {\n\
\n\
\t\tthis.fromPoints( points );\n\
\n\
\t}\n\
\n\
};\n\
\n\
THREE.Path.prototype = Object.create( THREE.CurvePath.prototype );\n\
\n\
THREE.PathActions = {\n\
\n\
\tMOVE_TO: 'moveTo',\n\
\tLINE_TO: 'lineTo',\n\
\tQUADRATIC_CURVE_TO: 'quadraticCurveTo', // Bezier quadratic curve\n\
\tBEZIER_CURVE_TO: 'bezierCurveTo', \t\t// Bezier cubic curve\n\
\tCSPLINE_THRU: 'splineThru',\t\t\t\t// Catmull-rom spline\n\
\tARC: 'arc',\t\t\t\t\t\t\t\t// Circle\n\
\tELLIPSE: 'ellipse'\n\
};\n\
\n\
// TODO Clean up PATH API\n\
\n\
// Create path using straight lines to connect all points\n\
// - vectors: array of Vector2\n\
\n\
THREE.Path.prototype.fromPoints = function ( vectors ) {\n\
\n\
\tthis.moveTo( vectors[ 0 ].x, vectors[ 0 ].y );\n\
\n\
\tfor ( var v = 1, vlen = vectors.length; v < vlen; v ++ ) {\n\
\n\
\t\tthis.lineTo( vectors[ v ].x, vectors[ v ].y );\n\
\n\
\t};\n\
\n\
};\n\
\n\
// startPath() endPath()?\n\
\n\
THREE.Path.prototype.moveTo = function ( x, y ) {\n\
\n\
\tvar args = Array.prototype.slice.call( arguments );\n\
\tthis.actions.push( { action: THREE.PathActions.MOVE_TO, args: args } );\n\
\n\
};\n\
\n\
THREE.Path.prototype.lineTo = function ( x, y ) {\n\
\n\
\tvar args = Array.prototype.slice.call( arguments );\n\
\n\
\tvar lastargs = this.actions[ this.actions.length - 1 ].args;\n\
\n\
\tvar x0 = lastargs[ lastargs.length - 2 ];\n\
\tvar y0 = lastargs[ lastargs.length - 1 ];\n\
\n\
\tvar curve = new THREE.LineCurve( new THREE.Vector2( x0, y0 ), new THREE.Vector2( x, y ) );\n\
\tthis.curves.push( curve );\n\
\n\
\tthis.actions.push( { action: THREE.PathActions.LINE_TO, args: args } );\n\
\n\
};\n\
\n\
THREE.Path.prototype.quadraticCurveTo = function( aCPx, aCPy, aX, aY ) {\n\
\n\
\tvar args = Array.prototype.slice.call( arguments );\n\
\n\
\tvar lastargs = this.actions[ this.actions.length - 1 ].args;\n\
\n\
\tvar x0 = lastargs[ lastargs.length - 2 ];\n\
\tvar y0 = lastargs[ lastargs.length - 1 ];\n\
\n\
\tvar curve = new THREE.QuadraticBezierCurve( new THREE.Vector2( x0, y0 ),\n\
\t\t\t\t\t\t\t\t\t\t\t\tnew THREE.Vector2( aCPx, aCPy ),\n\
\t\t\t\t\t\t\t\t\t\t\t\tnew THREE.Vector2( aX, aY ) );\n\
\tthis.curves.push( curve );\n\
\n\
\tthis.actions.push( { action: THREE.PathActions.QUADRATIC_CURVE_TO, args: args } );\n\
\n\
};\n\
\n\
THREE.Path.prototype.bezierCurveTo = function( aCP1x, aCP1y,\n\
                                               aCP2x, aCP2y,\n\
                                               aX, aY ) {\n\
\n\
\tvar args = Array.prototype.slice.call( arguments );\n\
\n\
\tvar lastargs = this.actions[ this.actions.length - 1 ].args;\n\
\n\
\tvar x0 = lastargs[ lastargs.length - 2 ];\n\
\tvar y0 = lastargs[ lastargs.length - 1 ];\n\
\n\
\tvar curve = new THREE.CubicBezierCurve( new THREE.Vector2( x0, y0 ),\n\
\t\t\t\t\t\t\t\t\t\t\tnew THREE.Vector2( aCP1x, aCP1y ),\n\
\t\t\t\t\t\t\t\t\t\t\tnew THREE.Vector2( aCP2x, aCP2y ),\n\
\t\t\t\t\t\t\t\t\t\t\tnew THREE.Vector2( aX, aY ) );\n\
\tthis.curves.push( curve );\n\
\n\
\tthis.actions.push( { action: THREE.PathActions.BEZIER_CURVE_TO, args: args } );\n\
\n\
};\n\
\n\
THREE.Path.prototype.splineThru = function( pts /*Array of Vector*/ ) {\n\
\n\
\tvar args = Array.prototype.slice.call( arguments );\n\
\tvar lastargs = this.actions[ this.actions.length - 1 ].args;\n\
\n\
\tvar x0 = lastargs[ lastargs.length - 2 ];\n\
\tvar y0 = lastargs[ lastargs.length - 1 ];\n\
//---\n\
\tvar npts = [ new THREE.Vector2( x0, y0 ) ];\n\
\tArray.prototype.push.apply( npts, pts );\n\
\n\
\tvar curve = new THREE.SplineCurve( npts );\n\
\tthis.curves.push( curve );\n\
\n\
\tthis.actions.push( { action: THREE.PathActions.CSPLINE_THRU, args: args } );\n\
\n\
};\n\
\n\
// FUTURE: Change the API or follow canvas API?\n\
\n\
THREE.Path.prototype.arc = function ( aX, aY, aRadius,\n\
\t\t\t\t\t\t\t\t\t  aStartAngle, aEndAngle, aClockwise ) {\n\
\n\
\tvar lastargs = this.actions[ this.actions.length - 1].args;\n\
\tvar x0 = lastargs[ lastargs.length - 2 ];\n\
\tvar y0 = lastargs[ lastargs.length - 1 ];\n\
\n\
\tthis.absarc(aX + x0, aY + y0, aRadius,\n\
\t\taStartAngle, aEndAngle, aClockwise );\n\
\t\n\
 };\n\
\n\
 THREE.Path.prototype.absarc = function ( aX, aY, aRadius,\n\
\t\t\t\t\t\t\t\t\t  aStartAngle, aEndAngle, aClockwise ) {\n\
\tthis.absellipse(aX, aY, aRadius, aRadius, aStartAngle, aEndAngle, aClockwise);\n\
 };\n\
\n\
THREE.Path.prototype.ellipse = function ( aX, aY, xRadius, yRadius,\n\
\t\t\t\t\t\t\t\t\t  aStartAngle, aEndAngle, aClockwise ) {\n\
\n\
\tvar lastargs = this.actions[ this.actions.length - 1].args;\n\
\tvar x0 = lastargs[ lastargs.length - 2 ];\n\
\tvar y0 = lastargs[ lastargs.length - 1 ];\n\
\n\
\tthis.absellipse(aX + x0, aY + y0, xRadius, yRadius,\n\
\t\taStartAngle, aEndAngle, aClockwise );\n\
\n\
 };\n\
\n\
\n\
THREE.Path.prototype.absellipse = function ( aX, aY, xRadius, yRadius,\n\
\t\t\t\t\t\t\t\t\t  aStartAngle, aEndAngle, aClockwise ) {\n\
\n\
\tvar args = Array.prototype.slice.call( arguments );\n\
\tvar curve = new THREE.EllipseCurve( aX, aY, xRadius, yRadius,\n\
\t\t\t\t\t\t\t\t\taStartAngle, aEndAngle, aClockwise );\n\
\tthis.curves.push( curve );\n\
\n\
\tvar lastPoint = curve.getPoint(aClockwise ? 1 : 0);\n\
\targs.push(lastPoint.x);\n\
\targs.push(lastPoint.y);\n\
\n\
\tthis.actions.push( { action: THREE.PathActions.ELLIPSE, args: args } );\n\
\n\
 };\n\
\n\
THREE.Path.prototype.getSpacedPoints = function ( divisions, closedPath ) {\n\
\n\
\tif ( ! divisions ) divisions = 40;\n\
\n\
\tvar points = [];\n\
\n\
\tfor ( var i = 0; i < divisions; i ++ ) {\n\
\n\
\t\tpoints.push( this.getPoint( i / divisions ) );\n\
\n\
\t\t//if( !this.getPoint( i / divisions ) ) throw \"DIE\";\n\
\n\
\t}\n\
\n\
\t// if ( closedPath ) {\n\
\t//\n\
\t// \tpoints.push( points[ 0 ] );\n\
\t//\n\
\t// }\n\
\n\
\treturn points;\n\
\n\
};\n\
\n\
/* Return an array of vectors based on contour of the path */\n\
\n\
THREE.Path.prototype.getPoints = function( divisions, closedPath ) {\n\
\n\
\tif (this.useSpacedPoints) {\n\
\t\tconsole.log('tata');\n\
\t\treturn this.getSpacedPoints( divisions, closedPath );\n\
\t}\n\
\n\
\tdivisions = divisions || 12;\n\
\n\
\tvar points = [];\n\
\n\
\tvar i, il, item, action, args;\n\
\tvar cpx, cpy, cpx2, cpy2, cpx1, cpy1, cpx0, cpy0,\n\
\t\tlaste, j,\n\
\t\tt, tx, ty;\n\
\n\
\tfor ( i = 0, il = this.actions.length; i < il; i ++ ) {\n\
\n\
\t\titem = this.actions[ i ];\n\
\n\
\t\taction = item.action;\n\
\t\targs = item.args;\n\
\n\
\t\tswitch( action ) {\n\
\n\
\t\tcase THREE.PathActions.MOVE_TO:\n\
\n\
\t\t\tpoints.push( new THREE.Vector2( args[ 0 ], args[ 1 ] ) );\n\
\n\
\t\t\tbreak;\n\
\n\
\t\tcase THREE.PathActions.LINE_TO:\n\
\n\
\t\t\tpoints.push( new THREE.Vector2( args[ 0 ], args[ 1 ] ) );\n\
\n\
\t\t\tbreak;\n\
\n\
\t\tcase THREE.PathActions.QUADRATIC_CURVE_TO:\n\
\n\
\t\t\tcpx  = args[ 2 ];\n\
\t\t\tcpy  = args[ 3 ];\n\
\n\
\t\t\tcpx1 = args[ 0 ];\n\
\t\t\tcpy1 = args[ 1 ];\n\
\n\
\t\t\tif ( points.length > 0 ) {\n\
\n\
\t\t\t\tlaste = points[ points.length - 1 ];\n\
\n\
\t\t\t\tcpx0 = laste.x;\n\
\t\t\t\tcpy0 = laste.y;\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tlaste = this.actions[ i - 1 ].args;\n\
\n\
\t\t\t\tcpx0 = laste[ laste.length - 2 ];\n\
\t\t\t\tcpy0 = laste[ laste.length - 1 ];\n\
\n\
\t\t\t}\n\
\n\
\t\t\tfor ( j = 1; j <= divisions; j ++ ) {\n\
\n\
\t\t\t\tt = j / divisions;\n\
\n\
\t\t\t\ttx = THREE.Shape.Utils.b2( t, cpx0, cpx1, cpx );\n\
\t\t\t\tty = THREE.Shape.Utils.b2( t, cpy0, cpy1, cpy );\n\
\n\
\t\t\t\tpoints.push( new THREE.Vector2( tx, ty ) );\n\
\n\
\t\t  \t}\n\
\n\
\t\t\tbreak;\n\
\n\
\t\tcase THREE.PathActions.BEZIER_CURVE_TO:\n\
\n\
\t\t\tcpx  = args[ 4 ];\n\
\t\t\tcpy  = args[ 5 ];\n\
\n\
\t\t\tcpx1 = args[ 0 ];\n\
\t\t\tcpy1 = args[ 1 ];\n\
\n\
\t\t\tcpx2 = args[ 2 ];\n\
\t\t\tcpy2 = args[ 3 ];\n\
\n\
\t\t\tif ( points.length > 0 ) {\n\
\n\
\t\t\t\tlaste = points[ points.length - 1 ];\n\
\n\
\t\t\t\tcpx0 = laste.x;\n\
\t\t\t\tcpy0 = laste.y;\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tlaste = this.actions[ i - 1 ].args;\n\
\n\
\t\t\t\tcpx0 = laste[ laste.length - 2 ];\n\
\t\t\t\tcpy0 = laste[ laste.length - 1 ];\n\
\n\
\t\t\t}\n\
\n\
\n\
\t\t\tfor ( j = 1; j <= divisions; j ++ ) {\n\
\n\
\t\t\t\tt = j / divisions;\n\
\n\
\t\t\t\ttx = THREE.Shape.Utils.b3( t, cpx0, cpx1, cpx2, cpx );\n\
\t\t\t\tty = THREE.Shape.Utils.b3( t, cpy0, cpy1, cpy2, cpy );\n\
\n\
\t\t\t\tpoints.push( new THREE.Vector2( tx, ty ) );\n\
\n\
\t\t\t}\n\
\n\
\t\t\tbreak;\n\
\n\
\t\tcase THREE.PathActions.CSPLINE_THRU:\n\
\n\
\t\t\tlaste = this.actions[ i - 1 ].args;\n\
\n\
\t\t\tvar last = new THREE.Vector2( laste[ laste.length - 2 ], laste[ laste.length - 1 ] );\n\
\t\t\tvar spts = [ last ];\n\
\n\
\t\t\tvar n = divisions * args[ 0 ].length;\n\
\n\
\t\t\tspts = spts.concat( args[ 0 ] );\n\
\n\
\t\t\tvar spline = new THREE.SplineCurve( spts );\n\
\n\
\t\t\tfor ( j = 1; j <= n; j ++ ) {\n\
\n\
\t\t\t\tpoints.push( spline.getPointAt( j / n ) ) ;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tbreak;\n\
\n\
\t\tcase THREE.PathActions.ARC:\n\
\n\
\t\t\tvar aX = args[ 0 ], aY = args[ 1 ],\n\
\t\t\t\taRadius = args[ 2 ],\n\
\t\t\t\taStartAngle = args[ 3 ], aEndAngle = args[ 4 ],\n\
\t\t\t\taClockwise = !!args[ 5 ];\n\
\n\
\t\t\tvar deltaAngle = aEndAngle - aStartAngle;\n\
\t\t\tvar angle;\n\
\t\t\tvar tdivisions = divisions * 2;\n\
\n\
\t\t\tfor ( j = 1; j <= tdivisions; j ++ ) {\n\
\n\
\t\t\t\tt = j / tdivisions;\n\
\n\
\t\t\t\tif ( ! aClockwise ) {\n\
\n\
\t\t\t\t\tt = 1 - t;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tangle = aStartAngle + t * deltaAngle;\n\
\n\
\t\t\t\ttx = aX + aRadius * Math.cos( angle );\n\
\t\t\t\tty = aY + aRadius * Math.sin( angle );\n\
\n\
\t\t\t\t//console.log('t', t, 'angle', angle, 'tx', tx, 'ty', ty);\n\
\n\
\t\t\t\tpoints.push( new THREE.Vector2( tx, ty ) );\n\
\n\
\t\t\t}\n\
\n\
\t\t\t//console.log(points);\n\
\n\
\t\t  break;\n\
\t\t\n\
\t\tcase THREE.PathActions.ELLIPSE:\n\
\n\
\t\t\tvar aX = args[ 0 ], aY = args[ 1 ],\n\
\t\t\t\txRadius = args[ 2 ],\n\
\t\t\t\tyRadius = args[ 3 ],\n\
\t\t\t\taStartAngle = args[ 4 ], aEndAngle = args[ 5 ],\n\
\t\t\t\taClockwise = !!args[ 6 ];\n\
\n\
\n\
\t\t\tvar deltaAngle = aEndAngle - aStartAngle;\n\
\t\t\tvar angle;\n\
\t\t\tvar tdivisions = divisions * 2;\n\
\n\
\t\t\tfor ( j = 1; j <= tdivisions; j ++ ) {\n\
\n\
\t\t\t\tt = j / tdivisions;\n\
\n\
\t\t\t\tif ( ! aClockwise ) {\n\
\n\
\t\t\t\t\tt = 1 - t;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tangle = aStartAngle + t * deltaAngle;\n\
\n\
\t\t\t\ttx = aX + xRadius * Math.cos( angle );\n\
\t\t\t\tty = aY + yRadius * Math.sin( angle );\n\
\n\
\t\t\t\t//console.log('t', t, 'angle', angle, 'tx', tx, 'ty', ty);\n\
\n\
\t\t\t\tpoints.push( new THREE.Vector2( tx, ty ) );\n\
\n\
\t\t\t}\n\
\n\
\t\t\t//console.log(points);\n\
\n\
\t\t  break;\n\
\n\
\t\t} // end switch\n\
\n\
\t}\n\
\n\
\n\
\n\
\t// Normalize to remove the closing point by default.\n\
\tvar lastPoint = points[ points.length - 1];\n\
\tvar EPSILON = 0.0000000001;\n\
\tif ( Math.abs(lastPoint.x - points[ 0 ].x) < EPSILON &&\n\
             Math.abs(lastPoint.y - points[ 0 ].y) < EPSILON)\n\
\t\tpoints.splice( points.length - 1, 1);\n\
\tif ( closedPath ) {\n\
\n\
\t\tpoints.push( points[ 0 ] );\n\
\n\
\t}\n\
\n\
\treturn points;\n\
\n\
};\n\
\n\
// Breaks path into shapes\n\
\n\
THREE.Path.prototype.toShapes = function() {\n\
\n\
\tvar i, il, item, action, args;\n\
\n\
\tvar subPaths = [], lastPath = new THREE.Path();\n\
\n\
\tfor ( i = 0, il = this.actions.length; i < il; i ++ ) {\n\
\n\
\t\titem = this.actions[ i ];\n\
\n\
\t\targs = item.args;\n\
\t\taction = item.action;\n\
\n\
\t\tif ( action == THREE.PathActions.MOVE_TO ) {\n\
\n\
\t\t\tif ( lastPath.actions.length != 0 ) {\n\
\n\
\t\t\t\tsubPaths.push( lastPath );\n\
\t\t\t\tlastPath = new THREE.Path();\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tlastPath[ action ].apply( lastPath, args );\n\
\n\
\t}\n\
\n\
\tif ( lastPath.actions.length != 0 ) {\n\
\n\
\t\tsubPaths.push( lastPath );\n\
\n\
\t}\n\
\n\
\t// console.log(subPaths);\n\
\n\
\tif ( subPaths.length == 0 ) return [];\n\
\n\
\tvar tmpPath, tmpShape, shapes = [];\n\
\n\
\tvar holesFirst = !THREE.Shape.Utils.isClockWise( subPaths[ 0 ].getPoints() );\n\
\t// console.log(\"Holes first\", holesFirst);\n\
\n\
\tif ( subPaths.length == 1) {\n\
\t\ttmpPath = subPaths[0];\n\
\t\ttmpShape = new THREE.Shape();\n\
\t\ttmpShape.actions = tmpPath.actions;\n\
\t\ttmpShape.curves = tmpPath.curves;\n\
\t\tshapes.push( tmpShape );\n\
\t\treturn shapes;\n\
\t};\n\
\n\
\tif ( holesFirst ) {\n\
\n\
\t\ttmpShape = new THREE.Shape();\n\
\n\
\t\tfor ( i = 0, il = subPaths.length; i < il; i ++ ) {\n\
\n\
\t\t\ttmpPath = subPaths[ i ];\n\
\n\
\t\t\tif ( THREE.Shape.Utils.isClockWise( tmpPath.getPoints() ) ) {\n\
\n\
\t\t\t\ttmpShape.actions = tmpPath.actions;\n\
\t\t\t\ttmpShape.curves = tmpPath.curves;\n\
\n\
\t\t\t\tshapes.push( tmpShape );\n\
\t\t\t\ttmpShape = new THREE.Shape();\n\
\n\
\t\t\t\t//console.log('cw', i);\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\ttmpShape.holes.push( tmpPath );\n\
\n\
\t\t\t\t//console.log('ccw', i);\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t} else {\n\
\n\
\t\t// Shapes first\n\
\n\
\t\tfor ( i = 0, il = subPaths.length; i < il; i ++ ) {\n\
\n\
\t\t\ttmpPath = subPaths[ i ];\n\
\n\
\t\t\tif ( THREE.Shape.Utils.isClockWise( tmpPath.getPoints() ) ) {\n\
\n\
\n\
\t\t\t\tif ( tmpShape ) shapes.push( tmpShape );\n\
\n\
\t\t\t\ttmpShape = new THREE.Shape();\n\
\t\t\t\ttmpShape.actions = tmpPath.actions;\n\
\t\t\t\ttmpShape.curves = tmpPath.curves;\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\ttmpShape.holes.push( tmpPath );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tshapes.push( tmpShape );\n\
\n\
\t}\n\
\n\
\t//console.log(\"shape\", shapes);\n\
\n\
\treturn shapes;\n\
\n\
};\n\
/**\n\
 * @author zz85 / http://www.lab4games.net/zz85/blog\n\
 * Defines a 2d shape plane using paths.\n\
 **/\n\
\n\
// STEP 1 Create a path.\n\
// STEP 2 Turn path into shape.\n\
// STEP 3 ExtrudeGeometry takes in Shape/Shapes\n\
// STEP 3a - Extract points from each shape, turn to vertices\n\
// STEP 3b - Triangulate each shape, add faces.\n\
\n\
THREE.Shape = function ( ) {\n\
\n\
\tTHREE.Path.apply( this, arguments );\n\
\tthis.holes = [];\n\
\n\
};\n\
\n\
THREE.Shape.prototype = Object.create( THREE.Path.prototype );\n\
\n\
// Convenience method to return ExtrudeGeometry\n\
\n\
THREE.Shape.prototype.extrude = function ( options ) {\n\
\n\
\tvar extruded = new THREE.ExtrudeGeometry( this, options );\n\
\treturn extruded;\n\
\n\
};\n\
\n\
// Convenience method to return ShapeGeometry\n\
\n\
THREE.Shape.prototype.makeGeometry = function ( options ) {\n\
\n\
\tvar geometry = new THREE.ShapeGeometry( this, options );\n\
\treturn geometry;\n\
\n\
};\n\
\n\
// Get points of holes\n\
\n\
THREE.Shape.prototype.getPointsHoles = function ( divisions ) {\n\
\n\
\tvar i, il = this.holes.length, holesPts = [];\n\
\n\
\tfor ( i = 0; i < il; i ++ ) {\n\
\n\
\t\tholesPts[ i ] = this.holes[ i ].getTransformedPoints( divisions, this.bends );\n\
\n\
\t}\n\
\n\
\treturn holesPts;\n\
\n\
};\n\
\n\
// Get points of holes (spaced by regular distance)\n\
\n\
THREE.Shape.prototype.getSpacedPointsHoles = function ( divisions ) {\n\
\n\
\tvar i, il = this.holes.length, holesPts = [];\n\
\n\
\tfor ( i = 0; i < il; i ++ ) {\n\
\n\
\t\tholesPts[ i ] = this.holes[ i ].getTransformedSpacedPoints( divisions, this.bends );\n\
\n\
\t}\n\
\n\
\treturn holesPts;\n\
\n\
};\n\
\n\
\n\
// Get points of shape and holes (keypoints based on segments parameter)\n\
\n\
THREE.Shape.prototype.extractAllPoints = function ( divisions ) {\n\
\n\
\treturn {\n\
\n\
\t\tshape: this.getTransformedPoints( divisions ),\n\
\t\tholes: this.getPointsHoles( divisions )\n\
\n\
\t};\n\
\n\
};\n\
\n\
THREE.Shape.prototype.extractPoints = function ( divisions ) {\n\
\n\
\tif (this.useSpacedPoints) {\n\
\t\treturn this.extractAllSpacedPoints(divisions);\n\
\t}\n\
\n\
\treturn this.extractAllPoints(divisions);\n\
\n\
};\n\
\n\
//\n\
// THREE.Shape.prototype.extractAllPointsWithBend = function ( divisions, bend ) {\n\
//\n\
// \treturn {\n\
//\n\
// \t\tshape: this.transform( bend, divisions ),\n\
// \t\tholes: this.getPointsHoles( divisions, bend )\n\
//\n\
// \t};\n\
//\n\
// };\n\
\n\
// Get points of shape and holes (spaced by regular distance)\n\
\n\
THREE.Shape.prototype.extractAllSpacedPoints = function ( divisions ) {\n\
\n\
\treturn {\n\
\n\
\t\tshape: this.getTransformedSpacedPoints( divisions ),\n\
\t\tholes: this.getSpacedPointsHoles( divisions )\n\
\n\
\t};\n\
\n\
};\n\
\n\
/**************************************************************\n\
 *\tUtils\n\
 **************************************************************/\n\
\n\
THREE.Shape.Utils = {\n\
\n\
\t/*\n\
\t\tcontour - array of vector2 for contour\n\
\t\tholes   - array of array of vector2\n\
\t*/\n\
\n\
\tremoveHoles: function ( contour, holes ) {\n\
\n\
\t\tvar shape = contour.concat(); // work on this shape\n\
\t\tvar allpoints = shape.concat();\n\
\n\
\t\t/* For each isolated shape, find the closest points and break to the hole to allow triangulation */\n\
\n\
\n\
\t\tvar prevShapeVert, nextShapeVert,\n\
\t\t\tprevHoleVert, nextHoleVert,\n\
\t\t\tholeIndex, shapeIndex,\n\
\t\t\tshapeId, shapeGroup,\n\
\t\t\th, h2,\n\
\t\t\thole, shortest, d,\n\
\t\t\tp, pts1, pts2,\n\
\t\t\ttmpShape1, tmpShape2,\n\
\t\t\ttmpHole1, tmpHole2,\n\
\t\t\tverts = [];\n\
\n\
\t\tfor ( h = 0; h < holes.length; h ++ ) {\n\
\n\
\t\t\thole = holes[ h ];\n\
\n\
\t\t\t/*\n\
\t\t\tshapeholes[ h ].concat(); // preserves original\n\
\t\t\tholes.push( hole );\n\
\t\t\t*/\n\
\n\
\t\t\tArray.prototype.push.apply( allpoints, hole );\n\
\n\
\t\t\tshortest = Number.POSITIVE_INFINITY;\n\
\n\
\n\
\t\t\t// Find the shortest pair of pts between shape and hole\n\
\n\
\t\t\t// Note: Actually, I'm not sure now if we could optimize this to be faster than O(m*n)\n\
\t\t\t// Using distanceToSquared() intead of distanceTo() should speed a little\n\
\t\t\t// since running square roots operations are reduced.\n\
\n\
\t\t\tfor ( h2 = 0; h2 < hole.length; h2 ++ ) {\n\
\n\
\t\t\t\tpts1 = hole[ h2 ];\n\
\t\t\t\tvar dist = [];\n\
\n\
\t\t\t\tfor ( p = 0; p < shape.length; p++ ) {\n\
\n\
\t\t\t\t\tpts2 = shape[ p ];\n\
\t\t\t\t\td = pts1.distanceToSquared( pts2 );\n\
\t\t\t\t\tdist.push( d );\n\
\n\
\t\t\t\t\tif ( d < shortest ) {\n\
\n\
\t\t\t\t\t\tshortest = d;\n\
\t\t\t\t\t\tholeIndex = h2;\n\
\t\t\t\t\t\tshapeIndex = p;\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t\t//console.log(\"shortest\", shortest, dist);\n\
\n\
\t\t\tprevShapeVert = ( shapeIndex - 1 ) >= 0 ? shapeIndex - 1 : shape.length - 1;\n\
\t\t\tprevHoleVert = ( holeIndex - 1 ) >= 0 ? holeIndex - 1 : hole.length - 1;\n\
\n\
\t\t\tvar areaapts = [\n\
\n\
\t\t\t\thole[ holeIndex ],\n\
\t\t\t\tshape[ shapeIndex ],\n\
\t\t\t\tshape[ prevShapeVert ]\n\
\n\
\t\t\t];\n\
\n\
\t\t\tvar areaa = THREE.FontUtils.Triangulate.area( areaapts );\n\
\n\
\t\t\tvar areabpts = [\n\
\n\
\t\t\t\thole[ holeIndex ],\n\
\t\t\t\thole[ prevHoleVert ],\n\
\t\t\t\tshape[ shapeIndex ]\n\
\n\
\t\t\t];\n\
\n\
\t\t\tvar areab = THREE.FontUtils.Triangulate.area( areabpts );\n\
\n\
\t\t\tvar shapeOffset = 1;\n\
\t\t\tvar holeOffset = -1;\n\
\n\
\t\t\tvar oldShapeIndex = shapeIndex, oldHoleIndex = holeIndex;\n\
\t\t\tshapeIndex += shapeOffset;\n\
\t\t\tholeIndex += holeOffset;\n\
\n\
\t\t\tif ( shapeIndex < 0 ) { shapeIndex += shape.length;  }\n\
\t\t\tshapeIndex %= shape.length;\n\
\n\
\t\t\tif ( holeIndex < 0 ) { holeIndex += hole.length;  }\n\
\t\t\tholeIndex %= hole.length;\n\
\n\
\t\t\tprevShapeVert = ( shapeIndex - 1 ) >= 0 ? shapeIndex - 1 : shape.length - 1;\n\
\t\t\tprevHoleVert = ( holeIndex - 1 ) >= 0 ? holeIndex - 1 : hole.length - 1;\n\
\n\
\t\t\tareaapts = [\n\
\n\
\t\t\t\thole[ holeIndex ],\n\
\t\t\t\tshape[ shapeIndex ],\n\
\t\t\t\tshape[ prevShapeVert ]\n\
\n\
\t\t\t];\n\
\n\
\t\t\tvar areaa2 = THREE.FontUtils.Triangulate.area( areaapts );\n\
\n\
\t\t\tareabpts = [\n\
\n\
\t\t\t\thole[ holeIndex ],\n\
\t\t\t\thole[ prevHoleVert ],\n\
\t\t\t\tshape[ shapeIndex ]\n\
\n\
\t\t\t];\n\
\n\
\t\t\tvar areab2 = THREE.FontUtils.Triangulate.area( areabpts );\n\
\t\t\t//console.log(areaa,areab ,areaa2,areab2, ( areaa + areab ),  ( areaa2 + areab2 ));\n\
\n\
\t\t\tif ( ( areaa + areab ) > ( areaa2 + areab2 ) ) {\n\
\n\
\t\t\t\t// In case areas are not correct.\n\
\t\t\t\t//console.log(\"USE THIS\");\n\
\n\
\t\t\t\tshapeIndex = oldShapeIndex;\n\
\t\t\t\tholeIndex = oldHoleIndex ;\n\
\n\
\t\t\t\tif ( shapeIndex < 0 ) { shapeIndex += shape.length;  }\n\
\t\t\t\tshapeIndex %= shape.length;\n\
\n\
\t\t\t\tif ( holeIndex < 0 ) { holeIndex += hole.length;  }\n\
\t\t\t\tholeIndex %= hole.length;\n\
\n\
\t\t\t\tprevShapeVert = ( shapeIndex - 1 ) >= 0 ? shapeIndex - 1 : shape.length - 1;\n\
\t\t\t\tprevHoleVert = ( holeIndex - 1 ) >= 0 ? holeIndex - 1 : hole.length - 1;\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\t//console.log(\"USE THAT \")\n\
\n\
\t\t\t}\n\
\n\
\t\t\ttmpShape1 = shape.slice( 0, shapeIndex );\n\
\t\t\ttmpShape2 = shape.slice( shapeIndex );\n\
\t\t\ttmpHole1 = hole.slice( holeIndex );\n\
\t\t\ttmpHole2 = hole.slice( 0, holeIndex );\n\
\n\
\t\t\t// Should check orders here again?\n\
\n\
\t\t\tvar trianglea = [\n\
\n\
\t\t\t\thole[ holeIndex ],\n\
\t\t\t\tshape[ shapeIndex ],\n\
\t\t\t\tshape[ prevShapeVert ]\n\
\n\
\t\t\t];\n\
\n\
\t\t\tvar triangleb = [\n\
\n\
\t\t\t\thole[ holeIndex ] ,\n\
\t\t\t\thole[ prevHoleVert ],\n\
\t\t\t\tshape[ shapeIndex ]\n\
\n\
\t\t\t];\n\
\n\
\t\t\tverts.push( trianglea );\n\
\t\t\tverts.push( triangleb );\n\
\n\
\t\t\tshape = tmpShape1.concat( tmpHole1 ).concat( tmpHole2 ).concat( tmpShape2 );\n\
\n\
\t\t}\n\
\n\
\t\treturn {\n\
\n\
\t\t\tshape:shape, \t\t/* shape with no holes */\n\
\t\t\tisolatedPts: verts, /* isolated faces */\n\
\t\t\tallpoints: allpoints\n\
\n\
\t\t}\n\
\n\
\n\
\t},\n\
\n\
\ttriangulateShape: function ( contour, holes ) {\n\
\n\
\t\tvar shapeWithoutHoles = THREE.Shape.Utils.removeHoles( contour, holes );\n\
\n\
\t\tvar shape = shapeWithoutHoles.shape,\n\
\t\t\tallpoints = shapeWithoutHoles.allpoints,\n\
\t\t\tisolatedPts = shapeWithoutHoles.isolatedPts;\n\
\n\
\t\tvar triangles = THREE.FontUtils.Triangulate( shape, false ); // True returns indices for points of spooled shape\n\
\n\
\t\t// To maintain reference to old shape, one must match coordinates, or offset the indices from original arrays. It's probably easier to do the first.\n\
\n\
\t\t//console.log( \"triangles\",triangles, triangles.length );\n\
\t\t//console.log( \"allpoints\",allpoints, allpoints.length );\n\
\n\
\t\tvar i, il, f, face,\n\
\t\t\tkey, index,\n\
\t\t\tallPointsMap = {},\n\
\t\t\tisolatedPointsMap = {};\n\
\n\
\t\t// prepare all points map\n\
\n\
\t\tfor ( i = 0, il = allpoints.length; i < il; i ++ ) {\n\
\n\
\t\t\tkey = allpoints[ i ].x + \":\" + allpoints[ i ].y;\n\
\n\
\t\t\tif ( allPointsMap[ key ] !== undefined ) {\n\
\n\
\t\t\t\tconsole.log( \"Duplicate point\", key );\n\
\n\
\t\t\t}\n\
\n\
\t\t\tallPointsMap[ key ] = i;\n\
\n\
\t\t}\n\
\n\
\t\t// check all face vertices against all points map\n\
\n\
\t\tfor ( i = 0, il = triangles.length; i < il; i ++ ) {\n\
\n\
\t\t\tface = triangles[ i ];\n\
\n\
\t\t\tfor ( f = 0; f < 3; f ++ ) {\n\
\n\
\t\t\t\tkey = face[ f ].x + \":\" + face[ f ].y;\n\
\n\
\t\t\t\tindex = allPointsMap[ key ];\n\
\n\
\t\t\t\tif ( index !== undefined ) {\n\
\n\
\t\t\t\t\tface[ f ] = index;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\t// check isolated points vertices against all points map\n\
\n\
\t\tfor ( i = 0, il = isolatedPts.length; i < il; i ++ ) {\n\
\n\
\t\t\tface = isolatedPts[ i ];\n\
\n\
\t\t\tfor ( f = 0; f < 3; f ++ ) {\n\
\n\
\t\t\t\tkey = face[ f ].x + \":\" + face[ f ].y;\n\
\n\
\t\t\t\tindex = allPointsMap[ key ];\n\
\n\
\t\t\t\tif ( index !== undefined ) {\n\
\n\
\t\t\t\t\tface[ f ] = index;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\treturn triangles.concat( isolatedPts );\n\
\n\
\t}, // end triangulate shapes\n\
\n\
\t/*\n\
\ttriangulate2 : function( pts, holes ) {\n\
\n\
\t\t// For use with Poly2Tri.js\n\
\n\
\t\tvar allpts = pts.concat();\n\
\t\tvar shape = [];\n\
\t\tfor (var p in pts) {\n\
\t\t\tshape.push(new js.poly2tri.Point(pts[p].x, pts[p].y));\n\
\t\t}\n\
\n\
\t\tvar swctx = new js.poly2tri.SweepContext(shape);\n\
\n\
\t\tfor (var h in holes) {\n\
\t\t\tvar aHole = holes[h];\n\
\t\t\tvar newHole = []\n\
\t\t\tfor (i in aHole) {\n\
\t\t\t\tnewHole.push(new js.poly2tri.Point(aHole[i].x, aHole[i].y));\n\
\t\t\t\tallpts.push(aHole[i]);\n\
\t\t\t}\n\
\t\t\tswctx.AddHole(newHole);\n\
\t\t}\n\
\n\
\t\tvar find;\n\
\t\tvar findIndexForPt = function (pt) {\n\
\t\t\tfind = new THREE.Vector2(pt.x, pt.y);\n\
\t\t\tvar p;\n\
\t\t\tfor (p=0, pl = allpts.length; p<pl; p++) {\n\
\t\t\t\tif (allpts[p].equals(find)) return p;\n\
\t\t\t}\n\
\t\t\treturn -1;\n\
\t\t};\n\
\n\
\t\t// triangulate\n\
\t\tjs.poly2tri.sweep.Triangulate(swctx);\n\
\n\
\t\tvar triangles =  swctx.GetTriangles();\n\
\t\tvar tr ;\n\
\t\tvar facesPts = [];\n\
\t\tfor (var t in triangles) {\n\
\t\t\ttr =  triangles[t];\n\
\t\t\tfacesPts.push([\n\
\t\t\t\tfindIndexForPt(tr.GetPoint(0)),\n\
\t\t\t\tfindIndexForPt(tr.GetPoint(1)),\n\
\t\t\t\tfindIndexForPt(tr.GetPoint(2))\n\
\t\t\t\t\t]);\n\
\t\t}\n\
\n\
\n\
\t//\tconsole.log(facesPts);\n\
\t//\tconsole.log(\"triangles\", triangles.length, triangles);\n\
\n\
\t\t// Returns array of faces with 3 element each\n\
\treturn facesPts;\n\
\t},\n\
*/\n\
\n\
\tisClockWise: function ( pts ) {\n\
\n\
\t\treturn THREE.FontUtils.Triangulate.area( pts ) < 0;\n\
\n\
\t},\n\
\n\
\t// Bezier Curves formulas obtained from\n\
\t// http://en.wikipedia.org/wiki/B%C3%A9zier_curve\n\
\n\
\t// Quad Bezier Functions\n\
\n\
\tb2p0: function ( t, p ) {\n\
\n\
\t\tvar k = 1 - t;\n\
\t\treturn k * k * p;\n\
\n\
\t},\n\
\n\
\tb2p1: function ( t, p ) {\n\
\n\
\t\treturn 2 * ( 1 - t ) * t * p;\n\
\n\
\t},\n\
\n\
\tb2p2: function ( t, p ) {\n\
\n\
\t\treturn t * t * p;\n\
\n\
\t},\n\
\n\
\tb2: function ( t, p0, p1, p2 ) {\n\
\n\
\t\treturn this.b2p0( t, p0 ) + this.b2p1( t, p1 ) + this.b2p2( t, p2 );\n\
\n\
\t},\n\
\n\
\t// Cubic Bezier Functions\n\
\n\
\tb3p0: function ( t, p ) {\n\
\n\
\t\tvar k = 1 - t;\n\
\t\treturn k * k * k * p;\n\
\n\
\t},\n\
\n\
\tb3p1: function ( t, p ) {\n\
\n\
\t\tvar k = 1 - t;\n\
\t\treturn 3 * k * k * t * p;\n\
\n\
\t},\n\
\n\
\tb3p2: function ( t, p ) {\n\
\n\
\t\tvar k = 1 - t;\n\
\t\treturn 3 * k * t * t * p;\n\
\n\
\t},\n\
\n\
\tb3p3: function ( t, p ) {\n\
\n\
\t\treturn t * t * t * p;\n\
\n\
\t},\n\
\n\
\tb3: function ( t, p0, p1, p2, p3 ) {\n\
\n\
\t\treturn this.b3p0( t, p0 ) + this.b3p1( t, p1 ) + this.b3p2( t, p2 ) +  this.b3p3( t, p3 );\n\
\n\
\t}\n\
\n\
};\n\
\n\
/**\n\
 * @author mikael emtinger / http://gomo.se/\n\
 */\n\
\n\
THREE.AnimationHandler = (function() {\n\
\n\
\tvar playing = [];\n\
\tvar library = {};\n\
\tvar that    = {};\n\
\n\
\n\
\t//--- update ---\n\
\n\
\tthat.update = function( deltaTimeMS ) {\n\
\n\
\t\tfor( var i = 0; i < playing.length; i ++ )\n\
\t\t\tplaying[ i ].update( deltaTimeMS );\n\
\n\
\t};\n\
\n\
\n\
\t//--- add ---\n\
\n\
\tthat.addToUpdate = function( animation ) {\n\
\n\
\t\tif ( playing.indexOf( animation ) === -1 )\n\
\t\t\tplaying.push( animation );\n\
\n\
\t};\n\
\n\
\n\
\t//--- remove ---\n\
\n\
\tthat.removeFromUpdate = function( animation ) {\n\
\n\
\t\tvar index = playing.indexOf( animation );\n\
\n\
\t\tif( index !== -1 )\n\
\t\t\tplaying.splice( index, 1 );\n\
\n\
\t};\n\
\n\
\n\
\t//--- add ---\n\
\n\
\tthat.add = function( data ) {\n\
\n\
\t\tif ( library[ data.name ] !== undefined )\n\
\t\t\tconsole.log( \"THREE.AnimationHandler.add: Warning! \" + data.name + \" already exists in library. Overwriting.\" );\n\
\n\
\t\tlibrary[ data.name ] = data;\n\
\t\tinitData( data );\n\
\n\
\t};\n\
\n\
\n\
\t//--- get ---\n\
\n\
\tthat.get = function( name ) {\n\
\n\
\t\tif ( typeof name === \"string\" ) {\n\
\n\
\t\t\tif ( library[ name ] ) {\n\
\n\
\t\t\t\treturn library[ name ];\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tconsole.log( \"THREE.AnimationHandler.get: Couldn't find animation \" + name );\n\
\t\t\t\treturn null;\n\
\n\
\t\t\t}\n\
\n\
\t\t} else {\n\
\n\
\t\t\t// todo: add simple tween library\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\t//--- parse ---\n\
\n\
\tthat.parse = function( root ) {\n\
\n\
\t\t// setup hierarchy\n\
\n\
\t\tvar hierarchy = [];\n\
\n\
\t\tif ( root instanceof THREE.SkinnedMesh ) {\n\
\n\
\t\t\tfor( var b = 0; b < root.bones.length; b++ ) {\n\
\n\
\t\t\t\thierarchy.push( root.bones[ b ] );\n\
\n\
\t\t\t}\n\
\n\
\t\t} else {\n\
\n\
\t\t\tparseRecurseHierarchy( root, hierarchy );\n\
\n\
\t\t}\n\
\n\
\t\treturn hierarchy;\n\
\n\
\t};\n\
\n\
\tvar parseRecurseHierarchy = function( root, hierarchy ) {\n\
\n\
\t\thierarchy.push( root );\n\
\n\
\t\tfor( var c = 0; c < root.children.length; c++ )\n\
\t\t\tparseRecurseHierarchy( root.children[ c ], hierarchy );\n\
\n\
\t}\n\
\n\
\n\
\t//--- init data ---\n\
\n\
\tvar initData = function( data ) {\n\
\n\
\t\tif( data.initialized === true )\n\
\t\t\treturn;\n\
\n\
\n\
\t\t// loop through all keys\n\
\n\
\t\tfor( var h = 0; h < data.hierarchy.length; h ++ ) {\n\
\n\
\t\t\tfor( var k = 0; k < data.hierarchy[ h ].keys.length; k ++ ) {\n\
\n\
\t\t\t\t// remove minus times\n\
\n\
\t\t\t\tif( data.hierarchy[ h ].keys[ k ].time < 0 )\n\
\t\t\t\t\tdata.hierarchy[ h ].keys[ k ].time = 0;\n\
\n\
\n\
\t\t\t\t// create quaternions\n\
\n\
\t\t\t\tif( data.hierarchy[ h ].keys[ k ].rot !== undefined &&\n\
\t\t\t\t !( data.hierarchy[ h ].keys[ k ].rot instanceof THREE.Quaternion ) ) {\n\
\n\
\t\t\t\t\tvar quat = data.hierarchy[ h ].keys[ k ].rot;\n\
\t\t\t\t\tdata.hierarchy[ h ].keys[ k ].rot = new THREE.Quaternion( quat[0], quat[1], quat[2], quat[3] );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\n\
\t\t\t// prepare morph target keys\n\
\n\
\t\t\tif( data.hierarchy[ h ].keys.length && data.hierarchy[ h ].keys[ 0 ].morphTargets !== undefined ) {\n\
\n\
\t\t\t\t// get all used\n\
\n\
\t\t\t\tvar usedMorphTargets = {};\n\
\n\
\t\t\t\tfor ( var k = 0; k < data.hierarchy[ h ].keys.length; k ++ ) {\n\
\n\
\t\t\t\t\tfor ( var m = 0; m < data.hierarchy[ h ].keys[ k ].morphTargets.length; m ++ ) {\n\
\n\
\t\t\t\t\t\tvar morphTargetName = data.hierarchy[ h ].keys[ k ].morphTargets[ m ];\n\
\t\t\t\t\t\tusedMorphTargets[ morphTargetName ] = -1;\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tdata.hierarchy[ h ].usedMorphTargets = usedMorphTargets;\n\
\n\
\n\
\t\t\t\t// set all used on all frames\n\
\n\
\t\t\t\tfor ( var k = 0; k < data.hierarchy[ h ].keys.length; k ++ ) {\n\
\n\
\t\t\t\t\tvar influences = {};\n\
\n\
\t\t\t\t\tfor ( var morphTargetName in usedMorphTargets ) {\n\
\n\
\t\t\t\t\t\tfor ( var m = 0; m < data.hierarchy[ h ].keys[ k ].morphTargets.length; m ++ ) {\n\
\n\
\t\t\t\t\t\t\tif ( data.hierarchy[ h ].keys[ k ].morphTargets[ m ] === morphTargetName ) {\n\
\n\
\t\t\t\t\t\t\t\tinfluences[ morphTargetName ] = data.hierarchy[ h ].keys[ k ].morphTargetsInfluences[ m ];\n\
\t\t\t\t\t\t\t\tbreak;\n\
\n\
\t\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\tif ( m === data.hierarchy[ h ].keys[ k ].morphTargets.length ) {\n\
\n\
\t\t\t\t\t\t\tinfluences[ morphTargetName ] = 0;\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\tdata.hierarchy[ h ].keys[ k ].morphTargetsInfluences = influences;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\n\
\t\t\t// remove all keys that are on the same time\n\
\n\
\t\t\tfor ( var k = 1; k < data.hierarchy[ h ].keys.length; k ++ ) {\n\
\n\
\t\t\t\tif ( data.hierarchy[ h ].keys[ k ].time === data.hierarchy[ h ].keys[ k - 1 ].time ) {\n\
\n\
\t\t\t\t\tdata.hierarchy[ h ].keys.splice( k, 1 );\n\
\t\t\t\t\tk --;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\n\
\t\t\t// set index\n\
\n\
\t\t\tfor ( var k = 0; k < data.hierarchy[ h ].keys.length; k ++ ) {\n\
\n\
\t\t\t\tdata.hierarchy[ h ].keys[ k ].index = k;\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\n\
\t\t// JIT\n\
\n\
\t\tvar lengthInFrames = parseInt( data.length * data.fps, 10 );\n\
\n\
\t\tdata.JIT = {};\n\
\t\tdata.JIT.hierarchy = [];\n\
\n\
\t\tfor( var h = 0; h < data.hierarchy.length; h ++ )\n\
\t\t\tdata.JIT.hierarchy.push( new Array( lengthInFrames ) );\n\
\n\
\n\
\t\t// done\n\
\n\
\t\tdata.initialized = true;\n\
\n\
\t};\n\
\n\
\n\
\t// interpolation types\n\
\n\
\tthat.LINEAR = 0;\n\
\tthat.CATMULLROM = 1;\n\
\tthat.CATMULLROM_FORWARD = 2;\n\
\n\
\treturn that;\n\
\n\
}());\n\
/**\n\
 * @author mikael emtinger / http://gomo.se/\n\
 * @author mrdoob / http://mrdoob.com/\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.Animation = function ( root, name, interpolationType ) {\n\
\n\
\tthis.root = root;\n\
\tthis.data = THREE.AnimationHandler.get( name );\n\
\tthis.hierarchy = THREE.AnimationHandler.parse( root );\n\
\n\
\tthis.currentTime = 0;\n\
\tthis.timeScale = 1;\n\
\n\
\tthis.isPlaying = false;\n\
\tthis.isPaused = true;\n\
\tthis.loop = true;\n\
\n\
\tthis.interpolationType = interpolationType !== undefined ? interpolationType : THREE.AnimationHandler.LINEAR;\n\
\n\
\tthis.points = [];\n\
\tthis.target = new THREE.Vector3();\n\
\n\
};\n\
\n\
THREE.Animation.prototype.play = function ( loop, startTimeMS ) {\n\
\n\
\tif ( this.isPlaying === false ) {\n\
\n\
\t\tthis.isPlaying = true;\n\
\t\tthis.loop = loop !== undefined ? loop : true;\n\
\t\tthis.currentTime = startTimeMS !== undefined ? startTimeMS : 0;\n\
\n\
\t\t// reset key cache\n\
\n\
\t\tvar h, hl = this.hierarchy.length,\n\
\t\t\tobject;\n\
\n\
\t\tfor ( h = 0; h < hl; h ++ ) {\n\
\n\
\t\t\tobject = this.hierarchy[ h ];\n\
\n\
\t\t\tif ( this.interpolationType !== THREE.AnimationHandler.CATMULLROM_FORWARD ) {\n\
\n\
\t\t\t\tobject.useQuaternion = true;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tobject.matrixAutoUpdate = true;\n\
\n\
\t\t\tif ( object.animationCache === undefined ) {\n\
\n\
\t\t\t\tobject.animationCache = {};\n\
\t\t\t\tobject.animationCache.prevKey = { pos: 0, rot: 0, scl: 0 };\n\
\t\t\t\tobject.animationCache.nextKey = { pos: 0, rot: 0, scl: 0 };\n\
\t\t\t\tobject.animationCache.originalMatrix = object instanceof THREE.Bone ? object.skinMatrix : object.matrix;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tvar prevKey = object.animationCache.prevKey;\n\
\t\t\tvar nextKey = object.animationCache.nextKey;\n\
\n\
\t\t\tprevKey.pos = this.data.hierarchy[ h ].keys[ 0 ];\n\
\t\t\tprevKey.rot = this.data.hierarchy[ h ].keys[ 0 ];\n\
\t\t\tprevKey.scl = this.data.hierarchy[ h ].keys[ 0 ];\n\
\n\
\t\t\tnextKey.pos = this.getNextKeyWith( \"pos\", h, 1 );\n\
\t\t\tnextKey.rot = this.getNextKeyWith( \"rot\", h, 1 );\n\
\t\t\tnextKey.scl = this.getNextKeyWith( \"scl\", h, 1 );\n\
\n\
\t\t}\n\
\n\
\t\tthis.update( 0 );\n\
\n\
\t}\n\
\n\
\tthis.isPaused = false;\n\
\n\
\tTHREE.AnimationHandler.addToUpdate( this );\n\
\n\
};\n\
\n\
\n\
THREE.Animation.prototype.pause = function() {\n\
\n\
\tif ( this.isPaused === true ) {\n\
\n\
\t\tTHREE.AnimationHandler.addToUpdate( this );\n\
\n\
\t} else {\n\
\n\
\t\tTHREE.AnimationHandler.removeFromUpdate( this );\n\
\n\
\t}\n\
\n\
\tthis.isPaused = !this.isPaused;\n\
\n\
};\n\
\n\
\n\
THREE.Animation.prototype.stop = function() {\n\
\n\
\tthis.isPlaying = false;\n\
\tthis.isPaused  = false;\n\
\tTHREE.AnimationHandler.removeFromUpdate( this );\n\
\n\
};\n\
\n\
\n\
THREE.Animation.prototype.update = function ( deltaTimeMS ) {\n\
\n\
\t// early out\n\
\n\
\tif ( this.isPlaying === false ) return;\n\
\n\
\n\
\t// vars\n\
\n\
\tvar types = [ \"pos\", \"rot\", \"scl\" ];\n\
\tvar type;\n\
\tvar scale;\n\
\tvar vector;\n\
\tvar prevXYZ, nextXYZ;\n\
\tvar prevKey, nextKey;\n\
\tvar object;\n\
\tvar animationCache;\n\
\tvar frame;\n\
\tvar JIThierarchy = this.data.JIT.hierarchy;\n\
\tvar currentTime, unloopedCurrentTime;\n\
\tvar currentPoint, forwardPoint, angle;\n\
\n\
\n\
\tthis.currentTime += deltaTimeMS * this.timeScale;\n\
\n\
\tunloopedCurrentTime = this.currentTime;\n\
\tcurrentTime = this.currentTime = this.currentTime % this.data.length;\n\
\tframe = parseInt( Math.min( currentTime * this.data.fps, this.data.length * this.data.fps ), 10 );\n\
\n\
\n\
\tfor ( var h = 0, hl = this.hierarchy.length; h < hl; h ++ ) {\n\
\n\
\t\tobject = this.hierarchy[ h ];\n\
\t\tanimationCache = object.animationCache;\n\
\n\
\t\t// loop through pos/rot/scl\n\
\n\
\t\tfor ( var t = 0; t < 3; t ++ ) {\n\
\n\
\t\t\t// get keys\n\
\n\
\t\t\ttype    = types[ t ];\n\
\t\t\tprevKey = animationCache.prevKey[ type ];\n\
\t\t\tnextKey = animationCache.nextKey[ type ];\n\
\n\
\t\t\t// switch keys?\n\
\n\
\t\t\tif ( nextKey.time <= unloopedCurrentTime ) {\n\
\n\
\t\t\t\t// did we loop?\n\
\n\
\t\t\t\tif ( currentTime < unloopedCurrentTime ) {\n\
\n\
\t\t\t\t\tif ( this.loop ) {\n\
\n\
\t\t\t\t\t\tprevKey = this.data.hierarchy[ h ].keys[ 0 ];\n\
\t\t\t\t\t\tnextKey = this.getNextKeyWith( type, h, 1 );\n\
\n\
\t\t\t\t\t\twhile( nextKey.time < currentTime ) {\n\
\n\
\t\t\t\t\t\t\tprevKey = nextKey;\n\
\t\t\t\t\t\t\tnextKey = this.getNextKeyWith( type, h, nextKey.index + 1 );\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t} else {\n\
\n\
\t\t\t\t\t\tthis.stop();\n\
\t\t\t\t\t\treturn;\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\tdo {\n\
\n\
\t\t\t\t\t\tprevKey = nextKey;\n\
\t\t\t\t\t\tnextKey = this.getNextKeyWith( type, h, nextKey.index + 1 );\n\
\n\
\t\t\t\t\t} while( nextKey.time < currentTime )\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tanimationCache.prevKey[ type ] = prevKey;\n\
\t\t\t\tanimationCache.nextKey[ type ] = nextKey;\n\
\n\
\t\t\t}\n\
\n\
\n\
\t\t\tobject.matrixAutoUpdate = true;\n\
\t\t\tobject.matrixWorldNeedsUpdate = true;\n\
\n\
\t\t\tscale = ( currentTime - prevKey.time ) / ( nextKey.time - prevKey.time );\n\
\t\t\tprevXYZ = prevKey[ type ];\n\
\t\t\tnextXYZ = nextKey[ type ];\n\
\n\
\n\
\t\t\t// check scale error\n\
\n\
\t\t\tif ( scale < 0 || scale > 1 ) {\n\
\n\
\t\t\t\tconsole.log( \"THREE.Animation.update: Warning! Scale out of bounds:\" + scale + \" on bone \" + h );\n\
\t\t\t\tscale = scale < 0 ? 0 : 1;\n\
\n\
\t\t\t}\n\
\n\
\t\t\t// interpolate\n\
\n\
\t\t\tif ( type === \"pos\" ) {\n\
\n\
\t\t\t\tvector = object.position;\n\
\n\
\t\t\t\tif ( this.interpolationType === THREE.AnimationHandler.LINEAR ) {\n\
\n\
\t\t\t\t\tvector.x = prevXYZ[ 0 ] + ( nextXYZ[ 0 ] - prevXYZ[ 0 ] ) * scale;\n\
\t\t\t\t\tvector.y = prevXYZ[ 1 ] + ( nextXYZ[ 1 ] - prevXYZ[ 1 ] ) * scale;\n\
\t\t\t\t\tvector.z = prevXYZ[ 2 ] + ( nextXYZ[ 2 ] - prevXYZ[ 2 ] ) * scale;\n\
\n\
\t\t\t\t} else if ( this.interpolationType === THREE.AnimationHandler.CATMULLROM ||\n\
\t\t\t\t\t\t    this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ) {\n\
\n\
\t\t\t\t\tthis.points[ 0 ] = this.getPrevKeyWith( \"pos\", h, prevKey.index - 1 )[ \"pos\" ];\n\
\t\t\t\t\tthis.points[ 1 ] = prevXYZ;\n\
\t\t\t\t\tthis.points[ 2 ] = nextXYZ;\n\
\t\t\t\t\tthis.points[ 3 ] = this.getNextKeyWith( \"pos\", h, nextKey.index + 1 )[ \"pos\" ];\n\
\n\
\t\t\t\t\tscale = scale * 0.33 + 0.33;\n\
\n\
\t\t\t\t\tcurrentPoint = this.interpolateCatmullRom( this.points, scale );\n\
\n\
\t\t\t\t\tvector.x = currentPoint[ 0 ];\n\
\t\t\t\t\tvector.y = currentPoint[ 1 ];\n\
\t\t\t\t\tvector.z = currentPoint[ 2 ];\n\
\n\
\t\t\t\t\tif ( this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ) {\n\
\n\
\t\t\t\t\t\tforwardPoint = this.interpolateCatmullRom( this.points, scale * 1.01 );\n\
\n\
\t\t\t\t\t\tthis.target.set( forwardPoint[ 0 ], forwardPoint[ 1 ], forwardPoint[ 2 ] );\n\
\t\t\t\t\t\tthis.target.subSelf( vector );\n\
\t\t\t\t\t\tthis.target.y = 0;\n\
\t\t\t\t\t\tthis.target.normalize();\n\
\n\
\t\t\t\t\t\tangle = Math.atan2( this.target.x, this.target.z );\n\
\t\t\t\t\t\tobject.rotation.set( 0, angle, 0 );\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t} else if ( type === \"rot\" ) {\n\
\n\
\t\t\t\tTHREE.Quaternion.slerp( prevXYZ, nextXYZ, object.quaternion, scale );\n\
\n\
\t\t\t} else if ( type === \"scl\" ) {\n\
\n\
\t\t\t\tvector = object.scale;\n\
\n\
\t\t\t\tvector.x = prevXYZ[ 0 ] + ( nextXYZ[ 0 ] - prevXYZ[ 0 ] ) * scale;\n\
\t\t\t\tvector.y = prevXYZ[ 1 ] + ( nextXYZ[ 1 ] - prevXYZ[ 1 ] ) * scale;\n\
\t\t\t\tvector.z = prevXYZ[ 2 ] + ( nextXYZ[ 2 ] - prevXYZ[ 2 ] ) * scale;\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
};\n\
\n\
// Catmull-Rom spline\n\
\n\
THREE.Animation.prototype.interpolateCatmullRom = function ( points, scale ) {\n\
\n\
\tvar c = [], v3 = [],\n\
\tpoint, intPoint, weight, w2, w3,\n\
\tpa, pb, pc, pd;\n\
\n\
\tpoint = ( points.length - 1 ) * scale;\n\
\tintPoint = Math.floor( point );\n\
\tweight = point - intPoint;\n\
\n\
\tc[ 0 ] = intPoint === 0 ? intPoint : intPoint - 1;\n\
\tc[ 1 ] = intPoint;\n\
\tc[ 2 ] = intPoint > points.length - 2 ? intPoint : intPoint + 1;\n\
\tc[ 3 ] = intPoint > points.length - 3 ? intPoint : intPoint + 2;\n\
\n\
\tpa = points[ c[ 0 ] ];\n\
\tpb = points[ c[ 1 ] ];\n\
\tpc = points[ c[ 2 ] ];\n\
\tpd = points[ c[ 3 ] ];\n\
\n\
\tw2 = weight * weight;\n\
\tw3 = weight * w2;\n\
\n\
\tv3[ 0 ] = this.interpolate( pa[ 0 ], pb[ 0 ], pc[ 0 ], pd[ 0 ], weight, w2, w3 );\n\
\tv3[ 1 ] = this.interpolate( pa[ 1 ], pb[ 1 ], pc[ 1 ], pd[ 1 ], weight, w2, w3 );\n\
\tv3[ 2 ] = this.interpolate( pa[ 2 ], pb[ 2 ], pc[ 2 ], pd[ 2 ], weight, w2, w3 );\n\
\n\
\treturn v3;\n\
\n\
};\n\
\n\
THREE.Animation.prototype.interpolate = function ( p0, p1, p2, p3, t, t2, t3 ) {\n\
\n\
\tvar v0 = ( p2 - p0 ) * 0.5,\n\
\t\tv1 = ( p3 - p1 ) * 0.5;\n\
\n\
\treturn ( 2 * ( p1 - p2 ) + v0 + v1 ) * t3 + ( - 3 * ( p1 - p2 ) - 2 * v0 - v1 ) * t2 + v0 * t + p1;\n\
\n\
};\n\
\n\
\n\
\n\
// Get next key with\n\
\n\
THREE.Animation.prototype.getNextKeyWith = function ( type, h, key ) {\n\
\n\
\tvar keys = this.data.hierarchy[ h ].keys;\n\
\n\
\tif ( this.interpolationType === THREE.AnimationHandler.CATMULLROM ||\n\
\t\t this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ) {\n\
\n\
\t\tkey = key < keys.length - 1 ? key : keys.length - 1;\n\
\n\
\t} else {\n\
\n\
\t\tkey = key % keys.length;\n\
\n\
\t}\n\
\n\
\tfor ( ; key < keys.length; key++ ) {\n\
\n\
\t\tif ( keys[ key ][ type ] !== undefined ) {\n\
\n\
\t\t\treturn keys[ key ];\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\treturn this.data.hierarchy[ h ].keys[ 0 ];\n\
\n\
};\n\
\n\
// Get previous key with\n\
\n\
THREE.Animation.prototype.getPrevKeyWith = function ( type, h, key ) {\n\
\n\
\tvar keys = this.data.hierarchy[ h ].keys;\n\
\n\
\tif ( this.interpolationType === THREE.AnimationHandler.CATMULLROM ||\n\
\t\t this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ) {\n\
\n\
\t\tkey = key > 0 ? key : 0;\n\
\n\
\t} else {\n\
\n\
\t\tkey = key >= 0 ? key : key + keys.length;\n\
\n\
\t}\n\
\n\
\n\
\tfor ( ; key >= 0; key -- ) {\n\
\n\
\t\tif ( keys[ key ][ type ] !== undefined ) {\n\
\n\
\t\t\treturn keys[ key ];\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\treturn this.data.hierarchy[ h ].keys[ keys.length - 1 ];\n\
\n\
};\n\
/**\n\
 * @author mikael emtinger / http://gomo.se/\n\
 * @author mrdoob / http://mrdoob.com/\n\
 * @author alteredq / http://alteredqualia.com/\n\
 * @author khang duong\n\
 * @author erik kitson\n\
 */\n\
\n\
THREE.KeyFrameAnimation = function( root, data, JITCompile ) {\n\
\n\
\tthis.root = root;\n\
\tthis.data = THREE.AnimationHandler.get( data );\n\
\tthis.hierarchy = THREE.AnimationHandler.parse( root );\n\
\tthis.currentTime = 0;\n\
\tthis.timeScale = 0.001;\n\
\tthis.isPlaying = false;\n\
\tthis.isPaused = true;\n\
\tthis.loop = true;\n\
\tthis.JITCompile = JITCompile !== undefined ? JITCompile : true;\n\
\n\
\t// initialize to first keyframes\n\
\n\
\tfor ( var h = 0, hl = this.hierarchy.length; h < hl; h++ ) {\n\
\n\
\t\tvar keys = this.data.hierarchy[h].keys,\n\
\t\t\tsids = this.data.hierarchy[h].sids,\n\
\t\t\tobj = this.hierarchy[h];\n\
\n\
\t\tif ( keys.length && sids ) {\n\
\n\
\t\t\tfor ( var s = 0; s < sids.length; s++ ) {\n\
\n\
\t\t\t\tvar sid = sids[ s ],\n\
\t\t\t\t\tnext = this.getNextKeyWith( sid, h, 0 );\n\
\n\
\t\t\t\tif ( next ) {\n\
\n\
\t\t\t\t\tnext.apply( sid );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t\tobj.matrixAutoUpdate = false;\n\
\t\t\tthis.data.hierarchy[h].node.updateMatrix();\n\
\t\t\tobj.matrixWorldNeedsUpdate = true;\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
};\n\
\n\
// Play\n\
\n\
THREE.KeyFrameAnimation.prototype.play = function( loop, startTimeMS ) {\n\
\n\
\tif( !this.isPlaying ) {\n\
\n\
\t\tthis.isPlaying = true;\n\
\t\tthis.loop = loop !== undefined ? loop : true;\n\
\t\tthis.currentTime = startTimeMS !== undefined ? startTimeMS : 0;\n\
\t\tthis.startTimeMs = startTimeMS;\n\
\t\tthis.startTime = 10000000;\n\
\t\tthis.endTime = -this.startTime;\n\
\n\
\n\
\t\t// reset key cache\n\
\n\
\t\tvar h, hl = this.hierarchy.length,\n\
\t\t\tobject,\n\
\t\t\tnode;\n\
\n\
\t\tfor ( h = 0; h < hl; h++ ) {\n\
\n\
\t\t\tobject = this.hierarchy[ h ];\n\
\t\t\tnode = this.data.hierarchy[ h ];\n\
\t\t\tobject.useQuaternion = true;\n\
\n\
\t\t\tif ( node.animationCache === undefined ) {\n\
\n\
\t\t\t\tnode.animationCache = {};\n\
\t\t\t\tnode.animationCache.prevKey = null;\n\
\t\t\t\tnode.animationCache.nextKey = null;\n\
\t\t\t\tnode.animationCache.originalMatrix = object instanceof THREE.Bone ? object.skinMatrix : object.matrix;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tvar keys = this.data.hierarchy[h].keys;\n\
\n\
\t\t\tif (keys.length) {\n\
\n\
\t\t\t\tnode.animationCache.prevKey = keys[ 0 ];\n\
\t\t\t\tnode.animationCache.nextKey = keys[ 1 ];\n\
\n\
\t\t\t\tthis.startTime = Math.min( keys[0].time, this.startTime );\n\
\t\t\t\tthis.endTime = Math.max( keys[keys.length - 1].time, this.endTime );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tthis.update( 0 );\n\
\n\
\t}\n\
\n\
\tthis.isPaused = false;\n\
\n\
\tTHREE.AnimationHandler.addToUpdate( this );\n\
\n\
};\n\
\n\
\n\
\n\
// Pause\n\
\n\
THREE.KeyFrameAnimation.prototype.pause = function() {\n\
\n\
\tif( this.isPaused ) {\n\
\n\
\t\tTHREE.AnimationHandler.addToUpdate( this );\n\
\n\
\t} else {\n\
\n\
\t\tTHREE.AnimationHandler.removeFromUpdate( this );\n\
\n\
\t}\n\
\n\
\tthis.isPaused = !this.isPaused;\n\
\n\
};\n\
\n\
\n\
// Stop\n\
\n\
THREE.KeyFrameAnimation.prototype.stop = function() {\n\
\n\
\tthis.isPlaying = false;\n\
\tthis.isPaused  = false;\n\
\tTHREE.AnimationHandler.removeFromUpdate( this );\n\
\n\
\n\
\t// reset JIT matrix and remove cache\n\
\n\
\tfor ( var h = 0; h < this.data.hierarchy.length; h++ ) {\n\
\n\
        var obj = this.hierarchy[ h ];\n\
\t\tvar node = this.data.hierarchy[ h ];\n\
\n\
\t\tif ( node.animationCache !== undefined ) {\n\
\n\
\t\t\tvar original = node.animationCache.originalMatrix;\n\
\n\
\t\t\tif( obj instanceof THREE.Bone ) {\n\
\n\
\t\t\t\toriginal.copy( obj.skinMatrix );\n\
\t\t\t\tobj.skinMatrix = original;\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\toriginal.copy( obj.matrix );\n\
\t\t\t\tobj.matrix = original;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tdelete node.animationCache;\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
};\n\
\n\
\n\
// Update\n\
\n\
THREE.KeyFrameAnimation.prototype.update = function( deltaTimeMS ) {\n\
\n\
\t// early out\n\
\n\
\tif( !this.isPlaying ) return;\n\
\n\
\n\
\t// vars\n\
\n\
\tvar prevKey, nextKey;\n\
\tvar object;\n\
\tvar node;\n\
\tvar frame;\n\
\tvar JIThierarchy = this.data.JIT.hierarchy;\n\
\tvar currentTime, unloopedCurrentTime;\n\
\tvar looped;\n\
\n\
\n\
\t// update\n\
\n\
\tthis.currentTime += deltaTimeMS * this.timeScale;\n\
\n\
\tunloopedCurrentTime = this.currentTime;\n\
\tcurrentTime         = this.currentTime = this.currentTime % this.data.length;\n\
\n\
\t// if looped around, the current time should be based on the startTime\n\
\tif ( currentTime < this.startTimeMs ) {\n\
\n\
\t\tcurrentTime = this.currentTime = this.startTimeMs + currentTime;\n\
\n\
\t}\n\
\n\
\tframe               = parseInt( Math.min( currentTime * this.data.fps, this.data.length * this.data.fps ), 10 );\n\
\tlooped \t\t\t\t= currentTime < unloopedCurrentTime;\n\
\n\
\tif ( looped && !this.loop ) {\n\
\n\
\t\t// Set the animation to the last keyframes and stop\n\
\t\tfor ( var h = 0, hl = this.hierarchy.length; h < hl; h++ ) {\n\
\n\
\t\t\tvar keys = this.data.hierarchy[h].keys,\n\
\t\t\t\tsids = this.data.hierarchy[h].sids,\n\
\t\t\t\tend = keys.length-1,\n\
\t\t\t\tobj = this.hierarchy[h];\n\
\n\
\t\t\tif ( keys.length ) {\n\
\n\
\t\t\t\tfor ( var s = 0; s < sids.length; s++ ) {\n\
\n\
\t\t\t\t\tvar sid = sids[ s ],\n\
\t\t\t\t\t\tprev = this.getPrevKeyWith( sid, h, end );\n\
\n\
\t\t\t\t\tif ( prev ) {\n\
\t\t\t\t\t\tprev.apply( sid );\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tthis.data.hierarchy[h].node.updateMatrix();\n\
\t\t\t\tobj.matrixWorldNeedsUpdate = true;\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tthis.stop();\n\
\t\treturn;\n\
\n\
\t}\n\
\n\
\t// check pre-infinity\n\
\tif ( currentTime < this.startTime ) {\n\
\n\
\t\treturn;\n\
\n\
\t}\n\
\n\
\t// update\n\
\n\
\tfor ( var h = 0, hl = this.hierarchy.length; h < hl; h++ ) {\n\
\n\
\t\tobject = this.hierarchy[ h ];\n\
\t\tnode = this.data.hierarchy[ h ];\n\
\n\
\t\tvar keys = node.keys,\n\
\t\t\tanimationCache = node.animationCache;\n\
\n\
\t\t// use JIT?\n\
\n\
\t\tif ( this.JITCompile && JIThierarchy[ h ][ frame ] !== undefined ) {\n\
\n\
\t\t\tif( object instanceof THREE.Bone ) {\n\
\n\
\t\t\t\tobject.skinMatrix = JIThierarchy[ h ][ frame ];\n\
\t\t\t\tobject.matrixWorldNeedsUpdate = false;\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tobject.matrix = JIThierarchy[ h ][ frame ];\n\
\t\t\t\tobject.matrixWorldNeedsUpdate = true;\n\
\n\
\t\t\t}\n\
\n\
\t\t// use interpolation\n\
\n\
\t\t} else if ( keys.length ) {\n\
\n\
\t\t\t// make sure so original matrix and not JIT matrix is set\n\
\n\
\t\t\tif ( this.JITCompile && animationCache ) {\n\
\n\
\t\t\t\tif( object instanceof THREE.Bone ) {\n\
\n\
\t\t\t\t\tobject.skinMatrix = animationCache.originalMatrix;\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\tobject.matrix = animationCache.originalMatrix;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t\tprevKey = animationCache.prevKey;\n\
\t\t\tnextKey = animationCache.nextKey;\n\
\n\
\t\t\tif ( prevKey && nextKey ) {\n\
\n\
\t\t\t\t// switch keys?\n\
\n\
\t\t\t\tif ( nextKey.time <= unloopedCurrentTime ) {\n\
\n\
\t\t\t\t\t// did we loop?\n\
\n\
\t\t\t\t\tif ( looped && this.loop ) {\n\
\n\
\t\t\t\t\t\tprevKey = keys[ 0 ];\n\
\t\t\t\t\t\tnextKey = keys[ 1 ];\n\
\n\
\t\t\t\t\t\twhile ( nextKey.time < currentTime ) {\n\
\n\
\t\t\t\t\t\t\tprevKey = nextKey;\n\
\t\t\t\t\t\t\tnextKey = keys[ prevKey.index + 1 ];\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t} else if ( !looped ) {\n\
\n\
\t\t\t\t\t\tvar lastIndex = keys.length - 1;\n\
\n\
\t\t\t\t\t\twhile ( nextKey.time < currentTime && nextKey.index !== lastIndex ) {\n\
\n\
\t\t\t\t\t\t\tprevKey = nextKey;\n\
\t\t\t\t\t\t\tnextKey = keys[ prevKey.index + 1 ];\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\tanimationCache.prevKey = prevKey;\n\
\t\t\t\t\tanimationCache.nextKey = nextKey;\n\
\n\
\t\t\t\t}\n\
                if(nextKey.time >= currentTime)\n\
                    prevKey.interpolate( nextKey, currentTime );\n\
                else\n\
                    prevKey.interpolate( nextKey, nextKey.time);\n\
\n\
\t\t\t}\n\
\n\
\t\t\tthis.data.hierarchy[h].node.updateMatrix();\n\
\t\t\tobject.matrixWorldNeedsUpdate = true;\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\t// update JIT?\n\
\n\
\tif ( this.JITCompile ) {\n\
\n\
\t\tif ( JIThierarchy[ 0 ][ frame ] === undefined ) {\n\
\n\
\t\t\tthis.hierarchy[ 0 ].updateMatrixWorld( true );\n\
\n\
\t\t\tfor ( var h = 0; h < this.hierarchy.length; h++ ) {\n\
\n\
\t\t\t\tif( this.hierarchy[ h ] instanceof THREE.Bone ) {\n\
\n\
\t\t\t\t\tJIThierarchy[ h ][ frame ] = this.hierarchy[ h ].skinMatrix.clone();\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\tJIThierarchy[ h ][ frame ] = this.hierarchy[ h ].matrix.clone();\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
};\n\
\n\
// Get next key with\n\
\n\
THREE.KeyFrameAnimation.prototype.getNextKeyWith = function( sid, h, key ) {\n\
\n\
\tvar keys = this.data.hierarchy[ h ].keys;\n\
\tkey = key % keys.length;\n\
\n\
\tfor ( ; key < keys.length; key++ ) {\n\
\n\
\t\tif ( keys[ key ].hasTarget( sid ) ) {\n\
\n\
\t\t\treturn keys[ key ];\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\treturn keys[ 0 ];\n\
\n\
};\n\
\n\
// Get previous key with\n\
\n\
THREE.KeyFrameAnimation.prototype.getPrevKeyWith = function( sid, h, key ) {\n\
\n\
\tvar keys = this.data.hierarchy[ h ].keys;\n\
\tkey = key >= 0 ? key : key + keys.length;\n\
\n\
\tfor ( ; key >= 0; key-- ) {\n\
\n\
\t\tif ( keys[ key ].hasTarget( sid ) ) {\n\
\n\
\t\t\treturn keys[ key ];\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\treturn keys[ keys.length - 1 ];\n\
\n\
};\n\
/**\n\
 * Camera for rendering cube maps\n\
 *\t- renders scene into axis-aligned cube\n\
 *\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.CubeCamera = function ( near, far, cubeResolution ) {\n\
\n\
\tTHREE.Object3D.call( this );\n\
\n\
\tvar fov = 90, aspect = 1;\n\
\n\
\tvar cameraPX = new THREE.PerspectiveCamera( fov, aspect, near, far );\n\
\tcameraPX.up.set( 0, -1, 0 );\n\
\tcameraPX.lookAt( new THREE.Vector3( 1, 0, 0 ) );\n\
\tthis.add( cameraPX );\n\
\n\
\tvar cameraNX = new THREE.PerspectiveCamera( fov, aspect, near, far );\n\
\tcameraNX.up.set( 0, -1, 0 );\n\
\tcameraNX.lookAt( new THREE.Vector3( -1, 0, 0 ) );\n\
\tthis.add( cameraNX );\n\
\n\
\tvar cameraPY = new THREE.PerspectiveCamera( fov, aspect, near, far );\n\
\tcameraPY.up.set( 0, 0, 1 );\n\
\tcameraPY.lookAt( new THREE.Vector3( 0, 1, 0 ) );\n\
\tthis.add( cameraPY );\n\
\n\
\tvar cameraNY = new THREE.PerspectiveCamera( fov, aspect, near, far );\n\
\tcameraNY.up.set( 0, 0, -1 );\n\
\tcameraNY.lookAt( new THREE.Vector3( 0, -1, 0 ) );\n\
\tthis.add( cameraNY );\n\
\n\
\tvar cameraPZ = new THREE.PerspectiveCamera( fov, aspect, near, far );\n\
\tcameraPZ.up.set( 0, -1, 0 );\n\
\tcameraPZ.lookAt( new THREE.Vector3( 0, 0, 1 ) );\n\
\tthis.add( cameraPZ );\n\
\n\
\tvar cameraNZ = new THREE.PerspectiveCamera( fov, aspect, near, far );\n\
\tcameraNZ.up.set( 0, -1, 0 );\n\
\tcameraNZ.lookAt( new THREE.Vector3( 0, 0, -1 ) );\n\
\tthis.add( cameraNZ );\n\
\n\
\tthis.renderTarget = new THREE.WebGLRenderTargetCube( cubeResolution, cubeResolution, { format: THREE.RGBFormat, magFilter: THREE.LinearFilter, minFilter: THREE.LinearFilter } );\n\
\n\
\tthis.updateCubeMap = function ( renderer, scene ) {\n\
\n\
\t\tvar renderTarget = this.renderTarget;\n\
\t\tvar generateMipmaps = renderTarget.generateMipmaps;\n\
\n\
\t\trenderTarget.generateMipmaps = false;\n\
\n\
\t\trenderTarget.activeCubeFace = 0;\n\
\t\trenderer.render( scene, cameraPX, renderTarget );\n\
\n\
\t\trenderTarget.activeCubeFace = 1;\n\
\t\trenderer.render( scene, cameraNX, renderTarget );\n\
\n\
\t\trenderTarget.activeCubeFace = 2;\n\
\t\trenderer.render( scene, cameraPY, renderTarget );\n\
\n\
\t\trenderTarget.activeCubeFace = 3;\n\
\t\trenderer.render( scene, cameraNY, renderTarget );\n\
\n\
\t\trenderTarget.activeCubeFace = 4;\n\
\t\trenderer.render( scene, cameraPZ, renderTarget );\n\
\n\
\t\trenderTarget.generateMipmaps = generateMipmaps;\n\
\n\
\t\trenderTarget.activeCubeFace = 5;\n\
\t\trenderer.render( scene, cameraNZ, renderTarget );\n\
\n\
\t};\n\
\n\
};\n\
\n\
THREE.CubeCamera.prototype = Object.create( THREE.Object3D.prototype );\n\
/*\n\
 *\t@author zz85 / http://twitter.com/blurspline / http://www.lab4games.net/zz85/blog\n\
 *\n\
 *\tA general perpose camera, for setting FOV, Lens Focal Length,\n\
 *\t\tand switching between perspective and orthographic views easily.\n\
 *\t\tUse this only if you do not wish to manage\n\
 *\t\tboth a Orthographic and Perspective Camera\n\
 *\n\
 */\n\
\n\
\n\
THREE.CombinedCamera = function ( width, height, fov, near, far, orthoNear, orthoFar ) {\n\
\n\
\tTHREE.Camera.call( this );\n\
\n\
\tthis.fov = fov;\n\
\n\
\tthis.left = -width / 2;\n\
\tthis.right = width / 2\n\
\tthis.top = height / 2;\n\
\tthis.bottom = -height / 2;\n\
\n\
\t// We could also handle the projectionMatrix internally, but just wanted to test nested camera objects\n\
\n\
\tthis.cameraO = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, \torthoNear, orthoFar );\n\
\tthis.cameraP = new THREE.PerspectiveCamera( fov, width / height, near, far );\n\
\n\
\tthis.zoom = 1;\n\
\n\
\tthis.toPerspective();\n\
\n\
\tvar aspect = width/height;\n\
\n\
};\n\
\n\
THREE.CombinedCamera.prototype = Object.create( THREE.Camera.prototype );\n\
\n\
THREE.CombinedCamera.prototype.toPerspective = function () {\n\
\n\
\t// Switches to the Perspective Camera\n\
\n\
\tthis.near = this.cameraP.near;\n\
\tthis.far = this.cameraP.far;\n\
\n\
\tthis.cameraP.fov =  this.fov / this.zoom ;\n\
\n\
\tthis.cameraP.updateProjectionMatrix();\n\
\n\
\tthis.projectionMatrix = this.cameraP.projectionMatrix;\n\
\n\
\tthis.inPerspectiveMode = true;\n\
\tthis.inOrthographicMode = false;\n\
\n\
};\n\
\n\
THREE.CombinedCamera.prototype.toOrthographic = function () {\n\
\n\
\t// Switches to the Orthographic camera estimating viewport from Perspective\n\
\n\
\tvar fov = this.fov;\n\
\tvar aspect = this.cameraP.aspect;\n\
\tvar near = this.cameraP.near;\n\
\tvar far = this.cameraP.far;\n\
\n\
\t// The size that we set is the mid plane of the viewing frustum\n\
\n\
\tvar hyperfocus = ( near + far ) / 2;\n\
\n\
\tvar halfHeight = Math.tan( fov / 2 ) * hyperfocus;\n\
\tvar planeHeight = 2 * halfHeight;\n\
\tvar planeWidth = planeHeight * aspect;\n\
\tvar halfWidth = planeWidth / 2;\n\
\n\
\thalfHeight /= this.zoom;\n\
\thalfWidth /= this.zoom;\n\
\n\
\tthis.cameraO.left = -halfWidth;\n\
\tthis.cameraO.right = halfWidth;\n\
\tthis.cameraO.top = halfHeight;\n\
\tthis.cameraO.bottom = -halfHeight;\n\
\n\
\t// this.cameraO.left = -farHalfWidth;\n\
\t// this.cameraO.right = farHalfWidth;\n\
\t// this.cameraO.top = farHalfHeight;\n\
\t// this.cameraO.bottom = -farHalfHeight;\n\
\n\
\t// this.cameraO.left = this.left / this.zoom;\n\
\t// this.cameraO.right = this.right / this.zoom;\n\
\t// this.cameraO.top = this.top / this.zoom;\n\
\t// this.cameraO.bottom = this.bottom / this.zoom;\n\
\n\
\tthis.cameraO.updateProjectionMatrix();\n\
\n\
\tthis.near = this.cameraO.near;\n\
\tthis.far = this.cameraO.far;\n\
\tthis.projectionMatrix = this.cameraO.projectionMatrix;\n\
\n\
\tthis.inPerspectiveMode = false;\n\
\tthis.inOrthographicMode = true;\n\
\n\
};\n\
\n\
\n\
THREE.CombinedCamera.prototype.setSize = function( width, height ) {\n\
\n\
\tthis.cameraP.aspect = width / height;\n\
\tthis.left = -width / 2;\n\
\tthis.right = width / 2\n\
\tthis.top = height / 2;\n\
\tthis.bottom = -height / 2;\n\
\n\
};\n\
\n\
\n\
THREE.CombinedCamera.prototype.setFov = function( fov ) {\n\
\n\
\tthis.fov = fov;\n\
\n\
\tif ( this.inPerspectiveMode ) {\n\
\n\
\t\tthis.toPerspective();\n\
\n\
\t} else {\n\
\n\
\t\tthis.toOrthographic();\n\
\n\
\t}\n\
\n\
};\n\
\n\
// For mantaining similar API with PerspectiveCamera\n\
\n\
THREE.CombinedCamera.prototype.updateProjectionMatrix = function() {\n\
\n\
\tif ( this.inPerspectiveMode ) {\n\
\n\
\t\tthis.toPerspective();\n\
\n\
\t} else {\n\
\n\
\t\tthis.toPerspective();\n\
\t\tthis.toOrthographic();\n\
\n\
\t}\n\
\n\
};\n\
\n\
/*\n\
* Uses Focal Length (in mm) to estimate and set FOV\n\
* 35mm (fullframe) camera is used if frame size is not specified;\n\
* Formula based on http://www.bobatkins.com/photography/technical/field_of_view.html\n\
*/\n\
THREE.CombinedCamera.prototype.setLens = function ( focalLength, frameHeight ) {\n\
\n\
\tif ( frameHeight === undefined ) frameHeight = 24;\n\
\n\
\tvar fov = 2 * Math.atan( frameHeight / ( focalLength * 2 ) ) * ( 180 / Math.PI );\n\
\n\
\tthis.setFov( fov );\n\
\n\
\treturn fov;\n\
};\n\
\n\
\n\
THREE.CombinedCamera.prototype.setZoom = function( zoom ) {\n\
\n\
\tthis.zoom = zoom;\n\
\n\
\tif ( this.inPerspectiveMode ) {\n\
\n\
\t\tthis.toPerspective();\n\
\n\
\t} else {\n\
\n\
\t\tthis.toOrthographic();\n\
\n\
\t}\n\
\n\
};\n\
\n\
THREE.CombinedCamera.prototype.toFrontView = function() {\n\
\n\
\tthis.rotation.x = 0;\n\
\tthis.rotation.y = 0;\n\
\tthis.rotation.z = 0;\n\
\n\
\t// should we be modifing the matrix instead?\n\
\n\
\tthis.rotationAutoUpdate = false;\n\
\n\
};\n\
\n\
THREE.CombinedCamera.prototype.toBackView = function() {\n\
\n\
\tthis.rotation.x = 0;\n\
\tthis.rotation.y = Math.PI;\n\
\tthis.rotation.z = 0;\n\
\tthis.rotationAutoUpdate = false;\n\
\n\
};\n\
\n\
THREE.CombinedCamera.prototype.toLeftView = function() {\n\
\n\
\tthis.rotation.x = 0;\n\
\tthis.rotation.y = - Math.PI / 2;\n\
\tthis.rotation.z = 0;\n\
\tthis.rotationAutoUpdate = false;\n\
\n\
};\n\
\n\
THREE.CombinedCamera.prototype.toRightView = function() {\n\
\n\
\tthis.rotation.x = 0;\n\
\tthis.rotation.y = Math.PI / 2;\n\
\tthis.rotation.z = 0;\n\
\tthis.rotationAutoUpdate = false;\n\
\n\
};\n\
\n\
THREE.CombinedCamera.prototype.toTopView = function() {\n\
\n\
\tthis.rotation.x = - Math.PI / 2;\n\
\tthis.rotation.y = 0;\n\
\tthis.rotation.z = 0;\n\
\tthis.rotationAutoUpdate = false;\n\
\n\
};\n\
\n\
THREE.CombinedCamera.prototype.toBottomView = function() {\n\
\n\
\tthis.rotation.x = Math.PI / 2;\n\
\tthis.rotation.y = 0;\n\
\tthis.rotation.z = 0;\n\
\tthis.rotationAutoUpdate = false;\n\
\n\
};\n\
\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 * @author alteredq / http://alteredqualia.com/\n\
 * @author paulirish / http://paulirish.com/\n\
 */\n\
\n\
THREE.FirstPersonControls = function ( object, domElement ) {\n\
\n\
\tthis.object = object;\n\
\tthis.target = new THREE.Vector3( 0, 0, 0 );\n\
\n\
\tthis.domElement = ( domElement !== undefined ) ? domElement : document;\n\
\n\
\tthis.movementSpeed = 1.0;\n\
\tthis.lookSpeed = 0.005;\n\
\n\
\tthis.lookVertical = true;\n\
\tthis.autoForward = false;\n\
\t// this.invertVertical = false;\n\
\n\
\tthis.activeLook = true;\n\
\n\
\tthis.heightSpeed = false;\n\
\tthis.heightCoef = 1.0;\n\
\tthis.heightMin = 0.0;\n\
\tthis.heightMax = 1.0;\n\
\n\
\tthis.constrainVertical = false;\n\
\tthis.verticalMin = 0;\n\
\tthis.verticalMax = Math.PI;\n\
\n\
\tthis.autoSpeedFactor = 0.0;\n\
\n\
\tthis.mouseX = 0;\n\
\tthis.mouseY = 0;\n\
\n\
\tthis.lat = 0;\n\
\tthis.lon = 0;\n\
\tthis.phi = 0;\n\
\tthis.theta = 0;\n\
\n\
\tthis.moveForward = false;\n\
\tthis.moveBackward = false;\n\
\tthis.moveLeft = false;\n\
\tthis.moveRight = false;\n\
\tthis.freeze = false;\n\
\n\
\tthis.mouseDragOn = false;\n\
\n\
\tthis.viewHalfX = 0;\n\
\tthis.viewHalfY = 0;\n\
\n\
\tif ( this.domElement !== document ) {\n\
\n\
\t\tthis.domElement.setAttribute( 'tabindex', -1 );\n\
\n\
\t}\n\
\n\
\t//\n\
\n\
\tthis.handleResize = function () {\n\
\n\
\t\tif ( this.domElement === document ) {\n\
\n\
\t\t\tthis.viewHalfX = window.innerWidth / 2;\n\
\t\t\tthis.viewHalfY = window.innerHeight / 2;\n\
\n\
\t\t} else {\n\
\n\
\t\t\tthis.viewHalfX = this.domElement.offsetWidth / 2;\n\
\t\t\tthis.viewHalfY = this.domElement.offsetHeight / 2;\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tthis.onMouseDown = function ( event ) {\n\
\n\
\t\tif ( this.domElement !== document ) {\n\
\n\
\t\t\tthis.domElement.focus();\n\
\n\
\t\t}\n\
\n\
\t\tevent.preventDefault();\n\
\t\tevent.stopPropagation();\n\
\n\
\t\tif ( this.activeLook ) {\n\
\n\
\t\t\tswitch ( event.button ) {\n\
\n\
\t\t\t\tcase 0: this.moveForward = true; break;\n\
\t\t\t\tcase 2: this.moveBackward = true; break;\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tthis.mouseDragOn = true;\n\
\n\
\t};\n\
\n\
\tthis.onMouseUp = function ( event ) {\n\
\n\
\t\tevent.preventDefault();\n\
\t\tevent.stopPropagation();\n\
\n\
\t\tif ( this.activeLook ) {\n\
\n\
\t\t\tswitch ( event.button ) {\n\
\n\
\t\t\t\tcase 0: this.moveForward = false; break;\n\
\t\t\t\tcase 2: this.moveBackward = false; break;\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tthis.mouseDragOn = false;\n\
\n\
\t};\n\
\n\
\tthis.onMouseMove = function ( event ) {\n\
\n\
\t\tif ( this.domElement === document ) {\n\
\n\
\t\t\tthis.mouseX = event.pageX - this.viewHalfX;\n\
\t\t\tthis.mouseY = event.pageY - this.viewHalfY;\n\
\n\
\t\t} else {\n\
\n\
\t\t\tthis.mouseX = event.pageX - this.domElement.offsetLeft - this.viewHalfX;\n\
\t\t\tthis.mouseY = event.pageY - this.domElement.offsetTop - this.viewHalfY;\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tthis.onKeyDown = function ( event ) {\n\
\n\
\t\t//event.preventDefault();\n\
\n\
\t\tswitch ( event.keyCode ) {\n\
\n\
\t\t\tcase 38: /*up*/\n\
\t\t\tcase 87: /*W*/ this.moveForward = true; break;\n\
\n\
\t\t\tcase 37: /*left*/\n\
\t\t\tcase 65: /*A*/ this.moveLeft = true; break;\n\
\n\
\t\t\tcase 40: /*down*/\n\
\t\t\tcase 83: /*S*/ this.moveBackward = true; break;\n\
\n\
\t\t\tcase 39: /*right*/\n\
\t\t\tcase 68: /*D*/ this.moveRight = true; break;\n\
\n\
\t\t\tcase 82: /*R*/ this.moveUp = true; break;\n\
\t\t\tcase 70: /*F*/ this.moveDown = true; break;\n\
\n\
\t\t\tcase 81: /*Q*/ this.freeze = !this.freeze; break;\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tthis.onKeyUp = function ( event ) {\n\
\n\
\t\tswitch( event.keyCode ) {\n\
\n\
\t\t\tcase 38: /*up*/\n\
\t\t\tcase 87: /*W*/ this.moveForward = false; break;\n\
\n\
\t\t\tcase 37: /*left*/\n\
\t\t\tcase 65: /*A*/ this.moveLeft = false; break;\n\
\n\
\t\t\tcase 40: /*down*/\n\
\t\t\tcase 83: /*S*/ this.moveBackward = false; break;\n\
\n\
\t\t\tcase 39: /*right*/\n\
\t\t\tcase 68: /*D*/ this.moveRight = false; break;\n\
\n\
\t\t\tcase 82: /*R*/ this.moveUp = false; break;\n\
\t\t\tcase 70: /*F*/ this.moveDown = false; break;\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tthis.update = function( delta ) {\n\
\t\tvar actualMoveSpeed = 0;\n\
\n\
\t\tif ( this.freeze ) {\n\
\n\
\t\t\treturn;\n\
\n\
\t\t} else {\n\
\n\
\t\t\tif ( this.heightSpeed ) {\n\
\n\
\t\t\t\tvar y = THREE.Math.clamp( this.object.position.y, this.heightMin, this.heightMax );\n\
\t\t\t\tvar heightDelta = y - this.heightMin;\n\
\n\
\t\t\t\tthis.autoSpeedFactor = delta * ( heightDelta * this.heightCoef );\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tthis.autoSpeedFactor = 0.0;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tactualMoveSpeed = delta * this.movementSpeed;\n\
\n\
\t\t\tif ( this.moveForward || ( this.autoForward && !this.moveBackward ) ) this.object.translateZ( - ( actualMoveSpeed + this.autoSpeedFactor ) );\n\
\t\t\tif ( this.moveBackward ) this.object.translateZ( actualMoveSpeed );\n\
\n\
\t\t\tif ( this.moveLeft ) this.object.translateX( - actualMoveSpeed );\n\
\t\t\tif ( this.moveRight ) this.object.translateX( actualMoveSpeed );\n\
\n\
\t\t\tif ( this.moveUp ) this.object.translateY( actualMoveSpeed );\n\
\t\t\tif ( this.moveDown ) this.object.translateY( - actualMoveSpeed );\n\
\n\
\t\t\tvar actualLookSpeed = delta * this.lookSpeed;\n\
\n\
\t\t\tif ( !this.activeLook ) {\n\
\n\
\t\t\t\tactualLookSpeed = 0;\n\
\n\
\t\t\t}\n\
\n\
\t\t\tthis.lon += this.mouseX * actualLookSpeed;\n\
\t\t\tif( this.lookVertical ) this.lat -= this.mouseY * actualLookSpeed; // * this.invertVertical?-1:1;\n\
\n\
\t\t\tthis.lat = Math.max( - 85, Math.min( 85, this.lat ) );\n\
\t\t\tthis.phi = ( 90 - this.lat ) * Math.PI / 180;\n\
\t\t\tthis.theta = this.lon * Math.PI / 180;\n\
\n\
\t\t\tvar targetPosition = this.target,\n\
\t\t\t\tposition = this.object.position;\n\
\n\
\t\t\ttargetPosition.x = position.x + 100 * Math.sin( this.phi ) * Math.cos( this.theta );\n\
\t\t\ttargetPosition.y = position.y + 100 * Math.cos( this.phi );\n\
\t\t\ttargetPosition.z = position.z + 100 * Math.sin( this.phi ) * Math.sin( this.theta );\n\
\n\
\t\t}\n\
\n\
\t\tvar verticalLookRatio = 1;\n\
\n\
\t\tif ( this.constrainVertical ) {\n\
\n\
\t\t\tverticalLookRatio = Math.PI / ( this.verticalMax - this.verticalMin );\n\
\n\
\t\t}\n\
\n\
\t\tthis.lon += this.mouseX * actualLookSpeed;\n\
\t\tif( this.lookVertical ) this.lat -= this.mouseY * actualLookSpeed * verticalLookRatio;\n\
\n\
\t\tthis.lat = Math.max( - 85, Math.min( 85, this.lat ) );\n\
\t\tthis.phi = ( 90 - this.lat ) * Math.PI / 180;\n\
\n\
\t\tthis.theta = this.lon * Math.PI / 180;\n\
\n\
\t\tif ( this.constrainVertical ) {\n\
\n\
\t\t\tthis.phi = THREE.Math.mapLinear( this.phi, 0, Math.PI, this.verticalMin, this.verticalMax );\n\
\n\
\t\t}\n\
\n\
\t\tvar targetPosition = this.target,\n\
\t\t\tposition = this.object.position;\n\
\n\
\t\ttargetPosition.x = position.x + 100 * Math.sin( this.phi ) * Math.cos( this.theta );\n\
\t\ttargetPosition.y = position.y + 100 * Math.cos( this.phi );\n\
\t\ttargetPosition.z = position.z + 100 * Math.sin( this.phi ) * Math.sin( this.theta );\n\
\n\
\t\tthis.object.lookAt( targetPosition );\n\
\n\
\t};\n\
\n\
\n\
\tthis.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );\n\
\n\
\tthis.domElement.addEventListener( 'mousemove', bind( this, this.onMouseMove ), false );\n\
\tthis.domElement.addEventListener( 'mousedown', bind( this, this.onMouseDown ), false );\n\
\tthis.domElement.addEventListener( 'mouseup', bind( this, this.onMouseUp ), false );\n\
\tthis.domElement.addEventListener( 'keydown', bind( this, this.onKeyDown ), false );\n\
\tthis.domElement.addEventListener( 'keyup', bind( this, this.onKeyUp ), false );\n\
\n\
\tfunction bind( scope, fn ) {\n\
\n\
\t\treturn function () {\n\
\n\
\t\t\tfn.apply( scope, arguments );\n\
\n\
\t\t};\n\
\n\
\t};\n\
\n\
\tthis.handleResize();\n\
\n\
};\n\
/**\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.PathControls = function ( object, domElement ) {\n\
\n\
\tthis.object = object;\n\
\tthis.domElement = ( domElement !== undefined ) ? domElement : document;\n\
\n\
\tthis.id = \"PathControls\" + THREE.PathControlsIdCounter ++;\n\
\n\
\t// API\n\
\n\
\tthis.duration = 10 * 1000; // milliseconds\n\
\tthis.waypoints = [];\n\
\n\
\tthis.useConstantSpeed = true;\n\
\tthis.resamplingCoef = 50;\n\
\n\
\tthis.debugPath = new THREE.Object3D();\n\
\tthis.debugDummy = new THREE.Object3D();\n\
\n\
\tthis.animationParent = new THREE.Object3D();\n\
\n\
\tthis.lookSpeed = 0.005;\n\
\tthis.lookVertical = true;\n\
\tthis.lookHorizontal = true;\n\
\tthis.verticalAngleMap   = { srcRange: [ 0, 2 * Math.PI ], dstRange: [ 0, 2 * Math.PI ] };\n\
\tthis.horizontalAngleMap = { srcRange: [ 0, 2 * Math.PI ], dstRange: [ 0, 2 * Math.PI ] };\n\
\n\
\t// internals\n\
\n\
\tthis.target = new THREE.Object3D();\n\
\n\
\tthis.mouseX = 0;\n\
\tthis.mouseY = 0;\n\
\n\
\tthis.lat = 0;\n\
\tthis.lon = 0;\n\
\n\
\tthis.phi = 0;\n\
\tthis.theta = 0;\n\
\n\
\tvar PI2 = Math.PI * 2,\n\
\t\tPI180 = Math.PI / 180;\n\
\n\
\tthis.viewHalfX = 0;\n\
\tthis.viewHalfY = 0;\n\
\n\
\tif ( this.domElement !== document ) {\n\
\n\
\t\tthis.domElement.setAttribute( 'tabindex', -1 );\n\
\n\
\t}\n\
\n\
\t// methods\n\
\n\
\tthis.handleResize = function () {\n\
\n\
\t\tif ( this.domElement === document ) {\n\
\n\
\t\t\tthis.viewHalfX = window.innerWidth / 2;\n\
\t\t\tthis.viewHalfY = window.innerHeight / 2;\n\
\n\
\t\t} else {\n\
\n\
\t\t\tthis.viewHalfX = this.domElement.offsetWidth / 2;\n\
\t\t\tthis.viewHalfY = this.domElement.offsetHeight / 2;\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tthis.update = function ( delta ) {\n\
\n\
\t\tvar srcRange, dstRange;\n\
\n\
\t\tif( this.lookHorizontal ) this.lon += this.mouseX * this.lookSpeed * delta;\n\
\t\tif( this.lookVertical )   this.lat -= this.mouseY * this.lookSpeed * delta;\n\
\n\
\t\tthis.lon = Math.max( 0, Math.min( 360, this.lon ) );\n\
\t\tthis.lat = Math.max( - 85, Math.min( 85, this.lat ) );\n\
\n\
\t\tthis.phi = ( 90 - this.lat ) * PI180;\n\
\t\tthis.theta = this.lon * PI180;\n\
\n\
\t\tthis.phi = normalize_angle_rad( this.phi );\n\
\n\
\t\t// constrain vertical look angle\n\
\n\
\t\tsrcRange = this.verticalAngleMap.srcRange;\n\
\t\tdstRange = this.verticalAngleMap.dstRange;\n\
\n\
\t\tvar tmpPhi = THREE.Math.mapLinear( this.phi, srcRange[ 0 ], srcRange[ 1 ], dstRange[ 0 ], dstRange[ 1 ] );\n\
\t\tvar tmpPhiFullRange = dstRange[ 1 ] - dstRange[ 0 ];\n\
\t\tvar tmpPhiNormalized = ( tmpPhi - dstRange[ 0 ] ) / tmpPhiFullRange;\n\
\n\
\t\tthis.phi = QuadraticEaseInOut( tmpPhiNormalized ) * tmpPhiFullRange + dstRange[ 0 ];\n\
\n\
\t\t// constrain horizontal look angle\n\
\n\
\t\tsrcRange = this.horizontalAngleMap.srcRange;\n\
\t\tdstRange = this.horizontalAngleMap.dstRange;\n\
\n\
\t\tvar tmpTheta = THREE.Math.mapLinear( this.theta, srcRange[ 0 ], srcRange[ 1 ], dstRange[ 0 ], dstRange[ 1 ] );\n\
\t\tvar tmpThetaFullRange = dstRange[ 1 ] - dstRange[ 0 ];\n\
\t\tvar tmpThetaNormalized = ( tmpTheta - dstRange[ 0 ] ) / tmpThetaFullRange;\n\
\n\
\t\tthis.theta = QuadraticEaseInOut( tmpThetaNormalized ) * tmpThetaFullRange + dstRange[ 0 ];\n\
\n\
\t\tvar targetPosition = this.target.position,\n\
\t\t\tposition = this.object.position;\n\
\n\
\t\ttargetPosition.x = 100 * Math.sin( this.phi ) * Math.cos( this.theta );\n\
\t\ttargetPosition.y = 100 * Math.cos( this.phi );\n\
\t\ttargetPosition.z = 100 * Math.sin( this.phi ) * Math.sin( this.theta );\n\
\n\
\t\tthis.object.lookAt( this.target.position );\n\
\n\
\t};\n\
\n\
\tthis.onMouseMove = function ( event ) {\n\
\n\
\t\tif ( this.domElement === document ) {\n\
\n\
\t\t\tthis.mouseX = event.pageX - this.viewHalfX;\n\
\t\t\tthis.mouseY = event.pageY - this.viewHalfY;\n\
\n\
\t\t} else {\n\
\n\
\t\t\tthis.mouseX = event.pageX - this.domElement.offsetLeft - this.viewHalfX;\n\
\t\t\tthis.mouseY = event.pageY - this.domElement.offsetTop - this.viewHalfY;\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\t// utils\n\
\n\
\tfunction normalize_angle_rad( a ) {\n\
\n\
\t\tvar b = a % PI2;\n\
\t\treturn b >= 0 ? b : b + PI2;\n\
\n\
\t};\n\
\n\
\tfunction distance( a, b ) {\n\
\n\
\t\tvar dx = a[ 0 ] - b[ 0 ],\n\
\t\t\tdy = a[ 1 ] - b[ 1 ],\n\
\t\t\tdz = a[ 2 ] - b[ 2 ];\n\
\n\
\t\treturn Math.sqrt( dx * dx + dy * dy + dz * dz );\n\
\n\
\t};\n\
\n\
\tfunction QuadraticEaseInOut ( k ) {\n\
\n\
\t\tif ( ( k *= 2 ) < 1 ) return 0.5 * k * k;\n\
\t\treturn - 0.5 * ( --k * ( k - 2 ) - 1 );\n\
\n\
\t};\n\
\n\
\tfunction bind( scope, fn ) {\n\
\n\
\t\treturn function () {\n\
\n\
\t\t\tfn.apply( scope, arguments );\n\
\n\
\t\t};\n\
\n\
\t};\n\
\n\
\tfunction initAnimationPath( parent, spline, name, duration ) {\n\
\n\
\t\tvar animationData = {\n\
\n\
\t\t   name: name,\n\
\t\t   fps: 0.6,\n\
\t\t   length: duration,\n\
\n\
\t\t   hierarchy: []\n\
\n\
\t\t};\n\
\n\
\t\tvar i,\n\
\t\t\tparentAnimation, childAnimation,\n\
\t\t\tpath = spline.getControlPointsArray(),\n\
\t\t\tsl = spline.getLength(),\n\
\t\t\tpl = path.length,\n\
\t\t\tt = 0,\n\
\t\t\tfirst = 0,\n\
\t\t\tlast  = pl - 1;\n\
\n\
\t\tparentAnimation = { parent: -1, keys: [] };\n\
\t\tparentAnimation.keys[ first ] = { time: 0,        pos: path[ first ], rot: [ 0, 0, 0, 1 ], scl: [ 1, 1, 1 ] };\n\
\t\tparentAnimation.keys[ last  ] = { time: duration, pos: path[ last ],  rot: [ 0, 0, 0, 1 ], scl: [ 1, 1, 1 ] };\n\
\n\
\t\tfor ( i = 1; i < pl - 1; i++ ) {\n\
\n\
\t\t\t// real distance (approximation via linear segments)\n\
\n\
\t\t\tt = duration * sl.chunks[ i ] / sl.total;\n\
\n\
\t\t\t// equal distance\n\
\n\
\t\t\t//t = duration * ( i / pl );\n\
\n\
\t\t\t// linear distance\n\
\n\
\t\t\t//t += duration * distance( path[ i ], path[ i - 1 ] ) / sl.total;\n\
\n\
\t\t\tparentAnimation.keys[ i ] = { time: t, pos: path[ i ] };\n\
\n\
\t\t}\n\
\n\
\t\tanimationData.hierarchy[ 0 ] = parentAnimation;\n\
\n\
\t\tTHREE.AnimationHandler.add( animationData );\n\
\n\
\t\treturn new THREE.Animation( parent, name, THREE.AnimationHandler.CATMULLROM_FORWARD, false );\n\
\n\
\t};\n\
\n\
\n\
\tfunction createSplineGeometry( spline, n_sub ) {\n\
\n\
\t\tvar i, index, position,\n\
\t\t\tgeometry = new THREE.Geometry();\n\
\n\
\t\tfor ( i = 0; i < spline.points.length * n_sub; i ++ ) {\n\
\n\
\t\t\tindex = i / ( spline.points.length * n_sub );\n\
\t\t\tposition = spline.getPoint( index );\n\
\n\
\t\t\tgeometry.vertices[ i ] = new THREE.Vector3( position.x, position.y, position.z );\n\
\n\
\t\t}\n\
\n\
\t\treturn geometry;\n\
\n\
\t};\n\
\n\
\tfunction createPath( parent, spline ) {\n\
\n\
\t\tvar lineGeo = createSplineGeometry( spline, 10 ),\n\
\t\t\tparticleGeo = createSplineGeometry( spline, 10 ),\n\
\t\t\tlineMat = new THREE.LineBasicMaterial( { color: 0xff0000, linewidth: 3 } ),\n\
\t\t\tlineObj = new THREE.Line( lineGeo, lineMat ),\n\
\t\t\tparticleObj = new THREE.ParticleSystem( particleGeo, new THREE.ParticleBasicMaterial( { color: 0xffaa00, size: 3 } ) );\n\
\n\
\t\tlineObj.scale.set( 1, 1, 1 );\n\
\t\tparent.add( lineObj );\n\
\n\
\t\tparticleObj.scale.set( 1, 1, 1 );\n\
\t\tparent.add( particleObj );\n\
\n\
\t\tvar waypoint,\n\
\t\t\tgeo = new THREE.SphereGeometry( 1, 16, 8 ),\n\
\t\t\tmat = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );\n\
\n\
\t\tfor ( var i = 0; i < spline.points.length; i ++ ) {\n\
\n\
\t\t\twaypoint = new THREE.Mesh( geo, mat );\n\
\t\t\twaypoint.position.copy( spline.points[ i ] );\n\
\t\t\tparent.add( waypoint );\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tthis.init = function ( ) {\n\
\n\
\t\t// constructor\n\
\n\
\t\tthis.spline = new THREE.Spline();\n\
\t\tthis.spline.initFromArray( this.waypoints );\n\
\n\
\t\tif ( this.useConstantSpeed ) {\n\
\n\
\t\t\tthis.spline.reparametrizeByArcLength( this.resamplingCoef );\n\
\n\
\t\t}\n\
\n\
\t\tif ( this.createDebugDummy ) {\n\
\n\
\t\t\tvar dummyParentMaterial = new THREE.MeshLambertMaterial( { color: 0x0077ff } ),\n\
\t\t\tdummyChildMaterial  = new THREE.MeshLambertMaterial( { color: 0x00ff00 } ),\n\
\t\t\tdummyParentGeo = new THREE.CubeGeometry( 10, 10, 20 ),\n\
\t\t\tdummyChildGeo  = new THREE.CubeGeometry( 2, 2, 10 );\n\
\n\
\t\t\tthis.animationParent = new THREE.Mesh( dummyParentGeo, dummyParentMaterial );\n\
\n\
\t\t\tvar dummyChild = new THREE.Mesh( dummyChildGeo, dummyChildMaterial );\n\
\t\t\tdummyChild.position.set( 0, 10, 0 );\n\
\n\
\t\t\tthis.animation = initAnimationPath( this.animationParent, this.spline, this.id, this.duration );\n\
\n\
\t\t\tthis.animationParent.add( this.object );\n\
\t\t\tthis.animationParent.add( this.target );\n\
\t\t\tthis.animationParent.add( dummyChild );\n\
\n\
\t\t} else {\n\
\n\
\t\t\tthis.animation = initAnimationPath( this.animationParent, this.spline, this.id, this.duration );\n\
\t\t\tthis.animationParent.add( this.target );\n\
\t\t\tthis.animationParent.add( this.object );\n\
\n\
\t\t}\n\
\n\
\t\tif ( this.createDebugPath ) {\n\
\n\
\t\t\tcreatePath( this.debugPath, this.spline );\n\
\n\
\t\t}\n\
\n\
\t\tthis.domElement.addEventListener( 'mousemove', bind( this, this.onMouseMove ), false );\n\
\n\
\t};\n\
\n\
\tthis.handleResize();\n\
\n\
};\n\
\n\
THREE.PathControlsIdCounter = 0;\n\
/**\n\
 * @author James Baicoianu / http://www.baicoianu.com/\n\
 */\n\
\n\
THREE.FlyControls = function ( object, domElement ) {\n\
\n\
\tthis.object = object;\n\
\n\
\tthis.domElement = ( domElement !== undefined ) ? domElement : document;\n\
\tif ( domElement ) this.domElement.setAttribute( 'tabindex', -1 );\n\
\n\
\t// API\n\
\n\
\tthis.movementSpeed = 1.0;\n\
\tthis.rollSpeed = 0.005;\n\
\n\
\tthis.dragToLook = false;\n\
\tthis.autoForward = false;\n\
\n\
\t// disable default target object behavior\n\
\n\
\tthis.object.useQuaternion = true;\n\
\n\
\t// internals\n\
\n\
\tthis.tmpQuaternion = new THREE.Quaternion();\n\
\n\
\tthis.mouseStatus = 0;\n\
\n\
\tthis.moveState = { up: 0, down: 0, left: 0, right: 0, forward: 0, back: 0, pitchUp: 0, pitchDown: 0, yawLeft: 0, yawRight: 0, rollLeft: 0, rollRight: 0 };\n\
\tthis.moveVector = new THREE.Vector3( 0, 0, 0 );\n\
\tthis.rotationVector = new THREE.Vector3( 0, 0, 0 );\n\
\n\
\tthis.handleEvent = function ( event ) {\n\
\n\
\t\tif ( typeof this[ event.type ] == 'function' ) {\n\
\n\
\t\t\tthis[ event.type ]( event );\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tthis.keydown = function( event ) {\n\
\n\
\t\tif ( event.altKey ) {\n\
\n\
\t\t\treturn;\n\
\n\
\t\t}\n\
\n\
\t\t//event.preventDefault();\n\
\n\
\t\tswitch ( event.keyCode ) {\n\
\n\
\t\t\tcase 16: /* shift */ this.movementSpeedMultiplier = .1; break;\n\
\n\
\t\t\tcase 87: /*W*/ this.moveState.forward = 1; break;\n\
\t\t\tcase 83: /*S*/ this.moveState.back = 1; break;\n\
\n\
\t\t\tcase 65: /*A*/ this.moveState.left = 1; break;\n\
\t\t\tcase 68: /*D*/ this.moveState.right = 1; break;\n\
\n\
\t\t\tcase 82: /*R*/ this.moveState.up = 1; break;\n\
\t\t\tcase 70: /*F*/ this.moveState.down = 1; break;\n\
\n\
\t\t\tcase 38: /*up*/ this.moveState.pitchUp = 1; break;\n\
\t\t\tcase 40: /*down*/ this.moveState.pitchDown = 1; break;\n\
\n\
\t\t\tcase 37: /*left*/ this.moveState.yawLeft = 1; break;\n\
\t\t\tcase 39: /*right*/ this.moveState.yawRight = 1; break;\n\
\n\
\t\t\tcase 81: /*Q*/ this.moveState.rollLeft = 1; break;\n\
\t\t\tcase 69: /*E*/ this.moveState.rollRight = 1; break;\n\
\n\
\t\t}\n\
\n\
\t\tthis.updateMovementVector();\n\
\t\tthis.updateRotationVector();\n\
\n\
\t};\n\
\n\
\tthis.keyup = function( event ) {\n\
\n\
\t\tswitch( event.keyCode ) {\n\
\n\
\t\t\tcase 16: /* shift */ this.movementSpeedMultiplier = 1; break;\n\
\n\
\t\t\tcase 87: /*W*/ this.moveState.forward = 0; break;\n\
\t\t\tcase 83: /*S*/ this.moveState.back = 0; break;\n\
\n\
\t\t\tcase 65: /*A*/ this.moveState.left = 0; break;\n\
\t\t\tcase 68: /*D*/ this.moveState.right = 0; break;\n\
\n\
\t\t\tcase 82: /*R*/ this.moveState.up = 0; break;\n\
\t\t\tcase 70: /*F*/ this.moveState.down = 0; break;\n\
\n\
\t\t\tcase 38: /*up*/ this.moveState.pitchUp = 0; break;\n\
\t\t\tcase 40: /*down*/ this.moveState.pitchDown = 0; break;\n\
\n\
\t\t\tcase 37: /*left*/ this.moveState.yawLeft = 0; break;\n\
\t\t\tcase 39: /*right*/ this.moveState.yawRight = 0; break;\n\
\n\
\t\t\tcase 81: /*Q*/ this.moveState.rollLeft = 0; break;\n\
\t\t\tcase 69: /*E*/ this.moveState.rollRight = 0; break;\n\
\n\
\t\t}\n\
\n\
\t\tthis.updateMovementVector();\n\
\t\tthis.updateRotationVector();\n\
\n\
\t};\n\
\n\
\tthis.mousedown = function( event ) {\n\
\n\
\t\tif ( this.domElement !== document ) {\n\
\n\
\t\t\tthis.domElement.focus();\n\
\n\
\t\t}\n\
\n\
\t\tevent.preventDefault();\n\
\t\tevent.stopPropagation();\n\
\n\
\t\tif ( this.dragToLook ) {\n\
\n\
\t\t\tthis.mouseStatus ++;\n\
\n\
\t\t} else {\n\
\n\
\t\t\tswitch ( event.button ) {\n\
\n\
\t\t\t\tcase 0: this.object.moveForward = true; break;\n\
\t\t\t\tcase 2: this.object.moveBackward = true; break;\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tthis.mousemove = function( event ) {\n\
\n\
\t\tif ( !this.dragToLook || this.mouseStatus > 0 ) {\n\
\n\
\t\t\tvar container = this.getContainerDimensions();\n\
\t\t\tvar halfWidth  = container.size[ 0 ] / 2;\n\
\t\t\tvar halfHeight = container.size[ 1 ] / 2;\n\
\n\
\t\t\tthis.moveState.yawLeft   = - ( ( event.pageX - container.offset[ 0 ] ) - halfWidth  ) / halfWidth;\n\
\t\t\tthis.moveState.pitchDown =   ( ( event.pageY - container.offset[ 1 ] ) - halfHeight ) / halfHeight;\n\
\n\
\t\t\tthis.updateRotationVector();\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tthis.mouseup = function( event ) {\n\
\n\
\t\tevent.preventDefault();\n\
\t\tevent.stopPropagation();\n\
\n\
\t\tif ( this.dragToLook ) {\n\
\n\
\t\t\tthis.mouseStatus --;\n\
\n\
\t\t\tthis.moveState.yawLeft = this.moveState.pitchDown = 0;\n\
\n\
\t\t} else {\n\
\n\
\t\t\tswitch ( event.button ) {\n\
\n\
\t\t\t\tcase 0: this.moveForward = false; break;\n\
\t\t\t\tcase 2: this.moveBackward = false; break;\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tthis.updateRotationVector();\n\
\n\
\t};\n\
\n\
\tthis.update = function( delta ) {\n\
\n\
\t\tvar moveMult = delta * this.movementSpeed;\n\
\t\tvar rotMult = delta * this.rollSpeed;\n\
\n\
\t\tthis.object.translateX( this.moveVector.x * moveMult );\n\
\t\tthis.object.translateY( this.moveVector.y * moveMult );\n\
\t\tthis.object.translateZ( this.moveVector.z * moveMult );\n\
\n\
\t\tthis.tmpQuaternion.set( this.rotationVector.x * rotMult, this.rotationVector.y * rotMult, this.rotationVector.z * rotMult, 1 ).normalize();\n\
\t\tthis.object.quaternion.multiplySelf( this.tmpQuaternion );\n\
\n\
\t\tthis.object.matrix.setPosition( this.object.position );\n\
\t\tthis.object.matrix.setRotationFromQuaternion( this.object.quaternion );\n\
\t\tthis.object.matrixWorldNeedsUpdate = true;\n\
\n\
\n\
\t};\n\
\n\
\tthis.updateMovementVector = function() {\n\
\n\
\t\tvar forward = ( this.moveState.forward || ( this.autoForward && !this.moveState.back ) ) ? 1 : 0;\n\
\n\
\t\tthis.moveVector.x = ( -this.moveState.left    + this.moveState.right );\n\
\t\tthis.moveVector.y = ( -this.moveState.down    + this.moveState.up );\n\
\t\tthis.moveVector.z = ( -forward + this.moveState.back );\n\
\n\
\t\t//console.log( 'move:', [ this.moveVector.x, this.moveVector.y, this.moveVector.z ] );\n\
\n\
\t};\n\
\n\
\tthis.updateRotationVector = function() {\n\
\n\
\t\tthis.rotationVector.x = ( -this.moveState.pitchDown + this.moveState.pitchUp );\n\
\t\tthis.rotationVector.y = ( -this.moveState.yawRight  + this.moveState.yawLeft );\n\
\t\tthis.rotationVector.z = ( -this.moveState.rollRight + this.moveState.rollLeft );\n\
\n\
\t\t//console.log( 'rotate:', [ this.rotationVector.x, this.rotationVector.y, this.rotationVector.z ] );\n\
\n\
\t};\n\
\n\
\tthis.getContainerDimensions = function() {\n\
\n\
\t\tif ( this.domElement != document ) {\n\
\n\
\t\t\treturn {\n\
\t\t\t\tsize\t: [ this.domElement.offsetWidth, this.domElement.offsetHeight ],\n\
\t\t\t\toffset\t: [ this.domElement.offsetLeft,  this.domElement.offsetTop ]\n\
\t\t\t};\n\
\n\
\t\t} else {\n\
\n\
\t\t\treturn {\n\
\t\t\t\tsize\t: [ window.innerWidth, window.innerHeight ],\n\
\t\t\t\toffset\t: [ 0, 0 ]\n\
\t\t\t};\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tfunction bind( scope, fn ) {\n\
\n\
\t\treturn function () {\n\
\n\
\t\t\tfn.apply( scope, arguments );\n\
\n\
\t\t};\n\
\n\
\t};\n\
\n\
\tthis.domElement.addEventListener( 'mousemove', bind( this, this.mousemove ), false );\n\
\tthis.domElement.addEventListener( 'mousedown', bind( this, this.mousedown ), false );\n\
\tthis.domElement.addEventListener( 'mouseup',   bind( this, this.mouseup ), false );\n\
\n\
\tthis.domElement.addEventListener( 'keydown', bind( this, this.keydown ), false );\n\
\tthis.domElement.addEventListener( 'keyup',   bind( this, this.keyup ), false );\n\
\n\
\tthis.updateMovementVector();\n\
\tthis.updateRotationVector();\n\
\n\
};\n\
/**\n\
 * @author mikael emtinger / http://gomo.se/\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.RollControls = function ( object, domElement ) {\n\
\n\
\tthis.object = object;\n\
\tthis.domElement = ( domElement !== undefined ) ? domElement : document;\n\
\n\
\t// API\n\
\n\
\tthis.mouseLook = true;\n\
\tthis.autoForward = false;\n\
\n\
\tthis.lookSpeed = 1;\n\
\tthis.movementSpeed = 1;\n\
\tthis.rollSpeed = 1;\n\
\n\
\tthis.constrainVertical = [ -0.9, 0.9 ];\n\
\n\
\t// disable default target object behavior\n\
\n\
\tthis.object.matrixAutoUpdate = false;\n\
\n\
\t// internals\n\
\n\
\tthis.forward = new THREE.Vector3( 0, 0, 1 );\n\
\tthis.roll = 0;\n\
\n\
\tvar xTemp = new THREE.Vector3();\n\
\tvar yTemp = new THREE.Vector3();\n\
\tvar zTemp = new THREE.Vector3();\n\
\tvar rollMatrix = new THREE.Matrix4();\n\
\n\
\tvar doRoll = false, rollDirection = 1, forwardSpeed = 0, sideSpeed = 0, upSpeed = 0;\n\
\n\
\tvar mouseX = 0, mouseY = 0;\n\
\n\
\tvar windowHalfX = 0;\n\
\tvar windowHalfY = 0;\n\
\n\
\t//\n\
\n\
\tthis.handleResize = function () {\n\
\n\
\t\twindowHalfX = window.innerWidth / 2;\n\
\t\twindowHalfY = window.innerHeight / 2;\n\
\n\
\t};\n\
\n\
\t// custom update\n\
\n\
\tthis.update = function ( delta ) {\n\
\n\
\t\tif ( this.mouseLook ) {\n\
\n\
\t\t\tvar actualLookSpeed = delta * this.lookSpeed;\n\
\n\
\t\t\tthis.rotateHorizontally( actualLookSpeed * mouseX );\n\
\t\t\tthis.rotateVertically( actualLookSpeed * mouseY );\n\
\n\
\t\t}\n\
\n\
\t\tvar actualSpeed = delta * this.movementSpeed;\n\
\t\tvar forwardOrAuto = ( forwardSpeed > 0 || ( this.autoForward && ! ( forwardSpeed < 0 ) ) ) ? 1 : forwardSpeed;\n\
\n\
\t\tthis.object.translateZ( -actualSpeed * forwardOrAuto );\n\
\t\tthis.object.translateX( actualSpeed * sideSpeed );\n\
\t\tthis.object.translateY( actualSpeed * upSpeed );\n\
\n\
\t\tif( doRoll ) {\n\
\n\
\t\t\tthis.roll += this.rollSpeed * delta * rollDirection;\n\
\n\
\t\t}\n\
\n\
\t\t// cap forward up / down\n\
\n\
\t\tif( this.forward.y > this.constrainVertical[ 1 ] ) {\n\
\n\
\t\t\tthis.forward.y = this.constrainVertical[ 1 ];\n\
\t\t\tthis.forward.normalize();\n\
\n\
\t\t} else if( this.forward.y < this.constrainVertical[ 0 ] ) {\n\
\n\
\t\t\tthis.forward.y = this.constrainVertical[ 0 ];\n\
\t\t\tthis.forward.normalize();\n\
\n\
\t\t}\n\
\n\
\n\
\t\t// construct unrolled camera matrix\n\
\n\
\t\tzTemp.copy( this.forward );\n\
\t\tyTemp.set( 0, 1, 0 );\n\
\n\
\t\txTemp.cross( yTemp, zTemp ).normalize();\n\
\t\tyTemp.cross( zTemp, xTemp ).normalize();\n\
\n\
\t\tthis.object.matrix.elements[0] = xTemp.x; this.object.matrix.elements[4] = yTemp.x; this.object.matrix.elements[8] = zTemp.x;\n\
\t\tthis.object.matrix.elements[1] = xTemp.y; this.object.matrix.elements[5] = yTemp.y; this.object.matrix.elements[9] = zTemp.y;\n\
\t\tthis.object.matrix.elements[2] = xTemp.z; this.object.matrix.elements[6] = yTemp.z; this.object.matrix.elements[10] = zTemp.z;\n\
\n\
\t\t// calculate roll matrix\n\
\n\
\t\trollMatrix.identity();\n\
\t\trollMatrix.elements[0] = Math.cos( this.roll ); rollMatrix.elements[4] = -Math.sin( this.roll );\n\
\t\trollMatrix.elements[1] = Math.sin( this.roll ); rollMatrix.elements[5] =  Math.cos( this.roll );\n\
\n\
\t\t// multiply camera with roll\n\
\n\
\t\tthis.object.matrix.multiplySelf( rollMatrix );\n\
\t\tthis.object.matrixWorldNeedsUpdate = true;\n\
\n\
\t\t// set position\n\
\n\
\t\tthis.object.matrix.elements[12] = this.object.position.x;\n\
\t\tthis.object.matrix.elements[13] = this.object.position.y;\n\
\t\tthis.object.matrix.elements[14] = this.object.position.z;\n\
\n\
\n\
\t};\n\
\n\
\tthis.translateX = function ( distance ) {\n\
\n\
\t\tthis.object.position.x += this.object.matrix.elements[0] * distance;\n\
\t\tthis.object.position.y += this.object.matrix.elements[1] * distance;\n\
\t\tthis.object.position.z += this.object.matrix.elements[2] * distance;\n\
\n\
\t};\n\
\n\
\tthis.translateY = function ( distance ) {\n\
\n\
\t\tthis.object.position.x += this.object.matrix.elements[4] * distance;\n\
\t\tthis.object.position.y += this.object.matrix.elements[5] * distance;\n\
\t\tthis.object.position.z += this.object.matrix.elements[6] * distance;\n\
\n\
\t};\n\
\n\
\tthis.translateZ = function ( distance ) {\n\
\n\
\t\tthis.object.position.x -= this.object.matrix.elements[8] * distance;\n\
\t\tthis.object.position.y -= this.object.matrix.elements[9] * distance;\n\
\t\tthis.object.position.z -= this.object.matrix.elements[10] * distance;\n\
\n\
\t};\n\
\n\
\n\
\tthis.rotateHorizontally = function ( amount ) {\n\
\n\
\t\t// please note that the amount is NOT degrees, but a scale value\n\
\n\
\t\txTemp.set( this.object.matrix.elements[0], this.object.matrix.elements[1], this.object.matrix.elements[2] );\n\
\t\txTemp.multiplyScalar( amount );\n\
\n\
\t\tthis.forward.subSelf( xTemp );\n\
\t\tthis.forward.normalize();\n\
\n\
\t};\n\
\n\
\tthis.rotateVertically = function ( amount ) {\n\
\n\
\t\t// please note that the amount is NOT degrees, but a scale value\n\
\n\
\t\tyTemp.set( this.object.matrix.elements[4], this.object.matrix.elements[5], this.object.matrix.elements[6] );\n\
\t\tyTemp.multiplyScalar( amount );\n\
\n\
\t\tthis.forward.addSelf( yTemp );\n\
\t\tthis.forward.normalize();\n\
\n\
\t};\n\
\n\
\tfunction onKeyDown( event ) {\n\
\n\
\t\t//event.preventDefault();\n\
\n\
\t\tswitch ( event.keyCode ) {\n\
\n\
\t\t\tcase 38: /*up*/\n\
\t\t\tcase 87: /*W*/ forwardSpeed = 1; break;\n\
\n\
\t\t\tcase 37: /*left*/\n\
\t\t\tcase 65: /*A*/ sideSpeed = -1; break;\n\
\n\
\t\t\tcase 40: /*down*/\n\
\t\t\tcase 83: /*S*/ forwardSpeed = -1; break;\n\
\n\
\t\t\tcase 39: /*right*/\n\
\t\t\tcase 68: /*D*/ sideSpeed = 1; break;\n\
\n\
\t\t\tcase 81: /*Q*/ doRoll = true; rollDirection = 1; break;\n\
\t\t\tcase 69: /*E*/ doRoll = true; rollDirection = -1; break;\n\
\n\
\t\t\tcase 82: /*R*/ upSpeed = 1; break;\n\
\t\t\tcase 70: /*F*/ upSpeed = -1; break;\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tfunction onKeyUp( event ) {\n\
\n\
\t\tswitch( event.keyCode ) {\n\
\n\
\t\t\tcase 38: /*up*/\n\
\t\t\tcase 87: /*W*/ forwardSpeed = 0; break;\n\
\n\
\t\t\tcase 37: /*left*/\n\
\t\t\tcase 65: /*A*/ sideSpeed = 0; break;\n\
\n\
\t\t\tcase 40: /*down*/\n\
\t\t\tcase 83: /*S*/ forwardSpeed = 0; break;\n\
\n\
\t\t\tcase 39: /*right*/\n\
\t\t\tcase 68: /*D*/ sideSpeed = 0; break;\n\
\n\
\t\t\tcase 81: /*Q*/ doRoll = false; break;\n\
\t\t\tcase 69: /*E*/ doRoll = false; break;\n\
\n\
\t\t\tcase 82: /*R*/ upSpeed = 0; break;\n\
\t\t\tcase 70: /*F*/ upSpeed = 0; break;\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tfunction onMouseMove( event ) {\n\
\n\
\t\tmouseX = ( event.clientX - windowHalfX ) / window.innerWidth;\n\
\t\tmouseY = ( event.clientY - windowHalfY ) / window.innerHeight;\n\
\n\
\t};\n\
\n\
\tfunction onMouseDown ( event ) {\n\
\n\
\t\tevent.preventDefault();\n\
\t\tevent.stopPropagation();\n\
\n\
\t\tswitch ( event.button ) {\n\
\n\
\t\t\tcase 0: forwardSpeed = 1; break;\n\
\t\t\tcase 2: forwardSpeed = -1; break;\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tfunction onMouseUp ( event ) {\n\
\n\
\t\tevent.preventDefault();\n\
\t\tevent.stopPropagation();\n\
\n\
\t\tswitch ( event.button ) {\n\
\n\
\t\t\tcase 0: forwardSpeed = 0; break;\n\
\t\t\tcase 2: forwardSpeed = 0; break;\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tthis.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );\n\
\n\
\tthis.domElement.addEventListener( 'mousemove', onMouseMove, false );\n\
\tthis.domElement.addEventListener( 'mousedown', onMouseDown, false );\n\
\tthis.domElement.addEventListener( 'mouseup', onMouseUp, false );\n\
\tthis.domElement.addEventListener( 'keydown', onKeyDown, false );\n\
\tthis.domElement.addEventListener( 'keyup', onKeyUp, false );\n\
\n\
\tthis.handleResize();\n\
\n\
};\n\
/**\n\
 * @author Eberhard Graether / http://egraether.com/\n\
 */\n\
\n\
THREE.TrackballControls = function ( object, domElement ) {\n\
\n\
\tTHREE.EventTarget.call( this );\n\
\n\
\tvar _this = this,\n\
\tSTATE = { NONE : -1, ROTATE : 0, ZOOM : 1, PAN : 2 };\n\
\n\
\tthis.object = object;\n\
\tthis.domElement = ( domElement !== undefined ) ? domElement : document;\n\
\n\
\t// API\n\
\n\
\tthis.enabled = true;\n\
\n\
\tthis.screen = { width: 0, height: 0, offsetLeft: 0, offsetTop: 0 };\n\
\tthis.radius = ( this.screen.width + this.screen.height ) / 4;\n\
\n\
\tthis.rotateSpeed = 1.0;\n\
\tthis.zoomSpeed = 1.2;\n\
\tthis.panSpeed = 0.3;\n\
\n\
\tthis.noRotate = false;\n\
\tthis.noZoom = false;\n\
\tthis.noPan = false;\n\
\n\
\tthis.staticMoving = false;\n\
\tthis.dynamicDampingFactor = 0.2;\n\
\n\
\tthis.minDistance = 0;\n\
\tthis.maxDistance = Infinity;\n\
\n\
\tthis.keys = [ 65 /*A*/, 83 /*S*/, 68 /*D*/ ];\n\
\n\
\t// internals\n\
\n\
\tthis.target = new THREE.Vector3();\n\
\n\
\tvar lastPosition = new THREE.Vector3();\n\
\n\
\tvar _keyPressed = false,\n\
\t_state = STATE.NONE,\n\
\n\
\t_eye = new THREE.Vector3(),\n\
\n\
\t_rotateStart = new THREE.Vector3(),\n\
\t_rotateEnd = new THREE.Vector3(),\n\
\n\
\t_zoomStart = new THREE.Vector2(),\n\
\t_zoomEnd = new THREE.Vector2(),\n\
\n\
\t_panStart = new THREE.Vector2(),\n\
\t_panEnd = new THREE.Vector2();\n\
\n\
\t// events\n\
\n\
\tvar changeEvent = { type: 'change' };\n\
\n\
\n\
\t// methods\n\
\n\
\tthis.handleResize = function () {\n\
\n\
\t\tthis.screen.width = window.innerWidth;\n\
\t\tthis.screen.height = window.innerHeight;\n\
\n\
\t\tthis.screen.offsetLeft = 0;\n\
\t\tthis.screen.offsetTop = 0;\n\
\n\
\t\tthis.radius = ( this.screen.width + this.screen.height ) / 4;\n\
\t};\n\
\n\
\tthis.handleEvent = function ( event ) {\n\
\n\
\t\tif ( typeof this[ event.type ] == 'function' ) {\n\
\n\
\t\t\tthis[ event.type ]( event );\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tthis.getMouseOnScreen = function ( clientX, clientY ) {\n\
\n\
\t\treturn new THREE.Vector2(\n\
\t\t\t( clientX - _this.screen.offsetLeft ) / _this.radius * 0.5,\n\
\t\t\t( clientY - _this.screen.offsetTop ) / _this.radius * 0.5\n\
\t\t);\n\
\n\
\t};\n\
\n\
\tthis.getMouseProjectionOnBall = function ( clientX, clientY ) {\n\
\n\
\t\tvar mouseOnBall = new THREE.Vector3(\n\
\t\t\t( clientX - _this.screen.width * 0.5 - _this.screen.offsetLeft ) / _this.radius,\n\
\t\t\t( _this.screen.height * 0.5 + _this.screen.offsetTop - clientY ) / _this.radius,\n\
\t\t\t0.0\n\
\t\t);\n\
\n\
\t\tvar length = mouseOnBall.length();\n\
\n\
\t\tif ( length > 1.0 ) {\n\
\n\
\t\t\tmouseOnBall.normalize();\n\
\n\
\t\t} else {\n\
\n\
\t\t\tmouseOnBall.z = Math.sqrt( 1.0 - length * length );\n\
\n\
\t\t}\n\
\n\
\t\t_eye.copy( _this.object.position ).subSelf( _this.target );\n\
\n\
\t\tvar projection = _this.object.up.clone().setLength( mouseOnBall.y );\n\
\t\tprojection.addSelf( _this.object.up.clone().crossSelf( _eye ).setLength( mouseOnBall.x ) );\n\
\t\tprojection.addSelf( _eye.setLength( mouseOnBall.z ) );\n\
\n\
\t\treturn projection;\n\
\n\
\t};\n\
\n\
\tthis.rotateCamera = function () {\n\
\n\
\t\tvar angle = Math.acos( _rotateStart.dot( _rotateEnd ) / _rotateStart.length() / _rotateEnd.length() );\n\
\n\
\t\tif ( angle ) {\n\
\n\
\t\t\tvar axis = ( new THREE.Vector3() ).cross( _rotateStart, _rotateEnd ).normalize(),\n\
\t\t\t\tquaternion = new THREE.Quaternion();\n\
\n\
\t\t\tangle *= _this.rotateSpeed;\n\
\n\
\t\t\tquaternion.setFromAxisAngle( axis, -angle );\n\
\n\
\t\t\tquaternion.multiplyVector3( _eye );\n\
\t\t\tquaternion.multiplyVector3( _this.object.up );\n\
\n\
\t\t\tquaternion.multiplyVector3( _rotateEnd );\n\
\n\
\t\t\tif ( _this.staticMoving ) {\n\
\n\
\t\t\t\t_rotateStart.copy( _rotateEnd );\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tquaternion.setFromAxisAngle( axis, angle * ( _this.dynamicDampingFactor - 1.0 ) );\n\
\t\t\t\tquaternion.multiplyVector3( _rotateStart );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tthis.zoomCamera = function () {\n\
\n\
\t\tvar factor = 1.0 + ( _zoomEnd.y - _zoomStart.y ) * _this.zoomSpeed;\n\
\n\
\t\tif ( factor !== 1.0 && factor > 0.0 ) {\n\
\n\
\t\t\t_eye.multiplyScalar( factor );\n\
\n\
\t\t\tif ( _this.staticMoving ) {\n\
\n\
\t\t\t\t_zoomStart.copy( _zoomEnd );\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\t_zoomStart.y += ( _zoomEnd.y - _zoomStart.y ) * this.dynamicDampingFactor;\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tthis.panCamera = function () {\n\
\n\
\t\tvar mouseChange = _panEnd.clone().subSelf( _panStart );\n\
\n\
\t\tif ( mouseChange.lengthSq() ) {\n\
\n\
\t\t\tmouseChange.multiplyScalar( _eye.length() * _this.panSpeed );\n\
\n\
\t\t\tvar pan = _eye.clone().crossSelf( _this.object.up ).setLength( mouseChange.x );\n\
\t\t\tpan.addSelf( _this.object.up.clone().setLength( mouseChange.y ) );\n\
\n\
\t\t\t_this.object.position.addSelf( pan );\n\
\t\t\t_this.target.addSelf( pan );\n\
\n\
\t\t\tif ( _this.staticMoving ) {\n\
\n\
\t\t\t\t_panStart = _panEnd;\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\t_panStart.addSelf( mouseChange.sub( _panEnd, _panStart ).multiplyScalar( _this.dynamicDampingFactor ) );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tthis.checkDistances = function () {\n\
\n\
\t\tif ( !_this.noZoom || !_this.noPan ) {\n\
\n\
\t\t\tif ( _this.object.position.lengthSq() > _this.maxDistance * _this.maxDistance ) {\n\
\n\
\t\t\t\t_this.object.position.setLength( _this.maxDistance );\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( _eye.lengthSq() < _this.minDistance * _this.minDistance ) {\n\
\n\
\t\t\t\t_this.object.position.add( _this.target, _eye.setLength( _this.minDistance ) );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tthis.update = function () {\n\
\n\
\t\t_eye.copy( _this.object.position ).subSelf( _this.target );\n\
\n\
\t\tif ( !_this.noRotate ) {\n\
\n\
\t\t\t_this.rotateCamera();\n\
\n\
\t\t}\n\
\n\
\t\tif ( !_this.noZoom ) {\n\
\n\
\t\t\t_this.zoomCamera();\n\
\n\
\t\t}\n\
\n\
\t\tif ( !_this.noPan ) {\n\
\n\
\t\t\t_this.panCamera();\n\
\n\
\t\t}\n\
\n\
\t\t_this.object.position.add( _this.target, _eye );\n\
\n\
\t\t_this.checkDistances();\n\
\n\
\t\t_this.object.lookAt( _this.target );\n\
\n\
\t\tif ( lastPosition.distanceToSquared( _this.object.position ) > 0 ) {\n\
\n\
\t\t\t_this.dispatchEvent( changeEvent );\n\
\n\
\t\t\tlastPosition.copy( _this.object.position );\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\t// listeners\n\
\n\
\tfunction keydown( event ) {\n\
\n\
\t\tif ( ! _this.enabled ) return;\n\
\n\
\t\t//event.preventDefault();\n\
\n\
\t\tif ( _state !== STATE.NONE ) {\n\
\n\
\t\t\treturn;\n\
\n\
\t\t} else if ( event.keyCode === _this.keys[ STATE.ROTATE ] && !_this.noRotate ) {\n\
\n\
\t\t\t_state = STATE.ROTATE;\n\
\n\
\t\t} else if ( event.keyCode === _this.keys[ STATE.ZOOM ] && !_this.noZoom ) {\n\
\n\
\t\t\t_state = STATE.ZOOM;\n\
\n\
\t\t} else if ( event.keyCode === _this.keys[ STATE.PAN ] && !_this.noPan ) {\n\
\n\
\t\t\t_state = STATE.PAN;\n\
\n\
\t\t}\n\
\n\
\t\tif ( _state !== STATE.NONE ) {\n\
\n\
\t\t\t_keyPressed = true;\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\tfunction keyup( event ) {\n\
\n\
\t\tif ( ! _this.enabled ) return;\n\
\n\
\t\tif ( _state !== STATE.NONE ) {\n\
\n\
\t\t\t_state = STATE.NONE;\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\tfunction mousedown( event ) {\n\
\n\
\t\tif ( ! _this.enabled ) return;\n\
\n\
\t\tevent.preventDefault();\n\
\t\tevent.stopPropagation();\n\
\n\
\t\tif ( _state === STATE.NONE ) {\n\
\n\
\t\t\t_state = event.button;\n\
\n\
\t\t\tif ( _state === STATE.ROTATE && !_this.noRotate ) {\n\
\n\
\t\t\t\t_rotateStart = _rotateEnd = _this.getMouseProjectionOnBall( event.clientX, event.clientY );\n\
\n\
\t\t\t} else if ( _state === STATE.ZOOM && !_this.noZoom ) {\n\
\n\
\t\t\t\t_zoomStart = _zoomEnd = _this.getMouseOnScreen( event.clientX, event.clientY );\n\
\n\
\t\t\t} else if ( !this.noPan ) {\n\
\n\
\t\t\t\t_panStart = _panEnd = _this.getMouseOnScreen( event.clientX, event.clientY );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\tfunction mousemove( event ) {\n\
\n\
\t\tif ( ! _this.enabled ) return;\n\
\n\
\t\tif ( _keyPressed ) {\n\
\n\
\t\t\t_rotateStart = _rotateEnd = _this.getMouseProjectionOnBall( event.clientX, event.clientY );\n\
\t\t\t_zoomStart = _zoomEnd = _this.getMouseOnScreen( event.clientX, event.clientY );\n\
\t\t\t_panStart = _panEnd = _this.getMouseOnScreen( event.clientX, event.clientY );\n\
\n\
\t\t\t_keyPressed = false;\n\
\n\
\t\t}\n\
\n\
\t\tif ( _state === STATE.NONE ) {\n\
\n\
\t\t\treturn;\n\
\n\
\t\t} else if ( _state === STATE.ROTATE && !_this.noRotate ) {\n\
\n\
\t\t\t_rotateEnd = _this.getMouseProjectionOnBall( event.clientX, event.clientY );\n\
\n\
\t\t} else if ( _state === STATE.ZOOM && !_this.noZoom ) {\n\
\n\
\t\t\t_zoomEnd = _this.getMouseOnScreen( event.clientX, event.clientY );\n\
\n\
\t\t} else if ( _state === STATE.PAN && !_this.noPan ) {\n\
\n\
\t\t\t_panEnd = _this.getMouseOnScreen( event.clientX, event.clientY );\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\tfunction mouseup( event ) {\n\
\n\
\t\tif ( ! _this.enabled ) return;\n\
\n\
\t\tevent.preventDefault();\n\
\t\tevent.stopPropagation();\n\
\n\
\t\t_state = STATE.NONE;\n\
\n\
\t}\n\
\n\
\tfunction mousewheel( event ) {\n\
\n\
\t\tif ( ! _this.enabled ) return;\n\
\n\
\t\tevent.preventDefault();\n\
\t\tevent.stopPropagation();\n\
\n\
\t\tvar delta = 0;\n\
\n\
\t\tif ( event.wheelDelta ) { // WebKit / Opera / Explorer 9\n\
\n\
\t\t\tdelta = event.wheelDelta / 40;\n\
\n\
\t\t} else if ( event.detail ) { // Firefox\n\
\n\
\t\t\tdelta = - event.detail / 3;\n\
\n\
\t\t}\n\
\n\
\t\t_zoomStart.y += ( 1 / delta ) * 0.05;\n\
\n\
\t}\n\
\n\
\tthis.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );\n\
\n\
\tthis.domElement.addEventListener( 'mousemove', mousemove, false );\n\
\tthis.domElement.addEventListener( 'mousedown', mousedown, false );\n\
\tthis.domElement.addEventListener( 'mouseup', mouseup, false );\n\
\tthis.domElement.addEventListener( 'DOMMouseScroll', mousewheel, false );\n\
\tthis.domElement.addEventListener( 'mousewheel', mousewheel, false );\n\
\n\
\twindow.addEventListener( 'keydown', keydown, false );\n\
\twindow.addEventListener( 'keyup', keyup, false );\n\
\n\
\tthis.handleResize();\n\
\n\
};\n\
/**\n\
 * @author qiao / https://github.com/qiao\n\
 * @author mrdoob / http://mrdoob.com\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.OrbitControls = function ( object, domElement ) {\n\
\n\
\tTHREE.EventTarget.call( this );\n\
\n\
\tthis.object = object;\n\
\tthis.domElement = ( domElement !== undefined ) ? domElement : document;\n\
\n\
\t// API\n\
\n\
\tthis.center = new THREE.Vector3();\n\
\n\
\tthis.userZoom = true;\n\
\tthis.userZoomSpeed = 1.0;\n\
\n\
\tthis.userRotate = true;\n\
\tthis.userRotateSpeed = 1.0;\n\
\n\
\tthis.autoRotate = false;\n\
\tthis.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60\n\
\n\
\t// internals\n\
\n\
\tvar scope = this;\n\
\n\
\tvar EPS = 0.000001;\n\
\tvar PIXELS_PER_ROUND = 1800;\n\
\n\
\tvar rotateStart = new THREE.Vector2();\n\
\tvar rotateEnd = new THREE.Vector2();\n\
\tvar rotateDelta = new THREE.Vector2();\n\
\n\
\tvar zoomStart = new THREE.Vector2();\n\
\tvar zoomEnd = new THREE.Vector2();\n\
\tvar zoomDelta = new THREE.Vector2();\n\
\n\
\tvar phiDelta = 0;\n\
\tvar thetaDelta = 0;\n\
\tvar scale = 1;\n\
\n\
\tvar lastPosition = new THREE.Vector3();\n\
\n\
\tvar STATE = { NONE : -1, ROTATE : 0, ZOOM : 1 };\n\
\tvar state = STATE.NONE;\n\
\n\
\t// events\n\
\n\
\tvar changeEvent = { type: 'change' };\n\
\n\
\n\
\tthis.rotateLeft = function ( angle ) {\n\
\n\
\t\tif ( angle === undefined ) {\n\
\n\
\t\t\tangle = getAutoRotationAngle();\n\
\n\
\t\t}\n\
\n\
\t\tthetaDelta -= angle;\n\
\n\
\t};\n\
\n\
\tthis.rotateRight = function ( angle ) {\n\
\n\
\t\tif ( angle === undefined ) {\n\
\n\
\t\t\tangle = getAutoRotationAngle();\n\
\n\
\t\t}\n\
\n\
\t\tthetaDelta += angle;\n\
\n\
\t};\n\
\n\
\tthis.rotateUp = function ( angle ) {\n\
\n\
\t\tif ( angle === undefined ) {\n\
\n\
\t\t\tangle = getAutoRotationAngle();\n\
\n\
\t\t}\n\
\n\
\t\tphiDelta -= angle;\n\
\n\
\t};\n\
\n\
\tthis.rotateDown = function ( angle ) {\n\
\n\
\t\tif ( angle === undefined ) {\n\
\n\
\t\t\tangle = getAutoRotationAngle();\n\
\n\
\t\t}\n\
\n\
\t\tphiDelta += angle;\n\
\n\
\t};\n\
\n\
\tthis.zoomIn = function ( zoomScale ) {\n\
\n\
\t\tif ( zoomScale === undefined ) {\n\
\n\
\t\t\tzoomScale = getZoomScale();\n\
\n\
\t\t}\n\
\n\
\t\tscale /= zoomScale;\n\
\n\
\t};\n\
\n\
\tthis.zoomOut = function ( zoomScale ) {\n\
\n\
\t\tif ( zoomScale === undefined ) {\n\
\n\
\t\t\tzoomScale = getZoomScale();\n\
\n\
\t\t}\n\
\n\
\t\tscale *= zoomScale;\n\
\n\
\t};\n\
\n\
\tthis.update = function () {\n\
\n\
\t\tvar position = this.object.position;\n\
\t\tvar offset = position.clone().subSelf( this.center )\n\
\n\
\t\t// angle from z-axis around y-axis\n\
\n\
\t\tvar theta = Math.atan2( offset.x, offset.z );\n\
\n\
\t\t// angle from y-axis\n\
\n\
\t\tvar phi = Math.atan2( Math.sqrt( offset.x * offset.x + offset.z * offset.z ), offset.y );\n\
\n\
\t\tif ( this.autoRotate ) {\n\
\n\
\t\t\tthis.rotateLeft( getAutoRotationAngle() );\n\
\n\
\t\t}\n\
\n\
\t\ttheta += thetaDelta;\n\
\t\tphi += phiDelta;\n\
\n\
\t\t// restrict phi to be betwee EPS and PI-EPS\n\
\n\
\t\tphi = Math.max( EPS, Math.min( Math.PI - EPS, phi ) );\n\
\n\
\t\tvar radius = offset.length();\n\
\t\toffset.x = radius * Math.sin( phi ) * Math.sin( theta );\n\
\t\toffset.y = radius * Math.cos( phi );\n\
\t\toffset.z = radius * Math.sin( phi ) * Math.cos( theta );\n\
\t\toffset.multiplyScalar( scale );\n\
\n\
\t\tposition.copy( this.center ).addSelf( offset );\n\
\n\
\t\tthis.object.lookAt( this.center );\n\
\n\
\t\tthetaDelta = 0;\n\
\t\tphiDelta = 0;\n\
\t\tscale = 1;\n\
\n\
\t\tif ( lastPosition.distanceTo( this.object.position ) > 0 ) {\n\
\n\
\t\t\tthis.dispatchEvent( changeEvent );\n\
\n\
\t\t\tlastPosition.copy( this.object.position );\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\n\
\tfunction getAutoRotationAngle() {\n\
\n\
\t\treturn 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;\n\
\n\
\t}\n\
\n\
\tfunction getZoomScale() {\n\
\n\
\t\treturn Math.pow( 0.95, scope.userZoomSpeed );\n\
\n\
\t}\n\
\n\
\tfunction onMouseDown( event ) {\n\
\n\
\t\tif ( !scope.userRotate ) return;\n\
\n\
\t\tevent.preventDefault();\n\
\n\
\t\tif ( event.button === 0 || event.button === 2 ) {\n\
\n\
\t\t\tstate = STATE.ROTATE;\n\
\n\
\t\t\trotateStart.set( event.clientX, event.clientY );\n\
\n\
\t\t} else if ( event.button === 1 ) {\n\
\n\
\t\t\tstate = STATE.ZOOM;\n\
\n\
\t\t\tzoomStart.set( event.clientX, event.clientY );\n\
\n\
\t\t}\n\
\n\
\t\tdocument.addEventListener( 'mousemove', onMouseMove, false );\n\
\t\tdocument.addEventListener( 'mouseup', onMouseUp, false );\n\
\n\
\t}\n\
\n\
\tfunction onMouseMove( event ) {\n\
\n\
\t\tevent.preventDefault();\n\
\n\
\t\tif ( state === STATE.ROTATE ) {\n\
\n\
\t\t\trotateEnd.set( event.clientX, event.clientY );\n\
\t\t\trotateDelta.sub( rotateEnd, rotateStart );\n\
\n\
\t\t\tscope.rotateLeft( 2 * Math.PI * rotateDelta.x / PIXELS_PER_ROUND * scope.userRotateSpeed );\n\
\t\t\tscope.rotateUp( 2 * Math.PI * rotateDelta.y / PIXELS_PER_ROUND * scope.userRotateSpeed );\n\
\n\
\t\t\trotateStart.copy( rotateEnd );\n\
\n\
\t\t} else if ( state === STATE.ZOOM ) {\n\
\n\
\t\t\tzoomEnd.set( event.clientX, event.clientY );\n\
\t\t\tzoomDelta.sub( zoomEnd, zoomStart );\n\
\n\
\t\t\tif ( zoomDelta.y > 0 ) {\n\
\n\
\t\t\t\tscope.zoomIn();\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tscope.zoomOut();\n\
\n\
\t\t\t}\n\
\n\
\t\t\tzoomStart.copy( zoomEnd );\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\tfunction onMouseUp( event ) {\n\
\n\
\t\tif ( ! scope.userRotate ) return;\n\
\n\
\t\tdocument.removeEventListener( 'mousemove', onMouseMove, false );\n\
\t\tdocument.removeEventListener( 'mouseup', onMouseUp, false );\n\
\n\
\t\tstate = STATE.NONE;\n\
\n\
\t}\n\
\n\
\tfunction onMouseWheel( event ) {\n\
\n\
\t\tif ( ! scope.userZoom ) return;\n\
\n\
\t\tif ( event.wheelDelta > 0 ) {\n\
\n\
\t\t\tscope.zoomOut();\n\
\n\
\t\t} else {\n\
\n\
\t\t\tscope.zoomIn();\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\tthis.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );\n\
\tthis.domElement.addEventListener( 'mousedown', onMouseDown, false );\n\
\tthis.domElement.addEventListener( 'mousewheel', onMouseWheel, false );\n\
\n\
};\n\
/**\n\
 * @author hughes\n\
 */\n\
\n\
THREE.CircleGeometry = function ( radius, segments, thetaStart, thetaLength ) {\n\
\n\
    THREE.Geometry.call( this );\n\
\n\
    radius = radius || 50;\n\
\n\
    thetaStart = thetaStart !== undefined ? thetaStart : 0;\n\
    thetaLength = thetaLength !== undefined ? thetaLength : Math.PI * 2;\n\
    segments = segments !== undefined ? Math.max( 3, segments ) : 8;\n\
\n\
    var i, uvs = [],\n\
    center = new THREE.Vector3(), centerUV = new THREE.UV( 0.5, 0.5 );\n\
\n\
    this.vertices.push(center);\n\
    uvs.push( centerUV );\n\
\n\
    for ( i = 0; i <= segments; i ++ ) {\n\
\n\
        var vertex = new THREE.Vector3();\n\
\n\
        vertex.x = radius * Math.cos( thetaStart + i / segments * thetaLength );\n\
        vertex.y = radius * Math.sin( thetaStart + i / segments * thetaLength );\n\
\n\
        this.vertices.push( vertex );\n\
        uvs.push( new THREE.UV( ( vertex.x / radius + 1 ) / 2, - ( vertex.y / radius + 1 ) / 2 + 1 ) );\n\
\n\
    }\n\
\n\
    var n = new THREE.Vector3( 0, 0, -1 );\n\
\n\
    for ( i = 1; i <= segments; i ++ ) {\n\
\n\
        var v1 = i;\n\
        var v2 = i + 1 ;\n\
        var v3 = 0;\n\
\n\
        this.faces.push( new THREE.Face3( v1, v2, v3, [ n, n, n ] ) );\n\
        this.faceVertexUvs[ 0 ].push( [ uvs[ i ], uvs[ i + 1 ], centerUV ] );\n\
\n\
    }\n\
\n\
    this.computeCentroids();\n\
    this.computeFaceNormals();\n\
\n\
    this.boundingSphere = { radius: radius };\n\
\n\
};\n\
\n\
THREE.CircleGeometry.prototype = Object.create( THREE.Geometry.prototype );\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 * based on http://papervision3d.googlecode.com/svn/trunk/as3/trunk/src/org/papervision3d/objects/primitives/Cube.as\n\
 */\n\
\n\
THREE.CubeGeometry = function ( width, height, depth, segmentsWidth, segmentsHeight, segmentsDepth, materials, sides ) {\n\
\n\
\tTHREE.Geometry.call( this );\n\
\n\
\tvar scope = this,\n\
\twidth_half = width / 2,\n\
\theight_half = height / 2,\n\
\tdepth_half = depth / 2;\n\
\n\
\tvar mpx, mpy, mpz, mnx, mny, mnz;\n\
\n\
\tif ( materials !== undefined ) {\n\
\n\
\t\tif ( materials instanceof Array ) {\n\
\n\
\t\t\tthis.materials = materials;\n\
\n\
\t\t} else {\n\
\n\
\t\t\tthis.materials = [];\n\
\n\
\t\t\tfor ( var i = 0; i < 6; i ++ ) {\n\
\n\
\t\t\t\tthis.materials.push( materials );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tmpx = 0; mnx = 1; mpy = 2; mny = 3; mpz = 4; mnz = 5;\n\
\n\
\t} else {\n\
\n\
\t\tthis.materials = [];\n\
\n\
\t}\n\
\n\
\tthis.sides = { px: true, nx: true, py: true, ny: true, pz: true, nz: true };\n\
\n\
\tif ( sides != undefined ) {\n\
\n\
\t\tfor ( var s in sides ) {\n\
\n\
\t\t\tif ( this.sides[ s ] !== undefined ) {\n\
\n\
\t\t\t\tthis.sides[ s ] = sides[ s ];\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\tthis.sides.px && buildPlane( 'z', 'y', - 1, - 1, depth, height, width_half, mpx ); // px\n\
\tthis.sides.nx && buildPlane( 'z', 'y',   1, - 1, depth, height, - width_half, mnx ); // nx\n\
\tthis.sides.py && buildPlane( 'x', 'z',   1,   1, width, depth, height_half, mpy ); // py\n\
\tthis.sides.ny && buildPlane( 'x', 'z',   1, - 1, width, depth, - height_half, mny ); // ny\n\
\tthis.sides.pz && buildPlane( 'x', 'y',   1, - 1, width, height, depth_half, mpz ); // pz\n\
\tthis.sides.nz && buildPlane( 'x', 'y', - 1, - 1, width, height, - depth_half, mnz ); // nz\n\
\n\
\tfunction buildPlane( u, v, udir, vdir, width, height, depth, material ) {\n\
\n\
\t\tvar w, ix, iy,\n\
\t\tgridX = segmentsWidth || 1,\n\
\t\tgridY = segmentsHeight || 1,\n\
\t\twidth_half = width / 2,\n\
\t\theight_half = height / 2,\n\
\t\toffset = scope.vertices.length;\n\
\n\
\t\tif ( ( u === 'x' && v === 'y' ) || ( u === 'y' && v === 'x' ) ) {\n\
\n\
\t\t\tw = 'z';\n\
\n\
\t\t} else if ( ( u === 'x' && v === 'z' ) || ( u === 'z' && v === 'x' ) ) {\n\
\n\
\t\t\tw = 'y';\n\
\t\t\tgridY = segmentsDepth || 1;\n\
\n\
\t\t} else if ( ( u === 'z' && v === 'y' ) || ( u === 'y' && v === 'z' ) ) {\n\
\n\
\t\t\tw = 'x';\n\
\t\t\tgridX = segmentsDepth || 1;\n\
\n\
\t\t}\n\
\n\
\t\tvar gridX1 = gridX + 1,\n\
\t\tgridY1 = gridY + 1,\n\
\t\tsegment_width = width / gridX,\n\
\t\tsegment_height = height / gridY,\n\
\t\tnormal = new THREE.Vector3();\n\
\n\
\t\tnormal[ w ] = depth > 0 ? 1 : - 1;\n\
\n\
\t\tfor ( iy = 0; iy < gridY1; iy ++ ) {\n\
\n\
\t\t\tfor ( ix = 0; ix < gridX1; ix ++ ) {\n\
\n\
\t\t\t\tvar vector = new THREE.Vector3();\n\
\t\t\t\tvector[ u ] = ( ix * segment_width - width_half ) * udir;\n\
\t\t\t\tvector[ v ] = ( iy * segment_height - height_half ) * vdir;\n\
\t\t\t\tvector[ w ] = depth;\n\
\n\
\t\t\t\tscope.vertices.push( vector );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tfor ( iy = 0; iy < gridY; iy++ ) {\n\
\n\
\t\t\tfor ( ix = 0; ix < gridX; ix++ ) {\n\
\n\
\t\t\t\tvar a = ix + gridX1 * iy;\n\
\t\t\t\tvar b = ix + gridX1 * ( iy + 1 );\n\
\t\t\t\tvar c = ( ix + 1 ) + gridX1 * ( iy + 1 );\n\
\t\t\t\tvar d = ( ix + 1 ) + gridX1 * iy;\n\
\n\
\t\t\t\tvar face = new THREE.Face4( a + offset, b + offset, c + offset, d + offset );\n\
\t\t\t\tface.normal.copy( normal );\n\
\t\t\t\tface.vertexNormals.push( normal.clone(), normal.clone(), normal.clone(), normal.clone() );\n\
\t\t\t\tface.materialIndex = material;\n\
\n\
\t\t\t\tscope.faces.push( face );\n\
\t\t\t\tscope.faceVertexUvs[ 0 ].push( [\n\
\t\t\t\t\t\t\tnew THREE.UV( ix / gridX, 1 - iy / gridY ),\n\
\t\t\t\t\t\t\tnew THREE.UV( ix / gridX, 1 - ( iy + 1 ) / gridY ),\n\
\t\t\t\t\t\t\tnew THREE.UV( ( ix + 1 ) / gridX, 1- ( iy + 1 ) / gridY ),\n\
\t\t\t\t\t\t\tnew THREE.UV( ( ix + 1 ) / gridX, 1 - iy / gridY )\n\
\t\t\t\t\t\t] );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\tthis.computeCentroids();\n\
\tthis.mergeVertices();\n\
\n\
};\n\
\n\
THREE.CubeGeometry.prototype = Object.create( THREE.Geometry.prototype );\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 */\n\
\n\
THREE.CylinderGeometry = function ( radiusTop, radiusBottom, height, segmentsRadius, segmentsHeight, openEnded ) {\n\
\n\
\tTHREE.Geometry.call( this );\n\
\n\
\tradiusTop = radiusTop !== undefined ? radiusTop : 20;\n\
\tradiusBottom = radiusBottom !== undefined ? radiusBottom : 20;\n\
\theight = height !== undefined ? height : 100;\n\
\n\
\tvar heightHalf = height / 2;\n\
\tvar segmentsX = segmentsRadius || 8;\n\
\tvar segmentsY = segmentsHeight || 1;\n\
\n\
\tvar x, y, vertices = [], uvs = [];\n\
\n\
\tfor ( y = 0; y <= segmentsY; y ++ ) {\n\
\n\
\t\tvar verticesRow = [];\n\
\t\tvar uvsRow = [];\n\
\n\
\t\tvar v = y / segmentsY;\n\
\t\tvar radius = v * ( radiusBottom - radiusTop ) + radiusTop;\n\
\n\
\t\tfor ( x = 0; x <= segmentsX; x ++ ) {\n\
\n\
\t\t\tvar u = x / segmentsX;\n\
\n\
\t\t\tvar vertex = new THREE.Vector3();\n\
\t\t\tvertex.x = radius * Math.sin( u * Math.PI * 2 );\n\
\t\t\tvertex.y = - v * height + heightHalf;\n\
\t\t\tvertex.z = radius * Math.cos( u * Math.PI * 2 );\n\
\n\
\t\t\tthis.vertices.push( vertex );\n\
\n\
\t\t\tverticesRow.push( this.vertices.length - 1 );\n\
\t\t\tuvsRow.push( new THREE.UV( u, 1 - v ) );\n\
\n\
\t\t}\n\
\n\
\t\tvertices.push( verticesRow );\n\
\t\tuvs.push( uvsRow );\n\
\n\
\t}\n\
\n\
\tvar tanTheta = ( radiusBottom - radiusTop ) / height;\n\
\tvar na, nb;\n\
\n\
\tfor ( x = 0; x < segmentsX; x ++ ) {\n\
\n\
\t\tif ( radiusTop !== 0 ) {\n\
\n\
\t\t\tna = this.vertices[ vertices[ 0 ][ x ] ].clone();\n\
\t\t\tnb = this.vertices[ vertices[ 0 ][ x + 1 ] ].clone();\n\
\n\
\t\t} else {\n\
\n\
\t\t\tna = this.vertices[ vertices[ 1 ][ x ] ].clone();\n\
\t\t\tnb = this.vertices[ vertices[ 1 ][ x + 1 ] ].clone();\n\
\n\
\t\t}\n\
\n\
\t\tna.setY( Math.sqrt( na.x * na.x + na.z * na.z ) * tanTheta ).normalize();\n\
\t\tnb.setY( Math.sqrt( nb.x * nb.x + nb.z * nb.z ) * tanTheta ).normalize();\n\
\n\
\t\tfor ( y = 0; y < segmentsY; y ++ ) {\n\
\n\
\t\t\tvar v1 = vertices[ y ][ x ];\n\
\t\t\tvar v2 = vertices[ y + 1 ][ x ];\n\
\t\t\tvar v3 = vertices[ y + 1 ][ x + 1 ];\n\
\t\t\tvar v4 = vertices[ y ][ x + 1 ];\n\
\n\
\t\t\tvar n1 = na.clone();\n\
\t\t\tvar n2 = na.clone();\n\
\t\t\tvar n3 = nb.clone();\n\
\t\t\tvar n4 = nb.clone();\n\
\n\
\t\t\tvar uv1 = uvs[ y ][ x ].clone();\n\
\t\t\tvar uv2 = uvs[ y + 1 ][ x ].clone();\n\
\t\t\tvar uv3 = uvs[ y + 1 ][ x + 1 ].clone();\n\
\t\t\tvar uv4 = uvs[ y ][ x + 1 ].clone();\n\
\n\
\t\t\tthis.faces.push( new THREE.Face4( v1, v2, v3, v4, [ n1, n2, n3, n4 ] ) );\n\
\t\t\tthis.faceVertexUvs[ 0 ].push( [ uv1, uv2, uv3, uv4 ] );\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\t// top cap\n\
\n\
\tif ( !openEnded && radiusTop > 0 ) {\n\
\n\
\t\tthis.vertices.push( new THREE.Vector3( 0, heightHalf, 0 ) );\n\
\n\
\t\tfor ( x = 0; x < segmentsX; x ++ ) {\n\
\n\
\t\t\tvar v1 = vertices[ 0 ][ x ];\n\
\t\t\tvar v2 = vertices[ 0 ][ x + 1 ];\n\
\t\t\tvar v3 = this.vertices.length - 1;\n\
\n\
\t\t\tvar n1 = new THREE.Vector3( 0, 1, 0 );\n\
\t\t\tvar n2 = new THREE.Vector3( 0, 1, 0 );\n\
\t\t\tvar n3 = new THREE.Vector3( 0, 1, 0 );\n\
\n\
\t\t\tvar uv1 = uvs[ 0 ][ x ].clone();\n\
\t\t\tvar uv2 = uvs[ 0 ][ x + 1 ].clone();\n\
\t\t\tvar uv3 = new THREE.UV( uv2.u, 0 );\n\
\n\
\t\t\tthis.faces.push( new THREE.Face3( v1, v2, v3, [ n1, n2, n3 ] ) );\n\
\t\t\tthis.faceVertexUvs[ 0 ].push( [ uv1, uv2, uv3 ] );\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\t// bottom cap\n\
\n\
\tif ( !openEnded && radiusBottom > 0 ) {\n\
\n\
\t\tthis.vertices.push( new THREE.Vector3( 0, - heightHalf, 0 ) );\n\
\n\
\t\tfor ( x = 0; x < segmentsX; x ++ ) {\n\
\n\
\t\t\tvar v1 = vertices[ y ][ x + 1 ];\n\
\t\t\tvar v2 = vertices[ y ][ x ];\n\
\t\t\tvar v3 = this.vertices.length - 1;\n\
\n\
\t\t\tvar n1 = new THREE.Vector3( 0, - 1, 0 );\n\
\t\t\tvar n2 = new THREE.Vector3( 0, - 1, 0 );\n\
\t\t\tvar n3 = new THREE.Vector3( 0, - 1, 0 );\n\
\n\
\t\t\tvar uv1 = uvs[ y ][ x + 1 ].clone();\n\
\t\t\tvar uv2 = uvs[ y ][ x ].clone();\n\
\t\t\tvar uv3 = new THREE.UV( uv2.u, 1 );\n\
\n\
\t\t\tthis.faces.push( new THREE.Face3( v1, v2, v3, [ n1, n2, n3 ] ) );\n\
\t\t\tthis.faceVertexUvs[ 0 ].push( [ uv1, uv2, uv3 ] );\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\tthis.computeCentroids();\n\
\tthis.computeFaceNormals();\n\
\n\
}\n\
\n\
THREE.CylinderGeometry.prototype = Object.create( THREE.Geometry.prototype );\n\
/**\n\
 * @author zz85 / http://www.lab4games.net/zz85/blog\n\
 *\n\
 * Creates extruded geometry from a path shape.\n\
 *\n\
 * parameters = {\n\
 *\n\
 *  size: <float>, // size of the text\n\
 *  height: <float>, // thickness to extrude text\n\
 *  curveSegments: <int>, // number of points on the curves\n\
 *  steps: <int>, // number of points for z-side extrusions / used for subdividing segements of extrude spline too\n\
 *  amount: <int>, // Amount\n\
 *\n\
 *  bevelEnabled: <bool>, // turn on bevel\n\
 *  bevelThickness: <float>, // how deep into text bevel goes\n\
 *  bevelSize: <float>, // how far from text outline is bevel\n\
 *  bevelSegments: <int>, // number of bevel layers\n\
 *\n\
 *  extrudePath: <THREE.CurvePath> // 3d spline path to extrude shape along. (creates Frames if .frames aren't defined)\n\
 *  frames: <THREE.TubeGeometry.FrenetFrames> // containing arrays of tangents, normals, binormals\n\
 *\n\
 *  material: <int> // material index for front and back faces\n\
 *  extrudeMaterial: <int> // material index for extrusion and beveled faces\n\
 *  uvGenerator: <Object> // object that provides UV generator functions\n\
 *\n\
 * }\n\
 **/\n\
\n\
THREE.ExtrudeGeometry = function ( shapes, options ) {\n\
\n\
\tif ( typeof( shapes ) === \"undefined\" ) {\n\
\t\tshapes = [];\n\
\t\treturn;\n\
\t}\n\
\n\
\tTHREE.Geometry.call( this );\n\
\n\
\tshapes = shapes instanceof Array ? shapes : [ shapes ];\n\
\n\
\tthis.shapebb = shapes[ shapes.length - 1 ].getBoundingBox();\n\
\n\
\tthis.addShapeList( shapes, options );\n\
\n\
\tthis.computeCentroids();\n\
\tthis.computeFaceNormals();\n\
\n\
\t// can't really use automatic vertex normals\n\
\t// as then front and back sides get smoothed too\n\
\t// should do separate smoothing just for sides\n\
\n\
\t//this.computeVertexNormals();\n\
\n\
\t//console.log( \"took\", ( Date.now() - startTime ) );\n\
\n\
};\n\
\n\
THREE.ExtrudeGeometry.prototype = Object.create( THREE.Geometry.prototype );\n\
\n\
THREE.ExtrudeGeometry.prototype.addShapeList = function ( shapes, options ) {\n\
\tvar sl = shapes.length;\n\
\n\
\tfor ( var s = 0; s < sl; s ++ ) {\n\
\t\tvar shape = shapes[ s ];\n\
\t\tthis.addShape( shape, options );\n\
\t}\n\
};\n\
\n\
THREE.ExtrudeGeometry.prototype.addShape = function ( shape, options ) {\n\
\n\
\tvar amount = options.amount !== undefined ? options.amount : 100;\n\
\n\
\tvar bevelThickness = options.bevelThickness !== undefined ? options.bevelThickness : 6; // 10\n\
\tvar bevelSize = options.bevelSize !== undefined ? options.bevelSize : bevelThickness - 2; // 8\n\
\tvar bevelSegments = options.bevelSegments !== undefined ? options.bevelSegments : 3;\n\
\n\
\tvar bevelEnabled = options.bevelEnabled !== undefined ? options.bevelEnabled : true; // false\n\
\n\
\tvar curveSegments = options.curveSegments !== undefined ? options.curveSegments : 12;\n\
\n\
\tvar steps = options.steps !== undefined ? options.steps : 1;\n\
\n\
\tvar extrudePath = options.extrudePath;\n\
\tvar extrudePts, extrudeByPath = false;\n\
\n\
\tvar material = options.material;\n\
\tvar extrudeMaterial = options.extrudeMaterial;\n\
\n\
\t// Use default WorldUVGenerator if no UV generators are specified.\n\
\tvar uvgen = options.UVGenerator !== undefined ? options.UVGenerator : THREE.ExtrudeGeometry.WorldUVGenerator;\n\
\n\
\tvar shapebb = this.shapebb;\n\
\t//shapebb = shape.getBoundingBox();\n\
\n\
\n\
\n\
\tvar splineTube, binormal, normal, position2;\n\
\tif ( extrudePath ) {\n\
\n\
\t\textrudePts = extrudePath.getSpacedPoints( steps );\n\
\n\
\t\textrudeByPath = true;\n\
\t\tbevelEnabled = false; // bevels not supported for path extrusion\n\
\n\
\t\t// SETUP TNB variables\n\
\n\
\t\t// Reuse TNB from TubeGeomtry for now.\n\
\t\t// TODO1 - have a .isClosed in spline?\n\
\n\
\t\tsplineTube = options.frames !== undefined ? options.frames : new THREE.TubeGeometry.FrenetFrames(extrudePath, steps, false);\n\
\n\
\t\t// console.log(splineTube, 'splineTube', splineTube.normals.length, 'steps', steps, 'extrudePts', extrudePts.length);\n\
\n\
\t\tbinormal = new THREE.Vector3();\n\
\t\tnormal = new THREE.Vector3();\n\
\t\tposition2 = new THREE.Vector3();\n\
\n\
\t}\n\
\n\
\t// Safeguards if bevels are not enabled\n\
\n\
\tif ( ! bevelEnabled ) {\n\
\n\
\t\tbevelSegments = 0;\n\
\t\tbevelThickness = 0;\n\
\t\tbevelSize = 0;\n\
\n\
\t}\n\
\n\
\t// Variables initalization\n\
\n\
\tvar ahole, h, hl; // looping of holes\n\
\tvar scope = this;\n\
\tvar bevelPoints = [];\n\
\n\
\tvar shapesOffset = this.vertices.length;\n\
\n\
\tvar shapePoints = shape.extractPoints();\n\
\n\
\tvar vertices = shapePoints.shape;\n\
\tvar holes = shapePoints.holes;\n\
\n\
\tvar reverse = !THREE.Shape.Utils.isClockWise( vertices ) ;\n\
\n\
\tif ( reverse ) {\n\
\n\
\t\tvertices = vertices.reverse();\n\
\n\
\t\t// Maybe we should also check if holes are in the opposite direction, just to be safe ...\n\
\n\
\t\tfor ( h = 0, hl = holes.length; h < hl; h ++ ) {\n\
\n\
\t\t\tahole = holes[ h ];\n\
\n\
\t\t\tif ( THREE.Shape.Utils.isClockWise( ahole ) ) {\n\
\n\
\t\t\t\tholes[ h ] = ahole.reverse();\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\treverse = false; // If vertices are in order now, we shouldn't need to worry about them again (hopefully)!\n\
\n\
\t}\n\
\n\
\n\
\tvar faces = THREE.Shape.Utils.triangulateShape ( vertices, holes );\n\
\n\
\t/* Vertices */\n\
\n\
\tvar contour = vertices; // vertices has all points but contour has only points of circumference\n\
\n\
\tfor ( h = 0, hl = holes.length;  h < hl; h ++ ) {\n\
\n\
\t\tahole = holes[ h ];\n\
\n\
\t\tvertices = vertices.concat( ahole );\n\
\n\
\t}\n\
\n\
\n\
\tfunction scalePt2 ( pt, vec, size ) {\n\
\n\
\t\tif ( !vec ) console.log( \"die\" );\n\
\n\
\t\treturn vec.clone().multiplyScalar( size ).addSelf( pt );\n\
\n\
\t}\n\
\n\
\tvar b, bs, t, z,\n\
\t\tvert, vlen = vertices.length,\n\
\t\tface, flen = faces.length,\n\
\t\tcont, clen = contour.length;\n\
\n\
\n\
\t// Find directions for point movement\n\
\n\
\tvar RAD_TO_DEGREES = 180 / Math.PI;\n\
\n\
\n\
\tfunction getBevelVec( pt_i, pt_j, pt_k ) {\n\
\n\
\t\t// Algorithm 2\n\
\n\
\t\treturn getBevelVec2( pt_i, pt_j, pt_k );\n\
\n\
\t}\n\
\n\
\tfunction getBevelVec1( pt_i, pt_j, pt_k ) {\n\
\n\
\t\tvar anglea = Math.atan2( pt_j.y - pt_i.y, pt_j.x - pt_i.x );\n\
\t\tvar angleb = Math.atan2( pt_k.y - pt_i.y, pt_k.x - pt_i.x );\n\
\n\
\t\tif ( anglea > angleb ) {\n\
\n\
\t\t\tangleb += Math.PI * 2;\n\
\n\
\t\t}\n\
\n\
\t\tvar anglec = ( anglea + angleb ) / 2;\n\
\n\
\n\
\t\t//console.log('angle1', anglea * RAD_TO_DEGREES,'angle2', angleb * RAD_TO_DEGREES, 'anglec', anglec *RAD_TO_DEGREES);\n\
\n\
\t\tvar x = - Math.cos( anglec );\n\
\t\tvar y = - Math.sin( anglec );\n\
\n\
\t\tvar vec = new THREE.Vector2( x, y ); //.normalize();\n\
\n\
\t\treturn vec;\n\
\n\
\t}\n\
\n\
\tfunction getBevelVec2( pt_i, pt_j, pt_k ) {\n\
\n\
\t\tvar a = THREE.ExtrudeGeometry.__v1,\n\
\t\t\tb = THREE.ExtrudeGeometry.__v2,\n\
\t\t\tv_hat = THREE.ExtrudeGeometry.__v3,\n\
\t\t\tw_hat = THREE.ExtrudeGeometry.__v4,\n\
\t\t\tp = THREE.ExtrudeGeometry.__v5,\n\
\t\t\tq = THREE.ExtrudeGeometry.__v6,\n\
\t\t\tv, w,\n\
\t\t\tv_dot_w_hat, q_sub_p_dot_w_hat,\n\
\t\t\ts, intersection;\n\
\n\
\t\t// good reading for line-line intersection\n\
\t\t// http://sputsoft.com/blog/2010/03/line-line-intersection.html\n\
\n\
\t\t// define a as vector j->i\n\
\t\t// define b as vectot k->i\n\
\n\
\t\ta.set( pt_i.x - pt_j.x, pt_i.y - pt_j.y );\n\
\t\tb.set( pt_i.x - pt_k.x, pt_i.y - pt_k.y );\n\
\n\
\t\t// get unit vectors\n\
\n\
\t\tv = a.normalize();\n\
\t\tw = b.normalize();\n\
\n\
\t\t// normals from pt i\n\
\n\
\t\tv_hat.set( -v.y, v.x );\n\
\t\tw_hat.set( w.y, -w.x );\n\
\n\
\t\t// pts from i\n\
\n\
\t\tp.copy( pt_i ).addSelf( v_hat );\n\
\t\tq.copy( pt_i ).addSelf( w_hat );\n\
\n\
\t\tif ( p.equals( q ) ) {\n\
\n\
\t\t\t//console.log(\"Warning: lines are straight\");\n\
\t\t\treturn w_hat.clone();\n\
\n\
\t\t}\n\
\n\
\t\t// Points from j, k. helps prevents points cross overover most of the time\n\
\n\
\t\tp.copy( pt_j ).addSelf( v_hat );\n\
\t\tq.copy( pt_k ).addSelf( w_hat );\n\
\n\
\t\tv_dot_w_hat = v.dot( w_hat );\n\
\t\tq_sub_p_dot_w_hat = q.subSelf( p ).dot( w_hat );\n\
\n\
\t\t// We should not reach these conditions\n\
\n\
\t\tif ( v_dot_w_hat === 0 ) {\n\
\n\
\t\t\tconsole.log( \"Either infinite or no solutions!\" );\n\
\n\
\t\t\tif ( q_sub_p_dot_w_hat === 0 ) {\n\
\n\
\t\t\t\tconsole.log( \"Its finite solutions.\" );\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tconsole.log( \"Too bad, no solutions.\" );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\ts = q_sub_p_dot_w_hat / v_dot_w_hat;\n\
\n\
\t\tif ( s < 0 ) {\n\
\n\
\t\t\t// in case of emergecy, revert to algorithm 1.\n\
\n\
\t\t\treturn getBevelVec1( pt_i, pt_j, pt_k );\n\
\n\
\t\t}\n\
\n\
\t\tintersection = v.multiplyScalar( s ).addSelf( p );\n\
\n\
\t\treturn intersection.subSelf( pt_i ).clone(); // Don't normalize!, otherwise sharp corners become ugly\n\
\n\
\t}\n\
\n\
\tvar contourMovements = [];\n\
\n\
\tfor ( var i = 0, il = contour.length, j = il - 1, k = i + 1; i < il; i ++, j ++, k ++ ) {\n\
\n\
\t\tif ( j === il ) j = 0;\n\
\t\tif ( k === il ) k = 0;\n\
\n\
\t\t//  (j)---(i)---(k)\n\
\t\t// console.log('i,j,k', i, j , k)\n\
\n\
\t\tvar pt_i = contour[ i ];\n\
\t\tvar pt_j = contour[ j ];\n\
\t\tvar pt_k = contour[ k ];\n\
\n\
\t\tcontourMovements[ i ]= getBevelVec( contour[ i ], contour[ j ], contour[ k ] );\n\
\n\
\t}\n\
\n\
\tvar holesMovements = [], oneHoleMovements, verticesMovements = contourMovements.concat();\n\
\n\
\tfor ( h = 0, hl = holes.length; h < hl; h ++ ) {\n\
\n\
\t\tahole = holes[ h ];\n\
\n\
\t\toneHoleMovements = [];\n\
\n\
\t\tfor ( i = 0, il = ahole.length, j = il - 1, k = i + 1; i < il; i ++, j ++, k ++ ) {\n\
\n\
\t\t\tif ( j === il ) j = 0;\n\
\t\t\tif ( k === il ) k = 0;\n\
\n\
\t\t\t//  (j)---(i)---(k)\n\
\t\t\toneHoleMovements[ i ]= getBevelVec( ahole[ i ], ahole[ j ], ahole[ k ] );\n\
\n\
\t\t}\n\
\n\
\t\tholesMovements.push( oneHoleMovements );\n\
\t\tverticesMovements = verticesMovements.concat( oneHoleMovements );\n\
\n\
\t}\n\
\n\
\n\
\t// Loop bevelSegments, 1 for the front, 1 for the back\n\
\n\
\tfor ( b = 0; b < bevelSegments; b ++ ) {\n\
\t//for ( b = bevelSegments; b > 0; b -- ) {\n\
\n\
\t\tt = b / bevelSegments;\n\
\t\tz = bevelThickness * ( 1 - t );\n\
\n\
\t\t//z = bevelThickness * t;\n\
\t\tbs = bevelSize * ( Math.sin ( t * Math.PI/2 ) ) ; // curved\n\
\t\t//bs = bevelSize * t ; // linear\n\
\n\
\t\t// contract shape\n\
\n\
\t\tfor ( i = 0, il = contour.length; i < il; i ++ ) {\n\
\n\
\t\t\tvert = scalePt2( contour[ i ], contourMovements[ i ], bs );\n\
\t\t\t//vert = scalePt( contour[ i ], contourCentroid, bs, false );\n\
\t\t\tv( vert.x, vert.y,  - z );\n\
\n\
\t\t}\n\
\n\
\t\t// expand holes\n\
\n\
\t\tfor ( h = 0, hl = holes.length; h < hl; h++ ) {\n\
\n\
\t\t\tahole = holes[ h ];\n\
\t\t\toneHoleMovements = holesMovements[ h ];\n\
\n\
\t\t\tfor ( i = 0, il = ahole.length; i < il; i++ ) {\n\
\n\
\t\t\t\tvert = scalePt2( ahole[ i ], oneHoleMovements[ i ], bs );\n\
\t\t\t\t//vert = scalePt( ahole[ i ], holesCentroids[ h ], bs, true );\n\
\n\
\t\t\t\tv( vert.x, vert.y,  -z );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\tbs = bevelSize;\n\
\n\
\t// Back facing vertices\n\
\n\
\tfor ( i = 0; i < vlen; i ++ ) {\n\
\n\
\t\tvert = bevelEnabled ? scalePt2( vertices[ i ], verticesMovements[ i ], bs ) : vertices[ i ];\n\
\n\
\t\tif ( !extrudeByPath ) {\n\
\n\
\t\t\tv( vert.x, vert.y, 0 );\n\
\n\
\t\t} else {\n\
\n\
\t\t\t// v( vert.x, vert.y + extrudePts[ 0 ].y, extrudePts[ 0 ].x );\n\
\n\
\t\t\tnormal.copy( splineTube.normals[0] ).multiplyScalar(vert.x);\n\
\t\t\tbinormal.copy( splineTube.binormals[0] ).multiplyScalar(vert.y);\n\
\n\
\t\t\tposition2.copy( extrudePts[0] ).addSelf(normal).addSelf(binormal);\n\
\n\
\t\t\tv( position2.x, position2.y, position2.z );\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\t// Add stepped vertices...\n\
\t// Including front facing vertices\n\
\n\
\tvar s;\n\
\n\
\tfor ( s = 1; s <= steps; s ++ ) {\n\
\n\
\t\tfor ( i = 0; i < vlen; i ++ ) {\n\
\n\
\t\t\tvert = bevelEnabled ? scalePt2( vertices[ i ], verticesMovements[ i ], bs ) : vertices[ i ];\n\
\n\
\t\t\tif ( !extrudeByPath ) {\n\
\n\
\t\t\t\tv( vert.x, vert.y, amount / steps * s );\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\t// v( vert.x, vert.y + extrudePts[ s - 1 ].y, extrudePts[ s - 1 ].x );\n\
\n\
\t\t\t\tnormal.copy( splineTube.normals[s] ).multiplyScalar( vert.x );\n\
\t\t\t\tbinormal.copy( splineTube.binormals[s] ).multiplyScalar( vert.y );\n\
\n\
\t\t\t\tposition2.copy( extrudePts[s] ).addSelf( normal ).addSelf( binormal );\n\
\n\
\t\t\t\tv( position2.x, position2.y, position2.z );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\n\
\t// Add bevel segments planes\n\
\n\
\t//for ( b = 1; b <= bevelSegments; b ++ ) {\n\
\tfor ( b = bevelSegments - 1; b >= 0; b -- ) {\n\
\n\
\t\tt = b / bevelSegments;\n\
\t\tz = bevelThickness * ( 1 - t );\n\
\t\t//bs = bevelSize * ( 1-Math.sin ( ( 1 - t ) * Math.PI/2 ) );\n\
\t\tbs = bevelSize * Math.sin ( t * Math.PI/2 ) ;\n\
\n\
\t\t// contract shape\n\
\n\
\t\tfor ( i = 0, il = contour.length; i < il; i ++ ) {\n\
\n\
\t\t\tvert = scalePt2( contour[ i ], contourMovements[ i ], bs );\n\
\t\t\tv( vert.x, vert.y,  amount + z );\n\
\n\
\t\t}\n\
\n\
\t\t// expand holes\n\
\n\
\t\tfor ( h = 0, hl = holes.length; h < hl; h ++ ) {\n\
\n\
\t\t\tahole = holes[ h ];\n\
\t\t\toneHoleMovements = holesMovements[ h ];\n\
\n\
\t\t\tfor ( i = 0, il = ahole.length; i < il; i ++ ) {\n\
\n\
\t\t\t\tvert = scalePt2( ahole[ i ], oneHoleMovements[ i ], bs );\n\
\n\
\t\t\t\tif ( !extrudeByPath ) {\n\
\n\
\t\t\t\t\tv( vert.x, vert.y,  amount + z );\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\tv( vert.x, vert.y + extrudePts[ steps - 1 ].y, extrudePts[ steps - 1 ].x + z );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\t/* Faces */\n\
\n\
\t// Top and bottom faces\n\
\n\
\tbuildLidFaces();\n\
\n\
\t// Sides faces\n\
\n\
\tbuildSideFaces();\n\
\n\
\n\
\t/////  Internal functions\n\
\n\
\tfunction buildLidFaces() {\n\
\n\
\t\tif ( bevelEnabled ) {\n\
\n\
\t\t\tvar layer = 0 ; // steps + 1\n\
\t\t\tvar offset = vlen * layer;\n\
\n\
\t\t\t// Bottom faces\n\
\n\
\t\t\tfor ( i = 0; i < flen; i ++ ) {\n\
\n\
\t\t\t\tface = faces[ i ];\n\
\t\t\t\tf3( face[ 2 ]+ offset, face[ 1 ]+ offset, face[ 0 ] + offset, true );\n\
\n\
\t\t\t}\n\
\n\
\t\t\tlayer = steps + bevelSegments * 2;\n\
\t\t\toffset = vlen * layer;\n\
\n\
\t\t\t// Top faces\n\
\n\
\t\t\tfor ( i = 0; i < flen; i ++ ) {\n\
\n\
\t\t\t\tface = faces[ i ];\n\
\t\t\t\tf3( face[ 0 ] + offset, face[ 1 ] + offset, face[ 2 ] + offset, false );\n\
\n\
\t\t\t}\n\
\n\
\t\t} else {\n\
\n\
\t\t\t// Bottom faces\n\
\n\
\t\t\tfor ( i = 0; i < flen; i++ ) {\n\
\n\
\t\t\t\tface = faces[ i ];\n\
\t\t\t\tf3( face[ 2 ], face[ 1 ], face[ 0 ], true );\n\
\n\
\t\t\t}\n\
\n\
\t\t\t// Top faces\n\
\n\
\t\t\tfor ( i = 0; i < flen; i ++ ) {\n\
\n\
\t\t\t\tface = faces[ i ];\n\
\t\t\t\tf3( face[ 0 ] + vlen * steps, face[ 1 ] + vlen * steps, face[ 2 ] + vlen * steps, false );\n\
\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t}\n\
\n\
\t// Create faces for the z-sides of the shape\n\
\n\
\tfunction buildSideFaces() {\n\
\n\
\t\tvar layeroffset = 0;\n\
\t\tsidewalls( contour, layeroffset );\n\
\t\tlayeroffset += contour.length;\n\
\n\
\t\tfor ( h = 0, hl = holes.length;  h < hl; h ++ ) {\n\
\n\
\t\t\tahole = holes[ h ];\n\
\t\t\tsidewalls( ahole, layeroffset );\n\
\n\
\t\t\t//, true\n\
\t\t\tlayeroffset += ahole.length;\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\tfunction sidewalls( contour, layeroffset ) {\n\
\n\
\t\tvar j, k;\n\
\t\ti = contour.length;\n\
\n\
\t\twhile ( --i >= 0 ) {\n\
\n\
\t\t\tj = i;\n\
\t\t\tk = i - 1;\n\
\t\t\tif ( k < 0 ) k = contour.length - 1;\n\
\n\
\t\t\t//console.log('b', i,j, i-1, k,vertices.length);\n\
\n\
\t\t\tvar s = 0, sl = steps  + bevelSegments * 2;\n\
\n\
\t\t\tfor ( s = 0; s < sl; s ++ ) {\n\
\n\
\t\t\t\tvar slen1 = vlen * s;\n\
\t\t\t\tvar slen2 = vlen * ( s + 1 );\n\
\n\
\t\t\t\tvar a = layeroffset + j + slen1,\n\
\t\t\t\t\tb = layeroffset + k + slen1,\n\
\t\t\t\t\tc = layeroffset + k + slen2,\n\
\t\t\t\t\td = layeroffset + j + slen2;\n\
\n\
\t\t\t\tf4( a, b, c, d, contour, s, sl, j, k );\n\
\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t}\n\
\n\
\n\
\tfunction v( x, y, z ) {\n\
\n\
\t\tscope.vertices.push( new THREE.Vector3( x, y, z ) );\n\
\n\
\t}\n\
\n\
\tfunction f3( a, b, c, isBottom ) {\n\
\n\
\t\ta += shapesOffset;\n\
\t\tb += shapesOffset;\n\
\t\tc += shapesOffset;\n\
\n\
\t\t// normal, color, material\n\
\t\tscope.faces.push( new THREE.Face3( a, b, c, null, null, material ) );\n\
\n\
\t\tvar uvs = isBottom ? uvgen.generateBottomUV( scope, shape, options, a, b, c ) : uvgen.generateTopUV( scope, shape, options, a, b, c );\n\
\n\
 \t\tscope.faceVertexUvs[ 0 ].push( uvs );\n\
\n\
\t}\n\
\n\
\tfunction f4( a, b, c, d, wallContour, stepIndex, stepsLength, contourIndex1, contourIndex2 ) {\n\
\n\
\t\ta += shapesOffset;\n\
\t\tb += shapesOffset;\n\
\t\tc += shapesOffset;\n\
\t\td += shapesOffset;\n\
\n\
 \t\tscope.faces.push( new THREE.Face4( a, b, c, d, null, null, extrudeMaterial ) );\n\
\n\
 \t\tvar uvs = uvgen.generateSideWallUV( scope, shape, wallContour, options, a, b, c, d,\n\
 \t\t                                    stepIndex, stepsLength, contourIndex1, contourIndex2 );\n\
 \t\tscope.faceVertexUvs[ 0 ].push( uvs );\n\
\n\
\t}\n\
\n\
};\n\
\n\
THREE.ExtrudeGeometry.WorldUVGenerator = {\n\
\n\
\tgenerateTopUV: function( geometry, extrudedShape, extrudeOptions, indexA, indexB, indexC ) {\n\
\t\tvar ax = geometry.vertices[ indexA ].x,\n\
\t\t\tay = geometry.vertices[ indexA ].y,\n\
\n\
\t\t\tbx = geometry.vertices[ indexB ].x,\n\
\t\t\tby = geometry.vertices[ indexB ].y,\n\
\n\
\t\t\tcx = geometry.vertices[ indexC ].x,\n\
\t\t\tcy = geometry.vertices[ indexC ].y;\n\
\n\
\t\treturn [\n\
\t\t\tnew THREE.UV( ax, ay ),\n\
\t\t\tnew THREE.UV( bx, by ),\n\
\t\t\tnew THREE.UV( cx, cy )\n\
\t\t];\n\
\n\
\t},\n\
\n\
\tgenerateBottomUV: function( geometry, extrudedShape, extrudeOptions, indexA, indexB, indexC ) {\n\
\n\
\t\treturn this.generateTopUV( geometry, extrudedShape, extrudeOptions, indexA, indexB, indexC );\n\
\n\
\t},\n\
\n\
\tgenerateSideWallUV: function( geometry, extrudedShape, wallContour, extrudeOptions,\n\
\t                              indexA, indexB, indexC, indexD, stepIndex, stepsLength,\n\
\t                              contourIndex1, contourIndex2 ) {\n\
\n\
\t\tvar ax = geometry.vertices[ indexA ].x,\n\
\t\t\tay = geometry.vertices[ indexA ].y,\n\
\t\t\taz = geometry.vertices[ indexA ].z,\n\
\n\
\t\t\tbx = geometry.vertices[ indexB ].x,\n\
\t\t\tby = geometry.vertices[ indexB ].y,\n\
\t\t\tbz = geometry.vertices[ indexB ].z,\n\
\n\
\t\t\tcx = geometry.vertices[ indexC ].x,\n\
\t\t\tcy = geometry.vertices[ indexC ].y,\n\
\t\t\tcz = geometry.vertices[ indexC ].z,\n\
\n\
\t\t\tdx = geometry.vertices[ indexD ].x,\n\
\t\t\tdy = geometry.vertices[ indexD ].y,\n\
\t\t\tdz = geometry.vertices[ indexD ].z;\n\
\n\
\t\tif ( Math.abs( ay - by ) < 0.01 ) {\n\
\t\t\treturn [\n\
\t\t\t\tnew THREE.UV( ax, 1 - az ),\n\
\t\t\t\tnew THREE.UV( bx, 1 - bz ),\n\
\t\t\t\tnew THREE.UV( cx, 1 - cz ),\n\
\t\t\t\tnew THREE.UV( dx, 1 - dz )\n\
\t\t\t];\n\
\t\t} else {\n\
\t\t\treturn [\n\
\t\t\t\tnew THREE.UV( ay, 1 - az ),\n\
\t\t\t\tnew THREE.UV( by, 1 - bz ),\n\
\t\t\t\tnew THREE.UV( cy, 1 - cz ),\n\
\t\t\t\tnew THREE.UV( dy, 1 - dz )\n\
\t\t\t];\n\
\t\t}\n\
\t}\n\
};\n\
\n\
THREE.ExtrudeGeometry.__v1 = new THREE.Vector2();\n\
THREE.ExtrudeGeometry.__v2 = new THREE.Vector2();\n\
THREE.ExtrudeGeometry.__v3 = new THREE.Vector2();\n\
THREE.ExtrudeGeometry.__v4 = new THREE.Vector2();\n\
THREE.ExtrudeGeometry.__v5 = new THREE.Vector2();\n\
THREE.ExtrudeGeometry.__v6 = new THREE.Vector2();\n\
/**\n\
 * @author jonobr1 / http://jonobr1.com\n\
 *\n\
 * Creates a one-sided polygonal geometry from a path shape. Similar to\n\
 * ExtrudeGeometry.\n\
 *\n\
 * parameters = {\n\
 *\n\
 *\tcurveSegments: <int>, // number of points on the curves. NOT USED AT THE MOMENT.\n\
 *\n\
 *\tmaterial: <int> // material index for front and back faces\n\
 *\tuvGenerator: <Object> // object that provides UV generator functions\n\
 *\n\
 * }\n\
 **/\n\
\n\
THREE.ShapeGeometry = function ( shapes, options ) {\n\
\n\
\tTHREE.Geometry.call( this );\n\
\n\
\tif ( shapes instanceof Array === false ) shapes = [ shapes ];\n\
\n\
\tthis.shapebb = shapes[ shapes.length - 1 ].getBoundingBox();\n\
\n\
\tthis.addShapeList( shapes, options );\n\
\n\
\tthis.computeCentroids();\n\
\tthis.computeFaceNormals();\n\
\n\
};\n\
\n\
THREE.ShapeGeometry.prototype = Object.create( THREE.Geometry.prototype );\n\
\n\
/**\n\
 * Add an array of shapes to THREE.ShapeGeometry.\n\
 */\n\
THREE.ShapeGeometry.prototype.addShapeList = function ( shapes, options ) {\n\
\n\
\tfor ( var i = 0, l = shapes.length; i < l; i++ ) {\n\
\n\
\t\tthis.addShape( shapes[ i ], options );\n\
\n\
\t}\n\
\n\
\treturn this;\n\
\n\
};\n\
\n\
/**\n\
 * Adds a shape to THREE.ShapeGeometry, based on THREE.ExtrudeGeometry.\n\
 */\n\
THREE.ShapeGeometry.prototype.addShape = function ( shape, options ) {\n\
\n\
\tif ( options === undefined ) options = {};\n\
\n\
\tvar material = options.material;\n\
\tvar uvgen = options.UVGenerator === undefined ? THREE.ExtrudeGeometry.WorldUVGenerator : options.UVGenerator;\n\
\n\
\tvar shapebb = this.shapebb;\n\
\n\
\t//\n\
\n\
\tvar i, l, hole, s;\n\
\n\
\tvar shapesOffset = this.vertices.length;\n\
\tvar shapePoints = shape.extractPoints();\n\
\n\
\tvar vertices = shapePoints.shape;\n\
\tvar holes = shapePoints.holes;\n\
\n\
\tvar reverse = !THREE.Shape.Utils.isClockWise( vertices );\n\
\n\
\tif ( reverse ) {\n\
\n\
\t\tvertices = vertices.reverse();\n\
\n\
\t\t// Maybe we should also check if holes are in the opposite direction, just to be safe...\n\
\n\
\t\tfor ( i = 0, l = holes.length; i < l; i++ ) {\n\
\n\
\t\t\thole = holes[ i ];\n\
\n\
\t\t\tif ( THREE.Shape.Utils.isClockWise( hole ) ) {\n\
\n\
\t\t\t\tholes[ i ] = hole.reverse();\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\treverse = false;\n\
\n\
\t}\n\
\n\
\tvar faces = THREE.Shape.Utils.triangulateShape( vertices, holes );\n\
\n\
\t// Vertices\n\
\n\
\tvar contour = vertices;\n\
\n\
\tfor ( i = 0, l = holes.length; i < l; i++ ) {\n\
\n\
\t\thole = holes[ i ];\n\
\t\tvertices = vertices.concat( hole );\n\
\n\
\t}\n\
\n\
\t//\n\
\n\
\tvar vert, vlen = vertices.length;\n\
\tvar face, flen = faces.length;\n\
\tvar cont, clen = contour.length;\n\
\n\
\tfor ( i = 0; i < vlen; i++ ) {\n\
\n\
\t\tvert = vertices[ i ];\n\
\n\
\t\tthis.vertices.push( new THREE.Vector3( vert.x, vert.y, 0 ) );\n\
\n\
\t}\n\
\n\
\tfor ( i = 0; i < flen; i++ ) {\n\
\n\
\t\tface = faces[ i ];\n\
\n\
\t\tvar a = face[ 2 ] + shapesOffset;\n\
\t\tvar b = face[ 1 ] + shapesOffset;\n\
\t\tvar c = face[ 0 ] + shapesOffset;\n\
\n\
\t\tthis.faces.push( new THREE.Face3( a, b, c, null, null, material ) );\n\
\t\tthis.faceVertexUvs[ 0 ].push( uvgen.generateBottomUV( this, shape, options, a, b, c ) );\n\
\n\
\t}\n\
\n\
};\n\
/**\n\
 * @author astrodud / http://astrodud.isgreat.org/\n\
 * @author zz85 / https://github.com/zz85\n\
 */\n\
\n\
THREE.LatheGeometry = function ( points, steps, angle ) {\n\
\n\
\tTHREE.Geometry.call( this );\n\
\n\
\tvar _steps = steps || 12;\n\
\tvar _angle = angle || 2 * Math.PI;\n\
\n\
\tvar _newV = [];\n\
\tvar _matrix = new THREE.Matrix4().makeRotationZ( _angle / _steps );\n\
\n\
\tfor ( var j = 0; j < points.length; j ++ ) {\n\
\n\
\t\t_newV[ j ] = points[ j ].clone();\n\
\t\tthis.vertices.push( _newV[ j ] );\n\
\n\
\t}\n\
\n\
\tvar i, il = _steps + 1;\n\
\n\
\tfor ( i = 0; i < il; i ++ ) {\n\
\n\
\t\tfor ( var j = 0; j < _newV.length; j ++ ) {\n\
\n\
\t\t\t_newV[ j ] = _matrix.multiplyVector3( _newV[ j ].clone() );\n\
\t\t\tthis.vertices.push( _newV[ j ] );\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\tfor ( i = 0; i < _steps; i ++ ) {\n\
\n\
\t\tfor ( var k = 0, kl = points.length; k < kl - 1; k ++ ) {\n\
\n\
\t\t\tvar a = i * kl + k;\n\
\t\t\tvar b = ( ( i + 1 ) % il ) * kl + k;\n\
\t\t\tvar c = ( ( i + 1 ) % il ) * kl + ( k + 1 ) % kl;\n\
\t\t\tvar d = i * kl + ( k + 1 ) % kl;\n\
\n\
\t\t\tthis.faces.push( new THREE.Face4( a, b, c, d ) );\n\
\n\
\t\t\tthis.faceVertexUvs[ 0 ].push( [\n\
\n\
\t\t\t\tnew THREE.UV( 1 - i / _steps, k / kl ),\n\
\t\t\t\tnew THREE.UV( 1 - ( i + 1 ) / _steps, k / kl ),\n\
\t\t\t\tnew THREE.UV( 1 - ( i + 1 ) / _steps, ( k + 1 ) / kl ),\n\
\t\t\t\tnew THREE.UV( 1 - i / _steps, ( k + 1 ) / kl )\n\
\t\t\t\t\n\
\t\t\t] );\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\tthis.computeCentroids();\n\
\tthis.computeFaceNormals();\n\
\tthis.computeVertexNormals();\n\
\n\
};\n\
\n\
THREE.LatheGeometry.prototype = Object.create( THREE.Geometry.prototype );\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 * based on http://papervision3d.googlecode.com/svn/trunk/as3/trunk/src/org/papervision3d/objects/primitives/Plane.as\n\
 */\n\
\n\
THREE.PlaneGeometry = function ( width, height, segmentsWidth, segmentsheight ) {\n\
\n\
\tTHREE.Geometry.call( this );\n\
\n\
\tvar ix, iz,\n\
\twidth_half = width / 2,\n\
\theight_half = height / 2,\n\
\tgridX = segmentsWidth || 1,\n\
\tgridZ = segmentsheight || 1,\n\
\tgridX1 = gridX + 1,\n\
\tgridZ1 = gridZ + 1,\n\
\tsegment_width = width / gridX,\n\
\tsegment_height = height / gridZ,\n\
\tnormal = new THREE.Vector3( 0, 0, 1 );\n\
\n\
\tfor ( iz = 0; iz < gridZ1; iz ++ ) {\n\
\n\
\t\tfor ( ix = 0; ix < gridX1; ix ++ ) {\n\
\n\
\t\t\tvar x = ix * segment_width - width_half;\n\
\t\t\tvar y = iz * segment_height - height_half;\n\
\n\
\t\t\tthis.vertices.push( new THREE.Vector3( x, - y, 0 ) );\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\tfor ( iz = 0; iz < gridZ; iz ++ ) {\n\
\n\
\t\tfor ( ix = 0; ix < gridX; ix ++ ) {\n\
\n\
\t\t\tvar a = ix + gridX1 * iz;\n\
\t\t\tvar b = ix + gridX1 * ( iz + 1 );\n\
\t\t\tvar c = ( ix + 1 ) + gridX1 * ( iz + 1 );\n\
\t\t\tvar d = ( ix + 1 ) + gridX1 * iz;\n\
\n\
\t\t\tvar face = new THREE.Face4( a, b, c, d );\n\
\t\t\tface.normal.copy( normal );\n\
\t\t\tface.vertexNormals.push( normal.clone(), normal.clone(), normal.clone(), normal.clone() );\n\
\n\
\t\t\tthis.faces.push( face );\n\
\t\t\tthis.faceVertexUvs[ 0 ].push( [\n\
\t\t\t\tnew THREE.UV( ix / gridX, 1 - iz / gridZ ),\n\
\t\t\t\tnew THREE.UV( ix / gridX, 1 - ( iz + 1 ) / gridZ ),\n\
\t\t\t\tnew THREE.UV( ( ix + 1 ) / gridX, 1 - ( iz + 1 ) / gridZ ),\n\
\t\t\t\tnew THREE.UV( ( ix + 1 ) / gridX, 1 - iz / gridZ )\n\
\t\t\t] );\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\tthis.computeCentroids();\n\
\n\
};\n\
\n\
THREE.PlaneGeometry.prototype = Object.create( THREE.Geometry.prototype );\n\
/**\n\
 * @author mrdoob / http://mrdoob.com/\n\
 */\n\
\n\
THREE.SphereGeometry = function ( radius, segmentsWidth, segmentsHeight, phiStart, phiLength, thetaStart, thetaLength ) {\n\
\n\
\tTHREE.Geometry.call( this );\n\
\n\
\tradius = radius || 50;\n\
\n\
\tphiStart = phiStart !== undefined ? phiStart : 0;\n\
\tphiLength = phiLength !== undefined ? phiLength : Math.PI * 2;\n\
\n\
\tthetaStart = thetaStart !== undefined ? thetaStart : 0;\n\
\tthetaLength = thetaLength !== undefined ? thetaLength : Math.PI;\n\
\n\
\tvar segmentsX = Math.max( 3, Math.floor( segmentsWidth ) || 8 );\n\
\tvar segmentsY = Math.max( 2, Math.floor( segmentsHeight ) || 6 );\n\
\n\
\tvar x, y, vertices = [], uvs = [];\n\
\n\
\tfor ( y = 0; y <= segmentsY; y ++ ) {\n\
\n\
\t\tvar verticesRow = [];\n\
\t\tvar uvsRow = [];\n\
\n\
\t\tfor ( x = 0; x <= segmentsX; x ++ ) {\n\
\n\
\t\t\tvar u = x / segmentsX;\n\
\t\t\tvar v = y / segmentsY;\n\
\n\
\t\t\tvar vertex = new THREE.Vector3();\n\
\t\t\tvertex.x = - radius * Math.cos( phiStart + u * phiLength ) * Math.sin( thetaStart + v * thetaLength );\n\
\t\t\tvertex.y = radius * Math.cos( thetaStart + v * thetaLength );\n\
\t\t\tvertex.z = radius * Math.sin( phiStart + u * phiLength ) * Math.sin( thetaStart + v * thetaLength );\n\
\n\
\t\t\tthis.vertices.push( vertex );\n\
\n\
\t\t\tverticesRow.push( this.vertices.length - 1 );\n\
\t\t\tuvsRow.push( new THREE.UV( u, 1 - v ) );\n\
\n\
\t\t}\n\
\n\
\t\tvertices.push( verticesRow );\n\
\t\tuvs.push( uvsRow );\n\
\n\
\t}\n\
\n\
\tfor ( y = 0; y < segmentsY; y ++ ) {\n\
\n\
\t\tfor ( x = 0; x < segmentsX; x ++ ) {\n\
\n\
\t\t\tvar v1 = vertices[ y ][ x + 1 ];\n\
\t\t\tvar v2 = vertices[ y ][ x ];\n\
\t\t\tvar v3 = vertices[ y + 1 ][ x ];\n\
\t\t\tvar v4 = vertices[ y + 1 ][ x + 1 ];\n\
\n\
\t\t\tvar n1 = this.vertices[ v1 ].clone().normalize();\n\
\t\t\tvar n2 = this.vertices[ v2 ].clone().normalize();\n\
\t\t\tvar n3 = this.vertices[ v3 ].clone().normalize();\n\
\t\t\tvar n4 = this.vertices[ v4 ].clone().normalize();\n\
\n\
\t\t\tvar uv1 = uvs[ y ][ x + 1 ].clone();\n\
\t\t\tvar uv2 = uvs[ y ][ x ].clone();\n\
\t\t\tvar uv3 = uvs[ y + 1 ][ x ].clone();\n\
\t\t\tvar uv4 = uvs[ y + 1 ][ x + 1 ].clone();\n\
\n\
\t\t\tif ( Math.abs( this.vertices[ v1 ].y ) == radius ) {\n\
\n\
\t\t\t\tthis.faces.push( new THREE.Face3( v1, v3, v4, [ n1, n3, n4 ] ) );\n\
\t\t\t\tthis.faceVertexUvs[ 0 ].push( [ uv1, uv3, uv4 ] );\n\
\n\
\t\t\t} else if ( Math.abs( this.vertices[ v3 ].y ) ==  radius ) {\n\
\n\
\t\t\t\tthis.faces.push( new THREE.Face3( v1, v2, v3, [ n1, n2, n3 ] ) );\n\
\t\t\t\tthis.faceVertexUvs[ 0 ].push( [ uv1, uv2, uv3 ] );\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tthis.faces.push( new THREE.Face4( v1, v2, v3, v4, [ n1, n2, n3, n4 ] ) );\n\
\t\t\t\tthis.faceVertexUvs[ 0 ].push( [ uv1, uv2, uv3, uv4 ] );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\tthis.computeCentroids();\n\
\tthis.computeFaceNormals();\n\
\n\
\tthis.boundingSphere = { radius: radius };\n\
\n\
};\n\
\n\
THREE.SphereGeometry.prototype = Object.create( THREE.Geometry.prototype );\n\
/**\n\
 * @author zz85 / http://www.lab4games.net/zz85/blog\n\
 * @author alteredq / http://alteredqualia.com/\n\
 *\n\
 * For creating 3D text geometry in three.js\n\
 *\n\
 * Text = 3D Text\n\
 *\n\
 * parameters = {\n\
 *  size: \t\t\t<float>, \t// size of the text\n\
 *  height: \t\t<float>, \t// thickness to extrude text\n\
 *  curveSegments: \t<int>,\t\t// number of points on the curves\n\
 *\n\
 *  font: \t\t\t<string>,\t\t// font name\n\
 *  weight: \t\t<string>,\t\t// font weight (normal, bold)\n\
 *  style: \t\t\t<string>,\t\t// font style  (normal, italics)\n\
 *\n\
 *  bevelEnabled:\t<bool>,\t\t\t// turn on bevel\n\
 *  bevelThickness: <float>, \t\t// how deep into text bevel goes\n\
 *  bevelSize:\t\t<float>, \t\t// how far from text outline is bevel\n\
 *  }\n\
 *\n\
 */\n\
\n\
/*\tUsage Examples\n\
\n\
\t// TextGeometry wrapper\n\
\n\
\tvar text3d = new TextGeometry( text, options );\n\
\n\
\t// Complete manner\n\
\n\
\tvar textShapes = THREE.FontUtils.generateShapes( text, options );\n\
\tvar text3d = new ExtrudeGeometry( textShapes, options );\n\
\n\
*/\n\
\n\
\n\
THREE.TextGeometry = function ( text, parameters ) {\n\
\n\
\tvar textShapes = THREE.FontUtils.generateShapes( text, parameters );\n\
\n\
\t// translate parameters to ExtrudeGeometry API\n\
\n\
\tparameters.amount = parameters.height !== undefined ? parameters.height : 50;\n\
\n\
\t// defaults\n\
\n\
\tif ( parameters.bevelThickness === undefined ) parameters.bevelThickness = 10;\n\
\tif ( parameters.bevelSize === undefined ) parameters.bevelSize = 8;\n\
\tif ( parameters.bevelEnabled === undefined ) parameters.bevelEnabled = false;\n\
\n\
\tTHREE.ExtrudeGeometry.call( this, textShapes, parameters );\n\
\n\
};\n\
\n\
THREE.TextGeometry.prototype = Object.create( THREE.ExtrudeGeometry.prototype );\n\
/**\n\
 * @author oosmoxiecode\n\
 * @author mrdoob / http://mrdoob.com/\n\
 * based on http://code.google.com/p/away3d/source/browse/trunk/fp10/Away3DLite/src/away3dlite/primitives/Torus.as?r=2888\n\
 */\n\
\n\
THREE.TorusGeometry = function ( radius, tube, segmentsR, segmentsT, arc ) {\n\
\n\
\tTHREE.Geometry.call( this );\n\
\n\
\tvar scope = this;\n\
\n\
\tthis.radius = radius || 100;\n\
\tthis.tube = tube || 40;\n\
\tthis.segmentsR = segmentsR || 8;\n\
\tthis.segmentsT = segmentsT || 6;\n\
\tthis.arc = arc || Math.PI * 2;\n\
\n\
\tvar center = new THREE.Vector3(), uvs = [], normals = [];\n\
\n\
\tfor ( var j = 0; j <= this.segmentsR; j ++ ) {\n\
\n\
\t\tfor ( var i = 0; i <= this.segmentsT; i ++ ) {\n\
\n\
\t\t\tvar u = i / this.segmentsT * this.arc;\n\
\t\t\tvar v = j / this.segmentsR * Math.PI * 2;\n\
\n\
\t\t\tcenter.x = this.radius * Math.cos( u );\n\
\t\t\tcenter.y = this.radius * Math.sin( u );\n\
\n\
\t\t\tvar vertex = new THREE.Vector3();\n\
\t\t\tvertex.x = ( this.radius + this.tube * Math.cos( v ) ) * Math.cos( u );\n\
\t\t\tvertex.y = ( this.radius + this.tube * Math.cos( v ) ) * Math.sin( u );\n\
\t\t\tvertex.z = this.tube * Math.sin( v );\n\
\n\
\t\t\tthis.vertices.push( vertex );\n\
\n\
\t\t\tuvs.push( new THREE.UV( i / this.segmentsT, j / this.segmentsR ) );\n\
\t\t\tnormals.push( vertex.clone().subSelf( center ).normalize() );\n\
\n\
\t\t}\n\
\t}\n\
\n\
\n\
\tfor ( var j = 1; j <= this.segmentsR; j ++ ) {\n\
\n\
\t\tfor ( var i = 1; i <= this.segmentsT; i ++ ) {\n\
\n\
\t\t\tvar a = ( this.segmentsT + 1 ) * j + i - 1;\n\
\t\t\tvar b = ( this.segmentsT + 1 ) * ( j - 1 ) + i - 1;\n\
\t\t\tvar c = ( this.segmentsT + 1 ) * ( j - 1 ) + i;\n\
\t\t\tvar d = ( this.segmentsT + 1 ) * j + i;\n\
\n\
\t\t\tvar face = new THREE.Face4( a, b, c, d, [ normals[ a ], normals[ b ], normals[ c ], normals[ d ] ] );\n\
\t\t\tface.normal.addSelf( normals[ a ] );\n\
\t\t\tface.normal.addSelf( normals[ b ] );\n\
\t\t\tface.normal.addSelf( normals[ c ] );\n\
\t\t\tface.normal.addSelf( normals[ d ] );\n\
\t\t\tface.normal.normalize();\n\
\n\
\t\t\tthis.faces.push( face );\n\
\n\
\t\t\tthis.faceVertexUvs[ 0 ].push( [ uvs[ a ].clone(), uvs[ b ].clone(), uvs[ c ].clone(), uvs[ d ].clone() ] );\n\
\t\t}\n\
\n\
\t}\n\
\n\
\tthis.computeCentroids();\n\
\n\
};\n\
\n\
THREE.TorusGeometry.prototype = Object.create( THREE.Geometry.prototype );\n\
/**\n\
 * @author oosmoxiecode\n\
 * based on http://code.google.com/p/away3d/source/browse/trunk/fp10/Away3D/src/away3d/primitives/TorusKnot.as?spec=svn2473&r=2473\n\
 */\n\
\n\
THREE.TorusKnotGeometry = function ( radius, tube, segmentsR, segmentsT, p, q, heightScale ) {\n\
\n\
\tTHREE.Geometry.call( this );\n\
\n\
\tvar scope = this;\n\
\n\
\tthis.radius = radius || 200;\n\
\tthis.tube = tube || 40;\n\
\tthis.segmentsR = segmentsR || 64;\n\
\tthis.segmentsT = segmentsT || 8;\n\
\tthis.p = p || 2;\n\
\tthis.q = q || 3;\n\
\tthis.heightScale = heightScale || 1;\n\
\tthis.grid = new Array(this.segmentsR);\n\
\n\
\tvar tang = new THREE.Vector3();\n\
\tvar n = new THREE.Vector3();\n\
\tvar bitan = new THREE.Vector3();\n\
\n\
\tfor ( var i = 0; i < this.segmentsR; ++ i ) {\n\
\n\
\t\tthis.grid[ i ] = new Array( this.segmentsT );\n\
\n\
\t\tfor ( var j = 0; j < this.segmentsT; ++ j ) {\n\
\n\
\t\t\tvar u = i / this.segmentsR * 2 * this.p * Math.PI;\n\
\t\t\tvar v = j / this.segmentsT * 2 * Math.PI;\n\
\t\t\tvar p1 = getPos( u, v, this.q, this.p, this.radius, this.heightScale );\n\
\t\t\tvar p2 = getPos( u + 0.01, v, this.q, this.p, this.radius, this.heightScale );\n\
\t\t\tvar cx, cy;\n\
\n\
\t\t\ttang.sub( p2, p1 );\n\
\t\t\tn.add( p2, p1 );\n\
\n\
\t\t\tbitan.cross( tang, n );\n\
\t\t\tn.cross( bitan, tang );\n\
\t\t\tbitan.normalize();\n\
\t\t\tn.normalize();\n\
\n\
\t\t\tcx = - this.tube * Math.cos( v ); // TODO: Hack: Negating it so it faces outside.\n\
\t\t\tcy = this.tube * Math.sin( v );\n\
\n\
\t\t\tp1.x += cx * n.x + cy * bitan.x;\n\
\t\t\tp1.y += cx * n.y + cy * bitan.y;\n\
\t\t\tp1.z += cx * n.z + cy * bitan.z;\n\
\n\
\t\t\tthis.grid[ i ][ j ] = vert( p1.x, p1.y, p1.z );\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\tfor ( var i = 0; i < this.segmentsR; ++ i ) {\n\
\n\
\t\tfor ( var j = 0; j < this.segmentsT; ++ j ) {\n\
\n\
\t\t\tvar ip = ( i + 1 ) % this.segmentsR;\n\
\t\t\tvar jp = ( j + 1 ) % this.segmentsT;\n\
\n\
\t\t\tvar a = this.grid[ i ][ j ];\n\
\t\t\tvar b = this.grid[ ip ][ j ];\n\
\t\t\tvar c = this.grid[ ip ][ jp ];\n\
\t\t\tvar d = this.grid[ i ][ jp ];\n\
\n\
\t\t\tvar uva = new THREE.UV( i / this.segmentsR, j / this.segmentsT );\n\
\t\t\tvar uvb = new THREE.UV( ( i + 1 ) / this.segmentsR, j / this.segmentsT );\n\
\t\t\tvar uvc = new THREE.UV( ( i + 1 ) / this.segmentsR, ( j + 1 ) / this.segmentsT );\n\
\t\t\tvar uvd = new THREE.UV( i / this.segmentsR, ( j + 1 ) / this.segmentsT );\n\
\n\
\t\t\tthis.faces.push( new THREE.Face4( a, b, c, d ) );\n\
\t\t\tthis.faceVertexUvs[ 0 ].push( [ uva,uvb,uvc, uvd ] );\n\
\n\
\t\t}\n\
\t}\n\
\n\
\tthis.computeCentroids();\n\
\tthis.computeFaceNormals();\n\
\tthis.computeVertexNormals();\n\
\n\
\tfunction vert( x, y, z ) {\n\
\n\
\t\treturn scope.vertices.push( new THREE.Vector3( x, y, z ) ) - 1;\n\
\n\
\t}\n\
\n\
\tfunction getPos( u, v, in_q, in_p, radius, heightScale ) {\n\
\n\
\t\tvar cu = Math.cos( u );\n\
\t\tvar cv = Math.cos( v );\n\
\t\tvar su = Math.sin( u );\n\
\t\tvar quOverP = in_q / in_p * u;\n\
\t\tvar cs = Math.cos( quOverP );\n\
\n\
\t\tvar tx = radius * ( 2 + cs ) * 0.5 * cu;\n\
\t\tvar ty = radius * ( 2 + cs ) * su * 0.5;\n\
\t\tvar tz = heightScale * radius * Math.sin( quOverP ) * 0.5;\n\
\n\
\t\treturn new THREE.Vector3( tx, ty, tz );\n\
\n\
\t}\n\
\n\
};\n\
\n\
THREE.TorusKnotGeometry.prototype = Object.create( THREE.Geometry.prototype );\n\
/**\n\
 * @author WestLangley / https://github.com/WestLangley\n\
 * @author zz85 / https://github.com/zz85\n\
 * @author miningold / https://github.com/miningold\n\
 *\n\
 * Modified from the TorusKnotGeometry by @oosmoxiecode\n\
 *\n\
 * Creates a tube which extrudes along a 3d spline\n\
 *\n\
 * Uses parallel transport frames as described in\n\
 * http://www.cs.indiana.edu/pub/techreports/TR425.pdf\n\
 */\n\
\n\
THREE.TubeGeometry = function( path, segments, radius, segmentsRadius, closed, debug ) {\n\
\n\
\tTHREE.Geometry.call( this );\n\
\n\
\tthis.path = path;\n\
\tthis.segments = segments || 64;\n\
\tthis.radius = radius || 1;\n\
\tthis.segmentsRadius = segmentsRadius || 8;\n\
\tthis.closed = closed || false;\n\
\tif ( debug ) this.debug = new THREE.Object3D();\n\
\n\
\tthis.grid = [];\n\
\n\
\tvar scope = this,\n\
\n\
\t\ttangent,\n\
\t\tnormal,\n\
\t\tbinormal,\n\
\n\
\t\tnumpoints = this.segments + 1,\n\
\t\t\n\
\t\tx, y, z,\n\
\t\ttx, ty, tz,\n\
\t\tu, v,\n\
\n\
\t\tcx, cy,\n\
\t\tpos, pos2 = new THREE.Vector3(),\n\
\t\ti, j,\n\
\t\tip, jp,\n\
\t\ta, b, c, d,\n\
\t\tuva, uvb, uvc, uvd;\n\
\n\
\tvar frames = new THREE.TubeGeometry.FrenetFrames(path, segments, closed),\n\
\t\ttangents = frames.tangents,\n\
\t\tnormals = frames.normals,\n\
\t\tbinormals = frames.binormals;\n\
\n\
\t// proxy internals\n\
\tthis.tangents = tangents;\n\
\tthis.normals = normals;\n\
\tthis.binormals = binormals;\n\
\n\
\t\n\
\tfunction vert( x, y, z ) {\n\
\n\
\t\treturn scope.vertices.push( new THREE.Vector3( x, y, z ) ) - 1;\n\
\n\
\t}\n\
\n\
\n\
\n\
\n\
\t// consruct the grid\n\
\n\
\tfor ( i = 0; i < numpoints; i++ ) {\n\
\n\
\t\tthis.grid[ i ] = [];\n\
\n\
\t\tu = i / ( numpoints - 1 );\n\
\n\
\t\tpos = path.getPointAt( u );\n\
\n\
\t\ttangent = tangents[ i ];\n\
\t\tnormal = normals[ i ];\n\
\t\tbinormal = binormals[ i ];\n\
\n\
\t\tif ( this.debug ) {\n\
\n\
\t\t\tthis.debug.add(new THREE.ArrowHelper(tangent, pos, radius, 0x0000ff));\t\n\
\t\t\tthis.debug.add(new THREE.ArrowHelper(normal, pos, radius, 0xff0000));\n\
\t\t\tthis.debug.add(new THREE.ArrowHelper(binormal, pos, radius, 0x00ff00));\n\
\n\
\t\t}\n\
\n\
\t\tfor ( j = 0; j < this.segmentsRadius; j++ ) {\n\
\n\
\t\t\tv = j / this.segmentsRadius * 2 * Math.PI;\n\
\n\
\t\t\tcx = -this.radius * Math.cos( v ); // TODO: Hack: Negating it so it faces outside.\n\
\t\t\tcy = this.radius * Math.sin( v );\n\
\n\
            pos2.copy( pos );\n\
            pos2.x += cx * normal.x + cy * binormal.x;\n\
            pos2.y += cx * normal.y + cy * binormal.y;\n\
            pos2.z += cx * normal.z + cy * binormal.z;\n\
\n\
            this.grid[ i ][ j ] = vert( pos2.x, pos2.y, pos2.z );\n\
\n\
\t\t}\n\
\t}\n\
\n\
\n\
\t// construct the mesh\n\
\n\
\tfor ( i = 0; i < this.segments; i++ ) {\n\
\n\
\t\tfor ( j = 0; j < this.segmentsRadius; j++ ) {\n\
\n\
\t\t\tip = ( closed ) ? (i + 1) % this.segments : i + 1;\n\
\t\t\tjp = (j + 1) % this.segmentsRadius;\n\
\n\
\t\t\ta = this.grid[ i ][ j ];\t\t// *** NOT NECESSARILY PLANAR ! ***\n\
\t\t\tb = this.grid[ ip ][ j ];\n\
\t\t\tc = this.grid[ ip ][ jp ];\n\
\t\t\td = this.grid[ i ][ jp ];\n\
\n\
\t\t\tuva = new THREE.UV( i / this.segments, j / this.segmentsRadius );\n\
\t\t\tuvb = new THREE.UV( ( i + 1 ) / this.segments, j / this.segmentsRadius );\n\
\t\t\tuvc = new THREE.UV( ( i + 1 ) / this.segments, ( j + 1 ) / this.segmentsRadius );\n\
\t\t\tuvd = new THREE.UV( i / this.segments, ( j + 1 ) / this.segmentsRadius );\n\
\n\
\t\t\tthis.faces.push( new THREE.Face4( a, b, c, d ) );\n\
\t\t\tthis.faceVertexUvs[ 0 ].push( [ uva, uvb, uvc, uvd ] );\n\
\n\
\t\t}\n\
\t}\n\
\n\
\tthis.computeCentroids();\n\
\tthis.computeFaceNormals();\n\
\tthis.computeVertexNormals();\n\
\n\
};\n\
\n\
THREE.TubeGeometry.prototype = Object.create( THREE.Geometry.prototype );\n\
\n\
\n\
// For computing of Frenet frames, exposing the tangents, normals and binormals the spline\n\
THREE.TubeGeometry.FrenetFrames = function(path, segments, closed) {\n\
\n\
\tvar\n\
\t\ttangent = new THREE.Vector3(),\n\
\t\tnormal = new THREE.Vector3(),\n\
\t\tbinormal = new THREE.Vector3(),\n\
\n\
\t\ttangents = [],\n\
\t\tnormals = [],\n\
\t\tbinormals = [],\n\
\n\
\t\tvec = new THREE.Vector3(),\n\
\t\tmat = new THREE.Matrix4(),\n\
\n\
\t\tnumpoints = segments + 1,\n\
\t\ttheta,\n\
\t\tepsilon = 0.0001,\n\
\t\tsmallest,\n\
\n\
\t\ttx, ty, tz,\n\
\t\ti, u, v;\n\
\n\
\n\
\t// expose internals\n\
\tthis.tangents = tangents;\n\
\tthis.normals = normals;\n\
\tthis.binormals = binormals;\n\
\n\
\t// compute the tangent vectors for each segment on the path\n\
\n\
\tfor ( i = 0; i < numpoints; i++ ) {\n\
\n\
\t\tu = i / ( numpoints - 1 );\n\
\n\
\t\ttangents[ i ] = path.getTangentAt( u );\n\
\t\ttangents[ i ].normalize();\n\
\n\
\t}\n\
\n\
\tinitialNormal3();\n\
\n\
\tfunction initialNormal1(lastBinormal) {\n\
\t\t// fixed start binormal. Has dangers of 0 vectors\n\
\t\tnormals[ 0 ] = new THREE.Vector3();\n\
\t\tbinormals[ 0 ] = new THREE.Vector3();\n\
\t\tif (lastBinormal===undefined) lastBinormal = new THREE.Vector3( 0, 0, 1 );\n\
\t\tnormals[ 0 ].cross( lastBinormal, tangents[ 0 ] ).normalize();\n\
\t\tbinormals[ 0 ].cross( tangents[ 0 ], normals[ 0 ] ).normalize();\n\
\t}\n\
\n\
\tfunction initialNormal2() {\n\
\n\
\t\t// This uses the Frenet-Serret formula for deriving binormal\n\
\t\tvar t2 = path.getTangentAt( epsilon );\n\
\n\
\t\tnormals[ 0 ] = new THREE.Vector3().sub( t2, tangents[ 0 ] ).normalize();\n\
\t\tbinormals[ 0 ] = new THREE.Vector3().cross( tangents[ 0 ], normals[ 0 ] );\n\
\n\
\t\tnormals[ 0 ].cross( binormals[ 0 ], tangents[ 0 ] ).normalize(); // last binormal x tangent\n\
\t\tbinormals[ 0 ].cross( tangents[ 0 ], normals[ 0 ] ).normalize();\n\
\n\
\t}\n\
\n\
\tfunction initialNormal3() {\n\
\t\t// select an initial normal vector perpenicular to the first tangent vector,\n\
\t\t// and in the direction of the smallest tangent xyz component\n\
\n\
\t\tnormals[ 0 ] = new THREE.Vector3();\n\
\t\tbinormals[ 0 ] = new THREE.Vector3();\n\
\t\tsmallest = Number.MAX_VALUE;\n\
\t\ttx = Math.abs( tangents[ 0 ].x );\n\
\t\tty = Math.abs( tangents[ 0 ].y );\n\
\t\ttz = Math.abs( tangents[ 0 ].z );\n\
\n\
\t\tif ( tx <= smallest ) {\n\
\t\t\tsmallest = tx;\n\
\t\t\tnormal.set( 1, 0, 0 );\n\
\t\t}\n\
\n\
\t\tif ( ty <= smallest ) {\n\
\t\t\tsmallest = ty;\n\
\t\t\tnormal.set( 0, 1, 0 );\n\
\t\t}\n\
\n\
\t\tif ( tz <= smallest ) {\n\
\t\t\tnormal.set( 0, 0, 1 );\n\
\t\t}\n\
\n\
\t\tvec.cross( tangents[ 0 ], normal ).normalize();\n\
\n\
\t\tnormals[ 0 ].cross( tangents[ 0 ], vec );\n\
\t\tbinormals[ 0 ].cross( tangents[ 0 ], normals[ 0 ] );\n\
\t}\n\
\n\
\n\
\t// compute the slowly-varying normal and binormal vectors for each segment on the path\n\
\n\
\tfor ( i = 1; i < numpoints; i++ ) {\n\
\n\
\t\tnormals[ i ] = normals[ i-1 ].clone();\n\
\n\
\t\tbinormals[ i ] = binormals[ i-1 ].clone();\n\
\n\
\t\tvec.cross( tangents[ i-1 ], tangents[ i ] );\n\
\n\
\t\tif ( vec.length() > epsilon ) {\n\
\n\
\t\t\tvec.normalize();\n\
\n\
\t\t\ttheta = Math.acos( tangents[ i-1 ].dot( tangents[ i ] ) );\n\
\n\
\t\t\tmat.makeRotationAxis( vec, theta ).multiplyVector3( normals[ i ] );\n\
\n\
\t\t}\n\
\n\
\t\tbinormals[ i ].cross( tangents[ i ], normals[ i ] );\n\
\n\
\t}\n\
\n\
\n\
\t// if the curve is closed, postprocess the vectors so the first and last normal vectors are the same\n\
\n\
\tif ( closed ) {\n\
\n\
\t\ttheta = Math.acos( normals[ 0 ].dot( normals[ numpoints-1 ] ) );\n\
\t\ttheta /= ( numpoints - 1 );\n\
\n\
\t\tif ( tangents[ 0 ].dot( vec.cross( normals[ 0 ], normals[ numpoints-1 ] ) ) > 0 ) {\n\
\n\
\t\t\ttheta = -theta;\n\
\n\
\t\t}\n\
\n\
\t\tfor ( i = 1; i < numpoints; i++ ) {\n\
\n\
\t\t\t// twist a little...\n\
\t\t\tmat.makeRotationAxis( tangents[ i ], theta * i ).multiplyVector3( normals[ i ] );\n\
\t\t\tbinormals[ i ].cross( tangents[ i ], normals[ i ] );\n\
\n\
\t\t}\n\
\n\
\t}\n\
};\n\
/**\n\
 * @author clockworkgeek / https://github.com/clockworkgeek\n\
 * @author timothypratley / https://github.com/timothypratley\n\
 */\n\
\n\
THREE.PolyhedronGeometry = function ( vertices, faces, radius, detail ) {\n\
\n\
\tTHREE.Geometry.call( this );\n\
\n\
\tradius = radius || 1;\n\
\tdetail = detail || 0;\n\
\n\
\tvar that = this;\n\
\n\
\tfor ( var i = 0, l = vertices.length; i < l; i ++ ) {\n\
\n\
\t\tprepare( new THREE.Vector3( vertices[ i ][ 0 ], vertices[ i ][ 1 ], vertices[ i ][ 2 ] ) );\n\
\n\
\t}\n\
\n\
\tvar midpoints = [], p = this.vertices;\n\
\n\
\tfor ( var i = 0, l = faces.length; i < l; i ++ ) {\n\
\n\
\t\tmake( p[ faces[ i ][ 0 ] ], p[ faces[ i ][ 1 ] ], p[ faces[ i ][ 2 ] ], detail );\n\
\n\
\t}\n\
\n\
\tthis.mergeVertices();\n\
\n\
\t// Apply radius\n\
\n\
\tfor ( var i = 0, l = this.vertices.length; i < l; i ++ ) {\n\
\n\
\t\tthis.vertices[ i ].multiplyScalar( radius );\n\
\n\
\t}\n\
\n\
\n\
\t// Project vector onto sphere's surface\n\
\n\
\tfunction prepare( vector ) {\n\
\n\
\t\tvar vertex = vector.normalize().clone();\n\
\t\tvertex.index = that.vertices.push( vertex ) - 1;\n\
\n\
\t\t// Texture coords are equivalent to map coords, calculate angle and convert to fraction of a circle.\n\
\n\
\t\tvar u = azimuth( vector ) / 2 / Math.PI + 0.5;\n\
\t\tvar v = inclination( vector ) / Math.PI + 0.5;\n\
\t\tvertex.uv = new THREE.UV( u, 1 - v );\n\
\n\
\t\treturn vertex;\n\
\n\
\t}\n\
\n\
\n\
\t// Approximate a curved face with recursively sub-divided triangles.\n\
\n\
\tfunction make( v1, v2, v3, detail ) {\n\
\n\
\t\tif ( detail < 1 ) {\n\
\n\
\t\t\tvar face = new THREE.Face3( v1.index, v2.index, v3.index, [ v1.clone(), v2.clone(), v3.clone() ] );\n\
\t\t\tface.centroid.addSelf( v1 ).addSelf( v2 ).addSelf( v3 ).divideScalar( 3 );\n\
\t\t\tface.normal = face.centroid.clone().normalize();\n\
\t\t\tthat.faces.push( face );\n\
\n\
\t\t\tvar azi = azimuth( face.centroid );\n\
\t\t\tthat.faceVertexUvs[ 0 ].push( [\n\
\t\t\t\tcorrectUV( v1.uv, v1, azi ),\n\
\t\t\t\tcorrectUV( v2.uv, v2, azi ),\n\
\t\t\t\tcorrectUV( v3.uv, v3, azi )\n\
\t\t\t] );\n\
\n\
\t\t} else {\n\
\n\
\t\t\tdetail -= 1;\n\
\n\
\t\t\t// split triangle into 4 smaller triangles\n\
\n\
\t\t\tmake( v1, midpoint( v1, v2 ), midpoint( v1, v3 ), detail ); // top quadrant\n\
\t\t\tmake( midpoint( v1, v2 ), v2, midpoint( v2, v3 ), detail ); // left quadrant\n\
\t\t\tmake( midpoint( v1, v3 ), midpoint( v2, v3 ), v3, detail ); // right quadrant\n\
\t\t\tmake( midpoint( v1, v2 ), midpoint( v2, v3 ), midpoint( v1, v3 ), detail ); // center quadrant\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\tfunction midpoint( v1, v2 ) {\n\
\n\
\t\tif ( !midpoints[ v1.index ] ) midpoints[ v1.index ] = [];\n\
\t\tif ( !midpoints[ v2.index ] ) midpoints[ v2.index ] = [];\n\
\n\
\t\tvar mid = midpoints[ v1.index ][ v2.index ];\n\
\n\
\t\tif ( mid === undefined ) {\n\
\n\
\t\t\t// generate mean point and project to surface with prepare()\n\
\n\
\t\t\tmidpoints[ v1.index ][ v2.index ] = midpoints[ v2.index ][ v1.index ] = mid = prepare(\n\
\t\t\t\tnew THREE.Vector3().add( v1, v2 ).divideScalar( 2 )\n\
\t\t\t);\n\
\t\t}\n\
\n\
\t\treturn mid;\n\
\n\
\t}\n\
\n\
\n\
\t// Angle around the Y axis, counter-clockwise when looking from above.\n\
\n\
\tfunction azimuth( vector ) {\n\
\n\
\t\treturn Math.atan2( vector.z, -vector.x );\n\
\n\
\t}\n\
\n\
\n\
\t// Angle above the XZ plane.\n\
\n\
\tfunction inclination( vector ) {\n\
\n\
\t\treturn Math.atan2( -vector.y, Math.sqrt( ( vector.x * vector.x ) + ( vector.z * vector.z ) ) );\n\
\n\
\t}\n\
\n\
\n\
\t// Texture fixing helper. Spheres have some odd behaviours.\n\
\n\
\tfunction correctUV( uv, vector, azimuth ) {\n\
\n\
\t\tif ( ( azimuth < 0 ) && ( uv.u === 1 ) ) uv = new THREE.UV( uv.u - 1, uv.v );\n\
\t\tif ( ( vector.x === 0 ) && ( vector.z === 0 ) ) uv = new THREE.UV( azimuth / 2 / Math.PI + 0.5, uv.v );\n\
\t\treturn uv;\n\
\n\
\t}\n\
\n\
\tthis.computeCentroids();\n\
\n\
\tthis.boundingSphere = { radius: radius };\n\
\n\
};\n\
\n\
THREE.PolyhedronGeometry.prototype = Object.create( THREE.Geometry.prototype );\n\
/**\n\
 * @author timothypratley / https://github.com/timothypratley\n\
 */\n\
\n\
THREE.IcosahedronGeometry = function ( radius, detail ) {\n\
\n\
\tvar t = ( 1 + Math.sqrt( 5 ) ) / 2;\n\
\n\
\tvar vertices = [\n\
\t\t[ -1,  t,  0 ], [  1, t, 0 ], [ -1, -t,  0 ], [  1, -t,  0 ],\n\
\t\t[  0, -1,  t ], [  0, 1, t ], [  0, -1, -t ], [  0,  1, -t ],\n\
\t\t[  t,  0, -1 ], [  t, 0, 1 ], [ -t,  0, -1 ], [ -t,  0,  1 ]\n\
\t];\n\
\n\
\tvar faces = [\n\
\t\t[ 0, 11,  5 ], [ 0,  5,  1 ], [  0,  1,  7 ], [  0,  7, 10 ], [  0, 10, 11 ],\n\
\t\t[ 1,  5,  9 ], [ 5, 11,  4 ], [ 11, 10,  2 ], [ 10,  7,  6 ], [  7,  1,  8 ],\n\
\t\t[ 3,  9,  4 ], [ 3,  4,  2 ], [  3,  2,  6 ], [  3,  6,  8 ], [  3,  8,  9 ],\n\
\t\t[ 4,  9,  5 ], [ 2,  4, 11 ], [  6,  2, 10 ], [  8,  6,  7 ], [  9,  8,  1 ]\n\
\t];\n\
\n\
\tTHREE.PolyhedronGeometry.call( this, vertices, faces, radius, detail );\n\
\n\
};\n\
\n\
THREE.IcosahedronGeometry.prototype = Object.create( THREE.Geometry.prototype );\n\
/**\n\
 * @author timothypratley / https://github.com/timothypratley\n\
 */\n\
\n\
THREE.OctahedronGeometry = function ( radius, detail ) {\n\
\n\
\tvar vertices = [\n\
\t\t[ 1, 0, 0 ], [ -1, 0, 0 ], [ 0, 1, 0 ], [ 0, -1, 0 ], [ 0, 0, 1 ], [ 0, 0, -1 ]\n\
\t];\n\
\n\
\tvar faces = [\n\
\t\t[ 0, 2, 4 ], [ 0, 4, 3 ], [ 0, 3, 5 ], [ 0, 5, 2 ], [ 1, 2, 5 ], [ 1, 5, 3 ], [ 1, 3, 4 ], [ 1, 4, 2 ]\n\
\t];\n\
\n\
\tTHREE.PolyhedronGeometry.call( this, vertices, faces, radius, detail );\n\
};\n\
\n\
THREE.OctahedronGeometry.prototype = Object.create( THREE.Geometry.prototype );\n\
/**\n\
 * @author timothypratley / https://github.com/timothypratley\n\
 */\n\
\n\
THREE.TetrahedronGeometry = function ( radius, detail ) {\n\
\n\
\tvar vertices = [\n\
\t\t[ 1,  1,  1 ], [ -1, -1, 1 ], [ -1, 1, -1 ], [ 1, -1, -1 ]\n\
\t];\n\
\n\
\tvar faces = [\n\
\t\t[ 2, 1, 0 ], [ 0, 3, 2 ], [ 1, 3, 0 ], [ 2, 3, 1 ]\n\
\t];\n\
\n\
\tTHREE.PolyhedronGeometry.call( this, vertices, faces, radius, detail );\n\
\n\
};\n\
\n\
THREE.TetrahedronGeometry.prototype = Object.create( THREE.Geometry.prototype );\n\
/**\n\
 * @author zz85 / https://github.com/zz85\n\
 * Parametric Surfaces Geometry\n\
 * based on the brilliant article by @prideout http://prideout.net/blog/?p=44\n\
 *\n\
 * new THREE.ParametricGeometry( parametricFunction, uSegments, ySegements, useTris );\n\
 *\n\
 */\n\
\n\
THREE.ParametricGeometry = function ( func, slices, stacks, useTris ) {\n\
\n\
\tTHREE.Geometry.call( this );\n\
\n\
\tvar verts = this.vertices;\n\
\tvar faces = this.faces;\n\
\tvar uvs = this.faceVertexUvs[ 0 ];\n\
\n\
\tuseTris = (useTris === undefined) ? false : useTris;\n\
\n\
\tvar i, il, j, p;\n\
\tvar u, v;\n\
\n\
\tvar stackCount = stacks + 1;\n\
\tvar sliceCount = slices + 1;\n\
\n\
\tfor ( i = 0; i <= stacks; i ++ ) {\n\
\n\
\t\tv = i / stacks;\n\
\n\
\t\tfor ( j = 0; j <= slices; j ++ ) {\n\
\n\
\t\t\tu = j / slices;\n\
\n\
\t\t\tp = func( u, v );\n\
\t\t\tverts.push( p );\n\
\n\
\t\t}\n\
\t}\n\
\n\
\tvar a, b, c, d;\n\
\tvar uva, uvb, uvc, uvd;\n\
\n\
\tfor ( i = 0; i < stacks; i ++ ) {\n\
\n\
\t\tfor ( j = 0; j < slices; j ++ ) {\n\
\n\
\t\t\ta = i * sliceCount + j;\n\
\t\t\tb = i * sliceCount + j + 1;\n\
\t\t\tc = (i + 1) * sliceCount + j;\n\
\t\t\td = (i + 1) * sliceCount + j + 1;\n\
\n\
\t\t\tuva = new THREE.UV( j / slices, i / stacks );\n\
\t\t\tuvb = new THREE.UV( ( j + 1 ) / slices, i / stacks );\n\
\t\t\tuvc = new THREE.UV( j / slices, ( i + 1 ) / stacks );\n\
\t\t\tuvd = new THREE.UV( ( j + 1 ) / slices, ( i + 1 ) / stacks );\n\
\n\
\t\t\tif ( useTris ) {\n\
\n\
\t\t\t\tfaces.push( new THREE.Face3( a, b, c ) );\n\
\t\t\t\tfaces.push( new THREE.Face3( b, d, c ) );\n\
\n\
\t\t\t\tuvs.push( [ uva, uvb, uvc ] );\n\
\t\t\t\tuvs.push( [ uvb, uvd, uvc ] );\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tfaces.push( new THREE.Face4( a, b, d, c ) );\n\
\t\t\t\tuvs.push( [ uva, uvb, uvd, uvc ] );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\t// console.log(this);\n\
\n\
\t// magic bullet\n\
\t// var diff = this.mergeVertices();\n\
\t// console.log('removed ', diff, ' vertices by merging');\n\
\n\
\tthis.computeCentroids();\n\
\tthis.computeFaceNormals();\n\
\tthis.computeVertexNormals();\n\
\n\
};\n\
\n\
THREE.ParametricGeometry.prototype = Object.create( THREE.Geometry.prototype );\n\
/**\n\
 * @author qiao / https://github.com/qiao\n\
 * @fileoverview This is a convex hull generator using the incremental method.\n\
 * The complexity is O(n^2) where n is the number of vertices.\n\
 * O(nlogn) algorithms do exist, but they are much more complicated.\n\
 *\n\
 * Benchmark:\n\
 *\n\
 *  Platform: CPU: P7350 @2.00GHz Engine: V8\n\
 *\t\t\n\
 *  Num Vertices\tTime(ms)\n\
 *\t\t\n\
 *     10           1\n\
 *     20           3\n\
 *     30           19\n\
 *     40           48\n\
 *     50           107\n\
 */\n\
\n\
THREE.ConvexGeometry = function( vertices ) {\n\
\n\
\tTHREE.Geometry.call( this );\n\
\n\
\tvar faces = [ [ 0, 1, 2 ], [ 0, 2, 1 ] ];\n\
\n\
\tfor ( var i = 3; i < vertices.length; i++ ) {\n\
\n\
\t\taddPoint( i );\n\
\n\
\t}\n\
\n\
\n\
\tfunction addPoint( vertexId ) {\n\
\n\
\t\tvar vertex = vertices[ vertexId ].clone();\n\
\n\
\t\tvar mag = vertex.length();\n\
\t\tvertex.x += mag * randomOffset();\n\
\t\tvertex.y += mag * randomOffset();\n\
\t\tvertex.z += mag * randomOffset();\n\
\n\
\t\tvar hole = [];\n\
\n\
\t\tfor ( var f = 0; f < faces.length; ) {\n\
\n\
\t\t\tvar face = faces[ f ];\n\
\t\t\t\n\
\t\t\t// for each face, if the vertex can see it,\n\
\t\t\t// then we try to add the face's edges into the hole.\n\
\t\t\tif ( visible( face, vertex ) ) {\n\
\n\
\t\t\t\tfor ( var e = 0; e < 3; e++ ) {\n\
\t\t\t\t\t\n\
\t\t\t\t\tvar edge = [ face[ e ], face[ ( e + 1 ) % 3 ] ];\n\
\t\t\t\t\tvar boundary = true;\n\
\n\
\t\t\t\t\t// remove duplicated edges.\n\
\t\t\t\t\tfor ( var h = 0; h < hole.length; h++ ) {\n\
\t\t\t\t\t\n\
\t\t\t\t\t\tif ( equalEdge( hole[ h ], edge ) ) {\n\
\t\t\t\t\t\t\n\
\t\t\t\t\t\t\thole[ h ] = hole[ hole.length - 1 ];\n\
\t\t\t\t\t\t\thole.pop();\n\
\t\t\t\t\t\t\tboundary = false;\n\
\t\t\t\t\t\t\tbreak;\n\
\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\tif ( boundary ) {\n\
\n\
\t\t\t\t\t\thole.push( edge );\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\t// remove faces[ f ]\n\
\t\t\t\tfaces[ f ] = faces[ faces.length - 1 ];\n\
\t\t\t\tfaces.pop();\n\
\t\t\t\n\
\t\t\t} else { // not visible\n\
\t\t\t\n\
\t\t\t\tf++;\n\
\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t\t// construct the new faces formed by the edges of the hole and the vertex\n\
\t\tfor ( var h = 0; h < hole.length; h++ ) {\n\
\n\
\t\t\tfaces.push( [\n\
\t\t\t\thole[ h ][ 0 ],\n\
\t\t\t\thole[ h ][ 1 ],\n\
\t\t\t\tvertexId\n\
\t\t\t] );\n\
\n\
\t\t}\n\
\t}\n\
\n\
\t/**\n\
\t * Whether the face is visible from the vertex\n\
\t */\n\
\tfunction visible( face, vertex ) {\n\
\n\
\t\tvar va = vertices[ face[ 0 ] ];\n\
\t\tvar vb = vertices[ face[ 1 ] ];\n\
\t\tvar vc = vertices[ face[ 2 ] ];\n\
\n\
\t\tvar n = normal( va, vb, vc );\n\
\n\
\t\t// distance from face to origin\n\
\t\tvar dist = n.dot( va );\n\
\n\
\t\treturn n.dot( vertex ) >= dist;\n\
\n\
\t}\n\
\n\
\t/**\n\
\t * Face normal\n\
\t */\n\
\tfunction normal( va, vb, vc ) {\n\
\t\n\
\t\tvar cb = new THREE.Vector3();\n\
\t\tvar ab = new THREE.Vector3();\n\
\n\
\t\tcb.sub( vc, vb );\n\
\t\tab.sub( va, vb );\n\
\t\tcb.crossSelf( ab );\n\
\n\
\t\tif ( !cb.isZero() ) {\n\
\t\t\t\n\
\t\t\tcb.normalize();\n\
\n\
\t\t}\n\
\n\
\t\treturn cb;\n\
\n\
\t}\n\
\n\
\t/**\n\
\t * Detect whether two edges are equal.\n\
\t * Note that when constructing the convex hull, two same edges can only\n\
\t * be of the negative direction.\n\
\t */\n\
\tfunction equalEdge( ea, eb ) {\n\
\t\n\
\t\treturn ea[ 0 ] === eb[ 1 ] && ea[ 1 ] === eb[ 0 ];\n\
\n\
\t}\n\
\n\
\t/**\n\
\t * Create a random offset between -1e-6 and 1e-6.\n\
\t */\n\
\tfunction randomOffset() {\n\
\n\
\t\treturn ( Math.random() - 0.5 ) * 2 * 1e-6;\n\
\n\
\t}\n\
\n\
\n\
\t/**\n\
\t * XXX: Not sure if this is the correct approach. Need someone to review.\n\
\t */\n\
\tfunction vertexUv( vertex ) {\n\
\n\
\t\tvar mag = vertex.length();\n\
\t\treturn new THREE.UV( vertex.x / mag, vertex.y / mag );\n\
\n\
\t}\n\
\n\
\t// Push vertices into `this.vertices`, skipping those inside the hull\n\
\tvar id = 0;\n\
\tvar newId = new Array( vertices.length ); // map from old vertex id to new id\n\
\n\
\tfor ( var i = 0; i < faces.length; i++ ) {\n\
\n\
\t\t var face = faces[ i ];\n\
\t\t\n\
\t\t for ( var j = 0; j < 3; j++ ) {\n\
\t\t\n\
\t\t\t\tif ( newId[ face[ j ] ] === undefined ) {\n\
\t\t\t\t\n\
\t\t\t\t\t\tnewId[ face[ j ] ] = id++;\n\
\t\t\t\t\t\tthis.vertices.push( vertices[ face[ j ] ] );\n\
\t\t\t\t\n\
\t\t\t\t}\n\
\n\
\t\t\t\tface[ j ] = newId[ face[ j ] ];\n\
\n\
\t\t }\n\
\t\t\n\
\t}\n\
\n\
\t// Convert faces into instances of THREE.Face3\n\
\tfor ( var i = 0; i < faces.length; i++ ) {\n\
\n\
\t\tthis.faces.push( new THREE.Face3(\n\
\t\t\t\tfaces[ i ][ 0 ],\n\
\t\t\t\tfaces[ i ][ 1 ],\n\
\t\t\t\tfaces[ i ][ 2 ]\n\
\t\t) );\n\
\n\
\t}\n\
\n\
\t// Compute UVs\n\
\tfor ( var i = 0; i < this.faces.length; i++ ) {\n\
\t\t\n\
\t\tvar face = this.faces[ i ];\n\
\n\
\t\tthis.faceVertexUvs[ 0 ].push( [\n\
\t\t\tvertexUv( this.vertices[ face.a ] ),\n\
\t\t\tvertexUv( this.vertices[ face.b ] ),\n\
\t\t\tvertexUv( this.vertices[ face.c ])\n\
\t\t] );\n\
\n\
\t}\n\
\t\n\
\n\
\tthis.computeCentroids();\n\
\tthis.computeFaceNormals();\n\
\tthis.computeVertexNormals();\n\
\n\
};\n\
\n\
THREE.ConvexGeometry.prototype = Object.create( THREE.Geometry.prototype );\n\
/**\n\
 * @author sroucheray / http://sroucheray.org/\n\
 * @author mrdoob / http://mrdoob.com/\n\
 */\n\
\n\
THREE.AxisHelper = function () {\n\
\n\
\tTHREE.Object3D.call( this );\n\
\n\
\tvar lineGeometry = new THREE.Geometry();\n\
\tlineGeometry.vertices.push( new THREE.Vector3() );\n\
\tlineGeometry.vertices.push( new THREE.Vector3( 0, 100, 0 ) );\n\
\n\
\tvar coneGeometry = new THREE.CylinderGeometry( 0, 5, 25, 5, 1 );\n\
\n\
\tvar line, cone;\n\
\n\
\t// x\n\
\n\
\tline = new THREE.Line( lineGeometry, new THREE.LineBasicMaterial( { color : 0xff0000 } ) );\n\
\tline.rotation.z = - Math.PI / 2;\n\
\tthis.add( line );\n\
\n\
\tcone = new THREE.Mesh( coneGeometry, new THREE.MeshBasicMaterial( { color : 0xff0000 } ) );\n\
\tcone.position.x = 100;\n\
\tcone.rotation.z = - Math.PI / 2;\n\
\tthis.add( cone );\n\
\n\
\t// y\n\
\n\
\tline = new THREE.Line( lineGeometry, new THREE.LineBasicMaterial( { color : 0x00ff00 } ) );\n\
\tthis.add( line );\n\
\n\
\tcone = new THREE.Mesh( coneGeometry, new THREE.MeshBasicMaterial( { color : 0x00ff00 } ) );\n\
\tcone.position.y = 100;\n\
\tthis.add( cone );\n\
\n\
\t// z\n\
\n\
\tline = new THREE.Line( lineGeometry, new THREE.LineBasicMaterial( { color : 0x0000ff } ) );\n\
\tline.rotation.x = Math.PI / 2;\n\
\tthis.add( line );\n\
\n\
\tcone = new THREE.Mesh( coneGeometry, new THREE.MeshBasicMaterial( { color : 0x0000ff } ) );\n\
\tcone.position.z = 100;\n\
\tcone.rotation.x = Math.PI / 2;\n\
\tthis.add( cone );\n\
\n\
};\n\
\n\
THREE.AxisHelper.prototype = Object.create( THREE.Object3D.prototype );\n\
/**\n\
 * @author WestLangley / http://github.com/WestLangley\n\
 * @author zz85 / https://github.com/zz85\n\
 *\n\
 * Creates an arrow for visualizing directions\n\
 *\n\
 * Parameters:\n\
 *  dir - Vector3\n\
 *  origin - Vector3\n\
 *  length - Number\n\
 *  hex - color in hex value\n\
 */\n\
\n\
THREE.ArrowHelper = function ( dir, origin, length, hex ) {\n\
\n\
\tTHREE.Object3D.call( this );\n\
\n\
\tif ( hex === undefined ) hex = 0xffff00;\n\
\tif ( length === undefined ) length = 20;\n\
\n\
\tvar lineGeometry = new THREE.Geometry();\n\
\tlineGeometry.vertices.push( new THREE.Vector3( 0, 0, 0 ) );\n\
\tlineGeometry.vertices.push( new THREE.Vector3( 0, 1, 0 ) );\n\
\n\
\tthis.line = new THREE.Line( lineGeometry, new THREE.LineBasicMaterial( { color: hex } ) );\n\
\tthis.add( this.line );\n\
\n\
\tvar coneGeometry = new THREE.CylinderGeometry( 0, 0.05, 0.25, 5, 1 );\n\
\n\
\tthis.cone = new THREE.Mesh( coneGeometry, new THREE.MeshBasicMaterial( { color: hex } ) );\n\
\tthis.cone.position.set( 0, 1, 0 );\n\
\tthis.add( this.cone );\n\
\n\
\tif ( origin instanceof THREE.Vector3 ) this.position = origin;\n\
\n\
\tthis.setDirection( dir );\n\
\tthis.setLength( length );\n\
\n\
};\n\
\n\
THREE.ArrowHelper.prototype = Object.create( THREE.Object3D.prototype );\n\
\n\
THREE.ArrowHelper.prototype.setDirection = function ( dir ) {\n\
\n\
\tvar axis = new THREE.Vector3( 0, 1, 0 ).crossSelf( dir );\n\
\n\
\tvar radians = Math.acos( new THREE.Vector3( 0, 1, 0 ).dot( dir.clone().normalize() ) );\n\
\n\
\tthis.matrix = new THREE.Matrix4().makeRotationAxis( axis.normalize(), radians );\n\
\n\
\tthis.rotation.setEulerFromRotationMatrix( this.matrix, this.eulerOrder );\n\
\n\
};\n\
\n\
THREE.ArrowHelper.prototype.setLength = function ( length ) {\n\
\n\
\tthis.scale.set( length, length, length );\n\
\n\
};\n\
\n\
THREE.ArrowHelper.prototype.setColor = function ( hex ) {\n\
\n\
\tthis.line.material.color.setHex( hex );\n\
\tthis.cone.material.color.setHex( hex );\n\
\n\
};\n\
/**\n\
 * @author alteredq / http://alteredqualia.com/\n\
 *\n\
 *\t- shows frustum, line of sight and up of the camera\n\
 *\t- suitable for fast updates\n\
 * \t- based on frustum visualization in lightgl.js shadowmap example\n\
 *\t\thttp://evanw.github.com/lightgl.js/tests/shadowmap.html\n\
 */\n\
\n\
THREE.CameraHelper = function ( camera ) {\n\
\n\
\tTHREE.Line.call( this );\n\
\n\
\tvar scope = this;\n\
\n\
\tthis.geometry = new THREE.Geometry();\n\
\tthis.material = new THREE.LineBasicMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors } );\n\
\tthis.type = THREE.LinePieces;\n\
\n\
\tthis.matrixWorld = camera.matrixWorld;\n\
\tthis.matrixAutoUpdate = false;\n\
\n\
\tthis.pointMap = {};\n\
\n\
\t// colors\n\
\n\
\tvar hexFrustum = 0xffaa00;\n\
\tvar hexCone = 0xff0000;\n\
\tvar hexUp = 0x00aaff;\n\
\tvar hexTarget = 0xffffff;\n\
\tvar hexCross = 0x333333;\n\
\n\
\t// near\n\
\n\
\taddLine( \"n1\", \"n2\", hexFrustum );\n\
\taddLine( \"n2\", \"n4\", hexFrustum );\n\
\taddLine( \"n4\", \"n3\", hexFrustum );\n\
\taddLine( \"n3\", \"n1\", hexFrustum );\n\
\n\
\t// far\n\
\n\
\taddLine( \"f1\", \"f2\", hexFrustum );\n\
\taddLine( \"f2\", \"f4\", hexFrustum );\n\
\taddLine( \"f4\", \"f3\", hexFrustum );\n\
\taddLine( \"f3\", \"f1\", hexFrustum );\n\
\n\
\t// sides\n\
\n\
\taddLine( \"n1\", \"f1\", hexFrustum );\n\
\taddLine( \"n2\", \"f2\", hexFrustum );\n\
\taddLine( \"n3\", \"f3\", hexFrustum );\n\
\taddLine( \"n4\", \"f4\", hexFrustum );\n\
\n\
\t// cone\n\
\n\
\taddLine( \"p\", \"n1\", hexCone );\n\
\taddLine( \"p\", \"n2\", hexCone );\n\
\taddLine( \"p\", \"n3\", hexCone );\n\
\taddLine( \"p\", \"n4\", hexCone );\n\
\n\
\t// up\n\
\n\
\taddLine( \"u1\", \"u2\", hexUp );\n\
\taddLine( \"u2\", \"u3\", hexUp );\n\
\taddLine( \"u3\", \"u1\", hexUp );\n\
\n\
\t// target\n\
\n\
\taddLine( \"c\", \"t\", hexTarget );\n\
\taddLine( \"p\", \"c\", hexCross );\n\
\n\
\t// cross\n\
\n\
\taddLine( \"cn1\", \"cn2\", hexCross );\n\
\taddLine( \"cn3\", \"cn4\", hexCross );\n\
\n\
\taddLine( \"cf1\", \"cf2\", hexCross );\n\
\taddLine( \"cf3\", \"cf4\", hexCross );\n\
\n\
\tthis.camera = camera;\n\
\n\
\tfunction addLine( a, b, hex ) {\n\
\n\
\t\taddPoint( a, hex );\n\
\t\taddPoint( b, hex );\n\
\n\
\t}\n\
\n\
\tfunction addPoint( id, hex ) {\n\
\n\
\t\tscope.geometry.vertices.push( new THREE.Vector3() );\n\
\t\tscope.geometry.colors.push( new THREE.Color( hex ) );\n\
\n\
\t\tif ( scope.pointMap[ id ] === undefined ) scope.pointMap[ id ] = [];\n\
\n\
\t\tscope.pointMap[ id ].push( scope.geometry.vertices.length - 1 );\n\
\n\
\t}\n\
\n\
\tthis.update( camera );\n\
\n\
};\n\
\n\
THREE.CameraHelper.prototype = Object.create( THREE.Line.prototype );\n\
\n\
THREE.CameraHelper.prototype.update = function () {\n\
\n\
\tvar scope = this;\n\
\n\
\tvar w = 1, h = 1;\n\
\n\
\t// we need just camera projection matrix\n\
\t// world matrix must be identity\n\
\n\
\tTHREE.CameraHelper.__c.projectionMatrix.copy( this.camera.projectionMatrix );\n\
\n\
\t// center / target\n\
\n\
\tsetPoint( \"c\", 0, 0, -1 );\n\
\tsetPoint( \"t\", 0, 0,  1 );\n\
\n\
\t// near\n\
\n\
\tsetPoint( \"n1\", -w, -h, -1 );\n\
\tsetPoint( \"n2\",  w, -h, -1 );\n\
\tsetPoint( \"n3\", -w,  h, -1 );\n\
\tsetPoint( \"n4\",  w,  h, -1 );\n\
\n\
\t// far\n\
\n\
\tsetPoint( \"f1\", -w, -h, 1 );\n\
\tsetPoint( \"f2\",  w, -h, 1 );\n\
\tsetPoint( \"f3\", -w,  h, 1 );\n\
\tsetPoint( \"f4\",  w,  h, 1 );\n\
\n\
\t// up\n\
\n\
\tsetPoint( \"u1\",  w * 0.7, h * 1.1, -1 );\n\
\tsetPoint( \"u2\", -w * 0.7, h * 1.1, -1 );\n\
\tsetPoint( \"u3\",        0, h * 2,   -1 );\n\
\n\
\t// cross\n\
\n\
\tsetPoint( \"cf1\", -w,  0, 1 );\n\
\tsetPoint( \"cf2\",  w,  0, 1 );\n\
\tsetPoint( \"cf3\",  0, -h, 1 );\n\
\tsetPoint( \"cf4\",  0,  h, 1 );\n\
\n\
\tsetPoint( \"cn1\", -w,  0, -1 );\n\
\tsetPoint( \"cn2\",  w,  0, -1 );\n\
\tsetPoint( \"cn3\",  0, -h, -1 );\n\
\tsetPoint( \"cn4\",  0,  h, -1 );\n\
\n\
\tfunction setPoint( point, x, y, z ) {\n\
\n\
\t\tTHREE.CameraHelper.__v.set( x, y, z );\n\
\t\tTHREE.CameraHelper.__projector.unprojectVector( THREE.CameraHelper.__v, THREE.CameraHelper.__c );\n\
\n\
\t\tvar points = scope.pointMap[ point ];\n\
\n\
\t\tif ( points !== undefined ) {\n\
\n\
\t\t\tfor ( var i = 0, il = points.length; i < il; i ++ ) {\n\
\n\
\t\t\t\tscope.geometry.vertices[ points[ i ] ].copy( THREE.CameraHelper.__v );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\tthis.geometry.verticesNeedUpdate = true;\n\
\n\
};\n\
\n\
THREE.CameraHelper.__projector = new THREE.Projector();\n\
THREE.CameraHelper.__v = new THREE.Vector3();\n\
THREE.CameraHelper.__c = new THREE.Camera();\n\
\n\
/*\n\
 *\t@author zz85 / http://twitter.com/blurspline / http://www.lab4games.net/zz85/blog\n\
 *\n\
 *\tSubdivision Geometry Modifier\n\
 *\t\tusing Catmull-Clark Subdivision Surfaces\n\
 *\t\tfor creating smooth geometry meshes\n\
 *\n\
 *\tNote: a modifier modifies vertices and faces of geometry,\n\
 *\t\tso use THREE.GeometryUtils.clone() if orignal geoemtry needs to be retained\n\
 *\n\
 *\tReadings:\n\
 *\t\thttp://en.wikipedia.org/wiki/Catmull%E2%80%93Clark_subdivision_surface\n\
 *\t\thttp://www.rorydriscoll.com/2008/08/01/catmull-clark-subdivision-the-basics/\n\
 *\t\thttp://xrt.wikidot.com/blog:31\n\
 *\t\t\"Subdivision Surfaces in Character Animation\"\n\
 *\n\
 *\tSupports:\n\
 *\t\tClosed and Open geometries.\n\
 *\n\
 *\tTODO:\n\
 *\t\tcrease vertex and \"semi-sharp\" features\n\
 *\t\tselective subdivision\n\
 */\n\
\n\
THREE.SubdivisionModifier = function( subdivisions ) {\n\
\t\n\
\tthis.subdivisions = (subdivisions === undefined ) ? 1 : subdivisions;\n\
\t\n\
\t// Settings\n\
\tthis.useOldVertexColors = false;\n\
\tthis.supportUVs = true;\n\
\tthis.debug = false;\n\
\t\n\
};\n\
\n\
// Applies the \"modify\" pattern\n\
THREE.SubdivisionModifier.prototype.modify = function ( geometry ) {\n\
\t\n\
\tvar repeats = this.subdivisions;\n\
\t\n\
\twhile ( repeats-- > 0 ) {\n\
\t\tthis.smooth( geometry );\n\
\t}\n\
\t\n\
};\n\
\n\
// Performs an iteration of Catmull-Clark Subdivision\n\
THREE.SubdivisionModifier.prototype.smooth = function ( oldGeometry ) {\n\
\t\n\
\t//debug( 'running smooth' );\n\
\t\n\
\t// New set of vertices, faces and uvs\n\
\tvar newVertices = [], newFaces = [], newUVs = [];\n\
\t\n\
\tfunction v( x, y, z ) {\n\
\t\tnewVertices.push( new THREE.Vector3( x, y, z ) );\n\
\t}\n\
\t\n\
\tvar scope = this;\n\
\n\
\tfunction debug() {\n\
\t\tif (scope.debug) console.log.apply(console, arguments);\n\
\t}\n\
\n\
\tfunction warn() {\n\
\t\tif (console)\n\
\t\tconsole.log.apply(console, arguments);\n\
\t}\n\
\n\
\tfunction f4( a, b, c, d, oldFace, orders, facei ) {\n\
\t\t\n\
\t\t// TODO move vertex selection over here!\n\
\t\t\n\
\t\tvar newFace = new THREE.Face4( a, b, c, d, null, oldFace.color, oldFace.materialIndex );\n\
\t\t\n\
\t\tif (scope.useOldVertexColors) {\n\
\t\t\t\n\
\t\t\tnewFace.vertexColors = [];\n\
\t\t\t\n\
\t\t\tvar color, tmpColor, order;\n\
\t\t\tfor (var i=0;i<4;i++) {\n\
\t\t\t\torder = orders[i];\n\
\t\t\t\t\n\
\t\t\t\tcolor = new THREE.Color(),\n\
\t\t\t\tcolor.setRGB(0,0,0);\n\
\t\t\t\t\n\
\t\t\t\tfor (var j=0, jl=0; j<order.length;j++) {\n\
\t\t\t\t\ttmpColor = oldFace.vertexColors[order[j]-1];\n\
\t\t\t\t\tcolor.r += tmpColor.r;\n\
\t\t\t\t\tcolor.g += tmpColor.g;\n\
\t\t\t\t\tcolor.b += tmpColor.b;\n\
\t\t\t\t}\n\
\t\t\t\t\n\
\t\t\t\tcolor.r /= order.length;\n\
\t\t\t\tcolor.g /= order.length;\n\
\t\t\t\tcolor.b /= order.length;\n\
\t\t\t\t\n\
\t\t\t\tnewFace.vertexColors[i] = color;\n\
\t\t\t\t\n\
\t\t\t}\n\
\t\t\t\n\
\t\t}\n\
\t\t\n\
\t\tnewFaces.push( newFace );\n\
\n\
\t\tif (scope.supportUVs) {\n\
\n\
\t\t\tvar aUv = [\n\
\t\t\t\tgetUV(a, ''),\n\
\t\t\t\tgetUV(b, facei),\n\
\t\t\t\tgetUV(c, facei),\n\
\t\t\t\tgetUV(d, facei)\n\
\t\t\t];\n\
\t\t\t\n\
\t\t\tif (!aUv[0]) debug('a :( ', a+':'+facei);\n\
\t\t\telse if (!aUv[1]) debug('b :( ', b+':'+facei);\n\
\t\t\telse if (!aUv[2]) debug('c :( ', c+':'+facei);\n\
\t\t\telse if (!aUv[3]) debug('d :( ', d+':'+facei);\n\
\t\t\telse\n\
\t\t\t\tnewUVs.push( aUv );\n\
\n\
\t\t}\n\
\t}\n\
\t\n\
\tfunction edge_hash( a, b ) {\n\
\n\
\t\treturn Math.min( a, b ) + \"_\" + Math.max( a, b );\n\
\n\
\t}\n\
\t\n\
\tfunction computeEdgeFaces( geometry ) {\n\
\n\
\t\tvar i, il, v1, v2, j, k,\n\
\t\t\tface, faceIndices, faceIndex,\n\
\t\t\tedge,\n\
\t\t\thash,\n\
\t\t\tedgeFaceMap = {};\n\
\n\
\t\tfunction mapEdgeHash( hash, i ) {\n\
\t\t\t\n\
\t\t\tif ( edgeFaceMap[ hash ] === undefined ) {\n\
\n\
\t\t\t\tedgeFaceMap[ hash ] = [];\n\
\t\t\t\t\n\
\t\t\t}\n\
\t\t\t\n\
\t\t\tedgeFaceMap[ hash ].push( i );\n\
\t\t}\n\
\n\
\n\
\t\t// construct vertex -> face map\n\
\n\
\t\tfor( i = 0, il = geometry.faces.length; i < il; i ++ ) {\n\
\n\
\t\t\tface = geometry.faces[ i ];\n\
\n\
\t\t\tif ( face instanceof THREE.Face3 ) {\n\
\n\
\t\t\t\thash = edge_hash( face.a, face.b );\n\
\t\t\t\tmapEdgeHash( hash, i );\n\
\n\
\t\t\t\thash = edge_hash( face.b, face.c );\n\
\t\t\t\tmapEdgeHash( hash, i );\n\
\n\
\t\t\t\thash = edge_hash( face.c, face.a );\n\
\t\t\t\tmapEdgeHash( hash, i );\n\
\n\
\t\t\t} else if ( face instanceof THREE.Face4 ) {\n\
\n\
\t\t\t\thash = edge_hash( face.a, face.b );\n\
\t\t\t\tmapEdgeHash( hash, i );\n\
\n\
\t\t\t\thash = edge_hash( face.b, face.c );\n\
\t\t\t\tmapEdgeHash( hash, i );\n\
\n\
\t\t\t\thash = edge_hash( face.c, face.d );\n\
\t\t\t\tmapEdgeHash( hash, i );\n\
\t\t\t\t\n\
\t\t\t\thash = edge_hash( face.d, face.a );\n\
\t\t\t\tmapEdgeHash( hash, i );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\t// extract faces\n\
\t\t\n\
\t\t// var edges = [];\n\
\t\t//\n\
\t\t// var numOfEdges = 0;\n\
\t\t// for (i in edgeFaceMap) {\n\
\t\t// \tnumOfEdges++;\n\
\t\t// \t\n\
\t\t// \tedge = edgeFaceMap[i];\n\
\t\t// \tedges.push(edge);\n\
\t\t// \t\n\
\t\t// }\n\
\t\t\n\
\t\t//debug('edgeFaceMap', edgeFaceMap, 'geometry.edges',geometry.edges, 'numOfEdges', numOfEdges);\n\
\n\
\t\treturn edgeFaceMap;\n\
\n\
\t}\n\
\t\n\
\tvar originalPoints = oldGeometry.vertices;\n\
\tvar originalFaces = oldGeometry.faces;\n\
\t\n\
\tvar newPoints = originalPoints.concat(); // Vertices\n\
\t\t\n\
\tvar facePoints = [], edgePoints = {};\n\
\t\n\
\tvar sharpEdges = {}, sharpVertices = [], sharpFaces = [];\n\
\t\n\
\tvar uvForVertices = {}; // Stored in {vertex}:{old face} format\n\
\n\
\tvar originalVerticesLength = originalPoints.length;\n\
\n\
\tfunction getUV(vertexNo, oldFaceNo) {\n\
\t\tvar j,jl;\n\
\n\
\t\tvar key = vertexNo+':'+oldFaceNo;\n\
\t\tvar theUV = uvForVertices[key];\n\
\n\
\t\tif (!theUV) {\n\
\t\t\tif (vertexNo>=originalVerticesLength && vertexNo < (originalVerticesLength + originalFaces.length)) {\n\
\t\t\t\tdebug('face pt');\n\
\t\t\t} else {\n\
\t\t\t\tdebug('edge pt');\n\
\t\t\t}\n\
\n\
\t\t\twarn('warning, UV not found for', key);\n\
\n\
\t\t\treturn null;\n\
\t\t}\n\
\n\
\t\treturn theUV;\n\
\n\
\t\t// Original faces -> Vertex Nos.\n\
\t\t// new Facepoint -> Vertex Nos.\n\
\t\t// edge Points\n\
\n\
\t}\n\
\n\
\tfunction addUV(vertexNo, oldFaceNo, value) {\n\
\n\
\t\tvar key = vertexNo+':'+oldFaceNo;\n\
\t\tif (!(key in uvForVertices)) {\n\
\t\t\tuvForVertices[key] = value;\n\
\t\t} else {\n\
\t\t\twarn('dup vertexNo', vertexNo, 'oldFaceNo', oldFaceNo, 'value', value, 'key', key, uvForVertices[key]);\n\
\t\t}\n\
\t}\n\
\t\n\
\t// Step 1\n\
\t//\tFor each face, add a face point\n\
\t//\tSet each face point to be the centroid of all original points for the respective face.\n\
\t// debug(oldGeometry);\n\
\tvar i, il, j, jl, face;\n\
\t\n\
\t// For Uvs\n\
\tvar uvs = oldGeometry.faceVertexUvs[0];\n\
\tvar abcd = 'abcd', vertice;\n\
\n\
\tdebug('originalFaces, uvs, originalVerticesLength', originalFaces.length, uvs.length, originalVerticesLength);\n\
\tif (scope.supportUVs)\n\
\tfor (i=0, il = uvs.length; i<il; i++ ) {\n\
\t\tfor (j=0,jl=uvs[i].length;j<jl;j++) {\n\
\t\t\tvertice = originalFaces[i][abcd.charAt(j)];\n\
\t\t\t\n\
\t\t\taddUV(vertice, i, uvs[i][j]);\n\
\t\t\t\n\
\t\t}\n\
\t}\n\
\n\
\tif (uvs.length == 0) scope.supportUVs = false;\n\
\n\
\t// Additional UVs check, if we index original\n\
\tvar uvCount = 0;\n\
\tfor (var u in uvForVertices) {\n\
\t\tuvCount++;\n\
\t}\n\
\tif (!uvCount) {\n\
\t\tscope.supportUVs = false;\n\
\t\tdebug('no uvs');\n\
\t}\n\
\n\
\tdebug('-- Original Faces + Vertices UVs completed', uvForVertices, 'vs', uvs.length);\n\
\t\t\t\n\
\tvar avgUv ;\n\
\tfor (i=0, il = originalFaces.length; i<il ;i++) {\n\
\t\tface = originalFaces[ i ];\n\
\t\tfacePoints.push( face.centroid );\n\
\t\tnewPoints.push( face.centroid );\n\
\t\t\n\
\t\t\n\
\t\tif (!scope.supportUVs) continue;\n\
\t\t\n\
\t\t// Prepare subdivided uv\n\
\t\t\n\
\t\tavgUv = new THREE.UV();\n\
\t\t\n\
\t\tif ( face instanceof THREE.Face3 ) {\n\
\t\t\tavgUv.u = getUV( face.a, i ).u + getUV( face.b, i ).u + getUV( face.c, i ).u;\n\
\t\t\tavgUv.v = getUV( face.a, i ).v + getUV( face.b, i ).v + getUV( face.c, i ).v;\n\
\t\t\tavgUv.u /= 3;\n\
\t\t\tavgUv.v /= 3;\n\
\t\t\t\n\
\t\t} else if ( face instanceof THREE.Face4 ) {\n\
\t\t\tavgUv.u = getUV( face.a, i ).u + getUV( face.b, i ).u + getUV( face.c, i ).u + getUV( face.d, i ).u;\n\
\t\t\tavgUv.v = getUV( face.a, i ).v + getUV( face.b, i ).v + getUV( face.c, i ).v + getUV( face.d, i ).v;\n\
\t\t\tavgUv.u /= 4;\n\
\t\t\tavgUv.v /= 4;\n\
\t\t}\n\
\n\
\t\taddUV(originalVerticesLength + i, '', avgUv);\n\
\n\
\t}\n\
\n\
\tdebug('-- added UVs for new Faces', uvForVertices);\n\
\n\
\t// Step 2\n\
\t//\tFor each edge, add an edge point.\n\
\t//\tSet each edge point to be the average of the two neighbouring face points and its two original endpoints.\n\
\t\n\
\tvar edgeFaceMap = computeEdgeFaces ( oldGeometry ); // Edge Hash -> Faces Index\n\
\tvar edge, faceIndexA, faceIndexB, avg;\n\
\t\n\
\t// debug('edgeFaceMap', edgeFaceMap);\n\
\n\
\tvar edgeCount = 0;\n\
\n\
\tvar edgeVertex, edgeVertexA, edgeVertexB;\n\
\t\n\
\t////\n\
\t\n\
\tvar vertexEdgeMap = {}; // Gives edges connecting from each vertex\n\
\tvar vertexFaceMap = {}; // Gives faces connecting from each vertex\n\
\t\n\
\tfunction addVertexEdgeMap(vertex, edge) {\n\
\t\tif (vertexEdgeMap[vertex]===undefined) {\n\
\t\t\tvertexEdgeMap[vertex] = [];\n\
\t\t}\n\
\t\t\n\
\t\tvertexEdgeMap[vertex].push(edge);\n\
\t}\n\
\t\n\
\tfunction addVertexFaceMap(vertex, face, edge) {\n\
\t\tif (vertexFaceMap[vertex]===undefined) {\n\
\t\t\tvertexFaceMap[vertex] = {};\n\
\t\t}\n\
\t\t\n\
\t\tvertexFaceMap[vertex][face] = edge;\n\
\t\t// vertexFaceMap[vertex][face] = null;\n\
\t}\n\
\t\n\
\t// Prepares vertexEdgeMap and vertexFaceMap\n\
\tfor (i in edgeFaceMap) { // This is for every edge\n\
\t\tedge = edgeFaceMap[i];\n\
\t\t\n\
\t\tedgeVertex = i.split('_');\n\
\t\tedgeVertexA = edgeVertex[0];\n\
\t\tedgeVertexB = edgeVertex[1];\n\
\t\t\n\
\t\t// Maps an edgeVertex to connecting edges\n\
\t\taddVertexEdgeMap(edgeVertexA, [edgeVertexA, edgeVertexB] );\n\
\t\taddVertexEdgeMap(edgeVertexB, [edgeVertexA, edgeVertexB] );\n\
\t\t\n\
\t\t\n\
\t\tfor (j=0,jl=edge.length;j<jl;j++) {\n\
\t\t\tface = edge[j];\n\
\t\t\t\n\
\t\t\taddVertexFaceMap(edgeVertexA, face, i);\n\
\t\t\taddVertexFaceMap(edgeVertexB, face, i);\n\
\t\t}\n\
\t\t\n\
\t\tif (edge.length < 2) {\n\
\t\t\t// edge is \"sharp\";\n\
\t\t\tsharpEdges[i] = true;\n\
\t\t\tsharpVertices[edgeVertexA] = true;\n\
\t\t\tsharpVertices[edgeVertexB] = true;\n\
\t\t\t\n\
\t\t}\n\
\t\t\n\
\t}\n\
\t\n\
\tdebug('vertexEdgeMap',vertexEdgeMap, 'vertexFaceMap', vertexFaceMap);\n\
\t\n\
\t\n\
\tfor (i in edgeFaceMap) {\n\
\t\tedge = edgeFaceMap[i];\n\
\t\t\n\
\t\tfaceIndexA = edge[0]; // face index a\n\
\t\tfaceIndexB = edge[1]; // face index b\n\
\t\t\n\
\t\tedgeVertex = i.split('_');\n\
\t\tedgeVertexA = edgeVertex[0];\n\
\t\tedgeVertexB = edgeVertex[1];\n\
\t\t\n\
\t\t\n\
\t\tavg = new THREE.Vector3();\n\
\t\t\n\
\t\t//debug(i, faceIndexB,facePoints[faceIndexB]);\n\
\t\t\n\
\t\tif (sharpEdges[i]) {\n\
\t\t\t//debug('warning, ', i, 'edge has only 1 connecting face', edge);\n\
\t\t\t\n\
\t\t\t// For a sharp edge, average the edge end points.\n\
\t\t\tavg.addSelf(originalPoints[edgeVertexA]);\n\
\t\t\tavg.addSelf(originalPoints[edgeVertexB]);\n\
\t\t\t\n\
\t\t\tavg.multiplyScalar(0.5);\n\
\t\t\t\n\
\t\t\tsharpVertices[newPoints.length] = true;\n\
\t\t\t\n\
\t\t} else {\n\
\t\t\n\
\t\t\tavg.addSelf(facePoints[faceIndexA]);\n\
\t\t\tavg.addSelf(facePoints[faceIndexB]);\n\
\t\t\n\
\t\t\tavg.addSelf(originalPoints[edgeVertexA]);\n\
\t\t\tavg.addSelf(originalPoints[edgeVertexB]);\n\
\t\t\n\
\t\t\tavg.multiplyScalar(0.25);\n\
\t\t\n\
\t\t}\n\
\t\t\n\
\t\tedgePoints[i] = originalVerticesLength + originalFaces.length + edgeCount;\n\
\t\t\n\
\t\tnewPoints.push( avg );\n\
\t\n\
\t\tedgeCount ++;\n\
\t\t\n\
\t\tif (!scope.supportUVs) {\n\
\t\t\tcontinue;\n\
\t\t}\n\
\n\
\t\t// debug('faceIndexAB', faceIndexA, faceIndexB, sharpEdges[i]);\n\
\n\
\t\t// Prepare subdivided uv\n\
\t\t\n\
\t\tavgUv = new THREE.UV();\n\
\t\t\n\
\t\tavgUv.u = getUV(edgeVertexA, faceIndexA).u + getUV(edgeVertexB, faceIndexA).u;\n\
\t\tavgUv.v = getUV(edgeVertexA, faceIndexA).v + getUV(edgeVertexB, faceIndexA).v;\n\
\t\tavgUv.u /= 2;\n\
\t\tavgUv.v /= 2;\n\
\n\
\t\taddUV(edgePoints[i], faceIndexA, avgUv);\n\
\n\
\t\tif (!sharpEdges[i]) {\n\
\t\tavgUv = new THREE.UV();\n\
\t\t\n\
\t\tavgUv.u = getUV(edgeVertexA, faceIndexB).u + getUV(edgeVertexB, faceIndexB).u;\n\
\t\tavgUv.v = getUV(edgeVertexA, faceIndexB).v + getUV(edgeVertexB, faceIndexB).v;\n\
\t\tavgUv.u /= 2;\n\
\t\tavgUv.v /= 2;\n\
\t\t\n\
\t\taddUV(edgePoints[i], faceIndexB, avgUv);\n\
\t\t}\n\
\t\t\n\
\t}\n\
\n\
\tdebug('-- Step 2 done');\n\
\n\
\t// Step 3\n\
\t//\tFor each face point, add an edge for every edge of the face,\n\
\t//\tconnecting the face point to each edge point for the face.\n\
\t\n\
\t\n\
\tvar facePt, currentVerticeIndex;\n\
\t\n\
\tvar hashAB, hashBC, hashCD, hashDA, hashCA;\n\
\t\n\
\tvar abc123 = ['123', '12', '2', '23'];\n\
\tvar bca123 = ['123', '23', '3', '31'];\n\
\tvar cab123 = ['123', '31', '1', '12'];\n\
\tvar abc1234 = ['1234', '12', '2', '23'];\n\
\tvar bcd1234 = ['1234', '23', '3', '34'];\n\
\tvar cda1234 = ['1234', '34', '4', '41'];\n\
\tvar dab1234 = ['1234', '41', '1', '12'];\n\
\t\n\
\t\n\
\tfor (i=0, il = facePoints.length; i<il ;i++) { // for every face\n\
\t\tfacePt = facePoints[i];\n\
\t\tface = originalFaces[i];\n\
\t\tcurrentVerticeIndex = originalVerticesLength+ i;\n\
\t\t\n\
\t\tif ( face instanceof THREE.Face3 ) {\n\
\t\t\t\n\
\t\t\t// create 3 face4s\n\
\t\t\t\n\
\t\t\thashAB = edge_hash( face.a, face.b );\n\
\t\t\thashBC = edge_hash( face.b, face.c );\n\
\t\t\thashCA = edge_hash( face.c, face.a );\n\
\t\t\t\n\
\t\t\tf4( currentVerticeIndex, edgePoints[hashAB], face.b, edgePoints[hashBC], face, abc123, i );\n\
\t\t\tf4( currentVerticeIndex, edgePoints[hashBC], face.c, edgePoints[hashCA], face, bca123, i );\n\
\t\t\tf4( currentVerticeIndex, edgePoints[hashCA], face.a, edgePoints[hashAB], face, cab123, i );\n\
\t\t\t\n\
\t\t} else if ( face instanceof THREE.Face4 ) {\n\
\t\t\t// create 4 face4s\n\
\t\t\t\n\
\t\t\thashAB = edge_hash( face.a, face.b );\n\
\t\t\thashBC = edge_hash( face.b, face.c );\n\
\t\t\thashCD = edge_hash( face.c, face.d );\n\
\t\t\thashDA = edge_hash( face.d, face.a );\n\
\t\t\t\n\
\t\t\tf4( currentVerticeIndex, edgePoints[hashAB], face.b, edgePoints[hashBC], face, abc1234, i );\n\
\t\t\tf4( currentVerticeIndex, edgePoints[hashBC], face.c, edgePoints[hashCD], face, bcd1234, i );\n\
\t\t\tf4( currentVerticeIndex, edgePoints[hashCD], face.d, edgePoints[hashDA], face, cda1234, i );\n\
\t\t\tf4( currentVerticeIndex, edgePoints[hashDA], face.a, edgePoints[hashAB], face, dab1234, i );\n\
\n\
\t\t\t\t\n\
\t\t} else {\n\
\t\t\tdebug('face should be a face!', face);\n\
\t\t}\n\
\t}\n\
\t\n\
\tnewVertices = newPoints;\n\
\t\n\
\t// debug('original ', oldGeometry.vertices.length, oldGeometry.faces.length );\n\
\t// debug('new points', newPoints.length, 'faces', newFaces.length );\n\
\t\n\
\t// Step 4\n\
\t\n\
\t//\tFor each original point P,\n\
\t//\t\ttake the average F of all n face points for faces touching P,\n\
\t//\t\tand take the average R of all n edge midpoints for edges touching P,\n\
\t//\t\twhere each edge midpoint is the average of its two endpoint vertices.\n\
\t//\tMove each original point to the point\n\
\n\
\t\n\
\tvar F = new THREE.Vector3();\n\
\tvar R = new THREE.Vector3();\n\
\n\
\tvar n;\n\
\tfor (i=0, il = originalPoints.length; i<il; i++) {\n\
\t\t// (F + 2R + (n-3)P) / n\n\
\t\t\n\
\t\tif (vertexEdgeMap[i]===undefined) continue;\n\
\t\t\n\
\t\tF.set(0,0,0);\n\
\t\tR.set(0,0,0);\n\
\t\tvar newPos =  new THREE.Vector3(0,0,0);\n\
\t\t\n\
\t\tvar f =0;\n\
\t\tfor (j in vertexFaceMap[i]) {\n\
\t\t\tF.addSelf(facePoints[j]);\n\
\t\t\tf++;\n\
\t\t}\n\
\t\t\n\
\t\tvar sharpEdgeCount = 0;\n\
\t\t\n\
\t\tn = vertexEdgeMap[i].length;\n\
\t\t\n\
\t\tfor (j=0;j<n;j++) {\n\
\t\t\tif (\n\
\t\t\t\tsharpEdges[\n\
\t\t\t\t\tedge_hash(vertexEdgeMap[i][j][0],vertexEdgeMap[i][j][1])\n\
\t\t\t\t]) {\n\
\t\t\t\t\tsharpEdgeCount++;\n\
\t\t\t\t}\n\
\t\t}\n\
\t\t\n\
\t\tif ( sharpEdgeCount==2 ) {\n\
\t\t\tcontinue;\n\
\t\t\t// Do not move vertex if there's 2 connecting sharp edges.\n\
\t\t}\n\
\n\
\t\t/*\n\
\t\tif (sharpEdgeCount>2) {\n\
\t\t\t// TODO\n\
\t\t}\n\
\t\t*/\n\
\t\t\n\
\t\tF.divideScalar(f);\n\
\t\t\n\
\t\t\n\
\t\t\n\
\t\tfor (j=0; j<n;j++) {\n\
\t\t\tedge = vertexEdgeMap[i][j];\n\
\t\t\tvar midPt = originalPoints[edge[0]].clone().addSelf(originalPoints[edge[1]]).divideScalar(2);\n\
\t\t\tR.addSelf(midPt);\n\
\t\t\t// R.addSelf(originalPoints[edge[0]]);\n\
\t\t\t// R.addSelf(originalPoints[edge[1]]);\n\
\t\t}\n\
\t\t\n\
\t\tR.divideScalar(n);\n\
\t\t\n\
\t\tnewPos.addSelf(originalPoints[i]);\n\
\t\tnewPos.multiplyScalar(n - 3);\n\
\t\t\n\
\t\tnewPos.addSelf(F);\n\
\t\tnewPos.addSelf(R.multiplyScalar(2));\n\
\t\tnewPos.divideScalar(n);\n\
\t\t\n\
\t\tnewVertices[i] = newPos;\n\
\t\t\n\
\t\t\n\
\t}\n\
\t\n\
\tvar newGeometry = oldGeometry; // Let's pretend the old geometry is now new :P\n\
\t\n\
\tnewGeometry.vertices = newVertices;\n\
\tnewGeometry.faces = newFaces;\n\
\tnewGeometry.faceVertexUvs[ 0 ] = newUVs;\n\
\t\n\
\tdelete newGeometry.__tmpVertices; // makes __tmpVertices undefined :P\n\
\t\n\
\tnewGeometry.computeCentroids();\n\
\tnewGeometry.computeFaceNormals();\n\
\tnewGeometry.computeVertexNormals();\n\
\t\n\
};\n\
/**\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.ImmediateRenderObject = function ( ) {\n\
\n\
\tTHREE.Object3D.call( this );\n\
\n\
\tthis.render = function ( renderCallback ) { };\n\
\n\
};\n\
\n\
THREE.ImmediateRenderObject.prototype = Object.create( THREE.Object3D.prototype );\n\
/**\n\
 * @author mikael emtinger / http://gomo.se/\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.LensFlare = function ( texture, size, distance, blending, color ) {\n\
\n\
\tTHREE.Object3D.call( this );\n\
\n\
\tthis.lensFlares = [];\n\
\n\
\tthis.positionScreen = new THREE.Vector3();\n\
\tthis.customUpdateCallback = undefined;\n\
\n\
\tif( texture !== undefined ) {\n\
\n\
\t\tthis.add( texture, size, distance, blending, color );\n\
\n\
\t}\n\
\n\
};\n\
\n\
THREE.LensFlare.prototype = Object.create( THREE.Object3D.prototype );\n\
\n\
\n\
/*\n\
 * Add: adds another flare\n\
 */\n\
\n\
THREE.LensFlare.prototype.add = function ( texture, size, distance, blending, color, opacity ) {\n\
\n\
\tif( size === undefined ) size = -1;\n\
\tif( distance === undefined ) distance = 0;\n\
\tif( opacity === undefined ) opacity = 1;\n\
\tif( color === undefined ) color = new THREE.Color( 0xffffff );\n\
\tif( blending === undefined ) blending = THREE.NormalBlending;\n\
\n\
\tdistance = Math.min( distance, Math.max( 0, distance ) );\n\
\n\
\tthis.lensFlares.push( { texture: texture, \t\t\t// THREE.Texture\n\
\t\t                    size: size, \t\t\t\t// size in pixels (-1 = use texture.width)\n\
\t\t                    distance: distance, \t\t// distance (0-1) from light source (0=at light source)\n\
\t\t                    x: 0, y: 0, z: 0,\t\t\t// screen position (-1 => 1) z = 0 is ontop z = 1 is back\n\
\t\t                    scale: 1, \t\t\t\t\t// scale\n\
\t\t                    rotation: 1, \t\t\t\t// rotation\n\
\t\t                    opacity: opacity,\t\t\t// opacity\n\
\t\t\t\t\t\t\tcolor: color,\t\t\t\t// color\n\
\t\t                    blending: blending } );\t\t// blending\n\
\n\
};\n\
\n\
\n\
/*\n\
 * Update lens flares update positions on all flares based on the screen position\n\
 * Set myLensFlare.customUpdateCallback to alter the flares in your project specific way.\n\
 */\n\
\n\
THREE.LensFlare.prototype.updateLensFlares = function () {\n\
\n\
\tvar f, fl = this.lensFlares.length;\n\
\tvar flare;\n\
\tvar vecX = -this.positionScreen.x * 2;\n\
\tvar vecY = -this.positionScreen.y * 2;\n\
\n\
\tfor( f = 0; f < fl; f ++ ) {\n\
\n\
\t\tflare = this.lensFlares[ f ];\n\
\n\
\t\tflare.x = this.positionScreen.x + vecX * flare.distance;\n\
\t\tflare.y = this.positionScreen.y + vecY * flare.distance;\n\
\n\
\t\tflare.wantedRotation = flare.x * Math.PI * 0.25;\n\
\t\tflare.rotation += ( flare.wantedRotation - flare.rotation ) * 0.25;\n\
\n\
\t}\n\
\n\
};\n\
\n\
\n\
\n\
\n\
\n\
\n\
\n\
\n\
\n\
\n\
\n\
\n\
/**\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.MorphBlendMesh = function( geometry, material ) {\n\
\n\
\tTHREE.Mesh.call( this, geometry, material );\n\
\n\
\tthis.animationsMap = {};\n\
\tthis.animationsList = [];\n\
\n\
\t// prepare default animation\n\
\t// (all frames played together in 1 second)\n\
\n\
\tvar numFrames = this.geometry.morphTargets.length;\n\
\n\
\tvar name = \"__default\";\n\
\n\
\tvar startFrame = 0;\n\
\tvar endFrame = numFrames - 1;\n\
\n\
\tvar fps = numFrames / 1;\n\
\n\
\tthis.createAnimation( name, startFrame, endFrame, fps );\n\
\tthis.setAnimationWeight( name, 1 );\n\
\n\
};\n\
\n\
THREE.MorphBlendMesh.prototype = Object.create( THREE.Mesh.prototype );\n\
\n\
THREE.MorphBlendMesh.prototype.createAnimation = function ( name, start, end, fps ) {\n\
\n\
\tvar animation = {\n\
\n\
\t\tstartFrame: start,\n\
\t\tendFrame: end,\n\
\n\
\t\tlength: end - start + 1,\n\
\n\
\t\tfps: fps,\n\
\t\tduration: ( end - start ) / fps,\n\
\n\
\t\tlastFrame: 0,\n\
\t\tcurrentFrame: 0,\n\
\n\
\t\tactive: false,\n\
\n\
\t\ttime: 0,\n\
\t\tdirection: 1,\n\
\t\tweight: 1,\n\
\n\
\t\tdirectionBackwards: false,\n\
\t\tmirroredLoop: false\n\
\n\
\t};\n\
\n\
\tthis.animationsMap[ name ] = animation;\n\
\tthis.animationsList.push( animation );\n\
\n\
};\n\
\n\
THREE.MorphBlendMesh.prototype.autoCreateAnimations = function ( fps ) {\n\
\n\
\tvar pattern = /([a-z]+)(\\d+)/;\n\
\n\
\tvar firstAnimation, frameRanges = {};\n\
\n\
\tvar geometry = this.geometry;\n\
\n\
\tfor ( var i = 0, il = geometry.morphTargets.length; i < il; i ++ ) {\n\
\n\
\t\tvar morph = geometry.morphTargets[ i ];\n\
\t\tvar chunks = morph.name.match( pattern );\n\
\n\
\t\tif ( chunks && chunks.length > 1 ) {\n\
\n\
\t\t\tvar name = chunks[ 1 ];\n\
\t\t\tvar num = chunks[ 2 ];\n\
\n\
\t\t\tif ( ! frameRanges[ name ] ) frameRanges[ name ] = { start: Infinity, end: -Infinity };\n\
\n\
\t\t\tvar range = frameRanges[ name ];\n\
\n\
\t\t\tif ( i < range.start ) range.start = i;\n\
\t\t\tif ( i > range.end ) range.end = i;\n\
\n\
\t\t\tif ( ! firstAnimation ) firstAnimation = name;\n\
\n\
\t\t}\n\
\n\
\t}\n\
\n\
\tfor ( var name in frameRanges ) {\n\
\n\
\t\tvar range = frameRanges[ name ];\n\
\t\tthis.createAnimation( name, range.start, range.end, fps );\n\
\n\
\t}\n\
\n\
\tthis.firstAnimation = firstAnimation;\n\
\n\
};\n\
\n\
THREE.MorphBlendMesh.prototype.setAnimationDirectionForward = function ( name ) {\n\
\n\
\tvar animation = this.animationsMap[ name ];\n\
\n\
\tif ( animation ) {\n\
\n\
\t\tanimation.direction = 1;\n\
\t\tanimation.directionBackwards = false;\n\
\n\
\t}\n\
\n\
};\n\
\n\
THREE.MorphBlendMesh.prototype.setAnimationDirectionBackward = function ( name ) {\n\
\n\
\tvar animation = this.animationsMap[ name ];\n\
\n\
\tif ( animation ) {\n\
\n\
\t\tanimation.direction = -1;\n\
\t\tanimation.directionBackwards = true;\n\
\n\
\t}\n\
\n\
};\n\
\n\
THREE.MorphBlendMesh.prototype.setAnimationFPS = function ( name, fps ) {\n\
\n\
\tvar animation = this.animationsMap[ name ];\n\
\n\
\tif ( animation ) {\n\
\n\
\t\tanimation.fps = fps;\n\
\t\tanimation.duration = ( animation.end - animation.start ) / animation.fps;\n\
\n\
\t}\n\
\n\
};\n\
\n\
THREE.MorphBlendMesh.prototype.setAnimationDuration = function ( name, duration ) {\n\
\n\
\tvar animation = this.animationsMap[ name ];\n\
\n\
\tif ( animation ) {\n\
\n\
\t\tanimation.duration = duration;\n\
\t\tanimation.fps = ( animation.end - animation.start ) / animation.duration;\n\
\n\
\t}\n\
\n\
};\n\
\n\
THREE.MorphBlendMesh.prototype.setAnimationWeight = function ( name, weight ) {\n\
\n\
\tvar animation = this.animationsMap[ name ];\n\
\n\
\tif ( animation ) {\n\
\n\
\t\tanimation.weight = weight;\n\
\n\
\t}\n\
\n\
};\n\
\n\
THREE.MorphBlendMesh.prototype.setAnimationTime = function ( name, time ) {\n\
\n\
\tvar animation = this.animationsMap[ name ];\n\
\n\
\tif ( animation ) {\n\
\n\
\t\tanimation.time = time;\n\
\n\
\t}\n\
\n\
};\n\
\n\
THREE.MorphBlendMesh.prototype.getAnimationTime = function ( name ) {\n\
\n\
\tvar time = 0;\n\
\n\
\tvar animation = this.animationsMap[ name ];\n\
\n\
\tif ( animation ) {\n\
\n\
\t\ttime = animation.time;\n\
\n\
\t}\n\
\n\
\treturn time;\n\
\n\
};\n\
\n\
THREE.MorphBlendMesh.prototype.getAnimationDuration = function ( name ) {\n\
\n\
\tvar duration = -1;\n\
\n\
\tvar animation = this.animationsMap[ name ];\n\
\n\
\tif ( animation ) {\n\
\n\
\t\tduration = animation.duration;\n\
\n\
\t}\n\
\n\
\treturn duration;\n\
\n\
};\n\
\n\
THREE.MorphBlendMesh.prototype.playAnimation = function ( name ) {\n\
\n\
\tvar animation = this.animationsMap[ name ];\n\
\n\
\tif ( animation ) {\n\
\n\
\t\tanimation.time = 0;\n\
\t\tanimation.active = true;\n\
\n\
\t} else {\n\
\n\
\t\tconsole.warn( \"animation[\" + name + \"] undefined\" );\n\
\n\
\t}\n\
\n\
};\n\
\n\
THREE.MorphBlendMesh.prototype.stopAnimation = function ( name ) {\n\
\n\
\tvar animation = this.animationsMap[ name ];\n\
\n\
\tif ( animation ) {\n\
\n\
\t\tanimation.active = false;\n\
\n\
\t}\n\
\n\
};\n\
\n\
THREE.MorphBlendMesh.prototype.update = function ( delta ) {\n\
\n\
\tfor ( var i = 0, il = this.animationsList.length; i < il; i ++ ) {\n\
\n\
\t\tvar animation = this.animationsList[ i ];\n\
\n\
\t\tif ( ! animation.active ) continue;\n\
\n\
\t\tvar frameTime = animation.duration / animation.length;\n\
\n\
\t\tanimation.time += animation.direction * delta;\n\
\n\
\t\tif ( animation.mirroredLoop ) {\n\
\n\
\t\t\tif ( animation.time > animation.duration || animation.time < 0 ) {\n\
\n\
\t\t\t\tanimation.direction *= -1;\n\
\n\
\t\t\t\tif ( animation.time > animation.duration ) {\n\
\n\
\t\t\t\t\tanimation.time = animation.duration;\n\
\t\t\t\t\tanimation.directionBackwards = true;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tif ( animation.time < 0 ) {\n\
\n\
\t\t\t\t\tanimation.time = 0;\n\
\t\t\t\t\tanimation.directionBackwards = false;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t} else {\n\
\n\
\t\t\tanimation.time = animation.time % animation.duration;\n\
\n\
\t\t\tif ( animation.time < 0 ) animation.time += animation.duration;\n\
\n\
\t\t}\n\
\n\
\t\tvar keyframe = animation.startFrame + THREE.Math.clamp( Math.floor( animation.time / frameTime ), 0, animation.length - 1 );\n\
\t\tvar weight = animation.weight;\n\
\n\
\t\tif ( keyframe !== animation.currentFrame ) {\n\
\n\
\t\t\tthis.morphTargetInfluences[ animation.lastFrame ] = 0;\n\
\t\t\tthis.morphTargetInfluences[ animation.currentFrame ] = 1 * weight;\n\
\n\
\t\t\tthis.morphTargetInfluences[ keyframe ] = 0;\n\
\n\
\t\t\tanimation.lastFrame = animation.currentFrame;\n\
\t\t\tanimation.currentFrame = keyframe;\n\
\n\
\t\t}\n\
\n\
\t\tvar mix = ( animation.time % frameTime ) / frameTime;\n\
\n\
\t\tif ( animation.directionBackwards ) mix = 1 - mix;\n\
\n\
\t\tthis.morphTargetInfluences[ animation.currentFrame ] = mix * weight;\n\
\t\tthis.morphTargetInfluences[ animation.lastFrame ] = ( 1 - mix ) * weight;\n\
\n\
\t}\n\
\n\
};\n\
/**\n\
 * @author mikael emtinger / http://gomo.se/\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.LensFlarePlugin = function ( ) {\n\
\n\
\tvar _gl, _renderer, _lensFlare = {};\n\
\n\
\tthis.init = function ( renderer ) {\n\
\n\
\t\t_gl = renderer.context;\n\
\t\t_renderer = renderer;\n\
\n\
\t\t_lensFlare.vertices = new Float32Array( 8 + 8 );\n\
\t\t_lensFlare.faces = new Uint16Array( 6 );\n\
\n\
\t\tvar i = 0;\n\
\t\t_lensFlare.vertices[ i++ ] = -1; _lensFlare.vertices[ i++ ] = -1;\t// vertex\n\
\t\t_lensFlare.vertices[ i++ ] = 0;  _lensFlare.vertices[ i++ ] = 0;\t// uv... etc.\n\
\n\
\t\t_lensFlare.vertices[ i++ ] = 1;  _lensFlare.vertices[ i++ ] = -1;\n\
\t\t_lensFlare.vertices[ i++ ] = 1;  _lensFlare.vertices[ i++ ] = 0;\n\
\n\
\t\t_lensFlare.vertices[ i++ ] = 1;  _lensFlare.vertices[ i++ ] = 1;\n\
\t\t_lensFlare.vertices[ i++ ] = 1;  _lensFlare.vertices[ i++ ] = 1;\n\
\n\
\t\t_lensFlare.vertices[ i++ ] = -1; _lensFlare.vertices[ i++ ] = 1;\n\
\t\t_lensFlare.vertices[ i++ ] = 0;  _lensFlare.vertices[ i++ ] = 1;\n\
\n\
\t\ti = 0;\n\
\t\t_lensFlare.faces[ i++ ] = 0; _lensFlare.faces[ i++ ] = 1; _lensFlare.faces[ i++ ] = 2;\n\
\t\t_lensFlare.faces[ i++ ] = 0; _lensFlare.faces[ i++ ] = 2; _lensFlare.faces[ i++ ] = 3;\n\
\n\
\t\t// buffers\n\
\n\
\t\t_lensFlare.vertexBuffer     = _gl.createBuffer();\n\
\t\t_lensFlare.elementBuffer    = _gl.createBuffer();\n\
\n\
\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, _lensFlare.vertexBuffer );\n\
\t\t_gl.bufferData( _gl.ARRAY_BUFFER, _lensFlare.vertices, _gl.STATIC_DRAW );\n\
\n\
\t\t_gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, _lensFlare.elementBuffer );\n\
\t\t_gl.bufferData( _gl.ELEMENT_ARRAY_BUFFER, _lensFlare.faces, _gl.STATIC_DRAW );\n\
\n\
\t\t// textures\n\
\n\
\t\t_lensFlare.tempTexture      = _gl.createTexture();\n\
\t\t_lensFlare.occlusionTexture = _gl.createTexture();\n\
\n\
\t\t_gl.bindTexture( _gl.TEXTURE_2D, _lensFlare.tempTexture );\n\
\t\t_gl.texImage2D( _gl.TEXTURE_2D, 0, _gl.RGB, 16, 16, 0, _gl.RGB, _gl.UNSIGNED_BYTE, null );\n\
\t\t_gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE );\n\
\t\t_gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE );\n\
\t\t_gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_MAG_FILTER, _gl.NEAREST );\n\
\t\t_gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.NEAREST );\n\
\n\
\t\t_gl.bindTexture( _gl.TEXTURE_2D, _lensFlare.occlusionTexture );\n\
\t\t_gl.texImage2D( _gl.TEXTURE_2D, 0, _gl.RGBA, 16, 16, 0, _gl.RGBA, _gl.UNSIGNED_BYTE, null );\n\
\t\t_gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE );\n\
\t\t_gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE );\n\
\t\t_gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_MAG_FILTER, _gl.NEAREST );\n\
\t\t_gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.NEAREST );\n\
\n\
\t\tif ( _gl.getParameter( _gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS ) <= 0 ) {\n\
\n\
\t\t\t_lensFlare.hasVertexTexture = false;\n\
\t\t\t_lensFlare.program = createProgram( THREE.ShaderFlares[ \"lensFlare\" ] );\n\
\n\
\t\t} else {\n\
\n\
\t\t\t_lensFlare.hasVertexTexture = true;\n\
\t\t\t_lensFlare.program = createProgram( THREE.ShaderFlares[ \"lensFlareVertexTexture\" ] );\n\
\n\
\t\t}\n\
\n\
\t\t_lensFlare.attributes = {};\n\
\t\t_lensFlare.uniforms = {};\n\
\n\
\t\t_lensFlare.attributes.vertex       = _gl.getAttribLocation ( _lensFlare.program, \"position\" );\n\
\t\t_lensFlare.attributes.uv           = _gl.getAttribLocation ( _lensFlare.program, \"uv\" );\n\
\n\
\t\t_lensFlare.uniforms.renderType     = _gl.getUniformLocation( _lensFlare.program, \"renderType\" );\n\
\t\t_lensFlare.uniforms.map            = _gl.getUniformLocation( _lensFlare.program, \"map\" );\n\
\t\t_lensFlare.uniforms.occlusionMap   = _gl.getUniformLocation( _lensFlare.program, \"occlusionMap\" );\n\
\t\t_lensFlare.uniforms.opacity        = _gl.getUniformLocation( _lensFlare.program, \"opacity\" );\n\
\t\t_lensFlare.uniforms.color          = _gl.getUniformLocation( _lensFlare.program, \"color\" );\n\
\t\t_lensFlare.uniforms.scale          = _gl.getUniformLocation( _lensFlare.program, \"scale\" );\n\
\t\t_lensFlare.uniforms.rotation       = _gl.getUniformLocation( _lensFlare.program, \"rotation\" );\n\
\t\t_lensFlare.uniforms.screenPosition = _gl.getUniformLocation( _lensFlare.program, \"screenPosition\" );\n\
\n\
\t\t_lensFlare.attributesEnabled = false;\n\
\n\
\t};\n\
\n\
\n\
\t/*\n\
\t * Render lens flares\n\
\t * Method: renders 16x16 0xff00ff-colored points scattered over the light source area,\n\
\t *         reads these back and calculates occlusion.\n\
\t *         Then _lensFlare.update_lensFlares() is called to re-position and\n\
\t *         update transparency of flares. Then they are rendered.\n\
\t *\n\
\t */\n\
\n\
\tthis.render = function ( scene, camera, viewportWidth, viewportHeight ) {\n\
\n\
\t\tvar flares = scene.__webglFlares,\n\
\t\t\tnFlares = flares.length;\n\
\n\
\t\tif ( ! nFlares ) return;\n\
\n\
\t\tvar tempPosition = new THREE.Vector3();\n\
\n\
\t\tvar invAspect = viewportHeight / viewportWidth,\n\
\t\t\thalfViewportWidth = viewportWidth * 0.5,\n\
\t\t\thalfViewportHeight = viewportHeight * 0.5;\n\
\n\
\t\tvar size = 16 / viewportHeight,\n\
\t\t\tscale = new THREE.Vector2( size * invAspect, size );\n\
\n\
\t\tvar screenPosition = new THREE.Vector3( 1, 1, 0 ),\n\
\t\t\tscreenPositionPixels = new THREE.Vector2( 1, 1 );\n\
\n\
\t\tvar uniforms = _lensFlare.uniforms,\n\
\t\t\tattributes = _lensFlare.attributes;\n\
\n\
\t\t// set _lensFlare program and reset blending\n\
\n\
\t\t_gl.useProgram( _lensFlare.program );\n\
\n\
\t\tif ( ! _lensFlare.attributesEnabled ) {\n\
\n\
\t\t\t_gl.enableVertexAttribArray( _lensFlare.attributes.vertex );\n\
\t\t\t_gl.enableVertexAttribArray( _lensFlare.attributes.uv );\n\
\n\
\t\t\t_lensFlare.attributesEnabled = true;\n\
\n\
\t\t}\n\
\n\
\t\t// loop through all lens flares to update their occlusion and positions\n\
\t\t// setup gl and common used attribs/unforms\n\
\n\
\t\t_gl.uniform1i( uniforms.occlusionMap, 0 );\n\
\t\t_gl.uniform1i( uniforms.map, 1 );\n\
\n\
\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, _lensFlare.vertexBuffer );\n\
\t\t_gl.vertexAttribPointer( attributes.vertex, 2, _gl.FLOAT, false, 2 * 8, 0 );\n\
\t\t_gl.vertexAttribPointer( attributes.uv, 2, _gl.FLOAT, false, 2 * 8, 8 );\n\
\n\
\t\t_gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, _lensFlare.elementBuffer );\n\
\n\
\t\t_gl.disable( _gl.CULL_FACE );\n\
\t\t_gl.depthMask( false );\n\
\n\
\t\tvar i, j, jl, flare, sprite;\n\
\n\
\t\tfor ( i = 0; i < nFlares; i ++ ) {\n\
\n\
\t\t\tsize = 16 / viewportHeight;\n\
\t\t\tscale.set( size * invAspect, size );\n\
\n\
\t\t\t// calc object screen position\n\
\n\
\t\t\tflare = flares[ i ];\n\
\n\
\t\t\ttempPosition.set( flare.matrixWorld.elements[12], flare.matrixWorld.elements[13], flare.matrixWorld.elements[14] );\n\
\n\
\t\t\tcamera.matrixWorldInverse.multiplyVector3( tempPosition );\n\
\t\t\tcamera.projectionMatrix.multiplyVector3( tempPosition );\n\
\n\
\t\t\t// setup arrays for gl programs\n\
\n\
\t\t\tscreenPosition.copy( tempPosition )\n\
\n\
\t\t\tscreenPositionPixels.x = screenPosition.x * halfViewportWidth + halfViewportWidth;\n\
\t\t\tscreenPositionPixels.y = screenPosition.y * halfViewportHeight + halfViewportHeight;\n\
\n\
\t\t\t// screen cull\n\
\n\
\t\t\tif ( _lensFlare.hasVertexTexture || (\n\
\t\t\t\tscreenPositionPixels.x > 0 &&\n\
\t\t\t\tscreenPositionPixels.x < viewportWidth &&\n\
\t\t\t\tscreenPositionPixels.y > 0 &&\n\
\t\t\t\tscreenPositionPixels.y < viewportHeight ) ) {\n\
\n\
\t\t\t\t// save current RGB to temp texture\n\
\n\
\t\t\t\t_gl.activeTexture( _gl.TEXTURE1 );\n\
\t\t\t\t_gl.bindTexture( _gl.TEXTURE_2D, _lensFlare.tempTexture );\n\
\t\t\t\t_gl.copyTexImage2D( _gl.TEXTURE_2D, 0, _gl.RGB, screenPositionPixels.x - 8, screenPositionPixels.y - 8, 16, 16, 0 );\n\
\n\
\n\
\t\t\t\t// render pink quad\n\
\n\
\t\t\t\t_gl.uniform1i( uniforms.renderType, 0 );\n\
\t\t\t\t_gl.uniform2f( uniforms.scale, scale.x, scale.y );\n\
\t\t\t\t_gl.uniform3f( uniforms.screenPosition, screenPosition.x, screenPosition.y, screenPosition.z );\n\
\n\
\t\t\t\t_gl.disable( _gl.BLEND );\n\
\t\t\t\t_gl.enable( _gl.DEPTH_TEST );\n\
\n\
\t\t\t\t_gl.drawElements( _gl.TRIANGLES, 6, _gl.UNSIGNED_SHORT, 0 );\n\
\n\
\n\
\t\t\t\t// copy result to occlusionMap\n\
\n\
\t\t\t\t_gl.activeTexture( _gl.TEXTURE0 );\n\
\t\t\t\t_gl.bindTexture( _gl.TEXTURE_2D, _lensFlare.occlusionTexture );\n\
\t\t\t\t_gl.copyTexImage2D( _gl.TEXTURE_2D, 0, _gl.RGBA, screenPositionPixels.x - 8, screenPositionPixels.y - 8, 16, 16, 0 );\n\
\n\
\n\
\t\t\t\t// restore graphics\n\
\n\
\t\t\t\t_gl.uniform1i( uniforms.renderType, 1 );\n\
\t\t\t\t_gl.disable( _gl.DEPTH_TEST );\n\
\n\
\t\t\t\t_gl.activeTexture( _gl.TEXTURE1 );\n\
\t\t\t\t_gl.bindTexture( _gl.TEXTURE_2D, _lensFlare.tempTexture );\n\
\t\t\t\t_gl.drawElements( _gl.TRIANGLES, 6, _gl.UNSIGNED_SHORT, 0 );\n\
\n\
\n\
\t\t\t\t// update object positions\n\
\n\
\t\t\t\tflare.positionScreen.copy( screenPosition )\n\
\n\
\t\t\t\tif ( flare.customUpdateCallback ) {\n\
\n\
\t\t\t\t\tflare.customUpdateCallback( flare );\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\tflare.updateLensFlares();\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\t// render flares\n\
\n\
\t\t\t\t_gl.uniform1i( uniforms.renderType, 2 );\n\
\t\t\t\t_gl.enable( _gl.BLEND );\n\
\n\
\t\t\t\tfor ( j = 0, jl = flare.lensFlares.length; j < jl; j ++ ) {\n\
\n\
\t\t\t\t\tsprite = flare.lensFlares[ j ];\n\
\n\
\t\t\t\t\tif ( sprite.opacity > 0.001 && sprite.scale > 0.001 ) {\n\
\n\
\t\t\t\t\t\tscreenPosition.x = sprite.x;\n\
\t\t\t\t\t\tscreenPosition.y = sprite.y;\n\
\t\t\t\t\t\tscreenPosition.z = sprite.z;\n\
\n\
\t\t\t\t\t\tsize = sprite.size * sprite.scale / viewportHeight;\n\
\n\
\t\t\t\t\t\tscale.x = size * invAspect;\n\
\t\t\t\t\t\tscale.y = size;\n\
\n\
\t\t\t\t\t\t_gl.uniform3f( uniforms.screenPosition, screenPosition.x, screenPosition.y, screenPosition.z );\n\
\t\t\t\t\t\t_gl.uniform2f( uniforms.scale, scale.x, scale.y );\n\
\t\t\t\t\t\t_gl.uniform1f( uniforms.rotation, sprite.rotation );\n\
\n\
\t\t\t\t\t\t_gl.uniform1f( uniforms.opacity, sprite.opacity );\n\
\t\t\t\t\t\t_gl.uniform3f( uniforms.color, sprite.color.r, sprite.color.g, sprite.color.b );\n\
\n\
\t\t\t\t\t\t_renderer.setBlending( sprite.blending, sprite.blendEquation, sprite.blendSrc, sprite.blendDst );\n\
\t\t\t\t\t\t_renderer.setTexture( sprite.texture, 1 );\n\
\n\
\t\t\t\t\t\t_gl.drawElements( _gl.TRIANGLES, 6, _gl.UNSIGNED_SHORT, 0 );\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\t// restore gl\n\
\n\
\t\t_gl.enable( _gl.CULL_FACE );\n\
\t\t_gl.enable( _gl.DEPTH_TEST );\n\
\t\t_gl.depthMask( true );\n\
\n\
\t};\n\
\n\
\tfunction createProgram ( shader ) {\n\
\n\
\t\tvar program = _gl.createProgram();\n\
\n\
\t\tvar fragmentShader = _gl.createShader( _gl.FRAGMENT_SHADER );\n\
\t\tvar vertexShader = _gl.createShader( _gl.VERTEX_SHADER );\n\
\n\
\t\t_gl.shaderSource( fragmentShader, shader.fragmentShader );\n\
\t\t_gl.shaderSource( vertexShader, shader.vertexShader );\n\
\n\
\t\t_gl.compileShader( fragmentShader );\n\
\t\t_gl.compileShader( vertexShader );\n\
\n\
\t\t_gl.attachShader( program, fragmentShader );\n\
\t\t_gl.attachShader( program, vertexShader );\n\
\n\
\t\t_gl.linkProgram( program );\n\
\n\
\t\treturn program;\n\
\n\
\t};\n\
\n\
};/**\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.ShadowMapPlugin = function ( ) {\n\
\n\
\tvar _gl,\n\
\t_renderer,\n\
\t_depthMaterial, _depthMaterialMorph, _depthMaterialSkin, _depthMaterialMorphSkin,\n\
\n\
\t_frustum = new THREE.Frustum(),\n\
\t_projScreenMatrix = new THREE.Matrix4(),\n\
\n\
\t_min = new THREE.Vector3(),\n\
\t_max = new THREE.Vector3();\n\
\n\
\tthis.init = function ( renderer ) {\n\
\n\
\t\t_gl = renderer.context;\n\
\t\t_renderer = renderer;\n\
\n\
\t\tvar depthShader = THREE.ShaderLib[ \"depthRGBA\" ];\n\
\t\tvar depthUniforms = THREE.UniformsUtils.clone( depthShader.uniforms );\n\
\n\
\t\t_depthMaterial = new THREE.ShaderMaterial( { fragmentShader: depthShader.fragmentShader, vertexShader: depthShader.vertexShader, uniforms: depthUniforms } );\n\
\t\t_depthMaterialMorph = new THREE.ShaderMaterial( { fragmentShader: depthShader.fragmentShader, vertexShader: depthShader.vertexShader, uniforms: depthUniforms, morphTargets: true } );\n\
\t\t_depthMaterialSkin = new THREE.ShaderMaterial( { fragmentShader: depthShader.fragmentShader, vertexShader: depthShader.vertexShader, uniforms: depthUniforms, skinning: true } );\n\
\t\t_depthMaterialMorphSkin = new THREE.ShaderMaterial( { fragmentShader: depthShader.fragmentShader, vertexShader: depthShader.vertexShader, uniforms: depthUniforms, morphTargets: true, skinning: true } );\n\
\n\
\t\t_depthMaterial._shadowPass = true;\n\
\t\t_depthMaterialMorph._shadowPass = true;\n\
\t\t_depthMaterialSkin._shadowPass = true;\n\
\t\t_depthMaterialMorphSkin._shadowPass = true;\n\
\n\
\t};\n\
\n\
\tthis.render = function ( scene, camera ) {\n\
\n\
\t\tif ( ! ( _renderer.shadowMapEnabled && _renderer.shadowMapAutoUpdate ) ) return;\n\
\n\
\t\tthis.update( scene, camera );\n\
\n\
\t};\n\
\n\
\tthis.update = function ( scene, camera ) {\n\
\n\
\t\tvar i, il, j, jl, n,\n\
\n\
\t\tshadowMap, shadowMatrix, shadowCamera,\n\
\t\tprogram, buffer, material,\n\
\t\twebglObject, object, light,\n\
\t\trenderList,\n\
\n\
\t\tlights = [],\n\
\t\tk = 0,\n\
\n\
\t\tfog = null;\n\
\n\
\t\t// set GL state for depth map\n\
\n\
\t\t_gl.clearColor( 1, 1, 1, 1 );\n\
\t\t_gl.disable( _gl.BLEND );\n\
\n\
\t\t_gl.enable( _gl.CULL_FACE );\n\
\t\t_gl.frontFace( _gl.CCW );\n\
\n\
\t\tif ( _renderer.shadowMapCullFrontFaces ) {\n\
\n\
\t\t\t_gl.cullFace( _gl.FRONT );\n\
\n\
\t\t} else {\n\
\n\
\t\t\t_gl.cullFace( _gl.BACK );\n\
\n\
\t\t}\n\
\n\
\t\t_renderer.setDepthTest( true );\n\
\n\
\t\t// preprocess lights\n\
\t\t// \t- skip lights that are not casting shadows\n\
\t\t//\t- create virtual lights for cascaded shadow maps\n\
\n\
\t\tfor ( i = 0, il = scene.__lights.length; i < il; i ++ ) {\n\
\n\
\t\t\tlight = scene.__lights[ i ];\n\
\n\
\t\t\tif ( ! light.castShadow ) continue;\n\
\n\
\t\t\tif ( ( light instanceof THREE.DirectionalLight ) && light.shadowCascade ) {\n\
\n\
\t\t\t\tfor ( n = 0; n < light.shadowCascadeCount; n ++ ) {\n\
\n\
\t\t\t\t\tvar virtualLight;\n\
\n\
\t\t\t\t\tif ( ! light.shadowCascadeArray[ n ] ) {\n\
\n\
\t\t\t\t\t\tvirtualLight = createVirtualLight( light, n );\n\
\t\t\t\t\t\tvirtualLight.originalCamera = camera;\n\
\n\
\t\t\t\t\t\tvar gyro = new THREE.Gyroscope();\n\
\t\t\t\t\t\tgyro.position = light.shadowCascadeOffset;\n\
\n\
\t\t\t\t\t\tgyro.add( virtualLight );\n\
\t\t\t\t\t\tgyro.add( virtualLight.target );\n\
\n\
\t\t\t\t\t\tcamera.add( gyro );\n\
\n\
\t\t\t\t\t\tlight.shadowCascadeArray[ n ] = virtualLight;\n\
\n\
\t\t\t\t\t\tconsole.log( \"Created virtualLight\", virtualLight );\n\
\n\
\t\t\t\t\t} else {\n\
\n\
\t\t\t\t\t\tvirtualLight = light.shadowCascadeArray[ n ];\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\tupdateVirtualLight( light, n );\n\
\n\
\t\t\t\t\tlights[ k ] = virtualLight;\n\
\t\t\t\t\tk ++;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tlights[ k ] = light;\n\
\t\t\t\tk ++;\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\t// render depth map\n\
\n\
\t\tfor ( i = 0, il = lights.length; i < il; i ++ ) {\n\
\n\
\t\t\tlight = lights[ i ];\n\
\n\
\t\t\tif ( ! light.shadowMap ) {\n\
\n\
\t\t\t\tvar pars = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat };\n\
\n\
\t\t\t\tlight.shadowMap = new THREE.WebGLRenderTarget( light.shadowMapWidth, light.shadowMapHeight, pars );\n\
\t\t\t\tlight.shadowMapSize = new THREE.Vector2( light.shadowMapWidth, light.shadowMapHeight );\n\
\n\
\t\t\t\tlight.shadowMatrix = new THREE.Matrix4();\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( ! light.shadowCamera ) {\n\
\n\
\t\t\t\tif ( light instanceof THREE.SpotLight ) {\n\
\n\
\t\t\t\t\tlight.shadowCamera = new THREE.PerspectiveCamera( light.shadowCameraFov, light.shadowMapWidth / light.shadowMapHeight, light.shadowCameraNear, light.shadowCameraFar );\n\
\n\
\t\t\t\t} else if ( light instanceof THREE.DirectionalLight ) {\n\
\n\
\t\t\t\t\tlight.shadowCamera = new THREE.OrthographicCamera( light.shadowCameraLeft, light.shadowCameraRight, light.shadowCameraTop, light.shadowCameraBottom, light.shadowCameraNear, light.shadowCameraFar );\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\tconsole.error( \"Unsupported light type for shadow\" );\n\
\t\t\t\t\tcontinue;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tscene.add( light.shadowCamera );\n\
\n\
\t\t\t\tif ( _renderer.autoUpdateScene ) scene.updateMatrixWorld();\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( light.shadowCameraVisible && ! light.cameraHelper ) {\n\
\n\
\t\t\t\tlight.cameraHelper = new THREE.CameraHelper( light.shadowCamera );\n\
\t\t\t\tlight.shadowCamera.add( light.cameraHelper );\n\
\n\
\t\t\t}\n\
\n\
\t\t\tif ( light.isVirtual && virtualLight.originalCamera == camera ) {\n\
\n\
\t\t\t\tupdateShadowCamera( camera, light );\n\
\n\
\t\t\t}\n\
\n\
\t\t\tshadowMap = light.shadowMap;\n\
\t\t\tshadowMatrix = light.shadowMatrix;\n\
\t\t\tshadowCamera = light.shadowCamera;\n\
\n\
\t\t\tshadowCamera.position.copy( light.matrixWorld.getPosition() );\n\
\t\t\tshadowCamera.lookAt( light.target.matrixWorld.getPosition() );\n\
\t\t\tshadowCamera.updateMatrixWorld();\n\
\n\
\t\t\tshadowCamera.matrixWorldInverse.getInverse( shadowCamera.matrixWorld );\n\
\n\
\t\t\tif ( light.cameraHelper ) light.cameraHelper.visible = light.shadowCameraVisible;\n\
\t\t\tif ( light.shadowCameraVisible ) light.cameraHelper.update();\n\
\n\
\t\t\t// compute shadow matrix\n\
\n\
\t\t\tshadowMatrix.set( 0.5, 0.0, 0.0, 0.5,\n\
\t\t\t\t\t\t\t  0.0, 0.5, 0.0, 0.5,\n\
\t\t\t\t\t\t\t  0.0, 0.0, 0.5, 0.5,\n\
\t\t\t\t\t\t\t  0.0, 0.0, 0.0, 1.0 );\n\
\n\
\t\t\tshadowMatrix.multiplySelf( shadowCamera.projectionMatrix );\n\
\t\t\tshadowMatrix.multiplySelf( shadowCamera.matrixWorldInverse );\n\
\n\
\t\t\t// update camera matrices and frustum\n\
\n\
\t\t\tif ( ! shadowCamera._viewMatrixArray ) shadowCamera._viewMatrixArray = new Float32Array( 16 );\n\
\t\t\tif ( ! shadowCamera._projectionMatrixArray ) shadowCamera._projectionMatrixArray = new Float32Array( 16 );\n\
\n\
\t\t\tshadowCamera.matrixWorldInverse.flattenToArray( shadowCamera._viewMatrixArray );\n\
\t\t\tshadowCamera.projectionMatrix.flattenToArray( shadowCamera._projectionMatrixArray );\n\
\n\
\t\t\t_projScreenMatrix.multiply( shadowCamera.projectionMatrix, shadowCamera.matrixWorldInverse );\n\
\t\t\t_frustum.setFromMatrix( _projScreenMatrix );\n\
\n\
\t\t\t// render shadow map\n\
\n\
\t\t\t_renderer.setRenderTarget( shadowMap );\n\
\t\t\t_renderer.clear();\n\
\n\
\t\t\t// set object matrices & frustum culling\n\
\n\
\t\t\trenderList = scene.__webglObjects;\n\
\n\
\t\t\tfor ( j = 0, jl = renderList.length; j < jl; j ++ ) {\n\
\n\
\t\t\t\twebglObject = renderList[ j ];\n\
\t\t\t\tobject = webglObject.object;\n\
\n\
\t\t\t\twebglObject.render = false;\n\
\n\
\t\t\t\tif ( object.visible && object.castShadow ) {\n\
\n\
\t\t\t\t\tif ( ! ( object instanceof THREE.Mesh ) || ! ( object.frustumCulled ) || _frustum.contains( object ) ) {\n\
\n\
\t\t\t\t\t\tobject._modelViewMatrix.multiply( shadowCamera.matrixWorldInverse, object.matrixWorld );\n\
\n\
\t\t\t\t\t\twebglObject.render = true;\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t\t// render regular objects\n\
\n\
\t\t\tfor ( j = 0, jl = renderList.length; j < jl; j ++ ) {\n\
\n\
\t\t\t\twebglObject = renderList[ j ];\n\
\n\
\t\t\t\tif ( webglObject.render ) {\n\
\n\
\t\t\t\t\tobject = webglObject.object;\n\
\t\t\t\t\tbuffer = webglObject.buffer;\n\
\n\
\t\t\t\t\t// culling is overriden globally for all objects\n\
\t\t\t\t\t// while rendering depth map\n\
\n\
\t\t\t\t\tif ( object.customDepthMaterial ) {\n\
\n\
\t\t\t\t\t\tmaterial = object.customDepthMaterial;\n\
\n\
\t\t\t\t\t} else if ( object instanceof THREE.SkinnedMesh ) {\n\
\n\
\t\t\t\t\t\tmaterial = object.geometry.morphTargets.length ? _depthMaterialMorphSkin : _depthMaterialSkin;\n\
\n\
\t\t\t\t\t} else if ( object.geometry.morphTargets.length ) {\n\
\n\
\t\t\t\t\t\tmaterial = _depthMaterialMorph;\n\
\n\
\t\t\t\t\t} else {\n\
\n\
\t\t\t\t\t\tmaterial = _depthMaterial;\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\tif ( buffer instanceof THREE.BufferGeometry ) {\n\
\n\
\t\t\t\t\t\t_renderer.renderBufferDirect( shadowCamera, scene.__lights, fog, material, buffer, object );\n\
\n\
\t\t\t\t\t} else {\n\
\n\
\t\t\t\t\t\t_renderer.renderBuffer( shadowCamera, scene.__lights, fog, material, buffer, object );\n\
\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t\t// set matrices and render immediate objects\n\
\n\
\t\t\trenderList = scene.__webglObjectsImmediate;\n\
\n\
\t\t\tfor ( j = 0, jl = renderList.length; j < jl; j ++ ) {\n\
\n\
\t\t\t\twebglObject = renderList[ j ];\n\
\t\t\t\tobject = webglObject.object;\n\
\n\
\t\t\t\tif ( object.visible && object.castShadow ) {\n\
\n\
\t\t\t\t\tobject._modelViewMatrix.multiply( shadowCamera.matrixWorldInverse, object.matrixWorld );\n\
\n\
\t\t\t\t\t_renderer.renderImmediateObject( shadowCamera, scene.__lights, fog, _depthMaterial, object );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\t// restore GL state\n\
\n\
\t\tvar clearColor = _renderer.getClearColor(),\n\
\t\tclearAlpha = _renderer.getClearAlpha();\n\
\n\
\t\t_gl.clearColor( clearColor.r, clearColor.g, clearColor.b, clearAlpha );\n\
\t\t_gl.enable( _gl.BLEND );\n\
\n\
\t\tif ( _renderer.shadowMapCullFrontFaces ) {\n\
\n\
\t\t\t_gl.cullFace( _gl.BACK );\n\
\n\
\t\t}\n\
\n\
\t};\n\
\n\
\tfunction createVirtualLight( light, cascade ) {\n\
\n\
\t\tvar virtualLight = new THREE.DirectionalLight();\n\
\n\
\t\tvirtualLight.isVirtual = true;\n\
\n\
\t\tvirtualLight.onlyShadow = true;\n\
\t\tvirtualLight.castShadow = true;\n\
\n\
\t\tvirtualLight.shadowCameraNear = light.shadowCameraNear;\n\
\t\tvirtualLight.shadowCameraFar = light.shadowCameraFar;\n\
\n\
\t\tvirtualLight.shadowCameraLeft = light.shadowCameraLeft;\n\
\t\tvirtualLight.shadowCameraRight = light.shadowCameraRight;\n\
\t\tvirtualLight.shadowCameraBottom = light.shadowCameraBottom;\n\
\t\tvirtualLight.shadowCameraTop = light.shadowCameraTop;\n\
\n\
\t\tvirtualLight.shadowCameraVisible = light.shadowCameraVisible;\n\
\n\
\t\tvirtualLight.shadowDarkness = light.shadowDarkness;\n\
\n\
\t\tvirtualLight.shadowBias = light.shadowCascadeBias[ cascade ];\n\
\t\tvirtualLight.shadowMapWidth = light.shadowCascadeWidth[ cascade ];\n\
\t\tvirtualLight.shadowMapHeight = light.shadowCascadeHeight[ cascade ];\n\
\n\
\t\tvirtualLight.pointsWorld = [];\n\
\t\tvirtualLight.pointsFrustum = [];\n\
\n\
\t\tvar pointsWorld = virtualLight.pointsWorld,\n\
\t\t\tpointsFrustum = virtualLight.pointsFrustum;\n\
\n\
\t\tfor ( var i = 0; i < 8; i ++ ) {\n\
\n\
\t\t\tpointsWorld[ i ] = new THREE.Vector3();\n\
\t\t\tpointsFrustum[ i ] = new THREE.Vector3();\n\
\n\
\t\t}\n\
\n\
\t\tvar nearZ = light.shadowCascadeNearZ[ cascade ];\n\
\t\tvar farZ = light.shadowCascadeFarZ[ cascade ];\n\
\n\
\t\tpointsFrustum[ 0 ].set( -1, -1, nearZ );\n\
\t\tpointsFrustum[ 1 ].set(  1, -1, nearZ );\n\
\t\tpointsFrustum[ 2 ].set( -1,  1, nearZ );\n\
\t\tpointsFrustum[ 3 ].set(  1,  1, nearZ );\n\
\n\
\t\tpointsFrustum[ 4 ].set( -1, -1, farZ );\n\
\t\tpointsFrustum[ 5 ].set(  1, -1, farZ );\n\
\t\tpointsFrustum[ 6 ].set( -1,  1, farZ );\n\
\t\tpointsFrustum[ 7 ].set(  1,  1, farZ );\n\
\n\
\t\treturn virtualLight;\n\
\n\
\t}\n\
\n\
\t// Synchronize virtual light with the original light\n\
\n\
\tfunction updateVirtualLight( light, cascade ) {\n\
\n\
\t\tvar virtualLight = light.shadowCascadeArray[ cascade ];\n\
\n\
\t\tvirtualLight.position.copy( light.position );\n\
\t\tvirtualLight.target.position.copy( light.target.position );\n\
\t\tvirtualLight.lookAt( virtualLight.target );\n\
\n\
\t\tvirtualLight.shadowCameraVisible = light.shadowCameraVisible;\n\
\t\tvirtualLight.shadowDarkness = light.shadowDarkness;\n\
\n\
\t\tvirtualLight.shadowBias = light.shadowCascadeBias[ cascade ];\n\
\n\
\t\tvar nearZ = light.shadowCascadeNearZ[ cascade ];\n\
\t\tvar farZ = light.shadowCascadeFarZ[ cascade ];\n\
\n\
\t\tvar pointsFrustum = virtualLight.pointsFrustum;\n\
\n\
\t\tpointsFrustum[ 0 ].z = nearZ;\n\
\t\tpointsFrustum[ 1 ].z = nearZ;\n\
\t\tpointsFrustum[ 2 ].z = nearZ;\n\
\t\tpointsFrustum[ 3 ].z = nearZ;\n\
\n\
\t\tpointsFrustum[ 4 ].z = farZ;\n\
\t\tpointsFrustum[ 5 ].z = farZ;\n\
\t\tpointsFrustum[ 6 ].z = farZ;\n\
\t\tpointsFrustum[ 7 ].z = farZ;\n\
\n\
\t}\n\
\n\
\t// Fit shadow camera's ortho frustum to camera frustum\n\
\n\
\tfunction updateShadowCamera( camera, light ) {\n\
\n\
\t\tvar shadowCamera = light.shadowCamera,\n\
\t\t\tpointsFrustum = light.pointsFrustum,\n\
\t\t\tpointsWorld = light.pointsWorld;\n\
\n\
\t\t_min.set( Infinity, Infinity, Infinity );\n\
\t\t_max.set( -Infinity, -Infinity, -Infinity );\n\
\n\
\t\tfor ( var i = 0; i < 8; i ++ ) {\n\
\n\
\t\t\tvar p = pointsWorld[ i ];\n\
\n\
\t\t\tp.copy( pointsFrustum[ i ] );\n\
\t\t\tTHREE.ShadowMapPlugin.__projector.unprojectVector( p, camera );\n\
\n\
\t\t\tshadowCamera.matrixWorldInverse.multiplyVector3( p );\n\
\n\
\t\t\tif ( p.x < _min.x ) _min.x = p.x;\n\
\t\t\tif ( p.x > _max.x ) _max.x = p.x;\n\
\n\
\t\t\tif ( p.y < _min.y ) _min.y = p.y;\n\
\t\t\tif ( p.y > _max.y ) _max.y = p.y;\n\
\n\
\t\t\tif ( p.z < _min.z ) _min.z = p.z;\n\
\t\t\tif ( p.z > _max.z ) _max.z = p.z;\n\
\n\
\t\t}\n\
\n\
\t\tshadowCamera.left = _min.x;\n\
\t\tshadowCamera.right = _max.x;\n\
\t\tshadowCamera.top = _max.y;\n\
\t\tshadowCamera.bottom = _min.y;\n\
\n\
\t\t// can't really fit near/far\n\
\t\t//shadowCamera.near = _min.z;\n\
\t\t//shadowCamera.far = _max.z;\n\
\n\
\t\tshadowCamera.updateProjectionMatrix();\n\
\n\
\t}\n\
\n\
};\n\
\n\
THREE.ShadowMapPlugin.__projector = new THREE.Projector();\n\
/**\n\
 * @author mikael emtinger / http://gomo.se/\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.SpritePlugin = function ( ) {\n\
\n\
\tvar _gl, _renderer, _sprite = {};\n\
\n\
\tthis.init = function ( renderer ) {\n\
\n\
\t\t_gl = renderer.context;\n\
\t\t_renderer = renderer;\n\
\n\
\t\t_sprite.vertices = new Float32Array( 8 + 8 );\n\
\t\t_sprite.faces    = new Uint16Array( 6 );\n\
\n\
\t\tvar i = 0;\n\
\n\
\t\t_sprite.vertices[ i++ ] = -1; _sprite.vertices[ i++ ] = -1;\t// vertex 0\n\
\t\t_sprite.vertices[ i++ ] = 0;  _sprite.vertices[ i++ ] = 0;\t// uv 0\n\
\n\
\t\t_sprite.vertices[ i++ ] = 1;  _sprite.vertices[ i++ ] = -1;\t// vertex 1\n\
\t\t_sprite.vertices[ i++ ] = 1;  _sprite.vertices[ i++ ] = 0;\t// uv 1\n\
\n\
\t\t_sprite.vertices[ i++ ] = 1;  _sprite.vertices[ i++ ] = 1;\t// vertex 2\n\
\t\t_sprite.vertices[ i++ ] = 1;  _sprite.vertices[ i++ ] = 1;\t// uv 2\n\
\n\
\t\t_sprite.vertices[ i++ ] = -1; _sprite.vertices[ i++ ] = 1;\t// vertex 3\n\
\t\t_sprite.vertices[ i++ ] = 0;  _sprite.vertices[ i++ ] = 1;\t// uv 3\n\
\n\
\t\ti = 0;\n\
\n\
\t\t_sprite.faces[ i++ ] = 0; _sprite.faces[ i++ ] = 1; _sprite.faces[ i++ ] = 2;\n\
\t\t_sprite.faces[ i++ ] = 0; _sprite.faces[ i++ ] = 2; _sprite.faces[ i++ ] = 3;\n\
\n\
\t\t_sprite.vertexBuffer  = _gl.createBuffer();\n\
\t\t_sprite.elementBuffer = _gl.createBuffer();\n\
\n\
\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, _sprite.vertexBuffer );\n\
\t\t_gl.bufferData( _gl.ARRAY_BUFFER, _sprite.vertices, _gl.STATIC_DRAW );\n\
\n\
\t\t_gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, _sprite.elementBuffer );\n\
\t\t_gl.bufferData( _gl.ELEMENT_ARRAY_BUFFER, _sprite.faces, _gl.STATIC_DRAW );\n\
\n\
\t\t_sprite.program = createProgram( THREE.ShaderSprite[ \"sprite\" ] );\n\
\n\
\t\t_sprite.attributes = {};\n\
\t\t_sprite.uniforms = {};\n\
\n\
\t\t_sprite.attributes.position           = _gl.getAttribLocation ( _sprite.program, \"position\" );\n\
\t\t_sprite.attributes.uv                 = _gl.getAttribLocation ( _sprite.program, \"uv\" );\n\
\n\
\t\t_sprite.uniforms.uvOffset             = _gl.getUniformLocation( _sprite.program, \"uvOffset\" );\n\
\t\t_sprite.uniforms.uvScale              = _gl.getUniformLocation( _sprite.program, \"uvScale\" );\n\
\n\
\t\t_sprite.uniforms.rotation             = _gl.getUniformLocation( _sprite.program, \"rotation\" );\n\
\t\t_sprite.uniforms.scale                = _gl.getUniformLocation( _sprite.program, \"scale\" );\n\
\t\t_sprite.uniforms.alignment            = _gl.getUniformLocation( _sprite.program, \"alignment\" );\n\
\n\
\t\t_sprite.uniforms.color                = _gl.getUniformLocation( _sprite.program, \"color\" );\n\
\t\t_sprite.uniforms.map                  = _gl.getUniformLocation( _sprite.program, \"map\" );\n\
\t\t_sprite.uniforms.opacity              = _gl.getUniformLocation( _sprite.program, \"opacity\" );\n\
\n\
\t\t_sprite.uniforms.useScreenCoordinates = _gl.getUniformLocation( _sprite.program, \"useScreenCoordinates\" );\n\
\t\t_sprite.uniforms.affectedByDistance   = _gl.getUniformLocation( _sprite.program, \"affectedByDistance\" );\n\
\t\t_sprite.uniforms.screenPosition    \t  = _gl.getUniformLocation( _sprite.program, \"screenPosition\" );\n\
\t\t_sprite.uniforms.modelViewMatrix      = _gl.getUniformLocation( _sprite.program, \"modelViewMatrix\" );\n\
\t\t_sprite.uniforms.projectionMatrix     = _gl.getUniformLocation( _sprite.program, \"projectionMatrix\" );\n\
\n\
\t\t_sprite.attributesEnabled = false;\n\
\n\
\t};\n\
\n\
\tthis.render = function ( scene, camera, viewportWidth, viewportHeight ) {\n\
\n\
\t\tvar sprites = scene.__webglSprites,\n\
\t\t\tnSprites = sprites.length;\n\
\n\
\t\tif ( ! nSprites ) return;\n\
\n\
\t\tvar attributes = _sprite.attributes,\n\
\t\t\tuniforms = _sprite.uniforms;\n\
\n\
\t\tvar invAspect = viewportHeight / viewportWidth;\n\
\n\
\t\tvar halfViewportWidth = viewportWidth * 0.5,\n\
\t\t\thalfViewportHeight = viewportHeight * 0.5;\n\
\n\
\t\tvar mergeWith3D = true;\n\
\n\
\t\t// setup gl\n\
\n\
\t\t_gl.useProgram( _sprite.program );\n\
\n\
\t\tif ( ! _sprite.attributesEnabled ) {\n\
\n\
\t\t\t_gl.enableVertexAttribArray( attributes.position );\n\
\t\t\t_gl.enableVertexAttribArray( attributes.uv );\n\
\n\
\t\t\t_sprite.attributesEnabled = true;\n\
\n\
\t\t}\n\
\n\
\t\t_gl.disable( _gl.CULL_FACE );\n\
\t\t_gl.enable( _gl.BLEND );\n\
\t\t_gl.depthMask( true );\n\
\n\
\t\t_gl.bindBuffer( _gl.ARRAY_BUFFER, _sprite.vertexBuffer );\n\
\t\t_gl.vertexAttribPointer( attributes.position, 2, _gl.FLOAT, false, 2 * 8, 0 );\n\
\t\t_gl.vertexAttribPointer( attributes.uv, 2, _gl.FLOAT, false, 2 * 8, 8 );\n\
\n\
\t\t_gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, _sprite.elementBuffer );\n\
\n\
\t\t_gl.uniformMatrix4fv( uniforms.projectionMatrix, false, camera._projectionMatrixArray );\n\
\n\
\t\t_gl.activeTexture( _gl.TEXTURE0 );\n\
\t\t_gl.uniform1i( uniforms.map, 0 );\n\
\n\
\t\t// update positions and sort\n\
\n\
\t\tvar i, sprite, screenPosition, size, scale = [];\n\
\n\
\t\tfor( i = 0; i < nSprites; i ++ ) {\n\
\n\
\t\t\tsprite = sprites[ i ];\n\
\n\
\t\t\tif ( ! sprite.visible || sprite.opacity === 0 ) continue;\n\
\n\
\t\t\tif( ! sprite.useScreenCoordinates ) {\n\
\n\
\t\t\t\tsprite._modelViewMatrix.multiply( camera.matrixWorldInverse, sprite.matrixWorld );\n\
\t\t\t\tsprite.z = - sprite._modelViewMatrix.elements[14];\n\
\n\
\t\t\t} else {\n\
\n\
\t\t\t\tsprite.z = - sprite.position.z;\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\tsprites.sort( painterSort );\n\
\n\
\t\t// render all sprites\n\
\n\
\t\tfor( i = 0; i < nSprites; i ++ ) {\n\
\n\
\t\t\tsprite = sprites[ i ];\n\
\n\
\t\t\tif ( ! sprite.visible || sprite.opacity === 0 ) continue;\n\
\n\
\t\t\tif ( sprite.map && sprite.map.image && sprite.map.image.width ) {\n\
\n\
\t\t\t\tif ( sprite.useScreenCoordinates ) {\n\
\n\
\t\t\t\t\t_gl.uniform1i( uniforms.useScreenCoordinates, 1 );\n\
\t\t\t\t\t_gl.uniform3f( uniforms.screenPosition, ( sprite.position.x - halfViewportWidth  ) / halfViewportWidth,\n\
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t( halfViewportHeight - sprite.position.y ) / halfViewportHeight,\n\
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  Math.max( 0, Math.min( 1, sprite.position.z ) ) );\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\t_gl.uniform1i( uniforms.useScreenCoordinates, 0 );\n\
\t\t\t\t\t_gl.uniform1i( uniforms.affectedByDistance, sprite.affectedByDistance ? 1 : 0 );\n\
\t\t\t\t\t_gl.uniformMatrix4fv( uniforms.modelViewMatrix, false, sprite._modelViewMatrix.elements );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tsize = sprite.map.image.width / ( sprite.scaleByViewport ? viewportHeight : 1 );\n\
\n\
\t\t\t\tscale[ 0 ] = size * invAspect * sprite.scale.x;\n\
\t\t\t\tscale[ 1 ] = size * sprite.scale.y;\n\
\n\
\t\t\t\t_gl.uniform2f( uniforms.uvScale, sprite.uvScale.x, sprite.uvScale.y );\n\
\t\t\t\t_gl.uniform2f( uniforms.uvOffset, sprite.uvOffset.x, sprite.uvOffset.y );\n\
\t\t\t\t_gl.uniform2f( uniforms.alignment, sprite.alignment.x, sprite.alignment.y );\n\
\n\
\t\t\t\t_gl.uniform1f( uniforms.opacity, sprite.opacity );\n\
\t\t\t\t_gl.uniform3f( uniforms.color, sprite.color.r, sprite.color.g, sprite.color.b );\n\
\n\
\t\t\t\t_gl.uniform1f( uniforms.rotation, sprite.rotation );\n\
\t\t\t\t_gl.uniform2fv( uniforms.scale, scale );\n\
\n\
\t\t\t\tif ( sprite.mergeWith3D && !mergeWith3D ) {\n\
\n\
\t\t\t\t\t_gl.enable( _gl.DEPTH_TEST );\n\
\t\t\t\t\tmergeWith3D = true;\n\
\n\
\t\t\t\t} else if ( ! sprite.mergeWith3D && mergeWith3D ) {\n\
\n\
\t\t\t\t\t_gl.disable( _gl.DEPTH_TEST );\n\
\t\t\t\t\tmergeWith3D = false;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\t_renderer.setBlending( sprite.blending, sprite.blendEquation, sprite.blendSrc, sprite.blendDst );\n\
\t\t\t\t_renderer.setTexture( sprite.map, 0 );\n\
\n\
\t\t\t\t_gl.drawElements( _gl.TRIANGLES, 6, _gl.UNSIGNED_SHORT, 0 );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\t// restore gl\n\
\n\
\t\t_gl.enable( _gl.CULL_FACE );\n\
\t\t_gl.enable( _gl.DEPTH_TEST );\n\
\t\t_gl.depthMask( true );\n\
\n\
\t};\n\
\n\
\tfunction createProgram ( shader ) {\n\
\n\
\t\tvar program = _gl.createProgram();\n\
\n\
\t\tvar fragmentShader = _gl.createShader( _gl.FRAGMENT_SHADER );\n\
\t\tvar vertexShader = _gl.createShader( _gl.VERTEX_SHADER );\n\
\n\
\t\t_gl.shaderSource( fragmentShader, shader.fragmentShader );\n\
\t\t_gl.shaderSource( vertexShader, shader.vertexShader );\n\
\n\
\t\t_gl.compileShader( fragmentShader );\n\
\t\t_gl.compileShader( vertexShader );\n\
\n\
\t\t_gl.attachShader( program, fragmentShader );\n\
\t\t_gl.attachShader( program, vertexShader );\n\
\n\
\t\t_gl.linkProgram( program );\n\
\n\
\t\treturn program;\n\
\n\
\t};\n\
\n\
\tfunction painterSort ( a, b ) {\n\
\n\
\t\treturn b.z - a.z;\n\
\n\
\t};\n\
\n\
};/**\n\
 * @author alteredq / http://alteredqualia.com/\n\
 */\n\
\n\
THREE.DepthPassPlugin = function ( ) {\n\
\n\
\tthis.enabled = false;\n\
\tthis.renderTarget = null;\n\
\n\
\tvar _gl,\n\
\t_renderer,\n\
\t_depthMaterial, _depthMaterialMorph,\n\
\n\
\t_frustum = new THREE.Frustum(),\n\
\t_projScreenMatrix = new THREE.Matrix4();\n\
\n\
\tthis.init = function ( renderer ) {\n\
\n\
\t\t_gl = renderer.context;\n\
\t\t_renderer = renderer;\n\
\n\
\t\tvar depthShader = THREE.ShaderLib[ \"depthRGBA\" ];\n\
\t\tvar depthUniforms = THREE.UniformsUtils.clone( depthShader.uniforms );\n\
\n\
\t\t_depthMaterial = new THREE.ShaderMaterial( { fragmentShader: depthShader.fragmentShader, vertexShader: depthShader.vertexShader, uniforms: depthUniforms } );\n\
\t\t_depthMaterialMorph = new THREE.ShaderMaterial( { fragmentShader: depthShader.fragmentShader, vertexShader: depthShader.vertexShader, uniforms: depthUniforms, morphTargets: true } );\n\
\n\
\t\t_depthMaterial._shadowPass = true;\n\
\t\t_depthMaterialMorph._shadowPass = true;\n\
\n\
\t};\n\
\n\
\tthis.render = function ( scene, camera ) {\n\
\n\
\t\tif ( ! this.enabled ) return;\n\
\n\
\t\tthis.update( scene, camera );\n\
\n\
\t};\n\
\n\
\tthis.update = function ( scene, camera ) {\n\
\n\
\t\tvar i, il, j, jl, n,\n\
\n\
\t\tprogram, buffer, material,\n\
\t\twebglObject, object, light,\n\
\t\trenderList,\n\
\n\
\t\tfog = null;\n\
\n\
\t\t// set GL state for depth map\n\
\n\
\t\t_gl.clearColor( 1, 1, 1, 1 );\n\
\t\t_gl.disable( _gl.BLEND );\n\
\n\
\t\t_renderer.setDepthTest( true );\n\
\n\
\t\t// update scene\n\
\n\
\t\tif ( _renderer.autoUpdateScene ) scene.updateMatrixWorld();\n\
\n\
\t\t// update camera matrices and frustum\n\
\n\
\t\tif ( ! camera._viewMatrixArray ) camera._viewMatrixArray = new Float32Array( 16 );\n\
\t\tif ( ! camera._projectionMatrixArray ) camera._projectionMatrixArray = new Float32Array( 16 );\n\
\n\
\t\tcamera.matrixWorldInverse.getInverse( camera.matrixWorld );\n\
\n\
\t\tcamera.matrixWorldInverse.flattenToArray( camera._viewMatrixArray );\n\
\t\tcamera.projectionMatrix.flattenToArray( camera._projectionMatrixArray );\n\
\n\
\t\t_projScreenMatrix.multiply( camera.projectionMatrix, camera.matrixWorldInverse );\n\
\t\t_frustum.setFromMatrix( _projScreenMatrix );\n\
\n\
\t\t// render depth map\n\
\n\
\t\t_renderer.setRenderTarget( this.renderTarget );\n\
\t\t_renderer.clear();\n\
\n\
\t\t// set object matrices & frustum culling\n\
\n\
\t\trenderList = scene.__webglObjects;\n\
\n\
\t\tfor ( j = 0, jl = renderList.length; j < jl; j ++ ) {\n\
\n\
\t\t\twebglObject = renderList[ j ];\n\
\t\t\tobject = webglObject.object;\n\
\n\
\t\t\twebglObject.render = false;\n\
\n\
\t\t\tif ( object.visible ) {\n\
\n\
\t\t\t\tif ( ! ( object instanceof THREE.Mesh ) || ! ( object.frustumCulled ) || _frustum.contains( object ) ) {\n\
\n\
\t\t\t\t\t//object.matrixWorld.flattenToArray( object._modelMatrixArray );\n\
\t\t\t\t\tobject._modelViewMatrix.multiply( camera.matrixWorldInverse, object.matrixWorld);\n\
\n\
\t\t\t\t\twebglObject.render = true;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\t// render regular objects\n\
\n\
\t\tfor ( j = 0, jl = renderList.length; j < jl; j ++ ) {\n\
\n\
\t\t\twebglObject = renderList[ j ];\n\
\n\
\t\t\tif ( webglObject.render ) {\n\
\n\
\t\t\t\tobject = webglObject.object;\n\
\t\t\t\tbuffer = webglObject.buffer;\n\
\n\
\t\t\t\tif ( object.material ) _renderer.setMaterialFaces( object.material );\n\
\n\
\t\t\t\tif ( object.customDepthMaterial ) {\n\
\n\
\t\t\t\t\tmaterial = object.customDepthMaterial;\n\
\n\
\t\t\t\t} else if ( object.geometry.morphTargets.length ) {\n\
\n\
\t\t\t\t\tmaterial = _depthMaterialMorph;\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\tmaterial = _depthMaterial;\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t\tif ( buffer instanceof THREE.BufferGeometry ) {\n\
\n\
\t\t\t\t\t_renderer.renderBufferDirect( camera, scene.__lights, fog, material, buffer, object );\n\
\n\
\t\t\t\t} else {\n\
\n\
\t\t\t\t\t_renderer.renderBuffer( camera, scene.__lights, fog, material, buffer, object );\n\
\n\
\t\t\t\t}\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\t// set matrices and render immediate objects\n\
\n\
\t\trenderList = scene.__webglObjectsImmediate;\n\
\n\
\t\tfor ( j = 0, jl = renderList.length; j < jl; j ++ ) {\n\
\n\
\t\t\twebglObject = renderList[ j ];\n\
\t\t\tobject = webglObject.object;\n\
\n\
\t\t\tif ( object.visible && object.castShadow ) {\n\
\n\
\t\t\t\t/*\n\
\t\t\t\tif ( object.matrixAutoUpdate ) {\n\
\n\
\t\t\t\t\tobject.matrixWorld.flattenToArray( object._modelMatrixArray );\n\
\n\
\t\t\t\t}\n\
\t\t\t\t*/\n\
\n\
\t\t\t\tobject._modelViewMatrix.multiply( camera.matrixWorldInverse, object.matrixWorld);\n\
\n\
\t\t\t\t_renderer.renderImmediateObject( camera, scene.__lights, fog, _depthMaterial, object );\n\
\n\
\t\t\t}\n\
\n\
\t\t}\n\
\n\
\t\t// restore GL state\n\
\n\
\t\tvar clearColor = _renderer.getClearColor(),\n\
\t\tclearAlpha = _renderer.getClearAlpha();\n\
\n\
\t\t_gl.clearColor( clearColor.r, clearColor.g, clearColor.b, clearAlpha );\n\
\t\t_gl.enable( _gl.BLEND );\n\
\n\
\t};\n\
\n\
};\n\
\n\
/**\n\
 * @author mikael emtinger / http://gomo.se/\n\
 *\n\
 */\n\
\n\
THREE.ShaderFlares = {\n\
\n\
\t'lensFlareVertexTexture': {\n\
\n\
\t\tvertexShader: [\n\
\n\
\t\t\t\"uniform vec3 screenPosition;\",\n\
\t\t\t\"uniform vec2 scale;\",\n\
\t\t\t\"uniform float rotation;\",\n\
\t\t\t\"uniform int renderType;\",\n\
\n\
\t\t\t\"uniform sampler2D occlusionMap;\",\n\
\n\
\t\t\t\"attribute vec2 position;\",\n\
\t\t\t\"attribute vec2 uv;\",\n\
\n\
\t\t\t\"varying vec2 vUV;\",\n\
\t\t\t\"varying float vVisibility;\",\n\
\n\
\t\t\t\"void main() {\",\n\
\n\
\t\t\t\t\"vUV = uv;\",\n\
\n\
\t\t\t\t\"vec2 pos = position;\",\n\
\n\
\t\t\t\t\"if( renderType == 2 ) {\",\n\
\n\
\t\t\t\t\t\"vec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) ) +\",\n\
\t\t\t\t\t\t\t\t\t  \"texture2D( occlusionMap, vec2( 0.5, 0.1 ) ) +\",\n\
\t\t\t\t\t\t\t\t\t  \"texture2D( occlusionMap, vec2( 0.9, 0.1 ) ) +\",\n\
\t\t\t\t\t\t\t\t\t  \"texture2D( occlusionMap, vec2( 0.9, 0.5 ) ) +\",\n\
\t\t\t\t\t\t\t\t\t  \"texture2D( occlusionMap, vec2( 0.9, 0.9 ) ) +\",\n\
\t\t\t\t\t\t\t\t\t  \"texture2D( occlusionMap, vec2( 0.5, 0.9 ) ) +\",\n\
\t\t\t\t\t\t\t\t\t  \"texture2D( occlusionMap, vec2( 0.1, 0.9 ) ) +\",\n\
\t\t\t\t\t\t\t\t\t  \"texture2D( occlusionMap, vec2( 0.1, 0.5 ) ) +\",\n\
\t\t\t\t\t\t\t\t\t  \"texture2D( occlusionMap, vec2( 0.5, 0.5 ) );\",\n\
\n\
\t\t\t\t\t\"vVisibility = (       visibility.r / 9.0 ) *\",\n\
\t\t\t\t\t\t\t\t  \"( 1.0 - visibility.g / 9.0 ) *\",\n\
\t\t\t\t\t\t\t\t  \"(       visibility.b / 9.0 ) *\",\n\
\t\t\t\t\t\t\t\t  \"( 1.0 - visibility.a / 9.0 );\",\n\
\n\
\t\t\t\t\t\"pos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\",\n\
\t\t\t\t\t\"pos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\",\n\
\n\
\t\t\t\t\"}\",\n\
\n\
\t\t\t\t\"gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\",\n\
\n\
\t\t\t\"}\"\n\
\n\
\t\t].join( \"\\n\" ),\n\
\n\
\t\tfragmentShader: [\n\
\n\
\t\t\t\"precision mediump float;\",\n\
\n\
\t\t\t\"uniform sampler2D map;\",\n\
\t\t\t\"uniform float opacity;\",\n\
\t\t\t\"uniform int renderType;\",\n\
\t\t\t\"uniform vec3 color;\",\n\
\n\
\t\t\t\"varying vec2 vUV;\",\n\
\t\t\t\"varying float vVisibility;\",\n\
\n\
\t\t\t\"void main() {\",\n\
\n\
\t\t\t\t// pink square\n\
\n\
\t\t\t\t\"if( renderType == 0 ) {\",\n\
\n\
\t\t\t\t\t\"gl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );\",\n\
\n\
\t\t\t\t// restore\n\
\n\
\t\t\t\t\"} else if( renderType == 1 ) {\",\n\
\n\
\t\t\t\t\t\"gl_FragColor = texture2D( map, vUV );\",\n\
\n\
\t\t\t\t// flare\n\
\n\
\t\t\t\t\"} else {\",\n\
\n\
\t\t\t\t\t\"vec4 texture = texture2D( map, vUV );\",\n\
\t\t\t\t\t\"texture.a *= opacity * vVisibility;\",\n\
\t\t\t\t\t\"gl_FragColor = texture;\",\n\
\t\t\t\t\t\"gl_FragColor.rgb *= color;\",\n\
\n\
\t\t\t\t\"}\",\n\
\n\
\t\t\t\"}\"\n\
\t\t].join( \"\\n\" )\n\
\n\
\t},\n\
\n\
\n\
\t'lensFlare': {\n\
\n\
\t\tvertexShader: [\n\
\n\
\t\t\t\"uniform vec3 screenPosition;\",\n\
\t\t\t\"uniform vec2 scale;\",\n\
\t\t\t\"uniform float rotation;\",\n\
\t\t\t\"uniform int renderType;\",\n\
\n\
\t\t\t\"attribute vec2 position;\",\n\
\t\t\t\"attribute vec2 uv;\",\n\
\n\
\t\t\t\"varying vec2 vUV;\",\n\
\n\
\t\t\t\"void main() {\",\n\
\n\
\t\t\t\t\"vUV = uv;\",\n\
\n\
\t\t\t\t\"vec2 pos = position;\",\n\
\n\
\t\t\t\t\"if( renderType == 2 ) {\",\n\
\n\
\t\t\t\t\t\"pos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\",\n\
\t\t\t\t\t\"pos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\",\n\
\n\
\t\t\t\t\"}\",\n\
\n\
\t\t\t\t\"gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\",\n\
\n\
\t\t\t\"}\"\n\
\n\
\t\t].join( \"\\n\" ),\n\
\n\
\t\tfragmentShader: [\n\
\n\
\t\t\t\"precision mediump float;\",\n\
\n\
\t\t\t\"uniform sampler2D map;\",\n\
\t\t\t\"uniform sampler2D occlusionMap;\",\n\
\t\t\t\"uniform float opacity;\",\n\
\t\t\t\"uniform int renderType;\",\n\
\t\t\t\"uniform vec3 color;\",\n\
\n\
\t\t\t\"varying vec2 vUV;\",\n\
\n\
\t\t\t\"void main() {\",\n\
\n\
\t\t\t\t// pink square\n\
\n\
\t\t\t\t\"if( renderType == 0 ) {\",\n\
\n\
\t\t\t\t\t\"gl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );\",\n\
\n\
\t\t\t\t// restore\n\
\n\
\t\t\t\t\"} else if( renderType == 1 ) {\",\n\
\n\
\t\t\t\t\t\"gl_FragColor = texture2D( map, vUV );\",\n\
\n\
\t\t\t\t// flare\n\
\n\
\t\t\t\t\"} else {\",\n\
\n\
\t\t\t\t\t\"float visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 ) ).a +\",\n\
\t\t\t\t\t\t\t\t\t   \"texture2D( occlusionMap, vec2( 0.9, 0.5 ) ).a +\",\n\
\t\t\t\t\t\t\t\t\t   \"texture2D( occlusionMap, vec2( 0.5, 0.9 ) ).a +\",\n\
\t\t\t\t\t\t\t\t\t   \"texture2D( occlusionMap, vec2( 0.1, 0.5 ) ).a;\",\n\
\n\
\t\t\t\t\t\"visibility = ( 1.0 - visibility / 4.0 );\",\n\
\n\
\t\t\t\t\t\"vec4 texture = texture2D( map, vUV );\",\n\
\t\t\t\t\t\"texture.a *= opacity * visibility;\",\n\
\t\t\t\t\t\"gl_FragColor = texture;\",\n\
\t\t\t\t\t\"gl_FragColor.rgb *= color;\",\n\
\n\
\t\t\t\t\"}\",\n\
\n\
\t\t\t\"}\"\n\
\n\
\t\t].join( \"\\n\" )\n\
\n\
\t}\n\
\n\
};\n\
/**\n\
 * @author mikael emtinger / http://gomo.se/\n\
 *\n\
 */\n\
\n\
THREE.ShaderSprite = {\n\
\n\
\t'sprite': {\n\
\n\
\t\tvertexShader: [\n\
\n\
\t\t\t\"uniform int useScreenCoordinates;\",\n\
\t\t\t\"uniform int affectedByDistance;\",\n\
\t\t\t\"uniform vec3 screenPosition;\",\n\
\t\t\t\"uniform mat4 modelViewMatrix;\",\n\
\t\t\t\"uniform mat4 projectionMatrix;\",\n\
\t\t\t\"uniform float rotation;\",\n\
\t\t\t\"uniform vec2 scale;\",\n\
\t\t\t\"uniform vec2 alignment;\",\n\
\t\t\t\"uniform vec2 uvOffset;\",\n\
\t\t\t\"uniform vec2 uvScale;\",\n\
\n\
\t\t\t\"attribute vec2 position;\",\n\
\t\t\t\"attribute vec2 uv;\",\n\
\n\
\t\t\t\"varying vec2 vUV;\",\n\
\n\
\t\t\t\"void main() {\",\n\
\n\
\t\t\t\t\"vUV = uvOffset + uv * uvScale;\",\n\
\n\
\t\t\t\t\"vec2 alignedPosition = position + alignment;\",\n\
\n\
\t\t\t\t\"vec2 rotatedPosition;\",\n\
\t\t\t\t\"rotatedPosition.x = ( cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y ) * scale.x;\",\n\
\t\t\t\t\"rotatedPosition.y = ( sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y ) * scale.y;\",\n\
\n\
\t\t\t\t\"vec4 finalPosition;\",\n\
\n\
\t\t\t\t\"if( useScreenCoordinates != 0 ) {\",\n\
\n\
\t\t\t\t\t\"finalPosition = vec4( screenPosition.xy + rotatedPosition, screenPosition.z, 1.0 );\",\n\
\n\
\t\t\t\t\"} else {\",\n\
\n\
\t\t\t\t\t\"finalPosition = projectionMatrix * modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\",\n\
\t\t\t\t\t\"finalPosition.xy += rotatedPosition * ( affectedByDistance == 1 ? 1.0 : finalPosition.z );\",\n\
\n\
\t\t\t\t\"}\",\n\
\n\
\t\t\t\t\"gl_Position = finalPosition;\",\n\
\n\
\t\t\t\"}\"\n\
\n\
\t\t].join( \"\\n\" ),\n\
\n\
\t\tfragmentShader: [\n\
\n\
\t\t\t\"precision mediump float;\",\n\
\n\
\t\t\t\"uniform vec3 color;\",\n\
\t\t\t\"uniform sampler2D map;\",\n\
\t\t\t\"uniform float opacity;\",\n\
\n\
\t\t\t\"varying vec2 vUV;\",\n\
\n\
\t\t\t\"void main() {\",\n\
\n\
\t\t\t\t\"vec4 texture = texture2D( map, vUV );\",\n\
\t\t\t\t\"gl_FragColor = vec4( color * texture.xyz, texture.a * opacity );\",\n\
\n\
\t\t\t\"}\"\n\
\n\
\t\t].join( \"\\n\" )\n\
\n\
\t}\n\
\n\
};"