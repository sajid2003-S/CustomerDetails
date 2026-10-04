/**
 * Formats a date string (e.g. '2021-11-06 22:00:00') into 'Nov 6, 2021 at 10:00 pm'
 * or 'Nov 6th, 2021 at 10:00 pm'.
 */
export function formatMoveDate(dateStr, useOrdinal = false) {
  if (!dateStr) return 'Date not specified';
  
  try {
    // Normalise 'YYYY-MM-DD HH:mm:ss' to ISO string
    const cleanStr = String(dateStr).trim().replace(' ', 'T');
    const dateObj = new Date(cleanStr);
    
    if (isNaN(dateObj.getTime())) {
      return dateStr;
    }

    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const month = months[dateObj.getMonth()];
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    
    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // hour 0 should be 12

    let dayStr = String(day);
    if (useOrdinal) {
      const suffix = (d) => {
        if (d > 3 && d < 21) return 'th';
        switch (d % 10) {
          case 1: return 'st';
          case 2: return 'nd';
          case 3: return 'rd';
          default: return 'th';
        }
      };
      dayStr = `${day}${suffix(day)}`;
    }

    return `${month} ${dayStr}, ${year} at ${hours}:${minutes} ${ampm}`;
  } catch {
    return dateStr;
  }
}

/**
 * Normalizes property size string (e.g. '1 BHK', '3+ BHK', '3 + BHK')
 */
export function formatPropertySize(size) {
  if (!size) return '1 BHK';
  return String(size).trim();
}

/**
 * Normalizes distance string (e.g. '1.7 km')
 */
export function formatDistance(dist) {
  if (!dist) return '0 km';
  return String(dist).trim();
}

/**
 * Safely format elevator status
 */
export function formatElevator(val) {
  if (val === true || String(val).toLowerCase() === 'yes') return 'Yes';
  if (val === false || String(val).toLowerCase() === 'no') return 'No';
  return val ? String(val) : 'No';
}

/**
 * Safely format floor number
 */
export function formatFloor(val) {
  if (val === undefined || val === null || val === '') return '0';
  return String(val);
}

/**
 * Safely format parking / staircase distance
 */
export function formatParkingDistance(val) {
  if (!val) return '0 meters';
  return String(val);
}
