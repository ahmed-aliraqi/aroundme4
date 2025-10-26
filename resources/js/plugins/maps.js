import maplibregl from 'maplibre-gl';

const MapsPlugin = {
    install(app) {
        maplibregl.setRTLTextPlugin(
            'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js'
        )

        // Provide dependencies to all components
        app.provide('maplibregl', maplibregl);
    }
};

export default MapsPlugin;
