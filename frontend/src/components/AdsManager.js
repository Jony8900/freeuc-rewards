import React, { useEffect, useRef } from 'react';

const ADSENSE_CLIENT = 'ca-pub-4516179296800132';

export function AdBanner({ slot, format = 'auto', style = {} }) {
  const adRef = useRef(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (adRef.current && !pushed.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushed.current = true;
      } catch (e) {
        console.error('AdSense push error:', e);
      }
    }
  }, []);

  return (
    <div className="ad-container my-3" style={{ minHeight: '50px', ...style }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

export function RewardedAdManager({ onAdComplete, onAdError }) {
  const showRewardedAd = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      if (onAdComplete) onAdComplete();
    } catch (error) {
      console.error('Ad error:', error);
      if (onAdError) onAdError(error);
    }
  };

  return { isLoading: false, adReady: true, showRewardedAd };
}

export const AdsConfig = {
  adsenseClient: ADSENSE_CLIENT,
  slots: {
    homeBanner: 'auto',
    redeemBanner: 'auto',
    profileBanner: 'auto',
  },
};

export default { AdBanner, RewardedAdManager, AdsConfig };
