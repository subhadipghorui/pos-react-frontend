import { createContext } from "react";
import AuthStore from "./authStore"
import { useContext } from "react";
import CustomerStore from "./customerStore";
import DialogStore from "./dialogStore";

if (process.env.NODE_ENV === "development") {
    const { enableLogging } = require('mobx-logger');
    enableLogging();
 }


export interface IRootStore {
    authStore: AuthStore;
    customerStore: CustomerStore;
    dialogStore: DialogStore;
    handleError: Function;
 }

 
//  Add all store here
export class RootStore implements IRootStore{
    authStore: AuthStore;
    customerStore: CustomerStore;
    dialogStore: DialogStore;

    constructor() {
       console.log("RootStore")
       this.authStore = new AuthStore(this)
       this.customerStore = new CustomerStore(this)
       this.dialogStore = new DialogStore(this)
    }

    public handleError = (errorCode: number | null = null, errorMessage: string, errorData: any) => {
        console.error("handleError: ", errorData)
        if(errorCode === 403) {
           this.authStore.setIsAuthenticated(false)
           return null;
        };
     }

 }

 const rootStoreContext = createContext({
    rootStore: new RootStore()
 })

 export const useStore = () => useContext(rootStoreContext)

 