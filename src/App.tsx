import { useState, useEffect } from 'react';
import { Scanner } from './components/Scanner';
import { MarketCard } from './components/MarketCard';
import { ThesisPanel } from './components/ThesisPanel';
import { StatsBar } from './components/StatsBar';
import './styles.css';

export interface Market {
  id: string;
  title: string;
  probability: number;
  volume: string;
  alpha: number;
  category: string;
  status: 'scanning' | 'researching' | 'confirmed' | 'rejected';
  thesis?: string;
}

const MOCK_MARKETS: Market[] = [
  { id: '1', title: 'Will Bitcoin reach $150k by end of 2025?', probability: 32, volume: '$4.2M', alpha: 87, category: 'Crypto', status: 'confirmed', thesis: 'Historical halving cycles suggest strong upward momentum. ETF inflows accelerating. Macro conditions favorable with Fed pivot expected.' },
  { id: '2', title: 'Trump wins 2024 election?', probability: 48, volume: '$12.8M', alpha: 62, category: 'Politics', status: 'researching' },
  { id: '3', title: 'GPT-5 released before July 2025?', probability: 24, volume: '$890K', alpha: 91, category: 'AI', status: 'confirmed', thesis: 'OpenAI internal sources indicate Q2 target. Compute scaling on track. Regulatory approval already obtained in key markets.' },
  { id: '4', title: 'Ethereum flips Bitcoin market cap?', probability: 8, volume: '$2.1M', alpha: 45, category: 'Crypto', status: 'rejected', thesis: 'Network effects too strong. Bitcoin institutional adoption outpacing ETH. No clear catalyst for flip scenario.' },
  { id: '5', title: 'Fed cuts rates in March 2025?', probability: 67, volume: '$5.6M', alpha: 78, category: 'Finance', status: 'scanning' },
  { id: '6', title: 'SpaceX Starship reaches orbit?', probability: 89, volume: '$1.4M', alpha: 34, category: 'Space', status: 'confirmed', thesis: 'Recent test success. Hardware iteration rapid. FAA approvals secured. High confidence trajectory.' },
];

function App() {
  const [markets, setMarkets] = useState<Market[]>(MOCK_MARKETS);
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            setIsScanning(false);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isScanning]);

  const handleRescan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setMarkets(prev => prev.map(m => ({ ...m, status: 'scanning' as const })));

    // Simulate progressive status updates
    setTimeout(() => {
      setMarkets(prev => prev.map((m, i) =>
        i < 2 ? { ...m, status: 'researching' as const } : m
      ));
    }, 2000);

    setTimeout(() => {
      setMarkets(MOCK_MARKETS);
    }, 5000);
  };

  const confirmedCount = markets.filter(m => m.status === 'confirmed').length;
  const avgAlpha = Math.round(markets.reduce((acc, m) => acc + m.alpha, 0) / markets.length);

  return (
    <div className="app">
      <div className="scan-lines" />
      <div className="noise-overlay" />

      <header className="header">
        <div className="logo-section">
          <div className="logo-icon">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" />
              <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1" opacity="0.5" />
              <circle cx="20" cy="20" r="6" stroke="currentColor" strokeWidth="1" opacity="0.3" />
              <line x1="20" y1="2" x2="20" y2="38" stroke="currentColor" strokeWidth="1" opacity="0.2" />
              <line x1="2" y1="20" x2="38" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.2" />
            </svg>
          </div>
          <div className="logo-text">
            <h1>ALPHA<span className="accent">SCAN</span></h1>
            <p className="tagline">Polymarket Intelligence System</p>
          </div>
        </div>
        <div className="header-right">
          <div className="status-indicator">
            <span className={`dot ${isScanning ? 'scanning' : 'ready'}`} />
            <span>{isScanning ? 'SCANNING' : 'READY'}</span>
          </div>
          <button className="rescan-btn" onClick={handleRescan} disabled={isScanning}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12a9 9 0 11-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
            </svg>
            RESCAN
          </button>
        </div>
      </header>

      <StatsBar
        totalMarkets={markets.length}
        confirmedCount={confirmedCount}
        avgAlpha={avgAlpha}
        scanProgress={scanProgress}
      />

      <main className="main">
        <section className="scanner-section">
          <Scanner isScanning={isScanning} progress={scanProgress} />
        </section>

        <section className="markets-section">
          <div className="section-header">
            <h2>DETECTED MARKETS</h2>
            <span className="count">{markets.length} active</span>
          </div>
          <div className="markets-grid">
            {markets.map((market, index) => (
              <MarketCard
                key={market.id}
                market={market}
                index={index}
                onClick={() => setSelectedMarket(market)}
                isSelected={selectedMarket?.id === market.id}
              />
            ))}
          </div>
        </section>

        <section className="thesis-section">
          <ThesisPanel market={selectedMarket} />
        </section>
      </main>

      <footer className="footer">
        <span>Requested by <a href="https://twitter.com/0xmhl" target="_blank" rel="noopener noreferrer">@0xmhl</a> · Built by <a href="https://twitter.com/clonkbot" target="_blank" rel="noopener noreferrer">@clonkbot</a></span>
      </footer>
    </div>
  );
}

export default App;
