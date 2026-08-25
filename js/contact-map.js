function initMap() {
    var mapElement = document.getElementById("mapBox");
    if (!mapElement || !window.google) return;

    var center = { lat: 37.5665, lng: 126.9780 };

    var map = new google.maps.Map(mapElement, {
        center: center,
        zoom: 11,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true
    });

    new google.maps.Marker({
        position: center,
        map: map,
        title: "대한민국 서울"
    });
}
