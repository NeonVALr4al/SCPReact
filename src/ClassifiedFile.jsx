import { useParams } from 'react-router-dom'
import './classified.css'

const imageMap = {
  'SCP-173': new URL('./images/SCP-173.webp', import.meta.url).href,
  'SCP-096': new URL('./images/SCP-096.webp', import.meta.url).href,
  'SCP-049': new URL('./images/SCP-049.webp', import.meta.url).href,
  'SCP-106': new URL('./images/SCP-106.webp', import.meta.url).href,
  'SCP-682': new URL('./images/SCP-682.webp', import.meta.url).href,
}

const classColors = {
  Safe: '#2d6a4f',
  Euclid: '#b5600d',
  Keter: '#8b1a1a',
}

function ClassifiedFile(scp) {
  const { id } = useParams()
  const entry = scp.scp.find(p => p.ScpID === parseInt(id))

  if (!entry) {
    return (
      <div className="folder">
        <div className="paper">
          <div className="stamp">FILE NOT FOUND</div>
          <p style={{ marginTop: '20px', fontFamily: 'var(--font-mono)' }}>
            No record matching ID: {id}
          </p>
        </div>
      </div>
    )
  }

  const imgSrc = imageMap[entry.item]
  const accentColor = classColors[entry.objectClass] || '#555'

  return (
    <div className="folder">
      <div className="folder-tab">{entry.item} &mdash; {entry.nickname}</div>

      <div className="paper">
        <div className="scanlines" />

        {/* Header row */}
        <div className="doc-header">
          <div className="doc-header-left">
            <div className="stamp">CLASSIFIED</div>
            <div className="doc-ref">
              <span>REF: FOUND-{entry.ScpID}</span>
            </div>
          </div>
          <div className="doc-header-right">
            <div className="foundation-mark">SCP<br />FOUNDATION</div>
          </div>
        </div>

        {/* Title */}
        <h1 className="doc-title">{entry.item}</h1>
        <h2 className="doc-subtitle">"{entry.nickname}"</h2>

        {/* Meta bar */}
        <div className="meta-bar">
          <div className="meta-item">
            <span className="meta-label">OBJECT CLASS</span>
            <span className="meta-value" style={{ color: accentColor, borderColor: accentColor }}>
              {entry.objectClass}
            </span>
          </div>
          <div className="meta-item">
            <span className="meta-label">SITE</span>
            <span className="meta-value">SITE-19</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">FILE NO.</span>
            <span className="meta-value">SCP-{String(entry.ScpID).padStart(3, '0')}</span>
          </div>
        </div>

        {/* Image */}
        {imgSrc && (  
          <div className="image-container">
             <div className="image-wrapper">
            <img src={imgSrc} alt={entry.item} className="scp-image" />
            </div>
            <div className="image-caption">
              FIG. 1 — {entry.item} CONTAINMENT PHOTOGRAPH &mdash; RESTRICTED
            </div>
          </div>
        )}

        {/* Sections */}
        <div className="section">
          <h3 className="section-title">
            <span className="section-num">§1</span>
            SPECIAL CONTAINMENT PROCEDURES
          </h3>
          <p className="section-body">{entry.containment}</p>
        </div>

        <div className="section">
          <h3 className="section-title">
            <span className="section-num">§2</span>
            DESCRIPTION
          </h3>
          <p className="section-body">{entry.description}</p>
        </div>

        {/* Footer */}
        <div className="doc-footer">
          <span>SCP FOUNDATION — INTERNAL USE ONLY</span>
          <span>{entry.item} — PAGE 1 OF 1</span>
          <span>DO NOT REPRODUCE</span>
        </div>

        <div className="corner-fold" />
      </div>
    </div>
  )
}

export default ClassifiedFile
