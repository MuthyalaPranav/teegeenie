import { createFileRoute } from "@tanstack/react-router";
import { Package } from "lucide-react";
import { DashPlaceholder } from "@/components/DashPlaceholder";

export const Route = createFileRoute("/_authenticated/dashboard/orders")({
  component: () => <DashPlaceholder title="Orders" icon={Package} text="Your T-shirt orders and their status will show up here." />,
});
