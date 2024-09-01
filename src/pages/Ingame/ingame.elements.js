import styled from "styled-components";

export const IngameContainer = styled.div`
    margin: 0;
    width: 1920px;
    height: 1080px;
`;

export const HeaderTeamInfoContainer = styled.div`
    height: 170px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`;

export const BlueAndRedContainer = styled.div`
    height: 160px;
    width: 1920px;
    display: flex;
    flex-direction: row;
    padding-left: 410px;
`;

export const BlueHeaderContainer = styled.div`
    height: 160px;
    width: 350px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    flex-direction: row;
    overflow: hidden;
    position: relative;
    left: 63px;
`;

export const BlueTeamScore = styled.div`
    height: 108px;
    width: 350px;
    display: flex;
    justify-content: center;
    align-items: baseline;
    border-top: 10px solid #D77B10;
    border-bottom: 10px solid #D77B10;
    background-color: #1E0601;
    font-family: 'Akira Expanded', sans-serif;
    font-size: 72px;
    color: white;
`;

export const BlueTeamName = styled.div`
    height: 108px;
    width: 390px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: tungsten;
    font-size: 100px;
    color: white;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export const RedTeamName = styled.div`
    height: 108px;
    width: 390px;
    display: flex;
    align-items: center;
    font-family: tungsten;
    justify-content: center;
    font-size: 100px;
    color: white;
    overflow: ;
    white-space: nowrap;
`;

export const RedHeaderContainer = styled.div`
    height: 160px;
    width: 350px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    position: relative;
    left: 335px;
`;

export const RedTeamScore = styled.div`
    height: 108px;
    width: 97px;
    display: flex;
    justify-content: center;
    align-items: baseline;
    border-top: 10px solid #CF6F00;
    border-bottom: 10px solid #CF6F00;
    background-color: #1E0601;
    font-family: 'Akira Expanded', sans-serif;
    font-size: 72px;
    color: white;
`;

export const IngameBG = styled.div`
    background-image: url(${require('../../assets/ingame.png')});
    height: 1080px;
    width: 1920px;
`;

export const DetailsHeaderContainer = styled.div`
    position:relative;
    right: 40px;
    top: 65px;
    height:70px;
    width: 250px;
    display: flex;
    align-items: center;
    gap: 4px;
    color: white;
`;

export const Line = styled.div`
    content: '';
    position: absolute;
    top: 0;
    left: 51%;
    transform: translateX(-50%);
    width: 5px;
    height: 100%;
    background-color: white;
`;

export const Day = styled.div``;
export const Caster1 = styled.div`
    height: 70px;
    width: 125px;
    justify-content: center;
    display: flex;
    text-align: left;
    white-space: nowrap;
    position: relative;
    right: 2px;
    font-family: tungsten;
    font-size: 55px;
`;
export const Caster2 = styled.div`
    height: 70px;
    width: 125px;
    display: flex;
    justify-content: center;
    position: relative;
    left: 6px;
    font-family: tungsten;
    font-size: 55px;
`;
export const BestOf = styled.div``;