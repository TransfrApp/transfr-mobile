import { observable } from 'mobx';
import axios from 'axios';
import baseUrl from '../request-config';
class UserStore {
	user = observable({
		email: "test@test.com",
		password: "test",
		businessName: '',
		name: 'Test User',
		confirmPassword: '',
		accountType: '',
		walletAddress: '',
		etheriumWallet: '',
		bitcoinWallet: '',
		userId: null,
		accessToken: '',
	})

	createAccount(user) {
		const { businessName, email, password, name, userId, walletAddress, etheriumWallet, bitcoinWallet } = user;
		this.user.businessName = businessName;
		this.user.email = email;
		this.user.password = password;
		this.user.name = name;
		this.user.userId = userId;
		this.user.walletAddress = walletAddress;
		this.user.etheriumWallet = etheriumWallet;
		this.user.bitcoinWallet = bitcoinWallet; 
	}

	createWalletAddress(address){
		this.user.walletAddress = address;
	}

	accessToken(token) {
		this.user.accessToken = token;
	}

	login(user) {
		this.user = user
	}

	syncFromDB() {
		axios.post(`${baseUrl}/user/get`, {
			"id": this.user.userId
		})
			.then(res => {
				console.log(res);
			}).catch(err => console.log(err));
	}
}

export default new UserStore()