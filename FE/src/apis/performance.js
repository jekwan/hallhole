import api from "./api";

function fetchPerformanceList(params, success, fail) {
  api.get("performance", { params: params }).then(success).catch(fail);
}

function fetchPerformance(id, success, fail) {
  api.get(`performance/${id}`).then(success).catch(fail);
}

function searchPerformance(name, success, fail) {
  api.get(`performance/search/${name}`).then(success).catch(fail);
}

function fetchImages(success, fail) {
  api.get(`performance/images`).then(success).catch(fail);
}

export { fetchPerformanceList, fetchPerformance, searchPerformance, fetchImages };
