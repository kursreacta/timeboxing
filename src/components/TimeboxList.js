import React from "react";
import uuid from "uuid";
import Timebox from "./Timebox";
import TimeboxCreator from "./TimeboxCreator";

function wait(ms=1000) {
    return new Promise(
        (resolve) => {
            setTimeout(resolve, ms);
        }
    )
}
const timeboxes = [
    { "id": 1, "title": "Uczę się o promises", "totalTimeInMinutes": 25 },
    { "id": 2, "title": "Poznaję REST API", "totalTimeInMinutes": 10 },
    { "id": 3, "title": "Ćwiczę async/await", "totalTimeInMinutes": 15 },
    { "id": 4, "title": "Uczę się fetch", "totalTimeInMinutes": 5 }
];

const TimeboxesAPI = {
    getAllTimeboxes: async function (){
        await wait(1000);
        return [...timeboxes];
    },
    addTimebox: async function (timeboxToAdd) {
        await wait(1000);
        const addedTimebox = {...timeboxToAdd, id: uuid.v4()};
        timeboxes.push(addedTimebox);
        return addedTimebox;
    }
}

class TimeboxList extends React.Component {
    state = {
        "timeboxes": [],
        loading: true,
        error: null
    }

    componentDidMount() {
        TimeboxesAPI.getAllTimeboxes().then(
            (timeboxes) => this.setState({ timeboxes })
        ).catch(
                (error) => Promise.reject(this.setState({ error }))
        ).then(
            () =>this.setState({loading: false})
        )
    }
    
    addTimebox = (timebox) => {
        TimeboxesAPI.addTimebox(timebox).then(
            (addedTimebox) => this.setState(prevState => {
                const timeboxes = [timebox, ...prevState.timeboxes, addedTimebox];
                return { timeboxes };
            })
        )    
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
        try {
            this.addTimebox(createdTimebox);
        } catch (error) {
            console.log("Jest błąd przy tworzeniu timeboxa:", error)
        }
        
    }
    render() {
        return (
            <>
                <TimeboxCreator onCreate={this.handleCreate} />
                { this.state.loading ? "Timeboxy sie ładujo...": null}
                { this.state.error ? "Ni poszło najlepij": null}
                {
                    this.state.timeboxes.map((timebox, index) => (
                        <Timebox 
                            key={timebox.id} 
                            title={timebox.title} 
                            totalTimeInMinutes={timebox.totalTimeInMinutes}
                            onDelete={() => this.removeTimebox(index)}
                            onEdit={() => this.updateTimebox(index, {...timebox, title: "Updated timebox"})}
                        />
                    ))
                }
            </>
        )
    }
}

export default TimeboxList;
