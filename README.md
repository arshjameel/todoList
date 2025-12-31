# Todo List
A classic todo app. Users are able to create lists and then add various tasks 
in those lists. The lists show date/time of creation. The tasks are organized 
by priority levels and due dates set by the user.

### Features
- Full CRUD functionality for both lists and the tasks within them.
- Persistent storage using [WebStorageAPI](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API) to ensure data survives page refreshes.
- Dynamic UI using real time DOM manipulation to load popup windows and update information.
- Modular architecture to acheieve low coupling via separation of concerns.

### Tech stack
- Vanilla JavaScript (ESM)
- Webpack 5 for asset bundling and dev environment
- [date-fns](https://date-fns.org/) for date fetching/manipulation

### Note 
1. The color palette used for this program was loosely inspired by the 
["Gruvbox"](https://github.com/morhetz/gruvbox?tab=readme-ov-file) colorscheme
2. The UI design was inspired by the ["Neobrutalist"](https://www.neobrutalism.dev/) 
   philosophy, featuring a "raw" look.

### Installation and Setup
To start a dev server on your local machine:
```
git clone git@github.com:arshjameel/todoList.git
cd todoList
npm install
npm run dev

```
To generate a production ready /dist folder:
```
npm run build
```