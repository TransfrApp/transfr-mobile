import {observable} from 'mobx';

class UserStore {
	@observable user = {
        email: "test@test.com",
        password: "",
    }

	login(user) {
		this.user = user
	}
}

export default new UserStore()