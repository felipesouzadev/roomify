// import { NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';


export function middleware(req) {
//   const token = req.cookies.get('token');

//   const url = req.nextUrl.pathname;
//   if (url === '/api/auth/login') {
//     return NextResponse.next();
//   }

//   if (!token) {
//     return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
//   }

//   try {
//     jwt.verify(token.value, process.env.JWT_SECRET);
//     console.log('entrei')
//     const decoded = jwt.decode(token.value, process.env.JWT_SECRET);
//     req.headers.set('cur-user', JSON.stringify(decoded))
//     return NextResponse.next();
//   } catch (error) {
//     console.log(error)
//     return NextResponse.json(
//       { error: 'Invalid token. Please log in again.' },
//       { status: 401 }
//     );
//   }
// }

// export const config = {
//   matcher: ['/api/:path*'], // Apply middleware to all API routes
};
