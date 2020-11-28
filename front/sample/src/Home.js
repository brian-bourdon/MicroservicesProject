import React, { useState, useEffect } from 'react';
import {HashRouter as Router,Switch,Route,Link,useLocation,useHistory} from "react-router-dom"
import {Container, DropdownButton, Card, Spinner, CardDeck, Alert, Navbar, Form, FormControl, Button, Nav} from 'react-bootstrap'
import axios from 'axios'

export const Home = (props) => {
    const [catalogue, setCatalogue] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get("http://localhost:4001/catalogue").then(res => {
            setCatalogue(res.data)
            setIsLoading(false)
            console.log(res.data)
        }).catch(err => {
            console.log(err)
            setIsLoading(false)
        })

     }, []);

    return (
        <Container style={{marginTop: "3%"}}>
            {isLoading && <div className="text-center"><Spinner as="span" animation="border" size="sm" variant="primary" role="status" aria-hidden="true" style={{width: "5em", height: "5em"}} /></div>}
            <CardDeck>
                {!isLoading && catalogue.map(c => <Card>
                <Card.Img variant="top" src="holder.js/100px160" />
                <Card.Body>
                <Card.Title>{c.nom}</Card.Title>
                <Card.Text>
                    {c.description}
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer>
            </Card>)}
            </CardDeck>
        </Container>
    )
}