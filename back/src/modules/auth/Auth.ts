import type { Express, Request, Response } from 'express';
import type { Info } from "../../interfaces/types.ts";
import users from "../../users/user.ts";

const user: Info[] = users;

export default async (req: Request, res: Response) => {
  try {
    const email = req.query.email;
    const password = req.query.password;
    const valid = user.find((element: Info) => element.password === password && element.email === email);
    if (valid) {
      const {password, ...withoutPassword} = valid;
      res.status(200).send(withoutPassword);
    } else {
      res.status(401).send("Usuario o contraseña incorrecta");
    }
  } catch (e) {
    res.status(400).send(e);
  }

};