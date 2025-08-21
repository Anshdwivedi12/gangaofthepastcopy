// Gallery.js

import React, { useState, useRef, useEffect } from 'react';

import { FaSearch, FaHistory, FaMapMarkerAlt, FaClock, FaExternalLinkAlt } from 'react-icons/fa';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

import MapViewer from './MapViewer';



const galleryData = [

    {

        id: 1,

        title: 'Varanasi Waterways, 1840',

        description: 'Colonial-era river cartography and settlement patterns in Varanasi.',

        imageUrl: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',

        year: '1840',

        location: 'Varanasi, Uttar Pradesh',

        coordinates: [25.3176, 83.0059],

        tags: ['photography', 'colonial-era', 'varanasi'],

        viewerData: {

            images: [

                { url: 'https://images.unsplash.com/photo-1646200207048-016503f1e3cb?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'Overview of the city landscape.' },

                { url: 'https://images.unsplash.com/photo-1738151466707-9d01641eca77?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'Ghats along the Ganga, circa 1840s.' },

                { url: 'https://images.unsplash.com/photo-1646200207004-6af17a3543f8?q=80&w=4032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'A traditional boat on the river.' }

            ],

            geospatialLayers: {

                'River Flow - 1840': {

                    data: { type: 'Feature', geometry: { type: 'LineString', coordinates: [[82.95, 25.28], [83.00, 25.30], [83.05, 25.32]] } },

                    style: { color: '#0077b6', weight: 4, opacity: 0.8 },

                    info: { Source: 'British Geological Survey', Accuracy: '±50 meters', Method: 'Manual Cartography' }

                },

                'Historical Settlements': {

                    data: { type: 'FeatureCollection', features: [{ type: 'Feature', geometry: { type: 'Point', coordinates: [83.01, 25.31] }, properties: { name: 'Dasaswamedh Area' } }] },

                    style: { color: '#d9534f' },

                    info: { Source: 'Colonial Census Records', Type: 'Major Population Centers' }

                },

                'Classified NDVI': {

                    type: 'wms', // Specify the type

                    url: "https:mapzest.com/geoserver/gwc/service/wms",

                    params: {

                        layers: "Bharat_carbon:Classified_NDVI_Rajasthan_Udaipur_2024",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },





                    //fit to the bounds of the layer

                    bounds: [

                        [25.068185, 73.498535], // Southwest corner [lat, lng]

                        [25.068185, 73.498535]  // Northeast corner [lat, lng]

                    ],

                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },



                'Canopy height': {

                    type: 'wms', // Specify the type

                    url: "https:mapzest.com/geoserver/gwc/service/wms",

                    params: {

                        layers: "Bharat_carbon:Canopy_Height_10m_Udaipur",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },





                    //fit to the bounds of the layer

                    bounds: [

                        [25.068185, 73.498535], // Southwest corner [lat, lng]

                        [25.068185, 73.498535]  // Northeast corner [lat, lng]

                    ],

                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                }



            }

        }

    },

    {

        id: 2,

        title: 'Kanpur Industrial Zone, 1892',

        description: 'Mapping the rise of tanneries and mills along the Ganga.',

        imageUrl: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=800&q=80',

        year: '1892',

        location: 'Kanpur, Uttar Pradesh',

        coordinates: [26.4499, 80.3319],

        tags: ['map', 'industry', 'kanpur'],

        viewerData: {

            images: [{ url: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=1200&q=80', caption: 'Colonial-era survey map.' }],

            geospatialLayers: {

                // 'Historical Settlements (Vector)': {

                //   type: 'wfs', // Specify the type

                //   dataUrl: "http://YOUR_GEOSERVER_IP:8080/geoserver/YOUR_WORKSPACE/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=YOUR_WORKSPACE:settlements_1840&outputFormat=application/json",

                //   style: { color: '#d9534f', weight: 5 },

                //   info: { Source: 'Colonial Census Records', Type: 'Points of Interest' }

                // },

                '1840s Floodplain (Raster)': {

                    type: 'wms', // Specify the type

                    url: "https:mapzest.com/geoserver/gwc/service/wms",

                    params: {

                        layers: "Bharat_carbon:FireRiskMap_Rajasthan_2025",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },

                    info: {

                        Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', somethuisng: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'

                    }





                }

            }

        }

    },

];



const theme = {

    colors: { primary: '#2b6cb0', primaryDark: '#2c5282', background: '#f7fafc', surface: '#ffffff', textPrimary: '#2d3748', textSecondary: '#718096', accent: '#38b2ac', border: '#e2e8f0', white: '#ffffff' },

    shadows: { sm: '0 2px 4px rgba(0,0,0,0.05)', md: '0 4px 10px rgba(0,0,0,0.08)', lg: '0 10px 20px rgba(0,0,0,0.1)' },

    borderRadius: '8px', transition: 'all 0.3s ease-in-out',

};



const GlobalStyles = () => (

    <style>{`

    @keyframes pulse { 0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(43, 108, 176, 0.4); } 70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(43, 108, 176, 0); } 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(43, 108, 176, 0); } }

    .custom-marker { background-color:${theme.colors.primary}; border:2px solid ${theme.colors.white}; border-radius:50%; width:16px; height:16px; transition:${theme.transition}; box-shadow:${theme.shadows.sm}; cursor:pointer; }

    .custom-marker.selected { background-color:${theme.colors.accent}; width:20px; height:20px; animation:pulse 1.5s infinite; }

    .leaflet-popup-content-wrapper { border-radius:${theme.borderRadius}; box-shadow:${theme.shadows.lg}; background:${theme.colors.surface}; }

    .leaflet-popup-content { margin:0; font-family:'Inter',sans-serif; width:200px; }

    .gallery-scrollbar::-webkit-scrollbar { width:8px; }

    .gallery-scrollbar::-webkit-scrollbar-track { background:${theme.colors.background}; }

    .gallery-scrollbar::-webkit-scrollbar-thumb { background-color:#cbd5e0; border-radius:10px; border:2px solid ${theme.colors.background}; }

  `}</style>

);



const useWindowSize = () => {

    const [size, setSize] = useState([window.innerWidth, window.innerHeight]);

    useEffect(() => {

        const handleResize = () => setSize([window.innerWidth, window.innerHeight]);

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);

    }, []);

    return size;

};



const MapBounds = ({ bounds }) => {

    const map = useMap();

    useEffect(() => { if (bounds) map.fitBounds(bounds, { padding: [50, 50], duration: 1 }); }, [bounds, map]);

    return null;

};



const createCustomIcon = (isSelected) => {

    const size = isSelected ? 20 : 16;

    return L.divIcon({

        className: `custom-marker ${isSelected ? 'selected' : ''}`,

        iconSize: [size, size],

        iconAnchor: [size / 2, size / 2],

        popupAnchor: [0, -size / 2 - 2]

    });

};



const Gallery = () => {

    const [selectedItem, setSelectedItem] = useState(galleryData[0]);

    const [searchTerm, setSearchTerm] = useState('');

    const [activeFilter, setActiveFilter] = useState('All Periods');

    const [portalData, setPortalData] = useState(null);

    const mapRef = useRef();

    // FIX: Create a ref to hold references to all Leaflet marker instances

    const markerRefs = useRef({});

    const [width] = useWindowSize();

    const isMobile = width < 1024;



    const filteredItems = galleryData.filter(item => {

        const searchLower = searchTerm.toLowerCase();

        const matchesSearch = item.title.toLowerCase().includes(searchLower) || item.description.toLowerCase().includes(searchLower) || item.tags.some(tag => tag.toLowerCase().includes(searchLower));

        const matchesFilter = (() => {

            if (activeFilter === 'All Periods') return true;

            const yearInt = parseInt(item.year);

            if (isNaN(yearInt)) return activeFilter === 'Pre-1800';

            if (activeFilter === 'Pre-1800') return yearInt < 1800;

            if (activeFilter === '1800-1900') return yearInt >= 1800 && yearInt < 1900;

            if (activeFilter === '1900-Present') return yearInt >= 1900;

            return false;

        })();

        return matchesSearch && matchesFilter;

    });



    // FIX: This effect now also opens the marker's popup

    useEffect(() => {

        if (selectedItem && mapRef.current) {

            mapRef.current.flyTo(selectedItem.coordinates, 13, { duration: 1 }); // Zoom in a bit closer



            const marker = markerRefs.current[selectedItem.id];

            if (marker) {

                // Use a timeout to allow the flyTo animation to start smoothly before the popup opens

                setTimeout(() => {

                    marker.openPopup();

                }, 400);

            }

        }

    }, [selectedItem]);



    return (

        <>

            <GlobalStyles />

            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', height: '100vh', fontFamily: "'Inter', sans-serif" }}>

                <div style={{ width: isMobile ? '100%' : '50%', height: isMobile ? '40%' : '100%' }}>

                    <MapContainer center={[26.4499, 80.3319]} zoom={7} ref={mapRef} zoomControl={false} style={{ height: '100%', width: '100%' }}>

                        <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png" attribution="&copy; CARTO" />

                        <MapBounds bounds={filteredItems.length > 0 ? L.latLngBounds(filteredItems.map(item => item.coordinates)).pad(0.5) : null} />



                        {/* FIX: Render markers from the original `galleryData` to ensure all are always visible */}

                        {galleryData.map(item => (

                            <Marker

                                key={item.id}

                                position={item.coordinates}

                                icon={createCustomIcon(item.id === selectedItem?.id)}

                                eventHandlers={{ click: () => setSelectedItem(item) }}

                                // FIX: Assign the Leaflet instance to our ref holder

                                ref={(el) => { markerRefs.current[item.id] = el; }}

                            >

                                <Popup>

                                    <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100px', objectFit: 'cover', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }} />

                                    <div style={{ padding: '12px' }}>

                                        <h4 style={{ margin: '0 0 5px 0' }}>{item.title}</h4>

                                        <p style={{ margin: 0, fontSize: '12px' }}>{item.location}</p>

                                    </div>

                                </Popup>

                            </Marker>

                        ))}

                    </MapContainer>

                </div>

                <div style={{ width: isMobile ? '100%' : '50%', height: isMobile ? '100%' : 'auto', display: 'flex', flexDirection: 'column', background: theme.colors.background }}>

                    <div style={{ padding: '1rem 1.5rem', backgroundColor: theme.colors.surface, borderBottom: `1px solid ${theme.colors.border}` }}>

                        <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.75rem', color: theme.colors.textPrimary, }}>

                            <FaHistory color={theme.colors.primary} /> Historical Gallery

                        </h1>

                    </div>

                    <div style={{ padding: '1rem 1.5rem', backgroundColor: theme.colors.surface, borderBottom: `1px solid ${theme.colors.border}` }}>

                        <div style={{ position: 'relative', marginBottom: '0.75rem' }}>

                            <FaSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: theme.colors.textSecondary }} />

                            <input type="text" placeholder="Search by title, description, or tag..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}

                                style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.5rem', borderRadius: theme.borderRadius, border: `1px solid ${theme.colors.border}`, fontSize: '0.9rem' }}

                            />

                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '4px' }}>

                            {['All Periods', 'Pre-1800', '1800-1900', '1900-Present'].map(filter => (

                                <button key={filter} onClick={() => setActiveFilter(filter)} style={{

                                    padding: '0.4rem 1rem', borderRadius: '16px', border: '1px solid', whiteSpace: 'nowrap', cursor: 'pointer',

                                    borderColor: activeFilter === filter ? theme.colors.primary : theme.colors.border,

                                    backgroundColor: activeFilter === filter ? theme.colors.primary : theme.colors.surface,

                                    color: activeFilter === filter ? theme.colors.white : theme.colors.textSecondary

                                }}>

                                    {filter}

                                </button>

                            ))}

                        </div>

                    </div>

                    <div className="gallery-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', alignContent: 'flex-start' }}>

                        {filteredItems.map(item => (

                            <div key={item.id} style={{ backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius, boxShadow: item.id === selectedItem?.id ? theme.shadows.lg : theme.shadows.sm, border: `1px solid ${item.id === selectedItem?.id ? theme.colors.primary : 'transparent'}`, cursor: 'pointer', display: 'flex', flexDirection: 'column' }} onClick={() => setSelectedItem(item)}>

                                <img src={item.imageUrl} alt={item.title} style={{ height: '160px', width: '100%', objectFit: 'cover', borderTopLeftRadius: theme.borderRadius, borderTopRightRadius: theme.borderRadius }} />

                                <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>

                                    <div style={{ flex: '1 0 auto' }}>

                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>

                                            {item.tags.map(tag => <span key={tag} style={{ background: `${theme.colors.accent}20`, color: theme.colors.accent, padding: '0.2rem 0.5rem', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 500 }}>{tag}</span>)}

                                        </div>

                                        <h3 style={{ margin: '0 0 0.5rem 0' }}>{item.title}</h3>

                                        <p style={{ fontSize: '0.85rem', margin: 0, color: theme.colors.textSecondary }}>{item.description}</p>

                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${theme.colors.border}`, paddingTop: '0.75rem', marginTop: '1rem' }}>

                                        <div style={{ fontSize: '0.75rem', color: theme.colors.textSecondary }}>

                                            <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.3rem' }}><FaMapMarkerAlt /> {item.location}</p>

                                            <p style={{ margin: '0.2rem 0 0 0', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><FaClock /> {item.year}</p>

                                        </div>

                                        <button onClick={(e) => {

                                            e.stopPropagation();

                                            setPortalData({ title: item.title, description: item.description, ...item.viewerData });

                                        }}

                                            style={{ background: theme.colors.primary, color: 'white', border: 'none', borderRadius: '6px', padding: '0.4rem 0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>

                                            <FaExternalLinkAlt size={10} /> Open

                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>



            {portalData && (

                <MapViewer

                    item={portalData}

                    onClose={() => setPortalData(null)}

                />

            )}

        </>

    );

};



export default Gallery;