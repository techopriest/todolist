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
//    id,
//    title,
//    onDone,
//    onEdited,
//    onRemoved
}) => {
    return (
        <div className={styles.inputPlus}>
            <label>
                <input

                />
            </label>
        </div>
    )
}