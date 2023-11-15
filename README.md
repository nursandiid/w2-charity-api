# NodeJS Express - W2Charity API

This is a w2charity rewrite project built with Laravel and converted with NodeJS & Express.

## API Spec
- [Auth API](./docs/auth.md)
- [Auth API](./docs/auth.md)
- [Category API](./docs/category.md)
- [Campaign API](./docs/campaign.md)
- [Donor API](./docs/donor.md)
- [Donation API](./docs/donation.md)
- [Payment API](./docs/payment.md)
- [Cashout API](./docs/cashout.md)
- [Contact API](./docs/contact.md)
- [Subscriber API](./docs/subscriber.md)
- [Setting API](./docs/setting.md)
- [Report API](./docs/report.md)

## Installation

For the installation you can clone this project to your local computer.
```sh
git clone https://github.com/sandinur157/w2-charity-api
```

Navigate to the project folder.
```sh
cd w2-charity-api
```

Install required packages.
```sh
npm install
```

Create a new .env file and edit the credentials there.
```sh
cp .env.example .env
```

## Run
Run migration and seeder.
```sh
npx prisma migrate dev
npx prisma db seed
npx prisma generate
```

Run your app.
If you already have nodemon installed you can run this.
```sh
npm start
```

Or if not, you can run this.
```sh
node src/server.js
```

That's it.