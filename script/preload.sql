truncate table ft_user;

insert into ft_user (user_key, user_code, user_name, email_address, pwd_hashed, is_active, created_at, created_by)
values ('c5d0edc7-3c11-4f1f-a430-1cdb8a3b1953', 'sysadmin', 'System Admin.', 'admin@ft.com', '', 1, current_timestamp(), 'sysadmin');

insert into ft_user (user_key, user_code, user_name, email_address, pwd_hashed, is_active, created_at, created_by)
values ('ddbc137c-5103-41fd-8c20-6180a74e479a', 'ivanchan', 'Ivan Chan', 'ihmchan@ft.com', '', 1, current_timestamp(), 'sysadmin');