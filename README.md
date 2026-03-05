# AtomViz 3D — Expo Go

App de química interactiva 3D migrada a React Native / Expo Go.

## ✅ Características incluidas
- Explorador de átomos 3D (Three.js) — Modelos Bohr, Nube e⁻, Orbital
- Constructor de moléculas 3D con validación de la regla del octeto
- Tabla periódica interactiva completa (118 elementos)
- Balanceador de ecuaciones químicas (algebraico + IA con Claude API)

## 🚀 Instalación

### Requisitos previos
- Node.js 18+
- Expo CLI: `npm install -g expo-cli`  
- App **Expo Go** instalada en tu teléfono ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779))

### Pasos

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar el servidor de desarrollo
npx expo start

# 3. Escanear el QR con la app Expo Go
```

## 📦 Dependencias principales
- `expo` ~51.0.0
- `react-native-webview` 13.8.6 — para renderizar la app web

## 💡 Notas
- La app requiere **conexión a internet** para cargar Three.js y las fuentes
- Para el análisis con IA necesitas una **API Key de Anthropic** (gratis en [console.anthropic.com](https://console.anthropic.com/keys))
- **Orientación recomendada**: Landscape (horizontal) para mejor experiencia
- La app funciona exactamente igual que la versión web original

## 🔧 Solución de problemas

**La app no carga Three.js:**
- Verifica que tienes conexión a internet activa

**Pantalla negra en Android:**
- Asegúrate de que `usesCleartextTraffic: true` está en `app.json`

**API Key no funciona:**
- La key se guarda solo en sesión, no persiste entre reinicios de la app
#