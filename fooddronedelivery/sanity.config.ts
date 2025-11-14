import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {schema} from './schemas/schema'

export default defineConfig({
  name: 'default',
  title: 'FoodDroneDelivery',

  projectId: '3glkq9kp',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema,
  // schema: {
  //   types: schemaTypes,
  // },
})
