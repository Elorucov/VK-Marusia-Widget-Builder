import React from 'react';
import {
  FormStatus
} from '@vkontakte/vkui';
import Card from './Card.js';
import Counter from './Counter.js';
import Grid from './Grid.js';
import Internal from './Internal.js';
import Informer from './Informer.js';
import Placeholder from './Placeholder.js';
import Scroll from './Scroll.js';
import Table from './Table.js';
import './widget.css';

const UniversalWidget = ({ widget }) => {
	console.log(widget);

	const getWidgetByType = (widget) => {
		switch (widget.item.type) {
			case "universal_card":
				return (<Card mini_apps={widget.mini_apps} games={widget.games} groups={widget.groups} profiles={widget.profiles} item={widget.item}/>);
			case "universal_counter":
				return (<Counter mini_apps={widget.mini_apps} games={widget.games} groups={widget.groups} profiles={widget.profiles} item={widget.item}/>);
			case "universal_grid":
				return (<Grid mini_apps={widget.mini_apps} games={widget.games} groups={widget.groups} profiles={widget.profiles} item={widget.item}/>);
			case "universal_internal":
				return (<Internal mini_apps={widget.mini_apps} games={widget.games} groups={widget.groups} profiles={widget.profiles} item={widget.item}/>);
			case "universal_informer":
				return (<Informer mini_apps={widget.mini_apps} games={widget.games} groups={widget.groups} profiles={widget.profiles} item={widget.item}/>);
			case "universal_placeholder":
				return (<Placeholder mini_apps={widget.mini_apps} games={widget.games} groups={widget.groups} profiles={widget.profiles} item={widget.item}/>);
			case "universal_scroll":
				return (<Scroll mini_apps={widget.mini_apps} games={widget.games} groups={widget.groups} profiles={widget.profiles} item={widget.item}/>);
			case "universal_table":
				return (<Table mini_apps={widget.mini_apps} games={widget.games} groups={widget.groups} profiles={widget.profiles} item={widget.item}/>);
			default:
				return (<FormStatus mode="error" header="Данный тип виджета не поддерживается!">{widget.item.type}</FormStatus>);
		}
	};

	return (widget && widget.item ? getWidgetByType(widget) : null);
};

export default UniversalWidget;