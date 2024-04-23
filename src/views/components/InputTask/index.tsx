import React, { useEffect, useRef, useState } from "react";

import styles from './index.module.scss';
// СДЕЛАТЬ ДАТУ И ВРЕМЯ У ЗАДАЧИ
interface InputTaskProps {
    id: string;
    title: string;
    dataTime: string;
    onDoneMark: boolean;

    onDone: (id: string, onDoneMark: boolean) => void;
    onEdited: (id: string, value: string) => void;
    onRemoved: (id: string) => void;
}

export const InputTask: React.FC<InputTaskProps> = ({
    id,
    title,
    dataTime,
    onDoneMark,
    onDone,
    onEdited,
    onRemoved
}) => {

    const [isEditMode, setIsEditMode] = useState(false);
    const [value, setValue] = useState(title);
    const editTitelInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(isEditMode) {
            editTitelInputRef?.current?.focus();
        }
    }, [isEditMode]);

    return (
        <div className={styles.inputTask}>
            <label className={onDoneMark ? styles.inputTaskLabelDone : styles.inputTaskLabel}>
                <input
                    type="checkbox"
                    disabled = {isEditMode || onDoneMark}
                    checked={onDoneMark}
                    className={styles.inputTaskCheckbox}
                    name={id}
                    onChange={(evt) => {
                        onDone(id, evt.target.checked);
                    }}
                />
                { isEditMode ? ( //вход в режим редактирования
                    <input
                        value={value}
                        ref = {editTitelInputRef}
                        onChange={(evt) => {
                            setValue(evt.target.value)
                        }}
                        onKeyDown={ (evt) => {
                            if(evt.key === 'Enter') {
                                onEdited(id, value);
                                setIsEditMode(false); 
                            }
                        }}
                        className={styles.inputTaskEditTitle}
                    />
                ) : (
                <h3 className={styles.inputTaskTitle}>{title}</h3>
                )}
                </label>
                { isEditMode ? ( // сохранение отредактированной задачи
                    <button
                    aria-label="Save"
                    className={styles.inputTaskSave}
                    onClick={() => {
                        onEdited(id, value);
                        setIsEditMode(false);
                    }}
                />
                ) : (
            <button
                disabled = {onDoneMark}
                aria-label="Edit"
                className={styles.inputTaskEdit}
                onClick={() => {
                    setIsEditMode(true);
                }}
            />
            )}
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