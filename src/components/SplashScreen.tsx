import React, { useEffect, useState } from 'react';

export const SplashScreen: React.FC = () => {
  const [isExiting, setIsExiting] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 1200);

    const removeTimer = setTimeout(() => {
      setIsRemoved(true);
    }, 1850);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (isRemoved) return null;

  return (
    <div
      className={`splash-overlay select-none ${isExiting ? 'splash-exit' : ''}`}
      aria-hidden={isExiting}
    >
      <div className="splash-content">
        <h1 className="splash-title">Binethma Jayawickrama</h1>
        <div className="splash-line" />
      </div>
    </div>
  );
};

export default SplashScreen;
