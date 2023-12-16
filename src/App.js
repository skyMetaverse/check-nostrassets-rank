import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';


const App = () => {
  const [info, setInfo] = useState([]);
  const [sortedInfo, setSortedInfo] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'totalStake_50', direction: 'ascending' });


  const getRankingSummary = async (horoscopId) => {
    let url = `https://market-api.nostrassets.com/stake/getRankingSummary`;
    let payload = {
      "stakeId": 1,
      "horoscopId": horoscopId
    };
    try {
      let res = await axios.post(url, payload);
      let { stakeUserPOS } = res?.data?.data;
      return {
        horoscopName: stakeUserPOS[0].horoscopName,
        hashEnding: stakeUserPOS[0].hashEnding,
        totalStake_50: stakeUserPOS[0].totalStake,
        totalStake_100: stakeUserPOS[1].totalStake,
        totalStake_150: stakeUserPOS[2].totalStake,
        totalStake_200: stakeUserPOS[3].totalStake,
        totalStake_250: stakeUserPOS[4].totalStake,
        totalStake_300: stakeUserPOS[5].totalStake,
        totalStake_350: stakeUserPOS[6].totalStake,
        totalStake_400: stakeUserPOS[7].totalStake,
        totalStake_450: stakeUserPOS[8].totalStake,
        totalStake_500: stakeUserPOS[9].totalStake,
        totalStake_550: stakeUserPOS[10].totalStake,
        modifyTime_50: new Date(stakeUserPOS[7].modifyTime).toLocaleString()
      };
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let loop = [...Array(12).keys()].map(x => x + 1);
      let res = await Promise.all(loop.map(item => getRankingSummary(item)));
      setInfo(res);
    };

    fetchData();
  }, []);

  useEffect(() => {
    let sortedRes = [...info];
    sortedRes.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setSortedInfo(sortedRes);
  }, [info, sortConfig]);

  const requestSort = key => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };


  return (
    <div className="App">
      <div className="header">
        <h1>Nostrassets Fair Mint Viewer</h1>
        <h2>By <a href="https://twitter.com/skyMetaverse" target="_blank" rel="noopener noreferrer">@syskey</a></h2>
      </div>
      <table className="myTable">
        <thead>
          <tr>
            <th onClick={() => requestSort('horoscopName')}>horoscopName</th>
            <th onClick={() => requestSort('hashEnding')}>hashEnding</th>
            <th onClick={() => requestSort('totalStake_50')}>totalStake_50</th>
            <th onClick={() => requestSort('totalStake_100')}>totalStake_100</th>
            <th onClick={() => requestSort('totalStake_150')}>totalStake_150</th>
            <th onClick={() => requestSort('totalStake_200')}>totalStake_200</th>
            <th onClick={() => requestSort('totalStake_250')}>totalStake_250</th>
            <th onClick={() => requestSort('totalStake_300')}>totalStake_300</th>
            <th onClick={() => requestSort('totalStake_350')}>totalStake_350</th>
            <th onClick={() => requestSort('totalStake_400')}>totalStake_400</th>
            <th onClick={() => requestSort('totalStake_450')}>totalStake_450</th>
            <th onClick={() => requestSort('totalStake_500')}>totalStake_500</th>
            <th onClick={() => requestSort('totalStake_550')}>totalStake_550</th>
            <th onClick={() => requestSort('modifyTime_50')}>modifyTime_50</th>
          </tr>
        </thead>
        <tbody>
          {sortedInfo.map((item, index) => (
            <tr key={index}>
              <td>{item.horoscopName}</td>
              <td>{item.hashEnding}</td>
              <td>{item.totalStake_50}</td>
              <td>{item.totalStake_100}</td>
              <td>{item.totalStake_150}</td>
              <td>{item.totalStake_200}</td>
              <td>{item.totalStake_250}</td>
              <td>{item.totalStake_300}</td>
              <td>{item.totalStake_350}</td>
              <td>{item.totalStake_400}</td>
              <td>{item.totalStake_450}</td>
              <td>{item.totalStake_500}</td>
              <td>{item.totalStake_550}</td>
              <td>{item.modifyTime_50}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className="footer">
        <p><a href="https://twitter.com/skyMetaverse" target="_blank" rel="noopener noreferrer">@syskey</a></p>
      </div> */}
    </div>
  );
};

export default App;