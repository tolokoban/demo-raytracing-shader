attribute vec3 aVertexPosition;
varying lowp vec3 vPoint;

void main(void) {
  float x = aVertexPosition[0];
  float y = aVertexPosition[1];
  if (x > 0.0) {
    // X > 0
    if (y > 0.0) {
      gl_Position = vec4(1.0, 1.0, 0.0, 1.0);
    } else {
      gl_Position = vec4(1.0, -1.0, 0.0, 1.0);
    }
  } else {
    if (y > 0.0) {
      gl_Position = vec4(-1.0, 1.0, 0.0, 1.0);
    } else {
      gl_Position = vec4(-1.0, -1.0, 0.0, 1.0);
    }
  }
  vPoint = aVertexPosition;
}
