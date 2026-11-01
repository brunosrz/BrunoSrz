import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import * as m from "../src/paraglide/messages.js";
import PortfolioLandingPage from "../src/components/PortfolioLandingPage";
import Header from "../src/components/Header";

afterEach(cleanup);

describe("portfolio landing page", () => {
  it("presents a personal profile and the three selected projects", () => {
    render(<PortfolioLandingPage />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      m.hero_title_start(),
    );
    expect(
      screen.getByRole("heading", { name: m.vectora_title() }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: m.ability_title() }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: m.delivery_title() }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: m.about_title() }),
    ).toBeInTheDocument();
  });

  it("links Vectora to its own features and keeps future sites clearly unavailable", () => {
    render(<PortfolioLandingPage />);

    expect(
      screen.getByRole("link", { name: m.vectora_site() }),
    ).toHaveAttribute("href", "https://vectora.chat/features");
    const abilityRepo = screen
      .getAllByRole("link", { name: m.ability_repo() })
      .find((link) => link.getAttribute("href")?.endsWith("/AbilitySystem"));
    const deliveryRepo = screen
      .getAllByRole("link", { name: m.delivery_repo() })
      .find((link) => link.getAttribute("href")?.endsWith("/Delivery"));
    expect(abilityRepo).toHaveAttribute(
      "href",
      "https://github.com/brunosrz/AbilitySystem",
    );
    expect(deliveryRepo).toHaveAttribute(
      "href",
      "https://github.com/brunosrz/Delivery",
    );
    expect(
      screen.getAllByText(m.future_site()).length +
        screen.queryAllByRole("link", { name: m.future_site_link() }).length,
    ).toBe(2);
    expect(
      within(screen.getByRole("main")).queryByRole("link", {
        name: m.future_site(),
      }),
    ).not.toBeInTheDocument();
  });

  it("opens and closes the mobile navigation with an accessible control", () => {
    render(<Header />);

    const openButton = screen.getByRole("button", { name: m.nav_open_menu() });
    expect(openButton).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(openButton);
    expect(
      screen.getByRole("button", { name: m.nav_close_menu() }),
    ).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(screen.getByRole("link", { name: m.nav_projects() }));
    expect(
      screen.getByRole("button", { name: m.nav_open_menu() }),
    ).toHaveAttribute("aria-expanded", "false");
  });
});
