import React, { useContext, useState } from "react";
import { api } from "../api";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    const fn = firstName.trim();
    const ln = lastName.trim();
    const em = email.trim();
    const ph = String(phone).replace(/\D/g, "");
    const idNic = String(nic).replace(/\D/g, "");

    if (!fn || !ln || !em || !ph || !idNic || !dob || !gender || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (fn.length < 3 || ln.length < 3) {
      toast.error("First and last name must be at least 3 characters.");
      return;
    }
    if (ph.length !== 10) {
      toast.error("Mobile number must be exactly 10 digits (e.g. 0300123456).");
      return;
    }
    if (idNic.length !== 13) {
      toast.error("NIC must be exactly 13 digits.");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    try {
      const res = await api.post("/api/v1/user/patient/register", {
        firstName: fn,
        lastName: ln,
        email: em,
        phone: ph,
        nic: idNic,
        dob,
        gender,
        password,
      });
      toast.success(res.data.message || "Registration successful!");
      setIsAuthenticated(true);
      navigateTo("/");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setNic("");
      setDob("");
      setGender("");
      setPassword("");
    } catch (error) {
      const serverMsg = error?.response?.data?.message;
      const networkMsg =
        error?.code === "ERR_NETWORK" || error?.message === "Network Error"
          ? "Cannot reach the server. Run backend (npm start) on port 5000."
          : null;
      toast.error(serverMsg || networkMsg || error?.message || "Registration failed.");
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="container form-component register-form">
        <h2>Sign Up</h2>
        <p>Please Sign Up To Continue</p>
        <p>

           Someone is responsible for something, enjoying benefits or pleasures that come from effort or experience,
           even though there may be some mistakes or issues?
        </p>
        <form onSubmit={handleRegistration}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              inputMode="numeric"
              placeholder="Mobile (10 digits)"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
              required
              maxLength={10}
            />
          </div>
          <div>
            <input
              type="text"
              inputMode="numeric"
              placeholder="NIC (13 digits)"
              value={nic}
              onChange={(e) => setNic(e.target.value.replace(/\D/g, "").slice(0, 13))}
              required
              maxLength={13}
            />
            <input
              type={"date"}
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>
          <div>
            <select value={gender} onChange={(e) => setGender(e.target.value)} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Already Registered?</p>
            <Link
              to={"/login"}
              style={{ textDecoration: "none", color: "#271776ca" }}
            >
              Login Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit" onClick={handleRegistration}>Register</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
