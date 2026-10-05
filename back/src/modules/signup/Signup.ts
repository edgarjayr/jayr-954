import type { Express, Request, Response } from 'express';
import type { Info } from "../../interfaces/types.ts";
import users from "../../users/user.ts";

const user: Info[] = users;

export default async (req: Request, res: Response) => {
  try {
    const name: string = req.query.name?.toString() || "";
    const email: string = req.query.email?.toString() || "";
    const password: string = req.query.password?.toString() || "";

    const valid = user.find((element: Info) => element.email === email);

    if (valid) {
      res.status(200).send({message: "usuario ya existente"});
    }

    if (name === "" || email === "" || password === "") {
      res.status(400).send("Parametros vacios");
    } else {
      const generateID = user.length;
      user.push({id: generateID + 1, name, email, password, saldo: 0});
      res.status(200).send({});
    }
  } catch (e) {
    res.status(400).send(e);
  }
};