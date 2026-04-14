import { useState, useCallback } from "react";
import Notification from "./Notification";

interface ApiParam {
  name: string;
  placeholder: string;
}

interface ApiCardProps {
  title: string;
  description: string;
  baseUrl: string;
  params: ApiParam[];
  responseType: "json" | "image";
}

export default function ApiCard({ title, description, baseUrl, params, responseType }: ApiCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const buildUrl = useCallback(() => {
    let url = baseUrl;
    params.forEach((p, i) => {
      const val = values[p.name] || `{${p.name}}`;
      const sep = i === 0 ? "?" : "&";
      url += `${sep}${p.name}=${encodeURIComponent(val)}`;
    });
    return url;
  }, [baseUrl, params, values]);

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
      let url = baseUrl;
      params.forEach((p, i) => {
        const sep = i === 0 ? "?" : "&";
        url += `${sep}${p.name}=${encodeURIComponent(values[p.name])}`;
      });

      if (responseType === "image") {
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
    navigator.clipboard.writeText(url).then(() => {
      setNotification({ message: "Successfully copied to clipboard!", type: "success" });
    }).catch(() => {
      setNotification({ message: "Failed to copy URL", type: "error" });
    });
  };

  return (
    <>
      <div className="glass-card p-6 w-full">
        <div className="mb-4">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(0, 255, 255, 0.5)" }}>
            GET
          </span>
          <h3 className="text-xl font-bold mt-1" style={{ color: "hsl(180, 100%, 80%)" }}>
            {title}
          </h3>
          <p className="text-sm mt-1" style={{ color: "rgba(0, 255, 255, 0.45)" }}>
            {description}
          </p>
        </div>

        <div className="flex gap-3 flex-wrap">
          <button
            className={`cyber-btn ${expanded ? "active" : ""}`}
            onClick={() => setExpanded(!expanded)}
          >
            Playground
          </button>
          <button className="cyber-btn" onClick={handleTestLive}>
            Test Live
          </button>
          <button className="cyber-btn" onClick={handleCopyUrl}>
            Copy URL
          </button>
        </div>

        {expanded && (
          <div className="mt-5 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
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
          <div className="mt-5 flex items-center gap-3">
            <div className="spinner" />
            <span className="text-sm" style={{ color: "rgba(0, 255, 255, 0.6)" }}>Fetching data...</span>
          </div>
        )}

        {imageUrl && !loading && (
          <div className="mt-5 response-box flex items-center justify-center">
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
          <div className="mt-5 response-box">
            <pre className="whitespace-pre-wrap break-words">{response}</pre>
          </div>
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
