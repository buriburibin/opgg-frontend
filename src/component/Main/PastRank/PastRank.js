import React from 'react';

//지난 시즌 랭크 창
function PastRank(prop){
    return(<li className="Item tip" title={prop.pastRank.tier + " " + prop.pastRank.shortString + " " + prop.pastRank.lp + "LP"}>
                <b>S{prop.pastRank.season}</b> {prop.pastRank.tier}
            </li>
    );
}

export default PastRank;