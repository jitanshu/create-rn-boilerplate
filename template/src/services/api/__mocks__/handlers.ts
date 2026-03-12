import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('*/auth/login', () =>
    HttpResponse.json({
      user:  { id: '1', name: 'Test User', email: 'test@test.com' },
      token: 'mock-jwt-token',
    })
  ),
  http.post('*/auth/register', () =>
    HttpResponse.json({ message: 'User created' }, { status: 201 })
  ),
  http.get('*/users/me', () =>
    HttpResponse.json({ id: '1', name: 'Test User', email: 'test@test.com' })
  ),
];

export const server = setupServer(...handlers);
