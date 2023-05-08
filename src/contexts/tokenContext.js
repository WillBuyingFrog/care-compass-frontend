import {createContext} from "react";


export const tokenContext = createContext({
    token: "none",
    setToken: (token) => {}
});
