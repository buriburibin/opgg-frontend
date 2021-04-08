import React,{useEffect, useState} from 'react';
import MatchInfoViewData from './MatchInfoViewData';

//최근 20게임 정보 메인화면
function MatchInfoMain(prop){
    const [matchInfo, setMatchInfo] = useState(['total','active','','']);
    const [matchInfoList, setMatchInfoList] = useState();
    const [matchViewContent, setMatchViewContent] = useState();
    const [displayVal, setDisplayVal] = useState(['none','none']);

    //표출할 매치 타입 변경
    const changeMatchInfo = (event)=>{
        let tempMatchInfo = [...matchInfo];
        tempMatchInfo[0] = event.target.getAttribute('data-type');
        if(tempMatchInfo[0] === 'total'){
            tempMatchInfo[1] = 'active';
            tempMatchInfo[2] = '';
            tempMatchInfo[3] = '';
        } else if(tempMatchInfo[0] === 'soloranked'){
            tempMatchInfo[1] = '';
            tempMatchInfo[2] = 'active';
            tempMatchInfo[3] = '';
        } else if(tempMatchInfo[0] === 'flexranked'){
            tempMatchInfo[1] = '';
            tempMatchInfo[2] = '';
            tempMatchInfo[3] = 'active';
        }
        setMatchInfo(tempMatchInfo);
    }

    //최근 20게임에 관한 정보 가져오기
    const getMatchInfoList = ()=>{
        if(!prop.summonerName){
            return;
        }
        fetch("https://codingtest.op.gg/api/summoner/" + prop.summonerName + "/matches")
        .then((resp=>resp.json()))
        .then((data)=>{
            setMatchInfoList(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    //가져온 20게임에 대한 정보를 세팅
    const setMatchData = ()=>{
        const matchType = matchInfo[0]==='soloranked'?'솔랭':matchInfo[0]==='flexranked'?'자유 5:5 랭크':'토탈';
        let tempDisplayVal = [...displayVal];
        tempDisplayVal[0] = 'none';
        tempDisplayVal[1] = '';
        setDisplayVal(tempDisplayVal);

        if(matchInfoList) {
            let tempMatchInfoList = JSON.parse(JSON.stringify(matchInfoList));
            if(matchInfo[0] !== 'total'){
                tempMatchInfoList.games.forEach((element,index) => {
                    if(element.gameType !== matchType){
                        delete tempMatchInfoList.games[index];
                    }
                });
            }
            setMatchViewContent(<MatchInfoViewData
                                summonerName={prop.summonerName}
                                matchInfo={tempMatchInfoList}
                                />);
        }
    }

    //로딩 화면 끝
    const changeDisplayVal = ()=>{        
        let tempDisplayVal = [...displayVal];
        tempDisplayVal[0] = '';
        tempDisplayVal[1] = 'none';
        setDisplayVal(tempDisplayVal);
    }

    useEffect(getMatchInfoList,[prop.summonerName,matchInfo]);
    useEffect(setMatchData// eslint-disable-next-line react-hooks/exhaustive-deps
        ,[matchInfoList]);
    useEffect(changeDisplayVal// eslint-disable-next-line react-hooks/exhaustive-deps
        ,[matchViewContent]);

    return(        
        <div className="RealContent">
            <div className="GameListContainer">
                <div className="Header Box">
                    <div className="Navigation">
                        <ul className="List Type">
                            <li className={"Item " + matchInfo[1]}>
                                <span onClick={changeMatchInfo} className="Link" data-type="total" style={{cursor:'pointer'}}>전체</span>
                            </li>
                            <li className={"Item " + matchInfo[2]}>
                                <span onClick={changeMatchInfo} className="Link" data-type="soloranked" style={{cursor:'pointer'}}>솔로랭크</span>
                            </li>
                            <li className={"Item " + matchInfo[3]}>
                                <span onClick={changeMatchInfo} className="Link" data-type="flexranked" style={{cursor:'pointer'}}>자유랭크</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="Content" style={{display:displayVal[0]}}>
                    {matchViewContent}
                </div>
                <div className="Content" style={{display:displayVal[1]}}>
                    <div className="CenterTableWrapper" style={{width: '100%', height: '100%', minHeight: '300px'}}>
                        <table width="100%" height="100%" style={{minHeight: '300px'}}>
                            <tbody>
                                <tr>
                                    <td valign="middle" align="center">
                                        <div className="Loading black"/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MatchInfoMain;