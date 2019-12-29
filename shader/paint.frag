#include "ofxLoopin/compatible.glsl"
#include "ofxLoopin/frag.glsl"
#include "ofxLoopin/src.glsl"
#include "ofxLoopin/clock.glsl"
#include "lib/snoise.glsl"
#include "lib/hsv.glsl"

// Light animation in space
// x length along a strip/tube the number of lights, 0 to 15, MT1 16 lights 
// y  side of strip, 0 or 1
// z  tube number in series,   0 - 1st tube, 1 - 2nd tube
// w  which of the three paths of the tetra  0, 1, 2 
// FragCoord value 0 - 63
ivec4 mtCoord() {
  ivec4 coord = ivec4(0);
  coord.x = int(gl_FragCoord.x);
  coord.z = coord.x / 32;
  coord.x -= coord.z * 32;
  coord.y = coord.x / 16;
  coord.x -= coord.y * 16;
  coord.w = int(gl_FragCoord.y);

  return coord;
}
// srcCoord - position in the buffer, left to right
// cos - wave form function

uniform float nc2speed = 1.0;

void main()
{
  float wave1 = cos( clockTime + srcCoord.x * 16.0 );

  ivec4 coord = mtCoord();
// which tube 
 // if ( coord.w == 0 ) {
 //   OUT = vec4(1,0,0,1);
 // } else {
 //   OUT = vec4(0,0,1,1);
 // }


// vec3, a type
  vec3 nc1 = vec3( 
    coord.x,
    coord.y,
    clockTime
  );
// 3d coordinate for snoise genertor
// clock time will vary
  vec3 nc2 = vec3(
    clockTime * nc2speed , // length on strip
    coord.w,
    coord.z
  );



// wave 5 sparks across gap from both ends, x length, 
// snoise - simplex noise, continuouse pseudo random number generator
// clamp - constrains range from  zero to one
// pow - power, raising exponent, large param shallow curve
  float wave5 =  0.0;
  wave5 += abs( 8 - coord.x ) / 8.0;
  wave5 += snoise( nc2 ) * 0.8;
  wave5 = clamp( wave5,0,1 );
  wave5 = pow( wave5, 1.5 );
  // wave5 += snoise( nc1 ) * 0.2;


// hsv   3 parameters - hue, saturation, value
//        hue value 0 to 1
//           purple about .8
// hsv   parameter position or name hsv.x hsv.y hsv.z
  vec3 hsv = vec3(
    clockTime / 10.0 + coord.z * 0.125,
    1,
    wave5
  );

  hsv.x = .60;  // hue
  
// hsv hue,  saturation,  value  

  OUT.rgb = hsv2rgb( hsv );

}
