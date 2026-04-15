import { useState, useCallback, useRef, useEffect } from "react";
import Notification from "./Notification";

interface ApiParam {
  name: string;
  placeholder: string;
}

interface ApiCardProps {
  title: string;
  description: string;
  baseUrl: string;
  urlTemplate?: string;
  params: ApiParam[];
  responseType: "json" | "image";
  isActive: boolean;
  onActivate: () => void;
}

export default function ApiCard({
  title,
  description,
  baseUrl,
  urlTemplate,
  params,
  responseType,
  isActive,
  onActivate,
}: ApiCardProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // When collapsed (not active), clear responses and values
  useEffect(() => {
    if (!isActive) {
      setResponse(null);
      setImageUrl(null);
      setValues({});
    }
  }, [isActive]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glow.style.left = `${x}px`;
    glow.style.top = `${y}px`;
    glow.style.opacity = "1";
  };

  const handleMouseLeave = () => {
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  const buildUrl = useCallback(() => {
    if (urlTemplate) {
      let url = urlTemplate;
      params.forEach((p) => {
        const val = values[p.name] || `{${p.name}}`;
        url = url.replace(`{${p.name}}`, encodeURIComponent(val));
      });
      return url;
    }
    let url = baseUrl;
    params.forEach((p, i) => {
      const val = values[p.name] || `{${p.name}}`;
      url += `${i === 0 ? "?" : "&"}${p.name}=${encodeURIComponent(val)}`;
    });
    return url;
  }, [baseUrl, urlTemplate, params, values]);

  const buildLiveUrl = useCallback(() => {
    if (urlTemplate) {
      let url = urlTemplate;
      params.forEach((p) => {
        url = url.replace(`{${p.name}}`, encodeURIComponent(values[p.name] || ""));
      });
      return url;
    }
    let url = baseUrl;
    params.forEach((p, i) => {
      url += `${i === 0 ? "?" : "&"}${p.name}=${encodeURIComponent(values[p.name] || "")}`;
    });
    return url;
  }, [baseUrl, urlTemplate, params, values]);

  const handleTestLive = async () => {
    const missing = params.filter((p) => !values[p.name]?.trim());
    if (missing.length > 0) {
      setNotification({ message: "Please fill in all parameters", type: "error" });
      return;
    }

    setLoading(true);
    setResponse(null);
    setImageUrl(null);

    try {
      const url = buildLiveUrl();
      if (responseType === "image") {
        await new Promise((r) => setTimeout(r, 400));
        setImageUrl(url);
        setLoading(false);
        return;
      }
      const res = await fetch(url);
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setResponse(JSON.stringify({ error: err.message || "Request failed" }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const handleCopyUrl = () => {
    const url = buildUrl();
    navigator.clipboard.writeText(url)
      .then(() => setNotification({ message: "Successfully copied to clipboard!", type: "success" }))
      .catch(() => setNotification({ message: "Failed to copy URL", type: "error" }));
  };

  const hasResponse = (response || imageUrl) && !loading;

  return (
    <>
      <div
        ref={cardRef}
        className="api-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={glowRef} className="card-glow" />

        <div className="mb-5">
          <span className="get-badge">GET</span>
          <h3 className="card-title">{title}</h3>
          <p className="card-desc">{description}</p>
        </div>

        <div className="flex gap-3 flex-wrap">
          <button
            className={`cyber-btn ${isActive ? "cyber-btn--active" : ""}`}
            onClick={onActivate}
          >
            Playground
          </button>
          <button className="cyber-btn" onClick={handleTestLive} disabled={loading}>
            Test Live
          </button>
          <button className="cyber-btn" onClick={handleCopyUrl}>
            Copy URL
          </button>
        </div>

        {isActive && (
          <div
            className="mt-5 space-y-3"
            style={{ animation: "fadeSlideIn 0.25s ease forwards" }}
          >
            {params.map((p) => (
              <input
                key={p.name}
                className="cyber-input"
                placeholder={p.placeholder}
                value={values[p.name] || ""}
                onChange={(e) => setValues({ ...values, [p.name]: e.target.value })}
              />
            ))}
          </div>
        )}

        {loading && (
          <div className="mt-5 flex items-center gap-4" style={{ animation: "fadeSlideIn 0.2s ease" }}>
            <div className="pulse-ring">
              <div className="pulse-dot" />
            </div>
            <span className="loading-text">Fetching Data...</span>
          </div>
        )}

        {imageUrl && !loading && (
          <div className="response-box mt-5 flex items-center justify-center">
            <img
              src={imageUrl}
              alt="API Response"
              className="max-w-full rounded-lg"
              onError={() => {
                setImageUrl(null);
                setResponse(JSON.stringify({ error: "Failed to load image" }, null, 2));
              }}
            />
          </div>
        )}

        {response && !loading && (
          <div className="response-box mt-5">
            <pre className="whitespace-pre-wrap break-words">{response}</pre>
          </div>
        )}

        {!hasResponse && !loading && (
          <div style={{ height: "0" }} />
        )}
      </div>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onDone={() => setNotification(null)}
        />
      )}
    </>
  );
}
