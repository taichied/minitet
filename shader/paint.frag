#include "ofxLoopin/compatible.glsl"
#include "ofxLoopin/frag.glsl"
#include "ofxLoopin/src.glsl"
#include "ofxLoopin/clock.glsl"

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

void main()
{
  float wave1 = cos( clockTime + srcCoord.x * 6.0 );

  ivec4 coord = mtCoord();

  if ( coord.w == 0 ) {
    OUT = vec4(1,0,0,1);
  } else {
    OUT = vec4(0,0,1,1);
  }

  float wave2 = cos( -clockTime + coord.z );


  OUT = vec4(
    wave2,
    wave2,
    .2,
    1
  );
}
