function SettingsView({ goBack, palette, resetDemo }) {
  const [confirmReset, setConfirmReset] = React.useState(false);
  const [resetDone,    setResetDone]    = React.useState(false);

  function handleReset() {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    resetDemo();
    setConfirmReset(false);
    setResetDone(true);
  }

  function handleCancel() {
    setConfirmReset(false);
  }

  // P6 programme details for display
  const p6 = window.VS.PROJECTS.find(p => p.id === 'P6');

  return (
    <div className="vs-detail">

      {/* Back bar */}
      <div className="vs-detail-bar">
        <button className="vs-back" onClick={goBack}>
          <span className="vs-back-arrow">←</span> Portfolio
        </button>
        <div className="vs-breadcrumb">
          <span>Portfolio</span>
          <span className="vs-bc-sep">/</span>
          <span className="vs-bc-current">Settings</span>
        </div>
      </div>

      {/* Header */}
      <header className="vs-detail-hero" style={{ paddingBottom: '1.5rem' }}>
        <div className="vs-detail-hero-left">
          <span className="vs-eyebrow">Configuration</span>
          <h1 className="vs-detail-title">Settings</h1>
        </div>
      </header>

      {/* Demo Controls section */}
      <section className="vs-section">
        <div className="vs-section-title">
          <span className="vs-eyebrow">Demo Controls</span>
          <h2>Manage the live demonstration</h2>
        </div>

        {/* What the demo does */}
        <div style={{
          padding: '1.25rem',
          border: '1px solid currentColor',
          borderRadius: '4px',
          marginBottom: '2rem',
          opacity: 0.85,
          maxWidth: '560px',
        }}>
          <div style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            opacity: 0.45,
            marginBottom: '0.75rem',
          }}>
            Demo programme
          </div>

          {p6 && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
                {p6.name}
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.4rem 1.5rem',
                fontSize: '0.82rem',
                opacity: 0.65,
              }}>
                <span><b>Department</b> {p6.division}</span>
                <span><b>Sponsor</b> {p6.primary_sponsor} · {p6.sponsor_role}</span>
                <span><b>PM</b> {p6.programme_manager}</span>
                <span><b>Budget</b> ${p6.spend.toFixed(1)}M</span>
                <span><b>Partner</b> {p6.vendor}</span>
                <span><b>Score</b> {p6.score}/100 · {p6.verdict.charAt(0).toUpperCase() + p6.verdict.slice(1)}</span>
              </div>
            </div>
          )}

          <div style={{ fontSize: '0.82rem', opacity: 0.6, lineHeight: 1.6 }}>
            During the demo, this programme is added to the portfolio
            live using the New Evaluation flow. It starts with 90%
            coverage and 10 pending questions. Answering the 5 critical
            questions moves the score from 47 to 68.
          </div>
        </div>

        {/* Reset success message */}
        {resetDone && (
          <div style={{
            padding: '0.75rem 1.25rem',
            background: '#E2EFDA',
            border: '1px solid #1D6B3B',
            borderRadius: '4px',
            marginBottom: '1.5rem',
            fontSize: '0.85rem',
            color: '#1D6B3B',
            maxWidth: '480px',
          }}>
            Demo reset. Portfolio is back to 5 programmes.
            Claims Automation AI has been removed.
          </div>
        )}

        {/* Reset button */}
        <div style={{ maxWidth: '480px' }}>
          <div style={{
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '0.4rem',
          }}>
            Reset Demo
          </div>
          <div style={{
            fontSize: '0.82rem',
            opacity: 0.55,
            marginBottom: '1rem',
            lineHeight: 1.5,
          }}>
            Removes Claims Automation AI from the portfolio and
            resets all answered questions. Use this before every
            demo run.
          </div>

          {!confirmReset ? (
            <button
              onClick={handleReset}
              style={{
                border: `1px solid ${palette.kill}`,
                color: palette.kill,
                background: 'transparent',
                padding: '0.45rem 1.25rem',
                borderRadius: '3px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: '0.04em',
              }}
            >
              Reset Demo
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.83rem', opacity: 0.7 }}>
                Are you sure? This cannot be undone.
              </span>
              <button
                onClick={handleReset}
                style={{
                  border: `1px solid ${palette.kill}`,
                  background: palette.kill,
                  color: '#fff',
                  padding: '0.35rem 1rem',
                  borderRadius: '3px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Yes, reset
              </button>
              <button
                onClick={handleCancel}
                style={{
                  border: '1px solid currentColor',
                  background: 'transparent',
                  color: 'inherit',
                  padding: '0.35rem 1rem',
                  borderRadius: '3px',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  opacity: 0.55,
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </section>

      {/* About section */}
      <section className="vs-section">
        <div className="vs-section-title">
          <span className="vs-eyebrow">About</span>
          <h2>Verity Signal</h2>
        </div>
        <div style={{ maxWidth: '480px', fontSize: '0.85rem',
                      opacity: 0.6, lineHeight: 1.7 }}>
          <p>Enterprise AI portfolio assessment platform.</p>
          <p style={{ marginTop: '0.5rem' }}>
            Meridian Financial Group demo build · April 2026
          </p>
          <p style={{ marginTop: '0.5rem' }}>
            6 programmes · 4 taxonomy buckets ·
            31 signals · 100 assessment criteria
          </p>
          <p style={{ marginTop: '0.5rem' }}>
            Navigate via footer links —
            Intelligence Configurations · Governance Intelligence · Settings
          </p>
        </div>
      </section>

    </div>
  );
}

window.SettingsView = SettingsView;
