# uno-dashboard

UNO delivery Dashboard for Admin and Support.

[![Netlify Status](https://api.netlify.com/api/v1/badges/a7a48cd3-44d7-435a-84d9-619c76846f6d/deploy-status)](https://app.netlify.com/sites/uno-dashboard/deploys)

- Live link (deployed from Main branch): [https://uno-dashboard.netlify.app/](https://uno-dashboard.netlify.app/)

## Getting Started

To get this project up and running, follow these steps:

### Prerequisites

You need to have Node.js and npm (Node Package Manager) installed on your system. You can download them from [Node.js website](https://nodejs.org/).

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/desmigor/uno-dashboard.git
   cd uno-dashboard
   ```

2. Install the packages

   ```bash
   npm install
   ```

### Running the app on development mode

```bash
npm run dev
```

### Building the app on productio mode

```bash
npm run build
```

#### Accessing the authentication

##### Run

```bash
npm run dev
```

##### Key points

      Support login is at http://localhost:5173/
      Admin login is at http://localhost:5173/a-login
      Reset Password is at http://localhost:5173/reset
      Change password at http://localhost:5173/change-password
      Dashboard progress so far at http://localhost:5173/dashboard/
