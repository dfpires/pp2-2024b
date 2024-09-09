# Caso queiram criar um projeto do zero
1. npm create vite@latest teste --template react-ts <br/>
2. npm install -D tailwindcss postcss autoprefixer <br/>
3. npx tailwindcss init -p  <br/>
4. (alterar arquivo tailwind.config.js)<br/>
 content: [<br/>
    "./index.html",<br/>
    "./src/**/*.{js,ts,jsx,tsx}",<br/>
  ],<br/>
5. (alterar arquivo index.css)<br/>
@tailwind base;<br/>
@tailwind components;<br/>
@tailwind utilities;<br/>
6. npm install react-router-dom <br/>
7. npm install axios <br/>
8. npx json-server --watch db.json --port 3001 (criar arquivo db.json)
