import { useState, ChangeEvent, FormEvent } from "react";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import Alert from "../ui/alert/Alert"; // Import your Alert component
import axios, { AxiosError } from "axios";
import cookies from "js-cookie";
import { useNavigate } from "react-router";
import Spinner from "../ui/spinner/spinner";

interface User {
  email: string;
  password: string;
}

interface Errors {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  message: string;
  user: {
    email: string;
  };
}

interface AlertData {
  type: "success" | "error";
  message: string;
}

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [user, setUser] = useState<User>({ email: "", password: "" });
  const [errors, setErrors] = useState<Errors>({ email: "", password: "" });
  const [alert, setAlert] = useState<AlertData | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    let errorMsg = "";

    if (name === "email") {
      if (!value) {
        errorMsg = "Email is required!";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        errorMsg = "Please enter a valid email!";
      }
    }

    if (name === "password") {
      if (!value) {
        errorMsg = "Password is required!";
      } else if (value.length < 6) {
        errorMsg = "Password must be at least 6 characters!";
      }
    }

    setErrors({ ...errors, [name]: errorMsg });
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = { email: "", password: "" };
    let isValid = true;

    if (!user.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = "Please enter a valid email!";
      isValid = false;
    }

    if (!user.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters!";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const showTemporaryAlert = (type: "success" | "error", message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 4000);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await axios.post<LoginResponse>(
        `${import.meta.env.VITE_BACKEND_URL}/admin/signin`,
        user
      );
      const token = res.data.token;
      cookies.set(import.meta.env.VITE_COOKIE_TOKEN_NAME!, token);

      showTemporaryAlert("success", res.data.message);
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      showTemporaryAlert(
        "error",
        error.response?.data.message ?? error.message
      );
      console.error("Error signing in:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      {alert && (
        <div className="fixed top-5 right-5 z-50 w-[300px]">
          <Alert
            variant={alert.type}
            title={alert.type === "success" ? "Success" : "Error"}
            message={alert.message}
          />
        </div>
      )}

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <Label>
                  Email <span className="text-error-500">*</span>
                </Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="info@gmail.com"
                  value={user.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  hint={errors.email}
                />
              </div>

              <div>
                <Label>
                  Password <span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={user.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    hint={errors.password}
                    rightIcon={
                      <span onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? (
                          <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                        ) : (
                          <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                        )}
                      </span>
                    }
                  />
                </div>
              </div>

              <div>
                <Button
                  className="w-full flex justify-center items-center"
                  size="sm"
                  type="submit"
                >
                  {loading ? (
                    <Spinner size={20} color="white"/>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
