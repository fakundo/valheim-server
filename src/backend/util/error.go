package util

// Error types
const (
	GenericErrorType = "generic"
	AuthErrorType    = "auth"
)

// Error struct
type Error struct {
	Type    string
	Message string
}

func (err Error) Error() string {
	return err.Message
}

// NormalizeError casts an error to Error type
func NormalizeError(err error) error {
	switch err.(type) {
	case Error:
		return err
	default:
		return Error{Type: GenericErrorType, Message: err.Error()}
	}
}

// Custom errors
var (
	AuthError                  = Error{AuthErrorType, "Auth error"}
	ItemDuplicationError       = Error{GenericErrorType, "Item already exists"}
	WorldInUseError            = Error{GenericErrorType, "World in use"}
	InvalidServerNameError     = Error{GenericErrorType, "Invalid server name"}
	InvalidServerPasswordError = Error{GenericErrorType, "Invalid server password"}
	InvalidWorldNameError      = Error{GenericErrorType, "Invalid world name"}
	AlreadyStartedError        = Error{GenericErrorType, "Already started"}
	AlreadyStoppedError        = Error{GenericErrorType, "Already stopped"}
)
