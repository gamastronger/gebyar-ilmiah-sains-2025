import { jwtDecode } from 'jwt-decode'; // ✅ benar


export function isTokenExpired(token) {
  try {
    console.log("Token:", token);
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
}
