import React from 'react'
import styled from 'styled-components'

const BanContainer = styled.div`
  display: inline-flex;
  //justify-content: space-around;
  //align-items: center;
  //gap: 60px;
  flex-direction: column;
  margin-top: -45px;
  //margin-left: 1px;
  box-shadow: 0px 0px 12px rgba(1,1,1,1) inset;
  border-radius: 50%;
  //padding: 0.1em;
`;

const BanSplash = styled.div`
  ${({ hero }) => hero && `background-image: url("${require(`../../assets/centered_splash_arts/${hero}.png`)}");`}
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding: 0.98em;
  border-radius: 50%;
  filter: grayscale(1);
`;

const Ban = ({ team, hero, active }) => {
  return (
    <BanContainer team={team}>
      <BanSplash hero={hero} active={active} team={team}/>
    </BanContainer>
  )
}

export default Ban