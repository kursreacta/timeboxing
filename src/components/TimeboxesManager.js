import React from "react";

import TimeboxCreator from "./TimeboxCreator";
import TimeboxesAPI from "../api/FetchTimeboxesApi";
import AuthenticationContext from "../contexts/AuthenticationContext";
import { TimeboxesList } from "./TimeboxesList";
import Timebox from "./Timebox";
import ReadOnlyTimebox from "./ReadOnlyTimebox";

class TimeboxesManager extends React.Component {
    state = {
        "timeboxes": [],
        loading: true,
        error: null
    }

    componentDidMount() {
        TimeboxesAPI.getAllTimeboxes(this.context.accessToken).then(
            (timeboxes) => this.setState({ timeboxes })
        ).catch(
            (error) => this.setState({ error })
        ).finally(
            () => this.setState({loading: false})
        )
    }
    
    addTimebox = (timebox) => {
        TimeboxesAPI.addTimebox(timebox, this.context.accessToken).then(
            (addedTimebox) => this.setState(prevState => {
                const timeboxes = [...prevState.timeboxes, addedTimebox];
                return { timeboxes };
            })
        )
    }
    removeTimebox = (indexToRemove) => {
        TimeboxesAPI.removeTimebox(this.state.timeboxes[indexToRemove], this.context.accessToken)
            .then(
                () => this.setState(prevState => {
                    const timeboxes = prevState.timeboxes.filter((timebox, index) => index !== indexToRemove);
                    return { timeboxes };
                })
            )
        
    }
    updateTimebox = (indexToUpdate, timeboxToUpdate) => {
        TimeboxesAPI.replaceTimebox(timeboxToUpdate, this.context.accessToken)
            .then(
                (updatedTimebox) => this.setState(prevState => {
                    const timeboxes = prevState.timeboxes.map((timebox, index) =>
                        index === indexToUpdate ? updatedTimebox : timebox
                    )
                    return { timeboxes };
                })
            )
        
    }

    handleCreate = (createdTimebox) => {
        try {
            this.addTimebox(createdTimebox);
        } catch (error) {
            console.log("Jest błąd przy tworzeniu timeboxa:", error)
        }
        
    }
    renderTimebox(timebox, index) {
        return <Timebox 
            key={timebox.id} 
            title={timebox.title} 
            totalTimeInMinutes={timebox.totalTimeInMinutes} 
            onDelete={() => this.removeTimebox(index)} 
            onEdit={() => this.updateTimebox(index, { ...timebox, title: "Updated timebox" })} 
        />
    }
    renderReadOnlyTimebox(timebox, index) {
        return <ReadOnlyTimebox
            key={timebox.id} 
            title={timebox.title} 
            totalTimeInMinutes={timebox.totalTimeInMinutes}
        />
    }
    render() {
        return (
            <>
                <TimeboxCreator onCreate={this.handleCreate} />
                { this.state.loading ? "Timeboxy się ładują..." : null}
                { this.state.error ? "Nie udało się załadować :(" : null }
                <TimeboxesList 
                    timeboxes={this.state.timeboxes} 
                    renderTimebox={this.renderTimebox}
                />
            </>
        )
    }
}
TimeboxesManager.contextType = AuthenticationContext;

export default TimeboxesManager;
