import React, {DetailedHTMLProps, KeyboardEvent, TextareaHTMLAttributes} from 'react';
import styles from './SuperTextArea.module.css';

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>

type SuperInputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
}

const SuperTextArea: React.FC<SuperInputTextPropsType> = (
    {
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName,

        ...restProps
    }
) => {
    const onChangeCallback = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange
        && onChange(e)

        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        onKeyPress && onKeyPress(e);

        onEnter
        && e.key === 'Enter'
        && onEnter()
    }

    const finalAreaClassName = `${styles.superTextArea} ${error && styles.errorTextArea} ${className}`

    return (
        <>
            <div className={styles.inputContainer}>
                <textarea
                    onChange={onChangeCallback}
                    onKeyPress={onKeyPressCallback}
                    className={finalAreaClassName}

                    {...restProps}
                />
            </div>
        </>
    )
};

export default SuperTextArea;
