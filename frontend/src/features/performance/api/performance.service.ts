import { mockPerformance } from "../../../data/mockData";
import type { PerformanceData } from "../types/performance.types";

export async function getPerformanceByUserId(
  userId: string,
): Promise<PerformanceData | null> {
  if (String(mockPerformance.userId) !== String(userId)) {
    return Promise.resolve(null);
  }

  return Promise.resolve(mockPerformance);
}
