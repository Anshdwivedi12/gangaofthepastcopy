import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, GeoJSON, WMSTileLayer, ScaleControl, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-side-by-side/layout.css';
import 'leaflet-side-by-side/range.css';
// FIX: Removed unused FaColumns and FaParagraph. FaColumns is re-added for the restored section.
import { FaTimes, FaChevronLeft, FaChevronRight, FaLayerGroup, FaImages, FaInfoCircle, FaCheckSquare, FaRegSquare, FaColumns, FaRobot, FaChartBar } from 'react-icons/fa';

// --- Helper component (unchanged) ---
const LegendControl = ({ layers, layerStates }) => {
  const map = useMap();
  useEffect(() => {
    if (!layers || !layerStates) return;
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'info legend');
      let content = '<h4>Legend</h4>';
      Object.keys(layers).forEach(layerName => {
        const layer = layers[layerName];
        const state = layerStates[layerName];
        if (state?.visible && layer.type === 'wms' && layer.url && layer.params?.layers) {
          const legendUrl = `${layer.url}?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=${layer.params.layers}`;
          content += `<div class="legend-item"><strong>${layerName}</strong><img src="${legendUrl}" alt="${layerName} legend" /></div>`;
        }
      });
      div.innerHTML = content;
      return div;
    };
    legend.addTo(map);
    return () => { legend.remove(); };
  }, [map, layers, layerStates]);
  return null;
};

