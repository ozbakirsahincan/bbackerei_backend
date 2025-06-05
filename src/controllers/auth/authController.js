import { loginUser } from '../../services/auth/authService.js';

export async function login(req, res) {
  try {
    const { username, password } = req.body;
    const token = await loginUser(username, password);

    if (!token) {
      return res.status(401).json({ error: 'Geçersiz kullanıcı adı veya şifre' });
    }

    res.json({ token });
  } catch (err) {
    console.error('Login Hatası:', err);
    res.status(500).json({ error: 'Giriş işlemi başarısız' });
  }
}
