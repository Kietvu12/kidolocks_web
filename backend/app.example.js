// app.js
const express = require("express");
const crypto = require("crypto");
const moment = require("moment");

const app = express();
const port = 7000;

// ================== CONFIG VNPAY ==================
const vnp_TmnCode = "DHXDTEST";
const vnp_HashSecret = "00N0EYXHIRGRWYSVYU2J5YJQFKINETWE";
const vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
const vnp_ReturnUrl = "http://localhost:7000/vnpay_return";

// Helper: lấy IP client
function getClientIp(req) {
  let ip =
    (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    req.ip ||
    "127.0.0.1";
  if (!ip) ip = "127.0.0.1";
  if (ip.startsWith("::ffff:")) ip = ip.replace("::ffff:", "");
  if (ip === "::1") ip = "127.0.0.1";
  if (ip.includes("%")) ip = ip.split("%")[0];
  return ip;
}

// Sort object keys
function sortObject(obj) {
  const sorted = {};
  Object.keys(obj)
    .sort()
    .forEach((k) => {
      sorted[k] = obj[k];
    });
  return sorted;
}

// Encode theo chuẩn VNPAY (dùng + thay vì %20)
function encodeVnpay(value) {
  return encodeURIComponent(value).replace(/%20/g, "+");
}

// Build signData và URL
function buildVnpUrl(params) {
  params = sortObject(params);

  const encoded = {};
  const parts = [];
  Object.keys(params).forEach((k) => {
    if (!params[k]) return;
    const v = String(params[k]);
    const ev = encodeVnpay(v);
    encoded[k] = ev;
    parts.push(`${k}=${ev}`);
  });

  const signData = parts.join("&");

  const hmac = crypto.createHmac("sha512", vnp_HashSecret);
  const signature = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  encoded["vnp_SecureHash"] = signature;
  encoded["vnp_SecureHashType"] = "SHA512";

  const qs = Object.keys(encoded)
    .map((k) => `${k}=${encoded[k]}`)
    .join("&");

  return { url: `${vnp_Url}?${qs}`, signData, signature };
}

// ========== ROUTES ==========

app.get("/", (req, res) => {
  res.send(`<h2>Demo VNPAY QR</h2>
    <a href="/create_payment">Tạo thanh toán 100,000 VND (Hiện QR)</a>`);
});

app.get("/create_payment", (req, res) => {
  const now = new Date();
  const createDate = moment(now).format("YYYYMMDDHHmmss");
  const orderId = moment(now).format("HHmmss");
  const amount = 100000; // VND

  const ipAddr = getClientIp(req);

  let vnp_Params = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: vnp_TmnCode,
    vnp_Locale: "vn",
    vnp_CurrCode: "VND",
    vnp_TxnRef: orderId,
    vnp_OrderInfo: "Thanh toan don hang " + orderId,
    vnp_OrderType: "other",
    vnp_Amount: String(amount * 100), // nhân 100
    vnp_ReturnUrl: vnp_ReturnUrl,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: createDate,
    // ❌ KHÔNG TRUYỀN vnp_BankCode => tự động hiện QR
    // vnp_BankCode: "VNPAYQR", // Nếu muốn ép QR thì mở dòng này
  };

  const { url, signData, signature } = buildVnpUrl(vnp_Params);

  console.log("=== DEBUG SIGN DATA ===");
  console.log(signData);
  console.log("=== DEBUG SIGNATURE ===");
  console.log(signature);
  console.log("=== PAYMENT URL ===");
  console.log(url);

  res.redirect(url);
});

app.get("/vnpay_return", (req, res) => {
  const query = { ...req.query };
  const secureHash = query.vnp_SecureHash;
  delete query.vnp_SecureHash;
  delete query.vnp_SecureHashType;

  const sorted = sortObject(query);
  const parts = [];
  Object.keys(sorted).forEach((k) => {
    if (!sorted[k]) return;
    parts.push(`${k}=${encodeVnpay(String(sorted[k]))}`);
  });
  const signData = parts.join("&");

  const hmac = crypto.createHmac("sha512", vnp_HashSecret);
  const computed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  console.log("=== RETURN SIGN DATA ===");
  console.log(signData);
  console.log("=== RETURN COMPUTED HASH ===");
  console.log(computed);
  console.log("=== RETURN RECEIVED HASH ===");
  console.log(secureHash);

  if (!secureHash) {
    return res.send("Không có vnp_SecureHash trong query");
  }

  if (computed === secureHash.toLowerCase()) {
    res.send("Thanh toán được xác thực ✅<br/><pre>" + JSON.stringify(req.query, null, 2) + "</pre>");
  } else {
    res.send("Sai chữ ký ❌<br/>Xem console server để debug.");
  }
});

app.listen(port, () => {
  console.log(`Server chạy tại http://localhost:${port}`);
});