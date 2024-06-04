import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const secret = process.env.NEXT_PUBLIC_NEXTAUTH_SECRET;
  const token = await getToken({ req: request, secret });
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const email = token.email;
  const url = request.nextUrl.clone();

  // Periksa apakah email adalah admin 1 dan jalur yang diakses adalah Kelurahan Barusari
  if (
    email === process.env.NEXT_PUBLIC_ADMIN_1 &&
    !url.pathname.startsWith("/admin/barusari")
  ) {
    return NextResponse.redirect(new URL("/admin/barusari", request.url));
  }

  // Periksa apakah email adalah admin 2 dan jalur yang diakses adalah Kelurahan Bulustalan
  if (
    email === process.env.NEXT_PUBLIC_ADMIN_2 &&
    !url.pathname.startsWith("/admin/bulustalan")
  ) {
    return NextResponse.redirect(new URL("/admin/bulustalan", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/barusari", "/admin/bulustalan"],
};
