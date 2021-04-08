import React from 'react';

//솔랭 정보
function TierBoxRank(prop){
    return(
        <div className="TierBox Box">
            <div className="SummonerRatingMedium">
                <div className="Medal tip tpd-delegation-uid-1" title="">
                    <img src={prop.tierInfo.tierRank.imageUrl} className="Image" alt=""/>
                </div>
                <div className="TierRankInfo">
                    <div className="RankType">{prop.tierInfo.tierRank.name}</div>
                    <div className="TierRank">{prop.tierInfo.tierRank.tier + " " + prop.tierInfo.tierRank.shortString}</div>
                    <div className="TierInfo">
                        <span className="LeaguePoints">
                        {prop.tierInfo.tierRank.lp} LP
                        </span>
                            /
                        <span className="WinLose">
                            <span className="wins">{prop.tierInfo.wins}승</span>
                            <span className="losses">{prop.tierInfo.losses}패</span>
                            <br/>
                            <span className="winratio">승률 {parseInt(prop.tierInfo.wins/(prop.tierInfo.wins+prop.tierInfo.losses)*100)}%</span>
                        </span>
                    </div>
                    <div className="LeagueName">
                        {prop.tierInfo.tierRank.tierDivision}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TierBoxRank;