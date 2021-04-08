import React from 'react';

//자유랭크 정보
function subTierBoxRank(prop){
    return(
        <div className="sub-tier">
			<img src={prop.tierInfo.tierRank.imageUrl} className="Image sub-tier__medal" alt=""/>
            <div className="sub-tier__info ">
                <div className="sub-tier__rank-type">{prop.tierInfo.tierRank.name}</div>
                <div className="sub-tier__rank-tier ">
                    {prop.tierInfo.tierRank.tier + " " + prop.tierInfo.tierRank.shortString}
                </div>
                <div className="sub-tier__league-point">{prop.tierInfo.tierRank.lp} LP
                    <span className="sub-tier__gray-text">/ {prop.tierInfo.wins}승 {prop.tierInfo.losses}패 </span>
                </div>
                <div className="sub-tier__gray-text">
                    승률 {parseInt(prop.tierInfo.wins/(prop.tierInfo.wins+prop.tierInfo.losses)*100)}%
                </div>
            </div>
        </div>
    );
}

export default subTierBoxRank;