# Hi there

To get started, run

### `npm install`

To install packages being used, then

### `npm start`

To start the server

## Components usage

How global reusable components are used and their different states when given different props can be seens in route [**/playground**](https:localhost:3000/playground).

_All new reusable components should be added here and the props they take to obtain different states._

**Note: This endpoint is only accessible in development, not in production**

## Folder structure

All modules in files should be exported from the `index.js` file in the base folder except in `/assets` where each subfolder should contain their own `index.js`. E.g

    /constants _Folder_
      /routes.js _File with modules_
      /apiUrls.js _File with modules_
      /index.js _All modules from routes and apiUrls should be exported from here_

## Order

Modules being exported from the `index.js` file should be arranged in alphabetical order according to their file names. E.g

`export { Abc } from 'aa'`

`export { Bcd } from 'bb'`

All`(*)` exports should come before named exports and should be arranged according to their file names E.g

`export * from 'a'`

`export * from 'b'`

`export { Abc } from 'a'`

## Styling

Colors and fonts are all in the theme of styled components which are exported from `base/theme.js`. Check the theme to see if a styling or color you need is already there before creating a new style.

**rem** and **em** should be used in place of **px** where applicable.

## Naming conventions

Use camel casing for

- Modules names (e.g PalletList)
- Prop names e.g (propName)
- Image and svg names (e.g MoneyBag.png)

Use double dash to seperate words for

- Classnames (e.g font--big)

Use underscore to seperate words for

- Object keys (e.g first_name)
- Input names

Use uppercase and underscore for

- Constants that are not functions (e.g PUBLIC_KEY)

## Deployment

**Do not push directly to the production branch** / another developers branch, always make a pull request from your branch to the branch you wish to merge with.

## Things to avoid

- **Pushing directly to production branch**
- Declaring an svg in a js file
- Improper naming conventions (modules names or classnames)
- Installing unused packages
- Installing a package for every minor task
- Not decalaring universal constants that could change in a single file (constants folder)
- Over making of components

  \*Not everything needs to be broken down into sub-components
