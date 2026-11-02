// Experience is a confirmed baseline, not an inferred founding date.
export const agencyStatistics = {
  experienceBaseYear: 2026,
  experienceBaseYears: 15,
  teamSize: 10,
  totalSold: null as number | null,
};
export function yearsInBusiness(currentYear: number): number {
  return agencyStatistics.experienceBaseYears + Math.max(0, currentYear - agencyStatistics.experienceBaseYear);
}
export function ratingPercentage(rating: unknown, count: unknown): number | null {
  return typeof rating === 'number' && Number.isFinite(rating) && rating >= 1 && rating <= 5 && typeof count === 'number' && Number.isInteger(count) && count > 0 ? Math.round(rating / 5 * 100) : null;
}
