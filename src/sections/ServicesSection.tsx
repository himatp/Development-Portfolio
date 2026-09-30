import React from 'react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { ServicesLayout } from '../components/services-layouts/ServicesLayout';

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-24 md:py-36 bg-zinc-950/80 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader
          title="What I Can Build"
          subtitle="Tailored digital solutions built with modern technology stacks and clean design aesthetics."
        />

        <ServicesLayout />
      </div>
    </section>
  );
};
