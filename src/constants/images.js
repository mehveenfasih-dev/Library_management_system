const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300" viewBox="0 0 200 300">
<rect width="200" height="300" fill="#e2e8f0"/>
<rect x="60" y="90" width="80" height="110" rx="6" fill="#94a3b8"/>
<rect x="72" y="106" width="56" height="8" rx="4" fill="#e2e8f0"/>
<rect x="72" y="124" width="40" height="8" rx="4" fill="#e2e8f0"/>
<text x="100" y="240" font-family="Arial" font-size="14" text-anchor="middle" fill="#64748b">No cover</text>
</svg>`

export const FALLBACK_COVER = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
