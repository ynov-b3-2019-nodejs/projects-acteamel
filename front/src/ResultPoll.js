import React from 'react';
import socketIOClient from "socket.io-client";
import { Card, ListGroup, Form, Container, Row, Col, ProgressBar } from 'react-bootstrap';

export default class ResultPoll extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            poll: null,
            socket: {
                endpoint: 'http://localhost:8000',
                data: null
            }
        }

        this.loadPoll = this.loadPoll.bind(this);
    }

    componentDidMount() {
        this.loadPoll();
    }

    async loadPoll() {
        const res = await fetch(`http://localhost/v1/polls/${this.props.match.params.id}`, {
            method: 'GET'
        });
        const json = await res.json();

        this.setState({ poll: json.poll }, () => this.loadSocket());
    }

    loadSocket() {
        const socket = socketIOClient(this.state.socket.endpoint);
        socket.emit('will-refresh-voters', { pollId: this.state.poll._id });
        socket.on(`refresh-voters-${this.state.poll._id}`, data => this.setState({
            socket: { data }
        }));
    }

    render() {
        const { poll, socket } = this.state;
        const { data } = socket;

        if (poll != null) {
            let htmlChoices = <div></div>;

            if (data != null) {
                const totalVoteCount = data.choices.reduce((previousValue, currentChoice) => (previousValue + currentChoice.count), 0);

                htmlChoices = data.choices.map((choice, i) => {
                    const percent = Math.round(choice.count * 100 / totalVoteCount);

                    return (
                        <ListGroup.Item key={i}>
                            <Row>
                                <Col sm="10">{choice.name}</Col>
                            </Row>
                            <ProgressBar variant="info" label={`${percent}%`} now={percent} />
                        </ListGroup.Item>
                    )
                });
            }

            return (
                <Container>
                    <Card>
                        <Card.Header>{poll.title}</Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <Form.Group>
                                    {htmlChoices}
                                </Form.Group>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Container>
            );
        } else {
            return (
                <div>Chargement...</div>
            );
        }
    }
}