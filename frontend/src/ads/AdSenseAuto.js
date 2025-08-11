import { useEffect } from 'react';

const AdSenseAuto = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  return (
    <ins className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-4093862221318795"
      data-ad-slot="1671193718"
      data-ad-format="autorelaxed"
    />
  );
};

export default AdSenseAuto;
