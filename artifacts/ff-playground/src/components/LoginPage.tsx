import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimeCat, { CatState } from "./AnimeCat";
import ParticleBackground from "./ParticleBackground";
import ScratchIntro from "./ScratchIntro";
import { saveUser, findUser, userExists, setLoggedIn } from "../lib/auth";

interface LoginPageProps {
  onSuccess: () => void;
}

export default function LoginPage({ onSuccess }: LoginPageProps) {
  const [introOver, setIntroOver] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [catState, setCatState] = useState<CatState>("idle");
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);
  const [phase, setPhase] = useState<"form" | "dancing" | "exiting">("form");
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearIdle = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
  }, []);

  const startIdle = useCallback(() => {
    clearIdle();
    idleTimerRef.current = setTimeout(() => setCatState("speech"), 3000);
  }, [clearIdle]);

  useEffect(() => () => clearIdle(), [clearIdle]);

  const triggerShake = () => {
    setShaking(true);
    setTimeout(() => setShaking(false), 600);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      triggerShake();
      return;
    }

    if (mode === "signup") {
      if (password.length < 4) {
        setError("Password must be at least 4 characters.");
        triggerShake();
        return;
      }
      if (userExists(username.trim())) {
        setError("Username already taken.");
        triggerShake();
        return;
      }
      saveUser({ username: username.trim(), password });
      setCatState("success");
      await new Promise((r) => setTimeout(r, 800));
    } else {
      const ok = findUser(username.trim(), password);
      if (!ok) {
        setError("Wrong credentials. Try again.");
        triggerShake();
        setCatState("idle");
        return;
      }
    }

    // Dance → transition
    setCatState("dance");
    setPhase("dancing");
    setTimeout(() => {
      setPhase("exiting");
      setTimeout(() => {
        setLoggedIn();
        onSuccess();
      }, 600);
    }, 2800);
  };

  return (
    <div className="login-page-root">
      <ParticleBackground />

      {/* Scratch Intro */}
      <AnimatePresence>
        {!introOver && <ScratchIntro onDone={() => setIntroOver(true)} />}
      </AnimatePresence>

      {/* Login UI */}
      <AnimatePresence>
        {introOver && phase !== "exiting" && (
          <motion.div
            key="login-ui"
            className="login-stage"
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Glassmorphism card */}
            <motion.div
              className="login-card"
              animate={shaking ? {
                x: [-12, 12, -10, 10, -6, 6, -3, 3, 0],
              } : { x: 0 }}
              transition={shaking ? { duration: 0.55, ease: "easeInOut" } : {}}
            >
              {/* Top glow line */}
              <div className="login-card-glow-line" />

              {/* Cat */}
              <AnimatePresence mode="wait">
                {phase === "dancing" ? (
                  <motion.div
                    key="cat-center"
                    initial={{ opacity: 0, scale: 0.6, x: 0 }}
                    animate={{ opacity: 1, scale: 1.15, x: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    style={{ width: "100%", display: "flex", justifyContent: "center" }}
                  >
                    <AnimeCat state="dance" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="cat-side"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="cat-slot"
                  >
                    <AnimeCat state={catState} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <AnimatePresence>
                {phase === "form" && (
                  <motion.div
                    key="form"
                    className="login-form-area"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                  >
                    {/* Toggle */}
                    <div className="mode-toggle">
                      {(["login", "signup"] as const).map((m) => (
                        <button
                          key={m}
                          className={`mode-btn ${mode === m ? "mode-btn--active" : ""}`}
                          onClick={() => { setMode(m); setError(""); }}
                          type="button"
                        >
                          {m === "login" ? "Login" : "Sign Up"}
                        </button>
                      ))}
                    </div>

                    <motion.h2
                      className="login-title"
                      key={mode}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {mode === "login" ? "Welcome Back" : "Create Account"}
                    </motion.h2>
                    {mode === "signup" && (
                      <motion.p
                        className="login-subtitle"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
                      >
                        Join the Free Fire Developer Community
                      </motion.p>
                    )}

                    <form onSubmit={handleSubmit} className="login-form" noValidate>
                      <div className="login-field">
                        <label className="login-label">Username</label>
                        <input
                          className="login-input"
                          type="text"
                          placeholder="Enter your username"
                          value={username}
                          autoComplete="username"
                          onChange={(e) => {
                            setUsername(e.target.value);
                            setError("");
                            clearIdle();
                            setCatState("smile");
                            startIdle();
                          }}
                          onFocus={() => { setCatState("smile"); startIdle(); }}
                          onBlur={() => { clearIdle(); if (catState === "smile" || catState === "speech") setCatState("idle"); }}
                        />
                      </div>

                      <div className="login-field">
                        <label className="login-label">Password</label>
                        <input
                          className="login-input"
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          autoComplete={mode === "login" ? "current-password" : "new-password"}
                          onChange={(e) => { setPassword(e.target.value); setError(""); }}
                          onFocus={() => { clearIdle(); setCatState("laugh"); }}
                          onBlur={() => setCatState("idle")}
                        />
                      </div>

                      <AnimatePresence>
                        {error && (
                          <motion.p
                            className="login-error"
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.25 }}
                          >
                            {error}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      <button className="login-submit" type="submit">
                        {mode === "login" ? "Login" : "Sign Up"}
                      </button>
                    </form>
                  </motion.div>
                )}

                {phase === "dancing" && (
                  <motion.p
                    key="dance-label"
                    className="dance-label"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ flex: 1, textAlign: "center", alignSelf: "center" }}
                  >
                    Unlocking Playground...
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Brand */}
            <motion.div
              className="login-brand"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span className="login-brand-title">TALHA</span>
              <span className="login-brand-sub">API Playground &mdash; Security Gate</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
