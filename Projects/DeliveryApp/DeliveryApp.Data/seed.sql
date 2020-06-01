delete from Items;
delete from Categories;
delete from Restaurants;

DBCC CHECKIDENT (Restaurants, RESEED, 0);
DBCC CHECKIDENT (Categories, RESEED, 0);
DBCC CHECKIDENT (Items, RESEED, 0);

insert into Restaurants (
Name,
Description) 
VALUES 
('Chef Zorba''s', 'Since 1979, Chef Zorba''s Restaurant, located in the tiny business district on East 12th Avenue, has been a favorite gathering spot for Congress Park neighbors and food lovers throughout the city'),
('Shell''s & Sauce', ''),
('Peter''s Chinese', ''),
('Thai Basil', '');

insert into Categories (
Name,
Description,
RestaurantID)
VALUES 
('Breakfast All Day', '', 1),
('Salads, Soups & Appetizers', '', 1),
('Hot Plates', '', 1),
('Desserts', '', 1);

insert into Items (
Name,
Description,
Price,
CategoryID)
VALUES 
('Two Egg Breakfast', 'https://images.getbento.com/accounts/9534944480157230a93feecb5dd998ce/media/images/86307ChefZorba162of222.jpg?w=1800&fit=max&auto=compress,format&h=1800', 7.85, 1),
('Our Famous Athenian', 'crisp romaine lettuce, tomatoes, cucumber, onions, imported feta, kalamata olives, dolmathes, pepperoncini, hard boiled egg & greek red wine vinaigrette with warm pita bread', 12.99, 2),
('Char-Grilled Chicken', 'juicy lemon, garlic, oregano & olive oil marinated chicken breast, soup or mixed green salad & choice of side', 15.25, 3),
('Baklava', 'homemade walnut filled phyllo pastry drenched in honey', 5.25, 4);