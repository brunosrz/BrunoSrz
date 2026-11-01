import { createFileRoute } from "@tanstack/react-router";
import PortfolioLandingPage from "../components/PortfolioLandingPage";

export const Route = createFileRoute("/")({ component: PortfolioLandingPage });
