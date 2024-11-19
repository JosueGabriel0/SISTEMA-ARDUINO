#include <LiquidCrystal.h>
#include <Servo.h>

#define TRIG_PIN_ENTRADA 2    // Pin TRIG del sensor de entrada
#define ECHO_PIN_ENTRADA 3     // Pin ECHO del sensor de entrada
#define TRIG_PIN_SALIDA 4      // Pin TRIG del sensor de salida
#define ECHO_PIN_SALIDA 5       // Pin ECHO del sensor de salida
#define SERVO_PIN 6            // Pin del servomotor

LiquidCrystal lcd(7, 8, 9, 10, 11, 12); // Pines del LCD
Servo servoMotor;

const int ESPACIOS_TOTALES = 10; // Cambia este valor según la capacidad del estacionamiento
int espaciosDisponibles = ESPACIOS_TOTALES;

void setup() {
  lcd.begin(16, 2);                // Inicializa el LCD
  servoMotor.attach(SERVO_PIN);    // Conecta el servomotor
  pinMode(TRIG_PIN_ENTRADA, OUTPUT);
  pinMode(ECHO_PIN_ENTRADA, INPUT);
  pinMode(TRIG_PIN_SALIDA, OUTPUT);
  pinMode(ECHO_PIN_SALIDA, INPUT);
  
  lcd.print("Espacios: ");
  lcd.setCursor(0, 1);
  lcd.print(espaciosDisponibles);
}

void loop() {
  if (detectarVehiculo(TRIG_PIN_ENTRADA, ECHO_PIN_ENTRADA)) {
    if (espaciosDisponibles > 0) {
      abrirBarrera();           // Abre la barrera para entrada
      espaciosDisponibles--;
      actualizarLCD();
      delay(2000); // Tiempo para que el vehículo entre
      cerrarBarrera();
    } else {
      lcd.setCursor(0, 1);
      lcd.print("Estacionamiento lleno");
      delay(2000);
    }
  }

  if (detectarVehiculo(TRIG_PIN_SALIDA, ECHO_PIN_SALIDA)) {
    abrirBarrera();             // Abre la barrera para salida
    espaciosDisponibles++;
    actualizarLCD();
    delay(2000); // Tiempo para que el vehículo salga
    cerrarBarrera();
  }

  delay(100); // Espera un poco antes de volver a verificar
}

bool detectarVehiculo(int trigPin, int echoPin) {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  long duracion = pulseIn(echoPin, HIGH);
  long distancia = (duracion * 0.034) / 2; // Calcular la distancia en cm

  // Detecta vehículos a 30 cm o menos
  if (distancia <= 30) { // Si hay un vehículo dentro de 30 cm o menos
    return true;
  }
  return false;
}

void abrirBarrera() {
  servoMotor.write(90); // Abre la barrera
  delay(1000); // Espera 1 segundo
}

void cerrarBarrera() {
  servoMotor.write(0); // Cierra la barrera
  delay(1000); // Espera 1 segundo
}

void actualizarLCD() {
   lcd.setCursor(10, 1);  // Mueve el cursor a la posición adecuada
   lcd.print("   ");      // Limpia la zona donde se escribirá el número (tres espacios)
   lcd.setCursor(10, 1);  // Vuelve a posicionar el cursor
   lcd.print(espaciosDisponibles);  // Escribe el valor actualizado
}
