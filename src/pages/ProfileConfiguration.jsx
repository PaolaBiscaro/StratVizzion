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
            // 1. Envia os dados novos para o C# salvar
            await updateUser(userData.id, userData);
            
            // 2. BUSCA OS DADOS FRESQUINHOS DO BANCO
            // Isso garante que o React tenha a versão mais atualizada possível do C#
            const response = await getUsers();
            const usuarioAtualizado = response.data;
            
            // 3. Atualiza os estados e o localStorage com o dado real e confirmado
            setUserData(usuarioAtualizado);
            localStorage.setItem("user", JSON.stringify(usuarioAtualizado));
            
            // 4. Grita pra SideBar atualizar a foto e o nome
            window.dispatchEvent(new Event("userProfileUpdated"));
            
            alert("Perfil atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar o perfil na segunda tentativa:", error);
            alert("Ocorreu um erro ao salvar as alterações. Dê uma olhada no console (F12).");
        } finally {
            setIsSaving(false);
        }
    };     

    return (
        <div className="page-layout">
            <SideBar/>

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