import { useEffect, useState } from 'react';
import './TrustScoreCard.css';

const TIERS = [
  { min: 70, label: 'Highly Trusted', short: 'High', color: 'oklch(0.5 0.14 152)', soft: 'oklch(0.95 0.035 152)' },
  { min: 40, label: 'Moderately Trusted', short: 'Moderate', color: 'oklch(0.57 0.13 70)', soft: 'oklch(0.96 0.045 85)' },
  { min: 0, label: 'Low Trust', short: 'Low', color: 'oklch(0.52 0.17 27)', soft: 'oklch(0.95 0.025 27)' },
];

function tierOf(score) {
  return TIERS.find((t) => score >= t.min);
}

const BADGE_DEFS = [
  { key: 'address', label: 'Address', icon: 'M4 9.5L10 4l6 5.5V16h-3.5v-4h-5v4H4z' },
  { key: 'face', label: 'Face', icon: 'M10 9.5a3 3 0 100-6 3 3 0 000 6zM4.5 16.5a5.5 5.5 0 0111 0' },
  { key: 'category', label: 'Category', icon: 'M4 4h5v5H4zM11 4h5v5h-5zM4 11h5v5H4zM11 11h5v5h-5z' },
  { key: 'virtualInspection', label: 'Virtual Inspection', icon: 'M2.5 7h9v6h-9zM11.5 10l5-2.5v5l-5-2.5' },
];

const STATE_META = {
  verified: { label: 'Verified', color: 'oklch(0.48 0.14 152)', icon: 'M5 10.5l3.5 3.5L15 7' },
  pending: { label: 'Pending', color: 'oklch(0.55 0.13 70)', icon: 'M10 6v4.2l2.8 1.8M17 10a7 7 0 11-14 0 7 7 0 0114 0' },
  unverified: { label: 'Not verified', color: 'oklch(0.55 0.02 250)', icon: 'M6.5 10h7M17 10a7 7 0 11-14 0 7 7 0 0114 0' },
};

const RING_RADIUS = 62;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function Icon({ size, path, stroke, strokeWidth }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
      <path d={path} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ScoreGauge({ score, tier }) {
  const [dash, setDash] = useState(RING_CIRCUMFERENCE);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setDash(RING_CIRCUMFERENCE * (1 - score / 100));
    });
    return () => cancelAnimationFrame(frame);
  }, [score]);

  return (
    <div className="trust-card__gauge-section">
      <div
        className="trust-card__gauge"
        role="img"
        aria-label={`Trust score ${score} out of 100, ${tier.label}`}
      >
        <svg width="168" height="168" viewBox="0 0 168 168">
          <circle cx="84" cy="84" r={RING_RADIUS} fill="none" stroke="oklch(0.94 0.005 250)" strokeWidth="12" />
          <circle
            className="trust-card__gauge-ring"
            cx="84"
            cy="84"
            r={RING_RADIUS}
            fill="none"
            stroke={tier.color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={dash}
          />
        </svg>
        <div className="trust-card__gauge-text">
          <div className="trust-card__score">{score}</div>
          <div className="trust-card__score-label">OUT OF 100</div>
        </div>
      </div>
      <div className="trust-card__tier-label" style={{ color: tier.color }}>{tier.label}</div>
    </div>
  );
}

function VerificationBadges({ badges }) {
  return (
    <div className="trust-card__section">
      <div className="trust-card__section-title">VERIFICATION</div>
      <div className="trust-card__badges">
        {BADGE_DEFS.map((def) => {
          const meta = STATE_META[badges[def.key]] || STATE_META.unverified;
          return (
            <div className="trust-card__badge" key={def.key}>
              <div className="trust-card__badge-top">
                <Icon size={18} path={def.icon} stroke="oklch(0.45 0.02 250)" strokeWidth={1.5} />
                <span className="trust-card__badge-label">{def.label}</span>
              </div>
              <div className="trust-card__badge-state">
                <Icon size={14} path={meta.icon} stroke={meta.color} strokeWidth={2} />
                <span className="trust-card__badge-state-label" style={{ color: meta.color }}>{meta.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ScoreBreakdown({ rows }) {
  return (
    <div className="trust-card__section">
      <div className="trust-card__section-title">SCORE BREAKDOWN</div>
      <div className="trust-card__breakdown">
        {rows.map((row) => {
          const score = Math.max(0, Math.min(100, Math.round(row.score)));
          const color = tierOf(score).color;
          return (
            <div className="trust-card__breakdown-row" key={row.label}>
              <div className="trust-card__breakdown-top">
                <span className="trust-card__breakdown-label">{row.label}</span>
                <span className="trust-card__breakdown-score">{score}</span>
              </div>
              <div className="trust-card__breakdown-track">
                <div className="trust-card__breakdown-fill" style={{ width: `${score}%`, background: color }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Trust score display card: circular score gauge, tier badge, per-category
 * verification badges, and a score breakdown.
 *
 * @param {number} score - 0-100
 * @param {string} userName
 * @param {string} userRole
 * @param {string} [avatarUrl]
 * @param {{address?: 'verified'|'pending'|'unverified', face?: 'verified'|'pending'|'unverified', category?: 'verified'|'pending'|'unverified', virtualInspection?: 'verified'|'pending'|'unverified'}} badges
 * @param {{label: string, score: number}[]} breakdown
 */
export default function TrustScoreCard({ score, userName, userRole, avatarUrl, badges = {}, breakdown = [] }) {
  const clampedScore = Math.max(0, Math.min(100, Math.round(score)));
  const tier = tierOf(clampedScore);
  const initials = userName.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();

  return (
    <div className="trust-card">
      <div className="trust-card__header">
        {avatarUrl ? (
          <img className="trust-card__avatar" src={avatarUrl} alt="" />
        ) : (
          <div className="trust-card__initials">{initials}</div>
        )}
        <div className="trust-card__identity">
          <div className="trust-card__name">{userName}</div>
          <div className="trust-card__role">{userRole}</div>
        </div>
        <div className="trust-card__tier-pill" style={{ background: tier.soft }}>
          <span className="trust-card__tier-dot" style={{ background: tier.color }} />
          <span className="trust-card__tier-short" style={{ color: tier.color }}>{tier.short}</span>
        </div>
      </div>

      <ScoreGauge score={clampedScore} tier={tier} />
      <VerificationBadges badges={badges} />
      <ScoreBreakdown rows={breakdown} />
    </div>
  );
}
