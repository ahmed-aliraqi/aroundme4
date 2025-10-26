<template>
    <div class="map-container">
        <div id="map" class="map" v-bind="$attrs">
            <Search v-if="mapLoaded"></Search>
            <slot />

            <div
                class="position-absolute"
                style="z-index: 5; bottom: 10px; left: 10px; text-align: left"
            >
                <img
                    id="attrib-logo"
                    src="https://ksamaps.com/assets/images/logo.png"
                    style="width: 10%"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, watch, computed, toRaw, inject } from 'vue';
    import { useStore } from 'vuex';
    import maplibregl from 'maplibre-gl';
    import Search from '@/components/Maps/Search.vue';
    import { useTheme } from '@/composables/useTheme.js';
    import { Locale } from '@/plugins/locales.js';

    const { theme, resolvedMode } = useTheme();

    // Props and emits for v-model support
    const props = defineProps({
        modelValue: {
            type: Array,
            default: () => [],
        },
        controls: {
            type: Boolean,
            default: true,
        },
        search: {
            type: Boolean,
            default: false,
        },
    });


    const styleUrl = computed(
        () => '/api/map/style' + (resolvedMode.value === 'dark' ? '?style=dark' : '')
    );

    watch(resolvedMode, (newMode, OldMode) => {
        if (! OldMode) {
            return;
        }
        reloadMap();
    });
    const applyLanguage = () => {
        if (Locale.getCode() === 'ar') {
            langLayers.forEach(lid => {
                map.value.setLayoutProperty(lid, 'text-field', '{NAME2}');
            });
        }
    };
    const reloadMap = async () => {
        if (!map.value) return;

        // اجلب الـ style ككائن JSON (not string!)
        const style = await fetch(styleUrl.value).then((r) => r.json());

        // فك الـ proxies
        const rawStyle = toRaw(style);

        map.value.setStyle(rawStyle);

        map.value.once('styledata', () => {
            applyLanguage();
        });
    };

    const emit = defineEmits(['update:modelValue']);

    // Vuex store
    const store = useStore();

    // Inject global config
    const $maplibregl = inject('$maplibregl') || maplibregl;

    // Internal map reference
    const map = ref(null);
    const mapLoaded = ref(false);

    const langLayers = [
        'sealabels',
        'countrylabels1',
        'countrylabels2',
        'communitylabels',
        'islandlabels',
        'provincelabels',
        'sanctuarylabels',
        'citylabels1',
        'citylabels2',
        'citylabels3',
        'citylabels4',
        'citylabels5',
        'ferry_points',
        'stnw4_label',
        'stnw3_label',
        'stnw2_label',
        'stnw1_label',
        'ferry_label',
        'pois1',
        'pois2',
        'pois3',
        'pois4',
        'pois5',
    ];

    const initMap = () => {
        if (map.value) return;

        map.value = toRaw(new $maplibregl.Map({
            container: 'map',
            style: styleUrl.value,
            center: [50.03168, 26.310987],
            zoom: 10,
            minZoom: 4.26,
            maxZoom: 20,
            pitchWithRotate: false,
            attributionControl: false,
        }));

        map.value.addControl(
            new maplibregl.AttributionControl({
                compact: true,
                customAttribution: '',
            }),
            'bottom-right'
        );

        // ✅ Store in Vuex
        store.commit('map/setMap', map.value);

        if (props.controls) {
            // Zoom & rotation
            map.value.addControl(
                new $maplibregl.NavigationControl({ showCompass: false }),
                'bottom-right'
            );
            map.value.addControl(
                new $maplibregl.GeolocateControl({
                    positionOptions: {
                        enableHighAccuracy: true,
                    },
                    trackUserLocation: true, // keeps following the user
                    showUserHeading: true, // shows user's heading with an arrow
                }),
                'bottom-right'
            );
        }
    };

    onMounted(() => {
        initMap();

        map.value.on('load', () => {
            if (props.search) {
                mapLoaded.value = true;
            }

            applyLanguage()
        })
    });
</script>
