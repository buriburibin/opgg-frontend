import React,{useState,useEffect} from 'react';
import './Main.css';
import PastRank from './PastRank/PastRank';
import TierBoxRank from './TierBox/TierBoxRank';
import TierBoxUnrank from './TierBox/TierBoxUnrank';
import SubTierBoxRank from './TierBox/SubTierBoxRank';
import SubTierBoxUnrank from './TierBox/SubTierBoxUnrank';
import ChampionBox from './ChampionBox/ChampionBox';
import RecentChampionBox from './ChampionBox/RecentChampionBox';
import MatchInfoMain from './MatchInfo/MatchInfoMain';

//소환사 정보 보기창
function Main(prop){    
    const summonerName = prop.summonerName; 
    const [summonerInfo, setSummonerInfo] = useState();
    const [pastRankList, setPastRankList] = useState();
    const [profileImageUrl, setProfileImageUrl] = useState();
    const [profileBorderImageUrl, setProfileBorderImageUrl] = useState();
    const [level, setLevel] = useState();
    const [ladderRank, setLadderRank] = useState();
    const [ladderRankPercentOfTop, setLadderRankPercentOfTop] = useState();
    const [tierBox, setTierBox] = useState();
    const [subTierBox, setSubTierBox] = useState();
    const [mostChampionInfo, setMostChampionInfo] = useState();
    const [rankChampionList, setRankChampionList] = useState(); 
    const [recentChampionList, setRecentChampionList] = useState();
    const [mostDisplay, setMostDisplay] = useState(['','none','active','']);
    const [matchInfoMain, setMatchInfoMain] = useState();
    
    //검색할 소환사 정보를 가져오기
    const getSummonerInfo = ()=>{
        if(!summonerName){
            return;
        }
        fetch("https://codingtest.op.gg/api/summoner/" + summonerName)
        .then((resp=>resp.json()))
        .then((data)=>{
            setSummonerInfo(data.summoner);
        })
        .catch(error => {
            console.error('Error:', error);
            alert("소환사 정보를 가져오는 중 오류가 발생했습니다.");
        });
    }

    //소환사의 가장 많이 플레이한 정보 가져오기
    const getChampionsInfo = ()=>{
        if(!summonerName){
            return;
        }
        fetch("https://codingtest.op.gg/api/summoner/" + summonerName + "/mostInfo")
        .then((resp=>resp.json()))
        .then((data)=>{
            setMostChampionInfo(data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert("챔피언 정보를 가져오는 중 오류가 발생했습니다.");
        });
    }

    //소환사의 정보를 세팅해주기
    const setSummonerData = ()=>{   
        if(!summonerInfo){
            return;
        }    
        let tempPastRankList = []; 
        summonerInfo.previousTiers.forEach((element,index) => {
            tempPastRankList.push(<PastRank
                key={index}
                pastRank={element}
            />)
        });
        setPastRankList(tempPastRankList);
        setProfileImageUrl(summonerInfo.profileImageUrl);
        setProfileBorderImageUrl(summonerInfo.profileBorderImageUrl);
        setLevel(summonerInfo.level);
        setLadderRank(summonerInfo.ladderRank.rank);
        setLadderRankPercentOfTop(summonerInfo.ladderRank.rankPercentOfTop);
        if(summonerInfo.leagues[0].hasResults){
            setTierBox(<TierBoxRank
                    tierInfo={summonerInfo.leagues[0]}
                />)
        } else {
            setTierBox(<TierBoxUnrank
                    tierInfo={summonerInfo.leagues[0]}
                />)
        }
        if(summonerInfo.leagues[1].hasResults){
            setSubTierBox(<SubTierBoxRank
                    tierInfo={summonerInfo.leagues[1]}
                />)
        } else {
            setSubTierBox(<SubTierBoxUnrank
                    tierInfo={summonerInfo.leagues[1]}
                />)
        }
    }

    //가장많이 플레이한 챔피언 정보 세팅
    const setMostChampionData = ()=>{
        if(!mostChampionInfo){
            return;
        }    
        let championInfoList = mostChampionInfo.champions;
        championInfoList.sort((a,b)=>{
            if ( a.games > b.games ){
                return -1;
            } else if ( a.games < b.games ){
                return 1;
            } else{
                return 0;
            }
        });

        let tempChampionInfoList = [];
        championInfoList.forEach((element,index) => {
            tempChampionInfoList.push(<ChampionBox
                key={index}
                champion={element}
            />)
        });
        setRankChampionList(tempChampionInfoList);

        let recentChampionInfoList = mostChampionInfo.recentWinRate;
        recentChampionInfoList.sort((a,b)=>{
            if ( a.wins+a.losses > b.wins+b.losses ){
                return -1;
            } else if ( a.wins+a.losses < b.wins+b.losses ){
                return 1;
            } else{
                return 0;
            }
        });

        let tempRecentChampionInfoList = [];
        recentChampionInfoList.forEach((element,index) => {
            tempRecentChampionInfoList.push(<RecentChampionBox
                key={index}
                champion={element}
            />)
        });
        setRecentChampionList(tempRecentChampionInfoList);
    }

    //프리시즌,7일간 랭크승률 탭 체인지
    const changeDisplay = (target)=>{
        let tempMostDisplay = [...mostDisplay];
        if(target===0){
            tempMostDisplay[0] = '';
            tempMostDisplay[1] = 'none';
            tempMostDisplay[2] = 'active';
            tempMostDisplay[3] = '';
        } else if(target===1){
            tempMostDisplay[0] = 'none';
            tempMostDisplay[1] = '';
            tempMostDisplay[2] = '';
            tempMostDisplay[3] = 'active';
        }
        setMostDisplay(tempMostDisplay);
    }

    //최근 20게임에 관한 정보 메인화면 호출
    const setMatchInfo = ()=>{
        setMatchInfoMain(<MatchInfoMain
            summonerName={summonerName}
                />);
    }
    
    useEffect(getSummonerInfo,[summonerName]);
    useEffect(getChampionsInfo,[summonerName]);
    useEffect(setMatchInfo,[summonerName]);
    useEffect(setSummonerData,[summonerInfo]);
    useEffect(setMostChampionData,[mostChampionInfo]);

    return(
        <div className="l-container">        
            <div className="SummonerLayoutWrap">
                <div className="SummonerLayout tabWrap _recognized">
                    <div className="Header">    
                        <div className="PastRank">    
                            <ul className="PastRankList">
                                {pastRankList}
                            </ul>
                        </div>    
                        <div className="Face">
                            <div className="ProfileIcon">
                                <div className="borderImage" style={{backgroundImage: 'url('+profileBorderImageUrl+')'}}></div>
                                <img src={profileImageUrl} className="ProfileImage" alt=""/>
                                <span className="Level tip" title="레벨">{level}</span>
                            </div>
                        </div>
    
                        <div className="Profile">
                            <div className="Information">
                                <span className="Name">{prop.summonerName}</span>
                                <div className="Rank">
                                    <div className="LadderRank">
                                        <span className="tip Link tpd-delegation-uid-1" title="" target="_blank">
                                            래더 랭킹 <span className="ranking">{ladderRank}</span>위 (상위 {ladderRankPercentOfTop}%)
                                        </span>
                                    </div>
                                </div> 
                            </div>    
                        </div>
                        <div className="ContentWrap tabItems" id="SummonerLayoutContent">
                            <div className="opgg__notice-summoner-top"/>
                                <div className="tabItem Content SummonerLayoutContent summonerLayout-summary" style={{display: 'block'}}>
                                    <div className="SideContent">
                                        {tierBox}      

                                        {subTierBox}

                                        <div className="Box tabWrap stats-box _recognized">
                                            <div className="Tab">
                                                <ul className="TabList tabHeaders">
                                                    <li className={"Item tabHeader " + mostDisplay[2]}>
                                                        <span onClick={()=>changeDisplay(0)}>프리시즌</span>
                                                    </li>
                                                    <li className={"Item tabHeader " + mostDisplay[3]}>
                                                        <span onClick={()=>changeDisplay(1)}>7일간 랭크 승률</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="Content tabItems">
                                                <div className="MostChampionContent tabItem overview-stats--all" style={{display: mostDisplay[0]}}>
                                                    <div className="MostChampionContent">
                                                        {rankChampionList}                                                                         
                                                    </div>
                                                </div>
                                                <div className="MostChampionContent tabItem overview-stats--all" style={{display: mostDisplay[1]}}>
                                                    <div className="Content">
                                                        {recentChampionList}                                                                         
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {matchInfoMain}
                                </div>
                            </div>
                        </div>
                 </div>
            </div>
        </div>
    );
}

export default Main;