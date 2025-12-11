#!/usr/bin/env node

/**
 * Script para generar imágenes OG dinámicamente
 * Ejecutar: node scripts/generate-og-images.js
 * 
 * Requiere: npm install sharp
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Crear directorio si no existe
const ogImagesDir = path.join(__dirname, '../public/assets/og-images');
if (!fs.existsSync(ogImagesDir)) {
  fs.mkdirSync(ogImagesDir, { recursive: true });
}

/**
 * Genera una imagen OG con texto
 */
async function generateOgImage(filename, title, subtitle, bgColor = '#0f172a') {
  const width = 1200;
  const height = 630;

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <!-- Fondo -->
      <rect width="${width}" height="${height}" fill="${bgColor}"/>
      
      <!-- Gradiente decorativo -->
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.3" />
          <stop offset="100%" style="stop-color:#ec4899;stop-opacity:0.2" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#grad)"/>
      
      <!-- Título -->
      <text 
        x="50" 
        y="250" 
        font-size="72" 
        font-weight="bold" 
        fill="white" 
        font-family="Arial, sans-serif"
        text-anchor="start"
      >
        ${title}
      </text>
      
      <!-- Subtítulo -->
      <text 
        x="50" 
        y="380" 
        font-size="42" 
        fill="#a0aec0" 
        font-family="Arial, sans-serif"
        text-anchor="start"
      >
        ${subtitle}
      </text>
      
      <!-- Logo/Marca en esquina -->
      <circle cx="${width - 80}" cy="80" r="60" fill="#3b82f6" opacity="0.8"/>
      <text 
        x="${width - 80}" 
        y="95" 
        font-size="32" 
        font-weight="bold" 
        fill="white" 
        font-family="Arial, sans-serif"
        text-anchor="middle"
      >
        UI
      </text>
    </svg>
  `;

  // Crear versión PNG en lugar de JPG para mejor compatibilidad
  const outputPathPng = path.join(ogImagesDir, filename.replace('.jpg', '.png'));
  const outputPathJpg = path.join(ogImagesDir, filename);

  try {
    // Generar PNG
    await sharp(Buffer.from(svg))
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(outputPathPng);

    // Generar JPG también
    await sharp(Buffer.from(svg))
      .jpeg({ quality: 95, mozjpeg: true })
      .toFile(outputPathJpg);

    console.log(`✅ Creada: ${filename} (PNG y JPG)`);
  } catch (error) {
    console.error(`❌ Error creando ${filename}:`, error.message);
  }
}

/**
 * Genera todas las imágenes OG necesarias
 */
async function generateAllOgImages() {
  console.log('🎨 Generando imágenes OG...\n');

  await generateOgImage(
    'default-og-image.jpg',
    'Componentes UI',
    'Estilos Modernos con DaisyUI'
  );

  await generateOgImage(
    'home-og.jpg',
    'UI Componentes',
    'Diseño y Desarrollo Angular'
  );

  await generateOgImage(
    'daisy-components-og.jpg',
    'DaisyUI',
    'Componentes Responsivos',
    '#1e293b'
  );

  await generateOgImage(
    'estilos-og.jpg',
    'Estilos CSS',
    'Tailwind + DaisyUI',
    '#0f172a'
  );

  await generateOgImage(
    'simpsons-og.jpg',
    'Los Simpson',
    'Galería Interactiva',
    '#fbbf24'
  );

  console.log('\n✨ ¡Imágenes OG generadas correctamente!');
}

// Ejecutar si sharp está instalado
try {
  generateAllOgImages();
} catch (error) {
  console.error('⚠️ Error: Instala sharp con: npm install sharp');
  console.error('O usa imágenes creadas manualmente en public/assets/og-images/');
}