// --- MAIN MAP VIEWER COMPONENT ---
const MapViewer = ({ item, onClose }) => {
  const mapRef = useRef();
  const [layerStates, setLayerStates] = useState({});
  const [fetchedVectorData, setFetchedVectorData] = useState({});
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedLayerInfo, setSelectedLayerInfo] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [leftLayer, setLeftLayer] = useState('');
  const [rightLayer, setRightLayer] = useState('');
  const [preCompareStates, setPreCompareStates] = useState(null);
  const sbsControlRef = useRef(null);

  // --- All original logic is preserved ---
  const zoomToLayer = useCallback((layerName) => {
    if (!mapRef.current || !item?.geospatialLayers) return;
    const layer = item.geospatialLayers[layerName];
    if (layer.type === 'wfs') {
      const data = fetchedVectorData[layerName];
      if (data && data.features.length > 0) {
        const bounds = L.geoJSON(data).getBounds();
        if (bounds.isValid()) mapRef.current.fitBounds(bounds, { padding: [50, 50] });
      }
    } else if (layer.type === 'wms' && layer.bounds) {
      if (L.latLngBounds(layer.bounds).isValid()) mapRef.current.fitBounds(layer.bounds, { padding: [50, 50] });
    }
  }, [item?.geospatialLayers, fetchedVectorData]);

  useEffect(() => {
    if (item?.geospatialLayers) {
      const initialLayerStates = {};
      const layerKeys = Object.keys(item.geospatialLayers);
      setFetchedVectorData({});
      layerKeys.forEach((layerName, index) => {
        initialLayerStates[layerName] = { visible: index === 0, opacity: 1 };
        const layer = item.geospatialLayers[layerName];
        if (layer.type === 'wfs' && layer.dataUrl) {
          fetch(layer.dataUrl).then(res => res.json()).then(data => setFetchedVectorData(prev => ({ ...prev, [layerName]: data }))).catch(err => console.error(`Failed to fetch ${layerName}:`, err));
        }
      });
      setLayerStates(initialLayerStates);
      setSelectedImageIndex(0);
      setSelectedLayerInfo(null);
      setLeftLayer(layerKeys[0] || '');
      setRightLayer(layerKeys[1] || layerKeys[0] || '');
    }
  }, [item]);

  useEffect(() => {
    if (!mapRef.current) return;
    if (compareMode) {
      import('leaflet-side-by-side').then(() => {
        const createLayer = (layerName) => {
          if (!layerName || layerName === '--NONE--') return L.layerGroup([]);
          const layerData = item.geospatialLayers[layerName];
          if (!layerData) return L.layerGroup([]);
          if (layerData.type === 'wms') return L.tileLayer.wms(layerData.url, layerData.params);
          if (layerData.type === 'wfs' && fetchedVectorData[layerName]) return L.geoJSON(fetchedVectorData[layerName], { style: layerData.style });
          return L.layerGroup([]);
        };
        const left = createLayer(leftLayer);
        const right = createLayer(rightLayer);
        if (sbsControlRef.current) { sbsControlRef.current.remove(); }
        sbsControlRef.current = L.control.sideBySide(left, right);
        sbsControlRef.current.addTo(mapRef.current);
      });
    } else {
      if (sbsControlRef.current) { sbsControlRef.current.remove(); sbsControlRef.current = null; }
    }
  }, [compareMode, leftLayer, rightLayer, item, fetchedVectorData]);

  const toggleLayerVisibility = (layerName) => {
    const isNowVisible = !layerStates[layerName]?.visible;
    setLayerStates(prev => ({ ...prev, [layerName]: { ...prev[layerName], visible: isNowVisible } }));
    if (isNowVisible) zoomToLayer(layerName);
  };

  const handleStartCompare = () => {
    if (leftLayer === rightLayer) return;
    setPreCompareStates(layerStates);
    const clearedLayerStates = {};
    Object.keys(layerStates).forEach(key => { clearedLayerStates[key] = { ...layerStates[key], visible: false }; });
    setLayerStates(clearedLayerStates);
    setCompareMode(true);
  };

  const handleExitCompare = () => {
    setCompareMode(false);
    if (preCompareStates) setLayerStates(preCompareStates);
  };

  const handleOpacityChange = (layerName, opacity) => setLayerStates(prev => ({ ...prev, [layerName]: { ...prev[layerName], opacity: parseFloat(opacity) } }));
  const handleNextImage = () => setSelectedImageIndex(prev => (prev + 1) % (item.images?.length || 1));
  const handlePrevImage = () => setSelectedImageIndex(prev => (prev - 1 + (item.images?.length || 1)) % (item.images?.length || 1));
  const handleSelectLayerForInfo = (layerName) => setSelectedLayerInfo(item.geospatialLayers[layerName]?.info ? { name: layerName, ...item.geospatialLayers[layerName].info } : { name: layerName, info: "No additional information available." });

  if (!item) return null;
  const selectedImage = item.images?.[selectedImageIndex];

  const lightboxStyles = {
    root: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.85)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    content: { position: 'relative', maxWidth: '90vw', maxHeight: '90vh' },
    img: { width: '100%', height: '100%', maxHeight: '90vh', objectFit: 'contain' },
    btn: { position: 'absolute', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.3)', color: 'white', border: 'none', borderRadius: '50%', width: '50px', height: '50px', fontSize: '1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    closeBtn: { position: 'absolute', top: '15px', right: '15px', background: 'rgba(0,0,0,0.3)', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '1.2rem', cursor: 'pointer' }
  };

  return (
    <>
      <style>{`
        :root {
            --bg-default: #f9fafb; --bg-surface: #ffffff; --bg-inset: #f3f4f6;
            --border-color: #e5e7eb; --primary-accent: #4f46e5;
            --text-primary: #111827; --text-secondary: #6b7280;
            --radius-md: 8px; --radius-lg: 12px;
            --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
        }
        .dashboard-container {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            display: grid;
            grid-template-columns: 1fr 45%;
            grid-template-rows: auto 1fr;
            grid-template-areas: "header header" "sidebar map";
            z-index: 2000; font-family: 'Inter', sans-serif;
            background-color: var(--bg-default); animation: fadeIn 0.3s ease-in-out;
        }
        @media (max-width: 900px) {
            .dashboard-container {
                grid-template-columns: 1fr; grid-template-rows: auto 45% 1fr;
                grid-template-areas: "header" "sidebar" "map";
            }
        }
        .dashboard-header {
            grid-area: header; background-color: var(--bg-surface); padding: 0.75rem 1.5rem;
            border-bottom: 1px solid var(--border-color); display: flex;
            justify-content: space-between; align-items: center;
        }
        .dashboard-sidebar {
            grid-area: sidebar; background-color: var(--bg-surface);
            border-right: 1px solid var(--border-color); overflow-y: auto;
        }
        .dashboard-map {
            grid-area: map; position: relative; padding: 1.25rem;
        }
        .map-wrapper {
            width: 100%; height: 100%; border-radius: var(--radius-lg);
            overflow: hidden; box-shadow: var(--shadow-md);
        }
        .sidebar-section {
            padding: 1.25rem; border-bottom: 1px solid var(--border-color);
        }
        .sidebar-section:last-child { border-bottom: none; }
        .sidebar-title {
            margin: 0 0 1rem 0; font-size: 1rem; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;
            display: flex; align-items: center; gap: 0.5rem; color: var(--text-secondary);
        }
        .filmstrip-container { display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 0.5rem; }
        .filmstrip-container::-webkit-scrollbar { height: 4px; }
        .filmstrip-container::-webkit-scrollbar-thumb { background-color: var(--border-color); border-radius: 4px; }
        .thumbnail-item {
            border-radius: var(--radius-md); box-shadow: var(--shadow-sm); cursor: pointer;
            border: 3px solid transparent; transition: all 0.2s ease-in-out;
            flex-shrink: 0;
        }
        .thumbnail-item:hover { transform: scale(1.05); }
        .thumbnail-item.selected { border-color: var(--primary-accent); }
        .thumbnail-img { width: 80px; height: 55px; object-fit: cover; border-radius: 6px; display: block; }
        .layer-item { padding: 0.75rem 0.5rem; border-radius: var(--radius-md); transition: background-color 0.2s ease-in-out; }
        .layer-item:hover { background-color: var(--bg-inset); }
        .placeholder-chart {
            background-color: var(--bg-inset); border-radius: var(--radius-md);
            padding: 1rem; text-align: center; color: var(--text-secondary);
        }
            input[type=range] { 
  -webkit-appearance: none; 
  background: transparent; 
  width: 100%; 
}

/* This styles the BAR of the slider */
input[type=range]::-webkit-slider-runnable-track { 
  height: 4px; 
  background: #475569; /* <-- CHANGE THIS COLOR for the track */
  border-radius: 4px; 
}

/* This styles the HANDLE of the slider */
input[type=range]::-webkit-slider-thumb { 
  -webkit-appearance: none; 
  height: 16px; 
  width: 16px; 
  background: var(--primary-accent); /* <-- CHANGE THIS COLOR for the thumb */
  border-radius: 50%; 
  margin-top: -6px; 
  cursor: pointer; 
}
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        /* --- FINAL MODIFICATION: Your requested gallery styles --- */
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
          gap: 0.5rem;
        }
        .gallery-grid img {
          width: 100%;
          height: 70px;
          object-fit: cover;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          border: 2px solid transparent;
        }
        .gallery-grid img:hover {
          transform: scale(1.05);
          box-shadow: var(--shadow-md);
        }
        .gallery-grid img.selected {
          border-color: var(--primary-accent);
          transform: scale(1.05);
        }
      `}</style>

      <div className="dashboard-container">
        <header className="dashboard-header">
          <div>
            <h2 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-primary)', fontWeight: 600 }}>{item.title}</h2>
            <p style={{ margin: '0.1rem 0 0', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{item.description}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button title="Activate Copilot" style={{ background: 'linear-gradient(45deg, var(--primary) 0%, var(--accent) 100%)', border: 'none', color: 'white', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500, boxShadow: '0 4px 15px -5px var(--primary)', transition: 'all 0.2s ease-in-out' }}>
              <FaRobot />
              <span>Copilot</span>
            </button>
            <button onClick={onClose} title="Close Portal" style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer', color: 'var(--text-secondary)' }}> <FaTimes /> </button>
          </div>
        </header>

        <aside className="dashboard-sidebar">
          <section className="sidebar-section">
            <h3 className="sidebar-title"><FaImages /> Image Gallery</h3>
            <div className="gallery-grid">
              {item.images?.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.caption}
                  onClick={() => { setSelectedImageIndex(index); setLightboxOpen(true); }}
                  className={selectedImageIndex === index ? "selected" : ""}
                />
              ))}
            </div>
          </section>

          <section className="sidebar-section">
            <h3 className="sidebar-title"><FaLayerGroup /> Geospatial Layers</h3>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {item.geospatialLayers && Object.keys(item.geospatialLayers).map(layerName => {
                const state = layerStates[layerName] || { visible: false, opacity: 1 };
                return (
                  <li key={layerName} className="layer-item">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <label onClick={() => toggleLayerVisibility(layerName)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', color: 'var(--text-primary)' }}>
                        {state.visible ? <FaCheckSquare style={{ fontSize: '1.2rem', color: 'var(--primary-accent)' }} /> : <FaRegSquare style={{ fontSize: '1.2rem', color: '#9ca3af' }} />}
                        <span>{layerName}</span>
                      </label>
                      {item.geospatialLayers[layerName]?.info && <button title="View Layer Info" onClick={() => handleSelectLayerForInfo(layerName)} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '1rem' }}> <FaInfoCircle /> </button>}
                    </div>
                    {state.visible && (
                      <div style={{ paddingLeft: '2rem', marginTop: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', maxWidth: '220px' }}>
                          <input id={`opacity-${layerName}`} type="range" min="0" max="1" step="0.1" value={state.opacity} onChange={(e) => handleOpacityChange(layerName, e.target.value)} style={{ width: '100%' }} />
                        </div>
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          </section>

          {/* --- FULLY RESTORED: Layer Info functionality --- */}
          <section className="sidebar-section">
            <h3 className="sidebar-title"><FaInfoCircle /> Layer Information</h3>
            <div style={{ background: 'var(--bg-inset)', borderRadius: 'var(--radius-md)', padding: '1rem', fontSize: '0.85rem', minHeight: '100px' }}>
              {selectedLayerInfo ? (
                Object.entries(selectedLayerInfo).map(([key, value]) => (
                  <div key={key} style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '0.5rem', padding: '0.4rem 0', borderBottom: `1px solid ${'var(--border-color)'}` }}>
                    <strong style={{ color: 'var(--text-primary)' }}>{key}:</strong>
                    <span>{String(value)}</span>
                  </div>
                ))
              ) : <p style={{ color: 'var(--text-secondary)', textAlign: 'center', paddingTop: '1rem' }}>Select a layer's info icon (ⓘ) to see details.</p>}
            </div>
          </section>

          {/* --- FULLY RESTORED: Layer Comparison functionality --- */}
          <section className="sidebar-section">
            <h3 className="sidebar-title"><FaColumns /> Layer Comparison</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <select value={leftLayer} onChange={e => setLeftLayer(e.target.value)} style={{ width: '40%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}>
                <option value="--NONE--">— Base Map Only —</option>
                {item.geospatialLayers && Object.keys(item.geospatialLayers).map(name => <option key={`left-${name}`} value={name}>{name}</option>)}
              </select>
              <select value={rightLayer} onChange={e => setRightLayer(e.target.value)} style={{ width: '40%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}>
                <option value="--NONE--">— Base Map Only —</option>
                {item.geospatialLayers && Object.keys(item.geospatialLayers).map(name => <option key={`right-${name}`} value={name}>{name}</option>)}
              </select>
              <button onClick={handleStartCompare} disabled={leftLayer === rightLayer} style={{ width: '40%', padding: '0.6rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', opacity: (leftLayer === rightLayer) ? 0.6 : 1 }}>Start Comparison</button>
            </div>
          </section>

          <section className="sidebar-section">
            <h3 className="sidebar-title"><FaChartBar /> Data & Statistics</h3>
            <div className="placeholder-chart"><p>Your data charts and statistics will be displayed here.</p></div>
          </section>


        </aside>

        <main className="dashboard-map">
          <div className="map-wrapper">
            <MapContainer ref={mapRef} center={item.coordinates || [25.3176, 82.9739]} zoom={13} zoomControl={false} style={{ height: '100%', width: '100%' }}>
              <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" attribution='&copy; CARTO' />

              <ScaleControl position="bottomleft" />

              {!compareMode && item.geospatialLayers && Object.keys(layerStates).map(layerName => {
                const state = layerStates[layerName];
                if (!state?.visible) return null;
                const layer = item.geospatialLayers[layerName];
                const key = `${layerName}-${state.opacity}-${JSON.stringify(layer.params)}`; // Dynamic key

                if (layer.type === 'wms') return <WMSTileLayer key={key} url={layer.url} params={layer.params} opacity={state.opacity} zIndex={10} />;
                if (layer.type === 'wfs') {
                  const data = fetchedVectorData[layerName];
                  if (!data) return null;
                  return <GeoJSON key={key} data={data} style={{ ...layer.style, opacity: state.opacity, fillOpacity: (layer.style?.fillOpacity || 0.2) * state.opacity }} />;
                }
                return null;
              })}

              {compareMode && (
                <div style={{ position: 'absolute', top: 15, right: 15, zIndex: 1001 }}>
                  <button onClick={handleExitCompare} style={{ padding: '0.5rem 1rem', background: '#d9534f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', boxShadow: '0 1px 5px rgba(0,0,0,0.2)' }}>Exit Compare Mode</button>
                </div>
              )}

              <LegendControl layers={item.geospatialLayers} layerStates={layerStates} />
            </MapContainer>
          </div>
        </main>
      </div>

      {lightboxOpen && (
        <div style={lightboxStyles.root}>
          <button onClick={() => setLightboxOpen(false)} style={lightboxStyles.closeBtn}><FaTimes /></button>
          <button onClick={handlePrevImage} style={{ ...lightboxStyles.btn, left: '15px' }}><FaChevronLeft /></button>
          {selectedImage && <div style={lightboxStyles.content}><img src={selectedImage.url} alt={selectedImage.caption} style={lightboxStyles.img} /></div>}
          <button onClick={handleNextImage} style={{ ...lightboxStyles.btn, right: '15px' }}><FaChevronRight /></button>
        </div>
      )}
    </>
  );
};

export default MapViewer;