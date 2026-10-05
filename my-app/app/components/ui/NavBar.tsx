"use client";
import { useContext} from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/auth/AuthContext";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

interface info {
  id: number,
  name: string,
  saldo: number
}

export const NavBar = () => {
  const { logout } = useContext(AuthContext);
  // const [balance, setBalance] = useState<number>();
  const router = useRouter();

  const info: info = JSON.parse(localStorage.getItem("user") || "{}");

  const handleClick = (event: React.MouseEvent<HTMLElement>, route: string) => {
    event.preventDefault();
    router.replace(route);
  };

  const handleClose = () => {
    // setHasPrvl(false);
  };

  return (
    <>
      <Box sx={{ backgroundColor: "#fff", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)", }} >
        <AppBar position="static" elevation={0} sx={{ backgroundColor: "#fff", color: "#3D4454", }} >
          <Toolbar sx={{ minHeight: "68px", padding: "0 35px", }} > {/* Links */}
            <Box sx={{ display: "flex", alignItems: "center", height: "100%", gap: "56px", paddingLeft: "45px", fontSize: "16px", }} >
              <Button component="a" href="#" sx={{ height: "68px", color: "#3D4454", fontSize: "16px", textTransform: "none", padding: 0, minWidth: "auto", }} >Home</Button> 
              <Button component="a" href="#" onClick={() => { router.replace("/recharge")}} sx={{ height: "68px", color: "#3D4454", fontSize: "16px", textTransform: "none", padding: 0, minWidth: "auto", }} >Recargar</Button>
            </Box>
            {/* Logout */}
            <Typography sx={{ color: "#374151", fontSize: "14px", textTransform: "none", padding: "8px", marginLeft: "1100px"}} >Saldo ${info.saldo}</Typography>
            <Box sx={{ marginLeft: "auto" }}>
              <Button component="a" href="#" onClick={(event) => { event.preventDefault(); logout(); }} sx={{ color: "#374151", fontSize: "14px", textTransform: "none", padding: "8px", "&:hover": { color: "#1f2937", backgroundColor: "transparent", }, }} > Cerrar sesión </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
