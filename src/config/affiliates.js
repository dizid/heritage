/**
 * Affiliate Program Configuration
 *
 * Replace YOUR_AFFILIATE_ID with your actual Trip.com partner ID
 * after signing up at https://www.trip.com/partners
 */
export const affiliateConfig = {
  tripcom: {
    enabled: true,
    affiliateId: 'YOUR_AFFILIATE_ID',
    baseUrl: 'https://www.trip.com',
    trackingParam: 'Allianceid',
    subTrackingParam: 'sid',
  }
}
