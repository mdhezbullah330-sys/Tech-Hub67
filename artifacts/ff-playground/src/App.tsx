import { useState, useEffect, useCallback } from "react";
import ParticleBackground from "@/components/ParticleBackground";
import Header from "@/components/Header";
import ApiCard from "@/components/ApiCard";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import LoginPage from "@/components/LoginPage";
import SecurityToast from "@/components/SecurityToast";
import { isLoggedIn } from "@/lib/auth";

const apiEndpoints = [
  {
    title: "Free Fire Player Info",
    description: "Fetch complete player profile and stats",
    baseUrl: "https://wotaxxdev-api.vercel.app/info",
    params: [{ name: "uid", placeholder: "uid — Player UID (e.g., 12345678)" }],
    responseType: "json" as const,
  },
  {
    title: "Ban Check",
    description: "Check whether a Free Fire account is banned",
    baseUrl: "https://wotaxxdev-api.vercel.app/check",
    params: [{ name: "uid", placeholder: "uid — Player UID (e.g., 12345678)" }],
    responseType: "json" as const,
  },
  {
    title: "Profile Card",
    description: "Get player profile card image by UID",
    baseUrl: "https://wotaxxdev-api.vercel.app/profilecard",
    params: [{ name: "uid", placeholder: "uid — Player UID (e.g., 12345678)" }],
    responseType: "image" as const,
  },
  {
    title: "Send Visits",
    description: "Send profile visits to a Free Fire ID",
    baseUrl: "https://wotaxxdev-api.vercel.app/visits",
    params: [
      { name: "uid", placeholder: "uid — Player UID (e.g., 12345678)" },
      { name: "region", placeholder: "region — Server region (e.g., IND, SG, BR)" },
    ],
    responseType: "json" as const,
  },
  {
    title: "Send Friend Request",
    description: "Send friend request to a UID via server token",
    baseUrl: "https://wotaxxdev-api.vercel.app/send_requests",
    params: [
      { name: "uid", placeholder: "uid — Player UID (e.g., 12345678)" },
      { name: "region", placeholder: "region — Server region (e.g., IND, SG, BR)" },
    ],
    responseType: "json" as const,
  },
  {
    title: "Long Bio",
    description: "Update player bio using access token and new bio text",
    baseUrl: "https://wotaxxdev-api.vercel.app/update_bio",
    params: [
      { name: "access_token", placeholder: "accesstoken — Your Access Token" },
      { name: "bio", placeholder: "bio — New Bio Text" },
    ],
    responseType: "json" as const,
  },
  {
    title: "Generate JWT",
    description: "Generate a JWT token from an access token",
    baseUrl: "https://wotaxxdev-api.vercel.app/access-jwt",
    params: [{ name: "access_token", placeholder: "access_token — Your Access/EAT Token" }],
    responseType: "json" as const,
  },
  {
    title: "Friend Request (Token)",
    description: "Send friend request using access/JWT token and target UID",
    baseUrl: "https://wotaxxdev-api.vercel.app/add",
    params: [
      { name: "token", placeholder: "token — Access Token or JWT" },
      { name: "uid", placeholder: "uid — Target Player UID" },
    ],
    responseType: "json" as const,
  },
  {
    title: "Add Items",
    description: "Add items to account using access/EAT token and item IDs",
    baseUrl: "https://wotaxxdev-api.vercel.app/add-items",
    params: [
      { name: "access_token", placeholder: "access_token — Access/EAT Token" },
      { name: "item_ids", placeholder: "item_ids — Comma-separated item IDs" },
    ],
    responseType: "json" as const,
  },
  {
    title: "Change Nickname",
    description: "Change player nickname using access/EAT token",
    baseUrl: "https://wotaxxdev-api.vercel.app/change",
    params: [
      { name: "token", placeholder: "token — Access/EAT Token" },
      { name: "newname", placeholder: "newname — New Nickname" },
    ],
    responseType: "json" as const,
  },
  {
    title: "Access Token",
    description: "Get access token from an EAT token",
    baseUrl: "https://wotaxxdev-api.vercel.app/get-access",
    urlTemplate: "https://wotaxxdev-api.vercel.app/get-access/{token}",
    params: [{ name: "token", placeholder: "token — Your EAT Token" }],
    responseType: "json" as const,
  },
  {
    title: "Fetch Outfit",
    description: "Show player outfit and character image",
    baseUrl: "https://wotaxxdev-api.vercel.app/profile",
    params: [{ name: "uid", placeholder: "uid — Player UID (e.g., 12345678)" }],
    responseType: "image" as const,
  },
  {
    title: "Remove Friend",
    description: "Remove a friend using access token or JWT",
    baseUrl: "https://wotaxxdev-api.vercel.app/remove",
    params: [
      { name: "token", placeholder: "token — Access Token or JWT" },
      { name: "uid", placeholder: "uid — Friend's Player UID" },
    ],
    responseType: "json" as const,
  },
  {
    title: "Search Player",
    description: "Search for players by nickname across all regions",
    baseUrl: "https://wotaxxdev-api.vercel.app/searchplayer",
    params: [{ name: "name", placeholder: "name — Player nickname to search" }],
    responseType: "json" as const,
  },
  {
    title: "Search Clan",
    description: "Search for clans by name across all regions",
    baseUrl: "https://wotaxxdev-api.vercel.app/searchclan",
    params: [{ name: "name", placeholder: "name — Clan name to search" }],
    responseType: "json" as const,
  },
];

function useContentProtection() {
  const [toastVisible, setToastVisible] = useState(false);

  const trigger = useCallback(() => setToastVisible(true), []);

  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => { e.preventDefault(); trigger(); };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F12") { e.preventDefault(); trigger(); return; }
      if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i")) { e.preventDefault(); trigger(); return; }
      if (e.ctrlKey && (e.key === "U" || e.key === "u")) { e.preventDefault(); trigger(); return; }
      if (e.ctrlKey && e.shiftKey && (e.key === "J" || e.key === "j")) { e.preventDefault(); trigger(); return; }
      if (e.ctrlKey && e.shiftKey && (e.key === "C" || e.key === "c")) { e.preventDefault(); trigger(); return; }
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [trigger]);

  return { toastVisible, clearToast: () => setToastVisible(false) };
}

function Playground() {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen relative playground-enter">
      <ParticleBackground />
      <div className="relative z-10 flex flex-col items-center px-4 pb-8">
        <Header />
        <section className="w-full mt-10 pb-4" style={{ maxWidth: "1100px" }}>
          <div className="api-grid">
            {apiEndpoints.map((ep) => (
              <ApiCard
                key={ep.title}
                title={ep.title}
                description={ep.description}
                baseUrl={ep.baseUrl}
                urlTemplate={(ep as any).urlTemplate}
                params={ep.params}
                responseType={ep.responseType}
                isActive={activeCard === ep.title}
                onActivate={() => setActiveCard((prev) => prev === ep.title ? null : ep.title)}
              />
            ))}
          </div>
        </section>
        <FeaturesSection />
        <Footer />
      </div>
    </div>
  );
}

function App() {
  const [authed, setAuthed] = useState(isLoggedIn());
  const { toastVisible, clearToast } = useContentProtection();

  return (
    <>
      {authed ? <Playground /> : <LoginPage onSuccess={() => setAuthed(true)} />}
      <SecurityToast visible={toastVisible} onDone={clearToast} />
    </>
  );
}

export default App;
