import { useContext } from "react";
import AuthContext from "../context/authContext";

const Home = () => {
    const authContext = useContext(AuthContext);

    return (
        <>
            <h1>Dashboard!</h1>
            <p>Hi, {authContext.name}</p>
        </>
    );
}

export default Home;