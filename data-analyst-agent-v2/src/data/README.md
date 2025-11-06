# AdventureWorks

![AdventureWorks](../../assets/adventureWorks-small.png)

A SQLite Database for AdventureWorks, a fictional global manufacturing company that produces cycling equipment and accessories.

This database was derived from [AdventureWorks sample](https://github.com/richhuwtaylor/adventure-works)

## Table Structure

The database schema for AdventureWorks includes the following tables:

- **Territory**: Contains information about different territories, including region, country, and continent.
- **Customer**: Stores customer details such as name, birth date, marital status, gender, email address, annual income, total children, education level, occupation, and homeownership status.
- **ProductCategory**: Lists product categories.
- **ProductSubcategory**: Contains product subcategories and references the product categories.
- **Product**: Stores product details including SKU, name, model, description, color, size, style, cost, and price. It references the product subcategories.
- **Sales**: Records sales transactions, including order date, stock date, order number, product key, customer key, territory key, order line item, and order quantity.
- **Returns**: Tracks product returns, including territory key, return date, product key, and return quantity.