var QueryString = {
	parseUrl: function (href) {
		return {
			'path': href.split('#')[0].split('?')[0],
			'query': href.indexOf('?') > -1 ? href.split('?')[1].split('#')[0] : '',
			'hash': href.split('#')[1] || ''
		}
	},

	makeUrl: function (parsed) {
		return parsed.path + (parsed.query.length > 0 ? '?' + parsed.query : '') + (parsed.hash.length > 0 ? '#' + parsed.hash : '');
	},

	getParameter: function (href, parameter) {
		var parsed = this.parseUrl(href),
			splited,
			value = [],
			i;

		for (i = 0, splited = parsed.query.split('&'); i < splited.length; i++) {
			if (splited[i].indexOf(parameter + '=') > -1 || splited[i].indexOf(encodeURIComponent(parameter) + '=') > -1) {
				value.push(splited[i].split('=')[1]);
			}
		}

		return value.length === 0 ? false : (value.length === 1 ? value[0] : value);
	},

	addParameter: function (href, parameter, value) {
		var parsed = this.parseUrl(href),
			query = [],
			i;

		if (parsed.query.indexOf(parameter + '=') > -1) {
			for (i = 0, splited = parsed.query.split('&'); i < splited.length; i++) {
				if (splited[i].indexOf(parameter + '=') > -1 || splited[i].indexOf(encodeURIComponent(parameter) + '=') > -1) {
					query.push(parameter + '=' + value);
				} else {
					query.push(splited[i]);
				}
			}
		} else {
			if (parsed.query.length > 0) {
				query.push(parsed.query);
			}
			query.push(parameter + '=' + value);
		}

		parsed.query = query.join('&');

		return this.makeUrl(parsed);
	},

	removeParameter: function (href, parameter) {
		var parsed = this.parseUrl(href),
			query = [],
			i;

		for (i = 0, splited = parsed.query.split('&'); i < splited.length; i++) {
			if (splited[i].indexOf(parameter + '=') > -1 || splited[i].indexOf(encodeURIComponent(parameter) + '=') > -1) {
				continue;
			}

			if (splited[i].length > 0) {
				query.push(splited[i]);
			}
		}

		parsed.query = query.join('&');

		return this.makeUrl(parsed);
	},

	addQueryString: function (href, queryString) {
		var parsed = this.parseUrl(href);

		parsed.query += parsed.query.length > 0 && queryString.length > 0 ? '&' + queryString : '';

		return this.makeUrl(parsed);
	}
};
