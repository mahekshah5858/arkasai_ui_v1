// Marketing page served as standalone HTML inside an iframe

function LandingPageView({ onEnterApp, landingHash }) {
  const src = 'ArkasAI%20landing%20page.html' + (landingHash || '');

  React.useEffect(() => {
    const onMsg = (e) => {
      if (e.data && e.data.type === 'verity-open-demo') onEnterApp();
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, [onEnterApp]);

  return (
    <div className="vs-landing">
      <iframe
        key={landingHash || '_'}
        className="vs-landing-frame"
        title="Verity Signal — Overview"
        src={src}
      />
    </div>
  );
}
