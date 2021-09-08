IF NOT EXISTS (SELECT *
FROM sys.databases
WHERE name = 'DataSourceTest')
BEGIN
    CREATE DATABASE DataSourceTest;
    ALTER DATABASE [DataSourceTest]
SET CHANGE_TRACKING = ON
(CHANGE_RETENTION = 2 HOURS, AUTO_CLEANUP = ON)

    ALTER DATABASE [DataSourceTest]
SET ALLOW_SNAPSHOT_ISOLATION ON
END;
GO

use DataSourceTest;
GO

/* Users are typically mapped to logins, as OP's question implies, 
so make sure an appropriate login exists. */
IF NOT EXISTS(SELECT principal_id FROM sys.server_principals WHERE name = 'elara') BEGIN
    /* Syntax for SQL server login.  See BOL for domain logins, etc. */
    CREATE LOGIN elara WITH PASSWORD = '2sXRkybHEGY8mrnF';
END

/* make sur eth apssword is correct */
ALTER LOGIN elara WITH PASSWORD = '2sXRkybHEGY8mrnF';

/* Create the user for the specified login. */
IF NOT EXISTS(SELECT principal_id FROM sys.database_principals WHERE name = 'elara') BEGIN
    CREATE USER elara FOR LOGIN elara
END

EXEC sp_addrolemember 'db_datareader', elara

if exists (select *
from sysobjects
where name='TestTable' and xtype='U')
    drop table dbo.TestTable
GO
CREATE TABLE [dbo].[TestTable]
(
    [a string] [varchar](34) NOT NULL PRIMARY KEY,
    [a date] [date] NULL,
    [a number] [numeric](14, 2) NULL,
    [a integer] [bigint] NULL,
    [a boolean] [bit] NULL,
    [Another String] [varchar](34) NULL,
) ON [PRIMARY]
GO

INSERT INTO TestTable
    ( [a string],[a date],[a number],[a integer], [a boolean],[Another String] )
VALUES
    ('mtsqttl4s5', '2021-04-01T03:03:09.834Z', -790.29, -875, 0, 'mtsqttl4s5'),
    ('0c5juntsmc', '2021-04-11T06:31:44.165Z', -121.44, -339, 0, '0c5juntsmc'),
    ('342scdnaum', '2021-01-01T13:11:30.519Z', 357.69, -786, 0, '342scdnaum'),
    ('9ktvsuthyf', '2020-12-06T06:50:07.718Z', 654.47, 525, 1, '9ktvsuthyf'),
    ('kvr4k32r4u', '2020-08-19T16:55:17.594Z', 927.38, -945, 0, 'kvr4k32r4u'),
    ('j8novq24rd', '2020-11-22T05:19:45.048Z', 960.26, 759, 0, 'j8novq24rd'),
    ('0jx1uzy7bw', '2020-09-14T09:15:11.338Z', -877.4, -381, 1, '0jx1uzy7bw'),
    ('s6c4n1lxf1', '2021-05-21T00:55:24.435Z', 410.98, 819, 1, 's6c4n1lxf1'),
    ('msfvgv93ez', '2020-11-21T02:25:00.816Z', 723.3100000000001, -943, 0, 'msfvgv93ez'),
    ('923dlcco5h', '2021-02-27T23:18:15.598Z', 683.12, 897, 1, '923dlcco5h'),
    ('230wy0wzln', '2021-05-16T12:24:30.576Z', 408.02, -920, 0, '230wy0wzln'),
    ('eezqi2ejxj', '2020-10-23T11:57:00.356Z', 327.79, -299, 0, 'eezqi2ejxj'),
    ('jo8d4u54so', '2020-11-11T20:39:53.905Z', 506.86, 58, 1, 'jo8d4u54so'),
    ('ch8wfmh4r2', '2021-06-06T00:34:09.402Z', 724.79, -637, 0, 'ch8wfmh4r2'),
    ('df7lc7d71p', '2020-09-03T16:12:02.665Z', -744.46, -811, 0, 'df7lc7d71p');

if exists (select *
from sysobjects
where name='AnotherTestTable' and xtype='U')
    drop table dbo.AnotherTestTable
GO

CREATE TABLE [dbo].[AnotherTestTable]
(
    [another string] [varchar](34) NOT NULL PRIMARY KEY,
    [another date] [date] NULL,
    [another number] [numeric](14, 2) NULL,
    [another integer] [bigint] NULL,
    [another boolean] [bit] NULL,
    [Yet Another String] [varchar](34) NULL,
) ON [PRIMARY]
GO

INSERT INTO AnotherTestTable
    ( [another string],[another date],[another number],[another integer], [another boolean],[Yet Another String] )
VALUES
    ('mtsqttl4s5', '2021-04-01T03:03:09.834Z', -790.29, -875, 0, 'mtsqttl4s5'),
    ('0c5juntsmc', '2021-04-11T06:31:44.165Z', -121.44, -339, 0, '0c5juntsmc'),
    ('342scdnaum', '2021-01-01T13:11:30.519Z', 357.69, -786, 0, '342scdnaum'),
    ('9ktvsuthyf', '2020-12-06T06:50:07.718Z', 654.47, 525, 1, '9ktvsuthyf'),
    ('kvr4k32r4u', '2020-08-19T16:55:17.594Z', 927.38, -945, 0, 'kvr4k32r4u'),
    ('j8novq24rd', '2020-11-22T05:19:45.048Z', 960.26, 759, 0, 'j8novq24rd'),
    ('0jx1uzy7bw', '2020-09-14T09:15:11.338Z', -877.4, -381, 1, '0jx1uzy7bw'),
    ('s6c4n1lxf1', '2021-05-21T00:55:24.435Z', 410.98, 819, 1, 's6c4n1lxf1'),
    ('msfvgv93ez', '2020-11-21T02:25:00.816Z', 723.3100000000001, -943, 0, 'msfvgv93ez'),
    ('923dlcco5h', '2021-02-27T23:18:15.598Z', 683.12, 897, 1, '923dlcco5h'),
    ('230wy0wzln', '2021-05-16T12:24:30.576Z', 408.02, -920, 0, '230wy0wzln'),
    ('eezqi2ejxj', '2020-10-23T11:57:00.356Z', 327.79, -299, 0, 'eezqi2ejxj'),
    ('jo8d4u54so', '2020-11-11T20:39:53.905Z', 506.86, 58, 1, 'jo8d4u54so'),
    ('ch8wfmh4r2', '2021-06-06T00:34:09.402Z', 724.79, -637, 0, 'ch8wfmh4r2'),
    ('df7lc7d71p', '2020-09-03T16:12:02.665Z', -744.46, -811, 0, 'df7lc7d71p');

GO

if exists (select * FROM sys.views where name = 'TestView')
    drop view dbo.TestView
GO
CREATE VIEW TestView AS SELECT * FROM TestTable;
GO

if exists (select * FROM sys.views where name = 'AnotherTestView')
    drop view dbo.AnotherTestView
GO

CREATE VIEW AnotherTestView AS SELECT * FROM AnotherTestTable;
GO

