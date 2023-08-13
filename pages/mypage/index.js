import axios from "axios";
import { toDataURL } from "qrcode";
import { useState } from "react";

export default function Home({ data }) {
  const [formData, setFormData] = useState(data);

  const handleUserUpdate = async (event) => {
    event.preventDefault();

    try {
      await axios.put("api/users/profile", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          withCredentials: true,
        },
      });

      alert("User data updated!");

      window.location.reload();
    } catch (err) {
      if (err.response.status === 400) {
        alert("Input error");
      } else if (err.response.status === 401) {
        alert("Authentication error");
      } else if (err.response.status === 500) {
        alert("User update failed with unknown error.");
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
          <header>내 프로필</header>
          <form onSubmit={handleUserUpdate}>
            <div className="field input-field">
              <label htmlFor="firstName">이름:</label>
              <input
                type="text"
                name="firstName"
                className="input"
                placeholder="이름"
                value={formData.firstName}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    firstName: event.target.value,
                  });
                }}
                required
              />
            </div>

            <div className="field input-field">
              <label htmlFor="lastName">성:</label>
              <input
                type="text"
                name="lastName"
                className="input"
                placeholder="성"
                value={formData.lastName}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    lastName: event.target.value,
                  });
                }}
                required
              />
            </div>
            <div className="field input-field">
              <label htmlFor="email">이메일:</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="이메일"
                value={formData.email}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    email: event.target.value,
                  });
                }}
                required
              />
            </div>

            <div className="field input-field">
              <label htmlFor="phoneNumber">전화번호:</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="전화번호"
                className="input"
                maxLength="13"
                value={formData.phoneNumber}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    phoneNumber: event.target.value,
                  });
                }}
                required
              />
            </div>

            <div className="field input-field">
              <label htmlFor="guardianName">보호자명:</label>
              <input
                type="text"
                className="input"
                name="guardianName"
                placeholder="보호자명"
                maxLength="13"
                value={formData.guardianName}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    guardianName: event.target.value,
                  });
                }}
                required
              />
            </div>

            <div className="field input-field">
              <label htmlFor="guardianContact">보호자 연락처:</label>
              <input
                type="text"
                className="input"
                name="guardianContact"
                placeholder="보호자 연락처"
                maxLength="13"
                value={formData.guardianContact}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    guardianContact: event.target.value,
                  });
                }}
                required
              />
            </div>

            

            <div className="field input-field">
              <label htmlFor="disease">병명:</label>
              <input
                className="input"
                name="disease"
                type="text"
                placeholder="병명"
                value={formData.disease}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    disease: event.target.value,
                  });
                }}
                required
              />
            </div>

            <div className="field input-field">
              <label htmlFor="firstAid">응급시 조치 방법:</label>
              <input
                className="input"
                name="firstAid"
                type="text"
                placeholder="응급시 조치 방법:"
                value={formData.firstAid}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    firstAid: event.target.value,
                  });
                }}
              />
            </div>

            <div className="field input-field">
              <label htmlFor="doctorName">주치의명:</label>
              <input
                className="input"
                name="doctorName"
                type="text"
                placeholder="주치의명"
                value={formData.doctorName}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    doctorName: event.target.value,
                  });
                }}
                required
              />
            </div>

            <div className="field input-field">
              <label htmlFor="doctorContact">주치의 연락처:</label>
              <input
                type="text"
                className="input"
                placeholder="주치의 연락처"
                value={formData.doctorContact}
                maxLength="13"
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    doctorContact: event.target.value,
                  });
                }}
                required
              />
            </div>

            <div className="field input-field">
              <label htmlFor="gender">성별:</label>
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
                value={formData.gender}
                onChange={(event) => {
                  setFormData({
                    ...formData,
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
              <label htmlFor="address">주소:</label>
              <input
                type="text"
                className="address"
                name="address"
                placeholder="주소"
                value={formData.address}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    address: event.target.value,
                  });
                }}
                required
              />
              <br />
            </div>

            <div className="field button-field" style={{ marginTop: "40px" }}>
              <input type="submit" value="저장" />
            </div>
          </form>

          <a download="qrcode.png" href={data.qrCodeUrl}>
            <div className="field button-field" style={{ color: "black" }}>
              <input type="button" value="QR 코드 다운로드하기" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

export async function getServerSideProps(context) {
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/api/users/profile`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: context.req.headers.cookie,
        },
        withCredentials: true,
      }
    );

    const url = `${process.env.BASE_URL}/users/${response.data.id}`;
    const qrCodeUrl = await toDataURL(url);

    return { props: { data: { ...response.data, qrCodeUrl } } };
  } catch (err) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
}
