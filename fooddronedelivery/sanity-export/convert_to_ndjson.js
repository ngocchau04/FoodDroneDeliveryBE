const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
const ndjson = data.map(obj => JSON.stringify(obj)).join('\n');
fs.writeFileSync('data.ndjson', ndjson);
console.log('✅ Đã chuyển thành công -> data.ndjson');
