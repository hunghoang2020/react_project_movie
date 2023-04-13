import React, {useState, useEffect,useCallback} from 'react'
import { useParams } from 'react-router-dom'
import {useLocation} from 'react-router'
import PropTypes from 'prop-types'
import './movie-grid.scss'
//
import { useNavigate } from 'react-router-dom';

import { useHistory } from "react-router-dom";

import MovieCard from '../movie-card/MovieCard'
import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi'
import Button, { OutlineButton } from '../button/Button'

import  Input  from "../input/Input";


const MovieGrid = props => {

    const [Items, setItems] = useState([])

    const [Page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const {keyword} = useParams()
    useEffect(() => {
        const getList = async () => {
            let response = null

            if (keyword === undefined) {
                const params = {}
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(movieType.upcoming,{params})
                       
                        break;
                
                    default:
                        response = await tmdbApi.getTvList(tvType.popular,{params})
                        break;
                }
            } else {
                const params = {
                    
                    query: keyword,
                }
                response = await tmdbApi.search(props.category, {params})
                

            }
            setItems(response.results)
            setTotalPage(response.total_pages)
        }
        getList()
    }, [props.category,keyword])
    
    const loadMore = async () => {

        let response = null

        if (keyword === undefined) {
            const params = {
                page : Page +1,
                
            }
            switch (props.category) {
                case category.movie:
                    response = await tmdbApi.getMoviesList(movieType.upcoming,{params})
                    console.log(params)
                    break;
            
                default:
                    response = await tmdbApi.getTvList(tvType.popular,{params})
                    break;
            }
        } else {
            const params = {
                page  : Page + 1,
                query: keyword,
            }
            response = await tmdbApi.search(props.category, {params})
        }
        setItems([...Items, ...response.results])
        setPage(Page + 1)

       
        
    }

  return (
    <>
        <div className="section mb-3">
            <MovieSearch
                category = {props.category}
                keyword = {keyword}
            ></MovieSearch>
        </div>

        <div className='movie-grid'>
            {
                Items.map((item,i) => <MovieCard category = {props.category} item = {item} key = {i}></MovieCard>)
            }
        </div>
        {
            Page < totalPage ? (
                <div className="movie-grid__loadmore">
                    <OutlineButton className = 'small' onClick = { loadMore }> Load More</OutlineButton>
                </div>
            ) : null
        }
    </>
  )
}
// this funtion use to search but it can not send request to link
const MovieSearch = props => {

    const history  = useLocation()
    const [Keyword, setKeyword] = useState(props.keyword ? props.keyword : '')

    const navigate = useNavigate();

    const goToSearch  = useCallback(
      () => {
        if (Keyword.trim().length > 0) {
            navigate(`search/${Keyword}`)

            // navigate(`${category[props.category]}/search/${Keyword}`)
            // console.log(`${category[props.category]}` )
        }

      },
      [Keyword,props.category,history]

  
    )
    

    useEffect(() => {
      const enterEven = (e) => {
        e.preventDefault()
        if (e.keyCode === 13) {
            goToSearch()
        }

      }
    document.addEventListener('keyup', enterEven)
      return () => {
        document.removeEventListener('keyup',enterEven)
      }
    }, [Keyword,goToSearch])
    


    return (
        <div className="movie-search">
            <Input
                type ='text'
                placeholder = 'Enter keyword'
                value = {Keyword}
                onChange = {(e) => setKeyword(e.target.value)}
            />
            <Button className = 'small' onClick={goToSearch}> Search </Button>
        </div>

    )
}
MovieGrid.propTypes = {}

export default MovieGrid