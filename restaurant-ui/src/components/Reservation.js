import React from 'react';
import FormGroup from './FormGroup';

/**
 * Reservation
 * Component for Reservation modal
 * Props:
 * - onSubmit (Function (Parameter: -, Return: void)): When user submit the reservation form
 */
const Reservation = (props) => {
    return (
        <div className="modal fade" id="reservationModal" tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h3>Reservation Form</h3>
                        <form className="form form-reservation">
                            <FormGroup
                                label="Name"
                                type="text"
                                name="name"
                            />
                            <FormGroup
                                label="Email"
                                type="email"
                                name="email"
                            />
                            <FormGroup
                                label="Phone No"
                                type="text"
                                name="phone"
                            />
                            <FormGroup
                                label="No of Guest"
                                type="number"
                                name="total_guest"
                            />
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={props.onSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reservation;