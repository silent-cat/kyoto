# admin 前端

## 目录结构

```
admin
├── babel.config.js
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── README.md
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── logo.png
│   │   └── style.css
│   ├── components
│   │   └── HelloWorld.vue
│   ├── http.js
│   ├── main.js
│   ├── plugins
│   │   └── element.js
│   ├── router
│   │   └── index.js
│   └── views
│       ├── AdEdit.vue
│       ├── AdList.vue
│       ├── AdminUserEdit.vue
│       ├── AdminUserList.vue
│       ├── ArticleEdit.vue
│       ├── ArticleList.vue
│       ├── CategoryEdit.vue
│       ├── CategoryList.vue
│       ├── CharacterEdit.vue
│       ├── CharacterList.vue
│       ├── ItemEdit.vue
│       ├── ItemList.vue
│       ├── Login.vue
│       └── Main.vue
├── README.md
└── vue.config.js
```

## 运行步骤

### 安装依赖包

```
npm install
```

### 本地运行

```
npm run serve
```

### 打包

```
npm run build 注：打包的地址可在vue.config.js中进行更改
```
