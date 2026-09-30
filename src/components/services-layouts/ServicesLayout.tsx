import React, { lazy, Suspense } from 'react';
import { ACTIVE_SERVICES_LAYOUT } from './config';
import { SIMPLE_SERVICES_DATA } from '../../data/portfolioData';

const EditorialList = lazy(() => import('./EditorialList'));
const HorizontalScroll = lazy(() => import('./HorizontalScroll'));

export const ServicesLayout: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-[400px] flex items-center justify-center text-zinc-500 font-mono text-xs">
          Loading layout...
        </div>
      }
    >
      {(() => {
        switch (ACTIVE_SERVICES_LAYOUT) {
          case 'editorial-list':
            return <EditorialList services={SIMPLE_SERVICES_DATA} />;
          case 'horizontal-scroll':
            return <HorizontalScroll services={SIMPLE_SERVICES_DATA} />;
          default:
            return <EditorialList services={SIMPLE_SERVICES_DATA} />;
        }
      })()}
    </Suspense>
  );
};
