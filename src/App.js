import React, { useState, useEffect } from "react";
import api from "../src/services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: "teste2",
      url: "httlp://teste33.com",
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const newRepos = repositories.filter((repo) => repo.id !== id);

    setRepositories(newRepos);
  }

  return (
    <div>
      <ul data-testid="repository-list" title="Repositorios">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
