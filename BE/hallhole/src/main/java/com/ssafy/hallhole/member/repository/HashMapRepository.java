package com.ssafy.hallhole.member.repository;


import com.ssafy.hallhole.member.dto.SessionDTO;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

@Repository
public class HashMapRepository {

    private HashMap<Long, List<SessionDTO>> sessionHashMap = new HashMap<>();
    private long tokenValidTime = 60 * 60 * 1000L;

    // insert
    public void addSession(Long uid, String sessionId) {
        Date now = new Date();
        List<SessionDTO> sList = new LinkedList<>();
        SessionDTO sessionDto = new SessionDTO(sessionId,new Date(now.getTime() + tokenValidTime));
        if(sessionHashMap.containsKey(uid)){
            // uid가 있으면
            List<SessionDTO> sessionList = sessionHashMap.get(uid);
            Boolean flag = false;
            for(int i=0;i<sessionList.size();i++){
                SessionDTO s = sessionList.get(i);
                if(s.getSessionId().equals(sessionDto.getSessionId())){
                    s.setExpireDate(new Date(now.getTime() + tokenValidTime));
                    sList.add(s);
                    flag = true;
                }
                else{
                    if(s.getExpireDate().before(new Date(now.getTime()))){
                        continue;
                    }
                    else{
                        sList.add(s);
                    }
                }
            }

            if(!flag) {
                sList.add(sessionDto);
            }
        }
        else{
            //uid가 없으면
            sList.add(sessionDto);
            sessionHashMap.put(uid,sList);
        }
    }

    // select
    public SessionDTO findSession (Long uid, String sessionId){
        if(sessionHashMap.containsKey(Long.toString(uid))){
            List<SessionDTO> sessionList = sessionHashMap.get(uid);
            for(SessionDTO s : sessionList){
                if(s.getSessionId().equals(sessionId)){
                    return s;
                }
            }
        }
        else{
            return null;
        }
        return null;
    }

    // delete
    public void deleteSession(Long uid, String sessionId){
        if(sessionHashMap.containsKey(Long.toString(uid))){
            List<SessionDTO> sessionList = sessionHashMap.get(uid);
            for(int i=0;i<sessionList.size();i++){
                if(sessionList.get(i).getSessionId().equals(sessionId)){
                    sessionList.remove(i);
                    break;
                }
            }
        }
    }

}
