import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: r => r.required() }),
    defineField({ name: 'price', title: 'Price (KES)', type: 'number', validation: r => r.required() }),
    defineField({
      name: 'category', title: 'Category', type: 'string',
      options: { list: [
        { title: 'Caps', value: 'caps' },
        { title: 'Sneakers', value: 'sneakers' },
        { title: 'Hoodies', value: 'hoodies' },
        { title: 'Tees', value: 'tees' },
        { title: 'Jackets', value: 'jackets' },
      ]},
      validation: r => r.required()
    }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({
      name: 'sizes', title: 'Sizes', type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' }
    }),
    defineField({
      name: 'colors', title: 'Colours (hex)', type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'e.g. #111111, #ffffff, #8a8a8a'
    }),
    defineField({
      name: 'images', title: 'Images', type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: r => r.min(1)
    }),
    defineField({ name: 'badge', title: 'Badge (optional)', type: 'string', description: 'e.g. NEW, HOT, SALE' }),
    defineField({ name: 'inStock', title: 'In stock', type: 'boolean', initialValue: true }),
  ],
  preview: { select: { title: 'name', subtitle: 'category', media: 'images.0' } }
})

npm create sanity@latest -- --template clean --create-project "Blanx Store" --dataset production