import styled from 'styled-components'
import React, { useState } from 'react';
import generate from './generation-logic/generate'
import { Media } from 'react-breakpoints';
import breakpoints from './breakpoints.js';


const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Open Sans", sans-serif;
  overflow-x: hidden;
  // overflow-y: scroll;
@media (min-width: ${breakpoints.xl}px) {
}
`

const TopBar = styled.div`
  background-color: rgb(255, 198, 5);
  // min-height: 30px;
  width: 100vw;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-weight: bold;
@media (min-width: ${breakpoints.xl}px) {

}
`

const LogoContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  height: 150px;
@media (min-width: ${breakpoints.xl}px) {

}
`

const Logo = styled.img`
  height: 100%;
@media (min-width: ${breakpoints.xl}px) {
  
}
`

const Header = styled.div`
  color: white;
  min-height: 15vh;
  font-weight: bold;
  position: absolute;
  max-width: 100vw;
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
@media (min-width: ${breakpoints.xl}px) {
  padding: 10px;
  top: 24px
}
`

const HeaderTitle = styled.h1`
  font-size: 24px;
`

const HeaderSub = styled.p`
@media (min-width: ${breakpoints.xl}px) {
  margin: 0;
  font-size: 24px;
}
`

const StyledButton = styled.button`
  background-color: white;
  color: rgb(4, 59, 116);
  border: 3px solid;
  border-radius: 4px;
  font-size: 18px;
  font-weight: bold;
  min-width: 150px;
  min-height: 30px;
  margin: 10px;
  &:hover {
    background-color: rgb(4, 59, 116);
    color: white;
    border-radius: 10px;
  }
@media (min-width: ${breakpoints.xl}px) {
  cursor: pointer;
}
`

const SentencesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 auto;
  padding: 0 15px;
@media (min-width: ${breakpoints.xl}px) {

}
`

const SentenceHeader = styled.h2`
  font-size: 18px;
@media (min-width: ${breakpoints.xl}px) {
  font-size: initial;
}
`

const Sentence = styled.li`
  display: list-item;
  margin: 5px 0;
  padding-left: 1.5em;
  text-indent: -1.5em;
@media (min-width: ${breakpoints.xl}px) {
  font-size: 18px;
}
`

const Footer = styled.div`
  margin-top: 1rem;
  padding: 0.3rem;
  background-color: white;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 10px;
  font-style: italic;
  border-top: 1px solid;
  border-color: red;
  clear: both;
  text-align: center;
  width: 100vw;
  flex-shrink: 0;
  // bottom: 0;
@media (min-width: ${breakpoints.xl}px) {
  margin: 10px;
}
`

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function App(props) {
  const [sentences, setSentences] = useState(null)

  const optionalSentences = [
    (sentences => (<Sentence>Wszystkie osoby przybywające do Polski z {sentences[4]} {sentences[5]} są {sentences[6]}.</Sentence>)),
    (sentences => (<Sentence>Restauracje i bary są {sentences[18]}{sentences[19]}</Sentence>)),
    (sentences => (<Sentence>Żłobki i przedszkola są {sentences[25]}.</Sentence>)),
    (sentences => (<Sentence>W godzinach {sentences[29]} zakupy mogą robić tylko osoby {sentences[30]}.</Sentence>)),
    (sentences => (<Sentence>W autobusach może być zajęte max. {sentences[32]} miejsc siedzących (lub {sentences[31]}% wszystkich miejsc).</Sentence>))
  ]

  const obligatorySentences = [
    (sentences => (<Sentence>Hotele dostępne są tylko dla {sentences[0]}, {sentences[1]}, {sentences[2]} oraz {sentences[3]}.</Sentence>)),
    (sentences => (<Sentence>W zgromadzeniach może uczestniczyć maksymalnie {sentences[7]} osób (nie dotyczy {sentences[8]} oraz {sentences[9]}).</Sentence>)),
    (sentences => (<Sentence>Obowiązuje zakaz organizacji {sentences[10]} oraz {sentences[11]}.</Sentence>)),
    (sentences => (<Sentence>W {sentences[26]} i {sentences[27]} może przebywać maksymalnie jedna osoba na {sentences[28]} m kw. pomieszczenia.</Sentence>)),
    (sentences => (<Sentence>Nauka zdalna w klasach {sentences[20]} szkół podstawowych, {sentences[21]}, oraz {sentences[22]}, za wyjątkiem {sentences[23]} (chyba, że {sentences[24]}).</Sentence>)),
    (sentences => (<Sentence>Zamknięte są {sentences[12]}, {sentences[13]} i {sentences[14]}. Otwarte zostaną {sentences[15]} oraz {sentences[16]}, ale wyłącznie w {sentences[17]}.</Sentence>))
  ]

  const buttonAction = () => {
    setSentences(generate())
    document.getElementById('topBar').scrollIntoView();
  }

  const dateOpts = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };

  const date = (new Date()).toLocaleDateString('pl-PL', dateOpts);

  const shuffledOptionalSentences = shuffle(optionalSentences);
  const finalSentences = [
    ...obligatorySentences,
    shuffledOptionalSentences[0],
    shuffledOptionalSentences[1]
  ];

  const { breakpoints, currentBreakpoint } = props;

  return (
      <Container>
        <TopBar id="topBar">Koronawirus: ważne informacje</TopBar>
        <LogoContainer>
          <Logo src="logo.jpg" />
          <Header>
            <HeaderTitle>Generator obostrzeń COVID-19</HeaderTitle>
            <Media>
              {({ breakpoints, currentBreakpoint }) => {
                console.log(breakpoints[currentBreakpoint])
                return breakpoints[currentBreakpoint] >= breakpoints.md ? (
                  <HeaderSub>Sprawdź, co dzisiaj wolno, a czego nie</HeaderSub>
                ) : (
                  <></>
                )
              }}
            </Media>
          </Header>
        </LogoContainer>
        <SentencesContainer>
          <SentenceHeader>
            Kancelaria Prezesa Rady Ministrów informuje, że od {date} roku:
          </SentenceHeader>
          {sentences && (
            <>
            {shuffle(finalSentences).map(it => it(sentences))}
            </>
          )}
          <StyledButton onClick={buttonAction}>GENERUJ</StyledButton>
        </SentencesContainer>
        <Footer>
          Ta strona to <b>żart</b>. Po prawdziwe informacje na temat obostrzeń udaj się <a href="https://www.gov.pl/web/koronawirus">tutaj</a>.
          Ikony dzięki <a href="https://www.freepik.com" title="Freepik">Freepik</a> przez <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
        </Footer>
      </Container>
  );
}

export default App;
