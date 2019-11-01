import React from "react";

class TimeboxEditor extends React.Component {
    constructor(props) {
        super(props);
        this.titleInput = React.createRef();
        this.totalTimeInMinutesInput = React.createRef();
    }
    handleSubmit = (event) => {
        event.preventDefault(); 
        this.props.onUpdate({ 
            title: this.titleInput.current.value, 
            totalTimeInMinutes: this.totalTimeInMinutesInput.current.value
        });
        this.resetToInitialValues();    
    }
    handleCancel = () => {
        this.resetToInitialValues();
        this.props.onCancel();
    }
    resetToInitialValues() {
        this.titleInput.current.value = this.props.initialTitle;
        this.totalTimeInMinutesInput.current.value = this.props.initialTotalTimeInMinutes;
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="TimeboxEditor">
                <label>
                    Co robisz?
                    <input 
                        ref={this.titleInput}
                        defaultValue={this.props.initialTitle}
                        type="text" 
                    />
                </label><br/>
                <label>
                    Ile minut?
                    <input 
                        ref={this.totalTimeInMinutesInput}
                        defaultValue={this.props.initialTotalTimeInMinutes}
                        type="number" 
                        step="0.01"
                    />
                </label><br />
                <a onClick={this.handleCancel}>Anuluj</a>
                <button 
                >Zapisz zmiany</button>
            </form>
        )
    }
}

export default TimeboxEditor;