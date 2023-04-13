import React, {useEffect, useState} from 'react'
import { useParams  } from "react-router";

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import './detail.scss'
import CastList from './CastList';
import VideoList from './VideoList';

import MovieList from '../../component/movieslist/MoviesList'

const Detail = () => {

    const {category, id} = useParams()
    const [Item, setItem] = useState(null)


    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbApi.detail(category, id, {params:{}})
            setItem(response)
            window.scrollTo(0,0)
        }
        getDetail()
    
      
    }, [category, id])
    
    return (
        <>
            {
                Item && (
                    <>
                        <div 
                            className='banner' 
                            style={{backgroundImage: `url(${apiConfig.originalImage(Item.backdrop_path || Item.poster_path)})`}}>
                        </div>
                        <div className="mb3 movie-content container">
                            <div className="movie-content__poster">
                                <div className="movie-content__poster__img" style={{backgroundImage: `url(${apiConfig.originalImage(Item.backdrop_path || Item.poster_path)})`}}></div>
                            </div>
                            <div className="movie-content__infor">
                                <h1 className="title">
                                    {Item.title || Item.name}
                                </h1>
                                <div className="genres">
                                    {Item.genres && Item.genres.slice(0,5).map((genre,i) => (
                                        <span key = {i} className = 'genres__item'>{genre.name} </span>
                                    ))}
                                </div>
                                <p className="overview">{Item.overview}</p>
                                <div className="cast">
                                    <div className="section__header">
                                        <h2>Casts</h2>
                                    </div>
                                    <CastList id={Item.id}></CastList>
                                </div>
                            </div>

                        </div>
                        <div className="container">
                            <div className="section mb-3">
                                <VideoList
                                    id = {Item.id}
                                />
                            </div>
                            <div className="section mb-3">
                                <div className="section__header mb-2">
                                    <h2>Similar</h2>
                                    <MovieList category= {category} type = 'similar' id = {Item.id}></MovieList>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }  
        </>
    )
}

export default Detail