package testdata

type UserTestRepo struct {
	CreateUserMock 		func(user RegisterBody) error
	GetUserMock 		func(username string) UserProfile
	UserExistsMock 		func(username string) bool
	IsValidLoginMock 	func(password string) bool
}

func (u *UserTestRepo) CreateUser(user RegisterBody) error {
	return u.CreateUserMock(user)
}

func (u *UserTestRepo) GetUser(username string) UserProfile {
	return u.GetUserMock(username)
}

func (u *UserTestRepo) UserExists(username string) bool {
	return u.UserExistsMock(username)
}

func (u *UserTestRepo) IsValidLogin(password string) bool {
	return u.IsValidLogin(password)
}
