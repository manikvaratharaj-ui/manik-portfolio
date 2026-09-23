// Fallback only: "/" is rewritten to /portfolio.html before this page is reached.
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/portfolio.html");
}
