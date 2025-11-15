const fs = require('fs');
const path = require('path');

console.log('🔍 Checking all schemas and sample data consistency...\n');

// Define schemas and their corresponding data files
const schemaFiles = {
  'user': '../schemas/user.ts',
  'order': '../schemas/order.ts', 
  'drone': '../schemas/drone.ts',
  'payment': '../schemas/payment.ts',
  'notification': '../schemas/notification.ts'
};

const dataFiles = {
  'user': 'users.json',
  'order': 'orders-fixed.json',
  'drone': 'drones.json', 
  'payment': 'payments.json',
  'notification': 'notifications.json'
};

// Function to extract field names from schema files
function extractSchemaFields(schemaContent) {
  const fieldMatches = schemaContent.match(/name:\s*['"]([^'"]+)['"]/g) || [];
  return fieldMatches.map(match => {
    const fieldName = match.match(/name:\s*['"]([^'"]+)['"]/)[1];
    return fieldName;
  }).filter(field => 
    // Exclude these system/meta fields
    !['_type', '_id', '_ref', '_key'].includes(field)
  );
}

// Function to extract field names from sample data
function extractDataFields(dataContent) {
  const allFields = new Set();
  
  dataContent.forEach(item => {
    function getFields(obj, prefix = '') {
      Object.keys(obj).forEach(key => {
        if (key.startsWith('_') && ['_type', '_id', '_ref', '_key'].includes(key)) {
          return; // Skip system fields
        }
        
        const fullKey = prefix ? `${prefix}.${key}` : key;
        
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key]) && !obj[key]._type) {
          // It's a nested object, recurse
          getFields(obj[key], fullKey);
        } else {
          allFields.add(fullKey);
        }
      });
    }
    getFields(item);
  });
  
  return Array.from(allFields);
}

// Check each schema
Object.keys(schemaFiles).forEach(schemaName => {
  console.log(`📋 Checking ${schemaName.toUpperCase()} schema and data...`);
  
  try {
    // Read schema file
    const schemaPath = path.join(__dirname, schemaFiles[schemaName]);
    const schemaContent = fs.readFileSync(schemaPath, 'utf8');
    const schemaFields = extractSchemaFields(schemaContent);
    
    // Read data file
    const dataPath = path.join(__dirname, dataFiles[schemaName]);
    const dataContent = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const dataFields = extractDataFields(dataContent);
    
    console.log(`   📊 Schema fields (${schemaFields.length}):`, schemaFields.sort().join(', '));
    console.log(`   📄 Data fields (${dataFields.length}):`, dataFields.sort().join(', '));
    
    // Find missing fields in schema
    const missingInSchema = dataFields.filter(field => {
      const baseField = field.split('.')[0];
      return !schemaFields.includes(baseField) && !schemaFields.includes(field);
    });
    
    // Find missing fields in data
    const missingInData = schemaFields.filter(field => {
      return !dataFields.some(dataField => dataField.startsWith(field));
    });
    
    if (missingInSchema.length > 0) {
      console.log(`   ❌ Fields in data but missing in schema:`, missingInSchema.join(', '));
    } else {
      console.log(`   ✅ All data fields are defined in schema`);
    }
    
    if (missingInData.length > 0) {
      console.log(`   ⚠️  Fields in schema but missing in data:`, missingInData.join(', '));
    } else {
      console.log(`   ✅ All schema fields have sample data`);
    }
    
    console.log(`   📝 Total sample records: ${dataContent.length}`);
    
  } catch (error) {
    console.log(`   ❌ Error checking ${schemaName}:`, error.message);
  }
  
  console.log('');
});

console.log('🎯 Schema consistency check completed!');
console.log('📁 Ready to import data with: npm run import');
console.log('🌐 Check Sanity Studio for any remaining warnings.');
