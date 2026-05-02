import SideBar from "../components/Sidebar/SideBar";
import ProfileConfig from "../components/ProfileConfig/ProfileConfig";
import Button from "../components/Button/Button";
import MainTitle from "../components/MainTitle/MainTitle";
import SearchBar from "../components/SearchBar/SearchBar";
import AutoHighlighter from "../components/Highlighter/AutoHighlighter";
import { useSearch } from "../context/SearchContext";

export default function ProfileConfiguration() {
    const { setBusca } = useSearch();

    return (
        <div className="page-layout">
            <SideBar />

                <AutoHighlighter />
                <main id="content">
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        marginBottom: "40px"
                    }}>
                        <MainTitle
                            title="Edição de Perfil"
                            subtitle="Dados que aparecem no seu perfil dentro do sistema"
                        />

                        <SearchBar onSearch={(valor) => setBusca(valor)} />
                    </div>

                    <div style={{ display: "flex", width: "100%", minHeight: "100vh" }}>
                        <div style={{ flex: 1 }}>
                            <ProfileConfig />

                            <div className="botoes-fixos">
                                <Button texto="Cancelar" variante="branco" className="Limpar" />
                                <Button texto="Salvar alterações" className="Salvar" />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
    );
}