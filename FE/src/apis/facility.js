import api from "./api";

function fetchFacilityList(params, success, fail) {
  api.get("facility", { params: params }).then(success).catch(fail);
}

function fetchFacility(id, success, fail) {
  api.get(`facility/${id}`).then(success).catch(fail);
}

function searchFacility(name, success, fail) {
  api.get(`facility/search/${name}`).then(success).catch(fail);
}

export { fetchFacilityList, fetchFacility, searchFacility };
