import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import * as m from "../src/paraglide/messages.js";
import PortfolioLandingPage from "../src/components/PortfolioLandingPage";
import Header from "../src/components/Header";
import { secureSiteUrl } from "../src/data/project-sites";

const { setLocaleMock } = vi.hoisted(() => ({ setLocaleMock: vi.fn() }));

vi.mock("../src/paraglide/runtime.js", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../src/paraglide/runtime.js")>()),
  setLocale: setLocaleMock,
}));

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
    const { container } = render(<PortfolioLandingPage />);

    expect(
      screen.getByRole("link", { name: /Explore Vectora features/ }),
    ).toHaveAttribute("href", "https://vectora.chat/features");
    const abilityRepo = container.querySelector(
      'a[href="https://github.com/brunosrz/AbilitySystem"]',
    );
    const deliveryRepo = container.querySelector(
      'a[href="https://github.com/brunosrz/Delivery"]',
    );
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

  it("closes the mobile navigation on Escape and restores focus", () => {
    render(<Header />);

    const toggle = screen.getByRole("button", { name: m.nav_open_menu() });
    fireEvent.click(toggle);
    fireEvent.keyDown(window, { key: "Escape" });

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
  });

  it("announces the locale change and calls Paraglide when toggled", () => {
    render(<Header />);

    const toggle = screen.getByRole("button", {
      name: m.language_toggle_aria({
        current: "English",
        target: "Português",
      }),
    });
    expect(document.getElementById("language-switch-to")).toHaveAttribute(
      "lang",
      "pt-BR",
    );
    setLocaleMock.mockClear();
    fireEvent.click(toggle);

    expect(setLocaleMock).toHaveBeenCalledWith("pt-BR");
  });
});

describe("project site URL validation", () => {
  it.each([
    undefined,
    "",
    "http://example.com",
    "javascript:alert(1)",
    "not a url",
  ])("rejects unsafe or invalid URL %s", (value) => {
    expect(secureSiteUrl(value)).toBeUndefined();
  });

  it("accepts an HTTPS URL", () => {
    expect(secureSiteUrl("https://example.com/path")).toBe(
      "https://example.com/path",
    );
  });
});
