import React, { useState } from "react";

const Login = ({ onLogin }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = () => {
        if (password !== confirmPassword) {
            alert("Password dan konfirmasi password tidak cocok!");
            return;
        }
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        if (users.find((user) => user.username === username)) {
            alert("Username sudah digunakan!");
            return;
        }
        users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registrasi berhasil! Silakan login.");
        setIsRegistering(false);
    };

    const handleLogin = () => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find((user) => user.username === username && user.password === password);
        if (user) {
            onLogin();
        } else {
            alert("Username atau password salah!");
        }
    };

    return (
        <div className="Login">
            <h1>{isRegistering ? "Daftar" : "Login"}</h1>
            <div>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                {isRegistering && (
                    <label>
                        Konfirmasi Password:
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </label>
                )}
                <br />
                {isRegistering ? (
                    <button onClick={handleRegister}>Daftar</button>
                ) : (
                    <button onClick={handleLogin}>Login</button>
                )}
                <br />
                <button onClick={() => 
                    setIsRegistering(!isRegistering)
                    }>
                    {isRegistering ? "Sudah punya akun? Login" : "Belum punya akun? Daftar"}
                </button>
            </div>
        </div>
    );
};

export default Login;