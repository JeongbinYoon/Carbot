int IN1Pin = 4; // 모터 A
int IN2Pin = 5; // 모터 A
int IN3Pin = 13; // 모터 B
int IN4Pin = 12; // 모터 B
int ENAPin = 3;
int ENBPin = 11;
void setup() {
  Serial.begin(9600);
  pinMode(IN1Pin, OUTPUT);
  pinMode(IN2Pin, OUTPUT);
  pinMode(IN3Pin, OUTPUT);
  pinMode(IN4Pin, OUTPUT);
  analogWrite(ENAPin, 250);
  analogWrite(ENBPin, 250);
}
void loop()
{
  if(Serial.available())  //시리얼모니터에서 데이터가 들어오면
  {
    char in_data;         // 입력된 데이터 저장을 위한 변수
    in_data = Serial.read();  //입력된 데이터 in_data에 저장
    Serial.print("data : ");
    Serial.println(in_data);
    if(in_data == 'w') // 전진
    {
    // Motor A 방향 설정
    digitalWrite(IN1Pin, HIGH);
    digitalWrite(IN2Pin, LOW);

    // Motor B 방향 설정
    digitalWrite(IN3Pin, HIGH);
    digitalWrite(IN4Pin, LOW);
    
    delay(1000);
    }
    else if(in_data == 's') // 후진
    {
    // Motor A 방향 설정
    digitalWrite(IN1Pin, LOW);
    digitalWrite(IN2Pin, HIGH);

    // Motor B 방향 설정
    digitalWrite(IN3Pin, LOW);
    digitalWrite(IN4Pin, HIGH);

    delay(1000);
    }
    else if(in_data == 'a') // 좌회전
    {
    // Motor A 방향 설정
    digitalWrite(IN1Pin, HIGH);
    digitalWrite(IN2Pin, LOW);

    // Motor B 방향 설정
    digitalWrite(IN3Pin, LOW);
    digitalWrite(IN4Pin, HIGH);
    }
    else if(in_data == 'd') // 우회전
    {
    // Motor A 방향 설정
    digitalWrite(IN1Pin, LOW);
    digitalWrite(IN2Pin, HIGH);

    // Motor B 방향 설정
    digitalWrite(IN3Pin, HIGH);
    digitalWrite(IN4Pin, LOW);
    }
    else if(in_data == 'x') // 정지
    {
    digitalWrite(IN1Pin, HIGH);
    digitalWrite(IN2Pin, HIGH);
    digitalWrite(IN3Pin, HIGH);
    digitalWrite(IN4Pin, HIGH);
    }
  }
}