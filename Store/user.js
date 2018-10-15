import { observable } from 'mobx';

class UserStore {
	user = observable({
		email: "test@test.com",
		password: "test",
		businessName: '',
		name: 'Test User',
		confirmPassword: '',
		accountType: '',
	})

	login(user) {
		this.user = user
	}
}

export default new UserStore()