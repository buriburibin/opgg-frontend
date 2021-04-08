import React from 'react';

//챔피언 정보 없을경우
function MostChampionNoData(prop){
    return(
        <li>
            <div className="NotFound">
                <div className="Image">
                    <i className="__spSite __spSite-88"></i>
                </div>
                <div className="Message">챔피언 정보가 없습니다.</div>
            </div>
        </li>
    );
}

export default MostChampionNoData;

