import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const formLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "api/auth/login",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-urlencoded",
          },
          withCredentials: true,
        }
      );
      window.location.href = "/mypage";
    } catch (err) {
      if (err.response.status === 200) {
        window.location.href = "/mypage";
      } else if (err.response.status === 400) {
        alert("Email or password is wrong");
      } else {
        alert("Unknown error occured.");
      }
    }
  };

  return (
    <div className="form login">
      <div className="form-content">
        <header>Login for ELC!</header>
        <form onSubmit={formLogin}>
          <div className="field input-field">
            <input
              className="input"
              type="email"
              placeholder="Email"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div className="field input-field">
            <input
              type={showPw ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <i
              className="bx bx-hide eye-icon"
              onClick={(event) => {
                setShowPw(!showPw);
              }}
            ></i>
          </div>

          <div className="form-link">
            <Link href="/reset-password">Forgot password?</Link>
          </div>

          <div className="field button-field">
            <input type="submit" value="Login" />
          </div>
        </form>

        <div className="form-link">
          <span>
            Dont have an account?
            <Link href="/register">Signup</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
