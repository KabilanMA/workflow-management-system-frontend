import axios from "../api/axios";

const LOGOUT_URL = "/logout"

const useLogout = () => {


    const logout = async () => {
        try {
            const response = await axios.get(LOGOUT_URL,
              );
            //   console.log(response);
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout