import type { Market } from '../App';

interface MarketCardProps {
  market: Market;
  index: number;
  onClick: () => void;
  isSelected: boolean;
}

export function MarketCard({ market, index, onClick, isSelected }: MarketCardProps) {
  const statusColors: Record<Market['status'], string> = {
    scanning: 'var(--color-scanning)',
    researching: 'var(--color-researching)',
    confirmed: 'var(--color-confirmed)',
    rejected: 'var(--color-rejected)',
  };

  const statusLabels: Record<Market['status'], string> = {
    scanning: 'SCANNING',
    researching: 'RESEARCHING',
    confirmed: 'CONFIRMED',
    rejected: 'REJECTED',
  };

  return (
    <div
      className={`market-card ${isSelected ? 'selected' : ''} status-${market.status}`}
      onClick={onClick}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="card-header">
        <span
          className="status-badge"
          style={{ '--status-color': statusColors[market.status] } as React.CSSProperties}
        >
          <span className="status-dot" />
          {statusLabels[market.status]}
        </span>
        <span className="category">{market.category}</span>
      </div>

      <h3 className="market-title">{market.title}</h3>

      <div className="market-stats">
        <div className="stat">
          <span className="stat-label">PROB</span>
          <span className="stat-value">{market.probability}%</span>
        </div>
        <div className="stat">
          <span className="stat-label">VOLUME</span>
          <span className="stat-value">{market.volume}</span>
        </div>
        <div className="stat alpha">
          <span className="stat-label">ALPHA</span>
          <div className="alpha-bar">
            <div
              className="alpha-fill"
              style={{ width: `${market.alpha}%` }}
            />
            <span className="alpha-value">{market.alpha}</span>
          </div>
        </div>
      </div>

      {market.status === 'confirmed' && (
        <div className="confirmed-indicator">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          ALPHA DETECTED
        </div>
      )}

      {market.status === 'rejected' && (
        <div className="rejected-indicator">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
          NO EDGE
        </div>
      )}

      <div className="card-glow" />
    </div>
  );
}
