# 💰 Gestor de Finanzas Personales

Aplicación web para llevar un control personal de ingresos y egresos mensuales. Permite registrar transacciones, visualizar el balance mediante gráficos y gestionar múltiples usuarios de forma segura con autenticación JWT.

---

## 🚀 Características

- Registro y login de usuarios con autenticación JWT
- Rutas privadas — cada usuario solo ve sus propias transacciones
- Dashboard con resumen de ingresos, gastos y balance neto
- Gráfico de barras (Flujo) y gráfico de torta (Balance)
- CRUD completo de transacciones (crear, leer, editar, eliminar)
- Listado de movimientos con fecha y descripción

---

## 🛠️ Tecnologías

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- [JSON Web Tokens (JWT)](https://jwt.io/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) — encriptación de contraseñas
- [dotenv](https://www.npmjs.com/package/dotenv)

### Frontend
- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [React Router DOM](https://reactrouter.com/)
- [Bootstrap 5](https://getbootstrap.com/)
- Context API para manejo de estado global

---

## 📁 Estructura del proyecto

```
gestor-finanzas-personales/
├── backend/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── transaccion.controller.js
│   ├── database/
│   │   └── database.js
│   ├── middlewares/
│   │   └── auth.middleware.js
│   ├── models/
│   │   ├── transaccion.js
│   │   └── usuario.js
│   ├── routes/
│   │   ├── auth.route.js
│   │   └── transaccion.route.js
│   └── index.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── FormComponent.jsx
    │   │   ├── ListadoComponent.jsx
    │   │   ├── NavbarComponent.jsx
    │   │   └── RutaPrivada.jsx
    │   ├── context/
    │   │   ├── TransaccionContext.js
    │   │   └── TransaccionProvider.jsx
    │   ├── pages/
    │   │   ├── home/
    │   │   │   └── Home.jsx
    │   │   ├── login/
    │   │   │   └──LoginPage.jsx
    │   │   └── register/
    │   │       └──RegisterPage.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── index.html
```

---

## ⚙️ Instalación y uso local

### Requisitos previos
- Node.js v18+
- MongoDB corriendo localmente (o una URI de MongoDB Atlas)

### 1. Clonar el repositorio

```bash
git clone https://github.com/natanaelDominguez28/gestor-finanzas-personales.git
cd gestor-finanzas-personales
```

### 2. Configurar el backend

```bash
cd backend
npm install
```

Crear un archivo `.env` en la carpeta `backend/`:

```env
JWT_SECRET=tu_clave_secreta_aqui
PORT=3000
```

Iniciar el servidor:

```bash
node index.js
```

El backend quedará corriendo en `http://localhost:3000`

### 3. Configurar el frontend

```bash
cd ../frontend
npm install
npm run dev
```

El frontend quedará disponible en `http://localhost:5173`

---

## 🔐 Variables de entorno

| Variable     | Descripción                            | Requerida |
|--------------|----------------------------------------|-----------|
| `JWT_SECRET` | Clave secreta para firmar los tokens   | ✅ Sí     |
| `PORT`       | Puerto del servidor (default: 3000)    | ❌ No     |

---

## 📌 Endpoints de la API

### Autenticación
| Método | Ruta             | Descripción          |
|--------|------------------|----------------------|
| POST   | `/auth/registro` | Crear nueva cuenta   |
| POST   | `/auth/login`    | Iniciar sesión       |

### Transacciones *(requieren token JWT)*
| Método | Ruta                  | Descripción                  |
|--------|-----------------------|------------------------------|
| GET    | `/transacciones`      | Obtener todas las propias    |
| GET    | `/transacciones/:id`  | Obtener una transacción      |
| POST   | `/transacciones`      | Crear nueva transacción      |
| PUT    | `/transacciones/:id`  | Editar una transacción       |
| DELETE | `/transacciones/:id`  | Eliminar una transacción     |

---

## 👤 Autor

**Natanael Dominguez**  
[GitHub](https://github.com/natanaelDominguez28)
