import { observable } from 'mobx';

class UserStore {
	user = observable({
		email: "test@test.com",
		password: "test",
		businessName: '',
		name: 'Test User',
		confirmPassword: '',
		accountType: '',
		walletAddress: '',
		userId: null,
	})

	createAccount(user) {
		const { businessName, email, password, name, userId } = user;
		this.user.businessName = businessName;
		this.user.email = email;
		this.user.password = password;
		this.user.name = name;
		this.user.userId = userId;
	}

	login(user) {
		this.user = user
	}
}

export default new UserStore()