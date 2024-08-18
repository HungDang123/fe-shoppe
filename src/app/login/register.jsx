import { useState } from "react";
import { Link } from "react-router-dom";
import gg_logo from "../../assets/google-logo-v2.svg";
import fb_logo from "../../assets/facebook-logo.svg";
import "./login.css";
import { registerUser } from "../../data/UserService";

const Register = () => {
  const [formValues, setFormValues] = useState({
    fullname: "",
    phone_number: "",
    password: "",
    retype_password: "",
    address: "",
    date_of_birth: new Date().setFullYear(new Date().getFullYear() - 18),
  });

  const [errors, setErrors] = useState({});

  window.scrollTo(0, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formValues.fullname) {
      newErrors.fullname = "Full name is required";
    }

    if (!formValues.phone_number) {
      newErrors.phone_number = "Phone number is required";
    } else if (!/^\d{10,15}$/.test(formValues.phone_number)) {
      newErrors.phone_number = "Phone number must be between 10 and 15 digits";
    }

    if (!formValues.password) {
      newErrors.password = "Password is required";
    } else if (formValues.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formValues.retype_password) {
      newErrors.retype_password = "Please retype your password";
    } else if (formValues.retype_password !== formValues.password) {
      newErrors.retype_password = "Passwords do not match";
    }

    if (!formValues.address) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = {
        fullname: formValues.fullname,
        phone_number: formValues.phone_number,
        password: formValues.password,
        retype_password: formValues.retype_password,
        address: formValues.address,
        date_of_birth: formValues.date_of_birth,
        facebook_account_id: 0,
        google_account_id: 0,
        role_id: 1,
      };
      try {
        const response = await registerUser(formData);
        if (response) {
          alert("Đăng ký thành công!");
        } else {
          alert("Đăng ký thất bại!");
        }
      } catch (error) {
        console.error("Error:", error);
        const query = `[Javascript] fix error: ${error.message}`;
        window.open(`https://chatgpt.com/?q=${encodeURIComponent(query)}`);
      }
    }
  };

  return (
    <>
      <div className="login-container container">
        <div className="body-login">
          <div className="form-login">
            <form onSubmit={handleSubmit}>
              <div className="form-title">
                <h1>ĐĂNG KÝ</h1>
                <p>
                  Đăng ký để sử dụng Plan for Trips và đặt xe và nơi ở tốt nhất
                </p>
              </div>
              <div className="form-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter fullname"
                  name="fullname"
                  style={{ width: "100%" }}
                  value={formValues.fullname}
                  onChange={handleInputChange}
                />
                {errors.fullname && (
                  <span className="error-message">{errors.fullname}</span>
                )}
                <br />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter phone number"
                  name="phone_number"
                  style={{ width: "100%" }}
                  value={formValues.phone_number}
                  onChange={handleInputChange}
                />
                {errors.phone_number && (
                  <span className="error-message">{errors.phone_number}</span>
                )}
                <br />
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  name="password"
                  value={formValues.password}
                  onChange={handleInputChange}
                />
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
                <br />
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter retype_password"
                  name="retype_password"
                  value={formValues.retype_password}
                  onChange={handleInputChange}
                />
                {errors.retype_password && (
                  <span className="error-message">
                    {errors.retype_password}
                  </span>
                )}
                <br />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter address"
                  name="address"
                  style={{ width: "100%" }}
                  value={formValues.address}
                  onChange={handleInputChange}
                />
                {errors.address && (
                  <span className="error-message">{errors.address}</span>
                )}
                <br />
              </div>
              <div className="form-footer">
                <button type="submit">Đăng ký</button> <br />
              </div>
              <div className="social-login">
                <h5>Hoặc đăng ký bằng</h5>
                <div className="button-login-social-network">
                  <Link to="#" className="btn btn-google">
                    <img src={gg_logo} alt="" />
                    Google
                  </Link>
                  <Link to="#" className="btn btn-facebook">
                    <img src={fb_logo} alt="" />
                    Facebook
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
