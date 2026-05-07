// Demo gate: static credentials. Replace with real auth for production.

const VERITY_DEMO_AUTH_KEY = 'verity_demo_authed';
const VERITY_DEMO_USER = 'arkasai';
const VERITY_DEMO_PASS = 'Admin@123';

function isVerityAuthed() {
  return sessionStorage.getItem(VERITY_DEMO_AUTH_KEY) === '1';
}

function setVerityAuthed(on) {
  if (on) sessionStorage.setItem(VERITY_DEMO_AUTH_KEY, '1');
  else sessionStorage.removeItem(VERITY_DEMO_AUTH_KEY);
}

function LoginView({ onSuccess }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState('');

  const submit = (e) => {
    e.preventDefault();
    setError('');
    const u = (username || '').trim();
    const p = password || '';
    if (u === VERITY_DEMO_USER && p === VERITY_DEMO_PASS) {
      setVerityAuthed(true);
      onSuccess();
      return;
    }
    setError('Invalid username or password.');
  };

  return (
    <div className="vs-login-page">
      <div className="vs-login-inner">
        <div className="vs-login-intro">
          <span className="vs-eyebrow">Verity Signal</span>
          <h1 className="vs-login-title">Sign in to the portfolio</h1>
          <p className="vs-login-sub">
            Enterprise AI portfolio review — analytical view for authorized users.
          </p>
        </div>
        <form className="vs-login-form" onSubmit={submit}>
          <div className="vs-login-form-title">Sign in</div>
          {error ? <div className="vs-login-error" role="alert">{error}</div> : null}
          <div className="vs-login-field">
            <label className="vs-login-label" htmlFor="verity-user">Username</label>
            <input
              id="verity-user"
              className="vs-login-input"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="vs-login-field">
            <label className="vs-login-label" htmlFor="verity-pass">Password</label>
            <div className="vs-login-password-wrap">
              <input
                id="verity-pass"
                className="vs-login-input vs-login-input--with-toggle"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="vs-login-toggle-pass"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show password'}
              </button>
            </div>
          </div>
          <button type="submit" className="vs-login-submit">
            Continue to Verity Signal
          </button>
        </form>
      </div>
    </div>
  );
}
