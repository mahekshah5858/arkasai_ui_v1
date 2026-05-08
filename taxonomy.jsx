function TaxonomyView({ goBack, palette }) {

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

  const TAXONOMY_DATA = [
    { id:'eng', bucket:'tech', name:'Engineering Health', isCritical:false, criteria:[
      { name:'Test Coverage', isCritical:false, mode:'Continuous', green:'>= 90%', amber:'>= 70%', red:'< 70%', source:'GitHub' },
      { name:'CI/CD Reliability', isCritical:true, mode:'Continuous', green:'>= 95%', amber:'>= 85%', red:'< 85%', source:'GitHub Actions' },
      { name:'Code Review Compliance', isCritical:false, mode:'Continuous', green:'>= 90%', amber:'>= 70%', red:'< 70%', source:'GitHub' },
      { name:'Code Quality Visibility', isCritical:false, mode:'Continuous', green:'A', amber:'B', red:'Any other response', source:'SonarCloud' },
      { name:'Security Vulnerability Management', isCritical:true, mode:'Continuous', green:'<= 0', amber:'<= 2', red:'> 2', source:'GitHub Security' },
      { name:'Documentation and Maintainability', isCritical:false, mode:'Point in Time', green:'Both', amber:'One', red:'Any other response', source:'Human input' },
    ]},
    { id:'arch', bucket:'tech', name:'Architecture Fitness', isCritical:false, criteria:[
      { name:'Architecture Review', isCritical:true, mode:'Point in Time', green:'Yes - independent', amber:'Yes - internal', red:'Any other response', source:'Architecture_Review.pdf' },
      { name:'Non-Functional Requirements', isCritical:false, mode:'Point in Time', green:'Yes - all', amber:'Yes - partial', red:'Any other response', source:'NFR_Document.pdf' },
      { name:'Enterprise Standards Alignment', isCritical:false, mode:'Point in Time', green:'Yes - EA', amber:'Partial', red:'Any other response', source:'Human input' },
    ]},
    { id:'scale', bucket:'tech', name:'Scalability Readiness', isCritical:false, criteria:[
      { name:'Load Testing', isCritical:true, mode:'Periodic', green:'Yes - at capacity', amber:'Yes - below capacity', red:'Any other response', source:'Human input' },
      { name:'Auto-scaling Configuration', isCritical:false, mode:'Periodic', green:'Yes - configured and tested', amber:'Yes - configured', red:'Any other response', source:'Human input' },
      { name:'Capacity Model', isCritical:false, mode:'Point in Time', green:'Yes - documented', amber:'Yes - exists', red:'Any other response', source:'Human input' },
    ]},
    { id:'sec', bucket:'tech', name:'Security Posture', isCritical:false, criteria:[
      { name:'Security Framework', isCritical:true, mode:'Periodic', green:'SOC 2 Type II certified', amber:'Framework in progress', red:'Any other response', source:'SOC2_Certificate.pdf' },
      { name:'Penetration Testing', isCritical:true, mode:'Periodic', green:'Within 6 months', amber:'Within 12 months', red:'Overdue', source:'PenTest_Report.pdf' },
      { name:'Secrets and Access Management', isCritical:false, mode:'Continuous', green:'Both', amber:'Partial', red:'Any other response', source:'GitHub Security' },
    ]},
    { id:'dq', bucket:'tech', name:'Data Quality and Governance', isCritical:false, criteria:[
      { name:'Data Quality Baseline', isCritical:false, mode:'Continuous', green:'Yes - formal', amber:'Yes - informal', red:'Any other response', source:'Human input' },
      { name:'Data Lineage', isCritical:false, mode:'Point in Time', green:'Yes - full', amber:'Yes - partial', red:'Any other response', source:'Data_Lineage.pdf' },
      { name:'Bias Assessment', isCritical:true, mode:'Periodic', green:'Completed', amber:'In progress', red:'Any other response', source:'Human input' },
      { name:'Data Governance Sign-off', isCritical:true, mode:'Point in Time', green:'Yes - all', amber:'Yes - partial', red:'Any other response', source:'Data_Governance_Signoff.pdf' },
    ]},
    { id:'int', bucket:'tech', name:'Integration Health', isCritical:false, criteria:[
      { name:'Integration Build Status', isCritical:true, mode:'Continuous', green:'>= 100%', amber:'>= 75%', red:'< 75%', source:'Jira' },
      { name:'Integration Error Rate', isCritical:true, mode:'Continuous', green:'<= 0.1%', amber:'<= 1.0%', red:'> 1.0%', source:'Datadog' },
      { name:'Integration Monitoring', isCritical:false, mode:'Continuous', green:'All integrations', amber:'Partial', red:'Any other response', source:'Datadog' },
    ]},
    { id:'model', bucket:'tech', name:'Model / Product Maturity', isCritical:false, criteria:[
      { name:'Validation Stage', isCritical:false, mode:'Point in Time', green:'Production', amber:'Pilot completed', red:'Any other response', source:'Human input' },
      { name:'Pilot Outcomes', isCritical:false, mode:'Point in Time', green:'>= 3 milestones', amber:'>= 1 milestone', red:'0 milestones', source:'Human input' },
      { name:'User Validation', isCritical:false, mode:'Point in Time', green:'Yes - at scale', amber:'Yes - limited', red:'Any other response', source:'Human input' },
    ]},
    { id:'ops', bucket:'tech', name:'Operational Readiness', isCritical:false, criteria:[
      { name:'Observability Stack', isCritical:true, mode:'Continuous', green:'Full stack', amber:'Partial', red:'Any other response', source:'Datadog' },
      { name:'Runbooks', isCritical:false, mode:'Point in Time', green:'Complete', amber:'Partial', red:'Any other response', source:'Human input' },
      { name:'On-Call Coverage', isCritical:true, mode:'Point in Time', green:'Yes - tested', amber:'Yes - defined', red:'Any other response', source:'Human input' },
      { name:'BAU Team Readiness', isCritical:true, mode:'Continuous', green:'Yes - fully engaged', amber:'Yes - identified', red:'Any other response', source:'Human input' },
    ]},
    { id:'debt', bucket:'tech', name:'Technical Debt Level', isCritical:false, criteria:[
      { name:'Debt Ratio', isCritical:false, mode:'Continuous', green:'<= 5%', amber:'<= 15%', red:'> 15%', source:'SonarCloud' },
      { name:'Debt Management', isCritical:false, mode:'Continuous', green:'Active', amber:'Informal', red:'Any other response', source:'Jira' },
      { name:'Known Architectural Compromises', isCritical:false, mode:'Continuous', green:'None', amber:'Yes - with plan', red:'Any other response', source:'Human input' },
    ]},
    { id:'gov', bucket:'process', name:'Governance Structure', isCritical:true, criteria:[
      { name:'Programme Board', isCritical:true, mode:'Point in Time', green:'Yes - C-suite chair', amber:'Yes - senior chair', red:'Any other response', source:'Programme_Charter.pdf' },
      { name:'Named Programme Manager', isCritical:true, mode:'Continuous', green:'Yes - dedicated', amber:'Yes - part-time', red:'Any other response', source:'Human input' },
      { name:'RACI Documentation', isCritical:false, mode:'Point in Time', green:'Yes - formal', amber:'Yes - informal', red:'Any other response', source:'RACI_Matrix.pdf' },
      { name:'Governance Tier Match', isCritical:false, mode:'Point in Time', green:'Yes - appropriate', amber:'Partial', red:'Any other response', source:'Human input' },
    ]},
    { id:'mile', bucket:'process', name:'Milestone Delivery Rate', isCritical:true, criteria:[
      { name:'On-Time Delivery Rate', isCritical:true, mode:'Continuous', green:'>= 90%', amber:'>= 75%', red:'< 75%', source:'Jira' },
      { name:'Average Delay', isCritical:false, mode:'Continuous', green:'<= 3 days', amber:'<= 7 days', red:'> 7 days', source:'Jira' },
      { name:'Open Blockers', isCritical:true, mode:'Continuous', green:'<= 1', amber:'<= 3', red:'> 3', source:'Jira' },
      { name:'Recovery Plan', isCritical:false, mode:'Continuous', green:'No delays', amber:'Formal plan exists', red:'Any other response', source:'Human input' },
    ]},
    { id:'riskm', bucket:'process', name:'Risk Management Health', isCritical:false, criteria:[
      { name:'Risk Register Existence', isCritical:true, mode:'Point in Time', green:'Yes - formal', amber:'Yes - informal', red:'Any other response', source:'Risk_Register.pdf' },
      { name:'Review Cadence', isCritical:false, mode:'Continuous', green:'Weekly', amber:'Fortnightly', red:'Any other response', source:'Google Calendar' },
      { name:'High Risk Resolution', isCritical:true, mode:'Continuous', green:'<= 0 open', amber:'<= 2 open', red:'> 2 open', source:'Jira' },
    ]},
    { id:'dep', bucket:'process', name:'Dependency Health', isCritical:false, criteria:[
      { name:'Dependency Tracking', isCritical:true, mode:'Continuous', green:'Yes - all tracked', amber:'Yes - partial', red:'Any other response', source:'Jira' },
      { name:'Critical Dependency Resolution', isCritical:true, mode:'Continuous', green:'<= 0 unresolved', amber:'<= 2 unresolved', red:'> 2 unresolved', source:'Jira' },
      { name:'Dependency Review Cadence', isCritical:false, mode:'Continuous', green:'Weekly', amber:'Monthly', red:'Any other response', source:'Google Calendar' },
    ]},
    { id:'qg', bucket:'process', name:'Quality Gate Adherence', isCritical:false, criteria:[
      { name:'Quality Gates Defined', isCritical:true, mode:'Point in Time', green:'Yes - all phases', amber:'Yes - some phases', red:'Any other response', source:'Quality_Gates.pdf' },
      { name:'Gate Bypass Rate', isCritical:true, mode:'Continuous', green:'<= 0', amber:'<= 2', red:'> 2', source:'Jira' },
      { name:'Defect Classification', isCritical:false, mode:'Point in Time', green:'Yes - active', amber:'Yes - defined', red:'Any other response', source:'Human input' },
    ]},
    { id:'cc', bucket:'process', name:'Change Control Discipline', isCritical:false, criteria:[
      { name:'Change Request Process', isCritical:true, mode:'Point in Time', green:'Yes - formal', amber:'Yes - informal', red:'Any other response', source:'Change_Control_Policy.pdf' },
      { name:'Sponsor Approval Compliance', isCritical:true, mode:'Continuous', green:'>= 100%', amber:'>= 85%', red:'< 85%', source:'Human input' },
      { name:'Change Log Currency', isCritical:false, mode:'Continuous', green:'Yes - current', amber:'Partial', red:'Any other response', source:'Jira' },
    ]},
    { id:'rep', bucket:'process', name:'Reporting Cadence', isCritical:false, criteria:[
      { name:'Report Frequency', isCritical:true, mode:'Continuous', green:'Weekly', amber:'Fortnightly', red:'Any other response', source:'Human input' },
      { name:'Escalation Thresholds', isCritical:true, mode:'Point in Time', green:'Yes - formal', amber:'Yes - informal', red:'Any other response', source:'Governance_Framework.pdf' },
      { name:'Multi-Level Reporting', isCritical:false, mode:'Continuous', green:'All three levels', amber:'Two levels', red:'Any other response', source:'Human input' },
    ]},
    { id:'rb', bucket:'process', name:'Rollback and Contingency', isCritical:false, criteria:[
      { name:'Rollback Procedure', isCritical:true, mode:'Point in Time', green:'Yes - tested', amber:'Yes - documented', red:'Any other response', source:'Rollback_Procedure.pdf' },
      { name:'Phased Deployment', isCritical:true, mode:'Point in Time', green:'Yes - phased', amber:'Yes - canary', red:'Any other response', source:'Human input' },
      { name:'Business Continuity Plan', isCritical:false, mode:'Point in Time', green:'Yes - documented', amber:'Partial', red:'Any other response', source:'BCP.pdf' },
    ]},
    { id:'spon', bucket:'people', name:'Sponsor Commitment', isCritical:true, criteria:[
      { name:'Governance Attendance', isCritical:true, mode:'Continuous', green:'>= 90%', amber:'>= 75%', red:'< 75%', source:'Google Calendar' },
      { name:'Escalation Response Time', isCritical:true, mode:'Continuous', green:'<= 24 hours', amber:'<= 48 hours', red:'> 48 hours', source:'Human input' },
      { name:'Personal Accountability', isCritical:false, mode:'Continuous', green:'Personal', amber:'Partially delegated', red:'Any other response', source:'Human input' },
    ]},
    { id:'cap', bucket:'people', name:'Team Capability', isCritical:false, criteria:[
      { name:'Critical Skills Coverage', isCritical:true, mode:'Continuous', green:'Yes - all present', amber:'Yes - most present', red:'Any other response', source:'Team_Capability.pdf' },
      { name:'Skill Gap Plan', isCritical:false, mode:'Continuous', green:'No gaps', amber:'Yes - active plan', red:'Any other response', source:'Human input' },
      { name:'Domain Expertise', isCritical:false, mode:'Point in Time', green:'Yes - strong', amber:'Yes - moderate', red:'Any other response', source:'Human input' },
    ]},
    { id:'exp', bucket:'people', name:'Relevant Experience', isCritical:false, criteria:[
      { name:'PM Experience', isCritical:false, mode:'Point in Time', green:'>= 2 comparable programmes', amber:'>= 1 programme', red:'0 programmes', source:'Human input' },
      { name:'SI / Vendor Experience', isCritical:false, mode:'Point in Time', green:'>= 3 comparable programmes', amber:'>= 1 programme', red:'0 programmes', source:'Human input' },
      { name:'Technical Lead Experience', isCritical:false, mode:'Point in Time', green:'>= 2 comparable programmes', amber:'>= 1 programme', red:'0 programmes', source:'Human input' },
    ]},
    { id:'avail', bucket:'people', name:'Team Availability', isCritical:false, criteria:[
      { name:'Critical Resource Availability', isCritical:true, mode:'Continuous', green:'>= 80%', amber:'>= 60%', red:'< 60%', source:'Human input' },
      { name:'BAU Splits', isCritical:false, mode:'Continuous', green:'No splits', amber:'Yes - formal and time-bounded', red:'Any other response', source:'Human input' },
      { name:'Competing Programme Conflicts', isCritical:true, mode:'Continuous', green:'No competing conflicts', amber:'Conflicts identified and managed', red:'Any other response', source:'Human input' },
    ]},
    { id:'align', bucket:'people', name:'Stakeholder Alignment', isCritical:false, criteria:[
      { name:'Stakeholder Mapping', isCritical:false, mode:'Point in Time', green:'Yes - complete', amber:'Yes - partial', red:'Any other response', source:'Stakeholder_Map.pdf' },
      { name:'Alignment Status', isCritical:true, mode:'Continuous', green:'Aligned - all', amber:'Aligned - majority', red:'Any other response', source:'Human input' },
      { name:'Resistance Management', isCritical:false, mode:'Continuous', green:'No resistance', amber:'Resistance named and managed', red:'Any other response', source:'Human input' },
    ]},
    { id:'kt', bucket:'people', name:'Knowledge Transfer Readiness', isCritical:false, criteria:[
      { name:'KT Plan', isCritical:true, mode:'Point in Time', green:'Yes - formal plan', amber:'Yes - draft plan', red:'Any other response', source:'KT_Plan.pdf' },
      { name:'BAU Team Identification', isCritical:true, mode:'Continuous', green:'Yes - identified and engaged', amber:'Yes - identified', red:'Any other response', source:'Human input' },
      { name:'Overlap Period', isCritical:false, mode:'Point in Time', green:'Yes - 3 months', amber:'Yes - less than 3 months', red:'Any other response', source:'Human input' },
    ]},
    { id:'cult', bucket:'people', name:'Cultural Readiness', isCritical:false, criteria:[
      { name:'Readiness Assessment', isCritical:true, mode:'Point in Time', green:'Yes - formal', amber:'Yes - informal', red:'Any other response', source:'Human input' },
      { name:'Change Management Plan', isCritical:true, mode:'Continuous', green:'Yes - active', amber:'Yes - draft', red:'Any other response', source:'Human input' },
      { name:'User Confidence Level', isCritical:false, mode:'Continuous', green:'>= 70%', amber:'>= 50%', red:'< 50%', source:'Human input' },
    ]},
    { id:'man', bucket:'strategy', name:'Mandate Clarity', isCritical:true, criteria:[
      { name:'Formal Mandate Document', isCritical:true, mode:'Point in Time', green:'Yes - board resolution', amber:'Yes - executive approval', red:'Any other response', source:'Board_Resolution.pdf' },
      { name:'Named Signatories', isCritical:true, mode:'Point in Time', green:'Yes - C-suite', amber:'Yes - senior management', red:'Any other response', source:'Board_Resolution.pdf' },
      { name:'Link to Organisational Strategy', isCritical:false, mode:'Point in Time', green:'Yes - explicit link', amber:'Yes - implied', red:'Any other response', source:'Human input' },
    ]},
    { id:'val', bucket:'strategy', name:'Value Case Strength', isCritical:false, criteria:[
      { name:'Problem Quantification', isCritical:true, mode:'Point in Time', green:'Yes - quantified', amber:'Yes - described', red:'Any other response', source:'Business_Case.pdf' },
      { name:'Return Validation', isCritical:true, mode:'Point in Time', green:'Yes - formally validated', amber:'Yes - estimated', red:'Any other response', source:'Human input' },
      { name:'Benefits Realisation Plan', isCritical:false, mode:'Continuous', green:'Yes - formal', amber:'Yes - draft', red:'Any other response', source:'Benefits_Plan.pdf' },
    ]},
    { id:'str', bucket:'strategy', name:'Strategic Alignment', isCritical:false, criteria:[
      { name:'Named in Strategy', isCritical:false, mode:'Point in Time', green:'Yes - explicitly named', amber:'Yes - implied', red:'Any other response', source:'Meridian_Strategy.pdf' },
      { name:'Executive Roadmap', isCritical:false, mode:'Point in Time', green:'Yes - on roadmap', amber:'Yes - informally', red:'Any other response', source:'Human input' },
      { name:'Strategic KPIs', isCritical:false, mode:'Continuous', green:'Yes - defined and tracked', amber:'Yes - defined', red:'Any other response', source:'Human input' },
    ]},
    { id:'road', bucket:'strategy', name:'Roadmap Credibility', isCritical:false, criteria:[
      { name:'Board Approval', isCritical:true, mode:'Point in Time', green:'Yes - board approved', amber:'Yes - executive approved', red:'Any other response', source:'Board_Resolution.pdf' },
      { name:'Milestone Ownership', isCritical:true, mode:'Continuous', green:'Yes - all owned', amber:'Yes - most owned', red:'Any other response', source:'Jira' },
      { name:'Resource Basis', isCritical:true, mode:'Point in Time', green:'Yes - resource-based', amber:'Yes - partially', red:'Any other response', source:'Resource_Plan.pdf' },
    ]},
    { id:'inv', bucket:'strategy', name:'Investment Sizing Accuracy', isCritical:false, criteria:[
      { name:'Budget Approval', isCritical:true, mode:'Point in Time', green:'Yes - board approved', amber:'Yes - executive approved', red:'Any other response', source:'Budget_Approval.pdf' },
      { name:'External Benchmarking', isCritical:false, mode:'Point in Time', green:'Yes - externally benchmarked', amber:'Yes - internally benchmarked', red:'Any other response', source:'Human input' },
      { name:'Contingency', isCritical:false, mode:'Point in Time', green:'Yes - formal contingency', amber:'Yes - informal contingency', red:'Any other response', source:'Budget_Approval.pdf' },
    ]},
    { id:'exit', bucket:'strategy', name:'Exit and Kill Criteria', isCritical:true, criteria:[
      { name:'Kill Criteria Defined', isCritical:true, mode:'Point in Time', green:'Yes - formal criteria', amber:'Yes - informal criteria', red:'Any other response', source:'Programme_Charter.pdf' },
      { name:'Gateway Reviews', isCritical:true, mode:'Point in Time', green:'Yes - formal reviews', amber:'Yes - informal reviews', red:'Any other response', source:'Programme_Charter.pdf' },
      { name:'Continuation Contingency', isCritical:false, mode:'Continuous', green:'Yes - explicit', amber:'Yes - implied', red:'Any other response', source:'Human input' },
    ]},
    { id:'inn', bucket:'strategy', name:'Innovation Classification', isCritical:false, criteria:[
      { name:'Horizon Classification', isCritical:false, mode:'Point in Time', green:'Formally classified', amber:'Informally classified', red:'Any other response', source:'Human input' },
      { name:'Governance Match', isCritical:true, mode:'Continuous', green:'Yes - well matched', amber:'Partial match', red:'Any other response', source:'Human input' },
      { name:'Investment Match', isCritical:false, mode:'Point in Time', green:'Yes - appropriate', amber:'Slightly mismatched', red:'Any other response', source:'Human input' },
    ]},
  ];

  const BUCKETS = [
    { id:'tech',     label:'Tech',     count:9 },
    { id:'process',  label:'Process',  count:8 },
    { id:'people',   label:'People',   count:7 },
    { id:'strategy', label:'Strategy', count:7 },
  ];

  const TAXONOMY = window.VS && window.VS.TAXONOMY ? window.VS.TAXONOMY : [];
  const SIGNAL_GROUPS = window.VS && window.VS.SIGNAL_GROUPS ? window.VS.SIGNAL_GROUPS : {};

  const [view, setView] = React.useState('cards');
  const [activeBucket, setActiveBucket] = React.useState(null);
  const [activeGroup, setActiveGroup] = React.useState(null);

  const [openSignals, setOpenSignals] = React.useState({});
  const [search, setSearch] = React.useState('');
  const [filterBucket, setFilterBucket] = React.useState('all');

  function toggleSignal(id) {
    setOpenSignals((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function expandAll(bucketId) {
    const ids = {};
    TAXONOMY_DATA
      .filter((s) => s.bucket === bucketId)
      .forEach((s) => { ids[s.id] = true; });
    setOpenSignals((prev) => ({ ...prev, ...ids }));
  }

  function collapseAll(bucketId) {
    const ids = {};
    TAXONOMY_DATA
      .filter((s) => s.bucket === bucketId)
      .forEach((s) => { ids[s.id] = false; });
    setOpenSignals((prev) => ({ ...prev, ...ids }));
  }

  function expandSubset(signals) {
    const ids = {};
    signals.forEach((s) => { ids[s.id] = true; });
    setOpenSignals((prev) => ({ ...prev, ...ids }));
  }

  function collapseSubset(signals) {
    const ids = {};
    signals.forEach((s) => { ids[s.id] = false; });
    setOpenSignals((prev) => ({ ...prev, ...ids }));
  }

  const filtered = React.useMemo(() => {
    if (!search && filterBucket === 'all') return TAXONOMY_DATA;
    return TAXONOMY_DATA.filter((s) => {
      const matchBucket = filterBucket === 'all' || s.bucket === filterBucket;
      const matchSearch = !search ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.criteria.some((c) => c.name.toLowerCase().includes(search.toLowerCase()));
      return matchBucket && matchSearch;
    });
  }, [search, filterBucket]);

  const bucketsToShow = filterBucket === 'all'
    ? BUCKETS
    : BUCKETS.filter((b) => b.id === filterBucket);

  const chipStyle = (type) => {
    const colors = {
      green: { color:'#1D6B3B', bg:'#E2EFDA', border:'#1D6B3B' },
      amber: { color:'#8A4B00', bg:'#FFF2CC', border:'#8A4B00' },
      red:   { color:'#9E1515', bg:'#FFE0E0', border:'#9E1515' },
    };
    const c = colors[type];
    return {
      display:'inline-block',
      fontSize:'0.72rem',
      fontWeight:600,
      padding:'2px 7px',
      borderRadius:'3px',
      border:`1px solid ${c.border}`,
      color:c.color,
      background:c.bg,
      whiteSpace:'nowrap',
    };
  };

  function renderSignalSection(bkt, signals, sectionKey, useSubsetExpand) {
    if (signals.length === 0) return null;
    const expandedCount = signals.filter((s) => openSignals[s.id]).length;

    const onExpandAll = useSubsetExpand
      ? () => expandSubset(signals)
      : () => expandAll(bkt.id);
    const onCollapseAll = useSubsetExpand
      ? () => collapseSubset(signals)
      : () => collapseAll(bkt.id);

    return (
      <div key={sectionKey} style={{ marginBottom:'3rem' }}>

        <div style={{
          display:'flex', alignItems:'center',
          justifyContent:'space-between',
          padding:'0.6rem 0.25rem',
          borderBottom:'2px solid currentColor',
          marginBottom:'0.25rem',
        }}>
          <div style={{
            fontWeight:700, fontSize:'0.78rem',
            letterSpacing:'0.06em', textTransform:'uppercase',
            opacity:0.7,
          }}>
            {bkt.label} — {signals.length} signals
          </div>
          <div style={{
            display:'flex', gap:'1rem', alignItems:'center',
            fontSize:'0.72rem', opacity:0.45,
          }}>
            <span>{expandedCount}/{signals.length} expanded</span>
            <button type="button" onClick={onExpandAll} style={{
              background:'none', border:'none', cursor:'pointer',
              color:'inherit', fontWeight:700, fontSize:'0.72rem',
              letterSpacing:'0.04em', textDecoration:'underline',
              opacity:0.7, padding:0,
            }}>
              Expand all
            </button>
            <button type="button" onClick={onCollapseAll} style={{
              background:'none', border:'none', cursor:'pointer',
              color:'inherit', fontWeight:700, fontSize:'0.72rem',
              letterSpacing:'0.04em', textDecoration:'underline',
              opacity:0.7, padding:0,
            }}>
              Collapse all
            </button>
          </div>
        </div>

        {signals.map((sg) => {
          const open = !!openSignals[sg.id];
          return (
            <div key={sg.id} style={{
              borderBottom:'1px solid currentColor',
              opacity:0.9,
            }}>
              <button
                type="button"
                onClick={() => toggleSignal(sg.id)}
                style={{
                  width:'100%', display:'flex', alignItems:'flex-start',
                  justifyContent:'space-between',
                  padding:'1rem 0.25rem',
                  background:'none', border:'none', cursor:'pointer',
                  color:'inherit', textAlign:'left', gap:'1rem',
                }}
              >
                <div style={{ flex:1 }}>
                  <div style={{
                    display:'flex', alignItems:'center',
                    gap:'0.5rem', marginBottom:'0.25rem',
                  }}>
                    <span style={{ fontWeight:600, fontSize:'0.95rem' }}>
                      {sg.name}
                    </span>
                  </div>
                  <div style={{ fontSize:'0.8rem', opacity:0.5 }}>
                    {sg.name} measures {sg.criteria.length} aspects
                    relevant to the {bkt.label.toLowerCase()} bucket.
                  </div>
                </div>
                <div style={{
                  fontSize:'0.75rem', opacity:0.45,
                  whiteSpace:'nowrap', paddingTop:'0.25rem',
                  display:'flex', alignItems:'center', gap:'0.75rem',
                }}>
                  <span>{sg.criteria.length} criteria</span>
                  <span>{open ? '∧' : '∨'}</span>
                </div>
              </button>

              {open && (
                <div style={{ paddingBottom:'1rem' }}>
                  {sg.criteria.map((cr, ci) => (
                    <div key={ci} style={{
                      border:'1px solid currentColor',
                      borderRadius:'4px',
                      padding:'0.9rem 1rem',
                      marginBottom:'0.6rem',
                      opacity:0.85,
                    }}>
                      <div style={{
                        display:'flex', alignItems:'center',
                        gap:'0.5rem', marginBottom:'0.35rem',
                        flexWrap:'wrap',
                      }}>
                        <span style={{ fontWeight:600, fontSize:'0.88rem' }}>
                          {cr.name}
                        </span>
                        <InfoIcon name={cr.name} />
                        {cr.isCritical && (
                          <span style={{
                            fontSize:'0.58rem', fontWeight:700,
                            textTransform:'uppercase', letterSpacing:'0.06em',
                            border:'1px solid #2F5496', color:'#2F5496',
                            padding:'1px 4px', borderRadius:'2px',
                            whiteSpace:'nowrap',
                          }}>
                            Critical
                          </span>
                        )}
                        <span style={{
                          fontSize:'0.65rem', fontWeight:600,
                          textTransform:'uppercase', letterSpacing:'0.05em',
                          opacity:0.4,
                        }}>
                          {cr.mode}
                        </span>
                      </div>

                      <div style={{
                        fontSize:'0.78rem', opacity:0.5,
                        fontStyle:'italic', marginBottom:'0.6rem',
                      }}>
                        Assesses {cr.name.toLowerCase()} relative to band thresholds.
                      </div>

                      <div style={{
                        display:'flex', gap:'0.4rem',
                        flexWrap:'wrap', marginBottom:'0.5rem',
                      }}>
                        <span style={chipStyle('green')}>Verity Pass {cr.green}</span>
                        <span style={chipStyle('amber')}>Verity Improve {cr.amber}</span>
                        <span style={chipStyle('red')}>Verity Fail {cr.red}</span>
                      </div>

                      <div style={{ fontSize:'0.72rem', opacity:0.4 }}>
                        Sources accepted: {cr.source}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  const activeBucketMeta = activeBucket ? BUCKETS.find((b) => b.id === activeBucket) : null;
  const activeGroupMeta = activeBucket && activeGroup
    ? (SIGNAL_GROUPS[activeBucket] || []).find((g) => g.id === activeGroup)
    : null;

  const crumbBtn = {
    background:'none',
    border:'none',
    cursor:'pointer',
    color:'inherit',
    padding:0,
    font:'inherit',
    opacity:0.85,
  };

  return (
    <div className="vs-detail">

      <div className="vs-detail-bar">
        <button type="button" className="vs-back" onClick={goBack}>
          <span className="vs-back-arrow">←</span> Portfolio
        </button>
        <div className="vs-breadcrumb">
          <span>Portfolio</span>
          <span className="vs-bc-sep">/</span>
          <span className="vs-bc-current">Governance Intelligence</span>
        </div>
      </div>

      <header className="vs-detail-hero" style={{
        paddingBottom:'1.5rem',
        display:'flex',
        justifyContent:'space-between',
        alignItems:'flex-start',
        gap:'1rem',
      }}>
        <div className="vs-detail-hero-left">
          <span className="vs-eyebrow">Intelligence</span>
          <h1 className="vs-detail-title">Governance Intelligence — 31 Standard Signals</h1>
          <p style={{ opacity:0.6, maxWidth:'520px', lineHeight:1.6, marginTop:'0.5rem' }}>
            Reference for what each signal measures and what evidence is required.
          </p>
        </div>
        <div style={{ display:'flex', gap:'0.5rem', flexShrink:0 }}>
          <button
            type="button"
            onClick={() => { setView('cards'); setActiveBucket(null); setActiveGroup(null); }}
            style={{
              border: view === 'cards' ? '1px solid currentColor' : '1px solid transparent',
              borderRadius:'3px',
              background:'transparent',
              color:'inherit',
              padding:'0.35rem 0.65rem',
              fontSize:'0.78rem',
              fontWeight:600,
              cursor:'pointer',
              opacity: view === 'cards' ? 1 : 0.45,
            }}
          >
            Card view
          </button>
          <button
            type="button"
            onClick={() => setView('flat')}
            style={{
              border: view === 'flat' ? '1px solid currentColor' : '1px solid transparent',
              borderRadius:'3px',
              background:'transparent',
              color:'inherit',
              padding:'0.35rem 0.65rem',
              fontSize:'0.78rem',
              fontWeight:600,
              cursor:'pointer',
              opacity: view === 'flat' ? 1 : 0.45,
            }}
          >
            List view
          </button>
        </div>
      </header>

      {view === 'flat' && (
      <>

      <div style={{ marginBottom:'2rem' }}>
        <input
          type="text"
          placeholder="Search signals or criteria..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            border:'1px solid currentColor', borderRadius:'3px',
            background:'transparent', color:'inherit',
            padding:'0.4rem 0.75rem', fontSize:'0.85rem',
            opacity:0.8, width:'280px',
          }}
        />
      </div>

      <div style={{ display:'flex', gap:'0.5rem', marginBottom:'2.5rem', flexWrap:'wrap' }}>
        {[{ id:'all', label:'All buckets' }, ...BUCKETS].map((b) => (
          <button key={b.id} type="button" onClick={() => setFilterBucket(b.id)} style={{
            border: `1px solid ${filterBucket === b.id ? 'var(--arkas-navy)' : 'currentColor'}`,
            borderRadius:'3px',
            background: filterBucket === b.id ? 'var(--arkas-navy)' : 'transparent',
            color: filterBucket === b.id ? '#ffffff' : 'inherit',
            padding:'0.3rem 0.8rem',
            fontSize:'0.78rem',
            fontWeight:600,
            cursor:'pointer',
            opacity: filterBucket === b.id ? 1 : 0.5,
          }}>
            {b.label || b.id}
          </button>
        ))}
      </div>

      {bucketsToShow.map((bkt) => {
        const signals = filtered.filter((s) => s.bucket === bkt.id);
        if (signals.length === 0) return null;
        return renderSignalSection(bkt, signals, bkt.id, false);
      })}

      </>
      )}

      {view === 'cards' && (
      <>

      {activeBucket !== null && activeGroup === null && (
        <div style={{ marginBottom:'1.25rem' }}>
          <button
            type="button"
            className="vs-back"
            onClick={() => setActiveBucket(null)}
            style={{ marginBottom:'0.75rem' }}
          >
            <span className="vs-back-arrow">←</span> Back
          </button>
          <div className="vs-breadcrumb" style={{ flexWrap:'wrap' }}>
            <button
              type="button"
              style={crumbBtn}
              onClick={() => { setActiveBucket(null); setActiveGroup(null); }}
            >
              Taxonomy
            </button>
            <span className="vs-bc-sep">/</span>
            <span className="vs-bc-current">{activeBucketMeta ? activeBucketMeta.label : activeBucket}</span>
          </div>
        </div>
      )}

      {activeBucket !== null && activeGroup !== null && activeGroupMeta && (
        <div style={{ marginBottom:'1.25rem' }}>
          <button
            type="button"
            className="vs-back"
            onClick={() => setActiveGroup(null)}
            style={{ marginBottom:'0.75rem' }}
          >
            <span className="vs-back-arrow">←</span> Back
          </button>
          <div className="vs-breadcrumb" style={{ flexWrap:'wrap' }}>
            <button
              type="button"
              style={crumbBtn}
              onClick={() => { setActiveBucket(null); setActiveGroup(null); }}
            >
              Taxonomy
            </button>
            <span className="vs-bc-sep">/</span>
            <button
              type="button"
              style={crumbBtn}
              onClick={() => setActiveGroup(null)}
            >
              {activeBucketMeta ? activeBucketMeta.label : activeBucket}
            </button>
            <span className="vs-bc-sep">/</span>
            <span className="vs-bc-current">{activeGroupMeta.label}</span>
          </div>
        </div>
      )}

      {activeBucket === null && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.5rem',
          maxWidth: '720px',
        }}>
          {TAXONOMY.map((tx) => (
            <div
              key={tx.id}
              role="button"
              tabIndex={0}
              onClick={() => setActiveBucket(tx.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveBucket(tx.id);
                }
              }}
              style={{
                border: '1px solid currentColor',
                borderRadius: '6px',
                padding: '1.5rem',
                cursor: 'pointer',
                opacity: 0.85,
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = 1; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = 0.85; }}
            >
              <div style={{ fontWeight: 700, fontSize: '1.2rem',
                marginBottom: '0.4rem' }}>
                {tx.name}
              </div>
              <div style={{ fontSize: '0.82rem', opacity: 0.55,
                lineHeight: 1.5, marginBottom: '0.75rem' }}>
                {tx.blurb}
              </div>
              <div style={{ fontSize: '0.72rem', opacity: 0.4,
                fontWeight: 600, textTransform: 'uppercase',
                letterSpacing: '0.05em' }}>
                {tx.signals.length} signals
                · {(SIGNAL_GROUPS[tx.id] || []).length} groups
              </div>
            </div>
          ))}
        </div>
      )}

      {activeBucket !== null && activeGroup === null && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.25rem',
          maxWidth: '720px',
        }}>
          {(SIGNAL_GROUPS[activeBucket] || []).map((group) => (
            <div
              key={group.id}
              role="button"
              tabIndex={0}
              onClick={() => setActiveGroup(group.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveGroup(group.id);
                }
              }}
              style={{
                border: '1px solid currentColor',
                borderRadius: '6px',
                padding: '1.25rem',
                cursor: 'pointer',
                opacity: 0.85,
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = 1; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = 0.85; }}
            >
              <div style={{ fontWeight: 700, fontSize: '1rem',
                marginBottom: '0.35rem' }}>
                {group.label}
              </div>
              <div style={{ fontSize: '0.8rem', opacity: 0.5,
                lineHeight: 1.5, marginBottom: '0.6rem' }}>
                {group.desc}
              </div>
              <div style={{ fontSize: '0.72rem', opacity: 0.4 }}>
                {group.signals.join('  ·  ')}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeBucket !== null && activeGroup !== null && activeGroupMeta && (() => {
        const group = activeGroupMeta;
        const bkt = BUCKETS.find((b) => b.id === activeBucket);
        const groupSignals = group.signals
          .map((name) => TAXONOMY_DATA.find((s) => s.name === name && s.bucket === activeBucket))
          .filter(Boolean);
        if (!bkt) return null;
        return renderSignalSection(
          bkt,
          groupSignals,
          `${activeBucket}-${activeGroup}`,
          true,
        );
      })()}

      </>
      )}

    </div>
  );
}

window.TaxonomyView = TaxonomyView;
