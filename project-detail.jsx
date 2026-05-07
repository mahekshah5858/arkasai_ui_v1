// Project detail view — single-project verdict + taxonomy reasoning

const PD_TAX = window.VS.TAXONOMY;
const { verdictFor } = window.VS;

function ProjectDetailView({ projects, setProjects, projectId, initialOpenSignal, goBack, palette }) {
  const project = projects.find((p) => p.id === projectId) || projects[0];
  const [openSignal, setOpenSignal] = React.useState(
    initialOpenSignal || null
  );
  const [signalViewMode, setSignalViewMode] = React.useState('detail');
  const [signalBoardOpen, setSignalBoardOpen] = React.useState(null);
  const [answeredIds, setAnsweredIds] = React.useState(() => new Set());

  React.useEffect(() => {
    setOpenSignal(initialOpenSignal || null);
    setAnsweredIds(new Set());
    setSignalViewMode('detail');
    setSignalBoardOpen(null);
  }, [projectId, initialOpenSignal]);

  const pending = project.pending_questions || [];
  const nQ = Math.max(1, pending.length);
  const answeredCount = pending.filter((q) => answeredIds.has(q.id)).length;
  const frac = answeredCount / nQ;
  const baseScore = project.score;
  const targetScore = project.score_after_questions != null ? project.score_after_questions : baseScore;
  const liveScore = project.is_demo ? Math.round(baseScore + (targetScore - baseScore) * frac) : baseScore;
  const liveVerdict = verdictFor(liveScore);

  const handleSave = (qid, value) => {
    if (!project.is_demo) return;
    const has = !!(value && String(value).trim());
    setAnsweredIds((prev) => {
      const next = new Set(prev);
      if (has) next.add(qid);
      else next.delete(qid);
      if (project.id === 'P6') {
        window.VS._p6AnsweredCount = next.size;
      }
      if (project.is_demo) {
        const answeredCountNext = pending.filter((q) => next.has(q.id)).length;
        const fracNext = answeredCountNext / nQ;
        const newScore = Math.round(baseScore + (targetScore - baseScore) * fracNext);
        window.VS._p6LiveScore = newScore;
        window.dispatchEvent(new CustomEvent('vs-p6-answered'));
      }
      return next;
    });
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== project.id) return p;
        const demo_answers = { ...(p.demo_answers || {}) };
        if (has) demo_answers[qid] = value;
        else delete demo_answers[qid];
        return { ...p, demo_answers };
      })
    );
  };

  React.useEffect(() => {
    if (!project.is_demo) return;
    const stored = project.demo_answers || {};
    const s = new Set();
    (project.pending_questions || []).forEach((q) => {
      if (stored[q.id] && String(stored[q.id]).trim()) s.add(q.id);
    });
    setAnsweredIds(s);
  }, [project.id, project.is_demo, project.demo_answers, project.pending_questions]);

  React.useEffect(() => {
    if (project.id !== 'P6' || !project.is_demo) return;
    window.VS._p6AnsweredCount = answeredIds.size;
    const pend = project.pending_questions || [];
    const n = Math.max(1, pend.length);
    const ac = pend.filter((q) => answeredIds.has(q.id)).length;
    const fr = ac / n;
    const bs = project.score;
    const ts = project.score_after_questions != null ? project.score_after_questions : bs;
    window.VS._p6LiveScore = Math.round(bs + (ts - bs) * fr);
    window.dispatchEvent(new CustomEvent('vs-p6-answered'));
  }, [project.id, project.is_demo, answeredIds, project.pending_questions, project.score, project.score_after_questions]);

  function scrollToSignal(signalName) {
    if (!signalName) return;

    setSignalViewMode('detail');
    setSignalBoardOpen(null);

    // Ask the SignalTable to open the correct mid-group (if any)
    window.dispatchEvent(new CustomEvent('vs-scroll-to-signal', {
      detail: { signalName },
    }));

    // Open the signal row (bucket + signal id key)
    const tx = (PD_TAX || []).find((t) => (t.signals || []).some((s) => s.name === signalName));
    const sg = tx ? (tx.signals || []).find((s) => s.name === signalName) : null;
    if (tx && sg) setOpenSignal(`${tx.id}.${sg.id}`);

    // Wait one tick for the row to expand, then scroll
    setTimeout(() => {
      const el = document.getElementById(`signal-${signalName.replace(/[\s/]+/g, '-')}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 80);
  }

  React.useEffect(() => {
    if (!initialOpenSignal) return;
    // Small delay to let the component render first
    setTimeout(() => {
      scrollToSignal(initialOpenSignal);
      const id = `signal-${initialOpenSignal.replace(/[\s/]+/g, '-')}`;
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 150);
  }, [initialOpenSignal]);

  return (
    <div className="vs-detail">
      <div className="vs-detail-bar">
        <button className="vs-back" onClick={goBack}>
          <span className="vs-back-arrow">←</span> Portfolio
        </button>
        <div className="vs-breadcrumb">
          <span>Portfolio</span>
          <span className="vs-bc-sep">/</span>
          <span>{project.division}</span>
          <span className="vs-bc-sep">/</span>
          <span className="vs-bc-current">{project.name}</span>
        </div>
      </div>

      <header className="vs-detail-hero">
        <div className="vs-detail-hero-left">
          <span className="vs-eyebrow">Project · {project.stage}</span>
          <h1 className="vs-detail-title">{project.name}</h1>
          <div className="vs-detail-meta">
            <span><b>PM</b> {project.programme_manager || project.owner}</span>
            <span><b>Sponsor</b> {project.primary_sponsor}{project.sponsor_role ? ` (${project.sponsor_role})` : ''}</span>
            {project.secondary_sponsor && (
              <span><b>Secondary</b> {project.secondary_sponsor}{project.secondary_role ? ` (${project.secondary_role})` : ''}</span>
            )}
            <span><b>Division</b> {project.division}</span>
            <span><b>Budget</b> ${project.spend.toFixed(1)}M</span>
            <span><b>Partner</b> {project.vendor || '—'}</span>
            <span><b>First evaluated</b> {project.started}</span>
          </div>
          {project.description && (
            <p style={{
              marginTop: '0.85rem',
              fontSize: '0.88rem',
              opacity: 0.65,
              lineHeight: 1.65,
              maxWidth: '520px',
            }}
            >
              {project.description}
            </p>
          )}
        </div>
        <VerdictHero
          project={project}
          palette={palette}
          liveScore={liveScore}
          liveVerdict={liveVerdict}
          isDemo={!!project.is_demo}
          answeredCount={answeredCount}
          totalQuestions={nQ}
        />
      </header>

      <div className="vs-detail-grid">
        <section className="vs-section">
          <div className="vs-section-title">
            <span className="vs-eyebrow">Executive Summary</span>
            <h2>At a glance</h2>
          </div>
          <ExecutiveCard
            project={project}
            palette={palette}
            onSignalClick={scrollToSignal}
          />
        </section>

        <section className="vs-section">
          <div className="vs-section-title">
            <span className="vs-eyebrow">Governance Intelligence</span>
            <h2>Four-category breakdown</h2>
          </div>
          <Radar project={project} taxonomy={PD_TAX} palette={palette} />
        </section>
      </div>

      <section className="vs-section">
        <div className="vs-section-title">
          <span className="vs-eyebrow">History</span>
          <h2>Progression</h2>
          <p className="vs-section-sub">
            Started and current scores on 0–100, change in points, dated milestones with verdict and notes.
          </p>
        </div>
        <Progression project={project} palette={palette} />
      </section>

      <section className="vs-section">
        <div className="vs-section-title">
          <span className="vs-eyebrow">Signals</span>
          <div
            className="vs-section-title-row"
            style={{ alignItems: 'baseline', flexWrap: 'wrap', gap: '12px 16px' }}
          >
            <h2 style={{ flex: '1 1 auto', minWidth: 0, margin: 0 }}>
              Per-signal scores · click to expand
            </h2>
            <button
              type="button"
              onClick={() => {
                setSignalViewMode((m) => (m === 'detail' ? 'board' : 'detail'));
                setSignalBoardOpen(null);
              }}
              style={{
                flex: '0 0 auto',
                fontSize: '22px',
                lineHeight: 1.15,
                fontWeight: 500,
                fontFamily: 'var(--font-display, inherit)',
                color: 'var(--color-text-info)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                textDecoration: 'underline',
                textDecorationStyle: 'dotted',
                whiteSpace: 'nowrap',
              }}
            >
              {signalViewMode === 'detail' ? 'Board view' : 'Detail view'}
            </button>
          </div>
        </div>
        <SignalTable
          project={project}
          taxonomy={PD_TAX}
          openSignal={openSignal}
          setOpenSignal={setOpenSignal}
          palette={palette}
          viewMode={signalViewMode}
          boardOpen={signalBoardOpen}
          setBoardOpen={setSignalBoardOpen}
        />
      </section>

      {project.is_demo && pending.length > 0 && (
        <section className="vs-section">
          <div className="vs-section-title">
            <span className="vs-eyebrow">Pending criteria</span>
            <h2>Answer to refine the score ({answeredCount} / {nQ})</h2>
          </div>
          <QuestionsPanel
            project={project}
            answeredIds={Array.from(answeredIds)}
            onSave={(qid) => {
              const q = pending.find((x) => x.id === qid);
              handleSave(qid, q?.demo_answer ?? '');
            }}
            palette={palette}
          />
        </section>
      )}

      <section className="vs-section">
        <div className="vs-section-title">
          <span className="vs-eyebrow">Recommended Actions</span>
          <h2>What to do next</h2>
        </div>
        <Actions project={project} palette={palette} />
      </section>
    </div>
  );
}

function VerdictHero({ project, palette, liveScore, liveVerdict, isDemo, answeredCount, totalQuestions }) {
  const v = isDemo ? liveVerdict : project.verdict;
  const displayScore = isDemo ? liveScore : project.score;
  const label = v === 'accelerate' ? 'Accelerate' : v === 'rescue' ? 'Rescue' : 'Kill';
  const sub =
    v === 'accelerate' ? 'Recommended: expand scope or capacity' :
    v === 'rescue' ? 'Recommended: targeted intervention within 60 days' :
    'Recommended: sunset and reallocate';
  return (
    <div className="vs-verdict-hero" style={{ borderColor: palette[v] }}>
      <div className="vs-verdict-hero-tag">VERDICT</div>
      <div className="vs-verdict-hero-label" style={{ color: palette[v] }}>{label}</div>
      <div className="vs-verdict-hero-score">
        <VerityScoreHover
          project={project}
          score100={displayScore}
          useLiveCriteria
          tipTitle="Overall · portfolio score"
          placement="above"
          align="start"
          tabFocus
          className="vs-verity-hover--hero"
        >
          <span className="vs-vh-num">{displayScore}</span>
          <span className="vs-vh-of">/100</span>
        </VerityScoreHover>
      </div>
      <div className="vs-verdict-hero-sub">{sub}</div>
      {isDemo && project.score_after_questions != null && (
        <div className="vs-verdict-hero-sub" style={{ marginTop: '0.5rem', opacity: 0.85, fontSize: '0.85em' }}>
          {answeredCount} of {totalQuestions} questions answered — score moves toward {project.score_after_questions} as you complete the panel below.
        </div>
      )}
    </div>
  );
}

function ExecutiveCard({ project, palette, onSignalClick }) {
  const card = project.executive_card;
  const v    = project.verdict;

  // Fallback if no executive_card data
  if (!card) {
    return (
      <div style={{ opacity:0.6, fontStyle:'italic', fontSize:'0.85rem' }}>
        {project.headline}
      </div>
    );
  }

  function SignalChip({ name, isAction }) {
    return (
      <span
        onClick={() => onSignalClick && onSignalClick(name)}
        title={`Click to open ${name} signal`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.2rem',
          fontSize: '0.7rem',
          fontWeight: 600,
          padding: '2px 7px',
          borderRadius: '3px',
          border: `1px solid ${isAction ? palette.accelerate : 'currentColor'}`,
          color: isAction ? palette.accelerate : 'inherit',
          cursor: 'pointer',
          opacity: isAction ? 1 : 0.55,
          marginLeft: '0.4rem',
          whiteSpace: 'nowrap',
          verticalAlign: 'middle',
          letterSpacing: '0.02em',
          userSelect: 'none',
          transition: 'opacity 0.15s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = 1; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = isAction ? 1 : 0.55; }}
      >
        {name}{isAction ? ' →' : ''}
      </span>
    );
  }

  const verdictColor =
    v === 'accelerate' ? palette.accelerate :
    v === 'kill'       ? palette.kill :
                         palette.rescue;

  // Row builder — reused for all 4 rows
  function Row({ label, labelColor, children, isLast }) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: '9rem 1fr',
        gap: '0.5rem 1.5rem',
        padding: '1rem 0',
        borderBottom: isLast ? 'none' : '1px solid currentColor',
        alignItems: 'start',
      }}>
        <div style={{
          fontSize: '0.65rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          opacity: 0.45,
          color: labelColor || 'inherit',
          paddingTop: '0.2rem',
          lineHeight: 1.4,
        }}>
          {label}
        </div>
        <div style={{
          fontSize: '0.875rem',
          lineHeight: 1.7,
          opacity: 0.85,
        }}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div style={{ opacity: 0.95 }}>

      {/* Row 1 — About this programme */}
      <Row label={'About this\nprogramme'}>
        {card.about}
      </Row>

      {/* Row 2 — What is happening */}
      <Row label={'What is\nhappening'}>
        {card.happening}
      </Row>

      {/* Row 3 — Why it matters */}
      <Row label={'Why it\nmatters'} labelColor={verdictColor}>
        {card.matters.text}
        {(card.matters.signals || []).map((name) => (
          <SignalChip key={name} name={name} isAction={false} />
        ))}
      </Row>

      {/* Row 4 — What must happen */}
      <Row label={'What must\nhappen'} labelColor={palette.accelerate} isLast={true}>
        {card.must_happen.text}
        {card.must_happen.signal && (
          <SignalChip name={card.must_happen.signal} isAction={true} />
        )}
      </Row>

    </div>
  );
}

function Radar({ project, taxonomy, palette }) {
  const SIZE = 440;
  const cx = SIZE / 2, cy = SIZE / 2;
  const R = SIZE * 0.30;
  const n = taxonomy.length;
  const angleFor = (i) => -Math.PI / 2 + (i / n) * Math.PI * 2;
  const pointFor = (i, v) => {
    const a = angleFor(i);
    const r = (v / 100) * R;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  };
  const labelFor = (i) => {
    const a = angleFor(i);
    const r = R + 24;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  };
  const polyPts = taxonomy.map((tx, i) => pointFor(i, project.scores[tx.id]).join(',')).join(' ');
  const v = project.verdict;
  return (
    <div className="vs-radar-wrap">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width="100%" height="auto" style={{ maxWidth: SIZE, overflow: 'visible' }}>
        {[0.25, 0.5, 0.75, 1].map((p) => (
          <circle key={p} cx={cx} cy={cy} r={R * p} fill="none" stroke="currentColor" opacity={p === 1 ? 0.25 : 0.08} strokeWidth="0.5" />
        ))}
        <circle cx={cx} cy={cy} r={R * 0.68} fill="none" stroke={palette.accelerate} opacity="0.25" strokeDasharray="2 3" strokeWidth="0.6" />
        <circle cx={cx} cy={cy} r={R * 0.42} fill="none" stroke={palette.rescue} opacity="0.25" strokeDasharray="2 3" strokeWidth="0.6" />
        {taxonomy.map((tx, i) => {
          const [x, y] = pointFor(i, 100);
          return <line key={tx.id} x1={cx} y1={cy} x2={x} y2={y} stroke="currentColor" opacity="0.08" strokeWidth="0.5" />;
        })}
        <polygon points={polyPts} fill={palette[v]} fillOpacity="0.15" stroke={palette[v]} strokeWidth="1.4" />
        {taxonomy.map((tx, i) => {
          const [x, y] = pointFor(i, project.scores[tx.id]);
          return <circle key={tx.id} cx={x} cy={y} r="3" fill={palette[v]} />;
        })}
        {taxonomy.map((tx, i) => {
          const [x, y] = labelFor(i);
          const a = angleFor(i);
          const anchor = Math.cos(a) > 0.3 ? 'start' : Math.cos(a) < -0.3 ? 'end' : 'middle';
          return (
            <g key={tx.id}>
              <text x={x} y={y} fontSize="10" textAnchor={anchor} fill="currentColor" opacity="0.7" fontWeight="500">{tx.name}</text>
              <text x={x} y={y + 12} fontSize="11" textAnchor={anchor} fill={palette[v]} fontWeight="600">{project.scores[tx.id]}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/** Human-readable band_a (Verity Pass) / band_b (Improve) strings from threshold_check */
function formatThresholdCheck(tc) {
  if (!tc || typeof tc !== 'object') return { pass: null, improve: null };
  if (tc.type === 'periodic') {
    return {
      pass:    `within ${tc.validity_months || 12} months`,
      improve: `within ${tc.amber_at_months || 9} months`,
    };
  }
  if ('band_a_min' in tc) return {
    pass:    `>= ${tc.band_a_min}`,
    improve: `>= ${tc.band_b_min}`,
  };
  if ('band_a_max' in tc) return {
    pass:    `<= ${tc.band_a_max}`,
    improve: `<= ${tc.band_b_max}`,
  };
  if ('band_a_value' in tc) return {
    pass:    tc.band_a_value,
    improve: tc.band_b_value || null,
  };
  return { pass: null, improve: null };
}

function signalNamesForBucket(bucketId) {
  const SG = typeof window !== 'undefined' && window.VS?.SIGNAL_GROUPS?.[bucketId];
  if (!Array.isArray(SG)) return null;
  const set = new Set();
  SG.forEach((g) => (g.signals || []).forEach((n) => set.add(n)));
  return set;
}

/** Resolve labels for breadcrumbs: Bucket name > Signal group label (e.g. Tech > Build Quality). */
function breadcrumbPartsForSignal(signalName, bucketIdHint) {
  const TAX = typeof window !== 'undefined' ? (window.VS?.TAXONOMY || []) : [];
  const SG = typeof window !== 'undefined' ? window.VS?.SIGNAL_GROUPS : null;
  if (!signalName || !SG) {
    return { bucketLabel: '—', groupLabel: '—' };
  }

  function tryBucket(bid) {
    const groups = SG[bid];
    if (!Array.isArray(groups)) return null;
    for (const group of groups) {
      if ((group.signals || []).includes(signalName)) {
        const tx = TAX.find((t) => t.id === bid);
        return {
          bucketLabel: tx?.name || bid,
          groupLabel: group.label || group.id || '—',
        };
      }
    }
    return null;
  }

  if (bucketIdHint) {
    const hit = tryBucket(bucketIdHint);
    if (hit) return hit;
  }
  for (const bid of ['tech', 'process', 'people', 'strategy']) {
    const hit = tryBucket(bid);
    if (hit) return hit;
  }
  for (const bid of Object.keys(SG)) {
    const hit = tryBucket(bid);
    if (hit) return hit;
  }
  return { bucketLabel: '—', groupLabel: '—' };
}

/** Failing criteria (AMBER/RED) with Verity Pass threshold text, scoped by bucket and/or signal */
function collectVerityPassGaps(project, filter = {}) {
  const signals = project?.current_signals || [];
  const bucketNames = filter.bucketId ? signalNamesForBucket(filter.bucketId) : null;
  const sigName = filter.signalName ?? null;
  const groupSet = Array.isArray(filter.groupSignalNames) && filter.groupSignalNames.length > 0
    ? new Set(filter.groupSignalNames)
    : null;
  const items = [];
  for (const sig of signals) {
    if (sigName && sig.signal_name !== sigName) continue;
    if (groupSet && !groupSet.has(sig.signal_name)) continue;
    if (bucketNames && !bucketNames.has(sig.signal_name)) continue;
    for (const cr of (sig.criteria || [])) {
      if (cr.result !== 'AMBER' && cr.result !== 'RED') continue;
      const { pass } = formatThresholdCheck(cr.threshold_check || {});
      const criterion = cr.criterion_name || cr.name || 'Criterion';
      const { bucketLabel, groupLabel } = breadcrumbPartsForSignal(
        sig.signal_name,
        filter.bucketId,
      );
      const breadcrumb = `${bucketLabel} > ${groupLabel} > ${criterion}`;
      items.push({
        signal: sig.signal_name,
        criterion,
        result: cr.result,
        passTarget: pass,
        breadcrumb,
      });
    }
  }
  return items;
}

/**
 * Hover/focus tooltip: when not in the Verity Pass band, lists what each failing criterion
 * needs for Verity Pass (from threshold_check). Historical rows use copy only (no live criteria).
 */
function VerityScoreHover({
  project,
  score100,
  bucketId = null,
  signalName = null,
  groupSignalNames = null,
  useLiveCriteria = false,
  tipTitle,
  placement = 'below',
  align = 'start',
  tabFocus = false,
  className = '',
  style,
  children,
}) {
  const vl = typeof window !== 'undefined' && window.VS?.verityLabelFromScore100;
  const n = Number(score100);
  const isPass = Number.isFinite(n) && n >= 68;
  const gaps = useLiveCriteria
    ? collectVerityPassGaps(project, { bucketId, signalName, groupSignalNames })
    : [];
  const histLabel = vl
    ? vl(n)
    : (isPass ? 'Verity Pass' : n >= 42 ? 'Verity Improve' : 'Verity Fail');

  let body;
  if (!useLiveCriteria && !isPass) {
    body = (
      <>
        <div className="vs-verity-hover__band">{histLabel}</div>
        <p className="vs-verity-hover__p">
          Itemised Verity Pass requirements apply to the{' '}
          <strong>current</strong> evaluation — use the latest milestone row and Signals table.
        </p>
      </>
    );
  } else if (!useLiveCriteria && isPass) {
    body = (
      <p className="vs-verity-hover__p">This snapshot sits in the Verity Pass band for its date.</p>
    );
  } else if (isPass) {
    body = (
      <p className="vs-verity-hover__p">
        In the Verity Pass band (≥68). Expand Signals below for full criterion evidence.
      </p>
    );
  } else if (gaps.length === 0) {
    body = (
      <p className="vs-verity-hover__p">
        No failing criteria with a defined Pass threshold in this scope. Open the signal row for
        qualitative actions and evidence.
      </p>
    );
  } else {
    body = (
      <div className="vs-verity-hover__panel">
        {gaps.map((g, i) => (
          <div
            key={`${g.signal}-${g.criterion}-${i}`}
            className="vs-verity-hover__gap"
          >
            <div className="vs-verity-hover__breadcrumb">{g.breadcrumb}</div>
            <div className="vs-verity-hover__req">
              {g.passTarget
                ? (
                  <>
                    Verity Pass requires <strong>{g.passTarget}</strong>
                  </>
                  )
                : (
                  <>
                    Verity Pass — <span className="vs-verity-hover__req-note">expand the signal row for concrete actions.</span>
                  </>
                  )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  const rootClass = [
    'vs-verity-hover',
    align === 'end' && 'vs-verity-hover--align-end',
    className,
  ].filter(Boolean).join(' ');
  const popupClass = [
    'vs-verity-hover__popup',
    placement === 'above' && 'vs-verity-hover__popup--above',
  ].filter(Boolean).join(' ');

  const wrapProps = tabFocus ? { tabIndex: 0 } : {};

  return (
    <span className={rootClass} style={style} {...wrapProps}>
      {children}
      <span className={popupClass} role="tooltip">
        {tipTitle && <div className="vs-verity-hover__title">{tipTitle}</div>}
        {body}
      </span>
    </span>
  );
}

function Progression({ project, palette }) {
  const snaps = project.progression || [];
  const { toDisplayScore, verdictFor } = window.VS;
  const [activePanel, setActivePanel] = React.useState(null);
  // activePanel = { snapIndex, bucket } or null

  if (!snaps || snaps.length === 0) {
    return (
      <div style={{ paddingBottom:'1rem' }}>
        <p style={{ fontStyle:'italic', opacity:0.6,
                    fontSize:'0.85rem', marginBottom:'0.5rem' }}>
          {project.progression_note || 'First evaluation — no prior history.'}
        </p>
        <p style={{ fontSize:'0.82rem', opacity:0.5 }}>
          Coverage: {project.coverage_pct ?? 90}% of 100 criteria scored.
          Answer the pending questions to improve your score.
        </p>
      </div>
    );
  }

  const first   = toDisplayScore(snaps[0].score);
  const current = toDisplayScore(snaps[snaps.length-1].score);
  const delta   = current - first;

  const BUCKETS = ['tech','process','people','strategy'];
  function nonGreenCount(snap, bucket) {
    const h = snap.highlights?.[bucket];
    if (!h) return null;
    return (h.red?.length || 0) + (h.amber?.length || 0);
  }

  return (
    <div className="vs-progression">

      {/* Summary strip */}
      <div style={{ display:'flex', gap:'2.5rem',
                    marginBottom:'1.75rem', flexWrap:'wrap' }}>
        {[
          { label:'Started',  value:`${first}/100`,  color:null },
          { label:'Current',  value:`${current}/100`,
            color: palette[verdictFor(current)] },
          { label:'Change',
            value:`${delta>=0?'+':''}${delta} pts`,
            color: delta>0 ? palette.accelerate
                 : delta<0 ? palette.kill : 'inherit' },
        ].map(({ label, value, color }) => (
          <div key={label}>
            <div style={{ fontSize:'0.7rem', opacity:0.45,
                          textTransform:'uppercase', letterSpacing:'0.05em',
                          marginBottom:'0.2rem' }}>
              {label}
            </div>
            <div style={{ fontWeight:600, fontSize:'1rem',
                          color: color || 'inherit' }}>
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ overflowX:'auto' }}>

        {/* Column headers */}
        <div style={{
          display:'grid',
          gridTemplateColumns:'5rem 3.5rem 4rem 1fr 4rem 4rem 4rem 4rem',
          gap:'0.25rem 0.75rem',
          padding:'0 0 0.4rem',
          borderBottom:'1px solid currentColor',
          fontSize:'0.65rem', fontWeight:700,
          textTransform:'uppercase', letterSpacing:'0.06em',
          opacity:0.4, whiteSpace:'nowrap',
        }}>
          <span>Date</span>
          <span style={{textAlign:'center'}}>Delta</span>
          <span>Overall</span>
          <span>Detail</span>
          <span style={{textAlign:'center'}}>Tech</span>
          <span style={{textAlign:'center'}}>Process</span>
          <span style={{textAlign:'center'}}>People</span>
          <span style={{textAlign:'center'}}>Strategy</span>
        </div>

        <div style={{ fontSize:'0.65rem', opacity:0.35, textAlign:'right', marginBottom:'0.5rem' }}>
          Bucket cells show count of signals not at Verity Pass · click to expand
        </div>

        {/* Snapshot rows */}
        {snaps.map((snap, i) => {
          const score   = toDisplayScore(snap.score);
          const verdict = verdictFor(score);
          const isLast  = i === snaps.length - 1;

          return (
            <div key={i} style={{
              display:'grid',
              gridTemplateColumns:'5rem 3.5rem 4rem 1fr 4rem 4rem 4rem 4rem',
              gap:'0.25rem 0.75rem',
              padding:'0.8rem 0',
              borderBottom: isLast ? 'none' : '1px solid currentColor',
              alignItems:'start',
              opacity: isLast ? 1 : 0.55,
            }}>

              {/* Date */}
              <div style={{ fontFamily:'JetBrains Mono, monospace',
                            fontSize:'0.78rem' }}>
                {snap.date}
              </div>

              {/* Delta */}
              <div style={{
                textAlign:'center',
                fontFamily:'JetBrains Mono, monospace',
                fontSize:'0.78rem',
                color: snap.delta > 0 ? palette.accelerate
                     : snap.delta < 0 ? palette.kill : 'inherit',
                opacity: snap.delta != null ? 1 : 0.3,
              }}>
                {snap.delta != null
                  ? (snap.delta > 0 ? `+${snap.delta}` : snap.delta)
                  : 'Start'}
              </div>

              {/* Overall score */}
              <div style={{
                fontFamily:'JetBrains Mono, monospace',
                fontSize:'0.82rem', fontWeight:600,
                color: palette[verdict],
              }}>
                {score}
                <div style={{ fontSize:'0.65rem', fontWeight:400,
                              textTransform:'uppercase',
                              letterSpacing:'0.04em', opacity:0.7 }}>
                  {verdict === 'accelerate' ? 'Acc'
                   : verdict === 'rescue' ? 'Rescue' : 'Kill'}
                </div>
              </div>

              {/* Label + change bullets */}
              <div>
                <div style={{ fontSize:'0.8rem', fontWeight:600,
                              marginBottom:'0.25rem' }}>
                  {snap.label}
                </div>
                {(snap.changes || []).map((ch, ci) => (
                  <div key={ci} style={{
                    fontSize:'0.75rem', opacity:0.6,
                    lineHeight:1.5, paddingLeft:'0.75rem',
                    position:'relative',
                  }}>
                    <span style={{ position:'absolute', left:0,
                                   opacity:0.4 }}>·</span>
                    {ch}
                  </div>
                ))}
              </div>

              {/* Bucket cells — non-green signal counts */}
              {BUCKETS.map(bucket => {
                const count = nonGreenCount(snap, bucket);
                const h = snap.highlights?.[bucket];

                return (
                  <div
                    key={bucket}
                    style={{ textAlign:'center', position:'relative' }}
                  >
                    <div style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: count === null
                        ? 'inherit'
                        : count === 0
                        ? palette.accelerate
                        : count <= 2
                        ? palette.rescue
                        : palette.kill,
                      cursor: h ? 'pointer' : 'default',
                      textDecoration: h ? 'underline' : 'none',
                      textDecorationStyle: 'dotted',
                      opacity: count === null ? 0.35 : 1,
                    }}>
                      <span
                        onClick={() => setActivePanel(
                          activePanel?.snapIndex===i && activePanel?.bucket===bucket
                            ? null : { snapIndex:i, bucket }
                        )}
                      >
                        {count === null ? '—'
                          : count === 0 ? '✓'
                          : count}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {activePanel && (() => {
        const snap   = snaps[activePanel.snapIndex];
        const bucket = activePanel.bucket;
        const h      = snap.highlights?.[bucket] || { red:[], amber:[], green:[] };
        const bScore = snap.buckets?.[bucket];
        const bVerd  = bScore != null ? verdictFor(bScore) : null;

        // Get SIGNAL_GROUPS for this bucket
        const SIGNAL_GROUPS = window.VS.SIGNAL_GROUPS || {};
        const groups = SIGNAL_GROUPS[bucket] || [];

        // Get full signal data from project.current_signals
        // For the latest snapshot use live data
        // For historical snapshots use highlights only
        const liveSignals = project.current_signals || [];

        const BUCKET_LABELS = {
          tech:'Technology', process:'Process',
          people:'People', strategy:'Strategy'
        };

        // Format Verity Pass threshold for a criterion
        function verityPassLabel(tc) {
          if (!tc) return null;
          if ('band_a_min' in tc) return `>= ${tc.band_a_min}`;
          if ('band_a_max' in tc) return `<= ${tc.band_a_max}`;
          if ('band_a_value' in tc) return tc.band_a_value;
          if (tc.type === 'periodic') return `within ${tc.validity_months} months`;
          return null;
        }

        return (
          <div style={{
            marginTop: '1rem',
            border: '1px solid currentColor',
            borderRadius: '4px',
            padding: '1.25rem 1.5rem',
            position: 'relative',
          }}>

            {/* Panel header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '1rem',
            }}>
              <div>
                <div style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                  opacity: 0.4,
                  marginBottom: '0.2rem',
                }}>
                  {snap.date} · {BUCKET_LABELS[bucket]}
                </div>
                <div style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: bVerd ? palette[bVerd] : 'inherit',
                }}>
                  Score {bScore ?? '—'}
                  {bVerd && (
                    <span style={{
                      fontSize: '0.75rem',
                      marginLeft: '0.5rem',
                      fontWeight: 400,
                      opacity: 0.7,
                    }}>
                      {bVerd === 'accelerate' ? 'Accelerate'
                       : bVerd === 'rescue' ? 'Rescue' : 'Kill'}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setActivePanel(null)}
                style={{
                  background: 'none', border: 'none',
                  cursor: 'pointer', fontSize: '1.1rem',
                  opacity: 0.4, padding: '0 0.25rem',
                  color: 'inherit',
                }}
              >
                ×
              </button>
            </div>

            {snap.progression_brain?.[bucket] && (
              <div style={{
                padding: '0.6rem 1rem',
                background: '#EEEDFE',
                borderLeft: '3px solid #534AB7',
                display: 'flex',
                alignItems: 'baseline',
                gap: '0.45rem',
                margin: '0.75rem 0',
                borderRadius: '0 3px 3px 0',
              }}>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: '#534AB7',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}>
                  Verity Brain
                </span>
                <span style={{
                  fontSize: '0.78rem',
                  color: '#3C3489',
                  lineHeight: 1.55,
                }}>
                  {snap.progression_brain[bucket]}
                </span>
              </div>
            )}

            {/* All green message */}
            {h.red.length === 0 && h.amber.length === 0 && (
              <div style={{
                padding: '0.75rem 1rem',
                border: `1px solid ${palette.accelerate}`,
                borderRadius: '3px',
                color: palette.accelerate,
                fontSize: '0.85rem',
              }}>
                All signals Verity Pass at this evaluation.
                No improvement required.
              </div>
            )}

            {/* Red signals */}
            {h.red.length > 0 && (
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                  color: palette.kill,
                  marginBottom: '0.6rem',
                  paddingBottom: '0.3rem',
                  borderBottom: `1px solid ${palette.kill}`,
                  opacity: 0.8,
                }}>
                  Verity Fail — {h.red.length} signal{h.red.length > 1 ? 's' : ''}
                </div>

                {groups.map(group => {
                  const groupReds = h.red.filter(sn =>
                    group.signals.includes(sn)
                  );
                  if (groupReds.length === 0) return null;

                  return (
                    <div key={group.id || group.label}
                         style={{ marginBottom: '0.75rem' }}>
                      <div style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        opacity: 0.55,
                        marginBottom: '0.3rem',
                      }}>
                        {BUCKET_LABELS[bucket]} › {group.label}
                      </div>

                      {groupReds.map(signalName => {
                        return (
                          <div key={signalName} style={{
                            marginBottom: '0.5rem',
                            paddingLeft: '0.75rem',
                          }}>
                            <div style={{
                              fontSize: '0.82rem',
                              fontWeight: 600,
                              color: palette.kill,
                              marginBottom: '0.2rem',
                            }}>
                              {signalName}
                            </div>

                            {/* Get criteria for this signal — always from
                                live signal data since thresholds are fixed */}
                            {(() => {
                              const liveSig = liveSignals.find(
                                s => s.signal_name === signalName
                              );
                              if (!liveSig) return null;

                              // For current snapshot show only failing criteria
                              // For historical show all criteria of the signal
                              const criteriaToShow = liveSig.criteria.filter(cr => {
                                if (activePanel.snapIndex === snaps.length - 1) {
                                  return cr.result === 'RED' || cr.result === 'AMBER';
                                }
                                return true; // show all criteria for historical
                              });

                              if (criteriaToShow.length === 0) return null;

                              return criteriaToShow.map(cr => {
                                const vp = verityPassLabel(cr.threshold_check);
                                return (
                                  <div key={cr.criterion_name} style={{
                                    paddingLeft: '0.75rem',
                                    fontSize: '0.78rem',
                                    marginBottom: '0.25rem',
                                  }}>
                                    <span style={{ opacity: 0.7 }}>
                                      {cr.criterion_name}
                                    </span>
                                    {vp && (
                                      <div style={{
                                        fontSize: '0.72rem',
                                        color: palette.accelerate,
                                        paddingLeft: '0.5rem',
                                        opacity: 0.8,
                                      }}>
                                        Verity Pass requires: {vp}
                                      </div>
                                    )}
                                  </div>
                                );
                              });
                            })()}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}

                {/* Signals not in any group */}
                {(() => {
                  const allGrouped = groups.flatMap(g => g.signals);
                  const ungrouped  = h.red.filter(
                    sn => !allGrouped.includes(sn)
                  );
                  if (ungrouped.length === 0) return null;
                  return ungrouped.map(signalName => (
                    <div key={signalName} style={{
                      paddingLeft: '0.75rem',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: palette.kill,
                      marginBottom: '0.3rem',
                    }}>
                      {signalName}
                    </div>
                  ));
                })()}
              </div>
            )}

            {/* Amber signals */}
            {h.amber.length > 0 && (
              <div>
                <div style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                  color: palette.rescue,
                  marginBottom: '0.6rem',
                  paddingBottom: '0.3rem',
                  borderBottom: `1px solid ${palette.rescue}`,
                  opacity: 0.8,
                }}>
                  Verity Improve — {h.amber.length} signal{h.amber.length > 1 ? 's' : ''}
                </div>

                {groups.map(group => {
                  const groupAmbers = h.amber.filter(sn =>
                    group.signals.includes(sn)
                  );
                  if (groupAmbers.length === 0) return null;

                  return (
                    <div key={group.id || group.label}
                         style={{ marginBottom: '0.75rem' }}>
                      <div style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        opacity: 0.55,
                        marginBottom: '0.3rem',
                      }}>
                        {BUCKET_LABELS[bucket]} › {group.label}
                      </div>

                      {groupAmbers.map(signalName => {
                        return (
                          <div key={signalName} style={{
                            marginBottom: '0.5rem',
                            paddingLeft: '0.75rem',
                          }}>
                            <div style={{
                              fontSize: '0.82rem',
                              fontWeight: 600,
                              color: palette.rescue,
                              marginBottom: '0.2rem',
                            }}>
                              {signalName}
                            </div>

                            {/* Get criteria for this signal — always from
                                live signal data since thresholds are fixed */}
                            {(() => {
                              const liveSig = liveSignals.find(
                                s => s.signal_name === signalName
                              );
                              if (!liveSig) return null;

                              // For current snapshot show only failing criteria
                              // For historical show all criteria of the signal
                              const criteriaToShow = liveSig.criteria.filter(cr => {
                                if (activePanel.snapIndex === snaps.length - 1) {
                                  return cr.result === 'RED' || cr.result === 'AMBER';
                                }
                                return true; // show all criteria for historical
                              });

                              if (criteriaToShow.length === 0) return null;

                              return criteriaToShow.map(cr => {
                                const vp = verityPassLabel(cr.threshold_check);
                                return (
                                  <div key={cr.criterion_name} style={{
                                    paddingLeft: '0.75rem',
                                    fontSize: '0.78rem',
                                    marginBottom: '0.25rem',
                                  }}>
                                    <span style={{ opacity: 0.7 }}>
                                      {cr.criterion_name}
                                    </span>
                                    {vp && (
                                      <div style={{
                                        fontSize: '0.72rem',
                                        color: palette.accelerate,
                                        paddingLeft: '0.5rem',
                                        opacity: 0.8,
                                      }}>
                                        Verity Pass requires: {vp}
                                      </div>
                                    )}
                                  </div>
                                );
                              });
                            })()}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        );
      })()}
    </div>
  );
}

function QuestionsPanel({ project, answeredIds, onSave, palette }) {
  const all      = project.pending_questions || [];
  const critical = all.filter(q => q.is_critical);
  const normal   = all.filter(q => !q.is_critical);
  const criticalAnswered = critical.filter(q =>
    answeredIds.includes(q.id)
  ).length;
  const allCriticalDone = criticalAnswered === critical.length;
  const baseCov = project.coverage_pct ?? 0;
  const coveragePct = Math.min(
    100,
    baseCov + Math.round(
      (answeredIds.length / Math.max(all.length, 1)) * (100 - baseCov)
    )
  );

  return (
    <div>

      {/* Coverage bar */}
      <div style={{ marginBottom: '1.5rem', maxWidth: '480px' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontSize: '0.75rem', opacity: 0.5, marginBottom: '0.35rem',
        }}>
          <span>Coverage</span>
          <span>{coveragePct}%</span>
        </div>
        <div style={{
          height: '2px', background: 'currentColor',
          opacity: 0.12, borderRadius: '1px', position: 'relative',
        }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0,
            borderRadius: '1px',
            background: palette.accelerate,
            transition: 'width 0.4s ease',
            width: `${coveragePct}%`,
          }} />
        </div>
      </div>

      {/* Critical questions */}
      {!allCriticalDone && (
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            fontSize: '0.68rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.06em',
            opacity: 0.4, marginBottom: '1rem',
          }}>
            Critical — answer these first · {criticalAnswered}/{critical.length} done
          </div>
          {critical.map(q => (
            <QuestionCard
              key={q.id}
              question={q}
              answered={answeredIds.includes(q.id)}
              onSave={onSave}
              palette={palette}
              isCritical={true}
            />
          ))}
        </div>
      )}

      {/* All critical done confirmation */}
      {allCriticalDone && (
        <div style={{
          padding: '0.9rem 1.1rem',
          border: `1px solid ${palette.accelerate}`,
          borderRadius: '4px',
          marginBottom: '2rem',
          maxWidth: '480px',
        }}>
          <div style={{
            fontWeight: 600, color: palette.accelerate,
            fontSize: '0.85rem', marginBottom: '0.25rem',
          }}>
            ✓ All critical questions answered
          </div>
          <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>
            Connect Google Calendar and SonarCloud to score
            remaining signals automatically.
          </div>
        </div>
      )}

      {/* Normal questions */}
      {normal.filter(q => !answeredIds.includes(q.id)).length > 0 && (
        <div>
          <div style={{
            fontSize: '0.68rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.06em',
            opacity: 0.4, marginBottom: '1rem',
          }}>
            Additional questions
          </div>
          {normal.map(q => (
            <QuestionCard
              key={q.id}
              question={q}
              answered={answeredIds.includes(q.id)}
              onSave={onSave}
              palette={palette}
              isCritical={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function QuestionCard({ question, answered, onSave, palette, isCritical }) {

  // Answered — collapse to single tick line
  if (answered) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        padding: '0.6rem 0',
        borderBottom: '1px solid currentColor',
        fontSize: '0.83rem', opacity: 0.4,
      }}>
        <span style={{ color: palette.accelerate, fontWeight: 700,
                        fontSize: '1rem' }}>✓</span>
        <span style={{ fontStyle: 'italic' }}>
          {question.signal} — answer saved
        </span>
      </div>
    );
  }

  // Not yet answered — show full card
  return (
    <div style={{
      padding: '1rem 0 1.25rem',
      borderBottom: '1px solid currentColor',
      maxWidth: '560px',
    }}>

      {/* 1. Bucket · Signal label */}
      <div style={{
        fontSize: '0.68rem', fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '0.06em',
        opacity: 0.4, marginBottom: '0.5rem',
        display: 'flex', alignItems: 'center', gap: '0.4rem',
      }}>
        <span>{question.bucket || 'Assessment'}</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span>{question.signal}</span>
        {isCritical && (
          <span style={{
            border: `1px solid ${palette.kill}`,
            color: palette.kill,
            padding: '0px 4px', borderRadius: '2px',
            fontSize: '0.58rem',
          }}>
            Critical
          </span>
        )}
      </div>

      {/* 2. Question text */}
      <div style={{
        fontSize: '0.9rem', lineHeight: 1.55,
        marginBottom: '0.9rem', fontWeight: 500,
      }}>
        {question.question}
      </div>

      {/* 3. Pre-populated answer — read only */}
      <div style={{
        padding: '0.55rem 0.8rem',
        border: '1px solid currentColor',
        borderRadius: '3px',
        fontSize: '0.85rem',
        fontFamily: 'JetBrains Mono, monospace',
        opacity: 0.75,
        marginBottom: '0.75rem',
        background: 'transparent',
        letterSpacing: '0.01em',
      }}>
        {question.demo_answer}
      </div>

      {/* Impact note — critical only */}
      {isCritical && question.impact && (
        <div style={{
          fontSize: '0.78rem', fontStyle: 'italic',
          opacity: 0.5, marginBottom: '0.75rem',
        }}>
          {question.impact}
        </div>
      )}

      {/* 4. Save button */}
      <button
        type="button"
        onClick={() => onSave(question.id)}
        style={{
          border: `1px solid ${isCritical ? palette.accelerate : 'currentColor'}`,
          background: isCritical ? palette.accelerate : 'transparent',
          color: isCritical ? '#fff' : 'inherit',
          padding: '0.35rem 1.1rem',
          borderRadius: '3px',
          fontSize: '0.8rem',
          fontWeight: 600,
          cursor: 'pointer',
          letterSpacing: '0.04em',
        }}
      >
        Save answer
      </button>
    </div>
  );
}

function InfoIcon({ name }) {
  const def = (window.VS.CRITERION_DEFINITIONS || {})[name];
  if (!def) return null;

  const [visible, setVisible] = React.useState(false);

  return (
    <span
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <span
        style={{
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          border: '1px solid currentColor',
          opacity: 0.35,
          fontSize: '9px',
          fontStyle: 'italic',
          fontWeight: 500,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'default',
          lineHeight: 1,
          flexShrink: 0,
          userSelect: 'none',
          transition: 'opacity 0.15s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = 0.7; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = 0.35; }}
      >
        i
      </span>

      {visible && (
        <span
          style={{
            position: 'absolute',
            left: '18px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '180px',
            background: 'var(--vs-text, #1a1a1a)',
            color: 'var(--vs-bg, #ffffff)',
            fontSize: '0.72rem',
            lineHeight: 1.5,
            padding: '6px 9px',
            borderRadius: '4px',
            zIndex: 50,
            pointerEvents: 'none',
            fontStyle: 'normal',
            fontWeight: 400,
            whiteSpace: 'normal',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          {def}
        </span>
      )}
    </span>
  );
}

const RAW4 = { GREEN: 4.0, AMBER: 2.5, RED: 1.0, GREY: null };

function toDisplayScore(x4) {
  const x = Number(x4);
  if (!Number.isFinite(x) || x <= 0) return 0;
  if (x < 2.0) return Math.round((x / 2.0) * 42);
  if (x < 3.4) return Math.round(42 + ((x - 2.0) / 1.4) * 26);
  return Math.round(68 + ((x - 3.4) / 0.6) * 32);
}

const RESULT_SCORE = {
  GREEN: toDisplayScore(4.0),
  AMBER: toDisplayScore(2.5),
  RED: toDisplayScore(1.0),
  GREY: null,
};

function VerityBrain({ signal }) {
  const text = signal?.verity_brain;
  if (!text) return null;

  return (
    <div style={{
      padding: '0.6rem 1rem',
      background: '#EEEDFE',
      borderLeft: '3px solid #534AB7',
      display: 'flex',
      alignItems: 'baseline',
      gap: '0.45rem',
    }}>
      <span style={{
        fontSize: '0.75rem',
        fontWeight: 600,
        color: '#534AB7',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}>
        Verity Brain
      </span>
      <span style={{
        fontSize: '0.8rem',
        color: '#3C3489',
        lineHeight: 1.55,
      }}>
        {text}
      </span>
    </div>
  );
}

function CriteriaDetail({ signalName, project, palette }) {

  const RESULT_SCORE = { GREEN: 100, AMBER: 51, RED: 21, GREY: null };

  const RESULT_LABEL = {
    GREEN: 'Verity Pass',
    AMBER: 'Verity Improve',
    RED:   'Verity Fail',
    GREY:  'Pending',
  };

  const RESULT_COLOR = {
    GREEN: palette.accelerate,
    AMBER: palette.rescue,
    RED:   palette.kill,
    GREY:  'currentColor',
  };

  const signals = project.current_signals || [];
  const signal  = signals.find(s => s.signal_name === signalName);

  if (!signal || !signal.criteria || signal.criteria.length === 0) {
    return (
      <p style={{ opacity:0.5, fontStyle:'italic', fontSize:'0.82rem' }}>
        {project.keySignalsNote || 'No criterion detail available.'}
      </p>
    );
  }

  function formatSource(ev) {
    const parts = [];

    // Determine source name — never leave blank
    let sourceName = ev.source_name;
    if (!sourceName || sourceName.trim() === '') {
      const qualityLabels = {
        live_connector:   'Live connector',
        document:         'Document',
        form_critical:    'Human input',
        form_noncritical: 'Human input',
        none:             null,
      };
      sourceName = qualityLabels[ev.evidence_quality] || null;
    }

    if (sourceName) parts.push(sourceName);

    // Date
    if (ev.extracted_at) {
      const d = new Date(ev.extracted_at);
      if (!isNaN(d)) {
        parts.push('Recorded ' + d.toLocaleDateString('en-GB', {
          day: 'numeric', month: 'short', year: 'numeric',
        }));
      }
    }

    return parts.join('  ·  ');
  }

  function badgeLabel(quality) {
    const map = {
      live_connector:   'Live feed',
      document:         'Document',
      form_critical:    'Team input',
      form_noncritical: 'Team input',
      none:             null,
    };
    return map[quality] || null;
  }

  function badgeColor(quality) {
    const map = {
      live_connector:   { color:'#1D6B3B', bg:'#E2EFDA' },
      document:         { color:'#2F5496', bg:'#DAE3F3' },
      form_critical:    { color:'#8A4B00', bg:'#FFF2CC' },
      form_noncritical: { color:'#595959', bg:'#F2F2F2' },
    };
    return map[quality] || { color:'#595959', bg:'#F2F2F2' };
  }

  return (
    <div>
      {signal.criteria.map((cr, i) => {
        const ev      = cr.evidence || {};
        const tc      = cr.threshold_check || {};
        const thresh  = formatThresholdCheck(tc);
        const isPending = cr.result === 'GREY' || ev.source_type === 'none';
        const score   = RESULT_SCORE[cr.result];
        const label   = RESULT_LABEL[cr.result] || 'Pending';
        const color   = RESULT_COLOR[cr.result] || 'currentColor';
        const badge   = badgeLabel(ev.evidence_quality);
        const bc      = badgeColor(ev.evidence_quality);
        const source  = formatSource(ev);

        // What is needed for Verity Pass
        const needsImprovement = cr.result === 'AMBER' || cr.result === 'RED';
        const passTarget = needsImprovement ? thresh.pass : null;

        return (
          <div key={i} style={{
            padding: '0.85rem 0',
            borderBottom: '1px solid currentColor',
            opacity: isPending ? 0.55 : 1,
          }}>

            {/* ── Row 1: name + badges + score ── */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              marginBottom: '0.55rem',
            }}>
              {/* Name */}
              <span style={{
                fontWeight: 600,
                fontSize: '0.88rem',
                flexShrink: 0,
              }}>
                {cr.criterion_name}
              </span>
              <InfoIcon name={cr.criterion_name} />

              {/* Critical badge */}
              {cr.is_critical && (
                <span style={{
                  fontSize: '0.58rem', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                  border: '1px solid #2F5496', color: '#2F5496',
                  padding: '1px 3px', borderRadius: '2px',
                  whiteSpace: 'nowrap', lineHeight: 1.2, flexShrink: 0,
                }}>
                  Critical
                </span>
              )}

              {/* Evidence badge */}
              {badge && (
                <span style={{
                  fontSize: '0.6rem', fontWeight: 600,
                  textTransform: 'uppercase', letterSpacing: '0.04em',
                  color: bc.color, background: bc.bg,
                  padding: '1px 4px', borderRadius: '2px',
                  whiteSpace: 'nowrap', flexShrink: 0,
                }}>
                  {badge}
                </span>
              )}

              {/* Spacer */}
              <span style={{ flex: 1 }} />

              {/* Score — right aligned, close to name */}
              <span style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.9rem',
                fontWeight: 700,
                color: color,
                opacity: isPending ? 0.4 : 1,
                flexShrink: 0,
                marginLeft: '0.5rem',
              }}>
                {score !== null ? score : '—'}
              </span>
            </div>

            {/* ── Detail rows ── */}
            {isPending ? (
              <div style={{ paddingLeft:'0.1rem' }}>
                <div style={{
                  fontSize:'0.8rem', opacity:0.55,
                  marginBottom: thresh.pass ? '0.3rem' : 0,
                }}>
                  Pending — no evidence collected yet
                </div>
                {thresh.pass && (
                  <div style={{
                    fontSize:'0.78rem', opacity:0.5,
                  }}>
                    <span style={{ opacity:0.6 }}>Verity Pass requires: </span>
                    <span style={{ fontWeight:500 }}>{thresh.pass}</span>
                  </div>
                )}
              </div>
            ) : (
              <div style={{
                paddingLeft:'0.1rem',
                display:'flex', flexDirection:'column', gap:'0.25rem',
              }}>

                {/* Measured + source */}
                <div style={{
                  display:'grid',
                  gridTemplateColumns:'7rem 1fr',
                  gap:'0.5rem',
                  fontSize:'0.8rem',
                }}>
                  <span style={{ opacity:0.4, fontWeight:600,
                                 textTransform:'uppercase',
                                 fontSize:'0.68rem', letterSpacing:'0.04em',
                                 paddingTop:'0.1rem' }}>
                    Measured
                  </span>
                  <span>
                    <span style={{ fontFamily:'JetBrains Mono, monospace',
                                   fontWeight:500 }}>
                      {ev.fact_label || ev.fact_extracted || '—'}
                    </span>
                    {source && (
                      <span style={{ opacity:0.4, marginLeft:'0.6rem',
                                     fontSize:'0.75rem' }}>
                        {source}
                      </span>
                    )}
                  </span>
                </div>

                {/* Result */}
                <div style={{
                  display:'grid',
                  gridTemplateColumns:'7rem 1fr',
                  gap:'0.5rem',
                  fontSize:'0.8rem',
                }}>
                  <span style={{ opacity:0.4, fontWeight:600,
                                 textTransform:'uppercase',
                                 fontSize:'0.68rem', letterSpacing:'0.04em',
                                 paddingTop:'0.1rem' }}>
                    Result
                  </span>
                  <span style={{ fontWeight:700, color }}>
                    {label}
                  </span>
                </div>

                {/* Verity Pass threshold — only when not passing */}
                {passTarget && (
                  <div style={{
                    display:'grid',
                    gridTemplateColumns:'7rem 1fr',
                    gap:'0.5rem',
                    fontSize:'0.8rem',
                  }}>
                    <span style={{ opacity:0.4, fontWeight:600,
                                   textTransform:'uppercase',
                                   fontSize:'0.68rem', letterSpacing:'0.04em',
                                   paddingTop:'0.1rem', color: palette.accelerate }}>
                      Verity Pass
                    </span>
                    <span style={{ opacity:0.75 }}>
                      requires{' '}
                      <span style={{ fontFamily:'JetBrains Mono, monospace',
                                     fontWeight:500 }}>
                        {passTarget}
                      </span>
                    </span>
                  </div>
                )}

                {/* For passing criteria — show threshold */}
                {!passTarget && thresh.pass && (
                  <div style={{
                    display:'grid',
                    gridTemplateColumns:'7rem 1fr',
                    gap:'0.5rem',
                    fontSize:'0.8rem',
                  }}>
                    <span style={{ opacity:0.4, fontWeight:600,
                                   textTransform:'uppercase',
                                   fontSize:'0.68rem', letterSpacing:'0.04em',
                                   paddingTop:'0.1rem' }}>
                      Threshold
                    </span>
                    <span style={{ opacity:0.55,
                                   fontFamily:'JetBrains Mono, monospace' }}>
                      {thresh.pass}
                    </span>
                  </div>
                )}

                {/* Human input note */}
                {ev.human_input_note && cr.result !== 'GREEN' && (
                  <div style={{
                    fontSize:'0.72rem', opacity:0.4,
                    fontStyle:'italic', marginTop:'0.15rem',
                    maxWidth:'440px', lineHeight:1.5,
                  }}>
                    {ev.human_input_note}
                  </div>
                )}

              </div>
            )}

          </div>
        );
      })}
    </div>
  );
}

function EvidenceBadge({ type }) {
  if (!type) return null;
  const config = {
    live:     { label: 'Live feed',  color: '#1D6B3B', bg: '#E2EFDA' },
    document: { label: 'Document',   color: '#2F5496', bg: '#DAE3F3' },
    team:     { label: 'Team input', color: '#8A4B00', bg: '#FFF2CC' },
    pending:  { label: 'Pending',    color: '#595959', bg: '#F2F2F2' },
  };
  const c = config[type];
  if (!c) return null;
  return (
    <span style={{
      fontSize: '0.6rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      color: c.color,
      background: c.bg,
      padding: '1px 4px',
      borderRadius: '2px',
      whiteSpace: 'nowrap',
      lineHeight: 1,
      flexShrink: 0,
      width: 'auto',
    }}>
      {c.label}
    </span>
  );
}

function BoardView({
  project, taxonomy, palette,
  boardOpen, setBoardOpen,
}) {
  const SIGNAL_GROUPS = window.VS?.SIGNAL_GROUPS || {};
  const signals = project.current_signals || [];
  const TAX = taxonomy || window.VS?.TAXONOMY || [];

  function scoreColor(score) {
    if (score === null || score === undefined) return 'inherit';
    if (score >= 68) return palette.accelerate;
    if (score >= 42) return palette.rescue;
    return palette.kill;
  }

  const CS = { GREEN: 100, AMBER: 51, RED: 21, GREY: null };

  function getSigScore(sigName) {
    const sig = signals.find(s => s.signal_name === sigName);
    if (!sig) return null;
    const crit = (sig.criteria || [])
      .map(c => CS[c.result])
      .filter(v => v !== null && v !== undefined);
    if (!crit.length) return null;
    return Math.round(crit.reduce((a, b) => a + b, 0) / crit.length);
  }

  function getGroupScore(bucket, groupSignals) {
    const scores = groupSignals
      .map(n => getSigScore(n))
      .filter(v => v !== null && v !== undefined);
    if (!scores.length) return null;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }

  const BUCKETS = [
    { id: 'tech', label: 'Technology' },
    { id: 'process', label: 'Process' },
    { id: 'people', label: 'People' },
    { id: 'strategy', label: 'Strategy' },
  ];

  function getSig(name) {
    return signals.find(s => s.signal_name === name) || null;
  }

  function sigKey(bucketId, sigName) {
    return `${bucketId}__${sigName}`;
  }

  return (
    <div style={{ fontSize: '1.0625rem' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(0,1fr))',
        border: '1px solid color-mix(in oklch, currentColor 12%, transparent)',
        borderRadius: '4px',
        overflow: 'hidden',
        opacity: 0.95,
      }}>

        {BUCKETS.map((bkt, bi) => {
          const score = project.scores[bkt.id];
          const bv = score >= 68 ? 'accelerate' : score >= 42 ? 'rescue' : 'kill';
          return (
            <div key={bkt.id} style={{
              padding: '8px 10px',
              borderRight: bi < 3 ? '1px solid color-mix(in oklch, currentColor 10%, transparent)' : 'none',
              borderBottom: '1px solid color-mix(in oklch, currentColor 12%, transparent)',
              background: 'color-mix(in oklch, currentColor 3%, transparent)',
            }}>
              <div style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
                opacity: 0.55,
                marginBottom: '2px',
              }}>
                {bkt.label}
              </div>
              <div style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: palette[bv],
              }}>
                {score}
              </div>
            </div>
          );
        })}

        {BUCKETS.map((bkt, bi) => {
          const groups = SIGNAL_GROUPS[bkt.id] || [];
          return (
            <div key={bkt.id} style={{
              borderRight: bi < 3 ? '1px solid color-mix(in oklch, currentColor 10%, transparent)' : 'none',
            }}>
              {groups.map((group, gi) => {
                const groupScore = getGroupScore(bkt.id, group.signals);
                return (
                  <div key={group.id}>
                    <div style={{
                      padding: '5px 10px',
                      borderBottom: '1px solid color-mix(in oklch, currentColor 10%, transparent)',
                      borderTop: gi > 0 ? '1px solid color-mix(in oklch, currentColor 10%, transparent)' : 'none',
                      background: 'color-mix(in oklch, currentColor 5%, transparent)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      opacity: 0.9,
                    }}>
                      <span style={{
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        opacity: 0.7,
                        lineHeight: 1.3,
                      }}>
                        {group.label}
                      </span>
                      <span style={{
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        opacity: 0.9,
                        flexShrink: 0,
                        marginLeft: '4px',
                        color: scoreColor(groupScore),
                      }}>
                        {groupScore ?? '—'}
                      </span>
                    </div>

                    {group.signals.map(sigName => {
                      const score = getSigScore(sigName);
                      const sig = getSig(sigName);
                      const key = sigKey(bkt.id, sigName);
                      const isOpen = boardOpen === key;

                      return (
                        <div key={sigName}>
                          <div
                            onClick={() => sig && setBoardOpen(
                              isOpen ? null : key
                            )}
                            style={{
                              padding: '4px 10px',
                              borderBottom: '1px solid color-mix(in oklch, currentColor 10%, transparent)',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              cursor: sig ? 'pointer' : 'default',
                              opacity: sig ? 0.85 : 0.4,
                              background: isOpen
                                ? 'rgba(83,74,183,0.06)' : 'transparent',
                            }}
                            onMouseEnter={(e) => {
                              if (sig) e.currentTarget.style.opacity = '1';
                            }}
                            onMouseLeave={(e) => {
                              if (sig) e.currentTarget.style.opacity = isOpen ? '1' : '0.85';
                            }}
                          >
                            <span style={{
                              fontSize: '0.82rem',
                              lineHeight: 1.35,
                              paddingRight: '4px',
                            }}>
                              {sigName.length > 22
                                ? sigName.replace(' and ', ' & ')
                                  .replace('Organisational', 'Org')
                                  .replace('Readiness', 'Ready')
                                  .replace('Compliance', 'Comp.')
                                : sigName}
                            </span>
                            <span style={{
                              fontSize: '0.82rem',
                              fontWeight: 700,
                              color: scoreColor(score),
                              flexShrink: 0,
                            }}>
                              {score ?? '—'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {boardOpen && (() => {
        const parts = boardOpen.split('__');
        const bucketId = parts[0];
        const sigName = parts.slice(1).join('__');
        if (!bucketId || !sigName) return null;
        const sig = getSig(sigName);
        if (!sig) return null;

        const tx = TAX.find(t => t.id === bucketId);
        const sgObj = tx?.signals?.find(s => s.name === sigName);

        const score = getSigScore(sigName);
        const sv = score == null ? 'kill'
          : score >= 68 ? 'accelerate'
            : score >= 42 ? 'rescue' : 'kill';

        return (
          <div style={{
            marginTop: '0.75rem',
            border: '1px solid color-mix(in oklch, currentColor 12%, transparent)',
            borderLeft: `3px solid ${palette[sv]}`,
            borderRadius: '0 4px 4px 0',
            opacity: 0.95,
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              borderBottom: '1px solid color-mix(in oklch, currentColor 10%, transparent)',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                flexWrap: 'wrap',
              }}>
                <span style={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                }}>
                  {sigName}
                </span>
                {(sig.is_critical_in_bucket || sgObj?.isCritical) && (
                  <span style={{
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    border: `1px solid ${palette.kill}`,
                    color: palette.kill,
                    padding: '1px 4px',
                    borderRadius: '2px',
                  }}>
                    Critical
                  </span>
                )}
                {sgObj?.detail && (
                  <span style={{
                    fontSize: '0.75rem',
                    opacity: 0.45,
                  }}>
                    {sgObj.detail}
                  </span>
                )}
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}>
                <span style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: palette[sv],
                }}>
                  {score ?? '—'}
                </span>
                <button
                  type="button"
                  onClick={() => setBoardOpen(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    opacity: 0.4,
                    padding: '0 0.25rem',
                    color: 'inherit',
                  }}
                >
                  ×
                </button>
              </div>
            </div>

            <VerityBrain signal={sig} />

            <div style={{ padding: '0 0 0.5rem' }}>
              <CriteriaDetail
                signalName={sigName}
                project={project}
                palette={palette}
              />
            </div>
          </div>
        );
      })()}
    </div>
  );
}

function SignalTable({
  project, taxonomy, openSignal, setOpenSignal, palette,
  viewMode, boardOpen, setBoardOpen,
}) {
  const SG = typeof window !== 'undefined' && window.VS && window.VS.SIGNAL_GROUPS
    ? window.VS.SIGNAL_GROUPS
    : {};
  const groupScoreVs = typeof window !== 'undefined' && window.VS && window.VS.groupScore
    ? window.VS.groupScore
    : null;

  /** Mid-bucket toggles — all groups at this level start collapsed (explicit true = expanded) */
  const [openMidGroups, setOpenMidGroups] = React.useState(() => ({}));

  function midKey(txId, groupId) { return `${txId}::${groupId}`; }

  function toggleMidGroup(txId, groupId) {
    const k = midKey(txId, groupId);
    setOpenMidGroups((prev) => {
      const was = prev[k] === true;
      return { ...prev, [k]: !was };
    });
  }

  function isMidGroupOpen(txId, groupId) {
    return openMidGroups[midKey(txId, groupId)] === true;
  }

  React.useEffect(() => {
    function onScrollToSignal(e) {
      const signalName = e?.detail?.signalName;
      if (!signalName) return;

      // Expand the mid-group containing this signal (if any)
      const entries = Object.entries(SG || {});
      for (const [txId, groups] of entries) {
        for (const group of (groups || [])) {
          if ((group.signals || []).includes(signalName)) {
            setOpenMidGroups((prev) => ({ ...prev, [midKey(txId, group.id)]: true }));
          }
        }
      }
    }

    window.addEventListener('vs-scroll-to-signal', onScrollToSignal);
    return () => window.removeEventListener('vs-scroll-to-signal', onScrollToSignal);
  }, [SG]);

  function renderSignalRow(tx, sg, opts) {
    const nested = opts && opts.nested;
    const sv = signalScore(project, tx.id, sg.name);
    const sver = sv >= 68 ? 'accelerate' : sv >= 42 ? 'rescue' : 'kill';
    const open = openSignal === `${tx.id}.${sg.id}`;

    return (
      <div
        key={sg.id}
          id={`signal-${sg.name.replace(/[\s/]+/g, '-')}`}
        className={`vs-sig-row ${open ? 'is-open' : ''}`}
      >

        <button
          type="button"
          className="vs-sig-row-btn"
          onClick={() => setOpenSignal(open ? null : `${tx.id}.${sg.id}`)}
          style={nested ? { paddingLeft: '18px', paddingRight: '16px' } : undefined}
        >
          <span style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            flexShrink: 0,
          }}>
            <span className="vs-sig-name">{sg.name}</span>

            {sg.isCritical && (
              <span style={{
                fontSize: '0.6rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                border: '1px solid',
                borderColor: palette.kill,
                color: palette.kill,
                padding: '1px 4px',
                borderRadius: '2px',
                whiteSpace: 'nowrap',
                lineHeight: 1,
                flexShrink: 0,
              }}>
                Critical
              </span>
            )}

            <EvidenceBadge type={project.signalEvidence?.[sg.id]} />
          </span>

          <span className="vs-sig-detail">{sg.detail}</span>

          <div className="vs-sig-bar">
            <div
              className="vs-sig-bar-fill"
              style={{ width: `${sv}%`, background: palette[sver] }}
            />
          </div>
          <span className="vs-sig-num">
            <VerityScoreHover
              project={project}
              score100={sv}
              signalName={sg.name}
              useLiveCriteria
              tipTitle={sg.name}
              placement="below"
              align="end"
            >
              {sv}
            </VerityScoreHover>
          </span>
          <span className="vs-sig-caret">{open ? '−' : '+'}</span>
        </button>

        {open && (
          <div
            className="vs-sig-explain"
            style={nested ? {
              paddingLeft: '18px',
              paddingRight: '16px',
              paddingBottom: '16px',
            } : undefined}
          >
            {(() => {
              const signals = project.current_signals || [];
              const sig = signals.find(s => s.signal_name === sg.name);
              return sig ? <VerityBrain signal={sig} /> : null;
            })()}
            <CriteriaDetail
              signalName={sg.name}
              project={project}
              palette={palette}
            />
          </div>
        )}

      </div>
    );
  }

  return (
    <React.Fragment>
      {viewMode === 'detail' ? (
    <div className="vs-signals" style={{ fontSize: '1.0625rem' }}>
      {taxonomy.map((tx) => {
        const score = project.scores[tx.id];
        const weight = project.weights[tx.id];
        const v = score >= 68 ? 'accelerate' : score >= 42 ? 'rescue' : 'kill';
        const groupsForBucket = SG[tx.id] || [];

        const namesInGroups = new Set(
          groupsForBucket.flatMap((g) => g.signals || []),
        );

        let listInner;
        if (groupsForBucket.length > 0) {
          const fragments = [];
          let renderedGroupIdx = 0;

          groupsForBucket.forEach((group) => {
            const groupSigs = tx.signals.filter((s) =>
              (group.signals || []).includes(s.name));
            if (groupSigs.length === 0) return;

            const gsc = groupScoreVs ? groupScoreVs(project, tx.id, group.id) : null;
            let gvBand = null;
            if (gsc != null) {
              gvBand = gsc >= 68 ? 'accelerate'
                : gsc >= 42 ? 'rescue'
                  : 'kill';
            }

            const isFirstRendered = renderedGroupIdx === 0;
            renderedGroupIdx += 1;

            const midExpanded = isMidGroupOpen(tx.id, group.id);

            fragments.push(
              <div key={group.id} style={{
                marginTop: isFirstRendered ? 0 : '4px',
                borderTop: !isFirstRendered
                  ? '1px solid color-mix(in oklch, currentColor 12%, transparent)'
                  : undefined,
              }}>
                <button
                  type="button"
                  aria-expanded={midExpanded}
                  onClick={() => toggleMidGroup(tx.id, group.id)}
                  style={{
                    width: '100%',
                    margin: 0,
                    border: 'none',
                    cursor: 'pointer',
                    font: 'inherit',
                    color: 'inherit',
                    textAlign: 'left',
                    padding: '10px 16px',
                    background: 'color-mix(in oklch, currentColor 5%, transparent)',
                    display: 'block',
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.5rem',
                  }}>
                    <span style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.7rem',
                      opacity: 0.45,
                      paddingTop: '0.35rem',
                      flexShrink: 0,
                      width: '1rem',
                    }}>
                      {midExpanded ? '▾' : '▸'}
                    </span>
                    <div style={{ flex: '1', minWidth: 0 }}>
                      <div style={{
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        opacity: 0.72,
                        marginBottom: '0.35rem',
                        lineHeight: 1.25,
                      }}>
                        {group.label}
                      </div>
                      <div style={{
                        fontSize: '0.78rem',
                        opacity: 0.52,
                        lineHeight: 1.5,
                      }}>
                        {group.desc}
                      </div>
                    </div>
                    <div style={{
                      textAlign: 'right',
                      flexShrink: 0,
                      paddingLeft: '0.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      gap: '2px',
                    }}>
                      <span style={{
                        fontSize: '0.62rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        opacity: 0.38,
                      }}>
                        Group score
                      </span>
                      {gsc != null && gvBand ? (
                        <span
                          className="vs-sig-group-num"
                          style={{
                            fontSize: '1.05rem',
                            fontWeight: 700,
                            fontFamily: 'JetBrains Mono, monospace',
                            color: palette[gvBand],
                          }}
                        >
                          <VerityScoreHover
                            project={project}
                            score100={gsc}
                            bucketId={tx.id}
                            groupSignalNames={group.signals}
                            useLiveCriteria
                            tipTitle={group.label}
                            placement="below"
                            align="end"
                          >
                            {gsc}
                          </VerityScoreHover>
                        </span>
                      ) : (
                        <span style={{
                          fontSize: '0.92rem',
                          opacity: 0.35,
                          fontFamily: 'JetBrains Mono, monospace',
                        }}
                        >
                          —
                        </span>
                      )}
                    </div>
                  </div>
                </button>

                {midExpanded && (
                  <div style={{
                    borderLeft: '2px solid color-mix(in oklch, currentColor 18%, transparent)',
                    marginLeft: '18px',
                    paddingLeft: '4px',
                    background: 'color-mix(in oklch, currentColor 2%, transparent)',
                  }}>
                    {groupSigs.map((sg) => renderSignalRow(tx, sg, { nested: true }))}
                  </div>
                )}
              </div>,
            );
          });

          const orphanSigs = tx.signals.filter((s) => !namesInGroups.has(s.name));
          if (orphanSigs.length > 0) {
            fragments.push(
              <div key={`${tx.id}-other`}>
                {orphanSigs.map((sg) => renderSignalRow(tx, sg))}
              </div>,
            );
          }

          listInner = fragments;
        } else {
          listInner = tx.signals.map((sg) => renderSignalRow(tx, sg));
        }

        return (
          <div key={tx.id} className="vs-sig-group">
            <header className="vs-sig-group-head">
              <div className="vs-sig-group-info">
                <div className="vs-sig-group-name">{tx.name}</div>
                <div className="vs-sig-group-blurb">{tx.blurb}</div>
              </div>
              <div className="vs-sig-group-score">
                <div className="vs-sig-group-num" style={{ color: palette[v] }}>
                  <VerityScoreHover
                    project={project}
                    score100={score}
                    bucketId={tx.id}
                    useLiveCriteria
                    tipTitle={`${tx.name} bucket`}
                    placement="below"
                    align="end"
                    className="vs-verity-hover--inline-num"
                  >
                    {score}
                  </VerityScoreHover>
                </div>
                <div className="vs-sig-group-weight">weight {Math.round(weight * 100)}%</div>
              </div>
            </header>

            <div className="vs-sig-list">
              {listInner}
            </div>
          </div>
        );
      })}
    </div>
      ) : (
        <BoardView
          project={project}
          taxonomy={taxonomy}
          palette={palette}
          boardOpen={boardOpen}
          setBoardOpen={setBoardOpen}
        />
      )}
    </React.Fragment>
  );
}

const CRITERION_SCORE = { GREEN: 100, AMBER: 51, RED: 21, GREY: null };

function signalScore(project, txId, sgName) {
  const signals = project.current_signals || [];
  const sig = signals.find(s => s.signal_name === sgName);
  if (!sig) return project.scores[txId];

  const crit = (sig.criteria || [])
    .map(c => CRITERION_SCORE[c.result])
    .filter(v => v !== null && v !== undefined);

  if (crit.length === 0) return project.scores[txId];
  return Math.round(crit.reduce((a,b)=>a+b,0) / crit.length);
}

function Actions({ project, palette }) {
  const ex = project.exec_summary || {};
  const v = project.verdict;
  const fallback = v === 'accelerate' ? [
    { who: 'Sponsor', what: 'Approve scope expansion within Q2.', when: 'Within 14 days' },
  ] : v === 'rescue' ? [
    { who: 'Project lead', what: 'Convene 60-day rescue plan for weakest taxonomy area.', when: 'Within 7 days' },
  ] : [
    { who: 'Sponsor', what: 'Approve sunset and communicate to affected teams.', when: 'Within 14 days' },
  ];
  const actions = Array.isArray(ex.actions) && ex.actions.length ? ex.actions : fallback;
  return (
    <div>
      {ex.cxo_note && (
        <p className="vs-cxo-note" style={{ marginBottom: '1.25rem', padding: '1rem', borderLeft: `3px solid ${palette[v]}`, background: 'color-mix(in oklch, currentColor 4%, transparent)', fontSize: '0.95rem' }}>
          <b>CXO note:</b> {ex.cxo_note}
        </p>
      )}
      {Array.isArray(ex.risks) && ex.risks.length > 0 && (
        <ul style={{ marginBottom: '1.25rem', paddingLeft: '1.25rem', opacity: 0.9 }}>
          {ex.risks.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
      )}
      <ol className="vs-actions">
        {actions.map((a, i) => (
          <li key={i} className="vs-action">
            <div className="vs-action-rank" style={{ borderColor: palette[v] }}>
              <span style={{ color: palette[v] }}>{String(i + 1).padStart(2, '0')}</span>
            </div>
            <div className="vs-action-body">
              <div className="vs-action-who">{a.who}</div>
              <div className="vs-action-what">{a.what}</div>
            </div>
            <div className="vs-action-when">{a.when}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}

window.ProjectDetailView = ProjectDetailView;
