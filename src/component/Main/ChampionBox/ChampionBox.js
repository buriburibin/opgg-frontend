import React from 'react';

//챔피언 별 평점 등의 정보
function ChampionBox(prop){
    return(
        <div className="ChampionBox Ranked">
            <div className="Face" title={prop.champion.name}>
                <a href={"https://www.op.gg/champion/" + prop.champion.key + "/statistics"} target="_blank" rel="noreferrer">
                    <img src={prop.champion.imageUrl} width="45" className="ChampionImage" alt={prop.champion.name}/>
                </a>
            </div>
            <div className="ChampionInfo">
                <div className="ChampionName" title={prop.champion.name}>
                    <a href={"https://www.op.gg/champion/" + prop.champion.key + "/statistics"} target="_blank" rel="noreferrer">
                        {prop.champion.name}
                    </a>
                </div>
                <div className="ChampionMinionKill tip tpd-delegation-uid-1" title="">
                                                CS {prop.champion.cs}
                </div>
            </div>
            <div className="PersonalKDA">
                <div className={"KDA tip tpd-delegation-uid-1 " + (((prop.champion.kills+prop.champion.assists)/prop.champion.deaths)>=5?'orange':((prop.champion.kills+prop.champion.assists)/prop.champion.deaths)>=4?'blue':((prop.champion.kills+prop.champion.assists)/prop.champion.deaths)>=3?'green':'normal') }>
                    <span className="KDA">{((prop.champion.kills+prop.champion.assists)/prop.champion.deaths).toFixed(2)}</span>
                    <span className="Text">평점</span>
                </div>
                <div className="KDAEach">
                    <span className="Kill">{(prop.champion.kills/prop.champion.games).toFixed(1)}</span>
                    <span className="Bar">/</span>
                    <span className="Death">{(prop.champion.deaths/prop.champion.games).toFixed(1)}</span>
                    <span className="Bar">/</span>
                    <span className="Assist">{(prop.champion.assists/prop.champion.games).toFixed(1)}</span>
                </div>
            </div>
            <div className="Played">
                <div className={"WinRatio tip tpd-delegation-uid-1 " + (prop.champion.wins/prop.champion.games*100 >= 60?'red':'normal')}>
                    {parseInt(prop.champion.wins/prop.champion.games*100)}%
                </div>
                <div className="Title">{prop.champion.games} 게임</div>
            </div>
        </div>
    );
}

export default ChampionBox;