import { useState } from 'react';
import '@/app/globals.css';

export default function NewProject() {
    const [step, setStep] = useState(1);
    const [categories, setCategories] = useState({
        segmento: false,
        tecnologias: false,
        plataformas: false,
    });

    const toggleCategory = (category) =>
        setCategories((prev) => ({ ...prev, [category]: !prev[category] }));

    const nextStep = () => setStep((prevStep) => Math.min(prevStep + 1, 2));
    const prevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 1));

    return (
        <div className="container">
            <h1 className="container-title">Adicionar projeto</h1>
            <div className="progress-bar">
                <div className="progress-indicator">
                    <div
                        className="progress-fill"
                        style={{ width: `${step === 1 ? '50%' : '100%'}` }}
                    ></div>
                </div>
                <div className="step">
                    <span className={step === 1 ? 'active' : ''}>1</span>
                    <p>Informações principais</p>
                </div>
                <div className="step">
                    <span className={step === 2 ? 'active' : ''}>2</span>
                    <p>Detalhes do projeto</p>
                </div>
            </div>

            {step === 1 && (
                <form className="form">
                    <label htmlFor="titulo">Título do projeto</label>
                    <input type="text" id="titulo" placeholder="Título do projeto" />

                    <label htmlFor="descricao">Descrição</label>
                    <textarea id="descricao" placeholder="Descrição do projeto"></textarea>

                    <label htmlFor="link">Link do projeto</label>
                    <input type="url" id="link" placeholder="Link do projeto" />

                    <label htmlFor="linguagens">Linguagens utilizadas</label>
                    <select id="linguagens" multiple>
                        <option>NextJS</option>
                        <option>C#</option>
                        <option>React</option>
                        <option>Java</option>
                    </select>

                    <label htmlFor="categoria" className="form-category-label">
                        Categoria de menu
                    </label>
                    <div className="checkbox-categories">
                        {["segmento", "tecnologia", "plataforma"].map((category) => (
                            <div key={category} className="checkbox-item">
                                <input
                                    type="checkbox"
                                    id={category}
                                    checked={categories[category]}
                                    onChange={() => toggleCategory(category)}
                                />
                                <label htmlFor={category} className="checkbox-label">
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </label>
                            </div>
                        ))}
                    </div>

                    <div>
                        <label htmlFor="subcategoria">Subcategoria de menu</label>
                    </div>
                    {categories.segmento && (
                        <div className="checkbox-group">
                            <h3>Segmentos</h3>
                            <div className="checkbox-container">
                                <div>
                                    <input type="checkbox" id="item1" />
                                    <label htmlFor="item1">Item 1</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="item2" />
                                    <label htmlFor="item2">Item 2</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="item3" />
                                    <label htmlFor="item3">Item 3</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="item4" />
                                    <label htmlFor="item4">Item 4</label>
                                </div>
                            </div>
                        </div>
                    )}

                    {categories.tecnologia && (
                        <div className="checkbox-group">
                            <h3>Tecnologias</h3>
                            <div className="checkbox-container">
                                <div>
                                    <input type="checkbox" id="item1" />
                                    <label htmlFor="item1">Item 1</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="item2" />
                                    <label htmlFor="item2">Item 2</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="item3" />
                                    <label htmlFor="item3">Item 3</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="item4" />
                                    <label htmlFor="item4">Item 4</label>
                                </div>
                            </div>
                        </div>
                    )}

                    {categories.plataforma && (
                        <div className="checkbox-group">
                            <h3>Plataformas</h3>
                            <div className="checkbox-container">
                                <div>
                                    <input type="checkbox" id="item1" />
                                    <label htmlFor="item1">Item 1</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="item2" />
                                    <label htmlFor="item2">Item 2</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="item3" />
                                    <label htmlFor="item3">Item 3</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="item4" />
                                    <label htmlFor="item4">Item 4</label>
                                </div>
                            </div>
                        </div>
                    )}

                    <button type="button" onClick={nextStep} className="next-button">
                        Avançar
                    </button>
                </form>
            )}

            {step === 2 && (
                <form className="form">
                    <button type="button" className="add-image-button">Adicionar imagens</button>

                    <label htmlFor="detalhes">Detalhes técnicos</label>
                    <textarea id="detalhes"></textarea>

                    <label htmlFor="estatisticas">Estatísticas e resultados</label>
                    <textarea id="estatisticas"></textarea>

                    <label htmlFor="documentacao">Documentação</label>
                    <textarea id="documentacao"></textarea>

                    <div className="buttons-container">
                        <button type="button" onClick={prevStep} className="back-button">
                            Voltar
                        </button>
                        <button type="submit" className="submit-button">
                            Adicionar projeto
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
