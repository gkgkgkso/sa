import { NextResponse } from 'next/server';

// 임시 데이터 (나중에 데이터베이스로 교체)
let categories = [
  {
    id: '1',
    name: '전자제품',
    productCount: 5,
    order: 1,
    isVisible: true,
  },
  {
    id: '2',
    name: '의류',
    productCount: 3,
    order: 2,
    isVisible: true,
  },
  {
    id: '3',
    name: '식품',
    productCount: 7,
    order: 3,
    isVisible: true,
  },
];

// GET /api/admin/categories
export async function GET() {
  return NextResponse.json(categories);
}

// POST /api/admin/categories
export async function POST(request: Request) {
  const data = await request.json();
  
  const newCategory = {
    ...data,
    id: String(Date.now()),
    productCount: 0,
  };
  
  categories.push(newCategory);
  return NextResponse.json(newCategory, { status: 201 });
}

// PUT /api/admin/categories/[id]
export async function PUT(request: Request) {
  const data = await request.json();
  const id = request.url.split('/').pop();
  
  categories = categories.map(category => {
    if (category.id === id) {
      return { ...category, ...data };
    }
    return category;
  });
  
  const updatedCategory = categories.find(c => c.id === id);
  if (!updatedCategory) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  }
  
  return NextResponse.json(updatedCategory);
}

// DELETE /api/admin/categories/[id]
export async function DELETE(request: Request) {
  const id = request.url.split('/').pop();
  
  const categoryExists = categories.some(c => c.id === id);
  if (!categoryExists) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  }
  
  categories = categories.filter(category => category.id !== id);
  return NextResponse.json({ success: true });
}