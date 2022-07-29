import Axios from "../api/axios"
// import useAuth from "./useAuth";

const useRefreshToken = () => {
    // const { setAuth } = useAuth()
    console.log("WWWWWW")

    const refresh = async () => {
        const response = await Axios.get('/refresh', {

            withCredentials: true
        });
        // setAuth(prev => { 
        //     console.log(JSON.stringify(prev));
        //     console.log(response.data.accessToken);
        //     return { ...prev, accessToken: response.data.accessToken }
        // });
        // console.log("my local storage", localStorage.getItem("user"))
        // console.log("response", response.data.accessToken)

        const currentUserData = JSON.parse(localStorage.getItem("user"))
        currentUserData.accessToken = response.data.accessToken
        localStorage.setItem("user", JSON.stringify(currentUserData))
        // console.log("my new local storage", localStorage.getItem("user"))

        return response.data.accessToken;
    }

    return refresh;
}

export default useRefreshToken;