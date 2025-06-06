# ES: Prueba técnica: CRUD de Usuarios con REST API y TCP

- Desarrolla una REST API con un conjunto de funciones CRUD para gestionar usuarios.
- Sólo está permitido usar módulos nativos de nodejs
- En el caso del web server, debe ser creado con primitivas TCP.

# EN: Technical Test: User CRUD with REST API and TCP

- Develop a REST API with a set of CRUD functions to manage users.
- Only native Node.js modules are allowed
- In the case of the web server, it must be created using TCP primitives.

////////// JOSUE SOLUTION

# 🧠 Node.js User CRUD API Server using TCP Sockets

A lightweight RESTful API server built from scratch in Node.js using only the `net` module. It supports full CRUD operations on user data (Create, Read, Update, Delete) and handles HTTP requests manually — great for learning the internals of how web servers work.

---

## ✨ Features

- ✅ Custom HTTP request parsing and routing (no Express or HTTP module)
- ✅ Full CRUD operations for users
- ✅ Simple validation and error handling
- ✅ In-memory data store
- ✅ CORS headers for frontend consumption
- ✅ UUID fallback support
- ✅ Handles CORS preflight (`OPTIONS`) requests

---

---

## 📦 Requirements

- Node.js v12 or later
- No external dependencies

---

## 🚀 Getting Started

### 1. Clone or Create the File

```bash
git clone https://github.com/your-username/user-crud-api-server.git
cd user-crud-api-server