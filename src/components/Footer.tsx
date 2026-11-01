import { ArrowUp } from "lucide-react";
import * as m from "../paraglide/messages.js";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-wrap footer-inner">
        <a className="wordmark footer-wordmark" href="#inicio">
          <span className="wordmark-mark" aria-hidden="true">
            b.
          </span>
          <span>brunosrz</span>
        </a>
        <p>{m.footer_note()}</p>
        <a className="back-to-top" href="#inicio">
          {m.footer_back_top()}
          <ArrowUp size={15} aria-hidden="true" />
        </a>
        <span className="footer-copyright">© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
