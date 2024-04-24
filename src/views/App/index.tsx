import React from "react";

import { useToDoStore } from "../../data/stores/useToDoStore";
import { InputPlus } from "../components/InputPlus";
import { InputTask } from "../components/InputTask";

import styles from './index.module.scss';

export const App: React.FC = () => {
    const [
        tasks,
        createTask,
        updateTask,
        removeTask,
        closeTask,
    ] = useToDoStore(state => [
        state.tasks,
        state.createTask,
        state.updateTask,
        state.removeTask,
        state.closeTask
    ]);



    return (
        <article className={styles.article}>
            <h1 className={styles.articleTitle}>Task active now: {(tasks.filter(task => task.onDoneMark === false )).length}</h1>
            <section className={styles.articleSelection}>
                <InputPlus
                    onAdd = {(title) => {
                        if (title){
                            createTask(title)
                        }
                    }} 
                />
            </section>
            <section className={styles.articleSelection}>
                {!tasks.length && (
                    <p className={styles.articleText}>There is no one task.</p>
                )}
                {tasks.map((task) => (
                    <InputTask
                        key = {task.id}
                        id = {task.id}
                        title ={ task.title}
                        dateTime = {task.createdAt}
                        onDoneMark = {task.onDoneMark}
                        onDone = {closeTask}
                        onEdited = {updateTask}
                        onRemoved = {removeTask}
                    />
                ))}    
            </section>
            <section className={styles.articleSelection}></section>
        </article>
    );
}