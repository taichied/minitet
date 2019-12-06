#include "ofxLoopin/compatible.glsl"
#include "ofxLoopin/frag.glsl"
#include "ofxLoopin/src.glsl"
#include "ofxLoopin/clock.glsl"

void main()
{

  OUT = vec4(0,cos( clockTime + srcCoord.x * 6.0 ),0,1);
}
