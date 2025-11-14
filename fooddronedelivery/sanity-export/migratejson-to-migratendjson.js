// json-to-ndjson.js
const fs = require("fs");

const input = JSON.parse(fs.readFileSync("data-migrated-noassets.json", "utf8"));

if (!Array.isArray(input)) {
  throw new Error("data-migrated-noassets.json phải là một mảng (Array)!");
}

const ndjson = input.map((doc) => JSON.stringify(doc)).join("\n");

fs.writeFileSync("data-migrated-noassets.ndjson", ndjson, "utf8");
console.log("✅ Đã tạo file data-migrated-noassets.ndjson");
