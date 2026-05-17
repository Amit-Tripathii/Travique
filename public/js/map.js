
function initMap() {

    const lat = coordinates[1];
    const lng = coordinates[0];

    const location = { lat, lng };

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: location,
    });

    const marker = new google.maps.Marker({
        position: location,
        map: map,
        // icon: {
        //     url: "https://cdn-icons-png.flaticon.com/512/69/69524.png",

        //     scaledSize: new google.maps.Size(40, 40),
        // },
    });
    const infoWindow = new google.maps.InfoWindow({
        content: `
        <h3>${listingLocation}</h3><p>Exact loaction will be shown after booking</p>
    `,
    });

    marker.addListener("click", () => {
        infoWindow.open({
            anchor: marker,
            map,
        });
    });
}

window.initMap = initMap;