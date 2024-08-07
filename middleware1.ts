// app/middleware.ts
import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token"); // Mengambil token dari cookie

  if (!token) {
    // Jika tidak ada token, arahkan pengguna ke halaman login
    return NextResponse.rewrite(new URL("/login", request.url));
  }

  try {
    // Kirim permintaan ke API Anda untuk memverifikasi token
    const response = await axios.post("https://api.example.com/verify-token", {
      token,
    });

    // Jika token valid, lanjutkan permintaan
    if (response.data.valid) {
      return NextResponse.next();
    } else {
      // Jika token tidak valid, arahkan pengguna ke halaman login
      return NextResponse.rewrite(new URL("/login", request.url));
    }
  } catch (err) {
    // Jika ada kesalahan dalam verifikasi, arahkan pengguna ke halaman login
    return NextResponse.rewrite(new URL("/login", request.url));
  }
}

// Tentukan rute yang akan menggunakan middleware ini
export const config = {
  matcher: [
    // Terapkan middleware pada semua rute kecuali /login
    "/((?!login).*)",
  ],
};
