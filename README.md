# 能力原子库 · Capability Atom Base

清微子的个人能力底座：把能力拆成最小可迁移单元，学习新东西前先查这里——能复用的直接复用，缺口单独补，无连接的不学。

推送到 GitHub 后自动部署为在线页面（GitHub Actions → GitHub Pages）。

## 在线查看

推送到 `main` 分支约 1-2 分钟后，页面发布在：

```
https://<你的GitHub用户名>.github.io/<仓库名>/
```

## 更新能力原子

所有数据在一个文件里：`src/data/atoms.ts`。

每个原子是一条记录：抽象定义、实证场景、可迁移方向、关键词、与其他原子的连接、熟练度、状态（core / active / weak / pruned）。仿照现有条目增删即可，保存后推送，页面自动更新。

## 本地运行

```bash
npm install
npm run dev
```

构建：`npm run build`，产物在 `dist/`。

## 首次推送步骤

```bash
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

然后在仓库 **Settings → Pages** 里把 Source 设为 **GitHub Actions**（只需设一次），之后的每次推送都会自动重新部署。
