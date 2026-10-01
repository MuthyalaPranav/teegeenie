import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageSquareText, Wand2, Shirt, Brain, Palette, Heart } from "lucide-react";
import heroTee from "@/assets/hero-tee.jpg";
import { useOpenAuth } from "@/components/SiteLayout";
import { Button, Card, SectionHeading, btnClass } from "@/components/ui-kit";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TeeGenie — Turn Your Imagination Into a T-Shirt" },
      { name: "description", content: "TeeGenie lets you describe a T-shirt idea and turn it into a custom design with AI." },
      { property: "og:title", content: "TeeGenie — Turn Your Imagination Into a T-Shirt" },
      { property: "og:description", content: "AI-powered custom T-shirt design. Describe it, generate it, wear it." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const steps = [
  { icon: MessageSquareText, title: "Describe Your Idea", text: "Type anything — a mood, a meme, a memory. Your words are the brief." },
  { icon: Wand2, title: "Let AI Create Your Design", text: "Our genie turns your prompt into unique, print-ready artwork in seconds." },
  { icon: Shirt, title: "Wear Your Creation", text: "Pick your fit and color, and get a one-of-a-kind tee delivered to you." },
];

const features = [
  { icon: Brain, title: "AI-Powered Creativity", text: "Generate endless original designs without any design skills." },
  { icon: Palette, title: "Personalized Designs", text: "Every shirt reflects your style, story and imagination." },
  { icon: Heart, title: "Made for You", text: "Quality fabrics, crafted on demand — just for you." },
];

function Home() {
  const openAuth = useOpenAuth();
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-primary shadow-soft">
              ✨ AI-powered custom apparel
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-6xl">
              Turn Your <span className="text-gradient">Imagination</span> Into a T-Shirt
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              TeeGenie will let you create personalized T-shirt designs using AI. Just describe your idea — we'll bring it to life.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" onClick={openAuth}>Get Started <ArrowRight className="h-4 w-4" /></Button>
              <Link to="/about" className={btnClass("outline", "lg")}>Learn More</Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-primary opacity-30 blur-3xl" />
            <img src={heroTee} width={1024} height={1152} alt="Black T-shirt with a cosmic genie lamp design" className="relative animate-float rounded-[2rem] shadow-glow" />
            <div className="absolute -bottom-5 -left-4 rounded-2xl border border-border bg-card px-4 py-3 text-sm shadow-soft">
              <p className="text-xs text-muted-foreground">Prompt</p>
              <p className="font-semibold">"A genie lamp releasing a galaxy"</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeading eyebrow="How it works" title="From thought to threads in 3 steps" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Card key={s.title}>
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground"><s.icon className="h-6 w-6" /></span>
                <span className="font-display text-4xl font-bold text-accent">0{i + 1}</span>
              </div>
              <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-secondary/60 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading eyebrow="Why TeeGenie?" title={<>Creativity, <span className="text-gradient">unbottled</span></>} />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {features.map((f) => (
              <Card key={f.title}>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-accent-foreground"><f.icon className="h-6 w-6" /></span>
                <h3 className="mt-5 text-xl font-semibold">{f.title}</h3>
                <p className="mt-2 text-muted-foreground">{f.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
