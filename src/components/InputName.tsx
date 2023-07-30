import { FC, FormEvent as ReactFormEvent } from 'react'

export interface IProps {
    value: string
    onSubmit: () => void
    onChange: (i: string) => void
}

export const InputName: FC<IProps> = ({ value, onSubmit, onChange }) => {
    const handleSubmit = (event: ReactFormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onSubmit()
    }

    return (
        <div className="InputName">
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Next title: </label>
                <input
                    type="text"
                    id="title"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
