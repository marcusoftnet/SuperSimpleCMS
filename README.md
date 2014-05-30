Super Simple Chunk Managment System
===================================
Many simple pages today is just a single page. SuperSimpleCMS allows you to edit the contents of that page is chunks. For example, the text of the intro block is one chunk of content, managed separately.

In the HTML there will just be simple calls to an API (HOW?) like for example <content site="mySite" name="headerText14"> that will be replaced with the content.

The actual content chunks is managed separately in a very simple CMS system, that allows you to use markdown for your editor.

This allows you to host "static" layout somewhere and call into the public api to retrive the content. You can of course host it in the same place too.

# Model
A *site* has a name and and a list of admins, I guess. Maybe need some kind of token here too, for security reasons

The content chunks looks like this:
- Name which will be used to retrieve the content by
- Content, which is the actual content, in markdown
- Author, the username of the person that created the content
- Created date, the ... ah, you get it
- Updated date
- Category, some kind of classification (V2)

# The API
The public API (public as in will be called from any site) just have two methods:
* POST /:site/getToken - takes the security token for the site and returns a GUID that is expected to be in the headers for the rest of the GETS
* GET /getChunk/:chunkName - returns the chunk (content as HTML). Expects token for site in headers

# The Admin site
## CRUD + pages for the sites
* GET 	/			- lists all the sites, for logged in user
* GET 	/site/new	- get the page to create new site
* POST	/site/new	- creates a new site
* GET 	/site/:id	- returns the page for the site
* PUT		/site/:id	- updates site data
* DELETE 	/site/:id	- deletes the site

## CRUD + pages for the chunks, in a site
* GET 	/site/:siteId/chunk/new 	- shows the add new chunk page
* POST	/site/:siteId/chunk/new 	- add a new chunk
* GET 	/site/:siteId/chunk/:id		- get the content display page * for a new chunk
* PUT		/site/:siteId/chunk/:id		- updates the chunk data
* DELETE	/site/:siteId/chunk/:id		- deletes the content


# Backlog
## Iteration 1 - DONE
* Create application structure - DONE
* Create config + tests - DONE
* Create dbWrap functionailty + tests - DONE
* Enable config for deployment environment - DONE
* Set up Heroku configuration - DONE
* Push first version to Heroku - DONE

## Iteration 2 - WIP
* Create admin pages for sites - WIP
* Create admin pages for chunks

## Iteration 3
* Add basic authentication for admin site
* Create getToken API method
* Create getChunk API method

## Iteration 4
* create simple example site

## Iteration next
* come up with nice way of wrapping the calls in an attribute
* enable other authentication methods
* do nicer example sites
* start thinking about pictures
* use ACE editor for nicer experience editing