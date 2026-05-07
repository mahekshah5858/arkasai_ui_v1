function ThresholdsView({ goBack, palette }) {

  const DEFAULT_DECISION = { accelerate_min: 3.4, kill_max: 2.0 };

  const DEFAULT_BUCKET_MINS = {
    tech: 2.0, process: 2.0, people: 2.0, strategy: 2.0, overall: 2.5,
  };

  const DEFAULT_CRITERIA = [
    { name:'Test Coverage',             signal:'Engineering Health',        bucket:'Tech',    type:'min_better', bandA:90,  bandB:70,  unit:'%' },
    { name:'CI/CD Reliability',         signal:'Engineering Health',        bucket:'Tech',    type:'min_better', bandA:95,  bandB:85,  unit:'%' },
    { name:'Code Review Compliance',    signal:'Engineering Health',        bucket:'Tech',    type:'min_better', bandA:90,  bandB:70,  unit:'%' },
    { name:'Security Vulnerabilities',  signal:'Engineering Health',        bucket:'Tech',    type:'max_better', bandA:0,   bandB:2,   unit:'count' },
    { name:'Integration Build Status',  signal:'Integration Health',        bucket:'Tech',    type:'min_better', bandA:100, bandB:75,  unit:'%' },
    { name:'Integration Error Rate',    signal:'Integration Health',        bucket:'Tech',    type:'max_better', bandA:0.1, bandB:1.0, unit:'%' },
    { name:'Debt Ratio',                signal:'Technical Debt Level',      bucket:'Tech',    type:'max_better', bandA:5,   bandB:15,  unit:'%' },
    { name:'Technical Feasibility',    signal:'Technical Feasibility',  bucket:'Tech',    type:'categorical', bandA:'Yes - independent review', bandB:'Yes - internal review', unit:'review' },
    { name:'On-Time Delivery Rate',     signal:'Milestone Delivery Rate',   bucket:'Process', type:'min_better', bandA:90,  bandB:75,  unit:'%' },
    { name:'Average Delay',             signal:'Milestone Delivery Rate',   bucket:'Process', type:'max_better', bandA:3,   bandB:7,   unit:'days' },
    { name:'Open Blockers',             signal:'Milestone Delivery Rate',   bucket:'Process', type:'max_better', bandA:1,   bandB:3,   unit:'count' },
    { name:'High Risk Resolution',      signal:'Risk Management Health',    bucket:'Process', type:'max_better', bandA:0,   bandB:2,   unit:'count' },
    { name:'Critical Dependency Res.',  signal:'Dependency Health',         bucket:'Process', type:'max_better', bandA:0,   bandB:2,   unit:'count' },
    { name:'Gate Bypass Rate',          signal:'Quality Gate Adherence',    bucket:'Process', type:'max_better', bandA:0,   bandB:2,   unit:'count' },
    { name:'Sponsor Approval',          signal:'Change Control Discipline', bucket:'Process', type:'min_better', bandA:100, bandB:85,  unit:'%' },
    { name:'Governance Attendance',     signal:'Sponsor Commitment',        bucket:'People',  type:'min_better', bandA:90,  bandB:75,  unit:'%' },
    { name:'Escalation Response Time',  signal:'Sponsor Commitment',        bucket:'People',  type:'max_better', bandA:24,  bandB:48,  unit:'hrs' },
    { name:'Critical Resource Avail.',  signal:'Team Availability',         bucket:'People',  type:'min_better', bandA:80,  bandB:60,  unit:'%' },
    { name:'User Confidence Level',     signal:'Cultural Readiness',        bucket:'People',  type:'min_better', bandA:70,  bandB:50,  unit:'%' },
    { name:'User Adoption Incentives', signal:'User Adoption Readiness', bucket:'People', type:'categorical', bandA:'Yes - formal incentive', bandB:'Yes - team tracking', unit:'type' },
    { name:'Workload Impact',          signal:'User Adoption Readiness', bucket:'People', type:'categorical', bandA:'Yes - validated reduction', bandB:'Yes - projected reduction', unit:'type' },
    { name:'PM Experience',             signal:'Relevant Experience',       bucket:'People',  type:'min_better', bandA:2,   bandB:1,   unit:'programmes' },
    { name:'SI / Vendor Experience',    signal:'Relevant Experience',       bucket:'People',  type:'min_better', bandA:3,   bandB:1,   unit:'programmes' },
    { name:'Tech Lead Experience',      signal:'Relevant Experience',       bucket:'People',  type:'min_better', bandA:2,   bandB:1,   unit:'programmes' },
    { name:'AI vs Simpler Alternative', signal:'Use Case Validity',       bucket:'Strategy', type:'categorical', bandA:'Yes - formally documented', bandB:'Yes - informally assessed', unit:'type' },
    { name:'Legal and Regulatory Review', signal:'AI Risk and Compliance', bucket:'Strategy', type:'categorical', bandA:'Yes - complete',  bandB:'Yes - in progress', unit:'status' },
    { name:'Algorithmic Impact Assessment', signal:'AI Risk and Compliance', bucket:'Strategy', type:'categorical', bandA:'Yes - complete and approved', bandB:'Yes - in progress', unit:'status' },
    { name:'Bias Testing',              signal:'AI Risk and Compliance', bucket:'Strategy', type:'categorical', bandA:'Yes - complete and approved', bandB:'Yes - planned with date', unit:'status' },
  ];

  const [decision,   setDecision]   = React.useState({ ...DEFAULT_DECISION });
  const [bucketMins, setBucketMins] = React.useState({ ...DEFAULT_BUCKET_MINS });
  const [criteria,   setCriteria]   = React.useState(DEFAULT_CRITERIA.map(c => ({ ...c })));
  const [dirty,      setDirty]      = React.useState(false);
  const [recalcDone, setRecalcDone] = React.useState(false);

  function handleDecision(key, val) {
    setDecision(p => ({ ...p, [key]: Number(val) }));
    setDirty(true); setRecalcDone(false);
  }
  function handleBucket(key, val) {
    setBucketMins(p => ({ ...p, [key]: Number(val) }));
    setDirty(true); setRecalcDone(false);
  }
  function handleCriterion(i, field, val) {
    setCriteria((p) => {
      const n = [...p];
      const isCat = n[i] && n[i].type === 'categorical';
      const nextVal = (isCat && (field === 'bandA' || field === 'bandB'))
        ? val
        : Number(val);
      n[i] = { ...n[i], [field]: nextVal };
      return n;
    });
    setDirty(true); setRecalcDone(false);
  }
  function handleRecalculate() { setDirty(false); setRecalcDone(true); }
  function handleReset() {
    setDecision({...DEFAULT_DECISION});
    setBucketMins({...DEFAULT_BUCKET_MINS});
    setCriteria(DEFAULT_CRITERIA.map(c=>({...c})));
    setDirty(false); setRecalcDone(false);
  }

  const inputStyle = {
    width:'4.5rem', padding:'0.2rem 0.4rem',
    border:'1px solid currentColor', borderRadius:'2px',
    background:'transparent', color:'inherit',
    fontFamily:'JetBrains Mono, monospace',
    fontSize:'0.82rem', textAlign:'right', opacity:0.9,
  };

  const rowStyle = {
    display:'grid', alignItems:'center',
    padding:'0.55rem 0',
    borderBottom:'1px solid currentColor',
    fontSize:'0.85rem', gap:'1rem',
  };

  const eyebrow = {
    fontSize:'0.68rem', fontWeight:700,
    textTransform:'uppercase', letterSpacing:'0.07em',
    opacity:0.4, padding:'1.25rem 0 0.4rem',
    borderBottom:'1px solid currentColor',
    marginBottom:'0.25rem', display:'block',
  };

  // Group criteria by bucket for display
  const bucketGroups = ['Tech','Process','People','Strategy'];

  return (
    <div className="vs-detail">

      {/* Back */}
      <div className="vs-detail-bar">
        <button className="vs-back" onClick={goBack}>
          <span className="vs-back-arrow">←</span> Portfolio
        </button>
        <div className="vs-breadcrumb">
          <span>Portfolio</span>
          <span className="vs-bc-sep">/</span>
          <span className="vs-bc-current">Intelligence Configurations</span>
        </div>
      </div>

      {/* Header */}
      <header className="vs-detail-hero" style={{ paddingBottom:'1.5rem' }}>
        <div className="vs-detail-hero-left">
          <span className="vs-eyebrow">Configuration</span>
          <h1 className="vs-detail-title">Intelligence Configurations</h1>
          <p style={{ opacity:0.6, maxWidth:'520px',
                      lineHeight:1.6, marginTop:'0.5rem' }}>
            Adjust scoring thresholds. Changes only take effect
            when you press Recalculate.
          </p>
        </div>
      </header>

      {/* Dirty warning */}
      {dirty && (
        <div style={{
          padding:'0.75rem 1.25rem',
          border:'1px solid',
          borderColor: palette.rescue,
          borderRadius:'4px',
          marginBottom:'1.5rem',
          display:'flex', alignItems:'center',
          justifyContent:'space-between', gap:'1rem',
        }}>
          <span style={{ fontSize:'0.85rem', opacity:0.8 }}>
            Unsaved changes — press Recalculate to apply
          </span>
          <div style={{ display:'flex', gap:'0.75rem' }}>
            <button onClick={handleReset} style={{
              border:'1px solid currentColor', background:'transparent',
              padding:'0.3rem 0.9rem', borderRadius:'3px',
              fontSize:'0.78rem', cursor:'pointer', opacity:0.6,
            }}>Reset</button>
            <button onClick={handleRecalculate} style={{
              border:`1px solid ${palette.rescue}`,
              background: palette.rescue,
              color:'#fff',
              padding:'0.3rem 0.9rem', borderRadius:'3px',
              fontSize:'0.78rem', fontWeight:600, cursor:'pointer',
            }}>Recalculate</button>
          </div>
        </div>
      )}

      {recalcDone && !dirty && (
        <div style={{
          padding:'0.75rem 1.25rem',
          border:`1px solid ${palette.accelerate}`,
          borderRadius:'4px', marginBottom:'1.5rem',
          fontSize:'0.85rem', color: palette.accelerate,
        }}>
          Scores recalculated across all programmes.
        </div>
      )}

      {/* ── Band thresholds ── */}
      <section className="vs-section">
        <div className="vs-section-title">
          <span className="vs-eyebrow">Band Thresholds</span>
          <h2>Global band definitions</h2>
        </div>
        <div style={{ maxWidth:'520px' }}>
          {[
            { label:'Verity Pass minimum', value:'90',
              hint:'Fixed at 90 across all programmes — the universal definition of Verity Pass performance.' },
            { label:'Verity Fail threshold', value:'70',
              hint:'Criteria below this score Verity Fail. Between this and 90 score Verity Improve.' },
          ].map(({ label, value, hint }) => (
            <div key={label} style={{
              ...rowStyle,
              gridTemplateColumns:'1fr 4.5rem',
            }}>
              <div>
                <div style={{ fontWeight:500 }}>{label}</div>
                <div style={{ fontSize:'0.75rem', opacity:0.45,
                              marginTop:'0.15rem' }}>{hint}</div>
              </div>
              <div style={{
                textAlign:'right',
                fontFamily:'JetBrains Mono, monospace',
                fontSize:'0.9rem', fontWeight:600, opacity:0.65,
              }}>
                {value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bucket minimums ── */}
      <section className="vs-section">
        <div className="vs-section-title">
          <span className="vs-eyebrow">Bucket Minimums</span>
          <h2>Minimum passing score per bucket</h2>
          <p className="vs-section-sub">
            If a bucket scores below its minimum the programme
            receives a Qualifying Failure. Process bucket failure
            also triggers Adoption Failure.
          </p>
        </div>
        <div style={{ maxWidth:'400px' }}>
          {Object.entries(bucketMins).map(([key, val]) => (
            <div key={key} style={{
              ...rowStyle,
              gridTemplateColumns:'1fr 4.5rem',
            }}>
              <div>
                <span style={{ textTransform:'capitalize' }}>{key}</span>
                {' '}bucket minimum
                {key === 'process' && (
                  <span style={{ fontSize:'0.72rem', opacity:0.4,
                                 marginLeft:'0.5rem' }}>
                    — Adoption Failure if breached
                  </span>
                )}
              </div>
              <input
                type="number" step="0.1" min="0" max="4"
                value={val}
                onChange={e => handleBucket(key, e.target.value)}
                style={inputStyle}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── Decision thresholds ── */}
      <section className="vs-section">
        <div className="vs-section-title">
          <span className="vs-eyebrow">Decision Thresholds</span>
          <h2>Verdict band boundaries</h2>
          <p className="vs-section-sub">
            Rescue is the band between Kill and Accelerate.
            Automatically derived.
          </p>
        </div>
        <div style={{ maxWidth:'400px' }}>
          {[
            { key:'accelerate_min', label:'Accelerate threshold',
              hint:'Score at or above this → Accelerate' },
            { key:'kill_max', label:'Kill threshold',
              hint:'Score below this → Kill' },
          ].map(({ key, label, hint }) => (
            <div key={key} style={{
              ...rowStyle,
              gridTemplateColumns:'1fr 4.5rem',
            }}>
              <div>
                <div style={{ fontWeight:500 }}>{label}</div>
                <div style={{ fontSize:'0.75rem', opacity:0.45,
                              marginTop:'0.15rem' }}>{hint}</div>
              </div>
              <input
                type="number" step="0.1" min="0" max="4"
                value={decision[key]}
                onChange={e => handleDecision(key, e.target.value)}
                style={inputStyle}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── Criterion thresholds ── */}
      <section className="vs-section">
        <div className="vs-section-title">
          <span className="vs-eyebrow">Criterion Thresholds</span>
          <h2>Per-criterion Band A and Band B overrides</h2>
          <p className="vs-section-sub">
            Editing a row stages the change — press Recalculate
            to apply across all programmes.
          </p>
        </div>

        {/* Column headers */}
        <div style={{
          display:'grid',
          gridTemplateColumns:'2fr 1.8fr 0.9fr 0.7fr 4.5rem 4.5rem 3.5rem',
          gap:'0.5rem 1rem',
          fontSize:'0.68rem', fontWeight:700,
          textTransform:'uppercase', letterSpacing:'0.06em',
          opacity:0.4,
          paddingBottom:'0.4rem',
          borderBottom:'1px solid currentColor',
          marginBottom:'0.25rem',
        }}>
          <div>Criterion</div>
          <div>Signal</div>
          <div>Bucket</div>
          <div>Direction</div>
          <div style={{ textAlign:'right' }}>Verity Pass</div>
          <div style={{ textAlign:'right' }}>Verity Improve</div>
          <div style={{ textAlign:'right' }}>Unit</div>
        </div>

        {/* Grouped by bucket — no black bars, just eyebrow labels */}
        {bucketGroups.map(bkt => {
          const bktCriteria = criteria
            .map((cr, i) => ({ ...cr, i }))
            .filter(cr => cr.bucket === bkt);
          if (bktCriteria.length === 0) return null;

          return (
            <div key={bkt}>
              {/* Bucket label — no background, just text + hairline */}
              <div style={{
                fontSize:'0.68rem', fontWeight:700,
                textTransform:'uppercase', letterSpacing:'0.07em',
                opacity:0.4,
                padding:'1.25rem 0 0.4rem',
                borderBottom:'1px solid currentColor',
                marginBottom:'0.1rem',
              }}>
                {bkt} — {bktCriteria.length} thresholds
              </div>

              {bktCriteria.map(cr => (
                <div key={cr.i} style={{
                  display:'grid',
                  gridTemplateColumns:'2fr 1.8fr 0.9fr 0.7fr 4.5rem 4.5rem 3.5rem',
                  gap:'0.5rem 1rem',
                  alignItems:'center',
                  padding:'0.5rem 0',
                  borderBottom:'1px solid currentColor',
                  fontSize:'0.83rem',
                }}>
                  <div>{cr.name}</div>
                  <div style={{ opacity:0.5, fontSize:'0.78rem' }}>
                    {cr.signal}
                  </div>
                  <div style={{ opacity:0.5, fontSize:'0.78rem' }}>
                    {cr.bucket}
                  </div>
                  <div style={{
                    fontSize:'0.72rem', opacity:0.5,
                    textTransform:'uppercase', letterSpacing:'0.03em',
                  }}>
                    {cr.type === 'min_better' ? '↑ Higher'
                      : cr.type === 'max_better' ? '↓ Lower'
                      : 'Periodic'}
                  </div>
                  <div style={{ textAlign:'right' }}>
                    {cr.type === 'periodic' ? (
                      <span style={{
                        fontFamily:'JetBrains Mono, monospace',
                        fontSize:'0.8rem', opacity:0.55,
                      }}>
                        {cr.bandA}mo
                      </span>
                    ) : cr.type === 'categorical' ? (
                      <input
                        type="text"
                        value={cr.bandA}
                        onChange={e => handleCriterion(cr.i,'bandA',e.target.value)}
                        style={{
                          ...inputStyle,
                          width: '10.5rem',
                          textAlign: 'left',
                          fontFamily: 'inherit',
                        }}
                      />
                    ) : (
                      <input
                        type="number"
                        step={cr.unit === '%' ? 1 : 0.1}
                        min="0"
                        value={cr.bandA}
                        onChange={e => handleCriterion(cr.i,'bandA',e.target.value)}
                        style={inputStyle}
                      />
                    )}
                  </div>
                  <div style={{ textAlign:'right' }}>
                    {cr.type === 'periodic' ? (
                      <span style={{
                        fontFamily:'JetBrains Mono, monospace',
                        fontSize:'0.8rem', opacity:0.55,
                      }}>
                        {cr.bandB}mo
                      </span>
                    ) : cr.type === 'categorical' ? (
                      <input
                        type="text"
                        value={cr.bandB}
                        onChange={e => handleCriterion(cr.i,'bandB',e.target.value)}
                        style={{
                          ...inputStyle,
                          width: '10.5rem',
                          textAlign: 'left',
                          fontFamily: 'inherit',
                        }}
                      />
                    ) : (
                      <input
                        type="number"
                        step={cr.unit === '%' ? 1 : 0.1}
                        min="0"
                        value={cr.bandB}
                        onChange={e => handleCriterion(cr.i,'bandB',e.target.value)}
                        style={inputStyle}
                      />
                    )}
                  </div>
                  <div style={{
                    textAlign:'right', fontSize:'0.75rem', opacity:0.4,
                  }}>
                    {cr.unit}
                  </div>
                </div>
              ))}
            </div>
          );
        })}

      </section>

      {/* Bottom buttons */}
      <div style={{
        display:'flex', gap:'1rem',
        marginTop:'2rem', paddingBottom:'3rem',
      }}>
        <button
          onClick={handleRecalculate}
          disabled={!dirty}
          style={{
            border:`1px solid ${dirty ? palette.rescue : 'currentColor'}`,
            background: dirty ? palette.rescue : 'transparent',
            color: dirty ? '#fff' : 'inherit',
            padding:'0.5rem 1.5rem', borderRadius:'3px',
            fontSize:'0.85rem', fontWeight:600,
            cursor: dirty ? 'pointer' : 'default',
            opacity: dirty ? 1 : 0.35,
            letterSpacing:'0.04em',
          }}
        >
          Recalculate all scores
        </button>
        <button onClick={handleReset} style={{
          border:'1px solid currentColor', background:'transparent',
          color:'inherit', padding:'0.5rem 1.5rem',
          borderRadius:'3px', fontSize:'0.85rem',
          cursor:'pointer', opacity:0.5,
        }}>
          Reset to defaults
        </button>
        <button onClick={goBack} style={{
          border:'1px solid currentColor', background:'transparent',
          color:'inherit', padding:'0.5rem 1.5rem',
          borderRadius:'3px', fontSize:'0.85rem',
          cursor:'pointer', opacity:0.4,
        }}>
          Discard changes
        </button>
      </div>

    </div>
  );
}

window.ThresholdsView = ThresholdsView;
