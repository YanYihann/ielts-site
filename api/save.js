export default async function handler(req, res) {
  // ===== CORS（GitHub Pages -> Vercel 必须）=====
  const origin = req.headers.origin || "";
  // 你可以把下面这行改成只允许你的 GitHub Pages 域名（更安全）
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Admin-Key");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  // ===== 简单鉴权（你一个人用）=====
  const key = req.headers["x-admin-key"];
  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ ok: false, error: "Unauthorized" });
  }

  const { content } = req.body || {};
  if (!Array.isArray(content)) {
    return res.status(400).json({ ok: false, error: "content must be an array []" });
  }

  const owner = "YanYihann";
  const repo = "ielts-site";
  const path = "data.json";
  const branch = "main";
  const token = process.env.GH_TOKEN;

  if (!token) return res.status(500).json({ ok: false, error: "Missing GH_TOKEN" });

  const ghHeaders = {
    "Accept": "application/vnd.github+json",
    "Authorization": `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
  };

  // 1) 读旧文件拿 sha
  const getUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}?ref=${encodeURIComponent(branch)}`;
  const getResp = await fetch(getUrl, { headers: ghHeaders });
  const getText = await getResp.text();
  if (!getResp.ok) {
    return res.status(getResp.status).json({ ok: false, error: "GET contents failed", detail: getText });
  }
  const getJson = JSON.parse(getText);
  const sha = getJson.sha;

  // 2) 写回（base64 编码）
  const raw = JSON.stringify(content, null, 2);
  const b64 = Buffer.from(raw, "utf8").toString("base64");

  const putUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`;
  const putBody = {
    message: `Update data.json via web editor`,
    content: b64,
    sha,
    branch,
  };

  const putResp = await fetch(putUrl, {
    method: "PUT",
    headers: { ...ghHeaders, "Content-Type": "application/json" },
    body: JSON.stringify(putBody),
  });

  const putText = await putResp.text();
  if (!putResp.ok) {
    return res.status(putResp.status).json({ ok: false, error: "PUT contents failed", detail: putText });
  }

  return res.status(200).json({ ok: true, result: JSON.parse(putText) });
}
