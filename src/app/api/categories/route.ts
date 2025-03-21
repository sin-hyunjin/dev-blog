import { getCategoryCount } from "@/lib/mdx";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await getCategoryCount();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
