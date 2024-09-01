import React, { useState, useEffect, useRef } from "react";
import textFit from "textfit";

import {
  IngameContainer,
  HeaderTeamInfoContainer,
  BlueAndRedContainer,
  BlueHeaderContainer,
  RedHeaderContainer,
  DetailsHeaderContainer,
  IngameBG,
  Line,
  BlueTeamName,
  RedTeamName,
  Caster1,
  Caster2,
} from "./ingame.elements";

import io from "socket.io-client";

const socket = io("http://localhost:5000");

const Ingame = () => {
  const [teamInfos, setTeamInfos] = useState({
    blue: {
      teamName: "",
      teamInitials: "",
      score: 0,
      logo: "",
    },
    red: {
      teamName: "",
      teamInitials: "",
      score: 0,
      logo: "",
    },
  });

  const teamNameContainerRef = useRef(null);
  const blueTeamNameRef = useRef(null);
  const redTeamNameRef = useRef(null);
//   const CasterOneRef = useRef(null);
//   const CasterTwoRef = useRef(null);

  const [matchInfo, setMatchInfo] = useState({
    day: "1",
    round: "FINALS",
    game: "1",
    caster1: "",
    caster2: "",
  });

  useEffect(() => {
    socket.on("receiveTeamInfos", (teamInfos) => {
      setTeamInfos(teamInfos);
    });

    socket.on("receiveMatchInfo", (matchInfo) => {
      setMatchInfo(matchInfo);
    });
  }, []);

  useEffect(() => {
    const adjustTeamFontSize = () => {
      const teamNameContainer = teamNameContainerRef.current;
      const blueTeamName = blueTeamNameRef.current;
      const redTeamName = redTeamNameRef.current;

      textFit(blueTeamName,{
        alignHoriz: true,
        alignVert: true,
        maxFontSize: 100,
        widthOnly: true,
      });

      textFit(redTeamName,{
        alignHoriz: true,
        alignVert: true,
        maxFontSize: 100,
        widthOnly: true,
      });
    
      const teamNamesWidth = blueTeamName.offsetWidth + redTeamName.offsetWidth;
      const containerWidth = teamNameContainer.offsetWidth;

      if (teamNamesWidth > containerWidth) {
        teamNameContainer.style.fontSize = `${
          containerWidth / teamNamesWidth
        }`;
      } else {
        teamNameContainer.style.fontSize = ""; // Reset font size to default
      }
    };

    adjustTeamFontSize();

    window.addEventListener("resize", adjustTeamFontSize);

    return () => {
      window.removeEventListener("resize", adjustTeamFontSize);
    };
  }, [teamInfos]);

//   useEffect(() => {
//   const adjustCasterFontSize = () => {
//     const CasterOne = CasterOneRef.current;
//     const CasterTwo = CasterTwoRef.current;

//     textFit(CasterOne,{
//         alignHoriz: true,
//         alignVert: true,
//         maxFontSize: 55,
//         widthOnly: true,
//       });

//       textFit(CasterTwo,{
//         alignHoriz: true,
//         alignVert: true,
//         maxFontSize: 55,
//         widthOnly: true,
//       });

//     const castContainerWidth = 125;
//     let casterNameOne = CasterOne.offsetWidth;
//     let casterNameTwo = CasterTwo.offsetWidth;

//     if (casterNameOne > castContainerWidth) {
//         CasterOne.style.fontSize = `${
//             castContainerWidth / casterNameOne
//         }`;
//       }
//       else if(casterNameTwo > castContainerWidth){
//         CasterTwo.style.fontSize = `${
//             castContainerWidth / casterNameTwo
//           }`;
//       } else {
//         CasterOne.style.fontSize = ""; // Reset font size to default
//         CasterTwo.style.fontSize = ""; // Reset font size to default
//       }
//     };

//     adjustCasterFontSize();

//     window.addEventListener("resize", adjustCasterFontSize);

//     return () => {
//       window.removeEventListener("resize", adjustCasterFontSize);
//     };
//   }, [teamInfos]);

  return (
    <IngameContainer>
      <IngameBG>
        <HeaderTeamInfoContainer ref={teamNameContainerRef}>
          <BlueAndRedContainer>
            <BlueHeaderContainer>
              <BlueTeamName ref={blueTeamNameRef}>
                {teamInfos.blue.teamName}
              </BlueTeamName>
            </BlueHeaderContainer>

            <RedHeaderContainer>
              <RedTeamName ref={redTeamNameRef}>
                {teamInfos.red.teamName}
              </RedTeamName>
            </RedHeaderContainer>
          </BlueAndRedContainer>

          <DetailsHeaderContainer>
            <Caster1>{matchInfo.caster1}</Caster1>
            <Line></Line>
            <Caster2>{matchInfo.caster2}</Caster2>
          </DetailsHeaderContainer>
        </HeaderTeamInfoContainer>
      </IngameBG>
    </IngameContainer>
  );
};

export default Ingame;
