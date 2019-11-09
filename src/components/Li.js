import React from 'react';

const Li = (props) => {
    const { children } = props
    console.log(props)
    return (
        <li>{children}</li>
    )
}

export default Li