import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  chart: string;
  id?: string;
}

export const Mermaid: React.FC<MermaidProps> = ({ chart, id = 'mermaid-chart' }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'base',
      themeVariables: {
        primaryColor: '#0A192F',
        primaryTextColor: '#F8F9FA',
        primaryBorderColor: '#C5A059',
        lineColor: '#C5A059',
        secondaryColor: '#C5A059',
        tertiaryColor: '#F8F9FA',
      },
      fontFamily: 'Inter',
    });

    const renderChart = async () => {
      if (ref.current) {
        const { svg } = await mermaid.render(id, chart);
        ref.current.innerHTML = svg;
      }
    };

    renderChart();
  }, [chart, id]);

  return <div key={chart} ref={ref} className="flex justify-center w-full overflow-x-auto py-8" />;
};
