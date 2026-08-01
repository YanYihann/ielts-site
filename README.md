# IELTS Writing Question Bank

雅思写作真题题库，支持按话题和年份筛选、中英文对照、观点编辑以及 JSON 导入导出。

## 稳定访问地址

- GitHub Pages: https://yanyihann.github.io/ielts-site/
- Vercel: https://ielts-site-indol.vercel.app/

请勿把 Vercel 自动生成的单次部署地址作为长期入口。这类地址对应具体部署，部署被删除后会返回 `DEPLOYMENT_NOT_FOUND`。

## 数据编辑

页面会自动加载根目录下的 `data.json`。观点输入会自动写入当前页面内存，可通过顶部按钮导出 JSON，也可以通过 Vercel API 提交回 GitHub。

Vercel 保存接口需要配置以下环境变量：

- `ADMIN_KEY`: 页面保存时输入的管理密钥
- `GH_TOKEN`: 具有该仓库 Contents 写权限的 GitHub token
- `ALLOWED_ORIGINS`: 可选，逗号分隔的额外允许来源

## 本地预览

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

然后打开 `http://127.0.0.1:4173/`。
