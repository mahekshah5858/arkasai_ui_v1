// Same shell as Arkas marketing page: announce bar + nav (logo, links, CTAs)

function AppTopNav({ goToLanding, enterVerity }) {
  const toSection = (hash) => () => goToLanding(hash);

  return (
    <>
      <div className="announce-bar">
        Early access is now open for Verity Signal. Built for organizations managing $5M–$200M+
        in active AI investments.{' '}
        <a
          href="#early-access"
          onClick={(e) => {
            e.preventDefault();
            goToLanding('#early-access');
          }}
        >
          Request early access →
        </a>
      </div>
      <nav className="vs-arkas-nav" aria-label="Primary">
        <button
          type="button"
          className="vs-nav-logo-btn nav-logo"
          onClick={() => goToLanding('')}
          aria-label="Arkas AI — home"
        >
          <img className="vs-nav-logo-img" src="arkas-nav-logo.png" alt="Arkas AI" />
        </button>
        <ul className="nav-links">
          <li>
            <button type="button" className="nav-a" onClick={toSection('#platform')}>
              Platform
            </button>
          </li>
          <li>
            <button type="button" className="nav-a" onClick={toSection('#executives')}>
              For Executives
            </button>
          </li>
          <li>
            <button type="button" className="nav-a" onClick={toSection('#how-it-works')}>
              How It Works
            </button>
          </li>
          <li>
            <button type="button" className="nav-a" onClick={toSection('#early-access')}>
              Paid Pilot
            </button>
          </li>
        </ul>
        <div className="nav-cta">
          <button type="button" className="btn btn-ghost" onClick={enterVerity}>
            View Demo
          </button>
          <button type="button" className="btn btn-primary" onClick={toSection('#early-access')}>
            Request a Call Back
          </button>
        </div>
      </nav>
    </>
  );
}
