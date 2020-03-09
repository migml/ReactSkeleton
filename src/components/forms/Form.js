import * as React from 'react';
import PropTypes from 'prop-types';


//#############################################################################
// Formulario (engloba todos los componentes de formulario)
//#############################################################################



const inputTypes = ["textarea", "text", "hidden", "checkbox", 'email', 'date', 'file']

export class Form extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handler = this.handler.bind(this);
		this.state = { isValid: true, validationMessage: "BBB" };
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.disabled === true && this.props.disabled !== nextProps.disabled) {
			this.setState({ isValid: true, validationMessage: "" });
		}
	}

	handler() {
		if (this.props.onChange !== undefined) {
			this.props.onChange((this.props.formName || ""), this.state.isValid, this.state.validationMessage);
		}
	}

	handleSubmit(event) {
		//console.log(event.target.files);
		/* Captura los datos del submit y los convierte en un objecto json que envia a la property onSubmit */
		event.preventDefault();
		let values = {};
		//inicializar validationStatus que se devolverá
		let val = { status: true, message: "" };
		// Recorrer toda la info recibida a través de los id
		Object.keys(event.target).forEach(key => {
			// Comprobar que el tipo del elemento recibido está en los tipos aceptados
			if (inputTypes.filter(element => element === event.target[key].type).length > 0) {
				//Comprobar que el elemento tiene el id/nombre obligatorio
				if (event.target[key].name.length > 0) {
					//Comprobar si no es un input de error
					if (event.target[key].name.indexOf('_validationStatus_') < 0 || true) {
						// Caso especial para los checkbox
						if (event.target[key].type === "checkbox") {
							//Si el checkbox no tiene valor, devolver el id y el estado checked o no
							if (event.target[key].value === '') {
								values[event.target[key].name] = event.target[key].checked ? 1 : 0;
							} else {
								//Si el checkbox tiene valor, devolver la concatenación de valores multiples (multiselección)
								if (event.target[key].checked) {
									values[event.target[key].name] = (values[event.target[key].name] || '') + ((values[event.target[key].name] || '') === '' ? '' : ';') + event.target[key].value;
								} else {
									if (values[event.target[key].name] === undefined) { values[event.target[key].name] = ""; }//Forzar que se cree el valor multiseleccion aunque no haya selección
								}
							}
						} else {
							/*if(event.target[key].type === "file"){
								alues[event.target[key].name]
								console.log(event.target.files);
							}else{*/
							values[event.target[key].name] = event.target[key].value;
							//}
						}
					} else {
						//Si es input de error y tiene error
						/*var errorArray = event.target[key].value.split(';');
						if (errorArray[1] === 0) {
							val = { status: false, message: errorArray[2] }
						}*/
					}
				}
			}
		});

		// Comprobar el valor con la función de evaluación pasada como propiedad si existe y no se ha encontrado otro error antes
		if (this.props.validationFunction !== undefined && val.status) {
			//console.log(this.props.validationFunction);
			let tempVal = this.props.validationFunction(values);
			val = (Object.keys(tempVal).length === 2 && typeof (tempVal.status) === "boolean" && typeof (tempVal.message) === "string") ? tempVal : { status: false, message: "Form: Unexpected result on validation function." };
		}

		let jsonObject = {
			name: (this.props.formName || ""),
			validation: val,
			values: values
		};

		this.setState({ isValid: val.status, validationMessage: val.message }, () => {
			this.props.onSubmit(jsonObject);
		});
	}

	render() {

		let warningAlert = <div className="alert alert-warning alert-styled-left bottom-spacing-10">
			<span className="text-semibold">Atención!</span> {this.state.validationMessage}
		</div>;
		let validationPlacement = (this.props.validationPlacement || 'top');

		return <form name={this.props.formName} onSubmit={this.handleSubmit} onTouchEnd={this.handler} onChange={this.handler} encType="multipart/form-data">
			{(!this.state.isValid && (!this.props.disabled) && validationPlacement === 'top') ? warningAlert : null}
			{this.props.children}
			{(!this.state.isValid && (!this.props.disabled) && validationPlacement === 'bottom') ? warningAlert : null}
		</form>;
	}
}

Form.propTypes = {
	disabled: PropTypes.bool,
	formName: PropTypes.string,
	validationFunction: PropTypes.func,
	validationPlacement: PropTypes.string,
	onSubmit: PropTypes.func,
	onChange: PropTypes.func
}
