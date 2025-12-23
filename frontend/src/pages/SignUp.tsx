import { type FormEvent, useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!firstName.trim() || firstName.trim().length < 2) {
      errs.firstName = "First name must be at least 2 characters.";
    }

    if (!lastName.trim() || lastName.trim().length < 2) {
      errs.lastName = "Last name must be at least 2 characters.";
    }

    if (!email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    if (!phone.trim()) {
      errs.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(phone.trim())) {
      errs.phone = "Phone number must be 10 digits.";
    }

    if (!password || password.length < 8) {
      errs.password = "Password must be at least 8 characters.";
    }

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validate()) {
      return;
    }

    setLoading(true);

    const name = `${firstName.trim()} ${lastName.trim()}`.trim();

    try {
      const res = await axios.post("http://localhost:5000/signup", {
        name,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
      });

      alert(res.data.message || "Signup successful 🎉");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact" style={{ minHeight: "100vh" }}>
      <div className="section-container">
        <div className="contact-content">
          <div className="contact-info">
            <h2>Join Shreyas Academy</h2>
            <p>
              Create your student account to unlock elite NEET mentorship,
              personalized study plans, and direct guidance from toppers.
            </p>
          </div>

          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                {fieldErrors.firstName && (
                  <span className="error-message">{fieldErrors.firstName}</span>
                )}
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                {fieldErrors.lastName && (
                  <span className="error-message">{fieldErrors.lastName}</span>
                )}
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {fieldErrors.email && (
                  <span className="error-message">{fieldErrors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                {fieldErrors.phone && (
                  <span className="error-message">{fieldErrors.phone}</span>
                )}
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {fieldErrors.password && (
                  <span className="error-message">{fieldErrors.password}</span>
                )}
              </div>

              {error && (
                <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
              )}

              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Sign Up"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;

