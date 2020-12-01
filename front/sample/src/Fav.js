import React, { useState, useEffect } from 'react';
import {getCookie, deleteCookie, upperCaseFirst} from './util';
import {Accordion, Card, Container, Col, Spinner, CardDeck, Alert, Navbar, Form, FormControl, Button, Nav} from 'react-bootstrap'
import axios from 'axios'

export const Fav = () => {
    const [cart, setCart] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get("http://localhost:4003/fav/" + getCookie("_id")).then(res => {
            setCart(res.data)
            setIsLoading(false)
            console.log(res.data)
        }).catch(err => {
            console.log(err)
            setIsLoading(false)
        })

     }, [isLoading]);

    return (
        <Container style={{marginTop: "3%"}}>
            <h3 className="pb-3">Favoris</h3>
            {!isLoading && <><Accordion>
                {cart.map((item, i) => <Item key={i} data={{item, i, setIsLoading}}/>)}
            </Accordion>
            </>
            }
            {isLoading && <div className="text-center"><Spinner as="span" animation="border" size="sm" variant="primary" role="status" aria-hidden="true" style={{width: "5em", height: "5em"}} /></div>}
        </Container>
    )
}

const Item = (props) => {
    const [disk, setDisk] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        axios.get("http://localhost:4001/disk/" + props.data.item.idDisk).then(res => {
            setDisk(res.data[0])
            setIsLoading(false)
        }).catch(err => {
            console.log(err)
            setIsLoading(true)
        })
     }, []);

     return (
         <>
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey={`${props.data.i}`}>
                        {!isLoading ? disk.nom : <Spinner as="span" animation="border" size="sm" variant="primary" role="status" aria-hidden="true" />}
                    </Accordion.Toggle>
                    <Button variant="danger" style={{float: "right"}} onClick={() => deleteItem(props.data.item, props.data.setIsLoading)}>Supprimer</Button>
                </Card.Header>
                <Accordion.Collapse eventKey={`${props.data.i}`}>
                <Card.Body>
                    {!isLoading ? (<><p><b>Nom:</b>  {disk.nom}</p>
                    <p><b>Description:</b>  {disk.description}</p>
                    <p><b>Prix:</b>  <span className="prix">{disk.prix} €</span></p></>) : <Spinner as="span" animation="border" size="sm" variant="primary" role="status" aria-hidden="true" />}
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            
        </>
     )
}

const deleteItem = (panier, setIsLoading) => {
    console.log(panier)
    axios.get("http://localhost:4002/panier/delete/" + panier._id).then(res => {
        setIsLoading(true)
        console.log(res.data)
    }).catch(err => {
        console.log(err)
    })
}