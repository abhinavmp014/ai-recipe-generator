/**
 * Page Transition Component
 * Wraps pages with smooth enter/exit animations
 */

import React, { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`page-transition ${className}`}>
      {children}
    </div>
  );
};

export default PageTransition;
