# My React project template

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

```
33-AI-children-test
├─ package-lock.json
├─ package.json
├─ public
│  ├─ about.txt
│  ├─ android-chrome-192x192.png
│  ├─ android-chrome-512x512.png
│  ├─ apple-touch-icon.png
│  ├─ favicon-16x16.png
│  ├─ favicon-32x32.png
│  ├─ favicon.ico
│  ├─ index.html
│  └─ site.webmanifest
├─ README.md
├─ src
│  ├─ assets
│  │  ├─ fonts
│  │  │  ├─ CirceRounded-Bold.otf
│  │  │  ├─ CirceRounded-ExtraBold.otf
│  │  │  ├─ CirceRounded-ExtraLight.otf
│  │  │  ├─ CirceRounded-Light.otf
│  │  │  ├─ CirceRounded-Regular.otf
│  │  │  └─ CirceRounded-Thin.otf
│  │  └─ images
│  │     ├─ arrowRight.svg
│  │     ├─ attention.svg
│  │     ├─ backIcon.svg
│  │     ├─ flag.svg
│  │     ├─ hand.svg
│  │     ├─ nextIcon.svg
│  │     ├─ removePhotos.svg
│  │     ├─ uploadPhotos.svg
│  │     └─ welcomeBg.jpg
│  ├─ components
│  │  ├─ App.tsx
│  │  ├─ AuthRoute.tsx
│  │  ├─ FileUploader
│  │  │  ├─ FileUploader.tsx
│  │  │  └─ FileUploadField.tsx
│  │  ├─ Header.tsx
│  │  └─ Questions
│  │     ├─ DateQuestion.tsx
│  │     ├─ EmojiQuestion.tsx
│  │     ├─ QuestionContainer.tsx
│  │     ├─ RadioQuestion.tsx
│  │     ├─ RatingQuestion.tsx
│  │     └─ TextQuestion.tsx
│  ├─ data
│  │  └─ questions.json
│  ├─ global.d.ts
│  ├─ hooks
│  ├─ index.tsx
│  ├─ pages
│  │  ├─ QuestionnairePage.tsx
│  │  ├─ ReportPage.tsx
│  │  ├─ UploadPhotosPage.tsx
│  │  └─ WelcomePage.tsx
│  ├─ Routes.tsx
│  ├─ services
│  │  └─ api.ts
│  ├─ setupProxy.js
│  ├─ store
│  │  ├─ index.ts
│  │  └─ uploadSlice.ts
│  ├─ styles
│  │  ├─ base
│  │  │  ├─ fonts.css
│  │  │  ├─ normalize.css
│  │  │  ├─ variables.css
│  │  │  ├─ variables.css.map
│  │  │  └─ variables.sass
│  │  ├─ components
│  │  │  ├─ App.css
│  │  │  ├─ App.css.map
│  │  │  ├─ App.sass
│  │  │  ├─ FileUploader
│  │  │  │  ├─ FileUploader.module.css
│  │  │  │  ├─ FileUploader.module.css.map
│  │  │  │  ├─ FileUploader.module.sass
│  │  │  │  ├─ FileUploadField.module.css
│  │  │  │  ├─ FileUploadField.module.css.map
│  │  │  │  └─ FileUploadField.module.sass
│  │  │  └─ Questions
│  │  │     ├─ DateQuestion.css
│  │  │     ├─ DateQuestion.css.map
│  │  │     ├─ DateQuestion.module.css
│  │  │     ├─ DateQuestion.module.css.map
│  │  │     ├─ DateQuestion.module.sass
│  │  │     ├─ DateQuestion.sass
│  │  │     ├─ EmojiQuestion.module.css
│  │  │     ├─ EmojiQuestion.module.css.map
│  │  │     ├─ EmojiQuestion.module.sass
│  │  │     ├─ QuestionContainer.module.css
│  │  │     ├─ QuestionContainer.module.css.map
│  │  │     ├─ QuestionContainer.module.sass
│  │  │     ├─ RadioQuestion.module.css
│  │  │     ├─ RadioQuestion.module.css.map
│  │  │     ├─ RadioQuestion.module.sass
│  │  │     ├─ RatingQuestion.module.css
│  │  │     ├─ RatingQuestion.module.css.map
│  │  │     ├─ RatingQuestion.module.sass
│  │  │     ├─ TextQuestion.module.css
│  │  │     ├─ TextQuestion.module.css.map
│  │  │     └─ TextQuestion.module.sass
│  │  ├─ index.css
│  │  ├─ index.css.map
│  │  ├─ index.sass
│  │  └─ pages
│  │     ├─ QuestionnairePage.module.css
│  │     ├─ QuestionnairePage.module.css.map
│  │     ├─ QuestionnairePage.module.sass
│  │     ├─ UploadPhotosPage.module.css
│  │     ├─ UploadPhotosPage.module.css.map
│  │     ├─ UploadPhotosPage.module.sass
│  │     ├─ WelcomePage.module.css
│  │     ├─ WelcomePage.module.css.map
│  │     └─ WelcomePage.module.sass
│  ├─ types.ts
│  └─ utils
└─ tsconfig.json

```