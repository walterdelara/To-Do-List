# To-Do List

A simple and modern task management web application designed to help users organize, manage, and track their daily tasks.

## Overview

**To-Do List** is a lightweight front-end task management application built with HTML, CSS, and JavaScript.

The application allows users to create tasks, mark them as completed, edit existing tasks, delete tasks, and rearrange their order through drag-and-drop. Task data and theme preferences are stored locally in the browser using `localStorage`.

The project focuses on creating a clean, modern, and practical user interface without requiring a backend or database.

## About This Project

This was one of my **first web development projects**, created while I was learning and practicing front-end development.

The main goal of the project was not only to build a functional To-Do List, but also to practice designing a **clean, modern, and user-friendly interface**.

Through this project, I explored how layout, spacing, typography, colors, interactions, and responsive design can be combined to create a simple application that feels organized and easy to use.

This project also served as an early foundation for improving my understanding of JavaScript, DOM manipulation, browser storage, and interactive UI development.

## Features

* Add new tasks
* Mark tasks as completed
* Edit existing tasks
* Delete tasks
* Clear all completed tasks
* Drag and drop tasks to reorder them
* Task completion statistics
* Light and dark mode
* Automatic task persistence using `localStorage`
* Automatic theme preference persistence
* Responsive interface
* Empty-state display when there are no tasks
* Smooth task animations and transitions

## Technology Stack

* HTML5
* CSS3
* JavaScript
* Tailwind CSS
* Google Fonts — Inter
* Browser `localStorage`

## How It Works

Tasks are stored directly in the user's browser using `localStorage`. This allows tasks to remain available after refreshing or reopening the application on the same browser.

Each task contains basic information such as:

* Task ID
* Task text
* Completion status

The application dynamically renders the task list using JavaScript and updates the stored data whenever a task is added, edited, completed, deleted, or reordered.

## User Interface

The application uses a minimal interface focused on readability and ease of use.

Users can:

1. Enter a task in the input field.
2. Add the task to the list.
3. Mark the task as completed.
4. Edit the task when necessary.
5. Delete unwanted tasks.
6. Drag tasks to change their order.
7. Switch between light and dark themes.

## Data Storage

This project does not use a database or external backend.

Task data is stored locally using the browser's **localStorage API**. Because of this, the stored tasks are specific to the browser and device where the application is being used.

## Running the Project Locally

Clone the repository:

```bash
git clone https://github.com/walterdelara/To-Do-List.git
```

Open the project folder:

```bash
cd To-Do-List
```

Then open `index.html` in a web browser.

No installation or backend server is required.

## Live Demo

The project is deployed online:

[Open To-Do List](commitlist.vercel.app)

## Project Purpose

This project was created to practice and demonstrate fundamental front-end web development concepts, including:

* DOM manipulation
* JavaScript event handling
* CRUD operations
* Local browser storage
* Drag-and-drop functionality
* Responsive interface design
* Theme switching
* Dynamic UI rendering
* Clean and modern UI design

## Project Status

**Completed — Learning Project**

The current version is functional and deployed online.

Although this was one of my first web development projects, it provided a foundation for improving my front-end development skills and understanding how functionality and interface design work together.

Future improvements may include task filtering, categories, priorities, due dates, and additional productivity features.

## Author

**Walter De Lara**

A front-end web development project created for learning and practice.
