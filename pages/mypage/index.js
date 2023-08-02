import axios from "axios";
import { useState } from "react";

export default function Home({ data }) {
  const [formData, setFormData] = useState(data);

  const handleUserUpdate = async (event) => {
    event.preventDefault();

    try {
       await axios.put('api/users/profile', formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          withCredentials: true
        },
      });

      alert('User data updated!');

      window.location.reload();
  } catch(err) {
      if(err.response.status === 400) {
        alert('Input error');
      } else if(err.response.status === 401) {
        alert('Authentication error');
      } else if(err.response.status === 500) {
        alert('User update failed with unknown error.');
      }
    }
  }

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
          <form onSubmit={handleUserUpdate}>
            <div className="field input-field">
              <input
                type="email"
                className="input"
                placeholder="Email"
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
              <input
                type="text"
                placeholder="Your Phone Number"
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
              <input
                type="text"
                className="input"
                name="guardianName"
                placeholder="Guardian's Name"
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
              <input
                type="text"
                className="input"
                name="guardianContact"
                placeholder="Guardian's Contact"
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
              <input
                type="text"
                className="input"
                placeholder="First Name"
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
              <input
                type="name"
                className="input"
                placeholder="Last Name"
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
              <input
                className="input"
                type="disease"
                placeholder="Name of Disease"
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
              <input
                className="input"
                type="text"
                placeholder="How to give first aid when emergency:"
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
              <input
                className="input"
                type="text"
                placeholder="Doctor's Name"
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
              <input
                type="text"
                className="input"
                placeholder="Doctor's Phone Number"
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
              <select
                name="gender"
                style={{
                  color: "#8b8b8b",
                  height: "100%",
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
              <input type="submit" value="Save  " />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export async function getServerSideProps(context) {
  try {
    const response = await axios.get(
      `${process.env.API_BASE_URL}/api/users/profile`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: context.req.headers.cookie,
        },
        withCredentials: true,
      }
    );

    return { props: { data: response.data } };
  } catch (err) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
}
