function generateRandomEmail() {
  return `user${__VU}${Date.now()}@example.com`;
}

function generateRandomfullName() {
  const names = ['João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Costa'];
  return names[Math.floor(Math.random() * names.length)];
}

function getBaseUrl() {
  return __ENV.BASE_URL || 'http://localhost:3000';
}

export { generateRandomEmail, generateRandomfullName, getBaseUrl };