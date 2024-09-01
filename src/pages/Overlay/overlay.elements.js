import styled from "styled-components";

export const OverlayContainer = styled.div`
    width: 1920px;
    height: 1080px;
`;

export const TopSection = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: row;
    justify-content: space-between; 
    align-items: center;
`;

export const TeamInitials = styled.div`
    width: 390px;
    font-family: sp;
    font-size: 60px;
    font-weight: bold;
    text-align: center;
    color: white;
    padding-bottom: 55px;
`;

export const MatchInfoContainer = styled.div`
    height: 90px;
    width: 250px;
    padding-top: 3px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    //background: #0C0401;
`;

export const BansContainer = styled.div`
    height: 90px;
    width: 22.30em;
    //background: #0C0401;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 40px;

`;

export const BansWrapper = styled.div`
    padding-right: 20px;
    padding-left: 22px;
    display: flex;
    gap: 51px;
    justify-content: space-around;
`;

export const BlueBansContainer = styled(BansContainer)`
    gap: 50px;
    border-left: 0px;
    border-right: 0px;
`;
export const RedBansContainer = styled(BansContainer)`
    right: 0px;
    gap: 50px;
    border-left: 0px;
    border-right: 0px;
    flex-direction: row-reverse;
`;

export const Timer = styled.div`
    font-size: 55px;
    font-family: sp;
    color: white;
`;
export const Round = styled.div`
    color: white;
    font-family: sp;
    font-size: 35px;
    
`;
export const Game = styled.div`
    color: white;
    font-family: sp;
    font-size: 35px;
    margin-top: -10px;
    padding-bottom: 13px;
`;

export const InfosContainer = styled.div`
    display: flex;
    align-items: center;
    height: 60px;
    width: 380px;
    position: absolute;
`;

export const BlueTeamInfoContainer = styled(InfosContainer)`
    top: 895px;
    left: 515px;
    font-family: sp;
    text-align: left;
`;

export const RedTeamInfoContainer = styled(InfosContainer)`
    direction: rtl;
    top: 895px;
    right: 500px;
    font-family: sp;
    text-align: right;
`;

export const PicksContainerBg = styled.div`
    position: absolute; 
    height: 930px;
    top: 130px;
    //background: #0C0401;
    opacity: .85;
`;

export const BluePicksContainerBg = styled(PicksContainerBg)`
    width: 310px;
    left: 0;
`;

export const RedPicksContainerBg = styled(PicksContainerBg)`
    width: 315px;
    right: 0;
    
`;

export const PicksContainer = styled.div`
    position: absolute; 
    height: 930px;
    top: 130px;
    display:flex;
    flex-direction: column;
    gap: 15px;
`;

export const BluePicksContainer = styled(PicksContainer)`
    width: 326px;
    left: -2px;
    top: 190px;
    gap: 10px;
`;
export const RedPicksContainer = styled(PicksContainer)`
    width: 330px;
    left: 1601px;
    top: 191px;
    gap: 10px;
    
    
`;

export const CasterBorder = styled.div`
    // background: linear-gradient(#000, #000) no-repeat center/5px 100%;
    height: 730px;
    width: 1200px;
    position: absolute;
    top: 135px;
    left: 360px;
    // border: 20px solid black;
    opacity: .8;
`;

export const BGContainer = styled.div`
    background-image: url(${require('../../assets/monitor.png')});
    width: 1920;
    height: 1080px;
`;

export const Frame = styled.div`
    background-image: url(${require('../../assets/Frame.png')});
    width: 1920;
    height: 1080px;    
`;

export const MidLogoAndContainerBg = styled.div`
    height: 600px;
    width: 1240px;
    position: absolute;
    top: 880px;
    left: 340px;
`;

export const TeamName = styled.div`
    width: 300px;
    font-size: 42px;
    color: white;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    &:hover{
        overflow: visible; 
        white-space: normal;
    }
`;

export const TeamScore = styled.div`
 direction: rtl;
    width: 70px;
    font-family: sp;
    font-size: 48px;
    display: flex; 
    flex-direction: row;
    justify-content: center;
    color: white;
`;

export const Footer = styled.div`
    width: 100%;
    height: 20px;
    position: absolute;
    top: 1060px;
    //background: black;
`;