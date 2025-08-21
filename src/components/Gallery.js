import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaHistory, FaMapMarkerAlt, FaClock, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MapViewer from './MapViewer';
import galleryData from '../data/galleryData';

// --- STYLING (Self-contained) ---
const theme = {
  colors: {
    background: ':rgb(228, 251, 255)',
    surface: ':rgb(228, 251, 255)',
    primary: '#007bff',
    textPrimary: '#212529',
    textSecondary: '#6c757d',
    border: '#dee2e6',
    white: '#fff',
  },
  shadows: {
    sm: '0 2px 4px rgba(0,0,0,0.05)',
    md: '0 4px 10px rgba(0,0,0,0.08)',
  },
  borderRadius: '8px',
  transition: 'all 0.4s ease-in-out',
};

// --- Custom Hooks & Leaflet Helpers ---
const useWindowSize = () => {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  useEffect(() => {
    const handleResize = () => setSize([window.innerWidth, window.innerHeight]);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return size;
};

const createCustomIcon = (isSelected) => L.divIcon({
  html: `<div class="marker-dot ${isSelected ? 'selected' : ''}"></div>`,
  className: 'custom-marker-container',
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

// --- MAIN GALLERY COMPONENT ---
const Gallery = () => {
  const [selectedItem, setSelectedItem] = useState(galleryData[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Periods');
  const [portalData, setPortalData] = useState(null);
  const [width] = useWindowSize();
  const isMobile = width < 768;
  const [overlayData, setOverlayData] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // NEW: State for current index
  const [map, setMap] = useState(null);
  const isInitialLoad = useRef(true);
  const intervalRef = useRef(null); // NEW: Ref for interval

  const filteredItems = galleryData.filter(item => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = item.title.toLowerCase().includes(searchLower) || item.description.toLowerCase().includes(searchLower) || item.tags.some(tag => tag.toLowerCase().includes(searchLower));
    const yearInt = parseInt(item.year);
    const matchesFilter = activeFilter === 'All Periods' || (activeFilter === 'Pre-1800' && yearInt < 1800) || (activeFilter === '1800-1900' && yearInt >= 1800 && yearInt < 1900) || (activeFilter === '1900-Present' && yearInt >= 1900);
    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    if (map && selectedItem) {
      map.flyTo(selectedItem.coordinates, 13, { duration: 1.5 });
    }
  }, [selectedItem, map]);

  useEffect(() => {
    if (filteredItems.length > 0 && !filteredItems.find(item => item.id === selectedItem?.id)) {
      setSelectedItem(filteredItems[0]);
    } else if (filteredItems.length === 0) {
      setSelectedItem(null);
    }
  }, [searchTerm, activeFilter]);

  useEffect(() => {
    fetch('/overlay.geojson')
      .then(response => response.json())
      .then(data => setOverlayData(data))
      .catch(error => console.error("Error fetching GeoJSON overlay:", error));
  }, []);

  // NEW: Effect for automatic scrolling
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % filteredItems.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(intervalRef.current); // Clear interval on unmount
  }, [filteredItems.length]);

  // NEW: Function to handle manual index change
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  useEffect(() => {
    if (filteredItems.length > 0) {
      setSelectedItem(filteredItems[currentIndex]);
    }
  }, [currentIndex, filteredItems]);

  const cardWidthWithMargin = isMobile ? 250 : 280;

  return (
    <>
      <style>{`
        @keyframes pulse-light { 0% { box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.7); } 70% { box-shadow: 0 0 0 12px rgba(0, 123, 255, 0); } 100% { box-shadow: 0 0 0 0 rgba(0, 123, 255, 0); } }
        .marker-dot { background-color: ${theme.colors.surface}; border: 3px solid ${theme.colors.primary}; border-radius: 50%; width: 18px; height: 18px; transition: ${theme.transition}; box-shadow: ${theme.shadows.md}; cursor: pointer; }
        .marker-dot.selected { background-color: ${theme.colors.primary}; transform: scale(1.3); animation: pulse-light 1.5s infinite; }
        .leaflet-popup-content-wrapper { border-radius: ${theme.borderRadius}; box-shadow: ${theme.shadows.md}; }
        .leaflet-popup-content { margin: 0; width: 220px !important; font-family: 'Inter', sans-serif; }
      `}</style>
      
      <div style={{ height: 'calc(100vh - 65px)', display: 'grid', gridTemplateRows: '1fr auto', overflow: 'hidden' }}>
        <div style={{ position: 'relative', background: theme.colors.background }}>
          <MapContainer 
            center={[26.4499, 80.3319]} // Kanpur
            zoom={4} 
            zoomControl={false} 
            style={{ height: '100%', width: '100%', zIndex: 1 }}
            whenCreated={setMap}
          >
            <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png" attribution='&copy; CARTO' />
            
            {overlayData && (
              <GeoJSON data={overlayData} style={{ color: "#4a5568", weight: 2, opacity: 0.6, fillOpacity: 0.1 }} />
            )}

            {galleryData.map(item => (
              <Marker key={item.id} position={item.coordinates} icon={createCustomIcon(item.id === selectedItem?.id)} eventHandlers={{ click: () => setSelectedItem(item) }}>
                <Popup><div style={{ padding: '0.5rem' }}><h4 style={{ margin: 0, fontWeight: 600 }}>{item.title}</h4></div></Popup>
              </Marker>
            ))}
          </MapContainer>
          <div style={{ position: 'absolute', top: '24px', left: '24px', zIndex: 10 }}>
            <div style={{ position: 'relative', background: theme.colors.surface, borderRadius: '50px', boxShadow: theme.shadows.md }}>
              <FaSearch style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: theme.colors.textSecondary }} />
              <input type="text" placeholder="Search locations, tags..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: isMobile ? 'calc(100vw - 70px)' : '350px', padding: '12px 20px 12px 45px', border: `1px solid ${theme.colors.border}`, borderRadius: '50px', fontSize: '1rem', background: 'solid' }} />
            </div>
          </div>
        </div>

        <div style={{ background: theme.colors.surface, borderTop: `1px solid ${theme.colors.border}`, boxShadow: '0 -5px 20px rgba(0,0,0,0.05)' }}>
          <div style={{ padding: isMobile ? '1rem' : '1.5rem', paddingBottom: '1rem' }}>
            <h2 style={{ margin: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: isMobile ? '1.2rem' : '1.5rem' }}>
              <FaHistory style={{ color: theme.colors.primary }} /> Explore the Timeline
            </h2>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['All Periods', 'Pre-1800', '1800-1900', '1900-Present'].map(filter => (
                <button type="button" key={filter} onClick={() => setActiveFilter(filter)} style={{
                  padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid', whiteSpace: 'nowrap', cursor: 'pointer', fontSize: isMobile ? '0.8rem' : '0.9rem',
                  borderColor: activeFilter === filter ? theme.colors.primary : theme.colors.border,
                  backgroundColor: activeFilter === filter ? theme.colors.primary : theme.colors.surface,
                  color: activeFilter === filter ? theme.colors.white : theme.colors.textSecondary,
                }}>{filter}</button>
              ))}
            </div>
          </div>
          
          <div 
  style={{ 
    overflow: 'hidden', 
    padding: '0.5rem 0 1.5rem 0', 
    position: 'relative' // Set position relative to contain absolutely positioned children
  }}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
  <button 
    onClick={handlePrev} 
    style={{ 
      position: 'absolute', 
      left: '10px', 
      top: '50%', 
      transform: 'translateY(-50%)', 
      background: 'transparent', 
      border: 'none', 
      cursor: 'pointer', 
      zIndex: 10 // Ensure button is above other elements
    }}
  >
    <FaChevronLeft size={24} />
  </button>
  
  <div 
    className="carousel-track" 
    style={{ 
      display: 'flex', 
      transition: 'transform 0.5s ease', 
      transform: `translateX(-${currentIndex * (cardWidthWithMargin - 20)}px)` 
    }}
  >
    {filteredItems.map((item) => (
      <div key={item.id} style={{ margin: '0 10px', flexShrink: 0, width: `${cardWidthWithMargin - 20}px` }} onClick={() => setSelectedItem(item)}>
        <div style={{
          background: theme.colors.surface, 
          borderRadius: theme.borderRadius, 
          boxShadow: item.id === selectedItem?.id ? theme.shadows.md : theme.shadows.sm,
          border: `2px solid ${item.id === selectedItem?.id ? theme.colors.primary : 'transparent'}`, 
          cursor: 'pointer',
          transform: `scale(${item.id === selectedItem?.id ? 1 : 0.95})`, 
          transition: theme.transition, 
          height: '100%'
        }}>
          <img src={item.imageUrl} alt={item.title} style={{ height: isMobile ? '100px' : '120px', width: '100%', objectFit: 'cover', borderTopLeftRadius: theme.borderRadius, borderTopRightRadius: theme.borderRadius }} />
          <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>{item.title}</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: `1px solid ${theme.colors.border}` }}>
              <div style={{ fontSize: '0.75rem', color: theme.colors.textSecondary }}>
                <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.3rem' }}><FaMapMarkerAlt /> {item.location}</p>
                <p style={{ margin: '0.2rem 0 0', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><FaClock /> {item.year}</p>
              </div>
              <button type="button" onClick={(e) => { e.stopPropagation(); setPortalData({ ...item, ...item.viewerData }); }} style={{
                background: theme.colors.primary, color: 'white', border: 'none', borderRadius: '6px', padding: '0.4rem 0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem'
              }}><FaExternalLinkAlt size={10} /> Explore</button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
  
  <button 
    onClick={handleNext} 
    style={{ 
      position: 'absolute', 
      right: '10px', 
      top: '50%', 
      transform: 'translateY(-50%)', 
      background: 'transparent', 
      border: 'none', 
      cursor: 'pointer', 
      zIndex: 10 // Ensure button is above other elements
    }}
  >
    <FaChevronRight size={24} />
  </button>
</div>

        </div>
      </div>

      {portalData && <MapViewer item={portalData} onClose={() => setPortalData(null)} />}
    </>
  );
};

export default Gallery;
