import { useContext } from "react";
import AuthContext from "../context/authContext";

const Home = () => {
    const authContext = useContext(AuthContext);

    return (
        <div className="content">
            <h1>Dashboard!</h1>
            <p>Hi, {authContext.name}</p>
        </div>
    );
}

export default Home;