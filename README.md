<div align="center">

# IELTS Writing Question Bank

雅思写作真题题库：按话题与年份检索，支持中英文对照、观点编辑和 JSON 导入导出。

[GitHub Pages](https://yanyihann.github.io/ielts-site/) · [Vercel](https://ielts-site-indol.vercel.app/)

[![Static Site](https://img.shields.io/badge/app-static%20HTML-0b0f14)](index.html)
[![Questions](https://img.shields.io/badge/data-JSON-4ea1ff)](data.json)

</div>

## 功能

- 按年份、话题与关键词筛选写作题目
- 中英文题目对照
- 在浏览器中编辑观点与学习笔记
- 导入、导出完整 JSON 数据
- 通过可选的 Vercel API 将数据提交回 GitHub
- 深色响应式界面，适合桌面和移动端使用

## 稳定访问地址

- GitHub Pages：<https://yanyihann.github.io/ielts-site/>
- Vercel：<https://ielts-site-indol.vercel.app/>

请勿把 Vercel 自动生成的单次部署地址作为长期入口；这类地址对应具体部署，删除后会失效。

## 本地运行

```bash
git clone https://github.com/YanYihann/ielts-site.git
cd ielts-site
python -m http.server 4173 --bind 127.0.0.1
```

打开 `http://127.0.0.1:4173/`。

## 数据与保存

页面启动时读取根目录的 `data.json`。编辑内容首先保存在当前页面状态中，可随时导出 JSON 备份。

远程保存接口位于 `api/`，部署到 Vercel 时需要配置：

| 变量 | 用途 |
| --- | --- |
| `ADMIN_KEY` | 前端提交保存请求时使用的管理密钥 |
| `GH_TOKEN` | 对本仓库具有 Contents 写权限的 GitHub token |
| `ALLOWED_ORIGINS` | 可选；额外允许来源，以逗号分隔 |

> [!CAUTION]
> 不要把 `ADMIN_KEY` 或 `GH_TOKEN` 写入前端代码、`data.json` 或提交记录。建议为 token 设置最小仓库权限并定期轮换。

## 项目结构

```text
api/          Vercel 保存接口
data.json     题库与观点数据
favicon.svg   网站图标
index.html    单页应用
```

## 内容说明

题目数据用于个人学习与整理。正式备考时请同时核对可靠来源；仓库未声明其覆盖完整性或官方属性。

## License

仓库当前未包含许可证文件。


