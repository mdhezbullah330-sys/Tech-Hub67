import { useState } from "react";
import ParticleBackground from "@/components/ParticleBackground";
import Header from "@/components/Header";
import ApiCard from "@/components/ApiCard";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import LoginPage from "@/components/LoginPage";
import { isLoggedIn } from "@/lib/auth";

const apiEndpoints = [
  {
    title: "Free Fire Player Info",
    description: "Fetch Player Info",
    baseUrl: "https://wotaxxdev-api.vercel.app/info",
    params: [{ name: "uid", placeholder: "uid - Player UID (e.g., 12345678)" }],
    responseType: "json" as const,
  },
  {
    title: "Ban Check",
    description: "Check an Account Banned or Not",
    baseUrl: "https://wotaxxdev-api.vercel.app/check",
    params: [{ name: "uid", placeholder: "uid - Player UID (e.g., 12345678)" }],
    responseType: "json" as const,
  },
  {
    title: "Profile Card",
    description: "Get Profile Card Using Uid",
    baseUrl: "https://wotaxxdev-api.vercel.app/profilecard",
    params: [{ name: "uid", placeholder: "uid - Player UID (e.g., 12345678)" }],
    responseType: "image" as const,
  },
  {
    title: "Send Visits",
    description: "Send Profile Visit To a FF Id",
    baseUrl: "https://wotaxxdev-api.vercel.app/visits",
    params: [
      { name: "uid", placeholder: "uid - Player UID (e.g., 12345678)" },
      { name: "region", placeholder: "region - Server Region (e.g., IND, SG, BR)" },
    ],
    responseType: "json" as const,
  },
  {
    title: "Send Friend Request",
    description: "Send Friend Request To a Uid",
    baseUrl: "https://wotaxxdev-api.vercel.app/send_requests",
    params: [
      { name: "uid", placeholder: "uid - Player UID (e.g., 12345678)" },
      { name: "region", placeholder: "region - Server Region (e.g., IND, SG, BR)" },
    ],
    responseType: "json" as const,
  },
  {
    title: "Long Bio",
    description: "Update Bio using Access Token and Bio Text",
    baseUrl: "https://wotaxxdev-api.vercel.app/update_bio",
    params: [
      { name: "access_token", placeholder: "accesstoken - Your Access Token" },
      { name: "bio", placeholder: "bio - New Bio Text" },
    ],
    responseType: "json" as const,
  },
];

function Playground() {
  return (
    <div className="min-h-screen relative playground-enter">
      <ParticleBackground />
      <div className="relative z-10 flex flex-col items-center px-4 pb-8">
        <Header />
        <section className="w-full max-w-2xl mx-auto mt-10 space-y-6">
          {apiEndpoints.map((ep) => (
            <ApiCard
              key={ep.title}
              title={ep.title}
              description={ep.description}
              baseUrl={ep.baseUrl}
              params={ep.params}
              responseType={ep.responseType}
            />
          ))}
        </section>
        <FeaturesSection />
        <Footer />
      </div>
    </div>
  );
}

function App() {
  const [authed, setAuthed] = useState(isLoggedIn());

  if (!authed) {
    return <LoginPage onSuccess={() => setAuthed(true)} />;
  }

  return <Playground />;
}

export default App;
