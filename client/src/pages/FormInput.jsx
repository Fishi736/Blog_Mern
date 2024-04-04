


const FormInput = ({ inputType, placeholder, type, value, onChange }) => {

    if (inputType === "textarea") {
        return (
            <div>
                <textarea
                    className="form-control textArea"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            </div>
        );
    } else {
        return (
            <div>
                <input
                    className="form-control "
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            </div>
        );
    }
};


export default FormInput;
