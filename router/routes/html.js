module.exports = function(app, db, approot) {

    const path = require('path');

    const scraper = require(path.join(approot, '/scraper/scraper.js')).scraper;

    const renderData = {
        heading: scraper.heading, 
        origin:  scraper.origin   
    };

    
    app.get('/index', function(req, res) {
        db.IssueModel.find({}, function(err, issues) {
            if(err) throw err;
            if(issues.length <= 0) {
                scraper.scrapeIt(db, function(isNew) {
                    db.IssueModel.find({}, function(err, issues) {
                        if(err) throw err;
                        renderIndex(res, issues);
                    });
                });
            } else {
                if(req.query.isnew !== undefined) renderIndex(res, issues, req.query.isnew);
                else renderIndex(res, issues);
            }
        });
    });

    function renderIndex(res, issues, newScrape) {
        
        const messageHTML;

        if(newScrape !== undefined) {
            if(newScrape === 'true') messageHTML = '<i>New scrape available!</i>';
            else messageHTML = '<i>No new scrape.</i>';
        }

        const scrapeData = Object.assign({}, renderData, {scrapemessage: messageHTML, issues : JSON.parse(JSON.stringify(issues))});
        res.render('index', scrapeData);
    };
};