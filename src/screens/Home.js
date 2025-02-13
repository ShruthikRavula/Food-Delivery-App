// ... (imports and other code)
import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Card from '../components/Card';


export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      response = await response.json();
      setFoodItem(response[0]);
      setFoodCat(response[1]);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div><Navbar /></div>

      {/* Carousel */}
      <div id="carouselExampleControls" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
        <div className="carousel-inner" id="carousel">
          <div className='carousel-caption' style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>
          <div className="carousel-item active">
            <img src="https://source.unsplash.com/random/900×700/?burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900×700/?sandwich" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900×700/?barbeque" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* ... (Carousel code) */}

      <div className='container'>
        {foodCat.length !== 0 ? (
          foodCat.map((data) => (
            <div className='row mb-3' key={data._id}>
              <div className="fs-3 m-3">
                {data.CategoryName}
              </div>

              {foodItem.length !== 0 ? (
                foodItem.filter(item => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                  .map(filterItems => (
                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                      <Card foodItem={filterItems}
                        options={filterItems.options[0]}
                      />
                    </div>
                  ))
              ) : (
                <div>"no data found"</div>
              )}
            </div>
          ))
        ) : (
          ""
        )}
      </div>

      <div><Footer /></div>
    </div>
  );
}
