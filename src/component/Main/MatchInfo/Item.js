import React from 'react';
import ReactTooltip from 'react-tooltip';

//아이템 정보
function Item(prop){
    return(
        <div className="Item">
            <img src={prop.item} className="Image tip" data-tip data-for={prop.matchId+"_"+prop.itemId+"_"+prop.index} alt={prop.itemInfo.name}/> 
            <ReactTooltip id={prop.matchId+"_"+prop.itemId+"_"+prop.index} place="top" effect="solid" html={true}>
                {"<b style='color:#00cfbc'>"+prop.itemInfo.name + "</b><br/>" + prop.itemInfo.description + (prop.itemInfo.gold.total!==0?"<br/><span>가격:</span><span style='color:#ffc659'>" + prop.itemInfo.gold.total + " (" + prop.itemInfo.gold.base + ")</span>":"")}
            </ReactTooltip>    
        </div>
    );
}

export default Item;