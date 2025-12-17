import { test, expect, request, APIRequestContext } from '@playwright/test';

test.describe('Reqres API tests', () => {
  let requestContext: APIRequestContext;

  test.beforeAll(async () => {
    requestContext = await request.newContext({
      baseURL: 'https://reqres.in/api',
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
      },
    });
  });

  test('Create User', async () => {
    const response = await requestContext.post('/users', {
      data: { name: 'Arif', job: 'QA' },
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.id).toBeTruthy();
    expect(body.createdAt).toBeTruthy();
  });

  test('Get User', async () => {
    const response = await requestContext.get('/users/2');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data.id).toBe(2);
  });

  test('Update User', async () => {
    const response = await requestContext.put('/users/2', {
      data: { name: 'Arif Daud', job: 'Lead QA' },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.job).toBe('Lead QA');
  });

  test('Delete User', async () => {
    const response = await requestContext.delete('/users/2');
    expect(response.status()).toBe(204);
  });
});
