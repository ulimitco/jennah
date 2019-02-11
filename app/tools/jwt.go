package tools

import (
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

// jwtCustomClaims are custom claims extending default ones.
type jwtCustomClaims struct {
	Username string `json:"name"`
	Email    string `json:"email"`
	Role     string `json:"role"`
	jwt.StandardClaims
}

//SetClaimsAndReturnToken generate claims and token
func SetClaimsAndReturnToken(username, email, role string) (string, error) {
	claims := &jwtCustomClaims{
		username,
		email,
		role,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 72).Unix(),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	t, err := token.SignedString([]byte("secretkeyhere"))

	if err != nil {
		return "", err
	}

	return t, nil
}

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func CheckPasswordHash(password, hash string) (bool, error) {

	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))

	if err != nil {
		return false, err
	}

	return true, nil
}
