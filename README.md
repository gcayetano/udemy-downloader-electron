# Udemy Downloader

This project allow you to download courses you paid for from Udemy website.

## Getting Started

### Prerequisites

First, you need your `Authorization token`. So follow the following steps:

* Open Chrome Developer Tools in Google Chrome.
* Select `Network`tab.
* Select `XHR`.
* Go to Udemy website and login to your account.
* Visit https://www.udemy.com/home/my-courses/learning/
* Select first row.
* Select `Header` from the side right panel.
* You will see your `authorization` token from `Request Headers` section.

### Installing

Install dependencies

```
npm install
```

Run webpack server

```
npm run start
```

Open a command shell and go to project directory

```
$ cd path/to/project/dir
```

Run electron

```
npm run electron
```

## Built With

* [React](https://github.com/facebook/react)
* [Electron](https://github.com/electron/electron)
* [Webpack](https://github.com/webpack/webpack)

## Authors

* **Gabriel Cayetano** - *Initial work* - [gcayetano](https://github.com/gcayetano)

See also the list of [contributors](https://github.com/udemy-downloader-electron/contributors) who participated in this project.

## License

This project is licensed under the GNU General Public License v3 - see the [LICENSE.md](LICENSE.md) file for details
