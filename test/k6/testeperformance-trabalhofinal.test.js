import http from 'k6/http';
import { check, group } from 'k6';
import { Trend } from 'k6/metrics';
import { generateRandomEmail, generateRandomfullName, getBaseUrl } from './helpers/utils.js';
import { login } from './helpers/auth.js';
import { SharedArray } from 'k6/data';

export let options = {
  stages: [
    { duration: '10s', target: 5 },
    { duration: '20s', target: 10 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    'http_req_duration': ['p(95)<2000'],
    'checks': ['rate>0.95'],
    'checkout_duration': ['p(95)<1500'],
  },
};

const products = new SharedArray('products', function () {
  return JSON.parse(open('../data/products.json'));
});

let checkoutTrend = new Trend('checkout_duration');

export default function () {
  let email = generateRandomEmail();
  let password = 'password123';
  let name = generateRandomfullName();
  const product = products[Math.floor(Math.random() * products.length)];

  group('Register', function () {
    let res = http.post(`${getBaseUrl()}/auth/register`, JSON.stringify({
      email,
      password,
      name
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
    check(res, {
      'registro status is 201': (r) => r.status === 201,
      'registro is success': (r) => r.json('success') === true,
    });
  });

  let token;
  group('Login', function () {
    token = login(email, password);
  });

 
  group('Checkout', function () {
    let res = http.post(`${getBaseUrl()}/checkout`, JSON.stringify({
      items: [{ productId: 2, quantity: 1 }],
      paymentMethod: 'cash'
    }), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    check(res, {
      'checkout status is 200': (r) => r.status === 200,
      'checkout is success': (r) => r.json('success') === true,
    });
    checkoutTrend.add(res.timings.duration);
  });

  group("Cadastro de um novo Produto", function () {
    const payload = JSON.stringify({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock
    });

    const res = http.post(`${getBaseUrl()}/products`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    check(res, {
      "cadastro de produto status é 201": (r) => r.status === 201,
      "cadastro de produto is success": (r) => r.json("success") === true,
    });
  });

}