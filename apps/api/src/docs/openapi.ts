import { SESSION_COOKIE_NAME } from '../config/env';

// The API contract, served at /api/docs. Web and mobile build against this,
// so an endpoint change and its update here belong in the same pull request.
export const openApiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'SkillSwap API',
    version: '1.0.0',
    description: 'Skills are the new currency. Peer-to-peer skill exchange for IUEA.',
  },
  servers: [{ url: '/api/v1' }],
  components: {
    securitySchemes: {
      cookieAuth: { type: 'apiKey', in: 'cookie', name: SESSION_COOKIE_NAME },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          email: { type: 'string', format: 'email' },
          name: { type: 'string' },
          bio: { type: 'string', nullable: true },
          skillLevel: { type: 'string', enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'] },
          portfolioStatus: { type: 'string', enum: ['PENDING', 'APPROVED', 'REJECTED'] },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      UserResponse: {
        type: 'object',
        properties: { user: { $ref: '#/components/schemas/User' } },
      },
      Error: {
        type: 'object',
        properties: {
          error: {
            type: 'object',
            properties: { message: { type: 'string' }, details: {} },
          },
        },
      },
    },
  },
  paths: {
    '/auth/register': {
      post: {
        tags: ['Identity'],
        summary: 'Create an account and log in',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password', 'name'],
                properties: {
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string', minLength: 8, maxLength: 72 },
                  name: { type: 'string', minLength: 2 },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Created; session cookie set', content: { 'application/json': { schema: { $ref: '#/components/schemas/UserResponse' } } } },
          400: { description: 'Validation failed', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          409: { description: 'Email already registered', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        },
      },
    },
    '/auth/login': {
      post: {
        tags: ['Identity'],
        summary: 'Log in',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Logged in; session cookie set', content: { 'application/json': { schema: { $ref: '#/components/schemas/UserResponse' } } } },
          401: { description: 'Invalid email or password', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        },
      },
    },
    '/auth/logout': {
      post: {
        tags: ['Identity'],
        summary: 'Log out (destroys the session)',
        security: [{ cookieAuth: [] }],
        responses: { 204: { description: 'Logged out' }, 401: { description: 'Not logged in' } },
      },
    },
    '/auth/me': {
      get: {
        tags: ['Identity'],
        summary: 'Get the logged-in user',
        security: [{ cookieAuth: [] }],
        responses: {
          200: { description: 'Current user', content: { 'application/json': { schema: { $ref: '#/components/schemas/UserResponse' } } } },
          401: { description: 'Not logged in' },
        },
      },
    },
  },
};
