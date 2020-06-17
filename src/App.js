import React, { useState, useEffect } from "react";

import "./styles.css";
import api from './services/api';

function App() {

  const [repositories, setRepositorie] = useState([]);
  const [title, setTitle] = useState();
  const [url, setUrl] = useState();
  const [techs, setTech] = useState();

  async function handleAddRepository() {
    const response = api.post('/repositories', {title, url, techs}).then(response=>{
      setRepositorie([...repositories, response.data])
    });


  }

  useEffect(()=>{
    api.get('repositories').then(response =>{
      setRepositorie(response.data);
    })
  },[])

  async function handleRemoveRepository(id) {
      api.delete(`repositories/${id}`).then(repositorie=>{
        setRepositorie([...repositories.filter(repositorie => repositorie.id != id)])
      })
      
  }

  return (
    <div>
      <ul data-testid="repository-list">

          {repositories.map(repositorie=>(
            <li key={repositorie.id}> 
            {repositorie.title} 
              <button onClick={() => handleRemoveRepository(repositorie.id)}>
                Remover
              </button>
            </li>
          ))}

      </ul>

      <input type="text" placeholder="Título do Repositório" value={title}
      onChange={text=>setTitle(text.target.value)} />

      <input type="text" placeholder="url" value={url}
      onChange={text=>setUrl(text.target.value)} />
      
      <input type="text" placeholder="tecnologias" value={techs}
      onChange={text=>setTech(text.target.value)} />

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
