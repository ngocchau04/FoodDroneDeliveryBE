#!/usr/bin/env node

const fs = require('fs')

// Read the order schema file
const orderSchema = fs.readFileSync('../schemas/order.ts', 'utf8')

// Split by lines and find field definitions with proper nesting
const lines = orderSchema.split('\n')
let currentLevel = 0
let inObject = false
let objectName = ''

console.log('🔍 Order Schema Structure:')
console.log('=' .repeat(50))

lines.forEach((line, index) => {
  const trimmed = line.trim()
  
  // Track object nesting
  if (trimmed.includes('{') && trimmed.includes('name:')) {
    const nameMatch = trimmed.match(/name:\s*['"]([\w\d_]+)['"]/)
    if (nameMatch) {
      const fieldName = nameMatch[1]
      const typeMatch = trimmed.match(/type:\s*['"]([\w\d_]+)['"]/)
      const type = typeMatch ? typeMatch[1] : 'unknown'
      
      if (type === 'object') {
        console.log(`${'  '.repeat(currentLevel)}📁 ${fieldName} (object)`)
        currentLevel++
        objectName = fieldName
        inObject = true
      } else {
        console.log(`${'  '.repeat(currentLevel)}📄 ${fieldName} (${type})`)
      }
    }
  } else if (trimmed.match(/^\s*name:\s*['"][\w\d_]+['"]/)) {
    const nameMatch = trimmed.match(/name:\s*['"]([\w\d_]+)['"]/)
    if (nameMatch) {
      const fieldName = nameMatch[1]
      console.log(`${'  '.repeat(currentLevel)}📄 ${fieldName}`)
    }
  }
  
  // Track closing braces
  if (trimmed === '},' || trimmed === '}') {
    if (inObject && currentLevel > 0) {
      currentLevel--
      if (currentLevel === 0) {
        inObject = false
        objectName = ''
      }
    }
  }
})
