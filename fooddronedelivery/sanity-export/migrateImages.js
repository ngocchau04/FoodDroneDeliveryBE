// migrateImages.js
require("dotenv").config();
const fs = require("fs");
const fetch = require("node-fetch");
const { createClient } = require("@sanity/client");

// ====== CONFIG ======

// Project cũ (QuickBite)
const OLD_PROJECT_ID = "qxr3am6t";
const OLD_DATASET = "production";

// Project mới (FoodDroneDelivery của bạn)
// ĐỔI LẠI nếu projectId / dataset khác
const NEW_PROJECT_ID = "3glkq9kp"; // kiểm tra lại cho đúng
const NEW_DATASET = "production";

const client = createClient({
  projectId: NEW_PROJECT_ID,
  dataset: NEW_DATASET,
  apiVersion: "2023-01-01",
  token: process.env.SANITY_WRITE_TOKEN, // cần quyền write
  useCdn: false,
});

// ====== HÀM HỖ TRỢ ======

function refToUrl(ref) {
  // ref dạng: image-<hash>-<size>-<format>
  const parts = ref.split("-");
  if (parts.length < 4) {
    throw new Error(`Ref không hợp lệ: ${ref}`);
  }

  const hash = parts[1];
  const size = parts[2];
  const format = parts[3];

  return `https://cdn.sanity.io/images/${OLD_PROJECT_ID}/${OLD_DATASET}/${hash}-${size}.${format}`;
}

async function downloadBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Download thất bại ${url}: ${res.status} ${res.statusText}`);
  }
  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function uploadImage(buffer, filename) {
  const asset = await client.assets.upload("image", buffer, { filename });
  // asset._id ví dụ: "image-xxxx-800x600-png"
  return asset._id;
}

// Duyệt object/array đệ quy
function traverse(node, cb) {
  if (Array.isArray(node)) {
    node.forEach((item) => traverse(item, cb));
  } else if (node && typeof node === "object") {
    cb(node);
    Object.values(node).forEach((value) => traverse(value, cb));
  }
}

// Lấy tất cả asset ref
function collectImageRefs(root) {
  const refs = new Set();

  traverse(root, (node) => {
    if (
      node.asset &&
      typeof node.asset._ref === "string" &&
      node.asset._ref.startsWith("image-")
    ) {
      refs.add(node.asset._ref);
    }
  });

  return Array.from(refs);
}

// Thay ref cũ bằng ref mới
function replaceImageRefs(root, refMap) {
  traverse(root, (node) => {
    if (
      node.asset &&
      typeof node.asset._ref === "string" &&
      refMap[node.asset._ref]
    ) {
      node.asset._ref = refMap[node.asset._ref];
    }
  });
}

// ====== MAIN ======

(async () => {
  try {
    console.log("Đọc file data.json...");
    const raw = fs.readFileSync("data.json", "utf8");
    const docs = JSON.parse(raw);

    console.log("Tìm tất cả image.asset._ref...");
    const refs = collectImageRefs(docs);
    console.log(`Tìm được ${refs.length} ảnh cần migrate.`);

    const refMap = {}; // oldRef -> newRef

    let index = 0;
    for (const ref of refs) {
      index++;
      console.log(`\n[${index}/${refs.length}] Đang xử lý: ${ref}`);

      const url = refToUrl(ref);
      console.log("URL cũ:", url);

      const buffer = await downloadBuffer(url);
      console.log("  ✓ Đã tải ảnh");

      const ext = ref.split("-").pop() || "jpg";
      const filename = `migrated_${index}.${ext}`;
      const newId = await uploadImage(buffer, filename);
      console.log("  ✓ Đã upload vào project mới, _id =", newId);

      refMap[ref] = newId;
    }

    console.log("\nThay thế ref cũ bằng ref mới trong JSON...");
    replaceImageRefs(docs, refMap);

    console.log("Ghi ra file data-migrated.json...");
    fs.writeFileSync("data-migrated.json", JSON.stringify(docs, null, 2), "utf8");

    console.log("\n✅ DONE! Bạn đã có data-migrated.json với _ref image thuộc project mới.");
  } catch (err) {
    console.error("Lỗi:", err);
    process.exit(1);
  }
})();
