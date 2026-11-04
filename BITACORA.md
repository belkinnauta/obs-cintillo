# Bitácora del proyecto: Cintillos OBS

## Para qué sirve

Este repositorio contiene una página de cintillo (lower-third) para mostrar en OBS y un panel remoto, accesible desde el teléfono, para editar el nombre y el cargo, elegir una imagen de diseño, ajustar el texto y mostrar u ocultar el conjunto.

## Archivos

- `index.html`: página que se carga como fuente de navegador en OBS. Lee el estado compartido desde npoint y muestra/oculta el diseño PNG y los textos.
- `control.html`: panel remoto para editar nombre y cargo, cargar/indicar una imagen y ajustar posición y tamaños del texto.
- `cintillos/`: carpeta destinada a diseños PNG. Consulta `cintillos/README.md` para recomendaciones.

## Cómo funciona actualmente

El panel y la página de OBS se sincronizan mediante este endpoint npoint:

`https://api.npoint.io/2b81ca901938404ea4e7`

La página de OBS consulta el estado cada 2 segundos. El esquema de estado esperado incluye:

```json
{
  "titulo": "Nombre de la persona",
  "subtitulo": "Cargo o descripción",
  "bgImage": "https://.../imagen.png",
  "posX": 20,
  "posY": 82,
  "fontSizeNombre": 38,
  "fontSizeCargo": 22,
  "activo": false
}
```

`posX` y `posY` son porcentajes respecto al lienzo de OBS. `fontSizeNombre` y `fontSizeCargo` se expresan en píxeles. Los valores predeterminados en `index.html` son X=20%, Y=82%, nombre=38px y cargo=22px.

## Imagen de diseño

El diseño que se configuró como imagen predeterminada es:

`https://raw.githubusercontent.com/belkinnauta/obs-cintillo/main/cintillos/SUPER%20POMUCH%2026.png`

La imagen se dibuja a pantalla completa con `object-fit: contain`. El nombre y el cargo van en una capa transparente encima, sin barra o caja de fondo. Al estar `activo` en `false`, desaparecen tanto la imagen como los textos.

### Nota importante sobre carga local desde el teléfono

El panel puede leer un archivo seleccionado y convertirlo en una data URL (`data:image/...;base64,...`). Sin embargo, esa carga solo es temporal y puede producir un JSON muy grande; además, no es un sistema de almacenamiento de imágenes compartido fiable para producción. Se recomienda usar una URL pública para la imagen. Si se quiere carga de archivos robusta entre teléfono y OBS, integrar un almacenamiento real (por ejemplo, Supabase Storage) y guardar en npoint solo la URL.

## Controles actuales del panel

`control.html` proporciona:

- campos para nombre y cargo;
- campo de URL de imagen y selector de archivo local;
- flechas para desplazar el texto en X/Y, guardando los porcentajes en la nube;
- deslizadores independientes para tamaño del nombre y del cargo; se envían a la nube al soltar el control;
- botones «Al Aire» y «Ocultar».

El panel carga los valores actuales de npoint al abrirse. Si los cambios recientes no se ven en el teléfono, recargar la página o cerrarla y abrirla de nuevo para evitar caché.

## Uso en OBS

1. Añadir `index.html` (o la URL publicada de GitHub Pages) como fuente **Navegador**.
2. Configurar el lienzo de la fuente con la resolución adecuada, idealmente 1920 × 1080 si el diseño PNG tiene ese tamaño.
3. Abrir `control.html` desde el teléfono.
4. Ingresar nombre y cargo; seleccionar/indicar el diseño.
5. Usar las flechas para ubicar los textos en la zona libre del PNG y los deslizadores para ajustar tamaños.
6. Pulsar «Al Aire» para mostrar todo o «Ocultar» para esconder diseño y texto.
7. Si la página de OBS quedó abierta desde antes de los cambios, recargar la fuente en OBS.

## Historial de decisiones y cambios

- Se estableció una página de lower-third para OBS y un panel remoto conectados por npoint.
- Se creó `cintillos/` para guardar diseños PNG.
- Se seleccionó `SUPER POMUCH 26.png` como arte predeterminado.
- Se corrigió el comportamiento para que el arte PNG también desaparezca al ocultar.
- Se decidió eliminar la caja/barra detrás del texto y permitir posicionar nombre y cargo mediante `posX`/`posY`.
- Se añadieron controles de flechas al panel para ajustar esa posición.
- Se redujo el tamaño por defecto del texto y se añadieron controles separados de tamaño de fuente al panel.
- La carga local del teléfono se probó, pero para uso fiable entre dispositivos se recomienda alojar la imagen en una URL pública.

## Estado al 2026-11-04

- `index.html` y `control.html` incluyen la funcionalidad descrita arriba.
- Commit más reciente conocido al crear esta bitácora: `616e4350d503b48d78075ddc4e2b682d3eea1964`.
- Confirmar siempre el estado actual de ambos archivos en el repo antes de continuar, porque esta bitácora puede quedar desactualizada.

## Próximos pasos recomendados

1. Probar en OBS los botones «Al Aire» y «Ocultar» y confirmar que fondo y texto aparezcan/desaparezcan juntos.
2. Ajustar posición y tamaños con el lienzo real y el PNG cargado; los valores X/Y existentes son iniciales y pueden necesitar calibración por diseño.
3. Validar que la URL de imagen se pueda abrir directamente en el navegador de OBS.
4. Si la data URL local es demasiado grande o no persiste, migrar la carga a almacenamiento público y guardar solamente su URL en el estado.
5. Probar la experiencia móvil, incluyendo recarga después de publicar cambios.

## Cómo retomar el trabajo con Copilot

En una conversación nueva, indicar:

> Lee `BITACORA.md` de `belkinnauta/obs-cintillo` para recuperar el contexto del proyecto. Después revisa el estado actual de `index.html` y `control.html` antes de hacer cambios.

La bitácora ayuda a recuperar el contexto, pero no es memoria automática: conviene pedir que se lea al comenzar una conversación nueva y actualizarla cuando haya decisiones o cambios relevantes.
