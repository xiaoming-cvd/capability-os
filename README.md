# 能力原子库 · Capability Atom Base

清微子的个人能力底座：把能力拆成最小可迁移单元，学习新东西前先查这里——能复用的直接复用，缺口单独补，无连接的不学。

推送到 GitHub 后自动部署为在线页面（GitHub Actions → GitHub Pages）。

## 在线地址

**https://xiaoming-cvd.github.io/capability-os/**

## 更新能力原子

所有数据在一个文件里：`src/data/atoms.ts`。

每个原子是一条记录：抽象定义、实证场景、可迁移方向、关键词、与其他原子的连接、熟练度、状态（core / active / weak / pruned）。仿照现有条目增删即可，保存后推送，页面自动更新。

## 本地运行

```bash
npm install
npm run dev
```

构建：`npm run build`，产物在 `dist/`。
