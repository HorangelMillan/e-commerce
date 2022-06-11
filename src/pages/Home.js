import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { productsFilter } from '../store/slices/products.slice';
import { Button, FormControl, InputGroup } from "react-bootstrap";
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
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Recipient's product"
                        aria-label="Recipient's product"
                        aria-describedby="basic-addon2"
                        onChange={e => setSearch(e.target.value)}
                        value={search}
                    />
                    <Button
                        variant="outline-secondary"
                        id="button-addon2"
                        onClick={filterProducts}
                    >
                        Button
                    </Button>
                </InputGroup>

                <ProductsCard/>

            </div>
        </div>
    );
};

export default Home;