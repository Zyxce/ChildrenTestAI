# 33-AI-Children-Test

Детский психологический тест, позволяющий на основе рисунков и ответов на опросник сформировать подробный PDF-отчет об эмоциональном состоянии ребёнка.

## 📋 Оглавление

- [Описание](#описание)
- [Особенности](#особенности)
- [Технологический стек](#технологический-стек)
- [Структура проекта](#структура-проекта)
- [Установка и запуск](#установка-и-запуск)
- [Переменные окружения](#переменные-окружения)
- [Доступные скрипты](#доступные-скрипты)
- [Деплой](#деплой)

---

## 📖 Описание

Приложение представляет собой одностраничный React‑SPA, в котором пользователь:

1. Загружает три рисунка («Дом‑Дерево‑Человек», «Несуществующее животное», «Автопортрет»).
2. Проходит опросник из нескольких секций с вопросами разных типов (рейтинг, эмоджи, текст, дата, радио).
3. Получает PDF‑отчет с анализом, сформированный через внешнее API.

Проект нацелен на помощь детским психологам, педагогам и родителям в оценке эмоционального состояния ребёнка.

## ⚙️ Особенности

- Модульная архитектура на React + TypeScript
- Управление состоянием с Redux Toolkit
- Валидация форм через React Hook Form + Zod
- Асинхронная загрузка и опросник с защитой маршрутов
- Генерация и отображение PDF-отчета с помощью React-PDF

## 🧩 Технологический стек

- **React** (v18+)
- **TypeScript**
- **Redux Toolkit**
- **React Router**
- **React Hook Form** + **@hookform/resolvers**
- **Zod** (валидаторы схем)
- **React-PDF** (отрисовка отчета)
- **http-proxy-middleware** (CORS proxy для PDF)
- **CSS Modules** и **Sass**

## 🗂️ Структура проекта

```
33-AI-children-test/
├─ public/                    # Статические файлы
├─ src/                       # Исходники приложения
│  ├─ assets/                 # Шрифты и изображения
│  ├─ components/             # UI-компоненты
│  ├─ configs/                # Константы и настройки
│  ├─ data/                   # JSON-секция с вопросами
│  ├─ hooks/                  # Кастомные React-хуки
│  ├─ pages/                  # Страницы маршрутов
│  ├─ services/               # API-запросы
│  ├─ store/                  # Redux Toolkit slice + store
│  ├─ styles/                 # Глобальные и модульные стили
│  ├─ utils/                  # Утилиты (валидация, трансформеры)
│  ├─ validation/             # Схемы Zod для форм
│  ├─ index.tsx               # Точка входа
│  └─ Routes.tsx              # Определение маршрутов
├─ README.md                  # Этот файл
├─ package.json               # Технические зависимости и скрипты
└─ tsconfig.json              # Конфигурация TypeScript
```

## 🚀 Установка и запуск

1. Клонируйте репозиторий:

   ```bash
   git clone https://github.com/<ваш‑профиль>/33-AI-children-test.git
   cd 33-AI-children-test
   ```

2. Установите зависимости:

   ```bash
   npm install
   ```

3. Создайте файл `.env` в корне проекта и задайте переменные (см. ниже).
4. Запустите в режиме разработки:

   ```bash
   npm start
   ```

5. Откройте в браузере [http://localhost:3000](http://localhost:3000)

## 🛠️ Переменные окружения

В корне проекта создайте `.env` со следующими ключами:

```ini
REACT_APP_API_BASE_URL=https://sirius-draw-test-94500a1b4a2f.herokuapp.com
# При необходимости укажите свой адрес API
```

## 📜 Доступные скрипты

- `npm start` — запуск в режиме разработки
- `npm run build` — сборка оптимизированной версии
- `npm test` — запуск тестов (если добавлены)
- `npm run lint` — проверка линтером
- `npm run format` — автоформатирование кода

## 📦 Деплой

1. Соберите проект командой `npm run build`.
2. Разверните содержимое папки `build/` на любом статическом хостинге (GitHub Pages, Netlify, Vercel и т.д.).

```
33-AI-children-test
├─ babel.config.js
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
│     │  ├─ main.1df0126b.css
│     │  ├─ main.1df0126b.css.map
│     │  ├─ main.e822bba8.css
│     │  └─ main.e822bba8.css.map
│     ├─ js
│     │  ├─ main.45482ed2.js
│     │  ├─ main.45482ed2.js.LICENSE.txt
│     │  ├─ main.45482ed2.js.map
│     │  ├─ main.e1d1c468.js
│     │  ├─ main.e1d1c468.js.LICENSE.txt
│     │  └─ main.e1d1c468.js.map
│     └─ media
│        ├─ analysisBg.35ad8e73671aff3f6ca7.png
│        ├─ analysisBgMobile.b4ba9b7d689bdb4f978c.png
│        ├─ attention.41d64b7d22f9808b546344121e7ff847.svg
│        ├─ CirceRounded-Bold.63f1293bc8249ff6b698.otf
│        ├─ CirceRounded-ExtraBold.6a3cc715559f9889975d.otf
│        ├─ CirceRounded-ExtraLight.c0f36890d2cbfb365edd.otf
│        ├─ CirceRounded-Light.bee4cf44694a05bdd393.otf
│        ├─ CirceRounded-Regular.1f0dcce91d25e8258a22.otf
│        ├─ CirceRounded-Thin.4754039ca3ec37ccb83f.otf
│        ├─ errorBg.31f9c87c707b1f013ada.png
│        ├─ flag.dd1dfeeaf0a3dcb6199e9245a1de9c54.svg
│        ├─ hand.c165d951be24b1078bdcce22a18771a0.svg
│        ├─ removePhotos.5d191226ea2c576b6063070503eb7999.svg
│        ├─ uploadPhotos.3184b2b8ac6918b45f1fd797a48721ba.svg
│        └─ welcomeBg.268ce9513cb945004d9e.jpg
├─ jest.config.js
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
│  │     ├─ analysisBg.png
│  │     ├─ analysisBgMobile.png
│  │     ├─ arrowRight.svg
│  │     ├─ attention.svg
│  │     ├─ backIcon.svg
│  │     ├─ errorBg.png
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
│  │  │  ├─ FileUploadField.tsx
│  │  │  └─ __tests__
│  │  │     └─ FileUploadField.test.tsx
│  │  ├─ FloatingBubles.tsx
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
│  │  ├─ useTaskIdGuard.ts
│  │  └─ __tests__
│  │     └─ useFileUploadManager.test.ts
│  ├─ index.tsx
│  ├─ mocks
│  │  ├─ fileMock.js
│  │  └─ handlers.ts
│  ├─ pages
│  │  ├─ QuestionnairePage.tsx
│  │  ├─ ReportPage.tsx
│  │  ├─ UploadPhotosPage.tsx
│  │  └─ WelcomePage.tsx
│  ├─ Routes.tsx
│  ├─ services
│  │  ├─ api.ts
│  │  └─ __tests__
│  │     └─ api.test.ts
│  ├─ setupProxy.js
│  ├─ setupTests.ts
│  ├─ store
│  │  ├─ index.ts
│  │  ├─ uploadSlice.ts
│  │  └─ __tests__
│  │     └─ uploadSlice.test.ts
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
│  │  │  ├─ FloatingBubbles.module.css
│  │  │  ├─ FloatingBubbles.module.css.map
│  │  │  ├─ FloatingBubbles.module.sass
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
│  │  ├─ fileValidation.ts
│  │  └─ __tests__
│  │     ├─ apiErrorHandler.test.ts
│  │     └─ fileValidation.test.ts
│  └─ validation
│     └─ schemas.ts
└─ tsconfig.json

```