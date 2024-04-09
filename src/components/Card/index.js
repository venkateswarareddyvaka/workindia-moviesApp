import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Card = ({ item }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    if (!item || item.length === 0) {
        return <div>No items to display</div>;
    }

    const totalPages = Math.ceil(item.length / itemsPerPage);

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const currentItems = item.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div>
            <div className='bg-container1'>
                {currentItems.map((eachitem, index) => (
                    <Link to={`/singlemovie/${eachitem.id}`} key={index} className="card-link">
                        <div className="card">
                            <img src={`https://image.tmdb.org/t/p/w500${eachitem.posterpath}`} alt="cardImage" />
                            <div className="card-content">
                                <h3>{eachitem.originaltitle}</h3>
                                <p>Rating: {eachitem.voteaverage}/10</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default Card;
