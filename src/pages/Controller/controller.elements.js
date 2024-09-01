import styled from "styled-components";

export const Input = styled.input`
    height: 20px;
    width: 200px;
    font-size: 15px;
`;

export const Button = styled.button``;

export const TeamLogo = styled.div``;

export const Option = styled.option`
    font-size:18px;
    font-weight: 400;
    text-align: center;
`;

export const Select = styled.select`
    height: 20px;
    width: 250px;
    font-size: 15px;
    font-weight: 500;
    text-align: center;
`;

export const LockInButton = styled(Button)`
    width: 100px;
    height: 75px;
    margin-right: 50px;
`

export const Timer = styled.p``;

export const ControllerContainer = styled.div`
    width: 100vw;
    height: 100vh;
`;

export const TopSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const MiddleSection = styled.div`
    display: flex;
`;

export const BottomSection = styled.div`
    display: flex;
`;

export const ButtonsContainer = styled.div``;

export const TeamInfosContainer = styled.div`
    background-color: ${({ backgroundColor }) => backgroundColor && backgroundColor};
    width: 40%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    align-items: center;
    gap: 10px;
`;

export const MatchInfoContainer = styled.div`
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
`;

export const SelectionContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const Options = styled.div`
    display: flex;
    width: 90%;
    background-color: black;
    color: white;
`
export const UnorderedList = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    list-style-type: none;
`
export const ListItem = styled.li`
    &:last-child {
       
    }
`

export const HeroesContainer = styled.div`
    padding: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1c1d3f;
`;

export const PicksContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 300px;
`;

export const BansContainer = styled.div`
    width: 500px;
    height: 100px;
    direction: ${({ direction }) => direction ? direction : 'ltr'};
    display: flex;
`;

export const HeroesWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    background-color: #1c1d3f;
`;