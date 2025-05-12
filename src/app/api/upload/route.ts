import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { join } from 'path'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: '파일이 없습니다.' },
        { status: 400 }
      )
    }

    const filename = `${Date.now()}-${file.name}`
    const blob = await put(join('products', filename), file, {
      access: 'public',
      addRandomSuffix: false
    })
    
    return NextResponse.json({
      url: blob.url,
      pathname: blob.pathname,
      filename: filename
    })

  } catch (error) {
    console.error('File upload error:', error)
    return NextResponse.json(
      { error: '파일 업로드 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
