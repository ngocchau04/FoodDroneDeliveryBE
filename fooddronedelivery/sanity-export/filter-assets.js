// filter-assets.js
const fs = require("fs");

const inputFile = "data-migrated.json";          // file JSON sau migrate ref
const outputFile = "data-migrated-noassets.json";

const docs = JSON.parse(fs.readFileSync(inputFile, "utf8"));

if (!Array.isArray(docs)) {
  throw new Error("data-migrated.json phải là một mảng (Array)!");
}

const filtered = docs.filter((doc) => {
  // Loại bỏ:
  // - Doc có _type là sanity.imageAsset hoặc sanity.fileAsset
  // - Hoặc _id bắt đầu bằng "image-" (thường là asset id)
  if (doc._type === "sanity.imageAsset" || doc._type === "sanity.fileAsset") {
    return false;
  }
  if (typeof doc._id === "string" && doc._id.startsWith("image-")) {
    return false;
  }
  return true;
});

console.log(`Tổng docs ban đầu: ${docs.length}`);
console.log(`Sau khi lọc: ${filtered.length}`);

fs.writeFileSync(outputFile, JSON.stringify(filtered, null, 2), "utf8");
console.log(`✅ Đã tạo file ${outputFile} (không còn asset docs).`);
