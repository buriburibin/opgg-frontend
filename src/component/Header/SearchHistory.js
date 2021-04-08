import React from 'react';

//최근 검색 소환사
function SearchHistory(prop){
    const summonerName = prop.summonerName;
    return(<div className="Item ">	
                <span style={{cursor:"pointer"}} onMouseDown={()=>prop.search(summonerName)} className="Link">{summonerName}</span>	
                <div className="Actions">
                    <span style={{cursor:"pointer"}} onMouseDown={()=>prop.delete(summonerName)} className="Action Delete"></span>	
                </div>
            </div>
    );
}

export default SearchHistory;