import users, { type MockUser, type MockUserRole } from '@/pages/User.Mock';

const AUTH_DELAY_MS = 500;

export class MockAuthError extends Error {
  public readonly code: 'invalid_credentials';

  constructor(code: 'invalid_credentials') {
    super(code);
    this.code = code;
    this.name = 'MockAuthError';
  }
}

const ROLE_REDIRECTS: Record<MockUserRole, string> = {
  default: '/task',
  admin: '/admin',
  enterprise_admin: '/dashboard',
};

export function getRedirectPathForRole(role: MockUserRole): string {
  return ROLE_REDIRECTS[role];
}

export async function authenticateMockUser(email: string, password: string): Promise<MockUser> {
  const normalizedEmail = email.trim().toLowerCase();

  return new Promise<MockUser>((resolve, reject) => {
    window.setTimeout(() => {
      const matchedUser = users.find((user) => {
        return user.email.toLowerCase() === normalizedEmail && user.password === password;
      });

      if (!matchedUser) {
        reject(new MockAuthError('invalid_credentials'));
        return;
      }

      resolve(matchedUser);
    }, AUTH_DELAY_MS);
  });
}

export async function validateEmailExists(email: string): Promise<boolean> {
  const normalizedEmail = email.trim().toLowerCase();

  return new Promise<boolean>((resolve) => {
    window.setTimeout(() => {
      const emailExists = users.some((user) => user.email.toLowerCase() === normalizedEmail);
      resolve(emailExists);
    }, AUTH_DELAY_MS);
  });
}
