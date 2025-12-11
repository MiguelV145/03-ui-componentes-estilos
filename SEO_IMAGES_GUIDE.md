# Guía de Implementación SEO con Imágenes

## 📸 Cómo agregar imágenes de vista previa (OG Images)

Cuando compartes un link de tu sitio en redes sociales (Facebook, Twitter, WhatsApp, etc.), aparece una tarjeta con la imagen de vista previa. Para esto usamos las metaetiquetas **Open Graph** y **Twitter Card**.

### 1️⃣ Crear tus imágenes OG

Las imágenes deben tener estas dimensiones recomendadas:
- **Ancho**: 1200px
- **Alto**: 630px
- **Formato**: JPG o PNG
- **Peso**: < 1MB

**Imágenes necesarias:**
- `default-og-image.jpg` - Imagen por defecto del sitio
- `home-og.jpg` - Para la página principal
- `daisy-components-og.jpg` - Para componentes DaisyUI
- `estilos-og.jpg` - Para página de estilos
- `simpsons-og.jpg` - Para página Simpson

**Ubicación**: `public/assets/og-images/`

### 2️⃣ Usando el servicio en tus componentes

#### Opción A: Imagen estática predefinida
```typescript
import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../share/service/SeoService';
import { SeoImageService } from '../../share/service/SeoImageService';

@Component({
  selector: 'app-daisy-page',
  templateUrl: './daisy-page.html'
})
export class DaisyPageComponent implements OnInit {
  constructor(
    private seoService: SeoService,
    private seoImageService: SeoImageService
  ) {}

  ngOnInit(): void {
    const seoData = this.seoImageService.buildSeoData({
      title: 'Componentes DaisyUI Responsivos',
      description: 'Explora nuestra colección de componentes DaisyUI',
      keywords: 'DaisyUI, componentes, responsive',
      path: '/daisy',
      pageType: 'daisy'
    });

    this.seoService.setMetaTags(seoData);
  }
}
```

#### Opción B: Imagen personalizada
```typescript
const seoData = this.seoImageService.buildSeoData({
  title: 'Mi Página',
  description: 'Descripción de mi página',
  path: '/mi-pagina',
  pageType: 'article',
  ogImage: this.seoImageService.getStaticOgImage('mi-imagen-custom.jpg'),
  imageAlt: 'Descripción de la imagen para accesibilidad'
});

this.seoService.setMetaTags(seoData);
```

#### Opción C: Imagen dinámica (requiere backend)
```typescript
const seoData = this.seoImageService.buildSeoData({
  title: 'Artículo Especial',
  description: 'Un artículo increíble',
  path: '/articulo',
  pageType: 'article',
  ogImage: this.seoImageService.getDynamicOgImage({
    title: 'Artículo Especial',
    description: 'Un artículo increíble',
    backgroundColor: '#0f172a',
    textColor: '#ffffff'
  })
});

this.seoService.setMetaTags(seoData);
```

### 3️⃣ Metaetiquetas generadas automáticamente

El servicio automáticamente genera:

**Open Graph:**
```html
<meta property="og:title" content="Componentes DaisyUI Responsivos">
<meta property="og:description" content="...">
<meta property="og:image" content="https://tudominio.com/assets/og-images/daisy-components-og.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:url" content="https://tudominio.com/daisy">
```

**Twitter Card:**
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Componentes DaisyUI Responsivos">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="https://tudominio.com/assets/og-images/daisy-components-og.jpg">
<meta name="twitter:image:alt" content="Componentes DaisyUI">
```

### 4️⃣ Cambiar tu dominio

**Importante:** Reemplaza `tudominio.com` en `SeoImageService.ts`:

```typescript
private readonly DOMAIN = 'https://tudominio.com'; // ← Cambia esto
```

### 5️⃣ Probar tus imágenes OG

**Facebook**:
- https://developers.facebook.com/tools/debug/og/object/

**Twitter**:
- https://cards-dev.twitter.com/validator

**WhatsApp**:
- Simplemente comparte el link en un chat

### 6️⃣ Variables disponibles en SeoData

```typescript
const seoData = {
  title: string;                    // Título de la página
  description: string;              // Meta descripción
  keywords?: string;                // Palabras clave
  author?: string;                  // Autor de la página
  
  // Open Graph
  ogTitle?: string;                 // Título para OG
  ogDescription?: string;           // Descripción para OG
  ogImage?: string;                 // URL de la imagen
  ogImageWidth?: string;            // Ancho de la imagen (auto: 1200)
  ogImageHeight?: string;           // Alto de la imagen (auto: 630)
  ogImageType?: string;             // Tipo MIME (auto: image/jpeg)
  ogUrl?: string;                   // URL canónica
  
  // Twitter Card
  twitterTitle?: string;            // Título para Twitter
  twitterDescription?: string;      // Descripción para Twitter
  twitterImage?: string;            // Imagen para Twitter
  twitterImageAlt?: string;         // Alt text de la imagen
  
  // Canonical y fechas
  canonical?: string;               // URL canónica
  publishedDate?: string;           // Fecha de publicación (ISO 8601)
  modifiedDate?: string;            // Fecha de última modificación
};
```

### 7️⃣ Tipos de página disponibles

- `home` - Página principal
- `daisy` - Componentes DaisyUI
- `estilos` - Página de estilos
- `simpsons` - Página de Simpson
- `article` - Artículos generales

Cada tipo tiene una imagen OG asociada automáticamente.

### 8️⃣ Ejemplo completo

```typescript
import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../share/service/SeoService';
import { SeoImageService } from '../../share/service/SeoImageService';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.html'
})
export class MyPageComponent implements OnInit {
  constructor(
    private seoService: SeoService,
    private seoImageService: SeoImageService
  ) {}

  ngOnInit(): void {
    const seoData = this.seoImageService.buildSeoData({
      title: 'Mi Página Increíble',
      description: 'Una descripción atractiva que aparecerá en Google',
      keywords: 'palabras, clave, importantes',
      author: 'Tu Nombre',
      path: '/mi-pagina',
      pageType: 'article',
      imageAlt: 'Descripción de la imagen para accesibilidad',
      publishedDate: '2025-12-11T10:00:00Z',
      modifiedDate: '2025-12-11T15:00:00Z'
    });

    this.seoService.setMetaTags(seoData);
  }
}
```

---

### ✅ Checklist

- [ ] Crear carpeta `public/assets/og-images/`
- [ ] Crear imágenes OG en 1200x630px
- [ ] Cambiar dominio en `SeoImageService.ts`
- [ ] Agregar `SeoService` a tus componentes
- [ ] Agregar `SeoImageService` a tus componentes
- [ ] Llamar `seoImageService.buildSeoData()` en `ngOnInit()`
- [ ] Probar en Facebook Debugger
- [ ] Probar en Twitter Card Validator
- [ ] Probar compartiendo en WhatsApp
