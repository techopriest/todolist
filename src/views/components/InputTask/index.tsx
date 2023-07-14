import React, { useCallback, useState } from "react";

import styles from './index.module.scss';

interface InputTaskProps {
    id: string;
    title: string;
    onDone: (title: string) => void;
    onEdited: (id: string, value: string) => void;
    onRemoved: (id: string) => void;
}

export const InputTask: React.FC<InputTaskProps> = ({
    id,
    title,
    onDone,
    onEdited,
    onRemoved
}) => {

    const [checked, setChecked] = useState(false);

    return (
        <div className={styles.inputTask}>
            <label className={styles.inputTaskLabel}>
                <input
                    type="checkbox"
                    checked={checked}
                    className={styles.inputTaskChechbox}
                    onChange={(evt) => {
                        setChecked(evt.target.checked);

                        if (evt.target.checked) {
                            onDone(id);
                        }
                    }}
                />
                <h3 className={styles.inputTaskTitle}></h3>
            </label>
            <button
                aria-label="Edit"
                className={styles.inputTaskEdit}
                onClick={() => {

                }}
            />
            <button
                aria-label="Remove"
                className={styles.inputTaskRemove}
                onClick={() => {
                    if(confirm('Are you sure?')) {
                        onRemoved(id);
                    }
                }}
            />
        </div>
    )
}