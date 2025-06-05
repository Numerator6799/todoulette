import React from 'react'

const ColorfulHeader = ({ text, colors }) => {
    return <h1>
        {text.split('').map((c, i) => {
            let colorIndex = i;
            if (i >= colors.length)
                colorIndex = colorIndex - colors.length;
            return <span className="title-letter" key={i} style={{ color: colors[colorIndex] }}>{c}</span>
        })}

    </h1>
}

export default ColorfulHeader;