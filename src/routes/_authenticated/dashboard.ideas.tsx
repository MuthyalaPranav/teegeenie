import { createFileRoute } from "@tanstack/react-router";
import { Lightbulb } from "lucide-react";
import { DashPlaceholder } from "@/components/DashPlaceholder";

export const Route = createFileRoute("/_authenticated/dashboard/ideas")({
  component: () => <DashPlaceholder title="Saved Ideas" icon={Lightbulb} text="Save prompts and inspiration to come back to later." />,
});
