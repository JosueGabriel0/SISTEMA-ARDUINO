#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 10  // Pin de selección de esclavo
#define RST_PIN 9  // Pin de reinicio

MFRC522 mfrc522(SS_PIN, RST_PIN);  // Crear una instancia del lector RFID

String lastUid = ""; // Variable para almacenar el último UID leído

void setup() {
  Serial.begin(9600);               // Comunicación serial con el ESP32
  SPI.begin();                      // Iniciar el bus SPI
  mfrc522.PCD_Init();               // Iniciar el módulo RFID
  Serial.println("Esperando una tarjeta RFID..."); // Mensaje de inicio
}

void loop() {
  // Revisa si hay una nueva tarjeta presente
  if (!mfrc522.PICC_IsNewCardPresent() || !mfrc522.PICC_ReadCardSerial()) {
    delay(50);  // Esperar un momento antes de volver a intentar
    return;
  }

  // Leer el UID de la tarjeta
  String uid = "";
  char buffer[3];  // Buffer para almacenar la representación de cada byte en HEX

  for (byte i = 0; i < mfrc522.uid.size; i++) {
    sprintf(buffer, "%02X", mfrc522.uid.uidByte[i]);  // Formato HEX de dos dígitos
    uid += buffer;  // Añadir al UID
  }

  // Llamar a la función para manejar el UID
  handleUid(uid);
}

// Función para manejar el UID
void handleUid(String uid) {
  // Comparar el UID leído con el último UID
  if (uid != lastUid) {
    // Enviar el UID al monitor serial solo si es diferente
    Serial.println(uid);  // Imprimir el UID en el monitor serial
    lastUid = uid;        // Actualizar el último UID leído
  }
}