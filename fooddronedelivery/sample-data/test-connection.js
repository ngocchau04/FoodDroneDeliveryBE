#!/usr/bin/env node

// Load environment variables
require('dotenv').config()

const { createClient } = require('@sanity/client')

// Sanity client configuration
const client = createClient({
  projectId: '3glkq9kp',
  dataset: 'production', 
  useCdn: false,
  apiVersion: '2025-11-10',
  token: process.env.SANITY_WRITE_TOKEN
})

async function testConnection() {
  console.log('🔗 Testing Sanity connection...\n')

  try {
    // Test basic connection
    const projects = await client.projects.list()
    console.log('✅ Connection successful!')
    
    // Test dataset access
    const query = '*[_type == "restaurant"][0...3]{_id, name}'
    const restaurants = await client.fetch(query)
    
    console.log(`📊 Found ${restaurants.length} restaurants in dataset`)
    if (restaurants.length > 0) {
      console.log('📋 Sample restaurants:')
      restaurants.forEach(r => console.log(`   - ${r.name} (${r._id})`))
    }
    
    console.log('\n🚀 Ready to import sample data!')
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message)
    
    if (error.message.includes('Insufficient permissions')) {
      console.log('\n💡 Solutions:')
      console.log('1. Check your SANITY_WRITE_TOKEN in .env file')
      console.log('2. Ensure the token has write permissions')
      console.log('3. Verify project ID is correct: 3glkq9kp')
    }
  }
}

// Check environment
if (!process.env.SANITY_WRITE_TOKEN) {
  console.error('❌ SANITY_WRITE_TOKEN not found in environment')
  console.log('💡 Make sure you have a .env file with your token')
  process.exit(1)
}

testConnection()
