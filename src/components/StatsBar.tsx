interface StatsBarProps {
  totalMarkets: number;
  confirmedCount: number;
  avgAlpha: number;
  scanProgress: number;
}

export function StatsBar({ totalMarkets, confirmedCount, avgAlpha, scanProgress }: StatsBarProps) {
  return (
    <div className="stats-bar">
      <div className="stat-item">
        <span className="stat-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M9 21V9" />
          </svg>
        </span>
        <div className="stat-content">
          <span className="stat-number">{totalMarkets}</span>
          <span className="stat-label">Markets Scanned</span>
        </div>
      </div>

      <div className="stat-item highlight">
        <span className="stat-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <path d="M22 4L12 14.01l-3-3" />
          </svg>
        </span>
        <div className="stat-content">
          <span className="stat-number">{confirmedCount}</span>
          <span className="stat-label">Alpha Confirmed</span>
        </div>
      </div>

      <div className="stat-item">
        <span className="stat-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </span>
        <div className="stat-content">
          <span className="stat-number">{avgAlpha}</span>
          <span className="stat-label">Avg Alpha Score</span>
        </div>
      </div>

      <div className="stat-item progress">
        <span className="stat-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
        </span>
        <div className="stat-content">
          <span className="stat-number">{scanProgress}%</span>
          <span className="stat-label">Scan Progress</span>
        </div>
      </div>
    </div>
  );
}
