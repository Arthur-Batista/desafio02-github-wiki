import gitLogo from '../assets/github.png'
import Input from '../components/input'
import Button from '../components/Button'
import ItemRepo from '../components/ItemRepo'
import {Container} from './styles'
import {useState} from 'react';
import {api} from '../services/api'
import { Global } from '@emotion/react';
import { Roboto } from 'google-fonts';

function App() {
  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    try {
      const { data } = await api.get(`repos/${currentRepo}`);

      if (data.id) {
        const isExist = repos.find(repo => repo.id === data.id);

        if (!isExist) {
          setRepos(prev => [...prev, data]);
          setCurrentRepo('');
        } else {
          console.log('Este repositório já foi adicionado.');
        }
      }
    } catch (error) {
      console.error('Erro ao buscar repositório:', error);
    }
  };

  return (
    <>
      <Global styles={Roboto} />
      <Container>
        <img src={gitLogo} width={72} height={72} alt="Logo do Github" />
        <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)} />
        <Button onClick={handleSearchRepo} />
        {repos.map(repo => (
          <ItemRepo key={repo.id} repo={repo} />
        ))}
      </Container>
    </>
  );
}

export default App;