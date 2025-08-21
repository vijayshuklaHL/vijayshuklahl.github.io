import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Cpu,
  Shield,
  Boxes,
  ServerCog,
  KeyRound,
  LineChart as IconLineChart,
} from "lucide-react";
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  LineChart as ReLineChart,
  Line,
} from "recharts";

// ---------- SIMPLE CONFIG (edit these) ----------
const CONFIG = {
  github: "https://github.com/vijayshuklaHL",
  linkedin: "https://in.linkedin.com/in/vijay-shukla-108745223",
  email: "mailto:vijayshukla-ops@gmail.com",
  profileImg: "/images/profile.jpg",
  workshopImg: "/images/workshop.jpg",
};

// ---------- Tiny runtime tests (run only in dev) ----------
function isValidHttpUrl(u: string) {
  try {
    return /^https?:\/\//.test(u);
  } catch {
    return false;
  }
}
function isMailto(u: string) {
  return /^mailto:/i.test(u);
}
function formatKpi(value: number | string, suffix = "") {
  return `${value}${suffix}`;
}

if (
  typeof window !== "undefined" &&
  typeof import.meta !== "undefined" &&
  (import.meta as any).env &&
  (import.meta as any).env.DEV
) {
  console.groupCollapsed("DEV TESTS");
  console.assert(isValidHttpUrl(CONFIG.github), "GitHub URL should be http(s)");
  console.assert(isValidHttpUrl(CONFIG.linkedin), "LinkedIn URL should be http(s)");
  console.assert(isMailto(CONFIG.email), "Email should be a mailto: link");
  console.assert(formatKpi(25, " min") === "25 min", "formatKpi basic");
  console.assert(formatKpi("30", " /wk") === "30 /wk", "formatKpi string");
  console.groupEnd();
}

// ---------- UI primitives ----------
const SectionHeader = ({
  kicker,
  title,
  subtitle,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
}) => (
  <div className="max-w-3xl mx-auto text-center mb-10">
    {kicker && (
      <p className="text-sm uppercase tracking-widest text-teal-400/80 mb-2">
        {kicker}
      </p>
    )}
    <h2 className="text-3xl md:text-5xl font-semibold text-white mb-3">
      {title}
    </h2>
    {subtitle && <p className="text-zinc-400 text-base md:text-lg">{subtitle}</p>}
  </div>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="px-2.5 py-1 rounded-full bg-zinc-800/70 border border-zinc-700 text-zinc-300 text-xs tracking-wide">
    {children}
  </span>
);

const PillButton = ({
  children,
  href,
  ghost = false,
  disabled = false,
}: {
  children: React.ReactNode;
  href: string;
  ghost?: boolean;
  disabled?: boolean;
}) => (
  <a
    href={disabled ? undefined : href}
    aria-disabled={disabled}
    className={
      "inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-medium transition " +
      (ghost
        ? "border border-zinc-700 bg-transparent text-zinc-200 hover:bg-zinc-800/60"
        : "bg-teal-500/90 hover:bg-teal-400 text-zinc-900") +
      (disabled ? " opacity-50 pointer-events-none" : "")
    }
  >
    {children}
  </a>
);

// ---------- Navigation ----------
const NavBar = () => (
  <div className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-zinc-900/60 bg-zinc-900/80 border-b border-zinc-800">
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
      <a href="#home" className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 shadow-lg" />
        <span className="font-semibold tracking-tight text-white">Vijay Shukla - DevOps</span>
      </a>
      <nav className="hidden md:flex items-center gap-8 text-zinc-300">
        <a href="#projects" className="hover:text-white">Projects</a>
        <a href="#skills" className="hover:text-white">Skills</a>
        <a href="#showcase" className="hover:text-white">Showcase</a>
        <a href="#blog" className="hover:text-white">Blog</a>
        <a href="#contact" className="hover:text-white">Contact</a>
      </nav>
      <div className="flex items-center gap-3">
        <a href={CONFIG.github} aria-label="GitHub" className="p-2 rounded-xl hover:bg-zinc-800"><Github className="h-5 w-5" /></a>
        <a href={CONFIG.linkedin} aria-label="LinkedIn" className="p-2 rounded-xl hover:bg-zinc-800"><Linkedin className="h-5 w-5" /></a>
        <PillButton href="#contact">Hire Me <ArrowRight className="h-4 w-4" /></PillButton>
      </div>
    </div>
  </div>
);

