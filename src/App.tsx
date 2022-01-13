import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

interface IProps {
  languages: LanguageObj[];
}

interface LanguageObj {
  code: string;
  name: string;
}

function App() {
  const [to, setTo] = useState("ja");
  const [from, setFrom] = useState("en");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [langOptions, setLangOptions] = useState<IProps["languages"]>([]);

  const translate = () => {
    // curl -X POST "https://libretranslate.com/translate" -H  "accept: application/json" -H  "Content-Type: application/x-www-form-urlencoded" -d "q=Sup&source=en&target=es&format=text&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

    /* Need to do the below step so to post the data in the url format */

    const params = new URLSearchParams();
    params.append("q", input);
    params.append("source", from);
    params.append("target", to);
    params.append("format", "text");
    params.append("api_key", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");
    axios
      .post(
        "https://libretranslate.de/translate",
        params,
        // {
        //   q: input,
        //   source: from,
        //   target: to,
        //   api_key: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        // },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setOutput(res.data.translatedText);
      });
  };

  useEffect(() => {
    axios
      .get("https://libretranslate.com/languages", {
        headers: { accept: "application/json" },
      })
      .then((res) => {
        setLangOptions(res.data);
        console.log(res);
      });
  }, []);

  // curl -X GET "https://libretranslate.com/languages" -H  "accept: application/json"

  return (
    <div className="App">

        <h1 className="heading">TRANSLATE</h1>

      <div className="container">
        <div className="div-select">
          <div>
            <h2>From:</h2>
            <select onChange={(e) => setFrom(e.target.value)}>
              {langOptions.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h2>To:</h2>
            <select onChange={(e) => setTo(e.target.value)}>
              {langOptions.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="div-trans">
          <div>
            <textarea
              cols={60}
              rows={10}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
          </div>
          <div>
            <textarea cols={60} rows={10} defaultValue={output}></textarea>
          </div>
        </div>
        <button onClick={(e) => translate()}>Translate</button>
      </div>
    </div>
  );
}

export default App;
