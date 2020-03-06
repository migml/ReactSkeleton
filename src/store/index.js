import * as App from './AppState';
import * as Detail from './DetailState';
import * as Home from './HomeState';
import * as List from './ListState';
import * as Profile from './ProfileState';
import * as Publish from './PublishState';
import * as User from './UserState';

export const reducers = {
    app: App.reducer,
    detail: Detail.reducer,
    home: Home.reducer,
    list: List.reducer,
    profile: Profile.reducer,
    publish: Publish.reducer,
    user: User.reducer
}
