"use client";
import { FC, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";
import { CustomRouterContext } from "./CustomRouterContext";
import { usePathname, useRouter } from "next/navigation";
import { AuthContext } from "../auth/AuthContext";
import { AppRoute, routes } from "./Routes";

export const CustomRouter: FC<PropsWithChildren> = ({children}) => {
  const [allowRenderPage, setAllowRenderPage] = useState<boolean>();
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const pathname = usePathname();

  const routerLifecycle = useCallback((route: AppRoute) => {
    return new Promise<void>(async (resolve, reject) => {
      // Redirection from "/" to any route
      if(route.redirect){
        if(!isLoggedIn && route.redirect === "/"){
          router.replace("/login");
          return;
        }
        if(isLoggedIn && (route.redirect === "/login" || route.redirect === "/signup")){
          router.replace("/");
          return;
        }
        
      }
      // User not logged
      if(!isLoggedIn && route.private){
        router.replace("/login");
        reject();
        return;
      }
      resolve();
      return;
    });
  },[isLoggedIn, router]);

  useEffect(() => {
    const route: AppRoute = {
      ...routes[pathname],
      redirect: pathname,
    };
    const user = localStorage.getItem("user");
    if (user && !isLoggedIn) {
      setIsLoggedIn(true);
      return;
    }


    routerLifecycle(route)
    .then(() => setAllowRenderPage(true))
    .catch(() => setAllowRenderPage(false));
  },[isLoggedIn, setIsLoggedIn, routerLifecycle, pathname]);
  
  return(
    <CustomRouterContext.Provider value={{}}>
      {allowRenderPage ? children : <></>}
    </CustomRouterContext.Provider>
  );
};
