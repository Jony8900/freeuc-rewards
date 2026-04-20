import React, { useEffect, useRef } from 'react';

const ADSENSE_CLIENT = 'ca-pub-4516179296800132';
const ADSENSE_SCRIPT_URL = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;

let scriptLoaded = false;
function loadAdSenseScript() {
  if (scriptLoaded) return;
  if (document.querySelector(`script[src*="adsbygoogle"]`)) {
    scriptLoaded = true;
    return;
  }
  const script = document.createElement('script');
  script.src = ADSENSE_SCRIPT_URL;
  script.async = true;
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
  scriptLoaded = true;
}

export function AdBanner({ slot, format = 'auto', style = {} }) {
  const adRef = useRef(null);
  const pushed = useRef(false);

  useEffect(() => {
    loadAdSenseScript();
    const timer = setTimeout(() => {
      if (adRef.current && !pushed.current) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          pushed.current = true;
        } catch (e) {
          console.error('AdSense push error:', e);
        }
      }
    }, 1000);
    return () => clearTimeout(timer);
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
    profileBanner: 'auto',
  },
};

export default { AdBanner, RewardedAdManager, AdsConfig };
