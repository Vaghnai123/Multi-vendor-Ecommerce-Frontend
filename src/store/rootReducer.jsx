import authReducer from "./reducers/authReducer";
import homeReducer from "./reducers/homeReducer";
import cardReducer from "./reducers/cardReducer";
import orderReducer from "./reducers/orderReducer";
import dashboardReducer from "./reducers/dashboardReducer";
import chatReducer from "./reducers/chatReducer";
import blogReducer from './reducers/blogReducer';

const rootReducer = {
    home: homeReducer,
    auth: authReducer,
    card: cardReducer,
    order: orderReducer,
    dashboard: dashboardReducer,
    chat: chatReducer,
    blog: blogReducer
}
export default rootReducer;