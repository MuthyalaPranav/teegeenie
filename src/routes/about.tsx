import { createFileRoute } from "@tanstack/react-router";
import { Lightbulb, Puzzle, Sparkles, Telescope } from "lucide-react";
import { Card, SectionHeading } from "@/components/ui-kit";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About TeeGenie — AI Meets Wearable Art" },
      { name: "description", content: "Learn what TeeGenie is, the problem it solves, and our vision for AI-powered custom apparel." },
      { property: "og:title", content: "About TeeGenie — AI Meets Wearable Art" },
      { property: "og:description", content: "Our mission: let anyone turn their imagination into wearable art." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const blocks = [
  { icon: Lightbulb, title: "What is TeeGenie?", text: "TeeGenie is an AI-powered platform where you describe a T-shirt idea in plain words and receive a custom, print-ready design." },
  { icon: Puzzle, title: "The problem we solve", text: "Custom apparel usually needs design skills, expensive tools or long back-and-forth with designers. We remove those barriers." },
  { icon: Telescope, title: "The vision", text: "A world where self-expression isn't limited by skill — where every idea can become something you proudly wear." },
  { icon: Sparkles, title: "AI + creativity", text: "You bring the imagination; AI brings the craft. Together, they create designs that are truly yours." },
];

function About() {
  return (
    <>
      <section className="bg-gradient-hero">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <SectionHeading eyebrow="About us" title={<>We make <span className="text-gradient">ideas wearable</span></>} sub="TeeGenie is a young startup at the intersection of artificial intelligence, creativity and fashion." />
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-6 px-5 pb-20 md:grid-cols-2">
        {blocks.map((b) => (
          <Card key={b.title}>
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground"><b.icon className="h-6 w-6" /></span>
            <h3 className="mt-5 text-xl font-semibold">{b.title}</h3>
            <p className="mt-2 text-muted-foreground">{b.text}</p>
          </Card>
        ))}
      </section>
      <section className="px-5 pb-24">
        <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-primary p-10 text-center text-primary-foreground shadow-glow md:p-16">
          <h2 className="text-3xl font-bold md:text-4xl">Our Vision</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg opacity-90">
            Anyone — no matter their skills — should be able to turn their imagination into wearable art.
          </p>
        </div>
      </section>
    </>
  );
}
