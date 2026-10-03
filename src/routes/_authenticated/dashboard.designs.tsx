import { createFileRoute } from "@tanstack/react-router";
import { Palette } from "lucide-react";
import { DashPlaceholder } from "@/components/DashPlaceholder";

export const Route = createFileRoute("/_authenticated/dashboard/designs")({
  component: () => <DashPlaceholder title="My Designs" icon={Palette} text="Designs you create with TeeGenie will appear here." />,
});
