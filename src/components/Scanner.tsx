import { useEffect, useState } from 'react';

interface ScannerProps {
  isScanning: boolean;
  progress: number;
}

export function Scanner({ isScanning, progress }: ScannerProps) {
  const [dots, setDots] = useState<Array<{ x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const newDots = Array.from({ length: 12 }, () => ({
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      delay: Math.random() * 2,
    }));
    setDots(newDots);
  }, [isScanning]);

  return (
    <div className="scanner">
      <div className="scanner-display">
        <div className="radar-container">
          <div className="radar-grid">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="radar-ring" style={{ '--ring-index': i } as React.CSSProperties} />
            ))}
            <div className="radar-cross" />
          </div>

          {isScanning && <div className="radar-sweep" />}

          <div className="radar-dots">
            {dots.map((dot, i) => (
              <div
                key={i}
                className={`radar-dot ${isScanning ? 'pulsing' : ''}`}
                style={{
                  left: `${dot.x}%`,
                  top: `${dot.y}%`,
                  animationDelay: `${dot.delay}s`,
                }}
              />
            ))}
          </div>

          <div className="radar-center">
            <span className="progress-value">{progress}%</span>
          </div>
        </div>

        <div className="scanner-info">
          <div className="info-row">
            <span className="label">STATUS</span>
            <span className={`value ${isScanning ? 'active' : ''}`}>
              {isScanning ? 'SCANNING POLYMARKET' : 'SCAN COMPLETE'}
            </span>
          </div>
          <div className="info-row">
            <span className="label">MODE</span>
            <span className="value">ALPHA DETECTION</span>
          </div>
          <div className="info-row">
            <span className="label">RESEARCH</span>
            <span className="value">PERPLEXITY AI</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="scanner-log">
        <div className="log-header">
          <span className="terminal-prompt">$</span>
          <span>SYSTEM LOG</span>
        </div>
        <div className="log-entries">
          {progress > 10 && <LogEntry delay={0}>Initializing market scanner...</LogEntry>}
          {progress > 25 && <LogEntry delay={0.1}>Connected to Polymarket API</LogEntry>}
          {progress > 40 && <LogEntry delay={0.2}>Fetching active markets... [847 found]</LogEntry>}
          {progress > 55 && <LogEntry delay={0.3}>Filtering by volume threshold...</LogEntry>}
          {progress > 70 && <LogEntry delay={0.4}>Running alpha detection algorithm...</LogEntry>}
          {progress > 85 && <LogEntry delay={0.5}>Sending to Perplexity for deep research...</LogEntry>}
          {progress >= 100 && <LogEntry delay={0.6} success>Scan complete. 6 high-alpha markets identified.</LogEntry>}
        </div>
      </div>
    </div>
  );
}

function LogEntry({ children, delay, success }: { children: React.ReactNode; delay: number; success?: boolean }) {
  return (
    <div
      className={`log-entry ${success ? 'success' : ''}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <span className="timestamp">{new Date().toLocaleTimeString()}</span>
      <span className="message">{children}</span>
    </div>
  );
}
