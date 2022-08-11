import api from "./api";

// 현재 캐릭터의 모습에서 다른 모습으로 변경함 - 수정 필요 한 번에 묶어서 보내야함
function changeCharacter(idTag, itemnumber, success, fail) {
  api.post("item/change", {idTag: idTag, item_id: itemnumber}).then(success).catch(fail);
}

// 현재 캐릭터의 모습을 가져옴
function customedCharacter(idTag, success, fail) {
  api.get(`member/deco/${idTag}`).then(success).catch(fail);
}

export { changeCharacter, customedCharacter };
