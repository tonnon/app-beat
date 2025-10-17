export type MockUserRole = 'default' | 'admin' | 'enterprise_admin';

export interface MockUser {
  readonly id: string;
  readonly type: MockUserRole;
  readonly email: string;
  readonly password: string;
}

const users: ReadonlyArray<MockUser> = [
  {
    id: '1',
    type: 'default',
    email: 'userdefault@gmail.com',
    password: '123',
  },
  {
    id: '2',
    type: 'admin',
    email: 'useradmin@gmail.com',
    password: '123',
  },
  {
    id: '3',
    type: 'enterprise_admin',
    email: 'userceo@gmail.com',
    password: '123',
  },
];

export default users;