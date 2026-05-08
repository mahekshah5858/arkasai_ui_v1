function IntakeView({ goBack, palette, onComplete }) {
  const SCORING_MESSAGES = [
    "Connecting to GitHub repository...",
    "Reading commit history — last 90 days",
    "Analysing CI/CD pipeline results via GitHub Actions",
    "CI/CD pass rate: 92% over 847 runs",
    "Scanning pull request compliance rate...",
    "Code review compliance: 94% of PRs peer reviewed",
    "Fetching vulnerability report from GitHub Security...",
    "Critical vulnerabilities: 0 open",
    "Reading SonarCloud code quality rating...",
    "Code quality: Rating B confirmed",
    "Calculating technical debt ratio...",
    "Technical debt: 4% — greenfield codebase",
    "Connecting to Jira project board...",
    "Reading milestone delivery data — last 90 days",
    "On-time delivery rate: 88% across 34 milestones",
    "Scanning open blockers...",
    "Open blockers: 2 found, both assigned",
    "Reading dependency tracking status...",
    "Integration build status: 65% complete",
    "Checking integration error rate...",
    "Integration error rate: 0.6% across active connections",
    "Processing Claims_Business_Case_v1.pdf...",
    "Extracting budget approval — $2.4M confirmed",
    "Extracting strategic alignment — COO roadmap confirmed",
    "Extracting ROI estimate — 3.1x over 3 years",
    "Processing Claims_Team_Profile.pdf...",
    "Extracting team capability data...",
    "Critical resource availability: 75%",
    "IBM Consulting: 3 comparable programmes confirmed",
    "Processing Claims_Data_Assessment.pdf...",
    "Data quality baseline: informal — formal metrics in progress",
    "Data lineage: 2 of 4 sources documented",
    "Scoring Tech bucket — 9 signals...",
    "Engineering Health: AMBER",
    "Security Posture: GREY — security framework question pending",
    "Integration Health: AMBER",
    "Technical Debt Level: GREEN",
    "Scoring Process bucket — 8 signals...",
    "Governance Structure: GREY — programme board question pending",
    "Milestone Delivery Rate: AMBER",
    "Rollback and Contingency: AMBER",
    "Scoring People bucket — 7 signals...",
    "Sponsor Commitment: GREY — attendance question pending",
    "Team Capability: AMBER",
    "Scoring Strategy bucket — 7 signals...",
    "Mandate Clarity: GREY — mandate document question pending",
    "Value Case Strength: AMBER",
    "Exit and Kill Criteria: RED — no kill criteria defined",
    "Calculating bucket scores...",
    "Tech: 40  Process: 44  People: 46  Strategy: 46",
    "Overall score: 44/100 — RESCUE",
    "Coverage: 90 of 100 criteria scored",
    "10 criteria pending — 5 are critical",
    "Generating pending questions...",
    "Evaluation complete.",
  ];

  const [step, setStep] = React.useState(1);
  const [scoring, setScoring] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [msgIndex, setMsgIndex] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (step > 1 && !dataLoaded) setStep(1);
  }, [step, dataLoaded]);

  // Pre-filled P6 data
  const PROGRAMME = {
    name:             'Claims Automation AI',
    department:       'Insurance Operations',
    description:      'AI-powered automation of insurance claims triage, document extraction, and initial assessment across Meridian\'s property and casualty portfolio.',
    primarySponsor:   'Thomas Reeves',
    primaryRole:      'COO',
    secondarySponsor: 'David Kim',
    secondaryRole:    'CFO',
    pm:               'Sarah Mitchell',
    budget:           '$2,400,000',
    partner:          'IBM Consulting',
  };

  const DOCUMENTS = [
    { name: 'Claims_Business_Case_v1.pdf',
      desc: 'Business case, ROI estimate, strategic alignment, budget sign-off' },
    { name: 'Claims_Team_Profile.pdf',
      desc: 'Team composition, skills, experience, resource availability' },
    { name: 'Claims_Data_Assessment.pdf',
      desc: 'Data quality baseline, lineage, governance status' },
  ];

  const CONNECTORS = [
    { name: 'GitHub',                status: 'connected', icon: '⬡',
      desc: 'Code quality, test coverage, PR compliance, technical debt' },
    { name: 'GitHub Actions',        status: 'connected', icon: '⬡',
      desc: 'CI/CD reliability, build pass rate' },
    { name: 'GitHub Security',       status: 'connected', icon: '⬡',
      desc: 'Vulnerability count, secrets management' },
    { name: 'Jira',                  status: 'connected', icon: '⬡',
      desc: 'Milestone delivery, blockers, dependency tracking' },
    { name: 'Google Calendar',       status: 'pending',   icon: '○',
      desc: 'Sponsor attendance, governance cadence' },
    { name: 'SonarCloud',            status: 'pending',   icon: '○',
      desc: 'Code quality rating, maintainability' },
  ];

  // Styles
  const stepBtnStyle = (active) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1.8rem',
    height: '1.8rem',
    borderRadius: '50%',
    border: `1px solid ${active ? 'var(--arkas-navy)' : 'currentColor'}`,
    fontSize: '0.78rem',
    fontWeight: 700,
    background: active ? 'var(--arkas-navy)' : 'transparent',
    color: active ? '#ffffff' : 'inherit',
    opacity: active ? 1 : 0.35,
    flexShrink: 0,
  });

  const fieldStyle = {
    padding: '0.4rem 0.6rem',
    border: '1px solid currentColor',
    borderRadius: '3px',
    background: 'transparent',
    color: 'inherit',
    fontSize: '0.85rem',
    opacity: 0.75,
    width: '100%',
  };

  const labelStyle = {
    fontSize: '0.72rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    opacity: 0.45,
    marginBottom: '0.3rem',
    display: 'block',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem 1.5rem',
    maxWidth: '560px',
  };

  function handleScore() {
    setScoring(true);
    setMsgIndex(0);
    setProgress(0);

    const total    = SCORING_MESSAGES.length;
    const duration = 15000; // 15 seconds
    const interval = duration / total; // ~273ms per message

    let i = 0;
    const timer = setInterval(() => {
      i++;
      setMsgIndex(i);
      setProgress(Math.round((i / total) * 100));
      if (i >= total - 1) {
        clearInterval(timer);
        setTimeout(() => {
          setScoring(false);
          setDone(true);
        }, 400);
      }
    }, interval);
  }

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
          <span className="vs-bc-current">New Evaluation</span>
        </div>
      </div>

      {/* Header */}
      <header className="vs-detail-hero" style={{ paddingBottom: '1.5rem' }}>
        <div className="vs-detail-hero-left">
          <span className="vs-eyebrow">New Evaluation</span>
          {dataLoaded ? (
            <>
              <h1 className="vs-detail-title">Claims Automation AI</h1>
              <p style={{ opacity: 0.55, marginTop: '0.4rem', fontSize: '0.9rem' }}>
                Insurance Operations · IBM Consulting · $2.4M
              </p>
            </>
          ) : (
            <>
              <h1 className="vs-detail-title">Programme intake</h1>
              <p style={{ opacity: 0.55, marginTop: '0.4rem', fontSize: '0.9rem' }}>
                Load sample submission data to run through the demo — nothing is shown until you load.
              </p>
            </>
          )}
        </div>

        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center',
                      gap: '0.5rem', alignSelf: 'flex-start',
                      marginTop: '1.2rem' }}>
          {[
            { n: 1, label: 'Programme details' },
            { n: 2, label: 'Documents' },
            { n: 3, label: 'Connectors' },
          ].map(({ n, label }, i) => (
            <React.Fragment key={n}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <div style={stepBtnStyle(step >= n)}>{n}</div>
                <span style={{ fontSize: '0.75rem', opacity: step === n ? 0.8 : 0.35,
                               fontWeight: step === n ? 600 : 400 }}>
                  {label}
                </span>
              </div>
              {i < 2 && (
                <div style={{ width: '2rem', height: '1px',
                              background: 'currentColor', opacity: 0.2 }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </header>

      {/* ── STEP 1: Programme details ─────────────────────── */}
      {step === 1 && (
        <section className="vs-section">
          <div className="vs-section-title">
            <span className="vs-eyebrow">Step 1 of 3</span>
            <h2>Programme details</h2>
            <p className="vs-section-sub">
              {dataLoaded
                ? 'Submission loaded. Review the fields and continue.'
                : 'No submission loaded yet. Use Load sample data to pull in the demo programme (Claims Automation AI), then continue.'}
            </p>
          </div>

          <div style={{ maxWidth: '600px' }}>
            {!dataLoaded ? (
              <div
                style={{
                  padding: '1.25rem 1.5rem',
                  border: '1px dashed currentColor',
                  borderRadius: '4px',
                  opacity: 0.75,
                  marginBottom: '1.5rem',
                }}
              >
                <p style={{ fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1rem', opacity: 0.8 }}>
                  Programme name, sponsors, budget, and description will appear here after you load the sample file bundle.
                </p>
                <button
                  type="button"
                  onClick={() => setDataLoaded(true)}
                  style={{
                    border: `1px solid ${palette.accelerate}`,
                    background: palette.accelerate,
                    color: '#fff',
                    padding: '0.45rem 1.25rem',
                    borderRadius: '3px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    letterSpacing: '0.04em',
                  }}
                >
                  Load sample data
                </button>
              </div>
            ) : (
              <>
                {/* Name + department */}
                <div style={gridStyle}>
                  <div>
                    <label style={labelStyle}>Programme name</label>
                    <div style={fieldStyle}>{PROGRAMME.name}</div>
                  </div>
                  <div>
                    <label style={labelStyle}>Department</label>
                    <div style={fieldStyle}>{PROGRAMME.department}</div>
                  </div>
                </div>

                {/* Description */}
                <div style={{ marginTop: '1rem' }}>
                  <label style={labelStyle}>Description</label>
                  <div style={{ ...fieldStyle, lineHeight: 1.5 }}>
                    {PROGRAMME.description}
                  </div>
                </div>

                {/* Sponsors */}
                <div style={{ ...gridStyle, marginTop: '1rem' }}>
                  <div>
                    <label style={labelStyle}>Primary sponsor</label>
                    <div style={fieldStyle}>
                      {PROGRAMME.primarySponsor} · {PROGRAMME.primaryRole}
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Secondary sponsor</label>
                    <div style={fieldStyle}>
                      {PROGRAMME.secondarySponsor} · {PROGRAMME.secondaryRole}
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Programme manager</label>
                    <div style={fieldStyle}>{PROGRAMME.pm}</div>
                  </div>
                  <div>
                    <label style={labelStyle}>Budget</label>
                    <div style={fieldStyle}>{PROGRAMME.budget}</div>
                  </div>
                  <div>
                    <label style={labelStyle}>SI / Partner</label>
                    <div style={fieldStyle}>{PROGRAMME.partner}</div>
                  </div>
                </div>
              </>
            )}

            {/* Next */}
            <div style={{ marginTop: '2rem' }}>
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!dataLoaded}
                style={{
                  border: `1px solid ${palette.accelerate}`,
                  background: dataLoaded ? palette.accelerate : 'transparent',
                  color: dataLoaded ? '#fff' : 'inherit',
                  padding: '0.45rem 1.5rem',
                  borderRadius: '3px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: dataLoaded ? 'pointer' : 'not-allowed',
                  letterSpacing: '0.04em',
                  opacity: dataLoaded ? 1 : 0.35,
                }}
              >
                Next — Upload documents
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── STEP 2: Documents ────────────────────────────── */}
      {step === 2 && dataLoaded && (
        <section className="vs-section">
          <div className="vs-section-title">
            <span className="vs-eyebrow">Step 2 of 3</span>
            <h2>Documents</h2>
            <p className="vs-section-sub">
              After loading sample data: 3 documents uploaded. The platform has extracted
              facts from each file to score relevant criteria.
            </p>
          </div>

          <div style={{ maxWidth: '540px' }}>
            {DOCUMENTS.map((doc, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                padding: '0.9rem 0',
                borderBottom: '1px solid currentColor',
              }}>
                <div style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#2F5496',
                  background: '#DAE3F3',
                  padding: '2px 6px',
                  borderRadius: '2px',
                  whiteSpace: 'nowrap',
                  marginTop: '2px',
                  flexShrink: 0,
                }}>
                  PDF
                </div>
                <div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace',
                                fontSize: '0.8rem', marginBottom: '0.2rem' }}>
                    {doc.name}
                  </div>
                  <div style={{ fontSize: '0.78rem', opacity: 0.5 }}>
                    {doc.desc}
                  </div>
                </div>
                <div style={{ marginLeft: 'auto', color: '#1D6B3B',
                              fontSize: '0.8rem', fontWeight: 600,
                              flexShrink: 0 }}>
                  ✓ Extracted
                </div>
              </div>
            ))}

            {/* Next */}
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => setStep(1)}
                style={{
                  border: '1px solid currentColor',
                  background: 'transparent',
                  color: 'inherit',
                  padding: '0.45rem 1.25rem',
                  borderRadius: '3px',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  opacity: 0.5,
                }}
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                style={{
                  border: `1px solid ${palette.accelerate}`,
                  background: palette.accelerate,
                  color: '#fff',
                  padding: '0.45rem 1.5rem',
                  borderRadius: '3px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  letterSpacing: '0.04em',
                }}
              >
                Next — Connect data sources
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── STEP 3: Connectors — or scoring animation ─────── */}
      {step === 3 && !done && dataLoaded && scoring && (
        <section className="vs-section">
          <div className="vs-section-title">
            <span className="vs-eyebrow">Scoring in progress</span>
            <h2>Analysing Claims Automation AI</h2>
          </div>

          <div style={{ maxWidth: '560px' }}>

            {/* Progress bar */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                fontSize: '0.78rem', opacity: 0.5, marginBottom: '0.5rem',
              }}>
                <span>Processing</span>
                <span>{progress}%</span>
              </div>
              <div style={{
                height: '2px', background: 'currentColor',
                opacity: 0.12, borderRadius: '1px', position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0,
                  width: `${progress}%`,
                  background: palette.accelerate,
                  borderRadius: '1px',
                  transition: 'width 0.25s linear',
                }} />
              </div>
            </div>

            {/* Live message — current */}
            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.85rem',
              marginBottom: '0.5rem',
              minHeight: '1.5rem',
              color: palette.accelerate,
              fontWeight: 500,
            }}>
              {SCORING_MESSAGES[msgIndex] || ''}
            </div>

            {/* Last 4 messages as history — fading */}
            <div style={{ opacity: 0.35 }}>
              {[3, 2, 1].map((offset) => {
                const idx = msgIndex - offset;
                if (idx < 0) return null;
                return (
                  <div key={offset} style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.78rem',
                    marginBottom: '0.25rem',
                    opacity: 1 - (offset * 0.25),
                  }}>
                    {SCORING_MESSAGES[idx]}
                  </div>
                );
              })}
            </div>

            {/* Source indicators */}
            <div style={{
              display: 'flex', gap: '1rem', marginTop: '2.5rem',
              flexWrap: 'wrap',
            }}>
              {['GitHub', 'GitHub Actions', 'GitHub Security', 'Jira',
                'Business Case PDF', 'Team Profile PDF', 'Data Assessment PDF',
              ].map((src) => (
                <div key={src} style={{
                  fontSize: '0.7rem',
                  fontFamily: 'JetBrains Mono, monospace',
                  padding: '2px 6px',
                  border: '1px solid currentColor',
                  borderRadius: '2px',
                  opacity: 0.35,
                }}>
                  {src}
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {step === 3 && !done && dataLoaded && !scoring && (
        <section className="vs-section">
          <div className="vs-section-title">
            <span className="vs-eyebrow">Step 3 of 3</span>
            <h2>Data connectors</h2>
            <p className="vs-section-sub">
              With sample data: 4 connectors active, 2 pending.
              Active connectors are scoring criteria live.
              Pending connectors can be added after initial evaluation.
            </p>
          </div>

          <div style={{ maxWidth: '540px' }}>
            {CONNECTORS.map((conn, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.75rem 0',
                borderBottom: '1px solid currentColor',
              }}>
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  border: `1px solid ${conn.status === 'connected' ? '#1D6B3B' : 'currentColor'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.85rem',
                  color: conn.status === 'connected' ? '#1D6B3B' : 'inherit',
                  opacity: conn.status === 'connected' ? 1 : 0.3,
                  flexShrink: 0,
                }}>
                  {conn.status === 'connected' ? '✓' : '○'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>
                    {conn.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.5 }}>
                    {conn.desc}
                  </div>
                </div>
                <div style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  color: conn.status === 'connected' ? '#1D6B3B' : 'inherit',
                  opacity: conn.status === 'connected' ? 1 : 0.35,
                  flexShrink: 0,
                }}>
                  {conn.status === 'connected' ? 'Connected' : 'Pending'}
                </div>
              </div>
            ))}

            {/* Score button */}
            <div style={{ marginTop: '2rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  style={{
                    border: '1px solid currentColor',
                    background: 'transparent',
                    color: 'inherit',
                    padding: '0.45rem 1.25rem',
                    borderRadius: '3px',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    opacity: 0.5,
                  }}
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleScore}
                  style={{
                    border: `1px solid ${palette.accelerate}`,
                    background: palette.accelerate,
                    color: '#fff',
                    padding: '0.45rem 1.75rem',
                    borderRadius: '3px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    letterSpacing: '0.04em',
                  }}
                >
                  Connect and Score
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── SCORE COMPLETE ───────────────────────────────── */}
      {done && (
        <section className="vs-section">
          <div className="vs-section-title">
            <span className="vs-eyebrow">Evaluation complete</span>
            <h2>First score ready</h2>
          </div>

          <div style={{ maxWidth: '480px' }}>
            {/* Score result */}
            <div style={{
              padding: '1.5rem',
              border: `1px solid ${palette.rescue}`,
              borderRadius: '4px',
              marginBottom: '1.5rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline',
                            gap: '0.75rem', marginBottom: '0.5rem' }}>
                <div style={{ fontSize: '3rem', fontWeight: 300,
                              fontFamily: 'Newsreader, serif',
                              color: palette.rescue, lineHeight: 1 }}>
                  44
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: palette.rescue,
                                textTransform: 'uppercase',
                                letterSpacing: '0.06em', fontSize: '0.85rem' }}>
                    Rescue
                  </div>
                  <div style={{ fontSize: '0.78rem', opacity: 0.5 }}>
                    /100 initial score
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '0.82rem', opacity: 0.65, lineHeight: 1.6 }}>
                90 of 100 criteria scored from GitHub, Jira, and 3 uploaded documents.
                10 criteria pending — 5 are critical questions that should be
                answered now to reach a score of 59.
              </div>
            </div>

            {/* Coverage breakdown */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '1rem',
              marginBottom: '1.5rem',
              fontSize: '0.82rem',
            }}>
              {[
                { label: 'Coverage',   value: '90%',        sub: '90 of 100 criteria' },
                { label: 'Pending',    value: '10',          sub: '5 critical, 5 normal' },
                { label: 'Connectors', value: '4 active',    sub: '2 pending' },
              ].map(({ label, value, sub }) => (
                <div key={label} style={{
                  padding: '0.75rem',
                  border: '1px solid currentColor',
                  borderRadius: '3px',
                  opacity: 0.75,
                }}>
                  <div style={{ fontSize: '0.68rem', opacity: 0.5,
                                textTransform: 'uppercase', letterSpacing: '0.05em',
                                marginBottom: '0.3rem' }}>
                    {label}
                  </div>
                  <div style={{ fontWeight: 700, marginBottom: '0.15rem' }}>{value}</div>
                  <div style={{ fontSize: '0.72rem', opacity: 0.5 }}>{sub}</div>
                </div>
              ))}
            </div>

            {/* Go to programme */}
            <button
              onClick={onComplete}
              style={{
                border: `1px solid ${palette.accelerate}`,
                background: palette.accelerate,
                color: '#fff',
                padding: '0.5rem 1.75rem',
                borderRadius: '3px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: '0.04em',
              }}
            >
              View programme → answer critical questions
            </button>
          </div>
        </section>
      )}

    </div>
  );
}

window.IntakeView = IntakeView;
