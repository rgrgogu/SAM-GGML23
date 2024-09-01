import React, { useState, useEffect } from "react";

import * as colors from "../../colors";
import {
  SEQUENCE,
  InitialTeamInfos,
  InitialPicksAndBans,
} from "../../constants";
import {
  Input,
  Button,
  LockInButton,
  TopSection,
  TeamLogo,
  Select,
  Option,
  MiddleSection,
  BottomSection,
  ControllerContainer,
  TeamInfosContainer,
  PicksContainer,
  BansContainer,
  SelectionContainer,
  Options,
  UnorderedList,
  ListItem,
  HeroesContainer,
  HeroesWrapper,
  MatchInfoContainer,
  ButtonsContainer,
} from "./controller.elements";
import Pick from "./Pick";
import Ban from "./Ban";
import Hero from "./Hero";

import io from "socket.io-client";

const socket = io("http://localhost:5000");

const Controller = () => {
  // ROGU
  const [counter, setCounter] = useState(0);
  const [phase, setPhase] = useState("");

  const [filter, setFilter] = useState("");

  // ROGU
  const [heroes, setHeroes] = useState([]);

  const [teamInfos, setTeamInfos] = useState({
    blue: {
      teamName: "",
      teamInitials: "",
      score: 0,
      players: ["", "", "", "", ""],
      logo: "",
    },
    red: {
      teamName: "",
      teamInitials: "",
      score: 0,
      players: ["", "", "", "", ""],
      logo: "",
    },
  });

  const [matchInfo, setMatchInfo] = useState({
    day: "",
    round: "",
    game: "",
    caster1: "",
    caster2: "",
  });

  const [picksAndBans, setPicksAndBans] = useState({
    blue: {
      picks: ["", "", "", "", ""],
      picksCount: 0,
      bans: ["", "", ""],
      bansCount: 0,
    },
    red: {
      picks: ["", "", "", "", ""],
      picksCount: 0,
      bans: ["", "", ""],
      bansCount: 0,
    },
  });

  // ROGU
  useEffect(() => {
    fetch("heroes.json")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setHeroes(json.heroes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // ROGU
  useEffect(() => {
    if (counter >= 0 && counter <= 3) {
      setPhase("BAN PHASE 1");
    } else if (counter >= 4 && counter <= 9) {
      setPhase("PICK PHASE 1");
    } else if (counter >= 10 && counter <= 11) {
      setPhase("BAN PHASE 2");
    } else if (counter >= 12 && counter <= 15) {
      setPhase("PICK PHASE 2");
    }

    socket.emit("sendPhaseAndCounter", { counter, phase });
  }, [counter, phase]);

  const handleTeamLogoChange = (e, team, type) => {
    let value = e.target.value;

    if (type === "logo") {
      setTeamInfos((previousTeamLogo) => {
        let newTeamLogo = Object.assign({}, previousTeamLogo);
        newTeamLogo[team].logo = value;
        console.log(newTeamLogo);
        return newTeamLogo;
      });
    }
  };

  const swapChampions = (team, fromItem, toItem) => {
    setPicksAndBans((previousPicksAndBans) => {
      let newPicksAndBans = Object.assign({}, previousPicksAndBans);
      [
        newPicksAndBans[team]["picks"][fromItem.index],
        newPicksAndBans[team]["picks"][toItem.index],
      ] = [
        newPicksAndBans[team]["picks"][toItem.index],
        newPicksAndBans[team]["picks"][fromItem.index],
      ];
      socket.emit("sendPicksAndBans", newPicksAndBans);
      return newPicksAndBans;
    });
  };

  const handleDragStart = (event) => {
    let fromItem = JSON.stringify({ index: event.currentTarget.slot });
    event.dataTransfer.setData("dragContent", fromItem);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    return false;
  };

  const handleDrop = (event, team) => {
    event.preventDefault();

    let fromItem = JSON.parse(event.dataTransfer.getData("dragContent"));
    let toItem = { index: event.currentTarget.slot };

    swapChampions(team, fromItem, toItem);
    return false;
  };

  const handleTeamInfosChange = (e, team) => {
    setTeamInfos((prevTeamInfos) => {
      let newTeamInfos = Object.assign({}, prevTeamInfos);
      newTeamInfos[team][e.target.name] = e.target.value;
      return newTeamInfos;
    });
  };

  const handleMatchInfoChange = (e) => {
    setMatchInfo((prevMatchInfo) => {
      let newMatchInfo = Object.assign({}, prevMatchInfo);
      newMatchInfo[e.target.name] = e.target.value;
      return newMatchInfo;
    });
  };

  const handleHeroOnClick = (name) => {
    const team = SEQUENCE[counter];
    const type =
      phase === "BAN PHASE 1" || phase === "BAN PHASE 2" ? "bans" : "picks";
    const index =
      picksAndBans[team][type === "bans" ? "bansCount" : "picksCount"];

    setPicksAndBans((previousPicksAndBans) => {
      let newPicksAndBans = Object.assign({}, previousPicksAndBans);

      newPicksAndBans[team][type][index] = name;
      socket.emit("sendPicksAndBans", newPicksAndBans);
      return newPicksAndBans;
    });
  };

  // ROGU
  const handleLockIn = () => {
    const team = SEQUENCE[counter];
    const type =
      phase === "BAN PHASE 1" || phase === "BAN PHASE 2" ? "bans" : "picks";
    const index =
      picksAndBans[team][type === "bans" ? "bansCount" : "picksCount"];

    if (
      picksAndBans[team][type][index] === "" &&
      (phase === "PICK PHASE 1" || phase === "PICK PHASE 2")
    ) {
      alert("You must pick a hero before locking in.");
    } else {
      setCounter(counter + 1);
      setHeroes((prevHeroes) => {
        let newHeroes = prevHeroes.filter((hero) => {
          return hero.name !== picksAndBans[team][type][index];
        });

        return newHeroes;
      });
      setPicksAndBans((previousPicksAndBans) => {
        let newPicksAndBans = Object.assign({}, previousPicksAndBans);

        newPicksAndBans[team][type === "bans" ? "bansCount" : "picksCount"]++;
        setStartTimer(false);
        socket.emit("sendStartTimer");
        socket.emit("sendPicksAndBans", newPicksAndBans);
        return newPicksAndBans;
      });
    }
  };

  const handleSwapTeam = () => {
    setTeamInfos((prevTeamInfos) => {
      let newTeamInfos = Object.assign({}, prevTeamInfos);
      [newTeamInfos.blue, newTeamInfos.red] = [
        newTeamInfos.red,
        newTeamInfos.blue,
      ];
      socket.emit("sendTeamInfos", newTeamInfos);
      return newTeamInfos;
    });
  };

  const handleClearTeamInfos = () => {
    setTeamInfos({
      blue: {
        teamName: "",
        teamInitials: "",
        score: 0,
        players: ["", "", "", "", ""],
      },
      red: {
        teamName: "",
        teamInitials: "",
        score: 0,
        players: ["", "", "", "", ""],
      },
    });
    socket.emit("sendTeamInfos", {
      blue: {
        teamName: "",
        teamInitials: "",
        score: 0,
        players: ["", "", "", "", ""],
      },
      red: {
        teamName: "",
        teamInitials: "",
        score: 0,
        players: ["", "", "", "", ""],
      },
    });
  };

  const handleClearPicksAndBans = () => {
    fetch("heroes.json")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setHeroes(json.heroes);
      })
      .catch((error) => {
        console.log(error);
      });
      
    setPicksAndBans({
      blue: {
        picks: ["", "", "", "", ""],
        picksCount: 0,
        bans: ["", "", ""],
        bansCount: 0,
      },
      red: {
        picks: ["", "", "", "", ""],
        picksCount: 0,
        bans: ["", "", ""],
        bansCount: 0,
      },
    });
    setCounter(0);
    setStartTimer(false);
    socket.emit("sendStartTimer");
    socket.emit("sendPicksAndBans", {
      blue: {
        picks: ["", "", "", "", ""],
        picksCount: 0,
        bans: ["", "", ""],
        bansCount: 0,
      },
      red: {
        picks: ["", "", "", "", ""],
        picksCount: 0,
        bans: ["", "", ""],
        bansCount: 0,
      },
    });
  };

  const [startTimer, setStartTimer] = useState(false);

  const handlePlayerNameChange = (e, team, index) => {
    setTeamInfos((prevTeamInfos) => {
      let newTeamInfos = Object.assign({}, prevTeamInfos);

      newTeamInfos[team]["players"][index] = e.target.value;
      return newTeamInfos;
    });
  };

  const handleTeamInfosBlur = () => {
    socket.emit("sendTeamInfos", teamInfos);
  };

  const handleMatchInfoBlur = () => {
    socket.emit("sendMatchInfo", matchInfo);
  };

  return (
    <ControllerContainer>
      <TopSection>
        <TeamInfosContainer backgroundColor={colors.blue}>
          <Input
            name="teamInitials"
            placeholder="Team Initials"
            value={teamInfos.blue.teamInitials.toUpperCase()}
            onChange={(e) => handleTeamInfosChange(e, "blue")}
            onBlur={handleTeamInfosBlur}
          />
          <Input
            name="teamName"
            placeholder="Team Name"
            value={teamInfos.blue.teamName}
            onChange={(e) => handleTeamInfosChange(e, "blue")}
            onBlur={handleTeamInfosBlur}
          />
          <Input
            name="score"
            type="number"
            placeholder="Score"
            value={teamInfos.blue.score}
            onChange={(e) => handleTeamInfosChange(e, "blue")}
            onBlur={handleTeamInfosBlur}
          />

          <TeamLogo>
            <Select
              name="logo"
              id="logo"
              onChange={(e) => handleTeamLogoChange(e, "blue", "logo")}
              onMouseLeave={handleTeamInfosBlur}
            >
              <Option value="GearLogo">Gear Logo</Option>
              <Option value="Dominators">Dominators - Nico Wendam</Option>
              <Option value="GosuHawks">
                Gosu Hawks- Christian Edward Guinto - Reyniel
              </Option>
              <Option value="Maamo">Maamo & Friends - JJ Sanchez</Option>
            </Select>
          </TeamLogo>
        </TeamInfosContainer>

        <MatchInfoContainer>
          <Input
            name="day"
            type="number"
            placeholder="DAY X"
            value={matchInfo.day}
            onChange={(e) => handleMatchInfoChange(e)}
            onBlur={handleMatchInfoBlur}
          />
          <Input
            name="round"
            placeholder="Round"
            value={matchInfo.round.toUpperCase()}
            onChange={(e) => handleMatchInfoChange(e)}
            onBlur={handleMatchInfoBlur}
          />
          <Input
            name="game"
            placeholder="Game #"
            value={matchInfo.game}
            onChange={(e) => handleMatchInfoChange(e)}
            onBlur={handleMatchInfoBlur}
          />
          <Input
            name="caster1"
            placeholder="Caster1"
            value={matchInfo.caster1}
            onChange={(e) => handleMatchInfoChange(e)}
            onBlur={handleMatchInfoBlur}
          />
          <Input
            name="caster2"
            placeholder="Caster2"
            value={matchInfo.caster2}
            onChange={(e) => handleMatchInfoChange(e)}
            onBlur={handleMatchInfoBlur}
          />
        </MatchInfoContainer>

        <TeamInfosContainer backgroundColor={colors.red}>
          <Input
            name="teamInitials"
            placeholder="Team Initials"
            value={teamInfos.red.teamInitials.toUpperCase()}
            onChange={(e) => handleTeamInfosChange(e, "red")}
            onBlur={handleTeamInfosBlur}
          />
          <Input
            name="teamName"
            placeholder="Team Name"
            value={teamInfos.red.teamName}
            onChange={(e) => handleTeamInfosChange(e, "red")}
            onBlur={handleTeamInfosBlur}
          />
          <Input
            name="score"
            type="number"
            placeholder="Score"
            value={teamInfos.red.score}
            onChange={(e) => handleTeamInfosChange(e, "red")}
            onBlur={handleTeamInfosBlur}
          />

          <TeamLogo>
            <Select
              name="logo"
              id="logo"
              onChange={(e) => handleTeamLogoChange(e, "red", "logo")}
              onMouseLeave={handleTeamInfosBlur}
            >
              <Option value="GearLogo">Gear Logo</Option>
              <Option value="Dominators">Dominators - Nico Wendam</Option>
              <Option value="GosuHawks">
                Gosu Hawks- Christian Edward Guinto - Reyniel
              </Option>
              <Option value="Maamo">Maamo & Friends - JJ Sanchez</Option>
            </Select>
          </TeamLogo>
        </TeamInfosContainer>
      </TopSection>

      <MiddleSection>
        <PicksContainer>
          {picksAndBans.blue.picks.map((item, index) => {
            return (
              <Pick
                key={`blue-pick-${index}`}
                index={index}
                team="blue"
                hero={item}
                IGN={teamInfos.blue.players[index]}
                handlePlayerNameChange={(e) => {
                  handlePlayerNameChange(e, "blue", index);
                }}
                handleTeamInfosBlur={handleTeamInfosBlur}
                handleDragStart={handleDragStart}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
              />
            );
          })}
        </PicksContainer>

        {/* ROGU */}
        <SelectionContainer>
          <Options>
            <UnorderedList>
              <ListItem
                onClick={() => setFilter(filter === "tank" ? "" : "tank")}
              >
                Tank
              </ListItem>
              <ListItem
                onClick={() => setFilter(filter === "fighter" ? "" : "fighter")}
              >
                Fighter
              </ListItem>
              <ListItem
                onClick={() =>
                  setFilter(filter === "assassin" ? "" : "assassin")
                }
              >
                Assassin
              </ListItem>
              <ListItem
                onClick={() => setFilter(filter === "mage" ? "" : "mage")}
              >
                Mage
              </ListItem>
              <ListItem
                onClick={() =>
                  setFilter(filter === "marksman" ? "" : "marksman")
                }
              >
                Marksman
              </ListItem>
              <ListItem
                onClick={() => setFilter(filter === "support" ? "" : "support")}
              >
                Support
              </ListItem>
              <ListItem>
                <Input
                  id="filter"
                  name="filter"
                  type="text"
                  value={filter}
                  placeholder="Search..."
                  onChange={(event) => setFilter(event.target.value)}
                />
              </ListItem>
            </UnorderedList>
          </Options>

          <HeroesContainer>
            <HeroesWrapper>
              {heroes
                .filter(
                  (item) =>
                    item.name.toLowerCase().includes(filter.toLowerCase()) ||
                    item.role.toLowerCase().includes(filter.toLowerCase()) ||
                    filter === ""
                )
                .map((item, index) => {
                  return (
                    <Hero
                      key={item.name}
                      hero={item.name}
                      handleHeroOnClick={handleHeroOnClick}
                    />
                  );
                })}
            </HeroesWrapper>
          </HeroesContainer>
        </SelectionContainer>

        <PicksContainer direction="rtl">
          {picksAndBans.red.picks.map((item, index) => {
            return (
              <Pick
                key={`red-pick-${index}`}
                index={index}
                team="red"
                hero={item}
                IGN={teamInfos.red.players[index]}
                handlePlayerNameChange={(e) => {
                  handlePlayerNameChange(e, "red", index);
                }}
                handleTeamInfosBlur={handleTeamInfosBlur}
                handleDragStart={handleDragStart}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
              />
            );
          })}
        </PicksContainer>
      </MiddleSection>

      <BottomSection>
        <BansContainer>
          {picksAndBans.blue.bans.map((item, index) => {
            return <Ban key={`blue-ban-${index}`} hero={item} />;
          })}
        </BansContainer>

        <ButtonsContainer>
          <LockInButton onClick={handleLockIn} disabled={counter > 15}>
            LOCK IN
          </LockInButton>
          <Button onClick={handleSwapTeam}>SWAP TEAM</Button>
          <Button onClick={handleClearPicksAndBans}>CLEAR PICKS & BANS</Button>
          <Button onClick={handleClearTeamInfos}>CLEAR TEAM INFOS</Button>
        </ButtonsContainer>

        <BansContainer direction="rtl">
          {picksAndBans.red.bans.map((item, index) => {
            return <Ban key={`red-ban-${index}`} hero={item} />;
          })}
        </BansContainer>
      </BottomSection>
    </ControllerContainer>
  );
};

export default Controller;
