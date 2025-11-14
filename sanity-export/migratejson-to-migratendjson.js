// json-to-ndjson.js
const fs = require("fs");

const input = JSON.parse(fs.readFileSync("data-migrated.json", "utf8"));

// input phải là một mảng document
if (!Array.isArray(input)) {
  throw new Error("data-migrated.json phải là một mảng (Array)!");
}

// Mỗi dòng là 1 object JSON
const ndjson = input.map((doc) => JSON.stringify(doc)).join("\n");

fs.writeFileSync("data-migrated.ndjson", ndjson, "utf8");
console.log("✅ Đã tạo file data-migrated.ndjson");
