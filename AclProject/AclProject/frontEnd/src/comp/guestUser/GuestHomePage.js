import React from 'react';
import Services from '../Services';
import Header from './HeaderGuest';
import { Container, Row , Col} from 'react-bootstrap';

const GuestHomePage = () => {
    return (
        <div >
             <Header />
             <Row>
                <Col>
                    <Container>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <span style ={{fontWeight: '900' , fontSize: 90 , color: 'white', fontFamily: 'ui-sans-serif'}}>The Sky is Waiting for You</span>
                        <br/>
                        <span style ={{fontSize: 25 , color: 'white', fontFamily: 'ui-sans-serif' }}>
                            With Cheap Flights, you can easily book any ticket you need to travel safely thanks to our detailed system of searching and booking airline tickets.
                        </span>

                    </Container>
                </Col>
                <Col>
                    <Container>
                    </Container>

                </Col>
            </Row>
            <Services />
        </div>
    )
}

export default GuestHomePage
