import { ImageResponse } from 'next/og';
export const alt = 'Apprentice Atlas — find a route that actually fits you';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        background: '#F7F5EE',
        color: '#081F4D',
        padding: 72,
        fontFamily: 'Georgia',
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', fontFamily: 'Arial', fontSize: 24, letterSpacing: 2 }}>
          APPRENTICE ATLAS / FUTURE 01
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 92,
            lineHeight: 0.9,
            maxWidth: 900,
          }}
        >
          <span>Find a route that</span>
          <span style={{ color: '#155EEF', fontStyle: 'italic' }}>actually fits you.</span>
        </div>
        <div style={{ display: 'flex', fontFamily: 'Arial', fontSize: 24 }}>
          Germany · United Kingdom · Official sources · Responsible AI
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          right: 80,
          top: 80,
          width: 88,
          height: 88,
          borderRadius: 44,
          background: '#FF6B57',
          display: 'flex',
        }}
      />
    </div>,
    size,
  );
}
