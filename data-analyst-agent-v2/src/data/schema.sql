-- Enable foreign key constraints
PRAGMA foreign_keys = ON;

-- Create Territory table
CREATE TABLE Territory (
    TerritoryKey INTEGER PRIMARY KEY,
    Region TEXT NOT NULL,
    Country TEXT NOT NULL,
    Continent TEXT NOT NULL
);

-- Create Customer table
CREATE TABLE Customer (
    CustomerKey INTEGER PRIMARY KEY,
    Prefix TEXT,
    FirstName TEXT,
    LastName TEXT,
    BirthDate DATETIME,
    MaritalStatus TEXT,
    Gender TEXT,
    EmailAddress TEXT,
    AnnualIncome INTEGER,
    TotalChildren INTEGER,
    EducationLevel TEXT,
    Occupation TEXT,
    HomeOwner TEXT
);

-- Create ProductCategory table
CREATE TABLE ProductCategory (
    ProductCategoryKey INTEGER PRIMARY KEY,
    CategoryName TEXT NOT NULL
);

-- Create ProductSubcategory table
CREATE TABLE ProductSubcategory (
    ProductSubcategoryKey INTEGER PRIMARY KEY,
    SubcategoryName TEXT NOT NULL,
    ProductCategoryKey INTEGER NOT NULL,
    FOREIGN KEY (ProductCategoryKey) REFERENCES ProductCategory(ProductCategoryKey)
);

-- Create Product table
CREATE TABLE Product (
    ProductKey INTEGER PRIMARY KEY,
    ProductSubcategoryKey INTEGER,
    ProductSKU TEXT NOT NULL,
    ProductName TEXT NOT NULL,
    ModelName TEXT,
    ProductDescription TEXT,
    ProductColor TEXT,
    ProductSize TEXT,
    ProductStyle TEXT,
    ProductCost REAL,
    ProductPrice REAL,
    FOREIGN KEY (ProductSubcategoryKey) REFERENCES ProductSubcategory(ProductSubcategoryKey)
);

-- Create Sales table
CREATE TABLE Sales (
    OrderDate DATETIME NOT NULL,
    StockDate DATETIME NOT NULL,
    OrderNumber TEXT NOT NULL,
    ProductKey INTEGER NOT NULL,
    CustomerKey INTEGER NOT NULL,
    TerritoryKey INTEGER NOT NULL,
    OrderLineItem INTEGER NOT NULL,
    OrderQuantity INTEGER NOT NULL,
    FOREIGN KEY (ProductKey) REFERENCES Product(ProductKey),
    FOREIGN KEY (CustomerKey) REFERENCES Customer(CustomerKey),
    FOREIGN KEY (TerritoryKey) REFERENCES Territory(TerritoryKey)
);

-- Create Returns table
CREATE TABLE Returns (
    TerritoryKey INTEGER NOT NULL,
    ReturnDate DATETIME NOT NULL,
    ProductKey INTEGER NOT NULL,
    ReturnQuantity INTEGER NOT NULL,
    FOREIGN KEY (TerritoryKey) REFERENCES Territory(TerritoryKey),
    FOREIGN KEY (ProductKey) REFERENCES Product(ProductKey)
); 