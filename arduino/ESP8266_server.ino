#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <SoftwareSerial.h>

const char* ssid = ""; // 사용 중인 와이파이 이름
const char* password = ""; // 와이파이 패스워드
SoftwareSerial mySerial(8, 9); // RX, TX

ESP8266WebServer server(443);

int val = 0;

void setup() {
  mySerial.begin(115200);

  // 무선 네트워크 연결
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    mySerial.println("Connecting to WiFi...");
  }
  mySerial.println("Connected to WiFi");
  
  server.on("/arduino-data", HTTP_OPTIONS, handleOptions); // CORS 옵션 요청 처리
  server.on("/arduino-data", HTTP_GET, handleEndpoint); // 엔드포인트 설정
  server.enableCORS(true);
  // 서버 시작
  server.begin();

  mySerial.println("HTTP server started");
  mySerial.print("Local IP address: ");
  mySerial.println(WiFi.localIP());
}

void loop() {
  server.handleClient();
  val = analogRead(A0)/4;
  //Serial.println(val);
  delay(100);
  //server.on("/arduino-data", HTTP_GET, handleEndpoint);
}

void handleOptions() {
  // CORS 설정
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.sendHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  server.sendHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  server.send(200);
}

void handleEndpoint() {
  server.send(200, "text/plain", String(val));
}