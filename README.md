# LiSh - Link Shortener

[![Live Demo](https://img.shields.io/badge/demo-online-green?style=for-the-badge&logo=render)](https://lish-wdaw.onrender.com)
![node](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![express](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![mongo](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![vue](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)

LiSh is a minimalist link shortening service with automatic expiration. Short links automatically expire after 12 hours for privacy and resource management.

## Key Features

- **Instant URL shortening** - Convert long URLs to short, shareable links
- **Custom slugs** - Optionally define your own URL endings
- **Automatic expiration** - Links automatically expire after 12 hours
- **Simple UI** - Clean, intuitive interface built with Vue.js
- **Copy-to-clipboard** - One-click copying of generated links
- **Input validation** - Real-time URL format validation

## Installation & Setup

1. **Install dependencies**

```bash
npm install
```

2. **Configure environment**

```bash
# .env
PORT=5000
MONGO_URL=your_mongo_database
```

3. **Start server**

```bash
npn run dev
```

## Frontend Features

- **Vue.js 2** for reactive UI components
- **Responsive design** works on mobile and desktop
- **Animated error messages** for validation feedback
- **One-click copy** with visual feedback
- **Automatic link generation** with fallback for custom slugs

## Link Expiration Mechanism

Links are automatically removed after 12 hours using MongoDB's TTL feature:

```javascript
urls.createIndex({ createTime: 1 }, { expireAfterSeconds: 43_200 });
```

## Contributors

- **Development**: [bpieczek](https://github.com/bpieczek)
- **Design**: [dOnTaSkAbOuTmYnAmE](https://github.com/dOnTaSkAbOuTmYnAmE)
