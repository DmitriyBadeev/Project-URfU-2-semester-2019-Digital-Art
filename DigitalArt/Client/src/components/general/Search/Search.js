import React from 'react';

import './search.sass'

export default class Search extends React.Component {

    render() {
        return <form onSubmit={this.props.onSearch}>
            <input type="search" placeholder="Поиск" className="search" name="searchInput"/>
        </form>
    }
}