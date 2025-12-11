export const SCHEMA_ORG_CONFIG = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'UI Componentes Estilos',
    url: 'https://tudominio.com',
    logo: 'https://tudominio.com/logo.png',
    description: 'Componentes UI modernos con DaisyUI y Tailwind CSS',
    sameAs: [
      'https://www.twitter.com/tutwitter',
      'https://www.linkedin.com/company/tucompania',
      'https://github.com/turepositorio'
    ]
  },

  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'UI Componentes Estilos',
    url: 'https://tudominio.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://tudominio.com/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  },

  breadcrumb: (items: { name: string; url: string }[]) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }),

  article: (data: {
    headline: string;
    description: string;
    image?: string;
    datePublished: string;
    dateModified: string;
    author: string;
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.headline,
    description: data.description,
    image: data.image || 'https://tudominio.com/og-image.jpg',
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    author: {
      '@type': 'Person',
      name: data.author
    }
  }),

  product: (data: {
    name: string;
    description: string;
    image: string;
    rating: number;
    ratingCount: number;
    price: string;
    currency: string;
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: data.name,
    description: data.description,
    image: data.image,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: data.rating,
      reviewCount: data.ratingCount
    },
    offers: {
      '@type': 'Offer',
      price: data.price,
      priceCurrency: data.currency
    }
  })
};
