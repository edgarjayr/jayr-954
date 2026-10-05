"use client";

// import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, FormControl, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import utils from "../../package.json";

export default function Login () {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [user, setUser] = useState<string>();
  const [password, setPassword] = useState<string>("");
  const [errorLogin, setErrorLogin] = useState<boolean>(false);
  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  async function login() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    try {
      const response: Response | void = await fetch(`http://localhost:3200/login?email=${user}&password=${password}`,{
        headers: myHeaders,
        method: "POST"
      });

      if(response.status === 200){
        const res = await response.json();
        localStorage.setItem("user", JSON.stringify(res));
        router.replace("/");
        return;
      }
      setErrorLogin(true);
    } catch (e) {
      console.log(e);
      setErrorLogin(true);
    }
    
  }

  return(
    <>
      <Box sx={{display: "flex", width: "100%", height: "550px", justifyContent: "center", alignItems: "center"}}>
        <Box sx={{width: "360px", height: "250", textAlign: "center"}}>
          <Typography sx={{fontSize: "24px", fontWeight: 500, lineHeight: "100%", marginBottom: "50px"}}>Iniciar sesión</Typography>
          <FormControl sx={{marginBottom: "16px"}}>
          <TextField
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUser(event.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {"&:hover .MuiOutlinedInput-notchedOutline": {border: "1px solid #0071FF !important"}},
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{borderWidth: "1px !important"}
            }}
            placeholder="Usuario"
            slotProps={{input:{style: {width: "360px", height: "42px"}}}}/>
          </FormControl>
          <FormControl sx={{marginBottom: "30px"}}>
            <TextField
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {"&:hover .MuiOutlinedInput-notchedOutline": {border: "1px solid #0071FF !important"}},
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{borderWidth: "1px !important"}
            }}
            placeholder="Contraseña"
            type={showPassword ? "text" : "password"}
            slotProps={{input:{style: {width: "360px", height: "42px"},
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? "hidden" : "show"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
                  </IconButton>
                </InputAdornment>
              )
            }}}
            />
          </FormControl>
          {errorLogin ? 
            <Typography sx={{color: "red", fontSize: "12px", marginBottom: "5px"}}>Error al iniciar sesión, intenta de nuevo</Typography>
            : <></>
          }
          <Button variant="contained" sx={{width: "360px",textTransform: "none", background: "#0071FF"}} onClick={login}>Iniciar sesión</Button>
          <Button variant="contained" sx={{width: "360px", marginTop: "20px", textTransform: "none", background: "#abb6c3"}} onClick={() => { router.replace("/signup")}}>Registrarse</Button>
          <Box sx={{display: "flex", justifyContent: "center", paddingTop: "30px"}}>
            <Typography sx={{fontSize: "12px", color: "#B1B1B1"}}>V{utils.version}</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
