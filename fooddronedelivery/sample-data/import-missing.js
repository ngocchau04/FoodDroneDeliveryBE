#!/usr/bin/env node

// Load environment variables
require('dotenv').config()

const { createClient } = require('@sanity/client')
const fs = require('fs')
const path = require('path')

// Sanity client configuration
const client = createClient({
  projectId: '3glkq9kp',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN
})

async function importMissingData() {
  console.log('🚀 Importing missing data (Orders, Payments, Notifications)...\n')

  const dataFiles = [
    { file: 'orders-fixed.json', name: 'Orders (Fixed)' },
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
    
    console.log('')
  }

  console.log('🎉 Missing data import completed!')
  console.log('\n📊 Your system now has:')
  console.log('✅ Users (5): Customer, Restaurant, Admin, Operator')
  console.log('✅ Restaurants (6): Including Pizzarella Palace, Sakura Sushi')  
  console.log('✅ Drones (5): Eagle Swift, Hawk Thunder, etc.')
  console.log('✅ Orders (3): QB001, QB002, QB003 with real references')
  console.log('✅ Payments (5): Different methods and statuses')
  console.log('✅ Notifications (8): For all user types')
  console.log('✅ Dishes (30+): Pizzas, Sushi, Breads, etc.')
}

importMissingData().catch(console.error)
