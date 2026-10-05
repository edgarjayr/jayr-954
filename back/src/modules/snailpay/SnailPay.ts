import type { Express, Request, Response } from 'express';
import type { Info } from "../../interfaces/types.ts";
import users from "../../users/user.ts";

const user: Info[] = users;

export default async (req: Request, res: Response) => {
  const defaultValues = {
    num: '1234123412341234',
    expire: "12/16",
    cvv: 543
  };

  try {
    const num: string = req.query.num?.toString() || "";
    const expire: string = req.query.expire?.toString() || "";
    const cvv: number = Number(req.query?.cvv) || 0;
    const id: number = Number(req.query?.id) || 0;
    const email: string = req.query.email?.toString() || "";
    const name: string = req.query.name?.toString() || ""
    const cash: number = Number(req.query?.cash) || 0;

    if (num === defaultValues.num && expire === defaultValues.expire && cvv === defaultValues.cvv) {
      if (cash > 0) {
        const valid = user.find((element: Info) => element.email === email && element.id === id);
        if (valid) {
          valid.saldo += cash;
        }
        res.status(200).send({
          id: Math.floor(10000 + Math.random() * 90000),
          status: 200,
          status_detail: "Transaccion completa",
          trasaction_amout: cash,
          date_created: new Date(Date.now()).toLocaleString(),
          payer_id: id,
          payer_email: email
        });
        return;
      }
      res.status(200).send({message: "Monto incorrecto, debe ser mayor a 0"});
      return;
    }
    res.status(200).send({
      id: Math.floor(10000 + Math.random() * 90000),
      status: 400,
      status_detail: "La tarjeta no existe",
      trasaction_amout: 'N/A',
      date_created: new Date(Date.now()).toLocaleString(),
      payer_id: id,
      payer_email: email
    });
  } catch (e) {
    res.status(400).send({message: e});
  }
};