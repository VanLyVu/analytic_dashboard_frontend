# Analytics Dashboard Frontend

## How to Install

**Assume that you are in folder that will contains the source code**

### 0. Prerequisite

- You have to install [GIT](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
or [Docker](https://docs.docker.com/get-docker/) first.

- To be able to run this web, you have to install backend web first. [See Here](https://github.com/VanLyVu/analytic_dashboard_backend)

### 1. Create project folder
```
$ mkdir vanlyvu && cd vanlyvu
```

### 2. Clone source code and cd to source code
```
$ git clone https://github.com/VanLyVu/analytic_dashboard_frontend.git
$ cd analytic_dashboard_frontend
```

### 3. Build docker
```
$ docker-compose up -d --build
```

### 4. Install dependencies
```
$ docker exec -it vvly-frontend-vue bash
$ npm install
```

### 5. Run UnitTest
Inside docker container run
```
npm run unit
```

### 5. Start the web
Inside docker container run
```
npm run dev
```

### 6. Enjoy
Click [http://localhost:8080/](http://localhost:8080/) enjoy the web! Thank you very much!

## What I've DONE
- Completed the feature
- Used VueJS 2
- Used webpack
- Used npm to manage dependencies
- Used BEM - CSS Technique to write CSS in ReportFilter.vue
- Wrote CSS based on SCSS style
- Supported reponsive in mobile, tablet, pc
- UnitTest: Wrote some Unittest for ReportFilter component

## What I've not FINISH
- Typescript: I tried to integrate Typescript to Vue2 but it took more time than I expected. But when I can integrate to Vue2 I think I can use Typescript to write code, because I use Typescript when I made an application in AngularJS.
- SCSS: Somehow the `webpack` lib is too old, so I can not install library `sass-loader node-sass` to support SCSS
- Unit Test: I haven't write Unittest for Vue App so it takes time to complete all unittest.

## What I can IMPROVE
- Create a central point to manage call API
- Create base element like select, input date...
- Integrate TypeScript and refactor the code
- Write more UnitTest
- Add loading animation when call api to re-render the chart


## What we can expand from the project
- Support select multiple hotels and compare reviews between those hotels
- Support other charts
- Paint color for the trend: Example: red for down trend and green for up trend
