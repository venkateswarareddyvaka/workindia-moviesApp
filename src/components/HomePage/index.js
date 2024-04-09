import {useState,useEffect} from 'react'
import Card from '../Card'
import './index.css'

const Home = () =>{

    const [products,getProducts] = useState(null)
    
    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        try {
          const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=60d7c74b69bb1f98d72e9bf5f46c9a6d&language=en-US&page=1`);
          const jsonData = await response.json();
          const updatedData = jsonData.results.map((eachitem)=>{
            return (
              {
                adult:eachitem.adult,
                backdroppath:eachitem.backdrop_path,
                genreids:eachitem.genre_ids,
                id:eachitem.id,
                originallanguage:eachitem.original_language,
                originaltitle:eachitem.original_title,
                overview:eachitem.overview,
                popularity:eachitem.popularity,
                posterpath:eachitem.poster_path,
                releasedate:eachitem.release_date,
                title:eachitem.title,
                video:eachitem.video,
                voteaverage:eachitem.vote_average,
                votecount:eachitem.vote_count
              }
            )
          })
          getProducts(updatedData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
    return(
        <div className='bg-container'>
            <div className='inner-container'>
              <Card item={products}/>
            </div>
        </div>
    )
}

export default Home


