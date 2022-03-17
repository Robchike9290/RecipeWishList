RECIPE WISH LISH
Robert Czajka's Minimum Viable Product Project (20 hours of planning, coding, testing, and presentation time)

==================================================

GENERAL INFORMATION:
This is a demo recipe list website that uses the Edamam API to dynamically load recipe data based upon a search. The user can select recipes to add from their search to a list of favorites to they are available to them when they re-enter the website. There are the following sections to the website:

Keyword Search
Search Results
Your Recipes

=================================================

# KEYWORD SEARCH SECTION

![Keyword Search Section Demo](https://i.imgur.com/slZDUPj.gifv)

This section includes an input field with a button. The user can input a string of their choosing and click the button to initiate a search in the Edamam API. This string can include one or multiple words. If no search results are found, an alert will pop up statig that no search results were found. Otherwise, the 'Search Results' section will populate with the top 15 results matching the search criteria, or less is less than 15 results were found.

# SEARCH RESULTS SECTION

![Search Results Section Demo](https://i.imgur.com/slZDUPj.gifv)

This section displays the results of a keyword search by the user. This section is hidden on the initial page load, as a search has not yet been initiated. If the user initiates a search with not results, this section will stay hidden. Otherwise, the section will show up and poplate a grid ivew of all of the search results. Each result will include the following about its recipe:

- Name
- Source
- Photo
- Calories per serving
- Number of servings
- Clickable link to the recipe that opens in a new window

The user will also have the option to add the recipe to the 'Your Recipes' section by clicking the appropriate button at the bottom of the search result.

# YOUR RECIPES SECTION

![Your Recipes Section](https://i.imgur.com/4fWztQu.gifv)

The user will be able to see all of the recipes they have saved from search results in this section. These are displayed in the same format as those in the 'Search Results' section of the page. The user has the option to remove recipes from this list via a similar button at the bottom of each saved recipe.

# TECHNOLOGIES USED

## Dependencies

- Axios: Version 0.26.1,
- Babel-core: 6.26.3,
- Express: 4.17.3,
- File-loader: 6.2.0,
- Mongodb: 4.4.1,
- Mongoose: 6.2.6,
- Nodemon: 2.0.15,
- React: 17.0.2,
- React-DOM: 17.0.2,
- URL-loader: 4.1.1

## Development Dependencies

- @babel/core: 7.17.7,
- @babel/preset-env: 7.16.11,
- @babel/preset-react: 7.16.7,
- babel-loader: 8.2.3,
- css-loader: 6.7.1,
- style-loader: 3.3.1,
- webpack: 5.70.0,
- webpack-cli: 4.9.2,
- webpack-dev-server: 4.7.4

# INSTALLATION INSTRUCTIONS:

Exectue 'npm install' to install all of the above dependencies and development dependencies for this repo.

Execute 'npm run build-dev' to allow for transpilation with updating on each save.

Execute 'npm run startserver' to the Express server connection to the app.
