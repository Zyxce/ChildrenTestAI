Детский психологический тест - SiriusMVP
Проект представляет собой веб-приложение для психологического тестирования детей через анализ рисунков и анкетирование родителей. Приложение позволяет загружать рисунки ребенка, заполнять анкету и получать автоматически сгенерированный психологический отчет в формате PDF.

Ключевые возможности

Загрузка рисунков:
Три обязательных рисунка: "Дом, дерево, человек", "Несуществующее животное", "Автопортрет"
Валидация форматов (JPG/PNG) и размера файлов (до 5MB)
Предпросмотр загруженных изображений

Анкетирование:
Разделы с разными типами вопросов: рейтинговые, радио, текстовые, с эмодзи
Валидация обязательных полей
Прогресс заполнения

Генерация отчета:
Отслеживание статуса обработки
Просмотр PDF-отчета прямо в браузере
Возможность скачивания отчета

Адаптивный дизайн:
Полная поддержка мобильных устройств
Адаптация под разные размеры экранов

Технологический стек

Frontend:
React 18
TypeScript
Redux Toolkit (состояние приложения)
React Router (навигация)
React PDF (просмотр отчетов)

Стилизация:
CSS Modules
Sass (препроцессор)
Адаптивная верстка

Инструменты:
Vite (сборка)
ESLint, Prettier (линтеры)
Git (контроль версий)

Установка и запуск

Клонировать репозиторий:

bash
git clone https://github.com/your-username/SiriusMVP.git
cd SiriusMVP
Установить зависимости:

bash
npm install

Запустить приложение в режиме разработки:

bash
npm run start
Собрать production-версию:

bash
npm run build

Структура проекта

text
src/
├── assets/ # Статические ресурсы (шрифты, изображения)
├── components/ # Компоненты приложения
│ ├── App.tsx
│ ├── AuthRoute.tsx
│ ├── FileUploader/ # Компоненты загрузки файлов
│ ├── Header.tsx
│ └── Questions/ # Компоненты вопросов
├── data/ # Данные приложения
│ └── questions.json
├── pages/ # Страницы приложения
│ ├── QuestionnairePage.tsx
│ ├── ReportPage.tsx
│ ├── UploadPhotosPage.tsx
│ └── WelcomePage.tsx
├── services/ # API-интеграции
│ └── api.ts
├── store/ # Redux хранилище
│ ├── index.ts
│ └── uploadSlice.ts
├── styles/ # Стили
└── types.ts # Типы TypeScript

Особенности реализации

Состояние приложения:

Использование Redux Toolkit для управления состоянием загрузки файлов
Асинхронные actions для взаимодействия с API

Безопасность маршрутов:

Защищенные роуты через компонент AuthRoute
Проверка наличия taskId перед переходом на страницы анкеты и отчета

Оптимизация:

Ленивая загрузка PDF-воркера
Отслеживание статуса обработки с интервалами
Таймауты для длительных операций

Пользовательский интерфейс:

Кастомизированные компоненты для разных типов вопросов
Визуальная обратная связь при взаимодействии
Индикаторы прогресса

```
33-AI-children-test
├─ build
│  ├─ about.txt
│  ├─ android-chrome-192x192.png
│  ├─ android-chrome-512x512.png
│  ├─ apple-touch-icon.png
│  ├─ asset-manifest.json
│  ├─ favicon-16x16.png
│  ├─ favicon-32x32.png
│  ├─ favicon.ico
│  ├─ index.html
│  ├─ pdf.worker.min.js
│  ├─ site.webmanifest
│  └─ static
│     ├─ css
│     │  ├─ main.e822bba8.css
│     │  └─ main.e822bba8.css.map
│     ├─ js
│     │  ├─ main.e1d1c468.js
│     │  ├─ main.e1d1c468.js.LICENSE.txt
│     │  └─ main.e1d1c468.js.map
│     └─ media
│        ├─ attention.41d64b7d22f9808b546344121e7ff847.svg
│        ├─ CirceRounded-Bold.63f1293bc8249ff6b698.otf
│        ├─ CirceRounded-ExtraBold.6a3cc715559f9889975d.otf
│        ├─ CirceRounded-ExtraLight.c0f36890d2cbfb365edd.otf
│        ├─ CirceRounded-Light.bee4cf44694a05bdd393.otf
│        ├─ CirceRounded-Regular.1f0dcce91d25e8258a22.otf
│        ├─ CirceRounded-Thin.4754039ca3ec37ccb83f.otf
│        ├─ flag.dd1dfeeaf0a3dcb6199e9245a1de9c54.svg
│        ├─ hand.c165d951be24b1078bdcce22a18771a0.svg
│        ├─ removePhotos.5d191226ea2c576b6063070503eb7999.svg
│        ├─ uploadPhotos.3184b2b8ac6918b45f1fd797a48721ba.svg
│        └─ welcomeBg.268ce9513cb945004d9e.jpg
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
│  ├─ pdf.worker.min.js
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
│  │  └─ Questions
│  │     ├─ DateQuestion.tsx
│  │     ├─ EmojiQuestion.tsx
│  │     ├─ QuestionContainer.tsx
│  │     ├─ RadioQuestion.tsx
│  │     ├─ RatingQuestion.tsx
│  │     └─ TextQuestion.tsx
│  ├─ configs
│  │  └─ constants.ts
│  ├─ data
│  │  └─ questions.json
│  ├─ global.d.ts
│  ├─ hooks
│  │  ├─ useAnswerTransformer.ts
│  │  ├─ useFileUploadManager.ts
│  │  ├─ useFormValidation.ts
│  │  ├─ usePdfLoader.ts
│  │  ├─ useReportStatusPolling.ts
│  │  ├─ useResponsiveContainer.ts
│  │  └─ useTaskIdGuard.ts
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
│  │     ├─ ReportPage.module.css
│  │     ├─ ReportPage.module.css.map
│  │     ├─ ReportPage.module.sass
│  │     ├─ UploadPhotosPage.module.css
│  │     ├─ UploadPhotosPage.module.css.map
│  │     ├─ UploadPhotosPage.module.sass
│  │     ├─ WelcomePage.module.css
│  │     ├─ WelcomePage.module.css.map
│  │     └─ WelcomePage.module.sass
│  ├─ types.ts
│  ├─ utils
│  │  ├─ answerTransformer.ts
│  │  ├─ apiErrorHandler.ts
│  │  └─ fileValidation.ts
│  └─ validation
│     └─ schemas.ts
└─ tsconfig.json

```