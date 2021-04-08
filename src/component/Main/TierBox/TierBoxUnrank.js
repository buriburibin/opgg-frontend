import React from 'react';

//솔랭정보 없을경우
function TierBoxUnrank(prop){
    return(
        <div className="TierBox Box">
            <div className="SummonerRatingMedium tip tpd-delegation-uid-1">
                <div className="Medal">
                <img src={prop.tierInfo.tierRank.imageUrl} className="Image" alt=""/>
                </div>
                <div className="TierRankInfo">
                    <div className="RankType">{prop.tierInfo.tierRank.name}</div>
                    <div className="TierRank unranked">
                        Unranked
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TierBoxUnrank;