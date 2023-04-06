const ipEl = document.getElementById("ip");
const locationEl = document.getElementById("location");
const timezoneEl = document.getElementById("timezone");
const ispEl = document.getElementById("isp");
const input = document.querySelector(".form__search");
const btn = document.querySelector(".form__submit");

async function getRequest() {
  const api = "at_YUXNeURqBhorf2dRgo8cQld37Hbq7";
  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${api}&ipAddress=${input.value}&domain=${input.value}`;
  const response = await fetch(url, {
    mathod: "GET",
  });
  const data = await response.json();
  updateInfo(data);
  updateMap(data);
}

function updateInfo(data) {
  ipEl.innerHTML = data.ip;
  locationEl.innerHTML = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;
  timezoneEl.innerHTML = `UTC ${data.location.timezone}`;
  ispEl.innerHTML = data.isp;
}
function initializingMap() {
  // call this method before you initialize your map.
  var container = L.DomUtil.get("map");
  if (container != null) {
    container._leaflet_id = null;
  }
}

function updateMap(data) {
  initializingMap();
  var map = L.map("map", {
    center: [data.location.lat, data.location.lng],
    zoom: 15,
    zoomControl: false,
  });

  var myIcon = L.icon({
    iconUrl: "./images/icon-location.svg",
  });
  L.marker([data.location.lat, data.location.lng], {
    icon: myIcon,
  }).addTo(map);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
}

btn.addEventListener("click", (e) => {
  e.preventDefault();
  getRequest();
});

window.addEventListener("load", () => {
  getRequest();
});
