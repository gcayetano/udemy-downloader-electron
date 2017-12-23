# Udemy Downloader

This project allow you to download courses you paid for from Udemy website.

## Disclaimer

This software is intended to help you download Udemy courses for personal use only. Sharing the content of your subscribed courses is strictly prohibited under Udemy Terms of Use. Each and every course on Udemy is subjected to copyright infringement. This software does not magically download any paid course available on Udemy, you need to provide your Udemy login credentials to download the courses you have enrolled in. Udeler downloads the lecture videos by simply using the source of the video player returned to the user by Udemy after proper authentication, you can also do the same manually. Many download managers use same method to download videos on a web page. This app only automates the process of a user doing this manually in a web browser.

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
