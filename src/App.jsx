import TrustScoreCard from './components/TrustScoreCard.jsx';
import { mockUsers } from './mockData.js';

export default function App() {
  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">Trust Score Display Card</div>
        <div className="page-subtitle">
          Three score tiers, with verified / pending / unverified badge states across the examples.
        </div>
      </div>
      <div className="showcase-row">
        <div className="showcase-col">
          <div className="tier-label tier-label--high">HIGH · 70–100</div>
          <TrustScoreCard {...mockUsers.high} />
        </div>
        <div className="showcase-col">
          <div className="tier-label tier-label--moderate">MODERATE · 40–69</div>
          <TrustScoreCard {...mockUsers.mid} />
        </div>
        <div className="showcase-col">
          <div className="tier-label tier-label--low">LOW · 0–39</div>
          <TrustScoreCard {...mockUsers.low} />
        </div>
      </div>
    </div>
  );
}
