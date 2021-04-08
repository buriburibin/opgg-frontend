import React from 'react';

//자유랭크 정보 없을경우
function subTierBoxUnrank(prop){
    return(
        <div className="sub-tier">
            <img src={prop.tierInfo.tierRank.imageUrl} className="Image sub-tier__medal" alt=""/>
            <div className="sub-tier__info unranked">
                <div className="sub-tier__rank-type">{prop.tierInfo.tierRank.name}</div>
                <div className="sub-tier__rank-tier unranked">
                    Unranked
                </div>
            </div>
        </div>
    );
}

export default subTierBoxUnrank;