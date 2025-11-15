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

async function checkAllData() {
  console.log('📊 Checking all data in system...\n')

  try {
    // Check orders
    const orders = await client.fetch('*[_type == "order"]{_id, orderId, status, customer->{fullName}}')
    console.log('📦 Orders:')
    if (orders.length > 0) {
      orders.forEach(o => console.log(`   - ${o.orderId} (${o.status}): ${o.customer?.fullName}`))
    } else {
      console.log('   - No orders found')
    }
    
    // Check users
    const users = await client.fetch('*[_type == "user"]{_id, fullName, role}')
    console.log(`\n👥 Users (${users.length}):`)
    users.slice(0, 3).forEach(u => console.log(`   - ${u.fullName} (${u.role})`))
    
    // Check drones
    const drones = await client.fetch('*[_type == "drone"]{_id, name, status}')
    console.log(`\n🚁 Drones (${drones.length}):`)
    drones.slice(0, 3).forEach(d => console.log(`   - ${d.name} (${d.status})`))
    
    // Check payments
    const payments = await client.fetch('*[_type == "payment"]{_id, paymentId, status}')
    console.log(`\n💳 Payments (${payments.length}):`)
    payments.slice(0, 3).forEach(p => console.log(`   - ${p.paymentId} (${p.status})`))
    
    // Check notifications
    const notifications = await client.fetch('*[_type == "notification"]{_id, title, type}')
    console.log(`\n🔔 Notifications (${notifications.length}):`)
    notifications.slice(0, 3).forEach(n => console.log(`   - ${n.title} (${n.type})`))
    
    console.log('\n✅ Data import status check completed!')
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

checkAllData()
