import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null,
    phoneNumber: null,
    guardianName: null,
    guardianContact: null,
    disease: null,
    doctorName: null,
    doctorContact: null,
    firstAid: null,
    gender: null,
    agree: null,
    address: null,
  });

  const [showPw, setShowPw] = useState(false);

  const handleSignup = async (event) => {
    event.preventDefault();

    if (data.password !== data.confirmPassword) {
      alert("Confirm password does not match with password.");
      return;
    }

    if (!data.gender) {
      alert("You must choose gender.");
      return;
    }

    if (!data.agree) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    try {
      await axios.post("/api/auth/register", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      window.location.href = "/";
    } catch (err) {
      if (err.response.status === 400) {
        alert("Duplicate email found.");
      } else if (err.response.status === 500) {
        alert("Account creation failed due to unknown issue");
      }
    }
  };

  return (
    <section
      className="container forms"
      style={{
        position: "sticky",
        overflow: "scroll",
        paddingTop: 0,
      }}
    >
      <div className="form signup">
        <div className="form-content">
          <header>Signup for ELC!</header>
          <form onSubmit={handleSignup}>
            <div className="field input-field">
              <input
                type="email"
                className="input"
                placeholder="Email"
                onChange={(event) => {
                  setData({
                    ...data,
                    email: event.target.value,
                  });
                }}
                required
              />
            </div>

            <div className="field input-field">
              <input
                type="password"
                placeholder="Create password"
                onChange={(event) => {
                  setData({
                    ...data,
                    password: event.target.value,
                  });
                }}
                required
              />
            </div>

            <div className="field input-field">
              <input
                type={showPw ? "text" : "password"}
                placeholder="Confirm password"
                onChange={(event) => {
                  setData({
                    ...data,
                    confirmPassword: event.target.value,
                  });
                }}
                required
              />
              <i
                className="bx bx-hide eye-icon"
                onClick={(event) => {
                  setShowPw(!showPw);
                }}
              ></i>
            </div>

            <div className="field input-field">
              <input
                type="text"
                placeholder="Your Phone Number"
                className="input"
                maxLength="13"
                onChange={(event) => {
                  setData({
                    ...data,
                    phoneNumber: event.target.value,
                  });
                }}
                required
              />
            </div>

            <div className="field input-field">
              <input
                type="text"
                className="input"
                name="guardianName"
                placeholder="Guardian's Name"
                maxLength="13"
                onChange={(event) => {
                  setData({
                    ...data,
                    guardianName: event.target.value,
                  });
                }}
                required
              />
            </div>

            <div className="field input-field">
              <input
                type="text"
                className="input"
                name="guardianContact"
                placeholder="Guardian's Contact"
                maxLength="13"
                onChange={(event) => {
                  setData({
                    ...data,
                    guardianContact: event.target.value,
                  });
                }}
                required
              />
            </div>

            <div className="field input-field">
              <input
                type="text"
                className="input"
                placeholder="First Name"
                onChange={(event) => {
                  setData({
                    ...data,
                    firstName: event.target.value,
                  });
                }}
                required
              />
            </div>

            <div className="field input-field">
              <input
                type="name"
                className="input"
                placeholder="Last Name"
                onChange={(event) => {
                  setData({
                    ...data,
                    lastName: event.target.value,
                  });
                }}
                required
              />
            </div>

            <div className="field input-field">
              <input
                className="input"
                type="disease"
                placeholder="Name of Disease"
                onChange={(event) => {
                  setData({
                    ...data,
                    disease: event.target.value,
                  });
                }}
                required
              />
            </div>

            <div className="field input-field">
              <input
                className="input"
                type="text"
                placeholder="How to give first aid when emergency:"
                onChange={(event) => {
                  setData({
                    ...data,
                    firstAid: event.target.value,
                  });
                }}
              />
            </div>

            <div className="field input-field">
              <input
                className="input"
                type="text"
                placeholder="Doctor's Name"
                onChange={(event) => {
                  setData({
                    ...data,
                    doctorName: event.target.value,
                  });
                }}
                required
              />
            </div>

            <div className="field input-field">
              <input
                type="text"
                className="input"
                placeholder="Doctor's Phone Number"
                maxLength="13"
                onChange={(event) => {
                  setData({
                    ...data,
                    doctorContact: event.target.value,
                  });
                }}
                required
              />
            </div>

            <div className="field input-field">
              <select
                name="gender"
                style={{
                  color: "#8b8b8b",
                  height: "50px",
                  width: "100%",
                  outline: "none",
                  padding: "0 15px",
                  border: "1px solid #CACACA",
                  fontSize: "16px",
                  fontWeight: 400,
                  borderRadius: "6px",
                }}
                onChange={(event) => {
                  setData({
                    ...data,
                    gender: event.target.value,
                  });
                }}
                required
              >
                <option value="">Gender (Must Select One)</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="non-binary">Non-Binary</option>
                <option value="other">Other</option>
                <option value="Prefer not to answer">
                  Perfer not to Answer
                </option>
              </select>
            </div>

            <div className="field input-field">
              <input
                type="text"
                className="address"
                name="address"
                placeholder="address"
                onChange={(event) => {
                  setData({
                    ...data,
                    address: event.target.value,
                  });
                }}
                required
              />
              <br />
            </div>

            <div className="field input-field">
              <p>
                Do you agree with using your personal information for this
                website?
              </p>
              <label htmlFor="agree">동의</label>
              <input
                type="radio"
                name="agree"
                value="agree"
                style={{ width: "30%", height: "1em",left:"2%", top:"2%", margin:"1em" }}
                onChange={(event) =>
                  setData({
                    ...data,
                    agree: true,
                  })
                }
              />
              <label htmlFor="disagree">비동의</label>
              <input
                type="radio"
                name="agree"
                value="disagree"
                style={{ width: "30%", height: "1em",left:"2%", top:"2%", margin:"1em"}}
                onChange={(event) =>
                  setData({
                    ...data,
                    agree: false,
                  })
                }
              />
            </div>

            <div className="field button-field" style={{ marginTop: "40px" }}>
              <input type="submit" value="Signup" />
            </div>
          </form>

          <div className="form-link">
            <span>
              이미 계정이 있으신가요?
              <Link className="link login-link" href="/">
                로그인
              </Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
