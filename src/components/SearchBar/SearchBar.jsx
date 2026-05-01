import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./SearchBar.css";

function SearchBar({ onSearch }) {

    const [termo, setTermo] = useState("");

    const handleChange = (e) => {
        const valor = e.target.value;
        setTermo(valor);

        if (onSearch) onSearch(valor); 
    };

    return (
        <div className="headerDireita">
            <div className="iconRobotWrapper">
                <img src="src/assets/icons/bot.png" alt="Robô" className="iconRobot"/>
            </div>

            <div className="searchWrapper">
                <input
                    type="text"
                    className="inputPesquisa"
                    placeholder="Pesquise algo..."
                    value={termo}
                    onChange={handleChange}
                />

                <FiSearch
                    className="iconSearch"
                    onClick={() => onSearch && onSearch(termo)}
                />
            </div>
        </div>
    );
}

export default SearchBar;