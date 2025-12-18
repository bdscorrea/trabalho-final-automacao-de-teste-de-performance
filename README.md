# E-commerce REST API

A simple e-commerce REST API built with JavaScript and Express.js that allows users to register, login with JWT authentication, and perform checkouts with cash or credit card payments.

## Description

This API provides a complete e-commerce backend solution with the following features:
- User registration and authentication using JWT tokens
- Secure checkout process with payment method validation
- Cash payments with 10% discount
- Credit card payments with no discount
- Health check endpoint for monitoring
- Complete API documentation with Swagger UI

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd atd-2025
```

2. Install dependencies:
```bash
npm install
```

## How to Run

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000` by default.

## Rules

### Checkout Rules
- **Payment Methods**: Only cash and credit card are accepted
- **Cash Discount**: Cash payments receive a 10% discount
- **Authentication**: Only authenticated users can perform checkout
- **Product Validation**: Products must exist and have sufficient stock

### API Rules
- **Endpoints**: Only 4 endpoints are available (login, register, checkout, healthcheck)
- **Data Storage**: Everything runs in memory (no database)
- **JWT Authentication**: Required for checkout endpoint
- **Input Validation**: All inputs are validated for security

## Data Already Existent

### Users (3 default users)
| ID | Email | Password | Name |
|----|-------|----------|------|
| 1 | john@example.com | password123 | John Doe |
| 2 | jane@example.com | password456 | Jane Smith |
| 3 | bob@example.com | password789 | Bob Johnson |

### Products (3 default products)
| ID | Name | Description | Price | Stock |
|----|------|-------------|-------|-------|
| 1 | Laptop | High-performance laptop for work and gaming | $999.99 | 50 |
| 2 | Smartphone | Latest model smartphone with advanced features | $699.99 | 30 |
| 3 | Headphones | Wireless noise-canceling headphones | $199.99 | 100 |

## How to Use the REST API

### Base URL
```
http://localhost:3000
```

### API Documentation
Visit `http://localhost:3000/api-docs` for interactive Swagger documentation.

### Authentication
Most endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Endpoints

#### 1. Register User
**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 4,
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### 2. Login User
**POST** `/auth/login`

Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "email": "john@example.com",
      "name": "John Doe",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

#### 3. Checkout
**POST** `/checkout`

Process a checkout with items and payment method. **Requires authentication.**

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Request Body:**
```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 2
    },
    {
      "productId": 3,
      "quantity": 1
    }
  ],
  "paymentMethod": "cash"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Checkout completed successfully",
  "data": {
    "id": 1640995200000,
    "userId": 1,
    "items": [
      {
        "productId": 1,
        "productName": "Laptop",
        "quantity": 2,
        "unitPrice": 999.99,
        "total": 1999.98
      },
      {
        "productId": 3,
        "productName": "Headphones",
        "quantity": 1,
        "unitPrice": 199.99,
        "total": 199.99
      }
    ],
    "paymentMethod": "cash",
    "subtotal": 2199.97,
    "discount": 219.997,
    "total": 1979.973,
    "status": "completed",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### 4. Health Check
**GET** `/health`

Check the health status of the API.

**Response:**
```json
{
  "success": true,
  "message": "API is healthy",
  "data": {
    "status": "healthy",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "uptime": 123.45,
    "memory": {
      "rss": 12345678,
      "heapTotal": 12345678,
      "heapUsed": 12345678,
      "external": 12345678
    },
    "environment": "development",
    "data": {
      "totalUsers": 3,
      "totalProducts": 3
    }
  }
}
```

#### 5. Get All Products
**GET** `/products`

Returns a list of all products. **Requires authentication.**

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Laptop",
      "description": "High-performance laptop for work and gaming",
      "price": 999.99,
      "stock": 50,
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    {
      "id": 2,
      "name": "Smartphone",
      "description": "Latest model smartphone with advanced features",
      "price": 699.99,
      "stock": 30,
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    {
      "id": 3,
      "name": "Headphones",
      "description": "Wireless noise-canceling headphones",
      "price": 199.99,
      "stock": 100,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### 6. Create Product
**POST** `/products`

Creates a new product. **Requires authentication.**

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Request Body:**
```json
{
  "name": "Tablet",
  "description": "Portable tablet device",
  "price": 299.99,
  "stock": 20
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 4,
    "name": "Tablet",
    "description": "Portable tablet device",
    "price": 299.99,
    "stock": 20,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Example Usage with cURL

#### Register a new user:
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "password123",
    "name": "New User"
  }'
```

#### Login:
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Checkout (replace TOKEN with actual JWT token):
```bash
curl -X POST http://localhost:3000/checkout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "items": [
      {
        "productId": 1,
        "quantity": 1
      }
    ],
    "paymentMethod": "cash"
  }'
```

#### Health check:
```bash
curl -X GET http://localhost:3000/health
```

#### Get all products (replace TOKEN with actual JWT token):
```bash
curl -X GET http://localhost:3000/products \
  -H "Authorization: Bearer TOKEN"
