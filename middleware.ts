import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');

  // Solo se requiere autenticación si estas variables de entorno existen.
  // En producción puedes simplemente no definirlas y será público.
  const qaUser = process.env.QA_AUTH_USER;
  const qaPwd = process.env.QA_AUTH_PASSWORD;

  if (!qaUser || !qaPwd) {
    return NextResponse.next();
  }

  // Permitir que pasen los webhooks sin autenticación de QA
  if (req.nextUrl.pathname.startsWith('/api/webhooks/')) {
    return NextResponse.next();
  }

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [providedUser, providedPwd] = atob(authValue).split(':');

    if (providedUser === qaUser && providedPwd === qaPwd) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="QA Area"`,
    },
  });
}

// Configura las rutas que el middleware va a proteger (todas excepto assets estáticos)
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
