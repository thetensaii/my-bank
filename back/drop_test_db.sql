REVOKE ALL PRIVILEGES ON my_bank_test.* FROM 'mybanktest'@'%';
DROP USER 'mybanktest'@'%';

DROP DATABASE IF EXISTS my_bank_test;