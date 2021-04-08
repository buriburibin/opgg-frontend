import React from 'react';

//7일간 챔피언별 승률 정보
function RecentChampionBox(prop){
    return(
        <div className="ChampionWinRatioBox">
            <div className="Face">
                <a href={"https://www.op.gg/champion/" + prop.champion.key + "/statistics"} target="_blank" rel="noreferrer">
                    <img src={prop.champion.imageUrl} title={prop.champion.name} style={{width:"30px",height:"30px",borderRadius:"50%"}} alt=""/>
                </a>
            </div>
            <div className="ChampionInfo">
                <div className="ChampionName" title={prop.champion.name}>
                    <a href={"https://www.op.gg/champion/" + prop.champion.key + "/statistics"} target="_blank" rel="noreferrer">
                        {prop.champion.name}
                    </a>
                </div>
            </div>
            <div className="WinRatio">
                {parseInt(prop.champion.wins/(prop.champion.wins+prop.champion.losses)*100)}%
            </div>
            <div className="RatioGraph">
                <div className="WinRatioGraph">
                    <div className="Graph">
                        <div className="Fill Left __spSite __spSite-6" style={{width: parseInt(prop.champion.wins/(prop.champion.wins+prop.champion.losses)*100)+'%'}}/>
                        <div className="Text Left">{prop.champion.wins}승</div>
                        <div className="Fill Right __spSite __spSite-7"/>
                        <div className="Text Right">{prop.champion.losses}패</div>
                        <div className="Bar" style={{left: parseInt(prop.champion.wins/(prop.champion.wins+prop.champion.losses)*100)+'%'}}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecentChampionBox;