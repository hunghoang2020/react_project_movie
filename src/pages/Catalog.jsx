import React from 'react'
import { useParams } from 'react-router-dom'

import PageHeader from '../component/page-header/PageHeader'
import { category as cate } from '../api/tmdbApi'
import MovieGrid from '../component/movie-grid/MovieGrid'


const Catalog = () => {
  const { category } = useParams()

  console.log(category)
  return (
    <div>
        <PageHeader>
            {category === cate.movie ? 'Movies' : 'TV series'}
        </PageHeader>
        <div className="container">
            <div className="section mb-3">
                <MovieGrid category = {category}></MovieGrid>
            </div>
        </div>
    </div>
  )
}

export default Catalog