import React,{useState} from 'react';
import SearchHistory from './SearchHistory';
import AutoCompleteSummoner from './AutoCompleteSummoner';
import './Header.css';

// 상단의 소환사 검색 헤더
function Header(prop) {
    const [displayVal, setDisplayVal] = useState(['none','none']);
    const [historyDisplayVal, sethistoryDisplayVal] = useState(['none','none']);
    const [searchName, setSearchName] = useState('');
    const [searchHistory, setSearchHistory] = useState(JSON.parse(localStorage.getItem("searchHistory")));
    const [searchHistoryList, setSearchHistoryList] = useState();
    const [autocompleteDivList, setAutocompleteDivList] = useState();

    //소환사 검색창에 검색어 입력시
    const typingName = (event)=>{
        const tempSearchName = event.target.value;
        setSearchName(tempSearchName);
        let tempDisplayVal = [...displayVal];
        if(tempSearchName.length>0){
            tempDisplayVal[0] = 'none';
            tempDisplayVal[1] = '';
            setAutocompleteSummoner(tempSearchName);
            let debouncer = setTimeout(() => {
                setDisplayVal(tempDisplayVal);
            }, 300);
            return () => {
                clearTimeout(debouncer);
            }
        } else {
            tempDisplayVal[0] = '';
            tempDisplayVal[1] = 'none';
            setDisplayVal(tempDisplayVal);
        }
    }

    //연관된 소환사 목록
    const setAutocompleteSummoner = (tempSearchName)=>{
        let tempAutocompleteDivList = [];
        let autoCompleteSearchNameList = [];
        for (let index = 0; index < 4; index++) {
            autoCompleteSearchNameList[index] = tempSearchName.substring(0,tempSearchName.length-1)+String.fromCharCode(parseInt(tempSearchName.substring(tempSearchName.length-1).charCodeAt(0).toString(10))+(index));
        }
        autoCompleteSearchNameList.forEach((element,index) => {
            fetch("https://codingtest.op.gg/api/summoner/" + element)
            .then((resp=>resp.json()))
            .then((data)=>{
                tempAutocompleteDivList.push(<AutoCompleteSummoner
                                        key={index}
                                        index={index}
                                        summoner={data.summoner}
                                        search={search}
                                            />);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
        setAutocompleteDivList(tempAutocompleteDivList);
    }

    //검색내역 제거
    const deleteHistory = (deleteName)=>{
        let tempSearchHistory = [...searchHistory];
        tempSearchHistory.splice(tempSearchHistory.indexOf(deleteName),1);
        localStorage.setItem("searchHistory",JSON.stringify(tempSearchHistory));
        setSearchHistory(tempSearchHistory);        
    }

    //검색내역으로 조회
    const clickHistoryName = (summonerName)=>{
        setSearchName(summonerName);
        search(summonerName);
    }

    //빠른 검색 닫기
    const closeHistory = (event)=>{
        let tempDisplayVal = [...displayVal];
        tempDisplayVal[0] = 'none';
        tempDisplayVal[1] = 'none';
        setDisplayVal(tempDisplayVal);
        let tempHistoryDisplayVal = [...historyDisplayVal];
        tempHistoryDisplayVal[1] = 'none';
        tempHistoryDisplayVal[0] = 'none';
        sethistoryDisplayVal(tempHistoryDisplayVal);
    }

    //빠른 검색 열기
    const openHistory = ()=>{
        let tempDisplayVal = [...displayVal];
        if(searchName.length>0){
            tempDisplayVal[0] = 'none';
            tempDisplayVal[1] = '';
        } else {
            tempDisplayVal[0] = '';
            tempDisplayVal[1] = 'none';
        }
        setDisplayVal(tempDisplayVal);
        let tempHistoryDisplayVal = [...historyDisplayVal];
        if(searchHistory && searchHistory.length > 0){
            tempHistoryDisplayVal[0] = '';
            tempHistoryDisplayVal[1] = 'none';
            let tempSearchHistoryList = [];
            searchHistory.forEach((element,index) => {
                tempSearchHistoryList.push(<SearchHistory
                                                key={index}
                                                summonerName={element}
                                                delete={deleteHistory}
                                                search={clickHistoryName}
                                            />)
            });
            setSearchHistoryList(tempSearchHistoryList);            
        } else {
            tempHistoryDisplayVal[1] = '';
            tempHistoryDisplayVal[0] = 'none';
        }
        sethistoryDisplayVal(tempHistoryDisplayVal);
    }

    //입력창에서 엔터
    const searchEnter = (event)=>{
        if(event.charCode === 13){
            event.target.blur();
            search();
        }
    }
    
    //소환사 검색
    const search = (summonerName)=>{
        if(!searchName && !summonerName){
            return;
        }
        const targetName = summonerName?summonerName:searchName;
        let tempSearchHistory = []
        if(searchHistory){
            tempSearchHistory = [...searchHistory];
        }
        tempSearchHistory.splice(0,0,targetName);
        tempSearchHistory = tempSearchHistory.filter((element, index) => {
            return tempSearchHistory.indexOf(element) === index;
        });
        if(tempSearchHistory && tempSearchHistory.length > 9){
            tempSearchHistory.pop();
        }

        localStorage.setItem("searchHistory",JSON.stringify(tempSearchHistory));
        setSearchHistory(tempSearchHistory);
        setSearchName("");
        closeHistory();
        prop.search(targetName);
    }

    return (
      <div className="l-menu">
          <ul className="menu">
                <h1 className="opgg-header__logo"><a className="opgg-header__logo-anchor" href="/"><img alt="OP.GG" height="16" src="//opgg-static.akamaized.net/images/gnb/svg/00-opgglogo.svg" width="65"/></a></h1>
                <div className="gnb-list-item gnb-list-item__search" style={{marginLeft: 'auto'}}>
                    <input type="text" onKeyPress={searchEnter} onChange={typingName} onBlur={closeHistory} onFocus={openHistory} value={searchName} className="gnb-list-item__input _suggest" name="userName" placeholder="소환사명, 소환사명, ..." autoComplete="off"/>
                    <img height="14" style={{ marginTop : '8px',marginRight : '8px' }} onClick={search} src="//opgg-static.akamaized.net/images/gnb/svg/00-icon-gg.svg" alt=""/>
                    <div className="summoner-search-history gnb-summoner-search-history" style={{display: displayVal[0]}}>
                        <div className="tabWrap _recognized">
                            <ul className="summoner-search-history__title tabHeaders">
                                <li className="tabHeader active">
                                    최근검색
                                </li>
                            </ul>
                            <div className="tabItems">
                                <div className="tabItem summoner-search-history--recent" style={{display: 'block'}}>
                                    <div className="RecentSummonerListWrap">
                                        <div className="summoner-search-history__list RecentSummonerList" style={{display: historyDisplayVal[0]}}>
                                            {searchHistoryList}                                            
                                        </div>
                                        <div className="summoner-search-history__message NotFound" style={{display: historyDisplayVal[1]}}>
                                            <span>
                                                <img className="Image" height="16" src="//opgg-static.akamaized.net/images/site/icon-history-info@2x.png" alt=""/>최근에 본 소환사가 없습니다.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="autocomplete-suggestions" style={{
                                                                    position: 'absolute', 
                                                                    display: displayVal[1], 
                                                                    width: '340px', 
                                                                    maxHeight: '1000px', 
                                                                    zIndex: '9999', 
                                                                    top: '45px'}} >
                        {autocompleteDivList}
                    </div>
                </div>
            </ul>
        </div>
    );
  }

export default Header;
