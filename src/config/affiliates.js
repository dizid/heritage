/**
 * Affiliate Program Configuration (via Travelpayouts)
 *
 * Get your credentials from your Travelpayouts dashboard:
 * 1. Log in to Travelpayouts
 * 2. Go to Profile → API Token & Marker ID
 * 3. Replace the values below
 */
export const affiliateConfig = {
  travelpayouts: {
    enabled: true,
    marker: 'YOUR_MARKER_ID',      // Your Travelpayouts Marker ID
    // Travelpayouts redirect URL for affiliate tracking
    redirectBase: 'https://tp.media/r',
    // Trip.com program ID in Travelpayouts (hotels)
    tripcomProgramId: '4114',
  }
}
