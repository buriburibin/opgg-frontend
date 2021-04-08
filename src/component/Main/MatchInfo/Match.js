import React,{useState,useEffect} from 'react';
import Item from './Item';
import ItemNoData from './ItemNoData';
import Player from './Player';
import ReactTooltip from 'react-tooltip'

//게임 하나하나의 정보를 보여주기
function Match(prop){
    const matchId = prop.game.gameId;
    const [matchDate] = useState(new Date(prop.game.createDate*1000));
    const [ago,setAgo] = useState();
    const [matchData,setMatchData] = useState();
    const items = prop.game.items;
    const [itemDivList,setItemDivList] = useState();
    const [teamDivList1,setTeamDivList1] = useState();
    const [teamDivList2,setTeamDivList2] = useState();

    //얼마 전의 게임인지 값 세팅
    const setAgoData = ()=>{        
        const nowDate = new Date();
        const dateDiff = (nowDate.getTime()-matchDate.getTime())/1000;
        if(nowDate.getMonth() - matchDate.getMonth() !== 0){
            setAgo((12 + nowDate.getMonth() - matchDate.getMonth())%12===1?'한':(12 + nowDate.getMonth() - matchDate.getMonth())%12 + '달 전');
        } else if(parseInt(dateDiff/(60*60*24)) > 0){
            setAgo(parseInt((dateDiff/(60*60*24))===1?'하루':parseInt(dateDiff/(60*60*24))+'일') + ' 전');
        } else if(parseInt(dateDiff/(60*60)) > 0){
            setAgo((parseInt(dateDiff/(60*60))===1?'한':parseInt(dateDiff/(60*60))) + '시간 전');
        } else if(parseInt(dateDiff/60) > 0){
            setAgo(parseInt(dateDiff/60) + '분 전');
        } else {
            setAgo(dateDiff + '초 전');
        }
    }

    //게임의 세부정보 가져오기
    const getMatchData = ()=>{
        if(!matchId){
            return;
        }
        fetch("https://codingtest.op.gg/api/summoner/" + prop.game.summonerName + "/matchDetail/" + matchId)
        .then((resp=>resp.json()))
        .then((data)=>{
            setMatchData(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    //각 게임의 아이템 정보 세팅
    const setItemList = ()=>{
        if(!items){
            return;
        }
        let tempItemDivList = [];
        fetch("http://ddragon.leagueoflegends.com/cdn/10.15.1/data/ko_KR/item.json")
        .then((resp=>resp.json()))
        .then((data)=>{
            for (let index = 0; index < 7; index++) {
                const element = items[index];
                if(element){
                    tempItemDivList.push(<Item
                        key={index}
                        index={index}
                        item={element.imageUrl}
                        itemId={element.imageUrl.substring(element.imageUrl.lastIndexOf('/')+1,element.imageUrl.lastIndexOf('.'))}
                        matchId={matchId}
                        itemInfo={data.data[element.imageUrl.substring(element.imageUrl.lastIndexOf('/')+1,element.imageUrl.lastIndexOf('.'))]}
                    />);
                } else {
                    tempItemDivList.push(<ItemNoData
                        key={index}
                                />);
                }
                
            }
            setItemDivList(tempItemDivList);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    //각 게임의 팀 별 소환사 정보 세팅
    const setTeamData = ()=>{
        if(!matchData){
            return;
        }
        let tempTeamDivList1 = [];
        matchData.teams[0].players.forEach((element,index) => {
            tempTeamDivList1.push(
                <Player
                    key={index}
                    player={element}
                />
            )
        });
        setTeamDivList1(tempTeamDivList1);
        let tempTeamDivList2 = [];
        matchData.teams[1].players.forEach((element,index) => {
            tempTeamDivList2.push(
                <Player
                    key={index}
                    player={element}
                />
            )
        });
        setTeamDivList2(tempTeamDivList2);
    }
    
    useEffect(setAgoData,[matchDate]);
    useEffect(getMatchData,[matchId,prop.game.summonerName]);
    useEffect(setItemList,[items,matchId]);
    useEffect(setTeamData,[matchData]);

    return(
        <div className="GameItemWrap">
            <div className={"GameItem " + (prop.game.isWin?"Win":"Lose")}>
                        <div className="Content">
                    <div className="GameStats">
                        <div className="GameType" title={prop.game.gameType}>
                            {prop.game.gameType}
                        </div>
                        <div className="TimeStamp">
                            <span className="_timeago _timeCountAssigned tip" data-tip data-for={"timestamp" + matchId}>{ago}</span>
                            <ReactTooltip id={"timestamp" + matchId} place="top" effect="solid" html={true}>
                                {matchDate.getFullYear() + '년 '+ (matchDate.getMonth()+1) + '월 ' + matchDate.getDate() + '일 ' + (matchDate.getHours() < 12 ? '오전 ':'오후 ') + matchDate.getHours() % 12 + '시 ' + matchDate.getMinutes() + '분'}
                            </ReactTooltip>  
                        </div>
                        <div className="Bar"></div>
                        <div className="GameResult">
                                 {prop.game.isWin?"승리":"패배"}									
                        </div>
                        <div className="GameLength">{parseInt(prop.game.gameLength/3600)>0?parseInt(prop.game.gameLength/3600)+'시간 ':'' + parseInt((prop.game.gameLength%3600)/60)+'분 ' + (prop.game.gameLength%60) + '초'}</div>
                        
                    </div>
                    <div className="GameSettingInfo">
                        <div className="ChampionImage">
                            <a href={"https://www.op.gg/champion/" + prop.game.champion.imageUrl.substring(prop.game.champion.imageUrl.lastIndexOf('/')+1,prop.game.champion.imageUrl.lastIndexOf('.')) + "/statistics"} target="_blank" rel="noreferrer"><img src={prop.game.champion.imageUrl} className="Image" alt={prop.game.champion.imageUrl.substring(prop.game.champion.imageUrl.lastIndexOf('/')+1,prop.game.champion.imageUrl.lastIndexOf('.'))}/></a>
                        </div>

                        <div className="SummonerSpell">
                            <div className="Spell">
                                <img src={prop.game.spells[0].imageUrl} className="Image tip tpd-delegation-uid-1" title="" alt={prop.game.spells[0].imageUrl.substring(prop.game.spells[0].imageUrl.lastIndexOf('/')+1,prop.game.spells[0].imageUrl.lastIndexOf('.'))}/>
                            </div>
                            <div className="Spell">
                                <img src={prop.game.spells[1].imageUrl} className="Image tip tpd-delegation-uid-1" title="" alt={prop.game.spells[1].imageUrl.substring(prop.game.spells[1].imageUrl.lastIndexOf('/')+1,prop.game.spells[1].imageUrl.lastIndexOf('.'))}/>
                            </div>
                        </div>
                        <div className="Runes">
                            <div className="Rune">
                                <img src={prop.game.peak[0]} className="Image tip tpd-delegation-uid-1" title="" alt=""/>
                            </div>
                            <div className="Rune">
                                <img src={prop.game.peak[1]} className="Image tip" title="" alt=""/>
                            </div>
                        </div>
                        <div className="ChampionName">
                            <a href={"https://www.op.gg/champion/" + prop.game.champion.imageUrl.substring(prop.game.champion.imageUrl.lastIndexOf('/')+1,prop.game.champion.imageUrl.lastIndexOf('.')) + "/statistics"} target="_blank" rel="noreferrer">{prop.game.champion.imageUrl.substring(prop.game.champion.imageUrl.lastIndexOf('/')+1,prop.game.champion.imageUrl.lastIndexOf('.'))}</a>
                        </div>
                    </div>
                    <div className="KDA">
                        <div className="KDA">
                            <span className="Kill">{prop.game.stats.general.kill}</span> /
                            <span className="Death">{prop.game.stats.general.death}</span> /
                            <span className="Assist">{prop.game.stats.general.assist}</span>
                        </div>
                        <div className="KDARatio">
                            <span className="KDARatio ">{prop.game.stats.general.kdaString}</span> 평점				
                        </div>
                        <div className="MultiKill" style={{display:!prop.game.stats.general.largestMultiKillString?'none':''}}>
                            <span className="Kill">{prop.game.stats.general.largestMultiKillString}</span>
                        </div>
                    </div>
                    <div className="Stats">
                        <div className="Level">
                            레벨{prop.game.champion.level}
                        </div>
                        <div className="CS">
                            <span className="CS tip" title={prop.game.stats.general.cs + " 분당CS " + prop.game.stats.general.csPerMin + "개"}>{prop.game.stats.general.cs} ({prop.game.stats.general.csPerMin})</span> CS
                        </div>
                        <div className="CKRate tip" title="킬관여율">
                            킬관여 {prop.game.stats.general.contributionForKillRate}%
                        </div>
                        <div className="MMR">
                            <span>매치 평균</span>
                            <br/>
                            <b>{prop.game.tierRankShort}</b>
                        </div>
                    </div>
                    <div className="Items">
                        <div className="ItemList">
                            {itemDivList}
                            <button className="Button OpenBuildButton tip" title="빌드" type="button">
                                <img className="On" src="//opgg-static.akamaized.net/css3/sprite/images/icon-buildred-p.png" alt=""/>
                                <img className="Off" src="//opgg-static.akamaized.net/css3/sprite/images/icon-buildred-p.png" alt=""/>
                            </button>
                        </div>
                        <div className="Trinket">
                            <img src="//opgg-static.akamaized.net/images/site/summoner/icon-ward-red.png" alt=""/>
                                제어 와드 <span className="wards vision">{prop.game.stats.ward.visionWardsBought}</span></div>
                        </div>
                    <div className="FollowPlayers Names">
                        <div className="Team">
                            {teamDivList1}                            
                        </div>
                        <div className="Team">
                            {teamDivList2}                            
                        </div>
                    </div>
                    <div className="StatsButton">
                        <div className="Content">
                            <div className="Item">
                                <span id="right_match" className="Button MatchDetail">
                                    <span className="__spSite __spSite-198 Off"></span>
                                    <span className="__spSite __spSite-197 On"></span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Match;