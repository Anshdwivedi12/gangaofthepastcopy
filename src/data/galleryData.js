export const galleryData = [
    {
        id: 1,
        title: 'Haridwar',
        description: 'City in Uttarakhand',
        imageUrl: 'https://images.unsplash.com/photo-1642774667024-e9e2f37914d2?q=80&w=1907&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        year: '1840',
        coordinates: [29.9457, 78.1642],
        tags: ['photography', 'colonial-era', 'Uttarakhand'],
        viewerData: {
            images: [
                { url: 'https://images.unsplash.com/photo-1642774667024-e9e2f37914d2?q=80&w=1907&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'Ghats along the Ganga, circa 1840s.' },
                { url: 'https://s7ap1.scene7.com/is/image/incredibleindia/ganga-ghat-haridwar2-attr-hero?qlt=82&ts=1726645932819' },
                { url: 'https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2025/04/21184342/Haridwar-riverfront-.jpg', caption: 'Overview of the city landscape.' },
                { url: 'https://s7ap1.scene7.com/is/image/incredibleindia/birla-ghat-haridwar-uttarakhand-1-musthead-hero?qlt=82&ts=1726645921438', caption: 'Overview of the city landscape.' },

            ],
            geospatialLayers: {


                'CORONA': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:W1",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },

                    bounds: [
                        [29.839423439930357, 78.09534310505906], // SW corner
                        [30.104773678578493, 78.33561650286458] // NE corner
                    ],



                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },

                'FCC - 2000': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:Landsat5_FCC_2000",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },

                    bounds: [
                        [29.700480615721112, 77.96815254112975], // SW corner
                        [30.140367022946027, 78.37792558286998] // NE corner
                    ],

                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },

                'FCC - 2010': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:Landsat7_FCC_2010",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },


                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },

                'FCC - 2020': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:Landsat8_FCC_2020",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },

                    bounds: [
                        [29.700480615721112, 77.96815254112975], // SW corner
                        [30.140367022946027, 78.37792558286998] // NE corner
                    ],



                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },

                'LULC - 2000': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:LULC_2000_RF",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },

                    bounds: [
                        [29.700480615721112, 77.96815254112975], // SW corner
                        [30.140367022946027, 78.37792558286998] // NE corner
                    ],



                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },
                'LULC - 2010': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:LULC_2010_RF",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },



                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },

                'River Network': {
                    type: 'geojson', // Use a custom type to identify it as a vector layer

                    // This URL fetches the raw vector data from GeoServer
                    url: "http://localhost:8080/geoserver/gangaofthepast/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=gangaofthepast:river_network&outputFormat=application/json&srsName=EPSG:4326",

                    // You don't need 'params' because everything is in the URL

                    bounds: [
                        [29.700480615721112, 77.96815254112975], // SW corner
                        [30.140367022946027, 78.37792558286998]  // NE corner
                    ],
                    info: { Source: 'Survey of India', Year: '2020', Type: 'LineString', AdditionalInfo: 'Centerline of the Ganga river.' }
                },



            }
        }
    },
    {
        id: 2,
        title: 'Bijnor',
        description: 'City in Uttar Pradesh.',
        imageUrl: 'https://images.bhaskarassets.com/web2images/521/2025/08/07/8c97fd7c-577d-4184-90c9-abcf5ccef5a9_1754561701101.jpg',
        year: '1892',
        location: 'Bijnor, Uttar Pradesh',
        coordinates: [29.3732, 78.1351],
        tags: ['map', 'industry', 'kanpur'],
        viewerData: {
            images: [{ url: 'https://images.bhaskarassets.com/web2images/521/2025/08/07/8c97fd7c-577d-4184-90c9-abcf5ccef5a9_1754561701101.jpg', caption: 'Colonial-era survey map of Kanpur.' },
            { url: 'https://www.jagranimages.com/images/newimg/14102022/14_10_2022-bijnor_news_23140101.webp', caption: 'Colonial-era survey map of Kanpur.' },
            { url: 'https://files.yappe.in/place/full/madhya-ganga-barrage-bijnor-7632847.webp', caption: 'Colonial-era survey map of Kanpur.' },
            { url: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=1200&q=80', caption: 'Colonial-era survey map of Kanpur.' }
            ],
            geospatialLayers: {
                'CORONA': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:W2-corona",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },

                    bounds: [
                        [29.124655332439563, 77.91975595246888], // SW corner
                        [29.60010252962003, 78.20523824392568] // NE corner
                    ],



                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },

                'FCC - 2000': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:W2_fcc_2000_w2",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },

                    bounds: [
                        [29.103528743375847, 77.86776545804837], // SW corner
                        [29.591583437237983, 78.31350950202848] // NE corner
                    ],

                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },

                'FCC - 2010': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:W2_fcc_2010_w2",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },

                    bounds: [
                        [29.103528743375847, 77.86776545804837], // SW corner
                        [29.591583437237983, 78.31350950202848] // NE corner
                    ],


                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },

                'FCC - 2020': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:W2_fcc_2020_w2",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },

                    bounds: [
                        [29.103528743375847, 77.86776545804837], // SW corner
                        [29.591583437237983, 78.31350950202848] // NE corner
                    ],



                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },


                'River Centerline 2000': {
                    type: 'wfs',

                    // FIX: Changed 'url' to 'dataUrl'
                    dataUrl: "http://localhost:8080/geoserver/gangaofthepast/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=gangaofthepast:2000_W2_RC&outputFormat=application/json&srsName=EPSG:4326",

                    // You don't need 'params' because everything is in the URL

                    bounds: [
                        [29.700480615721112, 77.96815254112975], // SW corner
                        [30.140367022946027, 78.37792558286998]  // NE corner
                    ],

                    style: {
                        color: '#3388ff',      // A standard blue line color
                        weight: 3,            // Line thickness
                        opacity: 0.8          // Line opacity
                    },

                    info: { Source: 'Survey of India', Year: '2020', Type: 'LineString', AdditionalInfo: 'Centerline of the Ganga river.' }
                },



                'River Centerline 2010': {
                    type: 'wfs',

                    dataUrl: "http://localhost:8080/geoserver/gangaofthepast/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=gangaofthepast:2010_W2_RC&outputFormat=application/json&srsName=EPSG:4326",

                    bounds: [
                        [29.700480615721112, 77.96815254112975], // SW corner
                        [30.140367022946027, 78.37792558286998]  // NE corner
                    ],
                    info: {
                        Source: 'Survey of India',
                        Year: '2020',
                        Type: 'LineString',
                        AdditionalInfo: 'Centerline of the Ganga river.'
                    }
                },

                'River Centerline 2020': {
                    type: 'wfs',

                    dataUrl: "http://localhost:8080/geoserver/gangaofthepast/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=gangaofthepast:2020_W2_RC&outputFormat=application/json&srsName=EPSG:4326",

                    bounds: [
                        [29.700480615721112, 77.96815254112975], // SW corner
                        [30.140367022946027, 78.37792558286998]  // NE corner
                    ],
                    info: {
                        Source: 'Survey of India',
                        Year: '2020',
                        Type: 'LineString',
                        AdditionalInfo: 'Centerline of the Ganga river.'
                    }
                }

            }
        }
    },
    // NEW: Added third card for Haridwar
    {
        id: 3,
        title: 'Narora',
        description: 'Town in Uttar Pradesh',
        imageUrl: 'https://www.earthtrip.in/gallery/cityImage/1460016041_Naraura.jpg',
        year: '1910',
        location: 'Town in Uttar Pradesh',
        coordinates: [28.1968, 78.3814],
        tags: ['pilgrimage', 'haridwar', 'map'],
        viewerData: {
            images: [
                { url: 'https://www.jagranimages.com/images/newimg/06082025/06_08_2025-ganga_water_sambhal_24004953.webp', caption: 'Har Ki Pauri ghat in Haridwar.' },
                { url: 'https://www.jagranimages.com/images/18_08_2019-18sbl600_19498359.jpg', caption: 'Suspension bridge near the pilgrimage sites.' },
                { url: 'https://i.ytimg.com/vi/znUf9Or3GwU/maxresdefault.jpg', caption: 'Suspension bridge near the pilgrimage sites.' },
                { url: 'https://www.jagranimages.com/images/newimg/23072025/23_07_2025-ganga_tigri_water_23991784.webp', caption: 'Suspension bridge near the pilgrimage sites.' },
            ],
            geospatialLayers: {
                'CORONA': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:W3",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },

                    bounds: [
                        [27.971967577808368, 78.13402392711708], // SW corner
                        [28.63495417610746, 78.71149867772756] // NE corner
                    ],



                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },

                'FCC - 2000': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:FCC_2000_W3",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },

                    bounds: [
                        [27.905355817, 78.079049213], // SW corner
                        [28.601460331, 78.803181163] // NE corner
                    ],

                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },

                'FCC - 2010': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:FCC_2010_W3",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },

                    bounds: [
                        [27.905355817, 78.079049213], // SW corner
                        [28.601460331, 78.803181163] // NE corner
                    ],



                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },

                'FCC - 2020': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:FCC_2020_W3",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },

                    bounds: [
                        [27.905355817, 78.079049213], // SW corner
                        [28.601460331, 78.803181163] // NE corner
                    ],




                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },

                'River Centerline 2000': {
                    type: 'wfs',

                    // FIX: Changed 'url' to 'dataUrl'
                    dataUrl: "http://localhost:8080/geoserver/gangaofthepast/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=gangaofthepast:2000_window3&outputFormat=application/json&srsName=EPSG:4326",

                    // You don't need 'params' because everything is in the URL

                    bounds: [
                        [27.905355817, 78.079049213], // SW corner
                        [28.601460331, 78.803181163] // NE corner
                    ],

                    style: {
                        color: '#3388ff',      // A standard blue line color
                        weight: 3,            // Line thickness
                        opacity: 0.8          // Line opacity
                    },

                    info: { Source: 'Survey of India', Year: '2020', Type: 'LineString', AdditionalInfo: 'Centerline of the Ganga river.' }
                },

                'River Centerline 2010': {
                    type: 'wfs',

                    // FIX: Changed 'url' to 'dataUrl'
                    dataUrl: "http://localhost:8080/geoserver/gangaofthepast/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=gangaofthepast:2010_window3&outputFormat=application/json&srsName=EPSG:4326",

                    // You don't need 'params' because everything is in the URL

                    bounds: [
                        [27.905355817, 78.079049213], // SW corner
                        [28.601460331, 78.803181163] // NE corner
                    ],

                    style: {
                        color: '#3388ff',      // A standard blue line color
                        weight: 3,            // Line thickness
                        opacity: 0.8          // Line opacity
                    },

                    info: { Source: 'Survey of India', Year: '2020', Type: 'LineString', AdditionalInfo: 'Centerline of the Ganga river.' }
                },

                'River Centerline 2020': {
                    type: 'wfs',

                    // FIX: Changed 'url' to 'dataUrl'
                    dataUrl: "http://localhost:8080/geoserver/gangaofthepast/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=gangaofthepast:2020_window3&outputFormat=application/json&srsName=EPSG:4326",

                    // You don't need 'params' because everything is in the URL

                    bounds: [
                        [27.905355817, 78.079049213], // SW corner
                        [28.601460331, 78.803181163] // NE corner
                    ],

                    style: {
                        color: '#3388ff',      // A standard blue line color
                        weight: 3,            // Line thickness
                        opacity: 0.8          // Line opacity
                    },

                    info: { Source: 'Survey of India', Year: '2020', Type: 'LineString', AdditionalInfo: 'Centerline of the Ganga river.' }
                },
            }
        }
    },


    {
        id: 4,
        title: 'Kanpur',
        description: 'City in Uttar Pradesh',
        imageUrl: 'https://staticimg.amarujala.com/assets/images/2018/01/02/ganga-bairaj_1514905401.jpeg?w=750&dpr=1.0',
        year: '1910',
        location: 'Town in Uttar Pradesh',
        coordinates: [26.4499, 80.3319],
        tags: ['pilgrimage', 'haridwar', 'map'],
        viewerData: {
            images: [
                { url: 'https://i.ytimg.com/vi/2iBNzLhuiAQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBfEHeSUYmM1mVf_U1FtcCyXnLWew', caption: 'Har Ki Pauri ghat in Haridwar.' },
                { url: 'https://staticimg.amarujala.com/assets/images/2021/09/07/b-b_1630993496.jpeg', caption: 'Suspension bridge near the pilgrimage sites.' },
                { url: 'https://avathioutdoors.gumlet.io/travelGuide/dev/kanpur_P8532.jpg', caption: 'Suspension bridge near the pilgrimage sites.' },
                { url: 'https://i.ytimg.com/vi/2iBNzLhuiAQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBfEHeSUYmM1mVf_U1FtcCyXnLWew', caption: 'Suspension bridge near the pilgrimage sites.' }
            ],
            geospatialLayers: {
                'CORONA': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:W4",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },

                    bounds: [
                        [26.246534417400117, 80.16264383221377], // SW corner
                        [26.669635676864623, 80.61775669039434] // NE corner
                    ],



                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },

                'FCC - 2000': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:FCC_2000_W4",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },

                    bounds: [
                        [25.978469533, 80.131789469], // SW corner
                        [26.788031267, 80.858616365] // NE corner
                    ],

                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },

                'FCC - 2010': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:FCC_2010_W4",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },

                    bounds: [
                        [25.978469533, 80.131789469], // SW corner
                        [26.788031267, 80.858616365] // NE corner
                    ],


                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },

                'FCC - 2020': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:FCC_2020_W4",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },

                    bounds: [
                        [25.978469533, 80.131789469], // SW corner
                        [26.788031267, 80.858616365] // NE corner
                    ],



                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },
            }
        }
    },

    {
        id: 5,
        title: 'Window5',
        description: '---',
        imageUrl: 'https://www.earthtrip.in/gallery/cityImage/1460016041_Naraura.jpg',
        year: '1910',
        location: 'Town in Uttar Pradesh',
        coordinates: [29.9457, 78.1642],
        tags: ['pilgrimage', 'haridwar', 'map'],
        viewerData: {
            images: [
                { url: 'https://images.unsplash.com/photo-1642774667024-e9e2f37914d2?q=80&w=1907&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'Har Ki Pauri ghat in Haridwar.' },
                { url: 'https://images.unsplash.com/photo-1596635293634-11d2745a9757?auto=format&fit=crop&w=1200&q=80', caption: 'Suspension bridge near the pilgrimage sites.' }
            ],
            geospatialLayers: {
                'CORONA': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:W3",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },



                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },

                'FCC - 2000': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:FCC_2000_W3",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },

                    bounds: [
                        [27.90535581741723, 78.07904921287329], // SW corner
                        [28.601460331081448, 78.80318116340203] // NE corner
                    ],

                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },

                'FCC - 2010': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:FCC_2010_W3",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },


                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },

                'FCC - 2020': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:FCC_2020_W3",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },



                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },
            }
        }
    },

    {
        id: 6,
        title: 'Window6',
        description: '---',
        imageUrl: 'https://www.earthtrip.in/gallery/cityImage/1460016041_Naraura.jpg',
        year: '1910',
        location: 'Town in Uttar Pradesh',
        coordinates: [29.9457, 78.1642],
        tags: ['pilgrimage', 'haridwar', 'map'],
        viewerData: {
            images: [
                { url: 'https://images.unsplash.com/photo-1642774667024-e9e2f37914d2?q=80&w=1907&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'Har Ki Pauri ghat in Haridwar.' },
                { url: 'https://images.unsplash.com/photo-1596635293634-11d2745a9757?auto=format&fit=crop&w=1200&q=80', caption: 'Suspension bridge near the pilgrimage sites.' }
            ],
            geospatialLayers: {
                'CORONA': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:W3",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },



                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },

                'FCC - 2000': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:FCC_2000_W3",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },

                    bounds: [
                        [27.90535581741723, 78.07904921287329], // SW corner
                        [28.601460331081448, 78.80318116340203] // NE corner
                    ],

                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },

                'FCC - 2010': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:FCC_2010_W3",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },


                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },

                'FCC - 2020': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:FCC_2020_W3",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },



                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },
            }
        }
    },

    {
        id: 7,
        title: 'Window7',
        description: '---',
        imageUrl: 'https://www.earthtrip.in/gallery/cityImage/1460016041_Naraura.jpg',
        year: '1910',
        location: 'Town in Uttar Pradesh',
        coordinates: [29.9457, 78.1642],
        tags: ['pilgrimage', 'haridwar', 'map'],
        viewerData: {
            images: [
                { url: 'https://images.unsplash.com/photo-1642774667024-e9e2f37914d2?q=80&w=1907&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'Har Ki Pauri ghat in Haridwar.' },
                { url: 'https://images.unsplash.com/photo-1596635293634-11d2745a9757?auto=format&fit=crop&w=1200&q=80', caption: 'Suspension bridge near the pilgrimage sites.' }
            ],
            geospatialLayers: {
                'CORONA': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:W3",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },



                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },

                'FCC - 2000': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:FCC_2000_W3",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },

                    bounds: [
                        [27.90535581741723, 78.07904921287329], // SW corner
                        [28.601460331081448, 78.80318116340203] // NE corner
                    ],

                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },

                'FCC - 2010': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:FCC_2010_W3",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },


                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },

                'FCC - 2020': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:FCC_2020_W3",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },



                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },
            }
        }
    },

    {
        id: 8,
        title: 'Window8',
        description: '---',
        imageUrl: 'https://www.earthtrip.in/gallery/cityImage/1460016041_Naraura.jpg',
        year: '1910',
        location: 'Town in Uttar Pradesh',
        coordinates: [29.9457, 78.1642],
        tags: ['pilgrimage', 'haridwar', 'map'],
        viewerData: {
            images: [
                { url: 'https://images.unsplash.com/photo-1642774667024-e9e2f37914d2?q=80&w=1907&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'Har Ki Pauri ghat in Haridwar.' },
                { url: 'https://images.unsplash.com/photo-1596635293634-11d2745a9757?auto=format&fit=crop&w=1200&q=80', caption: 'Suspension bridge near the pilgrimage sites.' }
            ],
            geospatialLayers: {
                'CORONA': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:W3",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },



                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },

                'FCC - 2000': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:FCC_2000_W3",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },

                    bounds: [
                        [27.90535581741723, 78.07904921287329], // SW corner
                        [28.601460331081448, 78.80318116340203] // NE corner
                    ],

                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },

                'FCC - 2010': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:FCC_2010_W3",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },


                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },

                'FCC - 2020': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:FCC_2020_W3",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },



                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },
            }
        }
    },

    {
        id: 9,
        title: 'Window9',
        description: '---',
        imageUrl: 'https://www.earthtrip.in/gallery/cityImage/1460016041_Naraura.jpg',
        year: '1910',
        location: 'Town in Uttar Pradesh',
        coordinates: [29.9457, 78.1642],
        tags: ['pilgrimage', 'haridwar', 'map'],
        viewerData: {
            images: [
                { url: 'https://images.unsplash.com/photo-1642774667024-e9e2f37914d2?q=80&w=1907&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'Har Ki Pauri ghat in Haridwar.' },
                { url: 'https://images.unsplash.com/photo-1596635293634-11d2745a9757?auto=format&fit=crop&w=1200&q=80', caption: 'Suspension bridge near the pilgrimage sites.' }
            ],
            geospatialLayers: {
                'CORONA': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:W3",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },



                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },

                'FCC - 2000': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:FCC_2000_W3",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },

                    bounds: [
                        [27.90535581741723, 78.07904921287329], // SW corner
                        [28.601460331081448, 78.80318116340203] // NE corner
                    ],

                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },

                'FCC - 2010': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:FCC_2010_W3",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },


                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },

                'FCC - 2020': {

                    type: 'wms', // Specify the type

                    url: "http://localhost:8080/geoserver/ows?",

                    params: {

                        layers: "gangaofthepast:FCC_2020_W3",

                        format: "image/png",

                        transparent: true,

                        // attribution: "Your Attribution"

                    },



                    info: { Source: 'Hydrological Survey', Year: '1840', Resolution: '30m', AdditionalInfo: 'classified layer of rajasthan NDVI.' }

                },
            }
        }
    }
];


export default galleryData;