"use client";

import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface info {
  id: number,
  name: string,
  email: string,
  saldo: number
}

export default function Recharge () {
  const [card, setCard] = useState<string>("");
  const [dateExpire, setDateExpire] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [recharge, setRecharge] = useState<number>(0);
  const [errorRecharge, setErrorRecharge] = useState<boolean>(false);
  const [completeRecharge, setCompleteRecharge] = useState<boolean>(false);
  const [messageRecharge, setMessageRecharge] = useState<string>("");
  const router = useRouter();

  async function operation() {
    const info: info = JSON.parse(localStorage.getItem("user") || "{}");
    if (!name || !card || !dateExpire || !cvv || !recharge) {
      setErrorRecharge(true);
      setMessageRecharge("No puede dejar campos vacios");
      return;
    }
    if (name.length < 2) {
      setErrorRecharge(true);
      setMessageRecharge("Nombre debe tener al menos 2 caracteres");
      return;
    }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    try {
      const response: Response | void = await fetch(`http://localhost:3200/snailpay?name=${name}&email=${info.email}&id=${info.id}&cvv=${cvv}&cash=${recharge}&num=${card}&expire=${dateExpire}`,{
        headers: myHeaders,
        method: "POST"
      });

      if(response.status === 200){
        const res = await response.json();
        if (res.message) {
          setErrorRecharge(true);
          setMessageRecharge(res.message);
          return;
        }
        if (res.status === 400) {
          setErrorRecharge(true);
          setMessageRecharge(res.status_detail);
          return;
        }
        setErrorRecharge(false);
        setCompleteRecharge(true);
        info.saldo += recharge;
        localStorage.setItem("user", JSON.stringify(info));
        return;
      }
    } catch (e) {
      console.log(e);
      setErrorRecharge(true);
      setMessageRecharge("No se pudo recargar");
    }
    
  }

  return(
    <>
      <Box sx={{display: "flex", width: "100%", height: "550px", justifyContent: "center", alignItems: "center"}}>
        <Box sx={{width: "360px", height: "250", textAlign: "center"}}>
          <Typography sx={{fontSize: "24px", fontWeight: 500, lineHeight: "100%", marginBottom: "50px"}}>Recargar</Typography>
          <FormControl sx={{marginBottom: "16px"}}>
            <TextField
              value={card}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const value = event.target.value.replace(/\D/g, "").slice(0, 18);
                setCard(value);
              }}
              sx={{
                "& .MuiOutlinedInput-root": {"&:hover .MuiOutlinedInput-notchedOutline": {border: "1px solid #0071FF !important"}},
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{borderWidth: "1px !important"}
              }}
              placeholder="Numero de la tarjeta"
              slotProps={{input:{style: {width: "360px", height: "42px"}}}}/>
          </FormControl>
          <FormControl sx={{marginBottom: "16px"}}>
            <TextField
              value={dateExpire}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                let value = event.target.value.replace(/\D/g, "");
                if (value.length > 2) {
                  value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
                }
                setDateExpire(value);
              }}
              sx={{
                "& .MuiOutlinedInput-root": {"&:hover .MuiOutlinedInput-notchedOutline": {border: "1px solid #0071FF !important"}},
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{borderWidth: "1px !important"}
              }}
              placeholder="Fecha de vencimiento"
              slotProps={{input:{style: {width: "360px", height: "42px"}}}}/>
          </FormControl>
          <FormControl sx={{marginBottom: "16px"}}>
            <TextField
              value={cvv}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const value = event.target.value.replace(/\D/g, "").slice(0, 3);
                setCvv(value);
              }}
              sx={{
                "& .MuiOutlinedInput-root": {"&:hover .MuiOutlinedInput-notchedOutline": {border: "1px solid #0071FF !important"}},
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{borderWidth: "1px !important"}
              }}
              placeholder="cvv"
              slotProps={{input:{style: {width: "360px", height: "42px"}}}}/>
          </FormControl>
          <FormControl sx={{marginBottom: "16px"}}>
            <TextField
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target?.value.trim())}
              sx={{
                "& .MuiOutlinedInput-root": {"&:hover .MuiOutlinedInput-notchedOutline": {border: "1px solid #0071FF !important"}},
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{borderWidth: "1px !important"}
              }}
              placeholder="Nombre"
              slotProps={{input:{style: {width: "360px", height: "42px"}}}}/>
          </FormControl>
          <FormControl sx={{marginBottom: "16px"}}>
            <TextField
              value={recharge}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const value = event.target.value.replace(/\D/g, "").slice(0, 6);
                setRecharge(Number(value));
              }}
              sx={{
                "& .MuiOutlinedInput-root": {"&:hover .MuiOutlinedInput-notchedOutline": {border: "1px solid #0071FF !important"}},
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{borderWidth: "1px !important"}
              }}
              placeholder="Monto"
              slotProps={{input:{style: {width: "360px", height: "42px"}}}}/>
          </FormControl>
          {errorRecharge ? 
            <Typography sx={{color: "red", fontSize: "12px", marginBottom: "5px"}}>{messageRecharge}</Typography>
            : completeRecharge ? <Typography sx={{color: "green", fontSize: "12px", marginBottom: "5px"}}>Recarga completa</Typography>
              : <></>
          }
          <Button variant="contained" sx={{width: "360px",textTransform: "none", background: "#0071FF"}} onClick={operation}>Recargar</Button>
          <Button variant="contained" sx={{width: "360px", marginTop: "20px", textTransform: "none", background: "#797c81"}} onClick={() => { router.replace("/")}}>Volver al Home</Button>
          <Box sx={{display: "flex", justifyContent: "center", paddingTop: "30px"}}>
          </Box>
        </Box>
      </Box>
    </>
  );
}
