import React from 'react';

//라인 정보 없을경우
function MostPositionNoData(prop){
    return(
        <li>
            <div className="Image">
                <i className="__spSite __spSite-149"></i>
            </div>
            <div className="PositionStatContent">
                <div className="Message">포지션 정보가 없습니다.</div>
            </div>
        </li>
    );
}

export default MostPositionNoData;