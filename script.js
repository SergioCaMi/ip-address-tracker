const formEl = document.querySelector("form");
const ipInputEl = document.getElementById("ip-input");
const ipEl = document.getElementById("ip-info");
const locationEl = document.getElementById("location-info");
const timezoneEl = document.getElementById("timezone-info");
const ispEl = document.getElementById("isp-info");

const modal = document.getElementById("modal");
const errorMsgEl = document.getElementById("error-message");
const closeBtn = document.getElementById("close-btn");

const map = L.map("map").setView([41.3851, 2.1734], 13);
const btnSubmit = document.getElementById("btnSubmit");
const mapDisplay = document.getElementById("map");
let latitude = 0;
let longitude = 0;


L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

function showErrorModal(message) {
  errorMsgEl.textContent = message;
  modal.showModal();
}

closeBtn.addEventListener("click", () => {
  modal.close();
});

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault;
  let ipAddress = ipInputEl.value;
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (!ipRegex.test(ipAddress)) {
    console.log("IP no valida");
    showErrorModal("Please enter a valid IP address");
    return;
  }   
    getIPAddress(ipAddress);
});


async function getIPAddress(ipAddress) {
  const response = await fetch(`'https://cors-anywhere.herokuapp.com/https://ipapi.co/${ipAddress}/json/`);
  const data = await response.json();
  console.log(data);
  latitude = data.latitude.toFixed(2);
  longitude = data.longitude.toFixed(2);
  hourFormat = data.utc_offset.slice(0, 3) + ":" + data.utc_offset.slice(3);
  ipEl.textContent = data.ip;
  locationEl.textContent = `${data.city}, ${data.region}, ${data.country_name}`;
  timezoneEl.textContent = `UTC: ${hourFormat}`;
  ispEl.textContent = data.org;
  getMapPosition(data);
}

async function getMapPosition(data) {
  
  map.setView([data.latitude, data.longitude], 13);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  console.log(data.latitude, data.longitude)
  L.marker([data.latitude, data.longitude])
    .addTo(map)
    .bindPopup(data.ip)
    .openPopup();
}

