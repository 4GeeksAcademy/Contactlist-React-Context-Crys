
export const Footer = () => (
  <footer className="footer">
    <div className="footer-line">
      <span className="footer-dot"></span>
    </div>
    <p className="footer-links">
      © 2025 Crystian Ariel Carmona Trujillo |
      <a
        href="https://github.com/crysc4rmon4-web"
        target="_blank"
        rel="noopener noreferrer"
         /*IMPORTANTE seguridad y privacidad, verificarlo siempre con target="blank" 
         evita pishing*/
      >
        GitHub
      </a>
      &nbsp;| Crafted with <span className="heart">❤️</span> & <code>code</code>.
    </p>
  </footer>
);
