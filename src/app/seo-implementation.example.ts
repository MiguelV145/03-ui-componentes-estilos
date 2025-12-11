import { Component, OnInit } from '@angular/core';
import { SeoService } from './share/service/SeoService';
import { SeoImageService } from './share/service/SeoImageService';

/**
 * ⚠️ ARCHIVO DE REFERENCIA SOLAMENTE
 * 
 * Este archivo muestra ejemplos de cómo implementar SEO con imágenes.
 * NO intentes usar los componentes de este archivo directamente en tu aplicación.
 * 
 * En su lugar, copia el patrón del ngOnInit() a tus componentes reales:
 * - feature/daisy-page/daisy-page.ts
 * - feature/estilos-page/estilos-page.ts
 * - feature/Simpsons/simpsons-page.ts
 * - app.ts (para home)
 * 
 * Véase: SEO_IMAGES_GUIDE.md para instrucciones completas
 */
@Component({
  selector: 'app-daisy-page',
  template: '<div>Daisy Page Content</div>'
})
export class DaisyPageComponent implements OnInit {
  constructor(
    private seoService: SeoService,
    private seoImageService: SeoImageService
  ) {}

  ngOnInit(): void {
    // Opción 1: Usar imagen estática predefinida
    const seoData = this.seoImageService.buildSeoData({
      title: 'Componentes DaisyUI Responsivos',
      description: 'Explora nuestra colección de componentes DaisyUI con estilos modernos y responsivos',
      keywords: 'DaisyUI, componentes, responsive, Angular, Tailwind CSS',
      path: '/daisy',
      pageType: 'daisy',
      imageAlt: 'Componentes DaisyUI responsivos'
    });

    this.seoService.setMetaTags(seoData);
  }
}

/**
 * EJEMPLO 2: Componente de artículo con imagen dinámicamente generada
 */
@Component({
  selector: 'app-article',
  template: `<div>{{ title }}</div>`
})
export class ArticleComponent implements OnInit {
  title = 'Mi Artículo Especial';

  constructor(
    private seoService: SeoService,
    private seoImageService: SeoImageService
  ) {}

  ngOnInit(): void {
    // Opción 2: Usar imagen dinámica generada
    const seoData = this.seoImageService.buildSeoData({
      title: this.title,
      description: 'Este es un artículo sobre componentes UI modernos',
      keywords: 'UI, componentes, Angular, diseño',
      path: '/article/mi-articulo',
      pageType: 'article',
      // Generar imagen dinámica con parámetros
      ogImage: this.seoImageService.getDynamicOgImage({
        title: this.title,
        description: 'Un artículo sobre componentes modernos',
        backgroundColor: '#0f172a',
        textColor: '#ffffff'
      }),
      publishedDate: '2025-12-11',
      modifiedDate: '2025-12-11'
    });

    this.seoService.setMetaTags(seoData);
  }
}

/**
 * EJEMPLO 3: Componente Simpson con imagen custom
 */
@Component({
  selector: 'app-simpsons-page',
  template: `<div>Personajes Simpson</div>`
})
export class SimpsonsPageComponent implements OnInit {
  constructor(
    private seoService: SeoService,
    private seoImageService: SeoImageService
  ) {}

  ngOnInit(): void {
    // Opción 3: Usar imagen estática personalizada
    const seoData = this.seoImageService.buildSeoData({
      title: 'Personajes de Los Simpson',
      description: 'Explora los personajes principales de la serie Los Simpson',
      keywords: 'Simpson, personajes, animación',
      path: '/simpsons',
      pageType: 'simpsons',
      ogImage: this.seoImageService.getStaticOgImage('simpsons-main.jpg'),
      imageAlt: 'Los personajes principales de Los Simpson'
    });

    this.seoService.setMetaTags(seoData);
  }
}

/**
 * EJEMPLO 4: Componente Home con imagen por defecto
 */
@Component({
  selector: 'app-home',
  template: `<div>Bienvenido</div>`
})
export class HomeComponent implements OnInit {
  constructor(
    private seoService: SeoService,
    private seoImageService: SeoImageService
  ) {}

  ngOnInit(): void {
    // Opción 4: Usar imagen por defecto del sitio
    const seoData = this.seoImageService.buildSeoData({
      title: 'Componentes UI Responsivos - Estilos Modernos',
      description: 'Componentes UI personalizados con DaisyUI y Tailwind CSS para Angular',
      keywords: 'componentes UI, DaisyUI, Tailwind CSS, Angular',
      path: '/',
      pageType: 'home'
      // La imagen por defecto se asigna automáticamente
    });

    this.seoService.setMetaTags(seoData);
  }
}
