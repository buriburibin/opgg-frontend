import React from 'react';

//챔피언 정보
function MostChampion(prop){
    return(
        <li>
            <div className="Content">
                <div className="Image">
                    <img src={prop.champion.imageUrl} alt=""/>
                </div>
                <div className="Name">{prop.champion.name}</div>
                <div className="WonLose">
                    <b className={"tip " + (parseInt(prop.champion.wins/prop.champion.games*100)>=60?'red':'')} title="승률">{parseInt(prop.champion.wins/prop.champion.games*100)}%</b> (<span className="win">{prop.champion.wins}</span>승 <span className="lose">{prop.champion.losses}</span>패)
                </div>
                <div className={"KDA " + (((prop.champion.kills+prop.champion.assists)/prop.champion.deaths).toFixed(2)>=6?'orange':'normal') }>
                    <span>{((prop.champion.kills+prop.champion.assists)/prop.champion.deaths).toFixed(2)}</span> 평점
                </div>
            </div>
        </li>
    );
}

export default MostChampion;