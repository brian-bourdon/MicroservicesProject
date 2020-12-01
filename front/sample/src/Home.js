import React, { useState, useEffect } from 'react';
import {HashRouter as Router,Switch,Route,Link,useLocation,useHistory} from "react-router-dom"
import {Container, DropdownButton, Card, Spinner, CardDeck, Alert, Navbar, Form, FormControl, Button, Nav, Row, Col} from 'react-bootstrap'
import {getCookie} from './util';
import axios from 'axios'

export const Home = (props) => {
    const [catalogue, setCatalogue] = useState([])
    const [isLoadingCatalogue, setIsLoadingCatalogue] = useState(true)

    useEffect(() => {
        axios.get("http://localhost:4001/catalogue").then(res => {
            setCatalogue(res.data)
            setIsLoadingCatalogue(false)
            console.log(res.data)
        }).catch(err => {
            console.log(err)
            setIsLoadingCatalogue(false)
        })

     }, []);

    return (
        <Container style={{marginTop: "3%"}}>
            <Row>
                <Col lg="12">
                    {isLoadingCatalogue && <div className="text-center"><Spinner as="span" animation="border" size="sm" variant="primary" role="status" aria-hidden="true" style={{width: "5em", height: "5em"}} /></div>}
                    <CardDeck>
                        <Row>
                            {!isLoadingCatalogue && catalogue.map((c, i) => <Col lg="4 pb-4"><CardDisk key={i} data={{c, i}} /></Col>)}
                        </Row>
                    </CardDeck>
                </Col>
            </Row>
        </Container>
        
    )
}

const CardDisk = (props) => {
    return (
        <Card key={props.data.i}>
            <Card.Img variant="top" src="https://openclipart.org/image/400px/svg_to_png/7645/BenBois-Vinyl-records.png"/>
            <Card.Body>
            <Card.Title>{props.data.c.nom}</Card.Title>
            <Card.Text>
                {props.data.c.description}
            </Card.Text>
            </Card.Body>
            <Card.Footer>
                <div className="text-center">
                    <LoadingButton data={props}/>
                </div>
            </Card.Footer>
        </Card>
    )
}

const LoadingButton = (props) => {
    const [isLoadingAddCart, setIsLoadingAddCart] = useState(false)
    const [isLoadingAddFav, setIsLoadingAddFav] = useState(false)
    const [isFav, setIsFav] = useState(true)

    useEffect(() => {
        axios.get("http://localhost:4003/fav/"+getCookie("_id")+"/"+props.data.data.c._id).then(res => {
            if(res.data.length > 0) setIsFav(true)
            else setIsFav(false)
            console.log(res.data)
        }).catch(err => {
            console.log(err)
            setIsFav(false)
        })
     }, [isLoadingAddFav]);

    return (
        <>
            <Button key={Date.now()} onClick={(e) => addToCart(props.data.data.c, setIsLoadingAddCart)}>{!isLoadingAddCart ? "Ajouter au panier" : <Spinner as="span" animation="border" size="sm" variant="light" role="status" aria-hidden="true"  />}</Button>
            <Button variant="success" className="ml-3" disabled={isFav} onClick={(e) => addToFav(props.data.data.c, setIsLoadingAddFav)}>{!isLoadingAddFav ? "Favoris" : <Spinner as="span" animation="border" size="sm" variant="light" role="status" aria-hidden="true"  />}</Button>
        </>
        )
}
const addToFav = (disk, setIsLoadingAddFav) => {
    setIsLoadingAddFav(true)
    axios.post('http://localhost:4003/fav', { idUser: getCookie("_id"), idDisk : disk._id}).then((res) => 
    {
        console.log(res)
        setIsLoadingAddFav(false)
    }).catch(err => {
        console.log(err)
        setIsLoadingAddFav(false)
    })
}

const addToCart = (disk, setIsLoadingAddCart) => {
    setIsLoadingAddCart(true)
    axios.post('http://localhost:4002/panier', { idUser: getCookie("_id"), idDisk : disk._id}).then((res) => 
    {
        console.log(res)
        setIsLoadingAddCart(false)
    }).catch(err => {
        console.log(err)
        setIsLoadingAddCart(false)
    })
}