<template>
    <div class="search-map">
        <BsAutocomplete
            v-bind="attrs"
            v-model="query"
            :items="results"
            :loading="loading"
            display-field="full_address"
            value-field="name"
            @search="handleSearching"
            :placeholder="$t('maps.search_placeholder')"
            :max-results="10"
            :min-chars="2"
            @select="onSelect"
        >
            <template #item="{ item }">
                <div>
                    <div class="fw-bold">{{ item.name }}</div>
                    <small class="text-muted">{{ item.full_address }}</small>
                </div>
            </template>
            <template #no-results>
                <i class="fas fa-search me-2"></i>
                {{ $t('maps.search_empty') }}
            </template>
        </BsAutocomplete>
    </div>
</template>
<style>
.search-map {
    position: absolute;
    z-index: 2;
    border-radius: 0;
    top: 10px;
    right: 10px;
    width: 500px;
    max-width: 95%;
}

.search-icon {
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    pointer-events: none;
}
</style>
<script setup>
import BsAutocomplete from "@/components/Form/BsAutocomplete.vue";
import {ref, useAttrs} from "vue";
import axios from "@/plugins/axios";
import {useMap} from "@/composables/useMap.js";

defineOptions({name: 'Search'})

const attrs = useAttrs();
const query = ref('');
const results = ref([]);
const loading = ref(false);

const {map} = useMap();
const handleSearching = async (searchQuery) => {
    if (!searchQuery || searchQuery.length < 2) {
        results.value = [];
        return;
    }

    try {
        loading.value = true;

        const response = await axios.get('/api/map/search', {
            params: {
                q: searchQuery
            }
        });

        results.value = response.data.data || [];

    } catch (error) {
        results.value = [];
    } finally {
        loading.value = false;
    }
};

const onSelect = (selectedItem) => {
    const lng = parseFloat(selectedItem.long);
    const lat = parseFloat(selectedItem.lat);

    map.flyTo({
        center: [lng, lat],
        zoom: 16, // or any zoom level you prefer
        duration: 1000,
    });

    query.value = selectedItem.name;
};
</script>
