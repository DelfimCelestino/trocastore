// pages/api/delete-image.ts
import { NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
})

export async function POST(req: Request) {
  const { publicId } = await req.json()

  if (!publicId) {
    return new NextResponse("Missing publicId", { status: 400 })
  }

  try {
    await cloudinary.uploader.destroy(publicId)

    return new NextResponse("Image deleted successfully", { status: 200 })
  } catch (error) {
    console.log(error)
    return new NextResponse("Failed to delete image", { status: 500 })
  }
}
