"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Mr. Gutter Services",
    industry: "Home Services / Gutter Cleaning",
    description:
      "A conversion-focused local service website built to turn visitors into quote requests with clear CTAs, trust-focused design, and mobile-first sections.",
    image: "/projects/mr-gutter.jpg",
    url: "https://mrgutterservices.ca",
    tags: ["Web Design", "Local Services", "Lead Generation"],
  },
  {
    title: "ConvertIQ Media",
    industry: "Marketing Agency",
    description:
      "A premium agency website built around high-intent Google Ads, booked calls, demo offers, and trust-building visuals for local business owners.",
    image: "/projects/convertiq.jpg",
    url: "https://convert-iq-media.com",
    tags: ["Agency Site", "Google Ads", "Conversion Funnel"],
  },
  {
    title: "God Bless Canada Coffee",
    industry: "Cafe / Coffee Shop",
    description:
      "A warm, editorial-style cafe website concept with menu sections, location details, brand storytelling, and a polished local-business feel.",
    image: "/projects/god-bless-canada-hero.jpg",
    url: "#",
    tags: ["Demo Website", "Cafe", "Brand Design"],
  },
  {
    title: "Newcastle Roofing",
    industry: "Roofing Company",
    description:
      "A modern roofing website demo focused on quote generation, strong service positioning, and a clean mobile-first layout for local homeowners.",
    image: "/projects/newcastle-roofing.jpg",
    url: "#",
    tags: ["Roofing", "Web Design", "Quote Funnel"],
  },
];

export default function ProjectsSection() {
  return (
    <section
  id="projects"
  className="relative overflow-hidden bg-black px-6 py-24 text-white"
>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1d4ed833,transparent_35%),radial-gradient(circle_at_bottom_right,#9333ea22,transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-14 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Recent Projects
          </p>

          <h2 className="text-4xl font-black tracking-tight md:text-6xl">
            Websites built to look premium and convert visitors.
          </h2>

          <p className="mt-5 text-base leading-7 text-white/65 md:text-lg">
            A look at recent websites and demo builds created for local service
            businesses, cafes, and agency funnels.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-blue-950/20 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/40"
            >
              <div className="relative h-64 overflow-hidden bg-white/5">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>

              <div className="p-6">
                <p className="mb-2 text-sm font-semibold text-cyan-300">
                  {project.industry}
                </p>

                <h3 className="text-2xl font-black">{project.title}</h3>

                <p className="mt-3 text-sm leading-6 text-white/65">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {project.url !== "#" && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-cyan-300"
                  >
                    View Project <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}