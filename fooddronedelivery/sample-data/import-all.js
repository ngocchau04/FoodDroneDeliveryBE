#!/usr/bin/env node

// Load environment variables
require('dotenv').config()

const { createClient } = require('@sanity/client')
const fs = require('fs')
const path = require('path')

// Sanity client configuration
const client = createClient({
  projectId: '3glkq9kp', // Food Drone Delivery project ID
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN // Sử dụng token từ .env
})

async function importData() {
  console.log('🚀 Starting Food Drone Delivery data import...\n')

  const dataFiles = [
    { file: 'users.json', name: 'Users' },
    { file: 'restaurants.json', name: 'Restaurants' },
    { file: 'drones.json', name: 'Drones' },
    { file: 'orders.json', name: 'Orders' },
    { file: 'payments.json', name: 'Payments' },
    { file: 'notifications.json', name: 'Notifications' }
  ]

  for (const { file, name } of dataFiles) {
    try {
      console.log(`📥 Importing ${name} from ${file}...`)
      
      const filePath = path.join(__dirname, file)
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
      
      // Import each document
      const results = await Promise.all(
        data.map(doc => client.createOrReplace(doc))
      )
      
      console.log(`✅ Successfully imported ${results.length} ${name}`)
      
    } catch (error) {
      console.error(`❌ Error importing ${name}:`, error.message)
    }
    
    console.log('') // Empty line for readability
  }

  console.log('🎉 Data import completed!')
  console.log('\n📊 Summary:')
  console.log('- Users: Customer, Restaurant, Admin, Operator accounts')
  console.log('- Drones: 5 drones with different statuses') 
  console.log('- Orders: 3 orders in different stages (new, processing, delivered)')
  console.log('- Payments: 5 payment records with different methods and statuses')
  console.log('- Notifications: 8 notifications for different user types')
  
  console.log('\n🔗 Next steps:')
  console.log('1. Visit your Sanity Studio to see the imported data')
  console.log('2. Test the relationships between schemas')
  console.log('3. Add more sample data as needed')
  console.log('4. Configure your frontend app to use this data')
}

// Check for required environment variables
if (!process.env.SANITY_WRITE_TOKEN) {
  console.error('❌ Error: SANITY_WRITE_TOKEN environment variable is required')
  console.log('💡 Make sure you have a .env file with your Sanity write token')
  process.exit(1)
}

// Run the import
importData().catch(console.error)
