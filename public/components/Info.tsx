import React from "react";
import "../App.css";

const Info = () => {
  return (
    <div id="text">
      <span>Sterowanie (KLAWIATURA):</span>
      <span>
        <b>Strzałka w lewo</b> - przesunięcie klocka o jeden piksel w lewo
      </span>
      <span>
        <b>Strzałka w prawo</b> - przesunięcie klocka o jeden piksel w prawo
      </span>
      <span>
        <b>Strzałka w dół</b> - przyspieszenie opadania klocka
      </span>
      <span>
        <b>Spacja</b> - obrót klocka w prawo
      </span>
      <span>
        <b>Enter</b> - opadnięcie klocka na sam dół
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
        pojedynczo <b>klocki</b> złożone z czterech małych kwadratów nazywanych
        też{" "}
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
        aby kwadraty składające się na nie utworzyły wiersz o jednolitym kolorze{" "}
        <b>na całej szerokości prostokąta </b>.
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
      <br />
      <br />
      <span id="rules">Punktacja</span>
      <span>
        Liczba otrzymanych punktów zależy od liczby wierszy zdjętych w wyniku
        opadnięcia pojedynczego tetrimino. <br />
        <br />
        Tak więc za 1 wiersz przydzielane jest 100 punktów, za 2 wiersze 250
        punktów, za 3 wiersze 450 punktów, a za "tetris" 700 punktów. <br />
        <br />
        Liczba ta może zostać zwiększona w zależności od tego ile wierszy
        zostało usuniętych przez poprzednie tetrimino, tzw. "<i>combo</i>".{" "}
        <br />
        <br />
        Jedno combo jest warte 50 punktów.
        <br />
        <br /> Liczone są od pierwszego tetrimino z rzędu, które zdjęło wiersze.
        <br />
        <br />
        Ponadto graczowi przydzielane jest bonusowe 10 punktów za każdą
        rozegraną minutę.
      </span>
      <br />
      <span id="rules">
        <b>Miłej rozgrywki!</b>
      </span>
    </div>
  );
};

export default Info;