```

#### Create a new product (replace TOKEN with actual JWT token):
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "name": "Tablet",
    "description": "Portable tablet device",
    "price": 299.99,
    "stock": 20
  }'
```

### Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP status codes:
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (invalid token)
- `404` - Not Found (endpoint not found)
- `500` - Internal Server Error


#### Conceitos entregados: Groups - Login 
O código abaixo está armazenado no arquivo testeperformance-trabalhofinal.test.js , onde tem a separação lógica das operações em grupos nomeados e  dentro dele faço uso de um Helper, uma função de login, que foi importada de um outro script javascript.

  let token;
  group('Login', function () {
    token = login(email, password);
  });

#### Conceitos entregados: Data-Driven Testing
O código abaixo está armazenado no arquivo testeperformance-trabalhofinal.test.js e para a criação de novos produtos, foi utilizado um DDT, onde utilizo dados que estão na pasta data/products.json.
Foi feito o import dos dados e depois utilizado na requisição.

import { SharedArray } from 'k6/data';
const products = new SharedArray('products', function () {
  return JSON.parse(open('../data/products.json'));
});

 group("Cadastro de um novo Produto", function () {
    const payload = JSON.stringify({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock
    });

#### Conceitos entregados: Thresholds
O código abaixo está armazenado no arquivo testeperformance-trabalhofinal.test.js , e os Thresholds definidos para http_req_duration, checks e checkout_duration.

export let options = {
  thresholds: {
    'http_req_duration': ['p(95)<2000'],
    'checks': ['rate>0.95'],
    'checkout_duration': ['p(95)<1500'],
  },
};

#### Conceitos entregados: Checks
O código abaixo está armazenado no arquivo testeperformance-trabalhofinal.test.js e as validações em cada grupo (status HTTP e sucesso da resposta).

  check(res, {
      'checkout status is 200': (r) => r.status === 200,
      'checkout is success': (r) => r.json('success') === true,
    });


#### Conceitos entregados: Helpers
O código abaixo está armazenado no arquivo auth.js e utils.js, dentro da pasta helpers.
Funções auxiliares como geração de email/nome e login.

function generateRandomEmail() {
  return `user${__VU}${Date.now()}@example.com`;
}


#### Conceitos entregados: Trends
O código abaixo está armazenado no arquivo testeperformance-trabalhofinal.test.js e foi utilizado o checkoutTrend para medir duração do checkout.


#### Conceitos entregados: Faker
O código abaixo está armazenado no arquivo utils.js, dentro da pasta helpers para auxiliar na geração de nome.

function generateRandomfullName() {
  const names = ['João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Costa'];
  return names[Math.floor(Math.random() * names.length)];
}


#### Conceitos entregados: Variável de Ambiente
O código abaixo está armazenado no arquivo utils.js, dentro da pasta helpers.
Uso de __ENV.BASE_URL em getBaseUrl().


#### Conceitos entregados: Stages
O código abaixo está armazenado no arquivo testeperformance-trabalhofinal.test.js para o 
Ramp-up e ramp-down de usuários virtuais com Carga Gradual.

export let options = {
  vus: 10,
  stages: [
    { duration: '10s', target: 5 },
    { duration: '20s', target: 10 },
    { duration: '10s', target: 0 },
  ],
};


#### Conceitos entregados: Reaproveitamento de Resposta
O código abaixo está armazenado no arquivo testeperformance-trabalhofinal.test.js 
Token de autenticação reutilizado no checkout.

  group('Checkout', function () {
    let res = http.post(`${getBaseUrl()}/checkout`, JSON.stringify({
      items: [{ productId: product.id, quantity: 1 }],
      paymentMethod: 'cash'
    }), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });


#### Conceitos entregados: Uso de Token de Autenticação
O código abaixo está armazenado no arquivo testeperformance-trabalhofinal.test.js
e sendo retirado da response body no arquivo auth.js, dentro da pasta helpers.
Bearer token no header de autorização.

auth.js:
  return JSON.parse(res.body).data.token;

testeperformance-trabalhofinal.test.js:
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }


## Project Structure

```
src/
├── controllers/          # Request handlers
│   ├── AuthController.js
│   ├── CheckoutController.js
│   └── HealthController.js
├── middleware/           # Custom middleware
│   └── auth.js
├── models/              # Data models
│   ├── User.js
│   └── Product.js
├── routes/              # Route definitions
│   ├── auth.js
│   ├── checkout.js
│   ├── health.js
│   └── index.js
├── services/            # Business logic
│   ├── UserService.js
│   └── CheckoutService.js
└── app.js              # Main application file
```

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Swagger UI** - API documentation
- **CORS** - Cross-origin resource sharing
- **YAML** - Swagger specification

## License

ISC License
# trabalho-final-automacao-de-teste-de-performance
