ALTER TABLE `order_items` ADD `size` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `products` ADD `sizes` text DEFAULT 'XS,S,M,L,XL' NOT NULL;