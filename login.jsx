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
                {showPassword ? (
                  <svg
                    className="vs-login-eye-svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.53 13.53 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <line x1="2" y1="2" x2="22" y2="22" />
                  </svg>
                ) : (
                  <svg
                    className="vs-login-eye-svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
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
