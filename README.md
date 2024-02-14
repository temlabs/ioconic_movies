# Approach

I approached this with extensibility in mind and sought to create a platform that could be easily built upon in future.

## Data Structure

A quote is comprised of its text, but also the movie it's taken from and the character by whom it was spoken. I included these entities because it wouldn't be a far cry to want to find all quotes by a given character, or from a given movie. The only change I would make here is allowing characters to belong to an array of movies (think sequels, crossovers etc.) which isn't currently the case.

## State Management and Persistence

### State Management Libraries

Three libraries are used to manage state:

- **TanStack Query:** Used to conveniently synchronize data with an external source. Chosen because it's best-in-class and minimizing React's data-sync overhead.

- **MMKV:** Used to persist the TanStack cache to the device storage. Chosen because it's synchronous and fast for simple read and writes.

- **Zustand:** Used as a reducer to manage the 'Add Movie Quote' form state. Chosen because of its simplicity.

### How Tanstack and MMKV Work Together

Of course in this situation, there is no external source, but in the spirit of making this easily extendable, creating the infrastructure and systems in the app to support this was important. Moreover, TanStack, through its sync-storage-persister makes synchronizing external updates to local storage convenient. Once the persister is setup, one needn't consider it anymore- it just works and the app cache persists between startups.

### The Flow of Data

#### Initializing

The first time the movie quotes are 'fetched', the demo quotes are returned. Thereafter, unless device storage is deleted, every fetch will just return the cached data back, since there is no external source through which mutations could be introduced. If we wanted to include this however, it would be as simple as modifying the fetch function to make the necessary call. This new data would also be added to device storage.

#### Re-Ordering

Despite the absence of external mutations, we can mutate the quotes by adding new ones or re-ordering. When a user re-orders the list, a mutation is triggered (see useQuotesOrderMutation). This mutation simply returns the new list. But like before, it would be easy to extend this to update some external database and invalidate the quotes cache to get the freshest data.

#### Adding a Quote

When adding a quote, a mutation is triggered (see useAddQuoteMutation). This one takes the existing data in the cache and appends it with a new post. And it's the same story, we could write to an external database and invalidate if we wanted.

## Re-Ordering

We use react-native-draggable list to implement a FlatList with items that can be long pressed and draggeed to reorder them. A local state is used to store the quotes because with DnD, responsiveness is crucial to the UX and relying on the TanStack Query Cache created a lag between updates. When a user finally drops a list item, the local state is optimistically updated to reflect their change and a mutation to sync the new list with the TanStack cache and an imaginary external database is triggered. A useEffect synchronizes the local state with the Tanstack cache so that if  this update fails, and the TanStack cache is rolled back as a result, the local state reflects this.

## Adding a Quote

A form is presented to add a new quote to the list, but it is unfinished. Ideally, a user would be able to search for the pertinent movie, or create one in a different screen. The same applies to the character. So currently, these are defaulted to some demo values and can't be changed.

Zustand would be used here to preserve the state of the form between screens but since the form is only one screen currently, it's not used as such.

Adding a quote, like re-ordering is performed optimistically. Currently however, if it were written to an external database and failed, the user would see their item disappear or not see it at all. Some user feedback would be needed.

## Navigation

React Navigation Native is used to provide a native navigation experience here.

# Future

## Re-Ordering

I opted for a drag and drop because that seemed most intuitive. However, while dragging and dropping is fine for local list changes, in a large list, it becomes tedious. An improvement would be the addition of a menu button on each list item that when pressed reveals a context menu. This context menu could have options such as 'Send to top/bottom', 'Send to position', 'Add one after'. Additionally, a 'select mode' could be used to select multiple list items and perform these operations on many at the same time.

## Authentication

Authentication could be implemented by creating another navigator and moving the present screens into their own navigator. Then based on the presence of a valid user session, the appropriate one could be rendered.

This would necessitate synchronizing with an external database, which the app in its current state is well-positioned to do.

A number of authorization-libraries could be used. For this kind of app, it may be helpful to choose a provider that supports federated logins.

## Real-Time Updates

Websockets could be used to achieve real-time updates in the app. The app could subscribe to a channel that sends events whenever a change is made. Then the relevant queries for that channel could be invalidated.

But what if user A is mid-drag when user B makes an update? Different strategies could be used to handle scenarios such as these.
We could keep only the most recent list, which in this case would nullify the changes made by user A. Alternatively, we could attempt to reconcile the two, especially if they don't pertain to the same list item.
Still, to avoid conflicts altogether we could 'lock' the list whenever a user starts dragging and release it after.
The best strategy however, I suppose will use a queue of transactions and reconcile direct conflicts by choosing the most recent.
