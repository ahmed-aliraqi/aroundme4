import { useStore } from 'vuex'
import { toRaw } from 'vue'

export function useMap() {
    const store = useStore()
    const map = toRaw(store.getters['map/getMap'])

    const addSpriteImages = async (map, url) => {
        // Fetch sprite JSON
        const res = await fetch(url + '.json');
        const spriteIndex = await res.json();

        // Fetch sprite PNG
        const imgRes = await fetch(url + '.png');
        const blob = await imgRes.blob();
        const bitmap = await createImageBitmap(blob);

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        for (const name in spriteIndex) {
            const { x, y, width, height, pixelRatio } = spriteIndex[name];

            // Draw sub-image
            canvas.width = width;
            canvas.height = height;
            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(bitmap, x, y, width, height, 0, 0, width, height);

            // Create ImageBitmap for MapLibre
            const subBitmap = await createImageBitmap(canvas);

            // Add to map
            if (!map.hasImage(name)) {
                map.addImage(name, subBitmap, { pixelRatio });
            }
        }
    }

    const addFeature = async (feature, sourceName) => {
        const source = map.getSource(sourceName);

        if (!source) return;

        let data = await source.getData()

        data.features.push(feature);

        source.setData(data);
    }

    const deleteFeature = async (condition, sourceName) => {
        const source = map.getSource(sourceName);

        if (!source) return;

        let data = await source.getData();

        let deletedIds = data.features.filter(condition).map(feature => feature.id);


        data.features = data.features.filter(feature => !deletedIds.includes(feature.id))

        source.setData(data);
    }

    return { map, addSpriteImages, addFeature, deleteFeature }
}


