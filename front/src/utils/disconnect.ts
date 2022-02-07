// Créer un DisconnectButton (component) pour la deconnexion
import Cookies from "universal-cookie"
import { apiBackRequest } from "./api";

export const disconnect = async () => {
    const cookies = new Cookies();

    console.log('Disconnect')
    await apiBackRequest("/auth/disconnect")
    cookies.remove("token", { maxAge : 0})
}