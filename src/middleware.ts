import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  // Define quais rotas são públicas
  const isPublicPath = pathname.startsWith("/login") || pathname.startsWith("/register");

  // Se tiver token e tentar acessar rota pública → manda pro dashboard
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Se não tiver token e tentar acessar rota privada → manda pro login
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Caso contrário, segue normalmente
  return NextResponse.next();
}

// Aplica o middleware só pra determinadas rotas
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/login", "/register"],
};
