import React, { useState } from 'react';

//연관 소환사 화면
function AutoCompleteSummoner(prop){
    const [hoverClass,setHoverClass] = useState('');

    //마우스 오버시 클래스 주입
    const mouseOverOnSummoner = ()=>{
        setHoverClass("autocomplete-selected");
    }
    //마우스 아웃시 클래스 제거
    const mouseOutFromSummoner = ()=>{        
        setHoverClass("");
    }

    return(
        <div onMouseDown={()=>prop.search(prop.summoner.name)} onMouseOver={mouseOverOnSummoner} onMouseOut={mouseOutFromSummoner} className={"autocomplete-suggestion "+hoverClass} data-index={prop.index}>
            <div className="autocomplete-item autocomplete-item--SUMMONER">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <img className="autocomplete-item--thumb" src={prop.summoner.profileImageUrl} alt=""/>
                            </td>
                            <td>
                                <div className="autocomplete-item--content">
                                    <div className="autocomplete-item--name"><b>{prop.summoner.name.substring(0,prop.summoner.name.length-1)}</b>{prop.summoner.name.substring(prop.summoner.name.length-1)}</div>
                                    <div className="autocomplete-item--info">Level {prop.summoner.level}</div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AutoCompleteSummoner;