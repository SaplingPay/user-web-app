import { useState, useEffect, useRef } from "react"
import { Blurhash } from "react-blurhash"

interface BlurhashData {
    width: number
    height: number
    hash: string
}

interface BlurhashImageProps {
    src: string
    height?: string
    width?: string
    style: any
    blurhash: BlurhashData
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export const BlurhashImage = (props: BlurhashImageProps) => {
    const [loading, setLoading] = useState(true)

    return (
        <div
            style={{
                height: props.height,
                width: props.width,
                position: 'relative',
                overflow: 'hidden',
                ...props.style,
            }}
            onClick={props.onClick}
        >
            {loading && props?.blurhash?.hash && (
                <Blurhash
                    hash={props.blurhash.hash}
                    width={props.blurhash.width}
                    height={props.blurhash.height}
                    resolutionX={props.blurhash.width}
                    resolutionY={props.blurhash.height}
                    punch={1}
                    style={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover',
                    }}
                />
            )}
            <img
                src={props.src}
                style={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                    display: loading ? 'none' : 'block',
                }}
                onLoad={() => setLoading(false)}
            />
        </div>
    )
}