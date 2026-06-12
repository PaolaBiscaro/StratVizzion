import { useState, useEffect } from "react";
import SideBar from "../components/Sidebar/SideBar";
import ProfileConfig from "../components/ProfileConfig/ProfileConfig";
import Button from "../components/Button/Button";
import MainTitle from "../components/MainTitle/MainTitle";
import SearchBar from "../components/SearchBar/SearchBar";
import AutoHighlighter from "../components/Highlighter/AutoHighlighter";
import { useSearch } from "../context/SearchContext";
import { getUsers, updateUser } from "../services/api/user"; 

export default function ProfileConfiguration() {
    const { setBusca } = useSearch();
    const [userData, setUserData] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getUsers();
                console.log("DADOS DO BACKEND:", response.data);
                setUserData(response.data);
            } catch (error) {
                console.error("Erro ao carregar os dados:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (campo, valor) => {
        setUserData(prev => ({ ...prev, [campo]: valor }));
    };

    const handleSave = async () => {
        if (!userData || !userData.id) {
            alert("Erro: ID do usuário não encontrado.");
            return;
        }
        
        setIsSaving(true);
        try {
            await updateUser(userData.id, userData);
            
            alert("Perfil atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar o perfil:", error);
            alert("Ocorreu um erro ao salvar as alterações. Tente novamente.");
        } finally {
            setIsSaving(false);
        }
    };;

    return (
        <div className="page-layout">
            <SideBar 
                typeUser={userData?.role || ""} 
                nameUser={userData?.name || "Usuário"}
            />

            <AutoHighlighter />
            <main id="content">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: "40px" }}>
                    <MainTitle title="Edição de Perfil" subtitle="Dados que aparecem no seu perfil dentro do sistema" />
                    <SearchBar onSearch={(valor) => setBusca(valor)} />
                </div>

                <div style={{ display: "flex", width: "100%", minHeight: "100vh" }}>
                    <div style={{ flex: 1 }}>
                        
                        <ProfileConfig data={userData} onChange={handleChange} />

                        <div className="botoes-fixos">
                            <Button texto="Cancelar" variante="branco" className="Limpar" />
                            <Button 
                                onClick={handleSave} 
                                texto={isSaving ? "Salvando..." : "Salvar alterações"} 
                                className="Salvar" 
                                disabled={isSaving} 
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}