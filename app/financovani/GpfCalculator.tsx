'use client';

import { useEffect, useRef, useState } from 'react';

const calculatorUrl = 'https://www.gpf.cz/hypotecni-kalkulacka/onepage?tmpl=component&responsive&partner=1665&broker=12069';
const calculatorOrigin = 'https://www.gpf.cz';

export default function GpfCalculator() {
  const frame = useRef<HTMLIFrameElement>(null);
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState<'loading' | 'slow' | 'ready'>('loading');

  useEffect(() => {
    const timeout = window.setTimeout(() => setStatus(current => current === 'ready' ? current : 'slow'), 15000);
    function handleMessage(event: MessageEvent) {
      const iframe = frame.current;
      if (!iframe || event.origin !== calculatorOrigin || event.source !== iframe.contentWindow) return;

      // Gepard sends a numeric height, or a numeric string requesting a scroll.
      if (typeof event.data === 'number' && Number.isFinite(event.data) && event.data > 0) {
        iframe.style.height = `${event.data}px`;
        setStatus('ready');
        window.clearTimeout(timeout);
      } else if (typeof event.data === 'string' && event.data.trim() !== '' && Number.isFinite(Number(event.data))) {
        const top = iframe.getBoundingClientRect().top + window.scrollY - 20;
        window.scrollTo({
          top: Math.max(0, top),
          left: 0,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
        });
      }
    }

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
      window.clearTimeout(timeout);
    };
  }, [attempt]);

  return <div className="gpf-widget" style={{ position: 'relative' }}>
    {status !== 'ready' && <div role="status" style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: 24, background: '#fff', border: '1px solid #e5edfa', borderRadius: 12 }}>
      <p>{status === 'loading' ? 'Načítáme kalkulačku Gepard Finance…' : 'Načítání kalkulačky Gepard Finance trvá déle než obvykle.'}</p>
      {status === 'slow' && <p><button type="button" onClick={() => { setStatus('loading'); setAttempt(current => current + 1); }}>Zkusit znovu</button>{' · '}<a href={calculatorUrl} target="_blank" rel="noopener noreferrer">Otevřít kalkulačku v novém okně</a></p>}
    </div>}
    <iframe
      key={attempt}
      ref={frame}
      id="gpfcalc"
      title="Hypoteční kalkulačka Gepard Finance"
      src={calculatorUrl}
      width="100%"
      height="1000"
      scrolling="no"
      style={{ display: 'block', width: '100%', border: 0 }}
    />
    <p className="gpf-source">Kalkulačku poskytuje Gepard Finance. Pokud se nezobrazí, <a href={calculatorUrl} target="_blank" rel="noopener noreferrer">otevřete ji v novém okně</a>.</p>
  </div>;
}
