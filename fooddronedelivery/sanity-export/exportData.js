// import Sanity client
import { createClient } from "@sanity/client";
import fs from "fs";

// tạo client kết nối tới project Sanity public
const client = createClient({
  projectId: "qxr3am6t", // projectId từ app QuickBite
  dataset: "production",
  apiVersion: "2022-02-01",
  useCdn: true, // chỉ đọc public data
});

async function exportData() {
  try {
    console.log("📡 Fetching data from Sanity...");
    const query = '*[]'; // lấy toàn bộ dữ liệu
    const data = await client.fetch(query);

    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
    console.log(`✅ Export thành công (${data.length} records) -> data.json`);
  } catch (err) {
    console.error("❌ Lỗi:", err.message);
  }
}

exportData();
