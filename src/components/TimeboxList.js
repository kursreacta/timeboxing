import React from "react";

import Timebox from "./Timebox";
import TimeboxCreator from "./TimeboxCreator";

class TimeboxList extends React.Component {
    state = {
        timeboxes: [
            { id: "a", title: "Uczę się o githubie", totalTimeInMinutes: 25 },
            { id: "b", title: "Uczę się sandbox.io", totalTimeInMinutes: 15 },
            { id: "c", title: "Uczę się integrować biblioteki", totalTimeInMinutes: 5 },
        ]
    }

    addTimebox = (timebox) => {
        this.setState(prevState => {
            const timeboxes = [timebox, ...prevState.timeboxes];
            return { timeboxes };
        })
    }
    removeTimebox = (indexToRemove) => {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.filter((timebox, index) => index !== indexToRemove);
            return { timeboxes };
        })
    }
    updateTimebox = (indexToUpdate, updatedTimebox) => {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.map((timebox, index) =>
                index === indexToUpdate ? updatedTimebox : timebox
            )
            return { timeboxes };
        })
    }

    handleCreate = (createdTimebox) => {
        this.addTimebox(createdTimebox);
    }
    render() {
        return (
            <>
                <TimeboxCreator onCreate={this.handleCreate} />
                {this.state.timeboxes.map((timebox, index) => (
                    <Timebox 
                        key={timebox.id} 
                        title={timebox.title} 
                        totalTimeInMinutes={timebox.totalTimeInMinutes}
                        onDelete={() => this.removeTimebox(index)}
                        onEdit={() => this.updateTimebox(index, {...timebox, title: "Updated timebox"})}
                    />
                ))}
            </>
        )
    }
}

export default TimeboxList;
