import { FC, useCallback } from 'react'

interface IProps {
    title: string
    onClick: () => void
    disabled?: boolean
}

export const Button: FC<IProps> = ({ title, onClick, disabled }) => {
    const handleClick = useCallback(() => {
        if (!disabled && onClick) {
            onClick()
        }
    }, [onClick, disabled])

    return (
        <div
            className={`Button${disabled ? ' Button--disabled' : ''}`}
            onClick={handleClick}
        >
            <p style={{ userSelect: 'none' }}>{title}</p>
        </div>
    )
}
