# Blog CMS Database Backup

**Backup Date:** March 1, 2026
**Database Type:** SQLite
**Source:** /var/www/blog-cms

## Contents

1. **data.db** - SQLite database file (binary)
2. **blog-cms-dump.sql** - SQL dump (text format)

## How to Restore

### Option 1: Using the SQLite Database File (data.db)

1. Copy `data.db` to your Strapi project's `.tmp/` directory:
   ```bash
   cp data.db /path/to/your/strapi-project/.tmp/data.db
   ```

2. Start your Strapi application:
   ```bash
   npm run develop
   ```

### Option 2: Using the SQL Dump (blog-cms-dump.sql)

1. Create a new database:
   ```bash
   sqlite3 data.db < blog-cms-dump.sql
   ```

2. Copy the restored database to your Strapi project:
   ```bash
   cp data.db /path/to/your/strapi-project/.tmp/data.db
   ```

## Database Information

- **Client:** SQLite
- **Location:** .tmp/data.db (relative to Strapi root)
- **Size:** ~1.2 MB

## Notes

- Make sure your local Strapi version matches the server version
- The database contains all content types, articles, categories, and admin users
- No uploaded files (uploads directory was empty)
