import { NextResponse } from 'next/server';

// 임시 사용자 데이터 (나중에 데이터베이스로 교체)
export const users = [
  {
    id: '1',
    name: '관리자',
    email: 'admin@example.com',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-05-10T09:00:00Z',
    status: 'active'
  },
  {
    id: '2',
    name: '홍길동',
    email: 'hong@example.com',
    role: 'user',
    createdAt: '2024-02-15T00:00:00Z',
    lastLogin: '2024-05-09T14:30:00Z',
    status: 'active'
  },
  {
    id: '3',
    name: '김철수',
    email: 'kim@example.com',
    role: 'user',
    createdAt: '2024-03-20T00:00:00Z',
    lastLogin: '2024-05-08T11:20:00Z',
    status: 'inactive'
  }
];

// GET /api/admin/users
export async function GET() {
  return NextResponse.json(users);
}

// PUT /api/admin/users/[id]/role
export async function PUT(request: Request) {
  const id = request.url.split('/').slice(-2)[0];
  const { role } = await request.json();

  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  if (!['admin', 'user'].includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  }

  users[userIndex] = {
    ...users[userIndex],
    role
  };

  return NextResponse.json(users[userIndex]);
}

// PUT /api/admin/users/[id]/status
export async function PATCH(request: Request) {
  const id = request.url.split('/').slice(-2)[0];
  const { status } = await request.json();

  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  if (!['active', 'inactive', 'banned'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  users[userIndex] = {
    ...users[userIndex],
    status
  };

  return NextResponse.json(users[userIndex]);
}