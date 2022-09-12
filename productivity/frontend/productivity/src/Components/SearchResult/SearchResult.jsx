import React from 'react';
import './SearchResult.css';

const SearchResult = ({
    className,
    people,
    endPeopleSearch
}) =>{
  
 return(
     <div className = {`
        ${className} 
        searchresult
    `}>
        <div className="person">
            <div className="image">
                <img src="https://picsum.photos/300" alt="" />
            </div>
            <div className="info">
                <span className="username">
                    TempGuy 
                </span>
                <span className="email">
                    iamtemp@gmail.com
                </span>
            </div>
        </div>
        <div className="person">
            <div className="image">
                <img src="https://picsum.photos/300" alt="" />
            </div>
            <div className="info">
                <span className="username">
                    TempGuy 
                </span>
                <span className="email">
                    iamtemp@gmail.com
                </span>
            </div>
        </div>
        <div className="person">
            <div className="image">
                <img src="https://picsum.photos/300" alt="" />
            </div>
            <div className="info">
                <span className="username">
                    TempGuy 
                </span>
                <span className="email">
                    iamtemp@gmail.com
                </span>
            </div>
        </div>
        <div className="person">
            <div className="image">
                <img src="https://picsum.photos/300" alt="" />
            </div>
            <div className="info">
                <span className="username">
                    TempGuy 
                </span>
                <span className="email">
                    iamtemp@gmail.com
                </span>
            </div>
        </div>
     </div>
 );
}

export default SearchResult;

