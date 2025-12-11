import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

  /**
   * Establece el título de la página
   */
  setTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  /**
   * Establece múltiples metadatos SEO
   */
  setMetaTags(seoData: SeoData): void {
    this.setTitle(seoData.title);

    // Descripción
    this.updateMetaTag('name', 'description', seoData.description);

    // Keywords
    if (seoData.keywords) {
      this.updateMetaTag('name', 'keywords', seoData.keywords);
    }

    // Author y fechas
    if (seoData.author) {
      this.updateMetaTag('name', 'author', seoData.author);
    }
    if (seoData.publishedDate) {
      this.updateMetaTag('property', 'article:published_time', seoData.publishedDate);
    }
    if (seoData.modifiedDate) {
      this.updateMetaTag('property', 'article:modified_time', seoData.modifiedDate);
    }

    // Open Graph
    if (seoData.ogTitle) {
      this.updateMetaTag('property', 'og:title', seoData.ogTitle);
    }
    if (seoData.ogDescription) {
      this.updateMetaTag('property', 'og:description', seoData.ogDescription);
    }
    if (seoData.ogImage) {
      this.updateMetaTag('property', 'og:image', seoData.ogImage);
      // Agregar dimensiones recomendadas de la imagen
      this.updateMetaTag('property', 'og:image:width', seoData.ogImageWidth || '1200');
      this.updateMetaTag('property', 'og:image:height', seoData.ogImageHeight || '630');
      if (seoData.ogImageType) {
        this.updateMetaTag('property', 'og:image:type', seoData.ogImageType);
      }
    }
    if (seoData.ogUrl) {
      this.updateMetaTag('property', 'og:url', seoData.ogUrl);
    }

    // Twitter Card
    if (seoData.twitterTitle) {
      this.updateMetaTag('name', 'twitter:title', seoData.twitterTitle);
    }
    if (seoData.twitterDescription) {
      this.updateMetaTag('name', 'twitter:description', seoData.twitterDescription);
    }
    if (seoData.twitterImage) {
      this.updateMetaTag('name', 'twitter:image', seoData.twitterImage);
      if (seoData.twitterImageAlt) {
        this.updateMetaTag('name', 'twitter:image:alt', seoData.twitterImageAlt);
      }
    }

    // Canonical
    if (seoData.canonical) {
      this.updateMetaTag('rel', 'canonical', seoData.canonical);
    }
  }

  /**
   * Actualiza o crea una etiqueta meta
   */
  private updateMetaTag(
    attrSelector: string,
    attrValue: string,
    content: string
  ): void {
    let tag = this.metaService.getTag(`${attrSelector}="${attrValue}"`);

    if (tag) {
      this.metaService.updateTag({
        [attrSelector]: attrValue,
        content: content
      });
    } else {
      this.metaService.addTag({
        [attrSelector]: attrValue,
        content: content
      });
    }
  }

  /**
   * Establece datos SEO por defecto
   */
  setDefaultSeo(): void {
    const defaultSeo: SeoData = {
      title: 'Componentes UI Responsivos - Estilos Modernos | DaisyUI & Tailwind',
      description: 'Explora nuestra colección de componentes UI personalizados y responsivos con DaisyUI y Tailwind CSS. Diseños modernos, código limpio y fácil de integrar.',
      keywords: 'componentes UI, DaisyUI, Tailwind CSS, Angular, componentes responsivos',
      ogTitle: 'Componentes UI Responsivos - Estilos Modernos',
      ogDescription: 'Componentes UI personalizados con DaisyUI y Tailwind CSS para Angular',
      ogImage: 'https://tudominio.com/og-image.jpg',
      canonical: 'https://tudominio.com'
    };
    this.setMetaTags(defaultSeo);
  }
}

export interface SeoData {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageWidth?: string;
  ogImageHeight?: string;
  ogImageType?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterImageAlt?: string;
  canonical?: string;
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
}
