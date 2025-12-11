import { Injectable } from '@angular/core';

/**
 * Servicio para manejar imágenes de vista previa en redes sociales
 * Soporta tanto imágenes estáticas como generadas dinámicamente
 */
@Injectable({
  providedIn: 'root'
})
export class SeoImageService {
  private readonly DOMAIN = 'https://tudominio.com'; // Reemplaza con tu dominio
  private readonly STATIC_IMAGE_PATH = '/assets/og-images';
  private readonly DYNAMIC_IMAGE_GENERATOR = '/api/generate-og-image'; // Opcional: para generar dinámicamente

  /**
   * Obtiene la URL de una imagen OG estática
   */
  getStaticOgImage(imageName: string): string {
    return `${this.DOMAIN}${this.STATIC_IMAGE_PATH}/${imageName}`;
  }

  /**
   * Genera una URL para una imagen OG dinámica (requiere backend)
   */
  getDynamicOgImage(params: OgImageParams): string {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value);
      }
    });

    return `${this.DOMAIN}${this.DYNAMIC_IMAGE_GENERATOR}?${searchParams.toString()}`;
  }

  /**
   * Obtiene imagen OG por defecto
   */
  getDefaultOgImage(): string {
    return this.getStaticOgImage('default-og-image.jpg');
  }

  /**
   * Obtiene imagen OG para una página específica
   */
  getPageOgImage(pageType: PageType, customName?: string): string {
    const imageMap: { [key in PageType]: string } = {
      home: 'home-og.jpg',
      daisy: 'daisy-components-og.jpg',
      estilos: 'estilos-og.jpg',
      simpsons: 'simpsons-og.jpg',
      article: customName || 'article-og.jpg'
    };

    return this.getStaticOgImage(imageMap[pageType]);
  }

  /**
   * Construye un objeto SeoData completo con imagen
   */
  buildSeoData(options: SeoDataBuilder): SeoDataWithImage {
    const baseUrl = this.DOMAIN;
    const pageUrl = `${baseUrl}${options.path}`;

    return {
      title: options.title,
      description: options.description,
      keywords: options.keywords,
      author: options.author || 'Tu Nombre/Equipo',
      ogTitle: options.ogTitle || options.title,
      ogDescription: options.ogDescription || options.description,
      ogImage: options.ogImage || this.getPageOgImage(options.pageType),
      ogImageWidth: '1200',
      ogImageHeight: '630',
      ogImageType: 'image/jpeg',
      ogUrl: pageUrl,
      twitterTitle: options.twitterTitle || options.title,
      twitterDescription: options.twitterDescription || options.description,
      twitterImage: options.ogImage || this.getPageOgImage(options.pageType),
      twitterImageAlt: options.imageAlt || options.title,
      canonical: pageUrl,
      publishedDate: options.publishedDate,
      modifiedDate: options.modifiedDate
    };
  }
}

export type PageType = 'home' | 'daisy' | 'estilos' | 'simpsons' | 'article';

export interface OgImageParams {
  title?: string;
  description?: string;
  image?: string;
  backgroundColor?: string;
  textColor?: string;
  [key: string]: string | undefined;
}

export interface SeoDataBuilder {
  title: string;
  description: string;
  keywords?: string;
  author?: string;
  path: string;
  pageType: PageType;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  imageAlt?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  publishedDate?: string;
  modifiedDate?: string;
}

export interface SeoDataWithImage {
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
