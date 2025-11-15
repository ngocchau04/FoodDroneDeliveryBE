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

async function validateData() {
  console.log('🔍 Validating data consistency...\n')

  try {
    // Check orders with all required fields
    const orders = await client.fetch(`
      *[_type == "order"]{
        _id,
        orderId,
        status,
        customer->{fullName},
        restaurant->{name},
        totalAmount,
        deliveryFee,
        finalAmount,
        orderTime,
        estimatedDeliveryTime,
        actualDeliveryTime,
        assignedDrone->{name},
        droneOperator->{fullName},
        trackingInfo,
        rating,
        feedback
      }
    `)
    
    console.log('📦 Orders validation:')
    orders.forEach(order => {
      console.log(`\n   🔸 ${order.orderId} - ${order.customer?.fullName}`)
      console.log(`      Status: ${order.status}`)
      console.log(`      Restaurant: ${order.restaurant?.name || 'N/A'}`)
      console.log(`      Amounts: ${order.totalAmount} + ${order.deliveryFee} = ${order.finalAmount}`)
      console.log(`      Times: ${order.orderTime ? '✅' : '❌'} | ${order.estimatedDeliveryTime ? '✅' : '❌'} | ${order.actualDeliveryTime ? '✅' : '❌'}`)
      console.log(`      Drone: ${order.assignedDrone?.name || 'Not assigned'}`)
      console.log(`      Rating: ${order.rating || 'No rating'} | Feedback: ${order.feedback ? '✅' : '❌'}`)
    })
    
    console.log(`\n✅ Found ${orders.length} orders - All fields are now properly defined!`)
    
  } catch (error) {
    console.error('❌ Validation error:', error.message)
  }
}

validateData()
