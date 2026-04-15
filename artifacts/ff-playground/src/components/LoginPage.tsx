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
  const [catSpeech, setCatSpeech] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);
  const [phase, setPhase] = useState<"form" | "dancing" | "exiting">("form");

  const userIdleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const passIdleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const speechTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearSpeech = useCallback((delay = 3000) => {
    if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
    speechTimerRef.current = setTimeout(() => {
      setCatSpeech(null);
      setCatState("idle");
    }, delay);
  }, []);

  const showSpeech = useCallback((msg: string, catS: CatState = "speech") => {
    setCatSpeech(msg);
    setCatState(catS);
    clearSpeech(3000);
  }, [clearSpeech]);

  useEffect(() => () => {
    if (userIdleRef.current) clearTimeout(userIdleRef.current);
    if (passIdleRef.current) clearTimeout(passIdleRef.current);
    if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
  }, []);

  const triggerShake = () => {
    setShaking(true);
    setTimeout(() => setShaking(false), 600);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Both fields are required.");
      triggerShake();
      showSpeech("Both fields are required!", "speech");
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
        showSpeech("Hmm... that's not right!", "speech");
        return;
      }
    }

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

      <AnimatePresence>
        {!introOver && <ScratchIntro onDone={() => setIntroOver(true)} />}
      </AnimatePresence>

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
            <motion.div
              className="login-card"
              animate={shaking ? { x: [-12, 12, -10, 10, -6, 6, -3, 3, 0] } : { x: 0 }}
              transition={shaking ? { duration: 0.55, ease: "easeInOut" } : {}}
            >
              <div className="login-card-glow-line" />

              {/* Cat */}
              <AnimatePresence mode="wait">
                {phase === "dancing" ? (
                  <motion.div
                    key="cat-center"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1.15 }}
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
                    style={{ position: "relative" }}
                  >
                    {/* Custom speech bubble for cat */}
                    <AnimatePresence>
                      {catSpeech && (
                        <motion.div
                          key="cat-speech"
                          initial={{ opacity: 0, scale: 0.7, y: 6 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ type: "spring", stiffness: 400, damping: 22 }}
                          style={{
                            position: "absolute",
                            bottom: "calc(100% + 4px)",
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: "rgba(5, 2, 16, 0.92)",
                            backdropFilter: "blur(10px)",
                            border: "0.5px solid rgba(190, 80, 255, 0.4)",
                            borderRadius: "12px",
                            padding: "8px 14px",
                            whiteSpace: "nowrap",
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            color: "rgba(200, 120, 255, 0.95)",
                            letterSpacing: "0.02em",
                            zIndex: 30,
                            boxShadow: "0 6px 24px rgba(0,0,0,0.5), 0 0 14px rgba(190,80,255,0.1)",
                            pointerEvents: "none",
                          }}
                        >
                          {catSpeech}
                          <div style={{
                            position: "absolute",
                            bottom: -6,
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 0, height: 0,
                            borderLeft: "6px solid transparent",
                            borderRight: "6px solid transparent",
                            borderTop: "6px solid rgba(190, 80, 255, 0.4)",
                          }} />
                        </motion.div>
                      )}
                    </AnimatePresence>
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

                    <motion.div key={mode} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                      {mode === "login" ? (
                        <>
                          <h2 className="login-title">Welcome Back 👋</h2>
                          <p className="login-subtitle">Great to see you again. Sign in to access the Playground.</p>
                        </>
                      ) : (
                        <>
                          <h2 className="login-title">Join the Community ✨</h2>
                          <p className="login-subtitle">Create your account and unlock the full Free Fire API toolkit.</p>
                        </>
                      )}
                    </motion.div>

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
                            if (userIdleRef.current) clearTimeout(userIdleRef.current);
                            setCatState("smile");
                            setCatSpeech(null);
                          }}
                          onFocus={() => {
                            setCatState("smile");
                            if (userIdleRef.current) clearTimeout(userIdleRef.current);
                            userIdleRef.current = setTimeout(() => {
                              if (!username.trim()) showSpeech("Hey! Enter your username here!");
                            }, 3000);
                          }}
                          onBlur={() => {
                            if (userIdleRef.current) clearTimeout(userIdleRef.current);
                            if (catState === "smile" || catState === "speech") setCatState("idle");
                          }}
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
                          onChange={(e) => {
                            setPassword(e.target.value);
                            setError("");
                            if (passIdleRef.current) clearTimeout(passIdleRef.current);
                            setCatState("laugh");
                            setCatSpeech(null);
                          }}
                          onFocus={() => {
                            setCatState("laugh");
                            if (passIdleRef.current) clearTimeout(passIdleRef.current);
                            passIdleRef.current = setTimeout(() => {
                              if (!password.trim()) showSpeech("Don't forget your password!", "laugh");
                            }, 6000);
                          }}
                          onBlur={() => {
                            if (passIdleRef.current) clearTimeout(passIdleRef.current);
                            setCatState("idle");
                          }}
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
                        {mode === "login" ? "Login" : "Create Account"}
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

            <motion.div
              className="login-brand"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <img
                src="/talha-logo.png"
                alt="TALHA"
                style={{
                  height: "44px",
                  width: "auto",
                  filter: "drop-shadow(0 0 14px rgba(190, 80, 255, 0.5))",
                }}
              />
              <span className="login-brand-sub">API Playground &mdash; Security Gate</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
