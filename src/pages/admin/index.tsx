import React, { useState } from "react";
import { FiSearch, FiEdit, FiTrash, FiCameraOff } from "react-icons/fi";
import { useRouter } from "next/router";

import "@/app/globals.css";

const projects = [
    {
        id: 1,
        title: "Gestão de Varejo",
        segment: "Medicina",
        platform: "Aplicativo",
        languages: ["Angular", "SQL"],
    },
    {
        id: 2,
        title: "Rifa Online",
        segment: "Agronomia",
        platform: "Web App",
        languages: ["Angular", "SQL"],
    },
    {
        id: 3,
        title: "Loja Virtual",
        segment: "Trader esportivo",
        platform: "Microserviço",
        languages: ["Angular", "SQL"],
    },
    {
        id: 4,
        title: "MedTrends",
        segment: "Odontologia",
        platform: "E-commerce",
        languages: ["Angular", "SQL"],
    },
    {
        id: 5,
        title: "Prudent Investor",
        segment: "Financeiro",
        platform: "Aplicativo",
        languages: ["Angular", "SQL"],
    },
];

export default function AdminPanel() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selected, setSelected] = useState([]);
    const [menuCategories, setMenuCategories] = useState({
        "Segmentos de Negócio": ["Medicina", "Veterinário"],
        "Tecnologias": ["ASP.NET", "Next.JS"],
        "Plataforma": ["WEB", "MOBILE"],
    });
    const [activeCategory, setActiveCategory] = useState(null);
    const [newSubcategory, setNewSubcategory] = useState("");
    const router = useRouter();

    const handleCategoryClick = (category) => {
        setActiveCategory((prev) => (prev === category ? null : category));
    };

    const handleAddSubcategory = () => {
        if (newSubcategory.trim() && activeCategory) {
            setMenuCategories((prev) => ({
                ...prev,
                [activeCategory]: [...prev[activeCategory], newSubcategory],
            }));
            setNewSubcategory("");
        }
    };

    const handleSelect = (id) => {
        setSelected((prevSelected) =>
            prevSelected.includes(id) ? prevSelected.filter((selectedId) => selectedId !== id) : [...prevSelected, id]
        );
    };

    const handleImageUpload = (projectId) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (event) => {
            const file = event.target.files[0];
            if (file) {
                console.log(`Imagem selecionada para o projeto ${projectId}:`, file);
                // Adicionar lógica de upload aqui
            }
        };
        input.click();
    };

    const filteredProjects = projects.filter((project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-container">
            <div className="admin-panel">
                <h1 className="admin-title">Painel Administrador</h1>
                <div className="admin-topbar">
                    <button
                        className="admin-new-button"
                        onClick={() => router.push("./admin/new")}
                    >
                        + Novo Projeto
                    </button>
                    <div className="admin-search-input">
                        <input
                            type="text"
                            placeholder="Pesquisar projeto"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FiSearch className="admin-search-icon" />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>
                                    <input
                                        type="checkbox"
                                        onChange={(e) =>
                                            setSelected(
                                                e.target.checked ? projects.map((p) => p.id) : []
                                            )
                                        }
                                        checked={selected.length === projects.length}
                                    />
                                </th>
                                <th>Projetos</th>
                                <th>Segmento</th>
                                <th>Plataforma</th>
                                <th>Linguagens</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProjects.map((project) => (
                                <tr key={project.id} className="admin-table-row">
                                    <td>
                                        <input
                                            type="checkbox"
                                            onChange={() => handleSelect(project.id)}
                                            checked={selected.includes(project.id)}
                                        />
                                    </td>
                                    <td>
                                        <div className="flex items-center">
                                            <button
                                                className="upload-button mr-2"
                                                onClick={() => handleImageUpload(project.id)}
                                            >
                                                <FiCameraOff />
                                            </button>
                                            <span>{project.title}</span>
                                        </div>
                                    </td>
                                    <td>{project.segment}</td>
                                    <td>{project.platform}</td>
                                    <td>
                                        {project.languages.map((lang) => (
                                            <span key={lang} className="admin-language">
                                                {lang}
                                            </span>
                                        ))}
                                    </td>
                                    <td>
                                        <button className="admin-action-button">
                                            <FiTrash />
                                        </button>
                                        <button className="admin-action-button">
                                            <FiEdit />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="6">
                                    <div className="admin-footer flex justify-between mt-1">
                                        <button className="admin-footer-button">Anterior</button>
                                        <span>Página 1 de 10</span>
                                        <button className="admin-footer-button">Próximo</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{ height: "150px" }}></div>
                <h1 className="admin-title">Ajustes de Menu</h1>
                <div className="admin-menu">
                    <table className="menu-table">
                        <thead>
                            <tr>
                                <th>
                                    <button className="menu-add-button">Adicionar item</button>
                                    <button onClick={handleAddSubcategory} className="menu-add-button">
                                        Adicionar
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(menuCategories).map((category) => (
                                <React.Fragment key={category}>
                                    <tr className="subcategory-row">
                                        <td
                                            className={activeCategory === category ? "active" : "inactive"}
                                            onClick={() => handleCategoryClick(category)}
                                        >
                                            {category}
                                        </td>
                                    </tr>
                                    {activeCategory === category && (
                                        <React.Fragment>
                                            <tr>
                                                <td className="subcategory">
                                                    <input
                                                        type="text"
                                                        value={newSubcategory}
                                                        onChange={(e) => setNewSubcategory(e.target.value)}
                                                        placeholder="+ Adicionar nova subcategoria"
                                                    />
                                                </td>
                                            </tr>
                                            {menuCategories[category].map((subcategory, index) => (
                                                <tr key={index}>
                                                    <td className="subcategory">{subcategory}</td>
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    )}
                                </React.Fragment>
                            ))}
                            <tr>
                                <td>
                                    <button className="menu-save-button">Salvar menu</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
