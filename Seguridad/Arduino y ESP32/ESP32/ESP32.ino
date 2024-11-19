#include <WiFi.h>
#include <HTTPClient.h>

// Configuración Wi-Fi
const char* ssid = "N";
const char* password = "12345678";

// URL del servidor backend
const char* serverUrl = "http://192.168.101.252:8082/api/rfid"; // Cambia localhost por la IP del servidor backend
const char* serverUrl2 = "http://192.168.101.252:8082/api/verificacion"; // Cambia localhost por la IP del servidor backend

void setup() {
  Serial.begin(115200);    // Comunicación serial para depuración
  Serial2.begin(9600, SERIAL_8N1, 16, 17); // Comunicación serial con el Arduino Uno usando RX=16 y TX=17

  // Conectar a la red Wi-Fi
  WiFi.begin(ssid, password);
  Serial.print("Conectando a WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConectado a la red Wi-Fi");
}

void comprobarServidor() {
  if (WiFi.status() == WL_CONNECTED) { // Verificar la conexión Wi-Fi
    HTTPClient http;
    String url = String(serverUrl) + "/ping"; // Asegúrate de tener un endpoint "/ping" en tu servidor
    Serial.println("Comprobando servidor en URL: " + url);
    http.begin(url);
    int httpResponseCode = http.GET();

    if (httpResponseCode > 0) {
      Serial.println("Servidor responde con código: " + String(httpResponseCode));
    } else {
      Serial.println("Error al contactar el servidor: " + String(httpResponseCode));
    }

    http.end();
  } else {
    Serial.println("Error: No conectado a WiFi.");
  }
}

void loop() {
  // Comprobar la intensidad de la señal Wi-Fi
  long rssi = WiFi.RSSI();
  Serial.print("Intensidad de la señal Wi-Fi (RSSI): ");
  Serial.println(rssi);

  // Comprobar el servidor
  comprobarServidor();

  // Verificar si hay datos disponibles del Arduino Uno
  if (Serial2.available()) {
    delay(10);
    String uid = Serial2.readStringUntil('>');  // Leer hasta el marcador de fin '>'
    uid.remove(0, 1); // Eliminar el marcador de inicio '<'
    uid.trim();

    Serial.println("UID recibido desde el Arduino: " + uid);

    // Verificar si la tarjeta está registrada
    if (verificarTarjeta(uid)) {
      Serial.println("Acceso permitido");
      enviarMensaje("Acceso permitido con UID: " + uid); // Enviar mensaje de acceso permitido
    } else {
      Serial.println("Tarjeta no registrada. Procediendo a registrar...");
      enviarMensaje("Tarjeta no registrada con UID: " + uid); // Enviar mensaje de tarjeta no registrada
      registrarTarjeta(uid);
    }
  }

  delay(10000);
}

// Función para verificar si la tarjeta está registrada
bool verificarTarjeta(String uid) {
  if (WiFi.status() == WL_CONNECTED) { // Verificar la conexión Wi-Fi
    HTTPClient http;
    String url = String(serverUrl) + "/verificar/" + uid;
    Serial.println("Verificando URL: " + url);
    http.begin(url);
    int httpResponseCode = http.GET();

    if (httpResponseCode == 200) {
      Serial.println("Tarjeta verificada: " + http.getString());
      http.end();
      return true;
    } else {
      Serial.println("Error al verificar la tarjeta: " + String(httpResponseCode));
      Serial.println("Contenido de la respuesta: " + http.getString());
      http.end();
      return false;
    }
  } else {
    Serial.println("Error: No conectado a WiFi.");
    return false;
  }
}

// Función para registrar una nueva tarjeta
void registrarTarjeta(String uid) {
  if (WiFi.status() == WL_CONNECTED) { // Verificar la conexión Wi-Fi
    HTTPClient http;
    http.begin(String(serverUrl) + "/registrar");
    http.addHeader("Content-Type", "application/json");

    // Datos para el nuevo registro de la tarjeta
    String jsonPayload = "{"
                         "\"uid\":\"" + uid + "\"," 
                         "\"vehiculo\":{"
                         "\"numeroPlaca\":\"Vacio\","
                         "\"revisionTecnica\":\"2024-10-15\","
                         "\"nombrePropietario\":\"Vacio\","
                         "\"otrosDatos\":\"Vacio\""
                         "}"
                         "}";

    Serial.println("Datos a registrar: " + jsonPayload);
    int httpResponseCode = http.POST(jsonPayload);

    // Verifica si el estado es 200 al registrar la tarjeta
    if (httpResponseCode == 200) { 
      Serial.println("Tarjeta registrada exitosamente");
      enviarMensaje("Tarjeta registrada: " + uid); // Enviar mensaje de registro
    } else {
      Serial.println("Error al registrar la tarjeta: " + String(httpResponseCode));
      Serial.println("Contenido de la respuesta: " + http.getString());
    }

    http.end();
  } else {
    Serial.println("Error: No conectado a WiFi.");
  }
}

// Función para enviar mensajes al servidor
void enviarMensaje(String mensaje) {
  if (WiFi.status() == WL_CONNECTED) { // Verificar la conexión Wi-Fi
    HTTPClient http;
    String url = String(serverUrl2) + "/enviar"; // Asegúrate de tener el endpoint "/enviar" en tu servidor
    Serial.println("Enviando mensaje: " + mensaje);
    http.begin(url);
    http.addHeader("Content-Type", "text/plain");

    int httpResponseCode = http.POST(mensaje); // Envía el mensaje como POST

    if (httpResponseCode > 0) {
      Serial.println("Mensaje enviado correctamente: " + String(httpResponseCode));
    } else {
      Serial.println("Error al enviar el mensaje: " + String(httpResponseCode));
    }

    http.end();
  } else {
    Serial.println("Error: No conectado a WiFi.");
  }
}
