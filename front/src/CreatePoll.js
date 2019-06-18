import React from 'react';
import { Button, Form, FormControl, Container } from 'react-bootstrap';

export default class CreatePoll extends React.Component {

    constructor() {
        super();
        this.state = {
            choices: ["", ""]
        };

        this.addChoice = this.addChoice.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Ajoute un choix
    addChoice(e, i) {
        if (this.state.choices.length -1 === i) {
            this.setState({
                choices: [...this.state.choices, ""]
            });
        }
    }

    // Mets à jour les valeurs des choix
    handleChange(e, i) {
        this.state.choices[i] = e.target.value;
        this.setState({ choices: this.state.choices });
    }

    // Envoi le formulaire de création de vote
    async handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);

        const choices = [];
        for (const key of data.keys()) {
            if (key.startsWith('choice')) {
                const value = data.get(key);

                if (value !== '') {
                    choices.push({
                        name: data.get(key)
                    })
                }
            }
        }

        try {
            const res = await fetch('http://localhost/v1/polls', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: data.get('title'),
                    options: {
                        multiple: data.get('multiple') != null,
                        ipChecking: data.get('ipChecking') != null
                    },
                    choices
                })
            });
            const json = await res.json();

            this.props.history.push(`/${json.poll._id}`);
        } catch (err) {
            alert(err.message);
        }
    }

    render() {
        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label className="text-info">Titre de votre sondage</Form.Label>
                        <Form.Control type="text" name="title" placeholder="Entrez le titre de votre sondage" />
                    </Form.Group>
                    <hr></hr>
                    <Form.Label className="text-info">Listez vos choix.</Form.Label>
                    {this.state.choices.map((choice, i) => (
                        <FormControl className="my-2" key={i} name={`choice${i}`} value={choice} placeholder="Ajouter vos choix !" onChange={(e) => this.handleChange(e, i)} onKeyUp={(e) => this.addChoice(e, i)} />
                    ))}
                    <Form.Check custom type="checkbox" id="multiple" name="multiple" className="text-info" label="Sondage à choix multiples" />
                    <Form.Check custom type="checkbox" id="ipChecking" name="ipChecking" className="text-info" label="Vérification par adresses IP" />
                    <Button type="submit" variant="info">Créer le sondage</Button>
                </Form>
            </Container>
        );
    }
}