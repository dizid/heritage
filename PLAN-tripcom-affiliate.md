# Trip.com Affiliate Integration Plan

## Overview

Integrate Trip.com's affiliate program to earn commissions when users book hotels through Heritage Asia.

### Commission Rates (Trip.com)
| Product | Commission |
|---------|------------|
| Hotels | 5.5% |
| Flights | 1% |
| Car Rental | 5% |
| Airport Transfers | 5% |
| Tours & Tickets | 4% |
| Flight+Hotel Packages | 2.5% |

**Cookie Duration:** 30 days (website), 7 days (app)

---

## Implementation Steps

### Step 1: Sign Up for Trip.com Affiliate Program

**Action Required (Manual):**
1. Visit https://www.trip.com/partners
2. Complete affiliate registration form
3. Get approved (typically 1-3 days)
4. Receive your **Affiliate ID** and **API credentials**

**Alternative Networks:**
- Travelpayouts (higher rates possible, more tools)
- Awin (established network)
- Admitad

---

### Step 2: Add Affiliate Configuration

Create `/src/config/affiliates.js`:

```javascript
export const affiliateConfig = {
  tripcom: {
    enabled: true,
    affiliateId: 'YOUR_AFFILIATE_ID', // Replace after signup
    baseUrl: 'https://www.trip.com',
    trackingParam: 'Allianceid', // Trip.com's tracking parameter
    subTrackingParam: 'sid', // For tracking source
  }
}
```

---

### Step 3: Create Affiliate Link Generator Utility

Create `/src/utils/affiliateLinks.js`:

```javascript
import { affiliateConfig } from '@/config/affiliates'

/**
 * Generate Trip.com affiliate link for a hotel
 * @param {Object} hotel - Hotel object from content.json
 * @returns {string} Affiliate URL
 */
export function getTripComHotelLink(hotel) {
  const { tripcom } = affiliateConfig
  if (!tripcom.enabled) return null

  // Construct search URL for the hotel location
  const searchQuery = encodeURIComponent(`${hotel.name} ${hotel.location}`)

  return `${tripcom.baseUrl}/hotels/list?city=${encodeURIComponent(hotel.location)}&keyword=${searchQuery}&Allianceid=${tripcom.affiliateId}&sid=heritage_${hotel.slug}`
}

/**
 * Generate Trip.com deep link for specific hotel (if ID known)
 * @param {string} tripcomHotelId - Trip.com hotel ID
 * @param {string} hotelSlug - Our hotel slug for tracking
 * @returns {string} Deep link URL
 */
export function getTripComDeepLink(tripcomHotelId, hotelSlug) {
  const { tripcom } = affiliateConfig
  return `${tripcom.baseUrl}/hotels/detail/?hotelId=${tripcomHotelId}&Allianceid=${tripcom.affiliateId}&sid=heritage_${hotelSlug}`
}
```

---

### Step 4: Add Affiliate Data to Hotels

Update `/src/data/content.json` hotels array - add `booking` field:

```json
{
  "id": "raffles-singapore",
  "name": "Raffles Hotel",
  "slug": "raffles-singapore",
  // ... existing fields ...
  "booking": {
    "tripcomSearch": true,
    "tripcomId": null, // Add specific ID if available
    "directUrl": "https://www.raffles.com/singapore/"
  }
}
```

---

### Step 5: Create BookingCTA Component

Create `/src/components/ui/booking-cta.vue`:

```vue
<template>
  <div class="booking-cta bg-gradient-to-r from-teal/20 to-accent/20 rounded-xl p-6 border border-white/10">
    <h3 class="text-lg font-heading font-semibold text-white mb-2">
      Book This Hotel
    </h3>
    <p class="text-secondary text-sm mb-4">
      Check availability and rates on Trip.com
    </p>

    <a
      :href="affiliateLink"
      target="_blank"
      rel="noopener sponsored"
      class="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-medium px-6 py-3 rounded-lg transition-colors w-full justify-center"
      @click="trackClick"
    >
      <span>Check Availability</span>
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>

    <p class="text-tertiary text-xs mt-3 text-center">
      Prices shown are approximate. We may earn a commission.
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getTripComHotelLink } from '@/utils/affiliateLinks'

const props = defineProps({
  hotel: {
    type: Object,
    required: true
  }
})

const affiliateLink = computed(() => getTripComHotelLink(props.hotel))

const trackClick = () => {
  // Basic analytics tracking
  if (window.gtag) {
    window.gtag('event', 'affiliate_click', {
      hotel_name: props.hotel.name,
      hotel_slug: props.hotel.slug,
      partner: 'tripcom'
    })
  }
}
</script>
```

---

### Step 6: Integrate BookingCTA into Hotel Page

Modify `/src/pages/hotel-page.vue`:

**Add to sidebar (after Notable Guests card, around line 121):**

```vue
<!-- Booking CTA -->
<BookingCTA :hotel="hotel" class="mb-6" />
```

**Add import:**
```javascript
import BookingCTA from '@/components/ui/booking-cta.vue'
```

---

### Step 7: Add Booking Button to Hotel Cards (Optional)

Modify `/src/components/ui/hotel-card.vue` to add a subtle booking indicator.

---

## File Changes Summary

| File | Action | Description |
|------|--------|-------------|
| `src/config/affiliates.js` | Create | Affiliate configuration |
| `src/utils/affiliateLinks.js` | Create | Link generator utilities |
| `src/components/ui/booking-cta.vue` | Create | Booking call-to-action component |
| `src/pages/hotel-page.vue` | Modify | Add BookingCTA to sidebar |
| `src/data/content.json` | Modify | Add booking metadata to hotels |

---

## Required User Actions

1. **Sign up at Trip.com Partners**: https://www.trip.com/partners
2. **Get your Affiliate ID** after approval
3. **Provide the Affiliate ID** so I can configure it

---

## Future Enhancements (Phase 2)

1. **Real-time pricing via API** - Display actual rates
2. **Price comparison** - Show multiple OTAs (Booking.com, Agoda)
3. **Click tracking dashboard** - Track performance with Netlify Functions
4. **Email capture** - Newsletter with affiliate recommendations
5. **Trip.com Hotel ID mapping** - Direct deep links for better conversion

---

## Legal Requirements

Add to footer or booking component:
- Affiliate disclosure: "We may earn a commission from bookings made through our links"
- rel="sponsored" on affiliate links (already included in component)

---

## Ready to Proceed?

Once you confirm and provide your Trip.com Affiliate ID (or want me to use a placeholder), I'll implement all the code changes.
