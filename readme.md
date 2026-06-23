# The wild Oasis

酒店内部管理系统，供员工日常使用。支持预订管理、小屋管理、员工账户配置，并集成 AI 智能助手。

\*\*在线演示：https://the-wild-oasis-saga.netlify.app

---

## 功能模块

- 📋 **预订管理** — 查看、筛选和处理所有客房预订
- 🏠 **小屋管理** — 新增和编辑小屋信息、图片与定价
- 👥 **用户管理** — 注册和管理内部员工账号
- ⚙️ **系统设置** — 配置早餐价格、预订规则等参数
- 🤖 **AI 助手** — 基于 DeepSeek 的智能客服，支持流式输出
- 🌙 **深色模式** — 完整明暗主题切换

## 技术栈

| 类别     | 技术                             |
| -------- | -------------------------------- |
| 框架     | React 18                         |
| 构建工具 | Vite                             |
| 样式方案 | Styled Components                |
| 路由     | React Router v6                  |
| 后端服务 | Supabase（数据库 + 鉴权 + 存储） |
| AI 接口  | DeepSeek API（SSE 流式输出）     |
| 部署     | Vercel                           |

## 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

> 需要配置 Supabase 项目和 DeepSeek API Key，运行前请设置对应环境变量。

## 目录结构

src/

├── features/ # 模块功能（预订、小屋、仪表盘等）

├── ui/ # 通用 UI 组件

├── services/ # Supabase 接口封装

├── hooks/ # 自定义 Hook

└──pages/ # 路由页面组件
