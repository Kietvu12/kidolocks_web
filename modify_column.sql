-- Modify ten_phan_mem column to LONGTEXT
ALTER TABLE `phan_mem_tren_may_tinh` 
MODIFY COLUMN `ten_phan_mem` LONGTEXT NOT NULL;

-- Verify the change
DESCRIBE `phan_mem_tren_may_tinh`;