// ---------- HERO: centered avatar + orbiting tiles ----------
const Hero = () => (
  <section id="home" className="relative py-20 md:py-28 lg:py-32 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
      {/* Left copy */}
      <div className="max-w-2xl">
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs">DevOps</span>
          <span className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs">Cloud</span>
          <span className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs">Security</span>
          <span className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs">Observability</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
          I design, automate, <br /> and secure large-scale cloud infrastructures.
        </h1>
        <p className="text-zinc-400 text-lg mb-8">
          From 50+ iOS apps shipped to TestFlight via fully automated pipelines
          to centralized monitoring stacks that never miss a heartbeat — I help teams scale with confidence.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="#projects" className="px-6 py-3 rounded-2xl bg-teal-500/90 hover:bg-teal-400 text-zinc-900 font-medium inline-flex items-center gap-2">
            View My Projects <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#contact" className="px-6 py-3 rounded-2xl border border-zinc-700 text-zinc-200 hover:bg-zinc-800 inline-flex items-center gap-2">
            Let’s Work Together →
          </a>
        </div>
      </div>

      {/* Right visual */}
      <div className="relative flex items-center justify-center w-full lg:w-1/2">
        <div className="relative mx-auto w-full max-w-md aspect-square rounded-3xl bg-zinc-900/70 border border-zinc-800 shadow-2xl p-6 overflow-hidden">
          {/* Central avatar */}
          <img
            src={CONFIG.profileImg}
            alt="Vijay Shukla profile"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-40 md:h-52 md:w-52 rounded-full object-cover ring-2 ring-teal-400/60 border border-zinc-800 shadow-xl z-20"
          />

          {/* Orbit rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative">
              <div className="h-72 w-72 rounded-full border-2 border-dashed border-teal-500/30" />
              <div className="absolute inset-0 m-auto h-48 w-48 rounded-full border-2 border-dashed border-emerald-400/25" />
            </div>
          </div>

          {/* Orbiting nodes */}
          <div className="absolute inset-0 flex items-center justify-center">
            <OrbitingTiles />
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Orbit tiles via trig; orientation remains upright
function OrbitingTiles() {
  const [time, setTime] = React.useState(0);
  React.useEffect(() => {
    let frame: number;
    const loop = (t: number) => {
      setTime(t);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  const nodes = [
    { icon: <Cpu className="h-4 w-4" />, label: "Build", start: 270 },
    { icon: <Boxes className="h-4 w-4" />, label: "Release", start: 330 },
    { icon: <ServerCog className="h-4 w-4" />, label: "Operate", start: 30 },
    { icon: <IconLineChart className="h-4 w-4" />, label: "Monitor", start: 90 },
    { icon: <Shield className="h-4 w-4" />, label: "Secure", start: 150 },
    { icon: <KeyRound className="h-4 w-4" />, label: "Secrets", start: 210 },
  ];

  return (
    <>
      {nodes.map((n, i) => {
        const speed = 0.0001; // radians/ms
        const angle = ((n.start * Math.PI) / 180 + time * speed) % (2 * Math.PI);
        const radius = 160; // clear bigger avatar
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <div
            key={i}
            className="absolute select-none"
            style={{
              top: `calc(50% + ${y}px)`,
              left: `calc(50% + ${x}px)`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="px-3 py-2 rounded-2xl bg-zinc-800/70 border border-zinc-700 text-zinc-200 text-xs flex items-center gap-2 shadow">
              {n.icon}
              <span className="uppercase tracking-widest">{n.label}</span>
            </div>
          </div>
        );
      })}
    </>
  );
}

// ---------- About ----------
const About = () => (
  <section className="py-16 bg-zinc-950/95 border-t border-zinc-800">
    <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 grid md:grid-cols-3 gap-8 items-center">
      <div className="md:col-span-2">
        <SectionHeader
          kicker="About"
          title="Vijay Shukla"
          subtitle="DevOps engineer (2+ years) focused on automation, reliability, cost efficiency, and secure delivery."
        />
        <p className="text-zinc-300 leading-relaxed">
          I design production-grade infrastructure and CI/CD that reduce toil and boost delivery speed. I’ve provisioned Amazon EKS clusters with secure networking and GitOps, automated <span className="font-medium text-zinc-100">50+ iOS app</span> releases with Fastlane + GitHub Actions, built centralized observability with Prometheus/Grafana/Loki, and implemented AWS-wide backups with OU policies and DR runbooks. I also built a Google Chat ChatOps bot ("AstroBot") used across teams to trigger 50+ workflows.
        </p>
        <p className="text-zinc-400 mt-3 text-sm">
          Previously @ ThinkSys Software (Aug 2023—Present). Trained 10+ engineers on Kubernetes and mentored juniors. Awards: “Hero of the Cluster” (×3), Customer Delight.
        </p>
      </div>
      <div>
        <div className="rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/60">
          <img src={CONFIG.workshopImg} alt="Workshop Kubernetes" className="w-full h-56 object-cover" />
          <div className="p-4 text-sm text-zinc-400">
            Kubernetes workshop to colleagues — knowledge sharing is part of the job.
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ---------- Projects ----------
type Project = {
  title: string;
  challenge: string;
  solution: string;
  impact: string;
  tags: string[];
  href: string;
  image: string; // NEW: per-project media
  alt: string;
};

const projects: Project[] = [
  {
    title: "ChatOps: AstroBot for Dev/Design Ops (50+ workflows)",
    challenge: "Frequent manual operations across Dev/DevOps/Design slowed teams.",
    solution: "Google Chat bot integrated with Rundeck + REST to trigger 50+ workflows via chat commands.",
    impact: "Significantly reduced manual toil; faster incident and routine ops.",
    tags: ["ChatOps", "Google Apps Script", "Rundeck", "APIs"],
    href: "#case-astrobot",
    image: "/images/projects/astrobot.png",
    alt: "AstroBot ChatOps demo triggering deployment from Google Chat",
  },
  {
    title: "AWS EKS Infra Optimization + DR",
    challenge: "SaaS workloads needed reliable ingress, backups, and alerting on EKS.",
    solution: "Improved ingress, added Velero backups, tuned Prometheus/Alertmanager, GitLab CI pipelines.",
    impact: "Higher reliability and DR readiness with better observability.",
    tags: ["EKS", "Velero", "Prometheus", "Alertmanager", "GitLab CI"],
    href: "#case-eks",
    image: "/images/projects/eks-dr.png",
    alt: "Grafana/EKS visual with Velero backups",
  },
  {
    title: "Fastlane + GitHub Actions: 50+ iOS Apps to TestFlight",
    challenge: "Manual deployment across 50+ apps was slow and error-prone.",
    solution: "End-to-end CI/CD with Fastlane, GitHub Actions, signed builds, lane conventions, reusable workflows.",
    impact: "Release time: hours → minutes. 100% consistency across apps.",
    tags: ["GitHub Actions", "Fastlane", "iOS", "CI/CD"],
    href: "#case-fastlane",
    image: "/images/projects/fastlane-gha.gif",
    alt: "GitHub Actions run and Fastlane output to TestFlight",
  },
  {
    title: "Company-wide Central Monitoring & Logging",
    challenge: "Fragmented observability across servers and services.",
    solution: "Prometheus + Grafana + Loki + Promtail with exporters and SLO-based alerting.",
    impact: "Downtime −40%, incident detection +70%.",
    tags: ["Prometheus", "Grafana", "Loki", "Promtail"],
    href: "#case-observability",
    image: "/images/projects/observability.png",
    alt: "Grafana dashboard and Loki logs",
  },
  {
    title: "AWS Centralized Backups with Delegated Admin & OUs",
    challenge: "Multi-account environment without unified backups/DR.",
    solution: "AWS Backup with OU-level policies, cross-account vaults, DR runbooks.",
    impact: "100% policy compliance; DR-ready.",
    tags: ["AWS Backup", "Multi-Account", "DR"],
    href: "#case-backup",
    image: "/images/projects/aws-backup.png",
    alt: "AWS Backup console with successful jobs",
  },
  {
    title: "Multi-Cluster Vault Authentication for K8s",
    challenge: "Secret sprawl and inconsistent auth across clusters.",
    solution: "Vault with multi-cluster auth, JWT/Kubernetes methods, standardized secret engines.",
    impact: "Simplified secrets mgmt; audit-friendly; safer deploys.",
    tags: ["Vault", "Kubernetes", "Security"],
    href: "#case-vault",
    image: "/images/projects/vault-multicluster.png",
    alt: "Vault UI with Kubernetes/JWT auth method",
  },
];

const Projects = () => (
  <section id="projects" className="py-20 bg-zinc-950">
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      <SectionHeader
        kicker="Case Studies"
        title="Selected Work"
        subtitle="Impact-driven DevOps projects packaged as clear stories: Challenge → Solution → Impact."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <motion.a
            key={i}
            href={p.href}
            whileHover={{ y: -4 }}
            className="group rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 hover:border-zinc-700 hover:bg-zinc-900/80 transition shadow-lg"
          >
            {/* Media per-project with graceful fallback */}
            <div className="h-36 w-full rounded-2xl border border-zinc-800 mb-4 overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900">
              <img
                src={p.image}
                alt={p.alt}
                className="h-full w-full object-cover"
                onError={(e) => {
                  // fallback to gradient card text if file missing
                  const el = e.currentTarget;
                  const parent = el.parentElement;
                  if (parent) parent.innerHTML = '<div class="h-full w-full flex items-center justify-center text-zinc-400 text-sm">Project Preview</div>';
                }}
              />
            </div>

            <h3 className="text-lg font-semibold text-white group-hover:text-teal-300">
              {p.title}
            </h3>
            <p className="mt-2 text-zinc-400 text-sm">{p.challenge}</p>
            <p className="mt-1 text-zinc-300 text-sm">{p.solution}</p>
            <p className="mt-2 text-emerald-300/90 text-sm">{p.impact}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

// ---------- Skills ----------
const Skills = () => (
  <section id="skills" className="py-20 bg-zinc-950/95 border-t border-zinc-800">
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      <SectionHeader
        kicker="Capabilities"
        title="Skills as Systems"
        subtitle="Strength Score across Cloud, CI/CD, Observability, and Security."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: "Cloud & Infra", items: ["AWS (EC2, S3, RDS, VPC, IAM)", "Terraform", "Kubernetes/EKS", "Docker"] },
          { name: "CI/CD", items: ["GitHub Actions", "GitLab CI", "TeamCity", "ArgoCD", "Fastlane", "Jenkins"] },
          { name: "Observability", items: ["Prometheus", "Grafana", "Loki", "Promtail", "CloudWatch", "Alertmanager"] },
          { name: "Security & DevSecOps", items: ["Vault", "KMS", "RBAC", "IAM Policies", "CIS Basics"] },
        ].map((col) => (
          <div key={col.name} className="rounded-3xl bg-zinc-900/60 border border-zinc-800 p-6">
            <h4 className="text-white font-medium mb-3">{col.name}</h4>
            <ul className="space-y-2 text-zinc-300 text-sm">
              {col.items.map((it) => (
                <li key={it} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-400/90" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ---------- Skills Metrics (Grafana style) ----------
const SkillsMetrics = () => {
  const skills = [
    { name: "Kubernetes", value: 92 },
    { name: "GitHub Actions", value: 95 },
    { name: "Prometheus/Grafana", value: 90 },
    { name: "Vault", value: 86 },
    { name: "Terraform", value: 88 },
    { name: "AWS", value: 93 },
  ];

  const GaugeCard = ({ name, value }: { name: string; value: number }) => (
    <div className="relative rounded-3xl bg-zinc-900/60 border border-zinc-800 p-5">
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart data={[{ name, value }]} innerRadius="70%" outerRadius="100%" startAngle={90} endAngle={-270}>
            <PolarAngleAxis type="number" domain={[0, 100]} dataKey="value" tick={false} />
            <RadialBar dataKey="value" cornerRadius={999} background={{ fill: "#27272a" }} fill="#14b8a6" />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <p className="text-3xl font-bold text-white">{value}%</p>
          <p className="text-xs uppercase tracking-widest text-zinc-400 mt-1">{name}</p>
        </div>
      </div>
    </div>
  );

  const kpis = [
    { title: "Deploy Frequency (weekly)", value: "30", suffix: " /wk", data: [{x:1,y:12},{x:2,y:18},{x:3,y:22},{x:4,y:28},{x:5,y:30}] },
    { title: "MTTR", value: "25", suffix: " min", data: [{x:1,y:40},{x:2,y:35},{x:3,y:28},{x:4,y:25},{x:5,y:22}] },
    { title: "Alert Noise", value: "12", suffix: "%", data: [{x:1,y:20},{x:2,y:18},{x:3,y:16},{x:4,y:14},{x:5,y:12}] },
  ];

  return (
    <section id="skills-metrics" className="py-20 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeader kicker="Proof" title="Skills • Grafana-style Gauges" subtitle="Strength Score & live-style KPIs (demo)." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((s) => (<GaugeCard key={s.name} name={s.name} value={s.value} />))}
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {kpis.map((kpi, i) => (
            <div key={i} className="rounded-3xl bg-zinc-900/60 border border-zinc-800 p-5">
              <div className="flex items-baseline gap-2"><p className="text-3xl font-bold text-white">{kpi.value}</p><span className="text-zinc-400">{kpi.suffix}</span></div>
              <p className="text-sm text-zinc-400 mb-2">{kpi.title}</p>
              <div className="h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <ReLineChart data={kpi.data}><Line type="monotone" dataKey="y" dot={false} strokeWidth={2} /></ReLineChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- Showcase ----------
const Showcase = () => (
  <section id="showcase" className="py-20 bg-zinc-950">
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      <SectionHeader kicker="Proof" title="Interactive Showcase" subtitle="Plug sanitized screenshots or live embeds of Grafana, ArgoCD, and pipeline runs." />
      <div className="grid md:grid-cols-3 gap-6">
        {["Grafana Dashboard", "ArgoCD Sync", "GitHub Actions Run"].map((t) => (
          <div key={t} className="rounded-3xl bg-zinc-900/60 border border-zinc-800 p-5">
            <div className="h-44 rounded-2xl bg-zinc-800/70 border border-zinc-700 flex items-center justify-center text-zinc-400">
              {t} (screenshot/gif)
            </div>
            <p className="mt-3 text-zinc-300 text-sm">Replace with real visuals that demonstrate reliability, speed, and clarity.</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ---------- Blog ----------
const Blog = () => (
  <section id="blog" className="py-20 bg-zinc-950/95 border-t border-zinc-800">
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      <SectionHeader kicker="Insights" title="From the War Room" subtitle="Deep dives into automation, reliability, and scaling." />
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { title: "Automating 50+ iOS Deployments with Fastlane + GitHub Actions", blurb: "How reusable workflows and lanes slashed release times." },
          { title: "Centralized Monitoring That Actually Helps Ops", blurb: "SLOs, alert fatigue fixes, and dashboards that matter." },
          { title: "Vault Across Clusters: A Practical Guide", blurb: "JWT auth, engines, and guardrails for teams." },
        ].map((p, i) => (
          <a key={i} href="#" className="group rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 hover:border-zinc-700 hover:bg-zinc-900/80 transition">
            <div className="h-32 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-800 mb-4" />
            <h3 className="text-white font-semibold group-hover:text-teal-300">{p.title}</h3>
            <p className="mt-2 text-zinc-400 text-sm">{p.blurb}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-teal-300/90 text-sm">Read post <ArrowRight className="h-4 w-4" /></span>
          </a>
        ))}
      </div>
    </div>
  </section>
);

// ---------- Testimonials + Awards/Certs ----------
const Testimonials = () => (
  <section className="py-20 bg-zinc-950">
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      <SectionHeader kicker="What People Say" title="Testimonials" />
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { quote: "Vijay automated our pipeline, reducing release cycles by 70%.", author: "Engineering Manager" },
          { quote: "Thanks to his monitoring stack, we never miss downtime alerts.", author: "CTO" },
          { quote: "Rock-solid, security-first approach to infrastructure.", author: "Head of Platform" },
        ].map((t, i) => (
          <div key={i} className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6">
            <p className="text-zinc-200">“{t.quote}”</p>
            <p className="mt-4 text-zinc-400 text-sm">— {t.author}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AwardsCerts = () => (
  <section className="py-16 bg-zinc-950/95 border-t border-zinc-800">
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      <SectionHeader kicker="Recognition" title="Awards & Certifications" />
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6">
          <h4 className="text-white font-medium mb-2">Awards</h4>
          <ul className="text-zinc-300 text-sm list-disc ml-5 space-y-1">
            <li>Customer Delight Award for successful PoCs and client satisfaction.</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6">
          <h4 className="text-white font-medium mb-2">Certifications</h4>
          <ul className="text-zinc-300 text-sm list-disc ml-5 space-y-1">
            <li>IBM Cybersecurity Analyst Professional Certificate (2023)</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

// ---------- Contact & Footer ----------
const Contact = () => (
  <section id="contact" className="py-20 bg-zinc-950/95 border-t border-zinc-800">
    <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 text-center">
      <SectionHeader kicker="Let’s Talk" title="Ready to scale your infrastructure with confidence?" subtitle="Tell me about your challenges. I’ll bring the automation, reliability, and speed." />
      <div className="flex flex-wrap items-center justify-center gap-3">
        <PillButton href={CONFIG.email}><Mail className="h-4 w-4" /> Email Me</PillButton>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-10 bg-zinc-950 border-t border-zinc-800">
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-zinc-500 text-sm">© {new Date().getFullYear()} Vijay Shukla. All rights reserved.</p>
      <div className="flex items-center gap-3 text-zinc-400">
        <a href={CONFIG.github} className="hover:text-white">GitHub</a>
        <span>•</span>
        <a href={CONFIG.linkedin} className="hover:text-white">LinkedIn</a>
        <span>•</span>
        <a href="#blog" className="hover:text-white">Blog</a>
      </div>
    </div>
  </footer>
);

export default function HyperionPortfolio() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200">
      <NavBar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <SkillsMetrics />
      <Showcase />
      <Blog />
      <Testimonials />
      <AwardsCerts />
      <Contact />
      <Footer />
    </div>
  );
}
