import React, { useEffect, useState } from 'react';
import { FaTwitter, FaGithub } from 'react-icons/fa';
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
        totalStake_50: stakeUserPOS[0]?.totalStake || "null",
        totalStake_100: stakeUserPOS[1]?.totalStake || "null",
        totalStake_150: stakeUserPOS[2]?.totalStake || "null",
        totalStake_200: stakeUserPOS[3]?.totalStake || "null",
        totalStake_250: stakeUserPOS[4]?.totalStake || "null",
        totalStake_300: stakeUserPOS[5]?.totalStake || "null",
        totalStake_350: stakeUserPOS[6]?.totalStake || "null",
        totalStake_400: stakeUserPOS[7]?.totalStake || "null",
        totalStake_450: stakeUserPOS[8]?.totalStake || "null",
        totalStake_500: stakeUserPOS[9]?.totalStake || "null",
        totalStake_550: stakeUserPOS[10]?.totalStake || "null",
        totalStake_600: stakeUserPOS[11]?.totalStake || "null",
        totalStake_650: stakeUserPOS[12]?.totalStake || "null",
        totalStake_700: stakeUserPOS[13]?.totalStake || "null",
        totalStake_750: stakeUserPOS[14]?.totalStake || "null",
        totalStake_800: stakeUserPOS[15]?.totalStake || "null",
        totalStake_850: stakeUserPOS[16]?.totalStake || "null",
        totalStake_900: stakeUserPOS[17]?.totalStake || "null",
        totalStake_950: stakeUserPOS[18]?.totalStake || "null",
        totalStake_1000: stakeUserPOS[19]?.totalStake || "null",
        modifyTime_50: new Date(stakeUserPOS[7].modifyTime).toLocaleString()
      };
    } catch (err) {
      console.log(err);
    }
  };

  const getStakeHoroscopList = async () => {
    let url = `https://market-api.nostrassets.com/stake/getStakeHoroscopList`;
    let payload = {
      "stakeId": 1
    };
    try {
      let res = await axios.post(url, payload);
      let { data } = res?.data;
      return data.map(item => {
        return {
          name: item.name,
          totalParticipants: item.totalParticipants,
          totalStake: item.totalStake
        };
      });
    } catch (err) {
      console.log(err);
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      let loop = [...Array(12).keys()].map(x => x + 1);
      let res = await Promise.all(loop.map(item => getRankingSummary(item)));
      let stakeUserList = await getStakeHoroscopList();
      let allInfo = [];
      for(let i = 0; i < res.length; i++){
        for(let j = 0; j < stakeUserList.length; j++){
          if(res[i].horoscopName === stakeUserList[j].name){
            allInfo.push({...res[i], ...stakeUserList[j]})
          }
        };
      };
      setInfo(allInfo);
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
        <p>
          <a href="https://twitter.com/skyMetaverse" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={24} style={{ marginRight: '20px' }} />
          </a>

          <a href="https://github.com/skyMetaverse" target="_blank" rel="noopener noreferrer">
            <FaGithub size={24} style={{ marginRight: '20px' }} />
          </a>
        </p>
      </div>
      <table className="myTable">
        <thead>
          <tr>
            <th onClick={() => requestSort('horoscopName')}>Name</th>
            <th onClick={() => requestSort('hashEnding')}>Hash</th>
            <th onClick={() => requestSort('totalParticipants')}>Participants</th>
            <th onClick={() => requestSort('totalStake')}>Locked</th>
            <th onClick={() => requestSort('totalStake_50')}>Stake_50</th>
            <th onClick={() => requestSort('totalStake_100')}>Stake_100</th>
            <th onClick={() => requestSort('totalStake_150')}>Stake_150</th>
            <th onClick={() => requestSort('totalStake_200')}>Stake_200</th>
            <th onClick={() => requestSort('totalStake_250')}>Stake_250</th>
            <th onClick={() => requestSort('totalStake_300')}>Stake_300</th>
            <th onClick={() => requestSort('totalStake_350')}>Stake_350</th>
            <th onClick={() => requestSort('totalStake_400')}>Stake_400</th>
            <th onClick={() => requestSort('totalStake_450')}>Stake_450</th>
            <th onClick={() => requestSort('totalStake_500')}>Stake_500</th>
            <th onClick={() => requestSort('totalStake_550')}>Stake_550</th>
            <th onClick={() => requestSort('totalStake_600')}>Stake_600</th>
            <th onClick={() => requestSort('totalStake_650')}>Stake_650</th>
            <th onClick={() => requestSort('totalStake_700')}>Stake_700</th>
            <th onClick={() => requestSort('totalStake_750')}>Stake_750</th>
            <th onClick={() => requestSort('totalStake_800')}>Stake_800</th>
            <th onClick={() => requestSort('totalStake_850')}>Stake_850</th>
            <th onClick={() => requestSort('totalStake_900')}>Stake_900</th>
            <th onClick={() => requestSort('totalStake_950')}>Stake_950</th>
            <th onClick={() => requestSort('totalStake_1000')}>Stake_1000</th>
            {/* <th onClick={() => requestSort('modifyTime_50')}>Update</th> */}
          </tr>
        </thead>
        <tbody>
          {sortedInfo.map((item, index) => (
            <tr key={index}>
              <td>{item.horoscopName}</td>
              <td>{item.hashEnding}</td>
              <td>{item.totalParticipants}</td>
              <td>{item.totalStake}</td>
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
              <td>{item.totalStake_600}</td>
              <td>{item.totalStake_650}</td>
              <td>{item.totalStake_700}</td>
              <td>{item.totalStake_750}</td>
              <td>{item.totalStake_800}</td>
              <td>{item.totalStake_850}</td>
              <td>{item.totalStake_900}</td>
              <td>{item.totalStake_950}</td>
              <td>{item.totalStake_1000}</td>
              {/* <td>{item.modifyTime_50}</td> */}
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