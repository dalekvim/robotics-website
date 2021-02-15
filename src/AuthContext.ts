import { createContext } from "react";

export const AuthContext = createContext<{ value: boolean; setValue: any }>({
  value: false,
  setValue: "not set",
});
