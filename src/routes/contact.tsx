import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { CheckCircle2, Mail } from "lucide-react";
import { z } from "zod";
import { Button, SectionHeading } from "@/components/ui-kit";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact TeeGenie — Questions, Feedback & Ideas" },
      { name: "description", content: "Get in touch with TeeGenie. Send us your questions, feedback or T-shirt ideas." },
      { property: "og:title", content: "Contact TeeGenie" },
      { property: "og:description", content: "We'd love to hear your questions, feedback or ideas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  subject: z.string().trim().min(1, "Subject is required").max(150),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

const field = "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-ring";

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!res.success) {
      setErrors(Object.fromEntries(res.error.issues.map((i) => [i.path[0], i.message])));
      return;
    }
    setErrors({});
    setSent(true);
    e.currentTarget.reset();
  };

  const err = (k: string) => errors[k] && <p className="mt-1 text-xs text-destructive">{errors[k]}</p>;

  return (
    <section className="bg-gradient-hero">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeading eyebrow="Contact" title="Let's talk tees" sub="Have a question, some feedback or a wild T-shirt idea? We'd love to hear from you." />
        <div className="mt-12 grid gap-8 md:grid-cols-5">
          <div className="rounded-2xl bg-gradient-primary p-8 text-primary-foreground shadow-glow md:col-span-2">
            <Mail className="h-8 w-8" />
            <h3 className="mt-4 text-xl font-semibold">Email us</h3>
            <a href="mailto:hello@tee-genie.com" className="mt-1 block font-medium underline-offset-4 hover:underline">hello@tee-genie.com</a>
            <p className="mt-6 text-sm opacity-90">Our team reads every message. Reach out with questions, feedback or ideas — they help shape the future of TeeGenie.</p>
          </div>
          <form onSubmit={submit} noValidate className="space-y-4 rounded-2xl border border-border bg-card p-8 shadow-soft md:col-span-3">
            {sent && (
              <div className="flex items-center gap-2 rounded-xl bg-secondary p-3 text-sm text-secondary-foreground">
                <CheckCircle2 className="h-4 w-4 text-success" /> Thanks! Your message has been sent. We'll get back to you soon.
              </div>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              <div><input name="name" placeholder="Name" className={field} />{err("name")}</div>
              <div><input name="email" type="email" placeholder="Email" className={field} />{err("email")}</div>
            </div>
            <div><input name="subject" placeholder="Subject" className={field} />{err("subject")}</div>
            <div><textarea name="message" rows={5} placeholder="Message" className={field} />{err("message")}</div>
            <Button type="submit" size="lg" className="w-full sm:w-auto">Send Message</Button>
          </form>
        </div>
      </div>
    </section>
  );
}
