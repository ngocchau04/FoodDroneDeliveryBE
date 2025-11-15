#!/usr/bin/env node

// Load environment variables
require('dotenv').config()

const { createClient } = require('@sanity/client')

// Sanity client configuration
const client = createClient({
  projectId: '3glkq9kp',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN
})

async function getExistingData() {
  console.log('🔍 Checking existing data for references...\n')

  try {
    // Get restaurants
    const restaurants = await client.fetch('*[_type == "restaurant"]{_id, name}')
    console.log('🏪 Restaurants:')
    restaurants.forEach(r => console.log(`   - ${r.name}: ${r._id}`))
    
    // Get dishes
    const dishes = await client.fetch('*[_type == "dish"]{_id, name}')
    console.log('\n🍽️ Dishes:')
    dishes.forEach(d => console.log(`   - ${d.name}: ${d._id}`))
    
    console.log('\n💡 Use these IDs to update your sample data files!')
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

getExistingData()
