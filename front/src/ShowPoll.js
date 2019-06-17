import React from 'react';
import { Card, ListGroup, Button, Form, Container } from 'react-bootstrap';

export default class ShowPoll extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            poll: null
        }

        this.loadPoll = this.loadPoll.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.loadPoll();
    }

    async loadPoll() {
        const res = await fetch(`http://localhost/v1/polls/${this.props.match.params.id}`, {
            method: 'GET'
        });
        const json = await res.json();

        this.setState({ poll: json.poll });
    }

    async handleSubmit(e) {
        e.preventDefault();

        const data = new FormData(e.target);
        const { poll } = this.state;

        try {
            if (poll.options.multiple) {
                for (const key of data.keys()) {
                    if (key.startsWith('choice')) {
                        const res = await fetch(`http://localhost/v1/polls/${poll._id}/choices/${data.get(key)}/addVoter`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                        const json = await res.json();
                        
                        if (json.error) {
                            alert(json.error);
                            break;
                        }
                    }
                }
            } else {
                const res = await fetch(`http://localhost/v1/polls/${poll._id}/choices/${data.get('choice')}/addVoter`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const json = await res.json();

                if (json.error) {
                    alert(json.error);
                }
            }

            this.props.history.push(`/${poll._id}/results`);
        } catch (err) {
            alert(err.message);
        }
    }

    render() {
        const { poll } = this.state;

        if (poll != null) {
            let htmlChoices;
            let htmlVoters = <div></div>;

            if (poll.options.multiple) {
                htmlChoices = poll.choices.map((choice, i) => (
                    <div key={choice._id}>
                        <ListGroup.Item><Form.Check custom type="checkbox" id={choice._id} name={`choice${i}`} label={choice.name} value={choice._id} /></ListGroup.Item>
                    </div>
                ));
            } else {
                htmlChoices = poll.choices.map(choice => (
                    <div key={choice._id}>
                        <ListGroup.Item><Form.Check custom type="radio" id={choice._id} name="choice" label={choice.name} value={choice._id} /></ListGroup.Item>
                    </div>
                ));
            }

            return (
                <Container>
                    <Card>
                        <Card.Header>{poll.title}</Card.Header>
                        <Form onSubmit={this.handleSubmit}>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <Form.Group>
                                        {htmlChoices}
                                    </Form.Group>
                                </ListGroup>
                            </Card.Body>
                            <Card.Footer>
                                <Button type="submit" variant="info">Voter</Button>
                            </Card.Footer>
                        </Form>
                    </Card>
                    {htmlVoters}
                </Container>
            );
        } else {
            return (
                <div>Chargement...</div>
            );
        }
    }
}