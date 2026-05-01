    import { useState } from "react";
    import { FiSearch } from "react-icons/fi";
    import { useSearch } from "../../context/SearchContext";
    import "./SearchBar.css";

    function SearchBar() {
        const [input, setInput] = useState("");
        const { setBusca } = useSearch();

        function handleChange(e) {
            const valor = e.target.value;
            setInput(valor);
            setBusca(valor); 
        }

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
                        value={input}
                        onChange={handleChange}
                    />

                    <FiSearch
                        className="iconSearch"
                        onClick={() => setBusca(input)}
                    />
                </div>
            </div>
        );
    }

    export default SearchBar;