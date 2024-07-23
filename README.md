# Next.js WordPress eCommerce Template

This is a Next.js template for building an eCommerce website that fetches products and categories from the WordPress REST API. It includes functionality for browsing products, placing orders, and managing order details.

## Features

- **Product Pages:** View detailed information about individual products.
- **Category Pages:** Browse products by category.
- **Home Page:** Landing page for the website.
- **Order Detail Page:** View details of placed orders.
- **Contact Us Page:** Allows users to get in touch with customer support.
- **About Page:** Information about the company or website.
- **Checkout Page:** Process orders and complete transactions.

## Tech Stacks

- **Next.js:** A React framework for building server-side rendered and static web applications.
- **SCSS:** A CSS preprocessor for styling the website with enhanced features.
- **Redux:** A predictable state container for managing application state.
- **Redux Saga:** A middleware library for managing side effects in Redux applications.
- **Redux Persist:** Persist and rehydrate a Redux store.

## Setup Guide

1. **Clone the Repository**
2. **Install Dependencies**
3. **Configure WooCommerce REST API**
- Log in to your WordPress admin panel
- Navigate to WooCommerce > Settings > Advanced > REST API
- Click on "Add Key"
- Generate new API keys (Consumer Key and Consumer Secret)

4. **Update API Configuration**
- Go to the `server` folder in the project
- Open `instance.js`
- Replace the `username` and `password` in the interceptor with your generated Consumer Key and Consumer Secret:
  ```javascript
  const username = "your_consumer_key";
  const password = "your_consumer_secret";
  ```
- Update the `baseURL` to match your WordPress site:
  ```javascript
  export const baseURL = "https://your-wordpress-site.com/wp-json/wc/v3/"
  ```

5. **Customize the Template**
- Modify SCSS files in the `styles` directory to match your brand
- Extend and customize components as needed
- Configure Redux store and sagas according to your requirements

6. **Run the Development Server**

## Additional Components

- **Owl Carousel:** A responsive carousel plugin for displaying product images or banners.

Configuration
Update WordPress REST API endpoints in the codebase to match your WordPress site.
Customize the styling using SCSS files located in the project's styles directory.
Configure Redux store and sagas to meet your application's requirements.
Customize and extend components as needed to match your eCommerce website's design and functionality.
Contributing
Contributions are welcome! If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request.

Abdul Rehman
arrehman0r@gmail.com
