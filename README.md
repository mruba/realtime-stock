# bcp-sp

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 3.7.3.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Ruby](https://www.ruby-lang.org) and then `gem install sass`
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

4. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

First we need to install and run ElasticSearch Engine `./elasticsearch`

Run `grunt build` for building and `grunt serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.

## Deploying

Run `gulp serve:dist`



## Gulp tasks

`gulp env:all | env:test | env:prod`
`gulp inject`
`gulp styles`
`gulp transpile:client`
`gulp transpile:server`
`gulp lint:scripts`
`gulp jscs`
`gulp clean:tmp`
`gulp start:client`
`gulp start:server`
`gulp start:server:prod`
`gulp start:inspector`
`gulp start:server:debug`
`gulp watch`
`gulp serve`
`gulp serve:dist`
`gulp serve:debug`
`gulp test`
`gulp test:server`
`gulp wiredep:client`
`gulp build`
`gulp clean:dist`
`gulp build:client`
`gulp html`
`gulp constant`
`gulp build:images`
`gulp copy:extras`
`gulp copy:fonts`
`gulp copy:assets`
`gulp copy:server`
`gulp coverage:pre`
