#!/usr/bin/env node

const fs = require('fs')

// Read the order schema file
const orderSchema = fs.readFileSync('d:\\CongNghePhanMem\\FoodDroneDeliveryBE\\fooddronedelivery\\schemas\\order.ts', 'utf8')

// Find all field names
const fieldMatches = orderSchema.match(/name:\s*['"]([\w\d_]+)['"]/g)
const fieldNames = fieldMatches ? fieldMatches.map(match => match.match(/['"]([\w\d_]+)['"]/)[1]) : []

// Check for duplicates
const fieldCounts = {}
fieldNames.forEach(name => {
  fieldCounts[name] = (fieldCounts[name] || 0) + 1
})

console.log('🔍 Checking for duplicate field names in order.ts...\n')

let hasDuplicates = false
Object.keys(fieldCounts).forEach(fieldName => {
  if (fieldCounts[fieldName] > 1) {
    console.log(`❌ Duplicate field: "${fieldName}" appears ${fieldCounts[fieldName]} times`)
    hasDuplicates = true
  }
})

if (!hasDuplicates) {
  console.log('✅ No duplicate field names found!')
  console.log(`\n📊 Total unique fields: ${Object.keys(fieldCounts).length}`)
  
  console.log('\n📝 All fields:')
  Object.keys(fieldCounts).sort().forEach(name => {
    console.log(`   - ${name}`)
  })
} else {
  console.log('\n⚠️  Please fix duplicate fields in order schema!')
}
