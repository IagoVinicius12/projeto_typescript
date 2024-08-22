import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export interface AuthRequest extends Request {
  user?: {
    id: string;
    // Outros dados do usuário, se necessário
  };
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).send('Access Denied');
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key') as { id: string };
    req.user = decoded; // Armazena os dados do usuário decodificado no req
    next(); // Passa o controle para a próxima função de middleware ou rota
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

export default authMiddleware;