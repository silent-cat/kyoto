# server 后端

## 目录结构

```
server
├── admin //打包好的前端代码
│ ├── css 
│ ├── favicon.ico
│ ├── fonts 
│ ├── index.html
│ └── js
├── index.js //入口文件
├── middleware //专用中间件
│ ├── auth.js //登录校验
│ └── resource.js //确定模型
├── models //模型
│ ├── Ad.js
│ ├── AdminUser.js
│ ├── Article.js
│ ├── Category.js
│ ├── Character.js
│ └── Item.js
├── package-lock.json
├── package.json
├── plugins
│ └── db.js
├── README.md
├── routes
│ └── admin
└── uploads
```

## 运行步骤

### 安装依赖包

```
npm install
```

### 启动服务器

```
npm run serve
```

### 预览地址

```
http://localhost:3000/admin/#/login
```
