import React from 'react'
import './App.css'

import { Tile } from './components/Tile'
import { Button } from './components/Button'
import { getFetchPhotosUrl, sendStats } from './utils'
import { InputName } from './components/InputName'
import throttle from 'lodash.throttle'

import { useEffect, useState } from 'react'
import { Photo } from './types'

let activeCalls = new Map<number, AbortController>()

function App() {
    function getPhotos(pgNum: number): Promise<Photo[]> {
        const controller = new AbortController()

        if (activeCalls.size) {
            activeCalls.forEach((i) => {
                i.abort()
            })
        }

        activeCalls.set(pgNum, controller)

        return fetch(getFetchPhotosUrl(pgNum), { signal: controller.signal })
            .then((response) => response.json())
            .then((data) => {
                activeCalls.delete(pgNum)
                return data
            })
            .catch((e) => {})
    }

    const [tiles, setTiles] = useState<Photo[]>()
    const [page, setPage] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [editValue, setEditValue] = useState('')
    const [editId, setEditId] = useState(-1)

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true)
            setTiles(await getPhotos(page))
            setIsLoading(false)
            // localStorage.setItem(page.toString(), JSON.stringify(tiles))
        }

        // Тестовый вариант кеширования страниц, для тестов убрать комменты

        // if (localStorage.getItem(page.toString())) {
        //     setTiles(JSON.parse(localStorage.getItem(page.toString())!))
        // } else {
        //     fetchData()
        // }
        fetchData()
    }, [page])

    return (
        <div className="App">
            <div className="wrap">
                {isEditing && (
                    <div>
                        <InputName
                            value={editValue}
                            onChange={(i: string) => {
                                setEditValue(i)
                                throttle((i) => sendStats(editValue), 300)
                            }}
                            onSubmit={() => {
                                setTiles((prev) =>
                                    prev?.map((i) =>
                                        i.id === editId
                                            ? { ...i, title: editValue }
                                            : { ...i }
                                    )
                                )
                                setIsEditing(false)
                                setEditValue('')
                                setEditId(-1)
                            }}
                        />
                    </div>
                )}
                <div className="Buttons">
                    <Button
                        disabled={page === 0}
                        title="Back"
                        onClick={() => {
                            setPage(page - 1)
                        }}
                    />
                    <Button
                        disabled={page === 4}
                        title="Forward"
                        onClick={() => {
                            setPage(page + 1)
                        }}
                    />
                </div>
                <div className="Tiles">
                    {isLoading ? (
                        <p>Loading ...</p>
                    ) : (
                        tiles?.map((i) => {
                            return (
                                <Tile
                                    onClick={() => {
                                        setIsEditing(true)
                                        setEditValue(i.title)
                                        setEditId(i.id)
                                    }}
                                    key={i.id}
                                    {...i}
                                />
                            )
                        })
                    )}
                </div>
            </div>
        </div>
    )
}

export default App
