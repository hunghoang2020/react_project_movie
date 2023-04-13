import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

import "./movieslist.scss"
import { SwiperSlide, Swiper } from "swiper/react"
import { Link } from "react-router-dom"
import Button from "../button/Button"
import tmdbApi, { category } from "../../api/tmdbApi"
import apiConfig from "../../api/apiConfig"

import MovieCard from "../movie-card/MovieCard"

const MoviesList = (props) => {
    const [items, setItems] = useState([])

    useEffect(() => {
        const getList = async () => {
            let response = null
            const params = {}

            if (props.type !== "similar") {
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(props.type, {
                            params: {},
                        })
                        break
                    default:
                        response = await tmdbApi.getMoviesList(props.type, {
                            params: {},
                        })
                }
            } else {
                response = await tmdbApi.getMoviesList(props.type, props.id)
            }
            setItems(response.results)
            // console.log(response.results)
        }
        getList()
    }, [])

    return (
        <div className='movie-list'>
            <Swiper grabCursor={true} spaceBetween={10} slidespreview={"auto"}>
                {items.map((item, i) => (
                    <SwiperSlide key={i}>
                        <MovieCard
                            item={item}
                            category={props.category}
                        ></MovieCard>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

MoviesList.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
}

export default MoviesList
