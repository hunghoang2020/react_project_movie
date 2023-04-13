import React, {useState, useEffect, useRef} from 'react'
import { useParams } from 'react-router-dom'
import tmdbApi from '../../api/tmdbApi'


const VideoList = props => {

    const  {category} = useParams()
    const [Videos, setVideos] = useState([])


    useEffect(() => {
        const getVideos = async () => {
          const res = await tmdbApi.getVideos(category, props.id)
          setVideos(res.results.slice(0,5))
        //   console.log(res.cast)
        }
      
        getVideos()
    }, [category,props.id])

  return (
    <>
        {
            Videos.map((item,i) => (
                <Video key={i} item={item}/>
            ))
        }   
    </>
  )
}

const Video = props => {
    const item = props.item
    const iframeRef = useRef(null)

    useEffect(() => {
        const  height = iframeRef.current.offsetWidth * 9 / 16 + 'px'
        iframeRef.current.setAttribute('height',height)
    
    }, [])
    

    return (
        <div className="video">
            <div className="video__title">
                <h2>{item.name}</h2>
            </div>
            <iframe 
                src = {`https://www.youtube.com/embed/${item.key}`} 
                
                ref = {iframeRef}
                width = '100%'
                title='video'
            ></iframe>
        </div>
    )
}

<iframe width="1350" height="498" src="https://www.youtube.com/embed/9-2qTNawqxY" title="Học useEffect - React Hooks (2021)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

export default VideoList