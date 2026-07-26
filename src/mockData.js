// Mock data for the three trust tiers shown in the showcase.

export const mockUsers = {
  high: {
    score: 88,
    userName: 'Amara Osei',
    userRole: 'Member since 2021',
    badges: { address: 'verified', face: 'verified', category: 'verified', virtualInspection: 'verified' },
    breakdown: [
      { label: 'Identity', score: 94 },
      { label: 'Reputation', score: 88 },
      { label: 'Activity', score: 81 },
      { label: 'Compliance', score: 90 },
    ],
  },
  mid: {
    score: 54,
    userName: 'Dan Kovac',
    userRole: 'Member since 2024',
    badges: { address: 'verified', face: 'pending', category: 'verified', virtualInspection: 'unverified' },
    breakdown: [
      { label: 'Identity', score: 71 },
      { label: 'Reputation', score: 48 },
      { label: 'Activity', score: 57 },
      { label: 'Compliance', score: 44 },
    ],
  },
  low: {
    score: 23,
    userName: 'Riley Fox',
    userRole: 'Joined this month',
    badges: { address: 'pending', face: 'unverified', category: 'unverified', virtualInspection: 'unverified' },
    breakdown: [
      { label: 'Identity', score: 34 },
      { label: 'Reputation', score: 12 },
      { label: 'Activity', score: 28 },
      { label: 'Compliance', score: 19 },
    ],
  },
};
