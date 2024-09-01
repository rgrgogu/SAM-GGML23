import React from 'react'
import styled from 'styled-components'

const PickContainer = styled.div`
    position: relative;
    display: flex;
    //flex: 1;
    height: 170px;
    background: #0C0401;
    width: 319px;
    //${({team}) => team === "blue" ? `width: 317px` : `width: 317px`};
`; //border-right: 15px solid #D07913

const PickSplash = styled.div`
    width: 100%;
    height: 100%;
    ${({ hero }) => hero ? (`
        background-image: url("${require(`../../assets/centered_splash_arts/${hero}.png`)}");
        background-size: cover;
        background-repeat: no-repeat;
    `) : (`
        &:before {
            content: "";
            position: absolute;
            top: 0px;
            right: 0px;
            bottom: 0px;
            left: 0px;
            background-size: 25%;
            background-repeat: no-repeat;
            background-position: 50% 25%;
            opacity: 0.25;
        }
    `)}
`;


//background-image: url("${require("../../assets/gear-logo.svg").default}");

//const FillerSplash = styled.div``

const HeroName = styled.p`

position: absolute;
top: 10px;
left: ${({ team }) => team === "blue" ? '10px' : '0px'};
width: 295px;
height: 30px;
color: #D8D8D8;
font-family: 'Montserrat ExtraLight', sans-serif;
font-size: 22px;
font-weight: 200;
line-height: 24px;
text-indent: 5px;
text-align: ${({ team }) => team === "blue" ? 'left' : 'right'};
`;

const PlayerNameContainer = styled.div`
position: absolute;
top: 130px;
width: 312px;
height: 40px;
//background: ${({ team }) => team === "blue" ? `linear-gradient(270deg, rgba(0,0,0,.5) 0%, rgba(0,0,0,0) 100%)` : `linear-gradient(90deg, rgba(0,0,0,.5) 0%, rgba(0,0,0,0) 100%);`};
padding: 15px;
display: flex;
justify-content: ${({ team }) => team === "blue" ? `flex-start;` : `flex-end;`};
align-items: center;

`;

const PlayerName = styled.p`
padding-bottom: 15px;
//padding-left: 200px;

text-overflow: ellipsis;
overflow:hidden;
white-space:nowrap;
color: white;
font-family: tungsten;
font-size: 40px;
line-height: 40px;
//font-weight: 300;
text-align: ${({ team }) => team === "blue" ? 'right' : 'left'};

`;

const Pick = ({ team, hero, playerName, active }) => {
    return (
        <PickContainer team={team}>
            <PickSplash hero={hero} active={active} />
            <HeroName team={team}>{hero}</HeroName>
            <PlayerNameContainer team={team}>
                <PlayerName team={team}>{playerName}</PlayerName>
            </PlayerNameContainer>
        </PickContainer>
    )
}

export default Pick;