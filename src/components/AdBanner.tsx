export interface AdBannerProps {
  slotId?: string;
  adClient?: string;
  format?: 'auto' | 'horizontal' | 'rectangle' | 'in-feed' | 'in-article' | 'sticky-bottom';
  className?: string;
  showLabel?: boolean;
  fallbackType?: 'app' | 'youtube' | 'notes' | 'telegram' | 'mock-test' | 'calculator' | 'general';
}

export function AdBanner(_props: AdBannerProps) {
  // Ads disabled completely for clean app experience
  return null;
}
