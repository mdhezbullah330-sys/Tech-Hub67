import { useState, useRef, useCallback, useEffect } from "react";
import AnimeCat, { CatState } from "./AnimeCat";
import ParticleBackground from "./ParticleBackground";
import { getUsers, saveUser, findUser, userExists, setLoggedIn } from "../lib/auth";

interface LoginPageProps {
  onSuccess: () => void;
}

export default function LoginPage({ onSuccess }: LoginPageProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [catState, setCatState] = useState<CatState>("idle");
  const [error, setError] = useState("");
  const [dancing, setDancing] = useState(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTypedRef = useRef<number>(0);

  const clearIdleTimer = useCallback(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  }, []);

  const startIdleTimer = useCallback(() => {
    clearIdleTimer();
    idleTimerRef.current = setTimeout(() => {
      setCatState("speech");
    }, 3000);
  }, [clearIdleTimer]);

  useEffect(() => {
    return () => clearIdleTimer();
  }, [clearIdleTimer]);

  const handleUsernameFocus = () => {
    setCatState("smile");
    startIdleTimer();
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setError("");
    lastTypedRef.current = Date.now();
    clearIdleTimer();
    if (catState !== "smile") setCatState("smile");
    startIdleTimer();
  };

  const handleUsernameBlur = () => {
    clearIdleTimer();
    if (catState === "smile" || catState === "speech") setCatState("idle");
  };

  const handlePasswordFocus = () => {
    clearIdleTimer();
    setCatState("laugh");
  };

  const handlePasswordBlur = () => {
    setCatState("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (mode === "signup") {
      if (password.length < 4) {
        setError("Password must be at least 4 characters.");
        return;
      }
      if (userExists(username.trim())) {
        setError("Username already taken. Try another.");
        return;
      }
      saveUser({ username: username.trim(), password });
    } else {
      if (!findUser(username.trim(), password)) {
        // allow any login if no users exist yet
        const users = getUsers();
        if (users.length > 0) {
          setError("Invalid username or password.");
          return;
        }
      }
    }

    // Trigger dance
    setCatState("dance");
    setDancing(true);

    setTimeout(() => {
      setLoggedIn();
      onSuccess();
    }, 2800);
  };

  return (
    <div className="login-page-root">
      <ParticleBackground />

      <div className={`login-stage ${dancing ? "login-stage--exit" : ""}`}>
        <div className="login-card">
          {/* Cat */}
          <div className={`cat-slot ${dancing ? "cat-slot--center" : ""}`}>
            <AnimeCat state={catState} />
          </div>

          {/* Form */}
          {!dancing && (
            <div className="login-form-area">
              {/* Mode toggle */}
              <div className="mode-toggle">
                <button
                  className={`mode-btn ${mode === "login" ? "mode-btn--active" : ""}`}
                  onClick={() => { setMode("login"); setError(""); }}
                  type="button"
                >
                  Login
                </button>
                <button
                  className={`mode-btn ${mode === "signup" ? "mode-btn--active" : ""}`}
                  onClick={() => { setMode("signup"); setError(""); }}
                  type="button"
                >
                  Sign Up
                </button>
              </div>

              <h2 className="login-title">
                {mode === "login" ? "Welcome Back" : "Create Account"}
              </h2>
              {mode === "signup" && (
                <p className="login-subtitle">Join the Free Fire Developer Community</p>
              )}

              <form onSubmit={handleSubmit} className="login-form">
                <div className="login-field">
                  <label className="login-label">Username</label>
                  <input
                    className="login-input"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={handleUsernameChange}
                    onFocus={handleUsernameFocus}
                    onBlur={handleUsernameBlur}
                    autoComplete="username"
                  />
                </div>

                <div className="login-field">
                  <label className="login-label">Password</label>
                  <input
                    className="login-input"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    onFocus={handlePasswordFocus}
                    onBlur={handlePasswordBlur}
                    autoComplete={mode === "login" ? "current-password" : "new-password"}
                  />
                </div>

                {error && <p className="login-error">{error}</p>}

                <button className="login-submit" type="submit">
                  {mode === "login" ? "Login" : "Sign Up"}
                </button>
              </form>
            </div>
          )}

          {dancing && (
            <p className="dance-label">Unlocking playground...</p>
          )}
        </div>

        {/* TALHA brand */}
        <div className="login-brand">
          <span className="login-brand-title">TALHA</span>
          <span className="login-brand-sub">API Playground — Security Gate</span>
        </div>
      </div>
    </div>
  );
}
