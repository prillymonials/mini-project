import React from 'react';

/**
 * Form Group
 * Component for Form Group in Form
 * Props:
 * - label (String): The title of the field
 * - name (String): The key value of the field
 * - type (InputElement type): Type of input
 */
const FormGroup = (props) => {
    return (
        <div className="form-group row">
            <label className="col-md-2 col-form-label">{props.label}</label>
            <div className="col-sm-10">
                <input 
                    type={props.type}
                    className="form-control"
                    placeholder={props.label}
                    name={props.name}
                />
            </div>
        </div>
    )
};

export default FormGroup;