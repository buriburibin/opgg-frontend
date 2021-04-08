import React from 'react';

//라인 정보
function MostPosition(prop){
    return(
        <li>
            <div className="Image">
                <i className="__spSite __spSite-139"/>
            </div>
            <div className="PositionStatContent">
                <div className="Name">{prop.position.position==='TOP'?'탑':prop.position.position==='JNG'?'정글':prop.position.position==='MID'?'미드':prop.position.position==='ADC'?'원딜':'서폿'}</div>
                <span className="RoleRate">
                    <b>{parseInt(prop.position.games/20*100)}</b>%</span>
                <span className="WinRatio">승률										
                    <span>
                        <b>{parseInt(prop.position.wins/prop.position.games*100)}</b>%
                    </span>
                </span>
            </div>
        </li>
    );
}

export default MostPosition;