import "./App.css";
import React from "react";

interface ArtType {
  id: number;
  title: string;
  date_display: string;
  artist_display: string;
  place_of_origin: string;
  artist_title: string;
  term_titles: string[];
  image_id?: string;
}

const firstArt = {
  id: 9614,
  title: "Haunted House",
  date_display: "1930",
  artist_display: "Morris Kantor American, born Russia",
  place_of_origin: "United States",
  artist_title: "Morris Kantor",
  term_titles: ["oil on canvas", "Surrealism", "Century of Progress"],
  image_id: "0330a6dd-774e-eff1-0073-2be5f85b81d0",
};

const App = () => {
  const [art, setArt] = React.useState(firstArt);
  const [btn, setBtn] = React.useState("block");

  const handleChange = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setBtn("none");
    let res = null;
    let flag = 0;
    while (flag === 0) {
      let randomNumber = Math.trunc(Math.random() * 48000) + 2000;
      res = await fetch(`https://api.artic.edu/api/v1/artworks/${randomNumber}`)
        .then((res) => res.json())
        .catch((err) => console.error(err));

      if (res?.data?.image_id) {
        flag = 1;
      } else {
        flag = 0;
      }
    }
    if (flag === 1) {
      setArt(res.data);
    }

    setTimeout(() => {
      setBtn("block");
    }, 2000);
  };
  return (
    <div className="app">
      <div className="header">
        <h1>Collection of Something</h1>
        <p>I fetch random art from Art Institute of Chicago API</p>
        <button style={{ display: btn }} onClick={handleChange}>
          Next
        </button>
      </div>
      <div className="art">
        <div className="image">
          <img
            src={`https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`}
            alt={art.title}
          />
        </div>
        <div className="properties">
          <div className="prop-group">
            <h3>Title</h3>
            <p>{art.title}</p>
          </div>
          <div className="prop-group">
            <h3>Date Display</h3>
            <p>{art.date_display}</p>
          </div>
          <div className="prop-group">
            <h3>Artist</h3>
            <p>{art.artist_title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
