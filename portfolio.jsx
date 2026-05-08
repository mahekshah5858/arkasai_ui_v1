// Portfolio (landing) view — rolled-up analytics for Verity Signal

const { TAXONOMY } = window.VS;
const COMPANY = window.VS.COMPANY;

function signalCount(taxonomy) {
  return taxonomy.reduce((n, tx) => n + (tx.signals ? tx.signals.length : 0), 0);
}

function PortfolioView({ projects, goToProject, goToIntake, palette }) {
  const [filter, setFilter] = React.useState('all'); // all | accelerate | rescue | kill
  const [sort, setSort] = React.useState('score'); // score | spend | name

  const counts = React.useMemo(() => {
    const c = { accelerate: 0, rescue: 0, kill: 0, total: projects.length };
    projects.forEach((p) => c[p.verdict]++);
    return c;
  }, [projects]);

  const totalSpend = React.useMemo(() => projects.reduce((s, p) => s + p.spend, 0), [projects]);
  const spendByVerdict = React.useMemo(() => {
    const v = { accelerate: 0, rescue: 0, kill: 0 };
    projects.forEach((p) => { v[p.verdict] += p.spend; });
    return v;
  }, [projects]);

  const filtered = React.useMemo(() => {
    let list = filter === 'all' ? projects : projects.filter((p) => p.verdict === filter);
    if (sort === 'score') list = [...list].sort((a, b) => b.score - a.score);
    else if (sort === 'spend') list = [...list].sort((a, b) => b.spend - a.spend);
    else list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [projects, filter, sort]);

  const nSignals = signalCount(TAXONOMY);

  return (
    <div className="vs-portfolio">
      <PortfolioHeader
        counts={counts}
        totalSpend={totalSpend}
        projectCount={projects.length}
        palette={palette}
        nSignals={nSignals}
        goToIntake={goToIntake}
      />

      <section className="vs-section">
        <div className="vs-section-title">
          <span className="vs-eyebrow">01 — Verdict Distribution</span>
          <h2>Where the portfolio stands today</h2>
        </div>
        <VerdictRollup counts={counts} spend={spendByVerdict} totalSpend={totalSpend} palette={palette} />
      </section>

      <section className="vs-section">
        <div className="vs-section-title">
          <span className="vs-eyebrow">Portfolio Map</span>
          <h2>Health and trajectory</h2>
          <p className="vs-section-sub">
            Position = current score · Horizontal = trajectory
            over evaluation history · Bubble size = approved budget
          </p>
        </div>
        <div className="vs-portfolio-chart-wrap">
          <PortfolioBubbleChart
            projects={projects}
            palette={palette}
            goToProject={goToProject}
          />
        </div>
      </section>

      <section className="vs-section">
        <div className="vs-section-title">
          <span className="vs-eyebrow">Portfolio Intelligence</span>
          <h2>What needs your attention</h2>
        </div>
        <PortfolioIntelligence goToProject={goToProject} palette={palette} />
      </section>

      <section className="vs-section">
        <div className="vs-section-title">
          <span className="vs-eyebrow">04 — Risk Heatmap</span>
          <h2>Taxonomy scores across the portfolio</h2>
          <p className="vs-section-sub">Each row is a project. Columns are the four Governance Intelligence categories. Darker cells indicate weaker signals.</p>
        </div>
        <Heatmap projects={projects} taxonomy={TAXONOMY} goToProject={goToProject} palette={palette} />
      </section>

      <section className="vs-section">
        <div className="vs-section-title vs-section-title-row">
          <div>
            <span className="vs-eyebrow">05 — Portfolio Analytics</span>
            <h2>{filtered.length} of {projects.length} projects</h2>
          </div>
          <div className="vs-filters">
            <FilterChips filter={filter} setFilter={setFilter} counts={counts} palette={palette} />
            <SortMenu sort={sort} setSort={setSort} />
          </div>
        </div>
        <ProjectList projects={filtered} goToProject={goToProject} palette={palette} />
      </section>
    </div>
  );
}

function PortfolioIntelligence({ goToProject, palette }) {
  const intel = window.VS.PORTFOLIO_INTELLIGENCE;
  if (!intel || !intel.risks || intel.risks.length === 0) {
    return (
      <p style={{ opacity: 0.5, fontStyle: 'italic', fontSize: '0.85rem' }}>
        No portfolio-level risks identified.
      </p>
    );
  }

  function ProgrammePill({ prog, severity }) {
    const borderColor = severity === 'red' ? palette.kill : palette.rescue;
    const textColor = severity === 'red' ? palette.kill : palette.rescue;

    return (
      <button
        onClick={() => goToProject(prog.id, prog.signal)}
        title={`Open ${prog.name} → ${prog.signal}`}
        style={{
          fontSize: '0.72rem',
          fontWeight: 600,
          padding: '2px 9px',
          borderRadius: '3px',
          border: `1px solid ${borderColor}`,
          color: textColor,
          background: 'transparent',
          cursor: 'pointer',
          fontFamily: 'inherit',
          whiteSpace: 'nowrap',
          transition: 'opacity 0.15s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.65')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      >
        {prog.name}
      </button>
    );
  }

  return (
    <div className="vs-portfolio-intel-grid">
      {intel.risks.map((risk) => {
        const isRed = risk.severity === 'red';
        const accentColor = isRed ? palette.kill : palette.rescue;
        const countLabel =
          risk.programmes.length === 1 ? '1 programme' : `${risk.programmes.length} programmes`;

        return (
          <div
            key={risk.id}
            className="vs-portfolio-intel-card"
            style={{
              borderTop: '0.5px solid currentColor',
              borderBottom: '0.5px solid currentColor',
              borderRight: '0.5px solid currentColor',
              borderLeft: `3px solid ${accentColor}`,
              borderRadius: '0 4px 4px 0',
              padding: '1rem 1.25rem',
              opacity: 0.92,
            }}
          >
            <div
              className="vs-portfolio-intel-card__head"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '1rem',
                marginBottom: '0.5rem',
              }}
            >
              <div
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: accentColor,
                  lineHeight: 1.3,
                }}
              >
                {risk.title}
              </div>
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  padding: '2px 8px',
                  borderRadius: '20px',
                  border: `1px solid ${accentColor}`,
                  color: accentColor,
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {countLabel}
              </span>
            </div>

            <div
              style={{
                fontSize: '0.83rem',
                lineHeight: 1.65,
                opacity: 0.75,
                marginBottom: '0.75rem',
              }}
            >
              {risk.body}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  opacity: 0.4,
                  marginRight: '0.25rem',
                }}
              >
                Affects
              </span>
              {risk.programmes.map((prog) => (
                <ProgrammePill key={prog.id} prog={prog} severity={risk.severity} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PortfolioBubbleChart({ projects, palette, goToProject }) {

  const W = 1000;
  const H = 420;
  const PAD = { top: 40, right: 20, bottom: 50, left: 52 };

  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top  - PAD.bottom;

  // X axis: trajectory (score delta from first to last evaluation)
  // Calculate from trendAnchors — first anchor vs last anchor
  function getTrajectory(project) {
    const anchors = project.trendAnchors || [];
    if (anchors.length < 2) return 0;
    const first = window.VS.toDisplayScore(anchors[0][1]);
    const last  = window.VS.toDisplayScore(anchors[anchors.length - 1][1]);
    return last - first;
  }

  // Budget → bubble radius (min 14, max 30)
  function getBubbleR(spend) {
    const min = 0.9, max = 4.5;
    const clamped = Math.min(Math.max(spend, min), max);
    const t = (clamped - min) / (max - min);
    return Math.round(14 + t * 16);
  }

  // Map score (0-100) to Y pixel — higher score = higher on chart
  function scoreToY(score) {
    return chartH - ((score / 100) * chartH);
  }

  // Map trajectory to X pixel
  // Range: -50 to +50 points
  function trajToX(traj) {
    const clamped = Math.min(Math.max(traj, -50), 50);
    return ((clamped + 50) / 100) * chartW;
  }

  function clamp(n, a, b) {
    return Math.min(Math.max(n, a), b);
  }

  // Verdict thresholds in Y pixels
  const y42 = scoreToY(42);
  const y68 = scoreToY(68);

  // Gradient zone colours
  const killColor      = 'rgba(158,21,21,0.06)';
  const rescueColor    = 'rgba(138,75,0,0.05)';
  const accelColor     = 'rgba(29,107,59,0.06)';

  // Build bubble data
  const bubbles = projects
    .filter(p => !p.is_demo)
    .map(p => ({
      id:     p.id,
      name:   p.name,
      score:  p.score,
      traj:   getTrajectory(p),
      r:      getBubbleR(p.spend),
      verdict: p.verdict,
      color:  palette[p.verdict],
      spend:  p.spend,
    }));

  // Deterministic layout pass to avoid overlaps (kept simple for easy revert).
  const laidOut = React.useMemo(() => {
    const PAD_INNER = 2;
    const nodes = bubbles.map((b) => ({
      ...b,
      x: clamp(trajToX(b.traj), b.r + PAD_INNER, chartW - b.r - PAD_INNER),
      y: clamp(scoreToY(b.score), b.r + PAD_INNER, chartH - b.r - PAD_INNER),
    }));

    // Sort so we resolve top-right cluster first (usually accelerate bubbles).
    nodes.sort((a, b) => (b.y - a.y) || (b.x - a.x));

    const iters = 28;
    const gap = 6;
    for (let k = 0; k < iters; k++) {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const minD = a.r + b.r + gap;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;
          if (dist >= minD) continue;

          const push = (minD - dist) / 2;
          // Bias separation to the left when the cluster is near the right edge.
          const biasLeft = (a.x > chartW * 0.72 || b.x > chartW * 0.72) ? 0.65 : 0.5;
          const ux = dx / dist;
          const uy = dy / dist;

          a.x = clamp(a.x - ux * push * biasLeft, a.r + PAD_INNER, chartW - a.r - PAD_INNER);
          b.x = clamp(b.x + ux * push * (1 - biasLeft), b.r + PAD_INNER, chartW - b.r - PAD_INNER);

          // Small vertical nudge to avoid perfect stacking
          a.y = clamp(a.y - uy * push * 0.15, a.r + PAD_INNER, chartH - a.r - PAD_INNER);
          b.y = clamp(b.y + uy * push * 0.15, b.r + PAD_INNER, chartH - b.r - PAD_INNER);
        }
      }
    }
    return nodes;
  }, [bubbles, chartW, chartH]);

  const [hovered, setHovered] = React.useState(null);

  return (
    <div className="vs-portfolio-chart-scroll">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="auto"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block', maxWidth: '100%' }}
      >
        <g transform={`translate(${PAD.left},${PAD.top})`}>

          {/* ── Gradient background zones ── */}

          {/* Kill zone — below y42 */}
          <rect
            x={0} y={y42}
            width={chartW} height={chartH - y42}
            fill={killColor}
          />

          {/* Rescue zone — between y68 and y42 */}
          <rect
            x={0} y={y68}
            width={chartW} height={y42 - y68}
            fill={rescueColor}
          />

          {/* Accelerate zone — above y68 */}
          <rect
            x={0} y={0}
            width={chartW} height={y68}
            fill={accelColor}
          />

          {/* ── Threshold lines ── */}
          {[
            { y: y68, label: 'Accelerate', color: palette.accelerate },
            { y: y42, label: 'Rescue',     color: palette.rescue },
          ].map(({ y, label, color }) => (
            <g key={label}>
              <line
                x1={0} x2={chartW} y1={y} y2={y}
                stroke={color} strokeWidth={1}
                strokeDasharray="4 4" opacity={0.4}
              />
              <text
                x={8} y={y - 6}
                fontSize={9} fill={color}
                opacity={0.5} fontWeight={600}
                textAnchor="start"
                fontFamily="JetBrains Mono, monospace"
              >
                {label}
              </text>
            </g>
          ))}

          {/* ── Centre vertical line (zero trajectory) ── */}
          <line
            x1={chartW / 2} x2={chartW / 2}
            y1={0} y2={chartH}
            stroke="currentColor" strokeWidth={0.5}
            opacity={0.12} strokeDasharray="2 4"
          />

          {/* ── X axis ── */}
          <line
            x1={0} x2={chartW}
            y1={chartH} y2={chartH}
            stroke="currentColor" strokeWidth={0.5} opacity={0.2}
          />

          {/* X axis labels */}
          {[
            { x: 0,           label: 'Declining' },
            { x: chartW / 2,  label: 'Stable'    },
            { x: chartW,      label: 'Improving'  },
          ].map(({ x, label }) => (
            <text
              key={label}
              x={x} y={chartH + 18}
              fontSize={10} fill="currentColor"
              opacity={0.4}
              textAnchor={x === 0 ? 'start' : x === chartW ? 'end' : 'middle'}
              fontFamily="JetBrains Mono, monospace"
            >
              {label}
            </text>
          ))}

          {/* X axis arrow labels */}
          <text x={chartW / 4}     y={chartH + 32}
            fontSize={8} fill="currentColor" opacity={0.25}
            textAnchor="middle">
            ← score fell
          </text>
          <text x={chartW * 3 / 4} y={chartH + 32}
            fontSize={8} fill="currentColor" opacity={0.25}
            textAnchor="middle">
            score rose →
          </text>

          {/* ── Y axis labels ── */}
          {[0, 25, 42, 50, 68, 75, 100].map(s => (
            <text
              key={s}
              x={-8} y={scoreToY(s) + 4}
              fontSize={9} fill="currentColor"
              opacity={s === 42 || s === 68 ? 0.5 : 0.25}
              textAnchor="end"
              fontWeight={s === 42 || s === 68 ? 600 : 400}
              fontFamily="JetBrains Mono, monospace"
            >
              {s}
            </text>
          ))}

          {/* ── Bubbles ── */}
          {laidOut.map(b => {
            const cx = b.x;
            const cy = b.y;
            const isHovered = hovered === b.id;
            const tooltipX = cx > chartW * 0.65
              ? cx - b.r - 138   // show to the LEFT
              : cx + b.r + 8;    // show to the RIGHT
            const tooltipTextX = cx > chartW * 0.65
              ? cx - b.r - 130
              : cx + b.r + 16;
            const tooltipY = clamp(cy - 36, 0, chartH - 68);

            return (
              <g
                key={b.id}
                onClick={() => goToProject && goToProject(b.id)}
                onMouseEnter={() => setHovered(b.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Bubble shadow when hovered */}
                {isHovered && (
                  <circle
                    cx={cx} cy={cy} r={b.r + 6}
                    fill={b.color} opacity={0.12}
                  />
                )}

                {/* Main bubble */}
                <circle
                  cx={cx} cy={cy} r={b.r}
                  fill={b.color}
                  opacity={isHovered ? 0.9 : 0.7}
                  stroke={b.color}
                  strokeWidth={1.5}
                />

                {/* Programme name — always visible */}
                <text
                  x={cx} y={Math.max(10, cy - b.r - 6)}
                  fontSize={10}
                  fill="currentColor"
                  opacity={isHovered ? 0.9 : 0.65}
                  textAnchor="middle"
                  fontWeight={isHovered ? 700 : 500}
                >
                  {b.name.length > 14
                    ? b.name.split(' ').slice(0, 2).join(' ')
                    : b.name}
                </text>

                {/* Score inside bubble */}
                <text
                  x={cx} y={cy + 4}
                  fontSize={b.r > 18 ? 11 : 9}
                  fill="white"
                  textAnchor="middle"
                  fontWeight={700}
                  fontFamily="JetBrains Mono, monospace"
                >
                  {b.score}
                </text>

                {/* Tooltip on hover */}
                {isHovered && (
                  <g>
                    <rect
                      x={tooltipX}
                      y={tooltipY}
                      width={130} height={68}
                      rx={3}
                      fill="currentColor" opacity={0.06}
                      stroke="currentColor" strokeWidth={0.5}
                      strokeOpacity={0.2}
                    />
                    <text
                      x={tooltipTextX} y={tooltipY + 16}
                      fontSize={10} fill="currentColor"
                      opacity={0.8} fontWeight={700}
                    >
                      {b.name}
                    </text>
                    <text
                      x={tooltipTextX} y={tooltipY + 30}
                      fontSize={9} fill="currentColor" opacity={0.6}
                    >
                      Score: {b.score}
                    </text>
                    <text
                      x={tooltipTextX} y={tooltipY + 43}
                      fontSize={9} fill="currentColor" opacity={0.6}
                    >
                      Trajectory: {b.traj >= 0 ? '+' : ''}{b.traj} pts
                    </text>
                    <text
                      x={tooltipTextX} y={tooltipY + 56}
                      fontSize={9} fill="currentColor" opacity={0.6}
                    >
                      Budget: ${b.spend.toFixed(1)}M
                    </text>
                  </g>
                )}
              </g>
            );
          })}

        </g>

        {/* Chart title — Y axis label */}
        <text
          x={14} y={H / 2}
          fontSize={9} fill="currentColor" opacity={0.35}
          textAnchor="middle"
          transform={`rotate(-90, 14, ${H / 2})`}
          fontFamily="JetBrains Mono, monospace"
        >
          SCORE (0–100)
        </text>

      </svg>

      {/* Legend */}
      <div style={{
        display: 'flex',
        gap: '1.5rem',
        marginTop: '0.75rem',
        fontSize: '0.72rem',
        opacity: 0.45,
        flexWrap: 'wrap',
      }}>
        {[
          { color: palette.accelerate, label: 'Accelerate (≥68)' },
          { color: palette.rescue,     label: 'Rescue (42–68)'   },
          { color: palette.kill,       label: 'Kill (<42)'       },
        ].map(({ color, label }) => (
          <div key={label} style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
          }}>
            <div style={{
              width: 10, height: 10, borderRadius: '50%',
              background: color, opacity: 0.75,
              flexShrink: 0,
            }} />
            <span>{label}</span>
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            border: '1px solid currentColor', flexShrink: 0,
          }} />
          <span>Bubble size = approved budget</span>
        </div>
      </div>
    </div>
  );
}

function PortfolioHeader({ counts, totalSpend, projectCount, palette, nSignals, goToIntake }) {
  const accPct = counts.total ? Math.round((counts.accelerate / counts.total) * 100) : 0;
  return (
    <header className="vs-hero">
      <div className="vs-hero-left">
        <h1 className="vs-hero-title">
          <span className="vs-hero-quiet">A portfolio of </span>
          <span className="vs-hero-num">{counts.total}</span>
          <span className="vs-hero-quiet"> </span>
          <span className="vs-hero-accent-ai">AI</span>
          <span className="vs-hero-quiet"> investments. </span>
          <span className="vs-hero-num">{accPct}%</span>
          <span className="vs-hero-quiet"> are accelerating.</span>
        </h1>
        <p className="vs-hero-sub">
          Rolled-up analytics across {projectCount} active programmes, evaluated against
          a four-category taxonomy with {nSignals} underlying signals on a 0–100 scale.
          Verdicts are recommended, not enforced — sponsors retain final call.
        </p>
      </div>
      <div className="vs-hero-right">
        <button
          type="button"
          onClick={goToIntake}
          style={{
            border: '1px solid currentColor',
            background: 'transparent',
            color: 'inherit',
            padding: '0.4rem 1rem',
            borderRadius: '3px',
            fontSize: '0.82rem',
            fontWeight: 600,
            cursor: 'pointer',
            opacity: 0.7,
            letterSpacing: '0.03em',
            alignSelf: 'flex-end',
            marginBottom: '0.5rem',
          }}
        >
          + New Evaluation
        </button>
        <HeroStat label="Total committed" value={`$${totalSpend.toFixed(1)}M`} />
        <HeroStat label="Last evaluated" value={COMPANY.evaluationDate} />
        <HeroStat label="Company" value={COMPANY.name} />
      </div>
    </header>
  );
}

function HeroStat({ label, value }) {
  return (
    <div className="vs-hero-stat">
      <div className="vs-hero-stat-label">{label}</div>
      <div className="vs-hero-stat-value">{value}</div>
    </div>
  );
}

function VerdictRollup({ counts, spend, totalSpend, palette }) {
  const items = [
    { id: 'accelerate', label: 'Accelerate', sub: 'Double down. Expand scope or capacity.' },
    { id: 'rescue',     label: 'Rescue',     sub: 'Intervene. Targeted fixes within 60 days.' },
    { id: 'kill',       label: 'Kill',       sub: 'Sunset. Free capital and team capacity.' },
  ];
  return (
    <div className="vs-rollup">
      {items.map((it) => {
        const c = counts[it.id];
        const s = spend[it.id];
        const pct = counts.total ? Math.round((c / counts.total) * 100) : 0;
        return (
          <article key={it.id} className="vs-verdict-card" data-v={it.id}>
            <div className="vs-verdict-head">
              <div className="vs-verdict-dot" style={{ background: palette[it.id] }} />
              <div className="vs-verdict-label">{it.label}</div>
            </div>
            <div className="vs-verdict-num">
              <span className="vs-verdict-count">{c}</span>
              <span className="vs-verdict-of">/ {counts.total}</span>
            </div>
            <div className="vs-verdict-bar">
              <div className="vs-verdict-bar-fill" style={{ width: `${pct}%`, background: palette[it.id] }} />
            </div>
            <div className="vs-verdict-meta">
              <span>{pct}% of portfolio</span>
              <span>${s.toFixed(1)}M committed</span>
            </div>
            <p className="vs-verdict-sub">{it.sub}</p>
          </article>
        );
      })}
    </div>
  );
}

function Heatmap({ projects, taxonomy, goToProject, palette }) {
  const sorted = [...projects].sort((a, b) => a.score - b.score);
  return (
    <div className="vs-heatmap">
      <div className="vs-heatmap-head">
        <div className="vs-heatmap-cell-name">Project</div>
        {taxonomy.map((tx) => (
          <div key={tx.id} className="vs-heatmap-cell-tx" title={tx.blurb}>{tx.name}</div>
        ))}
        <div className="vs-heatmap-cell-score">Score</div>
      </div>
      <div className="vs-heatmap-body">
        {sorted.map((p) => (
          <button key={p.id} className="vs-heatmap-row" onClick={() => goToProject(p.id)}>
            <div className="vs-heatmap-cell-name">
              <span className="vs-verdict-pill" data-v={p.verdict} style={{ background: palette[p.verdict] }}>
                {p.verdict[0].toUpperCase()}
              </span>
              <span className="vs-heatmap-pname">{p.name}</span>
            </div>
            {taxonomy.map((tx) => {
              const s = p.scores[tx.id];
              const isFail = p.bucketFails?.includes(tx.id);
              const cellColor = isFail
                ? palette.rescue
                : palette[window.VS.verdictFor(p.scores[tx.id])];
              return (
                <div key={tx.id} className="vs-heatmap-cell"
                     style={{
                       background: cellColor,
                       color: s < 45 ? '#fff' : 'inherit',
                     }}>
                  {s}
                </div>
              );
            })}
            <div className="vs-heatmap-cell-score">{p.score}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function heatColor(s, palette) {
  if (s >= 68) return `color-mix(in oklch, ${palette.accelerate} ${(s - 68) * 1.4 + 8}%, transparent)`;
  if (s >= 42) return `color-mix(in oklch, ${palette.rescue} ${(68 - s) * 2 + 12}%, transparent)`;
  return `color-mix(in oklch, ${palette.kill} ${(42 - s) * 1.6 + 35}%, transparent)`;
}

function FilterChips({ filter, setFilter, counts, palette }) {
  const opts = [
    { id: 'all', label: 'All', count: counts.total },
    { id: 'accelerate', label: 'Accelerate', count: counts.accelerate },
    { id: 'rescue', label: 'Rescue', count: counts.rescue },
    { id: 'kill', label: 'Kill', count: counts.kill },
  ];
  return (
    <div className="vs-chips">
      {opts.map((o) => (
        <button key={o.id} className={`vs-chip ${filter === o.id ? 'is-active' : ''}`}
                onClick={() => setFilter(o.id)}
                style={filter === o.id && o.id !== 'all' ? { borderColor: palette[o.id], color: palette[o.id] } : {}}>
          {o.id !== 'all' && <span className="vs-chip-dot" style={{ background: palette[o.id] }} />}
          {o.label}
          <span className="vs-chip-count">{o.count}</span>
        </button>
      ))}
    </div>
  );
}

function SortMenu({ sort, setSort }) {
  return (
    <div className="vs-sort">
      <span className="vs-sort-label">Sort</span>
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="score">Score (high → low)</option>
        <option value="spend">Spend (high → low)</option>
        <option value="name">Name (A → Z)</option>
      </select>
    </div>
  );
}

function ProjectList({ projects, goToProject, palette }) {
  const [p6Answered, setP6Answered] = React.useState(
    typeof window !== 'undefined' ? (window.VS._p6AnsweredCount || 0) : 0
  );
  const [p6LiveScore, setP6LiveScore] = React.useState(
    typeof window !== 'undefined' && window.VS._p6LiveScore != null
      ? window.VS._p6LiveScore
      : null
  );

  React.useEffect(() => {
    function onAnswered() {
      setP6Answered(window.VS._p6AnsweredCount || 0);
      setP6LiveScore(
        window.VS._p6LiveScore != null ? window.VS._p6LiveScore : null
      );
    }
    window.addEventListener('vs-p6-answered', onAnswered);
    return () => window.removeEventListener('vs-p6-answered', onAnswered);
  }, []);

  return (
    <div className="vs-plist">
      {projects.map((p) => (
        <button
          key={p.id}
          type="button"
          className="vs-pcard"
          style={p.is_demo ? {
            borderStyle: 'dashed',
            opacity: 0.85,
          } : undefined}
          onClick={() => goToProject(p.id)}
        >
          <div
            className="vs-pcard-head"
            style={p.is_demo ? {
              justifyContent: 'flex-start',
              gap: '0.5rem',
              flexWrap: 'nowrap',
              alignItems: 'center',
            } : undefined}
          >
            {p.is_demo ? (
              <span style={{
                fontSize: '0.6rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
                border: '1px solid currentColor',
                color: 'inherit',
                padding: '1px 5px',
                borderRadius: '2px',
                opacity: 0.4,
                flexShrink: 0,
              }}>
                Intake
              </span>
            ) : null}
            <span className="vs-verdict-pill" data-v={p.verdict} style={{ background: palette[p.verdict] }}>
              {p.verdict === 'accelerate' ? 'Accelerate'
                : p.verdict === 'rescue' ? 'Rescue' : 'Kill'}
            </span>
            <span className="vs-pcard-stage">
              {p.is_demo ? 'New · Demo' : p.stage}
            </span>
          </div>
          <div className="vs-pcard-name">{p.name}</div>
          <div className="vs-pcard-meta">
            <span>{p.division}</span>
            <span>·</span>
            <span>{p.owner}</span>
          </div>
          <div className="vs-pcard-headline">{p.headline}</div>
          <div className="vs-pcard-foot">
            <Sparkline series={p.trend} palette={palette} />
            <div className="vs-pcard-stats">
              <div>
                <span>Score</span>
                <b>
                  {p.is_demo && p6LiveScore != null ? p6LiveScore : p.score}
                </b>
              </div>
              <div><span>Spend</span><b>${p.spend.toFixed(1)}M</b></div>
            </div>
          </div>
          {p.is_demo ? (
            <div className="vs-pcard-flags">
              <span className="vs-flag">
                {(p.pending_count || 10) - p6Answered} questions pending
              </span>
              <span className="vs-flag">
                {p.coverage_pct || 90}% coverage
              </span>
            </div>
          ) : (
            (p.flags || []).length > 0 && (
              <div className="vs-pcard-flags">
                {(p.flags || []).slice(0, 3).map((f) => (
                  <span key={f} className="vs-flag">{f}</span>
                ))}
              </div>
            )
          )}
        </button>
      ))}
    </div>
  );
}

function Sparkline({ series, palette }) {
  const W = 80, H = 24;
  const min = Math.min(...series), max = Math.max(...series);
  const range = Math.max(1, max - min);
  const pts = series.map((v, i) => {
    const x = (i / (series.length - 1)) * W;
    const y = H - ((v - min) / range) * H;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  const last = series[series.length - 1];
  const v = last >= 68 ? 'accelerate' : last >= 42 ? 'rescue' : 'kill';
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="vs-spark" width={W} height={H}>
      <polyline points={pts} fill="none" stroke={palette[v]} strokeWidth="1.2" />
    </svg>
  );
}

window.PortfolioView = PortfolioView;
