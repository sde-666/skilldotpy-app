export interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  responsive?: boolean;
  className?: string;
  layoutKey?: string;
}

export function AdUnit(_props: AdUnitProps) {
  // Ads disabled completely for clean app experience
  return null;
}
