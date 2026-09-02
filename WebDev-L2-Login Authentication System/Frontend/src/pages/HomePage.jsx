import { Link, useSearchParams } from "react-router-dom";
import {
  Lock,
  Users,
  ShieldCheck,
  KeyRound,
  ArrowRight,
} from "lucide-react";

import Login from "../components/Authpages/LoginPage";
import Register from "../components/Authpages/RegisterPage";
import Dashboard from "./Dashboard";

const AUTH_CARDS = [
  {
    label: "Register",
    tint: "bg-blue-500/10 border-blue-500/20",
    rotate: "-rotate-6",
    offset: "translate-x-0 translate-y-6",
  },
  {
    label: "JWT Token",
    tint: "bg-violet-500/10 border-violet-500/20",
    rotate: "rotate-3",
    offset: "translate-x-6 translate-y-2",
  },
  {
    label: "Protected Dashboard",
    tint: "bg-emerald-500/10 border-emerald-500/20",
    rotate: "-rotate-1",
    offset: "translate-x-2 -translate-y-4",
  },
];

const FEATURES = [
  {
    icon: Users,
    title: "Secure User Registration",
    body: "Create an account with username, email and a password protected using bcrypt hashing.",
  },
  {
    icon: KeyRound,
    title: "JWT Authentication",
    body: "Authenticate users securely with JSON Web Tokens and maintain protected sessions.",
  },
  {
    icon: ShieldCheck,
    title: "Protected Dashboard",
    body: "Only authenticated users can access dashboard routes with automatic authorization checks.",
  },
];

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
        <ShieldCheck className="w-4 h-4 text-blue-400" strokeWidth={2.5} />
      </div>
      <span className="font-semibold tracking-tight text-white">
        AuthVault
      </span>
    </Link>
  );
}

function AuthStack() {
  return (
    <div className="relative h-72 w-full max-w-xs mx-auto lg:mx-0">
      {AUTH_CARDS.map((card, i) => (
        <div
          key={card.label}
          className={`absolute inset-x-6 top-6 h-48 rounded-2xl border ${card.tint} ${card.rotate} ${card.offset}
                     bg-[#131826] shadow-2xl shadow-black/50 p-5 flex flex-col justify-between`}
          style={{ zIndex: i }}
        >
          <div className="flex items-center justify-between">
            <ShieldCheck className="w-6 h-6 text-blue-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>

          <div>
            <h3 className="text-white font-medium">{card.label}</h3>
            <p className="text-xs text-gray-400 mt-1">
              Secure authentication layer
            </p>
          </div>

          <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
            <div className="h-full w-4/5 bg-blue-400 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const screen = searchParams.get("auth") || "home";

  const setScreen = (value) => {
    if (value === "home") {
      setSearchParams({});
    } else {
      setSearchParams({ auth: value });
    }
  };

  if (screen === "login") {
    return <Login onRegister={() => setScreen("register")} />;
  }

  if (screen === "register") {
    return <Register onLogin={() => setScreen("login")} />;
  }



  return (
    <div className="min-h-screen w-full bg-[#0B0F19] text-gray-100">
      {/* Navigation */}
      <header className="max-w-6xl mx-auto flex items-center justify-between px-6 py-6">
        <Logo />

        <div className="flex items-center gap-3">
          <button
            onClick={() => setScreen("login")}
            className="hidden sm:block text-sm text-gray-400 hover:text-gray-200 transition"
          >
            Login
          </button>

          <button
            onClick={() => setScreen("register")}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-xl transition"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-24 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs mb-6">
            <Lock className="w-3.5 h-3.5" />
            OASIS INFOBYTE • Level 2 Project
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl leading-[1.1] text-white">
            Secure Login Authentication System
          </h1>

          <p className="mt-5 text-gray-400 text-base leading-relaxed max-w-md">
            A modern full-stack authentication application built with React,
            Express, JWT and bcrypt. Register securely, log in, and access
            protected dashboard routes with encrypted credentials.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setScreen("register")}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-5 py-3 rounded-xl transition"
            >
              Create Account
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setScreen("login")}
              className="text-sm text-gray-400 hover:text-white transition"
            >
              Already have an account?
            </button>
          </div>
        </div>

        <AuthStack />
      </section>

      {/* Info Banner */}
      <section className="border-y border-white/5 bg-[#0D1220]">
        <div className="max-w-3xl mx-auto px-6 py-10 text-center">
          <p className="text-gray-300 text-lg leading-relaxed">
            Modern authentication begins with secure password hashing,
            token-based authorization, and protected routes that keep every user
            session safe.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/5 bg-[#111827] p-6 hover:border-blue-500/20 transition"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Icon className="w-5 h-5 text-blue-400" />
              </div>

              <h3 className="mt-5 text-white font-semibold">{title}</h3>

              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 pb-24 text-center">
        <h2 className="font-serif text-3xl text-white">
          Ready to experience secure authentication?
        </h2>

        <p className="mt-4 text-gray-400">
          Build your account and explore JWT-powered protected authentication.
        </p>

        <button
          onClick={() => setScreen("register")}
          className="mt-8 inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-5 py-3 rounded-xl transition"
        >
          Create Account
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Logo />

          <span className="text-xs text-gray-500">
            © {new Date().getFullYear()} AuthVault • OASIS INFOBYTE Web
            Development Project
          </span>
        </div>
      </footer>
    </div>
  );
}