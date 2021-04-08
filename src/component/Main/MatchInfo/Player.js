import React from 'react';

//각 소환사 정보
function Player(prop){
    return(
        <div className="Summoner ">
            <div className="ChampionImage">
                <img src={prop.player.champion.imageUrl} title={prop.player.champion.imageUrl.substring(prop.player.champion.imageUrl.lastIndexOf('/')+1,prop.player.champion.imageUrl.lastIndexOf('.'))} alt=""/>
            </div>
            <div className="SummonerName">
                    <span className="Link" target="_blank">{prop.player.summonerName}</span>
            </div>
        </div>
    );
}

export default Player;