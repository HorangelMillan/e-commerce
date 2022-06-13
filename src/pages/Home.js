import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { productsFilter } from '../store/slices/products.slice';
import { Filter, ProductsCard } from '../components';
import '../styles/home.css';

const Home = () => {

    const dispatch = useDispatch();
    const [search, setSearch] = useState('');

    const filterProducts = () => {
        dispatch(productsFilter(search));
    };

    return (
        <div className='home'>

            <Filter />

            <div>
                <form>
                    <input type="text" onChange={e => setSearch(e.target.value)} value={search} placeholder="What are you looking for?" />
                    <button onClick={filterProducts}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </form>

                <ProductsCard />

            </div>
        </div>
    );
};

export default Home;