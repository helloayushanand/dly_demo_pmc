import { useEffect, useState } from "react";

import {
  ArrowRight,
  BarChart3,
  Database,
  Eye,
  EyeOff,
  Landmark,
  LockKeyhole,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import {
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    document.title =
      "Admin Login | Beneficiary Analytics";
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const requestedRoute =
    location.state?.from || "/dashboard";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!username.trim() || !password) {
      setErrorMessage(
        "Please enter both username and password."
      );

      return;
    }

    try {
      setIsSubmitting(true);

      await login(username, password);

      navigate(requestedRoute, {
        replace: true,
      });
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to sign in. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setErrorMessage("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrorMessage("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((currentValue) => !currentValue);
  };

  return (
    <main className="login-page">
      <section className="login-information-panel">
        <div className="login-information-content">
          <div className="login-government-brand">
            <div className="login-brand-symbol">
              <Landmark
                size={27}
                aria-hidden="true"
              />
            </div>

            <div>
              <strong>
                Department of Social Welfare and
                Empowerment
              </strong>

              <span>
                Government Services Administration
              </span>
            </div>
          </div>

          <div className="login-hero-copy">
            <span className="login-eyebrow">
              Integrated Digital Governance Platform
            </span>

            <h1>
              Beneficiary Analytics and Monitoring System
            </h1>

            <p>
              A unified administrative dashboard for
              monitoring beneficiaries, applications,
              sanctions, DBT payments, and citizen
              grievances.
            </p>
          </div>

          <div className="login-feature-grid">
            <article>
              <div className="login-feature-icon">
                <BarChart3
                  size={20}
                  aria-hidden="true"
                />
              </div>

              <div>
                <strong>Unified Analytics</strong>

                <span>
                  Track scheme performance through
                  interactive dashboards.
                </span>
              </div>
            </article>

            <article>
              <div className="login-feature-icon">
                <Database
                  size={20}
                  aria-hidden="true"
                />
              </div>

              <div>
                <strong>Integrated Data</strong>

                <span>
                  Review applications, payments, and
                  grievances in one system.
                </span>
              </div>
            </article>

            <article>
              <div className="login-feature-icon">
                <ShieldCheck
                  size={20}
                  aria-hidden="true"
                />
              </div>

              <div>
                <strong>Secure Administration</strong>

                <span>
                  Restricted access for authorized
                  administrative users.
                </span>
              </div>
            </article>
          </div>
        </div>

        <div className="login-information-footer">
          <ShieldCheck
            size={16}
            aria-hidden="true"
          />

          <span>
            Authorized access only. Activity may be
            monitored for demonstration purposes.
          </span>
        </div>
      </section>

      <section className="login-form-panel">
        <div className="login-form-container">
          <div className="mobile-login-brand">
            <div className="login-brand-symbol">
              <Landmark
                size={23}
                aria-hidden="true"
              />
            </div>

            <div>
              <strong>Beneficiary Portal</strong>
              <span>Government Services</span>
            </div>
          </div>

          <div className="login-form-heading">
            <span className="admin-access-badge">
              <LockKeyhole
                size={14}
                aria-hidden="true"
              />

              ADMIN ACCESS
            </span>

            <h2>Welcome back</h2>

            <p>
              Sign in with your administrator credentials
              to access the beneficiary analytics
              dashboard.
            </p>
          </div>

          <form
            className="login-form"
            onSubmit={handleSubmit}
          >
            <label
              className="login-field"
              htmlFor="username"
            >
              <span>Username</span>

              <div className="login-input-wrapper">
                <UserRound
                  size={18}
                  aria-hidden="true"
                />

                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="Enter admin username"
                  disabled={isSubmitting}
                  autoFocus
                  required
                />
              </div>
            </label>

            <label
              className="login-field"
              htmlFor="password"
            >
              <span>Password</span>

              <div className="login-input-wrapper">
                <LockKeyhole
                  size={18}
                  aria-hidden="true"
                />

                <input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  autoComplete="current-password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter admin password"
                  disabled={isSubmitting}
                  required
                />

                <button
                  className="password-visibility-button"
                  type="button"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  aria-pressed={showPassword}
                  onClick={togglePasswordVisibility}
                  disabled={isSubmitting}
                >
                  {showPassword ? (
                    <EyeOff
                      size={18}
                      aria-hidden="true"
                    />
                  ) : (
                    <Eye
                      size={18}
                      aria-hidden="true"
                    />
                  )}
                </button>
              </div>
            </label>

            {errorMessage && (
              <div
                className="login-error-message"
                role="alert"
                aria-live="polite"
              >
                {errorMessage}
              </div>
            )}

            <button
              className="login-submit-button"
              type="submit"
              disabled={isSubmitting}
            >
              <span>
                {isSubmitting
                  ? "Signing in..."
                  : "Sign in to Dashboard"}
              </span>

              {!isSubmitting && (
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                />
              )}
            </button>
          </form>

          <div className="login-security-note">
            <ShieldCheck
              size={15}
              aria-hidden="true"
            />

            <span>
              Protected administrative access
            </span>
          </div>

          <p className="login-prototype-note">
            Prototype environment using synthetic
            demonstration data.
          </p>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;