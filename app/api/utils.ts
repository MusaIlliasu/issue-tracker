import { getServerSession } from "next-auth";
import authOptions from "./auth/AuthOptions";

export const authenticated = async () => {
    const session = await getServerSession(authOptions);
    if(!session){
        return false;
    }
    return true;
}
