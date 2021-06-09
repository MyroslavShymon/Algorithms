#include <emscripten.h>
#include <string>

EMSCRIPTEN_KEEPALIVE
extern "C" {
  std::string* testFunc(std::string* parameter) {
    return parameter;
  }
  int Add(int a, int b){
    return a + b;
  }
}