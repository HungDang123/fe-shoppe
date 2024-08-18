import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import gg_logo from "../../assets/google-logo-v2.svg";
import fb_logo from "../../assets/facebook-logo.svg";
import { loginUser } from "../../data/UserService";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext";
import { getAllRoles } from "../../data/RoleService";
import Combobox from "../components/Combobox";
const valueDefault = {
    value : 0,
    label : 'Chọn vai trò'
}
const Login = () => {
    const [roles, setRoles] = useState([]);
    const [formValues, setFormValues] = useState({
        phone_number: "12345678",
        password: "123456",
        role_id: 2, // Added role_id field
    });
    const { login } = useContext(UserContext);
    const [errors, setErrors] = useState({});
    const navi = useNavigate();
    useEffect(() => {
        const fetchRole = async () => {
            try {
                const rolesData = await getAllRoles();
                const transformedRoles = rolesData.map((role) => ({
                    value: role.id, // Adjust based on your API's response structure
                    label: role.name, // Adjust based on your API's response structure
                }));
                console.log(transformedRoles);
                setRoles(transformedRoles);
            } catch (error) {
                console.error("Error:", error);
                const query = `[Javascript] fix error: ${error.message}`;
                window.open(`https://chatgpt.com/?q=${encodeURIComponent(query)}`);
            }
        };
        fetchRole();
    }, []);

    window.scrollTo(0, 0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleRoleChange = (value) => {
        setFormValues({
            ...formValues,
            role_id: value,
        });
        console.log(formValues.role_id);
        
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formValues.phone_number) {
            newErrors.phone_number = "Phone number is required";
        } 
        // else if (!/^\d{10,15}$/.test(formValues.phone_number)) {
        //     newErrors.phone_number = "Phone number must be between 10 and 15 digits";
        // }

        if (!formValues.password) {
            newErrors.password = "Password is required";
        } else if (formValues.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!formValues.role_id) {
            newErrors.role_id = "Role is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const userData = {
                phone_number: formValues.phone_number,
                password: formValues.password,
                role_id: formValues.role_id,
            };
            console.log(userData);

            try {
                const response = await loginUser(userData);
                if (response) {
                    alert(response.message);
                    login(response.object);
                    navi("/");
                } else {
                    alert(response.message);
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
                        <form action="" method="" onSubmit={handleSubmit}>
                            <div className="form-title">
                                <h1>ĐĂNG NHẬP</h1>
                                <p>
                                    Đăng nhập để sử dụng Plan for Trips và đặt xe và nơi ở tốt
                                    nhất
                                </p>
                            </div>
                            <div className="form-body">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter phone number"
                                    style={{ width: "100%" }}
                                    name="phone_number"
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
                                    placeholder="Nhập password"
                                    name="password"
                                    value={formValues.password}
                                    onChange={handleInputChange}
                                />
                                {errors.password && (
                                    <span className="error-message">{errors.password}</span>
                                )}
                                <br />
                                <Combobox item={roles} handleChange={handleRoleChange} valueDefault={valueDefault} />
                                {errors.role_id && (
                                    <span className="error-message">{errors.role_id}</span>
                                )}
                            </div>
                            <div className="form-footer">
                                <button type="submit" onClick={() => handleSubmit}>
                                    Đăng nhập
                                </button>
                                <br />
                                <Link to="/register">
                                    Chưa có tài khoản?<span>Đăng ký ngay</span>
                                </Link>
                            </div>
                            <div className="social-login">
                                <h5>Hoặc đăng nhập bằng</h5>
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

export default Login;
