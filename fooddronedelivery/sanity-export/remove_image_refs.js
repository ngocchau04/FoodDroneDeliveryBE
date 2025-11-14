const fs = require("fs");
const input = "data_no_assets.ndjson";
const output = "data_clean.ndjson";

const lines = fs.readFileSync(input, "utf8").split("\n").filter(Boolean);

const cleaned = lines.map(line => {
  try {
    const obj = JSON.parse(line);

    // Hàm đệ quy để xoá mọi trường "_ref" bắt đầu bằng "image-"
    function removeImageRefs(o) {
      if (Array.isArray(o)) return o.map(removeImageRefs);
      if (o && typeof o === "object") {
        for (const key in o) {
          if (key === "_ref" && typeof o[key] === "string" && o[key].startsWith("image-")) {
            delete o[key];
          } else {
            o[key] = removeImageRefs(o[key]);
          }
        }
      }
      return o;
    }

    removeImageRefs(obj);
    return JSON.stringify(obj);
  } catch {
    return "";
  }
}).filter(Boolean);

fs.writeFileSync(output, cleaned.join("\n"));
console.log(`✅ File đã được làm sạch → ${output}`);
