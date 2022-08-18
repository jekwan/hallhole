import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const ws = Stomp.over(() => new SockJS("https://i7a401.p.ssafy.io/ws/chat"));

function getWebsocket() {
  return ws;
}

export { getWebsocket };
