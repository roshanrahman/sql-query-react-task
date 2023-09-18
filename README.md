# Frontend Engineering Task - SQL Query Runner (React/TypeScript)

## Deployment
You can view the deployed version here: [https://sql-query-react-task.vercel.app/](https://sql-query-react-task.vercel.app/)

### How to use
1. Visit the deployed site (or clone locally and run `yarn dev` or `npm run dev`)
2. The results are mocked like so:
   1. If the SQL query has odd number length, "customers.csv" content is fetched.
   2. If the SQL query has even number length, "territories.csv" content is fetched.
   3. A mock error may be thrown with a very small probability.
## Prompt
> Create, design and implement a web-based application capable of running SQL queries and displaying the results of said query. The application must include a space which accepts SQL queries in the form of user inputs, then runs the given query, and displays the result within the application.

## Approach

### Ideation
- As the prompt is about fetching query data, one of the design decisions I took was to opt for a wide layout with a navigation panel on the side. I looked at Postman & PGAdmin as design references, as they have a similar purpose.

### Enhancements for user experience
- Users should be able to access the results of any queries they have run. To make this easier, a Search Bar is provided.
- Users might want to edit or copy the query results. For this a "Download CSV" button is provided. 

### Features
- Queries are listed on the left side, and user can name them. This helps organize queries, while not making names an absolute requirement.
- When the query is run, it renders the CSV content in form of a table.
- The SQL query is a textarea, with validation to ensure you enter some text when you click "Run"
- I chose React Table for the table because it offers a minimal API to quickly get started, while allowing us to integrate highly performant tables via virtualizing items.
- The queries run are mocked, with a random probability of the mock response erroring out. This is intentional for testing purposes.

## Performance & Optimization
- I chose a minimal set of dependencies to keep the bundle size as low as possible.
- I tested performance using Chrome's Lighthouse tool and it scored 100/100, with 360ms load time on average. See report: [./github/report.html](./github/report.html)
- Certain heavy components have been memoized to reduce potential re-renders.


## Dependencies
- This project is built with **React** & TypeScript, using **Vite**.

The following libraries are used:
- **Tailwind CSS** for the styling.
- **Jotai** for state management.
- **React Table** for table rendering.

