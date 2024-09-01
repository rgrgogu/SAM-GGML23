import React, { useState, useEffect} from 'react'
import Pick from "./Pick";
import Ban from "./Ban";
import { SEQUENCE } from '../../constants';
import {
  OverlayContainer,
  TopSection,
  MatchInfoContainer,
  Timer,
  Round,
  Game,
  BlueBansContainer,
  RedBansContainer,
  BansWrapper,
  TeamInitials,
  CasterBorder,
  BGContainer,
  Frame,
  MidLogoAndContainerBg,
  BlueTeamInfoContainer,
  RedTeamInfoContainer,
  TeamName,
  TeamScore,
  BluePicksContainerBg,
  RedPicksContainerBg,
  BluePicksContainer,
  RedPicksContainer,
  Footer,
} from "./overlay.elements";

import io from "socket.io-client"

import TeamNameScore from '../../assets/teamname_score/teamname_score.png';
import TopSectionBg from '../../assets/TopSection.png';

const socket = io('http://localhost:5000'); 

const Overlay = () => {

  const [seconds, setSeconds] = useState(30);
  const [startTimer, setStartTimer] = useState(false);

  useEffect(() => {
    const timer = seconds > 0 && setInterval(() => {
      setSeconds(seconds - 1);
      if (seconds <= 0) clearInterval(timer);
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds])

  useEffect(() => {
    setSeconds(30);
  }, [startTimer])

  const [counter, setCounter] = useState(0);
  const [phase, setPhase] = useState("BAN PHASE 1");
  const [teamInfos, setTeamInfos] = useState({
     blue: {
      teamName: "TEAM NAME",
      teamInitials: "",
      score: 0,
      players: ['PLAYER NAME', 'PLAYER NAME', 'PLAYER NAME', 'PLAYER NAME', 'PLAYER NAME'],
    },
    red: {
      teamName: "TEAM NAME",
      teamInitials: "",
      score: 0,
      players: ['PLAYER NAME', 'PLAYER NAME', 'PLAYER NAME', 'PLAYER NAME', 'PLAYER NAME'],
    }
  })

  const [matchInfo, setMatchInfo] = useState({
    round: "FINALS",
    game: "1",
  })

  const [picksAndBans, setPicksAndBans] = useState({
    blue: {
      picks: ['', '', '', '', ''],
      picksCount: 0,
      bans: ['', '', ''],
      bansCount: 0,
    },
    red: {
      picks: ['', '', '', '', ''],
      picksCount: 0,
      bans: ['', '', ''],
      bansCount: 0,
    }
  })

  useEffect(() => {
      socket.on("receivePhaseAndCounter", ({ counter, phase }) => {
        setCounter(counter);
        setPhase(phase);
      })
      
      socket.on('receiveTeamInfos', (teamInfos) => {
          //console.log(teamInfos);
          setTeamInfos(teamInfos);
      })

      socket.on("receiveMatchInfo", (matchInfo) => {
        setMatchInfo(matchInfo);
      })

      socket.on("receivePicksAndBans", (picksAndBans) => {
        setPicksAndBans(picksAndBans);
        setStartTimer(true);
      })

      socket.on("receiveStartTimer", () => {
        setStartTimer(false);
      });

  }, [])

  return (
    <OverlayContainer>
      <BGContainer><Frame>
        
          <TopSection
                  style={{ 
                    // backgroundImage: `url(${TopSectionBg})`, 
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover' 
                    
            }}>
            <BlueBansContainer>
              <BansWrapper>
                {picksAndBans.blue.bans.map((item, index) => {
                  return (
                    <Ban
                      key={`blue-ban-${index}`}
                      hero={item}
                      team="blue"
                      active={picksAndBans.blue.bansCount === index && SEQUENCE[counter] === 'blue' && (phase === "BAN PHASE 1" || phase === "BAN PHASE 2")}
                    />
                  )
                })}
              </BansWrapper>
              <TeamInitials>{`(${teamInfos.blue.teamInitials}) BANS`}</TeamInitials>
            </BlueBansContainer>

            <MatchInfoContainer>
              <Timer>{seconds}</Timer>
              <Round>{matchInfo.round}</Round>
              <Game>GAME{" "}{matchInfo.game}</Game>
            </MatchInfoContainer>

            <RedBansContainer>
              <BansWrapper>
                {picksAndBans.red.bans.map((item, index) => {
                  return (
                    <Ban
                      key={`red-ban-${index}`}
                      hero={item}
                      team="red"
                      active={picksAndBans.red.bansCount === index && SEQUENCE[counter] === 'red' && (phase === "BAN PHASE 1" || phase === "BAN PHASE 2")}
                    />
                  )
                })}
              </BansWrapper>
              <TeamInitials>{`(${teamInfos.red.teamInitials}) BANS`}</TeamInitials>
            </RedBansContainer> 
          </TopSection>
          </Frame></BGContainer>
          <BluePicksContainerBg></BluePicksContainerBg>
          <BluePicksContainer>
            {picksAndBans.blue.picks.map((item, index) => {
              return (
                <Pick
                  key={`blue-pick-${index}`}
                  hero={item}
                  team="blue"
                  playerName={teamInfos.blue.players[index]}
                  active={picksAndBans.blue.picksCount === index && SEQUENCE[counter] === 'blue' && (phase === "PICK PHASE 1" || phase === "PICK PHASE 2")}
                />
              )
            })}
          </BluePicksContainer>

          <CasterBorder></CasterBorder>
          <MidLogoAndContainerBg
            style={{ 
              backgroundImage: `url(${TeamNameScore})`, 
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain'
            }}>
          </MidLogoAndContainerBg>

          <BlueTeamInfoContainer>
            <TeamName>{teamInfos.blue.teamName}</TeamName>
            <TeamScore>{teamInfos.blue.score}</TeamScore>
          </BlueTeamInfoContainer>
          
          <RedTeamInfoContainer>
            <TeamName>{teamInfos.red.teamName}</TeamName>
            <TeamScore>{teamInfos.red.score}</TeamScore>
          </RedTeamInfoContainer>

          <RedPicksContainerBg></RedPicksContainerBg>
          <RedPicksContainer>
            {picksAndBans.red.picks.map((item, index) => {
              return (
                <Pick
                  team = "red"
                  key={`red-pick-${index}`}
                  hero={item}
                  playerName={teamInfos.red.players[index]}
                  active={picksAndBans.red.picksCount === index && SEQUENCE[counter] === 'red' && (phase === "PICK PHASE 1" || phase === "PICK PHASE 2")}
                />
              )
            })}
          </RedPicksContainer>

          <Footer></Footer>
      
    </OverlayContainer>
  )
}

export default Overlay