import React, { useState } from "react";
import Card from "./components/Card/Card";
import Jar from "./components/Jar/Jar";
import "./App.css";
import {
  angryPhrases,
  anxiousPhrases,
  gratefulPhrases,
  happyPhrases,
  lonelyPhrases,
  sadPhrases,
} from "./data/phrases";

function App() {
  const feelings: Array<{ label: string; emoji: string }> = [
    { label: "Feliz", emoji: "😊" },
    { label: "Triste", emoji: "😢" },
    { label: "Enfadada", emoji: "😠" },
    { label: "Ansiosa", emoji: "😰" },
    { label: "Sola", emoji: "😔" },
    { label: "Agradecida", emoji: "🙏" },
  ];

  const phraseByEmotion: Record<string, string[]> = {
    Feliz: happyPhrases,
    Triste: sadPhrases,
    Enfadada: angryPhrases,
    Ansiosa: anxiousPhrases,
    Sola: lonelyPhrases,
    Agradecida: gratefulPhrases,
  };
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  const onSelectFeeling = (emotion: string) => {
    console.log(`Selected emotion: ${emotion}`);
    setSelectedEmotion(emotion);
  };

  return (
    <>
      <h1 className="title">Léeme cuando te sientas...</h1>
      {!selectedEmotion && (
        <div className="container">
          <div className="cards_container">
            {feelings.map((feeling) => (
              <Card
                key={feeling.label}
                title={feeling.label}
                emotion={feeling.emoji}
                onSelect={onSelectFeeling}
              />
            ))}
          </div>
        </div>
      )}
      {selectedEmotion && (
        <Jar
          phrases={phraseByEmotion[selectedEmotion]}
          emotion={selectedEmotion}
          onClickBack={() => setSelectedEmotion(null)}
        />
      )}
      <div className="footer">
        <p>With ❤️ by BrandMV</p>
      </div>
    </>
  );
}

export default App;
