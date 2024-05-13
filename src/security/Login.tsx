import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { User } from "../service/authFacade";

export default function Login() {
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    const [user, setUser] = useState({ username: "", password: "" });
    const [err, setErr] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();
    const from = location.state?.from?.pathname || "/";

    // const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   setUsername(event.target.value);
    // };

    // const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   setPassword(event.target.value);
    // };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log("Username:", username);
        // console.log("Password:", password);
        // Add login logic here
        const formData = new FormData(e.currentTarget);
        console.log(formData.get("username"));
        const user = Object.fromEntries(formData) as unknown as User;
        console.log(user);

        // Reset error message
        setErr(null);
        // console.log(err);

        auth.signIn(user)
            .then(() => {
                console.log(from);
                navigate(from, { replace: true });
            })
            .catch((error) => {
                setErr(error);
                console.log(err);
            });
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header" style={{ fontSize: "20px", fontWeight: "bold" }}>
                            Login
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        id="username"
                                        value={user.username}
                                        onChange={(e) => setUser((prev) => ({ ...prev, username: e.target.value }))}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        id="password"
                                        value={user.password}
                                        onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-dark">
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
