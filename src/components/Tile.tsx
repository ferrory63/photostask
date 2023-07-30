import { FC } from 'react'

type Props = {
    albumId: number
    id: number
    title: string
    url: string
    thumbnailUrl: string
    onClick: () => void
}

export const Tile: FC<Props> = ({ thumbnailUrl, title, onClick }) => {
    return (
        <div className="Tile" onClick={onClick}>
            <p className="Tile__title">{title}</p>
            <img className="Tile__image" src={thumbnailUrl} alt={title} />
        </div>
    )
}
