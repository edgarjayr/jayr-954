"use client";

import { Box, Button, FormControl, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import utils from "../../package.json";

export default function Signup () {
  const [name, setName] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorSignup, setErrorSignup] = useState<boolean>(false);
  const [signup, setSignup] = useState<boolean>(false);
  const [messageSignup, setMessageSignup] = useState<string>("");
  const router = useRouter();


  async function sign() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !user || !password || !confirmPassword) {
      setErrorSignup(true);
      setMessageSignup("No puede dejar campos vacios");
      return;
    }
    if (name.length < 2) {
      setErrorSignup(true);
      setMessageSignup("Nombre debe tener al menos 2 caracteres");
      return;
    }
    const isValid = emailRegex.test(user);
    if (!isValid) {
      setErrorSignup(true);
      setMessageSignup("Ingresa un correo valido");
      return;
    }
    if (password.length < 4) {
      setErrorSignup(true);
      setMessageSignup("La contraseña debe tener al menos 4 caracteres");
      return;
    }
    if(password !== confirmPassword) {
      setErrorSignup(true);
      setMessageSignup("Las contraseñas no coinciden");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    try {
      const response: Response | void = await fetch(`http://localhost:3200/signup?name=${name}&email=${user}&password=${password}`,{
        headers: myHeaders,
        method: "POST"
      });

      if(response.status === 200){
        const res = await response.json();
        if (res.message) {
          setErrorSignup(true);
          setMessageSignup(res.message);
          return;
        }
        setErrorSignup(false);
        setSignup(true);
        return;
      }
    } catch (e) {
      console.log(e);
      setErrorSignup(true);
      setMessageSignup("No se pudo crear el usuario");
    }
    
  }

  return(
    <>
      <Box sx={{display: "flex", width: "100%", height: "550px", justifyContent: "center", alignItems: "center"}}>
        <Box sx={{width: "360px", height: "250", textAlign: "center"}}>
          <Typography sx={{fontSize: "24px", fontWeight: 500, lineHeight: "100%", marginBottom: "50px"}}>Registrate</Typography>
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
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUser(event.target?.value.trim())}
            sx={{
              "& .MuiOutlinedInput-root": {"&:hover .MuiOutlinedInput-notchedOutline": {border: "1px solid #0071FF !important"}},
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{borderWidth: "1px !important"}
            }}
            placeholder="Email"
            slotProps={{input:{style: {width: "360px", height: "42px"}}}}/>
          </FormControl>
          <FormControl sx={{marginBottom: "30px"}}>
            <TextField
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target?.value.trim())}
            sx={{
              "& .MuiOutlinedInput-root": {"&:hover .MuiOutlinedInput-notchedOutline": {border: "1px solid #0071FF !important"}},
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{borderWidth: "1px !important"}
            }}
            placeholder="Contraseña"
            type={"password"}
            slotProps={{input:{style: {width: "360px", height: "42px"},
            }}}
            />
          </FormControl>
          <FormControl sx={{marginBottom: "30px"}}>
            <TextField
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(event.target?.value.trim())}
            sx={{
              "& .MuiOutlinedInput-root": {"&:hover .MuiOutlinedInput-notchedOutline": {border: "1px solid #0071FF !important"}},
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{borderWidth: "1px !important"}
            }}
            placeholder="Confirmar contraseña"
            type={"password"}
            slotProps={{input:{style: {width: "360px", height: "42px"},
            }}}
            />
          </FormControl>
          {errorSignup ? 
            <Typography sx={{color: "red", fontSize: "12px", marginBottom: "5px"}}>{messageSignup}</Typography>
            : signup ? <Typography sx={{color: "green", fontSize: "12px", marginBottom: "5px"}}>Usuario creado correctamente</Typography>
              : <></>
          }
          <Button variant="contained" sx={{width: "360px",textTransform: "none", background: "#0071FF"}} onClick={sign}>Registrarse</Button>
          <Button variant="contained" sx={{width: "360px", marginTop: "20px", textTransform: "none", background: "#797c81"}} onClick={() => { router.replace("/login")}}>Atras</Button>
          <Box sx={{display: "flex", justifyContent: "center", paddingTop: "30px"}}>
            <Typography sx={{fontSize: "12px", color: "#B1B1B1"}}>V{utils.version}</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
