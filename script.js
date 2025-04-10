const formEl = document.querySelector('form');
const ipInputEl = document.getElementById('ip-input');
const ipEl = document.getElementById('ip-info');
const locationEl = document.getElementById('location-info');
const timezoneEl = document.getElementById('timezone-info');
const ispEl = document.getElementById('isp-info');

const modal = document.getElementById('modal');
const errorMsgEl = document.getElementById('error-message');
const closeBtn = document.getElementById('close-btn');

const map = L.map('map').setView([0, 0], 13);
