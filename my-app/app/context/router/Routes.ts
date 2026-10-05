export interface AppRoute {
  private?: boolean,
  redirect?: string,
}

export interface AppRoutes {
  [path: string]: AppRoute
}

export const routes: AppRoutes = {
  "/": {private: true},
  "/login": {},
  "/signup": {},
  "/recharge": {private: true}
};
