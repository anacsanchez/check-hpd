import React from 'react';
import PropTypes from 'prop-types';

const ItemList = ({ children }) => {
    return (
        <div css={itemListStyles}>
            {children.map(child => <div key={child.props.key} css={itemStyles}>{child}</div>)}
        </div>
    );
};

ItemList.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element)
};

const itemListStyles = {
    display: 'grid',
    gridTemplateColumns: 'minmax(100px, 800px)',
    // columnGap: '24px',
    rowGap: '16px'
};

const itemStyles = {
    margin: '0px',
    borderBottom: '1px solid gray'
};

export default ItemList;