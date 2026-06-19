import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Dna,
  HeartPulse,
  Activity,
  FileText,
  Droplet,
  Stethoscope,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Droplet,
    title: "Blood Group Predictor",
    desc: "Punnett-square based inheritance with probability percentages.",
  },
  {
    icon: Dna,
    title: "Genetic Risk",
    desc: "Family-history driven hereditary disease risk.",
  },
  {
    icon: Activity,
    title: "Diabetes & BP",
    desc: "FINDRISC-inspired risk scoring and hypertension category.",
  },
  {
    icon: HeartPulse,
    title: "Breast Cancer Risk",
    desc: "Gail-model inspired 5-year and lifetime estimation.",
  },
  {
    icon: FileText,
    title: "Report Interpretation",
    desc: "Lab parameter scan with normal range flags.",
  },
  {
    icon: Stethoscope,
    title: "Blood Donation",
    desc: "Donor registry and emergency matching by blood group and city.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* Navbar */}
      <header className="border-b border-[#E5E1D8] bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
git commit -m "Add latest project updates"            <div className="w-9 h-9 rounded-md bg-[#B91C1C] flex items-center justify-center">
              <Sparkles
                className="w-5 h-5 text-white"
                strokeWidth={1.5}
              />
            </div>

            <div className="font-heading font-bold text-lg">
              GeneCare
              <span className="text-[#B91C1C]">.AI</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-medium hover:text-[#B91C1C]"
            >
              Sign In
            </Link>

            <Link
              to="/register"
              className="text-sm font-medium px-4 py-2 rounded-md bg-[#B91C1C] text-white hover:bg-[#991B1B] transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <div className="overline mb-6">
              A Unified Health Intelligence Platform
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-tight text-[#1A1D1C]">
              Genetic Insights,
              <span className="text-[#B91C1C]">
              </span>
            </h1>

            <p className="mt-6 text-lg text-[#6B726C] max-w-xl">
              Predict blood group inheritance, assess hereditary
              disease risk, interpret lab reports, and coordinate
              blood donation — all in one intelligent platform.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-[#B91C1C] text-white hover:bg-[#991B1B]"
              >
                Create Free Account
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-[#E5E1D8] hover:bg-[#F4F2EE]"
              >
                I Already Have An Account
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              <div>
                <div className="font-heading text-2xl font-semibold text-[#B91C1C]">
                  7
                </div>
                <div className="text-xs text-[#6B726C]">
                  Modules
                </div>
              </div>

              <div>
                <div className="font-heading text-2xl font-semibold text-[#B91C1C]">
                  100%
                </div>
                <div className="text-xs text-[#6B726C]">
                  Rule Based
                </div>
              </div>

              <div>
                <div className="font-heading text-2xl font-semibold text-[#B91C1C]">
                  ∞
                </div>
                <div className="text-xs text-[#6B726C]">
                  Free Queries
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="relative rounded-lg overflow-hidden border border-[#E5E1D8] aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1643780668909-580822430155?crop=entropy&cs=srgb&fm=jpg&w=900&q=85"
                alt="DNA Structure"
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-4 left-4 right-4 bg-white/95 rounded-md p-4 border border-[#E5E1D8]">
                <div className="overline">
                  Sample Insight
                </div>

                <div className="font-heading mt-1 text-[#1A1D1C]">
                  Type O Parent × Type AB Parent
                </div>

                <div className="text-sm text-[#6B726C] mt-1">
                  → 50% A, 50% B in offspring
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white border-y border-[#E5E1D8]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
          <div className="overline mb-3">
            What's Inside
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl font-medium tracking-tight max-w-2xl">
            Seven Dedicated Modules.
            One Unified Dashboard.
          </h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="p-6 border border-[#E5E1D8] rounded-md bg-[#FAF9F6] hover:-translate-y-1 hover:shadow-sm transition-all"
                >
                  <Icon
                    className="w-7 h-7 text-[#B91C1C]"
                    strokeWidth={1.5}
                  />

                  <div className="font-heading font-medium text-lg mt-4">
                    {feature.title}
                  </div>

                  <p className="text-sm text-[#6B726C] mt-2">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-sm text-[#6B726C]">
        © {new Date().getFullYear()} GeneCare.AI —
        Educational Tool. Not A Substitute For Medical Advice.
      </footer>
    </div>
  );
}