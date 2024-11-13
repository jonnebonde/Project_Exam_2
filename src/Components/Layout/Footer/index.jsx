function Footer() {
  return (
    <footer className="bg-secondary text-text_color text-center font-roboto d-flex flex-column p-4 z-4 mt-5">
      <span>Made by Jonne Martin Krosby</span>
      <span>Powered by noroff API</span>
      <span>© {new Date().getFullYear()} Holidaze All rights reserved</span>
    </footer>
  );
}

export default Footer;
