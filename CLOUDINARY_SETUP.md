# 🚀 Configuración de Cloudinary - Antioquia High Vibes

## Pasos para Configurar Cloudinary

### 1. Crear Cuenta en Cloudinary
- Ve a [https://cloudinary.com](https://cloudinary.com)
- Regístrate con tu email
- Confirma tu cuenta

### 2. Obtener tu Cloud Name
- En el Dashboard de Cloudinary, en la sección **Account**
- Busca **Cloud name** (algo como: `dxxxxxxxxx`)
- Copia este valor

### 3. Crear un Upload Preset
- Ve a **Settings** → **Upload**
- Desplázate hasta **Upload presets**
- Haz clic en **Add upload preset**
- Rellena los datos:
  - **Name**: `antioquia_high_vibes`
  - **Unsigned**: Activa esta opción
  - Haz clic en **Save**

### 4. Actualizar el archivo `.env`
En tu archivo `.env`, reemplaza:
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="tu_cloud_name_aqui"
```

Con tu Cloud Name real. Por ejemplo:
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="d1a2b3c4d5"
```

### 5. Reinicia el Servidor
```bash
npm run dev
```

## ✨ Características Implementadas

### Para Categorías (Pueblos)
- ✅ Upload de imagen individual
- ✅ Preview de imagen
- ✅ Opción de cambiar imagen
- ✅ Validación de imagen requerida

### Para Propiedades (Fincas)
- ✅ Upload de múltiples imágenes
- ✅ Grid de imágenes con preview
- ✅ Eliminar imágenes individuales
- ✅ Contador de imágenes subidas
- ✅ Drag & drop support

## 🔒 Seguridad

- ✅ Upload presets están configurados como unsigned (sin exposición de claves)
- ✅ Las imágenes se comprimen automáticamente en Cloudinary
- ✅ Las URLs son seguras y están optimizadas

## 📝 Notas

- Las imágenes se suben directamente a Cloudinary (no pasan por tu servidor)
- Las URLs de Cloudinary son inmutables y siempre disponibles
- Puedes editar y cambiar imágenes sin afectar la BD

## 🆘 Troubleshooting

Si el upload no funciona:
1. Verifica que `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` esté correcto
2. Verifica que el Upload Preset `antioquia_high_vibes` exista
3. Recarga la página (Ctrl + Shift + R)
4. Abre la consola del navegador (F12) para ver errores

---

**¡Ya está listo para usar! 🎉**
