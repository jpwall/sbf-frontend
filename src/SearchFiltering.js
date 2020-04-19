import React, { Component } from 'react';

class SearchFiltering extends Component {
    state = {
        initialItems: [],
        items: []
    }

    filterList = (event) => {
	let items = this.state.initialItems;
	items = items.filter((item) => {
            return item.subject_name.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
	});
	this.setState({items: items});
    }

    componentWillMount = () => {
	this.setState({
            initialItems: this.props.content,
            items: this.props.content,
	    keys: this.props.ids
	})
    }

    render() {
	return (
		<div>
		<form>
                <input type="text" placeholder="Search" onChange={this.filterList}/>
		</form>
		<div>
		{
                    this.state.items.map(function(item) {
			return <a href={'/course/' + item.cid} ><div key={item.cid}>{item.subject_name}</div></a>
                    })
		}
		<a href="/newCourse/">Add Missing Course</a>
            </div>
		</div>
	);
    }
}

export default SearchFiltering;
