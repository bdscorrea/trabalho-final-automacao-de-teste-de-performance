import http from 'k6/http';
import { check } from 'k6';
import { getBaseUrl } from './utils.js';

function login(email, password) {
  let res = http.post(`${getBaseUrl()}/auth/login`, JSON.stringify({ email, password }), {
    headers: { 'Content-Type': 'application/json' }
  });

  check(res, {
    'login realizado com sucesso': (r) => r.status === 200,
  });
  return JSON.parse(res.body).data.token;
}

export { login };