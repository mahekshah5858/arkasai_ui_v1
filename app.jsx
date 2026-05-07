// App shell — routing between portfolio, project detail,
// thresholds, taxonomy, and settings

const TWEAK_DEFAULTS = {
  "colorMode": "editorial",
  "showTrendLines": true,
  "compactCards": false
};

const PALETTES = {
  editorial: {
    accelerate: 'oklch(58% 0.13 155)',
    rescue:     'oklch(72% 0.13 75)',
    kill:       'oklch(52% 0.14 25)',
  },
  traffic: {
    accelerate: 'oklch(64% 0.18 145)',
    rescue:     'oklch(78% 0.16 80)',
    kill:       'oklch(56% 0.20 25)',
  },
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = React.useState({ name: 'landing' });
  const [landingHash, setLandingHash] = React.useState('');

  // P6 demo — start with 5 projects, P6 added via demo flow
  const [projects, setProjects] = React.useState(
    window.VS.PROJECTS.filter(p => !p.is_demo)
  );

  React.useEffect(() => {
    document.documentElement.setAttribute('data-color-mode', t.colorMode);
    document.documentElement.setAttribute('data-density', t.compactCards ? 'compact' : 'regular');
  }, [t.colorMode, t.compactCards]);

  const palette = PALETTES[t.colorMode] || PALETTES.editorial;

  const protectedRouteNames = React.useMemo(
    () => new Set(['portfolio', 'project', 'thresholds', 'taxonomy', 'settings', 'intake']),
    []
  );

  React.useEffect(() => {
    if (protectedRouteNames.has(route.name) && !isVerityAuthed()) {
      setRoute({ name: 'login' });
    }
  }, [route.name, protectedRouteNames]);

  // Navigation
  const goToLogin = React.useCallback(() => {
    setRoute({ name: 'login' });
    window.scrollTo({ top: 0 });
  }, []);

  const goToProject    = (id, openSignal) => {
    if (!isVerityAuthed()) {
      goToLogin();
      return;
    }
    setRoute({ name: 'project', id, openSignal: openSignal || null });
    window.scrollTo({ top: 0 });
  };
  const goToThresholds = () => {
    if (!isVerityAuthed()) {
      goToLogin();
      return;
    }
    setRoute({ name: 'thresholds' });
    window.scrollTo({ top: 0 });
  };
  const goToTaxonomy   = () => {
    if (!isVerityAuthed()) {
      goToLogin();
      return;
    }
    setRoute({ name: 'taxonomy' });
    window.scrollTo({ top: 0 });
  };
  const goToSettings   = () => {
    if (!isVerityAuthed()) {
      goToLogin();
      return;
    }
    setRoute({ name: 'settings' });
    window.scrollTo({ top: 0 });
  };
  const goToIntake     = () => {
    if (!isVerityAuthed()) {
      goToLogin();
      return;
    }
    setRoute({ name: 'intake' });
    window.scrollTo({ top: 0 });
  };
  const goToPortfolio  = ()   => {
    if (!isVerityAuthed()) {
      goToLogin();
      return;
    }
    setLandingHash('');
    setRoute({ name: 'portfolio' });
    window.scrollTo({ top: 0 });
  };
  const goToLanding = React.useCallback((hash = '') => {
    setLandingHash(typeof hash === 'string' ? hash : '');
    setRoute({ name: 'landing' });
    window.scrollTo({ top: 0 });
  }, []);
  const goBack         = goToPortfolio;

  // Demo helpers
  const addDemoProject = React.useCallback(() => {
    const p6 = window.VS.PROJECTS.find(p => p.id === 'P6');
    if (p6 && !projects.find(p => p.id === 'P6')) {
      setProjects(prev => [...prev, p6]);
    }
  }, [projects]);

  const resetDemo = React.useCallback(() => {
    setProjects(window.VS.PROJECTS.filter(p => !p.is_demo));
    setLandingHash('');
    if (!isVerityAuthed()) {
      setRoute({ name: 'login' });
      window.scrollTo({ top: 0 });
      return;
    }
    setRoute({ name: 'portfolio' });
    window.scrollTo({ top: 0 });
  }, []);

  // Expose on window.VS so other components can call them
  React.useEffect(() => {
    window.VS.addDemoProject = addDemoProject;
    window.VS.resetDemo = resetDemo;
  }, [addDemoProject, resetDemo]);

  const navProps = { goToThresholds, goToTaxonomy, goToSettings };

  const main =
    route.name === 'landing' ? (
      <LandingPageView onEnterApp={goToPortfolio} landingHash={landingHash} />
    ) : route.name === 'login' ? (
      <LoginView onSuccess={goToPortfolio} />
    ) : route.name === 'portfolio' ? (
      <PortfolioView
        projects={projects}
        goToProject={goToProject}
        goToIntake={goToIntake}
        palette={palette}
        {...navProps}
      />
    ) : route.name === 'project' ? (
      <ProjectDetailView
        projects={projects}
        setProjects={setProjects}
        projectId={route.id}
        initialOpenSignal={route.openSignal || null}
        goBack={goBack}
        palette={palette}
      />
    ) : route.name === 'thresholds' ? (
      <ThresholdsView goBack={goBack} palette={palette} />
    ) : route.name === 'taxonomy' ? (
      <TaxonomyView goBack={goBack} palette={palette} />
    ) : route.name === 'settings' ? (
      <SettingsView goBack={goBack} palette={palette} resetDemo={resetDemo} />
    ) : route.name === 'intake' ? (
      <IntakeView
        goBack={goBack}
        palette={palette}
        onComplete={() => {
          window.VS.addDemoProject();
          goToProject('P6');
        }}
      />
    ) : (
      <PortfolioView
        projects={projects}
        goToProject={goToProject}
        goToIntake={goToIntake}
        palette={palette}
        {...navProps}
      />
    );

  return (
    <div className="vs-app">
      {route.name !== 'landing' && (
        <AppTopNav goToLanding={goToLanding} enterVerity={goToPortfolio} />
      )}
      {route.name === 'landing' ? main : <div className="vs-shell">{main}</div>}
      {route.name !== 'landing' && route.name !== 'login' && (
      <TweaksPanel title="Tweaks">
        <TweakSection label="Color treatment" />
        <TweakRadio
          label="Verdict palette"
          value={t.colorMode}
          options={[
            { value: 'editorial', label: 'Editorial' },
            { value: 'traffic',   label: 'Traffic-light' },
          ]}
          onChange={(v) => setTweak('colorMode', v)}
        />
        <TweakSection label="Layout" />
        <TweakToggle
          label="Compact project cards"
          value={t.compactCards}
          onChange={(v) => setTweak('compactCards', v)}
        />
        <TweakSection label="Navigation" />
        <TweakSelect
          label="Jump to project"
          value={route.name === 'project' ? route.id : ''}
          options={[
            { value: '', label: '— Portfolio overview —' },
            ...projects.map(p => ({ value: p.id, label: p.name })),
          ]}
          onChange={(v) => v ? goToProject(v) : goBack()}
        />
      </TweaksPanel>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
