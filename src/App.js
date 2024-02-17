import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { Carousel } from './components';
import { BASE_URL, auth } from './settings';

function App() {
  const [ ids, setIds ] = useState([]);
  const [ albumId, setAlbumId ] = useState(null);
  const [ album, setAlbum ] = useState(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      await axios.get(`${BASE_URL}getAlbumList2?u=${auth.username}&p=${auth.password}&v=1.12.0&c=myapp&type=recent&f=json`)
        .then(res => {
          const albumData = res.data['subsonic-response'].albumList2.album;
          const albumIdList = albumData.map((albumDataItem) => {
            return albumDataItem.id
          })
          setIds(albumIdList);
          
        }).catch(err => {
          console.log('err', err);
        })
    }

    const getAlbums = async () => {
      await axios.get(`${BASE_URL}getAlbum?u=${auth.username}&p=${auth.password}&v=1.12.0&c=myapp&id=${albumId}&f=json`)
        .then(res => {
          const albumInfo = res.data['subsonic-response'].album;
          setAlbum(albumInfo)
          console.log('albumInfo', albumInfo);
        }).catch(err => {
          console.log('err', err);
        })
    }
    getAlbums();
    fetchAlbums();
  }, [albumId])

  return (
    <div className='app'>
      {ids.length > 0 && <Carousel ids={ids} setAlbumId={setAlbumId}/>}
      <div className='album-info'>
        {album && <p className='title'>{album.name}</p>}
        <table>
          <tr>
            <th>#</th>
            <th>track</th>
          </tr>
          {album?.song?.length > 0 && album.song.map((songItem, index) => {
            return(
              <tr>
                <td>{index + 1}</td>
                <td>{songItem.title}</td>
              </tr>
            )
          })}
        </table>
      </div>
    </div>
  );
}

export default App;
