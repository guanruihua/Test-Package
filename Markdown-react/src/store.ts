import AppStore from "./modules/app/store"
import TestStore from "./modules/test/store"
import LoginStore from './modules/login/store'

export default {
	AppStore: new AppStore(),
	LoginStore: new LoginStore(),
	TestStore,
}
