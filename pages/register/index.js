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
      alert("입력하신 비밀번호가 서로 일치하지 않습니다.");
      return;
    }

    if (!data.gender) {
      alert("성별을 선택해주십시오.");
      return;
    }

    if (!data.agree) {
      alert("이용약관에 동의해주십시오.");
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
          <header>ELC에 회원가입하세요!</header>
          <form onSubmit={handleSignup}>
            <div className="field input-field">
              <input
                type="email"
                className="input"
                placeholder="이메일"
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
                placeholder="비밀번호"
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
                placeholder="비밀번호 확인"
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
                className="input"
                placeholder="이름"
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
                placeholder="성"
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
                type="text"
                placeholder="전화번호"
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
                placeholder="보호자명"
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
                placeholder="보호자 연락처"
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
                className="input"
                type="disease"
                placeholder="병명"
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
                placeholder="응급시 조치 방법"
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
                placeholder="주치의명"
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
                placeholder="주치의 연락처 (병원 연락처)"
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
                <option value="">성별 (필수 선택)</option>
                <option value="female">여성</option>
                <option value="male">남성</option>
                <option value="non-binary">양성</option>
                <option value="other">그 외</option>
                <option value="Prefer not to answer">
                  대답하고 싶지 않습니다
                </option>
              </select>
            </div>

            <div className="field input-field">
              <input
                type="text"
                className="address"
                name="address"
                placeholder="주소"
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
               귀하의 개인정보를 이 웹사이트에 사용하는 것을 동의하십니까?
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
              <input type="submit" value="회원가입" />
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
