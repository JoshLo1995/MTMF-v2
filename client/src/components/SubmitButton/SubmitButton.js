import React from 'react';
import Button from 'react-bootstrap/Button';
import './SubmitButton.css';

export default class SubmitButton extends React.Component {

    render() {
        return(
            <div className = "container">
                <div className = "row d-flex justify-content center">
                    <div className = "col-12 d-flex justify-content center"
                        id = "submitColumn">
                        <Button
                            variant="primary"
                            id = "submitButton"
                            >Submit
                        </Button>   
                    </div>
                </div>
            </div>

        );
    }
}