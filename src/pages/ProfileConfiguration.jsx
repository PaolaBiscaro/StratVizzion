import SideBar from "../components/Sidebar/SideBar";
import ProfileConfig from "../components/ProfileConfig/ProfileConfig";
import Button from "../components/Button/Button";

export default function ProfileConfiguration() {

    function limparCampos() {
        console.log("limpou!");
    }

    return (
        <div style={{ display: "flex", width: "100vw", minHeight: "100vh" }}>
            
            <SideBar />

            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: "scroll", padding: "20px" }}>
                
                <ProfileConfig />

                <div className="botoes-fixos">
                    <Button texto="Cancelar" variante="branco" className="Limpar" onClick={limparCampos} /> 
                    <Button texto="Salvar alterações" className="Salvar" />
                </div>

            </div>

        </div>
    );
}