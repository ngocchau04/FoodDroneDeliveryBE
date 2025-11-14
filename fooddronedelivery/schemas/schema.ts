// DÙNG CHO TS schemas/schema.ts
import { type SchemaTypeDefinition } from 'sanity'

// import các schema bạn định nghĩa
import dish from './dish'
import restaurant from './restaurant'
import category from './category'
import featured from './featured'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [dish, restaurant, category, featured],
}





// DÙNG CHO JS schemas/schema.js
// import createSchema from 'part:@sanity/base/schema-creator'
// import schemaTypes from 'all:part:@sanity/base/schema-type'

// import category from './category'
// import restaurant from './restaurant'
// import dish from './dish'
// import featured from './featured'

// export const schema = createSchema({
//   name: 'default',
//   types: schemaTypes.concat([category, restaurant, dish, featured]),
// })


// export const schemaTypes = [restaurant, dish, category, featured]
