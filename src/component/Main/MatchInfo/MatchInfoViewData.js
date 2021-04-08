import React,{useState,useEffect} from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import MostChampion from './MostChampion';
import MostChampionNoData from './MostChampionNoData';
import MostPosition from './MostPosition';
import MostPositionNoData from './MostPositionNoData';
import Match from './Match';

//20게임에 대한 정보 화면
function MatchInfoViewData(prop){
    const mostChampionInfo = prop.matchInfo.champions;
    const mostPositionInfo = prop.matchInfo.positions;
    const games = prop.matchInfo.games;
    const [mostChampionList,setMostChampionList] = useState();
    const [mostPositionList,setMostPositionList] = useState();
    const [gameList,setGameList] = useState();

    //20게임동안 많이한 챔피언 정보 세팅
    const setMostChampionData = ()=>{
        if(!mostChampionInfo){
            return;
        }
        let tempMostChampionList = [];
        mostChampionInfo.sort((a,b)=>{
            if(a.games<b.games){
                return 1;
            } else if(a.games>b.games){
                return -1;
            } else {
                return 0;
            }
        });
        for (let index = 0; index < 3; index++) {
            const element = mostChampionInfo[index];
            if(element){
                tempMostChampionList.push(<MostChampion
                    key={index}
                    champion={element}
                />)
            } else {
                tempMostChampionList.push(<MostChampionNoData
                                        key={index}
                                        />)
            }
        }
        setMostChampionList(tempMostChampionList);
    }

    //20게임동안 많이 한 포지션 정보 세팅
    const setMostPositionData = ()=>{
        if(!mostPositionInfo){
            return;
        }
        let tempMostPositionList = [];
        mostPositionInfo.sort((a,b)=>{
            if(a.games<b.games){
                return 1;
            } else if(a.games>b.games){
                return -1;
            } else {
                return 0;
            }
        });
        for (let index = 0; index < 2; index++) {
            const element = mostPositionInfo[index];
            if(element){
                tempMostPositionList.push(<MostPosition
                    key={index}
                    position={element}
                />)
            } else {
                tempMostPositionList.push(<MostPositionNoData
                                        key={index}
                                        />)
            }
        }
        setMostPositionList(tempMostPositionList);
    }

    //최근 플레이한 게임 정보 세팅
    const setGameListData = ()=>{
        if(!games){
            return;
        }
        let tempGameList = [];
        games.forEach((element,index) => {
            tempGameList.push(<Match
                key={index}
                game={element}
            />)
        });
        setGameList(tempGameList);
    }

    useEffect(setMostChampionData,[mostChampionInfo]);
    useEffect(setMostPositionData,[mostPositionInfo]);
    useEffect(setGameListData,[games]);

    return(
        <>
            <div className="GameAverageStatsBox" id="GameAverageStatsBox-matches">
                <div className="Box">
                    <table className="GameAverageStats">
                        <tbody>
                            <tr>
                                <td className="Title" colSpan="2">
                                    <div className="WinRatioTitle">
                                        <span className="total">{prop.matchInfo.summary.wins+prop.matchInfo.summary.losses}</span>전
                                        <span className="win">{prop.matchInfo.summary.wins}</span>승
                                        <span className="lose">{prop.matchInfo.summary.losses}</span>패
                                    </div>
                                </td>
                                <td className="MostChampion" rowSpan="2">
                                    <ul>
                                        {mostChampionList}
                                    </ul>
                                </td>
                                <td className="Title">선호 포지션 (랭크)</td>
                            </tr>
                            <tr>
                                <td className="Summary">                            
                                    <div className="WinRatioGraph">
                                        <div className="Graph" style={{width: '90px', height: '90px'}}>
                                            <HighchartsReact 
                                                highcharts={ Highcharts } 
                                                containerProps={{ style: { height: "90px" } }}
                                                options={{
                                                    chart: {
                                                        backgroundColor: null,
                                                        borderColor: "transparent",
                                                        borderWidth: 0,
                                                        polar: true,
                                                        spacing: 0,
                                                        margin: [0, 0, 0, 0],
                                                        type: 'pie'
                                                    },
                                                    credits: {
                                                        enabled: !1
                                                    },
                                                    legend: {
                                                        enabled: !1
                                                    },
                                                    title: {
                                                        text: null
                                                    },
                                                    xAxis: {},
                                                    yAxis: {
                                                        lineWidth: 0,
                                                        labels: {
                                                            enabled: !1
                                                        }
                                                    },
                                                    plotOptions: {
                                                        pie: {
                                                            size: undefined || 90,
                                                            allowPointSelect: !1,
                                                            dataLabels: {
                                                                enabled: !1
                                                            },
                                                            innerSize: undefined || 64,
                                                            enableMouseTracking: !1,
                                                            animation: !1,
                                                            borderWidth: 0
                                                        }
                                                    },
                                                    series: [{
                                                        data: [
                                                            {
                                                                y: prop.matchInfo.summary.losses,
                                                                color: '#ee5a52'
                                                            }, {
                                                                y: prop.matchInfo.summary.wins,
                                                                color: '#1f8ecd'
                                                            }
                                                        ]
                                                    }]
                                                }}/>
                                        </div>
                                        <div className="Text">{parseInt(prop.matchInfo.summary.wins/(prop.matchInfo.summary.wins+prop.matchInfo.summary.losses)*100)}%</div>
                                    </div>
                                </td>
                                <td className="KDA">
                                    <div className="KDA">
                                        <span className="Kill">{(prop.matchInfo.summary.kills/(prop.matchInfo.summary.wins+prop.matchInfo.summary.losses)).toFixed(1)}</span> /
                                        <span className="Death">{(prop.matchInfo.summary.deaths/(prop.matchInfo.summary.wins+prop.matchInfo.summary.losses)).toFixed(1)}</span> /
                                        <span className="Assist">{(prop.matchInfo.summary.assists/(prop.matchInfo.summary.wins+prop.matchInfo.summary.losses)).toFixed(1)}</span>
                                    </div>
                                    <div className="KDARatio">
                                        <span className="KDARatio">{((prop.matchInfo.summary.kills+prop.matchInfo.summary.assists)/prop.matchInfo.summary.deaths).toFixed(2)}:1</span>
                                    </div>
                                </td>
                                <td className="PositionStats">
                                    <ul className="Content">
                                        {mostPositionList}                                    
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="GameItemList">
                {gameList}
            </div>
        </>
    );
}

export default MatchInfoViewData;