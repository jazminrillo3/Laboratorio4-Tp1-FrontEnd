// Initialize and add the map
let map;

window.initMap = async function initMap(latitud, longitud) {
	// The location of Uluru
	const position = { lat: latitud, lng: longitud };
	// Request needed libraries.
	//@ts-ignore
	const { Map } = await google.maps.importLibrary("maps");
	const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

	// The map, centered at Uluru
	map = new Map(document.getElementById("map"), {
		zoom: 16,
		center: position,
		mapId: "DEMO_MAP_ID",
	});

	// The marker, positioned at Uluru
	const marker = new AdvancedMarkerView({
		map: map,
		position: position,
	});
}