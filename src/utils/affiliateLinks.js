import { affiliateConfig } from '@/config/affiliates'

/**
 * Generate Trip.com affiliate link via Travelpayouts
 * @param {Object} hotel - Hotel object from content.json
 * @returns {string|null} Affiliate URL or null if disabled
 */
export function getTripComHotelLink(hotel) {
  const { travelpayouts } = affiliateConfig
  if (!travelpayouts.enabled) return null

  // Build the Trip.com destination URL
  const searchQuery = encodeURIComponent(`${hotel.name} ${hotel.location}`)
  const city = encodeURIComponent(hotel.location)
  const tripcomUrl = `https://www.trip.com/hotels/list?city=${city}&keyword=${searchQuery}`

  // Wrap in Travelpayouts redirect for tracking
  const encodedUrl = encodeURIComponent(tripcomUrl)
  return `${travelpayouts.redirectBase}?marker=${travelpayouts.marker}.heritage_${hotel.slug}&p=${travelpayouts.tripcomProgramId}&u=${encodedUrl}`
}

/**
 * Generate Trip.com deep link via Travelpayouts
 * @param {string} tripcomHotelId - Trip.com hotel ID
 * @param {string} hotelSlug - Our hotel slug for tracking
 * @returns {string} Deep link URL
 */
export function getTripComDeepLink(tripcomHotelId, hotelSlug) {
  const { travelpayouts } = affiliateConfig
  const tripcomUrl = `https://www.trip.com/hotels/detail/?hotelId=${tripcomHotelId}`
  const encodedUrl = encodeURIComponent(tripcomUrl)
  return `${travelpayouts.redirectBase}?marker=${travelpayouts.marker}.heritage_${hotelSlug}&p=${travelpayouts.tripcomProgramId}&u=${encodedUrl}`
}
