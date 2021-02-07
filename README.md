# Read Me

This project combines the two technical tasks into one. 
It features:

 - Backend: Express.Js server (Node)
 - Backend: json as data models
 - Backend: 3 API endpoints secured with a Bearer Token, using passport.js
 - Backend: CORS
 - Backend: Concurrent Build in dev mode (Client and Server)
 - Backend: Simple MVC architecture, Models, Views, Controllers
 - Frontend: Webpack
 - Frontend: TailwindCSS + PostCSS + Vue with a component based architecture

Both the client and the server, uses industry standards, such as ES6, .env files, linting, git, etc.

## File structure
```
public (App Frontend dist)
src
	--> client (Express JS server)
		--> components (Vue JS components)
		--> api (api utils)
		--> mixins (utils)
	--> server (Frontend src)
		--> controllers
		--> models
		--> routes
		--> views
```

## Frontend Task

The frontend task was added into the grid that displays all the movie results, it uses flexbox, and tailwindcss breakpoints and 4 lines of CSS to achieve the requirements. see details here: 
`src/client/components/FilmResultsComponent/index.vue line:4` 
and 
`src/client/components/FilmComponent/index.vue line:264`

## Notes

 1. The "post" endpoint, saves the data into a json file.
 2. The initial dataset was hardcoded, there is no CSV parsing due to time constrains. If you would like to see a very similar project i did for another technical test, which crunches 50000 lines in a CSV using Laravel and a VueJS frontend, see this repo `https://github.com/danieladarve/snooze` and https://snooze.appsnwebsites.com/ ... the CSVs for this project are also found in the repo.
 3. In this case I used a Bearer Token and restricted the API routes using the request origin header

## Deployment Notes
Project was deployed to Heroku
`https://github.com/danieladarve/we-are-digital`

