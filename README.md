

# Migrations
1. Run `supabase start` to start the supabase server.
2. Run `supabase link` to link the local db to the remote db.
3. Run `supabase db diff --linked` to see the diffs.
4. Run `supabase db pull --linked` to pull the latest changes from the remote db.
5. Run `supabase db push` to push the changes to the remote db.
6. Run `supabase db reset --local` to reset the local db.

    
# syncing data
1. To sync data, change the database url in the env.local file to be that of the production db.
2. run `npm run sync-data` to sync the data to the production db. This should ideally be done one time or whenever changes are changed on stripe. 
