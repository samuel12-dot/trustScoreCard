# Trust Score Card

A reusable React component displaying a user's trust score (0–100): a circular
score gauge, a tier badge (High / Moderate / Low), per-category verification
badges (Address, Face, Category, Virtual Inspection), and a score breakdown by
category.

## Getting started

```bash
npm install
npm run dev
```

This opens the showcase page with three mock examples across the High
(70–100), Moderate (40–69), and Low (0–39) trust tiers.

## Usage

```jsx
import TrustScoreCard from './components/TrustScoreCard.jsx';

<TrustScoreCard
  score={88}
  userName="Amara Osei"
  userRole="Member since 2021"
  badges={{ address: 'verified', face: 'verified', category: 'verified', virtualInspection: 'verified' }}
  breakdown={[
    { label: 'Identity', score: 94 },
    { label: 'Reputation', score: 88 },
    { label: 'Activity', score: 81 },
    { label: 'Compliance', score: 90 },
  ]}
/>
```

### Props

| Prop        | Type                                              | Description                                  |
| ----------- | -------------------------------------------------| --------------------------------------------- |
| `score`     | `number`                                          | 0–100                                         |
| `userName`  | `string`                                          | Display name (also used to derive initials)   |
| `userRole`  | `string`                                          | Subtitle under the name                       |
| `avatarUrl` | `string` (optional)                               | Falls back to initials when omitted           |
| `badges`    | `{ address?, face?, category?, virtualInspection? }` each `'verified' \| 'pending' \| 'unverified'` | Verification badge states |
| `breakdown` | `{ label: string, score: number }[]`              | Category score breakdown bars                 |

## Files

- `src/components/TrustScoreCard.jsx` / `.css` — the reusable component
- `src/mockData.js` — mock data for the three tiers shown in the showcase
- `src/App.jsx` — showcase page
