import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { Context } from "../store/appContext"

const Card = ({ nature, item }) => {
    const { actions } = useContext(Context)
    return (
        <>
            {nature == "people" ?
                (<div>
                    <div className="card">
                        <div className="image"><img src="https://via.placeholder.com/150" className="card-img-top" alt="..." /></div>
                        <div className="description ms-3">
                            <h4>{item.name}</h4>
                            <p>Gender: {item.gender}</p>
                            <p>Hair color: {item.hair_color}</p>
                            <p>Eye color: {item.eye_color}</p>

                        </div>
                        <div className="footer justify-content-between">
                            <Link to={`/people/${item.id}`}><button className="btn btn-outline-primary ms-3" type="button">Learn more!</button></Link>
                            <button type="button" className="btn btn-outline-warning mb-2 me-3" onClick={()=>actions.addFavorite(nature, item.id, item.name)}><i className="fas fa-heart"></i></button>
                        </div>
                    </div></div>) : 

                    nature == "planets" ?
                        (<div>
                            <div className="card">
                                <div className="image"><img src="https://via.placeholder.com/150" className="card-img-top" alt="..." /></div>
                                <div className="description ms-3">
                                    <h4>{item.name}</h4>
                                    <p>Population: {item.population}</p>
                                    <p>Terrain: {item.climate}</p>

                                </div>
                                <div className="footer justify-content-between">
                                    <Link to={`/planets/${item.id}`}><button className="btn btn-outline-primary ms-3" type="button">Learn more!</button></Link>
                                    <button type="button" className="btn btn-outline-warning mb-2 me-3" onClick={()=>actions.addFavorites(item.id)}><i className="fas fa-heart"></i></button>
                                </div>
                            </div>
                        </div>) : null
            }
        </>
    )
}
export default Card