import { affiliateConfig } from '@/config/affiliates'

/**
 * Generate Trip.com affiliate link for a hotel
 * @param {Object} hotel - Hotel object from content.json
 * @returns {string|null} Affiliate URL or null if disabled
 */
export function getTripComHotelLink(hotel) {
  const { tripcom } = affiliateConfig
  if (!tripcom.enabled) return null

  const searchQuery = encodeURIComponent(`${hotel.name} ${hotel.location}`)
  const city = encodeURIComponent(hotel.location)

  return `${tripcom.baseUrl}/hotels/list?city=${city}&keyword=${searchQuery}&${tripcom.trackingParam}=${tripcom.affiliateId}&${tripcom.subTrackingParam}=heritage_${hotel.slug}`
}

/**
 * Generate Trip.com deep link for specific hotel
 * @param {string} tripcomHotelId - Trip.com hotel ID
 * @param {string} hotelSlug - Our hotel slug for tracking
 * @returns {string} Deep link URL
 */
export function getTripComDeepLink(tripcomHotelId, hotelSlug) {
  const { tripcom } = affiliateConfig
  return `${tripcom.baseUrl}/hotels/detail/?hotelId=${tripcomHotelId}&${tripcom.trackingParam}=${tripcom.affiliateId}&${tripcom.subTrackingParam}=heritage_${hotelSlug}`
}
