import React from 'react'
import { Link } from 'react-router-dom'
import { OutlineButton } from '../component/button/Button'
import HeroSlide from '../component/hero-slide/HeroSlide'
import MoviesList from '../component/movieslist/MoviesList'

import { category, movieType, tvType } from '../api/tmdbApi'

const home = () => {
  return (
    <>
      <HeroSlide></HeroSlide>
        <div className="container">
            <div className="section mb-3">
                <div className="section__header mb-2">
                    <h2>Trending Movies</h2>    
                    <Link to = "/movie">
                        <OutlineButton className = "small">View More</OutlineButton>
                    </Link>
                </div>
                <MoviesList category={category.movie} type = {movieType.popular}/>
            </div>

            <div className="section mb-3">
                <div className="section__header mb-2">
                    <h2>Top Rated Movies</h2>    
                    <Link to = "/movie">
                        <OutlineButton className = "small">View More</OutlineButton>
                    </Link>
                </div>
                <MoviesList category={category.movie} type = {movieType.top_rated}/>
            </div>

            <div className="section mb-3">
                <div className="section__header mb-2">
                    <h2>Trending tv</h2>    
                    <Link to = "/tv">
                        <OutlineButton className = "small">View More</OutlineButton>
                    </Link>
                </div>
                <MoviesList category={category.tv} type = {tvType.popular}/>
            </div>

            <div className="section mb-3">
                <div className="section__header mb-2">
                    <h2>Top Rated tv</h2>    
                    <Link to = "/tv">
                        <OutlineButton className = "small">View More</OutlineButton>
                    </Link>
                </div>
                <MoviesList category={category.tv} type = {tvType.top_rated}/>
            </div>

        </div>
    </>
  )
}

export default home