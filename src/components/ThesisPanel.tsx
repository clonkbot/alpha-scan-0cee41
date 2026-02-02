import type { Market } from '../App';

interface ThesisPanelProps {
  market: Market | null;
}

export function ThesisPanel({ market }: ThesisPanelProps) {
  if (!market) {
    return (
      <div className="thesis-panel empty">
        <div className="empty-state">
          <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="24" cy="24" r="20" />
            <path d="M24 14v10M24 30v2" />
          </svg>
          <p>Select a market to view thesis analysis</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`thesis-panel status-${market.status}`}>
      <div className="panel-header">
        <h3>THESIS ANALYSIS</h3>
        <span className={`verdict ${market.status}`}>
          {market.status === 'confirmed' && 'BULLISH'}
          {market.status === 'rejected' && 'NO EDGE'}
          {market.status === 'researching' && 'ANALYZING...'}
          {market.status === 'scanning' && 'PENDING'}
        </span>
      </div>

      <div className="market-summary">
        <h4>{market.title}</h4>
        <div className="summary-stats">
          <span>Current: {market.probability}%</span>
          <span>Volume: {market.volume}</span>
          <span>Alpha Score: {market.alpha}</span>
        </div>
      </div>

      {market.thesis ? (
        <div className="thesis-content">
          <div className="thesis-label">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
            </svg>
            Perplexity Research Output
          </div>
          <p className="thesis-text">{market.thesis}</p>

          <div className="confidence-meter">
            <span className="meter-label">CONFIDENCE</span>
            <div className="meter-bar">
              <div
                className="meter-fill"
                style={{ width: `${market.alpha}%` }}
              />
            </div>
            <span className="meter-value">{market.alpha}%</span>
          </div>

          {market.status === 'confirmed' && (
            <div className="action-section">
              <button className="action-btn primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 7l-5-5-5 5M17 17l-5 5-5-5" />
                </svg>
                TRADE ON POLYMARKET
              </button>
              <button className="action-btn secondary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
                </svg>
                EXPORT ANALYSIS
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="thesis-loading">
          {market.status === 'researching' && (
            <>
              <div className="loading-animation">
                <div className="pulse-ring" />
                <div className="pulse-ring" style={{ animationDelay: '0.5s' }} />
                <div className="pulse-ring" style={{ animationDelay: '1s' }} />
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="perplexity-icon">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <p>Perplexity is researching this market...</p>
              <span className="loading-subtitle">Analyzing sources, validating thesis</span>
            </>
          )}
          {market.status === 'scanning' && (
            <>
              <div className="scanning-indicator">
                <span />
                <span />
                <span />
              </div>
              <p>Waiting for initial scan...</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
