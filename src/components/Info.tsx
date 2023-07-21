import React from "react";
import "../App.css";

const Info = () => {
  return (
    <div id="text">
      <span>Sterowanie:</span>
      <span>
        <b>Strzałka w lewo</b> - przesunięcie bloku o jeden piksel w lewo
      </span>
      <span>
        <b>Strzałka w prawo</b> - przesunięcie bloku o jeden piksel w prawo
      </span>
      <span>
        <b>Strzałka w dół</b> - przyspieszenie opadania bloku
      </span>
      <span>
        <b>Spacja</b> - obrót bloku w prawo
      </span>
      <span>
        <b>Enter</b> - opadnięcie bloku na sam dół
      </span>
      <br />
      <br />
      <span id="rules">Zasady gry</span>
      <span>
        Źródło:{" "}
        <a href="https://pl.wikipedia.org/wiki/Tetris">
          https://pl.wikipedia.org/wiki/Tetris
        </a>
      </span>
      <span>
        <br />
        Gra rozpoczyna się na prostokątnej planszy (początkowo pustej) zwanej{" "}
        <b>
          <i>tetrionem</i>
        </b>{" "}
        lub{" "}
        <b>
          <i>matriksem</i>
        </b>
        , ułożonej krótszym bokiem w poziomie.
        <br />
        <br />
        Tetrion ma wymiary 20 wierszy na 10 kolumn (W tej wersji 21 wierszy na
        11 kolumn).
        <br />
        <br /> W trakcie gry, pośrodku górnej krawędzi planszy, pojawiają się
        pojedynczo klocki złożone z czterech małych kwadratów nazywanych też{" "}
        <b>
          <i>blokami</i>
        </b>
        .
        <br />
        <br /> Klocki te (określane mianem „
        <b>
          <i>tetrimino</i>
        </b>
        ”) przemieszczają się w kierunku dolnej krawędzi w miarę możliwości.
        <br />
        <br /> Kiedy jedno tetrimino opadnie na samo dno, zostaje
        unieruchomione, a następne ukazuje się u góry planszy.
        <br />
        <br /> Gra trwa aż do momentu, w którym klocek nie będzie mógł pojawić
        się na planszy.
        <br />
        <br />
        Zadaniem gracza jest układanie tetrimino na planszy (poprzez
        wykorzystanie rotacji i przesuwanie klocków w poziomie) w taki sposób,
        aby kwadraty składające się na nie utworzyły wiersz{" "}
        <b>na całej szerokości prostokąta</b>.
        <br />
        <br /> W takiej sytuacji wiersz ten zostaje usunięty, a pozostałe klocki
        opadają w kierunku dna, tworząc więcej przestrzeni dla następnych
        elementów.
        <br />
        <br /> Możliwe jest jednoczesne usunięcie maksymalnie 4 wierszy –
        umożliwia to tetrimino „I”.
        <br />
        <br />
        Sytuacja taka nosi nazwę identyczną jak gra, czyli „
        <b>
          <i>tetris</i>
        </b>
        ”.
      </span>
    </div>
  );
};

export default Info;
