const prepareUrlToTitle = (url) => ((url === '/') ? 'all' : url.substr(1));

export default prepareUrlToTitle;
