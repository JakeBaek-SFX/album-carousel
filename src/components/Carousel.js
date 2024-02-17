import { useEffect, useState} from 'react';
import { BASE_URL, auth } from '../settings';

const Carousel = (props) => {
  const { ids, setAlbumId } = props;
  const [ currentIndex, setCurrentIndex ] = useState(0);
  const [ currentAlbumId, setCurrentAlbumId ] = useState(ids[0]);

  useEffect(() => {
    console.log('ids111', ids);
    setAlbumId(ids[currentIndex]);
  }, [])

  useEffect(() => {
    setAlbumId(currentAlbumId);
  }, [setAlbumId, currentAlbumId])

  const handleLeft = () => {
    if(currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
      setCurrentAlbumId(ids[currentIndex - 1])
    }else {
      setCurrentIndex(ids.length - 1)
      setCurrentAlbumId(ids[ids.length - 1])
    }
  }

  const handleRight = () => {
    if(currentIndex < ids.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setCurrentAlbumId(ids[currentIndex + 1])
    }else {
      setCurrentIndex(0)
      setCurrentAlbumId(ids[0])
    }
  }

  return (
    <div className='carousel'>
      <button className='left-button' onClick={handleLeft}>{`<=`}</button>
          <ul style={{transform: `translateX(-${(currentIndex+1)*200}px)`}}>
            {ids && ids.map((id) => {
              return (
                <li key={id} className={id === currentAlbumId ? 'album-cover-clicked' : 'album-cover'} >
                  <img src={`${BASE_URL}getCoverArt?id=${id}&u=${auth.username}&p=${auth.password}&v=1.12.0&c=myapp&size=200`} alt="tempAlt"/>
                </li>
              )
            })}
          </ul>
      <button className='right-button' onClick={handleRight}>{`=>`}</button>
    </div>
  )
}

export { Carousel }