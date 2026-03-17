/**
 * Generate Google Maps URL from coordinates
 */
export function generateGoogleMapsUrl(
  latitude: number,
  longitude: number
): string {
  return `https://www.google.com/maps?q=${latitude},${longitude}`;
}

/**
 * Generate Google Maps search URL
 */
export function generateGoogleMapsSearchUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/**
 * Generate directions URL
 */
export function generateDirectionsUrl(
  latitude: number,
  longitude: number,
  destination: string = ''
): string {
  const coords = `${latitude},${longitude}`;
  if (destination) {
    return `https://www.google.com/maps/dir/?api=1&origin=${coords}&destination=${encodeURIComponent(destination)}`;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${coords}`;
}

/**
 * Open location in new tab
 */
export function openLocationInMaps(latitude: number, longitude: number): void {
  const url = generateGoogleMapsUrl(latitude, longitude);
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Alias for openLocationInMaps
 */
export function openMapsLocation(latitude: number, longitude: number): void {
  openLocationInMaps(latitude, longitude);
}

/**
 * Format coordinates for display
 */
export function formatCoordinates(
  latitude: number,
  longitude: number,
  decimals: number = 6
): string {
  return `${latitude.toFixed(decimals)}, ${longitude.toFixed(decimals)}`;
}

/**
 * Calculate distance between two points (Haversine formula)
 * Returns distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 100) / 100; // Round to 2 decimals
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Get location name from coordinates (using reverse geocoding would require API)
 * This is a placeholder - in production you'd use Google Maps Geocoding API
 */
export function getLocationName(
  latitude: number,
  longitude: number
): Promise<string> {
  // Placeholder implementation
  return Promise.resolve(formatCoordinates(latitude, longitude));
}
