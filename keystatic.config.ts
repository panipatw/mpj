// keystatic.config.ts
import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    // Shop products. Pure structured data (no prose body), so entries are
    // stored as YAML files rather than Markdoc: src/content/products/<slug>.yaml.
    // The Astro read side (src/content.config.ts) must mirror this schema.
    products: collection({
      label: 'Products',
      slugField: 'name',
      path: 'src/content/products/*',
      format: { data: 'yaml' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        price: fields.integer({
          label: 'Price (USD)',
          validation: { min: 0 },
        }),
        blurb: fields.text({ label: 'Blurb', multiline: true }),
        // Uploads land in src/assets/shop/ so Astro's image pipeline optimises
        // them; publicPath is what gets written into the YAML file, relative to
        // the entry file, which is how Astro's image() helper wants it.
        image: fields.image({
          label: 'Photo',
          directory: 'src/assets/shop',
          publicPath: '../../assets/shop/',
        }),
        alt: fields.text({
          label: 'Photo description',
          description: 'Describes the photo for screen readers.',
        }),
        featured: fields.checkbox({
          label: 'Featured',
          description: 'Show in the "From the studio" teaser on the landing page.',
        }),
        order: fields.integer({
          label: 'Display order',
          description: 'Lower numbers appear first in the shop grid.',
          defaultValue: 99,
        }),
        // Fallback look for pieces without a photo yet: the shop card shows a
        // CSS gradient built from these two colours.
        from: fields.text({
          label: 'Gradient start (no-photo fallback)',
          defaultValue: '#c98a5e',
        }),
        to: fields.text({
          label: 'Gradient end (no-photo fallback)',
          defaultValue: '#6f4a34',
        }),
      },
    }),
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
  },
});