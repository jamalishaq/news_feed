import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Feeds" },
    { name: "description", content: "Add and view feeds." },
  ];
}

export default function Home() {
  return <Welcome />;
}
